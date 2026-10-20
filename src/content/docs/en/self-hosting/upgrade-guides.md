---
title: Upgrade Guides
description: Every Onetime Secret release that has an upgrade guide, newest first, with what each one covers.
audience: operator
pageType: reference
---

These are the releases that need more than a new image: configuration changes, data migrations, or a step you must take before or after the switch. Start with the first guide after the release you run now and work forward to the one you are installing. Each guide assumes the earlier ones are done.

A release with no guide here needs no steps beyond its [release notes](https://github.com/onetimesecret/onetimesecret/releases).

## v0.26

| Release | What it covers |
| :--- | :--- |
| [v0.26.18](./upgrading-v0-26-18) | The custom domain name index rename, removing duplicate domain records, and the renamed customer purge commands. Ships a migration, so rollback is no longer a tag swap. |
| [v0.26.17](./upgrading-v0-26-17) | Custom domains served only once their ownership is verified, the magic-link request rate limit, and the custom domain index backfill. |
| [v0.26.15](./upgrading-v0-26-15) | Stricter public host detection, forwarded scheme headers that need a trusted proxy, refused SVG domain images, and the datastore step for rolling back. |
| [v0.26.14](./upgrading-v0-26-14) | The boot-time auth migration in Full mode, the domain refresh job walking every domain, and the working `caddy_on_demand` strategy. |
| [v0.26.12](./upgrading-v0-26-12) | The session-token disclosure fix and the per-request active-session check in Full mode. |
| [v0.26.11](./upgrading-v0-26-11) | Proxy, session-cookie, and Colonel authentication changes. |
| [v0.26.6](./upgrading-v0-26) | The admin host gate and trusted-proxy hardening from v0.26.5, the auth fixes for Host-rewriting proxies, and the billing federation change. |

## Earlier releases

| Release | What it covers |
| :--- | :--- |
| [v0.24.0](./upgrading-v0-24) | Coming from v0.22 or v0.23: the configuration and data-model changes, and choosing between Simple and Full mode. |
| [v0.23.0](./upgrading-v0-23) | The configuration migration in this maintenance release. |

## See also

- [Installation & Deployment](./installation)
- [Simple or Full Mode](./simple-or-full-auth)
- [Configuration Reference](./configuration)
