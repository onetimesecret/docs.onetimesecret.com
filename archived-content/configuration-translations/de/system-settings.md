---
title: Referenz der Systemeinstellungen
description: Vollständige Referenz für die Betriebseinstellungen von OneTimeSecret (system_settings.defaults.yaml)
---

Systemeinstellungen definieren Betriebsparameter, die zur Laufzeit über `etc/system_settings.defaults.yaml` geändert werden können. Im Gegensatz zur Kernkonfiguration konzentrieren sich diese Einstellungen auf benutzerseitige Funktionen und Betriebsgrenzen.

## Benutzeroberfläche

### Kopfzeile Konfiguration

``yaml
user_interface:
  header:
    # Kopfzeilenanpassung umschalten
    aktiviert: true

    Branding:
      Logo:
        # Logo-Bildpfad oder Vue-Komponentenname
        url: DefaultLogo.vue
        alt: Einmalig ein Geheimnis teilen
        href: /

      # Site-Name überschreiben (fällt zurück auf i18n)
      site_name: ~

    Navigation:
      # Kopfzeilennavigation umschalten
      aktiviert: true
```

### Links in der Fußzeile

``yaml
user_interface:
  footer_links:
    # Hauptschalter für Fußzeilenlinks
    aktiviert: false

    Gruppen:
      - name: legal
        i18n_key: web.footer.legals
        links:
          - text: Servicebedingungen
            i18n_key: nutzungsbedingungen
            url: /terms
            extern: falsch

          - Text: Datenschutzrichtlinie
            i18n_key: datenschutz-richtlinien
            url: /Privatsphäre
            extern: falsch
```

### Authentifizierung UI

``yaml
user_interface:
  # Benutzerregistrierung einschalten
  signup: true

  # Benutzeranmeldung aktivieren
  Anmeldung: true

  # Automatische Überprüfung von E-Mail-Adressen
  autoverify: false
```

## API-Konfiguration

``yaml
api:
  # API-Zugang einschalten
  aktiviert: true
```

## Geheime Optionen

``yaml
secret_options:
  # Standard-TTL in Sekunden, wenn keine angegeben ist
  default_ttl: 604800 # 7 Tage

  # Verfügbare TTL-Optionen (in Sekunden)
  ttl_options:
    - 300 # 5 Minuten
    - 3600 # 1 Stunde
    - 86400 # 1 Tag
    - 604800 # 7 Tage
```

## Merkmale

### Verarbeitung eingehender E-Mails

``yaml
Eigenschaften:
  incoming:
    aktiviert: false
    E-Mail: incoming@example.com
    passphrase: abacus
    # Validierungsmuster für eingehende Inhalte
    regex: ~
```

### Analytik (StatHat)

``yaml
Eigenschaften:
  stathat:
    aktiviert: false
    apikey: ~
    default_chart: ~
```

### Unterstützung mehrerer Regionen

``yaml
Merkmale:
  Regionen:
    enabled: false
    current_jurisdiction: us
    Gerichtsbarkeiten:
      - name: us
        Bereich: onetimesecret.com
        Symbol: 🇺🇸
      - Name: eu
        Bereich: eu.onetimesecret.com
        Ikone: 🇪🇺
```

### Abonnement-Pläne

``yaml
Merkmale:
  plans:
    enabled: false
    stripe_key: ~
    webhook_signing_secret: ~
    payment_links:
      tier1: ~
      tier2: ~
      tier3: ~
```

### Benutzerdefinierte Domains

``yaml
Eigenschaften:
  domains:
    enabled: false
    # Standarddomäne für die Linkerzeugung
    Standard: ~

    cluster:
      Typ: ~
      api_key: ~
      cluster_ip: <CLUSTER_IP>
      cluster_host: <CLUSTER_HOST>
      cluster_name: <CLUSTER_NAME>
      vhost_target: <VHOST_TARGET>
```

## Diagnostik

### Sentry-Integration

``yaml
Diagnose:
  sentry:
    Voreinstellungen:
      # Primärer Sentry-DSN
      dsn: ~
      # Prozentualer Anteil der zu erfassenden Ereignisse (0,0 bis 1,0)
      sampleRate: 0.10
      # Maximal zu erfassende Breadcrumbs
      maxBreadcrumbs: 5
      # Fehler auf der Konsole protokollieren
      logErrors: true

    Backend:
      # Ruby-spezifischer DSN
      dsn: ~

    Frontend:
      # Vue-spezifischer DSN
      dsn: ~
      # Vue-Komponentenverfolgung einschalten
      trackComponents: true
```

## Ratenobergrenzen

Beschränkungen pro Benutzer über rollierende 20-Minuten-Fenster:

### Kerngeschäft

``yaml
Grenzen:
  # Geheimnisverwaltung
  create_secret: 100000
  show_secret: 2000
  burn_secret: 2000
  show_metadata: 2000
```

### Authentifizierung

``yaml
Grenzen:
  # Kontooperationen
  create_account: 10
  authenticate_session: 50
  fehlgeschlagene_passphrase: 15

  # Passwort-Wiederherstellung
  passwort_vergessen_anforderung: 20
  vergessenes_passwort_zurücksetzen: 30
```

### Kontoverwaltung

``yaml
Grenzen:
  # Profilverwaltung
  update_account: 10
  destroy_account: 2
```

### Domain Management

``yaml
Grenzen:
  # Benutzerdefinierte Domain-Operationen
  add_domain: 30
  remove_domain: 30
  list_domains: 100
  verify_domain: 100
```

## Mail-Validierung

### Empfänger-Validierung

``yaml
mail:
  validation:
    Empfänger:
      # Überprüfungsmethode: :regex, :mx, :mx_blacklist, :smtp
      standard_überprüfung_art: :mx

      # SMTP-Überprüfungseinstellungen
      verifier_email: verify@example.com
      verifier_domain: beispiel.com
      connection_timeout: 1
      response_timeout: 1
      connection_attempts: 2

      # Domäneneinschränkungen
      allowed_domains_only: false

      # DNS-Server für MX-Lookup
      dns:
        - 1.1.1.1
        - 8.8.4.4
        - 208.67.220.220

      # SMTP-Einstellungen
      smtp_port: 25
      smtp_fail_fast: true

      # Konfiguration der Protokollierung
      logger:
        tracking_event: :error
        stdout: true
```

### E-Mail-Kontoprüfung

``yaml
mail:
  validation:
    Konten:
      # Identische Struktur zu Empfängern
      # Getrennte Konfiguration für Account-E-Mails
      default_validation_type: :mx
      # ... (dieselben Optionen wie bei recipients)
```

## Umgebungsvariable Integration

Alle Einstellungen unterstützen die ERB-Vorlagenerstellung:

```yaml
# Boolean mit Umgebungsüberschreibung
aktiviert: <%= ENV['FEATURE_ENABLED'] != 'false' %>

# Wert mit Voreinstellung
api_key: <%= ENV['API_KEY'] || 'default_value' %>

# Numerischer Wert
Zeitüberschreitung: <%= ENV['TIMEOUT'] || 30 %>

# Bedingte Logik
validation_type: <%= ENV['STRICT_VALIDATION'] == 'true' ? :smtp : :mx %>
```

## Gemeinsame Konfigurationen

### Minimale Produktion

``yaml
user_interface:
  header:
    enabled: true
  footer_links:
    aktiviert: false
  signup: true
  signin: true

api:
  aktiviert: true

Grenzen:
  create_secret: 1000
  zeige_geheimnis: 2000
```

### Einsatz in Unternehmen

``yaml
user_interface:
  header:
    branding:
      logo:
        url: /assets/unternehmenslogo.png
        alt: Gemeinsame Nutzung von Firmengeheimnissen
      website_name: SecureShare
  Fußzeile_links:
    aktiviert: true

Merkmale:
  Domains:
    aktiviert: wahr
  Pläne:
    aktiviert: false

Diagnostik:
  sentry:
    Voreinstellungen:
      dsn: https://key@sentry.company.com/project
      sampleRate: 0.25
```

### Entwicklungsumgebung

``yaml
user_interface:
  autoverify: true

Grenzwerte:
  # Gelockerte Grenzwerte für Tests
  create_secret: 1000000
  fehlgeschlagene_passphrase: 100

Diagnostik:
  sentry:
    Voreinstellungen:
      logErrors: true
      sampleRate: 1.0
```

## Bewährte Praktiken

1. **Starten Sie mit den Standardeinstellungen** - Die Standardkonfiguration eignet sich für die meisten Einsätze.

2. **Anpassen der Tarifgrenzen** auf der Grundlage von:
   - Erwartetes Nutzervolumen
   - Kapazität der Infrastruktur
   - Sicherheitsanforderungen

3. **Konfigurieren Sie die E-Mail-Validierung** entsprechend Ihren Sicherheitsanforderungen:
   - `:regex` - Schnelle, einfache Überprüfung
   - `:mx` - Überprüfung der Existenz der Domain
   - `:smtp` - Vollständige Überprüfung der Zustellung

4. **Diagnose** in der Produktion aktivieren:
   - Sentry für die Fehlerverfolgung einrichten
   - Konservative Abtastraten verwenden
   - Auswirkungen auf die Leistung überwachen

5. **Anpassen der Benutzeroberfläche** mit Bedacht:
   - Navigation einfach halten
   - Testen Sie individuelles Branding
   - Barrierefreiheit beibehalten
