---
title: Skapa hemligheter
description: Lär dig hur du skapar och hämtar hemligheter med Onetime Secret REST API, med stöd för både autentiserad och anonym användning.
---

_Uppdaterad 2025-04-02_

:::note
**Datalokalisering och regionval**
- Välj mellan USA ([`us.onetimesecret.com`](https://us.onetimesecret.com/)), EU ([`eu.onetimesecret.com`](https://eu.onetimesecret.com/)), Kanada ([`ca.onetimesecret.com`](https://ca.onetimesecret.com/)) eller Nya Zeeland ([`nz.onetimesecret.com`](https://nz.onetimesecret.com/)) datacenter
- Överväg faktorer som datasuveränitet, latens och efterlevnadskrav
- **NOTERA:** Standard `onetimesecret.com` förblir operativ och dirigerar till ett aktivt datacenter, användning av en specifik lokalitet rekommenderas eftersom denna funktionalitet kan bli föråldrad i framtiden.
:::

## Skapa en hemlighet

`POST https://REGION.onetimesecret.com/api/v1/share`

Använd denna slutpunkt för att lagra ett hemligt värde och skapa en engångslänk.

### Autentiserad förfrågan

```bash
$ curl -X POST -u 'USERNAME:APITOKEN' -d 'secret=SECRET&ttl=NUMBER_IN_SECONDS' https://us.onetimesecret.com/api/v1/share
```

### Anonym förfrågan

```bash
$ curl -X POST -d 'secret=SECRET&ttl=3600' https://us.onetimesecret.com/api/v1/share
```

### Frågeparametrar

- **secret**: det hemliga värdet som krypteras innan det lagras. Det finns en maximal längd baserat på din plan som upprätthålls (1k-10k).
- **passphrase**: en sträng som mottagaren måste känna till för att visa hemligheten. Detta värde används också för att kryptera hemligheten och bcryptas innan det lagras så vi har endast detta värde under överföring.
- **ttl**: den maximala tiden, i sekunder, som hemligheten ska överleva (dvs. time-to-live). När denna tid går ut raderas hemligheten och är inte återställningsbar.
- **recipient**: en e-postadress. Vi skickar ett vänligt e-postmeddelande som innehåller den hemliga länken (INTE hemligheten själv).
- **share_domain**: den anpassade domänen att använda vid generering av den hemliga länken. Om inte angiven används standarddomänen (t.ex. eu.onetimesecret.com).

### Attribut

- **custid**: användarnamnet för kontot som skapade hemligheten. Detta värde kommer att vara `anon` för anonyma förfrågningar.
- **metadata\_key**: den unika nyckeln för metadata. DELA INTE denna.
- **secret\_key**: den unika nyckeln för hemligheten du skapar. Detta är nyckeln som du kan dela.
- **ttl**: Time-to-live (i sekunder) som angavs (dvs. inte återstående tid)
- **metadata\_ttl**: Återstående tid (i sekunder) som metadata har kvar att leva.
- **secret\_ttl**: Återstående tid (i sekunder) som hemligheten har kvar att leva.
- **recipient**: om en mottagare angavs, är detta en fördunklad version av e-postadressen.
- **created**: Tid då hemligheten skapades i unix-tid (UTC)
- **updated**: detsamma, men tiden den senast uppdaterades.
- **passphrase\_required**: Om en lösenfras angavs när hemligheten skapades kommer detta att vara sant. Annars falskt, uppenbarligen.
- **share_domain**: den anpassade domänen att använda vid generering av den hemliga länken. Annars "".

### Exempelsvar:

```json
{
  "custid":"USERNAME",
  "metadata_key":"qjpjroeit8wra0ojeyhcw5pjsgwtuq7",
  "secret_key":"153l8vbwqx5taskp92pf05uvgjefvu9",
  "ttl":"3600",
  "share_domain": "",
  "updated":"1324174006",
  "created":"1324174006"
}
```

## Generera en hemlighet

`POST https://REGION.onetimesecret.com/api/v1/generate`

Generera en kort, unik hemlighet. Detta är användbart för tillfälliga lösenord, engångskoder, salter, etc.

### Autentiserad förfrågan

```bash
$ curl -X POST -u 'USERNAME:APITOKEN' -d 'ttl=NUMBER_IN_SECONDS' https://us.onetimesecret.com/api/v1/generate
```

### Anonym förfrågan

```bash
$ curl -X POST -d 'ttl=3600' https://us.onetimesecret.com/api/v1/generate
```

```json
{
  "custid":"USERNAME",
  "value":"3Rg8R2sfD3?a",
  "metadata_key":"2b6bjmudhmtiqjn2qmdaqjkqxp323gi",
  "secret_key":"pgcdv7org3vtdurif809sygnt0mstw6",
  "ttl":"3600",
  "share_domain": "",
  "updated":"1324174095",
  "created":"1324174095"
}
```

### Attribut

Samma som "Dela en hemlighet" ovan, med tillägg av `value`-fältet.
