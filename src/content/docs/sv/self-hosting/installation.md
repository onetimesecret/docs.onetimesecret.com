---
title: Installation & distribution
description: Omfattande guide för produktionsdistribution av Onetime Secret
sidebar:
  order: 3
---

Denna guide täcker distributionsalternativ för självhostade Onetime Secret-instanser.

## Distributionsalternativ

### Docker-distribution

Docker tillhandahåller den mest tillförlitliga och portabla distributionsmetoden.

#### Använda Docker Compose

För komplett infrastrukturhantering, använd det dedikerade Docker Compose-repositoriet:

**Repository**: https://github.com/onetimesecret/docker-compose/

**Snabb installation:**
```bash
git clone https://github.com/onetimesecret/docker-compose.git
cd docker-compose
docker-compose up -d
```

**Manuell Docker Compose-installation:**

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

**Miljöfil (.env):**
```bash
SECRET=your-secure-32-character-hex-key
REDIS_PASSWORD=your-redis-password
HOST=your-domain.com
SSL=true
```

### Manuell installation

För miljöer som kräver anpassade konfigurationer eller befintlig infrastruktur.

#### Installera beroenden

**Ubuntu 22.04 LTS:**
```bash
# Uppdatera system
sudo apt update && sudo apt upgrade -y

# Installera Ruby och byggverktyg
sudo apt install -y ruby ruby-dev build-essential git
sudo gem install bundler

# Installera Redis
sudo apt install -y redis-server
sudo systemctl enable redis-server
sudo systemctl start redis-server

# Installera Node.js (för utveckling och byggande av frontend-tillgångar)
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pnpm@latest
```

**CentOS/RHEL 8:**
```bash
# Aktivera PowerTools/CodeReady-repository
sudo dnf install -y dnf-plugins-core
sudo dnf config-manager --set-enabled powertools

# Installera Ruby och utvecklingsverktyg
sudo dnf groupinstall -y "Development Tools"
sudo dnf install -y ruby ruby-devel git
sudo gem install bundler

# Installera Redis
sudo dnf install -y redis
sudo systemctl enable redis
sudo systemctl start redis
```

#### Applikationsinställning

```bash
# Skapa applikationsanvändare
sudo useradd -r -m -s /bin/bash onetime

# Växla till applikationsanvändare
sudo su - onetime

# Klona repository
git clone https://github.com/onetimesecret/onetimesecret.git
cd onetimesecret

# Installera beroenden
bundle install --deployment --without development test

# Kopiera och konfigurera miljö
cp .env.example .env
cp ./etc/config.example.yaml ./etc/config.yaml

# Skapa commit hash för versionsspårning
git rev-parse --short HEAD > .commit_hash.txt
```

## Konfiguration av omvänd proxy

Dessa konfigurationsexempel kan hjälpa dig komma igång, men du bör justera dem för att passa dina specifika behov.

### Nginx

**Grundläggande konfiguration:**

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

    # SSL-konfiguration
    ssl_certificate /path/to/your/cert.pem;
    ssl_certificate_key /path/to/your/key.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512;

    # Säkerhetshuvuden
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options DENY always;
    add_header X-Content-Type-Options nosniff always;

    # Statiska filer från byggd frontend
    location /dist/ {
        root /app/public;
        expires 1y;
        add_header Cache-Control "public, immutable";
        try_files $uri $uri/ =404;
    }

    # API-förfrågningar till backend
    location /api/ {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Alla andra förfrågningar till backend
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # WebSocket-stöd
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

**Aktivera webbplatsen:**
```bash
sudo ln -s /etc/nginx/sites-available/onetime /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### Caddy

Caddy tillhandahåller automatisk HTTPS och enklare konfiguration:

```caddyfile
# /etc/caddy/Caddyfile
your-domain.com {
    # Hantera statiska filer från byggd frontend
    handle /dist/* {
        root * /app/public
        file_server
    }

    # API-förfrågningar till backend
    handle /api/* {
        reverse_proxy 127.0.0.1:3000
    }

    # Alla andra förfrågningar till backend (för server-renderade sidor)
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

    # SSL-konfiguration
    SSLEngine on
    SSLCertificateFile /path/to/your/cert.pem
    SSLCertificateKeyFile /path/to/your/key.pem

    # Säkerhetshuvuden
    Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
    Header always set X-Frame-Options DENY
    Header always set X-Content-Type-Options nosniff

    # Statiska filer från byggd frontend
    Alias /dist /app/public/dist
    <Directory /app/public/dist>
        Require all granted
        ExpiresActive On
        ExpiresDefault "access plus 1 year"
    </Directory>

    # API och app-förfrågningar till backend
    ProxyPreserveHost On
    ProxyPass /dist !
    ProxyPass / http://127.0.0.1:3000/
    ProxyPassReverse / http://127.0.0.1:3000/
</VirtualHost>
```

## SSL/TLS-konfiguration

### Let's Encrypt (Certbot)

**Installera Certbot:**
```bash
# Ubuntu/Debian
sudo apt install certbot python3-certbot-nginx

# CentOS/RHEL
sudo dnf install certbot python3-certbot-nginx
```

**Generera certifikat:**
```bash
# För Nginx
sudo certbot --nginx -d your-domain.com

# För Apache
sudo certbot --apache -d your-domain.com

# Manuellt certifikat (om du använder anpassad proxykonfiguration)
sudo certbot certonly --webroot -w /var/www/html -d your-domain.com
```

**Automatisk förnyelse:**
```bash
# Lägg till i crontab
echo "0 12 * * * /usr/bin/certbot renew --quiet" | sudo tee -a /etc/crontab
```

### Anpassade SSL-certifikat

Placera dina certifikat och uppdatera sökvägar i proxykonfiguration:

```bash
# Certifikatfiler
/etc/ssl/certs/your-domain.com.crt
/etc/ssl/private/your-domain.com.key

# Ställ in korrekta behörigheter
sudo chmod 600 /etc/ssl/private/your-domain.com.key
sudo chmod 644 /etc/ssl/certs/your-domain.com.crt
```

### Redis-konfiguration

**Alternativ 1: Endast minne (aldrig spara till disk för maximal säkerhet):**

```conf
# /etc/redis/redis.conf

# Minnesoptimering
maxmemory 1gb
maxmemory-policy allkeys-lru

# Säkerhet - hemligheter skrivs aldrig till disk
save ""  # Inaktivera alla automatiska sparningar
appendonly no  # Inaktivera AOF-loggning

# Säkerhet
requirepass your_redis_password
bind 127.0.0.1

# Prestanda
tcp-keepalive 60
timeout 300
```

**Alternativ 2: Diskpersistens (möjliggör säkerhetskopior men skriver hemligheter till disk):**

```conf
# /etc/redis/redis.conf

# Minnesoptimering
maxmemory 1gb
maxmemory-policy allkeys-lru

# RDB-ögonblicksbilder - skapar dump.rdb-filer
save 900 1    # Spara om minst 1 nyckel ändrades på 900 sekunder
save 300 10   # Spara om minst 10 nycklar ändrades på 300 sekunder
save 60 10000 # Spara om minst 10000 nycklar ändrades på 60 sekunder

# AOF-loggning - skapar appendonly.aof-filer för point-in-time-återställning
appendonly yes
appendfsync everysec  # Synka till disk varje sekund

# Säkerhet
requirepass your_redis_password
bind 127.0.0.1

# Prestanda
tcp-keepalive 60
timeout 300
```

**Viktigt**: Med diskpersistens aktiverad kommer hemligheter att skrivas till:
- `dump.rdb`-filer (ögonblicksbilder vid intervaller)
- `appendonly.aof`-filer (kontinuerlig append-logg)

Välj baserat på dina säkerhets- kontra säkerhetskopieringskrav.

**Starta om Redis:**
```bash
sudo systemctl restart redis
```

#### Redis-säkerhetskopior

**Redis:**
```bash
#!/bin/bash
# Redis säkerhetskopieringsskript
BACKUP_DIR="/var/backups/onetime"
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p $BACKUP_DIR

# Skapa säkerhetskopia
redis-cli -a "$REDIS_PASSWORD" --rdb $BACKUP_DIR/redis_$DATE.rdb

# Rensa gamla säkerhetskopior
find $BACKUP_DIR -name "redis_*.rdb" -mtime +7 -delete
```

## Nästa steg

Efter framgångsrik distribution:

1. **[Konfigurera din instans](./configuration)** med anpassade inställningar
2. **Konfigurera övervakning och varningar** för produktionsoperationer
3. **Granska säkerhetsinställningar** och aktivera ytterligare skydd
4. **Konfigurera automatisering av säkerhetskopior** och testa återställningsförfaranden
5. **Konfigurera anpassade domäner** för din organisation

Din Onetime Secret-instans är nu redo för produktionsanvändning!
