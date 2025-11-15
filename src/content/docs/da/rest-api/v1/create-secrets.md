---
title: Oprettelse af beskeder
description: Lær hvordan du opretter og henter beskeder ved hjælp af Onetime Secret REST API med support til både godkendt og anonym brug.
---

_Opdateret 2025-04-02_

:::note
**Datalokation og regionsvalg**
- Vælg mellem US ([`us.onetimesecret.com`](https://us.onetimesecret.com/)), EU ([`eu.onetimesecret.com`](https://eu.onetimesecret.com/)), Canada ([`ca.onetimesecret.com`](https://ca.onetimesecret.com/)) eller New Zealand ([`nz.onetimesecret.com`](https://nz.onetimesecret.com/)) datacentre
- Overvej faktorer som datasuverænitet, latens og overholdelseskrav
- **BEMÆRK:** Standard `onetimesecret.com` forbliver operationel og dirigerer til et aktivt datacenter, brug af en specifik lokalitet anbefales, da denne funktionalitet kan blive udfaset i fremtiden.
:::

**Note:** For detaljerede API-eksempler, anmodningssyntaks og responsformater, se venligst den [engelske version af denne side](/en/rest-api/v1/create-secrets), da den indeholder komplette kodeeksempler og tekniske detaljer.

## Opret en besked

`POST https://REGION.onetimesecret.com/api/v1/share`

Brug dette endpoint til at gemme en hemmelig værdi og oprette et engangsbrugslink.

### Godkendt anmodning

Kræver din bruger-API-nøgle.

### Anonym anmodning

Ingen godkendelse påkrævet.

### Forespørgselsparametre

- **secret**: Den hemmelige værdi, der krypteres før lagring
- **passphrase**: En streng, som modtageren skal kende for at se beskeden
- **ttl**: Maksimal tid i sekunder, som beskeden skal overleve (time-to-live)
- **recipient**: En e-mailadresse til at sende linket til
- **share_domain**: Det brugerdefinerede domæne, der skal bruges ved generering af linket

### Attributter

Se den [engelske dokumentation](/en/rest-api/v1/create-secrets) for komplette attributbeskrivelser og eksempler.

## Opret en besked med tilfældig adgangssætning

`POST https://REGION.onetimesecret.com/api/v1/generate`

Opret en besked med en automatisk genereret adgangssætning.

For komplette detaljer og kodeeksempler, se den [engelske dokumentation](/en/rest-api/v1/create-secrets).
