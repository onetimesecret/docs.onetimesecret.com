---
title: Instalacja i wdrożenie
description: Kompleksowy przewodnik po wdrażaniu produkcyjnym Onetime Secret
sidebar:
  order: 3
---

Ten przewodnik omawia opcje wdrożenia dla własnych instancji Onetime Secret.

## Opcje wdrożenia

### Wdrożenie Docker

Docker zapewnia najbardziej niezawodną i przenośną metodę wdrożenia.

#### Używanie Docker Compose

Do kompleksowego zarządzania infrastrukturą użyj dedykowanego repozytorium Docker Compose:

**Repozytorium**: https://github.com/onetimesecret/docker-compose/

**Szybka konfiguracja:**
```bash
git clone https://github.com/onetimesecret/docker-compose.git
cd docker-compose
docker-compose up -d
```

**Ręczna konfiguracja Docker Compose:**

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

**Plik środowiskowy (.env):**
```bash
SECRET=your-secure-32-character-hex-key
REDIS_PASSWORD=your-redis-password
HOST=your-domain.com
SSL=true
```

### Instalacja ręczna

Dla środowisk wymagających niestandardowych konfiguracji lub istniejącej infrastruktury.

#### Instalacja zależności

**Ubuntu 22.04 LTS:**
```bash
# Aktualizuj system
sudo apt update && sudo apt upgrade -y

# Zainstaluj Ruby i narzędzia budowania
sudo apt install -y ruby ruby-dev build-essential git
sudo gem install bundler

# Zainstaluj Redis
sudo apt install -y redis-server
sudo systemctl enable redis-server
sudo systemctl start redis-server

# Zainstaluj Node.js (do rozwoju i budowania zasobów frontend)
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pnpm@latest
```

**CentOS/RHEL 8:**
```bash
# Włącz repozytorium PowerTools/CodeReady
sudo dnf install -y dnf-plugins-core
sudo dnf config-manager --set-enabled powertools

# Zainstaluj Ruby i narzędzia deweloperskie
sudo dnf groupinstall -y "Development Tools"
sudo dnf install -y ruby ruby-devel git
sudo gem install bundler

# Zainstaluj Redis
sudo dnf install -y redis
sudo systemctl enable redis
sudo systemctl start redis
```

#### Konfiguracja aplikacji

```bash
# Utwórz użytkownika aplikacji
sudo useradd -r -m -s /bin/bash onetime

# Przełącz na użytkownika aplikacji
sudo su - onetime

# Sklonuj repozytorium
git clone https://github.com/onetimesecret/onetimesecret.git
cd onetimesecret

# Zainstaluj zależności
bundle install --deployment --without development test

# Skopiuj i skonfiguruj środowisko
cp .env.example .env
cp ./etc/config.example.yaml ./etc/config.yaml

# Utwórz hash commitu do śledzenia wersji
git rev-parse --short HEAD > .commit_hash.txt
```

## Konfiguracja reverse proxy

Te przykłady konfiguracji mogą pomóc Ci rozpocząć, ale powinieneś je dostosować do swoich konkretnych potrzeb.

### Nginx

**Podstawowa konfiguracja:**

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

    # Konfiguracja SSL
    ssl_certificate /path/to/your/cert.pem;
    ssl_certificate_key /path/to/your/key.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512;

    # Nagłówki bezpieczeństwa
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options DENY always;
    add_header X-Content-Type-Options nosniff always;

    # Pliki statyczne z zbudowanego frontend
    location /dist/ {
        root /app/public;
        expires 1y;
        add_header Cache-Control "public, immutable";
        try_files $uri $uri/ =404;
    }

    # Żądania API do backend
    location /api/ {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Wszystkie inne żądania do backend
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # Wsparcie WebSocket
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

**Włącz stronę:**
```bash
sudo ln -s /etc/nginx/sites-available/onetime /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### Caddy

Caddy zapewnia automatyczne HTTPS i prostszą konfigurację:

```nginx
# /etc/caddy/Caddyfile
your-domain.com {
    # Obsługa plików statycznych z zbudowanego frontend
    handle /dist/* {
        root * /app/public
        file_server
    }

    # Żądania API do backend
    handle /api/* {
        reverse_proxy 127.0.0.1:3000
    }

    # Wszystkie inne żądania do backend (dla stron renderowanych przez serwer)
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

    # Konfiguracja SSL
    SSLEngine on
    SSLCertificateFile /path/to/your/cert.pem
    SSLCertificateKeyFile /path/to/your/key.pem

    # Nagłówki bezpieczeństwa
    Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
    Header always set X-Frame-Options DENY
    Header always set X-Content-Type-Options nosniff

    # Pliki statyczne z zbudowanego frontend
    Alias /dist /app/public/dist
    <Directory /app/public/dist>
        Require all granted
        ExpiresActive On
        ExpiresDefault "access plus 1 year"
    </Directory>

    # Żądania API i aplikacji do backend
    ProxyPreserveHost On
    ProxyPass /dist !
    ProxyPass / http://127.0.0.1:3000/
    ProxyPassReverse / http://127.0.0.1:3000/
</VirtualHost>
```

## Konfiguracja SSL/TLS

### Let's Encrypt (Certbot)

**Zainstaluj Certbot:**
```bash
# Ubuntu/Debian
sudo apt install certbot python3-certbot-nginx

# CentOS/RHEL
sudo dnf install certbot python3-certbot-nginx
```

**Wygeneruj certyfikat:**
```bash
# Dla Nginx
sudo certbot --nginx -d your-domain.com

# Dla Apache
sudo certbot --apache -d your-domain.com

# Certyfikat ręczny (jeśli używasz niestandardowej konfiguracji proxy)
sudo certbot certonly --webroot -w /var/www/html -d your-domain.com
```

**Automatyczne odnawianie:**
```bash
# Dodaj do crontab
echo "0 12 * * * /usr/bin/certbot renew --quiet" | sudo tee -a /etc/crontab
```

### Niestandardowe certyfikaty SSL

Umieść swoje certyfikaty i zaktualizuj ścieżki w konfiguracji proxy:

```bash
# Pliki certyfikatów
/etc/ssl/certs/your-domain.com.crt
/etc/ssl/private/your-domain.com.key

# Ustaw odpowiednie uprawnienia
sudo chmod 600 /etc/ssl/private/your-domain.com.key
sudo chmod 644 /etc/ssl/certs/your-domain.com.crt
```


### Konfiguracja Redis

**Opcja 1: Tylko pamięć (nigdy nie zapisuj na dysk dla maksymalnego bezpieczeństwa):**

```properties
# /etc/redis/redis.conf

# Optymalizacja pamięci
maxmemory 1gb
maxmemory-policy allkeys-lru

# Bezpieczeństwo - sekrety nigdy nie są zapisywane na dysk
save ""  # Wyłącz wszystkie automatyczne zapisy
appendonly no  # Wyłącz logowanie AOF

# Bezpieczeństwo
requirepass your_redis_password
bind 127.0.0.1

# Wydajność
tcp-keepalive 60
timeout 300
```

**Opcja 2: Trwałość na dysku (umożliwia kopie zapasowe, ale zapisuje sekrety na dysk):**

```properties
# /etc/redis/redis.conf

# Optymalizacja pamięci
maxmemory 1gb
maxmemory-policy allkeys-lru

# Migawki RDB - tworzy pliki dump.rdb
save 900 1    # Zapisz, jeśli co najmniej 1 klucz zmienił się w ciągu 900 sekund
save 300 10   # Zapisz, jeśli co najmniej 10 kluczy zmieniło się w ciągu 300 sekund
save 60 10000 # Zapisz, jeśli co najmniej 10000 kluczy zmieniło się w ciągu 60 sekund

# Logowanie AOF - tworzy pliki appendonly.aof do odzyskiwania punkt-w-czasie
appendonly yes
appendfsync everysec  # Synchronizuj z dyskiem co sekundę

# Bezpieczeństwo
requirepass your_redis_password
bind 127.0.0.1

# Wydajność
tcp-keepalive 60
timeout 300
```

**Ważne**: Przy włączonej trwałości dysku sekrety będą zapisywane w:
- plikach `dump.rdb` (migawki w odstępach czasu)
- plikach `appendonly.aof` (ciągły dziennik dołączania)

Wybierz na podstawie swoich wymagań dotyczących bezpieczeństwa vs. kopii zapasowych.

**Uruchom ponownie Redis:**
```bash
sudo systemctl restart redis
```

#### Kopie zapasowe Redis

**Redis:**
```bash
#!/bin/bash
# Skrypt kopii zapasowej Redis
BACKUP_DIR="/var/backups/onetime"
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p $BACKUP_DIR

# Utwórz kopię zapasową
redis-cli -a "$REDIS_PASSWORD" --rdb $BACKUP_DIR/redis_$DATE.rdb

# Usuń stare kopie zapasowe
find $BACKUP_DIR -name "redis_*.rdb" -mtime +7 -delete
```

## Następne kroki

Po pomyślnym wdrożeniu:

1. **[Skonfiguruj swoją instancję](/pl/self-hosting/configuration)** z niestandardowymi ustawieniami
2. **Skonfiguruj monitorowanie i alerty** dla operacji produkcyjnych
3. **Przejrzyj ustawienia bezpieczeństwa** i włącz dodatkowe zabezpieczenia
4. **Skonfiguruj automatyzację kopii zapasowych** i przetestuj procedury odzyskiwania
5. **Skonfiguruj domeny niestandardowe** dla swojej organizacji

Twoja instancja Onetime Secret jest teraz gotowa do użytku produkcyjnego!
