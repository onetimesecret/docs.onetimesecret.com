---
title: Te Waihanga Karere Muna
description: Ako me pēhea te waihanga me te tiki i ngā karere muna mā te REST API Onetime Secret, me te tautoko mō te whakamahi motuhēhēnga me te ingoa-kore.
---

_Kua whakahōutia 2025-04-02_

:::note
**Wāhitanga Raraunga me te Kōwhiringa Rohe**
- Kōwhiria i waenganui i ngā pūtoi raraunga US ([`us.onetimesecret.com`](https://us.onetimesecret.com/)), EU ([`eu.onetimesecret.com`](https://eu.onetimesecret.com/)), Canada ([`ca.onetimesecret.com`](https://ca.onetimesecret.com/)), Aotearoa rānei ([`nz.onetimesecret.com`](https://nz.onetimesecret.com/))
- Whakaarohia ngā āhuatanga pērā i te mana rangatiratanga raraunga, te tauhanga, me ngā hiahiatanga ūnga
- **TUHIPOKA:** Ka noho haumanu tonu te `onetimesecret.com` taunoa, ā, ka ārahi ki tētahi pūtoi raraunga haumanu, engari e tūtohu ana kia whakamahi i tētahi wāhitanga motuhake nā te mea ka taea pea te whakakorehia o tēnei āhuatanga ā ngā wā ka heke mai.
:::


## Waihanga Karere Muna

`POST https://REGION.onetimesecret.com/api/v1/share`

Whakamahia tēnei poutoko ki te penapena i tētahi uara karere muna, ā, ki te waihanga hononga whakamahi-kotahi-wā.


### Tono Motuhēhēnga

```bash
$ curl -X POST -u 'USERNAME:APITOKEN' -d 'secret=SECRET&ttl=NUMBER_IN_SECONDS' https://us.onetimesecret.com/api/v1/share
```

### Tono Ingoa-kore

```bash
$ curl -X POST -d 'secret=SECRET&ttl=3600' https://us.onetimesecret.com/api/v1/share
```

### Ngā Tawhā Pātai

- **secret**: te uara karere muna ka whakamuhumuhutia i mua i te penapena. He roa whakatau e pā ana ki tō mahere ka whakamana (1k-10k).
- **passphrase**: tētahi rārangi kupu me mōhio te kaiwhiwhi ki te tiro i te karere muna. Ka whakamahia hoki tēnei uara ki te whakamuhumuhu i te karere muna, ā, ka bcryptia i mua i te penapena, nā reira ko tēnei uara anake i te wā kawe.
- **ttl**: te nui o te wā, i ngā hēkona, me ora ai te karere muna (arā, te wā-ki-te-ora). I te wā ka pau tēnei wā, ka whakakorehia te karere muna, kāore e whakahokia.
- **recipient**: tētahi wāhitau īmēra. Ka tukuna e mātou tētahi īmēra hoa e whāki ana i te hononga karere muna (KĀORE te karere muna anō).
- **share_domain**: te rohe ritenga ki te whakamahi i te wā e whakaputa ana i te hononga karere muna. Mēnā kāore i whakaratohia, ka whakamahia te rohe taunoa (hei tauira eu.onetimesecret.com).

### Ngā Āhuatanga

- **custid**: te ingoa kaiwhakamahi o te pūkete nāna i waihanga te karere muna. Ko tēnei uara ko `anon` mō ngā tono ingoa-kore.
- **metadata\_key**: te kī ahurei mō ngā raraunga. KAUA e tohatoha i tēnei.
- **secret\_key**: te kī ahurei mō te karere muna i waihangahia e koe. Ko tēnei te kī ka taea e koe te tohatoha.
- **ttl**: Te wā-ki-te-ora (i ngā hēkona) i tohua (arā, ehara i te wā e toe ana)
- **metadata\_ttl**: Te wā e toe ana (i ngā hēkona) o ngā raraunga kia ora ai.
- **secret\_ttl**: Te wā e toe ana (i ngā hēkona) o te karere muna kia ora ai.
- **recipient**: mēnā i tohua tētahi kaiwhiwhi, koinei te tāhanga whakapōkēkē o te wāhitau īmēra.
- **created**: Te wā i waihangahia ai te karere muna i te wā unix (UTC)
- **updated**: ōrite, engari ko te wā i whakahōutia ai.
- **passphrase\_required**: Mēnā i whakaratohia tētahi kupu karapa i te wā i waihangahia ai te karere muna, ka pono tēnei. Ki te kore, ka hē.
- **share_domain**: te rohe ritenga ki te whakamahi i te wā e whakaputa ana i te hononga karere muna. Ki te kore, "".


### Tauira Whakahoki:

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

## Whakaputa Karere Muna

`POST https://REGION.onetimesecret.com/api/v1/generate`

Whakaputaina tētahi karere muna poto, ahurei. He pai tēnei mō ngā kupuhipa taupua, ngā paparau kotahi-wā, ngā tote, me ērā atu.

### Tono Motuhēhēnga

```bash
$ curl -X POST -u 'USERNAME:APITOKEN' -d 'ttl=NUMBER_IN_SECONDS' https://us.onetimesecret.com/api/v1/generate
```

### Tono Ingoa-kore

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

### Ngā Āhuatanga

Ōrite ki te "Tohatoha Karere Muna" i runga ake nei, me te tāpiri o te āpure `value`.
