---
title: Verenigd Koninkrijk (UK)
description: De datacenterregio van Onetime Secret in het Verenigd Koninkrijk, gevestigd in Londen.
---

## Infrastructuur

- **Locatie**: Londen, Verenigd Koninkrijk
- **URL**: [uk.onetimesecret.com](https://uk.onetimesecret.com)
- **Hostingprovider**: <a href="https://upcloud.com" target="_blank" rel="noopener noreferrer nofollow">UpCloud</a> (Helsinki, Finland)
- **CNAME voor aangepast domein**: `identity.ingress.onetime.co` (anycast)

## DNS voor aangepast domein

Om een aangepast domein naar deze regio te wijzen, maak je een CNAME-record aan:

| Recordtype | Host                  | Waarde                         |
| ----------- | --------------------- | ----------------------------- |
| CNAME       | `secrets.example.com` | `identity.ingress.onetime.co` |

Let op: de UK-regio gebruikt een anycast-CNAME in plaats van een regiospecifiek subdomein.

Raadpleeg de [installatiegids voor aangepaste domeinen](/nl/custom-domains/setup-guide) voor volledige instructies.

## Wet- en regelgeving

Het gegevensbeschermingskader van het Verenigd Koninkrijk wordt geregeld door de **UK General Data Protection Regulation (UK GDPR)** en de **Data Protection Act 2018**. Na de brexit hanteert het VK een eigen gegevensbeschermingsregime dat nauw aansluit bij de EU-AVG.

### Over de hostingprovider

Deze regio wordt gehost door <a href="https://upcloud.com" target="_blank" rel="noopener noreferrer nofollow">UpCloud</a>, een Europese cloudinfrastructuurprovider die in 2011 is opgericht en hoofdkantoor houdt in Helsinki, Finland. Als soevereine Europese provider wordt alle accountgerelateerde data uitsluitend opgeslagen in Finland, onder Finse en Europese wetgeving voor gegevensbescherming. UpCloud beheert datacenters op meerdere Europese locaties, waaronder Londen, waar deze regio wordt gehost.

### Belangrijkste regelgevingsaspecten

- Het Information Commissioner's Office (ICO) fungeert als onafhankelijke toezichthoudende autoriteit
- De UK GDPR behoudt de kernprincipes en rechten van de EU-AVG, waaronder de rechten van betrokkenen en de vereisten voor een rechtsgrond
- Het VK heeft een adequaatheidsbesluit van de Europese Commissie, waardoor gegevens vrij kunnen stromen vanuit de EU/EER
- De Data Protection Act 2018 vult de UK GDPR aan met bepalingen specifiek voor Britse rechtshandhaving en inlichtingendiensten

## Wanneer je voor deze regio kiest

- Je organisatie of gebruikers zijn voornamelijk gevestigd in het Verenigd Koninkrijk
- Je moet voldoen aan de UK GDPR en de Data Protection Act 2018
- Je wilt dat je gegevens binnen het Verenigd Koninkrijk blijven
- Je bedient klanten die gegevensverwerking binnen het VK vereisen
