---
title: Kanada (CA)
description: Onetime Secrets kanadensiska datacenterregion, belägen i Toronto.
---

## Infrastruktur

- **Plats**: Toronto, Kanada
- **URL**: [ca.onetimesecret.com](https://ca.onetimesecret.com)
- **Värdleverantör**: <a href="https://www.digitalocean.com" target="_blank" rel="noopener noreferrer nofollow">DigitalOcean</a>
- **CNAME för anpassad domän**: `identity.ca.onetime.co`

:::note
Vi är ett kanadensiskt företag och söker aktivt efter en lämplig kanadensiskägd värdleverantör för den här regionen. Om du har förslag hör vi gärna av oss via vårt [feedbackformulär](https://onetimesecret.com/feedback).
:::

## DNS för anpassad domän

För att peka en anpassad domän mot den här regionen skapar du en CNAME-post:

| Posttyp | Värd                  | Värde                    |
| ----------- | --------------------- | ------------------------ |
| CNAME       | `secrets.example.com` | `identity.ca.onetime.co` |

Se [Guide för konfiguration av anpassad domän](/sv/custom-domains/setup-guide) för fullständiga instruktioner.

## Regulatorisk miljö

Kanadas federala integritetslagstiftning, **Personal Information Protection and Electronic Documents Act (PIPEDA)**, reglerar insamling, användning och utlämnande av personuppgifter i samband med kommersiell verksamhet. Flera provinser har dessutom egen integritetslagstiftning som kan vara tillämplig.

### Om värdleverantören

Den här regionen drivs av <a href="https://www.digitalocean.com" target="_blank" rel="noopener noreferrer nofollow">DigitalOcean</a>, en USA-baserad molnleverantör med huvudkontor i Broomfield, Colorado, som betjänar miljontals utvecklare globalt. DigitalOcean efterlever GDPR för europeiska kunder, stöder dataportabilitet och publicerar transparensrapporter med detaljer om myndigheters dataförfrågningar. Företaget tillämpar robusta säkerhetskontroller och publicerar granskningsrapporter.

### Viktiga regulatoriska aspekter

- PIPEDA kräver meningsfullt samtycke för insamling och användning av data
- Office of the Privacy Commissioner of Canada övervakar efterlevnaden
- Kanada har ett adekvansbeslut från Europeiska kommissionen, vilket underlättar dataöverföringar med EU
- Provinsiella lagar (t.ex. Albertas PIPA, Québecs lag 25) kan medföra ytterligare krav

## När du bör överväga den här regionen

- Din organisation eller dina användare finns primärt i Kanada
- Du behöver efterleva PIPEDA eller provinsiell integritetslagstiftning
- Du vill ha dataresidens inom Kanadas gränser
- Du betjänar kunder i Nordamerika och vill ha ett geografiskt centralt alternativ
