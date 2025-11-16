---
title: Tohutoro Whirihoranga
description: Tohutoro whakaoti mō ngā kōwhiringa whirihoranga Onetime Secret katoa
sidebar:
  order: 4
---


Ka whāki tēnei aratohu whānui i ngā kōwhiringa whirihoranga katoa mō ngā tauira whakatū-rānei Onetime Secret.

## Ngā Kōnae Whirihoranga

Ka whakamahi a Onetime Secret i ngā kōnae whirihoranga maha:


- **`.env`** - Ngā tāhuatanga taiao mō ngā tautuhinga noa. Whakamahia mō te whirihoranga māmā me ngā whakatakoto Docker me te kore whakarerekē i ngā kōnae YAML. (Tārua mai i `.env.example`)
- **`config/config.yaml`** - Ko te whirihoranga papatono matua e whakamahi ana i ngā tauira ERB. Ka whakaurunga ngā tāhuatanga taiao ki konei, e māmā ai te kite me pēhea te whakamahi i ia tautuhinga. (Tārua mai i `etc/config.example.yaml`)


## Whirihoranga Matua

Ko te kōnae whirihoranga matua ko `config/config.yaml`, e whakamahi ana i ngā tauira ERB ki te whakaurunga i ngā tāhuatanga taiao.

**Tīmatanga:**
1. Tārua te tauira: `cp etc/config.example.yaml config/config.yaml`
2. Whakatika i ngā uara e hiahia ana mō tō whakatakoto
3. Ko te nuinga o ngā tautuhinga noa ka taea te whakahē mā ngā tāhuatanga taiao

**Tirohia te kōnae whirihoranga katoa:**
[config.example.yaml](https://raw.githubusercontent.com/onetimesecret/onetimesecret/refs/tags/v0.22.4/etc/config.example.yaml)

### Ngā Wāhanga Whirihoranga Matua

Anei ngā wāhanga nui rawa e tino hiahia pea koe ki te whakamāori:

```yaml
---
:site:
  :host: <%= ENV['HOST'] || 'localhost:3000' %>
  # Ka huri i te https/http kia tū kia huri i te wā e whakaputa ana i ngā hononga
  :ssl: <%= ENV['SSL'] == 'true' || false %>
  # NUI TE TIKANGA: I muri i te whakatakoto i te muna, kaua e whakarereke.
  # Kia mōhio ki te waihanga me te penapena i tētahi tārua i tētahi wāhi
  # haumaru kei waho. Ka taea e te huri i te muna te ārahi ki ngā take
  # kāore i kitea pērā i te kore āhei ki te whakamuhumuhu i ngā karere muna kei te mau.
  :secret: <%= ENV['SECRET'] || nil %>
  # Whirihoranga API me te UI
  :interface:
    :ui:
      # Ka whakahaere mēnā kua whakahohetia te atanga tukutuku
      # I te wā ko false, ka whakaatuhia anake tētahi whārangi whakamārama taketake
      :enabled: <%= ENV['UI_ENABLED'] != 'false' %>
      # Whirihoranga pane
      # Ka whakahaere i te waitohu me te whakatere i te pane pae
      :header:
        # Kōmiri whakahaere ki te whakahohe/whakakore i te ritenga pane
        :enabled: <%= ENV['HEADER_ENABLED'] != 'false' %>
        # Whirihoranga waitohu mō te tohu me te ingoa kamupene
        :branding:
          # Whirihoranga tohu
          :logo:
            # URL ki te kōnae whakaahua tohu
            :url: <%= ENV['LOGO_URL'] || 'DefaultLogo.vue' %>
            # Kupu whakakapi mō te whakaahua tohu
            :alt: <%= ENV['LOGO_ALT'] || 'Share a Secret One-Time' %>
            # Kei hea te hononga o te tohu i te wā ka pāwhiria
            :href: <%= ENV['LOGO_LINK'] || '/' %>
          # Whakahē ingoa kamupene (ka hoki ki i18n mēnā kāore i whakatakotohia)
          :site_name: <%= ENV['SITE_NAME'] || 'One-Time Secret' %>
        # Whirihoranga whakatere
        :navigation:
          # Whakahohe/whakakore i te whakatere pane katoa
          :enabled: <%= ENV['HEADER_NAV_ENABLED'] != 'false' %>
      # Whirihoranga hononga waewae
      # Ka puta ēnei hononga i te waewae o ia whārangi
      :footer_links:
        # Kōmiri matua ki te whakahohe/whakakore i ngā hononga waewae katoa
        :enabled: <%= ENV['FOOTER_LINKS'] == 'true' || false %>
        # Ngā rōpū hononga kua whakaritea
        :groups:
          - :name: legal
            :i18n_key: web.footer.legals
            :links:
              - :text: Terms of Service
                :i18n_key: terms-of-service
                # Whakakapi ki tō ake URL tikanga, whakamahi rānei i te ara tata pērā i /terms
                :url: <%= ENV['TERMS_URL']  %>
                :external: <%= ENV['TERMS_EXTERNAL'] || false %>
              - :text: Privacy Policy
                :i18n_key: privacy-policy
                # Whakakapi ki tō ake URL tūmataitinga, whakamahi rānei i te ara tata pērā i /privacy
                :url: <%= ENV['PRIVACY_URL']  %>
                :external: <%= ENV['PRIVACY_EXTERNAL'] || false %>
          - :name: resources
            :i18n_key: web.footer.resources
            :links:
              - :text: Status
                :i18n_key: status
                # Whakakapi ki tō URL whārangi tūnga mēnā he mea tāu
                :url: <%= ENV['STATUS_URL'] %>
                :external: <%= ENV['STATUS_EXTERNAL'] || true %>
                :icon: signal
              - :text: About
                :i18n_key: web.COMMON.about
                # Whakakapi ki tō URL whārangi mō
                :url: <%= ENV['ABOUT_URL'] %>
                :external: <%= ENV['ABOUT_EXTERNAL'] || false %>
          - :name: support
            :i18n_key: web.footer.support
            :links:
              - :text: Contact
                :i18n_key: web.footer.contact
                :url: <%= ENV['CONTACT_URL'] %>
                :external: false
    # Ka whakahaere mēnā kei te wātea ngā poutoko API. I te wā kua whakamutua,
    # kua whakamutua katoa te API. Ka whakahoki ngā tono ki /api/* i te 404.
    :api:
      :enabled: <%= ENV['API_ENABLED'] != 'false' %>
  # Ngā kōwhiringa whirihoranga mō te whakahaere karere muna
  :secret_options:
    # Wā-ki-te-Ora taunoa (TTL) mō ngā karere muna i ngā hēkona
    # Ka whakamahia tēnei uara mēnā kāore i whakaratohia he TTL motuhake i te wā e waihanga ana i te karere muna
    :default_ttl: <%= ENV['DEFAULT_TTL'] || nil %>
    # Ngā kōwhiringa TTL e wātea ana mō te waihanga karere muna (i ngā hēkona)
    # Ka whakaatuhia ēnei kōwhiringa ki ngā kaiwhakamahi i te wā e waihanga ana rātou i tētahi karere muna hou
    # Hōputu: Rārangi ōkiko o ngā tau taurangi e tohu ana i ngā hēkona
    :ttl_options: <%= (ENV['TTL_OPTIONS'] || nil) %>
    # Ngā tautuhinga mō te āpure kupu karapa e tiaki ana i te urunga ki ngā karere muna
    :passphrase:
      # Me whakauru e ngā kaiwhakamahi tētahi kupu karapa i te wā e waihanga ana i ngā karere muna
      :required: <%= ENV['PASSPHRASE_REQUIRED'] == 'true' || false %>
      # Te mōkito o ngā pūāhua e hiahiatia ana mō ngā kupu karapa
      :minimum_length: <%= ENV['PASSPHRASE_MIN_LENGTH'] || 8 %>
      # Te mōrahi o ngā pūāhua e whakaaetia ana mō ngā kupu karapa
      :maximum_length: <%= ENV['PASSPHRASE_MAX_LENGTH'] || 128 %>
      # Whakamanahia ngā hiahiatanga uaua (pūāhua teitei, pūāhua iti, tau, tohu)
      :enforce_complexity: <%= ENV['PASSPHRASE_ENFORCE_COMPLEXITY'] == 'true' || false %>
    # Ngā tautuhinga mō te whakaputa kupuhipa (i te wā ka pāwhiri ngā kaiwhakamahi i "Generate Password")
    :password_generation:
      # Te roa taunoa mō ngā kupuhipa kua whakaputaina
      :default_length: <%= ENV['PASSWORD_GEN_LENGTH'] || 12 %>
      # Ngā huinga pūāhua ki te whakauru ki ngā kupuhipa kua whakaputaina
      :character_sets:
        # Whakauru i ngā reta teitei (A-Z)
        :uppercase: <%= ENV['PASSWORD_GEN_UPPERCASE'] != 'false' %>
        # Whakauru i ngā reta iti (a-z)
        :lowercase: <%= ENV['PASSWORD_GEN_LOWERCASE'] != 'false' %>
        # Whakauru i ngā tau (0-9)
        :numbers: <%= ENV['PASSWORD_GEN_NUMBERS'] != 'false' %>
        # Whakauru i ngā tohu (!@#$%^&*()_+-=[]{}|;:,.<>?)
        :symbols: <%= ENV['PASSWORD_GEN_SYMBOLS'] == 'true' || false %>
        # Waiho i ngā pūāhua rangirua (0, O, l, 1, I) ki te aukati i te rangirua
        :exclude_ambiguous: <%= ENV['PASSWORD_GEN_EXCLUDE_AMBIGUOUS'] != 'false' %>
  # Ngā tautuhinga Rēhitatanga me te Motuhēhēnga
  :authentication:
    # Ka taea te whakamutua katoa, tae atu ki te motuhēhēnga API.
    :enabled: <%= ENV['AUTH_ENABLED'] != 'false' %>
    # Tukua kia waihanga pūkete ngā kaiwhakamahi. Ka taea tēnei te whakamutua
    # mēnā e whakaaro ana koe ki te waihanga pūkete ā-ringaringa, whakahohe rānei
    # i te wā o te whakatū i te wā ka taea te waihanga pūkete, katahi ka
    # whakamutua ki te aukati i ngā kaiwhakamahi hou ki te waihanga pūkete.
    :signup: <%= ENV['AUTH_SIGNUP'] != 'false' %>
    # I te nuinga o te wā mēnā ka tukua e koe te rēhitatanga, ka tukua e koe
    # te takiuru. Engari he āhuatanga e āwhina ana te whakakore i te
    # motuhēhēnga mō te wā poto.
    :signin: <%= ENV['AUTH_SIGNIN'] != 'false' %>
    # I te taunoa, me manatoko e ngā pūkete hou tō rātou wāhitau īmēra i mua
    # i te takiuru. He tikanga haumaru tēnei ki te aukati i te tuku parau me
    # te whakamahi kino i te pūnaha. Mēnā e whakahaere ana koe i tētahi tauira
    # tūmataiti, tauira mō tō rōpū, tō kamupene rānei, ka taea e koe te
    # whakamutua i tēnei āhuatanga ki te māmā ake ai mō ngā kaiwhakamahi ki te takiuru.
    :autoverify: <%= ENV['AUTH_AUTOVERIFY'] == 'true' || false %>
    # I te wā kua whakahohetia, kāore te puka karere muna whārangi kāinga e
    # wātea ana mēnā kāore te kaiwhakamahi kua takiuru. Ōrite ki tētahi
    # whārangi kāinga kua whakamutua, engari ka whakaatu tonu i te pane me te
    # tohu me ngā hononga whakatere. Ka tukua tēnei i tētahi āhuatanga
    # whāiti ake kei reira ko ngā kaiwhakamahi motuhēhēnga anake ka taea te
    # waihanga karere muna me te pupuri tonu i te whakatere pae me te waitohu.
    :required: <%= ENV['AUTH_REQUIRED'] == 'true' %>
    # Ka whiwhihia e ngā wāhitau īmēra kei raro nei ngā mana kaiwhakahaere
    # aunoa i te wā o te waihanga pūkete. He urunga ō ēnei pūkete ki tētahi
    # whārangi e whakaatu ana i ngā tauanga pūnaha taketake. Ka whakamahia
    # te kupu "colonel" kaua ko "admin". Ko "Colonel" (e kīia ana ko "kernel")
    # e tohu ana i te pūtaiao tiakina o tētahi pūnaha Linux me tētahi kaikōeke
    # tāua, e tohu ana i ngā whakaaetanga urunga taumata-teitei. Mā tēnei
    # ingoatanga ka aukati i ngā whakamatenga taketake, aunoa e pā ana ki ngā
    # URL kaiwhakahaere noa, i ngā ingoa tūnga rānei.
    :colonels:
      - <%= ENV['COLONEL'] || 'CHANGEME@example.com' %>
  # He āhuatanga captcha-ōrite e tiaki ana i te puka urupare mai i ngā
  # pōtae me ētahi atu mahi kino.
  :authenticity:
    :type: <%= ENV['AUTHENTICITY_TYPE'] || 'altcha' %>
    :secret_key: <%= ENV['AUTHENTICITY_SECRET_KEY'] || '<REPLACE_WITH_STRONG_HMAC_KEY>' %>
  # Ngā hononga ki ngā tuhinga. Mō onetimesecret.com, koinei
  # docs.onetimesecret.com.
  :support:
    :host: <%= ENV['SUPPORT_HOST'] || nil %>
  :plans:
    :enabled: <%= ENV['PLANS_ENABLED'] == 'true' || false %>
    :stripe_key: <%= ENV['STRIPE_KEY'] || nil %>
  :regions:
    :enabled: <%= ENV['REGIONS_ENABLED'] == 'true' || false %>
    :current_jurisdiction: <%= ENV['JURISDICTION'] || nil %>
  :domains:
    :enabled: <%= ENV['DOMAINS_ENABLED'] == 'true' || false %>
    # Ko te rohe taunoa e whakamahia ana mō ngā URL hononga. I te wā kāore i
    # whakatakotohia, kua kau rānei, ka whakamahia te site.host.
    :default: <%= ENV['DEFAULT_DOMAIN'] || nil %>
    # Ko te momo huinga ka whakatau me pēhea te tautoko e te papatono i ngā
    # rohe maha. Ko te taunoa ko nil arā ko te papatono anō e kawenga ana i
    # te whakahaere i ngā rohe maha.
    :cluster:
      :type: <%= ENV['CLUSTER_TYPE'] || nil %>
      :api_key: <%= ENV['APPROXIMATED_API_KEY'] || nil %>
      :cluster_ip: <%= ENV['APPROXIMATED_PROXY_CLUSTER_IP'] || '<CLUSTER_IP>' %>
      :cluster_host: <%= ENV['APPROXIMATED_PROXY_CLUSTER_HOST'] || '<CLUSTER_HOST>' %>
      :cluster_name: <%= ENV['APPROXIMATED_PROXY_CLUSTER_NAME'] || '<CLUSTER_NAME>' %>
      :vhost_target: <%= ENV['APPROXIMATED_PROXY_VHOST_TARGET'] || '<VHOST_TARGET>' %>
:features:
  :incoming:
    :enabled: false
    :email: CHANGEME@example.com
    :passphrase: abacus
# Whirihoranga Redis
:redis:
  # Hononga URI Redis matua - Tohua te rārangi hononga katoa tae atu ki te motuhēhēnga
  # Hōputu: redis://[:password@]host[:port]/[db-number]
  # Ngā tauira:
  #   - redis://mypassword@localhost:6379/0        # Motuhēhēnga kupuhipa māmā
  #   - redis://user:pass@localhost:6379/0         # Motuhēhēnga ingoa-kaiwhakamahi/kupuhipa
  #   - redis://redis.example.com:6379/0          # Kāore he motuhēhēnga (whanaketanga anake)
  :uri: <%= ENV['REDIS_URL'] || 'redis://CHANGEME@127.0.0.1:6379/0' %>

# Whirihoranga Rārangi
:logging:
  # Ngā rārangi tono HTTP (Rack::CommonLogger)
  :http_requests: <%= ENV['LOG_HTTP_REQUESTS'] != 'false' %>

# Te Tuku Īmēra
:emailer:
  # Whanaketanga Takiwā me Mailpit
  # -----------------------------
  # Ko Mailpit he tūmau SMTP whanaketanga e hopu ana i ngā īmēra mō te whakamātau
  # Whakatō: brew install mailpit
  # Tīmata: mailpit
  # Web UI: http://localhost:8025
  #
  #  :mode: smtp                      # Whakamahi i te āhuatanga SMTP mō te whakamātau takiwā
  #  :from: secure@onetimesecret.com # Wāhitau tuku
  #  :fromname: OTS Support          # Ingoa tuku
  #  :host: 127.0.0.1                # Kaiwhakahaere Mailpit
  #  :port: 1025                     # Tauranga SMTP taunoa Mailpit
  #  :user: ~                        # Kāore he motuhēhēnga e hiahiatia ana mō Mailpit
  #  :pass: ~                        # Kāore he motuhēhēnga e hiahiatia ana mō Mailpit
  #  :auth: false                    # Whakamutua te motuhēhēnga SMTP mō Mailpit
  #  :tls: false                     # Whakamutua TLS mō te whakamātau takiwā

  # Ngā Tautuhinga Whakaputa (mō te tohutoro)
  # ----------------------------------
  :mode: <%= ENV['EMAILER_MODE'] || 'smtp' %>
  :from: <%= ENV['FROM_EMAIL'] || ENV['FROM'] || 'CHANGEME@example.com' %>
  :fromname: <%= ENV['FROMNAME'] || 'Support' %>
  :host: <%= ENV['SMTP_HOST'] || 'smtp.provider.com' %>
  :port: <%= ENV['SMTP_PORT'] || 587 %>
  :user: <%= ENV['SMTP_USERNAME'] %>
  :pass: <%= ENV['SMTP_PASSWORD'] %>
  :auth: <%= ENV['SMTP_AUTH'] || 'login' %>
  :tls: <%= ENV['SMTP_TLS'] %>

:mail:
  :truemail:
    # Ngā momo manatoko e wātea ana: :regex, :mx, :mx_blacklist, :smtp
    :default_validation_type: :regex
    # E hiahiatia ana mō te manatoko :smtp
    :verifier_email: <%= ENV['VERIFIER_EMAIL'] || 'CHANGEME@example.com' %>
    # Ko ngā tautuhinga DNS taunoa ko CloudFlare, Google, Oracle/OpenDNS tūmau.
    :dns:
      - 1.1.1.1
      - 8.8.4.4
      - 208.67.220.220
    :smtp_fail_fast: false
    :smtp_safe_check: true
    :not_rfc_mx_lookup_flow: false
    :logger:
      # Tētahi o: :error (taunoa), :unrecognized_error, :recognized_error, :all.
      :tracking_event: :error
      :stdout: true

:internationalization:
  :enabled: <%= ENV['I18N_ENABLED'] == 'true' || false %>
  :default_locale: <%= ENV['I18N_DEFAULT_LOCALE'] || 'en' %>
  :fallback_locale:
    fr-CA: [fr_CA, fr_FR, en]
    fr: [fr_FR, fr_CA, en]
    de-AT: [de_AT, de, en]
    de: [de, de_AT, en]
    it: [it_IT, en]
    pt: [pt_BR, en]
    default: [en]
  # He rārangi o ngā waehere reo ISO (hei tauira, 'en' mō te Pākehā, 'es'
  # mō te Pāniora, me ērā atu). Kei te kōnae hāngai i src/locales me te
  # ingoa ōrite e whāki ana i te kupu kua whakawhitihia. Mēnā kāore i
  # kōwhiria aunoa, ka taea e ngā kaiwhakamahi te kōwhiri i tō rātou reo e
  # pai ana mā te whakamahi i te kōmiri i te waewae, i roto i te paetukutuku
  # tautuhinga rānei mēnā kua takiuru.
  :locales:
    - bg
    - da_DK
    - de
    - de_AT
    - el_GR
    - en
    - es
    - fr_CA
    - fr_FR
    - it_IT
    - ja
    - ko
    - mi_NZ
    - nl
    - tr
    - uk
    - pl
    - pt_BR
    - sv_SE

:experimental:
  # ĀHUATANGA HAUMARU: Ka whakahaere mēnā ka taea e te papatono te haere me
  # te kore site.secret (i roto i tēnei kōnae, mā te tāhuatanga SECRET rānei).
  :allow_nil_global_secret: <%= ENV['ALLOW_NIL_GLOBAL_SECRET'] == 'true' || false %>
  # ĀHUATANGA HAUMARU: Tautoko mō te huri i te muna taiao
  :rotated_secrets: []
  :freeze_app: false
  # Whirihoranga Middleware
  # Ka whakahaere i ngā wāhanga middleware haumaru me te whakatutukitanga e whakahohetia ana
  :middleware:
    # Mahi i ngā kōnae static mō te papatono vue tukuatu
    :static_files: true
    # Ka whakamā i ngā tawhā tono ki te whakaū i te whakamuhumuhu UTF-8 tika
    # Ka aukati i ngā whakamatenga e pā ana ki te whakamuhumuhu me te whakakupu hē
    :utf8_sanitizer: true
    # Ka tiaki i te whakamatenga Cross-Site Request Forgery (CSRF)
    # Ka manatoko ka puta ngā tono mai i te pae ōrite
    :http_origin: false
    # Ka mawhiti i ngā putanga HTML i roto i ngā tawhā tono
    # Ka āwhina ki te aukati i ngā whakamatenga XSS mā ngā tawhā tono
    :escaped_params: false
    # Ka whakatakoto i te pane X-XSS-Protection ki te whakahohe i te tātari XSS pūtirotiro
    # Ko ngā pūtirotiro hou-ake e whakawhirinaki ana ki tēnei i te wā ka noho te CSP hei paerewa
    :xss_header: false
    # Ka aukati i tō pae kia kore e whakaurua ki ngā papa (tiaki whakamatenga clickjacking)
    # Ka whakatakoto i te pane X-Frame-Options ki SAMEORIGIN, ki DENY rānei
    :frame_options: false
    # Ka aukati i ngā whakamatenga whakatere whaiaronga mā te whakamahi i "../" i ngā ara
    # Nui rawa mō te aukati i te urunga kōnae kāore i whakaaetia
    :path_traversal: false
    # Ka tiaki i te whakamatenga cookie tossing
    # Ka aukati i te whakaū whakatūnga mā ngā pihikete kua whakahaerea
    :cookie_tossing: false
    # Ka aukati i ngā whakamatenga IP spoofing mā te manatoko i ngā wāhitau IP
    # He pai i te wā kua whakatinanahia ngā whakahaere urunga e pā ana ki IP
    :ip_spoofing: false
    # Ka whakamahi i ngā hononga katoa ki te whakamahi HTTPS mā ngā pane HSTS
    # Whakamutua anake mō te whanaketanga, i te wā i muri i tētahi tūmau haumaru rānei
    :strict_transport: false
  # I te wā kua whakahohetia, ka tāpiri i ngā pane Content-Security-Policy ki te
  # whakahoki. I te wā `development.enabled=true`, ka iti ake ngā pane engari ka
  # aukati tonu i ngā ihirangi katoa ki te uta mai i ngā pūtake kē. I te āhuatanga
  # whakaputa, ka whakaurua tētahi nonce haumaru ki ngā pane, ā, ka aukatihia katoa
  # te ihirangi unsafe-inline.
  :csp:
    :enabled: <%= ENV['CSP_ENABLED'] == 'true' || false %>
```
