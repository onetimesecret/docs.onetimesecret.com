---
title: Referens för miljövariabler
description: En referens för Onetime Secret miljövariabler
sidebar:
  order: 5
---

Denna guide täcker alla miljövariabler tillgängliga i Onetime Secret v0.22.4+.

## Miljövariabler

Ställ in dessa i din `.env`-fil eller miljö eller lägg till dem i dina docker-kommandon eller docker-compose.yml-fil. Alla variabler är valfria om inte markerade som obligatoriska.

### Kärnapplikationsinställningar

```bash
SECRET=your-32-char-hex-key           # Hemlig nyckel för sessioner och kryptering (OBLIGATORISK) - ändra INTE efter inställning
PORT=3000                             # Port för webbservern att lyssna på (standard: 3000)
HOST=localhost:3000                   # Värd och portkombination som används för att generera länkar
SSL=true                              # Styr https/http vid generering av länkar (true/false)
SERVER_TYPE=thin                      # Webbservertyp: thin, puma
RACK_ENV=production                   # Applikationsmiljö: development, production, test
```

### Databas & lagring

NOTERA: Variabler som börjar med REDIS_ kan alternativt ställas in med VALKEY_-prefixet.

```bash
REDIS_URL=redis://localhost:6379/0   # Redis-anslutningssträng för sessioner, hemligheter och all applikationsdata
```

### Autentisering & säkerhet

```bash
AUTH_ENABLED=true                     # Aktivera autentiseringssystem (inaktiverar API-autentisering när false)
AUTH_SIGNUP=true                      # Tillåt ny användarregistrering
AUTH_SIGNIN=true                      # Tillåt befintliga användare att logga in
AUTH_AUTOVERIFY=false                 # Hoppa över e-postverifiering för nya konton
COLONEL=email@example.com             # Administratörse-postadresser beviljade "colonel"-privilegier (kommaseparerade)
```

**Notera**: "Colonel" är vår term för "admin"-användare. Colonels kan komma åt administratörsområdet på `/colonel` som visar grundläggande systemstatistik. Administratörsgränssnittet har för närvarande begränsad funktionalitet - ingen användarhantering och endast readonly konfigurationsvisning.

### Användargränssnitt & funktioner

```bash
UI_ENABLED=true                       # Aktivera webbgränssnitt (visar minimal sida när inaktiverad)
API_ENABLED=true                      # Aktivera REST API-slutpunkter (returnerar 404 när inaktiverad)
CSP_ENABLED=true                      # Aktivera Content Security Policy-huvuden
HEADER_ENABLED=true                   # Visa sidhuvud med varumärkning
HEADER_NAV_ENABLED=true               # Visa navigationslänkar i sidhuvud
HEADER_PREFIX=
DOMAINS_ENABLED=false                 # Aktivera stöd för anpassade domäner
REGIONS_ENABLED=false                 # Aktivera stöd för distribution i flera regioner. Detta påverkar inte
                                      # funktionaliteten i applikationen. Men det aktiverar UI-
                                      # komponenter för länkning till andra regioner.
```

### Varumärkning & innehåll

```bash
LOGO_URL=                            # URL till anpassad logotypbild (standard till inbyggd logotyp)
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

### Skicka e-post

```bash
EMAILER_MODE=smtp                    # E-posttjänstläge (smtp, sendgrid, etc.)
EMAILER_REGION=                      # E-posttjänstregion (för molnleverantörer)
FROM_EMAIL=noreply@localhost         # Standard avsändare-e-postadress
FROM=                                # Avsändarnamn (alternativ till FROMNAME)
FROMNAME=                            # Visningsnamn för avsändare
SMTP_HOST=                           # SMTP-serverns värdnamn
SMTP_PORT=587                        # SMTP-serverport (vanligtvis 587 för TLS, 25 för vanlig)
SMTP_USERNAME=                       # SMTP-autentiseringsanvändarnamn
SMTP_PASSWORD=                       # SMTP-autentiseringslösenord
SMTP_TLS=true                        # Aktivera TLS-kryptering för SMTP
SMTP_AUTH=login                      # SMTP-autentiseringsmetod (login, plain, etc.)
```

### Hemligheter & TTL

```bash
DEFAULT_TTL=604800                   # Standard hemlighetens utgång i sekunder (604800 = 7 dagar)
TTL_OPTIONS=300,1800,3600,86400      # Tillgängliga TTL-alternativ presenterade för användare, kommaseparerade (sekunder)
DEFAULT_DOMAIN=                      # Standarddomän för hemliga länkar (använder HOST om tom)
ALLOW_NIL_GLOBAL_SECRET=false        # Tillåt drift med saknad SECRET-nyckel (nödåterställning)
```

### Validera e-postadresser

E-postadressvalidering hanteras av [Truemail-biblioteket](https://github.com/truemail-rb/truemail), som stöder flera valideringstyper inklusive regex, MX-postuppslagning och SMTP-verifiering.

```bash
VERIFIER_DOMAIN=                     # Domän för SMTP-verifiering (krävs för SMTP-validering)
VERIFIER_EMAIL=                      # E-postadress för SMTP-verifiering (krävs för SMTP-validering)
```

**Notera**: Många ytterligare Truemail-konfigurationsalternativ är tillgängliga i YAML-konfigurationen under `truemail:`-sektionen, inklusive valideringstyper, timeout-inställningar, tillåtna/blockerade domäner, DNS-servrar och mer. Se `config/config.yaml` för den fullständiga konfigurationen.

### Internationalisering

```bash
I18N_ENABLED=true                    # Aktivera internationalisering
I18N_DEFAULT_LOCALE=en               # Standardspråklokal
```

### Utveckling & felsökning

```bash
ONETIME_DEBUG=false                  # Aktivera felsökningsläge
LOG_HTTP_REQUESTS=false              # Logga HTTP-förfrågningar
STDOUT_SYNC=true                     # Synka stdout-utmatning
DIAGNOSTICS_ENABLED=false            # Aktivera diagnostik
FRONTEND_HOST=http://localhost:5173  # Frontend dev server-URL (endast utveckling)
VITE_API_BASE_URL=                   # Vite API bas-URL-åsidosättning
```

### Övervakning & felspårning

Se [sentry-dokumentationen](https://docs.sentry.io/platforms/ruby/) för mer information om konfigurering av Sentry.

```bash
SENTRY_DSN=
SENTRY_DSN_BACKEND=
SENTRY_DSN_FRONTEND=
SENTRY_LOG_ERRORS=true
SENTRY_MAX_BREADCRUMBS=50
SENTRY_SAMPLE_RATE=1.0
SENTRY_VUE_TRACK_COMPONENTS=true
```
