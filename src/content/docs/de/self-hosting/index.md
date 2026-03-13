---
title: Self-Hosting Übersicht
description: Vollständiger Leitfaden zum Betrieb deiner eigenen Onetime Secret Instanz
sidebar:
  order: 1
---

Betreibe deine eigene private Instanz von Onetime Secret mit voller Kontrolle über deine Daten, Sicherheit und Bereitstellung.

:::caution[März 2026 — Self-Hosting-Dokumentation im Umbau]
Wir befinden uns mitten im Übergang zwischen **v0.23** und **v0.24** (dem `main`-Branch). Ein Teil unserer Self-Hosting-Dokumentation ist veraltet und wir [arbeiten aktiv daran, sie zu verbessern](https://github.com/onetimesecret/onetimesecret/issues/2628).

**Wenn du einfach nur etwas zum Laufen bringen willst**, empfehlen wir den `rel/0.23`-Branch. Er benötigt nur ein paar Umgebungsvariablen und Redis, und wir veröffentlichen weiterhin aktiv Fixes und kleine Updates dafür.

```bash
git clone -b rel/0.23 https://github.com/onetimesecret/onetimesecret.git
```
:::

## Warum Self-Hosting?

Self-Hosting von Onetime Secret bietet dir:

- **Vollständige Datenkontrolle** — Alle Geheimnisse verbleiben auf deiner Infrastruktur und in deinem Netzwerk
- **Individuelle Sicherheitsrichtlinien** — Konfiguriere Authentifizierung, Datenschutzoptionen und Zugriffskontrollen
- **Compliance** — Erfülle regulatorische Anforderungen an die Datenverarbeitung
- **Eigenes Branding** — Passe die Oberfläche für deine Organisation an

## Schnellstart-Optionen

Wähle die Bereitstellungsmethode, die am besten zu deiner Umgebung passt:

### Docker (Empfohlen)
```bash
# Redis und Onetime Secret starten
docker run -p 6379:6379 -d redis:bookworm
docker run -p 3000:3000 -d \
  -e REDIS_URL=redis://host.docker.internal:6379/0 \
  -e SECRET="$(openssl rand -hex 32)" \
  onetimesecret/onetimesecret:latest
```

Erreichbar unter `http://localhost:3000`.

### Manuelle Installation
Für Produktionsumgebungen mit individuellen Konfigurationsanforderungen.

Siehe unseren [Installations- & Bereitstellungs](./installation)-Leitfaden für detaillierte Schritte.

## Was enthalten ist

Deine selbst gehostete Instanz umfasst:

- **Weboberfläche** — Voll ausgestattete UI zum Erstellen und Teilen von Geheimnissen
- **REST API** — Programmatischer Zugriff für Integrationen
- **Mehrsprachige Unterstützung** — Verfügbar in über 12 Sprachen
- **Benutzerdefinierte Domains** — Verwende deine eigene Domain und dein eigenes Branding


## Systemanforderungen

**Empfohlen:**
- 2+ CPU-Kerne
- 2GB+ RAM
- 10GB+ Speicherplatz
- Redis für Sitzungsspeicherung
- Node.js 22+ (für die Entwicklung)

## Nächste Schritte

1. **[Erste Schritte](./getting-started)** — Schritt-für-Schritt-Einrichtungsanleitung
2. **[Installation & Bereitstellung](./installation)** — Detaillierte Bereitstellungsoptionen
3. **[Konfigurationsreferenz](./configuration)** — Vollständige Einstellungsdokumentation

---

_Bereit loszulegen? Folge unserem [Erste Schritte](./getting-started)-Leitfaden._
