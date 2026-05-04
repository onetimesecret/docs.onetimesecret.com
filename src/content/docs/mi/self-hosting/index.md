---
title: Tirohanga Whānui Whakatū Rānei
description: Aratohu whakaoti mō te whakahaere i tō ake tauira Onetime Secret
sidebar:
  order: 1
---

Whakahaerehia tō ake tauira tūmataiti o Onetime Secret me te whakahaere katoa o ō raraunga, haumaru, me te whakatakoto.

<!-- EDITORS: This caution block is intentional. v0.23 still provides a smoother
     onboarding experience than v0.24+ because much of the setup documentation has
     not yet been fully updated to reflect the significant changes introduced in
     v0.24. Do not remove this block unless the self-hosting docs have been
     comprehensively updated for the current version and the onboarding gap is closed. -->
:::caution[Māehe 2026 — Kei te huri ngā tuhinga whakatū-rānei]
Kei waenganui mātou i te huringa i waenganui i **v0.23** me **v0.24** (te peka `main`). He tawhito ētahi o ā mātou tuhinga whakatū-rānei ā kei te [mahi tonu mātou ki te whakapai ake](https://github.com/onetimesecret/onetimesecret/issues/2628).

**Ki te hiahia koe kia whakahaere i tētahi mea**, ka tūtohu mātou i te peka `rel/0.23`. Ka hiahia ia ki ētahi taurangi taiao me Redis anake, ā kei te tuku tonu mātou i ngā whakatikanga me ngā whakahoutanga iti ki reira.

```bash
git clone -b rel/0.23 https://github.com/onetimesecret/onetimesecret.git
```
:::

## He aha ai te Whakatū Rānei?

Ka whakarato te whakatū rānei i Onetime Secret i:

- **Whakahaere raraunga katoa** - Ka noho ngā karere muna katoa i runga i tō hanganga me tō whatunga
- **Kaupapa here haumaru ritenga** - Whirihorahia te motuhēhēnga, ngā kōwhiringa tūmataitinga, me ngā whakahaere urunga
- **Ūnga** - Tutukihia ngā hiahiatanga ture mō te whakahaere raraunga
- **Waitohu ritenga** - Whakamāorihia te atanga mō tō whakahaere

## Ngā Kōwhiringa Tīmatanga Tere

Kōwhiria te tikanga whakatakoto pai mō tō taiao:

### Docker (E Tūtohu ana)
```bash
# Tīmata Redis me Onetime Secret
docker run -p 6379:6379 -d redis:bookworm
docker run -p 3000:3000 -d \
  -e REDIS_URL=redis://host.docker.internal:6379/0 \
  -e SECRET="$(openssl rand -hex 32)" \
  onetimesecret/onetimesecret:v0.25.0
```

Uru mai i `http://localhost:3000`.

### Whakatōnga ā-Ringaringa
Mō ngā taiao whakaputa e hiahia ana i ngā whirihoranga ritenga.

Tirohia tō mātou aratohu [Whakatōnga me te Whakatakoto](./installation) mō ngā tukanga taipitopito.

## Ngā Mea Kei Roto

He aha ngā mea e whāki ana i tō tauira whakatū-rānei:

- **Atanga tukutuku** - Atanga UI āhuatanga-katoa mō te waihanga me te tohatoha i ngā karere muna
- **REST API** - Urunga papatono mō ngā whakaurunga
- **Tautoko reo-maha** - E wātea ana i ngā reo 12+
- **Rohe ritenga** - Whakamahia tō ake rohe me te waitohu

## Ngā Hiahiatanga Pūnaha

**E Tūtohu ana:**
- 2+ ngā pūtoro CPU
- 2GB+ RAM
- 10GB+ wāhi kōpae
- Redis mō te penapena whakatūnga
- Node.js 22+ (mō te whanaketanga)

## Ngā Mahi e Whai Ake Nei

1. **[Tīmatanga](./getting-started)** - Aratohu whakatū taipitopito
2. **[Whakatōnga me te Whakatakoto](./installation)** - Ngā kōwhiringa whakatakoto taipitopito
3. **[Tohutoro Whirihoranga](./configuration)** - Tuhinga tautuhinga katoa

---

_Kua rite ki te tīmata? Whai i tō mātou aratohu [Tīmatanga](./getting-started)._
