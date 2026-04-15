# Nowy Rozdział — Landing Page (Design Spec)

**Data:** 2026-04-16
**Status:** Draft — do akceptacji
**Cel projektu:** Landing page firmy "Nowy Rozdział" — skup nieruchomości (działki, domy, mieszkania) w Białymstoku. Strona służy konwersji ruchu z płatnych kampanii reklamowych (Google Ads / Meta Ads) na zgłoszenia: wypełnienie formularza lub telefon.

---

## 1. Kontekst i cele biznesowe

### Kim jest firma
"Nowy Rozdział" — marka skupu nieruchomości. Nazwa nawiązuje do faktu, że sprzedaż nieruchomości to często moment życiowej zmiany (rozwód, spadek, przeprowadzka, kłopoty finansowe). Pozycjonowanie: empatyczne, ludzkie, profesjonalne.

### Lokalizacja
- **Pierwsze wdrożenie:** Białystok i okolice.
- **Wymóg:** kod ma być łatwy do "sklonowania" pod kolejne miasta (np. Olsztyn, Lublin) — bez przepisywania, jedynie zmiana konfiguracji + find&replace.

### Kontakt firmy
- **Telefon:** `500-441-500`
- **Email:** `info@nowyrozdzial.pl`
- **Dane firmy (NIP, adres):** brak na MVP — uzupełnione później (świadomy kompromis; finalnie potrzebne dla pełnej zgodności RODO i maksymalnego zaufania).

### Cele konwersji (priorytet od najwyższego)
1. Wypełnienie formularza wyceny (główny cel).
2. Kliknięcie w numer telefonu (`tel:` link, drugi cel).

### Źródło ruchu
100% ruchu z płatnych kampanii reklamowych. Implikacje:
- Konwersja > SEO (choć SEO nadal zadbane jako bonus).
- Strona musi ładować się szybko (Google Ads kara wolne strony wyższym CPC).
- CTA widoczne natychmiast po wejściu (form-first hero).

### Co świadomie POZA zakresem MVP
- CMS / admin panel.
- Kalkulator wyceny online.
- Blog / poradnik.
- Wielojęzyczność.
- Zaawansowane animacje / parallax.
- Dashboard leadów (idą bezpośrednio na email).

---

## 2. USP (Unique Selling Propositions)

Komunikowane na stronie:
1. **Decyzja w 24h** (główne hasło, pojawia się w hero i na trust-stripe).
2. **Bez prowizji i ukrytych kosztów.**
3. **Bez pośredników i agentów.**
4. **Skupujemy nieruchomości z problemami prawnymi** (zadłużenie, hipoteka, spadek, współwłasność, służebność).
5. **Bezpłatna i niezobowiązująca wycena.**

---

## 3. Stos technologiczny

- **Frontend:** plain HTML5 + CSS3 + vanilla JavaScript. Brak frameworków, brak buildu.
- **Hosting:** Netlify (lub Vercel) — darmowy plan, custom domain, automatyczne HTTPS.
- **Backend formularza:** Web3Forms (free tier 250 zgłoszeń/miesiąc) — leady idą bezpośrednio na `info@nowyrozdzial.pl`.
- **Fonty:** Google Fonts (Fraunces, Inter) z `display=swap` i preconnect.
- **Ikony:** Lucide (inline SVG).
- **Analityka:** placeholder na GA4 / Plausible — konfiguracja do osobnej decyzji.

---

## 4. Struktura strony (sekcje od góry do dołu)

Single-page landing. Pojedyncze podstrony pomocnicze: `polityka-prywatnosci.html`, `dziekujemy.html`.

### 4.1 Sticky header
- Logo "Nowy Rozdział" po lewej (text-based, font Fraunces).
- Telefon `500-441-500` po prawej, klikalny `tel:` (na mobile pełny `+48500441500`).
- Półprzezroczyste tło z `backdrop-filter: blur` przy scrollu.

### 4.2 Hero — split layout (pełna wysokość ekranu na desktop)
**Lewa kolumna (~55%):**
- Eyebrow: `SKUP NIERUCHOMOŚCI · BIAŁYSTOK` (uppercase, letter-spacing, opacity 0.6).
- H1: *"Pomagamy zacząć od nowa."* — Fraunces, italic, ~64px desktop / 40px mobile.
- Subtitle: *"Skupujemy działki, domy i mieszkania w Białymstoku. Decyzja w 24 godziny, bez prowizji, bez pośredników."* — Inter, 18px, opacity 0.75.
- 2 przyciski: primary *"Bezpłatna wycena ↓"* (smooth scroll do formularza), secondary *"📞 500-441-500"* (`tel:` link).

**Prawa kolumna (~45%):**
- Karta z formularzem na białym tle.
- Tytuł karty: *"Opowiedz nam o swojej nieruchomości"* — Fraunces, italic.
- Subtitle karty: *"Odezwiemy się w ciągu 24 godzin z bezpłatną wyceną."*
- Pola formularza (sekcja 5).

**Tło hero:** delikatny gradient `#fef3e2 → #f5e6d3` (kremowy piasek).

### 4.3 Trust strip
Pasek pod heroem, białe tło. 4 elementy w poziomie z ikoną + tekstem:
- ✓ Decyzja w 24h
- ✓ Bez prowizji
- ✓ Każda sytuacja prawna
- ✓ Bezpłatna wycena

### 4.4 "Co skupujemy"
Sekcja z 3 kartami:
1. **Działki** (priorytet — pierwsza karta, wizualnie wyróżniona przez akcent szałwiowy w nagłówku/borderze) — ikona, krótki opis, lista przykładów (budowlane, rolne, leśne, z warunkami zabudowy).
2. **Domy** — wszystkie stany techniczne, do remontu, w trakcie budowy.
3. **Mieszkania** — wszystkie metraże, każda dzielnica.

Każda karta: ikona Lucide w kolorze szałwii, nagłówek H3, 2-3 zdania opisu, opcjonalnie 3-4 bullet-points.

### 4.5 "Jak to działa" — 3 kroki
3 duże karty/segmenty w poziomie (na mobile vertical):
1. **Kontakt** — *"Wypełniasz formularz lub dzwonisz. Mówisz nam podstawowe informacje o nieruchomości."*
2. **Wycena** — *"W ciągu 24 godzin przedstawiamy bezpłatną, niezobowiązującą wycenę."*
3. **Umowa u notariusza** — *"Spotykamy się u notariusza. My zajmujemy się dokumentami. Otrzymujesz pieniądze tego samego dnia."*

Każdy krok: duża cyfra (Fraunces serif), nagłówek H3, opis 1-2 zdania, ikona.

### 4.6 "Dlaczego nas wybierają"
Siatka 2x3 (lub 3x2) z 6 USP:
- Bez prowizji
- Bez pośredników
- Problemy prawne OK
- Decyzja w 24h
- Bezpłatna wycena
- Dyskrecja transakcji

Każdy USP: ikona, nagłówek, 1-2 zdania.

### 4.7 Opinie
2-3 cytaty klientów (placeholder na MVP):
- Format: cytat italic Fraunces + imię + lokalizacja + opcjonalnie krótki kontekst sytuacji.
- Przykład placeholdera: *"Po śmierci taty zostałam z domem w spadku, którego nie potrzebowałam. Załatwili wszystko w tydzień, bez stresu i bez papierologii."* — **Anna, Białystok**

**Uwaga:** prawdziwe opinie do uzupełnienia przed publikacją produkcyjną. Na MVP zostawiamy 2-3 wiarygodne placeholdery.

### 4.8 FAQ
Accordion z 6-8 pytaniami:
1. Czy wycena jest naprawdę bezpłatna?
2. Ile trwa cały proces?
3. Czy skupujecie nieruchomości z hipoteką / zadłużeniem?
4. Jakie dokumenty są potrzebne?
5. Co jeśli nieruchomość jest w bardzo złym stanie?
6. Czy można sprzedać udział w nieruchomości (współwłasność)?
7. Czy płacicie gotówką czy przelewem?
8. Czy oferta jest niezobowiązująca?

Każda odpowiedź: 2-4 zdania, konkretne, bez marketingowego "lania wody".

### 4.9 CTA section
Wezwanie końcowe na ciemniejszym tle (szałwiowa zieleń lub piaskowy gradient):
- H2: *"Masz nieruchomość do sprzedania w Białymstoku?"*
- Subtitle: *"Skontaktuj się z nami — wycena w 24 godziny, bez zobowiązań."*
- 2 przyciski: primary scroll do formularza, secondary `tel:` link.

### 4.10 Footer
Minimalistyczny:
- Lewa: logo + krótki tagline.
- Środek: kontakt (telefon, email).
- Prawa: linki (Polityka prywatności, RODO).
- Dół: copyright `© 2026 Nowy Rozdział`.

### 4.11 Floating call button (mobile only)
Sticky w prawym dolnym rogu, ikona telefonu, kolor szałwiowy, klika `tel:+48500441500`. Pojawia się po przewinięciu poza hero.

---

## 5. Formularz kontaktowy

### Pola
1. **Imię** — text, required, min 2 znaki.
2. **Telefon** — tel, required, walidacja regexem polskich numerów (`^(\+48\s?)?(\d{3}[\s-]?\d{3}[\s-]?\d{3})$`).
3. **Email** — email, required, walidacja standardowa.
4. **Typ nieruchomości** — select (radio buttons stylizowane jako pigułki): Działka / Dom / Mieszkanie. Required.
5. **Lokalizacja** — text, required (placeholder: *"np. Białystok, Antoniuk"*).
6. **Opis** — textarea, optional, placeholder: *"Możesz napisać: numer działki / adres, powierzchnię, rok budowy, sytuację prawną, ewentualne obciążenia. Im więcej napiszesz, tym dokładniejsza będzie wycena."*
7. **Cena oczekiwana** — text, optional, placeholder: *"np. 250 000 zł — jeśli masz oczekiwania"*.
8. **Zdjęcia** — file input, multiple, optional, akceptuje `image/*`, max łącznie 5 MB (komunikat o limicie pod polem). Web3Forms wspiera załączniki przesyłane razem z formularzem.

### Anti-spam
- Honeypot: ukryte pole `botcheck` (Web3Forms standard).
- Nie używamy reCAPTCHA na MVP (psuje konwersję).

### Walidacja
- Po stronie klienta przed wysłaniem (każde pole walidowane na blur + przed submitem).
- Komunikaty błędów inline pod polem, kolor terakota `#b8856b`.
- Pole z błędem: czerwony border + ikona ostrzegawcza.

### Wysyłka
- `fetch` POST do `https://api.web3forms.com/submit` z `multipart/form-data`.
- Spinner w przycisku "Wyceń" w trakcie wysyłki, przycisk disabled.
- **Sukces:** redirect na `dziekujemy.html` (osobna strona z podziękowaniem, przewidywanym czasem kontaktu i numerem telefonu jako alternatywą).
- **Błąd:** czerwony komunikat nad formularzem *"Coś poszło nie tak. Spróbuj jeszcze raz lub zadzwoń: 500-441-500."*, dane w polach zostają.

### Klucz Web3Forms
W pliku `assets/js/config.js` jako `window.SITE_CONFIG.web3formsKey`. Klucz jest publiczny (Web3Forms tak działa) — bezpieczeństwo egzekwowane przez whitelistę domen w panelu Web3Forms.

---

## 6. System wizualny

### Paleta kolorów (CSS variables)
```css
--color-bg:           #faf7f2;  /* główne tło, kremowy beż */
--color-bg-alt:       #ffffff;  /* sekcje alternatywne */
--color-bg-warm:      #f5e6d3;  /* hero gradient end */
--color-bg-warm-light:#fef3e2;  /* hero gradient start */
--color-text:         #2d2419;  /* główny tekst, ciemny brąz */
--color-text-muted:   #7a6f5f;  /* tekst pomocniczy */
--color-accent:       #5d6d4f;  /* CTA, linki, akcent — szałwia */
--color-accent-hover: #4a5840;  /* hover/active */
--color-accent-soft:  #e8ede4;  /* tło pigułek/badges */
--color-warning:      #b8856b;  /* walidacja, ostrzeżenia — terakota */
--color-border:       #e8e0d2;  /* linie podziału */
--color-shadow:       rgba(45, 36, 25, 0.06);
```

### Typografia
- **Nagłówki (H1-H3):** `Fraunces`, italic dla H1/H2 hero/sekcji, regular dla H3. Załadowane z Google Fonts (`opt-szht=144`, opcjonalne stylistyczne sety dla dekoracyjnego italic).
- **Body / UI:** `Inter`, weights 400/500/600/700.
- **Eyebrow / labele:** Inter 12px, uppercase, letter-spacing 2px, opacity 0.6.
- **Skala (modular scale, mobile/desktop):**
  - H1: 40px / 64px
  - H2: 28px / 40px
  - H3: 20px / 24px
  - Body: 16px / 17px
  - Small: 14px

### Komponenty
- **Button primary:** tło `--color-accent`, tekst biały, padding 14px 28px, border-radius 8px, font-weight 600, shadow przy hover (lift 2px).
- **Button secondary:** outline `--color-accent` na transparent, ten sam shape.
- **Card:** tło białe, border-radius 12px, padding 24-32px, shadow `0 4px 16px var(--color-shadow)`.
- **Input:** tło `--color-bg`, border `--color-border`, border-radius 8px, padding 12px 14px. Focus: border `--color-accent` + soft glow `0 0 0 3px var(--color-accent-soft)`.
- **FAQ accordion:** linie podziału w `--color-border`, ikona `+` po prawej (rotuje do `×` przy otwarciu), animacja max-height 300ms ease.
- **Spacing rytmiczny:** sekcje 80px desktop / 56px mobile pionowo, elementy w sekcjach 24-32px.

### Mikrointerakcje
- `fade-in` + lekki `translateY(20px → 0)` przy scrollu (Intersection Observer, threshold 0.1).
- Hover na przyciskach: lift 2px + delikatny shadow.
- Smooth scroll dla anchor-linków.

### Responsywność
- Breakpointy: mobile-first.
  - Default: do 640px (mobile).
  - `@media (min-width: 768px)`: tablet.
  - `@media (min-width: 1024px)`: desktop.
- Hero: na mobile formularz pod treścią (stacked), na desktop split.
- Wszystkie siatki: mobile 1 kolumna, tablet 2, desktop 3.

---

## 7. Parametryzacja miasta (multi-city ready)

### Wymóg
Kod ma być łatwo "klonowalny" pod kolejne miasta. Cel: jedna komenda find&replace + zmiana 1 pliku konfiguracyjnego = nowa strona dla nowego miasta.

### Implementacja
**`assets/js/config.js`** — pojedyncze źródło prawdy dla zmiennych:
```js
window.SITE_CONFIG = {
  city: "Białystok",
  cityGenitive: "Białegostoku",   // "skup nieruchomości w Białegostoku" — w copy
  cityLocative: "Białymstoku",    // "w Białymstoku" — w copy
  phone: "500-441-500",
  phoneIntl: "+48500441500",
  email: "info@nowyrozdzial.pl",
  web3formsKey: "TWÓJ_KLUCZ_WEB3FORMS",
};
```

**Reguły kodowania:**
- Wszystkie wystąpienia nazwy miasta w HTML zostają jako **zwykły tekst** (dla SEO — robot musi widzieć tekst, nie czekać na JS).
- Każde wystąpienie nazwy miasta w HTML poprzedzone komentarzem `<!-- city -->` żeby łatwo znaleźć przy klonowaniu.
- Telefon i email zostają jako zwykły tekst w HTML (też dla SEO i dla użytkowników z wyłączonym JS), config.js je nadpisuje przy pierwszym renderowaniu jeśli są inne (sanity check).
- Title, description, og:* w `<head>` też mają komentarze `<!-- city -->`.

**README.md** zawiera checklistę "jak sklonować pod nowe miasto":
1. Skopiuj projekt do nowego folderu.
2. Otwórz `assets/js/config.js` — zmień `city`, `cityGenitive`, `cityLocative`, opcjonalnie `phone`/`email`.
3. Find&replace w całym projekcie: `Białystok` → `[NoweMiasto]`, `Białegostoku` → `[NoweMiasta]`, `Białymstoku` → `[NowymMieście]`.
4. Wygeneruj nowy `og-image.jpg` (1200x630) z nazwą nowego miasta.
5. Zmień meta tag `geo.placename` w `<head>`.
6. Deploy na nowy subdomain / domain.

---

## 8. SEO i performance

### Meta tagi (szablon dla Białegostoku)
- `<title>Skup nieruchomości Białystok — Nowy Rozdział | Decyzja w 24h</title>`
- `<meta name="description" content="Skup działek, domów i mieszkań w Białymstoku. Bezpłatna wycena, decyzja w 24h, bez prowizji. Skupujemy też nieruchomości z problemami prawnymi.">`
- OpenGraph (og:title, og:description, og:image, og:url, og:type=website).
- Twitter Card (summary_large_image).
- `<meta name="geo.placename" content="Białystok">`.
- `<link rel="canonical">` ustawiony na produkcyjny URL.

### Schema.org JSON-LD
Typ `RealEstateAgent`:
```json
{
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "name": "Nowy Rozdział",
  "telephone": "+48500441500",
  "email": "info@nowyrozdzial.pl",
  "areaServed": { "@type": "City", "name": "Białystok" },
  "description": "Skup nieruchomości w Białymstoku — działki, domy, mieszkania. Decyzja w 24h, bez prowizji."
}
```

### Performance
- Wszystkie obrazy: WebP + lazy-loading (`loading="lazy"`).
- Fonty: preconnect do `fonts.googleapis.com` i `fonts.gstatic.com`, `display=swap`.
- CSS i JS w MVP nie minifikowane (małe pliki, mniej friction przy edycji); minifikacja możliwa przed produkcją.
- Inline krytycznego CSS dla above-the-fold (opcjonalne).
- Cel Lighthouse: ≥95 Performance, ≥95 SEO, ≥95 Best Practices, ≥95 Accessibility.

### Accessibility
- Semantyczny HTML (`<header>`, `<main>`, `<section>`, `<footer>`).
- Wszystkie inputy z `<label>` (lub `aria-label`).
- Kontrast tekst/tło min. 4.5:1 (paleta to spełnia).
- Focus ring widoczny na wszystkich interaktywnych elementach.
- Przyciski i linki mają tekstowy opis (nie tylko ikony).
- `prefers-reduced-motion: reduce` wyłącza animacje fade-in.

---

## 9. Zgodność prawna (RODO)

### Wymagane elementy
- **Strona "Polityka prywatności"** (`polityka-prywatnosci.html`) — szablon RODO dla strony zbierającej dane przez formularz: kto przetwarza dane (na razie placeholder, do uzupełnienia gdy będzie NIP/firma), w jakim celu (kontakt w sprawie wyceny), podstawa prawna (art. 6 ust. 1 lit. b RODO), okres przechowywania, prawa użytkownika, kontakt do administratora.
- **Cookie banner** — prosty banner JS (~50 linii) z opcją "Akceptuję" i linkiem do polityki. Brak cookies trackingowych w MVP, więc banner głównie informacyjny. Jeśli/kiedy dodajemy GA4 — banner musi mieć opt-in dla cookies analitycznych.
- **Checkbox zgody w formularzu:** *"Akceptuję politykę prywatności i wyrażam zgodę na przetwarzanie moich danych w celu kontaktu w sprawie wyceny nieruchomości."* — required przed wysłaniem.

### Świadome braki (do uzupełnienia po MVP)
- Dane firmy (NIP, adres siedziby) — potrzebne dla pełnej zgodności i maksymalnego zaufania.
- Klauzula RODO w pełnym brzmieniu (kto jest administratorem) — placeholder do wymiany.

---

## 10. Struktura plików

```
skup/
├── index.html                  # Landing page — cała strona w jednym pliku
├── polityka-prywatnosci.html   # Wymagana RODO
├── dziekujemy.html             # Po wysłaniu formularza
├── 404.html                    # Custom 404
├── assets/
│   ├── css/
│   │   ├── reset.css           # Normalize/reset
│   │   ├── variables.css       # CSS custom properties
│   │   └── styles.css          # Style strony
│   ├── js/
│   │   ├── config.js           # SITE_CONFIG (city, phone, email, web3formsKey)
│   │   ├── form.js             # Walidacja + wysyłka formularza
│   │   └── ui.js               # Accordion FAQ, scroll, mobile nav, fade-in
│   ├── img/
│   │   ├── logo.svg
│   │   ├── og-image.jpg        # OpenGraph 1200x630
│   │   └── icons/              # Lucide SVG (inline preferowane, ale fallback)
│   └── favicon/
│       ├── favicon.ico
│       ├── favicon-32.png
│       └── apple-touch-icon.png
├── robots.txt
├── sitemap.xml
└── README.md                   # Instrukcja klonowania pod nowe miasto
```

---

## 11. Definicja "Done" dla MVP

Strona jest gotowa do publikacji, gdy:
- [ ] Wszystkie sekcje zaimplementowane wg specyfikacji.
- [ ] Formularz wysyła się do Web3Forms i email dochodzi na `info@nowyrozdzial.pl`.
- [ ] Walidacja formularza działa (klient).
- [ ] Strona responsywna na mobile (320px), tablet, desktop.
- [ ] Lighthouse: ≥95 Performance / SEO / Best Practices / Accessibility.
- [ ] Polityka prywatności + cookie banner + checkbox zgody w formularzu.
- [ ] Strona "dziękujemy" działa (po sukcesie formularza).
- [ ] OpenGraph / meta tagi poprawne (sprawdzone w opengraph.xyz).
- [ ] Schema.org JSON-LD waliduje się (Schema Markup Validator).
- [ ] Linki `tel:` działają na mobile.
- [ ] README zawiera instrukcję klonowania pod nowe miasto.
- [ ] Deploy na Netlify, custom domain wpięty, HTTPS aktywne.

---

## 12. Otwarte kwestie do uzupełnienia później (post-MVP)

- Dane firmy (NIP, adres) — uzupełnić w polityce prywatności i footerze.
- Prawdziwe opinie klientów (wymienić placeholdery).
- OG image — przygotować grafikę 1200x630 (na MVP wystarczy prosty z nazwą i hasłem).
- Analityka — wybór GA4 vs Plausible + integracja conversion event.
- Domena produkcyjna — zakup i konfiguracja DNS.
- Klucz Web3Forms — założenie konta + wpisanie klucza w `config.js`.
