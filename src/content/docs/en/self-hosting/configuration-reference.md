---
title: Environment Variables Reference
description: Complete reference for all Onetime Secret environment variables
sidebar:
  order: 5
---

# Environment Variables Reference

This comprehensive guide covers all environment variables available in Onetime Secret v0.22.4+.

## Configuration Files

Onetime Secret uses multiple configuration approaches:

- **`.env`** - Environment variables (this document)
- **`./etc/config.yaml`** - Main application configuration
- **`docker-compose.yml`** - Docker deployment settings

Environment variables take precedence over config.yaml values.

## Core Application Settings

### Server Configuration

| Variable | Default | Description |
|----------|---------|-------------|
| `SERVER_TYPE` | `thin` | Web server type (thin, puma, etc.) |
| `PORT` | `3000` | Port for the web server to listen on |
| `HOST` | `localhost:3000` | Hostname where the service will be accessible |
| `SSL` | `true` | Enable SSL/HTTPS for link generation |
| `RACK_ENV` | `production` | Application environment: `development`, `production`, `test` |
| `STDOUT_SYNC` | `true` | Synchronize stdout output |
| `ONETIME_DEBUG` | `false` | Enable debug logging |

### Essential Security

| Variable | Default | Description |
|----------|---------|-------------|
| `SECRET` | - | **REQUIRED** - 32-character hex key for encryption ⚠️ Never change after setup |

> **Critical**: Generate with `openssl rand -hex 32` and backup securely. Changing this key will make existing secrets unrecoverable.

## Database & Storage

### Redis Configuration

| Variable | Default | Description |
|----------|---------|-------------|
| `REDIS_URL` | `redis://localhost:6379/0` | Main Redis connection string with auth |

### Redis Database Mapping

Onetime Secret uses multiple Redis logical databases for data separation:

| Variable | Default | Purpose |
|----------|---------|---------|
| `REDIS_DBS_SESSION` | `1` | User sessions |
| `REDIS_DBS_SECRET` | `8` | Secret storage |
| `REDIS_DBS_RATE_LIMIT` | `2` | Rate limiting data |
| `REDIS_DBS_METADATA` | `7` | Secret metadata |
| `REDIS_DBS_CUSTOM_DOMAIN` | `6` | Custom domain settings |
| `REDIS_DBS_CUSTOMER` | `6` | Customer data |
| `REDIS_DBS_EMAIL_RECEIPT` | `8` | Email receipts |
| `REDIS_DBS_FEEDBACK` | `11` | User feedback |
| `REDIS_DBS_EXCEPTION_INFO` | `12` | Error tracking |
| `REDIS_DBS_SYSTEM_SETTINGS` | `15` | System configuration |

> **Note**: For single-database Redis providers (like Upstash), set all database values to `0`.

## Authentication & User Management

### Core Authentication

| Variable | Default | Description |
|----------|---------|-------------|
| `AUTH_ENABLED` | `true` | Enable/disable entire authentication system |
| `AUTH_SIGNUP` | `false` | Allow new user registration |
| `AUTH_SIGNIN` | `true` | Allow user sign-in |
| `AUTH_AUTOVERIFY` | `false` | Skip email verification for new accounts |
| `AUTH_REQUIRED` | `false` | Require login for homepage secret creation |

### Administrative Access

| Variable | Default | Description |
|----------|---------|-------------|
| `COLONEL` | - | Admin email address (gets administrative privileges) |

## User Interface & Features

### Interface Controls

| Variable | Default | Description |
|----------|---------|-------------|
| `UI_ENABLED` | `true` | Enable web user interface |
| `API_ENABLED` | `true` | Enable API endpoints |
| `LOGO_URL` | `DefaultLogo.vue` | Logo component: `DefaultLogo.vue`, `LegacyLogo.vue`, `OnetimeSecretLogo.vue` |
| `SITE_NAME` | `One-Time Secret` | Custom site name override |
| `HEADER_ENABLED` | `true` | Enable header customization |
| `HEADER_NAV_ENABLED` | `true` | Enable header navigation |

### Footer Links

| Variable | Default | Description |
|----------|---------|-------------|
| `FOOTER_LINKS` | `false` | Enable footer links |
| `TERMS_URL` | - | Terms of service URL |
| `TERMS_EXTERNAL` | `false` | Terms URL is external link |
| `PRIVACY_URL` | - | Privacy policy URL |
| `PRIVACY_EXTERNAL` | `false` | Privacy URL is external link |
| `STATUS_URL` | - | Status page URL |
| `STATUS_EXTERNAL` | `true` | Status URL is external link |
| `ABOUT_URL` | - | About page URL |
| `ABOUT_EXTERNAL` | `false` | About URL is external link |
| `CONTACT_URL` | - | Contact page URL |

## Secret Management

### Secret Options

| Variable | Default | Description |
|----------|---------|-------------|
| `DEFAULT_TTL` | - | Default time-to-live for secrets (seconds) |
| `TTL_OPTIONS` | - | Available TTL options (space-separated seconds) |

### Passphrase Settings

| Variable | Default | Description |
|----------|---------|-------------|
| `PASSPHRASE_REQUIRED` | `false` | Require passphrase for all secrets |
| `PASSPHRASE_MIN_LENGTH` | `8` | Minimum passphrase length |
| `PASSPHRASE_MAX_LENGTH` | `128` | Maximum passphrase length |
| `PASSPHRASE_ENFORCE_COMPLEXITY` | `false` | Require complex passphrases |

### Password Generation

| Variable | Default | Description |
|----------|---------|-------------|
| `PASSWORD_GEN_LENGTH` | `12` | Default generated password length |
| `PASSWORD_GEN_UPPERCASE` | `true` | Include uppercase letters |
| `PASSWORD_GEN_LOWERCASE` | `true` | Include lowercase letters |
| `PASSWORD_GEN_NUMBERS` | `true` | Include numbers |
| `PASSWORD_GEN_SYMBOLS` | `false` | Include symbols |
| `PASSWORD_GEN_EXCLUDE_AMBIGUOUS` | `true` | Exclude ambiguous characters (0, O, l, 1, I) |

## Email Configuration

### Email Provider Settings

| Variable | Default | Description |
|----------|---------|-------------|
| `EMAILER_MODE` | `smtp` | Email mode: `smtp` or provider-specific |
| `EMAILER_REGION` | - | Email service region |
| `FROM_EMAIL` | - | Sender email address |
| `FROMNAME` | `Support` | Sender display name |

### SMTP Configuration

| Variable | Default | Description |
|----------|---------|-------------|
| `SMTP_HOST` | - | SMTP server hostname |
| `SMTP_PORT` | `587` | SMTP server port |
| `SMTP_USERNAME` | - | SMTP authentication username |
| `SMTP_PASSWORD` | - | SMTP authentication password |
| `SMTP_AUTH` | `login` | SMTP authentication method |
| `SMTP_TLS` | `true` | Use TLS encryption |

### Email Validation

| Variable | Default | Description |
|----------|---------|-------------|
| `VERIFIER_EMAIL` | - | Email address for SMTP validation |
| `VERIFIER_DOMAIN` | - | Domain for email verification |

## Security & Protection

### Anti-Spam Protection

| Variable | Default | Description |
|----------|---------|-------------|
| `AUTHENTICITY_TYPE` | `altcha` | Captcha/verification type |
| `AUTHENTICITY_SECRET_KEY` | - | Secret key for verification system |
| `CSP_ENABLED` | `false` | Enable Content Security Policy |

## Feature Flags

### Regional & Domain Features

| Variable | Default | Description |
|----------|---------|-------------|
| `REGIONS_ENABLED` | `false` | Enable multi-region support |
| `JURISDICTION` | - | Current legal jurisdiction |
| `DOMAINS_ENABLED` | `false` | Enable custom domains |
| `DEFAULT_DOMAIN` | - | Default domain for links |

### Internationalization

| Variable | Default | Description |
|----------|---------|-------------|
| `I18N_ENABLED` | `false` | Enable internationalization |
| `I18N_DEFAULT_LOCALE` | `en` | Default language locale |

### Business Features

| Variable | Default | Description |
|----------|---------|-------------|
| `PLANS_ENABLED` | `false` | Enable subscription plans |
| `STRIPE_KEY` | - | Stripe API key |
| `STRIPE_WEBHOOK_SIGNING_SECRET` | - | Stripe webhook secret |

## Monitoring & Diagnostics

### Error Tracking

| Variable | Default | Description |
|----------|---------|-------------|
| `DIAGNOSTICS_ENABLED` | `false` | Enable diagnostics collection |
| `SENTRY_DSN_BACKEND` | - | Sentry DSN for backend errors |
| `SENTRY_DSN_FRONTEND` | - | Sentry DSN for frontend errors |
| `SENTRY_VUE_TRACK_COMPONENTS` | `true` | Track Vue component errors |
| `SENTRY_SAMPLE_RATE` | - | Error sampling rate |
| `SENTRY_MAX_BREADCRUMBS` | - | Maximum breadcrumbs to keep |
| `SENTRY_LOG_ERRORS` | `true` | Log errors to Sentry |

### Logging

| Variable | Default | Description |
|----------|---------|-------------|
| `LOG_HTTP_REQUESTS` | `true` | Log HTTP requests |
| `HEADER_PREFIX` | `ONETIME_` | Prefix for custom headers |

## Development Settings

### Frontend Development

| Variable | Default | Description |
|----------|---------|-------------|
| `FRONTEND_HOST` | - | Frontend development server host |
| `VITE_API_BASE_URL` | - | API base URL for Vite dev server |

## Clustering & Advanced

### Cluster Configuration

| Variable | Default | Description |
|----------|---------|-------------|
| `CLUSTER_TYPE` | - | Cluster type for multi-domain setups |
| `APPROXIMATED_API_KEY` | - | API key for cluster communication |
| `APPROXIMATED_PROXY_CLUSTER_IP` | - | Cluster IP address |
| `APPROXIMATED_PROXY_CLUSTER_HOST` | - | Cluster hostname |
| `APPROXIMATED_PROXY_CLUSTER_NAME` | - | Cluster name |
| `APPROXIMATED_PROXY_VHOST_TARGET` | - | Virtual host target |

## Configuration Examples

### Minimal Production Setup

```bash
# Essential settings only
HOST=your-domain.com
SSL=true
SECRET=your-32-character-hex-key-here
REDIS_URL=redis://password@redis-host:6379/0
COLONEL=admin@your-domain.com
AUTH_ENABLED=true
```

### High Security Configuration

```bash
# Maximum security settings
HOST=your-domain.com
SSL=true
SECRET=your-32-character-hex-key-here
REDIS_URL=redis://password@redis-host:6379/0

# Strict authentication
AUTH_ENABLED=true
AUTH_SIGNUP=false
AUTH_REQUIRED=true
COLONEL=admin@your-domain.com

# Strict passphrase requirements
PASSPHRASE_REQUIRED=true
PASSPHRASE_MIN_LENGTH=16
PASSPHRASE_ENFORCE_COMPLEXITY=true

# Security headers
CSP_ENABLED=true
AUTHENTICITY_TYPE=altcha
AUTHENTICITY_SECRET_KEY=your-hmac-key-here
```

### Public Service Configuration

```bash
# Open public instance
HOST=your-domain.com
SSL=true
SECRET=your-32-character-hex-key-here
REDIS_URL=redis://password@redis-host:6379/0

# Open authentication
AUTH_ENABLED=true
AUTH_SIGNUP=true
AUTH_REQUIRED=false

# Reasonable defaults
PASSPHRASE_MIN_LENGTH=8
DEFAULT_TTL=86400
TTL_OPTIONS="1800 43200 86400 259200"
```

### Development Configuration

```bash
# Development settings
HOST=localhost:3000
SSL=false
SECRET=development-secret-key-32chars
REDIS_URL=redis://localhost:6379/0
ONETIME_DEBUG=true
RACK_ENV=development

# Relaxed auth for testing
AUTH_ENABLED=true
AUTH_SIGNUP=true
AUTH_AUTOVERIFY=true
COLONEL=dev@localhost
```

## Security Best Practices

### Required Security Settings

1. **Generate secure SECRET key:**
   ```bash
   openssl rand -hex 32
   ```

2. **Use strong Redis authentication:**
   ```bash
   REDIS_URL=redis://strong-password@host:6379/0
   ```

3. **Enable SSL in production:**
   ```bash
   SSL=true
   HOST=your-domain.com  # No http:// prefix
   ```

4. **Set admin email:**
   ```bash
   COLONEL=your-admin@your-domain.com
   ```

### Optional Security Enhancements

- Enable `CSP_ENABLED=true` for Content Security Policy
- Set `AUTH_REQUIRED=true` for authenticated-only access
- Use `PASSPHRASE_REQUIRED=true` for mandatory passphrases
- Configure `AUTHENTICITY_SECRET_KEY` for anti-spam protection

## Troubleshooting

### Common Configuration Issues

**SECRET key problems:**
- Never change SECRET after initial setup
- Must be exactly 32 hexadecimal characters
- Store backup in secure location

**Redis connection issues:**
- Check Redis URL format: `redis://[password@]host:port/db`
- Verify Redis server is running and accessible
- Test with: `redis-cli -u $REDIS_URL ping`

**SSL/Host configuration:**
- Don't include protocol in HOST variable
- Set `SSL=true` for HTTPS deployments
- Use `SSL=false` only for development

**Email not working:**
- Verify SMTP credentials and settings
- Check firewall rules for SMTP ports
- Test with simple SMTP client

For more configuration details, see the [main configuration guide](./configuration).
