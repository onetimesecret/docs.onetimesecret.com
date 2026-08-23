---
title: When a secret link doesn't work
description: What to do when a secret link says the information is no longer available, why the page will not tell you which of four things happened, and how to get what you were sent.
audience: end-user
pageType: how-to
sourceOfTruth: onetimesecret/lib/onetime/security/passphrase_rate_limiter.rb:50,63 (five attempts, 30-minute lockout); onetimesecret/lib/onetime/initializers/setup_diagnostics.rb:249-282 (62-character identifier); onetimesecret/lib/onetime/models/receipt.rb:286 (a receipt is kept for twice the secret's lifetime); onetimesecret/locales/content/en/error-pages.json:66-72 and 00-common.json:211-213 (on-screen 404 wording)
---

Someone sent you a secret link and it did not give you the information. This
page explains what the message on screen means and what to do next. You do not
need an account to follow it.

## What you're seeing

Three different screens mean three different things. What the last one means
also depends on when the error appeared.

| On screen | What it means |
|---|---|
| **This secret has been viewed or expired.** | The address was a well-formed secret link, and there is nothing behind it now. |
| **Oops! 404**, over "The page you're looking for doesn't exist or has been moved." | The address is not a secret link at all — usually a link that was damaged in transit. |
| A plain error message, and neither of the above | The request failed. If the page never loaded at all, nothing was consumed. If the error appeared *after* you clicked to reveal, the reveal may have gone through. |

## "This secret has been viewed or expired"

Four different situations produce this same page:

- **Someone already opened it.** A secret can be read once. When a reveal
  succeeds the stored record is destroyed immediately.
- **The sender burned it.** A sender can delete a secret before anyone reads
  it. Burning is permanent and cannot be undone.
- **It expired.** Every secret has a lifetime, fixed when it was created. When
  that runs out, the stored record is dropped.
- **It never existed.** The address is well-formed but has never corresponded
  to a secret — most often a link that was retyped or partly copied.

All four leave nothing behind the link to load, so nothing reachable *from the
link* tells them apart. For the first three, though, the record of what
happened does outlive the secret: it sits on the sender's receipt, at a
separate address the sender holds — not the one you were given.

:::note
**Opening the link is not what uses it up.** Loading a secret link is a
read-only step: the page asks you to confirm ("Click to reveal →") before it
hands anything over, and only that confirmation consumes the secret. A link
scanner, mail gateway or chat preview that merely fetches the address does not
consume it. If you opened the page and navigated away without confirming, the
secret was still there when you left.
:::

There is one case where the secret really is gone even though you never saw it:
if you confirmed and then lost the page — the connection dropped, the tab
closed, the browser crashed — the secret was destroyed at the moment the reveal
succeeded, before the response was sent back to you. That is deliberate. The
alternative is a secret that can be read twice.

## What to do about it

1. **Check that you have the whole link.** Current secret links carry a
   62-character identifier after `/secret/`. If yours is shorter, the address
   was cut short in transit. Copy it again from the original message rather
   than retyping it, and paste it whole.
2. **Ask the sender what happened.** They hold a receipt for the secret, and
   the receipt deliberately outlives the secret — it is kept for twice the
   secret's lifetime — so they can usually still see the answer: whether it was
   **Revealed** and when, whether they **Burned** it, or whether it
   **Expired**. Give them enough to find it: roughly when they sent it, and
   through which channel.
3. **Ask for a new secret, not the old one.** Once a secret is gone the content
   cannot be recovered — not by you, not by the sender, not by Onetime Secret.
   The sender's receipt records what happened to the secret, not what was in
   it. The fix is always a new secret and a fresh link.

One thing worth telling the sender: their receipt also counts how many times
the link was *fetched*, separately from whether the secret was revealed. A
fetch count above zero on a secret that was never revealed is not a
contradiction — it means the address was loaded, which on its own does not
consume anything.

## Why the page won't tell you which one happened

Saying which of the four happened would turn every link into an oracle. Anyone
holding an address could learn whether a secret had once existed there, whether
it was read, and roughly when — facts about the sender and the recipient, not
about the person asking. So the service returns the same response in all four
cases, and the internal error is raised with no distinguishing detail, which
means the four cases cannot differ even in wording.

Being precise about what that does and does not hide: someone holding a link
can still tell whether it is live right now, because a live link opens and a
dead one does not. What they cannot learn is which of the four terminal states
a dead link is in. Links are also not guessable — the 62-character identifier
carries 256 bits of randomness — so there is no practical way to go looking for
other people's links in order to ask.

This is the same reason the page cannot be more helpful to you specifically. It
has no way to know that you are the intended recipient rather than someone who
found the link.

## "Incorrect passphrase"

This one *is* distinguishable, deliberately, because it is not information
about anyone else.

- **A wrong passphrase does not consume the secret.** The secret is still
  there and still readable once the right passphrase is entered.
- **Nobody can look the passphrase up.** It is not stored in a readable form.
  The sender's receipt records only that a passphrase is required, never what
  it is. Only the person who chose it knows it.
- **Check your other channels first.** Passphrases are normally sent separately
  from the link, so the passphrase may be sitting in a different message.

Guessing is rate limited. After five wrong attempts, that link stops accepting
attempts from your network for 30 minutes and answers **"Too many incorrect
passphrase attempts. Please try again later."** Nothing has been consumed — a
wrong passphrase never uses a secret up. But the lockout runs its full 30
minutes regardless of how long the secret itself was set to live, so a
short-lived secret can expire while you are waiting it out. A second,
much higher limit counts attempts from everyone at once as a backstop, so one
person guessing at a link does not immediately lock out the real recipient.
Entering the correct passphrase clears the limit right away.

## "Oops! 404"

You land on the site's general not-found page — **Oops! 404**, over "The page
you're looking for doesn't exist or has been moved." — rather than the secret
page, when the address after `/secret/` contains anything other than letters
and digits. Secret identifiers are letters and digits only, so this almost always
means the link was damaged on the way to you: a trailing bracket or full stop
picked up from an email client, a URL that got wrapped across lines, or a
fragment of the address.

Copy the link again from the original message and paste it whole. If it arrived
in a chat or document that added formatting, ask the sender to resend it as
plain text.

:::caution
A link that lost only letters and digits does **not** give you the 404 page.
Cutting characters off the end of an identifier leaves something that still
looks like a valid address, so a truncated link produces "This secret has been
viewed or expired" instead — exactly like a secret that was read. Check the
length of the link before concluding that someone else opened it.
:::

## A plain error message

If the page never loads and shows an error message instead of either page
above, the request itself failed — a network problem, or the service not
answering. Nothing was consumed, because nothing got as far as the secret.
Reload the page or try again in a moment. This case is rendered differently
from "viewed or expired" on purpose, so a temporary failure is never reported
to you as a used-up secret.

An error that appears *after* you clicked to reveal is the other case, and it
is not safe to read the same way. The secret page has loaded by then, so the
error appears in place of the content rather than in place of the page. The
reveal may have succeeded and only the response been lost — the same situation
as [losing the page mid-reveal](#this-secret-has-been-viewed-or-expired) above.
You can still reload, but if the reveal did go through you will get "This
secret has been viewed or expired" and the content is gone for good. Ask the
sender to check their receipt — it will say whether the secret was revealed —
and ask for a new secret rather than retrying the old link.

## Related

- [What recipients see](/en/share/what-recipients-see) — the normal path, end to end.
- [Your receipt](/en/share/your-receipt) — for senders: what your receipt still
  tells you after the secret is gone.
- [Glossary](/en/start/glossary) — burn, receipt, reveal, and the rest of the
  vocabulary above.
- [Security best practices](/en/security/best-practices) — including sending
  the passphrase through a different channel from the link.

## Questions or need support?

We're here to help.

- Email: support@onetimesecret.com
- Feedback form: https://onetimesecret.com/feedback
