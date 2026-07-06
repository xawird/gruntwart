# Przebudowa nowyrozdzial.pl na zwięzły one-page — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Przebudować stronę na nowoczesny one-page landing (jasny minimalizm premium): ~60% mniej tekstu, formularz 3-polowy, mocne CTA, schema LocalBusiness + FAQPage.

**Architecture:** Statyczny HTML/CSS/vanilla JS hostowany na Netlify. Jeden `index.html` przebudowany sekcja po sekcji, design tokens w `assets/css/variables.css`, style w `assets/css/styles.css`, formularz przez Web3Forms (`assets/js/form.js`). Zero zależności zewnętrznych.

**Tech Stack:** HTML5, CSS custom properties, vanilla JS, Web3Forms, Netlify. Weryfikacja: `python3 -m http.server` + Playwright (zrzuty ekranu, konsola).

**Spec:** `docs/superpowers/specs/2026-07-06-redesign-onepage-design.md`

## Global Constraints

- Zero zewnętrznych bibliotek i fontów z CDN; fonty systemowe lub self-hosted. Budżet < 100 KB na pierwsze załadowanie.
- Jeden H1 na stronie. Hierarchia H2/H3 bez przeskoków.
- `prefers-reduced-motion` respektowane przy każdej animacji.
- Wszystkie sekcje ~1 ekran wysokości na desktopie 1440px.
- Telefon zawsze jako `tel:+48500441500`, wyświetlany „500 441 500".
- Mechanizm `window.SITE_CONFIG` (config.js) zostaje nietknięty.
- Netlify headers/redirects (`netlify.toml`), `robots.txt` — bez zmian.
- Weryfikacja wizualna każdego zadania: serwer lokalny na porcie 8199 + zrzut Playwright, zero błędów w konsoli.

## Copy deck (teksty ostateczne — używać verbatim)

**Hero:**
- H1: `Skup nieruchomości Białystok — gotówka w 24 h`
- Lead: `Kupujemy działki, domy i mieszkania za gotówkę. Bez prowizji, bez pośredników.`
- CTA primary: `Wyceń nieruchomość` · CTA secondary: `500 441 500`
- Trust bar: `Decyzja w 24 h` · `0 zł prowizji` · `Umowa u notariusza`

**Formularz (H2: `Bezpłatna wycena w 24 godziny`):**
- Pola: Telefon* · Lokalizacja (placeholder `np. Białystok, Antoniuk`) · Typ nieruchomości (Działka / Dom / Mieszkanie — segmented radio)
- Zgoda: `Akceptuję politykę prywatności i wyrażam zgodę na kontakt w sprawie wyceny.`
- Submit: `Wyślij — oddzwonimy w 24 h`
- Dopisek: `Wycena jest bezpłatna i niezobowiązująca.`

**Co skupujemy (H2: `Co skupujemy`):**
- Działki: `Budowlane, rolne i leśne — z warunkami zabudowy lub bez.`
- Domy: `W każdym stanie: od nowych po wymagające remontu, także w trakcie budowy.`
- Mieszkania: `Każdy metraż i każda dzielnica, także z lokatorami lub obciążeniami.`
- Zdanie lokalne pod kartami: `Działamy w Białymstoku i okolicach — m.in. Wasilków, Supraśl, Choroszcz, Łapy, Juchnowiec.`

**Jak to działa (H2: `Sprzedaż w trzech krokach`):**
- 1 `Telefon lub formularz` — `Podajesz podstawowe informacje o nieruchomości.`
- 2 `Wycena w 24 h` — `Przedstawiamy bezpłatną, niezobowiązującą ofertę.`
- 3 `Gotówka u notariusza` — `Pieniądze otrzymujesz w dniu podpisania umowy.`

**Dlaczego my (H2: `Dlaczego Nowy Rozdział`):**
- `Decyzja w 24 h` — `Wiesz dokładnie, na czym stoisz — bez tygodni czekania.`
- `0 zł prowizji` — `Cena, którą uzgodnimy, to cena, którą otrzymasz.`
- `Każda sytuacja prawna` — `Hipoteka, spadek, współwłasność — to nie problem.`
- `Pełna dyskrecja` — `Bez tabliczek „na sprzedaż" i bez ciekawskich sąsiadów.`

**FAQ (H2: `Najczęstsze pytania`):**
1. `Jak szybko sprzedam mieszkanie w Białymstoku?` → `Ofertę przedstawiamy w 24 godziny od zgłoszenia. Jeśli ją przyjmiesz, umowę u notariusza możemy podpisać nawet w kilka dni — pieniądze otrzymujesz tego samego dnia.`
2. `Czy kupujecie nieruchomości z hipoteką lub długami?` → `Tak. Zadłużenie, hipoteka, zajęcie komornicze czy nieuregulowany spadek to sytuacje, z którymi pracujemy na co dzień. Formalności bierzemy na siebie.`
3. `Ile kosztuje wycena?` → `Nic. Wycena jest bezpłatna i do niczego nie zobowiązuje — decyzję o sprzedaży zawsze podejmujesz Ty.`
4. `Czy płacicie mniej niż wartość rynkowa?` → `Oferujemy uczciwą cenę za szybkość i pewność transakcji: bez prowizji pośrednika, bez remontu przed sprzedażą i bez miesięcy oczekiwania na kupca.`
5. `Jakie dokumenty są potrzebne?` → `Na start żadne — wystarczy adres i podstawowe informacje. Dokumenty do umowy skompletujemy razem, pomagamy też w brakujących.`

**Finalne CTA (H2: `Porozmawiajmy o Twojej nieruchomości`):**
- Zdanie: `Zadzwoń lub zostaw kontakt — oddzwonimy w 24 godziny z konkretną ofertą.`
- Telefon duży + przycisk `Wyceń nieruchomość`.

**SEO:**
- `<title>`: `Skup Nieruchomości Białystok — Gotówka w 24h | Nowy Rozdział`
- Meta description: `Skupujemy działki, domy i mieszkania w Białymstoku i okolicach. Bezpłatna wycena w 24 h, 0 zł prowizji, gotówka u notariusza. Zadzwoń: 500 441 500.`

## Design tokens

```css
:root {
  --color-bg: #FDFCFA;          /* złamana biel */
  --color-surface: #FFFFFF;
  --color-ink: #1A2620;          /* prawie czarny z nutą zieleni */
  --color-ink-soft: #5A6B62;     /* tekst pomocniczy */
  --color-accent: #1E4D3B;       /* głęboka ciemna zieleń */
  --color-accent-hover: #163A2C;
  --color-accent-soft: #EAF1ED;  /* tło pastylek/ikon */
  --color-line: #E5E2DC;
  --font-serif: "Iowan Old Style", "Palatino Linotype", Palatino, Georgia, serif;
  --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  --radius: 14px;
  --shadow-card: 0 1px 2px rgba(26,38,32,.05), 0 8px 24px rgba(26,38,32,.06);
  --container: 1120px;
}
```

Typografia: H1 `clamp(2.4rem, 5.5vw, 4.2rem)` serif; H2 `clamp(1.8rem, 3.5vw, 2.6rem)` serif; body 1.0625rem sans, line-height 1.6.

---

### Task 1: Design tokens i szkielet stylów

**Files:**
- Modify: `assets/css/variables.css` (zastąpić całość tokenami z sekcji „Design tokens")
- Modify: `assets/css/styles.css` (wyczyścić do warstw: base, layout `.container`, komponenty `.btn`, `.btn--primary`, `.btn--ghost`, utilsy)
- Keep: `assets/css/reset.css` bez zmian

**Interfaces:**
- Produces: klasy `.container` (max-width `var(--container)`, padding-inline 24px, margin auto), `.btn`, `.btn--primary` (tło accent, biały tekst, radius, padding 14px 28px), `.btn--ghost` (obrys accent), zmienne CSS z copy decku. Wszystkie kolejne zadania używają tych klas i zmiennych verbatim.

- [ ] **Step 1:** Podmień zawartość `variables.css` na blok z sekcji „Design tokens" + typografia.
- [ ] **Step 2:** W `styles.css` zostaw tylko: style bazowe (`body` — font sans, kolor ink, tło bg), `.container`, `.btn/.btn--primary/.btn--ghost`, klasę `.fade-in` (opacity/translate z `prefers-reduced-motion` off-switch), sekcyjny rytm `section { padding-block: clamp(64px, 10vh, 120px) }`.
- [ ] **Step 3:** Uruchom `python3 -m http.server 8199` w tle, otwórz `http://localhost:8199/` Playwrightem — strona będzie surowa (stary HTML, nowe style), sprawdź brak błędów w konsoli.
- [ ] **Step 4:** Commit: `git commit -m "feat(redesign): nowe design tokens i szkielet styli"`

### Task 2: Head SEO + hero ze sticky headerem

**Files:**
- Modify: `index.html` — sekcja `<head>` + header + hero (zastępuje obecny hero z formularzem w hero)
- Modify: `assets/css/styles.css` — style `.site-header`, `.hero`, `.trust-bar`

**Interfaces:**
- Consumes: `.container`, `.btn--primary`, `.btn--ghost`, tokeny z Task 1.
- Produces: kotwice `#wycena` (użyje jej Task 3 — formularz) i `#faq`; sticky `.site-header` z logo „Nowy Rozdział", telefonem i przyciskiem `Wyceń nieruchomość` (href `#wycena`).

- [ ] **Step 1:** W `<head>` ustaw title i meta description z copy decku; zachowaj istniejące og:/canonical/favicon, zaktualizuj og:title/og:description na nowe.
- [ ] **Step 2:** Zbuduj header: lewa — marka serif; prawa — `tel:` link + `.btn--primary` `Wyceń nieruchomość` (`#wycena`). Sticky, tło półprzezroczyste z `backdrop-filter: blur`.
- [ ] **Step 3:** Hero dwukolumnowe: lewa — H1, lead, dwa CTA (primary `#wycena`, ghost `tel:`); prawa — inline SVG line-art (geometryczna kamienica/dach, stroke `var(--color-accent)`, opacity .9, bez zewnętrznych plików). Pod spodem `.trust-bar`: trzy pozycje z copy decku, oddzielone kropkami, kolor ink-soft.
- [ ] **Step 4:** Zrzut Playwright viewportu hero. Sprawdź: H1 = dokładnie jeden, header przykleja się przy scrollu, brak błędów konsoli.
- [ ] **Step 5:** Commit: `feat(redesign): head SEO, sticky header i nowe hero`

### Task 3: Formularz 3-polowy

**Files:**
- Modify: `index.html` — sekcja `#wycena` z formularzem (od razu pod hero)
- Modify: `assets/js/form.js` — usunąć walidację/obsługę pól: name, email, opis, cena, pliki; zostawić phone (required, obecny PHONE_REGEX), location (opcjonalne), type (radio, required), consent (required)
- Modify: `assets/css/styles.css` — `.lead-form`, `.segmented` (radio jako pastylki)

**Interfaces:**
- Consumes: kotwica `#wycena` (Task 2), `window.SITE_CONFIG.web3formsKey`.
- Produces: `<form id="leadForm">` z polami `phone`, `location`, `type`, `consent`, hidden `access_key` (`id="formAccessKey"`), hidden `redirect` = `https://nowyrozdzial.pl/dziekujemy.html`, honeypot `botcheck`. Submit button `id="formSubmit"`, feedback `id="formFeedback"`.

- [ ] **Step 1:** HTML formularza: H2 z copy decku, 3 pola (tel `inputmode="tel"`, text lokalizacja, segmented radio typ), checkbox zgody z linkiem do `polityka-prywatnosci.html`, przycisk submit, dopisek. Karta `.lead-form` na `--color-surface`, shadow-card, max-width 560px.
- [ ] **Step 2:** W `form.js` usuń gałęzie walidacji `name`/`email`, obsługę plików (MAX_FILES_TOTAL_BYTES, input files) i pól opis/cena; dodaj walidację `type` (wymagany wybór) i `consent`. Reszta przepływu (Web3Forms POST, redirect, komunikaty inline) bez zmian.
- [ ] **Step 3:** Test w przeglądarce (Playwright): submit pustego formularza → komunikaty przy telefonie/typie/zgodzie; telefon `123` → błąd formatu; poprawne dane bez klucza Web3Forms → oczekiwany błąd API pokazany inline (klucz to `REPLACE_ME…`, więc sukces niemożliwy lokalnie — to OK).
- [ ] **Step 4:** Commit: `feat(redesign): formularz wyceny skrócony do 3 pól`

### Task 4: Sekcje treści — co skupujemy, trzy kroki, dlaczego my

**Files:**
- Modify: `index.html` — trzy sekcje za formularzem (zastępują stare: property-cards, process, benefits, testimonials — testimoniale usunąć całkowicie)
- Modify: `assets/css/styles.css` — `.cards-3` (grid 3 kolumny → 1 na mobile), `.steps`, `.why-grid` (2×2 → 1 kolumna na mobile)

**Interfaces:**
- Consumes: `.container`, tokeny, `.fade-in`.
- Produces: brak (sekcje liściowe).

- [ ] **Step 1:** „Co skupujemy": H2, 3 karty (ikona inline SVG 24px w pastylce `--color-accent-soft`, H3, jedno zdanie z copy decku), pod gridem zdanie lokalne z miejscowościami.
- [ ] **Step 2:** „Sprzedaż w trzech krokach": H2, 3 kroki w rzędzie — duży numer serif w kolorze accent-soft, H3, jedno zdanie.
- [ ] **Step 3:** „Dlaczego Nowy Rozdział": H2, grid 2×2 — H3 + pół zdania, bez ikon albo z minimalnymi kropkami akcentu.
- [ ] **Step 4:** Zrzut pełnej strony Playwright — każda sekcja ~1 ekran, spójne odstępy, brak reliktów starych klas w HTML.
- [ ] **Step 5:** Commit: `feat(redesign): sekcje co skupujemy, kroki, dlaczego my`

### Task 5: FAQ accordion + schema JSON-LD

**Files:**
- Modify: `index.html` — sekcja `#faq` (5 pytań z copy decku, natywne `<details>/<summary>`) + dwa bloki `<script type="application/ld+json">` przed `</body>`
- Modify: `assets/css/styles.css` — `.faq details` (obrys line, radius, marker jako +/− przez `::after`)

**Interfaces:**
- Consumes: copy deck FAQ (pytania i odpowiedzi verbatim — te same teksty w HTML i w FAQPage schema, inaczej Google odrzuci rich result).
- Produces: JSON-LD `FAQPage` (5 par Q/A) i `LocalBusiness`: `name` "Nowy Rozdział", `telephone` "+48500441500", `email` "info@nowyrozdzial.pl", `url` "https://nowyrozdzial.pl", `areaServed`: ["Białystok","Wasilków","Supraśl","Choroszcz","Łapy","Juchnowiec Kościelny"], `priceRange` "PLN".

- [ ] **Step 1:** HTML FAQ przez `<details>` — zero JS. Pierwsze pytanie `open`.
- [ ] **Step 2:** Dodaj oba JSON-LD; zwaliduj składnię: `python3 - <<'EOF'` z `json.loads` na wyciętych blokach lub ręcznie przez podgląd.
- [ ] **Step 3:** Playwright: kliknij drugie pytanie → odpowiedź widoczna; konsola czysta.
- [ ] **Step 4:** Commit: `feat(redesign): FAQ + schema FAQPage i LocalBusiness`

### Task 6: Finalne CTA, stopka, mobilny przycisk połączenia

**Files:**
- Modify: `index.html` — sekcja finalnego CTA (ciemnozielone tło `--color-accent`, biały tekst), stopka (marka, telefon, mail, link do polityki, © 2026), pływający `.call-fab` (link `tel:`, widoczny < 768px)
- Modify: `assets/css/styles.css` — `.final-cta`, `.site-footer`, `.call-fab`

**Interfaces:**
- Consumes: copy deck „Finalne CTA", `.btn` (wariant odwrócony: białe tło, tekst accent).
- Produces: brak.

- [ ] **Step 1:** Sekcja CTA: H2, zdanie, wielki `tel:` link (serif, biały) + biały przycisk `Wyceń nieruchomość` → `#wycena`.
- [ ] **Step 2:** Stopka minimalna na ciemnym tle pod CTA.
- [ ] **Step 3:** `.call-fab`: okrągły przycisk z ikoną słuchawki, fixed prawy-dolny róg, tylko mobile; `aria-label="Zadzwoń: 500 441 500"`.
- [ ] **Step 4:** Playwright: zrzut desktop pełna strona + zrzut mobile 390×844 (fab widoczny, header się mieści).
- [ ] **Step 5:** Commit: `feat(redesign): finalne CTA, stopka i mobilny przycisk połączenia`

### Task 7: Podstrony w nowym stylu + porządki końcowe

**Files:**
- Modify: `dziekujemy.html`, `404.html`, `polityka-prywatnosci.html` — podpiąć nowe style, ujednolicić header/stopkę (treść bez zmian)
- Modify: `assets/js/ui.js` — usunąć kod odnoszący się do usuniętych elementów (testimoniale, stary banner jeśli selektory zniknęły); cookie banner zostaje
- Modify: `sitemap.xml` — `lastmod` na 2026-07-06

**Interfaces:**
- Consumes: header/stopka z Tasków 2 i 6 (skopiować markup 1:1).
- Produces: brak.

- [ ] **Step 1:** Ujednolić trzy podstrony: ten sam `<head>` wzorzec (własne title), header i stopka jak na głównej.
- [ ] **Step 2:** Przejrzyj `ui.js` — usuń nasłuchy na nieistniejące selektory; sprawdź w konsoli brak błędów na wszystkich 4 stronach.
- [ ] **Step 3:** Zaktualizuj `sitemap.xml`.
- [ ] **Step 4:** Weryfikacja końcowa (kryteria ze spec): zrzuty desktop+mobile wszystkich stron; `du -sh` transferu głównej < 100 KB; formularz e2e (walidacja → błąd API inline); jeden H1; JSON-LD parsuje się.
- [ ] **Step 5:** Commit: `feat(redesign): podstrony w nowym stylu i porządki końcowe`
