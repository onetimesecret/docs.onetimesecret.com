---
title: Configuration Overview
description: Understanding OneTimeSecret's dual-layer configuration architecture
---

OneTimeSecret uses a dual-layer configuration system designed to separate infrastructure concerns from operational settings. This architecture provides flexibility while maintaining security and stability.

## Configuration Architecture

### Two-Layer System

1. **Core Configuration** (`etc/config.yaml`)
   - Infrastructure settings requiring restart
   - Database connections and security middleware
   - Authentication systems and mail delivery
   - Critical security parameters

2. **System Settings** (`etc/system_settings.defaults.yaml`)
   - Runtime-adjustable operational parameters
   - Feature toggles and UI customization
   - Rate limits and validation rules
   - Business logic configuration

### Design Philosophy

This separation follows the principle of infrastructure as code while enabling operational flexibility:

- **Deploy-time changes**: Core configuration for system-critical settings
- **Runtime changes**: System settings for feature management
- **Security isolation**: Sensitive infrastructure separated from operational tweaks

## Configuration Loading

### Startup Process

1. Core configuration loads from `config.yaml`
2. Environment variables override file values via ERB templating
3. System settings load with defaults from `system_settings.defaults.yaml`
4. Database settings can override operational parameters at runtime

### Environment Variable Support

All configuration values support environment variable overrides:

```yaml
# Direct override
host: <%= ENV['HOST'] || 'localhost:3000' %>

# Boolean conversion
ssl: <%= ENV['SSL'] == 'true' || false %>

# Conditional presence
api_key: <%= ENV['API_KEY'] %>
```

## Security Considerations

### Critical Settings

Several configuration values must be changed from defaults before production:

- `site.secret`: Application cryptographic key
- `site.authenticity.secret_key`: Anti-bot protection key
- `mail.connection.from`: Sender email address
- Redis connection credentials

### Validation

Configuration validation occurs at application startup:
- Invalid values prevent application launch
- Descriptive error messages guide corrections
- Security-critical values are validated for strength

## Next Steps

- [Core Configuration Reference](/configuration/core-config) - Infrastructure settings
- [System Settings Reference](/configuration/system-settings) - Operational parameters
- [Environment Variables](/configuration/environment-variables) - Override patterns
- [Security Hardening](/configuration/security) - Production security guide