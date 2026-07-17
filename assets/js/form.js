/**
 * form.js — walidacja i wysyłka formularza „Zgłoś działkę" (hero) do Web3Forms.
 *
 * Pola: plot — "Numer działki lub lokalizacja" (wymagane), area — "Powierzchnia"
 *   (opcjonalne), phone (wymagane, PHONE_REGEX), consent (wymagane).
 * Format danych: multipart/form-data.
 * API: https://api.web3forms.com/submit
 * Po sukcesie: redirect na /dziekujemy.html (JS, po odpowiedzi fetch).
 *   Formularz ma też natywny action= + hidden "redirect" (Web3Forms) — natywna
 *   walidacja (required/typy) nadal chroni użytkowników bez JS, ale sam POST
 *   bez JS zadziała dopiero po wpisaniu na stałe realnego access_key do ukrytego
 *   pola (obecnie puste, bo klucz wstrzykuje JS z config.js) — patrz task-3-report.md.
 * Po błędzie: komunikat inline + dane zachowane w polach.
 */
(function () {
  const form = document.getElementById("leadForm");
  if (!form) return;

  // Wyłącz natywną walidację dopiero gdy JS działa — bez JS przeglądarka
  // sama pilnuje required/typów przed natywnym POST-em do Web3Forms.
  form.setAttribute("novalidate", "");

  const config = window.SITE_CONFIG || {};

  // Wstrzyknij access_key z configu (jeśli ustawione)
  const accessKeyInput = document.getElementById("formAccessKey");
  if (accessKeyInput && config.web3formsKey) {
    accessKeyInput.value = config.web3formsKey;
  }

  const submitBtn = document.getElementById("formSubmit");
  const feedback = document.getElementById("formFeedback");

  // Polski numer telefonu — dopuszczamy 9 cyfr lub +48 + 9 cyfr, z opcjonalnymi spacjami/myślnikami
  const PHONE_REGEX = /^(\+?48[\s-]?)?(\d{3}[\s-]?\d{3}[\s-]?\d{3})$/;

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
    const inputs = form.querySelectorAll("input[name='plot'], input[name='area'], input[name='phone']");
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
      // Scroll do pierwszego błędu
      const firstError = form.querySelector(".has-error");
      if (firstError) firstError.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    // Honeypot: jeśli wypełniony, udajemy sukces (ale nie wysyłamy)
    if (document.getElementById("botcheck").checked) {
      window.location.href = "/dziekujemy.html";
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
        window.location.href = "/dziekujemy.html";
      } else {
        throw new Error(result.message || "Submission failed");
      }
    } catch (err) {
      console.error("Form submission error:", err);
      submitBtn.classList.remove("is-loading");
      submitBtn.disabled = false;
      feedback.className = "form__feedback is-error";
      const phone = (config.phone || "500-441-500");
      feedback.textContent = `Coś poszło nie tak. Spróbuj jeszcze raz lub zadzwoń: ${phone}.`;
    }
  });
})();
