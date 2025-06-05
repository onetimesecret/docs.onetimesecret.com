---
title: System Settings Reference
description: Complete reference for OneTimeSecret's operational settings (system_settings.defaults.yaml)
---

System settings define operational parameters that can be modified at runtime through `etc/system_settings.defaults.yaml`. Unlike core configuration, these settings focus on user-facing features and operational limits.

## User Interface

### Header Configuration

```yaml
user_interface:
  header:
    # Toggle header customization
    enabled: true
    
    branding:
      logo:
        # Logo image path or Vue component name
        url: DefaultLogo.vue
        alt: Share a Secret One-Time
        href: /
      
      # Override site name (falls back to i18n)
      site_name: ~
    
    navigation:
      # Toggle header navigation
      enabled: true
```

### Footer Links

```yaml
user_interface:
  footer_links:
    # Master switch for footer links
    enabled: false
    
    groups:
      - name: legal
        i18n_key: web.footer.legals
        links:
          - text: Terms of Service
            i18n_key: terms-of-service
            url: /terms
            external: false
          
          - text: Privacy Policy
            i18n_key: privacy-policy
            url: /privacy
            external: false
```

### Authentication UI

```yaml
user_interface:
  # Enable user registration
  signup: true
  
  # Enable user login
  signin: true
  
  # Auto-verify email addresses
  autoverify: false
```

## API Configuration

```yaml
api:
  # Toggle API access
  enabled: true
```

## Secret Options

```yaml
secret_options:
  # Default TTL in seconds when none specified
  default_ttl: 604800  # 7 days
  
  # Available TTL options (in seconds)
  ttl_options:
    - 300     # 5 minutes
    - 3600    # 1 hour
    - 86400   # 1 day
    - 604800  # 7 days
```

## Features

### Incoming Email Processing

```yaml
features:
  incoming:
    enabled: false
    email: incoming@example.com
    passphrase: abacus
    # Validation pattern for incoming content
    regex: ~
```

### Analytics (StatHat)

```yaml
features:
  stathat:
    enabled: false
    apikey: ~
    default_chart: ~
```

### Multi-Region Support

```yaml
features:
  regions:
    enabled: false
    current_jurisdiction: us
    jurisdictions:
      - name: us
        domain: onetimesecret.com
        icon: 🇺🇸
      - name: eu
        domain: eu.onetimesecret.com
        icon: 🇪🇺
```

### Subscription Plans

```yaml
features:
  plans:
    enabled: false
    stripe_key: ~
    webhook_signing_secret: ~
    payment_links:
      tier1: ~
      tier2: ~
      tier3: ~
```

### Custom Domains

```yaml
features:
  domains:
    enabled: false
    # Default domain for link generation
    default: ~
    
    cluster:
      type: ~
      api_key: ~
      cluster_ip: <CLUSTER_IP>
      cluster_host: <CLUSTER_HOST>
      cluster_name: <CLUSTER_NAME>
      vhost_target: <VHOST_TARGET>
```

## Diagnostics

### Sentry Integration

```yaml
diagnostics:
  sentry:
    defaults:
      # Primary Sentry DSN
      dsn: ~
      # Percentage of events to sample (0.0 to 1.0)
      sampleRate: 0.10
      # Maximum breadcrumbs to capture
      maxBreadcrumbs: 5
      # Log errors to console
      logErrors: true
    
    backend:
      # Ruby-specific DSN
      dsn: ~
    
    frontend:
      # Vue-specific DSN
      dsn: ~
      # Enable Vue component tracking
      trackComponents: true
```

## Rate Limits

Per-user limits over 20-minute rolling windows:

### Core Operations

```yaml
limits:
  # Secret management
  create_secret: 100000
  show_secret: 2000
  burn_secret: 2000
  show_metadata: 2000
```

### Authentication

```yaml
limits:
  # Account operations
  create_account: 10
  authenticate_session: 50
  failed_passphrase: 15
  
  # Password recovery
  forgot_password_request: 20
  forgot_password_reset: 30
```

### Account Management

```yaml
limits:
  # Profile management
  update_account: 10
  destroy_account: 2
```

### Domain Management

```yaml
limits:
  # Custom domain operations
  add_domain: 30
  remove_domain: 30
  list_domains: 100
  verify_domain: 100
```

## Mail Validation

### Recipient Validation

```yaml
mail:
  validation:
    recipients:
      # Validation method: :regex, :mx, :mx_blacklist, :smtp
      default_validation_type: :mx
      
      # SMTP verification settings
      verifier_email: verify@example.com
      verifier_domain: example.com
      connection_timeout: 1
      response_timeout: 1
      connection_attempts: 2
      
      # Domain restrictions
      allowed_domains_only: false
      
      # DNS servers for MX lookup
      dns:
        - 1.1.1.1
        - 8.8.4.4
        - 208.67.220.220
      
      # SMTP settings
      smtp_port: 25
      smtp_fail_fast: true
      
      # Logging configuration
      logger:
        tracking_event: :error
        stdout: true
```

### Account Email Validation

```yaml
mail:
  validation:
    accounts:
      # Identical structure to recipients
      # Separate configuration for account emails
      default_validation_type: :mx
      # ... (same options as recipients)
```

## Environment Variable Integration

All settings support ERB templating:

```yaml
# Boolean with environment override
enabled: <%= ENV['FEATURE_ENABLED'] != 'false' %>

# Value with default
api_key: <%= ENV['API_KEY'] || 'default_value' %>

# Numeric value
timeout: <%= ENV['TIMEOUT'] || 30 %>

# Conditional logic
validation_type: <%= ENV['STRICT_VALIDATION'] == 'true' ? :smtp : :mx %>
```

## Common Configurations

### Minimal Production

```yaml
user_interface:
  header:
    enabled: true
  footer_links:
    enabled: false
  signup: true
  signin: true

api:
  enabled: true

limits:
  create_secret: 1000
  show_secret: 2000
```

### Enterprise Deployment

```yaml
user_interface:
  header:
    branding:
      logo:
        url: /assets/company-logo.png
        alt: Company Secret Sharing
      site_name: SecureShare
  footer_links:
    enabled: true

features:
  domains:
    enabled: true
  plans:
    enabled: false

diagnostics:
  sentry:
    defaults:
      dsn: https://key@sentry.company.com/project
      sampleRate: 0.25
```

### Development Environment

```yaml
user_interface:
  autoverify: true

limits:
  # Relaxed limits for testing
  create_secret: 1000000
  failed_passphrase: 100

diagnostics:
  sentry:
    defaults:
      logErrors: true
      sampleRate: 1.0
```

## Best Practices

1. **Start with defaults** - The default configuration works well for most deployments

2. **Adjust rate limits** based on:
   - Expected user volume
   - Infrastructure capacity
   - Security requirements

3. **Configure mail validation** appropriate to your security needs:
   - `:regex` - Fast, basic validation
   - `:mx` - Verify domain exists
   - `:smtp` - Full delivery verification

4. **Enable diagnostics** in production:
   - Set up Sentry for error tracking
   - Use conservative sample rates
   - Monitor performance impact

5. **Customize UI** thoughtfully:
   - Keep navigation simple
   - Test custom branding
   - Maintain accessibility