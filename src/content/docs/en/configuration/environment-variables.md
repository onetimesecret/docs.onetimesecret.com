---
title: Environment Variables Guide
description: Using environment variables to configure OneTimeSecret
---

OneTimeSecret supports environment variable overrides for all configuration values, enabling flexible deployment across different environments without modifying configuration files.

## Override Syntax

Configuration files use ERB templating for environment variable support:

```yaml
# Simple override with default
host: <%= ENV['HOST'] || 'localhost:3000' %>

# Boolean conversion
ssl: <%= ENV['SSL'] == 'true' || false %>

# Required value
secret: <%= ENV['SECRET'] || 'CHANGEME' %>

# Optional value (nil if not set)
api_key: <%= ENV['API_KEY'] %>
```

## Core Configuration Variables

### Essential Settings

```bash
# Application identity
HOST=onetimesecret.com
SSL=true
SECRET=your-strong-secret-key

# Administrator access
COLONEL=admin@company.com
```

### Redis Configuration

```bash
# Full connection string
REDIS_URL=redis://password@localhost:6379/0

# Or individual databases
REDIS_DBS_SESSION=1
REDIS_DBS_SECRET=8
REDIS_DBS_METADATA=7
```

### Mail Configuration

```bash
# SMTP settings
EMAILER_MODE=smtp
FROM_EMAIL=noreply@company.com
FROMNAME="Company Secrets"
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USERNAME=apikey
SMTP_PASSWORD=your-api-key
SMTP_AUTH=login
SMTP_TLS=true

# Or AWS SES
EMAILER_MODE=ses
AWS_REGION=us-east-1
```

### Security Settings

```bash
# Authentication
AUTH_ENABLED=true
AUTH_SIGNUP=true
AUTH_SIGNIN=true
AUTH_AUTOVERIFY=false

# Anti-bot protection
AUTHENTICITY_TYPE=altcha
AUTHENTICITY_SECRET_KEY=strong-hmac-key
```

## System Settings Variables

### User Interface

```bash
# Header customization
HEADER_ENABLED=true
LOGO_URL=/assets/company-logo.png
LOGO_ALT="Company Secret Sharing"
SITE_NAME="SecureShare"
HEADER_NAV_ENABLED=true

# Footer links
FOOTER_LINKS=true
TERMS_URL=/terms
PRIVACY_URL=/privacy
```

### Feature Toggles

```bash
# API access
API_ENABLED=true

# Multi-region support
REGIONS_ENABLED=true
JURISDICTION=eu

# Custom domains
DOMAINS_ENABLED=true
DEFAULT_DOMAIN=secrets.company.com
```

### Diagnostics

```bash
# Sentry error tracking
DIAGNOSTICS_ENABLED=true
SENTRY_DSN=https://key@sentry.io/project
SENTRY_SAMPLE_RATE=0.10
SENTRY_LOG_ERRORS=true

# Separate frontend/backend DSNs
SENTRY_DSN_BACKEND=https://key@sentry.io/backend
SENTRY_DSN_FRONTEND=https://key@sentry.io/frontend
```

## Development Settings

```bash
# Development mode
RACK_ENV=development
ONETIME_DEBUG=true
FRONTEND_HOST=http://localhost:5173

# Relaxed security for testing
ALLOW_NIL_GLOBAL_SECRET=true
```

## Docker Configuration

Example `docker-compose.yml` with environment variables:

```yaml
version: '3'
services:
  app:
    image: onetimesecret/onetimesecret
    environment:
      - HOST=${HOST:-localhost:3000}
      - SSL=${SSL:-false}
      - SECRET=${SECRET}
      - REDIS_URL=redis://redis:6379/0
      - FROM_EMAIL=${FROM_EMAIL}
      - COLONEL=${ADMIN_EMAIL}
    env_file:
      - .env
```

## Kubernetes Configuration

ConfigMap example:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: onetimesecret-config
data:
  HOST: "secrets.company.com"
  SSL: "true"
  AUTH_ENABLED: "true"
  API_ENABLED: "true"
```

Secret example:

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: onetimesecret-secrets
type: Opaque
stringData:
  SECRET: "your-strong-secret-key"
  REDIS_URL: "redis://password@redis:6379/0"
  SMTP_PASSWORD: "smtp-api-key"
  AUTHENTICITY_SECRET_KEY: "hmac-key"
```

## Best Practices

### Security

1. **Never commit secrets** - Use `.env` files locally, secrets management in production
2. **Rotate keys regularly** - Especially `SECRET` and authentication keys
3. **Use strong values** - Generate cryptographically secure keys

### Organization

1. **Group by purpose**:
   ```bash
   # === Core Settings ===
   HOST=onetimesecret.com
   SECRET=...
   
   # === Redis ===
   REDIS_URL=...
   
   # === Mail ===
   FROM_EMAIL=...
   ```

2. **Document requirements**:
   ```bash
   # Required: Application secret (generate with: openssl rand -hex 32)
   SECRET=
   
   # Optional: Custom domain (defaults to HOST)
   DEFAULT_DOMAIN=
   ```

### Deployment

1. **Use environment-specific files**:
   - `.env.development`
   - `.env.staging`
   - `.env.production`

2. **Validate required variables**:
   ```bash
   #!/bin/bash
   required_vars="SECRET REDIS_URL FROM_EMAIL"
   for var in $required_vars; do
     if [ -z "${!var}" ]; then
       echo "Error: $var is required"
       exit 1
     fi
   done
   ```

3. **Provide defaults where sensible**:
   ```bash
   # Development defaults
   HOST=${HOST:-localhost:3000}
   SSL=${SSL:-false}
   REDIS_URL=${REDIS_URL:-redis://localhost:6379/0}
   ```

## Common Patterns

### Minimal Production

```bash
# Required
HOST=onetimesecret.com
SSL=true
SECRET=<generated-secret>
REDIS_URL=redis://:<password>@redis:6379/0
FROM_EMAIL=noreply@company.com
COLONEL=admin@company.com

# Recommended
AUTHENTICITY_SECRET_KEY=<generated-key>
SENTRY_DSN=https://key@sentry.io/project
```

### Full Enterprise

```bash
# Core
HOST=secrets.company.com
SSL=true
SECRET=<vault:secret/onetimesecret/app-secret>
COLONEL=security-team@company.com

# Features
DOMAINS_ENABLED=true
DEFAULT_DOMAIN=secrets.company.com
AUTH_AUTOVERIFY=true
API_ENABLED=true

# Infrastructure
REDIS_URL=<vault:secret/onetimesecret/redis-url>
EMAILER_MODE=ses
AWS_REGION=us-east-1

# Monitoring
DIAGNOSTICS_ENABLED=true
SENTRY_DSN=<vault:secret/onetimesecret/sentry-dsn>
SENTRY_SAMPLE_RATE=0.25

# Branding
LOGO_URL=https://cdn.company.com/logo.png
SITE_NAME="Company Secrets"
FOOTER_LINKS=true
TERMS_URL=https://company.com/terms
PRIVACY_URL=https://company.com/privacy
```

## Troubleshooting

### View resolved configuration

Check which environment variables are being used:

```bash
# List all OTS-related variables
env | grep -E '^(HOST|SSL|SECRET|REDIS|COLONEL|AUTH_|SMTP_|FROM)'

# Test ERB resolution
erb config.yaml | grep -A5 "site:"
```

### Common issues

1. **Boolean conversion** - Use exact string matching:
   ```bash
   # Correct
   SSL=true
   AUTH_ENABLED=false
   
   # Incorrect (evaluates as true)
   SSL=1
   AUTH_ENABLED=no
   ```

2. **Missing quotes** - Shell interpretation:
   ```bash
   # Problematic
   REDIS_URL=redis://pass@host:6379
   
   # Safe
   REDIS_URL="redis://pass@host:6379"
   ```

3. **Precedence** - Environment variables always override file values:
   ```yaml
   # This default is ignored if ENV['HOST'] is set
   host: <%= ENV['HOST'] || 'localhost:3000' %>
   ```

4. **ERB syntax errors** - Check Ruby syntax:
   ```yaml
   # Wrong - missing quotes
   value: <%= ENV[HOST] %>
   
   # Correct
   value: <%= ENV['HOST'] %>
   ```
