# SETUP-KONT — checklista uruchomienia kont marketingowych GruntWart

Instrukcja do samodzielnego wyklikania, krok po kroku, w tej kolejności.
Przy każdym kroku jest pole na wklejenie uzyskanego identyfikatora — trzymaj
wszystko w tym pliku. Plik jest wewnętrzny (nie trafia na serwer).

Stan strony w momencie utworzenia checklisty:
- Domena: **gruntwart.pl** (live, HTTPS działa, hosting: GitHub Pages)
- Telefon na stronie: **728 517 226**
- Formularz Web3Forms: **JUŻ AKTYWNY** (krok A jest w większości odhaczony)

---

## A. Web3Forms (web3forms.com) — ✅ w większości zrobione

- [x] Konto założone, adres odbiorczy: **biuro@gruntwart.pl**
- [x] Access Key wklejony w `assets/js/config.js` (pole `web3formsKey`)
- [ ] Wysłać testowe zgłoszenie z https://gruntwart.pl (formularz w hero)
- [ ] Potwierdzić, że mail dotarł na biuro@gruntwart.pl (sprawdź też SPAM)

Access Key: `7e205f93-6c29-493c-87af-7fb2ec28cd0f` (już w kodzie)

---

## B. Google Ads (ads.google.com)

- [ ] Załóż konto — **POMIŃ kreator pierwszej kampanii**: na dole ekranu
      kliknij „Przełącz na tryb eksperta" / „Utwórz konto bez kampanii"
- [ ] Ustaw: kraj **Polska**, strefa czasowa **Warszawa**, waluta **PLN**
      ⚠️ UWAGA: strefy czasowej i waluty NIE DA SIĘ zmienić po utworzeniu konta
- [ ] Płatnik: **organizacja** — Maestria Invest sp. z o.o., NIP 9662175944
- [ ] Podepnij kartę płatniczą
- [ ] Uruchom **weryfikację reklamodawcy** (Narzędzia → Rozliczenia /
      Weryfikacja reklamodawcy) — może potrwać do 2 tygodni, zacznij od razu
- [ ] Wyłącz auto-stosowanie rekomendacji: Rekomendacje → Ustawienia
      automatycznego stosowania → **wszystko OFF**
- [ ] Włącz weryfikację dwuetapową (2FA) na koncie Google

ID konta Google Ads (format 123-456-7890): `____________________`

---

## C. Google Analytics 4 (analytics.google.com)

- [ ] Utwórz konto + usługę (property) **„GruntWart"**
- [ ] Strefa czasowa: **Warszawa**, waluta: **PLN**
- [ ] Skopiuj **identyfikator pomiaru** (format `G-XXXXXXXXXX`)
- [ ] Wklej go w kod — 5 plików, w każdym linia
      `var GA_ID = 'G-XXXXXXXXXX';` (szukaj: „DO UZUPEŁNIENIA"):
      `index.html`, `bialystok.html`, `lodz.html`, `dziekujemy.html`,
      `polityka-prywatnosci.html`
- [ ] Połącz GA4 z Google Ads: Administracja → Połączenia z usługami →
      Google Ads → wybierz konto z kroku B

Identyfikator pomiaru GA4: `G-__________`

---

## D. Google Search Console (search.google.com/search-console)

- [ ] Dodaj usługę: typ **domena** (`gruntwart.pl`, wymaga wpisu TXT w DNS
      na aftermarket.pl) LUB typ **prefiks URL** (`https://gruntwart.pl/`,
      weryfikacja meta tagiem — prostsze)
- [ ] Przy prefiksie URL: skopiuj meta tag weryfikacyjny i wklej go
      w przygotowany placeholder w `<head>` stron (szukaj:
      „SEARCH CONSOLE — DO UZUPEŁNIENIA"); wystarczy `index.html`,
      ale placeholder jest we wszystkich 5 plikach
- [ ] Po pozytywnej weryfikacji: Indeksowanie → Mapy witryn → wgraj
      `https://gruntwart.pl/sitemap.xml`

Meta tag / wpis TXT: `____________________`

---

## E. Google Business Profile (business.google.com) — 2 profile

Wspólne ustawienia dla obu:
- typ: **firma obsługująca klientów w terenie** (bez publicznego adresu!)
- kategoria: skup / obrót nieruchomościami
- telefon: **728 517 226**

- [ ] Profil 1 — **Białystok**: obszar działania Białystok + okolice
      (Wasilków, Grabówka, Zaścianki, Kleosin…), strona:
      `https://gruntwart.pl/bialystok.html`
- [ ] Profil 2 — **Łódź**: obszar działania Łódź + okolice (Zgierz,
      Pabianice, Rzgów, Andrespol…), strona:
      `https://gruntwart.pl/lodz.html`
- [ ] Przejdź weryfikację obu profili — pocztówka lub nagranie wideo;
      ⚠️ może potrwać od kilku dni do kilku tygodni, zacznij wcześnie

ID / link profilu Białystok: `____________________`
ID / link profilu Łódź: `____________________`

---

## Ewidencja leadów

Zgłoszenia z formularza przychodzą mailem (Web3Forms) — przepisuj je do
`arkusz-leadow.csv` (otwiera się poprawnie w polskim Excelu; separator
średnik). Statusy do wyboru są w nagłówku kolumny „Status".
