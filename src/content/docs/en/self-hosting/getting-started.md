---
title: Getting Started with Self-Hosting
description: Quick setup guide to get your Onetime Secret instance running
sidebar:
  order: 2
---

# Getting Started

This guide will get you up and running with a self-hosted Onetime Secret instance in minutes.

## Prerequisites

Before you begin, ensure you have:

- **Docker and Docker Compose** (recommended path)
- OR **Ruby 3.1+** with Bundler (manual installation)
- **Git** for cloning the repository
- **1GB+ RAM** for optimal performance

## Method 1: Docker Quick Start (Recommended)

The fastest way to get started uses Docker with minimal configuration.

### 1. Start Redis

```bash
docker run -p 6379:6379 -d redis:bookworm
```

### 2. Generate Secret Key

```bash
# Generate and store a persistent secret key
openssl rand -hex 32 > .ots_secret
chmod 600 .ots_secret
echo "Secret key saved to .ots_secret (keep this file secure!)"
```

### 3. Run Onetime Secret

```bash
# Run the container using the secret key
docker run -p 3000:3000 -d \
  -e REDIS_URL=redis://host.docker.internal:6379/0 \
  -e SECRET="$(cat .ots_secret)" \
  -e HOST=localhost:3000 \
  -e SSL=false \
  -e RACK_ENV=production \
  onetimesecret/onetimesecret:latest
```

### 4. Access Your Instance

Open your browser to:
- **Web Interface**: http://localhost:3000
- **API Endpoint**: http://localhost:3000/api

## Method 2: Manual Installation

For production environments or custom setups, install dependencies manually.

### 1. Install System Dependencies

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install ruby ruby-dev build-essential redis-server
```

**CentOS/RHEL:**
```bash
sudo yum install ruby ruby-devel gcc gcc-c++ redis
sudo systemctl enable redis
sudo systemctl start redis
```

**macOS:**
```bash
brew install ruby redis
brew services start redis
```

### 2. Install Application

```bash
# Clone repository
git clone https://github.com/onetimesecret/onetimesecret.git
cd onetimesecret

# Install Ruby dependencies
bundle install

# Copy configuration files
cp .env.example .env
cp config/config.example.yaml config/config.yaml
```

### 3. Configure Database

**Using Redis (default):**
```bash
# Redis should be running on localhost:6379
# No additional configuration needed
```

**Using PostgreSQL (optional):**
```bash
# Install PostgreSQL
sudo apt install postgresql postgresql-contrib

# Create database and user
sudo -u postgres createdb onetime_production
sudo -u postgres createuser -P onetime
```

### 4. Start the Application

```bash
# Development mode
bundle exec ruby bin/onetime

# Production mode
RACK_ENV=production bundle exec ruby bin/onetime
```

## Verification

### Test Web Interface

1. Navigate to http://localhost:7143
2. Create a test secret
3. Verify you can retrieve it with the generated link

### Test API

```bash
# Create a secret via API
curl -X POST http://localhost:7143/api/v1/secret \
  -H "Content-Type: application/json" \
  -d '{"secret": "Hello, World!", "ttl": 3600}'

# Response includes secret_key for retrieval
```

## Initial Configuration

### Essential Settings

Edit your configuration file (`config/config.yaml`):

```yaml
# Basic settings
:site:
  :host: your-domain.com
  :ssl: true

# Security settings
:authentication:
  :required: true
  :passphrase:
    :min_length: 12

# Email configuration (optional)
:email:
  :from: noreply@your-domain.com
  :smtp:
    :host: smtp.your-provider.com
```

### Create Admin User

```bash
# Using the web interface
# Navigate to /signup and create your first account

# OR using the console
bundle exec ruby -r './config/environment' -e "
  User.create!(
    email: 'admin@your-domain.com',
    password: 'secure-password-here'
  )
"
```

## Security Checklist

Before going to production:

- [ ] Change default passwords and secrets
- [ ] Enable HTTPS/SSL
- [ ] Configure firewall rules
- [ ] Set up regular backups
- [ ] Review authentication settings
- [ ] Configure email notifications

## Troubleshooting

### Common Issues

**Port already in use:**
```bash
# Check what's using port 7143
sudo lsof -i :7143

# Change port in config/config.yaml
:site:
  :port: 8080
```

**Redis connection failed:**
```bash
# Check Redis status
redis-cli ping

# Should return "PONG"
```

**Permission errors:**
```bash
# Fix file permissions
sudo chown -R $USER:$USER .
chmod +x bin/onetime
```

## Next Steps

Now that your instance is running:

1. **[Configure your deployment](./installation)** for production use
2. **[Review configuration options](./configuration)** for customization
3. **[Set up monitoring and backups](./installation#monitoring)**
4. **[Configure custom domains](../custom-domains)** for your organization

## Getting Help

- **Documentation**: Browse our complete [configuration reference](./configuration)
- **Community**: Join discussions on [GitHub](https://github.com/onetimesecret/onetimesecret/discussions)
- **Issues**: Report bugs on our [issue tracker](https://github.com/onetimesecret/onetimesecret/issues)
