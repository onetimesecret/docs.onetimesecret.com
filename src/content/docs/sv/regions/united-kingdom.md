---
title: Storbritannien (UK)
description: Onetime Secrets datacenterregion för Storbritannien, belägen i London.
---

## Infrastruktur

- **Plats**: London, Storbritannien
- **URL**: [uk.onetimesecret.com](https://uk.onetimesecret.com)
- **Värdleverantör**: <a href="https://upcloud.com" target="_blank" rel="noopener noreferrer nofollow">UpCloud</a> (Helsingfors, Finland)
- **CNAME för anpassad domän**: `identity.ingress.onetime.co` (anycast)

## DNS för anpassad domän

För att peka en anpassad domän mot den här regionen skapar du en CNAME-post:

| Posttyp | Värd                  | Värde                         |
| ----------- | --------------------- | ----------------------------- |
| CNAME       | `secrets.example.com` | `identity.ingress.onetime.co` |

Observera att UK-regionen använder en anycast-CNAME istället för en regionspecifik subdomän.

Se [Guide för konfiguration av anpassad domän](/sv/custom-domains/setup-guide) för fullständiga instruktioner.

## Regulatorisk miljö

Storbritanniens dataskyddsramverk regleras av **UK General Data Protection Regulation (UK GDPR)** och **Data Protection Act 2018**. Efter Brexit upprätthåller Storbritannien ett eget dataskyddsregelverk som ligger nära EU:s GDPR.

### Om värdleverantören

Den här regionen drivs av <a href="https://upcloud.com" target="_blank" rel="noopener noreferrer nofollow">UpCloud</a>, en europeisk leverantör av molninfrastruktur som grundades 2011 och har huvudkontor i Helsingfors, Finland. Som en suverän europeisk leverantör lagras all kontorelaterad data uteslutande i Finland enligt finsk och EU-rättslig dataskyddslagstiftning. UpCloud driver datacenter på flera platser i Europa, däribland London, som är värd för den här regionen.

### Viktiga regulatoriska aspekter

- Information Commissioner's Office (ICO) fungerar som oberoende tillsynsmyndighet
- UK GDPR behåller kärnprinciperna och rättigheterna från EU:s GDPR, inklusive registrerades rättigheter och krav på rättslig grund
- Storbritannien har ett adekvansbeslut från Europeiska kommissionen, vilket gör att data kan flöda fritt från EU/EES
- Data Protection Act 2018 kompletterar UK GDPR med bestämmelser specifika för brittisk brottsbekämpning och underrättelsetjänst

## När du bör överväga den här regionen

- Din organisation eller dina användare finns primärt i Storbritannien
- Du behöver efterleva UK GDPR och Data Protection Act 2018
- Du vill ha dataresidens inom Storbritannien
- Du betjänar kunder som kräver databehandling baserad i Storbritannien
