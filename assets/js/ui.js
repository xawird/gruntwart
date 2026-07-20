/**
 * ui.js — interakcje UI strony.
 *
 * Zawiera:
 *  - Smooth scroll dla anchor-linków (z offsetem na sticky header)
 *  - Fade-in przy scrollu (IntersectionObserver)
 *  - Cookie banner
 *
 * Widoczność .mobile-bar: pasek jest widoczny domyślnie (CSS, < 768px).
 * JS jedynie CHOWA go klasą .is-hidden, dopóki #formSubmit jest na ekranie.
 * Brak JS lub brak IntersectionObserver = pasek widoczny zawsze.
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

  // ----- Zgoda na cookies + Meta Pixel -----
  // JEDNO źródło prawdy. Dopóki w config.js nie ma fbPixelId, strona nie ustawia
  // żadnych cookies i nie ładuje niczego z zewnątrz — zgoda nie jest wymagana
  // (art. 173 ust. 3 Prawa telekomunikacyjnego / ePrivacy 5(3)), więc baner się
  // NIE pokazuje. Ten sam warunek bramkuje ładowanie pixela: nie da się mieć
  // banera bez pixela ani pixela bez zgody.
  const PIXEL_ID = String((window.SITE_CONFIG || {}).fbPixelId || "").trim();
  const CONSENT_KEY = "gruntwart-consent"; // "granted" | "denied"

  function readConsent() {
    try { return localStorage.getItem(CONSENT_KEY); } catch (e) { return null; }
  }

  function writeConsent(value) {
    try { localStorage.setItem(CONSENT_KEY, value); } catch (e) { /* nigdy nie blokuje strony */ }
  }

  function loadPixel() {
    if (!PIXEL_ID || window.fbq) return;
    !function (f, b, e, v, n, t, s) {
      if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments) };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = "2.0"; n.queue = [];
      t = b.createElement(e); t.async = !0; t.src = v;
      s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    }(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
    window.fbq("init", PIXEL_ID);
    window.fbq("track", "PageView");
  }

  const cookieBanner = document.getElementById("cookieBanner");
  const cookieAccept = document.getElementById("cookieAccept");
  const cookieDecline = document.getElementById("cookieDecline");

  if (PIXEL_ID && cookieBanner && cookieAccept && cookieDecline) {
    const stored = readConsent();

    // Baner jest fixed, więc wisi NAD treścią. Publikujemy jego zmierzoną
    // wysokość jako --cb-h — CSS rezerwuje tyle w padding-bottom i
    // scroll-padding-bottom, więc każdy element (w tym #formSubmit i checkbox
    // zgody) da się wyprowadzić spod banera, a focus nie ląduje pod nim.
    const measureBanner = () => {
      document.documentElement.style.setProperty("--cb-h", cookieBanner.offsetHeight + "px");
    };

    const showBanner = () => {
      cookieBanner.removeAttribute("hidden");
      measureBanner();
      cookieBanner.classList.add("is-visible");
      // Baner przechwytuje dół ekranu — focus idzie na niego od razu, żeby
      // klawiatura i czytnik ekranu nie dotarły tam dopiero za stopką.
      cookieBanner.focus();
      window.addEventListener("resize", measureBanner);
    };

    if (stored === "granted") {
      loadPixel();
    } else if (stored !== "denied") {
      setTimeout(showBanner, 600);
    }

    const closeBanner = () => {
      cookieBanner.classList.remove("is-visible");
      window.removeEventListener("resize", measureBanner);
      document.documentElement.style.removeProperty("--cb-h");
      setTimeout(() => cookieBanner.setAttribute("hidden", ""), 400);
    };

    cookieAccept.addEventListener("click", () => { writeConsent("granted"); loadPixel(); closeBanner(); });
    cookieDecline.addEventListener("click", () => { writeConsent("denied"); closeBanner(); });

    // Escape zamyka baner jak odmowa — nigdy jak zgoda.
    cookieBanner.addEventListener("keydown", (e) => {
      if (e.key === "Escape") { writeConsent("denied"); closeBanner(); }
    });
  }

  // Pixel dostaje zdarzenie Lead z form.js (CustomEvent "gruntwart:lead").
  // Żadnego sprzęgnięcia obu plików poza nazwą zdarzenia.
  document.addEventListener("gruntwart:lead", () => {
    if (window.fbq) window.fbq("track", "Lead");
  });

  // ----- Fade-in on scroll -----
  // Dodajemy klasę .fade-in do wybranych sekcji/elementów programatycznie,
  // żeby uniknąć zaśmiecania HTML.
  const fadeTargets = document.querySelectorAll(
    ".buy__card, .steps__item, .why__lead, .why__item, .faq__item, .cta-final__claim, .cta-final__text"
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

  // ----- Mobilny pasek CTA: chowany, dopóki widać przycisk wysyłki -----
  // Kryterium jest przycisk, nie karta: pasek jest zbędny dokładnie wtedy, gdy
  // użytkownik może kliknąć „wyślij" bez przewijania.
  const mobileBar = document.querySelector(".mobile-bar");
  const submitBtn = document.getElementById("formSubmit");

  if (mobileBar && submitBtn && "IntersectionObserver" in window) {
    const isOnScreen = (el) => {
      const r = el.getBoundingClientRect();
      return r.bottom > 0 && r.top < window.innerHeight;
    };

    // Schowany pasek musi wypaść też z kolejności focusa — sam transform go
    // tam zostawia (CSS dokłada visibility: hidden, inert to druga warstwa
    // i jedyne, co działa również przy wyłączonych animacjach).
    const setBarHidden = (hidden) => {
      mobileBar.classList.toggle("is-hidden", hidden);
      mobileBar.inert = hidden;
    };

    // Stan początkowy synchronicznie (ui.js jest na końcu <body>, więc przed
    // pierwszym malowaniem), animacja dopiero w kolejnej klatce — bez mignięcia.
    setBarHidden(isOnScreen(submitBtn));
    requestAnimationFrame(() => mobileBar.classList.add("is-animated"));

    new IntersectionObserver((entries) => {
      entries.forEach((entry) => setBarHidden(entry.isIntersecting));
    }, { threshold: 0 }).observe(submitBtn);
  }

})();
