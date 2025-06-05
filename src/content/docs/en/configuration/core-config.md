---
title: Core Configuration Reference
description: Complete reference for OneTimeSecret's infrastructure configuration (config.yaml)
---

Core configuration manages OneTimeSecret's foundational infrastructure settings through `etc/config.yaml`. These parameters require application restart to modify and form the bedrock of system operations.

## Site Configuration

### Basic Settings

```yaml
site:
  # Primary hostname and port
  host: localhost:3000
  
  # Enable HTTPS enforcement
  ssl: false
  
  # Application secret key for cryptographic operations
  # CRITICAL: Must change from default before production
  secret: CHANGEME
```

### Authentication System

```yaml
site:
  authentication:
    # Toggle authentication system
    enabled: true
    
    # Administrator email addresses with elevated privileges
    # The term "colonel" references protected system core access
    colonels:
      - admin@example.com
```

### Anti-Bot Protection (Altcha)

```yaml
site:
  authenticity:
    # Protection method (currently supports 'altcha')
    type: altcha
    
    # HMAC key for authenticity challenges
    # CRITICAL: Replace default value
    secret_key: <REPLACE_WITH_STRONG_HMAC_KEY>
```

### Security Middleware

Individually toggleable security protections from rack-contrib and rack-protection:

```yaml
middleware:
  # Serve frontend Vue application assets
  static_files: true
  
  # Sanitize request parameters for proper UTF-8 encoding
  utf8_sanitizer: true
  
  # CSRF protection via origin validation
  http_origin: true
  
  # HTML entity escaping in request parameters
  escaped_params: true
  
  # X-XSS-Protection browser header
  xss_header: true
  
  # Clickjacking protection via X-Frame-Options
  frame_options: true
  
  # Block directory traversal attacks
  path_traversal: true
  
  # Prevent session fixation via cookie manipulation
  cookie_tossing: true
  
  # Validate IP addresses against spoofing
  ip_spoofing: true
  
  # Force HTTPS via HSTS headers
  strict_transport: true
```

## Storage Configuration

### Redis Connection

```yaml
storage:
  db:
    connection:
      # Redis connection string
      url: redis://localhost:6379
```

### Database Mapping

Redis database allocation by data type (0-15 available):

```yaml
storage:
  db:
    database_mapping:
      session: 1          # User session storage
      splittest: 1        # A/B testing data
      custom_domain: 6    # Custom domain configurations
      customer: 6         # Customer account data
      subdomain: 6        # Subdomain mappings
      metadata: 7         # Secret metadata
      email_receipt: 8    # Email delivery tracking
      secret: 8           # Encrypted secret storage
      rate_limit: 2       # Rate limiting counters
      feedback: 11        # User feedback submissions
      exception_info: 12  # Error tracking data
      system_settings: 15 # Runtime settings cache
```

## Mail Configuration

### Connection Settings

```yaml
mail:
  connection:
    # Delivery method: 'ses', 'smtp', etc.
    mode: smtp
    
    # AWS SES region (for 'ses' mode)
    region: us-east-1
    
    # Sender configuration
    # CRITICAL: Change from default
    from: CHANGEME@example.com
    fromname: Onetime Secret
    
    # SMTP configuration
    host: smtp.example.com
    port: 587
    user: username
    pass: password
    auth: login
    tls: true
```

### Development Mail Setup

For local development with Mailpit:

```yaml
mail:
  connection:
    mode: smtp
    host: 127.0.0.1
    port: 1025
    user: ~
    pass: ~
    auth: false
    tls: false
```

## Internationalization

### Basic Configuration

```yaml
i18n:
  # Toggle internationalization features
  enabled: true
  
  # Default language code
  default_locale: en
```

### Locale Fallbacks

Define fallback chains when translations are missing:

```yaml
i18n:
  fallback_locale:
    fr-CA: [fr_CA, fr_FR, en]
    fr: [fr_FR, fr_CA, en]
    de-AT: [de_AT, de, en]
    de: [de, de_AT, en]
    default: [en]
```

### Available Locales

Complete translations available:

```yaml
i18n:
  locales:
    # European
    - bg
    - da_DK
    - de
    - de_AT
    - el_GR
    - en
    - es
    - fr_CA
    - fr_FR
    - it_IT
    - nl
    - pl
    - sv_SE
    - tr
    - uk
    
    # Asian
    - ja
    - ko
    
    # Pacific
    - mi_NZ
    
    # Americas
    - pt_BR
```

Partially translated locales:

```yaml
i18n:
  incomplete:
    - ar
    - ca_ES
    - cs
    - he
    - hu
    - pt_PT
    - ru
    - sl_SI
    - vi
    - zh
```

## Development Configuration

### Development Mode

```yaml
development:
  # Auto-detect from RACK_ENV
  enabled: <%= ['development', 'dev'].include?(ENV['RACK_ENV']) %>
  
  # Enable debug logging
  debug: false
  
  # Frontend development server
  # Use 'http://localhost:5173' for built-in Vite proxy
  # Leave empty when using external reverse proxy
  frontend_host: http://localhost:5173
```

## Experimental Features

### Secret Rotation

```yaml
experimental:
  # Allow running without site.secret (DANGEROUS)
  # Only for recovery or migration scenarios
  allow_nil_global_secret: false
  
  # Previous secret keys for rotation
  # Remove after all secrets expire or re-encrypt
  rotated_secrets: []
  
  # Freeze middleware stack after initialization
  freeze_app: false
```

## Environment Variables

All values support ERB templating:

```yaml
# Simple override with default
host: <%= ENV['HOST'] || 'localhost:3000' %>

# Boolean conversion
ssl: <%= ENV['SSL'] == 'true' || false %>

# Required value (no default)
secret: <%= ENV['SECRET'] || 'CHANGEME' %>

# Optional value
api_key: <%= ENV['API_KEY'] %>
```

## Security Checklist

Before production deployment:

1. **Change all CHANGEME values**
   - `site.secret`
   - `site.authenticity.secret_key`
   - `mail.connection.from`
   - `site.authentication.colonels`

2. **Configure Redis security**
   - Set strong password
   - Enable SSL if remote
   - Restrict network access

3. **Enable security middleware**
   - Review each setting
   - Disable only with equivalent proxy protection

4. **Set up mail delivery**
   - Configure SMTP or SES
   - Test email delivery
   - Set valid sender address

5. **Review experimental features**
   - Ensure all disabled
   - Document any exceptions