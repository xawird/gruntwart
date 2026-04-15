/**
 * form.js — walidacja i wysyłka formularza wyceny do Web3Forms.
 *
 * Format danych: multipart/form-data (wymagane dla załączników plikowych).
 * API: https://api.web3forms.com/submit
 * Po sukcesie: redirect na /dziekujemy.html
 * Po błędzie: komunikat inline + dane zachowane w polach.
 */
(function () {
  const form = document.getElementById("leadForm");
  if (!form) return;

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
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const MAX_FILES_TOTAL_BYTES = 5 * 1024 * 1024; // 5 MB

  // ----- Walidacja per-pole -----
  function validateField(field) {
    clearError(field);
    const name = field.name;
    const value = (field.value || "").trim();

    if (field.required && !value) {
      setError(field, "To pole jest wymagane.");
      return false;
    }

    if (name === "name" && value.length < 2) {
      setError(field, "Podaj imię (min. 2 znaki).");
      return false;
    }

    if (name === "phone") {
      if (!PHONE_REGEX.test(value)) {
        setError(field, "Podaj poprawny numer telefonu (np. 500 441 500).");
        return false;
      }
    }

    if (name === "email") {
      if (!EMAIL_REGEX.test(value)) {
        setError(field, "Podaj poprawny adres email.");
        return false;
      }
    }

    return true;
  }

  function validatePropertyType() {
    const checked = form.querySelector('input[name="property_type"]:checked');
    const errorEl = form.querySelector('[data-error-for="property_type"]');
    if (!checked) {
      if (errorEl) {
        errorEl.textContent = "Wybierz typ nieruchomości.";
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

  function validatePhotos() {
    const photos = document.getElementById("photos");
    const errorEl = form.querySelector('[data-error-for="photos"]');
    if (!photos.files || photos.files.length === 0) return true;

    let total = 0;
    for (const file of photos.files) total += file.size;
    if (total > MAX_FILES_TOTAL_BYTES) {
      if (errorEl) {
        errorEl.textContent = "Łączny rozmiar zdjęć przekracza 5 MB.";
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
    const inputs = form.querySelectorAll("input[required], input[name='email'], input[name='phone']");
    inputs.forEach((input) => {
      if (input.type === "radio" || input.type === "checkbox" || input.type === "file") return;
      if (!validateField(input)) ok = false;
    });
    if (!validatePropertyType()) ok = false;
    if (!validateConsent()) ok = false;
    if (!validatePhotos()) ok = false;
    return ok;
  }

  // ----- Walidacja na blur -----
  form.addEventListener("blur", (e) => {
    if (e.target.matches("input[type='text'], input[type='tel'], input[type='email']")) {
      validateField(e.target);
    }
  }, true);

  // ----- Pigułki: fallback dla przeglądarek bez :has -----
  const pillRadios = form.querySelectorAll('.form__pill input[type="radio"]');
  pillRadios.forEach((r) => {
    r.addEventListener("change", () => {
      form.querySelectorAll(".form__pill").forEach((p) => p.classList.remove("is-checked"));
      r.closest(".form__pill").classList.add("is-checked");
      validatePropertyType();
    });
  });

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
