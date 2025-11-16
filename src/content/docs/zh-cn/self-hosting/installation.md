---
title: 安装和部署
description: Onetime Secret 生产部署的综合指南
sidebar:
  order: 3
---

本指南涵盖了自托管 Onetime Secret 实例的部署选项。

## 部署选项

### Docker 部署

Docker 提供最可靠和便携的部署方法。

#### 使用 Docker Compose

对于完整的基础设施管理，请使用专用的 Docker Compose 仓库：

**仓库**：https://github.com/onetimesecret/docker-compose/

**快速设置：**
```bash
git clone https://github.com/onetimesecret/docker-compose.git
cd docker-compose
docker-compose up -d
```

**手动 Docker Compose 设置：**

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

**环境变量文件（.env）：**
```bash
SECRET=your-secure-32-character-hex-key
REDIS_PASSWORD=your-redis-password
HOST=your-domain.com
SSL=true
```

### 手动安装

适用于需要自定义配置或现有基础设施的环境。

#### 安装依赖项

**Ubuntu 22.04 LTS：**
```bash
# 更新系统
sudo apt update && sudo apt upgrade -y

# 安装 Ruby 和构建工具
sudo apt install -y ruby ruby-dev build-essential git
sudo gem install bundler

# 安装 Redis
sudo apt install -y redis-server
sudo systemctl enable redis-server
sudo systemctl start redis-server

# 安装 Node.js（用于开发和构建前端资源）
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pnpm@latest
```

**CentOS/RHEL 8：**
```bash
# 启用 PowerTools/CodeReady 仓库
sudo dnf install -y dnf-plugins-core
sudo dnf config-manager --set-enabled powertools

# 安装 Ruby 和开发工具
sudo dnf groupinstall -y "Development Tools"
sudo dnf install -y ruby ruby-devel git
sudo gem install bundler

# 安装 Redis
sudo dnf install -y redis
sudo systemctl enable redis
sudo systemctl start redis
```

#### 应用程序设置

```bash
# 创建应用程序用户
sudo useradd -r -m -s /bin/bash onetime

# 切换到应用程序用户
sudo su - onetime

# 克隆仓库
git clone https://github.com/onetimesecret/onetimesecret.git
cd onetimesecret

# 安装依赖项
bundle install --deployment --without development test

# 复制并配置环境
cp .env.example .env
cp ./etc/config.example.yaml ./etc/config.yaml

# 创建提交哈希以进行版本跟踪
git rev-parse --short HEAD > .commit_hash.txt
```

## 反向代理配置

这些配置示例可以帮助您入门，但您应该根据您的特定需求进行调整。

### Nginx

**基本配置：**

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

    # SSL 配置
    ssl_certificate /path/to/your/cert.pem;
    ssl_certificate_key /path/to/your/key.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512;

    # 安全标头
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options DENY always;
    add_header X-Content-Type-Options nosniff always;

    # 来自构建的前端的静态文件
    location /dist/ {
        root /app/public;
        expires 1y;
        add_header Cache-Control "public, immutable";
        try_files $uri $uri/ =404;
    }

    # API 请求到后端
    location /api/ {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # 所有其他请求到后端
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # WebSocket 支持
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

**启用站点：**
```bash
sudo ln -s /etc/nginx/sites-available/onetime /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### Caddy

Caddy 提供自动 HTTPS 和更简单的配置：

```nginx
# /etc/caddy/Caddyfile
your-domain.com {
    # 处理来自构建的前端的静态文件
    handle /dist/* {
        root * /app/public
        file_server
    }

    # API 请求到后端
    handle /api/* {
        reverse_proxy 127.0.0.1:3000
    }

    # 所有其他请求到后端（用于服务器渲染的页面）
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

    # SSL 配置
    SSLEngine on
    SSLCertificateFile /path/to/your/cert.pem
    SSLCertificateKeyFile /path/to/your/key.pem

    # 安全标头
    Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
    Header always set X-Frame-Options DENY
    Header always set X-Content-Type-Options nosniff

    # 来自构建的前端的静态文件
    Alias /dist /app/public/dist
    <Directory /app/public/dist>
        Require all granted
        ExpiresActive On
        ExpiresDefault "access plus 1 year"
    </Directory>

    # API 和应用程序请求到后端
    ProxyPreserveHost On
    ProxyPass /dist !
    ProxyPass / http://127.0.0.1:3000/
    ProxyPassReverse / http://127.0.0.1:3000/
</VirtualHost>
```

## SSL/TLS 配置

### Let's Encrypt (Certbot)

**安装 Certbot：**
```bash
# Ubuntu/Debian
sudo apt install certbot python3-certbot-nginx

# CentOS/RHEL
sudo dnf install certbot python3-certbot-nginx
```

**生成证书：**
```bash
# 用于 Nginx
sudo certbot --nginx -d your-domain.com

# 用于 Apache
sudo certbot --apache -d your-domain.com

# 手动证书（如果使用自定义代理配置）
sudo certbot certonly --webroot -w /var/www/html -d your-domain.com
```

**自动续期：**
```bash
# 添加到 crontab
echo "0 12 * * * /usr/bin/certbot renew --quiet" | sudo tee -a /etc/crontab
```

### 自定义 SSL 证书

放置您的证书并在代理配置中更新路径：

```bash
# 证书文件
/etc/ssl/certs/your-domain.com.crt
/etc/ssl/private/your-domain.com.key

# 设置适当的权限
sudo chmod 600 /etc/ssl/private/your-domain.com.key
sudo chmod 644 /etc/ssl/certs/your-domain.com.crt
```


### Redis 配置

**选项 1：仅内存（永不保存到磁盘以实现最大安全性）：**

```properties
# /etc/redis/redis.conf

# 内存优化
maxmemory 1gb
maxmemory-policy allkeys-lru

# 安全性 - 机密内容永不写入磁盘
save ""  # 禁用所有自动保存
appendonly no  # 禁用 AOF 日志

# 安全性
requirepass your_redis_password
bind 127.0.0.1

# 性能
tcp-keepalive 60
timeout 300
```

**选项 2：磁盘持久化（启用备份但将机密内容写入磁盘）：**

```properties
# /etc/redis/redis.conf

# 内存优化
maxmemory 1gb
maxmemory-policy allkeys-lru

# RDB 快照 - 创建 dump.rdb 文件
save 900 1    # 如果在 900 秒内至少有 1 个键更改则保存
save 300 10   # 如果在 300 秒内至少有 10 个键更改则保存
save 60 10000 # 如果在 60 秒内至少有 10000 个键更改则保存

# AOF 日志 - 创建 appendonly.aof 文件以进行时间点恢复
appendonly yes
appendfsync everysec  # 每秒同步到磁盘

# 安全性
requirepass your_redis_password
bind 127.0.0.1

# 性能
tcp-keepalive 60
timeout 300
```

**重要提示**：启用磁盘持久化后，机密内容将写入：
- `dump.rdb` 文件（间隔快照）
- `appendonly.aof` 文件（连续追加日志）

根据您的安全性与备份需求进行选择。

**重启 Redis：**
```bash
sudo systemctl restart redis
```

#### Redis 备份

**Redis：**
```bash
#!/bin/bash
# Redis 备份脚本
BACKUP_DIR="/var/backups/onetime"
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p $BACKUP_DIR

# 创建备份
redis-cli -a "$REDIS_PASSWORD" --rdb $BACKUP_DIR/redis_$DATE.rdb

# 清理旧备份
find $BACKUP_DIR -name "redis_*.rdb" -mtime +7 -delete
```

## 后续步骤

成功部署后：

1. **[配置您的实例](./configuration)** 使用自定义设置
2. **设置监控和警报** 用于生产运营
3. **查看安全设置** 并启用额外保护
4. **配置备份自动化** 并测试恢复程序
5. **为您的组织设置自定义域名**

您的 Onetime Secret 实例现在已准备好用于生产！
