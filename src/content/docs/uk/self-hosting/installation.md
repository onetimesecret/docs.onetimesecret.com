---
title: Встановлення та розгортання
description: Комплексний посібник для продуктивного розгортання Onetime Secret
sidebar:
  order: 3
---

Цей посібник охоплює варіанти розгортання для власних екземплярів Onetime Secret.

## Варіанти розгортання

### Розгортання з Docker

Docker забезпечує найбільш надійний і портативний метод розгортання.

#### Використання Docker Compose

Для повного керування інфраструктурою використовуйте спеціальний репозиторій Docker Compose:

**Репозиторій**: https://github.com/onetimesecret/docker-compose/

**Швидке налаштування:**
```bash
git clone https://github.com/onetimesecret/docker-compose.git
cd docker-compose
docker-compose up -d
```

**Ручне налаштування Docker Compose:**

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

**Файл середовища (.env):**
```bash
SECRET=your-secure-32-character-hex-key
REDIS_PASSWORD=your-redis-password
HOST=your-domain.com
SSL=true
```

### Ручне встановлення

Для середовищ, які потребують власних конфігурацій або існуючої інфраструктури.

#### Встановлення залежностей

**Ubuntu 22.04 LTS:**
```bash
# Оновлення системи
sudo apt update && sudo apt upgrade -y

# Встановлення Ruby та інструментів збірки
sudo apt install -y ruby ruby-dev build-essential git
sudo gem install bundler

# Встановлення Redis
sudo apt install -y redis-server
sudo systemctl enable redis-server
sudo systemctl start redis-server

# Встановлення Node.js (для розробки та збирання фронтенд-ресурсів)
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pnpm@latest
```

**CentOS/RHEL 8:**
```bash
# Увімкнення репозиторію PowerTools/CodeReady
sudo dnf install -y dnf-plugins-core
sudo dnf config-manager --set-enabled powertools

# Встановлення Ruby та інструментів розробки
sudo dnf groupinstall -y "Development Tools"
sudo dnf install -y ruby ruby-devel git
sudo gem install bundler

# Встановлення Redis
sudo dnf install -y redis
sudo systemctl enable redis
sudo systemctl start redis
```

#### Налаштування додатку

```bash
# Створення користувача додатку
sudo useradd -r -m -s /bin/bash onetime

# Перехід до користувача додатку
sudo su - onetime

# Клонування репозиторію
git clone https://github.com/onetimesecret/onetimesecret.git
cd onetimesecret

# Встановлення залежностей
bundle install --deployment --without development test

# Копіювання та налаштування середовища
cp .env.example .env
cp ./etc/config.example.yaml ./etc/config.yaml

# Створення хешу коміту для відстеження версії
git rev-parse --short HEAD > .commit_hash.txt
```

## Конфігурація зворотного проксі

Ці приклади конфігурації можуть допомогти вам почати, але ви повинні налаштувати їх відповідно до ваших конкретних потреб.

### Nginx

**Базова конфігурація:**

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

    # Конфігурація SSL
    ssl_certificate /path/to/your/cert.pem;
    ssl_certificate_key /path/to/your/key.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512;

    # Заголовки безпеки
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options DENY always;
    add_header X-Content-Type-Options nosniff always;

    # Статичні файли зі зібраного фронтенду
    location /dist/ {
        root /app/public;
        expires 1y;
        add_header Cache-Control "public, immutable";
        try_files $uri $uri/ =404;
    }

    # API-запити до бекенду
    location /api/ {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Всі інші запити до бекенду
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # Підтримка WebSocket
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

**Увімкнення сайту:**
```bash
sudo ln -s /etc/nginx/sites-available/onetime /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### Caddy

Caddy забезпечує автоматичний HTTPS та простішу конфігурацію:

```nginx
# /etc/caddy/Caddyfile
your-domain.com {
    # Обробка статичних файлів зі зібраного фронтенду
    handle /dist/* {
        root * /app/public
        file_server
    }

    # API-запити до бекенду
    handle /api/* {
        reverse_proxy 127.0.0.1:3000
    }

    # Всі інші запити до бекенду (для серверних сторінок)
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

    # Конфігурація SSL
    SSLEngine on
    SSLCertificateFile /path/to/your/cert.pem
    SSLCertificateKeyFile /path/to/your/key.pem

    # Заголовки безпеки
    Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
    Header always set X-Frame-Options DENY
    Header always set X-Content-Type-Options nosniff

    # Статичні файли зі зібраного фронтенду
    Alias /dist /app/public/dist
    <Directory /app/public/dist>
        Require all granted
        ExpiresActive On
        ExpiresDefault "access plus 1 year"
    </Directory>

    # API та запити додатку до бекенду
    ProxyPreserveHost On
    ProxyPass /dist !
    ProxyPass / http://127.0.0.1:3000/
    ProxyPassReverse / http://127.0.0.1:3000/
</VirtualHost>
```

## Конфігурація SSL/TLS

### Let's Encrypt (Certbot)

**Встановлення Certbot:**
```bash
# Ubuntu/Debian
sudo apt install certbot python3-certbot-nginx

# CentOS/RHEL
sudo dnf install certbot python3-certbot-nginx
```

**Генерація сертифіката:**
```bash
# Для Nginx
sudo certbot --nginx -d your-domain.com

# Для Apache
sudo certbot --apache -d your-domain.com

# Ручний сертифікат (якщо використовується власна конфігурація проксі)
sudo certbot certonly --webroot -w /var/www/html -d your-domain.com
```

**Автоматичне оновлення:**
```bash
# Додавання до crontab
echo "0 12 * * * /usr/bin/certbot renew --quiet" | sudo tee -a /etc/crontab
```

### Власні SSL-сертифікати

Розмістіть ваші сертифікати та оновіть шляхи в конфігурації проксі:

```bash
# Файли сертифікатів
/etc/ssl/certs/your-domain.com.crt
/etc/ssl/private/your-domain.com.key

# Встановлення правильних дозволів
sudo chmod 600 /etc/ssl/private/your-domain.com.key
sudo chmod 644 /etc/ssl/certs/your-domain.com.crt
```


### Конфігурація Redis

**Варіант 1: Тільки пам'ять (ніколи не зберігати на диск для максимальної безпеки):**

```properties
# /etc/redis/redis.conf

# Оптимізація пам'яті
maxmemory 1gb
maxmemory-policy allkeys-lru

# Безпека - секрети ніколи не записуються на диск
save ""  # Вимкнути всі автоматичні збереження
appendonly no  # Вимкнути логування AOF

# Безпека
requirepass your_redis_password
bind 127.0.0.1

# Продуктивність
tcp-keepalive 60
timeout 300
```

**Варіант 2: Збереження на диск (дозволяє резервне копіювання, але записує секрети на диск):**

```properties
# /etc/redis/redis.conf

# Оптимізація пам'яті
maxmemory 1gb
maxmemory-policy allkeys-lru

# Знімки RDB - створює файли dump.rdb
save 900 1    # Зберегти, якщо змінився хоча б 1 ключ за 900 секунд
save 300 10   # Зберегти, якщо змінилось хоча б 10 ключів за 300 секунд
save 60 10000 # Зберегти, якщо змінилось хоча б 10000 ключів за 60 секунд

# Логування AOF - створює файли appendonly.aof для відновлення на певний момент часу
appendonly yes
appendfsync everysec  # Синхронізація з диском щосекунди

# Безпека
requirepass your_redis_password
bind 127.0.0.1

# Продуктивність
tcp-keepalive 60
timeout 300
```

**Важливо**: При увімкненому збереженні на диск секрети будуть записуватися до:
- файли `dump.rdb` (знімки через інтервали)
- файли `appendonly.aof` (безперервний лог додавання)

Виберіть на основі ваших вимог безпеки проти резервного копіювання.

**Перезапуск Redis:**
```bash
sudo systemctl restart redis
```

#### Резервні копії Redis

**Redis:**
```bash
#!/bin/bash
# Скрипт резервного копіювання Redis
BACKUP_DIR="/var/backups/onetime"
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p $BACKUP_DIR

# Створення резервної копії
redis-cli -a "$REDIS_PASSWORD" --rdb $BACKUP_DIR/redis_$DATE.rdb

# Очищення старих резервних копій
find $BACKUP_DIR -name "redis_*.rdb" -mtime +7 -delete
```

## Наступні кроки

Після успішного розгортання:

1. **[Налаштуйте ваш екземпляр](./configuration)** з власними налаштуваннями
2. **Налаштуйте моніторинг та сповіщення** для продуктивних операцій
3. **Перегляньте налаштування безпеки** та ввімкніть додаткові захисти
4. **Налаштуйте автоматизацію резервного копіювання** та протестуйте процедури відновлення
5. **Налаштуйте власні домени** для вашої організації

Ваш екземпляр Onetime Secret тепер готовий до виробничого використання!
