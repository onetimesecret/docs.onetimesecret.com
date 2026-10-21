---
title: Send your first secret
description: Take one password from your clipboard to your recipient's screen and then to nothing, without an account and without reading anything else first.
audience: end-user
pageType: how-to
sourceOfTruth: onetimesecret/lib/onetime/models/secret/features/secret_state_management.rb:107-227 (one reveal, then the record is destroyed); onetimesecret/apps/api/v2/logic/secrets/show_secret.rb:103,107-118 (a bare GET is safe and non-consuming; is_owner is secret.owner?(cust), which is false for every anonymously created secret per models/secret.rb:97-99); onetimesecret/lib/onetime/models/receipt/features/safe_dump_fields.rb:125,139-140 with src/apps/secret/components/receipt/StatusBadge.vue:41-43 (first access flips New to Previewed, timestamped); onetimesecret/lib/onetime/logic/base.rb:184-193 (byte budget, refused not trimmed) with src/shared/composables/useTextarea.ts:39-45 (the form truncates at its own character limit); onetimesecret/apps/api/v2/logic/secrets/conceal_secret.rb:29 and base_secret_action.rb:283-303 (the two errors quoted below); on-screen wording from onetimesecret/locales/content/en/00-common.json and secret-manage.json
---

You have a password, a key or a recovery code, and someone needs it. This is the
shortest honest path from there to *they have it and it is gone*.

## Before you start

- **You do not need an account.** Anyone can create a secret link and hand it
  over. Signing in adds things — a list of your recent secrets, the built-in
  recipient email — but nothing here depends on it.
- **Have a way to reach your recipient** that you are willing to put a link
  into: a chat message, a ticket, an email you write yourself. Onetime Secret
  does not have to be in the delivery path.

## Steps

### 1. Put in what you want to send

Paste or type the content, then use **Create a secret link**. That is the whole
of the required part; everything below is a choice you can skip.

Two things worth knowing before you commit:

- An empty submission is refused — *You did not provide anything to share*.
- You will not be shown this content again. The receipt you get back never
  echoes a secret you typed. Keep your own copy if you need one.

There is a second way to create a secret: ask the service to **generate** a
random password instead of supplying one. That is a good default for new
credentials, and it is the one exception to the bullet above — a generated value
is shown to you exactly once, on your receipt, and only shortly after you create
it. If you are doing this for the first time, type your own content and come back
to generation once the flow is familiar.

### 2. Choose how long it lasts

The field is labelled *Expires in*. When the time runs out the secret is deleted
whether or not anyone read it, and deletion is enforced by the datastore itself
rather than by a cleanup job, so it does not depend on anything running on
schedule.

Pick the shortest duration your recipient can realistically work with. The
lifetime is exactly the window in which a link that leaked — forwarded,
screenshotted, left in a chat log — is still live.

The list you are offered is filtered down to what would actually be enforced for
you, so in normal use the duration you pick is the duration you get. Secrets
created without an account have their own, separate maximum. The durations
available on a self-hosted instance are set by whoever runs it — see
[Environment variables](/en/self-hosting/environment-variables).

### 3. Add a passphrase, or don't

Without a passphrase, whoever holds the link can open the secret. With one, they
need the link *and* the passphrase.

Add one when the channel carrying the link is not one you fully trust — a shared
inbox, a group chat, a ticket other people can read. Then send the passphrase
through a **different** channel. Sending both in the same message adds nothing,
because anyone who can read one can read the other.

Two consequences to accept before you set one: nobody can look it up or recover
it afterwards, including you and including Onetime Secret; and destroying the
secret early will also ask for it, so losing the passphrase costs you that escape
hatch too. [Sharing secrets](/en/share) covers the tradeoff in full.

### 4. Hand over the secret link

You now have **two** links, and only one of them is for sending.

- The one you send is under `/secret/`. It is the credential: there is no second
  identity check, so whoever opens it first gets the content, whether or not that
  is the person you meant.
- The one you keep is under `/receipt/`. It never carries the content of a secret
  you typed, but anyone holding it can destroy the secret.

They are the same length and look alike. Check the path before you paste.

If you are signed in, you can instead enter a recipient address and let the
service send the link. That email carries the **link only, never the content**,
and tells the recipient whether a passphrase is required without carrying the
passphrase. Signed out, that field is refused rather than ignored — *An account
is required to send emails.*

## Check that it worked

**Do not test your own link by opening it and confirming.** Confirming consumes
the secret exactly as your recipient's confirmation would, and your recipient
will find nothing. If you are signed in, the app warns you first — *You created
this secret. If you view it, the recipient will not be able to see it.* Signed
out, it cannot tell the link is yours, so there is no warning at all.

Open your **receipt** instead. That is a safe read: it does not count as a view
and does not move the secret any closer to being gone. Untouched, it reads
*New*. After someone confirms and reads the secret, it reads *Revealed*, with the
time.

Merely loading a secret link does not consume it — the recipient has to confirm,
and only that confirmation destroys the secret. A mail scanner or chat preview
that fetches the link will move your receipt from *New* to *Previewed*, with a
timestamp, while the secret is still unread. That is normal, not a leak.

## If something goes wrong

**"You did not provide anything to share"** — the content field was empty.

**The content was rejected as too long** — the form itself stops accepting
characters at its own limit, and anything past that is dropped as you type, so
check the counter before you submit. Content that does get through and is still
too large is refused outright by the server, never trimmed. The counter in the
form is a character count; the ceiling the server enforces is a byte budget, so
accented letters, non-Latin scripts and emoji use it up faster than the counter
suggests.

**The recipient field was refused** — sending mail through the service requires
an account. Copy the link and send it yourself instead.

**Your recipient says the link is dead** — one page covers every case: *This
secret has been viewed or expired.* It deliberately does not say which.
[When a link doesn't work](/en/share/when-a-link-doesnt-work) walks through the
possibilities and what to do about each.

**You generated a password and missed your one look at it** — it cannot be
recovered. Create a new secret. The recipient's link, if you already sent one,
still works; the value is lost only to you.

## Next: read your receipt

The single thing first-time senders get wrong is the receipt. It is not a copy of
the secret and it is not a confirmation email — it is the only record of what
happened, it outlives the secret on purpose, and handing it to the wrong person
lets them destroy your secret.

Read [Your receipt](/en/share/your-receipt) before you send anything that
matters.

## Related

- [Sharing secrets](/en/share) — the full procedure, with the tradeoffs this page
  skips
- [What recipients see](/en/share/what-recipients-see) — the other side, in order
- [Glossary](/en/start/glossary) — receipt, reveal, burn, passphrase
- [Security best practices](/en/security/best-practices) — handing over links and
  passphrases safely
