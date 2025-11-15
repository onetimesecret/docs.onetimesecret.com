---
title: Ortam Değişkenleri Referansı
description: Onetime Secret ortam değişkenleri için referans
sidebar:
  order: 5
---

Bu kılavuz, Onetime Secret v0.22.4+ sürümünde mevcut tüm ortam değişkenlerini kapsar.


## Ortam Değişkenleri

Bunları `.env` dosyanızda veya ortamınızda ayarlayın veya docker komutlarınıza veya docker-compose.yml dosyanıza ekleyin. Gerekli olarak işaretlenmedikçe tüm değişkenler isteğe bağlıdır.

### Temel Uygulama Ayarları

```bash
SECRET=your-32-char-hex-key           # Oturumlar ve şifreleme için gizli anahtar (GEREKLİ) - Ayarladıktan sonra DEĞİŞTİRMEYİN
PORT=3000                             # Web sunucusunun dinleyeceği port (varsayılan: 3000)
HOST=localhost:3000                   # Bağlantılar oluştururken kullanılan host ve port kombinasyonu
SSL=true                              # Bağlantılar oluştururken https/http'yi kontrol eder (true/false)
SERVER_TYPE=thin                      # Web sunucu türü: thin, puma
RACK_ENV=production                   # Uygulama ortamı: development, production, test
```

### Veritabanı ve Depolama

NOT: REDIS_ ile başlayan değişkenler alternatif olarak VALKEY_ önekiyle ayarlanabilir.

```bash
REDIS_URL=redis://localhost:6379/0   # Oturumlar, gizli mesajlar ve tüm uygulama verileri için Redis bağlantı dizesi
```

### Kimlik Doğrulama ve Güvenlik

```bash
AUTH_ENABLED=true                     # Kimlik doğrulama sistemini etkinleştir (false olduğunda API kimlik doğrulamasını devre dışı bırakır)
AUTH_SIGNUP=true                      # Yeni kullanıcı kaydına izin ver
AUTH_SIGNIN=true                      # Mevcut kullanıcıların oturum açmasına izin ver
AUTH_AUTOVERIFY=false                 # Yeni hesaplar için e-posta doğrulamasını atla
COLONEL=email@example.com             # "Colonel" ayrıcalıkları verilen yönetici e-posta adresleri (virgülle ayrılmış)
```

**Not**: "Colonel", "yönetici" kullanıcılar için kullandığımız terimdir. Colonels, temel sistem istatistiklerini gösteren `/colonel` adresindeki yönetici alanına erişebilir. Yönetici arayüzünün şu anda sınırlı işlevselliği vardır - kullanıcı yönetimi yok ve yalnızca salt okunur yapılandırma görüntüleme.

### Kullanıcı Arayüzü ve Özellikler

```bash
UI_ENABLED=true                       # Web kullanıcı arayüzünü etkinleştir (devre dışı bırakıldığında minimal sayfa gösterir)
API_ENABLED=true                      # REST API uç noktalarını etkinleştir (devre dışı bırakıldığında 404 döndürür)
CSP_ENABLED=true                      # İçerik Güvenlik Politikası başlıklarını etkinleştir
HEADER_ENABLED=true                   # Markalama ile site başlığını göster
HEADER_NAV_ENABLED=true               # Başlıkta gezinme bağlantılarını göster
HEADER_PREFIX=
DOMAINS_ENABLED=false                 # Özel alan adı desteğini etkinleştir
REGIONS_ENABLED=false                 # Çoklu bölge dağıtım desteğini etkinleştir. Bu uygulamanın
                                      # işlevselliğini etkilemez. Ancak diğer bölgelere bağlantı
                                      # için UI bileşenlerini etkinleştirir.
```

### Markalama ve İçerik

```bash
LOGO_URL=                            # Özel logo resmine URL (yerleşik logoya geri döner)
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

### E-posta Gönderme

```bash
EMAILER_MODE=smtp                    # E-posta hizmeti modu (smtp, sendgrid, vb.)
EMAILER_REGION=                      # E-posta hizmeti bölgesi (bulut sağlayıcılar için)
FROM_EMAIL=noreply@localhost         # Varsayılan gönderen e-posta adresi
FROM=                                # Gönderen adı (FROMNAME'e alternatif)
FROMNAME=                            # Gönderen için görünen ad
SMTP_HOST=                           # SMTP sunucu ana bilgisayar adı
SMTP_PORT=587                        # SMTP sunucu portu (genellikle TLS için 587, düz metin için 25)
SMTP_USERNAME=                       # SMTP kimlik doğrulama kullanıcı adı
SMTP_PASSWORD=                       # SMTP kimlik doğrulama parolası
SMTP_TLS=true                        # SMTP için TLS şifrelemesini etkinleştir
SMTP_AUTH=login                      # SMTP kimlik doğrulama yöntemi (login, plain, vb.)
```

### Gizli Mesajlar ve TTL

```bash
DEFAULT_TTL=604800                   # Varsayılan gizli mesaj sona erme süresi saniye cinsinden (604800 = 7 gün)
TTL_OPTIONS=300,1800,3600,86400      # Kullanıcılara sunulan mevcut TTL seçenekleri, virgülle ayrılmış (saniye)
DEFAULT_DOMAIN=                      # Gizli mesaj bağlantıları için varsayılan alan adı (boşsa HOST kullanır)
ALLOW_NIL_GLOBAL_SECRET=false        # Eksik SECRET anahtarıyla çalışmaya izin ver (acil durum kurtarma)
```


### E-posta Adreslerini Doğrulama

E-posta adresi doğrulaması, regex, MX kaydı araması ve SMTP doğrulaması dahil olmak üzere birden fazla doğrulama türünü destekleyen [Truemail kütüphanesi](https://github.com/truemail-rb/truemail) tarafından işlenir.

```bash
VERIFIER_DOMAIN=                     # SMTP doğrulaması için alan adı (SMTP doğrulaması için gerekli)
VERIFIER_EMAIL=                      # SMTP doğrulaması için e-posta adresi (SMTP doğrulaması için gerekli)
```

**Not**: `truemail:` bölümü altındaki YAML yapılandırmasında doğrulama türleri, zaman aşımı ayarları, izin verilen/engellenmiş alan adları, DNS sunucuları ve daha fazlası dahil olmak üzere birçok ek Truemail yapılandırma seçeneği mevcuttur. Tam yapılandırma için `config/config.yaml` dosyasına bakın.

### Uluslararasılaştırma

```bash
I18N_ENABLED=true                    # Uluslararasılaştırmayı etkinleştir
I18N_DEFAULT_LOCALE=en               # Varsayılan dil yereli
```

### Geliştirme ve Hata Ayıklama

```bash
ONETIME_DEBUG=false                  # Hata ayıklama modunu etkinleştir
LOG_HTTP_REQUESTS=false              # HTTP isteklerini günlüğe kaydet
STDOUT_SYNC=true                     # Stdout çıktısını senkronize et
DIAGNOSTICS_ENABLED=false            # Tanılamayı etkinleştir
FRONTEND_HOST=http://localhost:5173  # Ön uç geliştirme sunucusu URL'si (yalnızca geliştirme)
VITE_API_BASE_URL=                   # Vite API temel URL geçersiz kılma
```

### İzleme ve Hata Takibi

Sentry yapılandırması hakkında daha fazla bilgi için [sentry belgelerine](https://docs.sentry.io/platforms/ruby/) bakın.

```bash
SENTRY_DSN=
SENTRY_DSN_BACKEND=
SENTRY_DSN_FRONTEND=
SENTRY_LOG_ERRORS=true
SENTRY_MAX_BREADCRUMBS=50
SENTRY_SAMPLE_RATE=1.0
SENTRY_VUE_TRACK_COMPONENTS=true
```
