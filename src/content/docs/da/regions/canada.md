---
title: Canada (CA)
description: Onetime Secrets canadiske datacenterregion, beliggende i Toronto.
---

## Infrastruktur

- **Placering**: Toronto, Canada
- **URL**: [ca.onetimesecret.com](https://ca.onetimesecret.com)
- **Hostingudbyder**: <a href="https://www.digitalocean.com" target="_blank" rel="noopener noreferrer nofollow">DigitalOcean</a>
- **CNAME til brugerdefineret domæne**: `identity.ca.onetime.co`

:::note
Vi er en canadisk virksomhed og leder aktivt efter en velegnet canadisk-ejet hostingudbyder til denne region. Har du forslag, hører vi meget gerne fra dig via vores [feedbackformular](https://onetimesecret.com/feedback).
:::

## DNS for brugerdefineret domæne

For at pege et brugerdefineret domæne mod denne region skal du oprette en CNAME-post:

| Posttype | Vært                  | Værdi                    |
| ----------- | --------------------- | ------------------------ |
| CNAME       | `secrets.example.com` | `identity.ca.onetime.co` |

Se [opsætningsvejledningen til brugerdefinerede domæner](/da/custom-domains/setup-guide) for fulde instruktioner.

## Regulatorisk miljø

Canadas føderale privatlivslovgivning, **Personal Information Protection and Electronic Documents Act (PIPEDA)**, regulerer indsamling, brug og videregivelse af personoplysninger i forbindelse med kommerciel aktivitet. Flere provinser har desuden deres egen privatlivslovgivning, som kan finde anvendelse.

### Om hostingudbyderen

Denne region hostes af <a href="https://www.digitalocean.com" target="_blank" rel="noopener noreferrer nofollow">DigitalOcean</a>, en amerikansk-baseret cloududbyder med hovedsæde i Broomfield, Colorado, der betjener millioner af udviklere globalt. DigitalOcean overholder GDPR for europæiske kunder, understøtter dataportabilitet og offentliggør gennemsigtighedsrapporter med detaljer om myndigheders dataanmodninger. Virksomheden har robuste sikkerhedskontroller og offentliggør revisionsrapporter.

### Centrale regulatoriske aspekter

- PIPEDA kræver meningsfuldt samtykke til indsamling og brug af data
- Office of the Privacy Commissioner of Canada fører tilsyn med overholdelse
- Canada har en tilstrækkelighedsafgørelse fra Europa-Kommissionen, hvilket letter dataoverførsler til EU
- Provinsielle love (f.eks. Albertas PIPA, Quebecs Lov 25) kan medføre yderligere krav

## Hvornår du bør overveje denne region

- Din organisation eller dine brugere er primært baseret i Canada
- Du skal overholde PIPEDA eller provinsiel privatlivslovgivning
- Du ønsker dataresidens inden for Canadas grænser
- Du betjener kunder i Nordamerika og ønsker en geografisk central mulighed
