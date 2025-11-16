---
title: Dokumentacja zmiennych środowiskowych
description: Dokumentacja zmiennych środowiskowych Onetime Secret
sidebar:
  order: 5
---

Ten przewodnik obejmuje wszystkie zmienne środowiskowe dostępne w Onetime Secret v0.22.4+.


## Zmienne środowiskowe

Ustaw je w pliku `.env`, środowisku lub dodaj do poleceń docker lub pliku docker-compose.yml. Wszystkie zmienne są opcjonalne, chyba że oznaczone jako wymagane.

### Podstawowe ustawienia aplikacji

```bash
SECRET=your-32-char-hex-key           # Klucz tajny dla sesji i szyfrowania (WYMAGANY) - NIE zmieniaj po ustawieniu
PORT=3000                             # Port, na którym serwer webowy ma nasłuchiwać (domyślnie: 3000)
HOST=localhost:3000                   # Kombinacja hosta i portu używana do generowania linków
SSL=true                              # Kontroluje https/http przy generowaniu linków (true/false)
SERVER_TYPE=thin                      # Typ serwera webowego: thin, puma
RACK_ENV=production                   # Środowisko aplikacji: development, production, test
```

### Baza danych i przechowywanie

UWAGA: Zmienne zaczynające się od REDIS_ mogą być alternatywnie ustawione z prefiksem VALKEY_.

```bash
REDIS_URL=redis://localhost:6379/0   # Ciąg połączenia Redis dla sesji, sekretów i wszystkich danych aplikacji
```

### Uwierzytelnianie i bezpieczeństwo

```bash
AUTH_ENABLED=true                     # Włącz system uwierzytelniania (wyłącza uwierzytelnianie API, gdy false)
AUTH_SIGNUP=true                      # Zezwól na rejestrację nowych użytkowników
AUTH_SIGNIN=true                      # Zezwól istniejącym użytkownikom na logowanie
AUTH_AUTOVERIFY=false                 # Pomiń weryfikację e-mail dla nowych kont
COLONEL=email@example.com             # Adresy e-mail administratorów z uprawnieniami "colonel" (oddzielone przecinkami)
```

**Uwaga**: "Colonel" to nasz termin dla użytkowników "admin". Colonels mogą uzyskać dostęp do obszaru administracyjnego pod `/colonel`, który pokazuje podstawowe statystyki systemowe. Interfejs administratora ma obecnie ograniczoną funkcjonalność - bez zarządzania użytkownikami i tylko przeglądanie konfiguracji w trybie readonly.

### Interfejs użytkownika i funkcje

```bash
UI_ENABLED=true                       # Włącz webowy interfejs użytkownika (pokazuje minimalną stronę, gdy wyłączone)
API_ENABLED=true                      # Włącz punkty końcowe REST API (zwraca 404, gdy wyłączone)
CSP_ENABLED=true                      # Włącz nagłówki Content Security Policy
HEADER_ENABLED=true                   # Pokaż nagłówek strony z brandingiem
HEADER_NAV_ENABLED=true               # Pokaż linki nawigacyjne w nagłówku
HEADER_PREFIX=
DOMAINS_ENABLED=false                 # Włącz wsparcie dla niestandardowych domen
REGIONS_ENABLED=false                 # Włącz wsparcie dla wdrożeń wieloregionalnych. To nie wpływa
                                      # na funkcjonalność aplikacji. Ale włącza komponenty UI
                                      # do linkowania do innych regionów.
```

### Branding i treść

```bash
LOGO_URL=                            # URL do niestandardowego obrazu logo (domyślnie wbudowane logo)
LOGO_ALT=
LOGO_LINK=
FOOTER_LINKS=
ABOUT_URL=
ABOUT_EXTERNAL=false
CONTACT_URL=
PRIVACY_URL=
PRIVACY_EXTERNAL=false
TERMS_URL=
TERMS_EXTERNAL=false
STATUS_URL=
STATUS_EXTERNAL=false
```

### Wysyłanie wiadomości e-mail

```bash
EMAILER_MODE=smtp                    # Tryb usługi e-mail (smtp, sendgrid, itp.)
EMAILER_REGION=                      # Region usługi e-mail (dla dostawców chmury)
FROM_EMAIL=noreply@localhost         # Domyślny adres e-mail nadawcy
FROM=                                # Nazwa nadawcy (alternatywa dla FROMNAME)
FROMNAME=                            # Nazwa wyświetlana dla nadawcy
SMTP_HOST=                           # Nazwa hosta serwera SMTP
SMTP_PORT=587                        # Port serwera SMTP (zwykle 587 dla TLS, 25 dla zwykłego)
SMTP_USERNAME=                       # Nazwa użytkownika uwierzytelniania SMTP
SMTP_PASSWORD=                       # Hasło uwierzytelniania SMTP
SMTP_TLS=true                        # Włącz szyfrowanie TLS dla SMTP
SMTP_AUTH=login                      # Metoda uwierzytelniania SMTP (login, plain, itp.)
```

### Sekrety i TTL

```bash
DEFAULT_TTL=604800                   # Domyślne wygaśnięcie sekretu w sekundach (604800 = 7 dni)
TTL_OPTIONS=300,1800,3600,86400      # Dostępne opcje TTL prezentowane użytkownikom, oddzielone przecinkami (sekundy)
DEFAULT_DOMAIN=                      # Domyślna domena dla linków do sekretów (używa HOST, jeśli puste)
ALLOW_NIL_GLOBAL_SECRET=false        # Zezwól na działanie z brakującym kluczem SECRET (awaryjne odzyskiwanie)
```


### Walidacja adresów e-mail

Walidacja adresów e-mail jest obsługiwana przez [bibliotekę Truemail](https://github.com/truemail-rb/truemail), która obsługuje wiele typów walidacji, w tym regex, wyszukiwanie rekordów MX i weryfikację SMTP.

```bash
VERIFIER_DOMAIN=                     # Domena do weryfikacji SMTP (wymagana dla walidacji SMTP)
VERIFIER_EMAIL=                      # Adres e-mail do weryfikacji SMTP (wymagany dla walidacji SMTP)
```

**Uwaga**: Wiele dodatkowych opcji konfiguracyjnych Truemail jest dostępnych w konfiguracji YAML pod sekcją `truemail:`, w tym typy walidacji, ustawienia timeout, dozwolone/zablokowane domeny, serwery DNS i więcej. Zobacz `config/config.yaml` dla pełnej konfiguracji.

### Internacjonalizacja

```bash
I18N_ENABLED=true                    # Włącz internacjonalizację
I18N_DEFAULT_LOCALE=en               # Domyślna lokalizacja językowa
```

### Rozwój i debugowanie

```bash
ONETIME_DEBUG=false                  # Włącz tryb debugowania
LOG_HTTP_REQUESTS=false              # Loguj żądania HTTP
STDOUT_SYNC=true                     # Synchronizuj wyjście stdout
DIAGNOSTICS_ENABLED=false            # Włącz diagnostykę
FRONTEND_HOST=http://localhost:5173  # URL serwera deweloperskiego frontend (tylko rozwój)
VITE_API_BASE_URL=                   # Nadpisanie bazowego URL API Vite
```

### Monitorowanie i śledzenie błędów

Zobacz [dokumentację sentry](https://docs.sentry.io/platforms/ruby/) dla więcej informacji o konfiguracji Sentry.

```bash
SENTRY_DSN=
SENTRY_DSN_BACKEND=
SENTRY_DSN_FRONTEND=
SENTRY_LOG_ERRORS=true
SENTRY_MAX_BREADCRUMBS=50
SENTRY_SAMPLE_RATE=1.0
SENTRY_VUE_TRACK_COMPONENTS=true
```
