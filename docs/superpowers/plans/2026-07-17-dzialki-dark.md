# Pivot na skup działek + redesign dark — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Przeprofilować stronę na specjalistę od skupu działek (Białystok + okolice) w nowym kierunku wizualnym „inwestycyjny dark" z premium copy.

**Architecture:** Ta sama statyczna architektura (HTML/CSS/vanilla JS, Netlify, Web3Forms). Layoutowe klasy i struktura sekcji z poprzedniego redesignu zostają; wymieniamy paletę, typografię, grafiki, całą treść i typy w formularzu.

**Tech Stack:** HTML5, CSS custom properties, vanilla JS. Weryfikacja: serwer :8199 + Playwright MCP (klikanie) + chrome-headless-shell do zrzutów (MCP screenshot bywa zepsuty): `/Users/dawid/Library/Caches/ms-playwright/chromium_headless_shell-1217/chrome-headless-shell-mac-arm64/chrome-headless-shell --headless --disable-gpu --screenshot=OUT.png --window-size=W,H --hide-scrollbars --virtual-time-budget=3000 URL`.

**Spec:** `docs/superpowers/specs/2026-07-17-dzialki-dark-redesign-design.md`

## Global Constraints

- Zero CDN; fonty systemowe. Budżet < 100 KB na pierwsze załadowanie.
- Jeden H1; hierarchia H2/H3 bez przeskoków. `prefers-reduced-motion` respektowane.
- Telefon zawsze `tel:+48500441500`, wyświetlany „500 441 500".
- `window.SITE_CONFIG` (config.js), netlify.toml, robots.txt — nietknięte.
- Kontrast WCAG AA: tekst `#F2F3F0` na `#14171A`; na limonce `#D6F25F` zawsze ciemny tekst `#14171A` (nigdy biały).
- Kontrakt form.js: #leadForm/#formAccessKey/#formSubmit/#formFeedback zachowany.
- Weryfikacja każdego zadania: :8199 + zrzuty (headless shell), zero błędów w konsoli.
- Commity po polsku (`feat(dzialki):` / `fix(dzialki):`), NIE pushować.

## Design tokens (podmienić w variables.css — layoutowe zostają)

```css
:root {
  --color-bg: #14171A;           /* grafit */
  --color-surface: #1C2024;      /* karty, formularz */
  --color-surface-2: #22272C;    /* hover/wyróżnienie */
  --color-ink: #F2F3F0;          /* tekst główny */
  --color-ink-soft: #9AA3A7;     /* tekst pomocniczy */
  --color-accent: #D6F25F;       /* limonkowy marker */
  --color-accent-hover: #C4E43C;
  --color-on-accent: #14171A;    /* tekst na limonce */
  --color-line: #2A2F34;
  --color-error: #FF8A80;        /* czytelny na ciemnym */
  --font-head: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  --font-mono: ui-monospace, "SF Mono", Menlo, Consolas, monospace;
  --radius: 10px;
  --shadow-card: 0 1px 2px rgba(0,0,0,.4), 0 12px 32px rgba(0,0,0,.35);
  --container: 1120px;
  --fs-h1: clamp(2.6rem, 6vw, 4.6rem);
  --fs-h2: clamp(1.7rem, 3.2vw, 2.4rem);
  --fs-body: 1.0625rem;
  --lh-body: 1.6;
}
```

Nagłówki: `--font-head`, weight 800, `letter-spacing: -0.02em`, bez serifa (usunąć `--font-serif` i jego użycia). Eyebrows/liczby/etykiety: `--font-mono`, uppercase, `letter-spacing: .08em`, rozmiar .8125rem. Motyw mapy: subtelna siatka w hero (CSS background linear-gradient 1px linie `--color-line` co 48px, albo SVG), kontury parceli w limonce.

## Copy deck (teksty ostateczne — używać verbatim)

**Head SEO:**
- `<title>`: `Skup Działek Białystok — Gotówka w 24h | Nowy Rozdział`
- Meta description: `Skupujemy działki budowlane, zabudowane i inwestycyjne w Białymstoku i okolicach. Wycena w 24 h, 0 zł kosztów, gotówka u notariusza. Tel. 500 441 500.`
- og:title = title; og:description = meta description. theme-color `#14171A`.

**Hero:**
- Eyebrow (mono): `BIAŁYSTOK I OKOLICE · SKUP GRUNTÓW`
- H1: `Twoja działka ma dziś kupca.`
- Sub: `Skupujemy działki w Białymstoku i okolicach. Konkretna wycena w 24 godziny, gotówka przy akcie notarialnym.`
- CTA primary: `Poznaj wycenę w 24 h` (#wycena) · CTA ghost: `500 441 500` (tel:)
- Pasek liczb (mono, 3 pozycje): `24 h` / `wycena` · `14 dni` / `średnio do aktu` · `0 zł` / `kosztów po Twojej stronie`

**Formularz (H2: `Bezpłatna wycena w 24 godziny`):**
- Pola: Telefon* · `Adres lub numer działki` (placeholder `np. Białystok, ul. Ciołkowskiego / dz. 152/3`) · Typ nieruchomości (segmented radio: `Działka` / `Dom` / `Komercyjna`) — default zaznaczona: żadna, wymagane.
- Zgoda: `Akceptuję politykę prywatności i wyrażam zgodę na kontakt w sprawie wyceny.`
- Submit: `Wyślij — oddzwonimy w 24 h` · Dopisek: `Wycena jest bezpłatna i niezobowiązująca.`

**Co kupujemy (H2: `Kupujemy grunty w każdym stanie`):**
- Karta 1 `Działki budowlane`: `Z warunkami zabudowy, w planie miejscowym albo jeszcze bez dokumentów — potencjał sprawdzimy za Ciebie.`
- Karta 2 `Zabudowane do rozbiórki`: `Stary dom, pustostan, budynek po pożarze? Kupujemy grunt, rozbiórką zajmujemy się sami.`
- Karta 3 `Grunty inwestycyjne`: `Większe parcele pod usługi, magazyny i zabudowę wielorodzinną. Rozmawiamy też ze spółkami i wspólnotami.`
- Zasięg (pod kartami, mono-akcent): `Działamy w granicach Białegostoku i do ok. 20 km — m.in. Wasilków, Supraśl, Choroszcz, Juchnowiec, Zabłudów, Dobrzyniewo.`
- Pasek „poza gruntami" (wyciszony, jedna linia + link do formularza): `Poza gruntami kupujemy też domy i nieruchomości komercyjne — grunty to nasza specjalizacja, ale zadzwoń, porozmawiamy konkretnie.`

**Proces (H2: `Od zgłoszenia do gotówki w trzech krokach`):**
- 01 `Zgłoszenie` — `Adres lub numer działki — tyle wystarczy, by zacząć.`
- 02 `Wycena w 24 h` — `Analizujemy plan miejscowy, księgę wieczystą i otoczenie. Dostajesz kwotę, nie widełki.`
- 03 `Akt i przelew` — `Notariusza i formalności bierzemy na siebie. Pieniądze masz na koncie w dniu podpisania.`

**Dlaczego my (H2: `Dlaczego właściciele wybierają nas`):**
- `Kwota, nie widełki` — `Oferta to liczba na piśmie, ważna 14 dni. Bez negocjacji w ostatniej chwili.`
- `Każdy stan prawny` — `Spadek, współwłasność, hipoteka, brak drogi dojazdowej — rozwiązujemy to po naszej stronie.`
- `Zero kosztów` — `Notariusz, wypisy, geodeta — płacimy my. Od pierwszej rozmowy znasz kwotę „na rękę".`
- `Pełna dyskrecja` — `Bez ogłoszenia, bez tabliczki, bez telefonów od pośredników.`

**FAQ (H2: `Najczęstsze pytania` — te same stringi w HTML i FAQPage schema):**
1. `Jak sprzedać działkę w Białymstoku bez pośrednika?` → `Wystarczy zgłoszenie — adres lub numer działki. W 24 godziny dostajesz konkretną ofertę, a jeśli ją przyjmiesz, resztą formalności zajmujemy się my. Bez umowy pośrednictwa i bez prowizji.`
2. `Czy kupujecie działki bez warunków zabudowy?` → `Tak. Brak warunków zabudowy czy planu miejscowego to dla nas standardowa sytuacja — potencjał działki sprawdzamy sami i uwzględniamy go w ofercie.`
3. `Ile płacicie za metr kwadratowy działki?` → `Nie mamy jednego cennika, bo o wartości decydują lokalizacja, przeznaczenie w planie, dojazd i otoczenie. Dlatego zamiast widełek dostajesz konkretną kwotę dla Twojej działki — bezpłatnie i w 24 godziny.`
4. `Czy kupujecie działki ze starym domem do rozbiórki?` → `Tak, to jedna z naszych specjalności. Kupujemy grunt z zabudową w dowolnym stanie technicznym — rozbiórkę i formalności z nią związane bierzemy na siebie.`
5. `Jak długo trwa sprzedaż działki?` → `Ofertę masz w 24 godziny, akt notarialny podpisujemy średnio w 14 dni — najwięcej czasu zajmuje zwykle kompletowanie dokumentów, w czym pomagamy. Pieniądze otrzymujesz w dniu aktu.`
6. `Czy kupujecie tylko działki?` → `Grunty to nasza specjalizacja, ale kupujemy też domy i nieruchomości komercyjne w Białymstoku i okolicach. Zgłoś nieruchomość przez formularz — ocenimy ją równie szybko.`

**Finalne CTA (H2: `Sprawdź, ile jest warta Twoja działka`):**
- Zdanie: `Bez zobowiązań i bez kosztów. Konkretna kwota w 24 godziny.`
- Duży telefon + przycisk `Poznaj wycenę` → #wycena.

**Stopka:** marka `Nowy Rozdział` + linia `Skup działek — Białystok i okolice`; telefon, mail, polityka, `© 2026 Nowy Rozdział. Wszystkie prawa zastrzeżone.`

**dziekujemy.html:** H1 `Zgłoszenie przyjęte.` + `Oddzwonimy w ciągu 24 godzin z konkretną wyceną.` (reszta struktury zostaje).

---

### Task 1: Dark tokens, typografia i baza komponentów

**Files:**
- Modify: `assets/css/variables.css` (podmienić na tokeny z sekcji „Design tokens"; usunąć --font-serif)
- Modify: `assets/css/styles.css` (warstwa kolorów i typografii WSZYSTKICH istniejących komponentów na nowe tokeny: body, header, btn — w tym --color-on-accent na akcentowych, formularz, karty, kroki, why-grid, FAQ, final-cta, stopka, call-fab, cookie banner, focus-visible, ::selection; nagłówki na --font-head 800/-0.02em; nowa klasa `.mono-label` na --font-mono uppercase)
- Modify: `index.html`, `404.html`, `dziekujemy.html`, `polityka-prywatnosci.html` — theme-color na `#14171A`

**Interfaces:**
- Produces: wszystkie tokeny z sekcji Design tokens; `.mono-label`; `.btn--primary` = limonka + `--color-on-accent`; `.btn--ghost` = obrys limonka, tekst limonka; `.btn--inverse` (final CTA) = jasny przycisk `--color-ink` tło / `--color-bg` tekst.
- UWAGA: treść HTML jeszcze stara (poprzedni copy) — zmienia ją Task 2-3. Strona ma wyglądać dark i spójnie już po tym tasku.

- [ ] **Step 1:** Podmień variables.css (tokeny verbatim z planu).
- [ ] **Step 2:** Przejdź styles.css sekcja po sekcji: usuń serif (font-family nagłówków → --font-head, weight 800, letter-spacing -0.02em), wszystkie kolory na tokeny (żadnych hardcodów poza tokenami), final-cta na `--color-surface` z limonkowym akcentem zamiast zielonego bandu (przycisk .btn--primary limonka), cookie banner dark z limonkowym przyciskiem, error na --color-error.
- [ ] **Step 3:** theme-color ×4 pliki.
- [ ] **Step 4:** Weryfikacja: :8199, zrzuty desktop+mobile (headless shell), KAŻDA sekcja czytelna na dark (żadnych czarnych tekstów na graficie), konsola czysta.
- [ ] **Step 5:** Commit `feat(dzialki): dark tokens i typografia inwestycyjna`.

### Task 2: Head SEO, hero „mapa", og-image

**Files:**
- Modify: `index.html` — head (title/meta/og verbatim z copy decku), hero (eyebrow mono, H1, sub, CTA, pasek liczb zamiast trust-baru), grafika hero SVG (kontur parceli/mapa: linie `--color-line`, obrys parceli i znacznik w limonce, opcjonalnie wymiarowanie mono)
- Modify: `assets/css/styles.css` — `.hero` (tło z subtelną siatką mapy), `.hero__stats` (3 pozycje mono: duża liczba limonka + podpis ink-soft)
- Create: `assets/img/og-image.jpg` (1200×630 dark: grafit, limonkowy akcent, „Skup Działek Białystok" + „Gotówka w 24 h" — wygenerować przez headless shell + sips jak poprzednio, podmienić istniejący plik)

**Interfaces:**
- Consumes: tokeny/klasy z Task 1. Kotwica #wycena istnieje.
- Produces: hero z eyebrow `.mono-label`; `.hero__stats` używane tylko tu.

- [ ] **Step 1:** Head: title/meta/og/twitter verbatim.
- [ ] **Step 2:** Hero: markup + SVG parceli + pasek liczb (24 h / 14 dni / 0 zł z podpisami).
- [ ] **Step 3:** Nowy og-image.jpg (nadpisać, te same wymiary/ścieżka).
- [ ] **Step 4:** Weryfikacja: zrzuty 1440+390, jeden H1, konsola czysta.
- [ ] **Step 5:** Commit `feat(dzialki): head SEO, hero z motywem mapy i og-image`.

### Task 3: Formularz (typy) + sekcje treści

**Files:**
- Modify: `index.html` — formularz (placeholder/label pola lokalizacji → `Adres lub numer działki`, radio: Działka/Dom/Komercyjna), sekcje: co kupujemy (3 karty + zasięg + pasek „poza gruntami"), proces, dlaczego my — copy verbatim z decku; ikony kart SVG w klimacie mapy (kontur parceli, dźwig/rozbiórka, wieżowiec)
- Modify: `assets/js/form.js` — wartości radio (`dzialka`/`dom`/`komercyjna`), komunikaty bez zmian logiki
- Modify: `assets/css/styles.css` — pasek „poza gruntami" (`.beyond-strip`: wyciszony, border-top/bottom --color-line, jedna linia z linkiem tel:)

**Interfaces:**
- Consumes: klasy .cards-3/.steps/.why-grid/.lead-form/.segmented z poprzedniego redesignu (zostają, tylko treść i kolory z Task 1).
- Produces: `.beyond-strip`.

- [ ] **Step 1:** Formularz: pola/labels/radio verbatim; form.js wartości.
- [ ] **Step 2:** Sekcje treści verbatim + ikony.
- [ ] **Step 3:** Weryfikacja e2e formularza (pusty submit → błędy; zły telefon; poprawne dane → oczekiwany błąd API placeholder klucza) + zrzuty.
- [ ] **Step 4:** Commit `feat(dzialki): formularz z typami i sekcje treści pod grunty`.

### Task 4: FAQ + schema, finalne CTA, podstrony, weryfikacja końcowa

**Files:**
- Modify: `index.html` — FAQ (6 pytań verbatim, `<details>`, pierwsze open), FAQPage JSON-LD (byte-match), finalne CTA + stopka (copy verbatim), RealEstateAgent bez zmian
- Modify: `dziekujemy.html` (nowy H1/tekst verbatim), `404.html`, `polityka-prywatnosci.html` — spójność (header/stopka tagline `Skup działek — Białystok i okolice`)
- Modify: `sitemap.xml` — lastmod `2026-07-17`

**Interfaces:**
- Consumes: wszystko z Tasków 1-3.

- [ ] **Step 1:** FAQ HTML + FAQPage schema (stringi identyczne), finalne CTA, stopki ×4.
- [ ] **Step 2:** dziekujemy/404/polityka — treść i spójność dark.
- [ ] **Step 3:** Sitemap.
- [ ] **Step 4:** Weryfikacja końcowa: zrzuty 4 stron ×2 viewporty (obejrzeć), budżet <100 KB, formularz e2e, jeden H1/strona, JSON-LD parsuje (json.loads), byte-match FAQ, konsola czysta ×4, kontrast: żaden tekst nie jest ciemny na ciemnym.
- [ ] **Step 5:** Commit `feat(dzialki): FAQ, schema, finalne CTA i podstrony`.
