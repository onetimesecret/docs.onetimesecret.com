---
Titel: Konfigurationsübersicht
Beschreibung: Verständnis der zweischichtigen Konfigurationsarchitektur von OneTimeSecret
---

OneTimeSecret verwendet ein zweischichtiges Konfigurationssystem, das darauf ausgelegt ist, Infrastrukturbelange von betrieblichen Einstellungen zu trennen. Diese Architektur bietet Flexibilität bei gleichzeitiger Wahrung von Sicherheit und Stabilität.

## Konfiguration Architektur

```
┌─────────────────────────────────────────────────────┐
│ Starten der Anwendung │
└─────────────────────┬───────────────────────────────┘
                     │
         ┌───────────┴────────────┐
         ▼ ▼
┌─────────────────┐ ┌─────────────────────┐
│ Kernkonfiguration │ │ Systemeinstellungen │
│ (config.yaml) │ │ (system_settings.  │
│ │ │ defaults.yaml) │
│ - Infrastruktur│ │ - Operativ │
│ - Datenbank │ │ - Funktionen │
│ - Sicherheit │ │ - UI/UX │
│ - Mail-Setup │ │ - Ratenbegrenzungen │
│ │ │ │
│ Neustart erforderlich│ │ Laufzeit einstellbar │
└─────────────────┘ └─────────────────────┘
         │ │
         └───────────┬────────────┘
                     ▼
         ┌─────────────────────┐
         │ Umwelt │
         │ Variablen │
         │ (Beide überschreiben) │
         └─────────────────────┘
```

### Zweischichtiges System

1. **Kernkonfiguration** (`etc/config.yaml`)
   - Infrastruktur-Einstellungen, die einen Neustart erfordern
   - Datenbankverbindungen und Sicherheits-Middleware
   - Authentifizierungssysteme und E-Mail-Zustellung
   - Kritische Sicherheitsparameter

2. **Systemeinstellungen** (`etc/system_settings.defaults.yaml`)
   - Zur Laufzeit anpassbare Betriebsparameter
   - Funktionsumschaltungen und UI-Anpassung
   - Tarifgrenzen und Validierungsregeln
   - Konfiguration der Geschäftslogik

### Gestaltungsphilosophie

Diese Trennung folgt dem Prinzip der Infrastruktur als Code und ermöglicht gleichzeitig betriebliche Flexibilität:

- **Änderungen bei der Bereitstellung**: Kernkonfiguration für systemkritische Einstellungen
- **Laufzeitänderungen**: Systemeinstellungen für die Funktionsverwaltung
- **Sicherheitsisolierung**: Sensible Infrastruktur getrennt von betrieblichen Anpassungen

## Konfiguration Laden

### Startup-Prozess

1. Die Kernkonfiguration wird aus `config.yaml` geladen
2. Umgebungsvariablen überschreiben die Dateiwerte über ERB-Templating
3. Systemeinstellungen werden mit Standardwerten aus `system_settings.defaults.yaml` geladen
4. Datenbankeinstellungen können Betriebsparameter zur Laufzeit außer Kraft setzen

### Unterstützung von Umgebungsvariablen

Alle Konfigurationswerte unterstützen die Überschreibung von Umgebungsvariablen:

```yaml
# Direktes Überschreiben
host: <%= ENV['HOST'] || 'localhost:3000' %>

# Boolesche Umwandlung
ssl: <%= ENV['SSL'] == 'true' || false %>

# Bedingtes Vorhandensein
api_key: <%= ENV['API_KEY'] %>
```

## Sicherheitsüberlegungen

### Kritische Einstellungen

Vor der Produktion müssen mehrere Konfigurationswerte gegenüber den Standardwerten geändert werden:

- site.secret": Kryptographischer Schlüssel der Anwendung
- site.authenticity.secret_key`: Anti-Bot-Schutzschlüssel
- `mail.connection.from`: Absender-E-Mail-Adresse
- Anmeldeinformationen für Redis-Verbindungen

### Validierung

Die Validierung der Konfiguration erfolgt beim Start der Anwendung:
- Ungültige Werte verhindern den Start der Anwendung
- Beschreibende Fehlermeldungen führen zu Korrekturen
- Sicherheitskritische Werte werden auf ihre Stärke überprüft

## Nächste Schritte

- [Referenz zur Kernkonfiguration](/configuration/core-config) - Infrastruktur-Einstellungen
- [Referenz der Systemeinstellungen](/configuration/system-settings) - Betriebsparameter
- [Umgebungsvariablen](/configuration/environment-variables) - Überschreibungsmuster
- Sicherheitshärtung](/configuration/security) - Sicherheitsleitfaden für die Produktion
