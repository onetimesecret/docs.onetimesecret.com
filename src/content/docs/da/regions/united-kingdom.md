---
title: Storbritannien (UK)
description: Onetime Secrets datacenterregion for Storbritannien, beliggende i London.
---

## Infrastruktur

- **Placering**: London, Storbritannien
- **URL**: [uk.onetimesecret.com](https://uk.onetimesecret.com)
- **Hostingudbyder**: <a href="https://upcloud.com" target="_blank" rel="noopener noreferrer nofollow">UpCloud</a> (Helsinki, Finland)
- **CNAME til brugerdefineret domæne**: `identity.ingress.onetime.co` (anycast)

## DNS for brugerdefineret domæne

For at pege et brugerdefineret domæne mod denne region skal du oprette en CNAME-post:

| Posttype | Vært                  | Værdi                         |
| ----------- | --------------------- | ----------------------------- |
| CNAME       | `secrets.example.com` | `identity.ingress.onetime.co` |

Bemærk, at UK-regionen bruger en anycast-CNAME frem for et regionsspecifikt underdomæne.

Se [opsætningsvejledningen til brugerdefinerede domæner](/da/custom-domains/setup-guide) for fulde instruktioner.

## Regulatorisk miljø

Storbritanniens databeskyttelsesramme reguleres af **UK General Data Protection Regulation (UK GDPR)** og **Data Protection Act 2018**. Efter Brexit opretholder Storbritannien sin egen databeskyttelsesordning, som er tæt tilpasset EU's GDPR.

### Om hostingudbyderen

Denne region hostes af <a href="https://upcloud.com" target="_blank" rel="noopener noreferrer nofollow">UpCloud</a>, en europæisk cloud-infrastrukturudbyder grundlagt i 2011 med hovedsæde i Helsinki, Finland. Som en suveræn europæisk udbyder opbevares alle kontorelaterede data udelukkende i Finland under finsk og europæisk databeskyttelseslovgivning. UpCloud driver datacentre flere steder i Europa, herunder London, som er vært for denne region.

### Centrale regulatoriske aspekter

- Information Commissioner's Office (ICO) fungerer som den uafhængige tilsynsmyndighed
- UK GDPR bevarer kerneprincipperne og rettighederne fra EU's GDPR, herunder de registreredes rettigheder og krav om lovligt grundlag
- Storbritannien har en tilstrækkelighedsafgørelse fra Europa-Kommissionen, som gør det muligt for data at strømme frit fra EU/EØS
- Data Protection Act 2018 supplerer UK GDPR med bestemmelser specifikke for britisk retshåndhævelse og efterretningstjenester

## Hvornår du bør overveje denne region

- Din organisation eller dine brugere er primært baseret i Storbritannien
- Du skal overholde UK GDPR og Data Protection Act 2018
- Du ønsker dataresidens inden for Storbritannien
- Du betjener kunder, der kræver databehandling baseret i Storbritannien
