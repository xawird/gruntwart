/**
 * SITE_CONFIG — pojedyncze źródło prawdy dla zmiennych specyficznych dla miasta.
 *
 * Aby sklonować stronę pod nowe miasto:
 *   1. Zmień wartości w tym pliku (city, cityGenitive, cityLocative).
 *   2. Wykonaj find&replace nazwy miasta w plikach HTML (komentarze <!-- city -->
 *      oznaczają miejsca do zmiany).
 *   3. Podmień og-image.jpg i geo.placename meta tag.
 *   4. Wpisz właściwy klucz Web3Forms (web3formsKey).
 */
window.SITE_CONFIG = {
  // Miasto
  city: "Białystok",
  cityGenitive: "Białegostoku",   // np. "skup gruntów w Białegostoku"
  cityLocative: "Białymstoku",    // np. "w Białymstoku"

  // Kontakt — wyłącznie telefon, bez adresu e-mail.
  // phone: format wyświetlany użytkownikowi — ZAWSZE ze spacjami, tak jak w HTML.
  phone: "728 517 226",
  phoneIntl: "+48728517226",      // dla tel: linka

  // Web3Forms — access key (UUID) wstrzykiwany do pola access_key formularza.
  // >>> WSTAW_KLUCZ_WEB3FORMS <<< — zarejestruj się na https://web3forms.com,
  // skopiuj klucz w formacie UUID (np. "a1b2c3d4-1234-5678-9abc-def012345678")
  // i wklej go poniżej w miejsce placeholdera.
  // DOPÓKI TO NIE JEST POPRAWNY UUID (placeholder, pusty string, cokolwiek innego),
  // form.js NIE wysyła POST-a do Web3Forms — pokazuje ścieżkę ratunkową (telefon),
  // żeby nie tracić kontaktu na błędzie 400. Patrz assets/js/form.js.
  web3formsKey: "WSTAW_KLUCZ_WEB3FORMS",

  // Meta Pixel — JEDYNY przełącznik trybu zgody na całej stronie.
  // DOPÓKI TO POLE JEST PUSTE: strona nie ładuje niczego z zewnątrz, nie ustawia
  // żadnych cookies i baner zgody NIE jest pokazywany (nie ma o co pytać).
  // PO WPISANIU ID: baner włącza się sam, a pixel ładuje się WYŁĄCZNIE z
  // callbacku akceptacji. Nie wklejaj snippetu Meta do <head> — złamiesz
  // uprzedniość zgody i baner stanie się dekoracją. Patrz assets/js/ui.js.
  fbPixelId: "",

  // Marka
  brand: "GruntWart",
  tagline: "O dobrą cenę nie trzeba walczyć.",
};
