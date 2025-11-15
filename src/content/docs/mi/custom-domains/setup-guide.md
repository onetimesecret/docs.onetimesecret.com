---
title: Aratohu Whakatū
description: Ka ārahi tēnei aratohu i a koe i te tukanga whakatū rohe ritenga mō tō pūkete Onetime Secret, tae atu ki ngā rerekētanga i waenganui i ngā rohe-iti me ngā rohe matua, me te kōwhiri i tō rohe pūtoi raraunga.
---

# Aratohu Whakatū Rohe Ritenga

## Ngā Whakatakotoranga

- Tētahi pūkete Onetime Secret kei te mahi me te āhuatanga rohe ritenga kua whakahohehia
- Tētahi rohe nei koe te rangatira me te whakahaere hoki i ngā tautuhinga DNS

## Te Mārama ki ngā Momo Rohe

I mua i te whakatū i tō rohe ritenga, he mea nui kia mārama koe ki te rerekētanga i waenganui i ngā rohe-iti me ngā rohe matua:

1. **Rohe-iti**: Tētahi wāhanga o tō rohe matua (hei tauira, secrets.torohe.com)
2. **Rohe Matua**: Te rohe taketake anō (hei tauira, torohe.com)

## Kōwhiria Tō Rohe

Ka whakarato a Onetime Secret i ngā rohe pūtoi raraunga e rua: EU me US. I te wā e whakatū ana i tō rohe ritenga, me kōwhiri koe i tō rohe e hiahia ai mō te penapena i ō raraunga. He mea nui tēnei kōwhiringa mō ētahi take:

- **Mō ngā Tangata Takitahi**: Ka taea e koe te kōwhiri i runga i ō hiahiatanga whaiaro, pēnei i te tataata mō te tere ake pea o te uru atu rānei ngā awangawanga rangatiratanga raraunga whaiaro rānei.
- **Mō ngā Pakihi**: Tō kōwhiringa he taupua pea ki ō takohanga wāhi raraunga, pēnei i te ūnga ki te GDPR, ngā ararehe kāwanatanga, ngā aratohu rānei o te rohe. Me whakaū koe ka kōwhiri i te rohe e pai ai mō ō hiahiatanga here.

Whakaarohia ō hiahiatanga motuhake me ngā whakatau i te wā e whakatau ana i tēnei kōwhiringa. Mō ngā kōrero taipitopito mō ā mātou rohe pūtoi raraunga me te āhua o te kōwhiri i te tika mō ō hiahiatanga, tirohia tō mātou aratohu [Ngā Rohe Pūtoi Raraunga](/mi/regions).

## Wāhanga 1: Uru ki te Papa Tiaki Rohe

1. Takiuru ki tō pūkete Onetime Secret
2. Whakatere ki Papa Tiaki > Ngā Rohe Ritenga
3. Pāwhiria "Tāpiri Rohe"

<img src="/img/docs/custom-domains/3-Custom-domains.png" alt="Tirohanga rohe ritenga" width="400" />

## Wāhanga 2: Whakauru Tō Rohe

1. I ngā tautuhinga rohe ritenga, whakauru tō rohe e hiahia ai (hei tauira, secrets.torohe.com, torohe.com rānei)
2. Pāwhiria "Tāpiri Rohe" rānei hei haere whakamua

## Wāhanga 3: Whirihora i ngā Tautuhinga DNS

Hei hono i tō rohe, me whakahōu koe i ō tautuhinga DNS. He rerekē iti te tukanga i runga i te mea he rohe-iti rānei, he rohe matua rānei koe e whakamahi ana, me te rohe pūtoi raraunga koe i kōwhiri ai.

### Mō ngā Rohe-iti (He Tūtohu)

1. Uru ki tō papa whakahaere DNS rohe (mā tō kairēhita rohe, kaiwhakarato DNS rānei)
2. Waihanga tētahi rēkōta CNAME me ēnei taipitopito:
   - Kaiwhakataki: Tō rohe-iti kua kōwhiria (hei tauira, secrets)
   - Kōkiri ki / Uara:
     - Mō te rohe EU: identity.eu.onetime.co
     - Mō te rohe US: identity.us.onetime.co
3. Tango i ngā rēkōta A, AAAA, CNAME rānei kei te ora mō te rohe-iti kotahi

### Mō ngā Rohe Matua

1. Uru ki tō papa whakahaere DNS rohe
2. Waihanga, whakarerekē rānei tētahi rēkōta A me ēnei taipitopito:
   - Kaiwhakataki: @ (kore kōrero rānei, i runga i tō kaiwhakarato DNS)
   - Kōkiri ki / Uara:
     - Mō te rohe EU: 109.105.217.207
     - Mō te rohe US: 66.51.126.41

He mea nui: Me whakaū kāore he rēkōta tautohetohe mō te rohe koe e whakamahi ana.

<img src="/img/docs/custom-domains/4-Custom-domain-settings.png" alt="Tautuhinga rohe ritenga" width="400" />

### Ētahi atu Kōrero

#### He Aha ai CNAME mō ngā Rohe-iti?

Ka tūtohu mātou kia whakamahi i ngā rēkōta CNAME mō ngā rohe-iti nā te mea:

1. He kaha ake, ā, ka taea e mātou te whakarerekē i ā mātou wāhitau IP kore ai koe e whakahōu i ō tautuhinga DNS.
2. Ka urutautohe aunoa ki ngā whakarerekētanga katoa mātou e mea ai ki tō mātou hanganga.

#### He Aha ai ngā Rēkōta A mō ngā Rohe Matua?

Kāore ngā rohe matua e taea ai te whakamahi i ngā rēkōta CNAME nā ngā paerewa DNS. Nā reira me whakamahi mātou i ngā rēkōta A, he ētahi here:

1. Mēnā ka whakarerekē mātou i tō mātou wāhitau IP (he tawhito tēnei), me whakahōu koe i ō tautuhinga DNS ā-ringa.
2. Kāore rātou e urutautohe aunoa ki ngā whakarerekētanga o tō mātou hanganga.

## Wāhanga 4: Manatoko Rohe me te Tatari mō SSL

1. I muri i te whakahōu i ngā tautuhinga DNS, hoki ki te whārangi rohe ritenga Onetime Secret
2. Ka ngana aunoa te pūnaha ki te manatoko i tō rohe
3. Ka tīmata te whakahua tiwhikete SSL i muri i te manatokohanga
4. Ka roa pea tēnei tukanga ētahi meneti kia oti

## Wāhanga 5: Whakaū Whakatūnga

I te otinga o te whakatūnga, me kite koe i ēnei kōrero:

- Tūranga Rohe: Kei te Mahi me SSL
- Wāhitau Taupae: identity.eu.onetime.co, identity.us.onetime.co rānei (i runga i tō rohe kua kōwhiria)
- Tūranga SSL: Kei te Mahi
- Rā Whakahōu SSL: (Ka whakātuahia, he tau hoki i te whakatūnga)

## Whakaora Raru

- Mēnā ka rahua te manatokohanga, tirohia ō tautuhinga DNS
- Me whakaū kua tango koe i ngā rēkōta tautohetohe katoa
- Ka roa te kōkiri DNS ki te 24 hāora, engari he tere hoki

## Te Whakamahi i Tō Rohe Ritenga

I te whakahohetanga, ka whakamahi ō hononga huna i tō rohe ritenga. Hei tauira:
`https://secrets-tauira.onetime.dev/secret/abc123`

## Kua Āwhina Mātou i a Koe

Ka whakahaere mātou i ngā whakatakotoranga hangarau huna kia kore ai koe.

- Ka aroturuki mutunga kore mātou i te tūranga o tō rohe
- Ka whakahōu aunoa ngā tiwhikete SSL kore ai he mahi māu

Mō te hunga e hiahia ana ki te mōhio, ka taea hoki e koe te tirotiro i te hauora o tō rohe:

- Tirohia noa te taima "I Aroturuki Ai" i tō papa tiaki hei whakaū i te hononga mutunga kore

## He Pātai, He Tautoko rānei?

Kei konei mātou ki te āwhina. Mēnā he pātai ōu, he āwhina rānei e hiahia ai:

- Īmēra tōtika ki a mātou ki support@onetimesecret.com
- Whakamahi i tō mātou puka urupare ki https://onetimesecret.com/feedback

Kei te here tō mātou rōpū ki te whakarato i te tautoko pai rawa mōu mō tō whakatūnga rohe ritenga me te whakamahi, tae atu ki te ārahi mō te kōwhiri i te rohe pūtoi raraunga tika mō ō hiahiatanga.
