---
title: Kendi Sunucunuzda Barındırma Genel Bakış
description: Kendi Onetime Secret örneğinizi çalıştırmak için eksiksiz kılavuz
sidebar:
  order: 1
---

Verileriniz, güvenliğiniz ve dağıtımınız üzerinde tam kontrolle kendi özel Onetime Secret örneğinizi çalıştırın.

## Neden Kendi Sunucunuzda Barındırmalısınız?

Onetime Secret'ı kendi sunucunuzda barındırmak size şunları sağlar:

- **Tam veri kontrolü** - Tüm gizli mesajlar altyapınızda ve ağınızda kalır
- **Özel güvenlik politikaları** - Kimlik doğrulama, gizlilik seçenekleri ve erişim kontrollerini yapılandırın
- **Uyumluluk** - Veri işleme için düzenleyici gereksinimleri karşılayın
- **Özel markalama** - Arayüzü kuruluşunuz için özelleştirin

## Hızlı Başlangıç Seçenekleri

Ortamınıza en uygun dağıtım yöntemini seçin:

### Docker (Önerilen)
```bash
# Redis ve Onetime Secret'ı başlat
docker run -p 6379:6379 -d redis:bookworm
docker run -p 3000:3000 -d \
  -e REDIS_URL=redis://host.docker.internal:6379/0 \
  -e SECRET="$(openssl rand -hex 32)" \
  onetimesecret/onetimesecret:latest
```

`http://localhost:3000` adresinden erişin.

### Manuel Kurulum
Özel yapılandırmalar gerektiren üretim ortamları için.

Ayrıntılı adımlar için [Kurulum ve Dağıtım](./self-hosting/installation) kılavuzumuza bakın.

## Neler Dahil

Kendi sunucunuzda barındırılan örneğiniz şunları içerir:

- **Web arayüzü** - Gizli mesaj oluşturma ve paylaşma için tam özellikli UI
- **REST API** - Entegrasyonlar için programatik erişim
- **Çoklu dil desteği** - 12+ dilde mevcut
- **Özel alan adları** - Kendi alan adınızı ve markanızı kullanın


## Sistem Gereksinimleri

**Önerilen:**
- 2+ CPU çekirdeği
- 2GB+ RAM
- 10GB+ disk alanı
- Oturum depolama için Redis
- Node.js 22+ (geliştirme için)

## Sonraki Adımlar

1. **[Başlangıç](./self-hosting/getting-started)** - Adım adım kurulum kılavuzu
2. **[Kurulum ve Dağıtım](./self-hosting/installation)** - Ayrıntılı dağıtım seçenekleri
3. **[Yapılandırma Referansı](./self-hosting/configuration)** - Eksiksiz ayarlar dokümantasyonu

---

_Başlamaya hazır mısınız? [Başlangıç](./self-hosting/getting-started) kılavuzumuzu izleyin._
