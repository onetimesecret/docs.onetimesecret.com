---
title: Kurulum ve Dağıtım
description: Onetime Secret'ın üretim dağıtımı için kapsamlı kılavuz
sidebar:
  order: 3
---

Bu kılavuz, kendi sunucunuzda barındırılan Onetime Secret örnekleri için dağıtım seçeneklerini kapsar.

## Dağıtım Seçenekleri

### Docker Dağıtımı

Docker, en güvenilir ve taşınabilir dağıtım yöntemini sağlar.

#### Docker Compose Kullanımı

Eksiksiz altyapı yönetimi için özel Docker Compose deposunu kullanın:

**Depo**: https://github.com/onetimesecret/docker-compose/

**Hızlı kurulum:**
```bash
git clone https://github.com/onetimesecret/docker-compose.git
cd docker-compose
docker-compose up -d
```

**Manuel Docker Compose kurulumu:**

```yaml
# docker-compose.yml
version: '3.8'

services:
  onetime:
    image: onetimesecret/onetimesecret:latest
    ports:
      - "3000:3000"
    environment:
      - REDIS_URL=redis://redis:6379/0
      - SECRET=${SECRET}
      - HOST=${HOST:-localhost:3000}
      - SSL=${SSL:-false}
      - RACK_ENV=production
    depends_on:
      - redis
    volumes:
      - ./etc:/app/etc
      - ./logs:/app/logs

  redis:
    image: redis:bookworm
    volumes:
      - redis_data:/data
    command: redis-server --requirepass ${REDIS_PASSWORD}

volumes:
  redis_data:
```

**Ortam dosyası (.env):**
```bash
SECRET=your-secure-32-character-hex-key
REDIS_PASSWORD=your-redis-password
HOST=your-domain.com
SSL=true
```

### Manuel Kurulum

Özel yapılandırmalar veya mevcut altyapı gerektiren ortamlar için.

#### Bağımlılıkları Yükleme

**Ubuntu 22.04 LTS:**
```bash
# Sistemi güncelle
sudo apt update && sudo apt upgrade -y

# Ruby ve derleme araçlarını yükle
sudo apt install -y ruby ruby-dev build-essential git
sudo gem install bundler

# Redis'i yükle
sudo apt install -y redis-server
sudo systemctl enable redis-server
sudo systemctl start redis-server

# Node.js'i yükle (geliştirme ve ön uç varlıklarını oluşturmak için)
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pnpm@latest
```

**CentOS/RHEL 8:**
```bash
# PowerTools/CodeReady deposunu etkinleştir
sudo dnf install -y dnf-plugins-core
sudo dnf config-manager --set-enabled powertools

# Ruby ve geliştirme araçlarını yükle
sudo dnf groupinstall -y "Development Tools"
sudo dnf install -y ruby ruby-devel git
sudo gem install bundler

# Redis'i yükle
sudo dnf install -y redis
sudo systemctl enable redis
sudo systemctl start redis
```

#### Uygulama Kurulumu

```bash
# Uygulama kullanıcısı oluştur
sudo useradd -r -m -s /bin/bash onetime

# Uygulama kullanıcısına geç
sudo su - onetime

# Depoyu klonla
git clone https://github.com/onetimesecret/onetimesecret.git
cd onetimesecret

# Bağımlılıkları yükle
bundle install --deployment --without development test

# Ortamı kopyala ve yapılandır
cp .env.example .env
cp ./etc/config.example.yaml ./etc/config.yaml

# Sürüm takibi için commit hash oluştur
git rev-parse --short HEAD > .commit_hash.txt
```

## Ters Proxy Yapılandırması

Bu yapılandırma örnekleri başlamanıza yardımcı olabilir, ancak bunları özel ihtiyaçlarınıza uyacak şekilde ayarlamalısınız.

### Nginx

**Temel Yapılandırma:**

```nginx
# /etc/nginx/sites-available/onetime
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com;

    # SSL Yapılandırması
    ssl_certificate /path/to/your/cert.pem;
    ssl_certificate_key /path/to/your/key.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512;

    # Güvenlik başlıkları
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options DENY always;
    add_header X-Content-Type-Options nosniff always;

    # Oluşturulmuş ön uçtan statik dosyalar
    location /dist/ {
        root /app/public;
        expires 1y;
        add_header Cache-Control "public, immutable";
        try_files $uri $uri/ =404;
    }

    # Arka uca API istekleri
    location /api/ {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Diğer tüm istekler arka uca
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # WebSocket desteği
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

**Siteyi etkinleştir:**
```bash
sudo ln -s /etc/nginx/sites-available/onetime /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### Caddy

Caddy otomatik HTTPS ve daha basit yapılandırma sağlar:

```caddyfile
# /etc/caddy/Caddyfile
your-domain.com {
    # Oluşturulmuş ön uçtan statik dosyaları işle
    handle /dist/* {
        root * /app/public
        file_server
    }

    # Arka uca API istekleri
    handle /api/* {
        reverse_proxy 127.0.0.1:3000
    }

    # Diğer tüm istekler arka uca (sunucu tarafından oluşturulan sayfalar için)
    handle {
        reverse_proxy 127.0.0.1:3000
    }
}
```

### Apache

```apache
# /etc/apache2/sites-available/onetime.conf
<VirtualHost *:80>
    ServerName your-domain.com
    Redirect permanent / https://your-domain.com/
</VirtualHost>

<VirtualHost *:443>
    ServerName your-domain.com

    # SSL Yapılandırması
    SSLEngine on
    SSLCertificateFile /path/to/your/cert.pem
    SSLCertificateKeyFile /path/to/your/key.pem

    # Güvenlik başlıkları
    Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
    Header always set X-Frame-Options DENY
    Header always set X-Content-Type-Options nosniff

    # Oluşturulmuş ön uçtan statik dosyalar
    Alias /dist /app/public/dist
    <Directory /app/public/dist>
        Require all granted
        ExpiresActive On
        ExpiresDefault "access plus 1 year"
    </Directory>

    # API ve uygulama istekleri arka uca
    ProxyPreserveHost On
    ProxyPass /dist !
    ProxyPass / http://127.0.0.1:3000/
    ProxyPassReverse / http://127.0.0.1:3000/
</VirtualHost>
```

## SSL/TLS Yapılandırması

### Let's Encrypt (Certbot)

**Certbot'u Yükle:**
```bash
# Ubuntu/Debian
sudo apt install certbot python3-certbot-nginx

# CentOS/RHEL
sudo dnf install certbot python3-certbot-nginx
```

**Sertifika Oluştur:**
```bash
# Nginx için
sudo certbot --nginx -d your-domain.com

# Apache için
sudo certbot --apache -d your-domain.com

# Manuel sertifika (özel proxy yapılandırması kullanıyorsanız)
sudo certbot certonly --webroot -w /var/www/html -d your-domain.com
```

**Otomatik yenileme:**
```bash
# Crontab'a ekle
echo "0 12 * * * /usr/bin/certbot renew --quiet" | sudo tee -a /etc/crontab
```

### Özel SSL Sertifikaları

Sertifikalarınızı yerleştirin ve proxy yapılandırmasındaki yolları güncelleyin:

```bash
# Sertifika dosyaları
/etc/ssl/certs/your-domain.com.crt
/etc/ssl/private/your-domain.com.key

# Uygun izinleri ayarla
sudo chmod 600 /etc/ssl/private/your-domain.com.key
sudo chmod 644 /etc/ssl/certs/your-domain.com.crt
```


### Redis Yapılandırması

**Seçenek 1: Yalnızca bellek (maksimum güvenlik için asla diske kaydetme):**

```conf
# /etc/redis/redis.conf

# Bellek optimizasyonu
maxmemory 1gb
maxmemory-policy allkeys-lru

# Güvenlik - gizli mesajlar asla diske yazılmaz
save ""  # Tüm otomatik kayıtları devre dışı bırak
appendonly no  # AOF günlüğünü devre dışı bırak

# Güvenlik
requirepass your_redis_password
bind 127.0.0.1

# Performans
tcp-keepalive 60
timeout 300
```

**Seçenek 2: Disk kalıcılığı (yedeklemeleri etkinleştirir ancak gizli mesajları diske yazar):**

```conf
# /etc/redis/redis.conf

# Bellek optimizasyonu
maxmemory 1gb
maxmemory-policy allkeys-lru

# RDB anlık görüntüleri - dump.rdb dosyaları oluşturur
save 900 1    # 900 saniyede en az 1 anahtar değiştiyse kaydet
save 300 10   # 300 saniyede en az 10 anahtar değiştiyse kaydet
save 60 10000 # 60 saniyede en az 10000 anahtar değiştiyse kaydet

# AOF günlüğü - zaman içinde kurtarma için appendonly.aof dosyaları oluşturur
appendonly yes
appendfsync everysec  # Her saniye diske senkronize et

# Güvenlik
requirepass your_redis_password
bind 127.0.0.1

# Performans
tcp-keepalive 60
timeout 300
```

**Önemli**: Disk kalıcılığı etkinleştirildiğinde, gizli mesajlar şunlara yazılacaktır:
- `dump.rdb` dosyaları (aralıklarla anlık görüntüler)
- `appendonly.aof` dosyaları (sürekli ekleme günlüğü)

Güvenlik ve yedekleme gereksinimlerinize göre seçim yapın.

**Redis'i Yeniden Başlat:**
```bash
sudo systemctl restart redis
```

#### Redis Yedeklemeleri

**Redis:**
```bash
#!/bin/bash
# Redis yedekleme betiği
BACKUP_DIR="/var/backups/onetime"
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p $BACKUP_DIR

# Yedek oluştur
redis-cli -a "$REDIS_PASSWORD" --rdb $BACKUP_DIR/redis_$DATE.rdb

# Eski yedekleri temizle
find $BACKUP_DIR -name "redis_*.rdb" -mtime +7 -delete
```

## Sonraki Adımlar

Başarılı dağıtımdan sonra:

1. **[Örneğinizi yapılandırın](./configuration)** özel ayarlarla
2. **İzleme ve uyarı kurun** üretim operasyonları için
3. **Güvenlik ayarlarını inceleyin** ve ek korumalar etkinleştirin
4. **Yedekleme otomasyonunu yapılandırın** ve kurtarma prosedürlerini test edin
5. **Özel alan adları kurun** kuruluşunuz için

Onetime Secret örneğiniz artık üretim kullanımına hazır!
