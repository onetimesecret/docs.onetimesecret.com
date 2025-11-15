---
title: Hentning af beskeder
description: Lær hvordan du henter beskeder ved hjælp af Onetime Secret REST API med support til både godkendt og anonym adgang.
---

_Opdateret 2025-04-02_

:::note
**Datalokation og regionsvalg**
- Vælg en [region](/da/regions) (f.eks. [`us.onetimesecret.com`](https://us.onetimesecret.com/), [`eu.onetimesecret.com`](https://eu.onetimesecret.com/)) datacentre
- Overvej faktorer som datasuverænitet, latens og overholdelseskrav
- **BEMÆRK:** Standard `onetimesecret.com` forbliver operationel og dirigerer til et aktivt datacenter, brug af en specifik lokalitet anbefales, da denne funktionalitet kan blive udfaset i fremtiden.
:::

**Note:** For detaljerede API-eksempler, anmodningssyntaks og responsformater, se venligst den [engelske version af denne side](/en/rest-api/v1/retrieve-secrets), da den indeholder komplette kodeeksempler og tekniske detaljer.

## Hent en besked

`POST https://REGION.onetimesecret.com/api/v1/secret/SECRET_KEY`

### Godkendt anmodning

Kræver din bruger-API-nøgle.

### Anonym anmodning

Ingen godkendelse påkrævet.

### Forespørgselsparametre

- **SECRET_KEY**: Den unikke nøgle til denne besked
- **passphrase** (hvis påkrævet): Adgangssætningen er kun påkrævet, hvis beskeden blev oprettet med en

### Attributter

- **secret_key**: Den unikke nøgle til beskeden
- **value**: Den faktiske besked. Den vil kun være tilgængelig én gang.

## Hent metadata

`POST https://REGION.onetimesecret.com/api/v1/private/METADATA_KEY`

Hver besked har også tilknyttet metadata. Metadata er beregnet til at blive brugt af beskedens skaber (dvs. ikke modtageren).

For komplette detaljer og kodeeksempler, se den [engelske dokumentation](/en/rest-api/v1/retrieve-secrets).

## Ødelæg en besked

`POST https://REGION.onetimesecret.com/api/v1/private/METADATA_KEY/burn`

Ødelæg en besked, før den er blevet set.

For komplette detaljer, se den [engelske dokumentation](/en/rest-api/v1/retrieve-secrets).
