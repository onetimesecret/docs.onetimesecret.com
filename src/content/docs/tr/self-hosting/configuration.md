---
title: Yapılandırma Referansı
description: Tüm Onetime Secret yapılandırma seçenekleri için eksiksiz referans
sidebar:
  order: 4
---


Bu kapsamlı kılavuz, kendi sunucunuzda barındırılan Onetime Secret örnekleri için tüm yapılandırma seçeneklerini kapsar.

## Yapılandırma Dosyaları

Onetime Secret birden fazla yapılandırma dosyası kullanır:


- **`.env`** - Yaygın ayarlar için ortam değişkenleri. YAML dosyalarını değiştirmeden basit yapılandırma ve Docker dağıtımları için kullanın. (`.env.example`'dan kopyalayın)
- **`config/config.yaml`** - ERB şablonlarını kullanarak ana uygulama yapılandırması. Ortam değişkenleri burada entegre edilir, böylece her ayarın nasıl uygulandığını görmek kolaydır. (`etc/config.example.yaml`'dan kopyalayın)


## Ana Yapılandırma

Ana yapılandırma dosyası `config/config.yaml`'dır ve ortam değişkenlerini entegre etmek için ERB şablonlarını kullanır.

**Başlarken:**
1. Örneği kopyalayın: `cp etc/config.example.yaml config/config.yaml`
2. Dağıtımınız için gerektiği gibi değerleri düzenleyin
3. En yaygın ayarların çoğu ortam değişkenleriyle geçersiz kılınabilir

**Eksiksiz yapılandırma dosyasını görüntüle:**
[config.example.yaml](https://raw.githubusercontent.com/onetimesecret/onetimesecret/refs/tags/v0.22.4/etc/config.example.yaml)

### Temel Yapılandırma Bölümleri

Büyük olasılıkla özelleştirmeniz gereken en önemli bölümler şunlardır:

```yaml
---
:site:
  :host: <%= ENV['HOST'] || 'localhost:3000' %>
  # Bağlantılar oluşturulurken https/http'yi açar veya kapatır
  :ssl: <%= ENV['SSL'] == 'true' || false %>
  # ÖNEMLİ: Gizli anahtar ayarlandıktan sonra değiştirilmemelidir.
  # Güvenli bir yerde yedek oluşturup saklamayı unutmayın.
  # Gizli anahtarı değiştirmek, mevcut gizli mesajların
  # şifresinin çözülememesi gibi öngörülemeyen sorunlara yol açabilir.
  :secret: <%= ENV['SECRET'] || nil %>
  # API ve UI Yapılandırması
  :interface:
    :ui:
      # Web arayüzünün etkin olup olmadığını kontrol eder
      # false olduğunda, yalnızca temel bir açıklama sayfası gösterilir
      :enabled: <%= ENV['UI_ENABLED'] != 'false' %>
      # Başlık yapılandırması
      # Site başlığında markalama ve gezinmeyi kontrol eder
      :header:
        # Başlık özelleştirmesini etkinleştir/devre dışı bırakmak için kontrol anahtarı
        :enabled: <%= ENV['HEADER_ENABLED'] != 'false' %>
        # Logo ve şirket adı için markalama yapılandırması
        :branding:
          # Logo yapılandırması
          :logo:
            # Logo resim dosyasının URL'si
            :url: <%= ENV['LOGO_URL'] || 'DefaultLogo.vue' %>
            # Logo resmi için alternatif metin
            :alt: <%= ENV['LOGO_ALT'] || 'Share a Secret One-Time' %>
            # Logoya tıklandığında nereye bağlantı verileceği
            :href: <%= ENV['LOGO_LINK'] || '/' %>
          # Şirket adı geçersiz kılma (ayarlanmadıysa i18n'e geri döner)
          :site_name: <%= ENV['SITE_NAME'] || 'One-Time Secret' %>
        # Gezinme yapılandırması
        :navigation:
          # Başlık gezinmesini tamamen etkinleştir/devre dışı bırak
          :enabled: <%= ENV['HEADER_NAV_ENABLED'] != 'false' %>
      # Alt bilgi bağlantısı yapılandırması
      # Bu bağlantılar her sayfanın alt bilgisinde görünür
      :footer_links:
        # Tüm alt bilgi bağlantılarını etkinleştir/devre dışı bırakmak için ana anahtar
        :enabled: <%= ENV['FOOTER_LINKS'] == 'true' || false %>
        # Düzenlenmiş bağlantı grupları
        :groups:
          - :name: legal
            :i18n_key: web.footer.legals
            :links:
              - :text: Terms of Service
                :i18n_key: terms-of-service
                # Kendinizin şartlar URL'siyle değiştirin veya /terms gibi göreceli yol kullanın
                :url: <%= ENV['TERMS_URL']  %>
                :external: <%= ENV['TERMS_EXTERNAL'] || false %>
              - :text: Privacy Policy
                :i18n_key: privacy-policy
                # Kendinizin gizlilik URL'siyle değiştirin veya /privacy gibi göreceli yol kullanın
                :url: <%= ENV['PRIVACY_URL']  %>
                :external: <%= ENV['PRIVACY_EXTERNAL'] || false %>
          - :name: resources
            :i18n_key: web.footer.resources
            :links:
              - :text: Status
                :i18n_key: status
                # Durum sayfası URL'nizle değiştirin (varsa)
                :url: <%= ENV['STATUS_URL'] %>
                :external: <%= ENV['STATUS_EXTERNAL'] || true %>
                :icon: signal
              - :text: About
                :i18n_key: web.COMMON.about
                # Hakkında sayfası URL'nizle değiştirin
                :url: <%= ENV['ABOUT_URL'] %>
                :external: <%= ENV['ABOUT_EXTERNAL'] || false %>
          - :name: support
            :i18n_key: web.footer.support
            :links:
              - :text: Contact
                :i18n_key: web.footer.contact
                :url: <%= ENV['CONTACT_URL'] %>
                :external: false
    # API uç noktalarının mevcut olup olmadığını kontrol eder. Devre dışı bırakıldığında,
    # API tamamen devre dışı bırakılır. /api/* istekleri 404 döndürür.
    :api:
      :enabled: <%= ENV['API_ENABLED'] != 'false' %>
  # Gizli mesaj yönetimi için yapılandırma seçenekleri
  :secret_options:
    # Gizli mesajlar için varsayılan Yaşam Süresi (TTL) saniye cinsinden
    # Gizli mesaj oluştururken belirli bir TTL sağlanmadığında bu değer kullanılır
    :default_ttl: <%= ENV['DEFAULT_TTL'] || nil %>
    # Gizli mesaj oluşturma için mevcut TTL seçenekleri (saniye cinsinden)
    # Bu seçenekler kullanıcılara yeni gizli mesaj oluştururken sunulacaktır
    # Biçim: Saniyeleri temsil eden tam sayıların dizesi
    :ttl_options: <%= (ENV['TTL_OPTIONS'] || nil) %>
    # Gizli mesajlara erişimi koruyan güvenlik ifadesi alanı için ayarlar
    :passphrase:
      # Gizli mesaj oluştururken kullanıcıların güvenlik ifadesi girmesini zorunlu kıl
      :required: <%= ENV['PASSPHRASE_REQUIRED'] == 'true' || false %>
      # Güvenlik ifadeleri için gereken minimum karakter sayısı
      :minimum_length: <%= ENV['PASSPHRASE_MIN_LENGTH'] || 8 %>
      # Güvenlik ifadeleri için izin verilen maksimum karakter sayısı
      :maximum_length: <%= ENV['PASSPHRASE_MAX_LENGTH'] || 128 %>
      # Karmaşıklık gereksinimlerini zorunlu kıl (büyük harf, küçük harf, sayılar, semboller)
      :enforce_complexity: <%= ENV['PASSPHRASE_ENFORCE_COMPLEXITY'] == 'true' || false %>
    # Parola oluşturma ayarları (kullanıcılar "Parola Oluştur"a tıkladığında)
    :password_generation:
      # Oluşturulan parolalar için varsayılan uzunluk
      :default_length: <%= ENV['PASSWORD_GEN_LENGTH'] || 12 %>
      # Oluşturulan parolalara dahil edilecek karakter kümeleri
      :character_sets:
        # Büyük harfleri dahil et (A-Z)
        :uppercase: <%= ENV['PASSWORD_GEN_UPPERCASE'] != 'false' %>
        # Küçük harfleri dahil et (a-z)
        :lowercase: <%= ENV['PASSWORD_GEN_LOWERCASE'] != 'false' %>
        # Sayıları dahil et (0-9)
        :numbers: <%= ENV['PASSWORD_GEN_NUMBERS'] != 'false' %>
        # Sembolleri dahil et (!@#$%^&*()_+-=[]{}|;:,.<>?)
        :symbols: <%= ENV['PASSWORD_GEN_SYMBOLS'] == 'true' || false %>
        # Karışıklığı önlemek için belirsiz karakterleri hariç tut (0, O, l, 1, I)
        :exclude_ambiguous: <%= ENV['PASSWORD_GEN_EXCLUDE_AMBIGUOUS'] != 'false' %>
  # Kayıt ve Kimlik Doğrulama ayarları
  :authentication:
    # API kimlik doğrulaması dahil olmak üzere tamamen devre dışı bırakılabilir.
    :enabled: <%= ENV['AUTH_ENABLED'] != 'false' %>
    # Kullanıcıların hesap oluşturmasına izin ver. Manuel olarak hesap oluşturmayı planlıyorsanız
    # veya kurulum sırasında hesaplar oluşturulabildiğinde ve ardından yeni kullanıcıların
    # hesap oluşturmasını önlemek için devre dışı bırakıldığında bu devre dışı bırakılabilir.
    :signup: <%= ENV['AUTH_SIGNUP'] != 'false' %>
    # Genel olarak kayda izin veriyorsanız, oturum açmaya da izin verirsiniz. Ancak
    # kimlik doğrulamayı geçici olarak kapatmanın yararlı olduğu durumlar vardır.
    :signin: <%= ENV['AUTH_SIGNIN'] != 'false' %>
    # Varsayılan olarak, yeni hesapların oturum açabilmeleri için e-posta adreslerini
    # doğrulamaları gerekir. Bu, spam ve sistem kötüye kullanımını önlemek için bir
    # güvenlik önlemidir. Özel bir örnek veya ekibiniz veya şirketiniz için bir örnek
    # çalıştırıyorsanız, kullanıcıların oturum açmasını kolaylaştırmak için bu özelliği
    # devre dışı bırakabilirsiniz.
    :autoverify: <%= ENV['AUTH_AUTOVERIFY'] == 'true' || false %>
    # Etkinleştirildiğinde, kullanıcı oturum açmadıkça ana sayfa gizli mesaj formu
    # kullanılamaz. Devre dışı bırakılmış bir ana sayfaya benzer, ancak yine de
    # logo ve gezinme bağlantıları olan başlığı gösterir. Bu, yalnızca kimliği
    # doğrulanmış kullanıcıların site gezinmesini ve markalamasını korurken
    # gizli mesaj oluşturabileceği daha kısıtlayıcı bir mod sağlar.
    :required: <%= ENV['AUTH_REQUIRED'] == 'true' %>
    # Aşağıda listelenen e-posta adresleri, hesap oluşturulduğunda otomatik
    # yönetici ayrıcalıkları verilecektir. Bu hesaplar temel sistem
    # istatistiklerini gösteren bir sayfaya erişebilir.
    # "Admin" yerine "colonel" terimi kullanılır. "Colonel" (ki
    # "kernel" olarak telaffuz edilir) hem bir Linux sisteminin korunan
    # çekirdeğine hem de bir askeri rütbeye atıfta bulunur ve yüksek düzeyde
    # erişim izinlerini sembolize eder. Bu adlandırma, yaygın yönetici
    # URL'lerini veya rol adlarını hedefleyen temel, otomatik saldırılardan
    # kaçınmaya yardımcı olur.
    :colonels:
      - <%= ENV['COLONEL'] || 'CHANGEME@example.com' %>
  # Geri bildirim formunu botlardan ve diğer saçmalıklardan koruyan
  # captcha benzeri bir özellik.
  :authenticity:
    :type: <%= ENV['AUTHENTICITY_TYPE'] || 'altcha' %>
    :secret_key: <%= ENV['AUTHENTICITY_SECRET_KEY'] || '<REPLACE_WITH_STRONG_HMAC_KEY>' %>
  # Dokümantasyona bağlantılar. onetimesecret.com için bu,
  # docs.onetimesecret.com'dur.
  :support:
    :host: <%= ENV['SUPPORT_HOST'] || nil %>
  :plans:
    :enabled: <%= ENV['PLANS_ENABLED'] == 'true' || false %>
    :stripe_key: <%= ENV['STRIPE_KEY'] || nil %>
```

Yapılandırmanın geri kalanı için lütfen [config.example.yaml](https://raw.githubusercontent.com/onetimesecret/onetimesecret/refs/tags/v0.22.4/etc/config.example.yaml) dosyasına bakın.
