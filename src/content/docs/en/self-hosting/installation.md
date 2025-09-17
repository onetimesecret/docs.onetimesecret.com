---
title: Installation & Deployment
description: Comprehensive guide for production deployment of Onetime Secret
sidebar:
  order: 3
---

This guide covers deployment options for self-hosted Onetime Secret instances.

## Deployment Options

### Docker Deployment

Docker provides the most reliable and portable deployment method.

#### Using Docker Compose

For complete infrastructure management, use the dedicated Docker Compose repository:

**Repository**: https://github.com/onetimesecret/docker-compose/

**Quick setup:**
```bash
git clone https://github.com/onetimesecret/docker-compose.git
cd docker-compose
docker-compose up -d
```

**Manual Docker Compose setup:**

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

**Environment file (.env):**
```bash
SECRET=your-secure-32-character-hex-key
REDIS_PASSWORD=your-redis-password
HOST=your-domain.com
SSL=true
```

### Manual Installation

For environments requiring custom configurations or existing infrastructure.

#### Installing Dependencies

**Ubuntu 22.04 LTS:**
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Ruby and build tools
sudo apt install -y ruby ruby-dev build-essential git
sudo gem install bundler

# Install Redis
sudo apt install -y redis-server
sudo systemctl enable redis-server
sudo systemctl start redis-server

# Install Node.js (for development)
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pnpm@latest
```

**CentOS/RHEL 8:**
```bash
# Enable PowerTools/CodeReady repository
sudo dnf install -y dnf-plugins-core
sudo dnf config-manager --set-enabled powertools

# Install Ruby and development tools
sudo dnf groupinstall -y "Development Tools"
sudo dnf install -y ruby ruby-devel git
sudo gem install bundler

# Install Redis
sudo dnf install -y redis
sudo systemctl enable redis
sudo systemctl start redis
```

#### Application Setup

```bash
# Create application user
sudo useradd -r -m -s /bin/bash onetime

# Switch to application user
sudo su - onetime

# Clone repository
git clone https://github.com/onetimesecret/onetimesecret.git
cd onetimesecret

# Install dependencies
bundle install --deployment --without development test

# Copy and configure environment
cp .env.example .env
cp ./etc/config.example.yaml ./etc/config.yaml

# Create commit hash for version tracking
git rev-parse --short HEAD > .commit_hash.txt
```

## Reverse Proxy Configuration

These configuration examples can help you get started, but you should adjust them to fit your specific needs.

### Nginx

**Basic Configuration:**

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

    # SSL Configuration
    ssl_certificate /path/to/your/cert.pem;
    ssl_certificate_key /path/to/your/key.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512;

    # Security headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options DENY always;
    add_header X-Content-Type-Options nosniff always;

    # Static files from built frontend
    location /dist/ {
        root /app/public;
        expires 1y;
        add_header Cache-Control "public, immutable";
        try_files $uri $uri/ =404;
    }

    # API requests to backend
    location /api/ {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # All other requests to backend
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # WebSocket support
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

**Enable the site:**
```bash
sudo ln -s /etc/nginx/sites-available/onetime /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### Caddy

Caddy provides automatic HTTPS and simpler configuration:

```caddyfile
# /etc/caddy/Caddyfile
your-domain.com {
    # Handle static files from built frontend
    handle /dist/* {
        root * /app/public
        file_server
    }

    # API requests to backend
    handle /api/* {
        reverse_proxy 127.0.0.1:3000
    }

    # All other requests to backend (for server-rendered pages)
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

    # SSL Configuration
    SSLEngine on
    SSLCertificateFile /path/to/your/cert.pem
    SSLCertificateKeyFile /path/to/your/key.pem

    # Security headers
    Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
    Header always set X-Frame-Options DENY
    Header always set X-Content-Type-Options nosniff

    # Static files from built frontend
    Alias /dist /app/public/dist
    <Directory /app/public/dist>
        Require all granted
        ExpiresActive On
        ExpiresDefault "access plus 1 year"
    </Directory>

    # API and app requests to backend
    ProxyPreserveHost On
    ProxyPass /dist !
    ProxyPass / http://127.0.0.1:3000/
    ProxyPassReverse / http://127.0.0.1:3000/
</VirtualHost>
```

## SSL/TLS Configuration

### Let's Encrypt (Certbot)

**Install Certbot:**
```bash
# Ubuntu/Debian
sudo apt install certbot python3-certbot-nginx

# CentOS/RHEL
sudo dnf install certbot python3-certbot-nginx
```

**Generate Certificate:**
```bash
# For Nginx
sudo certbot --nginx -d your-domain.com

# For Apache
sudo certbot --apache -d your-domain.com

# Manual certificate (if using custom proxy config)
sudo certbot certonly --webroot -w /var/www/html -d your-domain.com
```

**Auto-renewal:**
```bash
# Add to crontab
echo "0 12 * * * /usr/bin/certbot renew --quiet" | sudo tee -a /etc/crontab
```

### Custom SSL Certificates

Place your certificates and update paths in proxy configuration:

```bash
# Certificate files
/etc/ssl/certs/your-domain.com.crt
/etc/ssl/private/your-domain.com.key

# Set proper permissions
sudo chmod 600 /etc/ssl/private/your-domain.com.key
sudo chmod 644 /etc/ssl/certs/your-domain.com.crt
```


### Redis Configuration

**Option 1: Memory-only (never save to disk for maximum security):**

```conf
# /etc/redis/redis.conf

# Memory optimization
maxmemory 1gb
maxmemory-policy allkeys-lru

# Security - secrets never written to disk
save ""  # Disable all automatic saves
appendonly no  # Disable AOF logging

# Security
requirepass your_redis_password
bind 127.0.0.1

# Performance
tcp-keepalive 60
timeout 300
```

**Option 2: Disk persistence (enables backups but writes secrets to disk):**

```conf
# /etc/redis/redis.conf

# Memory optimization
maxmemory 1gb
maxmemory-policy allkeys-lru

# RDB snapshots - creates dump.rdb files
save 900 1    # Save if at least 1 key changed in 900 seconds
save 300 10   # Save if at least 10 keys changed in 300 seconds
save 60 10000 # Save if at least 10000 keys changed in 60 seconds

# AOF logging - creates appendonly.aof files for point-in-time recovery
appendonly yes
appendfsync everysec  # Sync to disk every second

# Security
requirepass your_redis_password
bind 127.0.0.1

# Performance
tcp-keepalive 60
timeout 300
```

**Important**: With disk persistence enabled, secrets will be written to:
- `dump.rdb` files (snapshots at intervals)
- `appendonly.aof` files (continuous append log)

Choose based on your security vs. backup requirements.

**Restart Redis:**
```bash
sudo systemctl restart redis
```

#### Redis Backups

**Redis:**
```bash
#!/bin/bash
# Redis backup script
BACKUP_DIR="/var/backups/onetime"
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p $BACKUP_DIR

# Create backup
redis-cli -a "$REDIS_PASSWORD" --rdb $BACKUP_DIR/redis_$DATE.rdb

# Cleanup old backups
find $BACKUP_DIR -name "redis_*.rdb" -mtime +7 -delete
```

## Next Steps

After successful deployment:

1. **[Configure your instance](./configuration)** with custom settings
2. **Set up monitoring and alerting** for production operations
3. **Review security settings** and enable additional protections
4. **Configure backup automation** and test recovery procedures
5. **Set up custom domains** for your organization

Your Onetime Secret instance is now ready for production use!
