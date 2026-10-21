---
title: Why use secret links?
description: Share a temporary link instead of copying sensitive information into email, chat, or tickets, and understand what that does and does not protect.
audience: end-user
pageType: concept
sourceOfTruth: onetimesecret at 145c1e7cfa — lib/onetime/models/secret.rb (encrypted content field); lib/onetime/models/secret/features/secret_state_management.rb (single reveal and burn); apps/api/v2/logic/secrets/show_secret.rb (confirmation and passphrase checks)
---

Pasting a password into a conversation leaves the password in that conversation's
history. A secret link lets you send a temporary address instead. Once its
content is revealed, burned, or expired, the service no longer serves it through
that link.

## Reduce copies in conversations

The recipient gets the information without the sender pasting it directly into
an email, chat, or ticket. An old message can still contain the link, but after
the secret is unavailable, that link cannot retrieve its content.

You can create and share a secret without an account. A recipient needs a
browser, the link, and any passphrase you set.

## Choose a limited lifetime

Set an expiry so an unread secret is deleted when it is no longer needed.
If you need to withdraw it sooner, burn it from the receipt, entering its
passphrase if one was set. See [Sharing secrets](/en/share).

Loading the confirmation page does not use up the secret. Confirming the reveal
retrieves it once. A sender can check the [receipt](/en/share/your-receipt) for
recorded status without using the recipient's reveal.

## Understand the protection

The hosted service uses HTTPS for transport and stores secret content encrypted.
The service encrypts and decrypts content on its servers. A passphrase adds an
access check, and should be sent through a different channel from the link.

See [Data protection](/en/security/data-protection) for data handling, including
retention considerations. Receipts and organization activity can remain after
the secret is no longer available, so a secret link does not mean there is no
record of the share.

## Know the limits

Anyone with a live link and any required passphrase can reveal it. The service
does not verify that this is your intended recipient. After a reveal, the reader
can copy, save, or forward the content. The one-time link does not control those
copies or revoke a password, token, or license key in the system that issued it.

Keep information you need later in its intended long-term location. Onetime
Secret is for delivery; an expiring link is not a backup for recovery codes.

## Next steps

- [Send your first secret](/en/start/send-your-first-secret) — try the process
- [Use cases](/en/share/use-cases) — practical examples and limitations
- [Preferences](/en/account/preferences) — optional reveal notifications
- [Secret Activity](/en/organizations/audit-trail) — organization event records
- [Security best practices](/en/security/best-practices) — links, passphrases,
  and recipient checks
