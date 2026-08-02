---
title: USA (US)
description: Onetime Secrets datacenterregion för USA, belägen i Hillsboro, Oregon.
---

## Infrastruktur

- **Plats**: Hillsboro, Oregon, USA
- **URL**: [us.onetimesecret.com](https://us.onetimesecret.com)
- **Värdleverantör**: <a href="https://www.hetzner.com" target="_blank" rel="noopener noreferrer nofollow">Hetzner</a>
- **CNAME för anpassad domän**: `identity.us.onetime.co`

## DNS för anpassad domän

För att peka en anpassad domän mot den här regionen skapar du en CNAME-post:

| Posttyp | Värd                  | Värde                    |
| ----------- | --------------------- | ------------------------ |
| CNAME       | `secrets.example.com` | `identity.us.onetime.co` |

Se [Guide för konfiguration av anpassad domän](/sv/custom-domains/setup-guide) för fullständiga instruktioner.

## Regulatorisk miljö

USA saknar en enda övergripande federal dataskyddslag. Istället regleras dataskydd genom en kombination av federala lagar och delstatslagar som gäller för specifika sektorer eller datatyper.

### Om värdleverantören

Den här regionen drivs av <a href="https://www.hetzner.com" target="_blank" rel="noopener noreferrer nofollow">Hetzner</a>, en tysk värdleverantör baserad i Gunzenhausen, verksam under EU:s jurisdiktion. Även för sina amerikanska datacenterplatser upprätthåller Hetzner sitt integritetsmedvetna förhållningssätt förankrat i tysk och EU-rättslig dataskyddsstandard. Kunders personuppgifter exponeras inte i offentliga WHOIS-register för privatkunder.

### Viktiga regulatoriska aspekter

- Federala lagar som HIPAA (hälsodata), GLBA (finansiell data) och COPPA (barns data) gäller för specifika sektorer
- Delstatliga integritetslagar blir allt viktigare, framför allt **California Consumer Privacy Act (CCPA)** och tillägget **California Privacy Rights Act (CPRA)**
- Andra delstater, inklusive Virginia, Colorado, Connecticut och Utah, har infört omfattande integritetslagstiftning
- Oregon, där det här datacentret ligger, antog **Oregon Consumer Privacy Act** med verkan från juli 2024

## När du bör överväga den här regionen

- Din organisation eller dina användare finns primärt i USA
- Du behöver efterleva amerikansk federal eller delstatlig dataskyddslagstiftning
- Du vill ha dataresidens inom USA
- Du betjänar kunder i Nordamerika och vill ha låg latens från västra USA
