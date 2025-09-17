---
title: Configuration Reference
description: Complete reference for all Onetime Secret configuration options
sidebar:
  order: 4
---

# Configuration Reference

This comprehensive guide covers all configuration options for self-hosted Onetime Secret instances.

## Configuration Files

Onetime Secret uses multiple configuration files:

- **`.env`** - Environment variables for basic settings
- **`config/config.yaml`** - Main application configuration
- **`docker-compose.yml`** - Docker deployment settings (if using Docker)

## Environment Variables

Set these in your `.env` file or environment:

### Core Application Settings

| Variable | Default | Description |
|----------|---------|-------------|
| `RACK_ENV` | `development` | Application environment: `development`, `production`, `test` |
| `PORT` | `7143` | Port for the web server to listen on |
| `HOST` | `0.0.0.0` | Interface to bind the web server to |
| `WORKERS` | `1` | Number of worker processes (Puma) |
| `THREADS` | `5` | Number of threads per worker |

### Database & Storage

| Variable | Default | Description |
|----------|---------|-------------|
| `REDIS_URL` | `redis://localhost:6379/0` | Redis connection string for sessions and cache |
| `DATABASE_URL` | - | PostgreSQL connection string (optional, Redis is default) |
| `REDIS_POOL_SIZE` | `10` | Redis connection pool size |
| `REDIS_TIMEOUT` | `5` | Redis connection timeout in seconds |

### Security & Authentication

| Variable | Default | Description |
|----------|---------|-------------|
| `SECRET_KEY_BASE` | - | Secret key for sessions and encryption (required in production) |
| `AUTHENTICATION_MODE` | `optional` | Authentication requirement: `optional`, `required`, `disabled` |
| `PASSPHRASE_MIN_LENGTH` | `8` | Minimum length for secret passphrases |
| `PASSPHRASE_ENFORCE_COMPLEXITY` | `false` | Require complex passphrases (numbers, symbols, etc.) |
| `SESSION_TIMEOUT` | `3600` | Session timeout in seconds |
| `MAX_SECRET_SIZE` | `1048576` | Maximum secret size in bytes (1MB default) |

### User Interface & Features

| Variable | Default | Description |
|----------|---------|-------------|
| `UI_ENABLED` | `true` | Enable web user interface |
| `HOMEPAGE_ACCESS` | `public` | Homepage access level: `public`, `authenticated`, `disabled` |
| `SIGNUP_ENABLED` | `true` | Allow new user registration |
| `CONTACT_EMAIL` | - | Contact email displayed in footer |
| `BRAND_NAME` | `Onetime Secret` | Custom brand name for your instance |

### Password Generation

| Variable | Default | Description |
|----------|---------|-------------|
| `PASSWORD_GEN_ENABLED` | `true` | Enable password generation feature |
| `PASSWORD_GEN_LENGTH` | `12` | Default generated password length |
| `PASSWORD_GEN_SYMBOLS` | `true` | Include symbols in generated passwords |
| `PASSWORD_GEN_NUMBERS` | `true` | Include numbers in generated passwords |
| `PASSWORD_GEN_UPPERCASE` | `true` | Include uppercase letters |
| `PASSWORD_GEN_LOWERCASE` | `true` | Include lowercase letters |
| `PASSWORD_GEN_EXCLUDE_AMBIGUOUS` | `true` | Exclude ambiguous characters (0, O, l, I) |

### Email Configuration

| Variable | Default | Description |
|----------|---------|-------------|
| `SMTP_HOST` | - | SMTP server hostname |
| `SMTP_PORT` | `587` | SMTP server port |
| `SMTP_USERNAME` | - | SMTP authentication username |
| `SMTP_PASSWORD` | - | SMTP authentication password |
| `SMTP_TLS` | `true` | Use TLS encryption for SMTP |
| `EMAIL_FROM` | `noreply@localhost` | Default sender email address |

### Rate Limiting & Security

| Variable | Default | Description |
|----------|---------|-------------|
| `RATE_LIMIT_ENABLED` | `true` | Enable rate limiting |
| `RATE_LIMIT_REQUESTS` | `100` | Requests per time window |
| `RATE_LIMIT_WINDOW` | `3600` | Rate limit window in seconds |
| `IP_WHITELIST` | - | Comma-separated IP addresses to whitelist |
| `IP_BLACKLIST` | - | Comma-separated IP addresses to blacklist |

### Logging & Monitoring

| Variable | Default | Description |
|----------|---------|-------------|
| `LOG_LEVEL` | `info` | Log level: `debug`, `info`, `warn`, `error` |
| `LOG_FORMAT` | `text` | Log format: `text`, `json` |
| `METRICS_ENABLED` | `false` | Enable Prometheus metrics endpoint |
| `HEALTH_CHECK_ENABLED` | `true` | Enable health check endpoint |

## Main Configuration File (config.yaml)

The main configuration file provides detailed control over all aspects of your instance.

### Site Configuration

```yaml
:site:
  # Basic site settings
  :host: your-domain.com
  :port: 7143
  :ssl: true
  :protocol: https

  # Branding
  :name: "Your Organization's Secret Sharing"
  :tagline: "Secure secret sharing for your team"
  :company: "Your Company Name"

  # Contact information
  :contact:
    :email: admin@your-domain.com
    :support_url: https://your-domain.com/support
```

### Authentication & Security

```yaml
:authentication:
  # Authentication requirements
  :required: true
  :signup_enabled: true
  :guest_access: false

  # Password policies
  :passphrase:
    :min_length: 12
    :enforce_complexity: true
    :require_numbers: true
    :require_symbols: true
    :require_mixed_case: true

  # Session settings
  :session:
    :timeout: 3600
    :secure_cookies: true
    :same_site: "Strict"

  # Account lockout
  :lockout:
    :enabled: true
    :max_attempts: 5
    :lockout_duration: 300
```

### Secret Management

```yaml
:secrets:
  # Default settings for new secrets
  :default_ttl: 3600
  :max_ttl: 86400
  :max_size: 1048576

  # View limitations
  :max_views: 1
  :allow_multiple_views: false

  # Encryption settings
  :encryption:
    :algorithm: "aes-256-gcm"
    :key_derivation: "pbkdf2"
    :iterations: 100000
```

### User Interface

```yaml
:ui:
  # Interface availability
  :enabled: true
  :theme: "default"
  :dark_mode: true

  # Homepage settings
  :homepage:
    :access_level: "public"
    :show_recent_activity: false
    :max_recent_secrets: 10

  # Feature toggles
  :features:
    :password_generator: true
    :file_uploads: false
    :api_access: true
    :bulk_operations: false
```

### Database Configuration

```yaml
:database:
  # Redis settings (default storage)
  :redis:
    :url: "redis://localhost:6379/0"
    :pool_size: 10
    :timeout: 5
    :ttl: 86400

  # PostgreSQL settings (optional)
  :postgresql:
    :enabled: false
    :host: localhost
    :port: 5432
    :database: onetime_production
    :username: onetime
    :password: secure_password
    :pool: 5
    :timeout: 5000
```

### Email Configuration

```yaml
:email:
  # Email features
  :enabled: true
  :notifications: true

  # SMTP settings
  :smtp:
    :host: smtp.your-provider.com
    :port: 587
    :username: your-username
    :password: your-password
    :tls: true
    :authentication: "plain"

  # Email templates
  :from: "noreply@your-domain.com"
  :reply_to: "support@your-domain.com"
  :templates:
    :secret_created: "templates/secret_created.erb"
    :secret_viewed: "templates/secret_viewed.erb"
```

### Rate Limiting & Security

```yaml
:security:
  # Rate limiting
  :rate_limiting:
    :enabled: true
    :requests_per_hour: 100
    :burst_size: 10
    :track_by: "ip"

  # IP filtering
  :ip_filtering:
    :whitelist: []
    :blacklist: []
    :block_tor: false
    :block_vpn: false

  # Security headers
  :headers:
    :hsts: true
    :frame_options: "DENY"
    :content_type_options: "nosniff"
    :xss_protection: true
```

### API Configuration

```yaml
:api:
  # API availability
  :enabled: true
  :versioning: "header"
  :default_version: "v1"

  # Authentication
  :authentication:
    :required: true
    :methods: ["api_key", "bearer_token"]
    :key_header: "X-API-Key"

  # Rate limiting (separate from web UI)
  :rate_limiting:
    :requests_per_hour: 1000
    :burst_size: 50

  # Response format
  :response:
    :format: "json"
    :include_metadata: true
    :pagination: true
```

### Logging & Monitoring

```yaml
:logging:
  # Log levels and destinations
  :level: "info"
  :format: "json"
  :destination: "stdout"
  :file: "/var/log/onetime/application.log"

  # Log rotation
  :rotation:
    :enabled: true
    :max_size: "100MB"
    :max_files: 10

  # Audit logging
  :audit:
    :enabled: true
    :events: ["secret_created", "secret_viewed", "user_login"]
    :destination: "/var/log/onetime/audit.log"

:monitoring:
  # Health checks
  :health_checks:
    :enabled: true
    :endpoint: "/health"
    :checks: ["database", "redis", "disk_space"]

  # Metrics
  :metrics:
    :enabled: false
    :provider: "prometheus"
    :endpoint: "/metrics"
    :namespace: "onetime"
```

## Configuration Examples

### High Security Configuration

For environments requiring maximum security:

```yaml
:authentication:
  :required: true
  :signup_enabled: false
  :passphrase:
    :min_length: 16
    :enforce_complexity: true

:secrets:
  :max_ttl: 3600
  :max_views: 1
  :allow_multiple_views: false

:security:
  :rate_limiting:
    :requests_per_hour: 50
  :headers:
    :hsts: true
    :frame_options: "DENY"

:ui:
  :homepage:
    :access_level: "authenticated"
    :show_recent_activity: false
```

### Public Service Configuration

For public-facing instances:

```yaml
:authentication:
  :required: false
  :signup_enabled: true
  :guest_access: true

:secrets:
  :default_ttl: 86400
  :max_ttl: 604800

:ui:
  :homepage:
    :access_level: "public"
    :show_recent_activity: true

:security:
  :rate_limiting:
    :requests_per_hour: 200
```

### Enterprise Configuration

For large organizations:

```yaml
:authentication:
  :required: true
  :signup_enabled: false

:database:
  :postgresql:
    :enabled: true
    :pool: 20

:email:
  :enabled: true
  :notifications: true

:api:
  :rate_limiting:
    :requests_per_hour: 5000

:monitoring:
  :metrics:
    :enabled: true
    :provider: "prometheus"
```

## Environment-Specific Settings

### Development

```yaml
:site:
  :ssl: false
  :protocol: http

:logging:
  :level: "debug"
  :format: "text"

:authentication:
  :required: false
```

### Staging

```yaml
:site:
  :ssl: true
  :protocol: https

:logging:
  :level: "info"
  :format: "json"

:authentication:
  :required: true

:secrets:
  :max_ttl: 3600
```

### Production

```yaml
:site:
  :ssl: true
  :protocol: https

:logging:
  :level: "warn"
  :format: "json"
  :audit:
    :enabled: true

:authentication:
  :required: true
  :lockout:
    :enabled: true

:security:
  :rate_limiting:
    :enabled: true
  :headers:
    :hsts: true

:monitoring:
  :health_checks:
    :enabled: true
  :metrics:
    :enabled: true
```

## Configuration Validation

### Syntax Validation

```bash
# Validate YAML syntax
ruby -ryaml -e "YAML.load_file('config/config.yaml')"

# Validate environment variables
bundle exec ruby -e "
  require './config/environment'
  puts 'Configuration valid!'
"
```

### Security Checklist

Before deploying to production:

- [ ] `SECRET_KEY_BASE` is set and secure
- [ ] SSL/TLS is enabled (`ssl: true`)
- [ ] Authentication is configured appropriately
- [ ] Rate limiting is enabled
- [ ] Security headers are configured
- [ ] Logging and monitoring are enabled
- [ ] Database credentials are secure
- [ ] Email configuration is tested

## Troubleshooting Configuration Issues

### Common Problems

**Configuration not loading:**
```bash
# Check file permissions
ls -la config/config.yaml

# Validate YAML syntax
ruby -ryaml -e "puts YAML.load_file('config/config.yaml')"
```

**Database connection errors:**
```bash
# Test Redis connection
redis-cli -u $REDIS_URL ping

# Test PostgreSQL connection
psql $DATABASE_URL -c "SELECT 1;"
```

**Email not working:**
```bash
# Test SMTP settings
bundle exec ruby -e "
  require 'net/smtp'
  Net::SMTP.start('$SMTP_HOST', $SMTP_PORT, 'localhost', '$SMTP_USERNAME', '$SMTP_PASSWORD', :auto)
  puts 'SMTP connection successful'
"
```

### Debug Mode

Enable debug logging for troubleshooting:

```yaml
:logging:
  :level: "debug"
  :format: "text"
```

Or via environment variable:
```bash
LOG_LEVEL=debug bundle exec ruby bin/onetime
```

## Advanced Configuration Topics

### Custom Encryption

For specialized encryption requirements:

```yaml
:secrets:
  :encryption:
    :algorithm: "aes-256-gcm"
    :key_derivation: "argon2"
    :memory_cost: 65536
    :time_cost: 3
    :parallelism: 4
```

### Multi-tenancy

Basic multi-tenant configuration:

```yaml
:multi_tenancy:
  :enabled: true
  :domain_based: true
  :default_tenant: "default"
  :tenant_isolation: "database"
```

### Integration Settings

For external service integrations:

```yaml
:integrations:
  :slack:
    :enabled: false
    :webhook_url: ""

  :teams:
    :enabled: false
    :webhook_url: ""

  :ldap:
    :enabled: false
    :host: "ldap.your-domain.com"
    :port: 389
    :base_dn: "dc=your-domain,dc=com"
```

This configuration reference provides comprehensive control over your Onetime Secret instance. Adjust settings based on your security requirements, infrastructure, and organizational needs.
