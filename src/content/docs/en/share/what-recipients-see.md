---
title: What recipients see
description: Open a secret link, enter a passphrase if needed, reveal the content once, and understand what activity is recorded.
audience: end-user
pageType: concept
sourceOfTruth: onetimesecret at 145c1e7cfa — apps/api/v2/logic/secrets/show_secret.rb and reveal_secret.rb (confirmation, passphrase checks, creator identification); lib/onetime/models/secret/features/secret_state_management.rb (atomic reveal); lib/onetime/security/passphrase_rate_limiter.rb (lockout before verification); apps/api/v2/logic/secrets/actor_attribution.rb and access_telemetry.rb (actor and network context); apps/api/organizations/logic/organizations/list_secret_activity.rb (identity resolution for active members)
---

You do not need an account to reveal a secret someone sent you. **Opening the
link and revealing the content are separate steps.** Loading the page does not
consume the secret; confirming the reveal retrieves its content once and deletes
the stored secret.

## What arrives

The sender may send you the link in a chat, ticket, or email. If they use the
service's email option, the message contains the link and identifies the sender.
It does not contain the secret content or passphrase. Ask the sender separately
for a passphrase if one is required.

A [custom domain](/en/custom-domains) can use its own configured email sender;
see [Email sender](/en/custom-domains/email-sender).

## Before you reveal anything

Opening a valid link displays a confirmation page with the content hidden.
The reveal action reads **Click to reveal** and warns that the content will
only be shown once.

A scanner or chat preview that only fetches the page does not consume the
secret. Software that submits the reveal action can consume it.

If you are the sender, do not reveal the secret to test it. Your recipient will
then be unable to retrieve it. The app may warn a signed-in creator, but cannot
identify the creator of a secret made while signed out. Check your
[receipt](/en/share/your-receipt) instead.

## If a passphrase was set

Enter the passphrase provided by the sender. If you do not have it, check the
other channel they used or ask them through a different channel from the link.
Onetime Secret cannot recover it.

An incorrect passphrase does not consume the secret. Repeated incorrect entries
can temporarily block further attempts, including attempts with the correct
passphrase. Wait for the lockout to end before trying again. See
[Incorrect passphrase](/en/share/when-a-link-doesnt-work#incorrect-passphrase).

The passphrase checks access to the secret; it is not the content's encryption
key. See [Data protection](/en/security/data-protection).

## Revealing the content

:::caution[Save the content before leaving]
After a successful reveal, Onetime Secret cannot serve the content again. If the
connection fails or the tab closes before you see or save it, ask the sender for
a new secret.
:::

The service allows at most one successful reveal. If two requests try to reveal
the same secret concurrently, only one can retrieve the content. This limits
retrieval from the service; it does not stop a recipient copying or sharing what
they read.

The revealed content has a copy action. Save it in its intended destination,
such as your password manager or application configuration, before leaving.

## Reloading and reopening

After a reveal, reloading or opening the same link on another device cannot
retrieve the content again. The displayed page may still contain the revealed
value until you leave, but do not rely on browser history to recover it.

The sender's receipt records the outcome, not a recoverable copy of content
they entered. If you need it again, ask the sender to create a new secret.

## When the link is already gone

The default unavailable-secret message is **This secret has been viewed or
expired.** It covers a secret that was revealed, burned, or expired, and an
address that never referred to a secret.

The page does not distinguish these cases because anyone with the address could
otherwise learn its history. Ask the sender to check their receipt or send a
new secret. See [When a link doesn't work](/en/share/when-a-link-doesnt-work)
for damaged links, passphrase errors, and connection failures.

## What a custom domain changes

A custom domain changes the address and appearance of the page. It can apply
its logo, colors, fonts, language, and instructions before or after reveal.
The unavailable-secret message can also differ from the default wording above.

These settings do not change the single-reveal behavior. See
[Branding your domain](/en/custom-domains/branding) for domain appearance settings.

## What the sender learns about you

The sender's receipt shows link-fetch counts and timestamps, plus whether and
when a reveal succeeded. Fetch history is capped and can include scanners.
These observations do not prove the intended recipient read the content.

The receipt does not show the reader's name, account email, or location. An
optional reveal email gives the sender the secret's short identifier and reveal
time, without identifying the reader.

**Organization activity is a separate record.** When activity collection is
enabled for a secret created in an organization's context, events can include:

- An actor label, such as Anonymous, Creator, or Another signed-in user.
- A full internal account identifier for an authenticated actor. Owners and
  admins with access to the activity record can resolve it to an email address
  when that account has an active membership in the organization. Other account
  identifiers are not resolved to an email by that membership lookup.
- Masked network information, a shortened browser identification string, and
  a correlation token for link fetches. A country code may also be recorded
  where country collection is enabled.

An unsigned-in request has no authenticated account identifier in this record.
That does not guarantee anonymity: network context and information outside this
record can still be relevant. See [Secret Activity](/en/organizations/audit-trail)
for access and retention details.

## Related pages

- [Sharing secrets](/en/share) — creating and sending a link
- [When a link doesn't work](/en/share/when-a-link-doesnt-work) — errors and
  next steps
- [Your receipt](/en/share/your-receipt) — what a sender can see and do
- [Request a secret](/en/share/request-secret) — collecting information
  from someone else
- [Glossary](/en/start/glossary) — receipt, passphrase, reveal, and burn
