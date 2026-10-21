---
title: Your receipt
description: Distinguish your secret link from its receipt, check status, see a generated password once, and burn an unread secret.
audience: end-user
pageType: concept
sourceOfTruth: onetimesecret at 145c1e7cfa — lib/onetime/models/receipt.rb (receipt lifetime and incoming capabilities); apps/api/v2/logic/secrets/show_receipt.rb (status, share link, and generated-value display); lib/onetime/models/receipt/features/access_timeline.rb (bounded fetch history); apps/api/v2/logic/secrets/burn_secret.rb (burn confirmation and passphrase)
---

Creating a secret gives you a **secret link** to send and a **receipt link** to
keep. The receipt shows status and lets you destroy an unread secret. It does
not redisplay content you entered. A generated password can be displayed there
once, under the conditions below.

## Two links, and only one of them is for sending

| | Secret link | Receipt link |
|---|---|---|
| Address | `/secret/…` | `/receipt/…` |
| Who uses it | Your recipient | You |
| Purpose | Reveal the content once | Check status or burn the unread secret |
| Passphrase | Required to reveal, if set | Required to burn, if set |

Check the path before sending a link. Anyone with the secret link and any
required passphrase can reveal it. Anyone with the receipt link and any
required passphrase can burn it; sign-in is not an ownership check for either
link. Receipt addresses can also appear in browser history.

Older copy or API clients may use **private link** or **metadata** for a receipt.
The current browser address uses `/receipt/`.

## What your receipt tells you

Loading the receipt does not consume the secret. It can show:

- **Status**: New, Previewed, Revealed, Burned, Expired, or Orphaned. See the
  [glossary](/en/start/glossary#secret-status) for definitions. A reveal or burn
  includes its time.
- **Link access**: a count and timestamps for link fetches. A mail scanner or
  chat preview can increase the count without revealing the secret. The history
  is capped: the count may stop increasing and older accesses may no longer be
  represented.
- **Creation and expiration times**, and whether a passphrase is required.
  The passphrase itself is not displayed or recoverable.
- **The obscured recipient address**, if you used email delivery.
- **A memo**, if one was added. Edit your memo from the dashboard's recent
  secrets list; the receipt displays it read-only. For an incoming submission,
  the memo is supplied by the sender.

For regular shares, the receipt can also show the secret link while it remains
available. Once it is revealed, burned, or expired, that link is no longer
shown. Receipts for [incoming submissions](/en/custom-domains/homepage-and-incoming)
do not show the share link.

The receipt reports recorded activity, not proof of your recipient's identity
or successful email delivery. For organization activity and actor details, see
[What the sender learns about you](/en/share/what-recipients-see#what-the-sender-learns-about-you).

### Email notifications

Account holders can enable an email when one of their secrets is revealed;
see [Preferences](/en/account/preferences). It is off unless enabled and does
not apply to secrets created while signed out. The message gives the secret's
short identifier and reveal time, not its content or the reader's identity.

An account holder may also receive a warning before a long-lived secret expires.
That warning has no account-level opt-out. Loading the link or burning the
secret does not send a reveal notification.

## Seeing a generated password: one look

If you generate a password, the receipt can display it once without consuming
the recipient's reveal. Content you entered yourself is never redisplayed.

The generated-password display requires all of these conditions:

- **No passphrase was set.** A passphrase-protected generated password is not
  displayed on the receipt. It can only be revealed through the secret link.
- **The display window is still open.** It starts at creation and may be
  disabled by the operator. Open the receipt promptly.
- **The receipt's lifecycle state is still New.** A reveal, burn, or other
  completed outcome prevents display.
- **No earlier request used the display.** Reloading, opening another device,
  or making a simultaneous request does not provide another display. A request
  can use this one display even if the connection fails before you see it.

Save the value in your password manager or its intended destination before
leaving the page. If you miss the display, create a new secret if you need the
value yourself. The original recipient link still works while its secret is
unread and unexpired.

The signed-in form opens the receipt for generated passwords even with
**Stay on page** enabled. See [Sharing secrets](/en/share#write-the-secret-or-generate-one).

:::note[Running your own instance?]
The display window is configured by `generated_value_display_ttl`; setting it
to zero disables display. See [Configuration](/en/self-hosting/configuration).
:::

## Burning a secret before anyone reads it

Open the receipt, choose to burn the secret, and confirm. If you set a
passphrase, enter it too. Burning permanently destroys the unread stored secret;
there is no undo. If you lose the passphrase, you cannot burn it and must wait
for it to expire.

The receipt records **Burned** and its time. The recipient sees the same
unavailable-secret page used for revealed or expired links, without a reason.
Once the secret has been revealed there is nothing left on the service to burn;
burning cannot remove copies saved by a recipient.

## What happens if you send the wrong one

A receipt does not redisplay content you entered, so sending it will not let
the recipient read that content. It does give them the ability to burn the
unread secret if they have any required passphrase. For a generated password
without a passphrase, they may also use its one receipt display.

If you sent the receipt to the wrong person, burn the unread secret if possible,
then create a new secret and send its secret link to the intended recipient.
If you sent it to the intended recipient by mistake, send them the secret link
and ask them to discard the receipt link.

## How long the receipt lasts

A receipt lasts twice the secret's chosen lifetime, measured from creation.
For example, a secret with a one-day lifetime has a receipt with a two-day
lifetime. That gives you time to check what happened after the secret is gone.

When the receipt expires, its page and access history are unavailable. There is
no receipt archive or way to extend it afterwards. Keep any required record
somewhere you control. [Secret Activity](/en/organizations/audit-trail) is a
separate organization record with its own retention rules.

## Related

- [Sharing secrets](/en/share) — creating and sending a link
- [What recipients see](/en/share/what-recipients-see) — opening and revealing
- [When a link doesn't work](/en/share/when-a-link-doesnt-work) — errors and
  next steps
- [Dashboard and recent secrets](/en/account/dashboard-and-recent-secrets) —
  finding receipts and editing memos
- [Glossary](/en/start/glossary) — receipt, passphrase, reveal, and burn
