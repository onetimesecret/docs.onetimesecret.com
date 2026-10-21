---
title: Sharing secrets
description: Create a secret link, choose how long it lives and who can open it, then hand it over so that only the right person can read it, once.
audience: end-user
pageType: how-to
sourceOfTruth: onetimesecret/lib/onetime/models/receipt.rb:287 (the receipt is kept for twice the secret's lifetime); onetimesecret/apps/api/v2/logic/secrets/base_secret_action.rb:283-303,481-485 (the recipient email requires an account and reaches the first address only)
---

This page takes one secret from nothing to delivered. Everything on the way is
optional except the content itself; what follows is what each choice does and
what it costs you.

## Before you start

You do not need an account. Anyone can create a secret link and hand it over.

Signing in changes two things that matter here:

- The built-in recipient email becomes available. Without an account it is
  refused outright, not merely hidden.
- The secret is indexed to your account, so it appears in your recent secrets
  and you can find its receipt again later. Secrets you create while signed out
  are never attached to your account — if you lose the receipt link, there is no
  way back to it. See
  [Dashboard and recent secrets](/en/account/dashboard-and-recent-secrets).

## Write the secret, or generate one

There are two ways to create a secret, and they behave differently afterwards.

**Type or paste the content.** Whatever you enter is what the recipient gets.
An empty submission is rejected — *You did not provide anything to share.*

**Generate a password.** The service mints a random value for you, using the
length and character sets it is configured with — neither is yours to set in the
web app. When more than one character set is enabled, the result is guaranteed
to contain at least one character from each, and every character comes from a
cryptographic random source.

The cost of generating is that you never see the value while creating it. It is
shown to you **once**, on your receipt, on the first load of that page and only
within a short window after creation. A second load will not show it again, and
neither will a reload of the same page. If you miss it, create a new secret —
there is no way to recover it.

That makes one option worth checking before you generate. *Stay on page* —
which keeps you on the create form so you can make several secrets in a row — is
not disabled when you generate, and leaving it on costs you the password: the
app only takes you to the receipt when it is off, and the receipt is the only
place a generated value is ever shown. Turn *Stay on page* off before you
generate.

:::caution[A secret you typed is never shown back to you]
Only generated passwords are ever redisplayed, and only under the conditions
above. If you paste in a value you need to keep, put it where it belongs — your
password manager, your configuration — **before** you create the link. Onetime
Secret is a delivery mechanism, not storage.
:::

Content has a size ceiling, enforced in two places that behave differently. The
compose box stops accepting input once it is full, so pasting a body longer than
that is cut off in the browser with nothing to tell you — watch the character
counter before you create the link. Content that reaches the server over the
limit is rejected outright rather than trimmed.

The server ceiling is measured in bytes while the compose box counts characters,
so accented letters, non-Latin scripts and emoji consume more of the server
budget than the visible character count suggests.

## Choose how long it lives

Every secret gets a lifetime, fixed at the moment you create it. When it runs
out the stored secret is deleted whether or not anyone read it. On the create
form the field is labelled *Expiration Time*, and each choice reads *Expires in
…*. Deletion is enforced by the datastore itself rather than by a cleanup job,
so it does not depend on anything running on schedule.

Two things about the durations you are offered:

- The list is filtered to what would actually be enforced for you, so in normal
  use it does not offer a duration the server would shorten. The exception is a
  ceiling shorter than every duration configured: the shortest one is still
  offered, and the server shortens it further.
- Secrets created without an account have their own separate maximum lifetime.

Prefer the shortest duration the recipient can realistically work with. The
lifetime is the window in which a link that leaked — forwarded, screenshotted,
left in a chat log — is still live.

Your receipt deliberately outlives the secret: it is kept for **twice** the
secret's lifetime, so you can still see what happened to a secret after the
secret itself is gone.

Self-hosted instances configure the available durations themselves; see
[Environment variables](/en/self-hosting/environment-variables).

## Decide who can open it

By default, anyone holding the link can open the secret. A passphrase narrows
that to anyone holding the link *and* the passphrase.

- The passphrase controls **who may open** the secret. It is not the key the
  content is encrypted with — see
  [Data protection](/en/security/data-protection).
- A wrong passphrase does not consume the secret. The recipient sees *Incorrect
  passphrase* and the secret is untouched. Repeated guessing is rate limited.
- Nobody can look it up or recover it — not the recipient, not you, not Onetime
  Secret. Your receipt records only that a passphrase is required.
- Burning the secret early also requires the passphrase. If you lose it, you can
  no longer destroy the secret on demand; you can only wait for it to expire.

Send the passphrase through a different channel from the link — a different app,
a phone call. Sending both in the same message adds nothing: anyone who can read
one can read the other.

## Hand over the link

Most links are delivered by the sender: pasted into a chat, a ticket, an email
you write yourself. Onetime Secret does not need to be in the delivery path at
all.

If you are signed in you can instead enter a recipient address and let the
service send it. Three things to know about that option:

- The email carries the **link only, never the content**, and it tells the
  recipient whether a passphrase is required without carrying the passphrase.
- The address is checked before the secret is created, so a malformed address
  fails at creation rather than after the fact. Passing that check is not proof
  of delivery: treat a sent email as sent, not as received.
- Only the **first** address is emailed. Additional addresses receive nothing —
  pass the link on yourself if more than one person needs it.

Whichever route you use, the link is the credential. There is no second identity
check: whoever opens it first gets the content, whether or not that is the
person you meant. The link itself is not guessable — the identifier carries 256
bits of randomness — so the risk is the channel you send it through, not someone
finding it by chance.

Merely loading the link does not consume the secret; an explicit confirmation
does. A link scanner, mail gateway or chat preview that fetches the address will
not burn it. [What recipients see](/en/share/what-recipients-see) covers the
other side in full.

## Check that it worked

Do not open your own link to test it. Opening it consumes the secret exactly as
the recipient's open would. The app warns you first — *You created this secret.
If you view it, the recipient will not be able to see it.* — but if you continue
anyway, the recipient will find nothing.

Check the **receipt** instead. It is created at the same time as the secret, at
a different URL with a different identifier. The receipt does not store the
content, so for a secret you typed it can never show you what you sent; the one
exception is a generated password, which it displays once as described above.

- Untouched, it reads **New** — *Secret link has been created and not yet
  viewed.*
- Once anything has loaded the link without confirming, it reads **Previewed** —
  *Secret link has been opened and is ready to be revealed.* Nothing has been
  handed over and the recipient can still read it. A link scanner or a chat
  preview is enough to move a receipt to Previewed.
- After the recipient reveals it, it reads **Revealed**, with the time.

If you have an account you can turn on an email that tells you when one of your
secrets was revealed. It is off unless you enable it — see
[Preferences](/en/account/preferences).

Keep the receipt link to yourself. Anyone holding it can destroy the secret, and
for a generated password, whoever reaches the receipt first within the short
window after creation sees the password itself. For a secret you typed, the
receipt never shows the content.

## If you need to take it back

Burn the secret from its receipt page. Burning destroys it before anyone reads
it; it is permanent and cannot be undone. Afterwards the recipient sees the same
*This secret has been viewed or expired* page as for any other dead link — they
are not told that it was burned. A secret with a passphrase needs that
passphrase to burn.

Once a secret has been revealed there is nothing left to take back. Create a new
secret and send a new link.

## More on sharing

- [Your receipt](/en/share/your-receipt) — what your receipt shows, how long it
  lasts, and burning.
- [What recipients see](/en/share/what-recipients-see) — the recipient's side,
  in order.
- [When a link doesn't work](/en/share/when-a-link-doesnt-work) — diagnosing a
  dead, damaged or refused link.
- [Why secret links](/en/share/why-secret-links) — what this solves that email
  and chat do not.
- [Use cases](/en/share/use-cases) — worked examples, from credentials to
  recovery codes.
- [Custom domains](/en/custom-domains) — sharing from your own domain instead of
  onetimesecret.com.
