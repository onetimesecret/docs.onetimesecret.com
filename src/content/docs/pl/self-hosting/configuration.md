---
title: Dokumentacja konfiguracji
description: Kompletna dokumentacja wszystkich opcji konfiguracyjnych Onetime Secret
sidebar:
  order: 4
---


Ten kompleksowy przewodnik obejmuje wszystkie opcje konfiguracyjne dla własnych instancji Onetime Secret.

## Pliki konfiguracyjne

Onetime Secret używa wielu plików konfiguracyjnych:


- **`.env`** - Zmienne środowiskowe dla typowych ustawień. Użyj dla prostej konfiguracji i wdrożeń Docker bez modyfikowania plików YAML. (Skopiuj z `.env.example`)
- **`config/config.yaml`** - Główna konfiguracja aplikacji używająca szablonów ERB. Zmienne środowiskowe są tu zintegrowane, co ułatwia zrozumienie, jak każde ustawienie jest stosowane. (Skopiuj z `etc/config.example.yaml`)


## Główna konfiguracja

Głównym plikiem konfiguracyjnym jest `config/config.yaml`, który używa szablonów ERB do integracji zmiennych środowiskowych.

**Pierwsze kroki:**
1. Skopiuj przykład: `cp etc/config.example.yaml config/config.yaml`
2. Edytuj wartości zgodnie z potrzebami wdrożenia
3. Większość popularnych ustawień można nadpisać zmiennymi środowiskowymi

**Zobacz kompletny plik konfiguracyjny:**
[config.example.yaml](https://raw.githubusercontent.com/onetimesecret/onetimesecret/refs/tags/v0.22.4/etc/config.example.yaml)

### Kluczowe sekcje konfiguracji

Oto najważniejsze sekcje, które prawdopodobnie będziesz musiał dostosować:

```yaml
---
:site:
  :host: <%= ENV['HOST'] || 'localhost:3000' %>
  # Włącza lub wyłącza https/http przy generowaniu linków
  :ssl: <%= ENV['SSL'] == 'true' || false %>
  # WAŻNE: Po ustawieniu sekretu nie powinien być zmieniany.
  # Należy utworzyć i przechowywać kopię zapasową w bezpiecznej
  # lokalizacji poza siedzibą. Zmiana sekretu może prowadzić do
  # nieprzewidzianych problemów, takich jak niemożność odszyfrowania
  # istniejących sekretów.
  :secret: <%= ENV['SECRET'] || nil %>
  # Konfiguracja API i UI
  :interface:
    :ui:
      # Kontroluje, czy interfejs webowy jest włączony
      # Gdy false, wyświetlana jest tylko podstawowa strona wyjaśniająca
      :enabled: <%= ENV['UI_ENABLED'] != 'false' %>
      # Konfiguracja nagłówka
      # Kontroluje branding i nawigację w nagłówku strony
      :header:
        # Przełącznik kontrolny do włączania/wyłączania dostosowywania nagłówka
        :enabled: <%= ENV['HEADER_ENABLED'] != 'false' %>
        # Konfiguracja brandingu dla logo i nazwy firmy
        :branding:
          # Konfiguracja logo
          :logo:
            # URL do pliku obrazu logo
            :url: <%= ENV['LOGO_URL'] || 'DefaultLogo.vue' %>
            # Tekst alternatywny dla obrazu logo
            :alt: <%= ENV['LOGO_ALT'] || 'Share a Secret One-Time' %>
            # Dokąd prowadzi logo po kliknięciu
            :href: <%= ENV['LOGO_LINK'] || '/' %>
          # Nadpisanie nazwy firmy (wraca do i18n jeśli nie ustawiono)
          :site_name: <%= ENV['SITE_NAME'] || 'One-Time Secret' %>
        # Konfiguracja nawigacji
        :navigation:
          # Włącz/wyłącz całkowicie nawigację w nagłówku
          :enabled: <%= ENV['HEADER_NAV_ENABLED'] != 'false' %>
      # Konfiguracja linków w stopce
      # Te linki pojawiają się w stopce każdej strony
      :footer_links:
        # Główny przełącznik do włączania/wyłączania wszystkich linków w stopce
        :enabled: <%= ENV['FOOTER_LINKS'] == 'true' || false %>
        # Zorganizowane grupy linków
        :groups:
          - :name: legal
            :i18n_key: web.footer.legals
            :links:
              - :text: Terms of Service
                :i18n_key: terms-of-service
                # Zamień na własny URL warunków lub użyj względnej ścieżki jak /terms
                :url: <%= ENV['TERMS_URL']  %>
                :external: <%= ENV['TERMS_EXTERNAL'] || false %>
              - :text: Privacy Policy
                :i18n_key: privacy-policy
                # Zamień na własny URL polityki prywatności lub użyj względnej ścieżki jak /privacy
                :url: <%= ENV['PRIVACY_URL']  %>
                :external: <%= ENV['PRIVACY_EXTERNAL'] || false %>
          - :name: resources
            :i18n_key: web.footer.resources
            :links:
              - :text: Status
                :i18n_key: status
                # Zamień na URL swojej strony statusu, jeśli ją masz
                :url: <%= ENV['STATUS_URL'] %>
                :external: <%= ENV['STATUS_EXTERNAL'] || true %>
                :icon: signal
              - :text: About
                :i18n_key: web.COMMON.about
                # Zamień na URL swojej strony o nas
                :url: <%= ENV['ABOUT_URL'] %>
                :external: <%= ENV['ABOUT_EXTERNAL'] || false %>
          - :name: support
            :i18n_key: web.footer.support
            :links:
              - :text: Contact
                :i18n_key: web.footer.contact
                :url: <%= ENV['CONTACT_URL'] %>
                :external: false
    # Kontroluje, czy punkty końcowe API są dostępne. Gdy wyłączone, API
    # jest całkowicie wyłączone. Żądania do /api/* zwrócą 404.
    :api:
      :enabled: <%= ENV['API_ENABLED'] != 'false' %>
  # Opcje konfiguracji dla zarządzania sekretami
  :secret_options:
    # Domyślny Time-To-Live (TTL) dla sekretów w sekundach
    # Ta wartość jest używana, jeśli nie podano konkretnego TTL przy tworzeniu sekretu
    :default_ttl: <%= ENV['DEFAULT_TTL'] || nil %>
    # Dostępne opcje TTL dla tworzenia sekretów (w sekundach)
    # Te opcje będą prezentowane użytkownikom podczas tworzenia nowego sekretu
    # Format: Łańcuch liczb całkowitych reprezentujących sekundy
    :ttl_options: <%= (ENV['TTL_OPTIONS'] || nil) %>
    # Ustawienia dla pola frazy dostępowej, które chroni dostęp do sekretów
    :passphrase:
      # Wymagaj od użytkowników wprowadzenia frazy dostępowej przy tworzeniu sekretów
      :required: <%= ENV['PASSPHRASE_REQUIRED'] == 'true' || false %>
      # Minimalna liczba znaków wymagana dla fraz dostępowych
      :minimum_length: <%= ENV['PASSPHRASE_MIN_LENGTH'] || 8 %>
      # Maksymalna liczba znaków dozwolona dla fraz dostępowych
      :maximum_length: <%= ENV['PASSPHRASE_MAX_LENGTH'] || 128 %>
      # Wymuś wymagania dotyczące złożoności (wielkie litery, małe litery, cyfry, symbole)
      :enforce_complexity: <%= ENV['PASSPHRASE_ENFORCE_COMPLEXITY'] == 'true' || false %>
    # Ustawienia dla generowania haseł (gdy użytkownicy klikają "Generuj hasło")
    :password_generation:
      # Domyślna długość dla generowanych haseł
      :default_length: <%= ENV['PASSWORD_GEN_LENGTH'] || 12 %>
      # Zestawy znaków do uwzględnienia w generowanych hasłach
      :character_sets:
        # Uwzględnij wielkie litery (A-Z)
        :uppercase: <%= ENV['PASSWORD_GEN_UPPERCASE'] != 'false' %>
        # Uwzględnij małe litery (a-z)
        :lowercase: <%= ENV['PASSWORD_GEN_LOWERCASE'] != 'false' %>
        # Uwzględnij cyfry (0-9)
        :numbers: <%= ENV['PASSWORD_GEN_NUMBERS'] != 'false' %>
        # Uwzględnij symbole (!@#$%^&*()_+-=[]{}|;:,.<>?)
        :symbols: <%= ENV['PASSWORD_GEN_SYMBOLS'] == 'true' || false %>
        # Wyklucz niejednoznaczne znaki (0, O, l, 1, I), aby zapobiec zamieszaniu
        :exclude_ambiguous: <%= ENV['PASSWORD_GEN_EXCLUDE_AMBIGUOUS'] != 'false' %>
  # Ustawienia rejestracji i uwierzytelniania
  :authentication:
    # Może być całkowicie wyłączone, w tym uwierzytelnianie API.
    :enabled: <%= ENV['AUTH_ENABLED'] != 'false' %>
    # Zezwól użytkownikom na tworzenie kont. Można to wyłączyć, jeśli planujesz
    # ręczne tworzenie kont lub włączyć podczas konfiguracji, gdy konta mogą
    # być tworzone, a następnie wyłączyć, aby zapobiec tworzeniu nowych kont
    # przez użytkowników.
    :signup: <%= ENV['AUTH_SIGNUP'] != 'false' %>
    # Ogólnie, jeśli zezwalasz na rejestrację, zezwalasz na logowanie. Ale są
    # okoliczności, w których pomocne jest tymczasowe wyłączenie uwierzytelniania.
    :signin: <%= ENV['AUTH_SIGNIN'] != 'false' %>
    # Domyślnie nowe konta muszą zweryfikować swój adres e-mail przed
    # zalogowaniem. To środek bezpieczeństwa zapobiegający spamowaniu
    # i nadużywaniu systemu. Jeśli prowadzisz prywatną instancję lub
    # instancję dla swojego zespołu lub firmy, możesz wyłączyć tę funkcję,
    # aby ułatwić użytkownikom logowanie.
    :autoverify: <%= ENV['AUTH_AUTOVERIFY'] == 'true' || false %>
    # Gdy włączone, formularz sekretu na stronie głównej nie jest dostępny,
    # chyba że użytkownik jest zalogowany. Podobnie do wyłączonej strony głównej,
    # ale nadal pokazuje nagłówek z logo i linkami nawigacyjnymi. Pozwala to
    # na bardziej restrykcyjny tryb, w którym tylko uwierzytelnieni użytkownicy
    # mogą tworzyć sekrety, zachowując nawigację i branding strony.
    :required: <%= ENV['AUTH_REQUIRED'] == 'true' %>
    # Adresy e-mail wymienione poniżej otrzymają automatyczne uprawnienia
    # administracyjne po utworzeniu konta. Te konta mają dostęp do strony,
    # która pokazuje podstawowe statystyki systemowe.
    # Termin "colonel" jest używany zamiast "admin". "Colonel" (który
    # wymawia się "kernel") nawiązuje zarówno do chronionego rdzenia systemu
    # Linux, jak i rangi wojskowej, symbolizując uprawnienia wysokiego poziomu.
    # To nazewnictwo pomaga uniknąć podstawowych, zautomatyzowanych ataków
    # celujących w typowe adresy URL administratora lub nazwy ról.
    :colonels:
      - <%= ENV['COLONEL'] || 'CHANGEME@example.com' %>
  # Funkcja podobna do captcha, która chroni formularz opinii
  # przed botami i innymi nieuczciwościami.
  :authenticity:
    :type: <%= ENV['AUTHENTICITY_TYPE'] || 'altcha' %>
    :secret_key: <%= ENV['AUTHENTICITY_SECRET_KEY'] || '<REPLACE_WITH_STRONG_HMAC_KEY>' %>
  # Linki do dokumentacji. Dla onetimesecret.com jest to
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
    # Domyślna domena używana dla adresów URL linków. Gdy nie ustawiono lub puste,
    # używane jest site.host.
    :default: <%= ENV['DEFAULT_DOMAIN'] || nil %>
    # Typ klastra określa, jak aplikacja będzie obsługiwać
    # wiele domen. Domyślnie jest nil, co oznacza, że sama
    # aplikacja jest odpowiedzialna za obsługę wielu domen.
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
# Konfiguracja Redis
:redis:
  # Główny URI połączenia Redis - Określ pełny ciąg połączenia wraz z uwierzytelnianiem
  # Format: redis://[:password@]host[:port]/[db-number]
  # Przykłady:
  #   - redis://mypassword@localhost:6379/0        # Proste uwierzytelnianie hasłem
  #   - redis://user:pass@localhost:6379/0         # Uwierzytelnianie użytkownik/hasło
  #   - redis://redis.example.com:6379/0          # Bez uwierzytelniania (tylko rozwój)
  :uri: <%= ENV['REDIS_URL'] || 'redis://CHANGEME@127.0.0.1:6379/0' %>

# Konfiguracja logowania
:logging:
  # Logi żądań HTTP (Rack::CommonLogger)
  :http_requests: <%= ENV['LOG_HTTP_REQUESTS'] != 'false' %>

# Wysyłanie wiadomości e-mail
:emailer:
  # Lokalne środowisko deweloperskie z Mailpit
  # -----------------------------
  # Mailpit to deweloperski serwer SMTP, który przechwytuje e-maile do testowania
  # Instalacja: brew install mailpit
  # Uruchomienie: mailpit
  # Interfejs Web: http://localhost:8025
  #
  #  :mode: smtp                      # Użyj trybu SMTP do lokalnego testowania
  #  :from: secure@onetimesecret.com # Adres nadawcy
  #  :fromname: OTS Support          # Nazwa nadawcy
  #  :host: 127.0.0.1                # Host Mailpit
  #  :port: 1025                     # Domyślny port SMTP Mailpit
  #  :user: ~                        # Brak uwierzytelniania dla Mailpit
  #  :pass: ~                        # Brak uwierzytelniania dla Mailpit
  #  :auth: false                    # Wyłącz uwierzytelnianie SMTP dla Mailpit
  #  :tls: false                     # Wyłącz TLS do lokalnego testowania

  # Ustawienia produkcyjne (dla odniesienia)
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
    # Dostępne typy walidacji: :regex, :mx, :mx_blacklist, :smtp
    :default_validation_type: :regex
    # Wymagane dla walidacji :smtp
    :verifier_email: <%= ENV['VERIFIER_EMAIL'] || 'CHANGEME@example.com' %>
    #:verifier_domain: <%= ENV['VERIFIER_DOMAIN'] || 'example.com' %>
    #:connection_timeout: 2
    #:response_timeout: 2
    #:connection_attempts: 3
    #:validation_type_for:
    #  'example.com': :regex
    #
    # Truemail będzie walidować tylko adresy e-mail pasujące do
    # domen wymienionych w :allowed_domains. Jeśli domena nie jest
    # wymieniona, adres e-mail będzie zawsze uznawany za nieprawidłowy.
    :allowed_domains_only: false
    #
    # Adresy e-mail z tej listy będą zawsze prawidłowe.
    #:allowed_emails: []
    #
    # Adresy e-mail z tej listy będą zawsze nieprawidłowe.
    #:blocked_emails: []
    #
    # Adresy z tymi domenami będą zawsze prawidłowe
    #:allowed_domains: []
    #
    # Adresy z tymi domenami będą zawsze nieprawidłowe
    #:blocked_domains: []
    #
    # Wyklucz te adresy IP z procesu wyszukiwania MX.
    #:blocked_mx_ip_addresses: []
    #
    # Serwery nazw do użycia w wyszukiwaniu rekordów MX itp.
    # Domyślnie są to serwery CloudFlare, Google, Oracle/OpenDNS.
    :dns:
      - 1.1.1.1
      - 8.8.4.4
      - 208.67.220.220
    #:smtp_port: 25
    #
    # Zakończ walidację smtp po pierwszej nieprawidłowej odpowiedzi zamiast
    # ponawiania próby, a następnie próbowania następnego serwera. Może skrócić
    # czas walidacji adresu e-mail, ale może nie wychwycić wszystkich problemów.
    :smtp_fail_fast: false
    #
    # Analizuj treść komunikatu o błędzie SMTP, aby określić, czy adres
    # e-mail jest prawidłowy. Może to być przydatne dla niektórych serwerów SMTP,
    # które nie zwracają dokładnych odpowiedzi.
    :smtp_safe_check: true
    #
    # Czy wyłączyć przepływ wyszukiwania RFC MX. Gdy true, tylko walidacja DNS
    # będzie wykonywana na rekordach MX i Null MX.
    :not_rfc_mx_lookup_flow: false
    #
    # Nadpisz domyślny wzorzec wyrażenia regularnego dla adresów e-mail
    # i/lub treści w komunikatach o błędach SMTP.
    #:email_pattern: /regex_pattern/
    #:smtp_error_body_pattern: /regex_pattern/
    #
    # Loguj do konsoli, pliku lub obu. Proces ruby musi mieć
    # dostęp do zapisu do pliku logu. Plik logu zostanie utworzony, jeśli nie
    # istnieje. Rotacja pliku logu nie jest obsługiwana przez aplikację.
    :logger:
      # Jeden z: :error (domyślnie), :unrecognized_error, :recognized_error, :all.
      :tracking_event: :error
      :stdout: true
      # log_absolute_path: '/home/app/log/truemail.log'

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
  # Lista kodów językowych ISO (np. 'en' dla angielskiego, 'es'
  # dla hiszpańskiego, itp.). W src/locales znajduje się odpowiedni
  # plik o tej samej nazwie zawierający przetłumaczony tekst. Jeśli nie
  # jest wybierany automatycznie, użytkownicy mogą wybrać preferowany
  # język używając przełącznika w stopce lub w modalnym oknie ustawień,
  # jeśli są zalogowani.
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
  # FUNKCJA BEZPIECZEŃSTWA: Kontroluje, czy aplikacja może działać bez
  # site.secret (w tym pliku lub przez zmienną środowiskową SECRET).
  #
  # DOMYŚLNIE: false (aplikacja nie uruchomi się, jeśli site.secret jest nil)
  #
  # OSTRZEŻENIE: Ustawienie na true przedstawia znaczne zagrożenia bezpieczeństwa:
  # - Sekrety mogą być przechowywane bez odpowiedniego szyfrowania
  # - Nieautoryzowany dostęp do wrażliwych danych staje się możliwy
  # - Integralność linku do sekretu nie może być zagwarantowana
  #
  # PRAWIDŁOWE PRZYPADKI UŻYCIA (tylko tymczasowo):
  # 1. ODZYSKIWANIE: Przypadkowo uruchomiłeś z nil secret i musisz odzyskać
  #    istniejące sekrety utworzone w tym czasie. Włącz tymczasowo, dopóki
  #    wszystkie dotknięte sekrety nie wygasną (max okres TTL).
  # 2. MIGRACJA: Podczas kontrolowanej migracji między schematami szyfrowania,
  #    z odpowiednimi środkami bezpieczeństwa.
  #
  # ZACHOWANIE GDY TRUE:
  # - Aplikacja startuje bez awarii
  # - Ostrzeżenia w logach pojawiają się podczas startu
  # - Przy odszyfrowywaniu, CipherErrors z prawdziwym sekretem spowodują
  #   automatyczne ponowienie próby z nil secret
  #
  :allow_nil_global_secret: <%= ENV['ALLOW_NIL_GLOBAL_SECRET'] == 'true' || false %>
  # FUNKCJA BEZPIECZEŃSTWA: Wsparcie dla rotacji globalnego sekretu
  #
  # FORMAT: Tablica łańcuchów zawierających poprzednie wartości sekretu
  # ["old_secret_1", "old_secret_2", "oldest_secret"]
  #
  # UŻYCIE: Podczas rotacji sekretów dodaj stare wartości tutaj, ustawiając nowy
  # główny sekret w site.secret lub zmiennej środowiskowej SECRET. Aplikacja będzie:
  # 1. Używać bieżącego głównego sekretu dla wszystkich nowych szyfrowań
  # 2. Próbować każdego rotowanego sekretu (w kolejności) do odszyfrowania, gdy główny zawiedzie
  #
  # KONSERWACJA: Usuń sekrety z tej listy po wygaśnięciu odpowiednich sekretów
  # lub po pomyślnym ponownym zaszyfrowaniu bieżącym głównym sekretem. Łatwą wytyczną
  # jest maksymalne TTL w `ttl_options`.
  :rotated_secrets: []
  # Gdy ustawione na true, Rack::Builder#freeze_app zamraża stos middleware
  # po inicjalizacji, aby zapobiec jakimkolwiek modyfikacjom w czasie wykonywania łańcucha
  # middleware aplikacji. To środek bezpieczeństwa, który zapobiega wstrzykiwaniu
  # nowego middleware przez złośliwy kod.
  #
  # Efekty:
  # - Zamraża stos middleware, zapobiegając dodawaniu/usuwaniu po uruchomieniu
  # - Zamraża obiekt app przekazany do Rack::Builder
  # - Nie wpływa na zmienność obiektów żądania/odpowiedzi
  #
  # Uwaga: To ustawienie może pomóc uczynić aplikację bardziej bezpieczną poprzez
  # zapobieganie manipulacji łańcuchem middleware w czasie wykonywania. Dla większości
  # aplikacji powinno to być włączone w środowiskach produkcyjnych.
  :freeze_app: false
  # Konfiguracja Middleware
  # Kontroluje, które komponenty middleware bezpieczeństwa i wydajności są włączone
  :middleware:
    # Serwuj pliki statyczne dla aplikacji frontend vue
    :static_files: true
    # Sanityzuje parametry żądania, aby zapewnić prawidłowe kodowanie UTF-8
    # Zapobiega atakom opartym na kodowaniu i błędnym wejściom
    :utf8_sanitizer: true
    # Chroni przed atakami Cross-Site Request Forgery (CSRF)
    # Weryfikuje, że żądania pochodzą z tej samej strony
    :http_origin: false
    # Wymyka encje HTML w parametrach żądania
    # Pomaga zapobiegać atakom XSS przez parametry żądania
    :escaped_params: false
    # Ustawia nagłówek X-XSS-Protection, aby włączyć filtrowanie XSS w przeglądarce
    # Nowoczesne przeglądarki polegają na tym mniej, gdy CSP staje się standardem
    :xss_header: false
    # Zapobiega osadzaniu strony w ramkach (ochrona przed clickjackingiem)
    # Ustawia nagłówek X-Frame-Options na SAMEORIGIN lub DENY
    :frame_options: false
    # Blokuje ataki directory traversal używające "../" w ścieżkach
    # Kluczowe dla zapobiegania nieautoryzowanemu dostępowi do plików
    :path_traversal: false
    # Chroni przed atakami cookie tossing
    # Zapobiega utrwalaniu sesji przez zmanipulowane ciasteczka
    :cookie_tossing: false
    # Zapobiega atakom IP spoofing przez walidację adresów IP
    # Przydatne, gdy implementowane są kontrole dostępu oparte na IP
    :ip_spoofing: false
    # Wymusza wszystkie połączenia do używania HTTPS przez nagłówki HSTS
    # Wyłącz tylko dla rozwoju lub gdy za bezpiecznym proxy
    :strict_transport: false
  # Gdy włączone, dodaje nagłówki Content-Security-Policy do odpowiedzi. Gdy
  # `development.enabled=true`, nagłówki będą mniej restrykcyjne, ale nadal
  # zapobiegną ładowaniu jakiejkolwiek treści z innych źródeł. W regularnym trybie
  # produkcyjnym, bezpieczny nonce będzie włączony z nagłówkami, a niebezpieczna
  # zawartość inline jest całkowicie zablokowana. Nonce można uzyskać przez obiekt
  # żądania rack `req.env['ots.nonce']`. Widoki backend pobierają go stamtąd, aby
  # dodać do wszystkich zasobów skryptów i stylów front-end automatycznie. Musisz
  # użyć nonce tylko wtedy, gdy dodajesz nowe zależności skryptów lub stylów.
  # Gdy wyłączone, żadne nagłówki csp nie są włączone w żadnym środowisku.
  :csp:
    :enabled: <%= ENV['CSP_ENABLED'] == 'true' || false %>
```
