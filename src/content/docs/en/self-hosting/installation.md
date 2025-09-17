---
title: Installation & Deployment
description: Comprehensive guide for production deployment of Onetime Secret
sidebar:
  order: 3
---

# Installation & Deployment

This guide covers production-ready deployment options for self-hosted Onetime Secret instances.

## Deployment Options

### Docker Deployment (Recommended)

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

#### Custom Docker Build

For customizations or development:

```dockerfile
# Dockerfile.custom
FROM ruby:3.2-alpine

WORKDIR /app

# Install system dependencies
RUN apk add --no-cache \
    build-base \
    postgresql-dev \
    redis

# Copy application files
COPY Gemfile Gemfile.lock ./
RUN bundle install --production

COPY . .

# Set production environment
ENV RACK_ENV=production

EXPOSE 7143

CMD ["bundle", "exec", "ruby", "bin/onetime"]
```

### Manual Installation

For environments requiring custom configurations or existing infrastructure.

#### System Requirements

**Minimum Production Requirements:**
- 2 CPU cores
- 1GB RAM
- 4GB disk space
- Ruby 3.1+
- Redis 5.0+
- Node.js 22+ (for development)

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

    # Proxy configuration
    location / {
        proxy_pass http://127.0.0.1:7143;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # WebSocket support
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }

    # Static file caching
    location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

**Enable the site:**
```bash
sudo ln -s /etc/nginx/sites-available/onetime /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
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

    # Proxy configuration
    ProxyPreserveHost On
    ProxyPass / http://127.0.0.1:7143/
    ProxyPassReverse / http://127.0.0.1:7143/

    # Static file optimization
    <LocationMatch "\.(css|js|png|jpg|jpeg|gif|ico|svg)$">
        ExpiresActive On
        ExpiresDefault "access plus 1 year"
    </LocationMatch>
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

## Process Management

### Systemd Service

Create a systemd service for automatic startup:

```ini
# /etc/systemd/system/onetime.service
[Unit]
Description=Onetime Secret Application
After=network.target redis.service
Requires=redis.service

[Service]
Type=simple
User=onetime
Group=onetime
WorkingDirectory=/home/onetime/onetimesecret
Environment=RACK_ENV=production
ExecStart=/usr/local/bin/bundle exec ruby bin/onetime
Restart=always
RestartSec=10

# Security settings
NoNewPrivileges=true
PrivateTmp=true
ProtectSystem=strict
ProtectHome=true
ReadWritePaths=/home/onetime/onetimesecret/logs

[Install]
WantedBy=multi-user.target
```

**Enable and start:**
```bash
sudo systemctl daemon-reload
sudo systemctl enable onetime
sudo systemctl start onetime
sudo systemctl status onetime
```

### Using Supervisor

Alternative process management with Supervisor:

```ini
# /etc/supervisor/conf.d/onetime.conf
[program:onetime]
command=/usr/local/bin/bundle exec ruby bin/onetime
directory=/home/onetime/onetimesecret
user=onetime
autostart=true
autorestart=true
redirect_stderr=true
stdout_logfile=/var/log/onetime/supervisor.log
environment=RACK_ENV=production
```

## Database Setup

### PostgreSQL Configuration

**Create database and user:**
```sql
-- Connect as postgres user
sudo -u postgres psql

-- Create database and user
CREATE DATABASE onetime_production;
CREATE USER onetime WITH PASSWORD 'secure_password_here';
GRANT ALL PRIVILEGES ON DATABASE onetime_production TO onetime;

-- Exit psql
\q
```

**Configure connection in config/config.yaml:**
```yaml
:database:
  :adapter: postgresql
  :host: localhost
  :port: 5432
  :database: onetime_production
  :username: onetime
  :password: secure_password_here
  :pool: 5
```

### Redis Configuration

**Optimize Redis for production:**

```conf
# /etc/redis/redis.conf

# Memory optimization
maxmemory 1gb
maxmemory-policy allkeys-lru

# Persistence
save 900 1
save 300 10
save 60 10000

# Security
requirepass your_redis_password
bind 127.0.0.1

# Performance
tcp-keepalive 60
timeout 300
```

**Restart Redis:**
```bash
sudo systemctl restart redis
```

## Monitoring & Logging

### Application Logs

Configure log rotation:

```bash
# /etc/logrotate.d/onetime
/home/onetime/onetimesecret/logs/*.log {
    daily
    missingok
    rotate 52
    compress
    delaycompress
    notifempty
    copytruncate
    su onetime onetime
}
```

### Health Checks

**Basic health check endpoint:**
```bash
# Check application health
curl -f http://localhost:7143/api/v1/status || exit 1

# Check with monitoring tools
wget --quiet --tries=1 --spider http://localhost:7143/ || exit 1
```

**Comprehensive monitoring script:**
```bash
#!/bin/bash
# /usr/local/bin/onetime-health-check

# Check application
if ! curl -s -f http://localhost:7143/api/v1/status > /dev/null; then
    echo "Application unhealthy"
    exit 1
fi

# Check Redis
if ! redis-cli -a "$REDIS_PASSWORD" ping > /dev/null; then
    echo "Redis unhealthy"
    exit 1
fi

echo "All services healthy"
exit 0
```

## Backup Strategy

### Database Backups

**PostgreSQL:**
```bash
#!/bin/bash
# Daily backup script
BACKUP_DIR="/var/backups/onetime"
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p $BACKUP_DIR

# Create backup
pg_dump -h localhost -U onetime onetime_production | \
  gzip > $BACKUP_DIR/onetime_db_$DATE.sql.gz

# Cleanup old backups (keep 30 days)
find $BACKUP_DIR -name "onetime_db_*.sql.gz" -mtime +30 -delete
```

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

### Configuration Backups

```bash
#!/bin/bash
# Backup configuration files
tar -czf /var/backups/onetime/config_$(date +%Y%m%d).tar.gz \
  /home/onetime/onetimesecret/config/ \
  /etc/nginx/sites-available/onetime \
  /etc/systemd/system/onetime.service
```

## Security Hardening

### Firewall Configuration

**Using UFW (Ubuntu):**
```bash
# Basic firewall setup
sudo ufw default deny incoming
sudo ufw default allow outgoing

# Allow SSH (adjust port as needed)
sudo ufw allow 22/tcp

# Allow HTTP/HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Enable firewall
sudo ufw enable
```

**Using firewalld (CentOS/RHEL):**
```bash
# Configure firewall
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --permanent --add-service=ssh
sudo firewall-cmd --reload
```

### File Permissions

```bash
# Secure application files
sudo chown -R onetime:onetime /home/onetime/onetimesecret
sudo chmod -R 755 /home/onetime/onetimesecret
sudo chmod 600 /home/onetime/onetimesecret/config/config.yaml
sudo chmod 600 /home/onetime/onetimesecret/.env
```

## Troubleshooting

### Common Issues

**Application won't start:**
```bash
# Check logs
sudo journalctl -u onetime -f

# Check configuration
bundle exec ruby -c config/config.yaml

# Test Redis connection
redis-cli -a "$REDIS_PASSWORD" ping
```

**Performance issues:**
```bash
# Check resource usage
htop
iotop

# Check Redis memory usage
redis-cli -a "$REDIS_PASSWORD" info memory

# Check application metrics
curl http://localhost:7143/api/v1/status
```

**SSL certificate issues:**
```bash
# Test SSL configuration
openssl s_client -connect your-domain.com:443

# Check certificate expiry
openssl x509 -in /path/to/cert.pem -text -noout | grep "Not After"

# Renew Let's Encrypt certificates
sudo certbot renew --dry-run
```

## Performance Optimization

### Application Tuning

**Ruby/Rack optimization in config/config.yaml:**
```yaml
:rack:
  :threads: 16
  :workers: 4

:redis:
  :pool: 20
  :timeout: 5

:cache:
  :enabled: true
  :ttl: 3600
```

### Web Server Optimization

**Nginx worker processes:**
```nginx
worker_processes auto;
worker_connections 1024;

# Enable gzip compression
gzip on;
gzip_types text/plain text/css application/json application/javascript;
```

## Next Steps

After successful deployment:

1. **[Configure your instance](./configuration)** with custom settings
2. **Set up monitoring and alerting** for production operations
3. **Review security settings** and enable additional protections
4. **Configure backup automation** and test recovery procedures
5. **Set up custom domains** for your organization

Your Onetime Secret instance is now ready for production use!
