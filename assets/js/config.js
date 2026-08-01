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
  cityGenitive: "Białegostoku",   // np. "skup nieruchomości Białegostoku i okolic"
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
  web3formsKey: "7e205f93-6c29-493c-87af-7fb2ec28cd0f",

  // Meta Pixel — WYŁĄCZONY. Obsługa została w ui.js, ale pole jest puste, więc
  // pixel się nie ładuje i nie ustawia żadnych cookies.
  //
  // >>> ZANIM TU COKOLWIEK WPISZESZ: polityka prywatności NIE wymienia już Meta
  // jako odbiorcy danych (usunięte 31.07.2026, bo pixela nie było w kodzie).
  // Wpisanie ID bez przywrócenia tego zapisu = przetwarzanie danych przez
  // podmiot nieujawniony w polityce, czyli naruszenie RODO. Kolejność jest
  // taka: najpierw zapis w polityce (punkt 5 „Komu udostępniamy dane" i punkt
  // 7 „Pliki cookies"), dopiero potem ID poniżej.
  //
  // Po wpisaniu ID pixel ładuje się WYŁĄCZNIE z callbacku akceptacji w banerze.
  // Nie wklejaj snippetu Meta do <head> — złamiesz uprzedniość zgody i baner
  // stanie się dekoracją. Patrz assets/js/ui.js.
  fbPixelId: "",

  // Marka
  brand: "GruntWart",
  tagline: "O dobrą cenę nie trzeba walczyć.",
};
