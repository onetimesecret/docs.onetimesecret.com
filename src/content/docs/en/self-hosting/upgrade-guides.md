---
title: Upgrade Guides
description: Every Onetime Secret release that has an upgrade guide, newest first, with what each one covers.
audience: operator
pageType: reference
sourceOfTruth: onetimesecret/CHANGELOG.rst at v0.26.18 (the v0.24.0 and v0.26.5–v0.26.17 release notes summarized here); onetimesecret/migrations/2026-10-15/20261015_01_rename_ascii_display_domain_index.rb:6-40,69-84 at v0.26.18 (the index rename and rollback); https://github.com/onetimesecret/onetimesecret/releases (release-specific deployment notes, including collision resolution and renamed purge commands in v0.26.18); src/content/docs/en/self-hosting/upgrading-v0-23.md:6 (the configuration migration source citation for v0.23.0)
---

These guides cover configuration changes, data migrations, and steps to take before or after switching releases. Start with the first guide after the release you run now and work forward to the one you are installing. Each guide assumes the earlier ones are done.

Also read the [release notes](https://github.com/onetimesecret/onetimesecret/releases) for every release between your current and target versions. Releases without a guide here can still require upgrade steps.

## v0.26

| Release | What it covers |
| :--- | :--- |
| [v0.26.18](/en/self-hosting/upgrading-v0-26-18) | The custom domain name index rename, removing duplicate domain records, and the renamed customer purge commands. Ships a migration, so rollback is no longer a tag swap. |
| [v0.26.17](/en/self-hosting/upgrading-v0-26-17) | Custom domains served only once their ownership is verified, the magic-link request rate limit, and the custom domain index backfill. |
| [v0.26.15](/en/self-hosting/upgrading-v0-26-15) | Stricter public host detection, forwarded scheme headers that need a trusted proxy, refused SVG domain images, and the datastore step for rolling back. |
| [v0.26.14](/en/self-hosting/upgrading-v0-26-14) | The boot-time auth migration in Full mode, the domain refresh job walking every domain, and the working `caddy_on_demand` strategy. |
| [v0.26.12](/en/self-hosting/upgrading-v0-26-12) | The session-token disclosure fix and the per-request active-session check in Full mode. |
| [v0.26.11](/en/self-hosting/upgrading-v0-26-11) | Proxy, session-cookie, and Colonel authentication changes. |
| [v0.26.6](/en/self-hosting/upgrading-v0-26) | The admin host gate and trusted-proxy hardening from v0.26.5, the auth fixes for Host-rewriting proxies, and the billing federation change. |

## Earlier releases

| Release | What it covers |
| :--- | :--- |
| [v0.24.0](/en/self-hosting/upgrading-v0-24) | Coming from v0.22 or v0.23: the configuration and data-model changes, and choosing between Simple and Full mode. |
| [v0.23.0](/en/self-hosting/upgrading-v0-23) | The configuration migration in this maintenance release. |

## See also

- [Install with Docker](/en/install/docker)
- [Simple or Full Mode](/en/self-hosting/simple-or-full-auth)
- [Configuration Reference](/en/self-hosting/configuration)
