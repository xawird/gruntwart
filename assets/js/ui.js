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

})();
