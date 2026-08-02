---
title: USA (US)
description: Onetime Secrets amerikanske datacenterregion, beliggende i Hillsboro, Oregon.
---

## Infrastruktur

- **Placering**: Hillsboro, Oregon, USA
- **URL**: [us.onetimesecret.com](https://us.onetimesecret.com)
- **Hostingudbyder**: <a href="https://www.hetzner.com" target="_blank" rel="noopener noreferrer nofollow">Hetzner</a>
- **CNAME til brugerdefineret domæne**: `identity.us.onetime.co`

## DNS for brugerdefineret domæne

For at pege et brugerdefineret domæne mod denne region skal du oprette en CNAME-post:

| Posttype | Vært                  | Værdi                    |
| ----------- | --------------------- | ------------------------ |
| CNAME       | `secrets.example.com` | `identity.us.onetime.co` |

Se [opsætningsvejledningen til brugerdefinerede domæner](/da/custom-domains/setup-guide) for fulde instruktioner.

## Regulatorisk miljø

USA har ikke én samlet føderal databeskyttelseslov. I stedet reguleres databeskyttelse gennem en kombination af føderale love og delstatslove, der gælder for specifikke sektorer eller datatyper.

### Om hostingudbyderen

Denne region hostes af <a href="https://www.hetzner.com" target="_blank" rel="noopener noreferrer nofollow">Hetzner</a>, en tysk hostingudbyder med base i Gunzenhausen, der opererer under EU-jurisdiktion. Selv for sine amerikanske datacenterlokationer fastholder Hetzner sin privatlivsbevidste tilgang, forankret i tyske og europæiske databeskyttelsesstandarder. Kunders personoplysninger fremgår ikke af offentlige WHOIS-registre for private kunder.

### Centrale regulatoriske aspekter

- Føderale love som HIPAA (sundhedsdata), GLBA (finansielle data) og COPPA (data om børn) gælder for specifikke sektorer
- Delstatslige privatlivslove bliver stadig mere betydningsfulde, især **California Consumer Privacy Act (CCPA)** og dens ændring, **California Privacy Rights Act (CPRA)**
- Andre delstater, herunder Virginia, Colorado, Connecticut og Utah, har vedtaget omfattende privatlivslovgivning
- Oregon, hvor dette datacenter ligger, vedtog **Oregon Consumer Privacy Act** med virkning fra juli 2024

## Hvornår du bør overveje denne region

- Din organisation eller dine brugere er primært baseret i USA
- Du skal overholde amerikanske føderale eller delstatslige databeskyttelseslove
- Du ønsker dataresidens inden for USA
- Du betjener kunder i Nordamerika og ønsker adgang med lav latens fra det vestlige USA
