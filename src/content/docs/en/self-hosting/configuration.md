---
title: Configuration Reference
description: Complete reference for all Onetime Secret configuration options
sidebar:
  order: 4
---


This comprehensive guide covers all configuration options for self-hosted Onetime Secret instances.

## Configuration Files

Onetime Secret uses multiple configuration files:


- **`.env`** - Environment variables for common settings. Use for simple configuration and Docker deployments without modifying YAML files. (Copy from `.env.example`)
- **`etc/config.yaml`** - Main application configuration using ERB templates. Environment variables are integrated here, making it easy to see how each setting is applied. (Copy from `etc/defaults/config.defaults.yaml`)


## Main Configuration

The main configuration file is `etc/config.yaml`, which uses ERB templates to integrate environment variables.

**Getting started:**
1. Copy the example: `cp etc/defaults/config.defaults.yaml etc/config.yaml`
2. Edit values as needed for your deployment
3. Most common settings can be overridden with environment variables

**View the complete configuration file:**
[config.defaults.yaml](https://raw.githubusercontent.com/onetimesecret/onetimesecret/main/etc/defaults/config.defaults.yaml)

### Key Configuration Sections

Here are the most important sections you'll likely need to customize:

```yaml
---
site:
  host: <%= ENV['HOST'] || 'localhost:3000' %>
  # Turns https/http on or off when generating links
  ssl: <%= ENV['SSL'] == 'true' || false %>
  # IMPORTANT: After setting the secret, it should not be changed.
  # Be sure to create and store a backup in a secure offsite
  # location. Changing the secret can lead to unforeseen issues
  # like not being able to decrypt existing secrets.
  secret: <%= ENV['SECRET'] || nil %>
  # API and UI Configuration
  interface:
    ui:
      # Controls whether the web interface is enabled
      # When false, only a basic explanation page is shown
      enabled: <%= ENV['UI_ENABLED'] != 'false' %>
      # Form field visibility flags
      # Controls which optional fields appear on the secret creation form.
      # All default to true (visible). Set to 'false' to hide from the UI.
      # These are independent of API guest_routes, which gate endpoint access.
      capabilities:
        burn: <%= ENV['UI_CAPABILITIES_BURN'] != 'false' %>
        show: <%= ENV['UI_CAPABILITIES_SHOW'] != 'false' %>
        receipt: <%= ENV['UI_CAPABILITIES_RECEIPT'] != 'false' %>
        recipient: <%= ENV['UI_CAPABILITIES_RECIPIENT'] != 'false' %>
      # Header configuration
      # Controls branding and navigation in the site header
      header:
        # Control switch to enable/disable header customization
        enabled: <%= ENV['HEADER_ENABLED'] != 'false' %>
        # Branding configuration for the masthead logo and site identity
        branding:
          # Logo lockup: icon + optional text mark in the masthead
          logo:
            # Vue component name or image URL (e.g. DefaultLogo.vue, /img/logo.svg)
            url: <%= ENV['LOGO_URL'] || 'DefaultLogo.vue' %>
            alt: <%= ENV['LOGO_ALT'] || 'Share a Secret One-Time' %>
            href: <%= ENV['LOGO_LINK'] || '/' %>
            # Show the site name as a text mark next to the logo icon.
            # Set false for icon-only display; SITE_NAME remains active
            # in page titles, MFA labels, and emails regardless.
            show_name: <%= ENV['LOGO_SHOW_NAME'] != 'false' %>
          # Product name used across the application:
          #   - Masthead text mark (when logo.show_name is true)
          #   - Browser page title
          #   - MFA authenticator app issuer label
          #   - Outbound email sender name
          # Falls back to i18n key if not set.
          site_name: <%= ENV['SITE_NAME'] || 'One-Time Secret' %>
        # Navigation configuration
        navigation:
          # Enable/disable header navigation entirely
          enabled: <%= ENV['HEADER_NAV_ENABLED'] != 'false' %>
      # Footer link configuration (public pages)
      # These links appear in the footer of each page
      footer_links:
        # Global toggle to enable/disable all footer links
        enabled: <%= ENV['FOOTER_LINKS'] == 'true' %>
        # Organized groups of links
        groups:
          - name: legal
            i18n_key: web.footer.legals
            links:
              - text: Terms of Service
                i18n_key: web.layout.terms_of_service
                # Replace with your own terms URL or use relative path like /terms
                url: <%= ENV['TERMS_URL']  %>
              - text: Privacy Policy
                i18n_key: web.layout.privacy_policy
                # Replace with your own privacy URL or use relative path like /privacy
                url: <%= ENV['PRIVACY_URL']  %>
          - name: resources
            i18n_key: web.footer.resources
            links:
              - text: Docs
                i18n_key: web.footer.docs
                # Replace with your documentation URL
                url: <%= ENV['DOCS_URL'] || 'https://docs.onetimesecret.com/' %>
              - text: Status
                i18n_key: web.COMMON.status
                # Replace with your status page URL if you have one
                url: <%= ENV['STATUS_URL'] || 'https://status.onetimesecret.com/' %>
          - name: support
            i18n_key: web.footer.support
            links:
              - text: About
                i18n_key: web.COMMON.about
                # Replace with your about page URL
                url: <%= ENV['ABOUT_URL'] || 'https://onetimesecret.com/about' %>
              - text: Contact
                i18n_key: web.footer.contact
                url: <%= ENV['CONTACT_URL'] || '/feedback' %>
      # Workspace footer links (authenticated users only)
      # Separate from footer_links which are for public pages
      workspace_links:
        # Global toggle to enable/disable all footer links
        enabled: <%= ENV['WORKSPACE_LINKS'] == 'true' %>
        links:
        - text: API Docs
          i18n_key: web.footer.api_docs
          url: <%= ENV['WORKSPACE_API_DOCS_URL'] || 'https://api.onetimesecret.com/' %>
        - text: Branding Guide
          i18n_key: web.footer.branding_guide
          url: <%= ENV['WORKSPACE_BRANDING_GUIDE_URL'] || 'https://docs.onetimesecret.com/' %>
        - text: Feedback
          i18n_key: web.TITLES.feedback
          url: <%= ENV['WORKSPACE_FEEDBACK_URL'] || '/feedback' %>
    # Controls whether the API endpoints are available. When disabled, the API
    # is completely disabled. Requests to /api/* will return 404.
    api:
      enabled: <%= ENV['API_ENABLED'] != 'false' %>
      # Guest API routes for anonymous access
      # When enabled, /api/v3/guest/* endpoints allow unauthenticated requests
      guest_routes:
        # Global toggle - disables all guest routes when false
        enabled: <%= ENV['API_GUEST_ROUTES_ENABLED'] != 'false' %>
        # Fine-grained controls (checked only when enabled=true)
        conceal: <%= ENV['API_GUEST_CONCEAL'] != 'false' %>
        generate: <%= ENV['API_GUEST_GENERATE'] != 'false' %>
        reveal: <%= ENV['API_GUEST_REVEAL'] != 'false' %>
        burn: <%= ENV['API_GUEST_BURN'] != 'false' %>
        show: <%= ENV['API_GUEST_SHOW'] != 'false' %>
        receipt: <%= ENV['API_GUEST_RECEIPT'] != 'false' %>
  # Configuration options for secret management
  secret_options:
    # Default Time-To-Live (TTL) for secrets in seconds
    # This value is used if no specific TTL is provided when creating a secret
    default_ttl: <%= ENV['DEFAULT_TTL'] || nil %>
    # Available TTL options for secret creation (in seconds)
    # These options will be presented to users when they create a new secret
    # Format: String of integers representing seconds
    ttl_options: <%= (ENV['TTL_OPTIONS'] || nil) %>
    # Settings for the passphrase field that protects access to secrets
    passphrase:
      # Require users to enter a passphrase when creating secrets
      required: <%= ENV['PASSPHRASE_REQUIRED'] == 'true' || false %>
      # Minimum number of characters required for passphrases
      # Default to 4 chars to prevent trivially guessable passphrases while
      # maintaining backward compatibility with existing integrations.
      minimum_length: <%= ENV['PASSPHRASE_MIN_LENGTH'] || 4 %>
      # Maximum number of characters allowed for passphrases
      maximum_length: <%= ENV['PASSPHRASE_MAX_LENGTH'] || 128 %>
      # Enforce complexity requirements (uppercase, lowercase, numbers, symbols)
      enforce_complexity: <%= ENV['PASSPHRASE_ENFORCE_COMPLEXITY'] == 'true' || false %>
    # How long (in seconds) a generated password remains visible on the
    # receipt page after creation. Set to 0 to disable receipt-page display.
    generated_value_display_ttl: <%= ENV['GENERATED_VALUE_DISPLAY_TTL'] || 60 %>
    # Settings for password generation (when users click "Generate Password")
    password_generation:
      # Default length for generated passwords
      default_length: <%= ENV['PASSWORD_GEN_LENGTH'] || 12 %>
      # Character sets to include in generated passwords
      character_sets:
        # Include uppercase letters (A-Z)
        uppercase: <%= ENV['PASSWORD_GEN_UPPERCASE'] != 'false' %>
        # Include lowercase letters (a-z)
        lowercase: <%= ENV['PASSWORD_GEN_LOWERCASE'] != 'false' %>
        # Include numbers (0-9)
        numbers: <%= ENV['PASSWORD_GEN_NUMBERS'] != 'false' %>
        # Include symbols (!@#$%^&*()_+-=[]{}|;:,.<>?)
        symbols: <%= ENV['PASSWORD_GEN_SYMBOLS'] != 'false' %>
        # Exclude ambiguous characters (0, O, l, 1, I) to prevent confusion
        exclude_ambiguous: <%= ENV['PASSWORD_GEN_EXCLUDE_AMBIGUOUS'] != 'false' %>
  # Registration and Authentication settings
  authentication:
    # Can be disabled altogether, including API authentication.
    enabled: <%= ENV['AUTH_ENABLED'] != 'false' %>
    # Allow users to create accounts. This can be disabled if you plan
    # to create accounts manually or enable during setup when accounts
    # can be created and then disabled to prevent any new users from
    # creating accounts.
    signup: <%= ENV['AUTH_SIGNUP'] != 'false' %>
    # Generally if you allow registration, you allow signin. But there
    # are circumstances where it's helpful to turn off authentication
    # temporarily.
    signin: <%= ENV['AUTH_SIGNIN'] != 'false' %>
    # By default, new accounts need to verify their email address before
    # they can sign in. This is a security measure to prevent spamming
    # and abuse of the system. If you're running a private instance or
    # an instance for your team or company, you can disable this feature
    # to make it easier for users to sign in.
    autoverify: <%= ENV['AUTH_AUTOVERIFY'] == 'true' || false %>
    # When enabled, the homepage secret form is not available unless
    # the user is logged in. Similar to a disabled homepage, but still
    # shows the header with logo and navigation links. This allows for
    # a more restrictive mode where only authenticated users can create
    # secrets while maintaining site navigation and branding.
    required: <%= ENV['AUTH_REQUIRED'] == 'true' %>
    # Colonel (admin) accounts are managed via the CLI:
    #   bin/ots customers role promote user@example.com
    #   bin/ots customers role demote user@example.com
    #   bin/ots customers role list
    # Restrict account creation to specific email domains while allowing
    # secret-sharing with any email address. When set, only email addresses
    # from the listed domains can create accounts. This is useful for
    # organizations that want to limit signups to their own domains while
    # still allowing secrets to be shared with anyone.
    # Format: List of domain names (e.g., example.com, company.org)
    # If empty or not set, signups are allowed from any domain (default).
    # Environment variable: ALLOWED_SIGNUP_DOMAIN (comma-separated list)
    allowed_signup_domains: <%= ENV['ALLOWED_SIGNUP_DOMAIN']&.split(',')&.map(&:strip) || [] %>
  # Links to documentation. For onetimesecret.com, this is
  # docs.onetimesecret.com.
  support:
    host: <%= ENV['SUPPORT_HOST'] || nil %>
  # Session configuration
  # Controls browser cookie and server-side session behavior.
  # Session handling is auth-mode agnostic (works with simple or full mode).
  session:
    # Session secret for HMAC signing. Falls back to site.secret if not set.
    secret: <%= ENV['SESSION_SECRET'] %>
    # Session lifetime in seconds (default: 24 hours)
    expire_after: 86400
    # Cookie name
    key: 'onetime.session'
    # Require HTTPS for cookies (recommended: true in production)
    secure: <%= ENV['SSL'] == 'true' || false %>
    # SameSite cookie attribute (strict|lax|none)
    # Required for Stripe/OAuth redirects - 'strict' blocks cookies on cross-site GET navigations
    same_site: lax
    # Prevent JavaScript access to cookies (always true in Rack)
    httponly: true
  # Security Configuration
  # Additional security settings beyond middleware
  security:
    # Content Security Policy (CSP) Configuration
    #
    # When enabled, adds Content-Security-Policy headers to responses.
    # - Development mode: Less restrictive headers to allow hot reloading
    # - Production mode: Strict headers with nonce-based script protection
    #
    # The nonce is available via `req.env['onetime.nonce']` for custom
    # script/style assets. Backend views add it automatically.
    #
    # ENV: CSP_ENABLED (default: false)
    csp:
      enabled: <%= ENV['CSP_ENABLED'] == 'true' || false %>

features:
  # Incoming Secrets Feature
  # Allows anonymous users to send encrypted secrets to pre-configured recipients
  # via a dedicated web form at /incoming. Recipients receive email notifications.
  incoming:
    # Enable or disable the incoming secrets feature
    enabled: <%= ENV['INCOMING_ENABLED'] == 'true' || false %>
    # Maximum character length for the memo/subject field
    memo_max_length: <%= ENV['INCOMING_MEMO_MAX_LENGTH'] || 50 %>
    # Default TTL for incoming secrets in seconds (7 days = 604800)
    default_ttl: <%= ENV['INCOMING_DEFAULT_TTL'] || 604800 %>
    # Optional default passphrase for all incoming secrets (nil = no passphrase)
    default_passphrase: <%= ENV['INCOMING_DEFAULT_PASSPHRASE'] || nil %>
    # Recipients who can receive incoming secrets
    # Each recipient needs an email and optional display name.
    # Email addresses are hashed at startup and never exposed in API responses.
    #
    # Environment Variable Format:
    #   INCOMING_RECIPIENT_N=email[,name]
    #   where N is 1, 2, 3, etc. and name is optional
    #
    # Examples:
    #   INCOMING_RECIPIENT_1=support@example.com,Support Team
    #   INCOMING_RECIPIENT_2=security@example.com,Security Team
    #   INCOMING_RECIPIENT_3=admin@example.com   (name defaults to 'admin')
    #
    recipients:
      - <%= ENV['INCOMING_RECIPIENT_1']&.split(',') %>
      - <%= ENV['INCOMING_RECIPIENT_2']&.split(',') %>
      - <%= ENV['INCOMING_RECIPIENT_3']&.split(',') %>
      - <%= ENV['INCOMING_RECIPIENT_4']&.split(',') %>
  domains:
    enabled: <%= ENV['DOMAINS_ENABLED'] == 'true' || false %>
    # The default domain used for link URLs. When not set or empty,
    # site.host is used.
    default: <%= ENV['DEFAULT_DOMAIN'] || nil %>

    # Domain validation and certificate management strategy
    # Options:
    #   - passthrough: No validation or cert management
    #   - approximated: Use approximated.app API for SSL certs and validation (requires cluster config)
    #   - caddy_on_demand: Use Caddy's on-demand TLS (requires internal ACME endpoint)
    validation_strategy: <%= ENV['DOMAINS_VALIDATION_STRATEGY'] || 'passthrough' %>

    # Approximated proxy configuration (required for 'approximated' strategy)
    approximated:
      api_key: <%= ENV['APPROXIMATED_API_KEY'] || nil %>
      proxy_ip: <%= ENV['APPROXIMATED_PROXY_IP'] || nil %>
      proxy_host: <%= ENV['APPROXIMATED_PROXY_HOST'] || nil %>
      proxy_name: <%= ENV['APPROXIMATED_PROXY_NAME'] || nil %>
      vhost_target: <%= ENV['APPROXIMATED_VHOST_TARGET'] || nil %>

    # Internal ACME endpoint configuration (for 'caddy_on_demand' strategy)
    # This endpoint allows Caddy to verify domains before issuing certificates.
    #
    # When enabled is true, the ACME app is auto-mounted inside the main
    # application process and available on the loopback interface at the
    # main app's port (e.g. http://127.0.0.1:3000/api/internal/acme/ask).
    #
    # When enabled is false, the ACME app must be run as a standalone
    # process: rackup apps/internal/acme/config.ru
    # It will bind to the listen_address and port configured below.
    #
    # The listen_address and port settings only apply to standalone mode.
    acme:
      enabled: <%= ENV['ACME_ENDPOINT_ENABLED'] == 'true' %>
      # IP address to bind to in standalone mode (should always be localhost)
      listen_address: <%= ENV['ACME_LISTEN_ADDRESS'] || '127.0.0.1' %>
      # Port for standalone mode (Caddy's ask directive points here)
      port: <%= ENV['ACME_PORT'] || '12020' %>
  # Organizations UI
  # Shows the organization switcher in the navigation bar. Organizations
  # always exist under the hood (every customer has one for Stripe billing).
  # This flag controls whether users can see and switch between multiple orgs.
  organizations:
    enabled: <%= ENV['ENABLE_ORGS'] == 'true' %>
    sso_enabled: <%= ENV['ORGS_SSO_ENABLED'] == 'true' %>
    custom_mail_enabled: <%= ENV['ORGS_CUSTOM_MAIL_ENABLED'] == 'true' %>
    incoming_secrets_enabled: <%= ENV['ORGS_INCOMING_SECRETS_ENABLED'] == 'true' %>

# Main Database Configuration
redis:
  # Redis/Valkey connection URI - Compatible with Redis, Valkey, and other
  # Redis-compatible servers.
  #
  # Environment Variable Precedence (highest to lowest):
  #   1. VALKEY_URL or REDIS_URL - Explicit connection string
  #   2. IN_DOCKER=1 - Force Docker configuration (redis://host.docker.internal:6379)
  #   3. AUTO_DETECT_DOCKER=1 - Enable automatic Docker detection via /.dockerenv file
  #   4. Default - Local development (redis://CHANGEME@127.0.0.1:6379)
  #
  # Format: redis://[:password@]host[:port]/[db-number]
  # Examples:
  #   - redis://mypassword@localhost:6379       # Simple password auth
  #   - redis://user:pass@localhost:6379        # Username/password auth
  #   - redis://host.docker.internal:6379       # Docker environment
  #   - redis://127.0.0.1:6379                  # Local development
  uri: >-
      <%=
        ENV['VALKEY_URL'] ||
        ENV['REDIS_URL'] ||
        (ENV['IN_DOCKER'] == '1' || (ENV['AUTO_DETECT_DOCKER'] == '1' && File.exist?('/.dockerenv')) ?
          'redis://host.docker.internal:6379' :
          'redis://CHANGEME@127.0.0.1:6379')
      %>
  # Database Mapping Configuration
  # By default, all data types use database 0 for simplified connection pooling
  # and compatibility with Redis-as-a-Service providers. For advanced setups,
  # you can separate data across different Redis logical databases (0-15)
  # by setting environment variables or modifying the values below.
  dbs:
    custom_domain: <%= ENV['VALKEY_DBS_CUSTOM_DOMAIN'] || ENV['REDIS_DBS_CUSTOM_DOMAIN'] || 0 %>
    customer: <%= ENV['VALKEY_DBS_CUSTOMER'] || ENV['REDIS_DBS_CUSTOMER'] || 0 %>
    metadata: <%= ENV['VALKEY_DBS_METADATA'] || ENV['REDIS_DBS_METADATA'] || 0 %>
    secret: <%= ENV['VALKEY_DBS_SECRET'] || ENV['REDIS_DBS_SECRET'] || 0 %>
    feedback: <%= ENV['VALKEY_DBS_FEEDBACK'] || ENV['REDIS_DBS_FEEDBACK'] || 0 %>

# Sending Emails
emailer:
  # Local Development with Mailpit
  # -----------------------------
  # Mailpit is a dev SMTP server that captures emails for testing
  # Install: brew install mailpit
  # Start: mailpit
  # Web UI: http://localhost:8025
  #
  #  :mode: smtp                     # Use SMTP mode for local testing
  #  :from: secure@onetimesecret.com # Sender address
  #  :from_name: OTS Support         # Sender name
  #  :host: 127.0.0.1                # Mailpit host
  #  :port: 1025                     # Mailpit default SMTP port
  #  :user: ~                        # No auth needed for Mailpit
  #  :pass: ~                        # No auth needed for Mailpit
  #  :auth: false                    # Disable SMTP auth for Mailpit
  #  :tls: false                     # Disable TLS for local testing

  # Production Settings (for reference)
  # ----------------------------------
  mode: <%= ENV['EMAILER_MODE'] || 'smtp' %>
  region: <%= ENV['EMAILER_REGION'] || 'smtp' %>
  from: <%= ENV['FROM_EMAIL'] || ENV['FROM'] || 'CHANGEME@example.com' %>
  from_name: <%= ENV['FROM_NAME'] || 'Support' %>
  reply_to: <%= ENV['REPLYTO_EMAIL'] || ENV['FROM_EMAIL'] || nil %>
  host: <%= ENV['SMTP_HOST'] || 'smtp.provider.com' %>
  port: <%= ENV['SMTP_PORT'] || 587 %>
  user: <%= ENV['SMTP_USERNAME'] %>
  # The double quotes are important b/c credentials can have characters that break YAML parsing.
  pass: "<%= ENV['SMTP_PASSWORD'] %>"
  auth: <%= ENV['SMTP_AUTH'] || nil %>
  tls: <%= ENV['SMTP_TLS'] %>

# Email Provider DNS Validation Settings
# --------------------------------------
# Configuration for sender domain validation strategies. These settings
# control how DNS records are generated for DKIM, SPF, and related email
# authentication when setting up custom mail sender domains.
#
# Each provider has sensible defaults; override only when needed.
# All settings are optional - the system works without this section.
#
email_providers:
  # AWS SES configuration
  ses:
    # AWS region for SES endpoints (affects MX record values)
    # Override via EMAIL_PROVIDERS_SES_REGION env var
    region: <%= ENV['EMAIL_PROVIDERS_SES_REGION'] || 'us-east-1' %>
    # Number of DKIM selectors (SES uses 3 by default)
    dkim_selector_count: 3
    # SPF include domain
    spf_include: amazonses.com

  # SendGrid configuration
  sendgrid:
    # Branding subdomain prefix (appears in CNAME records)
    # Override via EMAIL_PROVIDERS_SENDGRID_SUBDOMAIN env var
    subdomain: <%= ENV['EMAIL_PROVIDERS_SENDGRID_SUBDOMAIN'] || 'em' %>
    # DKIM selector names
    dkim_selectors:
      - s1
      - s2
    # SPF include domain
    spf_include: sendgrid.net

  # Lettermint configuration
  #
  # Lettermint has TWO separate APIs with different auth:
  #   1. Sending API - uses x-lettermint-token header (project token)
  #   2. Team API    - uses Authorization: Bearer header (team token)
  #
  # Domain provisioning requires the Team API token.
  #
  lettermint:
    # Project token for Lettermint Sending API (email delivery)
    # Required when emailer.mode is 'lettermint'
    # Override via LETTERMINT_API_TOKEN env var
    api_token: <%= ENV['LETTERMINT_API_TOKEN'] %>
    # Team token for Lettermint Team API (domain provisioning)
    # Required for custom mail sender domain management
    # Override via LETTERMINT_TEAM_TOKEN env var
    team_token: <%= ENV['LETTERMINT_TEAM_TOKEN'] %>
    # API base URL (for enterprise/on-premise deployments)
    # Override via LETTERMINT_BASE_URL env var
    api_base_url: <%= ENV['LETTERMINT_BASE_URL'] || 'https://api.lettermint.co/v1' %>
    # SPF CNAME subdomain prefix (e.g., 'lm-bounces' creates lm-bounces.yourdomain.com)
    # Override via EMAIL_PROVIDERS_LETTERMINT_SPF_CNAME_PREFIX env var
    spf_cname_prefix: <%= ENV['EMAIL_PROVIDERS_LETTERMINT_SPF_CNAME_PREFIX'] || 'lm-bounces' %>
    # SPF CNAME target domain (Lettermint maintains SPF at this target)
    # Override via EMAIL_PROVIDERS_LETTERMINT_SPF_CNAME_TARGET env var
    spf_cname_target: <%= ENV['EMAIL_PROVIDERS_LETTERMINT_SPF_CNAME_TARGET'] || 'bounces.lmta.net' %>

mail:
  truemail:
    # Available validation types: :regex, :mx, :mx_blacklist, :smtp
    default_validation_type: :regex
    # Required for :smtp validation
    verifier_email: <%= ENV['VERIFIER_EMAIL'] || 'CHANGEME@example.com' %>
    #:verifier_domain: <%= ENV['VERIFIER_DOMAIN'] || 'example.com' %>
    #:connection_timeout: 2
    #:response_timeout: 2
    #:connection_attempts: 3
    #:validation_type_for:
    #  'example.com': :regex
    #
    # Truemail will only validate email addresses that match the
    # domains listed in :allowed_domains. If the domain is not
    # listed, the email address will always be considered invalid.
    allowed_domains_only: false
    #
    # Email addresses in this list will always be valid.
    #:allowed_emails: []
    #
    # Email addresses in this list will always be invalid.
    #:blocked_emails: []
    #
    # Addresses with these domains will always be valid
    #:allowed_domains: []
    #
    # Addresses with these domains will always be invalid
    #:blocked_domains: []
    #
    # Exclude these IP addresses from the MX lookup process.
    #:blocked_mx_ip_addresses: []
    #
    # Name servers to use for MX et al record lookup.
    # Default is CloudFlare, Google, Oracle/OpenDNS servers.
    dns:
      - 1.1.1.1
      - 8.8.4.4
      - 208.67.220.220
    #:smtp_port: 25
    #
    # End smtp validation after the first invalid response rather than
    # retrying, followed by trying the next server. Can reduce the time
    # time to validate an email address, but may not catch all issues.
    smtp_fail_fast: false
    #
    # Parse the content of the SMTP error message to determine if the
    # email address is valid. This can be useful for some SMTP servers
    # that don't return exact answers.
    smtp_safe_check: true
    #
    # Whether to disable the RFC MX lookup flow. When true, only DNS
    # validation will be performed on MX and Null MX records.
    not_rfc_mx_lookup_flow: false
    #
    # Override default regular expression pattern for email addresses
    # and/or the content in SMTP error messages.
    #:email_pattern: /regex_pattern/
    #:smtp_error_body_pattern: /regex_pattern/
    #
    # Log to the console, a file, or both. The ruby process must have
    # write access to the log file. The log file will be created if it
    # does not exist. Log file rotation is not handled by the app.
    logger:
      # One of: :error (default), :unrecognized_error, :recognized_error, :all.
      tracking_event: 'error'
      stdout: true
      # log_absolute_path: '/home/app/log/truemail.log'

internationalization:
  enabled: <%= ENV['I18N_ENABLED'] == 'true' || false %>
  default_locale: <%= ENV['I18N_DEFAULT_LOCALE'] || 'en' %>
  # Date/time display format. Accepts a preset keyword or a date-fns pattern.
  # Setting date_format alone controls both date-only and date+time display.
  # Set datetime_format only if you need a different format for date+time contexts.
  #
  # Presets:
  #   locale  - browser-native formatting (default)
  #   iso8601 - 2026-03-21 / 2026-03-21 14:30:00
  #   us      - 03/21/2026 / 03/21/2026 2:30:00 PM
  #   eu      - 21/03/2026 / 21/03/2026 14:30
  #   eu-dot  - 21.03.2026 / 21.03.2026 14:30
  #   uk      - 21 Mar 2026 / 21 Mar 2026 14:30
  #   long    - March 21, 2026 / March 21, 2026 2:30 PM
  #
  # Or pass a raw date-fns pattern: https://date-fns.org/docs/format
  date_format: <%= ENV['I18N_DATE_FORMAT'] || 'locale' %>
  datetime_format: <%= ENV['I18N_DATETIME_FORMAT'] || 'locale' %>
  fallback_locale:
    ca: [ca_ES, en]
    ca-ES: [ca_ES, en]
    da: [da_DK, en]
    da-DK: [da_DK, en]
    de: [de, de_AT, en]
    de-AT: [de_AT, de, en]
    el: [el_GR, en]
    el-GR: [el_GR, en]
    fr: [fr_FR, fr_CA, en]
    fr-CA: [fr_CA, fr_FR, en]
    it: [it_IT, en]
    mi: [mi_NZ, en]
    mi-NZ: [mi_NZ, en]
    pt: [pt_BR, pt_PT, en]
    pt-BR: [pt_BR, pt_PT, en]
    pt-PT: [pt_PT, pt_BR, en]
    sl: [sl_SI, en]
    sl-SI: [sl_SI, en]
    sv: [sv_SE, en]
    sv-SE: [sv_SE, en]
    default: [en]
  # A list of ISO language codes (e.g., 'en' for English, 'es'
  # for Spanish, etc.). There is a corresponding file in
  # generated/locales with the same name containing the translated
  # text. If it's not selected automatically, users are able to
  # select their preferred language by using the toggle in the
  # footer or in the settings modal if they're logged in.
  locales:
    - ar
    - bg
    - ca_ES
    - cs
    - da_DK
    - de
    - de_AT
    - el_GR
    - en
    - eo
    - es
    - fr_CA
    - fr_FR
    - he
    - hu
    - it_IT
    - ja
    - ko
    - mi_NZ
    - nl
    - pl
    - pt_BR
    - pt_PT
    - ru
    - sl_SI
    - sv_SE
    - tr
    - uk
    - vi
    - zh
```
