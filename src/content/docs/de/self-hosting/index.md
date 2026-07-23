---
title: Self-Hosting im Überblick
description: Vollständige Anleitung zum Betrieb deiner eigenen Onetime Secret Instanz
sidebar:
  order: 1
---

Betreibe deine eigene private Instanz von Onetime Secret mit voller Kontrolle über deine Daten, Sicherheit und Bereitstellung.

:::tip[Aktuelle Version: v0.26]
Die aktuelle stabile Version ist **v0.26** (der `main`-Branch). Sie läuft in zwei Modi:

- **Einfacher Modus** — der einfachste Weg. Benötigt nur Redis und ein paar Umgebungsvariablen. Konten funktionieren wie immer. Beginne hier mit dem [Schnellstart](#schnellstart-optionen) weiter unten.
- **Vollständiger Modus** — fügt Kontofunktionen (MFA, SSO, WebAuthn, Organisationen) hinzu, die von PostgreSQL und RabbitMQ unterstützt werden.

Wenn du von v0.22 oder v0.23 kommst, folge der Anleitung [Upgrade auf v0.24+](./upgrading-v0-24), die die Konfigurations- und Datenmodelländerungen sowie die Wahl des Authentifizierungsmodus behandelt.
:::


## Warum Self-Hosting?

Self-Hosting von Onetime Secret bietet dir:

- **Vollständige Datenkontrolle** - Alle Geheimnisse verbleiben auf deiner Infrastruktur und in deinem Netzwerk
- **Individuelle Sicherheitsrichtlinien** - Konfiguriere Authentifizierung, Datenschutzoptionen und Zugriffskontrollen
- **Compliance** - Erfülle regulatorische Anforderungen an die Datenverarbeitung
- **Eigenes Branding** - Passe die Oberfläche für deine Organisation an

## Schnellstart-Optionen

Wähle die Bereitstellungsmethode, die am besten zu deiner Umgebung passt:

### Docker (Empfohlen)
```bash
# Redis und Onetime Secret starten
docker run -p 6379:6379 -d redis:bookworm
docker run -p 3000:3000 -d \
  -e REDIS_URL=redis://host.docker.internal:6379/0 \
  -e SECRET="$(openssl rand -hex 32)" \
  onetimesecret/onetimesecret:v0.26.1
```

Erreichbar unter `http://localhost:3000`.

### Manuelle Installation
Für Produktionsumgebungen mit individuellen Konfigurationsanforderungen.

Siehe unsere [Installations- & Bereitstellungsanleitung](./installation) für detaillierte Schritte.

## Was enthalten ist

Deine selbst gehostete Instanz umfasst:

- **Weboberfläche** - Vollständige Benutzeroberfläche zum Erstellen und Teilen von Geheimnissen
- **REST API** - Programmatischer Zugriff für Integrationen
- **Mehrsprachige Unterstützung** - Verfügbar in 17 Sprachen
- **Eigene Domains** - Nutze deine eigene Domain und dein Branding


## Systemanforderungen

**Empfohlen:**
- 2+ CPU-Kerne
- 2 GB+ RAM
- 10 GB+ Speicherplatz
- Redis für Session-Speicherung
- Node.js 22+ (für die Entwicklung)

## Nächste Schritte

1. **[Erste Schritte](./getting-started)** - Schritt-für-Schritt-Einrichtungsanleitung
2. **[Installation & Bereitstellung](./installation)** - Detaillierte Bereitstellungsoptionen
3. **[Konfigurationsreferenz](./configuration)** - Vollständige Dokumentation der Einstellungen

---

_Bereit loszulegen? Folge unserer [Erste-Schritte](./getting-started)-Anleitung._
