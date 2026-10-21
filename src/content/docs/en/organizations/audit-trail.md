---
title: Secret Activity
description: The organization's record of what happened to secrets its members created, which session triggered each event, and what the record does not show.
audience: end-user
pageType: reference
plan: Team Plus
sourceOfTruth: onetimesecret at 145c1e7cfa — lib/onetime/models/organization/features/secret_activity.rb (event collection and retention); apps/api/v2/logic/secrets/actor_attribution.rb:51-77 (actor from the requesting session); apps/api/v2/logic/secrets/access_telemetry.rb:41-42 (creator-only preview and status events); apps/api/v2/logic/secrets/burn_secret.rb:17-29,101-108 (burn from the receipt, no ownership check, actual actor recorded); apps/api/v2/logic/secrets/show_receipt.rb:114-118,256 (first receipt view; expiry and orphan recorded when the receipt is next loaded); apps/api/v2/logic/secrets/base_secret_action.rb:475-506 (only secrets created while signed in, in an organization); apps/api/organizations/logic/organizations/list_secret_activity.rb:85 (audit_logs entitlement, active-membership email resolution); locales/content/en/workspace-organizations.json (event labels); locales/content/en/admin-audit.json (the operator Administration Log)
---

Secret Activity records what happened to each secret created in your
organization, and which session triggered each event. Plan comparisons call
this feature **audit logs**, and the pricing page calls it the **security audit
trail**.

## Where to find it

Open your organization's settings and choose the **Activity** tab. It is
available on **Team Plus**, where it is in beta, and only to owners and admins.

Both conditions apply: an owner or admin on another plan is shown an upgrade
prompt, and a member on Team Plus is told the tab is for owners and admins.

## Which secrets appear

Secret Activity covers secrets that a member created while signed in and
working in the organization. Secrets created without signing in are not
included.

## Events

| Event | Meaning |
|---|---|
| Secret created | A member created the secret. |
| Link status checked | The secret's status was checked through the API without revealing it. |
| Secret link opened | Someone loaded the secret link. A reveal through the web page usually records this first. |
| Previewed by creator | The creator, signed in, opened the secret link without revealing it. |
| Status checked by creator | The creator, signed in, checked the secret's status through the API. |
| Receipt viewed | The receipt was loaded for the first time. Recorded once per receipt, for whoever loaded it. |
| Secret revealed | Someone revealed the secret. It can no longer be read. |
| Secret burned | Someone with the receipt link burned the secret before it was read. |
| Secret expired | The secret's lifetime ran out before anyone revealed it. |
| Secret orphaned | The secret was gone without a recorded reveal, burn or expiry. |
| Reveal failed (undecryptable) | A reveal was attempted but the secret could not be decrypted. |

Expired and orphaned events are recorded the next time someone loads the
receipt, so their time is when the receipt was loaded. If nobody loads the
receipt again, no such event appears.

## Who triggered an event

Each event has an actor label, based on the session that made the request:

| Actor | Meaning |
|---|---|
| Creator | Signed in as the account that created the secret. |
| Another signed-in user | Signed in as a different account. |
| Anonymous | Not signed in. This includes the creator, if they were signed out. |
| System | Recorded by the service, for expiry and orphaned secrets. |
| Unknown | The secret could not be identified. |

The label describes the session, not the person reading the screen. It cannot
show that the intended recipient read the secret: anyone holding the link can
open it, and anyone holding the receipt link can view the receipt and burn the
secret. A passphrase, when one is set, is still required to reveal or burn.

Events do not contain secret content. Secret and receipt references use short
identifiers. Events by a signed-in account can also record that account's
internal identifier. When you read or export the record, the service shows the
email address for accounts that are active members of the organization; it
does not look up other accounts.

Link-access events can also include a masked IP address, a shortened browser
description and a correlation token, and a country code where country
collection is turned on. Collection can be turned off for an instance; see
[What recipients see](/en/share/what-recipients-see#what-the-sender-learns-about-you)
for how this differs from the sender's receipt.

## What it does not include

- **Sign-ins and other account events**, such as SSO changes.
- **The operator's Administration Log.** The people who run the service keep a
  separate log of their own administrative actions and security events.
  Organizations do not see it.

## Retention

The record is limited by a number of events, not by age. Nothing is removed for
being old; when the limit is reached, the oldest events are removed and the
newest are kept.

:::note
**Self-hosting this yourself?** The limit defaults to the newest 10,000 events
per organization and can be configured; see
[Configuration](/en/self-hosting/configuration). The Administration Log is at
`/colonel/audit` in the Colonel console, and on the command line through
`bin/ots audit list`.
:::

## Related

- [Organizations](/en/organizations) — what an organization is and who can administer it.
- [Your receipt](/en/share/your-receipt) — what the sender's receipt shows for one secret.
- [Compare plans](/en/pricing/compare-plans) — which plan includes Secret Activity.

## Questions or Need Support?

We're here to help.

- Email: support@onetimesecret.com
- Feedback form: https://onetimesecret.com/feedback
