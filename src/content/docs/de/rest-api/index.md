---
title: Erste Schritte
description: Die REST-API von Onetime Secret bietet flexible Funktionen für die gemeinsame Nutzung von Geheimnissen und unterstützt sowohl die authentifizierte als auch die anonyme Nutzung. Authentifizierte Benutzer erhalten erweiterte Funktionen und höhere Nutzungslimits, während nicht authentifizierte Benutzer schnell Geheimnisse mit grundlegenden Funktionen teilen können.
---

_Aktualisiert 2024-11-06_

Der gesamte API-Zugriff erfolgt über HTTPS und alle Antworten sind JSON.

## Basis-URI

https://REGION.onetimesecret.com/api

Wobei `REGION` entweder `us` oder `eu` ist.

<!-- ::callout{icon="i-heroicons-globe-alt"} -->
**Auswahl des Datenorts und der Region**
- Wählen Sie zwischen US ([`us.onetimesecret.com`](https://us.onetimesecret.com/)) oder EU ([`eu.onetimesecret.com`](https://eu.onetimesecret.com/)) Rechenzentren
- Berücksichtigen Sie Faktoren wie Datenhoheit, Latenzzeit und Compliance-Anforderungen
- **HINWEIS:** Standardmäßig bleibt `onetimesecret.com` in Betrieb und leitet zu einem aktiven Rechenzentrum weiter. Es wird empfohlen, eine bestimmte Lokalität zu verwenden, da diese Funktion in Zukunft möglicherweise veraltet sein wird.
::

## Authentifizierung
Wir unterstützen zwei Arten der API-Nutzung:

### Authentifizierter Zugang

`https://USERNAME:APITOKEN@REGION.onetimesecret.com/api`

- Verwenden Sie die HTTP-Basisauthentifizierung für alle API-Funktionen
- Der Benutzername ist Ihr Konto-Login
- Das Passwort ist das API-Token von Ihrer Kontoseite

### Anonymer Zugang

`https://REGION.onetimesecret.com/api`

- Eingeschränkte Funktionalität ohne Authentifizierung verfügbar
- Ideal für den schnellen, einmaligen Austausch von Geheimnissen
- Kann sowohl zum Erstellen als auch zum Abrufen von Geheimnissen verwendet werden

## Datenlokalisierung
Onetime Secret unterstützt mehrere geografische Datenzentren. Wir verfolgen eine Politik des Null-Datenaustauschs zwischen den Regionen, um eine vollständige Datenisolierung zu gewährleisten. Wählen Sie das richtige Datenzentrum für Ihre Bedürfnisse:

- **EU-Datenzentrum:** [eu.onetimesecret.com](https://eu.onetimesecret.com/)
- **US-Datenzentrum:** [us.onetimesecret.com](https://us.onetimesecret.com/)

### Wichtige Überlegungen:
- Sie können eine bestimmte Datenlokalität auswählen, indem Sie direkt zur gewünschten Domain navigieren
- Der Speicherort Ihres Geheimnisses ist immer aus dem generierten Link ersichtlich (z.B. `us.onetimesecret.com/secret/abcd1234`)
- **HINWEIS:** Derzeit ist der Zugriff über `onetimesecret.com/api` noch möglich, aber es wird empfohlen, eine bestimmte Lokalität zu verwenden, da diese Funktion in Zukunft möglicherweise veraltet sein wird.

## Benutzerdefinierte Domains
Onetime Secret unterstützt benutzerdefinierte Domain-Konfigurationen für Unternehmen mit speziellen Netzwerk- oder Branding-Anforderungen über unseren [Identity Plus](https://onetimesecret.com/pricing) Plan.

### Vorteile einer benutzerdefinierten Domain
- **Private Branding:** Verwenden Sie Ihre eigene Domain (z.B. `secrets.example.com`) für den API-Zugang und die gemeinsame Nutzung von Geheimnissen
- **Konsistente Benutzererfahrung:** Pflegen Sie die visuelle und vertrauenswürdige Identität Ihres Unternehmens bei Ihren Kunden und Partnern.
- **Bei Mitarbeiterschulungen einbeziehen:** Verwenden Sie benutzerdefinierte Domains, um die Sicherheitspraktiken und Arbeitsabläufe Ihres Unternehmens zu verstärken.

<!-- ::callout{icon="i-heroicons-lock-closed"} -->
**Premium-Funktion**
Benutzerdefinierte Domains sind in unserem [Identity Plus](https://onetimesecret.com/pricing) Plan verfügbar. Mit unseren benutzerfreundlichen Konfigurationsoptionen ist die Einrichtung in wenigen Minuten erledigt. [Erfahren Sie mehr](/docs/custom-domains).
::

### API-Nutzung mit benutzerdefinierten Domains
Wenn Sie eine benutzerdefinierte Domäne verwenden, folgen alle API-Endpunkte der gleichen Struktur:

`https://secrets.example.com/api`


## Systemstatus

`GET https://REGION.onetimesecret.com/api/v1/status`
Aktueller Status des Systems.

**Parameter:** Keine

``bash
$ curl -u 'USERNAME:APITOKEN' https://eu.onetimesecret.com/api/v1/status
{"status": "nominal"}
```

```bash
$ curl -u 'BENUTZERNAME:APITOKEN' https://us.onetimesecret.com/api/v1/status
{"status": "nominal"}
```
