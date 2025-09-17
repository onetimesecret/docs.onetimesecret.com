---
title: Kurzreferenz
description: Spickzettel zur Konfiguration und Anleitung zur Fehlerbehebung
Seitenleiste:
  Bestellung: 7
---

# Schnellübersicht zur Konfiguration

## Notfallwiederherstellung

```bash
# Start mit minimaler Konfiguration
export SECRET=$(openssl rand -hex 32)
export REDIS_URL="redis://localhost:6379/0"
export FROM_EMAIL="admin@company.com"
export COLONEL="admin@company.com"

# Konfigurationssyntax prüfen
ruby -ryaml -e "YAML.load_file('etc/config.yaml')"
```

## Gemeinsame Probleme

| Problem | Lösung |
|---------|----------|
| App startet nicht | Überprüfen Sie, ob `SECRET` gesetzt ist und Redis läuft |
| E-Mails werden nicht gesendet | Überprüfen Sie `FROM_EMAIL` und SMTP-Einstellungen |
| Ratenlimits zu streng | Werte in Systemeinstellungen anpassen |
| UI-Änderungen werden nicht übernommen | Überprüfen Sie, ob die Einstellung in system_settings vs config enthalten ist |

## Muss-Werte ändern

```bash
# Vor der Produktion
SECRET=<generate-64-Zeichen-hex>
AUTHENTICITY_SECRET_KEY=<generate-64-char-hex>
FROM_EMAIL=<gültige-email>
COLONEL=<admin-email>
```

## Neustart erforderlich vs. Laufzeit

**Neustart erforderlich (config.yaml):**
- Datenbank-Verbindungen
- Standort-Host/SSL
- Mail-Server-Einstellungen
- Sicherheits-Middleware

**Laufzeitanpassung (system_settings):**
- Merkmalsflags
- Ratenbegrenzungen
- UI-Anpassung
- API-Einstellungen

## Speicherorte der Konfigurationsdateien

```bash
# Kernkonfiguration
etc/config.yaml

# Systemeinstellungen
etc/system_settings.defaults.yaml

# Environment overrides
.env
```

## Validierungsbefehle

```bash
# YAML-Syntax testen
ruby -ryaml -e "YAML.load_file('etc/config.yaml')"

# Redis-Verbindung prüfen
redis-cli -u $REDIS_URL ping

# Überprüfen Sie die Umgebungsvariablen
env | grep -E '^(SECRET|REDIS|FROM_EMAIL|COLONEL)'
```

## Gemeinsame Umgebungsvariablen

```bash
# Wesentlich
HOST=onetimesecret.com
SSL=true
SECRET=<generiertes Geheimnis>
REDIS_URL=redis://localhost:6379/0
FROM_EMAIL=noreply@company.com
COLONEL=admin@company.com

# Optional
AUTH_ENABLED=true
API_ENABLED=true
HEADER_ENABLED=true
SENTRY_DSN=https://key@sentry.io/project
```

## Checkliste für den Einsatz

- [ ] Starken `SECRET`-Wert generieren
- Gültige `FROM_EMAIL`-Adresse festlegen
- Konfigurieren Sie die `COLONEL`-Administrator-E-Mail
- [ ] Redis-Konnektivität testen
- [ ] Mail-Zustellung überprüfen
- [ ] SSL-Zertifikat prüfen
- [ ] Geeignete Ratenlimits einstellen
- [ ] Fehlerverfolgung einschalten
