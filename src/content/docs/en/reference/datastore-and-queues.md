---
title: Datastore and queues configuration
description: "Key records for the datastore endpoint, logical databases, job broker, worker pools and scheduled-job switches in the Onetime Secret configuration file."
audience: operator
pageType: reference
sourceOfTruth: "onetimesecret/etc/defaults/config.defaults.yaml:1-2102 (vendored at v0.26.19 and rendered by bin/reference.mjs)"
---

This reference reflects Onetime Secret v0.26.19 (`e98a88c9`).

## config file: redis

### config: redis.uri

```
Redis/Valkey connection URI - Compatible with Redis, Valkey, and other
Redis-compatible servers.

Environment Variable Precedence (highest to lowest):
  1. VALKEY_URL or REDIS_URL - Explicit connection string
  2. IN_DOCKER=1 - Force Docker configuration (redis://host.docker.internal:6379)
  3. AUTO_DETECT_DOCKER=1 - Enable automatic Docker detection via /.dockerenv file
  4. Default - Local development (redis://CHANGEME@127.0.0.1:6379)

Format: redis://[:password@]host[:port]/[db-number]
Examples:
  - redis://mypassword@localhost:6379       # Simple password auth
  - redis://user:pass@localhost:6379        # Username/password auth
  - redis://host.docker.internal:6379       # Docker environment
  - redis://127.0.0.1:6379                  # Local development
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| runtime-defined | determined at run time | none | determined at run time | not annotated | `etc/defaults/config.defaults.yaml:1391-1397` |

```ruby
ENV['VALKEY_URL'] ||
        ENV['REDIS_URL'] ||
        (ENV['IN_DOCKER'] == '1' || (ENV['AUTO_DETECT_DOCKER'] == '1' && File.exist?('/.dockerenv')) ?
          'redis://host.docker.internal:6379' :
          'redis://CHANGEME@127.0.0.1:6379')
```

### config: redis.require_tls

```
Require TLS to the datastore (RISK-2026-08-14-L07). When true, boot
refuses to start unless the URI above uses rediss:// or valkeys:// (with
no `ssl` query parameter, which would override the scheme), whatever the
host. When false (the default, so existing deployments keep booting), a
plaintext URI is reported once at boot, graded by where the host is:
  - a dotted hostname or public IP: a WARNING — the datastore password,
    session data and secrets would cross the network unencrypted;
  - a single-label name (a compose service such as `maindb`) or a private,
    CGNAT or link-local IP (RFC 1918, 100.64/10, 169.254/16, fc00::/7,
    fe80::/10): an INFO line, so the default compose stack does not warn
    on every boot;
  - loopback or a unix socket: nothing.
The host graded is the one the client connects to, including a `host` or
`path` query parameter. Hostnames are never resolved. Set
VALKEY_REQUIRE_TLS=true or REDIS_REQUIRE_TLS=true (either one enables it).
See lib/onetime/initializers/configure_familia.rb.
Since unreleased
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | no value | `VALKEY_REQUIRE_TLS`, `REDIS_REQUIRE_TLS` | `false` | not annotated | `etc/defaults/config.defaults.yaml:1415` |

### config: redis.dbs.custom_domain

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `0` | `VALKEY_DBS_CUSTOM_DOMAIN`, `REDIS_DBS_CUSTOM_DOMAIN` | the value above | not annotated | `etc/defaults/config.defaults.yaml:1422` |

### config: redis.dbs.customer

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `0` | `VALKEY_DBS_CUSTOMER`, `REDIS_DBS_CUSTOMER` | the value above | not annotated | `etc/defaults/config.defaults.yaml:1423` |

### config: redis.dbs.metadata

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `0` | `VALKEY_DBS_METADATA`, `REDIS_DBS_METADATA` | the value above | not annotated | `etc/defaults/config.defaults.yaml:1424` |

### config: redis.dbs.secret

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `0` | `VALKEY_DBS_SECRET`, `REDIS_DBS_SECRET` | the value above | not annotated | `etc/defaults/config.defaults.yaml:1425` |

### config: redis.dbs.feedback

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `0` | `VALKEY_DBS_FEEDBACK`, `REDIS_DBS_FEEDBACK` | the value above | not annotated | `etc/defaults/config.defaults.yaml:1426` |

## config file: jobs

### config: jobs.enabled

```
Global toggle for background job system
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | `false` | `JOBS_ENABLED` | `false` | v0.24.0 | `etc/defaults/config.defaults.yaml:1661` |

### config: jobs.rabbitmq_url

```
RabbitMQ connection URL
Format: amqp://[user:password@]host[:port][/vhost]

The vhost dev doesn't exist in RabbitMQ. Either create it:

 rabbitmqctl add_vhost dev
 rabbitmqctl set_permissions -p dev guest ".*" ".*" ".*"
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `amqp://guest:guest@localhost:5672/dev` | `RABBITMQ_URL` | the value above | v0.24.0 | `etc/defaults/config.defaults.yaml:1671` |

### config: jobs.channel_pool_size

```
Publisher settings (Puma process)
Channel pool size for multi-threaded web server
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| integer | `5` | `RABBITMQ_CHANNEL_POOL_SIZE` | the value above | v0.24.0 | `etc/defaults/config.defaults.yaml:1675` |

### config: jobs.fallback_to_sync

```
Fallback to synchronous delivery when RabbitMQ unavailable
Recommended: true for production to ensure emails always send
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | no value | `JOBS_FALLBACK_SYNC` | `true` | v0.24.0 | `etc/defaults/config.defaults.yaml:1679` |

### config: jobs.workers.email.threads

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| integer | `4` | `EMAIL_WORKER_THREADS` | the value above | v0.24.0 | `etc/defaults/config.defaults.yaml:1684` |

### config: jobs.workers.email.prefetch

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| integer | `10` | `EMAIL_WORKER_PREFETCH` | the value above | v0.24.0 | `etc/defaults/config.defaults.yaml:1685` |

### config: jobs.workers.notifications.threads

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| integer | `2` | `NOTIFICATION_WORKER_THREADS` | the value above | v0.24.0 | `etc/defaults/config.defaults.yaml:1687` |

### config: jobs.workers.notifications.prefetch

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| integer | `5` | `NOTIFICATION_WORKER_PREFETCH` | the value above | v0.24.0 | `etc/defaults/config.defaults.yaml:1688` |

### config: jobs.workers.billing.threads

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| integer | `2` | `BILLING_WORKER_THREADS` | the value above | v0.24.0 | `etc/defaults/config.defaults.yaml:1690` |

### config: jobs.workers.billing.prefetch

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| integer | `5` | `BILLING_WORKER_PREFETCH` | the value above | v0.24.0 | `etc/defaults/config.defaults.yaml:1691` |

### config: jobs.scheduler.enabled

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | `false` | `JOBS_SCHEDULER_ENABLED` | `false` | v0.24.0 | `etc/defaults/config.defaults.yaml:1695` |

### config: jobs.plan_cache_refresh.enabled

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | `true` | none | the value above is the shipped default | v0.26.0 | `etc/defaults/config.defaults.yaml:1703` |

### config: jobs.catalog_retry.enabled

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | `true` | none | the value above is the shipped default | v0.26.0 | `etc/defaults/config.defaults.yaml:1712` |

### config: jobs.dlq_consumer.enabled

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | `true` | none | the value above is the shipped default | v0.26.0 | `etc/defaults/config.defaults.yaml:1719` |

### config: jobs.domain_refresh.enabled

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | `true` | none | the value above is the shipped default | v0.25.2 | `etc/defaults/config.defaults.yaml:1727` |

### config: jobs.domain_refresh.check_interval

```
How often to refresh (rufus-scheduler interval)
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `30m` | none | the value above is the shipped default | v0.25.2 | `etc/defaults/config.defaults.yaml:1729` |

### config: jobs.domain_refresh.batch_size

```
Maximum domains processed per run (rate limiting)
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| integer | `200` | none | the value above is the shipped default | v0.25.2 | `etc/defaults/config.defaults.yaml:1731` |

### config: jobs.domain_refresh.dns_propagation_window

```
Seconds to pause between domains within a run. Leave unset to use the
validation strategy's own pacing (approximated: 0.5 for its API rate
cap; caddy_on_demand and passthrough: none). Any number, including 0,
overrides the strategy.
rate_limit: 0.5  # Since v0.25.2
DNS-propagation warm-up: domains created within this window that are
still not fully verified (verified=false OR resolving=false) fill any
capacity left after the paged walk, without exceeding batch_size.
Set to '0' to disable.
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `24h` | none | the value above is the shipped default | v0.26.14 | `etc/defaults/config.defaults.yaml:1741` |

### config: jobs.expiration_warnings.enabled

```
Enable/disable expiration warning emails
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | `false` | none | the value above is the shipped default | v0.24.0 | `etc/defaults/config.defaults.yaml:1747` |

### config: jobs.expiration_warnings.check_interval

```
How often to scan for expiring secrets (rufus-scheduler interval)
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `1h` | none | the value above is the shipped default | v0.24.0 | `etc/defaults/config.defaults.yaml:1749` |

### config: jobs.expiration_warnings.warning_hours

```
Warn once a secret is within N hours of expiring. The warning is sent on
the next scan, so it arrives between N and (N - check_interval) hours
before expiry.
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| integer | `24` | none | the value above is the shipped default | v0.24.0 | `etc/defaults/config.defaults.yaml:1753` |

### config: jobs.expiration_warnings.min_ttl_hours

```
Only warn for secrets with TTL greater than this (hours)
Prevents spamming for short-lived secrets
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| integer | `48` | none | the value above is the shipped default | v0.24.0 | `etc/defaults/config.defaults.yaml:1756` |

### config: jobs.expiration_warnings.batch_size

```
Maximum warnings to process per job run (rate limiting)
Prevents queue overflow; remaining secrets processed in next run
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| integer | `100` | none | the value above is the shipped default | v0.24.0 | `etc/defaults/config.defaults.yaml:1759` |

### config: jobs.favicon_fetch.enabled

```
Feature flag — default ON (see #3780)
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | `true` | none | the value above is the shipped default | v0.26.0 | `etc/defaults/config.defaults.yaml:1767` |

### config: jobs.favicon_fetch.timeout

```
Seconds per HTTP fetch (connect + read)
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| integer | `5` | none | the value above is the shipped default | v0.26.0 | `etc/defaults/config.defaults.yaml:1769` |

### config: jobs.favicon_fetch.max_response_bytes

```
Response size ceiling in bytes (100 KB), streamed-enforced
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| integer | `102400` | none | the value above is the shipped default | v0.26.0 | `etc/defaults/config.defaults.yaml:1771` |

### config: jobs.favicon_fetch.max_redirects

```
Maximum redirects followed, each re-validated against the SSRF guard
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| integer | `3` | none | the value above is the shipped default | v0.26.0 | `etc/defaults/config.defaults.yaml:1773` |

### config: jobs.favicon_fetch.allowed_content_types[0]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `image/x-icon` | none | the value above is the shipped default | not annotated | `etc/defaults/config.defaults.yaml:1778` |

### config: jobs.favicon_fetch.allowed_content_types[1]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `image/vnd.microsoft.icon` | none | the value above is the shipped default | not annotated | `etc/defaults/config.defaults.yaml:1779` |

### config: jobs.favicon_fetch.allowed_content_types[2]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `image/png` | none | the value above is the shipped default | not annotated | `etc/defaults/config.defaults.yaml:1780` |

### config: jobs.favicon_backfill.enabled

```
Feature flag — default OFF
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | `false` | none | the value above is the shipped default | v0.26.0 | `etc/defaults/config.defaults.yaml:1788` |

### config: jobs.favicon_backfill.cron

```
Scan schedule (cron); nightly at 03:00 by default
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `0 3 * * *` | none | the value above is the shipped default | v0.26.0 | `etc/defaults/config.defaults.yaml:1790` |

### config: jobs.favicon_backfill.batch_size

```
Domains loaded+scanned per page while paginating the full set
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| integer | `500` | none | the value above is the shipped default | v0.26.0 | `etc/defaults/config.defaults.yaml:1792` |

### config: jobs.favicon_backfill.max_attempts

```
Stop retrying a domain after this many terminal non-success attempts
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| integer | `6` | none | the value above is the shipped default | v0.26.0 | `etc/defaults/config.defaults.yaml:1794` |

### config: jobs.favicon_backfill.base_days

```
Backoff base in days (doubles each attempt: 1, 2, 4, 8, ...)
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| integer | `1` | none | the value above is the shipped default | v0.26.0 | `etc/defaults/config.defaults.yaml:1796` |

### config: jobs.favicon_backfill.cap_days

```
Backoff ceiling in days (the doubling never schedules further out than this)
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| integer | `30` | none | the value above is the shipped default | v0.26.0 | `etc/defaults/config.defaults.yaml:1798` |

### config: jobs.maintenance.enabled

```
Master toggle — disables all maintenance jobs when false
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | `false` | none | the value above is the shipped default | v0.24.0 | `etc/defaults/config.defaults.yaml:1806` |

### config: jobs.maintenance.phantom_cleanup.enabled

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | `false` | none | the value above is the shipped default | v0.24.0 | `etc/defaults/config.defaults.yaml:1810` |

### config: jobs.maintenance.phantom_cleanup.interval

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `1h` | none | the value above is the shipped default | v0.24.0 | `etc/defaults/config.defaults.yaml:1811` |

### config: jobs.maintenance.phantom_cleanup.batch_size

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| integer | `500` | none | the value above is the shipped default | v0.24.0 | `etc/defaults/config.defaults.yaml:1812` |

### config: jobs.maintenance.phantom_cleanup.auto_repair

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | `false` | none | the value above is the shipped default | v0.24.0 | `etc/defaults/config.defaults.yaml:1813` |

### config: jobs.maintenance.data_audit.enabled

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | `false` | none | the value above is the shipped default | v0.24.0 | `etc/defaults/config.defaults.yaml:1817` |

### config: jobs.maintenance.data_audit.interval

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `6h` | none | the value above is the shipped default | v0.24.0 | `etc/defaults/config.defaults.yaml:1818` |

### config: jobs.maintenance.data_audit.sample_size

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| integer | `100` | none | the value above is the shipped default | v0.24.0 | `etc/defaults/config.defaults.yaml:1819` |

### config: jobs.maintenance.participation_gc.enabled

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | `false` | none | the value above is the shipped default | v0.24.0 | `etc/defaults/config.defaults.yaml:1823` |

### config: jobs.maintenance.participation_gc.cron

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `0 5 * * *` | none | the value above is the shipped default | v0.24.0 | `etc/defaults/config.defaults.yaml:1824` |

### config: jobs.maintenance.participation_gc.batch_size

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| integer | `500` | none | the value above is the shipped default | v0.24.0 | `etc/defaults/config.defaults.yaml:1825` |

### config: jobs.maintenance.participation_gc.auto_repair

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | `false` | none | the value above is the shipped default | v0.24.0 | `etc/defaults/config.defaults.yaml:1826` |

### config: jobs.maintenance.index_rebuild.enabled

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | `false` | none | the value above is the shipped default | v0.24.0 | `etc/defaults/config.defaults.yaml:1830` |

### config: jobs.maintenance.index_rebuild.cron

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `0 4 * * *` | none | the value above is the shipped default | v0.24.0 | `etc/defaults/config.defaults.yaml:1831` |

### config: jobs.maintenance.index_rebuild.auto_repair

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | `false` | none | the value above is the shipped default | v0.24.0 | `etc/defaults/config.defaults.yaml:1832` |

### config: jobs.maintenance.instances_rebuild.enabled

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | `false` | none | the value above is the shipped default | v0.24.0 | `etc/defaults/config.defaults.yaml:1836` |

### config: jobs.maintenance.instances_rebuild.cron

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `0 3 * * 0` | none | the value above is the shipped default | v0.24.0 | `etc/defaults/config.defaults.yaml:1837` |

### config: jobs.maintenance.instances_rebuild.auto_repair

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | `false` | none | the value above is the shipped default | v0.24.0 | `etc/defaults/config.defaults.yaml:1838` |

### config: jobs.maintenance.housekeeping.enabled

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | `false` | none | the value above is the shipped default | v0.25.3 | `etc/defaults/config.defaults.yaml:1844` |

### config: jobs.maintenance.housekeeping.cron

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `0 2 * * *` | none | the value above is the shipped default | v0.25.3 | `etc/defaults/config.defaults.yaml:1845` |

### config: jobs.maintenance.entitlement_materialize.enabled

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | `false` | none | the value above is the shipped default | v0.26.5 | `etc/defaults/config.defaults.yaml:1855` |

### config: jobs.maintenance.entitlement_materialize.cron

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `0 3 * * *` | none | the value above is the shipped default | v0.26.5 | `etc/defaults/config.defaults.yaml:1856` |
