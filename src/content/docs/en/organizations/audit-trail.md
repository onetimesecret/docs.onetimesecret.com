---
title: Secret Activity (audit log)
description: See who created, opened, revealed, and burned your organization's secrets — the audit trail under the Activity tab.
audience: end-user
pageType: reference
plan: Team Plus
sourceOfTruth: onetimesecret/lib/onetime/models/organization/features/secret_activity.rb:41
---

Secret Activity is a record of secret lifecycle and access events for your organization — what happened to each secret, and who triggered it. On plan comparisons it appears under the feature name "audit logs". It shipped in v0.26.0.

If you are trying to answer "who opened my link?", this is the page that answers it.

## Where to find it

Secret Activity is available on plans that include audit logs (currently Team Plus). You'll find it in Organization settings under the **Activity** tab. It is visible to organization owners and admins only.

Both conditions apply independently: an owner or admin on a plan without audit logs is shown an upgrade prompt, and a plain member on a qualifying plan is told the tab is for owners and admins.

## What it records

Secret Activity records lifecycle and access events for secrets created in the organization's context. The event names shown in the table are:

| Event | Meaning |
|---|---|
| Secret created | A secret was created in this organization. |
| Link status checked | The secret link's status was fetched without revealing it. |
| Secret link opened | Someone loaded the secret link. |
| Previewed by creator | The creator viewed the secret from their receipt. |
| Status checked by creator | The creator checked the secret's status. |
| Receipt viewed | The creator's receipt page was viewed. |
| Secret revealed | The secret was revealed and is now gone. |
| Secret burned | The creator destroyed the secret before anyone read it. |
| Secret expired | The lifetime ran out with nobody viewing it. |
| Secret orphaned | The secret ended without a normal terminal outcome. |
| Reveal failed (undecryptable) | A reveal was attempted but the payload could not be decrypted. |

Each event carries actor attribution — Creator, Another signed-in user, Anonymous, System, or Unknown — and never exposes secret contents. Entries reference short IDs only.

Account and authentication events, such as sign-ins and SSO changes, are not part of Secret Activity.

## Retention

The trail is bounded by a count of events, not by age. There is no time-based expiry: nothing drops out because it got old. Once the cap is reached, the oldest events are trimmed and the newest are kept.

:::note
The cap is an instance setting rather than a fixed product limit. On a self-hosted instance it defaults to the newest 10,000 events per organization and can be configured; see [Configuration](/en/self-hosting/configuration).
:::

## Related

- [Organizations](/en/organizations) — what an organization is and who can administer it.
- [Compare Plans](/en/pricing/compare-plans) — where team capabilities live.
- [Single Sign-On (SSO)](/en/organizations/sso) — centralized authentication for your team.

## Questions or Need Support?

We're here to help.

- Email: support@onetimesecret.com
- Feedback form: https://onetimesecret.com/feedback
