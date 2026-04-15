/**
 * ui.js — interakcje UI strony.
 *
 * Zawiera:
 *  - Smooth scroll dla anchor-linków (z offsetem na sticky header)
 *  - Fade-in przy scrollu (IntersectionObserver) — dodawane w późniejszym tasku
 *  - Floating call button visibility — dodawane w późniejszym tasku
 *  - Cookie banner — dodawane w późniejszym tasku
 *
 * Accordion FAQ działa natywnie przez element <details>, bez JS.
 */
(function () {

  // ----- Smooth scroll z offsetem na sticky header -----
  const HEADER_OFFSET = 80;

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;
      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
      window.scrollTo({ top, behavior: "smooth" });

      // Aktualizuj URL bez przeładowania
      history.replaceState(null, "", targetId);
    });
  });

  // ----- Footer year -----
  const yearEl = document.getElementById("footerYear");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // ----- Floating call button (visible po scrollu poza hero) -----
  const floatingCall = document.getElementById("floatingCall");
  const hero = document.querySelector(".hero");

  if (floatingCall && hero && window.matchMedia("(max-width: 1023px)").matches) {
    floatingCall.removeAttribute("hidden");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          floatingCall.classList.remove("is-visible");
        } else {
          floatingCall.classList.add("is-visible");
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(hero);
  }

  // ----- Cookie banner -----
  const cookieBanner = document.getElementById("cookieBanner");
  const cookieAccept = document.getElementById("cookieAccept");
  const COOKIE_KEY = "nowy-rozdzial-cookie-accepted";

  if (cookieBanner && cookieAccept) {
    if (!localStorage.getItem(COOKIE_KEY)) {
      cookieBanner.removeAttribute("hidden");
      // Animacja pojawienia po krótkiej chwili
      setTimeout(() => cookieBanner.classList.add("is-visible"), 600);
    }

    cookieAccept.addEventListener("click", () => {
      localStorage.setItem(COOKIE_KEY, "1");
      cookieBanner.classList.remove("is-visible");
      setTimeout(() => cookieBanner.setAttribute("hidden", ""), 400);
    });
  }

  // ----- Fade-in on scroll -----
  // Dodajemy klasę .fade-in do wybranych sekcji/elementów programatycznie,
  // żeby uniknąć zaśmiecania HTML.
  const fadeTargets = document.querySelectorAll(
    ".section-header, .property-card, .process-step, .benefit, .testimonial, .faq-item, .final-cta__inner"
  );

  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    fadeTargets.forEach((el) => el.classList.add("fade-in"));

    const fadeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            fadeObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    fadeTargets.forEach((el) => fadeObserver.observe(el));
  }

})();
