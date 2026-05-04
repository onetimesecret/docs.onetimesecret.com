---
title: Başlangıç
description: Kendi sunucunuzda barındırılan Onetime Secret örneğinizi çalıştırmak için hızlı kurulum kılavuzu
sidebar:
  order: 2
---

Bu kılavuz, dakikalar içinde kendi sunucunuzda barındırılan bir Onetime Secret örneği çalıştırmanızı sağlayacaktır.

## Ön Koşullar

- Optimal performans için **1GB+ RAM**
- **Redis depolama notu**: Redis yapılandırmanıza bağlı olarak, gizli mesajlar gelişmiş güvenlik için diske hiç yazılmadan tamamen bellekte saklanabilir

## Yöntem 1: Docker (Önerilen)

Başlamanın en hızlı yolu, minimum yapılandırmayla Docker kullanmaktır.

### 1. Redis'i Başlatın

```bash
docker run -p 6379:6379 -d redis:bookworm
```

### 2. Gizli Anahtar Oluşturun

```bash
# Kalıcı bir gizli anahtar oluşturun ve saklayın
openssl rand -hex 32 > .ots_secret
chmod 600 .ots_secret
echo "Gizli anahtar .ots_secret dosyasına kaydedildi (bu dosyayı güvende tutun!)"
```

### 3. Onetime Secret'ı Çalıştırın

```bash
# Gizli anahtarı kullanarak konteyneri çalıştırın
docker run -p 3000:3000 -d \
  -e REDIS_URL=redis://host.docker.internal:6379/0 \
  -e SECRET="$(cat .ots_secret)" \
  -e HOST=localhost:3000 \
  -e SSL=false \
  -e RACK_ENV=production \
  onetimesecret/onetimesecret:latest
```

### 4. Örneğinize Erişin

Tarayıcınızda açın:
- **Web Arayüzü**: http://localhost:3000
- **API Uç Noktası**: http://localhost:3000/api/v2/status

## Yöntem 2: Manuel Kurulum

Manuel kurulumu tercih edenler için şunlara ihtiyacınız olacak:

- **Ruby 3.2+** (varsayılan sistem paketlerinde mevcut olmayabilir)
- **Redis 5+** veya **Valkey** (Redis alternatifi)
- **Node.js 22+** ve **pnpm** (yalnızca geliştirme ve ön uç varlıklarını oluşturmak için gereklidir)

Uygulamayı çalıştırmadan önce `pnpm install && pnpm run build:local` ile ön uç varlıklarını oluşturmanız gerekir.

Eksiksiz manuel kurulum ayrıntıları için [INSTALL.md](https://github.com/onetimesecret/onetimesecret/blob/main/INSTALL.md) dosyasına bakın.

## Doğrulama

1. http://localhost:3000 adresine gidin
2. Her şeyin çalıştığını doğrulamak için bir test gizli mesajı oluşturun
3. http://localhost:3000/api/v2/status adresinde API durumunu kontrol edin

## Yönetici Kurulumu

Bir yönetici kullanıcı oluşturmak için, yapılandırma dosyanızdaki `:colonels:` bölümüne e-posta adreslerini ekleyin, ardından otomatik olarak yönetici erişimi almak için bu e-postalardan biriyle kaydolun.

**Not**: Yönetici alanı şu anda sınırlı işlevselliğe sahiptir - kullanıcı yönetimi olmayan salt okunur yapılandırma görüntüleme. Gelecek sürümler için daha fazla özellik planlanmıştır.

## Sonraki Adımlar

Artık örneğiniz çalışıyor:

1. **[Dağıtımınızı yapılandırın](./installation)** üretim kullanımı için
2. **[Yapılandırma seçeneklerini inceleyin](./configuration)** özelleştirme için

## Yardım Alma

- **Dokümantasyon**: [Yapılandırma referansımıza](./configuration) göz atın
- **Topluluk**: [GitHub](https://github.com/onetimesecret/onetimesecret/discussions) üzerindeki tartışmalara katılın
- **Sorunlar**: Hataları [sorun izleyicimizde](https://github.com/onetimesecret/onetimesecret/issues) bildirin
