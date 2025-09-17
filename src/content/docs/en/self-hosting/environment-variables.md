---
title: Environment Variables Reference
description: A reference for Onetime Secret environment variables
sidebar:
  order: 5
---

This guide covers all environment variables available in Onetime Secret v0.22.4+.


## Environment Variables

Set these in your `.env` file or environment or add them to your docker commands or docker-compose.yml file. All variables are optional unless marked as required.

### Core Application Settings

```bash
SECRET=your-32-char-hex-key           # Secret key for sessions and encryption (REQUIRED) - DO NOT change after setting
PORT=3000                             # Port for the web server to listen on (default: 3000)
HOST=localhost:3000                   # Host and port combination used for generating links
SSL=true                              # Controls https/http when generating links (true/false)
SERVER_TYPE=thin                      # Web server type: thin, puma
RACK_ENV=production                   # Application environment: development, production, test
```

### Database & Storage

NOTE: Variables beginning with REDIS_ can alternately be set with the VALKEY_ prefix.

```bash
REDIS_URL=redis://localhost:6379/0   # Redis connection string for sessions, secrets, and all application data
```

### Authentication & Security

```bash
AUTH_ENABLED=true                     # Enable authentication system (disables API auth when false)
AUTH_SIGNUP=true                      # Allow new user registration
AUTH_SIGNIN=true                      # Allow existing users to sign in
AUTH_AUTOVERIFY=false                 # Skip email verification for new accounts
COLONEL=email@example.com             # Admin email addresses granted "colonel" privileges (comma-separated)
```

**Note**: "Colonel" is our term for "admin" users. Colonels can access the admin area at `/colonel` which shows basic system stats. The admin interface currently has limited functionality - no user management and only readonly configuration viewing.

### User Interface & Features

```bash
UI_ENABLED=true                       # Enable web user interface (shows minimal page when disabled)
API_ENABLED=true                      # Enable REST API endpoints (returns 404 when disabled)
CSP_ENABLED=true                      # Enable Content Security Policy headers
HEADER_ENABLED=true                   # Show site header with branding
HEADER_NAV_ENABLED=true               # Show navigation links in header
HEADER_PREFIX=
DOMAINS_ENABLED=false                 # Enable custom domain support
REGIONS_ENABLED=false                 # Enable multi-region deployment support. This doesn't affect
                                      # the functionality of the application. But it does enable UI
                                      # components for linking to other regions.
```

### Branding & Content

```bash
LOGO_URL=                            # URL to custom logo image (defaults to built-in logo)
LOGO_ALT=
LOGO_LINK=
FOOTER_LINKS=
ABOUT_URL=
ABOUT_EXTERNAL=false
CONTACT_URL=
PRIVACY_URL=
PRIVACY_EXTERNAL=false
TERMS_URL=
TERMS_EXTERNAL=false
STATUS_URL=
STATUS_EXTERNAL=false
```

### Sending Emails

```bash
EMAILER_MODE=smtp                    # Email service mode (smtp, sendgrid, etc.)
EMAILER_REGION=                      # Email service region (for cloud providers)
FROM_EMAIL=noreply@localhost         # Default sender email address
FROM=                                # Sender name (alternative to FROMNAME)
FROMNAME=                            # Display name for sender
SMTP_HOST=                           # SMTP server hostname
SMTP_PORT=587                        # SMTP server port (usually 587 for TLS, 25 for plain)
SMTP_USERNAME=                       # SMTP authentication username
SMTP_PASSWORD=                       # SMTP authentication password
SMTP_TLS=true                        # Enable TLS encryption for SMTP
SMTP_AUTH=login                      # SMTP authentication method (login, plain, etc.)
```

### Secrets & TTL

```bash
DEFAULT_TTL=604800                   # Default secret expiration in seconds (604800 = 7 days)
TTL_OPTIONS=300,1800,3600,86400      # Available TTL options presented to users, comma separated (seconds)
DEFAULT_DOMAIN=                      # Default domain for secret links (uses HOST if empty)
ALLOW_NIL_GLOBAL_SECRET=false        # Allow operation with missing SECRET key (emergency recovery)
```


### Validating Email Addresses

Email address validation is handled by the [Truemail library](https://github.com/truemail-rb/truemail), which supports multiple validation types including regex, MX record lookup, and SMTP verification.

```bash
VERIFIER_DOMAIN=                     # Domain for SMTP verification (required for SMTP validation)
VERIFIER_EMAIL=                      # Email address for SMTP verification (required for SMTP validation)
```

**Note**: Many additional Truemail configuration options are available in the YAML config under the `truemail:` section, including validation types, timeout settings, allowed/blocked domains, DNS servers, and more. See `config/config.yaml` for the full configuration.

### Internationalization

```bash
I18N_ENABLED=true                    # Enable internationalization
I18N_DEFAULT_LOCALE=en               # Default language locale
```

### Development & Debugging

```bash
ONETIME_DEBUG=false                  # Enable debug mode
LOG_HTTP_REQUESTS=false              # Log HTTP requests
STDOUT_SYNC=true                     # Sync stdout output
DIAGNOSTICS_ENABLED=false            # Enable diagnostics
FRONTEND_HOST=http://localhost:5173  # Frontend dev server URL (development only)
VITE_API_BASE_URL=                   # Vite API base URL override
```

### Monitoring & Error Tracking

See the [sentry documentation](https://docs.sentry.io/platforms/ruby/) for more information on configuring Sentry.

```bash
SENTRY_DSN=
SENTRY_DSN_BACKEND=
SENTRY_DSN_FRONTEND=
SENTRY_LOG_ERRORS=true
SENTRY_MAX_BREADCRUMBS=50
SENTRY_SAMPLE_RATE=1.0
SENTRY_VUE_TRACK_COMPONENTS=true
```
