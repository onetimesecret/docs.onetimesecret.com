---
title: Geheimen ophalen
description: Leer hoe je geheimen kunt ophalen met de Onetime Secret REST API, met ondersteuning voor zowel geauthenticeerde als anonieme toegang.
---

bijgewerkt op 2025-04-02

:::opmerking
**Selectie van gegevenslocatie en regio**
- Kies een [regio]({getRelativeLocaleUrl(Astro.currentLocale ?? 'en', 'regions')}) (bijv. [`us.onetimesecret.com`](https://us.onetimesecret.com/), [`eu.onetimesecret.com`](https://eu.onetimesecret.com/)) datacenters
- Houd rekening met factoren zoals gegevenssoevereiniteit, latentie en nalevingsvereisten
- **NOOT:** Standaard blijft `onetimesecret.com` operationeel en routeert naar een actief datacenter. Het gebruik van een specifieke locatie wordt aanbevolen omdat deze functionaliteit in de toekomst mogelijk wordt afgeschaft.
:::

## Een geheim ophalen

`POST https://REGION.onetimesecret.com/api/v1/secret/SECRET_KEY`

### Geauthenticeerd verzoek

``bash
$ curl -X POST -u 'USERNAME:APITOKEN' https://eu.onetimesecret.com/api/v1/secret/SECRET_KEY
```

### Anoniem verzoek

``bash
$ curl -X POST https://eu.onetimesecret.com/api/v1/secret/SECRET_KEY
```

### Query-parameters

- **SECRET_KEY**: de unieke sleutel voor deze geheime sleutel.
- **passphrase** (indien vereist): de passphrase is alleen vereist als de secret is aangemaakt met een passphrase.

### Attributen

- **secret_key**: de unieke sleutel voor het geheim dat je aanmaakt. Deze sleutel kun je delen.
- **waarde**: Het eigenlijke geheim. Het spreekt voor zich, maar dit is maar één keer beschikbaar.

## Metagegevens ophalen

`POST https://REGION.onetimesecret.com/api/v1/private/METADATA_KEY`

Elk geheim heeft ook geassocieerde metadata. De metadata zijn bedoeld voor de maker van de secret (dus niet de ontvanger) en moeten over het algemeen privé blijven. Je kunt de metadata sleutel veilig gebruiken om basisinformatie over het geheim zelf op te vragen (bijv. of en wanneer het is bekeken) omdat de metadata sleutel anders is dan de geheime sleutel.

### Geauthenticeerd verzoek

``bash
$ curl -X POST -u 'USERNAME:APITOKEN' https://eu.onetimesecret.com/api/v1/private/METADATA_KEY
```

### Query-parameters

- **METADATA_KEY**: de unieke sleutel voor deze metagegevens.

### Attributen

- **custid**: de gebruikersnaam van de account die het geheim heeft aangemaakt. Deze waarde zal `anon` zijn voor anonieme verzoeken.
- **metadata_key**: de unieke sleutel voor de metadata. Deel deze NIET.
- Secret_key**: de unieke sleutel voor het geheim dat je hebt aangemaakt. Deze sleutel kun je delen.
- **ttl**: De time-to-live die is opgegeven (dus niet de resterende tijd).
- **metadata_ttl**: De resterende tijd (in seconden) dat de metadata nog te leven heeft.
- **secret_ttl**: De resterende tijd (in seconden) dat het geheim nog te leven heeft.
- **recipient**: als er een ontvanger is opgegeven, is dit een versleutelde versie van het e-mailadres.
- **created**: Tijd waarop de metagegevens zijn aangemaakt in unix-tijd (UTC).
- **updated**: idem, maar dan de tijd waarop het voor het laatst is bijgewerkt.
- **received**: Tijdstip waarop het geheim is ontvangen.
- **passphrase_required**: Als er een passphrase is opgegeven bij het aanmaken van het geheim, dan is dit waar. Anders uiteraard false.


## Een geheim verbranden

`POST https://REGION.onetimesecret.com/api/v1/private/METADATA_KEY/burn`

Verbrand een geheim dat nog niet is gelezen.

### Geauthenticeerd verzoek

``bash
$ curl -X POST -u 'USERNAME:APITOKEN' https://eu.onetimesecret.com/api/v1/private/METADATA_KEY/burn
```

### Query-parameters

- Geen

### Attributen

- Hetzelfde als metagegevensattributen met een status van verbrand.

## Recente metagegevens ophalen

**GET https://onetimesecret.com/api/v1/private/recent**

Een lijst met recente metagegevens ophalen.

### Geauthenticeerd verzoek

``bash
$ curl -u 'USERNAME:APITOKEN' https://eu.onetimesecret.com/api/v1/private/recent
```

### Query-parameters

- Geen

### Attributen

- Hetzelfde als metagegevensattributen, maar dan als lijst en de geheime sleutelwaarde is altijd nul.

::: waarschuwing Authenticatie vereist
Opmerking: Metagegevens en beheeroperaties (metagegevens ophalen, geheim branden, recente metagegevens) zijn alleen beschikbaar voor geauthenticeerde gebruikers.
:::
