# Pivot treści na skup działek (jasny design zostaje) — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Przeprofilować treść strony na specjalistę od skupu działek (Białystok + okolice, dodatkowo domy i komercyjne), zachowując w całości obecny jasny design (biel #FDFCFA, zieleń #1E4D3B, serif).

**Architecture:** Bez zmian w warstwie wizualnej — tokeny, klasy i komponenty z gałęzi main zostają. Wymieniamy: teksty wszystkich sekcji, typy w formularzu, grafikę hero (parcela zamiast kamienicy), ikony kart, FAQ + FAQPage schema, og-image, taglines na podstronach.

**Tech Stack:** jak dotychczas. Weryfikacja: :8199 + Playwright MCP (klikanie/konsola) + chrome-headless-shell do zrzutów: `/Users/dawid/Library/Caches/ms-playwright/chromium_headless_shell-1217/chrome-headless-shell-mac-arm64/chrome-headless-shell --headless --disable-gpu --screenshot=OUT.png --window-size=W,H --hide-scrollbars --virtual-time-budget=3000 URL`.

**Uwaga:** Poprzednia wersja tego planu (2026-07-17-dzialki-dark.md) z ciemnym designem została ODRZUCONA przez użytkownika. Design NIE zmienia się w tym planie — żadnych zmian palety/typografii. Copy deck poniżej obowiązuje verbatim.

## Global Constraints

- Warstwa wizualna (variables.css, klasy w styles.css) BEZ ZMIAN poza: nową drobną klasą jeśli niezbędna dla paska „poza gruntami" i stylami `.hero__stats` (w duchu obecnego designu). Zero nowych kolorów.
- Zero CDN. Budżet < 100 KB. Jeden H1; hierarchia bez przeskoków. prefers-reduced-motion.
- Telefon `tel:+48500441500`, wyświetlany „500 441 500". window.SITE_CONFIG/netlify.toml/robots.txt nietknięte.
- Kontrakt form.js: #leadForm/#formAccessKey/#formSubmit/#formFeedback zachowany.
- FAQ: identyczne stringi w HTML i FAQPage JSON-LD.
- Weryfikacja każdego zadania: :8199 + zrzuty headless shell (obejrzeć!), konsola czysta.
- Commity po polsku (`feat(dzialki):`), NIE pushować.

## Copy deck (teksty ostateczne — używać verbatim)

**Head SEO:**
- `<title>`: `Skup Działek Białystok — Gotówka w 24h | Nowy Rozdział`
- Meta description: `Skupujemy działki budowlane, zabudowane i inwestycyjne w Białymstoku i okolicach. Wycena w 24 h, 0 zł kosztów, gotówka u notariusza. Tel. 500 441 500.`
- og:title = title; og:description = meta description.

**Hero:**
- Eyebrow (mała etykieta nad H1, obecny styl eyebrow/uppercase jeśli jest, albo drobny tekst --color-ink-soft): `Białystok i okolice · skup gruntów`
- H1: `Twoja działka ma dziś kupca.`
- Sub: `Skupujemy działki w Białymstoku i okolicach. Konkretna wycena w 24 godziny, gotówka przy akcie notarialnym.`
- CTA primary: `Poznaj wycenę w 24 h` (#wycena) · CTA ghost: `500 441 500` (tel:)
- Pasek zaufania (zastępuje obecny trust-bar, 3 pozycje: liczba serif + podpis): `24 h — wycena` · `14 dni — średnio do aktu` · `0 zł — kosztów po Twojej stronie`
- Grafika hero: inline SVG w miejsce kamienicy — kontur parceli na tle delikatnej siatki geodezyjnej, znacznik pomiarowy; stroke `var(--color-accent)`, styl jak dotychczasowy line-art.

**Formularz (H2: `Bezpłatna wycena w 24 godziny`):**
- Pola: Telefon* · label `Adres lub numer działki` (placeholder `np. Białystok, ul. Ciołkowskiego / dz. 152/3`) · Typ nieruchomości (segmented radio: `Działka` / `Dom` / `Komercyjna`, wymagane)
- Zgoda i submit bez zmian: `Akceptuję politykę prywatności i wyrażam zgodę na kontakt w sprawie wyceny.` / `Wyślij — oddzwonimy w 24 h` / `Wycena jest bezpłatna i niezobowiązująca.`

**Co kupujemy (H2: `Kupujemy grunty w każdym stanie`):**
- Karta 1 `Działki budowlane`: `Z warunkami zabudowy, w planie miejscowym albo jeszcze bez dokumentów — potencjał sprawdzimy za Ciebie.`
- Karta 2 `Zabudowane do rozbiórki`: `Stary dom, pustostan, budynek po pożarze? Kupujemy grunt, rozbiórką zajmujemy się sami.`
- Karta 3 `Grunty inwestycyjne`: `Większe parcele pod usługi, magazyny i zabudowę wielorodzinną. Rozmawiamy też ze spółkami i wspólnotami.`
- Zasięg (pod kartami): `Działamy w granicach Białegostoku i do ok. 20 km — m.in. Wasilków, Supraśl, Choroszcz, Juchnowiec, Zabłudów, Dobrzyniewo.`
- Pasek „poza gruntami" (`.beyond-strip`, wyciszony, jedna linia): `Poza gruntami kupujemy też domy i nieruchomości komercyjne — grunty to nasza specjalizacja, ale zadzwoń, porozmawiamy konkretnie.`

**Proces (H2: `Od zgłoszenia do gotówki w trzech krokach`):**
- 01 `Zgłoszenie` — `Adres lub numer działki — tyle wystarczy, by zacząć.`
- 02 `Wycena w 24 h` — `Analizujemy plan miejscowy, księgę wieczystą i otoczenie. Dostajesz kwotę, nie widełki.`
- 03 `Akt i przelew` — `Notariusza i formalności bierzemy na siebie. Pieniądze masz na koncie w dniu podpisania.`

**Dlaczego my (H2: `Dlaczego właściciele wybierają nas`):**
- `Kwota, nie widełki` — `Oferta to liczba na piśmie, ważna 14 dni. Bez negocjacji w ostatniej chwili.`
- `Każdy stan prawny` — `Spadek, współwłasność, hipoteka, brak drogi dojazdowej — rozwiązujemy to po naszej stronie.`
- `Zero kosztów` — `Notariusz, wypisy, geodeta — płacimy my. Od pierwszej rozmowy znasz kwotę „na rękę".`
- `Pełna dyskrecja` — `Bez ogłoszenia, bez tabliczki, bez telefonów od pośredników.`

**FAQ (H2: `Najczęstsze pytania` — identyczne stringi w HTML i schema):**
1. `Jak sprzedać działkę w Białymstoku bez pośrednika?` → `Wystarczy zgłoszenie — adres lub numer działki. W 24 godziny dostajesz konkretną ofertę, a jeśli ją przyjmiesz, resztą formalności zajmujemy się my. Bez umowy pośrednictwa i bez prowizji.`
2. `Czy kupujecie działki bez warunków zabudowy?` → `Tak. Brak warunków zabudowy czy planu miejscowego to dla nas standardowa sytuacja — potencjał działki sprawdzamy sami i uwzględniamy go w ofercie.`
3. `Ile płacicie za metr kwadratowy działki?` → `Nie mamy jednego cennika, bo o wartości decydują lokalizacja, przeznaczenie w planie, dojazd i otoczenie. Dlatego zamiast widełek dostajesz konkretną kwotę dla Twojej działki — bezpłatnie i w 24 godziny.`
4. `Czy kupujecie działki ze starym domem do rozbiórki?` → `Tak, to jedna z naszych specjalności. Kupujemy grunt z zabudową w dowolnym stanie technicznym — rozbiórkę i formalności z nią związane bierzemy na siebie.`
5. `Jak długo trwa sprzedaż działki?` → `Ofertę masz w 24 godziny, akt notarialny podpisujemy średnio w 14 dni — najwięcej czasu zajmuje zwykle kompletowanie dokumentów, w czym pomagamy. Pieniądze otrzymujesz w dniu aktu.`
6. `Czy kupujecie tylko działki?` → `Grunty to nasza specjalizacja, ale kupujemy też domy i nieruchomości komercyjne w Białymstoku i okolicach. Zgłoś nieruchomość przez formularz — ocenimy ją równie szybko.`

**Finalne CTA (H2: `Sprawdź, ile jest warta Twoja działka`):**
- Zdanie: `Bez zobowiązań i bez kosztów. Konkretna kwota w 24 godziny.`
- Duży telefon + przycisk `Poznaj wycenę` → #wycena.

**Stopka (4 strony):** tagline pod marką: `Skup działek — Białystok i okolice`.

**dziekujemy.html:** H1 `Zgłoszenie przyjęte.` + tekst `Oddzwonimy w ciągu 24 godzin z konkretną wyceną.`

**og-image.jpg:** nowy, W OBECNEJ JASNEJ palecie (tło #FDFCFA, zieleń #1E4D3B, serif): „Skup Działek Białystok" + „Gotówka w 24 h" + marka.

---

### Task 1: Head SEO, hero „parcela", formularz, og-image

**Files:**
- Modify: `index.html` — head (title/meta/og verbatim), hero (eyebrow, H1, sub, CTA, pasek 24h/14dni/0zł, SVG parceli zamiast kamienicy), formularz (label+placeholder pola lokalizacji, radio Działka/Dom/Komercyjna)
- Modify: `assets/js/form.js` — wartości radio `dzialka`/`dom`/`komercyjna`
- Modify: `assets/css/styles.css` — tylko jeśli trust-bar wymaga wariantu liczbowego (duża liczba serif + podpis); w duchu obecnego designu
- Modify: `assets/img/og-image.jpg` — nadpisać nową jasną wersją (headless shell 1200×630 + sips, jak poprzednio)

**Interfaces:**
- Consumes: istniejące klasy .hero/.trust-bar/.lead-form/.segmented/.form__pill, tokeny.
- Produces: hero-stats (jeśli nowa klasa — `.trust-bar` może zostać rozszerzony); reszta bez zmian strukturalnych.

- [ ] **Step 1:** Head verbatim; hero verbatim + SVG parceli (styl line-art jak obecna kamienica, stroke accent).
- [ ] **Step 2:** Formularz: label/placeholder/radio verbatim; form.js wartości typów.
- [ ] **Step 3:** og-image jasny (nadpisz plik, te same tagi).
- [ ] **Step 4:** Weryfikacja: zrzuty 1440+390 (obejrzeć), formularz e2e (pusty → błędy; zły tel; poprawne → oczekiwany błąd API placeholder klucza), jeden H1, konsola czysta.
- [ ] **Step 5:** Commit `feat(dzialki): hero, SEO i formularz pod skup gruntów`.

### Task 2: Sekcje treści + FAQ + schema + CTA + stopki

**Files:**
- Modify: `index.html` — co kupujemy (3 karty verbatim + zasięg + `.beyond-strip`), proces, dlaczego my, FAQ (6 pytań, `<details>`, pierwsze open), FAQPage JSON-LD (byte-match, 6 par), finalne CTA, stopka tagline; ikony kart SVG (kontur parceli / rozbiórka / budynek usługowy) w obecnym stylu 24px stroke currentColor
- Modify: `assets/css/styles.css` — `.beyond-strip` (wyciszony pasek, border-y --color-line, tekst --color-ink-soft, w duchu designu)

**Interfaces:**
- Consumes: .cards-3/.steps/.why-grid/.faq-item/.final-cta/.site-footer — struktura zostaje, treść verbatim.
- Produces: `.beyond-strip`.

- [ ] **Step 1:** Sekcje treści verbatim + ikony + beyond-strip.
- [ ] **Step 2:** FAQ HTML + FAQPage schema (6 par, stringi identyczne — po edycji sprawdź byte-match programowo). RealEstateAgent bez zmian.
- [ ] **Step 3:** Finalne CTA + stopka verbatim.
- [ ] **Step 4:** Weryfikacja: pełny zrzut desktop+mobile (obejrzeć), klik 2. pytania FAQ, json.loads obu bloków, konsola czysta.
- [ ] **Step 5:** Commit `feat(dzialki): sekcje, FAQ i schema pod skup gruntów`.

### Task 3: Podstrony, sitemap, weryfikacja końcowa

**Files:**
- Modify: `dziekujemy.html` (H1/tekst verbatim, tagline stopki), `404.html` + `polityka-prywatnosci.html` (tagline stopki `Skup działek — Białystok i okolice`)
- Modify: `sitemap.xml` — lastmod `2026-07-17`

- [ ] **Step 1:** Podstrony verbatim (treść prawna polityki NIETKNIĘTA).
- [ ] **Step 2:** Sitemap.
- [ ] **Step 3:** Weryfikacja końcowa: zrzuty 4 stron ×2 viewporty (obejrzeć), budżet <100 KB, formularz e2e, jeden H1/strona, JSON-LD parsuje + FAQ byte-match, konsola czysta ×4, grep za pozostałościami starej oferty („mieszkan", „Domy" jako karta, „Pomagamy zacząć od nowa") — na stronie głównej nie może zostać stary przekaz poza dopuszczonym „domy i nieruchomości komercyjne".
- [ ] **Step 4:** Commit `feat(dzialki): podstrony i porządki po pivocie`.
