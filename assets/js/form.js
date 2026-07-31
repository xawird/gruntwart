/**
 * form.js — walidacja i wysyłka formularza „Zgłoś działkę" (hero) do Web3Forms.
 *
 * Pola: address — "Adres działki" (wymagane), plot — "Numer działki" (opcjonalne),
 *   phone (wymagane, PHONE_REGEX), consent (wymagane).
 * Format danych: multipart/form-data.
 * API: https://api.web3forms.com/submit
 * Po sukcesie (WYŁĄCZNIE HTTP 200): trackLeadAndRedirect(leadId) — GA4
 *   generate_lead (send_to G-EBJ1LVMJVN) + konwersja Google Ads
 *   (AW-18362122846/OCfsCO-u2tkcEN6E37NE, transaction_id = lead_id) + Meta Lead,
 *   potem redirect na /dziekujemy.html (po obu callbackach lub 2200 ms).
 *   lead_id i czas_zgloszenia (ISO 8601 ze strefą) idą też do maila Web3Forms;
 *   z URL przechwytujemy gclid/gbraid/wbraid + utm_*.
 *   Formularz ma też natywny action= + hidden "redirect" (Web3Forms) — natywna
 *   walidacja (required/typy) nadal chroni użytkowników bez JS, a access_key jest
 *   wpisany na stałe w HTML, więc POST bez JS też dochodzi (Web3Forms sam
 *   przekierowuje na dziekujemy.html po udanej wysyłce). config.js pozostaje
 *   źródłem prawdy dla JS — przy zmianie klucza podmień OBA miejsca.
 * Po błędzie: komunikat inline z KLIKALNYM tel: + dane zachowane w polach.
 * Brak poprawnego klucza (UUID): POST w ogóle nie leci — od razu ścieżka telefoniczna.
 */
(function () {
  const form = document.getElementById("leadForm");
  if (!form) return;

  // Przechwyć parametry kampanii z URL (gclid + utm_*) i dołącz jako ukryte
  // pola. Web3Forms wysyła każde nazwane pole, więc w mailu z leadem widać,
  // z której reklamy/frazy przyszło zgłoszenie. Nie blokuje formularza.
  try {
    const params = new URLSearchParams(window.location.search);
    ["gclid", "gbraid", "wbraid", "utm_source", "utm_medium", "utm_campaign",
     "utm_adgroup", "utm_term", "utm_content", "utm_matchtype", "utm_device",
     "utm_network"].forEach((key) => {
      const val = params.get(key);
      if (!val) return;
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = val;
      form.appendChild(input);
    });
  } catch (e) {
    /* pomiar nigdy nie może zablokować formularza */
  }

  // Wyłącz natywną walidację dopiero gdy JS działa — bez JS przeglądarka
  // sama pilnuje required/typów przed natywnym POST-em do Web3Forms.
  form.setAttribute("novalidate", "");

  const config = window.SITE_CONFIG || {};

  // Web3Forms akceptuje wyłącznie access_key w formacie UUID. Placeholder,
  // pusty string czy cokolwiek innego kończy się HTTP 400 i utratą leada,
  // dlatego sprawdzamy FORMAT, a nie samą "prawdziwość" wartości.
  const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  const accessKey = String(config.web3formsKey || "").trim();
  const hasValidKey = UUID_REGEX.test(accessKey);

  // Wstrzyknij access_key tylko wtedy, gdy jest poprawny — inaczej zostawiamy
  // pole puste, żeby natywny (bez-JS) POST też nie leciał ze śmieciowym kluczem.
  const accessKeyInput = document.getElementById("formAccessKey");
  if (accessKeyInput && hasValidKey) {
    accessKeyInput.value = accessKey;
  }

  if (!hasValidKey) {
    console.warn(
      "[GruntWart] Brak poprawnego web3formsKey w assets/js/config.js " +
      "(oczekiwany UUID). Formularz NIE wysyła zgłoszeń — użytkownik dostaje " +
      "ścieżkę ratunkową przez telefon. Wklej klucz z https://web3forms.com."
    );
  }

  const submitBtn = document.getElementById("formSubmit");
  const feedback = document.getElementById("formFeedback");

  // Numer telefonu do komunikatów ratunkowych — format wyświetlany zawsze ze
  // spacjami, spójnie z resztą serwisu; link tel: bierzemy z phoneIntl.
  const phoneDisplay = config.phone || "728 517 226";
  const phoneIntl = config.phoneIntl || "+48728517226";

  /**
   * Komunikat błędu z KLIKALNYM numerem telefonu (na mobile to jedyna
   * realna ścieżka ratunku po nieudanej wysyłce). Budujemy węzły DOM,
   * a nie innerHTML — żadnego wstrzykiwania stringów do markupu.
   */
  function showRescue(message) {
    feedback.className = "form__feedback is-error";
    feedback.textContent = message + " ";
    const link = document.createElement("a");
    link.href = "tel:" + phoneIntl;
    link.textContent = phoneDisplay;
    feedback.appendChild(link);
    feedback.appendChild(document.createTextNode("."));
  }

  // Polski numer telefonu — dopuszczamy 9 cyfr lub +48 + 9 cyfr, z opcjonalnymi spacjami/myślnikami
  const PHONE_REGEX = /^(\+?48[\s-]?)?(\d{3}[\s-]?\d{3}[\s-]?\d{3})$/;

  /**
   * Pomiar konwersji — bez żadnego zewnętrznego skryptu i bez CDN.
   * Emitujemy zdarzenie "gruntwart:lead" + wpis do window.dataLayer.
   * Meta Pixel podpina się do tego zdarzenia w ui.js — ale dopiero po zgodzie
   * użytkownika i tylko gdy w config.js jest fbPixelId. Kod formularza nie
   * wymaga żadnych zmian w dniu wdrożenia pixela.
   */
  // Region z ukrytego pola formularza (bialystok/lodz/ogolna) — trafia do maila
  // (Web3Forms) i do zdarzeń pomiarowych, żeby było widać źródło leada.
  function getCity() {
    const el = form.querySelector('input[name="miasto"]');
    return (el && el.value) || (document.body && document.body.dataset.city) || "ogolna";
  }

  // Identyfikator leada: generowany PRZED pierwszą próbą wysyłki i trzymany na
  // window — retry po błędzie sieci używa TEGO SAMEGO id, więc deduplikacja po
  // transaction_id w Google Ads nie policzy drugiej konwersji. Max 64 znaki,
  // zero danych osobowych (losowy UUID).
  function makeLeadId() {
    try {
      if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
      var buf = new Uint8Array(16);
      crypto.getRandomValues(buf);
      return Array.prototype.map.call(buf, function (b) { return ("0" + b.toString(16)).slice(-2); }).join("");
    } catch (e) {
      return "lead-" + Date.now() + "-" + Math.random().toString(36).slice(2, 10);
    }
  }

  // Znacznik czasu ISO 8601 z przesunięciem strefy (np. 2026-07-30T19:05:12+02:00)
  // — toISOString() zwraca UTC i gubi strefę, dlatego składamy ręcznie.
  function isoWithOffset() {
    var d = new Date();
    var off = -d.getTimezoneOffset();
    var sign = off >= 0 ? "+" : "-";
    var pad = function (n) { return String(Math.abs(n)).padStart(2, "0"); };
    return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()) +
      "T" + pad(d.getHours()) + ":" + pad(d.getMinutes()) + ":" + pad(d.getSeconds()) +
      sign + pad(Math.floor(Math.abs(off) / 60)) + ":" + pad(Math.abs(off) % 60);
  }

  // Pomiar konwersji + przekierowanie. Wywoływane WYŁĄCZNIE po HTTP 200
  // z api.web3forms.com (błąd API = zero konwersji). Dwa trafienia na wspólnym
  // gtag: GA4 generate_lead i Google Ads conversion; redirect po powrocie OBU
  // callbacków albo po twardym beziecznika 2200 ms. Konwersja nigdy nie odpala
  // się z odsłony /dziekujemy.html — ten kod żyje tylko na stronach z formularzem.
  function trackLeadAndRedirect(leadId) {
    const city = getCity();
    try {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: "lead_submit", form: "leadForm", city: city, lead_id: leadId });
      document.dispatchEvent(new CustomEvent("gruntwart:lead", { detail: { form: "leadForm", city: city, leadId: leadId } }));
    } catch (e) {
      /* pomiar nigdy nie może zablokować konwersji */
    }

    let redirected = false;
    function redirectOnce() {
      if (redirected) return;
      redirected = true;
      window.location.assign("/dziekujemy.html");
    }

    if (typeof window.gtag !== "function") {
      redirectOnce();
      return;
    }

    let pendingTags = 2;
    function tagFinished() {
      pendingTags -= 1;
      if (pendingTags <= 0) redirectOnce();
    }

    window.gtag("event", "generate_lead", {
      send_to: "G-EBJ1LVMJVN",
      lead_id: leadId,
      city: city,
      event_callback: tagFinished,
      event_timeout: 1800
    });

    window.gtag("event", "conversion", {
      send_to: "AW-18362122846/OCfsCO-u2tkcEN6E37NE",
      transaction_id: leadId,
      event_callback: tagFinished,
      event_timeout: 1800
    });

    window.setTimeout(redirectOnce, 2200);
  }

  // ----- Walidacja per-pole -----
  function validateField(field) {
    clearError(field);
    const name = field.name;
    const value = (field.value || "").trim();

    if (field.required && !value) {
      setError(field, "To pole jest wymagane.");
      return false;
    }

    if (name === "phone" && value) {
      if (!PHONE_REGEX.test(value)) {
        setError(field, "Podaj poprawny numer telefonu (np. 728 517 226).");
        return false;
      }
    }

    return true;
  }

  function validateConsent() {
    const consent = document.getElementById("consent");
    const errorEl = form.querySelector('[data-error-for="consent"]');
    if (!consent.checked) {
      if (errorEl) {
        errorEl.textContent = "Musisz zaakceptować politykę prywatności.";
        errorEl.parentElement.classList.add("has-error");
      }
      return false;
    }
    if (errorEl) {
      errorEl.textContent = "";
      errorEl.parentElement.classList.remove("has-error");
    }
    return true;
  }

  function setError(field, message) {
    const errorEl = form.querySelector(`[data-error-for="${field.name}"]`);
    if (errorEl) errorEl.textContent = message;
    field.closest(".form__field").classList.add("has-error");
  }

  function clearError(field) {
    const errorEl = form.querySelector(`[data-error-for="${field.name}"]`);
    if (errorEl) errorEl.textContent = "";
    field.closest(".form__field").classList.remove("has-error");
  }

  // ----- Walidacja całego formularza -----
  function validateForm() {
    let ok = true;
    const inputs = form.querySelectorAll("input[name='address'], input[name='plot'], input[name='phone']");
    inputs.forEach((input) => {
      if (!validateField(input)) ok = false;
    });
    if (!validateConsent()) ok = false;
    return ok;
  }

  // ----- Walidacja na blur -----
  form.addEventListener("blur", (e) => {
    if (e.target.matches("input[type='text'], input[type='tel']")) {
      validateField(e.target);
    }
  }, true);

  // ----- Submit -----
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    feedback.className = "form__feedback";
    feedback.textContent = "";

    if (!validateForm()) {
      feedback.className = "form__feedback is-error";
      feedback.textContent = "Sprawdź zaznaczone pola i spróbuj ponownie.";
      // Po błędzie komunikaty wchodzą do flow (patrz .form__error:empty w CSS)
      // i karta rośnie o ~15px na pole. Ustawiamy fokus na pierwszym błędnym
      // polu, żeby ekran przeskoczył DO POLA, a nie żeby przycisk uciekł spod
      // palca użytkownikowi, który właśnie w niego celuje.
      const firstError = form.querySelector(".has-error");
      const firstErrorInput = form.querySelector(".has-error input");
      if (firstErrorInput) firstErrorInput.focus({ preventScroll: true });
      if (firstError) {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        firstError.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
      }
      return;
    }

    // Honeypot: jeśli wypełniony, udajemy sukces (ale nie wysyłamy)
    if (document.getElementById("botcheck").checked) {
      window.location.href = "/dziekujemy.html";
      return;
    }

    // Brak poprawnego klucza = POST zwróciłby 400. Nie udajemy wysyłki i nie
    // każemy użytkownikowi czekać — od razu dajemy działający kontakt.
    if (!hasValidKey) {
      showRescue("Wysyłka formularza jest chwilowo niedostępna. Zadzwoń albo napisz SMS:");
      feedback.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    submitBtn.classList.add("is-loading");
    submitBtn.disabled = true;

    // lead_id powstaje przed PIERWSZĄ próbą i jest trzymany na window: retry po
    // błędzie sieci wysyła TEN SAM identyfikator (deduplikacja konwersji po
    // transaction_id). Max 64 znaki, bez danych osobowych.
    const leadId = (window.__leadId = window.__leadId || makeLeadId()).slice(0, 64);

    try {
      const formData = new FormData(form);
      formData.append("lead_id", leadId);
      formData.append("czas_zgloszenia", isoWithOffset());
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();

      // Przekierowanie i KONWERSJE tylko po realnym sukcesie: HTTP 200 ORAZ
      // success:true. Web3Forms przy złym kluczu/limicie zwraca 4xx z
      // success:false — wtedy zostajemy na stronie, zero konwersji,
      // ścieżka telefoniczna.
      if (response.status === 200 && result.success) {
        trackLeadAndRedirect(leadId);
      } else {
        throw new Error(result.message || "Submission failed");
      }
    } catch (err) {
      console.error("Form submission error:", err);
      submitBtn.classList.remove("is-loading");
      submitBtn.disabled = false;
      showRescue("Coś poszło nie tak. Spróbuj jeszcze raz lub zadzwoń:");
    }
  });
})();
