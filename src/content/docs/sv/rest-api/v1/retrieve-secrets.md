---
title: Hämta hemligheter
description: Lär dig hur du hämtar hemligheter med Onetime Secret REST API, med stöd för både autentiserad och anonym åtkomst.
---

_Uppdaterad 2025-04-02_

:::note
**Datalokalisering och regionval**
- Välj en [region]({getRelativeLocaleUrl(Astro.currentLocale ?? 'en', 'regions')}) (t.ex. [`us.onetimesecret.com`](https://us.onetimesecret.com/), [`eu.onetimesecret.com`](https://eu.onetimesecret.com/)) datacenter
- Överväg faktorer som datasuveränitet, latens och efterlevnadskrav
- **NOTERA:** Standard `onetimesecret.com` förblir operativ och dirigerar till ett aktivt datacenter, användning av en specifik lokalitet rekommenderas eftersom denna funktionalitet kan bli föråldrad i framtiden.
:::

## Hämta en hemlighet

`POST https://REGION.onetimesecret.com/api/v1/secret/SECRET_KEY`

### Autentiserad förfrågan

```bash
$ curl -X POST -u 'USERNAME:APITOKEN' https://eu.onetimesecret.com/api/v1/secret/SECRET_KEY
```

### Anonym förfrågan

```bash
$ curl -X POST https://eu.onetimesecret.com/api/v1/secret/SECRET_KEY
```

### Frågeparametrar

- **SECRET_KEY**: den unika nyckeln för denna hemlighet.
- **passphrase** (om krävs): lösenfrasen krävs endast om hemligheten skapades med en.

### Attribut

- **secret_key**: den unika nyckeln för hemligheten du skapar. Detta är nyckeln som du kan dela.
- **value**: Den faktiska hemligheten. Det bör gå utan att säga, men detta kommer endast att vara tillgängligt en gång.

## Hämta metadata

`POST https://REGION.onetimesecret.com/api/v1/private/METADATA_KEY`

Varje hemlighet har också associerad metadata. Metadata är avsedd att användas av skaparen av hemligheten (dvs. inte mottagaren) och bör generellt hållas privat. Du kan säkert använda metadatanyckeln för att hämta grundläggande information om hemligheten själv (t.ex. om eller när den visades) eftersom metadatanyckeln skiljer sig från den hemliga nyckeln.

### Autentiserad förfrågan

```bash
$ curl -X POST -u 'USERNAME:APITOKEN' https://eu.onetimesecret.com/api/v1/private/METADATA_KEY
```

### Frågeparametrar

- **METADATA_KEY**: den unika nyckeln för denna metadata.

### Attribut

- **custid**: användarnamnet för kontot som skapade hemligheten. Detta värde kommer att vara `anon` för anonyma förfrågningar.
- **metadata\_key**: den unika nyckeln för metadata. DELA INTE denna.
- **secret\_key**: den unika nyckeln för hemligheten du skapade. Detta är nyckeln som du kan dela.
- **ttl**: Time-to-live som angavs (dvs. inte återstående tid)
- **metadata\_ttl**: Återstående tid (i sekunder) som metadata har kvar att leva.
- **secret\_ttl**: Återstående tid (i sekunder) som hemligheten har kvar att leva.
- **recipient**: om en mottagare angavs, är detta en fördunklad version av e-postadressen.
- **created**: Tid då metadata skapades i unix-tid (UTC)
- **updated**: detsamma, men tiden den senast uppdaterades.
- **received**: Tid då hemligheten mottogs.
- **passphrase\_required**: Om en lösenfras angavs när hemligheten skapades kommer detta att vara sant. Annars falskt, uppenbarligen.

## Bränn en hemlighet

`POST https://REGION.onetimesecret.com/api/v1/private/METADATA_KEY/burn`

Bränn en hemlighet som inte har lästs ännu.

### Autentiserad förfrågan

```bash
$ curl -X POST -u 'USERNAME:APITOKEN' https://eu.onetimesecret.com/api/v1/private/METADATA_KEY/burn
```

### Frågeparametrar

- Inga

### Attribut

- Samma som metadataattribut med status bränd.

## Hämta senaste metadata

**GET https://onetimesecret.com/api/v1/private/recent**

Hämta en lista över senaste metadata.

### Autentiserad förfrågan

```bash
$ curl -u 'USERNAME:APITOKEN' https://eu.onetimesecret.com/api/v1/private/recent
```

### Frågeparametrar

- Inga

### Attribut

- Samma som metadataattribut, dock som en lista och den hemliga nyckelns värde kommer alltid att vara null.

::: warning Autentisering krävs
Notera: Metadata och hanteringsoperationer (hämta metadata, bränn hemlighet, senaste metadata) är endast tillgängliga för autentiserade användare.
:::
