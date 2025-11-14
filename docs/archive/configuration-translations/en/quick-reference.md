---
title: Quick Reference
description: Configuration cheat sheet and troubleshooting guide
sidebar:
  order: 7
---

# Configuration Quick Reference

## Emergency Recovery

```bash
# Start with minimal config
export SECRET=$(openssl rand -hex 32)
export REDIS_URL="redis://localhost:6379/0"
export FROM_EMAIL="admin@company.com"
export COLONEL="admin@company.com"

# Check configuration syntax
ruby -ryaml -e "YAML.load_file('etc/config.yaml')"
```

## Common Issues

| Problem | Solution |
|---------|----------|
| App won't start | Check `SECRET` is set and Redis is running |
| Emails not sending | Verify `FROM_EMAIL` and SMTP settings |
| Rate limits too strict | Adjust values in system settings |
| UI changes not applying | Check if setting is in system_settings vs config |

## Must-Change Values

```bash
# Before production
SECRET=<generate-64-char-hex>
AUTHENTICITY_SECRET_KEY=<generate-64-char-hex>
FROM_EMAIL=<valid-email>
COLONEL=<admin-email>
```

## Restart Required vs Runtime

**Restart Required (config.yaml):**
- Database connections
- Site host/SSL
- Mail server settings
- Security middleware

**Runtime Adjustable (system_settings):**
- Feature flags
- Rate limits
- UI customization
- API settings

## Configuration File Locations

```bash
# Core configuration
etc/config.yaml

# System settings
etc/system_settings.defaults.yaml

# Environment overrides
.env
```

## Validation Commands

```bash
# Test YAML syntax
ruby -ryaml -e "YAML.load_file('etc/config.yaml')"

# Check Redis connection
redis-cli -u $REDIS_URL ping

# Verify environment variables
env | grep -E '^(SECRET|REDIS|FROM_EMAIL|COLONEL)'
```

## Common Environment Variables

```bash
# Essential
HOST=onetimesecret.com
SSL=true
SECRET=<generated-secret>
REDIS_URL=redis://localhost:6379/0
FROM_EMAIL=noreply@company.com
COLONEL=admin@company.com

# Optional
AUTH_ENABLED=true
API_ENABLED=true
HEADER_ENABLED=true
SENTRY_DSN=https://key@sentry.io/project
```

## Deployment Checklist

- [ ] Generate strong `SECRET` value
- [ ] Set valid `FROM_EMAIL` address
- [ ] Configure `COLONEL` admin email
- [ ] Test Redis connectivity
- [ ] Verify mail delivery
- [ ] Check SSL certificate
- [ ] Set appropriate rate limits
- [ ] Enable error tracking
