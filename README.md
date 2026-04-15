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
