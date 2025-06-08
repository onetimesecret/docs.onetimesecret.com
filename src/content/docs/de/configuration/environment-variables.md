---
Titel: Handbuch der Umgebungsvariablen
Beschreibung: Verwendung von Umgebungsvariablen zur Konfiguration von OneTimeSecret
---

OneTimeSecret unterstützt die Überschreibung von Umgebungsvariablen für alle Konfigurationswerte und ermöglicht so eine flexible Bereitstellung in verschiedenen Umgebungen ohne Änderung der Konfigurationsdateien.

## Override Syntax

Konfigurationsdateien verwenden ERB-Vorlagen für die Unterstützung von Umgebungsvariablen:

```yaml
# Einfaches Überschreiben mit Standard
host: <%= ENV['HOST'] || 'localhost:3000' %>

# Boolesche Umwandlung
ssl: <%= ENV['SSL'] == 'true' || false %>

# Erforderlicher Wert
geheim: <%= ENV['GEHEIM'] || 'CHANGEME' %>

# Optionaler Wert (nil, wenn nicht gesetzt)
api_key: <%= ENV['API_KEY'] %>
```

## Zentrale Konfigurationsvariablen

### Wesentliche Einstellungen

```bash
# Anwendungsidentität
HOST=onetimesecret.com
SSL=true
SECRET=Ihr-starker-geheimer-Schlüssel

# Administrator-Zugang
COLONEL=admin@company.com
```

### Redis-Konfiguration

```bash
# Vollständige Verbindungszeichenfolge
REDIS_URL=redis://passwort@localhost:6379/0

# Oder einzelne Datenbanken
REDIS_DBS_SESSION=1
REDIS_DBS_SECRET=8
REDIS_DBS_METADATA=7
```

### Mail-Konfiguration

```bash
# SMTP-Einstellungen
EMAILER_MODE=smtp
FROM_EMAIL=noreply@company.com
FROMNAME="Firmengeheimnis"
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USERNAME=apikey
SMTP_PASSWORD=Ihr-api-Schlüssel
SMTP_AUTH=Anmeldung
SMTP_TLS=true

# Oder AWS SES
EMAILER_MODE=ses
AWS_REGION=us-east-1
```

### Sicherheitseinstellungen

```bash
# Authentifizierung
AUTH_ENABLED=true
AUTH_SIGNUP=true
AUTH_SIGNIN=true
AUTH_AUTOVERIFY=false

# Anti-Bot-Schutz
AUTHENTICITY_TYPE=altcha
AUTHENTICITY_SECRET_KEY=strong-hmac-key
```

## Systemeinstellungsvariablen

### Benutzeroberfläche

```bash
# Kopfzeilenanpassung
HEADER_ENABLED=true
LOGO_URL=/assets/unternehmenslogo.png
LOGO_ALT="Firmengeheimnis teilen"
SITE_NAME="SecureShare"
HEADER_NAV_ENABLED=true

# Fußzeilen-Links
FOOTER_LINKS=true
TERMS_URL=/terms
PRIVACY_URL=/privatsphäre
```

### Feature Toggles

```bash
# API-Zugang
API_ENABLED=true

# Unterstützung mehrerer Regionen
REGIONS_ENABLED=true
JURISDICTION=eu

# Benutzerdefinierte Domänen
DOMAINS_ENABLED=true
DEFAULT_DOMAIN=geheimnis.firma.de
```

### Diagnostik

```bash
# Sentry-Fehlerverfolgung
DIAGNOSTICS_ENABLED=true
SENTRY_DSN=https://key@sentry.io/project
SENTRY_SAMPLE_RATE=0.10
SENTRY_LOG_ERRORS=true

# Getrennte Frontend/Backend-DSNs
SENTRY_DSN_BACKEND=https://key@sentry.io/backend
SENTRY_DSN_FRONTEND=https://key@sentry.io/frontend
```

## Entwicklungseinstellungen

```bash
# Entwicklungsmodus
RACK_ENV=Entwicklung
ONETIME_DEBUG=true
FRONTEND_HOST=http://localhost:5173

# Entspannte Sicherheit für Tests
ALLOW_NIL_GLOBAL_SECRET=true
```

## Docker-Konfiguration

Beispiel `docker-compose.yml` mit Umgebungsvariablen:

``yaml
Version: '3'
Dienste:
  app:
    image: onetimesecret/onetimesecret
    Umgebung:
      - HOST=${HOST:-localhost:3000}
      - SSL=${SSL:-false}
      - GEHEIM=${GEHEIMNIS}
      - REDIS_URL=redis://redis:6379/0
      - FROM_EMAIL=${FROM_EMAIL}
      - COLONEL=${ADMIN_EMAIL}
    env_file:
      - .env
```

## Kubernetes-Konfiguration

ConfigMap-Beispiel:

``yaml
apiVersion: v1
Art: ConfigMap
Metadaten:
  name: onetimesecret-config
data:
  HOST: "secrets.firma.de"
  SSL: "wahr"
  AUTH_ENABLED: "true"
  API_ENABLED: "true"
```

Geheimes Beispiel:

``yaml
apiVersion: v1
kind: Geheim
Metadaten:
  name: onetimesecret-geheimnisse
type: Undurchsichtig
stringData:
  SECRET: "Ihr-starker-geheimer-Schlüssel"
  REDIS_URL: "redis://password@redis:6379/0"
  SMTP_PASSWORT: "smtp-api-key"
  AUTHENTICITY_SECRET_KEY: "hmac-key"
```

## Bewährte Praktiken

### Sicherheit

1. **Niemals Geheimnisse übertragen** - Lokale `.env`-Dateien verwenden, Geheimnisse in der Produktion verwalten
2. **Schlüssel regelmäßig rotieren** - Besonders `SECRET` und Authentifizierungsschlüssel
3. **Verwenden Sie starke Werte** - Generieren Sie kryptographisch sichere Schlüssel

### Organisation

1. **Nach Zweck gruppieren**:
   ```bash
   # === Grundeinstellungen ===
   HOST=onetimesecret.com
   SECRET=...

   === Redis ===
   REDIS_URL=...

   # === Mail ===
   FROM_EMAIL=...
   ```

2. **Dokumentenanforderungen**:
   ```bash
   # Erforderlich: Anwendungsgeheimnis (generiert mit: openssl rand -hex 32)
   SECRET=

   # Optional: Benutzerdefinierte Domäne (Standardwert ist HOST)
   DEFAULT_DOMAIN=
   ```

### Einsatz

1. **Umgebungsspezifische Dateien verwenden**:
   - `.env.development`
   - `.env.staging`
   - `.env.production`

2. **Erforderliche Variablen validieren**:
   ```bash
   #!/bin/bash
   required_vars="SECRET REDIS_URL FROM_EMAIL"
   for var in $required_vars; do
     if [ -z "${!var}" ]; then
       echo "Fehler: $var ist erforderlich"
       exit 1
     fi
   done
   ```

3. **Voreinstellungen vorgeben, wo sinnvoll**:
   ```bash
   # Entwicklungsvorgaben
   HOST=${HOST:-localhost:3000}
   SSL=${SSL:-false}
   REDIS_URL=${REDIS_URL:-redis://localhost:6379/0}
   ```

## Gemeinsame Patterns

### Minimale Produktion

```bash
# Erforderlich
HOST=onetimesecret.com
SSL=true
SECRET=<generiertes Geheimnis>
REDIS_URL=redis://:<Passwort>@redis:6379/0
FROM_EMAIL=noreply@company.com
COLONEL=admin@company.com

# Empfohlen
AUTHENTICITY_SECRET_KEY=<generierter-Schlüssel>
SENTRY_DSN=https://key@sentry.io/project
```

### Volles Unternehmen

```bash
# Kern
HOST=geheimnis.firma.de
SSL=true
SECRET=<vault:secret/onetimesecret/app-secret>
COLONEL=security-team@company.com

# Eigenschaften
DOMAINS_ENABLED=true
DEFAULT_DOMAIN=geheimnisse.firma.de
AUTH_AUTOVERIFY=true
API_ENABLED=true

# Infrastruktur
REDIS_URL=<vault:secret/onetimesecret/redis-url>
EMAILER_MODE=ses
AWS_REGION=us-east-1

# Überwachung
DIAGNOSTICS_ENABLED=true
SENTRY_DSN=<vault:secret/onetimesecret/sentry-dsn>
SENTRY_SAMPLE_RATE=0.25

# Branding
LOGO_URL=https://cdn.company.com/logo.png
SITE_NAME="Firmengeheimnisse"
FOOTER_LINKS=true
TERMS_URL=https://company.com/terms
PRIVACY_URL=https://company.com/privacy
```

## Fehlersuche

### Aufgelöste Konfiguration anzeigen

Prüfen Sie, welche Umgebungsvariablen verwendet werden:

```bash
# Alle OTS-bezogenen Variablen auflisten
env | grep -E '^(HOST|SSL|SECRET|REDIS|COLONEL|AUTH_|SMTP_|FROM)'

# ERB-Auflösung testen
erb config.yaml | grep -A5 "site:"
```

### Allgemeine Probleme

1. **Boolesche Konvertierung** - Verwenden Sie eine exakte String-Übereinstimmung:
   ```bash
   # Richtig
   SSL=true
   AUTH_ENABLED=false

   # Falsch (wird als true ausgewertet)
   SSL=1
   AUTH_ENABLED=no
   ```

2. **Fehlende Anführungszeichen** - Shell-Interpretation:
   ```bash
   # Problematisch
   REDIS_URL=redis://pass@host:6379

   # Sicher
   REDIS_URL="redis://pass@host:6379"
   ```

3. **Vorrang** - Umgebungsvariablen haben immer Vorrang vor Dateiwerten:
   ```yaml
   # Diese Vorgabe wird ignoriert, wenn ENV['HOST'] gesetzt ist
   host: <%= ENV['HOST'] || 'localhost:3000' %>
   ```

4. **ERB-Syntaxfehler** - Überprüfen Sie die Ruby-Syntax:
   ```yaml
   # Falsch - fehlende Anführungszeichen
   Wert: <%= ENV[HOST] %>

   # Richtig
   Wert: <%= ENV['HOST'] %>
   ```
