---
title: Tīmatanga
description: Aratohu whakatū tere ki te whakahaere i tō tauira whakatū-rānei Onetime Secret
sidebar:
  order: 2
---

Mā tēnei aratohu ka taea e koe te whakahaere i tētahi tauira whakatū-rānei Onetime Secret i roto i ngā meneti.

## Ngā Mea e Hiahiatia ana

- **1GB+ RAM** mō te whakatutukitanga pai
- **Tuhipoka penapena Redis**: I runga i tō whirihoranga Redis, ka taea te penapena i ngā karere muna katoa i roto i te mahara me te kore tuhia ki te kōpae mō te haumaru whakanui

## Tikanga 1: Docker (E Tūtohu ana)

Ko te huarahi tere tino pai ka whakamahi i Docker me te whirihoranga iti.

### 1. Tīmata Redis

```bash
docker run -p 6379:6379 -d redis:bookworm
```

### 2. Whakaputa Kī Muna

```bash
# Whakaputa me te penapena i tētahi kī muna pumau
openssl rand -hex 32 > .ots_secret
chmod 600 .ots_secret
echo "Kua tiakina te kī muna ki .ots_secret (tiakina tēnei kōnae!)"
```

### 3. Whakahaere Onetime Secret

```bash
# Whakahaerehia te ipu mā te whakamahi i te kī muna
docker run -p 3000:3000 -d \
  -e REDIS_URL=redis://host.docker.internal:6379/0 \
  -e SECRET="$(cat .ots_secret)" \
  -e HOST=localhost:3000 \
  -e SSL=false \
  -e RACK_ENV=production \
  onetimesecret/onetimesecret:latest
```

### 4. Uru ki Tō Tauira

Huakina tō pūtirotiro ki:
- **Atanga Tukutuku**: http://localhost:3000
- **Poutoko API**: http://localhost:3000/api/v2/status

## Tikanga 2: Whakatōnga ā-Ringaringa

Mō te hunga e pai ana ki te whakatū ā-ringaringa, ka hiahia koe:

- **Ruby 3.2+** (kāore pea e wātea i roto i ngā kete pūnaha taunoa)
- **Redis 5+** rānei **Valkey** (Whakakapi Redis)
- **Node.js 22+** me **pnpm** (ka hiahiatia anake mō te whanaketanga me te hanga i ngā rawa tukuatu)

Me hanga e koe ngā rawa tukuatu mā te `pnpm install && pnpm run build:local` i mua i te whakahaere i te papatono.

Tirohia [INSTALL.md](https://github.com/onetimesecret/onetimesecret/blob/main/INSTALL.md) mō ngā taipitopito whakatōnga ā-ringaringa katoa.

## Manatoko

1. Whakatere ki http://localhost:3000
2. Waihangahia tētahi karere muna whakamātau kia manatokohia ka mahi ngā mea katoa
3. Tirohia te tūnga API i http://localhost:3000/api/v2/status

## Whakatū Kaiwhakahaere

Hei waihanga i tētahi kaiwhakamahi kaiwhakahaere, tāpirihia ngā wāhitau īmēra ki te wāhanga `:colonels:` i roto i tō kōnae whirihoranga, katahi ka rēhita mā tētahi o ērā īmēra kia whiwhi aunoa i te urunga kaiwhakahaere.

**Tuhipoka**: Ko te rohe kaiwhakahaere he āhuatanga iti te wāteatanga - he tirohanga whirihoranga pānui-anake me te kore whakahaere kaiwhakamahi. He maha atu ngā āhuatanga e whakaaro ana mō ngā whakaputanga a tērā atu.

## Ngā Mahi e Whai Ake Nei

I nāianei ka haere tō tauira:

1. **[Whirihorahia tō whakatakoto](./installation)** mō te whakamahi whakaputa
2. **[Arotake i ngā kōwhiringa whirihoranga](./configuration)** mō te ritenga

## Te Whiwhi Āwhina

- **Tuhinga**: Tirotiro i tō mātou [tohutoro whirihoranga](./configuration)
- **Hapori**: Uru mai ki ngā matapaki i runga i [GitHub](https://github.com/onetimesecret/onetimesecret/discussions)
- **Ngā Take**: Pūrongo i ngā hapa i runga i tō mātou [kaiwhakatūturu take](https://github.com/onetimesecret/onetimesecret/issues)
