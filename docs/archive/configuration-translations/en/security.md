---
title: Security Configuration Guide
description: Hardening OneTimeSecret for production deployment
---

This guide covers security-critical configuration settings and best practices for deploying OneTimeSecret in production environments.

## Critical Security Settings

### Application Secret

The `site.secret` is used for all cryptographic operations. **This must be changed before production deployment.**

```yaml
site:
  secret: <%= ENV['SECRET'] || 'CHANGEME' %>
```

Generate a strong secret:

```bash
# Using OpenSSL
openssl rand -hex 32

# Using Ruby
ruby -rsecurerandom -e 'puts SecureRandom.hex(32)'

# Set in environment
export SECRET=your-generated-64-character-hex-string
```

**Important**: Once set, this secret should never be changed. Changing it will make existing secrets unrecoverable.

### Authentication Protection

Configure anti-bot protection for forms:

```yaml
site:
  authenticity:
    type: altcha
    secret_key: <%= ENV['AUTHENTICITY_SECRET_KEY'] || '<REPLACE_WITH_STRONG_HMAC_KEY>' %>
```

Generate HMAC key:

```bash
export AUTHENTICITY_SECRET_KEY=$(openssl rand -hex 32)
```

### Administrator Access

Configure colonel (admin) accounts carefully:

```yaml
site:
  authentication:
    colonels:
      - <%= ENV['COLONEL'] || 'CHANGEME@example.com' %>
      - security-team@company.com
```

Colonels have access to:
- System statistics
- Configuration overview
- Performance metrics

## Security Middleware

### Production Configuration

Enable all security middleware in production:

```yaml
experimental:
  middleware:
    # Essential protections
    utf8_sanitizer: true      # Prevent encoding attacks
    path_traversal: true      # Block directory traversal
    ip_spoofing: true        # Validate client IPs

    # HTTPS enforcement
    strict_transport: true    # HSTS headers

    # Additional protections
    http_origin: true        # CSRF protection
    escaped_params: true     # XSS prevention
    xss_header: true        # Browser XSS filtering
    frame_options: true     # Clickjacking protection
    cookie_tossing: true    # Session fixation prevention
```

### Behind a Proxy

When running behind a security proxy (nginx, CloudFlare), some middleware can be disabled:

```yaml
experimental:
  middleware:
    # Proxy handles these
    strict_transport: false  # Proxy adds HSTS
    xss_header: false       # Proxy adds X-XSS-Protection
    frame_options: false    # Proxy adds X-Frame-Options

    # Application must handle these
    utf8_sanitizer: true
    path_traversal: true
    ip_spoofing: true
    http_origin: true
    escaped_params: true
    cookie_tossing: true
```

## Redis Security

### Connection Security

```yaml
storage:
  db:
    connection:
      # Use password authentication
      url: redis://:<password>@localhost:6379/0

      # For Redis 6+ with ACL
      url: redis://username:password@localhost:6379/0
```

### Network Security

1. **Bind to localhost** in Redis configuration:
   ```
   bind 127.0.0.1 ::1
   ```

2. **Enable authentication** in redis.conf:
   ```
   requirepass your-strong-redis-password
   ```

3. **Disable dangerous commands**:
   ```
   rename-command FLUSHDB ""
   rename-command FLUSHALL ""
   rename-command CONFIG ""
   ```

## Mail Security

### SMTP Configuration

```yaml
mail:
  connection:
    # Use TLS encryption
    tls: true
    port: 587
    auth: login

    # Secure credentials
    user: <%= ENV['SMTP_USERNAME'] %>
    pass: <%= ENV['SMTP_PASSWORD'] %>

    # Valid sender address
    from: <%= ENV['FROM_EMAIL'] || 'noreply@company.com' %>
```

### Email Validation

Configure strict validation for production:

```yaml
mail:
  validation:
    recipients:
      # Full SMTP validation
      default_validation_type: :smtp

      # Increase security
      connection_attempts: 1
      smtp_fail_fast: true

      # Restrict to known domains
      allowed_domains_only: true
      allowed_domains:
        - company.com
        - trusted-partner.com
```

## Rate Limiting

### Production Limits

Conservative limits for public deployment:

```yaml
limits:
  # Core operations
  create_secret: 100      # Per 20 minutes
  show_secret: 200
  burn_secret: 200

  # Authentication
  create_account: 2
  authenticate_session: 10
  failed_passphrase: 5

  # Recovery
  forgot_password_request: 2
  forgot_password_reset: 3
```

### Internal Deployment

Relaxed limits for internal use:

```yaml
limits:
  create_secret: 1000
  show_secret: 2000
  authenticate_session: 50
  failed_passphrase: 10
```

## SSL/TLS Configuration

### Application Settings

```yaml
site:
  ssl: true
  host: secrets.company.com
```

### Nginx SSL Configuration

```nginx
server {
    listen 443 ssl http2;
    server_name secrets.company.com;

    # Modern SSL configuration
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;

    # Security headers
    add_header Strict-Transport-Security "max-age=63072000" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Host $http_host;
    }
}
```

## Monitoring and Alerts

### Error Tracking

```yaml
diagnostics:
  sentry:
    defaults:
      dsn: <%= ENV['SENTRY_DSN'] %>
      sampleRate: 0.10
      maxBreadcrumbs: 5
      logErrors: false  # Reduce log noise
```

### Security Alerts

Monitor for:
1. **Failed authentication attempts** exceeding rate limits
2. **Unusual secret creation patterns**
3. **Redis connection failures**
4. **SSL certificate expiration**

## Deployment Checklist

### Pre-deployment

- [ ] Generate and secure `SECRET` value
- [ ] Generate `AUTHENTICITY_SECRET_KEY`
- [ ] Configure valid `COLONEL` emails
- [ ] Set up Redis authentication
- [ ] Configure SSL certificates
- [ ] Set appropriate rate limits
- [ ] Configure mail delivery
- [ ] Enable error tracking

### Post-deployment

- [ ] Verify SSL configuration (SSL Labs)
- [ ] Test email delivery
- [ ] Confirm rate limiting works
- [ ] Check security headers
- [ ] Monitor error rates
- [ ] Review access logs

## Secret Rotation

If you must rotate the application secret:

1. **Add old secret to rotation list**:
   ```yaml
   experimental:
     rotated_secrets:
       - old-secret-value
   ```

2. **Set new primary secret**:
   ```yaml
   site:
     secret: new-secret-value
   ```

3. **Remove old secrets** after maximum TTL expires

## Security Headers

Recommended security headers (via proxy or middleware):

```
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Frame-Options: SAMEORIGIN
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';
```

## Incident Response

If a security incident occurs:

1. **Rotate secrets immediately**:
   - Application secret
   - Redis password
   - SMTP credentials
   - API keys

2. **Review logs** for:
   - Unauthorized access attempts
   - Unusual secret creation patterns
   - Rate limit violations

3. **Notify users** if their data may be affected

4. **Update configuration** to prevent recurrence
