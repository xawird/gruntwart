/**
 * form.js — walidacja i wysyłka formularza „Zgłoś działkę" (hero) do Web3Forms.
 *
 * Pola: address — "Adres działki" (wymagane), plot — "Numer działki" (opcjonalne),
 *   phone (wymagane, PHONE_REGEX), consent (wymagane).
 * Format danych: multipart/form-data.
 * API: https://api.web3forms.com/submit
 * Po sukcesie: trackLeadAndRedirect() — generate_lead (GA4/Ads) + Meta Lead,
 *   potem redirect na /dziekujemy.html (JS, po odpowiedzi fetch).
 *   Formularz ma też natywny action= + hidden "redirect" (Web3Forms) — natywna
 *   walidacja (required/typy) nadal chroni użytkowników bez JS, ale sam POST
 *   bez JS zadziała dopiero po wpisaniu na stałe realnego access_key do ukrytego
 *   pola (obecnie puste, bo klucz wstrzykuje JS z config.js).
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
    ["gclid", "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"].forEach((key) => {
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
  const phoneDisplay = config.phone || "500 441 500";
  const phoneIntl = config.phoneIntl || "+48500441500";

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

  // Pomiar konwersji + przekierowanie na podziękowanie. generate_lead (GA4/Ads)
  // wysyłamy z event_callback, żeby request zdążył wyjść PRZED nawigacją; fallback
  // (setTimeout) gwarantuje redirect nawet gdy callback nie wróci (np. brak GA).
  function trackLeadAndRedirect() {
    const city = getCity();
    try {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: "lead_submit", form: "leadForm", city: city });
      document.dispatchEvent(new CustomEvent("gruntwart:lead", { detail: { form: "leadForm", city: city } }));
    } catch (e) {
      /* pomiar nigdy nie może zablokować konwersji */
    }

    let redirected = false;
    const go = function () {
      if (redirected) return;
      redirected = true;
      window.location.href = "/dziekujemy.html";
    };

    if (typeof window.gtag === "function") {
      window.gtag("event", "generate_lead", { city: city, event_callback: go });
      setTimeout(go, 1000); // bezpiecznik, gdyby callback nie wrócił
    } else {
      go();
    }
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
        setError(field, "Podaj poprawny numer telefonu (np. 500 441 500).");
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

    try {
      const formData = new FormData(form);
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();

      if (result.success) {
        trackLeadAndRedirect();
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
