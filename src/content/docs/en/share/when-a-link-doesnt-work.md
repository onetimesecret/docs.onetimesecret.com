---
title: When a secret link doesn't work
description: Check an unavailable or damaged link, resolve passphrase errors, and distinguish a failed page load from a failed reveal.
audience: end-user
pageType: how-to
sourceOfTruth: onetimesecret at 145c1e7cfa — lib/onetime/security/passphrase_rate_limiter.rb (five failures within ten minutes per secret and masked network, 30-minute lockout, global backstop); apps/api/v2/logic/secrets/show_secret.rb and burn_secret.rb (lockout checked before passphrase verification); lib/onetime/models/secret/features/secret_state_management.rb (single reveal); locales/content/en/error-pages.json and 00-common.json (error wording)
---

Find the message you see, then follow the next step. You do not need an account.

## What you're seeing

| On screen | What to do |
|---|---|
| **This secret has been viewed or expired.** | Copy the full link again. If it still fails, ask the sender to check the receipt and create a new secret. |
| **Incorrect passphrase** | Check the passphrase with the sender through a different channel. Stop guessing if you are unsure. |
| **Too many incorrect passphrase attempts. Please try again later.** | Wait for the lockout to end before entering the correct passphrase. The secret can expire during that wait. |
| **Oops! 404**, with “The page you're looking for doesn't exist or has been moved.” | Check the address for missing characters or added punctuation. |
| A connection or loading error | If you have not selected reveal, reload or try again shortly. If you already selected reveal, it may have succeeded even though the response did not arrive. |

## "This secret has been viewed or expired"

The same default message covers four cases:

- **Revealed**: a successful reveal already retrieved the content.
- **Burned**: someone destroyed the unread secret using its receipt.
- **Expired**: the chosen lifetime ended.
- **Never existed**: the address does not correspond to a secret. A partly
  copied or retyped link can produce this result.

A custom domain may use different wording for the same unavailable result.

### What to do about it

1. **Copy the complete link from the original message.** Avoid retyping it.
   Check for added punctuation or missing characters.
2. **Ask the sender to check the receipt.** It records reveal, burn, or expiry
   separately and may still be available after the secret is gone. Tell them
   roughly when and where they sent the link.
3. **Ask for a new secret if the original is unavailable.** The receipt does
   not recover content the sender entered. They need the original information
   to create a new link.

Opening the confirmation page without selecting reveal does not consume the
secret. A scanner or preview that only loads the page does not consume it
either. If you selected reveal and then lost the connection or closed the tab,
the reveal may already have succeeded. Ask the sender to check before assuming
that the content is still available.

### Why the page won't tell you which one happened

Anyone with an address can request it. Using the same unavailable response
prevents that person learning whether a secret previously existed or how it
ended. A live link can still be distinguished from an unavailable one; its
history is not disclosed through the unavailable page.

## "Incorrect passphrase"

An incorrect passphrase does not consume the secret. Check other messages for
the passphrase or ask the sender through a different channel from the link.
Onetime Secret cannot look it up or recover it.

After five incorrect attempts within ten minutes for a secret from the same
masked network, further attempts are blocked for 30 minutes. A separate global
limit can also block attempts from all networks. The error reads **Too many
incorrect passphrase attempts. Please try again later.**

During a lockout the service refuses attempts before checking the passphrase,
so entering the correct one does not bypass the wait. Once the lockout ends,
use the confirmed passphrase rather than continuing to guess. A successful
passphrase check clears accumulated failure counters; it cannot happen while
the applicable lockout is active.

The secret's expiration does not pause during a lockout. If it expires while
you wait, ask for a new secret.

## "Oops! 404"

An invalid path can show the site's general not-found page instead of the
unavailable-secret message. Copy the link again from the original message.
Check for trailing brackets or punctuation and line breaks inserted by an email
client. Ask the sender to resend the link as plain text if needed.

Losing letters or digits from an identifier can leave a valid-looking address
that instead produces **This secret has been viewed or expired.** Neither
message alone proves someone else revealed the secret.

## A plain error message

If the confirmation page never loaded and you have not selected reveal, try
reloading or waiting briefly. Loading that page does not consume the secret.

If an error appeared **after selecting reveal**, the request may have consumed
the secret before its response was lost. A retry can then show the
unavailable-secret page. Ask the sender to check the receipt and, if it reports
Revealed, send a new secret. The service cannot serve a successful reveal again.

## Related

- [What recipients see](/en/share/what-recipients-see) — the normal reveal
  process
- [Your receipt](/en/share/your-receipt) — checking the outcome as a sender
- [Glossary](/en/start/glossary) — reveal, burn, expiry, and receipt
- [Security best practices](/en/security/best-practices) — sharing links and
  passphrases

## Questions or need support?

Email [support@onetimesecret.com](mailto:support@onetimesecret.com) or use the
[feedback form](https://onetimesecret.com/feedback).
