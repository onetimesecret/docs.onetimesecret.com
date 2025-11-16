---
title: Whakatōnga me te Whakatakoto
description: Aratohu whānui mō te whakatakoto whakaputa o Onetime Secret
sidebar:
  order: 3
---

Ka whāki tēnei aratohu i ngā kōwhiringa whakatakoto mō ngā tauira whakatū-rānei Onetime Secret.

## Ngā Kōwhiringa Whakatakoto

### Whakatakoto Docker

Ka whakarato a Docker i te tikanga whakatakoto pūmau, kaweake.

#### Mā te Whakamahi i Docker Compose

Mō te whakahaere hanganga katoa, whakamahia te pūtahitanga Docker Compose tūmau:

**Pūtahitanga**: https://github.com/onetimesecret/docker-compose/

**Whakatū tere:**
```bash
git clone https://github.com/onetimesecret/docker-compose.git
cd docker-compose
docker-compose up -d
```

**Whakatū Docker Compose ā-ringaringa:**

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

**Kōnae taiao (.env):**
```bash
SECRET=your-secure-32-character-hex-key
REDIS_PASSWORD=your-redis-password
HOST=your-domain.com
SSL=true
```

### Whakatōnga ā-Ringaringa

Mō ngā taiao e hiahia ana i ngā whirihoranga ritenga, i ngā hanganga kei te mau.

#### Te Whakatō i ngā Taunga

**Ubuntu 22.04 LTS:**
```bash
# Whakahōutia te pūnaha
sudo apt update && sudo apt upgrade -y

# Whakatōhia a Ruby me ngā taputapu hanga
sudo apt install -y ruby ruby-dev build-essential git
sudo gem install bundler

# Whakatōhia a Redis
sudo apt install -y redis-server
sudo systemctl enable redis-server
sudo systemctl start redis-server

# Whakatōhia a Node.js (mō te whanaketanga me te hanga rawa tukuatu)
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pnpm@latest
```

**CentOS/RHEL 8:**
```bash
# Whakahohetia te pūtahitanga PowerTools/CodeReady
sudo dnf install -y dnf-plugins-core
sudo dnf config-manager --set-enabled powertools

# Whakatōhia a Ruby me ngā taputapu whanaketanga
sudo dnf groupinstall -y "Development Tools"
sudo dnf install -y ruby ruby-devel git
sudo gem install bundler

# Whakatōhia a Redis
sudo dnf install -y redis
sudo systemctl enable redis
sudo systemctl start redis
```

#### Whakatū Papatono

```bash
# Waihangahia te kaiwhakamahi papatono
sudo useradd -r -m -s /bin/bash onetime

# Huri ki te kaiwhakamahi papatono
sudo su - onetime

# Tārua pūtahitanga
git clone https://github.com/onetimesecret/onetimesecret.git
cd onetimesecret

# Whakatōhia ngā taunga
bundle install --deployment --without development test

# Tārua me te whirihora taiao
cp .env.example .env
cp ./etc/config.example.yaml ./etc/config.yaml

# Waihangahia te hash tāmua mō te aroturuki putanga
git rev-parse --short HEAD > .commit_hash.txt
```

## Whirihoranga Tūmau Whakahoki

Ka taea e ēnei tauira whirihoranga te āwhina i a koe ki te tīmata, engari me whakarereke koe i aua mea kia hāngai ki ō hiahiatanga motuhake.

### Nginx

**Whirihoranga Taketake:**

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

    # Whirihoranga SSL
    ssl_certificate /path/to/your/cert.pem;
    ssl_certificate_key /path/to/your/key.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512;

    # Ngā pane haumaru
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options DENY always;
    add_header X-Content-Type-Options nosniff always;

    # Ngā kōnae static mai i te tukuatu kua hangaia
    location /dist/ {
        root /app/public;
        expires 1y;
        add_header Cache-Control "public, immutable";
        try_files $uri $uri/ =404;
    }

    # Ngā tono API ki te kūwaha
    location /api/ {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Ngā tono katoa ki te kūwaha
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # Tautoko WebSocket
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

**Whakahohetia te pae:**
```bash
sudo ln -s /etc/nginx/sites-available/onetime /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### Caddy

Ka whakarato a Caddy i te HTTPS aunoa me te whirihoranga ngāwari ake:

```nginx
# /etc/caddy/Caddyfile
your-domain.com {
    # Whakahaere i ngā kōnae static mai i te tukuatu kua hangaia
    handle /dist/* {
        root * /app/public
        file_server
    }

    # Ngā tono API ki te kūwaha
    handle /api/* {
        reverse_proxy 127.0.0.1:3000
    }

    # Ngā tono katoa ki te kūwaha (mō ngā whārangi kua hangaia e te tūmau)
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

    # Whirihoranga SSL
    SSLEngine on
    SSLCertificateFile /path/to/your/cert.pem
    SSLCertificateKeyFile /path/to/your/key.pem

    # Ngā pane haumaru
    Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
    Header always set X-Frame-Options DENY
    Header always set X-Content-Type-Options nosniff

    # Ngā kōnae static mai i te tukuatu kua hangaia
    Alias /dist /app/public/dist
    <Directory /app/public/dist>
        Require all granted
        ExpiresActive On
        ExpiresDefault "access plus 1 year"
    </Directory>

    # Ngā tono API me te papatono ki te kūwaha
    ProxyPreserveHost On
    ProxyPass /dist !
    ProxyPass / http://127.0.0.1:3000/
    ProxyPassReverse / http://127.0.0.1:3000/
</VirtualHost>
```

## Whirihoranga SSL/TLS

### Let's Encrypt (Certbot)

**Whakatōhia a Certbot:**
```bash
# Ubuntu/Debian
sudo apt install certbot python3-certbot-nginx

# CentOS/RHEL
sudo dnf install certbot python3-certbot-nginx
```

**Whakaputahia te Tiwhikete:**
```bash
# Mō Nginx
sudo certbot --nginx -d your-domain.com

# Mō Apache
sudo certbot --apache -d your-domain.com

# Tiwhikete ā-ringaringa (mēnā e whakamahi ana i te whirihoranga tūmau ritenga)
sudo certbot certonly --webroot -w /var/www/html -d your-domain.com
```

**Whakahōutanga-aunoa:**
```bash
# Tāpirihia ki te crontab
echo "0 12 * * * /usr/bin/certbot renew --quiet" | sudo tee -a /etc/crontab
```

### Ngā Tiwhikete SSL Ritenga

Whakawhiwhia ō tiwhikete me te whakahōu i ngā ara i roto i te whirihoranga tūmau:

```bash
# Ngā kōnae tiwhikete
/etc/ssl/certs/your-domain.com.crt
/etc/ssl/private/your-domain.com.key

# Whakatakotohia ngā whakaaetanga tika
sudo chmod 600 /etc/ssl/private/your-domain.com.key
sudo chmod 644 /etc/ssl/certs/your-domain.com.crt
```


### Whirihoranga Redis

**Kōwhiringa 1: Mahara-anake (kaua e tiaki ki te kōpae mō te haumaru nui):**

```properties
# /etc/redis/redis.conf

# Whakapai mahara
maxmemory 1gb
maxmemory-policy allkeys-lru

# Haumaru - kāore ngā karere muna e tuhia ki te kōpae
save ""  # Whakamutua ngā tiaki-aunoa katoa
appendonly no  # Whakamutua te rārangi AOF

# Haumaru
requirepass your_redis_password
bind 127.0.0.1

# Whakatutukitanga
tcp-keepalive 60
timeout 300
```

**Kōwhiringa 2: Pumau kōpae (ka taea ngā tārua engari ka tuhia ngā karere muna ki te kōpae):**

```properties
# /etc/redis/redis.conf

# Whakapai mahara
maxmemory 1gb
maxmemory-policy allkeys-lru

# Ngā hopunga RDB - ka waihanga i ngā kōnae dump.rdb
save 900 1    # Tiaki mēnā kua huri te mīhini 1 i roto i ngā hēkona 900
save 300 10   # Tiaki mēnā kua huri te mīhini 10 i roto i ngā hēkona 300
save 60 10000 # Tiaki mēnā kua huri te mīhini 10000 i roto i ngā hēkona 60

# Rārangi AOF - ka waihanga i ngā kōnae appendonly.aof mō te whakahoki wā-tika
appendonly yes
appendfsync everysec  # Tukutahi ki te kōpae ia hēkona

# Haumaru
requirepass your_redis_password
bind 127.0.0.1

# Whakatutukitanga
tcp-keepalive 60
timeout 300
```

**Nui te Tikanga**: Mēnā kua whakahohetia te pumau kōpae, ka tuhia ngā karere muna ki:
- Ngā kōnae `dump.rdb` (ngā hopunga i ngā wā)
- Ngā kōnae `appendonly.aof` (te rārangi tāpiri haere)

Kōwhiria i runga i ō hiahiatanga haumaru me te tārua.

**Tīmata anō a Redis:**
```bash
sudo systemctl restart redis
```

#### Ngā Tārua Redis

**Redis:**
```bash
#!/bin/bash
# Tuhinga tārua Redis
BACKUP_DIR="/var/backups/onetime"
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p $BACKUP_DIR

# Waihangahia te tārua
redis-cli -a "$REDIS_PASSWORD" --rdb $BACKUP_DIR/redis_$DATE.rdb

# Whakawātea i ngā tārua tawhito
find $BACKUP_DIR -name "redis_*.rdb" -mtime +7 -delete
```

## Ngā Mahi e Whai Ake Nei

I muri i te whakatakoto angitu:

1. **[Whirihorahia tō tauira](./configuration)** me ngā tautuhinga ritenga
2. **Whakatūhia te aroturuki me te whakamōhio** mō ngā mahinga whakaputa
3. **Arotake i ngā tautuhinga haumaru** me te whakahohe i ngā tiaki tāpiri
4. **Whirihorahia te tārua-aunoa** me te whakamātau i ngā tikanga whakahoki
5. **Whakatūhia ngā rohe ritenga** mō tō whakahaere

Kua rite tō tauira Onetime Secret mō te whakamahi whakaputa!
