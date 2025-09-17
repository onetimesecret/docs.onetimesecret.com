---
title: Kernkonfigurations-Referenz
description: Vollständige Referenz für die Infrastrukturkonfiguration von OneTimeSecret (config.yaml)
---

Die Kernkonfiguration verwaltet die grundlegenden Infrastruktureinstellungen von OneTimeSecret über `etc/config.yaml`. Diese Parameter erfordern einen Neustart der Anwendung, um sie zu ändern, und bilden die Grundlage für den Systembetrieb.

## Standortkonfiguration

### Grundeinstellungen

``yaml
site:
  # Primärer Hostname und Port
  Rechner: localhost:3000

  # HTTPS-Erzwingung einschalten
  ssl: false

  # Anwendung geheimer Schlüssel für kryptographische Operationen
  # CRITICAL: Muss vor der Produktion von der Standardeinstellung geändert werden
  geheim: CHANGEME
```

### Authentifizierungssystem

``yaml
Seite:
  authentication:
    # Umschalten des Authentifizierungssystems
    aktiviert: true

    # Administrator-E-Mail-Adressen mit erhöhten Rechten
    # Der Begriff "Oberst" verweist auf den geschützten Zugang zum Systemkern.
    Colonels:
      - admin@example.com
```

### Anti-Bot Schutz (Altcha)

``yaml
Seite:
  Authentizität:
    # Schutzmethode (unterstützt derzeit 'altcha')
    typ: altcha

    # HMAC-Schlüssel für Authentizitätsherausforderungen
    # CRITICAL: Ersetzen Sie den Standardwert
    secret_key: <REPLACE_WITH_STRONG_HMAC_KEY>
```

### Sicherheits-Middleware

Individuell umschaltbare Sicherheitsvorkehrungen von Rack-Contrib und Rack-Protection:

``yaml
Middleware:
  # Serve frontend Vue application assets
  static_files: true

  # Sanitize request parameters for proper UTF-8 encoding
  utf8_sanitizer: true

  # CSRF-Schutz durch Herkunftsüberprüfung
  http_origin: true

  # HTML-Entity-Escaping in Anfrageparametern
  escaped_params: true

  # X-XSS-Protection Browser-Header
  xss_header: true

  # Clickjacking-Schutz über X-Frame-Options
  frame_options: true

  # Blockiert Angriffe auf Verzeichnistraversal
  path_traversal: true

  # Sitzungsfixierung durch Cookie-Manipulation verhindern
  cookie_tossing: true

  # IP-Adressen gegen Spoofing validieren
  ip_spoofing: true

  # HTTPS über HSTS-Header erzwingen
  strict_transport: true
```

## Speicherkonfiguration

### Redis-Verbindung

``yaml
Speicherung:
  db:
    connection:
      # Redis-Verbindungsstring
      url: redis://localhost:6379
```

### Datenbank-Mapping

Redis-Datenbankzuweisung nach Datentyp (0-15 verfügbar):

``yaml
Speicherung:
  db:
    database_mapping:
      session: 1 # Benutzer-Session-Speicher
      splittest: 1 # A/B-Testdaten
      custom_domain: 6 # Benutzerdefinierte Domänenkonfigurationen
      customer: 6 # Daten zum Kundenkonto
      subdomain: 6 # Subdomain-Zuordnungen
      metadata: 7 # Geheime Metadaten
      email_receipt: 8 # E-Mail-Zustellungsverfolgung
      secret: 8 # Verschlüsselte geheime Speicherung
      rate_limit: 2 # Zähler für die Ratenbegrenzung
      feedback: 11 # Einsendungen von Benutzerfeedback
      exception_info: 12 # Daten zur Fehlerverfolgung
      system_settings: 15 # Laufzeiteinstellungen Cache
```

## Mail-Konfiguration

### Verbindungseinstellungen

``yaml
mail:
  connection:
    # Zustellmethode: 'ses', 'smtp', etc.
    Modus: smtp

    # AWS SES-Region (für 'ses'-Modus)
    Region: us-east-1

    # Absenderkonfiguration
    # CRITICAL: Vom Standard abweichen
    von: CHANGEME@example.com
    fromname: Einmaliges Geheimnis

    # SMTP-Konfiguration
    Rechner: smtp.example.com
    port: 587
    benutzer: benutzername
    pass: Kennwort
    auth: Anmeldung
    tls: wahr
```

### Entwicklung Mail Setup

Für die lokale Entwicklung mit Mailpit:

``yaml
mail:
  connection:
    mode: smtp
    Rechner: 127.0.0.1
    port: 1025
    benutzer: ~
    pass: ~
    auth: falsch
    tls: false
```

## Internationalisierung

### Grundlegende Konfiguration

``yaml
i18n:
  # Internationalisierungsfunktionen einschalten
  aktiviert: true

  # Standard-Sprachcode
  default_locale: en
```

### Lokale Fallbacks

Definieren Sie Ausweichketten für fehlende Übersetzungen:

``yaml
i18n:
  fallback_locale:
    fr-CA: [fr_CA, fr_FR, en]
    fr: [fr_FR, fr_CA, en]
    de-AT: [de_AT, de, en]
    de: [de, de_AT, en]
    default: [en]
```

### Verfügbare Lokalitäten

Vollständige Übersetzungen verfügbar:

``yaml
i18n:
  Locales:
    # European
    - bg
    - da_DK
    - de
    - de_AT
    - el_GR
    - en
    - es
    - fr_CA
    - fr_FR
    - it_IT
    - nl
    - pl
    - sv_SE
    - tr
    - uk

    # Asiatisch
    - ja
    - ko

    # Pazifik
    - mi_NZ

    # Amerikas
    - pt_BR
```

Teilweise übersetzte Gebietsschemata:

``yaml
i18n:
  Unvollständig:
    - ar
    - ca_ES
    - cs
    - er
    - hu
    - pt_PT
    - ru
    - sl_SI
    - vi
    - zh
```

## Entwicklung Konfiguration

### Entwicklungsmodus

yaml
Entwicklung:
  # Auto-Detect von RACK_ENV
  aktiviert: <%= ['development', 'dev'].include?(ENV['RACK_ENV']) %>

  # Debug-Protokollierung einschalten
  Fehlersuche: false

  # Frontend-Entwicklungsserver
  # Use 'http://localhost:5173' for built-in Vite proxy
  # Leer lassen, wenn externer Reverse-Proxy verwendet wird.
  frontend_host: http://localhost:5173
```

## Experimentelle Merkmale

### Geheime Rotation

``yaml
experimentell:
  # Erlaube den Betrieb ohne site.secret (DANGEROUS)
  # Nur für Wiederherstellungs- oder Migrationsszenarien
  allow_nil_global_secret: false

  # Previous secret keys for rotation
  # Entfernen, nachdem alle Geheimnisse abgelaufen sind oder neu verschlüsseln
  rotated_secrets: []

  # Einfrieren des Middleware-Stacks nach der Initialisierung
  freeze_app: false
```

## Umgebungsvariablen

Alle Werte unterstützen die ERB-Vorlagenerstellung:

```yaml
# Einfaches Überschreiben mit Standard
host: <%= ENV['HOST'] || 'localhost:3000' %>

# Boolesche Umwandlung
ssl: <%= ENV['SSL'] == 'true' || false %>

# Erforderlicher Wert (kein Standardwert)
geheim: <%= ENV['GEHEIM'] || 'CHANGEME' %>

# Optionaler Wert
api_key: <%= ENV['API_KEY'] %>
```

## Sicherheitscheckliste

Vor dem Produktionseinsatz:

1. **Ändern Sie alle CHANGEME-Werte**
   - `site.secret`
   - site.authenticity.secret_key`
   - `mail.connection.from`
   - `site.authentication.colonels`

2. **Konfiguration der Redis-Sicherheit**
   - Starkes Passwort festlegen
   - SSL aktivieren, falls entfernt
   - Netzwerkzugang einschränken

3. **Sicherheitsmiddleware aktivieren**
   - Überprüfen Sie jede Einstellung
   - Deaktivieren nur bei gleichwertigem Proxy-Schutz

4. **Einrichten der E-Mail-Zustellung**
   - SMTP oder SES konfigurieren
   - E-Mail-Zustellung testen
   - Gültige Absenderadresse festlegen

5. **Überprüfen Sie experimentelle Funktionen**
   - Sicherstellen, dass alle deaktiviert sind
   - Dokumentieren Sie alle Ausnahmen
