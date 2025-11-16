---
title: Tohutoro Tāhuatanga Taiao
description: Tētahi tohutoro mō ngā tāhuatanga taiao Onetime Secret
sidebar:
  order: 5
---

Ka whāki tēnei aratohu i ngā tāhuatanga taiao katoa e wātea ana i Onetime Secret v0.22.4+.


## Ngā Tāhuatanga Taiao

Whakatakotohia ēnei i roto i tō kōnae `.env`, i tō taiao rānei, tāpirihia rānei ki ō tohutohu docker, ki tō kōnae docker-compose.yml rānei. He kōwhiringa ngā tāhuatanga katoa mēnā kāore i tohua he mea e hiahiatia ana.

### Ngā Tautuhinga Papatono Matua

```bash
SECRET=your-32-char-hex-key           # Kī muna mō ngā whakatūnga me te whakamuhumuhu (E HIAHIATIA ANA) - KAUA e huri i muri i te whakatakoto
PORT=3000                             # Tauranga mō te tūmau tukutuku ki te whakarongo ki (taunoa: 3000)
HOST=localhost:3000                   # Whakakotahi kaiwhakahaere me te tauranga e whakamahia ana mō te whakaputa hononga
SSL=true                              # Ka whakahaere i te https/http i te wā e whakaputa ana i ngā hononga (true/false)
SERVER_TYPE=thin                      # Momo tūmau tukutuku: thin, puma
RACK_ENV=production                   # Taiao papatono: development, production, test
```

### Pātengi Raraunga me te Penapena

TUHIPOKA: Ko ngā tāhuatanga e tīmata ana ki REDIS_ ka taea hoki te whakatakoto ki te tūtohi VALKEY_.

```bash
REDIS_URL=redis://localhost:6379/0   # Rārangi hononga Redis mō ngā whakatūnga, ngā karere muna, me ngā raraunga papatono katoa
```

### Motuhēhēnga me te Haumaru

```bash
AUTH_ENABLED=true                     # Whakahohetia te pūnaha motuhēhēnga (ka whakamutua te motuhēhēnga API i te wā ko false)
AUTH_SIGNUP=true                      # Tukua kia rēhita ngā kaiwhakamahi hou
AUTH_SIGNIN=true                      # Tukua kia takiuru ngā kaiwhakamahi kei te mau
AUTH_AUTOVERIFY=false                 # Pekehia te manatoko īmēra mō ngā pūkete hou
COLONEL=email@example.com             # Ngā wāhitau īmēra kaiwhakahaere kua whiwhihia ngā mana "colonel" (keri-wehe)
```

**Tuhipoka**: Ko "Colonel" tā mātou kupu mō ngā kaiwhakamahi "admin". Ka taea e ngā Colonels te uru ki te rohe kaiwhakahaere i `/colonel` e whakaatu ana i ngā tauanga pūnaha taketake. Ko te atanga kaiwhakahaere he āhuatanga iti te wāteatanga i tēnei wā - kāore he whakahaere kaiwhakamahi, he tirohanga whirihoranga pānui-anake anake.

### Atanga Kaiwhakamahi me ngā Āhuatanga

```bash
UI_ENABLED=true                       # Whakahohetia te atanga kaiwhakamahi tukutuku (ka whakaatu i te whārangi iti i te wā kua whakamutua)
API_ENABLED=true                      # Whakahohetia ngā poutoko REST API (ka whakahoki 404 i te wā kua whakamutua)
CSP_ENABLED=true                      # Whakahohetia ngā pane Content Security Policy
HEADER_ENABLED=true                   # Whakaatuhia te pane pae me te waitohu
HEADER_NAV_ENABLED=true               # Whakaatuhia ngā hononga whakatere i te pane
HEADER_PREFIX=
DOMAINS_ENABLED=false                 # Whakahohetia te tautoko rohe ritenga
REGIONS_ENABLED=false                 # Whakahohetia te tautoko whakatakoto rohe-maha. Kāore tēnei e pā ki te
                                      # āhuatanga o te papatono. Engari ka whakahohe i ngā wāhanga UI
                                      # mō te hononga ki ngā rohe kē.
```

### Waitohu me te Ihirangi

```bash
LOGO_URL=                            # URL ki te whakaahua tohu ritenga (ka hoki ki te tohu kua uru)
LOGO_ALT=
LOGO_LINK=
FOOTER_LINKS=
ABOUT_URL=
ABOUT_EXTERNAL=false
CONTACT_URL=
PRIVACY_URL=
PRIVACY_EXTERNAL=false
TERMS_URL=
TERMS_EXTERNAL=false
STATUS_URL=
STATUS_EXTERNAL=false
```

### Te Tuku Īmēra

```bash
EMAILER_MODE=smtp                    # Āhuatanga ratonga īmēra (smtp, sendgrid, me ērā atu)
EMAILER_REGION=                      # Rohe ratonga īmēra (mō ngā kaiwhakarato kapua)
FROM_EMAIL=noreply@localhost         # Wāhitau īmēra tuku taunoa
FROM=                                # Ingoa tuku (whakakapi mō FROMNAME)
FROMNAME=                            # Ingoa whakaatu mō te kaituku
SMTP_HOST=                           # Ingoa kaiwhakahaere tūmau SMTP
SMTP_PORT=587                        # Tauranga tūmau SMTP (ko te nuinga ko 587 mō TLS, 25 mō te māori)
SMTP_USERNAME=                       # Ingoa kaiwhakamahi motuhēhēnga SMTP
SMTP_PASSWORD=                       # Kupuhipa motuhēhēnga SMTP
SMTP_TLS=true                        # Whakahohetia te whakamuhumuhu TLS mō SMTP
SMTP_AUTH=login                      # Tikanga motuhēhēnga SMTP (takiuru, māori, me ērā atu)
```

### Ngā Karere Muna me te TTL

```bash
DEFAULT_TTL=604800                   # Paunga karere muna taunoa i ngā hēkona (604800 = 7 rā)
TTL_OPTIONS=300,1800,3600,86400      # Ngā kōwhiringa TTL e wātea ana e whakaatuhia ana ki ngā kaiwhakamahi, keri-wehe (hēkona)
DEFAULT_DOMAIN=                      # Rohe taunoa mō ngā hononga karere muna (ka whakamahi i HOST mēnā he kau)
ALLOW_NIL_GLOBAL_SECRET=false        # Tukua kia haere me te kī SECRET e ngaro ana (whakahoki ohorere)
```


### Te Manatoko Wāhitau Īmēra

Ka whakahaerehia te manatoko wāhitau īmēra e te [pūtahitanga Truemail](https://github.com/truemail-rb/truemail), e tautoko ana i ngā momo manatoko maha tae atu ki regex, te rapu rekoata MX, me te manatoko SMTP.

```bash
VERIFIER_DOMAIN=                     # Rohe mō te manatoko SMTP (e hiahiatia ana mō te manatoko SMTP)
VERIFIER_EMAIL=                      # Wāhitau īmēra mō te manatoko SMTP (e hiahiatia ana mō te manatoko SMTP)
```

**Tuhipoka**: He maha ngā kōwhiringa whirihoranga Truemail tāpiri e wātea ana i te whirihoranga YAML i raro i te wāhanga `truemail:`, tae atu ki ngā momo manatoko, ngā tautuhinga taima, ngā rohe e whakaaetia ana/e aukatihia ana, ngā tūmau DNS, me ērā atu. Tirohia `config/config.yaml` mō te whirihoranga katoa.

### Whakaweheweheatanga

```bash
I18N_ENABLED=true                    # Whakahohetia te whakaweheweheatanga
I18N_DEFAULT_LOCALE=en               # Rohe reo taunoa
```

### Whanaketanga me te Patuiro

```bash
ONETIME_DEBUG=false                  # Whakahohetia te āhuatanga patuiro
LOG_HTTP_REQUESTS=false              # Rārangitia ngā tono HTTP
STDOUT_SYNC=true                     # Tukutahi i te putanga stdout
DIAGNOSTICS_ENABLED=false            # Whakahohetia ngā aroturuki
FRONTEND_HOST=http://localhost:5173  # URL tūmau whanaketanga tukuatu (whanaketanga anake)
VITE_API_BASE_URL=                   # Whakahē URI tūāpapa API Vite
```

### Aroturuki me te Whai Hapa

Tirohia te [tuhinga sentry](https://docs.sentry.io/platforms/ruby/) mō ngā mōhiohio atu mō te whirihoranga i Sentry.

```bash
SENTRY_DSN=
SENTRY_DSN_BACKEND=
SENTRY_DSN_FRONTEND=
SENTRY_LOG_ERRORS=true
SENTRY_MAX_BREADCRUMBS=50
SENTRY_SAMPLE_RATE=1.0
SENTRY_VUE_TRACK_COMPONENTS=true
```
