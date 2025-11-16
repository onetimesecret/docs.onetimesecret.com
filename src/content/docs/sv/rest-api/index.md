---
title: Komma igång
description: Onetime Secrets REST API tillhandahåller flexibla hemlighetsdelningsmöjligheter, med stöd för både autentiserad och anonym användning. Autentiserade användare får avancerade funktioner och högre användningsgränser, medan icke-autentiserade användare snabbt kan dela hemligheter med grundläggande funktionalitet.
---

_Uppdaterad 2025-04-29_

{% aside type="tip" %}
Testa och utforska API-slutpunkterna med vår interaktiva [Postman Collection](https://docs.onetimesecret.dev/).
{% /aside %}

## Bas-URI

`https://REGION.onetimesecret.com/api`

Där `REGION` är antingen `us` eller `eu`.

<!-- ::callout{icon="i-heroicons-globe-alt"} -->
**Datalokalisering och regionval**
- Välj en region (t.ex. USA [`us.onetimesecret.com`](https://us.onetimesecret.com/)) eller EU ([`eu.onetimesecret.com`](https://eu.onetimesecret.com/)). Se [Regioner](/sv/regions) för alla alternativ.
- Överväg faktorer som datasuveränitet, latens och efterlevnadskrav
- **NOTERA:** Standard `onetimesecret.com` förblir operativ och dirigerar till ett aktivt datacenter, användning av en specifik lokalitet rekommenderas eftersom denna funktionalitet kan bli föråldrad i framtiden.
::

## Autentisering
Vi stöder två användningslägen för API:

### Autentiserad åtkomst

`https://USERNAME:APITOKEN@REGION.onetimesecret.com/api`

- Använd HTTP Basic Authentication för fullständiga API-funktioner
- Användarnamnet är din kontoinloggning
- Lösenordet är API-token från din kontosida

### Anonym åtkomst

`https://REGION.onetimesecret.com/api`

- Begränsad funktionalitet tillgänglig utan autentisering
- Idealisk för snabb, engångsdelning av hemligheter
- Kan användas för både skapande och hämtning av hemligheter

## Datalokalisering
Onetime Secret stöder flera geografiska datacenter. Vi följer en policy med noll datadelning mellan regioner, vilket säkerställer fullständig dataisolering. Välj rätt datacenter för dina behov:

- **EU-datacenter:** [eu.onetimesecret.com](https://eu.onetimesecret.com/)
- **USA-datacenter:** [us.onetimesecret.com](https://us.onetimesecret.com/)

### Viktiga överväganden:
- Du kan välja en specifik datalokalisering genom att navigera direkt till önskad domän
- Platsen för din hemlighet är alltid tydlig från den genererade länken (t.ex. `us.onetimesecret.com/secret/abcd1234`)
- **NOTERA:** För närvarande är åtkomst via `onetimesecret.com/api` fortfarande operativ men användning av en specifik lokalitet rekommenderas eftersom denna funktionalitet kan bli föråldrad i framtiden.

## Anpassade domäner
Onetime Secret stöder anpassade domänkonfigurationer för organisationer med specifika nätverks- eller varumärkeskrav via vår [Identity Plus](https://onetimesecret.com/pricing)-plan.

### Fördelar med anpassade domäner
- **Privat varumärkesbyggande:** Använd din egen domän (t.ex. `secrets.example.com`) för API-åtkomst och hemlighetsdelnin
- **Konsekvent användarupplevelse:** Upprätthåll din organisations visuella identitet och förtroende hos dina kunder och partners.
- **Inkludera i medarbetarutbildning:** Använd anpassade domäner för att förstärka din organisations säkerhetspraxis och arbetsflöden.

<!-- ::callout{icon="i-heroicons-lock-closed"} -->
**Premiumfunktion**
Anpassade domäner är tillgängliga på vår [Identity Plus](https://onetimesecret.com/pricing)-plan. Konfigurera på några minuter med våra lättanvända konfigurationsalternativ. [Läs mer](custom-domains).
::

### API-användning med anpassade domäner
När du använder en anpassad domän följer alla API-slutpunkter samma struktur:

`https://secrets.example.com/api`


## Systemstatus

`GET https://REGION.onetimesecret.com/api/v1/status`
Aktuell status för systemet.

**Parameter:** Inga

```bash
$ curl -u 'USERNAME:APITOKEN' https://eu.onetimesecret.com/api/v1/status
{"status":"nominal"}
```

```bash
$ curl -u 'USERNAME:APITOKEN' https://us.onetimesecret.com/api/v1/status
{"status":"nominal"}
```
