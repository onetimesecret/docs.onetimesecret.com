---
Titel: Leitfaden zur Konfigurationsmigration
Beschreibung: Migration von einer monolithischen zu einer geteilten Konfigurationsarchitektur
---

Dieser Leitfaden hilft Ihnen bei der Migration von der monolithischen Konfigurationsdatei von OneTimeSecret auf die neue geteilte Konfigurationsarchitektur, die die zentralen Infrastruktureinstellungen von den zur Laufzeit anpassbaren Systemeinstellungen trennt.

## Die Veränderung verstehen

### Frühere Architektur
- Eine einzige `config.yaml`-Datei mit allen Einstellungen
- Erforderlicher Neustart für jede Konfigurationsänderung
- Gemischte Infrastruktur und betriebliche Belange

### Neue Architektur
- **Kernkonfiguration** (`config.yaml`) - Infrastruktur-Einstellungen
- **Systemeinstellungen** (`system_settings.defaults.yaml`) - Betriebsparameter
- Klare Trennung der Bereiche
- Zur Laufzeit anpassbare Einstellungen über die Datenbank

## Überblick über die Migration

### Was bewegt sich wohin

| Einstellungsart | Alter Standort | Neuer Standort | Laufzeit einstellbar |
|-------------|--------------|--------------|-------------------|
| Redis-Verbindung | `:redis:` | Kernkonfiguration: `storage.db` | Nein |
| Mail-Server | `:emailer:` | Kernkonfiguration: `mail.connection` | Nein |
| Site-Host/SSL | `:site:` | Kernkonfiguration: `site` | Nein |
| UI-Anpassung | `:site:interface:` | Systemeinstellungen: `user_interface` | Ja |
| Merkmalsflags | `:site:` (gemischt) | Systemeinstellungen: `Features` | Ja |
| Ratenbegrenzungen | `:limits:` | Systemeinstellungen: `Limits` | Ja |
| Diagnose | `:diagnostics:` | Systemeinstellungen: `Diagnose` | Ja |

## Schritt-für-Schritt-Migration

### Schritt 1: Sicherung der aktuellen Konfiguration

```bash
# Vorhandene Konfiguration sichern
cp etc/config.yaml etc/config.yaml.backup
cp etc/config.yaml etc/config.monolithic.yaml

# Falls Sie Umgebungsvariablen verwenden, dokumentieren Sie diese
env | grep -E '^(HOST|SSL|SECRET|REDIS|SMTP)' > env.backup
```

### Schritt 2: Neue Konfigurationsdateien erstellen

Erstellen Sie `etc/config.yaml` mit den Grundeinstellungen:

```yaml
# Konfiguration der Kerninfrastruktur
site:
  host: <%= ENV['HOST'] || 'localhost:3000' %>
  ssl: <%= ENV['SSL'] == 'true' || false %>
  geheim: <%= ENV['SECRET'] || nil %>

  Authentifizierung:
    aktiviert: <%= ENV['AUTH_ENABLED'] != 'false' %>
    colonels:
      - <%= ENV['COLONEL'] || 'CHANGEME@example.com' %>

  Authentizität:
    type: <%= ENV['AUTHENTICITY_TYPE'] || 'altcha' %>
    geheimer_schlüssel: <%= ENV['AUTHENTICITY_SECRET_KEY'] || '<REPLACE_WITH_STRONG_HMAC_KEY>' %>

Lagerung:
  db:
    connection:
      url: <%= ENV['REDIS_URL'] || 'redis://localhost:6379/0' %>
    database_mapping:
      session: <%= ENV['REDIS_DBS_SESSION'] || 1 %>
      geheim: <%= ENV['REDIS_DBS_SECRET'] || 8 %>
      metadata: <%= ENV['REDIS_DBS_METADATA'] || 7 %>
      # ... andere Mappings

Mail:
  connection:
    mode: <%= ENV['EMAILER_MODE'] || 'smtp' %>
    von: <%= ENV['FROM_EMAIL'] || 'CHANGEME@example.com' %>
    # ... andere Mail-Einstellungen

i18n:
  enabled: <%= ENV['I18N_ENABLED'] == 'true' || false %>
  default_locale: <%= ENV['I18N_DEFAULT_LOCALE'] || 'en' %>
  # ... Gebietsschema-Konfiguration

Entwicklung:
  aktiviert: <%= ['development', 'dev'].include?(ENV['RACK_ENV']) %>
  frontend_host: <%= ENV['FRONTEND_HOST'] || 'http://localhost:5173' %>

experimentell:
  Middleware:
    # Sicherheits-Middleware-Einstellungen
    utf8_sanitizer: wahr
    path_traversal: true
    # ... andere Middleware
```

Erstellen Sie `etc/system_settings.defaults.yaml` mit Betriebseinstellungen:

``yaml
# Zur Laufzeit anpassbare Betriebseinstellungen
user_interface:
  header:
    enabled: <%= ENV['HEADER_ENABLED'] != 'false' %>
    branding:
      logo:
        url: <%= ENV['LOGO_URL'] || 'DefaultLogo.vue' %>
        alt: <%= ENV['LOGO_ALT'] || 'Einmalig ein Geheimnis teilen' %>
      site_name: <%= ENV['SITE_NAME'] %>

  footer_links:
    aktiviert: <%= ENV['FOOTER_LINKS'] == 'true' || false %>
    # ... Link-Konfiguration

  Anmeldung: <%= ENV['AUTH_SIGNUP'] != 'false' %>
  Anmeldung: <%= ENV['AUTH_SIGNIN'] != 'false' %>
  autoverify: <%= ENV['AUTH_AUTOVERIFY'] == 'true' || false %>

api:
  aktiviert: <%= ENV['API_ENABLED'] != 'false' %>

secret_options:
  default_ttl: <%= ENV['DEFAULT_TTL'] || nil %>
  ttl_options: <%= (ENV['TTL_OPTIONS'] || nil) %>

Merkmale:
  Domains:
    aktiviert: <%= ENV['DOMAINS_ENABLED'] == 'true' || false %>
    Standard: <%= ENV['DEFAULT_DOMAIN'] || nil %>

  Pläne:
    enabled: <%= ENV['PLANS_ENABLED'] == 'true' || false %>
    stripe_key: <%= ENV['STRIPE_KEY'] || nil %>

  Regionen:
    enabled: <%= ENV['REGIONS_ENABLED'] == 'true' || false %>
    current_jurisdiction: <%= ENV['JURISDICTION'] || nil %>

Diagnostik:
  sentry:
    defaults:
      dsn: <%= ENV['SENTRY_DSN'] || nil %>
      sampleRate: <%= ENV['SENTRY_SAMPLE_RATE'] || '0.10' %>

Grenzen:
  create_secret: 100000
  zeige_geheimnis: 2000
  # ... andere Grenzwerte

Mail:
  Validierung:
    Empfänger:
      default_validation_type: :mx
      # ... Überprüfungseinstellungen
```

### Schritt 3: Alte Einstellungen auf neue Standorte übertragen

Gemeinsame Zuordnungen von monolithischer zu geteilter Konfiguration:

``yaml
# OLD (monolithisch)
:site:
  :host: localhost:3000
  :interface:
    :ui:
      :enabled: true
    :api:
      :enabled: true

# NEW (split)
# In config.yaml:
site:
  host: localhost:3000

# In system_settings.defaults.yaml:
api:
  enabled: true
```

### Schritt 4: Umgebungsvariablen aktualisieren

Einige Namen von Umgebungsvariablen haben sich geändert:

```bash
# Alte → Neue Zuordnungen
REDIS_URL → REDIS_URL (unverändert)
COLONEL → COLONEL (unverändert)
FROM → FROM_EMAIL
UI_ENABLED → (entfernt - immer aktiviert)
HEADER_NAV_ENABLED → HEADER_ENABLED
```

### Schritt 5: Konfiguration testen

1. **Syntax-Überprüfung**:
   ```bash
   # YAML-Syntax prüfen
   ruby -ryaml -e "YAML.load_file('etc/config.yaml')"
   ruby -ryaml -e "YAML.load_file('etc/system_settings.defaults.yaml')"
   ```

2. **Starten Sie die Anwendung im Testmodus**:
   ```bash
   RACK_ENV=Entwicklung bin/rackup -p 3000
   ```

3. **Prüfung kritischer Einstellungen**:
   - Redis-Verbindung funktioniert
   - Die E-Mail-Konfiguration ist korrekt
   - Die Authentifizierung funktioniert ordnungsgemäß
   - Ratenbegrenzungen werden angewendet

### Schritt 6: Verteilen der Änderungen

1. **Neue Konfigurationsdateien bereitstellen**
2. **Umgebungsvariablen aktualisieren**
3. **Neustart der Anwendung**
4. **Überwachung auf Fehler**

## Gemeinsame Probleme bei der Migration

### Problem: Fehlende Einstellungen

**Symptom**: Anwendung startet nicht mit undefinierten Methoden oder Null-Fehlern

**Lösung**: Überprüfen Sie, ob alle Einstellungen aus der monolithischen Konfiguration entweder der Kernkonfiguration oder den Systemeinstellungen zugeordnet sind.

### Problem: Falscher Einstellungsort

**Symptom**: Laufzeitänderungen werden nicht wirksam

**Lösung**: Stellen Sie sicher, dass die Betriebseinstellungen in `system_settings.defaults.yaml` und nicht in `config.yaml` enthalten sind.

### Problem: Umgebungsvariablen-Konflikte

**Symptom**: Einstellungen werden nicht wie erwartet angewendet

**Lösung**: Suchen Sie nach alten Namen von Umgebungsvariablen und aktualisieren Sie diese auf die neue Namenskonvention.

## Rollback-Plan

Wenn Probleme auftreten, stellen Sie die monolithische Konfiguration wieder her:

1. **Sicherung wiederherstellen**:
   ```bash
   cp etc/config.monolithic.yaml etc/config.yaml
   ```

2. **Entfernen Sie neue Dateien**:
   ```bash
   rm etc/system_settings.defaults.yaml
   ```

3. **Neustart der Anwendung**

## Post-Migration

### Überprüfen Sie die Funktionalität

- [ ] Geheimnisse können erstellt und abgerufen werden
- [ ] Authentifizierung funktioniert
- [ ] E-Mail-Zustellung funktioniert
- [ ] Ratenbegrenzung ist aktiv
- [ ] UI-Anpassungen erscheinen
- [ ] API-Endpunkte reagieren

### Aufräumen

1. **Löschen Sie die Sicherungsdateien** nach erfolgreicher Migration
2. **Dokumentieren** Sie alle benutzerdefinierten Einstellungen
3. **Einsatzskripte** aktualisieren
4. **Schulung** des Teams in der neuen Konfigurationsstruktur

## Vorteile nach der Migration

1. **Betriebliche Flexibilität** - Änderung von Funktionen ohne Neustart
2. **Klare Trennung** - Infrastruktur vs. betriebliche Belange
3. **Bessere Sicherheit** - Isolierung sensibler Einstellungen
4. **Einfachere Verwaltung** - Logische Organisation der Einstellungen
5. **Zukunftsfähig** - Vorbereitet für dynamische Konfiguration
