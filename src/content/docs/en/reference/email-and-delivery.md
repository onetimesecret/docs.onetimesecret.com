---
title: Email and delivery configuration
description: "Key records for the delivery mode, SMTP credentials, per-provider API delivery and outbound address validation in the Onetime Secret configuration file."
audience: operator
pageType: reference
sourceOfTruth: "onetimesecret/etc/defaults/config.defaults.yaml:1-2102 (vendored at v0.26.19 and rendered by bin/reference.mjs)"
---

This reference reflects Onetime Secret v0.26.19 (`e98a88c9`).

## config file: emailer

### config: emailer.mode

```
Production Settings (for reference)
----------------------------------
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `smtp` | `EMAILER_MODE` | the value above | not annotated | `etc/defaults/config.defaults.yaml:1449` |

### config: emailer.sender_provider

```
Provider for custom mail sender domain provisioning (DNS/DKIM).
When set, decouples domain provisioning from the sending transport.
Valid values: ses, sendgrid, lettermint, smtp2go, smtp
If unset, falls back to mode (EMAILER_MODE).
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | no value | `CUSTOM_MAIL_PROVIDER` | no value | v0.25.8 | `etc/defaults/config.defaults.yaml:1454` |

### config: emailer.region

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `smtp` | `EMAILER_REGION` | the value above | not annotated | `etc/defaults/config.defaults.yaml:1455` |

### config: emailer.from

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `CHANGEME@example.com` | `FROM_EMAIL`, `FROM` | the value above | not annotated | `etc/defaults/config.defaults.yaml:1456` |

### config: emailer.from_name

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `Support` | `FROM_NAME` | the value above | v0.24.0 | `etc/defaults/config.defaults.yaml:1457` |

### config: emailer.reply_to

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | no value | `REPLYTO_EMAIL`, `FROM_EMAIL` | no value | v0.24.0 | `etc/defaults/config.defaults.yaml:1458` |

### config: emailer.host

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `smtp.provider.com` | `SMTP_HOST` | the value above | not annotated | `etc/defaults/config.defaults.yaml:1459` |

### config: emailer.port

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `587` | `SMTP_PORT` | the value above | not annotated | `etc/defaults/config.defaults.yaml:1460` |

### config: emailer.user

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | no value | `SMTP_USERNAME` | no value | not annotated | `etc/defaults/config.defaults.yaml:1461` |

### config: emailer.pass

```
The double quotes are important b/c credentials can have characters that break YAML parsing.
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | no value | `SMTP_PASSWORD` | no value | not annotated | `etc/defaults/config.defaults.yaml:1463` |

### config: emailer.auth

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | no value | `SMTP_AUTH` | no value | not annotated | `etc/defaults/config.defaults.yaml:1464` |

### config: emailer.tls

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | no value | `SMTP_TLS` | no value | not annotated | `etc/defaults/config.defaults.yaml:1465` |

### config: emailer.ssl

```
Since unreleased
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | no value | `SMTP_SSL` | no value | not annotated | `etc/defaults/config.defaults.yaml:1466` |

### config: emailer.feedback_to

```
Recipient ("To:") address for /feedback submissions.
When set, feedback emails are delivered here instead of the first colonel
in the database. Useful for routing to a shared inbox or alias.
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | no value | `FEEDBACK_TO_EMAIL` | no value | v0.25.2 | `etc/defaults/config.defaults.yaml:1470` |

### config: emailer.show_logo

```
Whether to include the logo image in HTML emails (default: false).
Set to true only when recipients can reach the app's base URI to
load the image; otherwise a broken image looks less trustworthy.
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | no value | `EMAILER_SHOW_LOGO` | `false` | v0.25.6 | `etc/defaults/config.defaults.yaml:1474` |

## config file: email_providers

### config: email_providers.ses.region

```
AWS region for SES sender-domain provisioning (the SESv2 API client used
to create/get/delete email identities). This is independent of
EMAILER_REGION, which configures the install-level transactional mailer.
For data-residency, use a regional endpoint such as ca-central-1 (Canada)
or ap-southeast-2 (Sydney). Confirm SES is available in the region.
Override via CUSTOM_MAIL_SES_REGION env var
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `us-east-1` | `CUSTOM_MAIL_SES_REGION` | the value above | v0.25.0 | `etc/defaults/config.defaults.yaml:1495` |

### config: email_providers.ses.access_key_id

```
AWS credentials for the SES provisioning API client, kept independent of
the SMTP/transactional mailer credentials. build_provider_config('ses')
otherwise resolves the key pair from emailer.user/pass (i.e.
SMTP_USERNAME/SMTP_PASSWORD when EMAILER_MODE=smtp), which would silently
use the SMTP login as the AWS key. These dedicated knobs fall back to the
standard AWS_ACCESS_KEY_ID / AWS_SECRET_ACCESS_KEY and, when set, override
the emailer-derived values. Leave unset only when SES is also the delivery
backend (EMAILER_MODE=ses) and the emailer already carries the AWS keys.
Override via CUSTOM_MAIL_SES_ACCESS_KEY_ID / CUSTOM_MAIL_SES_SECRET_ACCESS_KEY
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | no value | `CUSTOM_MAIL_SES_ACCESS_KEY_ID`, `AWS_ACCESS_KEY_ID` | no value | v0.25.9 | `etc/defaults/config.defaults.yaml:1505` |

### config: email_providers.ses.secret_access_key

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | no value | `CUSTOM_MAIL_SES_SECRET_ACCESS_KEY`, `AWS_SECRET_ACCESS_KEY` | no value | v0.25.9 | `etc/defaults/config.defaults.yaml:1506` |

### config: email_providers.ses.dkim_selector_count

```
Number of DKIM selectors (SES uses 3 by default)
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| integer | `3` | none | the value above is the shipped default | v0.25.0 | `etc/defaults/config.defaults.yaml:1508` |

### config: email_providers.ses.spf_include

```
SPF include domain
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `amazonses.com` | none | the value above is the shipped default | v0.25.0 | `etc/defaults/config.defaults.yaml:1510` |

### config: email_providers.sendgrid.subdomain

```
Branding subdomain prefix (appears in CNAME records)
Override via CUSTOM_MAIL_SENDGRID_SUBDOMAIN env var
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `em` | `CUSTOM_MAIL_SENDGRID_SUBDOMAIN` | the value above | v0.25.0 | `etc/defaults/config.defaults.yaml:1516` |

### config: email_providers.sendgrid.dkim_selectors[0]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `s1` | none | the value above is the shipped default | not annotated | `etc/defaults/config.defaults.yaml:1519` |

### config: email_providers.sendgrid.dkim_selectors[1]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `s2` | none | the value above is the shipped default | not annotated | `etc/defaults/config.defaults.yaml:1520` |

### config: email_providers.sendgrid.spf_include

```
SPF include domain
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `sendgrid.net` | none | the value above is the shipped default | v0.25.0 | `etc/defaults/config.defaults.yaml:1522` |

### config: email_providers.lettermint.api_token

```
Project token for Lettermint Sending API (email delivery)
Required when emailer.mode is 'lettermint'
Override via LETTERMINT_API_TOKEN env var
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | no value | `LETTERMINT_API_TOKEN` | no value | v0.25.0 | `etc/defaults/config.defaults.yaml:1536` |

### config: email_providers.lettermint.team_token

```
Team token for Lettermint Team API (domain provisioning)
Required for custom mail sender domain management
Override via LETTERMINT_TEAM_TOKEN env var
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | no value | `LETTERMINT_TEAM_TOKEN` | no value | v0.25.0 | `etc/defaults/config.defaults.yaml:1540` |

### config: email_providers.lettermint.api_base_url

```
API base URL (for enterprise/on-premise deployments)
Override via LETTERMINT_BASE_URL env var
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `https://api.lettermint.co/v1` | `LETTERMINT_BASE_URL` | the value above | v0.25.0 | `etc/defaults/config.defaults.yaml:1543` |

### config: email_providers.lettermint.dkim_selectors[0]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `lm1` | none | the value above is the shipped default | not annotated | `etc/defaults/config.defaults.yaml:1546` |

### config: email_providers.lettermint.dkim_selectors[1]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `lm2` | none | the value above is the shipped default | not annotated | `etc/defaults/config.defaults.yaml:1547` |

### config: email_providers.lettermint.spf_cname_prefix

```
SPF CNAME subdomain prefix (e.g., 'lm-bounces' creates lm-bounces.yourdomain.com)
Override via CUSTOM_MAIL_LETTERMINT_SPF_CNAME_PREFIX env var
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `lm-bounces` | `CUSTOM_MAIL_LETTERMINT_SPF_CNAME_PREFIX` | the value above | v0.25.0 | `etc/defaults/config.defaults.yaml:1550` |

### config: email_providers.lettermint.spf_cname_target

```
SPF CNAME target domain (Lettermint maintains SPF at this target)
Override via CUSTOM_MAIL_LETTERMINT_SPF_CNAME_TARGET env var
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `bounces.lmta.net` | `CUSTOM_MAIL_LETTERMINT_SPF_CNAME_TARGET` | the value above | v0.25.0 | `etc/defaults/config.defaults.yaml:1553` |

### config: email_providers.smtp2go.api_key

```
API key for the SMTP2GO API (email delivery and domain provisioning)
Required when emailer.mode is 'smtp2go'
Override via SMTP2GO_API_KEY env var
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | no value | `SMTP2GO_API_KEY` | no value | v0.26.5 | `etc/defaults/config.defaults.yaml:1566` |

### config: email_providers.smtp2go.api_base_url

```
API base URL
Override via SMTP2GO_BASE_URL env var
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `https://api.smtp2go.com/v3` | `SMTP2GO_BASE_URL` | the value above | v0.26.5 | `etc/defaults/config.defaults.yaml:1569` |

### config: email_providers.smtp2go.returnpath_subdomain

```
Return-path subdomain prefix (e.g., 'bounce' creates bounce.yourdomain.com)
Published by the customer as a CNAME record so the envelope sender
aligns with their domain for SPF. Provisioned via POST /domain/add.
Override via CUSTOM_MAIL_SMTP2GO_RETURNPATH_SUBDOMAIN env var
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `bounce` | `CUSTOM_MAIL_SMTP2GO_RETURNPATH_SUBDOMAIN` | the value above | v0.26.5 | `etc/defaults/config.defaults.yaml:1574` |

### config: email_providers.smtp2go.tracking_subdomain

```
Tracking subdomain prefix (e.g., 'track' creates track.yourdomain.com)
Published by the customer as a CNAME record for open/click tracking.
Override via CUSTOM_MAIL_SMTP2GO_TRACKING_SUBDOMAIN env var
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `track` | `CUSTOM_MAIL_SMTP2GO_TRACKING_SUBDOMAIN` | the value above | v0.26.5 | `etc/defaults/config.defaults.yaml:1578` |

### config: email_providers.smtp2go.fastaccept

```
Fast-accept mode. Default false = synchronous delivery accounting: the
response carries succeeded/failed/failures, so a failed recipient is
reported instead of silently dropped. Set true only to opt into
fire-and-forget (lower latency, no per-recipient failure detection).
Override via CUSTOM_MAIL_SMTP2GO_FASTACCEPT env var (true/false)
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | no value | `CUSTOM_MAIL_SMTP2GO_FASTACCEPT` | `false` | v0.26.5 | `etc/defaults/config.defaults.yaml:1584` |

## config file: mail

### config: mail.truemail.default_validation_type

```
Available validation types: :regex, :mx, :mx_blacklist, :smtp
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `:regex` | none | the value above is the shipped default | not annotated | `etc/defaults/config.defaults.yaml:1589` |

### config: mail.truemail.verifier_email

```
Required for :smtp validation
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `CHANGEME@example.com` | `VERIFIER_EMAIL` | the value above | not annotated | `etc/defaults/config.defaults.yaml:1591` |

### config: mail.truemail.allowed_domains_only

```
:verifier_domain: <%= ENV['VERIFIER_DOMAIN'] || 'example.com' %>
:connection_timeout: 2
:response_timeout: 2
:connection_attempts: 3
:validation_type_for:
 'example.com': :regex

Truemail will only validate email addresses that match the
domains listed in :allowed_domains. If the domain is not
listed, the email address will always be considered invalid.
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | `false` | none | the value above is the shipped default | not annotated | `etc/defaults/config.defaults.yaml:1602` |

### config: mail.truemail.dns[0]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `1.1.1.1` | none | the value above is the shipped default | not annotated | `etc/defaults/config.defaults.yaml:1622` |

### config: mail.truemail.dns[1]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `8.8.4.4` | none | the value above is the shipped default | not annotated | `etc/defaults/config.defaults.yaml:1623` |

### config: mail.truemail.dns[2]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `208.67.220.220` | none | the value above is the shipped default | not annotated | `etc/defaults/config.defaults.yaml:1624` |

### config: mail.truemail.smtp_fail_fast

```
:smtp_port: 25

End smtp validation after the first invalid response rather than
retrying, followed by trying the next server. Can reduce the time
time to validate an email address, but may not catch all issues.
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | `false` | none | the value above is the shipped default | not annotated | `etc/defaults/config.defaults.yaml:1630` |

### config: mail.truemail.smtp_safe_check

```
Parse the content of the SMTP error message to determine if the
email address is valid. This can be useful for some SMTP servers
that don't return exact answers.
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | `true` | none | the value above is the shipped default | not annotated | `etc/defaults/config.defaults.yaml:1635` |

### config: mail.truemail.not_rfc_mx_lookup_flow

```
Whether to disable the RFC MX lookup flow. When true, only DNS
validation will be performed on MX and Null MX records.
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | `false` | none | the value above is the shipped default | not annotated | `etc/defaults/config.defaults.yaml:1639` |

### config: mail.truemail.logger.tracking_event

```
One of: :error (default), :unrecognized_error, :recognized_error, :all.
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `error` | none | the value above is the shipped default | not annotated | `etc/defaults/config.defaults.yaml:1651` |

### config: mail.truemail.logger.stdout

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | `true` | none | the value above is the shipped default | not annotated | `etc/defaults/config.defaults.yaml:1652` |
