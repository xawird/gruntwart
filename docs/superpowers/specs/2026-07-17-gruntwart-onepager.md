# GRUNTWART — FINALNY ONE PAGER (spec od właściciela, verbatim)

Status: ZATWIERDZONY do budowy 2026-07-17. Decyzje wykonawcze:
- Dane rejestrowe (NIP/KRS/spółka/osoba): UKRYTE do czasu podania — sekcja „O nas" bez bloku danych firmy i osoby, stopka bez NIP/KRS/adresu.
- Telefon: 500 441 500 (tel:+48500441500). E-mail w stopce: pomijamy do czasu adresu @gruntwart.pl.
- Design: obecny jasny system (ciepła biel #FDFCFA, ciemna zieleń #1E4D3B, grafit) + NOWY oszczędny akcent starego złota (token --color-gold, propozycja #B08D3E — używać rzadko: logo, drobne detale).
- Domena docelowa: gruntwart.pl (canonical/og na https://gruntwart.pl/; konfiguracja DNS/Netlify po rejestracji domeny — poza kodem).
- Grafika rycerstwa: subtelny line-art SVG (2-3 postacie od tyłu, przygaszone) przy lewej krawędzi hero; ukryta/mocno ograniczona na mobile; aria: dekoracyjna.
- Logo: „GRUNTWART" typograficzne z mieczem wpisanym w literę „t" (inline SVG).

---

## 1. GÓRNE MENU

Lewa strona — logo: **GRUNTWART**; pod logo, opcjonalnie małym tekstem: **Bezpośredni zakup gruntów**.

Prawa strona: Jakich gruntów szukamy · Jak działamy · O nas · Kontakt. Przycisk wyróżniony: **ZGŁOŚ DZIAŁKĘ**.

Menu jest przyklejone do górnej części strony i przewija użytkownika do wybranych sekcji.

## 2. PIERWSZY EKRAN

Układ: lewa ~58% (komunikat), prawa ~42% (formularz na jasnej karcie). Rycerstwo wyłącznie przy lewej krawędzi, maks. 2-3 postacie, lekko przygaszone, bez sceny batalistycznej, nie pod tekstem.

Tekst po lewej:
- Eyebrow: GRUNTWART
- Hasło (wizualnie największe, NIE-H1): **O dobrą cenę nie trzeba walczyć.**
- H1 (semantyczny): **Kupujemy działki miejskie i inwestycyjne w Białymstoku.**
- Akapit: Działamy jako bezpośredni nabywca. Interesują nas działki pod zabudowę mieszkaniową, usługową i komercyjną oraz większe tereny z potencjałem inwestycyjnym.
- Akapit: Przekaż numer działki. Sprawdzimy jej podstawowe parametry i wrócimy z jasną informacją, czy jesteśmy zainteresowani zakupem.
- Trzy informacje pod tekstem: **Bez pośredników** · **Bez prowizji** · **Bez zobowiązania do sprzedaży**

Formularz po prawej (nagłówek: **Zgłoś działkę**):
- Intro: Wystarczy numer działki lub jej dokładna lokalizacja. Pozostałe informacje możemy ustalić podczas rozmowy.
- Pole 1: `Numer działki lub lokalizacja` — placeholder `np. działka 125/4, Białystok` (wymagane)
- Pole 2: `Powierzchnia — opcjonalnie` — placeholder `np. 2500 m²`
- Pole 3: `Numer telefonu` — placeholder `np. 500 000 000` (wymagane)
- Przycisk: **ZGŁOŚ DZIAŁKĘ**
- Pod przyciskiem: Wstępna analiza jest bezpłatna. Przesłanie formularza nie zobowiązuje do sprzedaży.
- Checkbox: Wyrażam zgodę na kontakt w sprawie zgłoszonej nieruchomości i potwierdzam zapoznanie się z polityką prywatności.
- Dodatkowy kontakt: Wolisz porozmawiać? **Zadzwoń: 500 441 500**

## 3. PASEK WIARYGODNOŚCI

**Kupujemy na własny rachunek** — Nie publikujemy Twojej oferty i nie szukamy innego kupującego. Sami podejmujemy decyzję o zakupie.

**Analizujemy potencjał gruntu** — Sprawdzamy lokalizację, przeznaczenie, możliwości zabudowy, dostęp do drogi i podstawowe kwestie prawne.

**Ustalamy konkretne warunki** — Przed podjęciem decyzji znasz proponowaną cenę, sposób rozliczenia i zakładany termin transakcji.

## 4. JAKICH GRUNTÓW SZUKAMY (id: jakich-gruntow-szukamy)

H2: **Nie skupujemy każdej działki. Szukamy gruntów z potencjałem.**

Intro: Koncentrujemy się na nieruchomościach położonych w Białymstoku i jego najbliższym otoczeniu, które mogą zostać wykorzystane pod przyszłą zabudowę lub większą inwestycję.

- **Działki miejskie** — Niezabudowane oraz zabudowane nieruchomości położone w granicach Białegostoku, szczególnie w rozwijających się częściach miasta.
- **Grunty pod zabudowę mieszkaniową** — Działki pod budynki wielorodzinne, zabudowę szeregową, bliźniaczą oraz zespoły domów jednorodzinnych.
- **Działki usługowe i komercyjne** — Grunty przeznaczone pod obiekty usługowe, handlowe, biurowe, magazynowe lub inne przedsięwzięcia komercyjne.
- **Większe tereny inwestycyjne** — Pojedyncze nieruchomości lub kilka sąsiednich działek, które mogą wspólnie utworzyć większy teren pod inwestycję.
- **Działki wymagające dodatkowej analizy** — Brak miejscowego planu, istniejąca zabudowa, nietypowy kształt działki lub konieczność uporządkowania dokumentów nie zawsze wykluczają zakup.

Każdą nieruchomość oceniamy indywidualnie.

Przycisk: **SPRAWDŹ SWOJĄ DZIAŁKĘ** (→ formularz)

## 5. JAK DZIAŁAMY (id: jak-dzialamy)

H2: **Od numeru działki do konkretnej decyzji**

- **01. Zgłaszasz nieruchomość** — Przekazujesz numer działki lub jej lokalizację oraz numer telefonu. Na tym etapie nie potrzebujemy kompletnej dokumentacji.
- **02. Sprawdzamy podstawowe informacje** — Analizujemy między innymi położenie, powierzchnię, kształt działki, dostęp do drogi, przeznaczenie terenu i możliwości przyszłej zabudowy.
- **03. Rozmawiamy o nieruchomości** — Kontaktujemy się z Tobą, aby poznać szczegóły i uzupełnić informacje potrzebne do podjęcia decyzji.
- **04. Przedstawiamy propozycję** — Jeśli działka odpowiada naszym kryteriom, przedstawiamy warunki bezpośredniego zakupu.
- **05. Finalizujemy transakcję** — Po uzgodnieniu ceny, terminu i pozostałych warunków zawieramy umowę u notariusza.

## 6. CO BIERZEMY POD UWAGĘ

H2: **Patrzymy szerzej niż na samą powierzchnię**

Intro: O potencjale działki decyduje nie tylko jej wielkość. W trakcie analizy bierzemy pod uwagę między innymi:

Lista: dokładną lokalizację; otoczenie i istniejącą zabudowę; miejscowy plan zagospodarowania przestrzennego; wydane lub możliwe warunki zabudowy; dostęp do drogi publicznej; dostępność infrastruktury i mediów; powierzchnię, kształt oraz ukształtowanie terenu; stan księgi wieczystej; istniejące ograniczenia i obciążenia; możliwość połączenia z sąsiednimi nieruchomościami; realny sposób wykorzystania gruntu.

Outro: Nie musisz samodzielnie zbierać wszystkich tych informacji. Do rozpoczęcia analizy najczęściej wystarczy numer działki lub dokładna lokalizacja.

## 7. DLACZEGO SPRZEDAŻ BEZPOŚREDNIA

H2: **Bez wystawiania działki i szukania kupca**

Intro: Otwarte wystawienie nieruchomości oznacza zwykle przygotowanie ogłoszenia, rozmowy z pośrednikami, odpowiadanie na zapytania i negocjacje z osobami, które nie zawsze są gotowe do zakupu. W GruntWart od początku rozmawiasz z potencjalnym nabywcą.

- **Bez pośrednictwa** — Nie szukamy inwestora na Twoją działkę. Sami analizujemy możliwość jej zakupu.
- **Bez prowizji od sprzedaży** — Nie pobieramy wynagrodzenia za znalezienie kupującego, ponieważ sami nim jesteśmy.
- **Bez publikowania ogłoszenia** — Nie musisz publicznie wystawiać nieruchomości ani prowadzić rozmów z wieloma zainteresowanymi.
- **Bez niejasnych deklaracji** — Jeżeli nieruchomość odpowiada naszym kryteriom, przedstawiamy konkretną propozycję i omawiamy warunki transakcji.
- **Bez zobowiązania** — Samo zgłoszenie działki, rozmowa ani otrzymanie propozycji nie zobowiązują Cię do sprzedaży.

## 8. OBSZAR DZIAŁANIA

H2: **Białystok i najbliższe okolice**

Intro: Największe zainteresowanie kierujemy na działki znajdujące się w granicach Białegostoku oraz na terenach bezpośrednio sąsiadujących z miastem. Analizujemy również wybrane nieruchomości położone między innymi na terenie gmin:

Lista gmin: Wasilków; Choroszcz; Juchnowiec Kościelny; Turośń Kościelna; Dobrzyniewo Duże; Supraśl; Zabłudów.

Outro: W przypadku większych terenów inwestycyjnych rozpatrujemy również inne lokalizacje na terenie województwa podlaskiego.

CTA: Nie widzisz swojej lokalizacji? **Prześlij numer działki. Sprawdzimy ją indywidualnie.** (link → formularz)

## 9. O NAS (id: o-nas)

H2: **Lokalny nabywca gruntów**

GruntWart to marka skoncentrowana na bezpośrednim zakupie działek miejskich i terenów inwestycyjnych.

Nie jesteśmy portalem ogłoszeniowym ani pośrednikiem przekazującym zgłoszenia innym firmom. Każda nieruchomość trafia bezpośrednio do osób odpowiedzialnych za analizę i podjęcie decyzji zakupowej.

Działamy lokalnie. Znamy Białystok, jego rozwijające się obszary oraz specyfikę rynku gruntów w najbliższych gminach.

Kontakt: Masz pytanie przed zgłoszeniem działki? Zadzwoń. Porozmawiasz bezpośrednio z osobą odpowiedzialną za analizę nieruchomości. **500 441 500**

[UKRYTE do czasu podania: dane spółki (nazwa/adres/NIP/KRS), imię i nazwisko osoby, e-mail, zdjęcie zespołu — patrz decyzje na górze.]

## 10. FAQ

H2: **Najczęstsze pytania**

1. **Czy zgłoszenie działki jest bezpłatne?** — Tak. Wstępna analiza nieruchomości oraz informacja o zainteresowaniu zakupem są bezpłatne.
2. **Czy zgłoszenie zobowiązuje mnie do sprzedaży?** — Nie. Przesłanie formularza, rozmowa ani otrzymanie propozycji nie zobowiązują do zawarcia transakcji.
3. **Jakie informacje są potrzebne na początku?** — Najczęściej wystarczy numer działki lub jej dokładna lokalizacja oraz numer telefonu. Jeżeli znasz obręb i powierzchnię, możesz podać je dodatkowo.
4. **Jak ustalana jest proponowana cena?** — Bierzemy pod uwagę między innymi lokalizację, przeznaczenie terenu, powierzchnię, kształt działki, dostęp do drogi, możliwości zabudowy, stan prawny oraz koszty i ryzyka związane z przyszłą inwestycją.
5. **Czy kupujecie działki bez miejscowego planu?** — Brak miejscowego planu nie wyklucza analizy. W takiej sytuacji sprawdzamy między innymi istniejące warunki zabudowy, sąsiedztwo oraz możliwość przyszłego zagospodarowania terenu.
6. **Czy działka może być zabudowana?** — Tak. Analizujemy również nieruchomości ze starszymi budynkami, obiektami gospodarczymi lub zabudową, która może wymagać przebudowy albo rozbiórki.
7. **Czy kupujecie kilka sąsiednich działek?** — Tak. Interesują nas również tereny składające się z kilku sąsiednich nieruchomości, także należących do różnych właścicieli.
8. **Czy analizujecie współwłasność lub nieuporządkowany stan prawny?** — Takie przypadki rozpatrujemy indywidualnie. Możliwość zakupu zależy od rodzaju współwłasności, zapisów księgi wieczystej i pozostałych okoliczności prawnych.
9. **Jak szybko otrzymam odpowiedź?** — Czas analizy zależy od nieruchomości i dostępności podstawowych informacji. Po otrzymaniu zgłoszenia sprawdzamy działkę i odzywamy się, gdy tylko mamy konkretną informację — zwykle w ciągu kilku dni roboczych.
10. **Czy kupujecie działki poza Białymstokiem?** — Tak, jeżeli lokalizacja i parametry gruntu odpowiadają naszym kryteriom. Największe zainteresowanie kierujemy na Białystok i jego bezpośrednie okolice.

## 11. KOŃCOWE WEZWANIE DO DZIAŁANIA

H2: **Masz działkę w Białymstoku lub okolicach?**

Przekaż jej numer. Sprawdzimy podstawowe parametry i poinformujemy Cię, czy jesteśmy zainteresowani zakupem.

Hasło (duże): **O dobrą cenę nie trzeba walczyć.**

Przycisk główny: **ZGŁOŚ DZIAŁKĘ** (→ formularz na pierwszym ekranie). Dodatkowo: Wolisz porozmawiać? **Zadzwoń: 500 441 500**

## 12. STOPKA (id: kontakt)

**GRUNTWART** — Bezpośredni zakup działek miejskich i inwestycyjnych w Białymstoku i okolicach.

Telefon: 500 441 500. Linki: Polityka prywatności · Informacja o plikach cookies.

© 2026 GruntWart. Wszystkie prawa zastrzeżone.

[UKRYTE do czasu podania: nazwa spółki, adres, NIP, KRS, e-mail.]

## USTAWIENIA SEO

- Title: **Skup działek Białystok – działki miejskie i inwestycyjne | GruntWart**
- Meta description: **Kupujemy działki miejskie i inwestycyjne w Białymstoku i okolicach. Przekaż numer działki i sprawdź, czy jesteśmy zainteresowani zakupem.**
- H1 semantyczny: **Kupujemy działki miejskie i inwestycyjne w Białymstoku** (hasło „O dobrą cenę nie trzeba walczyć" wizualnie większe, ale nie-H1).
- Adres: gruntwart.pl (canonical/og).
- Alt grafiki wprowadzającej: **GruntWart – skup działek miejskich i inwestycyjnych w Białymstoku** (bez keyword-stuffingu; jeśli czysto dekoracyjna — alt pusty/aria-hidden).

## WYTYCZNE WIZUALNE

Pierwszy ekran: ~58/42; formularz na jasnej odciętej karcie; maks. 3 pola widoczne od razu; telefon widoczny bez przewijania; rycerstwo tylko przy lewej krawędzi, nie pod tekstem, nie konkuruje z formularzem.

Motyw Grunwaldu wyłącznie: grafika pierwszego ekranu; logo (miecz w literze „t"); wybrane reklamy. Reszta strony nowoczesna i inwestycyjna.

Kolorystyka: ciepła biel; ciemna zieleń; grafit; oszczędny akcent starego złota.

Czego NIE używać: pergaminowego tła; średniowiecznych fontów; herbów i chorągwi; scen walki; czerwonych przycisków; stocków z kluczami/uściskiem dłoni; animacji mieczy/tarcz/rycerzy; liczników bez pokrycia.

## WERSJA MOBILNA

Kolejność: logo → hasło → informacja o zakupie → formularz → telefon → pasek wiarygodności → dalsze sekcje. Rycerstwo mocno ograniczone albo ukryte. Formularz widoczny bez długiego przewijania. Na dole ekranu przyklejony pasek z dwoma przyciskami: **ZADZWOŃ** · **ZGŁOŚ DZIAŁKĘ**.

## PODSTRONY (FAZA 2 — poza tym planem)

/skup-dzialek-bialystok, /dzialki-inwestycyjne-bialystok, /skup-dzialek-budowlanych, /skup-dzialek-uslugowych, /skup-gruntow-inwestycyjnych, /sprzedaz-dzialki-deweloperowi, /jak-dzialamy, /o-nas, /kontakt. Bez kilkudziesięciu niemal identycznych podstron; każda odpowiada na odrębne pytanie i niesie realną treść.
