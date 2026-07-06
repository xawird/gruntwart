# Redesign strony nowyrozdzial.pl — one-page, jasny minimalizm premium

Data: 2026-07-06 · Status: zatwierdzone kierunkowo (treść + kierunek wizualny)

## Cel

Przebudować stronę na nowoczesny, zwięzły one-page landing skupu nieruchomości
(Białystok i okolice): dużo mniej tekstu, mocne CTA, zoptymalizowany pod SEO
lokalne i kampanie Google Ads.

## Zakres

- Przebudowa `index.html` + stylów (`assets/css/*`).
- Skrócenie formularza i dostosowanie `assets/js/form.js`.
- Warstwa SEO: nowy `<title>`/meta, schema LocalBusiness + FAQPage.
- Dostosowanie stylistyczne `dziekujemy.html`, `404.html`,
  `polityka-prywatnosci.html` do nowego designu (bez zmian treści).
- Bez zmian: hosting Netlify, Web3Forms, `config.js` (mechanizm miast),
  `sitemap.xml`, `robots.txt`, nagłówki bezpieczeństwa.

## Mapa treści (kolejność sekcji)

1. **Hero** — H1: „Skup nieruchomości Białystok — gotówka w 24 h".
   Jedno zdanie: „Kupujemy działki, domy i mieszkania za gotówkę. Bez prowizji,
   bez pośredników." CTA: przycisk „Wyceń nieruchomość" (scroll do formularza)
   + klikalny telefon. Pod spodem pasek zaufania:
   `Decyzja w 24 h · 0 zł prowizji · Umowa u notariusza`.
2. **Formularz** — 3 pola: telefon (wymagane), lokalizacja, typ nieruchomości
   (Działka / Dom / Mieszkanie). Zgoda RODO. Bez pól: imię, email, opis, cena,
   zdjęcia. Wysyłka przez Web3Forms → redirect `/dziekujemy.html`.
3. **Co skupujemy** — H2 + 3 karty (Działki / Domy / Mieszkania), po jednym
   zdaniu. W tej sekcji naturalnie wplecione miejscowości: Wasilków, Supraśl,
   Choroszcz, Łapy, Juchnowiec (frazy lokalne bez podstron).
4. **Jak to działa** — 3 kroki: Telefon → Wycena w 24 h → Gotówka u notariusza.
   Jedno zdanie na krok.
5. **Dlaczego my** — 4 punkty: 24 h, bez prowizji, każda sytuacja prawna,
   pełna dyskrecja. Hasło + pół zdania.
6. **FAQ** — 4–5 pytań sformułowanych jak zapytania z Google
   (np. „Jak szybko sprzedam mieszkanie w Białymstoku?", „Czy kupujecie
   nieruchomości z hipoteką?"). Accordion.
7. **Finalne CTA** — duży numer telefonu + przycisk do formularza. Stopka:
   marka, polityka prywatności.

Usuwamy: sekcję opinii (anonimowe testimoniale obniżają wiarygodność — wrócą,
gdy będą prawdziwe z Google), sekcję „Konkret, nie obietnice" w obecnej,
rozwlekłej formie (zastępuje ją pkt 5).

## Kierunek wizualny — jasny minimalizm premium

- **Tło:** biel / złamana biel. **Akcent:** głęboka ciemna zieleń
  (kontynuacja obecnej marki, mocniejsza saturacja). Neutralne szarości do
  tekstu pomocniczego.
- **Typografia:** duży elegancki serif w nagłówkach (obecny kierunek zostaje,
  większa skala), czytelny sans-serif w treści. Wyraźna hierarchia — H1 bardzo
  duże, mało tekstu wokół.
- **Hero-wizual:** abstrakcyjna, subtelna grafika architektoniczna (SVG
  line-art / gradient) zamiast stockowego zdjęcia — brak problemów
  licencyjnych, lekka strona; slot łatwy do podmiany na prawdziwe zdjęcie.
- **Układ:** każda sekcja mieści się na ~1 ekranie, duże odstępy, karty
  z delikatnym cieniem/obrysem, zaokrąglenia. Sticky header z telefonem
  i CTA. Na mobile: pływający przycisk „Zadzwoń".
- Animacje fade-in zostają (z `prefers-reduced-motion`), oszczędniej.

## Warstwa SEO

- `<title>`: „Skup Nieruchomości Białystok — Gotówka w 24h | Nowy Rozdział".
- Meta description z CTA i telefonem (~150 znaków).
- JSON-LD: `LocalBusiness` (nazwa, telefon, email, `areaServed`: Białystok
  i okoliczne gminy) + `FAQPage` (pytania z sekcji FAQ).
- Jeden H1, poprawna hierarchia H2/H3, semantyczne sekcje.
- Frazy docelowe: „skup nieruchomości Białystok", „skup mieszkań Białystok",
  „skup domów Białystok", „skup działek Białystok" — rozłożone w H1/H2/FAQ.

## Pod Google Ads

- Jeden cel konwersji: wysłany formularz (redirect na `/dziekujemy.html`
  = strona konwersji) + klik w `tel:` (mierzalny event).
- Nagłówek hero spójny z przyszłą treścią reklam (message match).
- Szybkość: brak zewnętrznych bibliotek, fonty lokalne lub system,
  budżet < 100 KB na pierwsze załadowanie.

## Poza zakresem

- Podstrony typów nieruchomości i miejscowości, blog.
- Zmiana dostawcy formularzy, backend, CMS.
- Rejestracja wizytówki Google / kampanii Ads (osobne zadanie, poza kodem).

## Kryteria sukcesu

- Strona przechodzi Lighthouse: Performance ≥ 95, SEO = 100, A11y ≥ 95.
- Cała treść to ~60% obecnej objętości tekstu lub mniej.
- Formularz działa end-to-end (walidacja → Web3Forms → /dziekujemy.html).
- Schema waliduje się w Rich Results Test (FAQ + LocalBusiness).
