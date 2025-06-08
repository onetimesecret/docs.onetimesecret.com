---
title: Configuration Migration Guide
description: Migrating from monolithic to split configuration architecture
---

This guide helps you migrate from OneTimeSecret's single monolithic configuration file to the new split configuration architecture that separates core infrastructure settings from runtime-adjustable system settings.

## Understanding the Change

### Previous Architecture
- Single `config.yaml` file containing all settings
- Required restart for any configuration change
- Mixed infrastructure and operational concerns

### New Architecture
- **Core Configuration** (`config.yaml`) - Infrastructure settings
- **System Settings** (`system_settings.defaults.yaml`) - Operational parameters
- Clear separation of concerns
- Runtime-adjustable settings via database

## Migration Overview

### What Moves Where

| Setting Type | Old Location | New Location | Runtime Adjustable |
|-------------|--------------|--------------|-------------------|
| Redis connection | `:redis:` | Core config: `storage.db` | No |
| Mail server | `:emailer:` | Core config: `mail.connection` | No |
| Site host/SSL | `:site:` | Core config: `site` | No |
| UI customization | `:site:interface:` | System settings: `user_interface` | Yes |
| Feature flags | `:site:` (mixed) | System settings: `features` | Yes |
| Rate limits | `:limits:` | System settings: `limits` | Yes |
| Diagnostics | `:diagnostics:` | System settings: `diagnostics` | Yes |

## Step-by-Step Migration

### Step 1: Backup Current Configuration

```bash
# Backup existing configuration
cp etc/config.yaml etc/config.yaml.backup
cp etc/config.yaml etc/config.monolithic.yaml

# If using environment variables, document them
env | grep -E '^(HOST|SSL|SECRET|REDIS|SMTP)' > env.backup
```

### Step 2: Create New Configuration Files

Create `etc/config.yaml` with core settings:

```yaml
# Core infrastructure configuration
site:
  host: <%= ENV['HOST'] || 'localhost:3000' %>
  ssl: <%= ENV['SSL'] == 'true' || false %>
  secret: <%= ENV['SECRET'] || nil %>
  
  authentication:
    enabled: <%= ENV['AUTH_ENABLED'] != 'false' %>
    colonels:
      - <%= ENV['COLONEL'] || 'CHANGEME@example.com' %>
  
  authenticity:
    type: <%= ENV['AUTHENTICITY_TYPE'] || 'altcha' %>
    secret_key: <%= ENV['AUTHENTICITY_SECRET_KEY'] || '<REPLACE_WITH_STRONG_HMAC_KEY>' %>

storage:
  db:
    connection:
      url: <%= ENV['REDIS_URL'] || 'redis://localhost:6379/0' %>
    database_mapping:
      session: <%= ENV['REDIS_DBS_SESSION'] || 1 %>
      secret: <%= ENV['REDIS_DBS_SECRET'] || 8 %>
      metadata: <%= ENV['REDIS_DBS_METADATA'] || 7 %>
      # ... other mappings

mail:
  connection:
    mode: <%= ENV['EMAILER_MODE'] || 'smtp' %>
    from: <%= ENV['FROM_EMAIL'] || 'CHANGEME@example.com' %>
    # ... other mail settings

i18n:
  enabled: <%= ENV['I18N_ENABLED'] == 'true' || false %>
  default_locale: <%= ENV['I18N_DEFAULT_LOCALE'] || 'en' %>
  # ... locale configuration

development:
  enabled: <%= ['development', 'dev'].include?(ENV['RACK_ENV']) %>
  frontend_host: <%= ENV['FRONTEND_HOST'] || 'http://localhost:5173' %>

experimental:
  middleware:
    # Security middleware settings
    utf8_sanitizer: true
    path_traversal: true
    # ... other middleware
```

Create `etc/system_settings.defaults.yaml` with operational settings:

```yaml
# Runtime-adjustable operational settings
user_interface:
  header:
    enabled: <%= ENV['HEADER_ENABLED'] != 'false' %>
    branding:
      logo:
        url: <%= ENV['LOGO_URL'] || 'DefaultLogo.vue' %>
        alt: <%= ENV['LOGO_ALT'] || 'Share a Secret One-Time' %>
      site_name: <%= ENV['SITE_NAME'] %>
  
  footer_links:
    enabled: <%= ENV['FOOTER_LINKS'] == 'true' || false %>
    # ... link configuration
  
  signup: <%= ENV['AUTH_SIGNUP'] != 'false' %>
  signin: <%= ENV['AUTH_SIGNIN'] != 'false' %>
  autoverify: <%= ENV['AUTH_AUTOVERIFY'] == 'true' || false %>

api:
  enabled: <%= ENV['API_ENABLED'] != 'false' %>

secret_options:
  default_ttl: <%= ENV['DEFAULT_TTL'] || nil %>
  ttl_options: <%= (ENV['TTL_OPTIONS'] || nil) %>

features:
  domains:
    enabled: <%= ENV['DOMAINS_ENABLED'] == 'true' || false %>
    default: <%= ENV['DEFAULT_DOMAIN'] || nil %>
  
  plans:
    enabled: <%= ENV['PLANS_ENABLED'] == 'true' || false %>
    stripe_key: <%= ENV['STRIPE_KEY'] || nil %>
  
  regions:
    enabled: <%= ENV['REGIONS_ENABLED'] == 'true' || false %>
    current_jurisdiction: <%= ENV['JURISDICTION'] || nil %>

diagnostics:
  sentry:
    defaults:
      dsn: <%= ENV['SENTRY_DSN'] || nil %>
      sampleRate: <%= ENV['SENTRY_SAMPLE_RATE'] || '0.10' %>

limits:
  create_secret: 100000
  show_secret: 2000
  # ... other limits

mail:
  validation:
    recipients:
      default_validation_type: :mx
      # ... validation settings
```

### Step 3: Map Old Settings to New Locations

Common mappings from monolithic to split configuration:

```yaml
# OLD (monolithic)
:site:
  :host: localhost:3000
  :interface:
    :ui:
      :enabled: true
    :api:
      :enabled: true

# NEW (split)
# In config.yaml:
site:
  host: localhost:3000

# In system_settings.defaults.yaml:
api:
  enabled: true
```

### Step 4: Update Environment Variables

Some environment variable names have changed:

```bash
# Old → New mappings
REDIS_URL → REDIS_URL (unchanged)
COLONEL → COLONEL (unchanged)
FROM → FROM_EMAIL
UI_ENABLED → (removed - always enabled)
HEADER_NAV_ENABLED → HEADER_ENABLED
```

### Step 5: Test Configuration

1. **Syntax validation**:
   ```bash
   # Check YAML syntax
   ruby -ryaml -e "YAML.load_file('etc/config.yaml')"
   ruby -ryaml -e "YAML.load_file('etc/system_settings.defaults.yaml')"
   ```

2. **Start application in test mode**:
   ```bash
   RACK_ENV=development bin/rackup -p 3000
   ```

3. **Verify critical settings**:
   - Redis connection works
   - Mail configuration is correct
   - Authentication functions properly
   - Rate limits are applied

### Step 6: Deploy Changes

1. **Deploy new configuration files**
2. **Update environment variables**
3. **Restart application**
4. **Monitor for errors**

## Common Migration Issues

### Issue: Missing Settings

**Symptom**: Application fails to start with undefined method or nil errors

**Solution**: Check that all settings from monolithic config are mapped to either core config or system settings.

### Issue: Wrong Setting Location

**Symptom**: Runtime changes don't take effect

**Solution**: Ensure operational settings are in `system_settings.defaults.yaml`, not `config.yaml`.

### Issue: Environment Variable Conflicts

**Symptom**: Settings not applying as expected

**Solution**: Check for old environment variable names and update to new naming convention.

## Rollback Plan

If issues arise, rollback to monolithic configuration:

1. **Restore backup**:
   ```bash
   cp etc/config.monolithic.yaml etc/config.yaml
   ```

2. **Remove new files**:
   ```bash
   rm etc/system_settings.defaults.yaml
   ```

3. **Restart application**

## Post-Migration

### Verify Functionality

- [ ] Secrets can be created and retrieved
- [ ] Authentication works
- [ ] Email delivery functions
- [ ] Rate limiting is active
- [ ] UI customizations appear
- [ ] API endpoints respond

### Clean Up

1. **Remove backup files** after successful migration
2. **Document** any custom settings
3. **Update** deployment scripts
4. **Train** team on new configuration structure

## Benefits After Migration

1. **Operational Flexibility** - Change features without restart
2. **Clear Separation** - Infrastructure vs operational concerns
3. **Better Security** - Sensitive settings isolated
4. **Easier Management** - Logical organization of settings
5. **Future Ready** - Prepared for dynamic configuration
