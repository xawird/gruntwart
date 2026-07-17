# Pivot: skup działek (jasny design zostaje)

Data: 2026-07-17 · Status: zatwierdzone kierunkowo (zakres + art direction + treść)

## Cel

Przeprofilować stronę nowyrozdzial.pl ze skupu wszystkich nieruchomości na
**specjalizację w gruntach** (Białystok i okolice do ~20 km), z ofertą
uzupełniającą (domy, nieruchomości komercyjne). Design pozostaje obecny (jasny minimalizm premium — decyzja użytkownika po odrzuceniu wersji dark); nowe są teksty z najwyższej półki marketingowej: konkret,
liczby, zero pustych przymiotników.

## Pozycjonowanie przekazu

- Hero i SEO w 100% pod działki (fraza główna: „skup działek Białystok").
- Domy i komercyjne jako druga linia: pasek w „Co kupujemy", opcja
  w formularzu, pytanie w FAQ. Nie występują w hero ani w title.
- Typy skupowanych gruntów: budowlane, zabudowane do rozbiórki,
  inwestycyjne/usługowe. Rolnych nie komunikujemy.

## Zakres

- `index.html`: pełna podmiana treści wszystkich sekcji + head SEO.
- `assets/css/variables.css` + `styles.css`: nowa paleta dark, nowa
  typografia (gruby grotesk + monospace dla liczb/etykiet); layoutowe
  klasy (.container, gridy) zostają.
- `assets/js/form.js`: typy w formularzu (Działka / Dom / Komercyjna),
  pole lokalizacji jako „adres lub numer działki".
- Nowy og-image (dark), nowa grafika hero (SVG: parcela/mapa w limonce).
- Podstrony (dziekujemy/404/polityka) dostosowane kolorystycznie.
- Schema: RealEstateAgent (bez zmian danych firmy) + FAQPage z nowymi
  pytaniami. Sitemap lastmod. Bez zmian: Netlify, Web3Forms, config.js.

## Kierunek wizualny

BEZ ZMIAN: obecny jasny minimalizm premium (biel #FDFCFA, zieleń #1E4D3B,
serif w nagłówkach). Wersja „inwestycyjny dark" została zaprototypowana
i ODRZUCONA przez użytkownika 2026-07-17 („potrzebuję coś czystego na
białym tle"). Zmieniają się tylko: grafika hero (parcela), ikony, og-image
(w jasnej palecie) i cała treść.

## Treść (skrót — pełny copy deck w planie implementacji)

1. **Hero**: eyebrow mono `BIAŁYSTOK I OKOLICE · SKUP GRUNTÓW`; H1 „Twoja
   działka ma dziś kupca."; sub o wycenie w 24 h i gotówce przy akcie;
   CTA `Poznaj wycenę w 24 h` + telefon; pasek liczb mono
   (24 h / 14 dni / 0 zł).
2. **Formularz**: telefon* + adres lub nr działki + typ
   (Działka / Dom / Komercyjna) + zgoda.
3. **Co kupujemy**: 3 karty gruntowe (budowlane, zabudowane do rozbiórki,
   inwestycyjne) + zasięg (Białystok + 6 gmin) + pasek „Poza gruntami"
   (domy i komercyjne).
4. **Proces**: Zgłoszenie → Wycena w 24 h (MPZP, KW — „kwota, nie
   widełki") → Akt i przelew.
5. **Dlaczego my**: Kwota nie widełki (oferta na piśmie, 14 dni) · Każdy
   stan prawny · Zero kosztów po stronie sprzedającego · Dyskrecja.
6. **FAQ** (frazy z Google): sprzedaż działki bez pośrednika, działki bez
   WZ, ile za m², działka ze starym domem, jak długo trwa, czy tylko
   działki.
7. **Finalne CTA**: „Sprawdź, ile jest warta Twoja działka." + telefon.

## SEO

- Title: `Skup Działek Białystok — Gotówka w 24h | Nowy Rozdział`.
- Meta description pod działki z telefonem.
- FAQPage schema = nowe pytania (byte-match z HTML). RealEstateAgent
  zostaje (dane firmy bez zmian). Jeden H1, hierarchia bez przeskoków.

## Kryteria sukcesu

- Spójny dark design na 4 stronach (w tym cookie banner, theme-color).
- Budżet < 100 KB, zero CDN, formularz działa e2e, konsola czysta.
- Schema parsuje się; FAQ byte-match HTML↔JSON-LD.
- Kontrast WCAG AA na dark (tekst/przyciski/limonka z ciemnym tekstem).
