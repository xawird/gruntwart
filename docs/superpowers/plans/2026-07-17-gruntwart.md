# GruntWart — finalny one-pager — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Przebudować stronę na markę GruntWart wg finalnego one-pagera właściciela: menu kotwiczne, hero 58/42 z formularzem na karcie, 12 sekcji, FAQ ×10, mobile sticky bar, SEO pod gruntwart.pl.

**Architecture:** Statyczny stack bez zmian (HTML/CSS/JS, Netlify, Web3Forms). Jasny design system zostaje (biel/zieleń/serif) + nowy token starego złota. Cała treść i struktura sekcji z pliku spec — **jedyne źródło copy, używać verbatim**: `docs/superpowers/specs/2026-07-17-gruntwart-onepager.md` (dalej: SPEC).

**Tech Stack:** jak dotychczas. Zrzuty: chrome-headless-shell (`/Users/dawid/Library/Caches/ms-playwright/chromium_headless_shell-1217/chrome-headless-shell-mac-arm64/chrome-headless-shell --headless --disable-gpu --screenshot=OUT.png --window-size=W,H --hide-scrollbars --virtual-time-budget=3000 URL`); klikanie/konsola przez MCP playwright (jego screenshot nie działa).

## Global Constraints

- Copy verbatim ze SPEC (sekcje 1-12 + SEO). Decyzje wykonawcze ze SPEC (nagłówek pliku) obowiązują: brak danych rejestrowych, telefon 500 441 500, canonical/og https://gruntwart.pl/.
- Design: obecne tokeny + NOWE: `--color-gold: #B08D3E` (akcent rzadki: logo, drobne detale) — zero innych nowych kolorów; zakazy ze SPEC (żadnych czerwonych przycisków, pergaminu, średniowiecznych fontów).
- H1 = `Kupujemy działki miejskie i inwestycyjne w Białymstoku.` (JEDYNY H1); hasło „O dobrą cenę nie trzeba walczyć." wizualnie większe, ale nie-nagłówek (div/p z klasą). Hierarchia H2/H3 bez przeskoków.
- Zero CDN. Budżet < 100 KB. prefers-reduced-motion. Telefon `tel:+48500441500` / „500 441 500".
- Kontrakt form.js: #leadForm/#formAccessKey/#formSubmit/#formFeedback + window.SITE_CONFIG.web3formsKey zachowane. netlify.toml/robots.txt nietknięte.
- FAQ: identyczne stringi HTML ↔ FAQPage JSON-LD (10 par). Schema RealEstateAgent: name `GruntWart`, url `https://gruntwart.pl`, telefon bez zmian, areaServed = gminy ze SPEC sekcja 8 + Białystok.
- Weryfikacja każdego zadania: :8199 + zrzuty (OBEJRZEĆ), konsola czysta.
- Commity po polsku (`feat(gruntwart):`), NIE pushować.

---

### Task 1: Brand, nav kotwiczny, hero 58/42 z formularzem, pasek wiarygodności, SEO head, og-image

**Files:**
- Modify: `index.html` — head (SEO ze SPEC: title/meta/og/twitter/canonical na gruntwart.pl, theme-color zostaje #1E4D3B), header (logo GRUNTWART SVG z mieczem w „t" + podpis „Bezpośredni zakup gruntów", nav: 4 kotwice ze SPEC sekcja 1 + przycisk ZGŁOŚ DZIAŁKĘ → #zglos), hero (SPEC sekcja 2: lewa 58% tekst + rycerze przy lewej krawędzi, prawa 42% karta formularza id="zglos"), pasek wiarygodności (SPEC sekcja 3)
- Modify: `assets/js/form.js` — pola: plot (nr działki/lokalizacja, wymagane), area (opcjonalne), phone (wymagane, PHONE_REGEX), consent; USUNĄĆ walidację typu (radio znika)
- Modify: `assets/css/styles.css` — layout hero 58/42 (mobile: kolejność ze SPEC „WERSJA MOBILNA"), logo, nav kotwiczny, karta formularza, pasek wiarygodności, `--color-gold` w variables.css
- Modify: `assets/img/og-image.jpg` — nowy: jasny, „GruntWart" + „Skup działek Białystok" + hasło (headless shell + sips)

**Interfaces:**
- Produces: id `#zglos` (formularz w hero — cel WSZYSTKICH CTA), kotwice `#jakich-gruntow-szukamy`, `#jak-dzialamy`, `#o-nas`, `#kontakt` (sekcje docelowe powstają w Task 2 — linki mogą chwilowo nie mieć celu), logo SVG, klasa `.claim` (hasło wizualne).
- Rycerze: inline SVG line-art 2-3 sylwetki od tyłu (proste kontury: hełmy/kopie/tarcze), stroke w tonie ink-soft/gold z niską opacity, position przy lewej krawędzi za tekstem (nie pod tekstem!), `aria-hidden="true"`, ukryte < 768px.

- [ ] **Step 1:** Head SEO + canonical/og gruntwart.pl.
- [ ] **Step 2:** Header/logo/nav + hero (tekst i formularz verbatim ze SPEC sekcja 2) + rycerze SVG + pasek wiarygodności.
- [ ] **Step 3:** form.js (nowe pola, stara mechanika Web3Forms/inline errors/redirect bez zmian).
- [ ] **Step 4:** og-image.
- [ ] **Step 5:** Weryfikacja: zrzuty 1440+390 (formularz widoczny bez przewijania na desktop, mobile: hasło→info→formularz→telefon), formularz e2e (pusty → błędy plot/phone/consent; zły telefon; poprawne → oczekiwany błąd API placeholder), jeden H1, konsola czysta.
- [ ] **Step 6:** Commit `feat(gruntwart): brand, hero z formularzem i pasek wiarygodności`.

### Task 2: Sekcje 4-9 (grunty, proces, analiza, bezpośrednia, obszar, o nas)

**Files:**
- Modify: `index.html` — sekcje verbatim ze SPEC: 4 (5 kart + outro + przycisk SPRAWDŹ SWOJĄ DZIAŁKĘ → #zglos, id=jakich-gruntow-szukamy), 5 (5 kroków, id=jak-dzialamy), 6 (lista 11 pozycji), 7 (5 punktów), 8 (lista gmin + CTA → #zglos), 9 (o nas BEZ danych rejestrowych, id=o-nas, telefon w treści); USUNĄĆ stare sekcje z pivotu działkowego (cards-3/steps/why-grid/beyond-strip w starej treści)
- Modify: `assets/css/styles.css` — style nowych układów w duchu designu (karty, lista dwukolumnowa dla sekcji 6 na desktopie, kroki ×5)
- Modify: `assets/js/ui.js` — fadeTargets na nowe klasy sekcji

- [ ] **Step 1:** Sekcje 4-9 verbatim + ikony SVG w obecnym stylu (24px stroke currentColor).
- [ ] **Step 2:** ui.js selektory; usunięcie starego markupu.
- [ ] **Step 3:** Weryfikacja: zrzuty pełnej strony 1440+390 (obejrzeć), kotwice nav działają, konsola czysta.
- [ ] **Step 4:** Commit `feat(gruntwart): sekcje oferty, procesu i obszaru działania`.

### Task 3: FAQ ×10 + schema, końcowe CTA, stopka, mobile sticky bar, podstrony, sitemap, weryfikacja końcowa

**Files:**
- Modify: `index.html` — FAQ (SPEC sekcja 10: 10 par, `<details>`, pierwsze open) + FAQPage JSON-LD (byte-match) + RealEstateAgent (name GruntWart, url gruntwart.pl, areaServed: Białystok + 7 gmin ze SPEC), końcowe CTA (SPEC 11, hasło duże nie-nagłówek), stopka (SPEC 12, id=kontakt, bez NIP/KRS/adresu/e-maila), mobile sticky bar (2 przyciski ZADZWOŃ tel: / ZGŁOŚ DZIAŁKĘ #zglos, tylko <768px — ZASTĘPUJE call-fab)
- Modify: `dziekujemy.html` — rebrand GruntWart (logo/teksty/stopka; H1 `Zgłoszenie przyjęte.` + `Sprawdzimy działkę i skontaktujemy się z Tobą po wstępnej analizie.`), `404.html` + `polityka-prywatnosci.html` — rebrand nagłówka/stopki (treść prawna polityki: podmień markę/domenę tam gdzie występuje stara, reszta bez zmian)
- Modify: `sitemap.xml` — URL-e zostają na nowyrozdzial.pl? NIE: podmień domenę na https://gruntwart.pl/ + lastmod 2026-07-17 (spójnie z canonical)
- Modify: `assets/js/config.js` — brand: "GruntWart", tagline: "O dobrą cenę nie trzeba walczyć." (mechanizm bez zmian)

- [ ] **Step 1:** FAQ + schema (byte-match programowo, json.loads).
- [ ] **Step 2:** CTA końcowe + stopka + sticky bar (usuń .call-fab, dodaj pasek).
- [ ] **Step 3:** Podstrony + sitemap + config.js.
- [ ] **Step 4:** Weryfikacja końcowa: zrzuty 4 stron ×2 viewporty (obejrzeć), budżet <100 KB, formularz e2e, jeden H1/strona, JSON-LD parsuje + byte-match, konsola czysta ×4, grep za „Nowy Rozdział"/„nowyrozdzial" (dozwolone tylko: web3forms klucz placeholder i ewentualne komentarze historyczne — w widocznej treści ZERO).
- [ ] **Step 5:** Commit `feat(gruntwart): FAQ, CTA, stopka i rebrand podstron`.
