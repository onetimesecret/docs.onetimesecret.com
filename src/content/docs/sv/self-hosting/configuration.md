---
title: Konfigurationsreferens
description: Komplett referens för alla Onetime Secret-konfigurationsalternativ
sidebar:
  order: 4
---

Denna omfattande guide täcker alla konfigurationsalternativ för självhostade Onetime Secret-instanser.

## Konfigurationsfiler

Onetime Secret använder flera konfigurationsfiler:

- **`.env`** - Miljövariabler för vanliga inställningar. Använd för enkel konfiguration och Docker-distributioner utan att modifiera YAML-filer. (Kopiera från `.env.example`)
- **`config/config.yaml`** - Huvudapplikationskonfiguration med ERB-mallar. Miljövariabler integreras här, vilket gör det enkelt att se hur varje inställning tillämpas. (Kopiera från `etc/config.example.yaml`)

## Huvudkonfiguration

Huvudkonfigurationsfilen är `config/config.yaml`, som använder ERB-mallar för att integrera miljövariabler.

**Komma igång:**
1. Kopiera exemplet: `cp etc/config.example.yaml config/config.yaml`
2. Redigera värden efter behov för din distribution
3. De flesta vanliga inställningar kan åsidosättas med miljövariabler

**Visa den kompletta konfigurationsfilen:**
[config.example.yaml](https://raw.githubusercontent.com/onetimesecret/onetimesecret/refs/tags/v0.22.4/etc/config.example.yaml)

### Viktiga konfigurationssektioner

Här är de viktigaste sektionerna du sannolikt behöver anpassa:

```yaml
---
:site:
  :host: <%= ENV['HOST'] || 'localhost:3000' %>
  # Slår på/av https/http vid generering av länkar
  :ssl: <%= ENV['SSL'] == 'true' || false %>
  # VIKTIGT: Efter att ha angett hemligheten bör den inte ändras.
  # Se till att skapa och lagra en säkerhetskopia på en säker
  # plats utanför anläggningen. Att ändra hemligheten kan leda
  # till oförutsedda problem som att inte kunna dekryptera
  # befintliga hemligheter.
  :secret: <%= ENV['SECRET'] || nil %>
  # API- och UI-konfiguration
  :interface:
    :ui:
      # Styr om webbgränssnittet är aktiverat
      # När false visas endast en grundläggande förklaringssida
      :enabled: <%= ENV['UI_ENABLED'] != 'false' %>
      # Header-konfiguration
      # Styr varumärkning och navigering i sidhuvudet
      :header:
        # Kontrollbrytare för att aktivera/inaktivera anpassning av sidhuvud
        :enabled: <%= ENV['HEADER_ENABLED'] != 'false' %>
        # Varumärkeskonfiguration för logotyp och företagsnamn
        :branding:
          # Logotypkonfiguration
          :logo:
            # URL till logotypbildfil
            :url: <%= ENV['LOGO_URL'] || 'DefaultLogo.vue' %>
            # Alt-text för logotypbild
            :alt: <%= ENV['LOGO_ALT'] || 'Share a Secret One-Time' %>
            # Dit logotypen länkar när den klickas
            :href: <%= ENV['LOGO_LINK'] || '/' %>
          # Företagsnamnåsidosättning (faller tillbaka på i18n om inte inställd)
          :site_name: <%= ENV['SITE_NAME'] || 'One-Time Secret' %>
        # Navigationskonfiguration
        :navigation:
          # Aktivera/inaktivera huvudnavigering helt
          :enabled: <%= ENV['HEADER_NAV_ENABLED'] != 'false' %>
      # Konfiguration av sidfotslänkar
      # Dessa länkar visas i sidfoten på varje sida
      :footer_links:
        # Huvudbrytare för att aktivera/inaktivera alla sidfotslänkar
        :enabled: <%= ENV['FOOTER_LINKS'] == 'true' || false %>
        # Organiserade grupper av länkar
        :groups:
          - :name: legal
            :i18n_key: web.footer.legals
            :links:
              - :text: Terms of Service
                :i18n_key: terms-of-service
                # Ersätt med din egen villkors-URL eller använd relativ sökväg som /terms
                :url: <%= ENV['TERMS_URL']  %>
                :external: <%= ENV['TERMS_EXTERNAL'] || false %>
              - :text: Privacy Policy
                :i18n_key: privacy-policy
                # Ersätt med din egen integritets-URL eller använd relativ sökväg som /privacy
                :url: <%= ENV['PRIVACY_URL']  %>
                :external: <%= ENV['PRIVACY_EXTERNAL'] || false %>
          - :name: resources
            :i18n_key: web.footer.resources
            :links:
              - :text: Status
                :i18n_key: status
                # Ersätt med din statussida-URL om du har en
                :url: <%= ENV['STATUS_URL'] %>
                :external: <%= ENV['STATUS_EXTERNAL'] || true %>
                :icon: signal
              - :text: About
                :i18n_key: web.COMMON.about
                # Ersätt med din om-sida-URL
                :url: <%= ENV['ABOUT_URL'] %>
                :external: <%= ENV['ABOUT_EXTERNAL'] || false %>
          - :name: support
            :i18n_key: web.footer.support
            :links:
              - :text: Contact
                :i18n_key: web.footer.contact
                :url: <%= ENV['CONTACT_URL'] %>
                :external: false
    # Styr om API-slutpunkterna är tillgängliga. När inaktiverad är
    # API:et helt inaktiverat. Förfrågningar till /api/* kommer att returnera 404.
    :api:
      :enabled: <%= ENV['API_ENABLED'] != 'false' %>
  # Konfigurationsalternativ för hemlighe tshantering
  :secret_options:
    # Standard Time-To-Live (TTL) för hemligheter i sekunder
    # Detta värde används om ingen specifik TTL tillhandahålls vid skapande av hemlighet
    :default_ttl: <%= ENV['DEFAULT_TTL'] || nil %>
    # Tillgängliga TTL-alternativ för skapande av hemlighet (i sekunder)
    # Dessa alternativ kommer att presenteras för användare när de skapar en ny hemlighet
    # Format: Sträng av heltal som representerar sekunder
    :ttl_options: <%= (ENV['TTL_OPTIONS'] || nil) %>
    # Inställningar för lösenfrasfältet som skyddar åtkomst till hemligheter
    :passphrase:
      # Kräv att användare anger en lösenfras vid skapande av hemligheter
      :required: <%= ENV['PASSPHRASE_REQUIRED'] == 'true' || false %>
      # Minsta antal tecken som krävs för lösenfraser
      :minimum_length: <%= ENV['PASSPHRASE_MIN_LENGTH'] || 8 %>
      # Maximalt antal tecken tillåtna för lösenfraser
      :maximum_length: <%= ENV['PASSPHRASE_MAX_LENGTH'] || 128 %>
      # Tvinga komplexitetskrav (versaler, gemener, siffror, symboler)
      :enforce_complexity: <%= ENV['PASSPHRASE_ENFORCE_COMPLEXITY'] == 'true' || false %>
    # Inställningar för lösenordsgenerering (när användare klickar på "Generera lösenord")
    :password_generation:
      # Standardlängd för genererade lösenord
      :default_length: <%= ENV['PASSWORD_GEN_LENGTH'] || 12 %>
      # Teckenuppsättningar att inkludera i genererade lösenord
      :character_sets:
        # Inkludera versaler (A-Z)
        :uppercase: <%= ENV['PASSWORD_GEN_UPPERCASE'] != 'false' %>
        # Inkludera gemener (a-z)
        :lowercase: <%= ENV['PASSWORD_GEN_LOWERCASE'] != 'false' %>
        # Inkludera siffror (0-9)
        :numbers: <%= ENV['PASSWORD_GEN_NUMBERS'] != 'false' %>
        # Inkludera symboler (!@#$%^&*()_+-=[]{}|;:,.<>?)
        :symbols: <%= ENV['PASSWORD_GEN_SYMBOLS'] == 'true' || false %>
        # Exkludera tvetydiga tecken (0, O, l, 1, I) för att förhindra förvirring
        :exclude_ambiguous: <%= ENV['PASSWORD_GEN_EXCLUDE_AMBIGUOUS'] != 'false' %>
  # Registrerings- och autentiseringsinställningar
  :authentication:
    # Kan inaktiveras helt, inklusive API-autentisering.
    :enabled: <%= ENV['AUTH_ENABLED'] != 'false' %>
    # Tillåt användare att skapa konton. Detta kan inaktiveras om du planerar
    # att skapa konton manuellt eller aktivera under installation när konton
    # kan skapas och sedan inaktiveras för att förhindra att nya användare
    # skapar konton.
    :signup: <%= ENV['AUTH_SIGNUP'] != 'false' %>
    # Generellt om du tillåter registrering, tillåter du inloggning. Men det
    # finns omständigheter där det är användbart att stänga av autentisering
    # tillfälligt.
    :signin: <%= ENV['AUTH_SIGNIN'] != 'false' %>
    # Som standard behöver nya konton verifiera sin e-postadress innan
    # de kan logga in. Detta är en säkerhetsåtgärd för att förhindra spam
    # och missbruk av systemet. Om du kör en privat instans eller
    # en instans för ditt team eller företag, kan du inaktivera denna funktion
    # för att göra det enklare för användare att logga in.
    :autoverify: <%= ENV['AUTH_AUTOVERIFY'] == 'true' || false %>
    # När aktiverad är startsidans hemliga formulär inte tillgängligt om inte
    # användaren är inloggad. Liknande en inaktiverad startsida, men visar fortfarande
    # huvudet med logotyp och navigationslänkar. Detta möjliggör ett
    # mer restriktivt läge där endast autentiserade användare kan skapa
    # hemligheter samtidigt som webbplatsnavigering och varumärkning bibehålls.
    :required: <%= ENV['AUTH_REQUIRED'] == 'true' %>
    # E-postadresser listade nedan kommer att beviljas automatiska
    # administrativa privilegier vid kontoskapande. Dessa
    # konton har åtkomst till en sida som visar grundläggande systemstatistik.
    # Termen "colonel" används istället för "admin". "Colonel" (som
    # uttalas "kernel") refererar till både den skyddade kärnan i ett
    # Linux-system och en militär rang, vilket symboliserar hög åtkomst-
    # behörighet. Denna namngivning hjälper till att undvika grundläggande,
    # automatiserade attacker som riktar sig mot vanliga admin-URL:er eller rollnamn.
    :colonels:
      - <%= ENV['COLONEL'] || 'CHANGEME@example.com' %>
  # En captcha-liknande funktion som skyddar återkopplingsformuläret
  # från robotar och annat bus.
  :authenticity:
    :type: <%= ENV['AUTHENTICITY_TYPE'] || 'altcha' %>
    :secret_key: <%= ENV['AUTHENTICITY_SECRET_KEY'] || '<REPLACE_WITH_STRONG_HMAC_KEY>' %>
  # Länkar till dokumentation. För onetimesecret.com är detta
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
    # Standarddomänen som används för länk-URL:er. När inte inställd eller tom,
    # används site.host.
    :default: <%= ENV['DEFAULT_DOMAIN'] || nil %>
    # Klustertypen bestämmer hur applikationen kommer att stödja
    # flera domäner. Standard är nil vilket betyder att
    # applikationen själv är ansvarig för att hantera flera domäner.
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
# Redis-konfiguration
:redis:
  # Huvud-Redis-anslutnings-URI - Ange fullständig anslutningssträng inklusive autentisering
  # Format: redis://[:password@]host[:port]/[db-nummer]
  # Exempel:
  #   - redis://mypassword@localhost:6379/0        # Enkel lösenordsautentisering
  #   - redis://user:pass@localhost:6379/0         # Användarnamn/lösenordsautentisering
  #   - redis://redis.example.com:6379/0          # Ingen autentisering (endast utveckling)
  :uri: <%= ENV['REDIS_URL'] || 'redis://CHANGEME@127.0.0.1:6379/0' %>

# Loggningskonfiguration
:logging:
  # HTTP-förfrågningsloggar (Rack::CommonLogger)
  :http_requests: <%= ENV['LOG_HTTP_REQUESTS'] != 'false' %>

# Skicka e-post
:emailer:
  # Lokal utveckling med Mailpit
  # -----------------------------
  # Mailpit är en dev SMTP-server som fångar e-post för testning
  # Installera: brew install mailpit
  # Starta: mailpit
  # Webb-UI: http://localhost:8025
  #
  #  :mode: smtp                      # Använd SMTP-läge för lokal testning
  #  :from: secure@onetimesecret.com # Avsändaradress
  #  :fromname: OTS Support          # Avsändarnamn
  #  :host: 127.0.0.1                # Mailpit-värd
  #  :port: 1025                     # Mailpit standard SMTP-port
  #  :user: ~                        # Ingen autentisering behövs för Mailpit
  #  :pass: ~                        # Ingen autentisering behövs för Mailpit
  #  :auth: false                    # Inaktivera SMTP-autentisering för Mailpit
  #  :tls: false                     # Inaktivera TLS för lokal testning

  # Produktionsinställningar (för referens)
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
    # Tillgängliga valideringstyper: :regex, :mx, :mx_blacklist, :smtp
    :default_validation_type: :regex
    # Krävs för :smtp-validering
    :verifier_email: <%= ENV['VERIFIER_EMAIL'] || 'CHANGEME@example.com' %>
    # (Ytterligare Truemail-konfiguration fortsätter...)

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
  # En lista med ISO-språkkoder (t.ex. 'en' för engelska, 'es'
  # för spanska, etc.). Det finns en motsvarande fil i src/locales
  # med samma namn som innehåller den översatta texten. Om den inte är
  # vald automatiskt kan användare välja sitt föredragna
  # språk genom att använda växlaren i sidfoten eller i inställnings-
  # modalen om de är inloggade.
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
  # SÄKERHETSFUNKTION: Styr om applikationen kan köras utan en
  # site.secret (antingen i denna fil eller via SECRET env var).
  #
  # STANDARD: false (applikationen kommer att misslyckas med att starta om site.secret är nil)
  #
  # VARNING: Att ställa in på true utgör betydande säkerhetsrisker:
  # - Hemligheter kan lagras utan korrekt kryptering
  # - Obehörig åtkomst till känslig data blir möjlig
  # - Integriteten för hemlig länk kan inte garanteras
  #
  # GILTIGA ANVÄNDNINGSFALL (endast tillfälligt):
  # 1. ÅTERSTÄLLNING: Du körde av misstag med nil secret och behöver återställa
  #    befintliga hemligheter skapade under den tiden. Aktivera tillfälligt tills
  #    alla berörda hemligheter går ut (max TTL-period).
  # 2. MIGRERING: Under en kontrollerad migrering mellan krypteringsscheman,
  #    med lämpliga säkerhetsåtgärder på plats.
  #
  # BETEENDE NÄR TRUE:
  # - Applikationen startar utan att misslyckas
  # - Varningsloggar visas vid uppstart
  # - Vid dekryptering kommer CipherErrors med den riktiga hemligheten att orsaka
  #   automatiskt nytt försök med nil secret
  #
  :allow_nil_global_secret: <%= ENV['ALLOW_NIL_GLOBAL_SECRET'] == 'true' || false %>
  # (Ytterligare experimentella inställningar fortsätter...)
```

Se den fullständiga konfigurationsfilen på GitHub för alla tillgängliga alternativ.
