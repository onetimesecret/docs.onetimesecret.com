---
title: Te Tiki Karere Muna
description: Ako me pēhea te tiki i ngā karere muna mā te REST API Onetime Secret, me te tautoko mō te urunga motuhēhēnga me te ingoa-kore.
---

_Kua whakahōutia 2025-04-02_

:::note
**Wāhitanga Raraunga me te Kōwhiringa Rohe**
- Kōwhiria tētahi [rohe](/mi/regions/) (hei tauira, [`us.onetimesecret.com`](https://us.onetimesecret.com/), [`eu.onetimesecret.com`](https://eu.onetimesecret.com/))
- Whakaarohia ngā āhuatanga pērā i te mana rangatiratanga raraunga, te tauhanga, me ngā hiahiatanga ūnga
- **TUHIPOKA:** Ka noho haumanu tonu te `onetimesecret.com` taunoa, ā, ka ārahi ki tētahi pūtoi raraunga haumanu, engari e tūtohu ana kia whakamahi i tētahi wāhitanga motuhake nā te mea ka taea pea te whakakorehia o tēnei āhuatanga ā ngā wā ka heke mai.
:::

## Tiki Karere Muna

`POST https://REGION.onetimesecret.com/api/v1/secret/SECRET_KEY`

### Tono Motuhēhēnga

```bash
$ curl -X POST -u 'USERNAME:APITOKEN' https://eu.onetimesecret.com/api/v1/secret/SECRET_KEY
```

### Tono Ingoa-kore

```bash
$ curl -X POST https://eu.onetimesecret.com/api/v1/secret/SECRET_KEY
```

### Ngā Tawhā Pātai

- **SECRET_KEY**: te kī ahurei mō tēnei karere muna.
- **passphrase** (mēnā e hiahiatia ana): ka hiahiatia te kupu karapa mēnā i waihangahia te karere muna me tētahi.

### Ngā Āhuatanga

- **secret_key**: te kī ahurei mō te karere muna i waihangahia e koe. Ko tēnei te kī ka taea e koe te tohatoha.
- **value**: Te karere muna tūturu. Kaua e kī, engari ka wātea anake tēnei i te wā kotahi.

## Tiki Raraunga

`POST https://REGION.onetimesecret.com/api/v1/private/METADATA_KEY`

He raraunga hoki kei ia karere muna. I hoahoahia ngā raraunga hei whakamahi mā te kaihanga o te karere muna (arā, ehara i te kaiwhiwhi), ā, me pupuri tūmataiti i te nuinga o te wā. Ka taea e koe te whakamahi haumaru i te kī raraunga ki te tiki i ngā mōhiohio taketake mō te karere muna anō (hei tauira, mēnā, i te wā rānei i tirohia) nā te mea he rerekē te kī raraunga i te kī karere muna.

### Tono Motuhēhēnga

```bash
$ curl -X POST -u 'USERNAME:APITOKEN' https://eu.onetimesecret.com/api/v1/private/METADATA_KEY
```

### Ngā Tawhā Pātai

- **METADATA_KEY**: te kī ahurei mō ngā raraunga nei.

### Ngā Āhuatanga

- **custid**: te ingoa kaiwhakamahi o te pūkete nāna i waihanga te karere muna. Ko tēnei uara ko `anon` mō ngā tono ingoa-kore.
- **metadata\_key**: te kī ahurei mō ngā raraunga. KAUA e tohatoha i tēnei.
- **secret\_key**: te kī ahurei mō te karere muna i waihangahia e koe. Ko tēnei te kī ka taea e koe te tohatoha.
- **ttl**: Te wā-ki-te-ora i tohua (arā, ehara i te wā e toe ana)
- **metadata\_ttl**: Te wā e toe ana (i ngā hēkona) o ngā raraunga kia ora ai.
- **secret\_ttl**: Te wā e toe ana (i ngā hēkona) o te karere muna kia ora ai.
- **recipient**: mēnā i tohua tētahi kaiwhiwhi, koinei te tāhanga whakapōkēkē o te wāhitau īmēra.
- **created**: Te wā i waihangahia ai ngā raraunga i te wā unix (UTC)
- **updated**: ōrite, engari ko te wā i whakahōutia ai.
- **received**: Te wā i whiwhi ai te karere muna.
- **passphrase\_required**: Mēnā i whakaratohia tētahi kupu karapa i te wā i waihangahia ai te karere muna, ka pono tēnei. Ki te kore, ka hē.


## Whakawareware Karere Muna

`POST https://REGION.onetimesecret.com/api/v1/private/METADATA_KEY/burn`

Whakawarewarehia tētahi karere muna kāore anō kia pānuitia.

### Tono Motuhēhēnga

```bash
$ curl -X POST -u 'USERNAME:APITOKEN' https://eu.onetimesecret.com/api/v1/private/METADATA_KEY/burn
```

### Ngā Tawhā Pātai

- Kāore

### Ngā Āhuatanga

- Ōrite ki ngā āhuatanga raraunga me te tūnga o te whakawareware.

## Tiki Raraunga Tata Nei

**GET https://onetimesecret.com/api/v1/private/recent**

Tikina tētahi rārangi o ngā raraunga tata nei.

### Tono Motuhēhēnga

```bash
$ curl -u 'USERNAME:APITOKEN' https://eu.onetimesecret.com/api/v1/private/recent
```

### Ngā Tawhā Pātai

- Kāore

### Ngā Āhuatanga

- Ōrite ki ngā āhuatanga raraunga, ahakoa he rārangi, ā, ka noho kau te uara kī karere muna.

::: warning Motuhēhēnga e Hiahiatia ana
Tuhipoka: Ko ngā mahi raraunga me te whakahaere (tiki raraunga, whakawareware karere muna, raraunga tata nei) e wātea ana mō ngā kaiwhakamahi motuhēhēnga anake.
:::
