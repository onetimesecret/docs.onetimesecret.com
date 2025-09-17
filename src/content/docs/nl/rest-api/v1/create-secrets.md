---
title: Geheimen creëren
description: Leer hoe je geheimen aanmaakt en ophaalt met de Onetime Secret REST API, met ondersteuning voor zowel geauthenticeerd als anoniem gebruik.
---

bijgewerkt op 2025-04-02

:::opmerking
**Selectie van datalocatie en regio**
- Kies tussen VS ([`us.onetimesecret.com`](https://us.onetimesecret.com/)), EU ([`eu.onetimesecret.com`](https://eu.onetimesecret.com/)), Canada ([`ca.onetimesecret.com`](https://ca.onetimesecret.com/)), of Nieuw-Zeeland ([`nz.onetimesecret.com`](https://nz.onetimesecret.com/)) datacenters
- Houd rekening met factoren zoals gegevenssoevereiniteit, latentie en nalevingsvereisten
- **NOOT:** Standaard blijft `onetimesecret.com` operationeel en routeert naar een actief datacenter. Het gebruik van een specifieke locatie wordt aanbevolen omdat deze functionaliteit in de toekomst mogelijk wordt afgeschaft.
:::


## Maak een geheim

`POST https://REGION.onetimesecret.com/api/v1/share`

Gebruik dit eindpunt om een geheime waarde op te slaan en een eenmalige link te maken.


### Geauthenticeerd verzoek

``bash
$ curl -X POST -u 'USERNAME:APITOKEN' -d 'secret=SECRET&ttl=NUMBER_IN_SECONDS' https://us.onetimesecret.com/api/v1/share
```

### Anoniem verzoek

``bash
$ curl -X POST -d 'secret=SECRET&ttl=3600' https://us.onetimesecret.com/api/v1/share
```

### Query-parameters

- **secret**: de geheime waarde die wordt versleuteld voordat deze wordt opgeslagen. Er is een maximale lengte op basis van je plan dat wordt afgedwongen (1k-10k).
- **passphrase**: een string die de ontvanger moet kennen om het geheim te kunnen zien. Deze waarde wordt ook gebruikt om het geheim te versleutelen en wordt versleuteld voordat het wordt opgeslagen, zodat we deze waarde alleen tijdens het verzenden hebben.
- **ttl**: de maximale tijd, in seconden, dat het geheim moet overleven (d.w.z. time-to-live). Als deze tijd verstreken is, wordt het geheim gewist en is het niet meer terug te halen.
- **ontvanger**: een e-mailadres. We sturen een vriendelijke e-mail met de link naar het geheim (NIET het geheim zelf).
- **share_domain**: het aangepaste domein om te gebruiken bij het genereren van de geheime link. Als dit niet is opgegeven, wordt het standaarddomein gebruikt (bijv. eu.onetimesecret.com).

### Attributen

- **custid**: de gebruikersnaam van de account die het geheim heeft aangemaakt. Deze waarde is `anon` voor anonieme verzoeken.
- **metadata_key**: de unieke sleutel voor de metadata. Deel deze NIET.
- Secret_key**: de unieke sleutel voor het geheim dat je aanmaakt. Deze sleutel kun je delen.
- **ttl**: De time-to-live (in seconden) die is opgegeven (dus niet de resterende tijd).
- **metadata_ttl**: De resterende tijd (in seconden) dat de metadata nog te leven heeft.
- **secret_ttl**: De resterende tijd (in seconden) dat het geheim nog te leven heeft.
- **recipient**: als er een ontvanger is opgegeven, is dit een versleutelde versie van het e-mailadres.
- **created**: Tijd waarop de secret is aangemaakt in unix-tijd (UTC).
- **updated**: idem, maar dan de tijd waarop het voor het laatst is bijgewerkt.
- **passphrase_required**: Als er een passphrase is opgegeven bij het aanmaken van het geheim, dan is dit waar. Anders uiteraard false.
- **share_domain**: het aangepaste domein dat moet worden gebruikt bij het genereren van de geheime link. Anders "".


### Voorbeeld Response:

``json
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

## Genereer een geheim

`POST https://REGION.onetimesecret.com/api/v1/generate`

Genereer een kort, uniek geheim. Dit is handig voor tijdelijke wachtwoorden, Onetime pads, salts, enz.

### Geauthenticeerd verzoek

``bash
$ curl -X POST -u 'USERNAME:APITOKEN' -d 'ttl=NUMBER_IN_SECONDS' https://us.onetimesecret.com/api/v1/generate
```

### Anoniem verzoek

``bash
$ curl -X POST -d 'ttl=3600' https://us.onetimesecret.com/api/v1/generate
```


``json
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

### Attributen

Hetzelfde als "Een geheim delen" hierboven, met de toevoeging van het veld `waarde`.
