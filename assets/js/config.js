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
  cityGenitive: "Białegostoku",   // np. "skup nieruchomości w Białegostoku"
  cityLocative: "Białymstoku",    // np. "w Białymstoku"

  // Kontakt
  phone: "500-441-500",
  phoneIntl: "+48500441500",      // dla tel: linka i WhatsApp
  email: "info@nowyrozdzial.pl",

  // Web3Forms — zarejestruj się na https://web3forms.com i wpisz access key
  web3formsKey: "REPLACE_ME_WITH_WEB3FORMS_KEY",

  // Marka
  brand: "Nowy Rozdział",
  tagline: "Pomagamy zacząć od nowa.",
};
