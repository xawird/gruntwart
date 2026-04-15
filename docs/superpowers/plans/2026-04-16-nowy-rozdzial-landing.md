# Nowy Rozdział — Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Zbudować jednostronicowy landing page firmy "Nowy Rozdział" (skup nieruchomości w Białymstoku), zoptymalizowany pod konwersję ruchu z płatnych kampanii reklamowych, łatwy do sklonowania pod inne miasta.

**Architecture:** Statyczna strona — plain HTML5 + CSS3 (CSS custom properties, brak preprocesorów) + vanilla JavaScript (brak frameworków, brak buildu). Trzy pliki HTML (landing + polityka + thanks) plus 404. Formularz wysyłany asynchronicznie do Web3Forms, leady idą na email. Wszystkie miejsca z nazwą miasta oznaczone komentarzem `<!-- city -->` dla łatwego find&replace.

**Tech Stack:** HTML5, CSS3 (custom properties, grid, flexbox), vanilla JS (ES6+, fetch API, IntersectionObserver), Google Fonts (Fraunces + Inter), Web3Forms (form backend), Lucide ikony (inline SVG). Hosting: Netlify.

**Note re TDD:** Pure HTML/CSS nie poddaje się klasycznemu TDD — weryfikacja wizualna w przeglądarce + Lighthouse. Dla JS modules (form.js, ui.js) używamy smoke testów manualnych przez DevTools console. W projekcie nie wprowadzamy build toolingu ani test runnerów (świadoma decyzja — landing musi pozostać prosty w utrzymaniu).

**Spec source:** `docs/superpowers/specs/2026-04-16-nowy-rozdzial-landing-design.md`

---

## Plik referencyjny — struktura projektu

```
skup/
├── index.html
├── polityka-prywatnosci.html
├── dziekujemy.html
├── 404.html
├── netlify.toml
├── robots.txt
├── sitemap.xml
├── README.md
├── .gitignore
├── assets/
│   ├── css/
│   │   ├── reset.css
│   │   ├── variables.css
│   │   └── styles.css
│   ├── js/
│   │   ├── config.js
│   │   ├── form.js
│   │   └── ui.js
│   ├── img/
│   │   ├── logo.svg
│   │   └── og-image.jpg     # placeholder na MVP
│   └── favicon/
│       └── favicon.svg       # placeholder na MVP
└── docs/
    └── superpowers/
        ├── specs/...
        └── plans/...
```

---

## Task 1: Inicjalizacja projektu (git, struktura, .gitignore)

**Files:**
- Create: `.gitignore`
- Create: katalogi (`assets/css`, `assets/js`, `assets/img`, `assets/favicon`)

- [ ] **Step 1: Sprawdź czy katalog jest pusty (poza docs)**

```bash
cd /Users/dawid/skup
ls -la
```

Expected: tylko `docs/` i `.superpowers/` (z brainstormingu).

- [ ] **Step 2: Inicjalizuj git**

```bash
cd /Users/dawid/skup
git init -b main
```

Expected: `Initialized empty Git repository...`

- [ ] **Step 3: Utwórz .gitignore**

```
# OS
.DS_Store
Thumbs.db

# Editor
.vscode/
.idea/
*.swp

# Brainstorming artifacts
.superpowers/

# Local env / secrets (jeśli kiedyś dojdą)
.env
.env.local

# Logs
*.log

# Netlify
.netlify/
```

- [ ] **Step 4: Utwórz strukturę katalogów**

```bash
mkdir -p assets/css assets/js assets/img assets/favicon
```

- [ ] **Step 5: Pierwszy commit**

```bash
git add .gitignore
git commit -m "chore: initialize project with gitignore"
```

Expected: 1 file changed.

---

## Task 2: HTML skeleton + design system foundation (variables.css, reset.css, base styles)

**Files:**
- Create: `index.html` (head section + pusty body)
- Create: `assets/css/reset.css`
- Create: `assets/css/variables.css`
- Create: `assets/css/styles.css` (base only)

- [ ] **Step 1: Utwórz `assets/css/reset.css`**

```css
/* Modern minimal reset */
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  -webkit-text-size-adjust: 100%;
  scroll-behavior: smooth;
}

body {
  min-height: 100vh;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

img,
picture,
video,
canvas,
svg {
  display: block;
  max-width: 100%;
  height: auto;
}

input,
button,
textarea,
select {
  font: inherit;
  color: inherit;
}

button {
  background: none;
  border: none;
  cursor: pointer;
}

a {
  color: inherit;
  text-decoration: none;
}

ul,
ol {
  list-style: none;
}

h1, h2, h3, h4, h5, h6 {
  font-weight: inherit;
  line-height: 1.2;
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

- [ ] **Step 2: Utwórz `assets/css/variables.css`**

```css
:root {
  /* Colors — warm/human palette */
  --color-bg:           #faf7f2;
  --color-bg-alt:       #ffffff;
  --color-bg-warm:      #f5e6d3;
  --color-bg-warm-light:#fef3e2;
  --color-text:         #2d2419;
  --color-text-muted:   #7a6f5f;
  --color-accent:       #5d6d4f;
  --color-accent-hover: #4a5840;
  --color-accent-soft:  #e8ede4;
  --color-warning:      #b8856b;
  --color-border:       #e8e0d2;
  --color-shadow:       rgba(45, 36, 25, 0.06);
  --color-shadow-strong:rgba(45, 36, 25, 0.12);

  /* Typography */
  --font-serif: "Fraunces", Georgia, "Times New Roman", serif;
  --font-sans: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

  /* Spacing scale */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;
  --space-7: 48px;
  --space-8: 64px;
  --space-9: 80px;
  --space-10: 120px;

  /* Layout */
  --container-max: 1200px;
  --container-padding: 24px;
  --section-padding-y: 80px;
  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-pill: 999px;

  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-base: 250ms ease;
  --transition-slow: 400ms ease;
}

@media (max-width: 768px) {
  :root {
    --section-padding-y: 56px;
    --container-padding: 16px;
  }
}
```

- [ ] **Step 3: Utwórz `assets/css/styles.css` (na razie tylko base)**

```css
/* ============================================
   Base typography & body
   ============================================ */

body {
  font-family: var(--font-sans);
  font-size: 17px;
  color: var(--color-text);
  background: var(--color-bg);
}

@media (max-width: 768px) {
  body {
    font-size: 16px;
  }
}

h1, h2, h3 {
  font-family: var(--font-serif);
  color: var(--color-text);
}

h1 {
  font-size: clamp(2.5rem, 5vw + 1rem, 4rem);
  font-style: italic;
  font-weight: 400;
  letter-spacing: -0.02em;
}

h2 {
  font-size: clamp(1.75rem, 3vw + 0.75rem, 2.5rem);
  font-style: italic;
  font-weight: 400;
}

h3 {
  font-size: 1.25rem;
  font-weight: 600;
}

p {
  color: var(--color-text-muted);
  line-height: 1.6;
}

a {
  color: var(--color-accent);
  transition: color var(--transition-fast);
}

a:hover {
  color: var(--color-accent-hover);
}

/* ============================================
   Layout helpers
   ============================================ */

.container {
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 var(--container-padding);
}

.section {
  padding: var(--section-padding-y) 0;
}

.eyebrow {
  font-family: var(--font-sans);
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: var(--color-text-muted);
  opacity: 0.8;
}

/* Visually hidden but accessible to screen readers */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

- [ ] **Step 4: Utwórz `index.html` z pełnym head + pustym body**

```html
<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <!-- Primary Meta Tags -->
  <!-- city -->
  <title>Skup nieruchomości Białystok — Nowy Rozdział | Decyzja w 24h</title>
  <!-- city -->
  <meta name="description" content="Skup działek, domów i mieszkań w Białymstoku. Bezpłatna wycena, decyzja w 24h, bez prowizji. Skupujemy też nieruchomości z problemami prawnymi." />
  <!-- city -->
  <meta name="geo.placename" content="Białystok" />
  <meta name="geo.region" content="PL" />
  <meta name="theme-color" content="#5d6d4f" />

  <!-- Open Graph -->
  <meta property="og:type" content="website" />
  <!-- city -->
  <meta property="og:title" content="Skup nieruchomości Białystok — Nowy Rozdział" />
  <!-- city -->
  <meta property="og:description" content="Skup działek, domów i mieszkań w Białymstoku. Decyzja w 24h, bez prowizji." />
  <meta property="og:image" content="/assets/img/og-image.jpg" />
  <meta property="og:locale" content="pl_PL" />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <!-- city -->
  <meta name="twitter:title" content="Skup nieruchomości Białystok — Nowy Rozdział" />
  <!-- city -->
  <meta name="twitter:description" content="Skup działek, domów i mieszkań w Białymstoku. Decyzja w 24h, bez prowizji." />
  <meta name="twitter:image" content="/assets/img/og-image.jpg" />

  <!-- Favicon -->
  <link rel="icon" type="image/svg+xml" href="/assets/favicon/favicon.svg" />

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;1,9..144,400&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />

  <!-- Styles -->
  <link rel="stylesheet" href="/assets/css/reset.css" />
  <link rel="stylesheet" href="/assets/css/variables.css" />
  <link rel="stylesheet" href="/assets/css/styles.css" />

  <!-- Schema.org JSON-LD -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "Nowy Rozdział",
    "telephone": "+48500441500",
    "email": "info@nowyrozdzial.pl",
    "areaServed": { "@type": "City", "name": "Białystok" },
    "description": "Skup nieruchomości w Białymstoku — działki, domy, mieszkania. Decyzja w 24h, bez prowizji."
  }
  </script>
</head>
<body>

  <main>
    <!-- Sections will be added in subsequent tasks -->
  </main>

  <script src="/assets/js/config.js"></script>
</body>
</html>
```

- [ ] **Step 5: Utwórz minimalny placeholder favicon**

```bash
cat > assets/favicon/favicon.svg << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="12" fill="#5d6d4f"/><text x="32" y="42" text-anchor="middle" font-family="Georgia,serif" font-size="32" font-style="italic" fill="#faf7f2">N</text></svg>
EOF
```

- [ ] **Step 6: Otwórz w przeglądarce, zweryfikuj base styles**

```bash
open index.html
```

Expected: pusty kremowy ekran (background `#faf7f2`), brak błędów w DevTools console, font Inter się ładuje (sprawdź w Network tab).

- [ ] **Step 7: Commit**

```bash
git add .
git commit -m "feat: add HTML skeleton, CSS reset, design tokens, and base styles"
```

---

## Task 3: Konfiguracja site (config.js z SITE_CONFIG)

**Files:**
- Create: `assets/js/config.js`

- [ ] **Step 1: Utwórz `assets/js/config.js`**

```js
/**
 * SITE_CONFIG — pojedyncze źródło prawdy dla zmiennych specyficznych dla miasta.
 *
 * Aby sklonować stronę pod nowe miasto:
 *   1. Zmień wartości w tym pliku (city, cityGenitive, cityLocative).
 *   2. Wykonaj find&replace nazwy miasta w plikach HTML (komentarze <!-- city -->
 *      oznaczają miejsca do zmiany).
 *   3. Podmień og-image.jpg i geo.placename meta tag.
 *   4. Wpisz właściwy klucz Web3Forms (web3formsKey).
 */
window.SITE_CONFIG = {
  // Miasto
  city: "Białystok",
  cityGenitive: "Białegostoku",   // np. "skup nieruchomości w Białegostoku"
  cityLocative: "Białymstoku",    // np. "w Białymstoku"

  // Kontakt
  phone: "500-441-500",
  phoneIntl: "+48500441500",      // dla tel: linka i WhatsApp
  email: "info@nowyrozdzial.pl",

  // Web3Forms — zarejestruj się na https://web3forms.com i wpisz access key
  web3formsKey: "REPLACE_ME_WITH_WEB3FORMS_KEY",

  // Marka
  brand: "Nowy Rozdział",
  tagline: "Pomagamy zacząć od nowa.",
};
```

- [ ] **Step 2: Sprawdź ładowanie w przeglądarce**

Otwórz `index.html`, w DevTools console wpisz: `window.SITE_CONFIG`

Expected: obiekt z polami `city`, `phone`, etc.

- [ ] **Step 3: Commit**

```bash
git add assets/js/config.js
git commit -m "feat: add SITE_CONFIG for multi-city parameterization"
```

---

## Task 4: Sticky header z logo i numerem telefonu

**Files:**
- Modify: `index.html` (dodaj `<header>` w `<body>`)
- Modify: `assets/css/styles.css` (dodaj sekcję `Header`)

- [ ] **Step 1: Dodaj `<header>` w `index.html` (przed `<main>`)**

```html
  <header class="site-header" id="siteHeader">
    <div class="container site-header__inner">
      <a href="#top" class="site-header__brand" aria-label="Nowy Rozdział — strona główna">
        <span class="site-header__brand-name">Nowy Rozdział</span>
      </a>
      <a href="tel:+48500441500" class="site-header__phone" aria-label="Zadzwoń: 500 441 500">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
        <span class="site-header__phone-number">500 441 500</span>
      </a>
    </div>
  </header>
```

- [ ] **Step 2: Dodaj `id="top"` do `<body>`**

```html
<body id="top">
```

- [ ] **Step 3: Dodaj style headera do `assets/css/styles.css`**

```css
/* ============================================
   Site header (sticky)
   ============================================ */

.site-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(250, 247, 242, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--color-border);
}

.site-header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 16px;
  padding-bottom: 16px;
}

.site-header__brand {
  font-family: var(--font-serif);
  font-size: 22px;
  font-style: italic;
  font-weight: 400;
  color: var(--color-text);
  text-decoration: none;
}

.site-header__brand-name {
  display: block;
}

.site-header__phone {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-sans);
  font-size: 16px;
  font-weight: 600;
  color: var(--color-accent);
  padding: 8px 14px;
  border-radius: var(--radius-pill);
  transition: background var(--transition-fast), color var(--transition-fast);
}

.site-header__phone:hover {
  background: var(--color-accent-soft);
}

@media (max-width: 480px) {
  .site-header__brand {
    font-size: 18px;
  }
  .site-header__phone-number {
    display: none;
  }
  .site-header__phone {
    padding: 8px;
  }
}
```

- [ ] **Step 4: Otwórz w przeglądarce i zweryfikuj**

```bash
open index.html
```

Expected: sticky header z logo "Nowy Rozdział" po lewej, telefon po prawej. Klik w telefon na desktop nic nie robi (bez aplikacji); na mobile inicjuje wybieranie. Header ma blur przy scrollu (jeszcze nie widać bo nie ma treści).

- [ ] **Step 5: Commit**

```bash
git add index.html assets/css/styles.css
git commit -m "feat: add sticky header with brand name and phone CTA"
```

---

## Task 5: Hero — lewa kolumna (treść)

**Files:**
- Modify: `index.html` (dodaj `<section class="hero">`)
- Modify: `assets/css/styles.css` (dodaj sekcję `Hero`)

- [ ] **Step 1: Dodaj sekcję hero w `<main>` (lewa kolumna na razie pełna szerokość — formularz w następnym tasku)**

```html
    <section class="hero">
      <div class="container hero__inner">
        <div class="hero__content">
          <p class="eyebrow hero__eyebrow">
            <!-- city -->Skup nieruchomości · Białystok
          </p>
          <h1 class="hero__title">Pomagamy zacząć od nowa.</h1>
          <p class="hero__subtitle">
            <!-- city -->Skupujemy działki, domy i mieszkania w Białymstoku. Decyzja w 24 godziny, bez prowizji, bez pośredników.
          </p>
          <div class="hero__cta">
            <a href="#formularz" class="btn btn--primary">Bezpłatna wycena ↓</a>
            <a href="tel:+48500441500" class="btn btn--secondary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              500 441 500
            </a>
          </div>
        </div>
        <!-- hero__form-card będzie dodane w Task 6 -->
      </div>
    </section>
```

- [ ] **Step 2: Dodaj style hero (oraz globalne `.btn`) do `styles.css`**

```css
/* ============================================
   Buttons (global)
   ============================================ */

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px 28px;
  font-family: var(--font-sans);
  font-size: 16px;
  font-weight: 600;
  border-radius: var(--radius-md);
  text-decoration: none;
  transition: transform var(--transition-fast), box-shadow var(--transition-fast),
              background var(--transition-fast), color var(--transition-fast);
  cursor: pointer;
  white-space: nowrap;
}

.btn--primary {
  background: var(--color-accent);
  color: var(--color-bg-alt);
}

.btn--primary:hover {
  background: var(--color-accent-hover);
  color: var(--color-bg-alt);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px var(--color-shadow-strong);
}

.btn--secondary {
  background: transparent;
  color: var(--color-accent);
  border: 1.5px solid var(--color-accent);
}

.btn--secondary:hover {
  background: var(--color-accent-soft);
  color: var(--color-accent-hover);
  transform: translateY(-2px);
}

.btn--block {
  width: 100%;
}

/* ============================================
   Hero
   ============================================ */

.hero {
  background: linear-gradient(135deg, var(--color-bg-warm-light) 0%, var(--color-bg-warm) 100%);
  padding: 80px 0 100px;
  position: relative;
  overflow: hidden;
}

.hero__inner {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 64px;
  align-items: center;
  min-height: calc(100vh - 200px);
}

.hero__content {
  max-width: 580px;
}

.hero__eyebrow {
  margin-bottom: 20px;
}

.hero__title {
  margin-bottom: 24px;
  color: var(--color-text);
}

.hero__subtitle {
  font-size: clamp(1rem, 1vw + 0.75rem, 1.125rem);
  margin-bottom: 32px;
  color: var(--color-text);
  opacity: 0.85;
  max-width: 520px;
}

.hero__cta {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

@media (max-width: 1024px) {
  .hero__inner {
    grid-template-columns: 1fr;
    gap: 48px;
    min-height: 0;
  }
  .hero {
    padding: 56px 0 64px;
  }
}

@media (max-width: 480px) {
  .hero__cta {
    flex-direction: column;
    align-items: stretch;
  }
  .hero__cta .btn {
    width: 100%;
  }
}
```

- [ ] **Step 3: Otwórz w przeglądarce i zweryfikuj**

```bash
open index.html
```

Expected: hero section z gradientowym kremowym tłem, eyebrow, dużym serif italic nagłówkiem "Pomagamy zacząć od nowa.", podtytułem i dwoma przyciskami. Klik w "Bezpłatna wycena ↓" przewija do `#formularz` (jeszcze nie istnieje — w konsoli błąd OK).

- [ ] **Step 4: Commit**

```bash
git add index.html assets/css/styles.css
git commit -m "feat: add hero section with brand message and CTAs"
```

---

## Task 6: Hero — formularz (HTML + style, bez JS)

**Files:**
- Modify: `index.html` (dodaj `.hero__form-card` w `.hero__inner`)
- Modify: `assets/css/styles.css` (dodaj style formularza)

- [ ] **Step 1: Dodaj kartę formularza w `.hero__inner` (po `<div class="hero__content">`)**

```html
        <div class="hero__form-card form-card" id="formularz">
          <h2 class="form-card__title">Opowiedz nam o swojej nieruchomości</h2>
          <p class="form-card__subtitle">Odezwiemy się w ciągu 24 godzin z bezpłatną wyceną.</p>

          <form class="form" id="leadForm" novalidate>
            <input type="hidden" name="access_key" value="REPLACE_ME_WITH_WEB3FORMS_KEY" id="formAccessKey" />
            <input type="hidden" name="subject" value="Nowe zgłoszenie wyceny — Nowy Rozdział" />
            <input type="hidden" name="from_name" value="Nowy Rozdział — Landing" />
            <input type="checkbox" name="botcheck" id="botcheck" tabindex="-1" autocomplete="off" class="form__honeypot" />

            <div class="form__field">
              <label for="name" class="form__label">Imię <span class="form__required">*</span></label>
              <input type="text" id="name" name="name" class="form__input" required minlength="2" autocomplete="given-name" />
              <span class="form__error" data-error-for="name"></span>
            </div>

            <div class="form__row">
              <div class="form__field">
                <label for="phone" class="form__label">Telefon <span class="form__required">*</span></label>
                <input type="tel" id="phone" name="phone" class="form__input" required autocomplete="tel" inputmode="tel" />
                <span class="form__error" data-error-for="phone"></span>
              </div>

              <div class="form__field">
                <label for="email" class="form__label">Email <span class="form__required">*</span></label>
                <input type="email" id="email" name="email" class="form__input" required autocomplete="email" inputmode="email" />
                <span class="form__error" data-error-for="email"></span>
              </div>
            </div>

            <div class="form__field">
              <span class="form__label">Typ nieruchomości <span class="form__required">*</span></span>
              <div class="form__pills" role="radiogroup" aria-label="Typ nieruchomości">
                <label class="form__pill">
                  <input type="radio" name="property_type" value="działka" required />
                  <span>Działka</span>
                </label>
                <label class="form__pill">
                  <input type="radio" name="property_type" value="dom" required />
                  <span>Dom</span>
                </label>
                <label class="form__pill">
                  <input type="radio" name="property_type" value="mieszkanie" required />
                  <span>Mieszkanie</span>
                </label>
              </div>
              <span class="form__error" data-error-for="property_type"></span>
            </div>

            <div class="form__field">
              <label for="location" class="form__label">Lokalizacja <span class="form__required">*</span></label>
              <!-- city -->
              <input type="text" id="location" name="location" class="form__input" required placeholder="np. Białystok, Antoniuk" />
              <span class="form__error" data-error-for="location"></span>
            </div>

            <div class="form__field">
              <label for="description" class="form__label">Opis nieruchomości</label>
              <textarea id="description" name="description" class="form__input form__textarea" rows="4"
                placeholder="Możesz napisać: numer działki / adres, powierzchnię, rok budowy, sytuację prawną, ewentualne obciążenia. Im więcej napiszesz, tym dokładniejsza będzie wycena."></textarea>
            </div>

            <div class="form__field">
              <label for="expected_price" class="form__label">Oczekiwana cena</label>
              <input type="text" id="expected_price" name="expected_price" class="form__input" placeholder="np. 250 000 zł — jeśli masz oczekiwania" />
            </div>

            <div class="form__field">
              <label for="photos" class="form__label">Zdjęcia (opcjonalnie)</label>
              <input type="file" id="photos" name="photos" class="form__file" multiple accept="image/*" />
              <span class="form__hint">Maksymalnie 5 MB łącznie. JPG, PNG, HEIC.</span>
              <span class="form__error" data-error-for="photos"></span>
            </div>

            <div class="form__field form__field--checkbox">
              <label class="form__checkbox-label">
                <input type="checkbox" id="consent" name="consent" required />
                <span>Akceptuję <a href="/polityka-prywatnosci.html" target="_blank" rel="noopener">politykę prywatności</a> i wyrażam zgodę na przetwarzanie moich danych w celu kontaktu w sprawie wyceny.</span>
              </label>
              <span class="form__error" data-error-for="consent"></span>
            </div>

            <div class="form__feedback" id="formFeedback" role="status" aria-live="polite"></div>

            <button type="submit" class="btn btn--primary btn--block form__submit" id="formSubmit">
              <span class="form__submit-text">Wyceń moją nieruchomość</span>
              <span class="form__submit-spinner" aria-hidden="true"></span>
            </button>

            <p class="form__small">
              Wysłanie formularza jest bezpłatne i niezobowiązujące.
            </p>
          </form>
        </div>
```

- [ ] **Step 2: Dodaj style formularza do `styles.css`**

```css
/* ============================================
   Form card
   ============================================ */

.form-card {
  background: var(--color-bg-alt);
  border-radius: var(--radius-lg);
  padding: 32px;
  box-shadow: 0 12px 40px var(--color-shadow-strong);
}

.form-card__title {
  font-size: clamp(1.4rem, 2vw + 0.5rem, 1.75rem);
  margin-bottom: 8px;
}

.form-card__subtitle {
  font-size: 14px;
  color: var(--color-text-muted);
  margin-bottom: 24px;
}

@media (max-width: 480px) {
  .form-card {
    padding: 24px 20px;
  }
}

/* ============================================
   Form
   ============================================ */

.form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form__honeypot {
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  opacity: 0;
}

.form__field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form__row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

@media (max-width: 480px) {
  .form__row {
    grid-template-columns: 1fr;
  }
}

.form__label {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text);
}

.form__required {
  color: var(--color-warning);
  font-weight: 700;
}

.form__input,
.form__textarea {
  width: 100%;
  padding: 12px 14px;
  font-size: 16px;
  background: var(--color-bg);
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-md);
  color: var(--color-text);
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
  font-family: var(--font-sans);
}

.form__input:focus,
.form__textarea:focus {
  outline: none;
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px var(--color-accent-soft);
}

.form__input::placeholder,
.form__textarea::placeholder {
  color: var(--color-text-muted);
  opacity: 0.7;
}

.form__textarea {
  resize: vertical;
  min-height: 96px;
  font-family: var(--font-sans);
}

.form__field.has-error .form__input,
.form__field.has-error .form__textarea {
  border-color: var(--color-warning);
  background: rgba(184, 133, 107, 0.05);
}

.form__error {
  font-size: 12px;
  color: var(--color-warning);
  min-height: 0;
  display: none;
}

.form__field.has-error .form__error {
  display: block;
}

.form__hint {
  font-size: 12px;
  color: var(--color-text-muted);
}

/* Pills (radio styled as pills) */
.form__pills {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.form__pill {
  position: relative;
  display: inline-flex;
  align-items: center;
  padding: 10px 18px;
  background: var(--color-bg);
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-pill);
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all var(--transition-fast);
}

.form__pill input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.form__pill:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
}

.form__pill:has(input:checked) {
  background: var(--color-accent);
  border-color: var(--color-accent);
  color: var(--color-bg-alt);
}

/* Fallback dla przeglądarek bez :has — dodajemy klasę z JS */
.form__pill.is-checked {
  background: var(--color-accent);
  border-color: var(--color-accent);
  color: var(--color-bg-alt);
}

/* File input */
.form__file {
  width: 100%;
  padding: 10px 14px;
  font-size: 14px;
  background: var(--color-bg);
  border: 1.5px dashed var(--color-border);
  border-radius: var(--radius-md);
  color: var(--color-text-muted);
  cursor: pointer;
}

.form__file:hover {
  border-color: var(--color-accent);
}

/* Checkbox */
.form__field--checkbox {
  margin-top: 4px;
}

.form__checkbox-label {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 13px;
  color: var(--color-text-muted);
  line-height: 1.5;
  cursor: pointer;
}

.form__checkbox-label input[type="checkbox"] {
  flex-shrink: 0;
  margin-top: 2px;
  width: 18px;
  height: 18px;
  accent-color: var(--color-accent);
  cursor: pointer;
}

.form__checkbox-label a {
  color: var(--color-accent);
  text-decoration: underline;
}

/* Submit */
.form__submit {
  margin-top: 8px;
  position: relative;
}

.form__submit-spinner {
  display: none;
  width: 18px;
  height: 18px;
  border: 2.5px solid rgba(255, 255, 255, 0.3);
  border-top-color: var(--color-bg-alt);
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  margin-left: 10px;
}

.form__submit.is-loading {
  pointer-events: none;
  opacity: 0.85;
}

.form__submit.is-loading .form__submit-spinner {
  display: inline-block;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.form__small {
  font-size: 12px;
  color: var(--color-text-muted);
  text-align: center;
  margin-top: 4px;
}

/* Feedback messages */
.form__feedback {
  display: none;
  padding: 12px 14px;
  border-radius: var(--radius-md);
  font-size: 14px;
}

.form__feedback.is-success {
  display: block;
  background: var(--color-accent-soft);
  color: var(--color-accent-hover);
  border: 1px solid var(--color-accent);
}

.form__feedback.is-error {
  display: block;
  background: rgba(184, 133, 107, 0.1);
  color: var(--color-warning);
  border: 1px solid var(--color-warning);
}
```

- [ ] **Step 3: Otwórz w przeglądarce i zweryfikuj wizualnie**

```bash
open index.html
```

Expected:
- Hero ma teraz dwie kolumny (treść po lewej, formularz po prawej) na desktop ≥1024px.
- Formularz: imię, telefon+email w jednym rzędzie, pigułki dla typu (kliknij — zaznaczona zmienia tło), lokalizacja, opis (textarea z dłuższym placeholderem), cena, zdjęcia, checkbox zgody, przycisk "Wyceń moją nieruchomość".
- Klik "Bezpłatna wycena ↓" w heroze przewija do formularza.
- Submit nic nie robi (jeszcze brak JS).

- [ ] **Step 4: Commit**

```bash
git add index.html assets/css/styles.css
git commit -m "feat: add lead-capture form HTML and styling in hero"
```

---

## Task 7: form.js — walidacja i wysyłka do Web3Forms

**Files:**
- Create: `assets/js/form.js`
- Modify: `index.html` (dodaj `<script src="/assets/js/form.js">` przed `</body>`)
- Create: `dziekujemy.html` (strona po sukcesie)

- [ ] **Step 1: Utwórz `assets/js/form.js`**

```js
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
```

- [ ] **Step 2: Dodaj `<script src="/assets/js/form.js">` w `index.html` (przed `</body>`, po config.js)**

```html
  <script src="/assets/js/config.js"></script>
  <script src="/assets/js/form.js"></script>
</body>
```

- [ ] **Step 3: Utwórz `dziekujemy.html` (prosta strona potwierdzenia)**

```html
<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Dziękujemy — Nowy Rozdział</title>
  <meta name="description" content="Dziękujemy za zgłoszenie. Skontaktujemy się w ciągu 24 godzin." />
  <meta name="robots" content="noindex" />
  <link rel="icon" type="image/svg+xml" href="/assets/favicon/favicon.svg" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;1,9..144,400&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/assets/css/reset.css" />
  <link rel="stylesheet" href="/assets/css/variables.css" />
  <link rel="stylesheet" href="/assets/css/styles.css" />
</head>
<body>
  <main class="thanks">
    <div class="container thanks__inner">
      <div class="thanks__icon" aria-hidden="true">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
      </div>
      <p class="eyebrow">Zgłoszenie wysłane</p>
      <h1 class="thanks__title">Dziękujemy.</h1>
      <p class="thanks__text">
        Otrzymaliśmy Twoje zgłoszenie. Zadzwonimy lub odpiszemy w ciągu <strong>24 godzin</strong> z bezpłatną wyceną.
      </p>
      <p class="thanks__text">
        Jeśli wolisz, możesz też zadzwonić bezpośrednio:
      </p>
      <a href="tel:+48500441500" class="btn btn--primary thanks__cta">📞 500 441 500</a>
      <p class="thanks__back">
        <a href="/">← Wróć na stronę główną</a>
      </p>
    </div>
  </main>
</body>
</html>
```

- [ ] **Step 4: Dodaj style strony "dziękujemy" do `styles.css`**

```css
/* ============================================
   Thanks page
   ============================================ */

.thanks {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--color-bg-warm-light) 0%, var(--color-bg-warm) 100%);
  padding: 48px 0;
}

.thanks__inner {
  max-width: 560px;
  text-align: center;
}

.thanks__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 96px;
  height: 96px;
  background: var(--color-accent-soft);
  color: var(--color-accent);
  border-radius: 50%;
  margin-bottom: 24px;
}

.thanks__title {
  font-size: clamp(2.5rem, 5vw + 1rem, 4rem);
  font-style: italic;
  margin: 16px 0 24px;
}

.thanks__text {
  font-size: 17px;
  color: var(--color-text);
  margin-bottom: 16px;
  line-height: 1.6;
}

.thanks__text strong {
  color: var(--color-accent);
}

.thanks__cta {
  margin-top: 16px;
  font-size: 18px;
}

.thanks__back {
  margin-top: 32px;
  font-size: 14px;
}

.thanks__back a {
  color: var(--color-text-muted);
  text-decoration: underline;
}
```

- [ ] **Step 5: Smoke test — walidacja**

Otwórz `index.html` w przeglądarce. W formularzu:
1. Klik "Wyceń moją nieruchomość" bez wypełnienia → wszystkie required pola powinny pokazać błąd, scroll do pierwszego.
2. Wpisz nieprawidłowy email "abc" → komunikat błędu.
3. Wpisz nieprawidłowy telefon "123" → komunikat błędu.
4. Wybierz typ nieruchomości (klik pigułka) → tło pigułki zmienia kolor na szałwiowy.

- [ ] **Step 6: Smoke test — wysyłka**

W DevTools console:
```js
window.SITE_CONFIG.web3formsKey = "test_key_for_now";
```
Wypełnij formularz poprawnie i wyślij. Bez prawdziwego klucza Web3Forms odpowiedź będzie błędem (status nie-success).

Expected: spinner pojawia się w przycisku, potem czerwony komunikat błędu nad przyciskiem.

(Pełny test sukcesu: po wpisaniu prawdziwego klucza Web3Forms — to robimy w Task 19 / przed deployem.)

- [ ] **Step 7: Commit**

```bash
git add assets/js/form.js dziekujemy.html index.html assets/css/styles.css
git commit -m "feat: add form validation, Web3Forms submission, and thank-you page"
```

---

## Task 8: Trust strip (sekcja pod heroem)

**Files:**
- Modify: `index.html` (dodaj `<section class="trust-strip">` po `</section>` hero)
- Modify: `assets/css/styles.css` (dodaj sekcję `Trust strip`)

- [ ] **Step 1: Dodaj sekcję trust-strip w `<main>`**

```html
    <section class="trust-strip">
      <div class="container trust-strip__inner">
        <div class="trust-strip__item">
          <svg class="trust-strip__icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
          </svg>
          <span>Decyzja w 24h</span>
        </div>
        <div class="trust-strip__item">
          <svg class="trust-strip__icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
          </svg>
          <span>Bez prowizji</span>
        </div>
        <div class="trust-strip__item">
          <svg class="trust-strip__icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M9 12l2 2 4-4"/><path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"/>
          </svg>
          <span>Każda sytuacja prawna</span>
        </div>
        <div class="trust-strip__item">
          <svg class="trust-strip__icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
          </svg>
          <span>Bezpłatna wycena</span>
        </div>
      </div>
    </section>
```

- [ ] **Step 2: Dodaj style trust-strip do `styles.css`**

```css
/* ============================================
   Trust strip
   ============================================ */

.trust-strip {
  background: var(--color-bg-alt);
  padding: 24px 0;
  border-bottom: 1px solid var(--color-border);
}

.trust-strip__inner {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 16px 32px;
}

.trust-strip__item {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-sans);
  font-size: 15px;
  font-weight: 600;
  color: var(--color-text);
}

.trust-strip__icon {
  color: var(--color-accent);
  flex-shrink: 0;
}

@media (max-width: 640px) {
  .trust-strip__inner {
    justify-content: flex-start;
  }
  .trust-strip__item {
    font-size: 14px;
    flex: 1 0 calc(50% - 16px);
  }
}
```

- [ ] **Step 3: Otwórz w przeglądarce**

```bash
open index.html
```

Expected: pasek pod heroem, biały tło, 4 elementy w poziomie z szałwiowymi ikonami i tekstem.

- [ ] **Step 4: Commit**

```bash
git add index.html assets/css/styles.css
git commit -m "feat: add trust strip with key value props under hero"
```

---

## Task 9: Sekcja "Co skupujemy" (3 karty: Działki / Domy / Mieszkania)

**Files:**
- Modify: `index.html`
- Modify: `assets/css/styles.css`

- [ ] **Step 1: Dodaj sekcję w `<main>`**

```html
    <section class="section properties" id="co-skupujemy">
      <div class="container">
        <div class="section-header">
          <p class="eyebrow">Co skupujemy</p>
          <h2 class="section-header__title">Działki, domy, mieszkania.</h2>
          <p class="section-header__lead">Każdy typ nieruchomości, w każdym stanie technicznym i prawnym.</p>
        </div>

        <div class="properties__grid">

          <article class="property-card property-card--featured">
            <div class="property-card__icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M3 21h18M3 21l3-7h12l3 7M6 14V8h12v6"/>
                <path d="M9 8V5h6v3"/>
              </svg>
            </div>
            <h3 class="property-card__title">Działki</h3>
            <p class="property-card__desc">Działki budowlane, rolne, leśne, z warunkami zabudowy lub bez. Skupujemy też nieruchomości w trakcie procedur planistycznych.</p>
            <ul class="property-card__list">
              <li>Budowlane i siedliskowe</li>
              <li>Rolne i leśne</li>
              <li>Z warunkami zabudowy</li>
              <li>W procedurach</li>
            </ul>
          </article>

          <article class="property-card">
            <div class="property-card__icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M3 12L12 3l9 9"/>
                <path d="M5 10v10h14V10"/>
                <path d="M10 20v-6h4v6"/>
              </svg>
            </div>
            <h3 class="property-card__title">Domy</h3>
            <p class="property-card__desc">Domy w każdym stanie — od nowych po wymagające gruntownego remontu. Skupujemy też nieruchomości w trakcie budowy.</p>
            <ul class="property-card__list">
              <li>Wykończone i do remontu</li>
              <li>W trakcie budowy</li>
              <li>Bliźniaki, szeregowce</li>
              <li>Z działką lub bez</li>
            </ul>
          </article>

          <article class="property-card">
            <div class="property-card__icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <line x1="3" y1="9" x2="21" y2="9"/>
                <line x1="3" y1="15" x2="21" y2="15"/>
                <line x1="9" y1="3" x2="9" y2="21"/>
                <line x1="15" y1="3" x2="15" y2="21"/>
              </svg>
            </div>
            <h3 class="property-card__title">Mieszkania</h3>
            <p class="property-card__desc">Wszystkie metraże, każda dzielnica, każda kondygnacja. Kawalerki, dwupokojowe, rodzinne, z balkonem lub bez.</p>
            <ul class="property-card__list">
              <li>Każdy metraż</li>
              <li>Każda dzielnica</li>
              <li>Spółdzielcze i własnościowe</li>
              <li>Z lokatorami lub puste</li>
            </ul>
          </article>

        </div>
      </div>
    </section>
```

- [ ] **Step 2: Dodaj style do `styles.css`**

```css
/* ============================================
   Section header (reusable)
   ============================================ */

.section-header {
  text-align: center;
  max-width: 720px;
  margin: 0 auto 56px;
}

.section-header__title {
  margin-top: 12px;
  margin-bottom: 16px;
}

.section-header__lead {
  font-size: 18px;
  color: var(--color-text-muted);
  line-height: 1.6;
}

@media (max-width: 768px) {
  .section-header {
    margin-bottom: 40px;
  }
  .section-header__lead {
    font-size: 16px;
  }
}

/* ============================================
   Properties (Co skupujemy)
   ============================================ */

.properties__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

@media (max-width: 1024px) {
  .properties__grid {
    grid-template-columns: 1fr;
    max-width: 520px;
    margin: 0 auto;
  }
}

.property-card {
  background: var(--color-bg-alt);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 32px 28px;
  transition: transform var(--transition-base), box-shadow var(--transition-base);
}

.property-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px var(--color-shadow);
}

.property-card--featured {
  border-color: var(--color-accent);
  border-width: 2px;
  background: linear-gradient(180deg, var(--color-accent-soft) 0%, var(--color-bg-alt) 50%);
}

.property-card__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  background: var(--color-accent-soft);
  color: var(--color-accent);
  border-radius: var(--radius-md);
  margin-bottom: 20px;
}

.property-card--featured .property-card__icon {
  background: var(--color-accent);
  color: var(--color-bg-alt);
}

.property-card__title {
  margin-bottom: 12px;
  font-size: 22px;
}

.property-card__desc {
  margin-bottom: 16px;
  font-size: 15px;
}

.property-card__list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.property-card__list li {
  font-size: 14px;
  color: var(--color-text-muted);
  padding-left: 18px;
  position: relative;
}

.property-card__list li::before {
  content: "✓";
  position: absolute;
  left: 0;
  color: var(--color-accent);
  font-weight: 700;
}
```

- [ ] **Step 3: Otwórz w przeglądarce**

```bash
open index.html
```

Expected: 3 karty w siatce, "Działki" wyróżniona szałwiowym borderem i gradientowym tłem. Hover unosi karty.

- [ ] **Step 4: Commit**

```bash
git add index.html assets/css/styles.css
git commit -m "feat: add 'co skupujemy' section with property type cards"
```

---

## Task 10: Sekcja "Jak to działa" (3 kroki)

**Files:**
- Modify: `index.html`
- Modify: `assets/css/styles.css`

- [ ] **Step 1: Dodaj sekcję w `<main>`**

```html
    <section class="section process" id="jak-to-dziala">
      <div class="container">
        <div class="section-header">
          <p class="eyebrow">Jak to działa</p>
          <h2 class="section-header__title">Trzy proste kroki.</h2>
          <p class="section-header__lead">Bez biurokracji, bez wizyt w bankach, bez ukrytych opłat.</p>
        </div>

        <div class="process__steps">

          <div class="process-step">
            <div class="process-step__number">01</div>
            <h3 class="process-step__title">Kontakt</h3>
            <p class="process-step__desc">
              Wypełniasz formularz lub dzwonisz pod <a href="tel:+48500441500">500 441 500</a>. Mówisz nam podstawowe informacje o nieruchomości.
            </p>
          </div>

          <div class="process-step">
            <div class="process-step__number">02</div>
            <h3 class="process-step__title">Wycena</h3>
            <p class="process-step__desc">
              W ciągu 24 godzin przedstawiamy bezpłatną, niezobowiązującą wycenę. Decyzja należy do Ciebie.
            </p>
          </div>

          <div class="process-step">
            <div class="process-step__number">03</div>
            <h3 class="process-step__title">Umowa u notariusza</h3>
            <p class="process-step__desc">
              Spotykamy się u notariusza. Dokumenty bierzemy na siebie. Otrzymujesz pieniądze tego samego dnia.
            </p>
          </div>

        </div>
      </div>
    </section>
```

- [ ] **Step 2: Dodaj style do `styles.css`**

```css
/* ============================================
   Process (Jak to działa)
   ============================================ */

.process {
  background: var(--color-bg-alt);
}

.process__steps {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  position: relative;
}

@media (max-width: 1024px) {
  .process__steps {
    grid-template-columns: 1fr;
    max-width: 520px;
    margin: 0 auto;
    gap: 40px;
  }
}

.process-step {
  position: relative;
  padding: 8px;
}

.process-step__number {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 80px;
  font-weight: 400;
  color: var(--color-accent);
  opacity: 0.18;
  line-height: 1;
  margin-bottom: 8px;
}

.process-step__title {
  font-size: 26px;
  margin-bottom: 12px;
  color: var(--color-text);
}

.process-step__desc {
  font-size: 16px;
  color: var(--color-text-muted);
  line-height: 1.6;
  max-width: 360px;
}

.process-step__desc a {
  color: var(--color-accent);
  font-weight: 600;
}
```

- [ ] **Step 3: Otwórz w przeglądarce**

```bash
open index.html
```

Expected: 3 kroki w poziomie, duże szałwiowe półprzezroczyste cyfry "01/02/03", tytuły, krótkie opisy. Sekcja na białym tle.

- [ ] **Step 4: Commit**

```bash
git add index.html assets/css/styles.css
git commit -m "feat: add 'jak to działa' three-step process section"
```

---

## Task 11: Sekcja "Dlaczego nas wybierają" (6 USP w siatce)

**Files:**
- Modify: `index.html`
- Modify: `assets/css/styles.css`

- [ ] **Step 1: Dodaj sekcję w `<main>`**

```html
    <section class="section benefits" id="dlaczego-my">
      <div class="container">
        <div class="section-header">
          <p class="eyebrow">Dlaczego nas wybierają</p>
          <h2 class="section-header__title">Konkret, nie obietnice.</h2>
        </div>

        <div class="benefits__grid">

          <div class="benefit">
            <div class="benefit__icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </div>
            <h3 class="benefit__title">Decyzja w 24 godziny</h3>
            <p class="benefit__desc">Wiesz dokładnie kiedy i ile dostaniesz — nie czekasz tygodniami.</p>
          </div>

          <div class="benefit">
            <div class="benefit__icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            </div>
            <h3 class="benefit__title">Bez prowizji</h3>
            <p class="benefit__desc">Cena, którą uzgodnimy, to cena, którą otrzymasz. Zero ukrytych opłat.</p>
          </div>

          <div class="benefit">
            <div class="benefit__icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>
            </div>
            <h3 class="benefit__title">Bez pośredników</h3>
            <p class="benefit__desc">Rozmawiasz bezpośrednio z kupującym. Bez agentów, bez dodatkowych marż.</p>
          </div>

          <div class="benefit">
            <div class="benefit__icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M9 14l2 2 4-4"/></svg>
            </div>
            <h3 class="benefit__title">Każda sytuacja prawna</h3>
            <p class="benefit__desc">Hipoteka, zadłużenie, spadek, współwłasność, służebność — to nie problem.</p>
          </div>

          <div class="benefit">
            <div class="benefit__icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
            </div>
            <h3 class="benefit__title">Bezpłatna wycena</h3>
            <p class="benefit__desc">Wycena nie kosztuje nic i do niczego nie zobowiązuje. Decyzję podejmujesz Ty.</p>
          </div>

          <div class="benefit">
            <div class="benefit__icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            </div>
            <h3 class="benefit__title">Pełna dyskrecja</h3>
            <p class="benefit__desc">Twoja sytuacja zostaje między nami. Bez sąsiadów, bez tabliczek "na sprzedaż".</p>
          </div>

        </div>
      </div>
    </section>
```

- [ ] **Step 2: Dodaj style do `styles.css`**

```css
/* ============================================
   Benefits (Dlaczego nas wybierają)
   ============================================ */

.benefits__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px 40px;
}

@media (max-width: 1024px) {
  .benefits__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .benefits__grid {
    grid-template-columns: 1fr;
    max-width: 480px;
    margin: 0 auto;
  }
}

.benefit {
  display: flex;
  flex-direction: column;
}

.benefit__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: var(--color-accent-soft);
  color: var(--color-accent);
  border-radius: var(--radius-md);
  margin-bottom: 16px;
}

.benefit__title {
  font-size: 18px;
  margin-bottom: 8px;
  font-weight: 600;
}

.benefit__desc {
  font-size: 15px;
  color: var(--color-text-muted);
  line-height: 1.6;
}
```

- [ ] **Step 3: Otwórz w przeglądarce**

```bash
open index.html
```

Expected: siatka 3x2 z 6 USP, każdy z ikoną, tytułem i opisem.

- [ ] **Step 4: Commit**

```bash
git add index.html assets/css/styles.css
git commit -m "feat: add benefits grid with six USPs"
```

---

## Task 12: Sekcja "Opinie" (testimonials — 3 placeholder cytaty)

**Files:**
- Modify: `index.html`
- Modify: `assets/css/styles.css`

> **Uwaga:** Cytaty są placeholderami. Przed publikacją produkcyjną wymienić na prawdziwe (lub sformułowane na podstawie rozmów z klientami). Dodaj komentarz do README.

- [ ] **Step 1: Dodaj sekcję w `<main>`**

```html
    <section class="section testimonials" id="opinie">
      <div class="container">
        <div class="section-header">
          <p class="eyebrow">Opinie</p>
          <h2 class="section-header__title">Co mówią ci, którym pomogliśmy.</h2>
        </div>

        <div class="testimonials__grid">

          <!-- TODO: wymień na prawdziwe opinie przed publikacją produkcyjną -->
          <figure class="testimonial">
            <blockquote class="testimonial__quote">
              "Po śmierci taty zostałam z domem w spadku, którego nie potrzebowałam. Załatwili wszystko w tydzień, bez stresu i bez papierologii. Polecam każdemu w podobnej sytuacji."
            </blockquote>
            <figcaption class="testimonial__author">
              <div class="testimonial__name">Anna</div>
              <div class="testimonial__context">Białystok · sprzedaż domu po spadku</div>
            </figcaption>
          </figure>

          <figure class="testimonial">
            <blockquote class="testimonial__quote">
              "Działka rolna stała pusta od lat, a płaciłem podatki. Wycena następnego dnia, a tydzień później pieniądze na koncie. Bez prowizji, dokładnie tak jak obiecali."
            </blockquote>
            <figcaption class="testimonial__author">
              <div class="testimonial__name">Marek</div>
              <div class="testimonial__context">Choroszcz · sprzedaż działki rolnej</div>
            </figcaption>
          </figure>

          <figure class="testimonial">
            <blockquote class="testimonial__quote">
              "Mieszkanie z hipoteką po rozwodzie — myślałam, że nikt nie będzie chciał. Pomogli załatwić wszystko z bankiem, kupili w cenie, którą uzgodniliśmy."
            </blockquote>
            <figcaption class="testimonial__author">
              <div class="testimonial__name">Katarzyna</div>
              <div class="testimonial__context">Białystok · sprzedaż mieszkania z hipoteką</div>
            </figcaption>
          </figure>

        </div>
      </div>
    </section>
```

- [ ] **Step 2: Dodaj style do `styles.css`**

```css
/* ============================================
   Testimonials
   ============================================ */

.testimonials {
  background: linear-gradient(180deg, var(--color-bg) 0%, var(--color-bg-warm-light) 100%);
}

.testimonials__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
}

@media (max-width: 1024px) {
  .testimonials__grid {
    grid-template-columns: 1fr;
    max-width: 640px;
    margin: 0 auto;
  }
}

.testimonial {
  background: var(--color-bg-alt);
  border-radius: var(--radius-lg);
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  box-shadow: 0 4px 16px var(--color-shadow);
  position: relative;
}

.testimonial::before {
  content: "\201C";  /* Lewy cudzysłów dolny — Unicode escape, bezpieczne dla każdego encodingu */
  position: absolute;
  top: 4px;
  left: 20px;
  font-family: var(--font-serif);
  font-size: 80px;
  color: var(--color-accent);
  opacity: 0.2;
  line-height: 1;
  font-style: italic;
}

.testimonial__quote {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 17px;
  line-height: 1.6;
  color: var(--color-text);
  position: relative;
  z-index: 1;
}

.testimonial__author {
  border-top: 1px solid var(--color-border);
  padding-top: 16px;
}

.testimonial__name {
  font-family: var(--font-sans);
  font-weight: 600;
  font-size: 15px;
  color: var(--color-text);
}

.testimonial__context {
  font-size: 13px;
  color: var(--color-text-muted);
  margin-top: 2px;
}
```

- [ ] **Step 3: Otwórz w przeglądarce**

```bash
open index.html
```

Expected: 3 karty z cytatami w italic Fraunces, dekoracyjny duży cudzysłów w lewym górnym rogu każdej karty.

- [ ] **Step 4: Commit**

```bash
git add index.html assets/css/styles.css
git commit -m "feat: add testimonials section with placeholder quotes"
```

---

## Task 13: FAQ accordion (HTML + JS)

**Files:**
- Modify: `index.html` (sekcja FAQ)
- Modify: `assets/css/styles.css`
- Create: `assets/js/ui.js` (logika accordion + smooth scroll + fade-in placeholders)

- [ ] **Step 1: Dodaj sekcję FAQ w `<main>`**

```html
    <section class="section faq" id="faq">
      <div class="container faq__container">
        <div class="section-header">
          <p class="eyebrow">Najczęstsze pytania</p>
          <h2 class="section-header__title">Wszystko, co warto wiedzieć.</h2>
        </div>

        <div class="faq__list">

          <details class="faq-item">
            <summary class="faq-item__question">
              <span>Czy wycena jest naprawdę bezpłatna?</span>
              <span class="faq-item__icon" aria-hidden="true"></span>
            </summary>
            <div class="faq-item__answer">
              <p>Tak. Wycena jest całkowicie bezpłatna i niezobowiązująca. Nawet jeśli zdecydujesz się nie sprzedawać — nie ponosisz żadnych kosztów. Nie ma "ukrytych opłat", "kosztów wstępnych" ani "kosztów konsultacji".</p>
            </div>
          </details>

          <details class="faq-item">
            <summary class="faq-item__question">
              <span>Ile trwa cały proces?</span>
              <span class="faq-item__icon" aria-hidden="true"></span>
            </summary>
            <div class="faq-item__answer">
              <p>Wycenę przedstawiamy w ciągu 24 godzin od zgłoszenia. Jeśli akceptujesz cenę, finalizacja u notariusza zazwyczaj zajmuje od 3 do 14 dni — w zależności od stanu prawnego i dostępności dokumentów.</p>
            </div>
          </details>

          <details class="faq-item">
            <summary class="faq-item__question">
              <span>Czy skupujecie nieruchomości z hipoteką lub zadłużeniem?</span>
              <span class="faq-item__icon" aria-hidden="true"></span>
            </summary>
            <div class="faq-item__answer">
              <p>Tak. Hipoteka, zadłużenie wobec banku, komornika lub innych wierzycieli — wszystko to potrafimy obsłużyć. Spłacamy zobowiązania bezpośrednio z ceny zakupu, więc nie musisz nic załatwiać.</p>
            </div>
          </details>

          <details class="faq-item">
            <summary class="faq-item__question">
              <span>Jakie dokumenty są potrzebne?</span>
              <span class="faq-item__icon" aria-hidden="true"></span>
            </summary>
            <div class="faq-item__answer">
              <p>Na początek — żadne. Wycenę zrobimy na podstawie tego, co napiszesz w formularzu lub powiesz przez telefon. Pełną dokumentację (akt notarialny, księga wieczysta, wypis z rejestru gruntów) zbieramy razem przed wizytą u notariusza. Pomagamy w jej zdobyciu.</p>
            </div>
          </details>

          <details class="faq-item">
            <summary class="faq-item__question">
              <span>Co jeśli nieruchomość jest w bardzo złym stanie?</span>
              <span class="faq-item__icon" aria-hidden="true"></span>
            </summary>
            <div class="faq-item__answer">
              <p>Skupujemy w każdym stanie. Dom do generalnego remontu, mieszkanie z zalanymi sufitami, działka zarośnięta — to dla nas nie problem. Stan wpływa oczywiście na cenę, ale nie wyklucza transakcji.</p>
            </div>
          </details>

          <details class="faq-item">
            <summary class="faq-item__question">
              <span>Czy można sprzedać udział we współwłasności?</span>
              <span class="faq-item__icon" aria-hidden="true"></span>
            </summary>
            <div class="faq-item__answer">
              <p>Tak. Możemy odkupić Twój udział nawet jeśli pozostali współwłaściciele nie chcą sprzedawać. Mamy doświadczenie w obsłudze takich transakcji i potrafimy je przeprowadzić zgodnie z prawem.</p>
            </div>
          </details>

          <details class="faq-item">
            <summary class="faq-item__question">
              <span>Czy płacicie gotówką czy przelewem?</span>
              <span class="faq-item__icon" aria-hidden="true"></span>
            </summary>
            <div class="faq-item__answer">
              <p>Standardowo płacimy przelewem bankowym tego samego dnia, w którym podpisujemy akt notarialny. Środki są przelewane natychmiast przez system Express Elixir, więc trafiają na Twoje konto w ciągu kilku minut.</p>
            </div>
          </details>

          <details class="faq-item">
            <summary class="faq-item__question">
              <span>Czy oferta jest niezobowiązująca?</span>
              <span class="faq-item__icon" aria-hidden="true"></span>
            </summary>
            <div class="faq-item__answer">
              <p>W 100% tak. Wycena to tylko propozycja — możesz ją odrzucić bez żadnych konsekwencji. Nie podpisujesz żadnej umowy do momentu wizyty u notariusza. Decyzja należy wyłącznie do Ciebie.</p>
            </div>
          </details>

        </div>
      </div>
    </section>
```

- [ ] **Step 2: Dodaj style FAQ do `styles.css`**

```css
/* ============================================
   FAQ
   ============================================ */

.faq__container {
  max-width: 800px;
}

.faq__list {
  display: flex;
  flex-direction: column;
  gap: 0;
  border-top: 1px solid var(--color-border);
}

.faq-item {
  border-bottom: 1px solid var(--color-border);
}

.faq-item__question {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 24px 4px;
  cursor: pointer;
  font-family: var(--font-sans);
  font-size: 17px;
  font-weight: 600;
  color: var(--color-text);
  list-style: none;
  transition: color var(--transition-fast);
}

.faq-item__question::-webkit-details-marker {
  display: none;
}

.faq-item__question:hover {
  color: var(--color-accent);
}

.faq-item__icon {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  position: relative;
  transition: transform var(--transition-base);
}

.faq-item__icon::before,
.faq-item__icon::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 14px;
  height: 2px;
  background: var(--color-accent);
  transform: translate(-50%, -50%);
  border-radius: 2px;
}

.faq-item__icon::after {
  transform: translate(-50%, -50%) rotate(90deg);
  transition: transform var(--transition-base);
}

.faq-item[open] .faq-item__icon::after {
  transform: translate(-50%, -50%) rotate(0);
}

.faq-item__answer {
  padding: 0 4px 24px;
  animation: fadeInDown 0.3s ease;
}

.faq-item__answer p {
  font-size: 15px;
  line-height: 1.7;
  color: var(--color-text-muted);
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

- [ ] **Step 3: Utwórz `assets/js/ui.js` (na razie tylko skeleton — accordion działa natywnie przez `<details>`)**

```js
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
```

- [ ] **Step 4: Dodaj `<script src="/assets/js/ui.js">` w `index.html` (przed `</body>`, po form.js)**

```html
  <script src="/assets/js/config.js"></script>
  <script src="/assets/js/form.js"></script>
  <script src="/assets/js/ui.js"></script>
</body>
```

- [ ] **Step 5: Otwórz w przeglądarce i przetestuj**

```bash
open index.html
```

Expected:
- FAQ — 8 pytań w accordion. Klik rozwija odpowiedź, ikona `+` rotuje do `×`.
- Klik "Bezpłatna wycena ↓" w hero — smooth scroll do formularza, z offsetem na sticky header (formularz nie ginie pod nagłówkiem).
- Klik linku "500 441 500" w opisie kroku 1 — inicjuje połączenie na mobile.

- [ ] **Step 6: Commit**

```bash
git add index.html assets/css/styles.css assets/js/ui.js
git commit -m "feat: add FAQ accordion section and smooth scroll"
```

---

## Task 14: CTA section + Footer

**Files:**
- Modify: `index.html`
- Modify: `assets/css/styles.css`

- [ ] **Step 1: Dodaj sekcję CTA + footer w `<body>` (po wszystkich sekcjach `<main>`)**

```html
    <section class="section final-cta">
      <div class="container final-cta__inner">
        <h2 class="final-cta__title">
          <!-- city -->Masz nieruchomość do sprzedania w&nbsp;Białymstoku?
        </h2>
        <p class="final-cta__subtitle">
          Skontaktuj się z nami — wycena w 24 godziny, bez zobowiązań, bez prowizji.
        </p>
        <div class="final-cta__buttons">
          <a href="#formularz" class="btn btn--primary">Bezpłatna wycena ↓</a>
          <a href="tel:+48500441500" class="btn btn--secondary">📞 500 441 500</a>
        </div>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <div class="container site-footer__inner">
      <div class="site-footer__brand">
        <div class="site-footer__name">Nowy Rozdział</div>
        <p class="site-footer__tagline"><!-- city -->Skup nieruchomości w Białymstoku</p>
      </div>

      <div class="site-footer__contact">
        <a href="tel:+48500441500" class="site-footer__link">📞 500 441 500</a>
        <a href="mailto:info@nowyrozdzial.pl" class="site-footer__link">info@nowyrozdzial.pl</a>
      </div>

      <div class="site-footer__legal">
        <a href="/polityka-prywatnosci.html" class="site-footer__link">Polityka prywatności</a>
      </div>
    </div>

    <div class="container site-footer__bottom">
      <p>© <span id="footerYear">2026</span> Nowy Rozdział. Wszystkie prawa zastrzeżone.</p>
    </div>
  </footer>
```

- [ ] **Step 2: Dodaj style do `styles.css`**

```css
/* ============================================
   Final CTA
   ============================================ */

.final-cta {
  background: linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent-hover) 100%);
  color: var(--color-bg-alt);
  text-align: center;
}

.final-cta__inner {
  max-width: 720px;
  margin: 0 auto;
}

.final-cta__title {
  color: var(--color-bg-alt);
  margin-bottom: 16px;
}

.final-cta__subtitle {
  font-size: 18px;
  color: rgba(250, 247, 242, 0.85);
  margin-bottom: 32px;
  line-height: 1.6;
}

.final-cta__buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
}

.final-cta .btn--primary {
  background: var(--color-bg-alt);
  color: var(--color-accent);
}

.final-cta .btn--primary:hover {
  background: var(--color-bg);
  color: var(--color-accent-hover);
}

.final-cta .btn--secondary {
  border-color: var(--color-bg-alt);
  color: var(--color-bg-alt);
}

.final-cta .btn--secondary:hover {
  background: rgba(250, 247, 242, 0.1);
  color: var(--color-bg-alt);
}

@media (max-width: 480px) {
  .final-cta__buttons {
    flex-direction: column;
  }
  .final-cta .btn {
    width: 100%;
  }
}

/* ============================================
   Site footer
   ============================================ */

.site-footer {
  background: var(--color-text);
  color: var(--color-bg);
  padding: 48px 0 24px;
}

.site-footer__inner {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr;
  gap: 32px;
  align-items: start;
  padding-bottom: 32px;
  border-bottom: 1px solid rgba(250, 247, 242, 0.1);
}

@media (max-width: 768px) {
  .site-footer__inner {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}

.site-footer__name {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 22px;
  margin-bottom: 4px;
}

.site-footer__tagline {
  font-size: 13px;
  color: rgba(250, 247, 242, 0.6);
}

.site-footer__contact,
.site-footer__legal {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.site-footer__link {
  color: var(--color-bg);
  font-size: 14px;
  opacity: 0.85;
  transition: opacity var(--transition-fast);
}

.site-footer__link:hover {
  opacity: 1;
  color: var(--color-bg);
}

.site-footer__bottom {
  padding-top: 24px;
  font-size: 12px;
  color: rgba(250, 247, 242, 0.5);
  text-align: center;
}
```

- [ ] **Step 3: Dodaj do `ui.js` aktualizację roku w stopce**

W `assets/js/ui.js`, na końcu IIFE (przed zamykającym `})();`) dodaj:

```js
  // ----- Footer year -----
  const yearEl = document.getElementById("footerYear");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
```

- [ ] **Step 4: Otwórz w przeglądarce**

```bash
open index.html
```

Expected:
- CTA na szałwiowym tle, biały tekst, kremowy primary button.
- Footer ciemny brąz, 3 kolumny (brand / kontakt / legal), copyright na dole z aktualnym rokiem.

- [ ] **Step 5: Commit**

```bash
git add index.html assets/css/styles.css assets/js/ui.js
git commit -m "feat: add final CTA section and site footer"
```

---

## Task 15: Floating call button (mobile only)

**Files:**
- Modify: `index.html` (dodaj `<a class="floating-call">` przed `</body>`)
- Modify: `assets/css/styles.css`
- Modify: `assets/js/ui.js` (logika pokazywania po scrollu poza hero)

- [ ] **Step 1: Dodaj button w `index.html` (po `</footer>`, przed scriptami)**

```html
  <a href="tel:+48500441500" class="floating-call" id="floatingCall" aria-label="Zadzwoń: 500 441 500" hidden>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  </a>
```

- [ ] **Step 2: Dodaj style do `styles.css`**

```css
/* ============================================
   Floating call button (mobile)
   ============================================ */

.floating-call {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 90;
  display: none;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  background: var(--color-accent);
  color: var(--color-bg-alt);
  border-radius: 50%;
  box-shadow: 0 8px 24px rgba(93, 109, 79, 0.4);
  transition: transform var(--transition-fast), box-shadow var(--transition-fast);
}

.floating-call:hover {
  transform: scale(1.05);
  background: var(--color-accent-hover);
  color: var(--color-bg-alt);
}

.floating-call.is-visible {
  display: inline-flex;
  animation: fadeInUp 0.4s ease;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (min-width: 1024px) {
  .floating-call {
    display: none !important;
  }
}
```

- [ ] **Step 3: Dodaj logikę pokazywania w `ui.js`**

Na końcu IIFE w `assets/js/ui.js`:

```js
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
```

- [ ] **Step 4: Otwórz w przeglądarce na mobile (DevTools responsive ≤1023px)**

```bash
open index.html
```

W DevTools przełącz na mobile (np. iPhone 14). Przewiń poza hero — szałwiowy okrągły przycisk z ikoną telefonu pojawia się w prawym dolnym rogu.

- [ ] **Step 5: Commit**

```bash
git add index.html assets/css/styles.css assets/js/ui.js
git commit -m "feat: add floating call button visible on mobile after scroll"
```

---

## Task 16: Cookie banner + Polityka prywatności

**Files:**
- Create: `polityka-prywatnosci.html`
- Modify: `assets/css/styles.css` (cookie banner + polityka)
- Modify: `assets/js/ui.js` (logika cookie banner)
- Modify: `index.html` (banner HTML)

- [ ] **Step 1: Utwórz `polityka-prywatnosci.html`**

```html
<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Polityka prywatności — Nowy Rozdział</title>
  <meta name="description" content="Polityka prywatności serwisu Nowy Rozdział — skup nieruchomości." />
  <meta name="robots" content="noindex" />
  <link rel="icon" type="image/svg+xml" href="/assets/favicon/favicon.svg" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;1,9..144,400&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/assets/css/reset.css" />
  <link rel="stylesheet" href="/assets/css/variables.css" />
  <link rel="stylesheet" href="/assets/css/styles.css" />
</head>
<body id="top">

  <header class="site-header">
    <div class="container site-header__inner">
      <a href="/" class="site-header__brand"><span class="site-header__brand-name">Nowy Rozdział</span></a>
      <a href="tel:+48500441500" class="site-header__phone">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
        <span class="site-header__phone-number">500 441 500</span>
      </a>
    </div>
  </header>

  <main class="legal">
    <div class="container legal__container">
      <p class="eyebrow">Dokument prawny</p>
      <h1 class="legal__title">Polityka prywatności</h1>
      <p class="legal__updated">Ostatnia aktualizacja: 16 kwietnia 2026</p>

      <section class="legal__section">
        <h2>1. Administrator danych</h2>
        <p>
          Administratorem Twoich danych osobowych jest <strong>Nowy Rozdział</strong> (dalej: "Administrator", "my").
        </p>
        <p>
          <em>Pełne dane firmy (NIP, adres siedziby) zostaną uzupełnione w najbliższym czasie. Aktualnie jedyną formą kontaktu jest:</em>
        </p>
        <ul>
          <li>Email: <a href="mailto:info@nowyrozdzial.pl">info@nowyrozdzial.pl</a></li>
          <li>Telefon: <a href="tel:+48500441500">500 441 500</a></li>
        </ul>
      </section>

      <section class="legal__section">
        <h2>2. Jakie dane zbieramy</h2>
        <p>Za pośrednictwem formularza kontaktowego zbieramy następujące dane:</p>
        <ul>
          <li>Imię</li>
          <li>Numer telefonu</li>
          <li>Adres email</li>
          <li>Typ nieruchomości (działka / dom / mieszkanie)</li>
          <li>Lokalizacja nieruchomości</li>
          <li>Opcjonalny opis nieruchomości i sytuacji</li>
          <li>Opcjonalna oczekiwana cena</li>
          <li>Opcjonalne zdjęcia nieruchomości</li>
        </ul>
      </section>

      <section class="legal__section">
        <h2>3. Cel i podstawa prawna przetwarzania</h2>
        <p>
          Twoje dane przetwarzamy <strong>wyłącznie</strong> w celu kontaktu z Tobą w sprawie przedstawienia bezpłatnej wyceny i ewentualnego zawarcia umowy zakupu nieruchomości.
        </p>
        <p>
          Podstawa prawna: art. 6 ust. 1 lit. b RODO (przetwarzanie niezbędne do podjęcia działań na żądanie osoby, której dane dotyczą, przed zawarciem umowy).
        </p>
      </section>

      <section class="legal__section">
        <h2>4. Czas przechowywania danych</h2>
        <p>
          Dane przechowujemy przez okres niezbędny do obsługi Twojego zgłoszenia, nie dłużej niż <strong>12 miesięcy</strong> od momentu kontaktu, chyba że dojdzie do zawarcia umowy — wtedy dane są przechowywane przez okres wymagany przepisami prawa (m.in. podatkowymi).
        </p>
      </section>

      <section class="legal__section">
        <h2>5. Komu udostępniamy dane</h2>
        <p>
          Twoje dane nie są przekazywane podmiotom trzecim w celach marketingowych. Możemy je powierzyć następującym kategoriom odbiorców:
        </p>
        <ul>
          <li>Dostawca usługi formularza (Web3Forms / SureSend Inc.) — w celu technicznej obsługi przesłania formularza.</li>
          <li>Notariusz, doradcy prawni — wyłącznie w przypadku zawierania umowy sprzedaży i wyłącznie w niezbędnym zakresie.</li>
        </ul>
      </section>

      <section class="legal__section">
        <h2>6. Twoje prawa</h2>
        <p>Masz prawo do:</p>
        <ul>
          <li>dostępu do swoich danych,</li>
          <li>sprostowania danych nieprawidłowych lub niekompletnych,</li>
          <li>usunięcia danych ("prawo do bycia zapomnianym"),</li>
          <li>ograniczenia przetwarzania,</li>
          <li>przenoszenia danych,</li>
          <li>wniesienia sprzeciwu wobec przetwarzania,</li>
          <li>wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych (uodo.gov.pl).</li>
        </ul>
        <p>
          Aby skorzystać z któregokolwiek z powyższych praw, napisz do nas: <a href="mailto:info@nowyrozdzial.pl">info@nowyrozdzial.pl</a>.
        </p>
      </section>

      <section class="legal__section">
        <h2>7. Pliki cookies</h2>
        <p>
          Strona używa wyłącznie technicznych plików cookies niezbędnych do jej działania. Nie używamy plików cookies marketingowych ani analitycznych bez Twojej zgody.
        </p>
        <p>
          W przyszłości, jeśli wprowadzimy narzędzia analityczne (np. Google Analytics), poprosimy Cię o osobną zgodę przez baner cookie.
        </p>
      </section>

      <section class="legal__section">
        <h2>8. Bezpieczeństwo</h2>
        <p>
          Stosujemy odpowiednie środki techniczne i organizacyjne, aby zapewnić bezpieczeństwo Twoich danych. Przesyłanie danych odbywa się szyfrowanym protokołem HTTPS.
        </p>
      </section>

      <p class="legal__back">
        <a href="/">← Wróć na stronę główną</a>
      </p>
    </div>
  </main>

  <footer class="site-footer">
    <div class="container site-footer__inner">
      <div class="site-footer__brand">
        <div class="site-footer__name">Nowy Rozdział</div>
        <p class="site-footer__tagline"><!-- city -->Skup nieruchomości w Białymstoku</p>
      </div>
      <div class="site-footer__contact">
        <a href="tel:+48500441500" class="site-footer__link">📞 500 441 500</a>
        <a href="mailto:info@nowyrozdzial.pl" class="site-footer__link">info@nowyrozdzial.pl</a>
      </div>
      <div class="site-footer__legal">
        <a href="/polityka-prywatnosci.html" class="site-footer__link">Polityka prywatności</a>
      </div>
    </div>
    <div class="container site-footer__bottom">
      <p>© <span id="footerYear">2026</span> Nowy Rozdział. Wszystkie prawa zastrzeżone.</p>
    </div>
  </footer>

  <script src="/assets/js/config.js"></script>
  <script src="/assets/js/ui.js"></script>
</body>
</html>
```

- [ ] **Step 2: Dodaj style strony prawnej do `styles.css`**

```css
/* ============================================
   Legal pages (polityka prywatności, etc.)
   ============================================ */

.legal {
  padding: 64px 0 80px;
}

.legal__container {
  max-width: 760px;
}

.legal__title {
  font-size: clamp(2rem, 4vw + 1rem, 3rem);
  font-style: italic;
  margin: 12px 0 8px;
}

.legal__updated {
  font-size: 14px;
  color: var(--color-text-muted);
  margin-bottom: 40px;
}

.legal__section {
  margin-bottom: 32px;
}

.legal__section h2 {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 24px;
  margin-bottom: 12px;
  color: var(--color-text);
}

.legal__section p,
.legal__section li {
  font-size: 16px;
  color: var(--color-text-muted);
  line-height: 1.7;
  margin-bottom: 12px;
}

.legal__section ul {
  margin-left: 24px;
  margin-bottom: 16px;
}

.legal__section li {
  list-style: disc;
  margin-bottom: 6px;
}

.legal__section a {
  color: var(--color-accent);
  text-decoration: underline;
}

.legal__back {
  margin-top: 48px;
  padding-top: 24px;
  border-top: 1px solid var(--color-border);
}

.legal__back a {
  color: var(--color-text-muted);
  font-size: 14px;
}
```

- [ ] **Step 3: Dodaj cookie banner w `index.html` (po `<a class="floating-call">`, przed scriptami)**

```html
  <div class="cookie-banner" id="cookieBanner" hidden>
    <div class="container cookie-banner__inner">
      <p class="cookie-banner__text">
        Ta strona używa wyłącznie technicznych plików cookies niezbędnych do jej działania. Szczegóły w <a href="/polityka-prywatnosci.html">polityce prywatności</a>.
      </p>
      <button type="button" class="btn btn--primary cookie-banner__btn" id="cookieAccept">Rozumiem</button>
    </div>
  </div>
```

- [ ] **Step 4: Dodaj style cookie banner do `styles.css`**

```css
/* ============================================
   Cookie banner
   ============================================ */

.cookie-banner {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 95;
  background: var(--color-text);
  color: var(--color-bg);
  padding: 16px 0;
  box-shadow: 0 -8px 24px rgba(0, 0, 0, 0.15);
  transform: translateY(100%);
  transition: transform var(--transition-slow);
}

.cookie-banner.is-visible {
  transform: translateY(0);
}

.cookie-banner__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.cookie-banner__text {
  font-size: 14px;
  color: rgba(250, 247, 242, 0.85);
  margin: 0;
}

.cookie-banner__text a {
  color: var(--color-bg);
  text-decoration: underline;
}

.cookie-banner__btn {
  flex-shrink: 0;
  padding: 10px 20px;
  font-size: 14px;
}

@media (max-width: 768px) {
  .cookie-banner__inner {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
    text-align: center;
  }
}
```

- [ ] **Step 5: Dodaj logikę cookie banner do `ui.js`**

Na końcu IIFE w `assets/js/ui.js`:

```js
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
```

- [ ] **Step 6: Otwórz w przeglądarce i przetestuj**

```bash
open index.html
```

Expected:
- Po krótkiej chwili (600ms) pojawia się ciemny banner cookies na dole.
- Klik "Rozumiem" — banner znika, w localStorage zapisany `nowy-rozdzial-cookie-accepted: "1"`.
- Po refresh banner się nie pokazuje.
- Klik na link "polityka prywatności" w bannerze — strona z polityką, ładnie sformatowana.

- [ ] **Step 7: Commit**

```bash
git add polityka-prywatnosci.html index.html assets/css/styles.css assets/js/ui.js
git commit -m "feat: add cookie banner and privacy policy page (RODO)"
```

---

## Task 17: Strona 404

**Files:**
- Create: `404.html`

- [ ] **Step 1: Utwórz `404.html`**

```html
<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Strona nie znaleziona — Nowy Rozdział</title>
  <meta name="robots" content="noindex" />
  <link rel="icon" type="image/svg+xml" href="/assets/favicon/favicon.svg" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;1,9..144,400&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/assets/css/reset.css" />
  <link rel="stylesheet" href="/assets/css/variables.css" />
  <link rel="stylesheet" href="/assets/css/styles.css" />
</head>
<body>
  <main class="thanks">
    <div class="container thanks__inner">
      <p class="eyebrow">Błąd 404</p>
      <h1 class="thanks__title">Nie znaleźliśmy tej strony.</h1>
      <p class="thanks__text">
        Wygląda na to, że strona, której szukasz, nie istnieje lub została przeniesiona.
      </p>
      <a href="/" class="btn btn--primary thanks__cta">Wróć na stronę główną</a>
      <p class="thanks__back">
        Lub zadzwoń: <a href="tel:+48500441500">500 441 500</a>
      </p>
    </div>
  </main>
</body>
</html>
```

- [ ] **Step 2: Otwórz w przeglądarce**

```bash
open 404.html
```

Expected: layout taki sam jak `dziekujemy.html`, ale z komunikatem 404.

- [ ] **Step 3: Commit**

```bash
git add 404.html
git commit -m "feat: add custom 404 page"
```

---

## Task 18: ui.js — fade-in animacje przy scrollu

**Files:**
- Modify: `assets/js/ui.js`
- Modify: `assets/css/styles.css`

- [ ] **Step 1: Dodaj klasy fade-in do `styles.css` (przed sekcją animations na końcu)**

```css
/* ============================================
   Scroll fade-in animations
   ============================================ */

.fade-in {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
  will-change: opacity, transform;
}

.fade-in.is-visible {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .fade-in {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
```

- [ ] **Step 2: Dodaj logikę IntersectionObserver do `ui.js`**

Na końcu IIFE:

```js
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
```

- [ ] **Step 3: Otwórz w przeglądarce**

```bash
open index.html
```

Expected: przy przewijaniu, sekcje płynnie się "wsuwają" od dołu z fadem. W DevTools → Rendering → "Emulate CSS prefers-reduced-motion: reduce" → animacje wyłączone.

- [ ] **Step 4: Commit**

```bash
git add assets/css/styles.css assets/js/ui.js
git commit -m "feat: add fade-in animations on scroll with reduced-motion support"
```

---

## Task 19: Konfiguracja deploy (Netlify) + robots/sitemap + README

**Files:**
- Create: `netlify.toml`
- Create: `robots.txt`
- Create: `sitemap.xml`
- Create: `README.md`

- [ ] **Step 1: Utwórz `netlify.toml`**

```toml
[build]
  publish = "."

[[redirects]]
  from = "/*"
  status = 404
  to = "/404.html"
  force = false

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "SAMEORIGIN"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "geolocation=(), microphone=(), camera=()"

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.html"
  [headers.values]
    Cache-Control = "public, max-age=0, must-revalidate"
```

- [ ] **Step 2: Utwórz `robots.txt`**

```
User-agent: *
Allow: /
Disallow: /dziekujemy.html

Sitemap: https://nowyrozdzial.pl/sitemap.xml
```

> Uwaga: produkcyjną domenę w `Sitemap:` wpisać po jej zakupie. Na MVP placeholder OK.

- [ ] **Step 3: Utwórz `sitemap.xml`**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://nowyrozdzial.pl/</loc>
    <lastmod>2026-04-16</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://nowyrozdzial.pl/polityka-prywatnosci.html</loc>
    <lastmod>2026-04-16</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
</urlset>
```

- [ ] **Step 4: Utwórz `README.md`**

```markdown
# Nowy Rozdział — Landing Page

Statyczna strona internetowa firmy "Nowy Rozdział" — skupu nieruchomości.
Pierwsze wdrożenie: Białystok.

## Stos technologiczny

- HTML5 + CSS3 (custom properties, grid, flexbox)
- Vanilla JavaScript (ES6+, brak frameworków, brak buildu)
- Google Fonts: Fraunces (serif) + Inter (sans-serif)
- Web3Forms (backend formularza — leady idą na email)
- Hosting: Netlify

## Lokalne uruchomienie

Otwórz `index.html` w przeglądarce. Albo (zalecane — działają wtedy ścieżki absolutne `/assets/...`):

```bash
python3 -m http.server 8080
# lub
npx serve .
```

Potem otwórz: http://localhost:8080

## Konfiguracja przed deployem

1. **Web3Forms key** — zarejestruj się na https://web3forms.com, w panelu skopiuj access key, wpisz w `assets/js/config.js` w polu `web3formsKey`. Whitelistuj swoją domenę produkcyjną.
2. **OG image** — wygeneruj `assets/img/og-image.jpg` 1200x630px z hasłem i nazwą miasta (np. w Figmie / Canvie).
3. **Domena** — zakup domeny, wpięcie w Netlify (Settings → Domain management).
4. **Sitemap** — w `sitemap.xml` zmień `https://nowyrozdzial.pl/` na docelową domenę.
5. **robots.txt** — zaktualizuj URL sitemap.

## Klonowanie pod nowe miasto

Strona została zaprojektowana tak, by łatwo postawić ją dla innego miasta (np. Olsztyn, Lublin).

**Krok po kroku:**

1. **Sklonuj projekt** do nowego folderu:
   ```bash
   git clone <repo> nowy-rozdzial-olsztyn
   cd nowy-rozdzial-olsztyn
   ```

2. **Edytuj `assets/js/config.js`:**
   - `city` — mianownik: `"Olsztyn"`
   - `cityGenitive` — dopełniacz: `"Olsztyna"` ("skup w **Olsztyna**" — używane w copy)
   - `cityLocative` — miejscownik: `"Olsztynie"` ("w **Olsztynie**" — używane w copy)
   - opcjonalnie: zmień `phone`, `phoneIntl`, `email`, `web3formsKey`

3. **Find&replace nazw miasta w plikach HTML:**
   Wszystkie miejsca z nazwą miasta są poprzedzone komentarzem `<!-- city -->`. Wykonaj:
   ```bash
   # Mianownik
   grep -rn "Białystok" --include="*.html"
   # Dopełniacz
   grep -rn "Białegostoku" --include="*.html"
   # Miejscownik
   grep -rn "Białymstoku" --include="*.html"
   ```
   Następnie zamień ręcznie (lub `sed` w terminalu):
   ```bash
   sed -i '' 's/Białystok/Olsztyn/g; s/Białegostoku/Olsztyna/g; s/Białymstoku/Olsztynie/g' index.html polityka-prywatnosci.html dziekujemy.html 404.html
   ```
   **Uwaga:** każdorazowo sprawdź wynik — czasem odmiana wymaga ręcznej korekty.

4. **Schema.org JSON-LD w `<head>` `index.html`:**
   Zmień `"areaServed": { "@type": "City", "name": "Białystok" }` na nazwę nowego miasta.

5. **`<meta name="geo.placename">`** — ustaw na nowe miasto.

6. **Wygeneruj nowy `og-image.jpg`** z hasłem i nazwą nowego miasta.

7. **Deploy** na nowy projekt Netlify, wpięcie nowej domeny.

## Struktura plików

```
.
├── index.html                  # Landing page
├── polityka-prywatnosci.html   # RODO
├── dziekujemy.html             # Po wysłaniu formularza
├── 404.html                    # Custom 404
├── netlify.toml                # Konfiguracja Netlify (headers, redirects)
├── robots.txt
├── sitemap.xml
├── assets/
│   ├── css/   {reset,variables,styles}.css
│   ├── js/    {config,form,ui}.js
│   ├── img/   {logo,og-image}
│   └── favicon/
└── docs/superpowers/  (spec + plan)
```

## Co jest do uzupełnienia (post-MVP)

- Dane firmy (NIP, adres) w `polityka-prywatnosci.html` (sekcja 1).
- Prawdziwe opinie klientów w `index.html` (sekcja `.testimonials__grid`).
- OG image w `assets/img/og-image.jpg`.
- Klucz Web3Forms.
- Analityka (GA4 / Plausible) z conversion event na submit formularza.
- Domena produkcyjna.

## Testowanie

- **Walidacja HTML:** https://validator.w3.org/
- **Schema.org JSON-LD:** https://validator.schema.org/
- **OpenGraph:** https://opengraph.xyz/
- **Lighthouse:** Chrome DevTools → Lighthouse → Generate report (cel: ≥95 we wszystkich kategoriach)
- **Mobile preview:** Chrome DevTools → Toggle device toolbar (iPhone, iPad, Android)
```

- [ ] **Step 5: Otwórz w przeglądarce i sprawdź czy README się renderuje (opcjonalnie — w VSCode preview)**

- [ ] **Step 6: Commit**

```bash
git add netlify.toml robots.txt sitemap.xml README.md
git commit -m "chore: add deploy config (Netlify), robots, sitemap, and README"
```

---

## Task 20: Polish, responsive QA, Lighthouse, accessibility

**Files:**
- Modify (jeśli potrzeba): `assets/css/styles.css`, `index.html`

- [ ] **Step 1: Uruchom lokalny server**

```bash
cd /Users/dawid/skup
python3 -m http.server 8080
```

W innym terminalu:

```bash
open http://localhost:8080
```

- [ ] **Step 2: Test responsive — Chrome DevTools**

W DevTools → Toggle device toolbar. Przejdź przez:
- **iPhone SE (375x667)** — najmniejszy popularny mobile.
- **iPhone 14 Pro (393x852)** — typowy mobile.
- **iPad Mini (768x1024)** — tablet.
- **iPad Pro (1024x1366)** — duży tablet / mały desktop.
- **Desktop 1280x800.**

Sprawdź:
- [ ] Brak poziomego scrolla na żadnym viewporcie.
- [ ] Wszystkie teksty czytelne (min 14px na mobile).
- [ ] Przyciski klikalne (min 44x44px touch target).
- [ ] Hero stack właściwie na mobile (treść nad formularzem).
- [ ] Trust strip nie łamie się brzydko na mobile (2x2 lub 4x1).
- [ ] Karty (properties, benefits) stack na 1 kolumnę.
- [ ] FAQ items czytelne, ikona +/× działa.
- [ ] Footer 3-kolumnowy → 1-kolumnowy.
- [ ] Floating call button widoczny po scrollu poza hero (mobile).

Jeśli coś się sypie — popraw w `styles.css`.

- [ ] **Step 3: Lighthouse audit**

W DevTools → Lighthouse → Mobile + wszystkie kategorie → Generate report.

Cel: ≥95 we wszystkich kategoriach (Performance, Accessibility, Best Practices, SEO).

**Częste problemy i fixy:**
- "Image elements do not have explicit width and height" → dodaj `width` i `height` do `<img>` jeśli używasz.
- "Links do not have a discernible name" → dodaj `aria-label`.
- "Background and foreground colors do not have a sufficient contrast ratio" → sprawdź paletę.
- "First Contentful Paint" wolny → sprawdź czy fonty mają `display=swap`.
- "Cumulative Layout Shift" wysoki → dodaj `font-display: swap` lub `size-adjust` w `@font-face` (przy Google Fonts już domyślnie OK).

Powtarzaj aż do ≥95 w każdej kategorii.

- [ ] **Step 4: Schema.org JSON-LD validator**

Otwórz https://validator.schema.org/, wklej URL `http://localhost:8080` (jeśli używasz tunelu) lub kod ze `<head>`.

Expected: 0 errors, 0 warnings.

- [ ] **Step 5: HTML validator**

Otwórz https://validator.w3.org/, podaj URL lub wklej HTML.

Expected: 0 errors. Warnings o `<details>` bez `name` są OK.

- [ ] **Step 6: Manualny test formularza (z prawdziwym kluczem Web3Forms)**

Jeśli masz już klucz:
1. Wpisz w `assets/js/config.js`.
2. Wypełnij formularz na lokalnym serwerze (ale Web3Forms wymaga whitelistowanej domeny — może odrzucić requesty z `localhost`. W takim wypadku test po pierwszym deployu).

- [ ] **Step 7: Test keyboard navigation**

Naciśnij `Tab` od początku strony — przejdź przez wszystkie interaktywne elementy. Sprawdź:
- [ ] Focus ring widoczny na każdym elemencie.
- [ ] Kolejność tab logiczna.
- [ ] Można rozwinąć FAQ Spacebar/Enter.
- [ ] Można wysłać formularz Enter.

Jeśli focus ring zbyt subtelny — dodaj globalnie do `styles.css`:

```css
:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

:focus:not(:focus-visible) {
  outline: none;
}
```

- [ ] **Step 8: Commit poprawek (jeśli były)**

```bash
git add -u
git commit -m "fix: responsive polish and accessibility improvements after QA"
```

Lub jeśli nic nie wymagało zmiany:

```bash
git commit --allow-empty -m "chore: QA pass complete - responsive, Lighthouse, accessibility verified"
```

---

## Task 21: Deploy do Netlify (preview)

**Files:** brak modyfikacji kodu — tylko deploy.

> **Wymagane:** użytkownik musi mieć konto Netlify (darmowe). Jeśli nie ma — zarejestruj się na https://app.netlify.com/signup.

- [ ] **Step 1: Zainstaluj Netlify CLI (jeśli nie ma)**

```bash
npm install -g netlify-cli
```

- [ ] **Step 2: Zaloguj się**

```bash
netlify login
```

Otworzy się przeglądarka z autoryzacją.

- [ ] **Step 3: Inicjuj nowy site**

```bash
cd /Users/dawid/skup
netlify init
```

Wybierz: "Create & configure a new site". Podaj nazwę (np. `nowy-rozdzial-bialystok`).

- [ ] **Step 4: Deploy preview**

```bash
netlify deploy
```

Wybierz: katalog publish = `.` (root).

Otworzy preview URL — sprawdź wszystko.

- [ ] **Step 5: Jeśli OK — deploy production**

```bash
netlify deploy --prod
```

URL produkcyjny: `https://<nazwa-site>.netlify.app`

- [ ] **Step 6: Test post-deploy**

Otwórz produkcyjny URL i:
- Wyślij testowo formularz (jeśli masz prawdziwy klucz Web3Forms i dodałeś domenę netlify.app do whitelisty Web3Forms).
- Sprawdź `tel:` linki (na telefonie).
- Lighthouse na produkcyjnym URL (Mobile + Desktop).

- [ ] **Step 7: Commit (jeśli zmiany w configu były)**

```bash
git add -u
git commit -m "chore: configure netlify deployment"
```

---

## Self-Review Checklist (do wykonania po napisaniu planu, przed handoff)

**Spec coverage:**
- Section 1 (kontekst, cele, USPs) → Tasks 4-14 implementują wszystkie sekcje strony.
- Section 2 (USPs) → Task 11 (benefits grid), Task 8 (trust strip).
- Section 3 (tech stack) → Tasks 1-2, 19, 21 (deploy).
- Section 4 (struktura sekcji) → Tasks 4-15 (każda sekcja = task).
- Section 5 (formularz) → Tasks 6, 7.
- Section 6 (system wizualny) → Task 2 (variables.css), pozostałe taski używają tokens.
- Section 7 (parametryzacja miasta) → Task 3 (config.js), README w Task 19.
- Section 8 (SEO + perf) → Task 2 (head meta + Schema), Task 19 (sitemap, robots), Task 20 (Lighthouse).
- Section 9 (RODO) → Task 16 (cookie banner + polityka).
- Section 10 (struktura plików) → Task 1 + zgodnie z planem.
- Section 11 (Definition of Done) → Task 20 weryfikuje.
- Section 12 (post-MVP) → README w Task 19 dokumentuje.

**Placeholder scan:** brak "TBD" / "TODO" w kodzie (tylko świadome komentarze "wymień przed publikacją" w testimonials i polityce — te są celowe).

**Type/name consistency:** klasy CSS używane w HTML pasują do tych zdefiniowanych w CSS. Selektory JS (`#leadForm`, `#cookieBanner`, `#floatingCall`, `#footerYear`, `#formAccessKey`, `#formFeedback`, `#formSubmit`, `#cookieAccept`, `#botcheck`) wszystkie dodane w odpowiednich taskach.

---

## Plan complete

Plan jest gotowy. Zapisany w `docs/superpowers/plans/2026-04-16-nowy-rozdzial-landing.md`.

**Dwie opcje wykonania:**

**1. Subagent-Driven (rekomendowana)** — ja dispatchuję świeży subagent per task, review między taskami, szybka iteracja.

**2. Inline Execution** — wykonujemy taski w tej sesji, batch z checkpointami do review.

Którą wybierasz?
