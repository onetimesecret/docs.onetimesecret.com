---
title: Secret Activity
description: A record of secret lifecycle and access events for organizations — the audit log feature included in Team Plus plans.
---

Secret Activity is a record of secret lifecycle and access events for your organization — what happened to each secret, and who triggered it. On plan comparisons it appears under the feature name "audit logs". It shipped in v0.26.0.

## Where to find it

Secret Activity is available on plans that include audit logs (currently Team Plus). You'll find it in Organization settings under the **Activity** tab. It is visible to organization owners and admins only.

## What it records

Secret Activity records lifecycle and access events for secrets created in the organization's context:

- Created
- Link status checked
- Secret link opened
- Previewed / status-checked by the creator
- Receipt viewed
- Revealed
- Burned
- Expired
- Orphaned
- Reveal failed

Each event carries actor attribution — Creator, Another signed-in user, Anonymous, or System — and never exposes secret contents. Entries reference short IDs only.

## Retention

Each organization retains its newest 10,000 events.

Account and security events (such as logins and SSO changes) are a separate planned capability and are not part of Secret Activity.

## Related

- [Compare Plans](/en/pricing/compare-plans) — where team capabilities live.
- [Shared Dashboard](/en/team/shared-dashboard) — the team-wide view of your organization's secrets.
- [Single Sign-On (SSO)](/en/team/sso) — centralized authentication for your team.

## Questions or Need Support?

We're here to help.

- Email: support@onetimesecret.com
- Feedback form: https://onetimesecret.com/feedback
