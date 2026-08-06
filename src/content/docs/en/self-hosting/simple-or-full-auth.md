---
title: "Simple or Full: choosing your authentication mode"
description: A decision guide for self-hosters choosing between Simple and Full authentication mode in Onetime Secret v0.24+ — what each needs to run, what each unlocks, and how hard it is to switch later.
sidebar:
  order: 3
---

From v0.24 onward, a self-hosted Onetime Secret instance runs its
authentication in one of three modes: **disabled**, **simple**, or **full**.
The real decision most operators face is **Simple vs. Full** — disabled is only
for instances that don't have accounts at all. This page reasons about that
choice before you touch a config file. When you're ready to set the value, the
[Upgrading to v0.24+](./upgrading-v0-24) guide has the exact keys.

## The short answer

- Choose **Simple** if you want a login gate in front of secret creation and
  nothing more — and you'd rather run only Redis.
- Choose **Full** if you need MFA, SSO, WebAuthn, or organizations, and you can
  run PostgreSQL and RabbitMQ alongside Redis.

If you're unsure, start with **Simple**. It has the smallest infrastructure
footprint, accounts behave exactly as they did in older releases, and moving to
Full later is an additive change — you stand up the extra services when you
actually need the features they enable.

Not sure you need accounts at all? If your instance sits behind a VPN or a
reverse proxy that already handles authentication, consider **disabled** mode
(`authentication.enabled: false`) and skip this decision entirely.

## What actually differs

| | Simple | Full |
|---|---|---|
| Backing store for accounts | Redis | PostgreSQL (Redis still required for sessions/secrets) |
| Background jobs | Not required | RabbitMQ (email, notifications, webhooks) |
| MFA / WebAuthn | ❌ | ✅ |
| Single Sign-On (SSO) | ❌ | ✅ |
| Organizations / teams | ❌ | ✅ |
| Future account features | Frozen — no new features | Where all new development goes |
| Infrastructure to operate | Redis 7+ | Redis 7+, PostgreSQL 17+, RabbitMQ 4.3+ |

## Choosing Simple

Simple mode is the Redis-backed authentication carried forward from earlier
versions. It needs no infrastructure beyond the Redis you're already running
for secrets, and existing accounts keep working exactly as before.

The tradeoff is stated plainly by the project: Simple mode is a **basic gating
layer**. It authenticates users so you can require an account to create
secrets, but its functionality is frozen — MFA, WebAuthn, and SSO are not
available and won't be added. Choose it when a login gate is all you need and
you value operational simplicity over the account feature set.

## Choosing Full

Full mode replaces the Redis-backed auth with Rodauth-based authentication and
moves account data into PostgreSQL. Background work — email delivery,
notifications, webhook processing — runs through RabbitMQ.

That's two additional services to provision, secure, back up, and monitor. In
return you get the features that only exist here: multi-factor authentication,
WebAuthn, single sign-on, and organizations. This is also where all future
account development lands, so choose Full if your roadmap points at any of those
capabilities — not just your day-one needs.

## Can you change your mind later?

Going **Simple → Full** is a supported migration: you stand up PostgreSQL and
RabbitMQ, switch `authentication.mode` to `full`, and run the CLI command that
populates the authentication database from your existing accounts. Because the
extra services are only introduced when you flip the mode, you're not carrying
their operational cost until you choose to.

That said, the recommendation is to **pick one mode and stay with it**. The
migration path exists so nobody is stranded, not so you can move back and
forth. Going **Full → Simple** in particular is a downgrade in capability —
accounts relying on MFA, SSO, or organizations lose those features, and the
authoritative store changes from PostgreSQL back to Redis. Decide based on
where your roadmap points, not just your day-one needs.

Whichever mode you pick, **keep your `SECRET` value unchanged** across the
switch. Changing it makes every previously encrypted secret unreadable — the
mode decision and the encryption key are independent, and only one of them is
safe to change casually.

## Next steps

- Set the mode and configure connections: [Upgrading to v0.24+](./upgrading-v0-24)
- Full settings surface: [Configuration Reference](./configuration)
- Deciding whether to self-host at all: [Hosted or self-hosted?](/en/start/hosted-or-self-hosted)
