---
title: Kendi Sunucunuzda Barındırma Genel Bakış
description: Kendi Onetime Secret örneğinizi çalıştırmak için eksiksiz kılavuz
sidebar:
  order: 1
---

Verileriniz, güvenliğiniz ve dağıtımınız üzerinde tam kontrolle kendi özel Onetime Secret örneğinizi çalıştırın.

:::tip[Mevcut sürüm: v0.26]
Mevcut kararlı sürüm **v0.26** (`main` dalı) sürümüdür. İki modda çalışır:

- **Basit mod** — en kolay yol. Yalnızca Redis ve birkaç ortam değişkenine ihtiyaç duyar. Hesaplar her zaman olduğu gibi çalışır. Aşağıdaki [Hızlı Başlangıç](#hızlı-başlangıç-seçenekleri) bölümünden başlayın.
- **Tam mod** — PostgreSQL ve RabbitMQ tarafından desteklenen hesap özelliklerini (MFA, SSO, WebAuthn, organizasyonlar) ekler.

v0.22 veya v0.23'ten geliyorsanız, yapılandırma ve veri modeli değişikliklerini ve bir kimlik doğrulama modu seçmeyi ele alan [v0.24+ Sürümüne Yükseltme](./upgrading-v0-24) kılavuzunu izleyin.
:::


## Neden Kendi Sunucunuzda Barındırmalısınız?

Onetime Secret'i kendi sunucunuzda barındırmak size şunları sağlar:

- **Tam veri kontrolü** - Tüm gizli mesajlar altyapınızda ve ağınızda kalır
- **Özel güvenlik politikaları** - Kimlik doğrulama, gizlilik seçenekleri ve erişim kontrollerini yapılandırın
- **Uyumluluk** - Veri işleme için düzenleyici gereksinimleri karşılayın
- **Özel markalama** - Arayüzü kuruluşunuz için özelleştirin

## Hızlı Başlangıç Seçenekleri

Ortamınıza en uygun dağıtım yöntemini seçin:

### Docker (Önerilen)
```bash
# Redis ve Onetime Secret'i başlat
docker run -p 6379:6379 -d redis:bookworm
docker run -p 3000:3000 -d \
  -e REDIS_URL=redis://host.docker.internal:6379/0 \
  -e SECRET="$(openssl rand -hex 32)" \
  onetimesecret/onetimesecret:v0.26.4
```

`http://localhost:3000` adresinden erişin.

### Manuel Kurulum
Özel yapılandırmalar gerektiren üretim ortamları için.

Ayrıntılı adımlar için [Kurulum ve Dağıtım](./installation) kılavuzumuza bakın.

## Neler Dahil

Kendi sunucunuzda barındırılan örneğiniz şunları içerir:

- **Web arayüzü** - Gizli mesaj oluşturma ve paylaşma için tam özellikli UI
- **REST API** - Entegrasyonlar için programatik erişim
- **Çoklu dil desteği** - 17 dilde mevcut
- **Özel alan adları** - Kendi alan adınızı ve markanızı kullanın


## Sistem Gereksinimleri

**Önerilen:**
- 2+ CPU çekirdeği
- 2GB+ RAM
- 10GB+ disk alanı
- Oturum depolama için Redis
- Node.js 22+ (geliştirme için)

## Sonraki Adımlar

1. **[Başlangıç](./getting-started)** - Adım adım kurulum kılavuzu
2. **[Kurulum ve Dağıtım](./installation)** - Ayrıntılı dağıtım seçenekleri
3. **[Yapılandırma Referansı](./configuration)** - Eksiksiz ayarlar dokümantasyonu

---

_Başlamaya hazır mısınız? [Başlangıç](./getting-started) kılavuzumuzu izleyin._
