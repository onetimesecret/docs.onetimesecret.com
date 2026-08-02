---
title: Vereinigtes Königreich (UK)
description: Die Rechenzentrumsregion des Vereinigten Königreichs von Onetime Secret mit Standort in London.
---

## Infrastruktur

- **Standort**: London, Vereinigtes Königreich
- **URL**: [uk.onetimesecret.com](https://uk.onetimesecret.com)
- **Hosting-Anbieter**: <a href="https://upcloud.com" target="_blank" rel="noopener noreferrer nofollow">UpCloud</a> (Helsinki, Finnland)
- **CNAME für benutzerdefinierte Domain**: `identity.ingress.onetime.co` (Anycast)

## DNS für benutzerdefinierte Domain

Um eine benutzerdefinierte Domain auf diese Region auszurichten, erstellen Sie einen CNAME-Eintrag:

| Eintragstyp | Host                  | Wert                           |
| ----------- | --------------------- | ------------------------------ |
| CNAME       | `secrets.example.com` | `identity.ingress.onetime.co`  |

Beachten Sie, dass die UK-Region einen Anycast-CNAME anstelle einer regionsspezifischen Subdomain verwendet.

Die vollständige Anleitung finden Sie im [Leitfaden zur Einrichtung benutzerdefinierter Domains](/de/custom-domains/setup-guide).

## Rechtlicher Rahmen

Der Datenschutzrahmen des Vereinigten Königreichs wird durch die **UK General Data Protection Regulation (UK-DSGVO)** und den **Data Protection Act 2018** geregelt. Nach dem Brexit unterhält das Vereinigte Königreich ein eigenes Datenschutzregime, das eng an die EU-DSGVO angelehnt ist.

### Über den Hosting-Anbieter

Diese Region wird von <a href="https://upcloud.com" target="_blank" rel="noopener noreferrer nofollow">UpCloud</a> gehostet, einem 2011 gegründeten europäischen Cloud-Infrastrukturanbieter mit Hauptsitz in Helsinki, Finnland. Als souveräner europäischer Anbieter werden alle kontobezogenen Daten ausschließlich in Finnland unter finnischen und EU-Datenschutzbestimmungen gespeichert. UpCloud betreibt Rechenzentren an mehreren europäischen Standorten, darunter London, wo diese Region gehostet wird.

### Wichtige regulatorische Aspekte

- Das Information Commissioner's Office (ICO) fungiert als unabhängige Aufsichtsbehörde
- Die UK-DSGVO behält die Kernprinzipien und Rechte der EU-DSGVO bei, einschließlich der Rechte betroffener Personen und der Anforderungen an eine Rechtsgrundlage
- Das Vereinigte Königreich verfügt über einen Angemessenheitsbeschluss der Europäischen Kommission, der einen freien Datenfluss aus der EU/dem EWR ermöglicht
- Der Data Protection Act 2018 ergänzt die UK-DSGVO um Bestimmungen, die speziell für britische Strafverfolgungs- und Nachrichtendienste gelten

## Wann diese Region infrage kommt

- Ihr Unternehmen oder Ihre Nutzer sind hauptsächlich im Vereinigten Königreich ansässig
- Sie müssen die UK-DSGVO und den Data Protection Act 2018 einhalten
- Sie wünschen eine Datenspeicherung innerhalb des Vereinigten Königreichs
- Sie bedienen Kunden, die eine Datenverarbeitung mit Sitz im Vereinigten Königreich benötigen
