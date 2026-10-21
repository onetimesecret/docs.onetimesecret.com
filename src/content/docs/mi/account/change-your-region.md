---
title: Te Huri i Tō Rohe
---

Ka whakamahi a Onetime Secret i tētahi [hoahoa kore-tohatoha](/mi/regions) puta noa i ngā rohe e rima (CA, EU, NZ, UK, US). Ka mahi ia rohe hei pūnaha tino motuhake, he pātengi raraunga ake, he pūkete ake, he karere huna ake hoki. Kāore mātou e whakawhiti raraunga i waenganui i ngā rohe i ngā wā katoa.

Ko te tikanga o tēnei, ehara te huri i tō rohe i te "nekehanga", engari he whakatū anō i tētahi pūkete hou ki tō rohe e hiahia ai. Ko te kōrero pai: ka tata ki te rua meneti noa te roa, ā, ka kawea aunoatia tō ohaurunga.

## Ngā Pūkete Koreutu

Whakatere tōtika ki tō rohe e hiahia ai (tirohia [Ngā Rohe e Wātea Ana](/mi/regions#ngā-rohe-e-wātea-ana) mō te rārangi katoa) ka waihanga ai i tētahi pūkete hou ki te wāhitau īmēra kotahi. Koirā kē — kua rite tō pūkete hou ki te whakamahi i taua wā tonu.

## Ngā Pūkete Utu (Identity Plus)

He rite tonu te tukanga ki ngā pūkete koreutu, engari kotahi anō hipanga tāpiri:

1. Haere ki te URL o tō rohe e hiahia ai (tirohia [Ngā Rohe e Wātea Ana](/mi/regions#ngā-rohe-e-wātea-ana))
2. Waihangatia he pūkete ki te wāhitau īmēra e hono ana ki tō ohaurunga
3. Takiuru, ka whakatere ai ki tō whārangi Pūkete
4. Ka mōhiotia aunoatia tō tūnga ohaurunga mā Stripe

Tērā pea me whakahōu koe i te whārangi kia kotahi, kia hono ai tō ohaurunga. Ka mahi tēnei nā te mea ka noho motuhake tonu ngā raraunga i waenganui i ngā rohe, engari ko tō hononga utu e whakahaerehia ana mā Stripe, e mōhio ana ki tō wāhitau īmēra puta noa i ngā rohe.

## He Aha ka Pā ki Tō Pūkete Tawhito

Ka mahi tonu tō pūkete o tō rohe o mua, kāore he raruraru:

- Ka mahi tonu ngā hononga karere huna kei te ora tae noa ki te wā ka tirohia, ka pau rānei
- Ka noho hohe tonu tō pūkete, mō te wā ka hiahia koe ki te tiro anō i tētahi mea
- Kāore he mahi e hiahiatia ana mō tō pūkete tawhito, engari mēnā e hiahia ana koe ki te kati

## Te Nekehanga Rohe Ritenga

Mēnā kua whirihoratia e koe tētahi rohe ritenga mō tō rohe o nāianei, me āta whakamahere i te tukanga. Nā te mea ka whakamahi ō hononga karere huna kei te ora i ngā tuhinga DNS o tō rohe ritenga, kāore e taea e koe te whakatau noa i te rohe ki te rohe hou, kei pakaru ngā hononga kāore anō kia tirohia.

### He Whakatika mā te Hipa

1. **Tāpiritia he rohe-iti pōhewa** ki tō pūkete rohe hou. Hei tauira, mēnā ko tō rohe o nāianei ko `secrets.example.com`, tāpiritia tētahi pēnei i `secrets-new.example.com`, `secrets-us.example.com` rānei.

2. **Waihangatia he rēkōta CNAME** mō te rohe-iti pōhewa e whakatau ana ki te pito urunga rohe e tika ana (hei tauira, `identity.us.onetime.co` mō te rohe US). Tirohia te [Aratohu Whakatū Rohe Ritenga](/mi/custom-domains/setup-guide) mō ngā taipitopito whirihora DNS.

3. **Tīmata te whakamahi** i te rohe-iti pōhewa mō ngā karere huna hou i taua wā tonu.

4. **I muri i te 30 rā**, kua pau ngā karere huna katoa i waihangatia ki te rohe tawhito. Ka taea e koe:
   - Te tango i te rohe ritenga mai i tō pūkete rohe tawhito
   - Te tāpiri i tō rohe-iti e hiahia ai (hei tauira, `secrets.example.com`) ki tō pūkete rohe hou
   - Te whakahōu i te rēkōta CNAME kia whakatau ki te pito o te rohe hou
   - Te manatoko i te rohe i tō papatohu pūkete

5. **Horoia** te rohe-iti pōhewa kia hohe, kua manatokohia hoki tō rohe e hiahia ai.

### He Aha ai 30 Rā?

Ko te wā-ki-te-ora (TTL) mōrahi mō tētahi karere huna he 30 rā. Mā te tatari i tēnei wā ka whakaūhia kua tirohia, kua pau rānei ngā karere huna katoa i waihangatia i raro i te whirihoranga DNS o te rohe tawhito, nā reira kāore e pakaru ngā hononga kei te ora i te whakahōu i te rēkōta CNAME.

Mēnā kei te mōhio koe he poto ake te TTL o ō karere huna kei te ora, kua tirohia rānei katoa, ka taea e koe te huri wawe ake.

## Ngā Pūkete Kāore he Rohe Ritenga

Mēnā kāore koe e whakamahi ana i tētahi rohe ritenga, ka huri tonu i taua wā tonu. Ka mahi tonu ō hononga tawhito (e whakamahi ana i ngā URL rohe onetimesecret.com pēnei i `eu.onetimesecret.com/secret/abcd1234`) ahakoa kei tēhea rohe tō pūkete hohe.

## Ngā Rohe Maha

Ka taea e koe te pupuri i ngā pūkete i ngā rohe maha i te wā kotahi. Ko ngā pūkete katoa e whakamahi ana i te wāhitau īmēra kotahi ka tiritahi i te tūnga ohaurunga kotahi. He whaihua tēnei mēnā e tuku ratonga ana koe ki ngā kaiwhakamahi kei ngā wāhi matawhenua rerekē, ā, e hiahia ana koe ki te whakaiti i te takamuatanga, ki te tutuki rānei i ngā whakahau noho raraunga.

## Ngā Tauira Motuhake

Me whakapā mai ngā kiritaki kei runga i ngā tauira motuhake ki a mātou mā [dedicated@onetimesecret.com](mailto:dedicated@onetimesecret.com) mō ngā hurihanga rohe, nā te mea me whirihora anō ā-ringa te hanganga motuhake. Ka taea hoki e koe te whakapā mai mā te [whārangi urupare](https://onetimesecret.com/feedback).
