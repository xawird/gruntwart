# GruntWart — Landing Page

Statyczny one-pager marki "GruntWart" — bezpośredni zakup gruntów (działki miejskie
i inwestycyjne). Pierwsze wdrożenie: Białystok. Domena docelowa: https://gruntwart.pl/

## Stos technologiczny

- HTML5 + CSS3 (custom properties, grid, flexbox)
- Vanilla JavaScript (ES6+, brak frameworków, brak buildu)
- Fonty wyłącznie systemowe — ZERO webfontów, ZERO CDN, zero zależności zewnętrznych
- Web3Forms (backend formularza)
- Hosting: Netlify

Budżet całej strony: < 100 KB.

## Lokalne uruchomienie

Otwórz `index.html` w przeglądarce. Albo (zalecane — działają wtedy ścieżki absolutne `/assets/...`):

```bash
python3 -m http.server 8080
# lub
npx serve .
```

Potem otwórz: http://localhost:8080

## Konfiguracja przed deployem

1. **Web3Forms key — BLOKER STARTU KAMPANII.** Zarejestruj się na https://web3forms.com,
   skopiuj access key (format UUID) i wpisz go w `assets/js/config.js` → `web3formsKey`.
   Whitelistuj domenę produkcyjną w panelu Web3Forms.
   Dopóki to pole jest puste, `assets/js/form.js` **nie wysyła POST-a** (świadomie — placeholder
   dawał HTTP 400 i cichą utratę leada). Zamiast tego użytkownik dostaje komunikat z klikalnym
   numerem telefonu, a w konsoli pojawia się ostrzeżenie. Zweryfikuj po wklejeniu klucza: pełny
   submit ma kończyć się przekierowaniem na `/dziekujemy.html`.
2. **Domena** — zakup domeny, wpięcie w Netlify (Settings → Domain management).
   `sitemap.xml`, `robots.txt`, `canonical` i `og:url` wskazują już na `https://gruntwart.pl/`.
3. **OG image** — `assets/img/og-image.jpg` (1200x630) jest gotowy i przebrandowany.

## Klonowanie pod nowe miasto

1. **Sklonuj projekt** do nowego folderu.

2. **Edytuj `assets/js/config.js`:**
   - `city` — mianownik: `"Olsztyn"`
   - `cityGenitive` — dopełniacz: `"Olsztyna"`
   - `cityLocative` — miejscownik: `"Olsztynie"`
   - opcjonalnie: `phone` (format ze spacjami!), `phoneIntl`, `web3formsKey`

3. **Find&replace nazw miasta w plikach HTML:**
   ```bash
   grep -rn "Białystok\|Białegostoku\|Białymstoku" --include="*.html" .
   sed -i '' 's/Białystok/Olsztyn/g; s/Białegostoku/Olsztyna/g; s/Białymstoku/Olsztynie/g' \
     index.html polityka-prywatnosci.html dziekujemy.html 404.html
   ```
   **Uwaga:** każdorazowo sprawdź wynik — odmiana bywa nieregularna.

4. **JSON-LD w `index.html`** — zaktualizuj `address.addressLocality`, `address.addressRegion`
   oraz listę `areaServed` (musi zgadzać się z widoczną treścią w sekcji `#o-nas`).

5. **`<meta name="geo.placename">`** — ustaw na nowe miasto.

6. **Wygeneruj nowy `og-image.jpg`**; podmień domenę w `sitemap.xml`, `robots.txt`,
   `canonical` i `og:url` (4 strony).

7. **Deploy** na nowy projekt Netlify.

## Struktura plików

```
.
├── index.html                  # Landing page (one-pager)
├── polityka-prywatnosci.html   # RODO
├── dziekujemy.html             # Po wysłaniu formularza
├── 404.html                    # Custom 404
├── netlify.toml                # Konfiguracja Netlify (headers, redirects)
├── robots.txt
├── sitemap.xml
├── assets/
│   ├── css/   {reset,variables,styles}.css
│   ├── js/    {config,form,ui}.js
│   ├── img/   og-image.jpg
│   └── favicon/favicon.svg
└── docs/superpowers/  (spec + plan — zapis historyczny, zawiera starą markę)
```

## Co jest do uzupełnienia

- **Klucz Web3Forms** (patrz wyżej) — bez niego formularz nie zbiera leadów.
- **Pomiar konwersji.** `form.js` emituje przy sukcesie zdarzenie `gruntwart:lead`
  i wpis `lead_submit` do `window.dataLayer` — bez żadnego zewnętrznego skryptu.
  Podpięcie Meta Pixela / GA4 wymaga (a) własnego skryptu i (b) **rozszerzenia zgody
  w banerze cookies**, który dziś deklaruje wyłącznie cookies techniczne.
- **Dane rejestrowe** świadomie NIE są publikowane (wymóg właściciela) — nie dopisuj
  NIP/KRS/REGON/adresu siedziby ani adresu e-mail bez jego decyzji.

## Testowanie

- **Walidacja HTML:** https://validator.w3.org/
- **Schema.org JSON-LD:** https://validator.schema.org/ oraz Google Rich Results Test
- **OpenGraph:** https://opengraph.xyz/
- **Lighthouse:** Chrome DevTools → Lighthouse (cel: ≥95 we wszystkich kategoriach)
- **Mobile:** sprawdź iPhone SE (375x667) — pierwszy ekran, baner cookies i `.mobile-bar`
