---
title: Send your first secret
description: Create a one-time link, send it to your recipient, and check its status. No account required.
audience: end-user
pageType: how-to
sourceOfTruth: onetimesecret/lib/onetime/models/secret/features/secret_state_management.rb:107-227 (one reveal, then the record is destroyed); onetimesecret/apps/api/v2/logic/secrets/show_secret.rb:103,107-118 (a bare GET is safe and non-consuming; is_owner is secret.owner?(cust), which is false for every anonymously created secret per models/secret.rb:97-99); onetimesecret/lib/onetime/models/receipt/features/safe_dump_fields.rb:125,139-140 with src/apps/secret/components/receipt/StatusBadge.vue:41-43 (first access flips New to Previewed, timestamped); onetimesecret/lib/onetime/logic/base.rb:184-193 (byte budget, refused not trimmed) with src/shared/composables/useTextarea.ts:39-45 (the form truncates at its own character limit); onetimesecret/apps/api/v2/logic/secrets/conceal_secret.rb:29 and base_secret_action.rb:283-303 (the two errors quoted below); onetimesecret/apps/api/v2/logic/secrets/show_receipt.rb:149-194 (generated values display once within a short window, without a passphrase); onetimesecret/apps/api/v2/logic/secrets/burn_secret.rb:64-76 (burning requires the passphrase when set); on-screen wording from onetimesecret/locales/content/en/00-common.json and secret-manage.json
---

Share a password, key or recovery code through a link that can be used once.
This guide takes you from entering the content to checking whether it was
revealed.

## Before you start

- **You do not need an account.** You can create a secret link and send it
  yourself.
- **Have a way to reach your recipient**, such as a chat message, ticket or
  email.
- **Keep your own copy if you need one.** Content you enter is not shown back
  to you after you create the link.

## Steps

### 1. Open Onetime Secret and enter your content

Go to [onetimesecret.com](https://onetimesecret.com/) and paste or type what you
want to share into the content field. If you use a self-hosted instance, open
its address instead.

Check that all the content is there, especially after pasting a long value. The
form has a length limit and drops anything beyond it.

### 2. Choose how long it lasts

Use **Expires in** to choose the shortest duration your recipient can
realistically work with. You can keep the default if it suits your needs.
When the time runs out, the secret is deleted even if nobody has read it.

### 3. Add a passphrase if needed

Without a passphrase, anyone with the link can reveal the secret. With one,
they need both the link and the passphrase.

If you add a passphrase, send it through a **different channel** from the link.
Anyone who can read a message containing both has everything they need.

Keep the passphrase somewhere safe: nobody can recover it, including Onetime
Secret. You also need it to destroy the secret early.

### 4. Create the link

If **Stay on page** is enabled, turn it off so you will be taken to the receipt.
Then select **Create a secret link**. The receipt page opens with the link to
share and information about the secret's status and expiry.

### 5. Send the secret link and keep the receipt

There are two addresses with different purposes:

- **Send the secret link**, under `/secret/`. Whoever has it can reveal the
  content once, provided they also enter the passphrase if you set one. The
  service does not check that they are your intended recipient.
- **Keep the receipt link private**, under `/receipt/`. It shows the status
  without showing content you entered. Anyone with this link can destroy the
  unread secret, but must also enter the passphrase if you set one.

Check the path before pasting the link into your message. Send the passphrase
separately, if you set one.

## Check that it worked

**Do not reveal your own secret to test the link.** Doing so consumes it, and
your recipient will find nothing. When you are signed out, the app cannot tell
that you created the secret and will not warn you.

Open your **receipt** instead. Checking it does not consume the secret:

- **New** means it has not been revealed or previewed.
- **Previewed** means the secret link has been loaded, possibly by a mail
  scanner or chat preview. Loading the link alone does not consume the secret;
  the recipient must confirm to reveal it. This status does not identify who
  loaded the link.
- **Revealed** means someone revealed the secret. The receipt shows when, but
  does not prove it was your intended recipient.

See [Your receipt](/en/share/your-receipt) for the other statuses and how to
destroy an unread secret.

## Other ways to create and send secrets

### Generate a password

You can ask the service to generate a random password instead of entering your
own content. Without a passphrase, the generated value can be shown once on the
receipt, within a short window after creation. With a passphrase, it is never
shown on the receipt; only your recipient can reveal it.

Before using this option, read [Sharing secrets](/en/share#write-the-secret-or-generate-one)
and [the generated-password display conditions](/en/share/your-receipt#seeing-a-generated-password-one-look).
The signed-in form opens the receipt for generated passwords even when
**Stay on page** is enabled.

### Have the service email the link

If you are signed in, you can enter a recipient address on the creation form
before creating the link. The email includes the **link only**, without the
secret content or passphrase. Without an account, copy the link and send it
yourself.

## If something goes wrong

**"You did not provide anything to share"** — the content field was empty.
Enter the content before creating the link.

**The content was rejected as too long** — the form drops characters beyond its
own limit, so check the counter and the content before submitting. The server
also enforces a byte limit and refuses oversized content without trimming it.
Accented letters, non-Latin scripts and emoji can use multiple bytes per
character. See [content limits](/en/share#write-the-secret-or-generate-one).

**"An account is required to send emails"** — sign in to use the recipient
email field, or copy the link and send it yourself.

**Your recipient says the link is dead** — the same *This secret has been
viewed or expired* message covers several cases. See
[When a link doesn't work](/en/share/when-a-link-doesnt-work) for the possible
causes and next steps.

**You generated a password and missed its display** — the receipt cannot show
it again. If you need the value yourself, create a new secret. The original
recipient link can still be used while the secret remains unread and unexpired.

## Related

- [Sharing secrets](/en/share) — the full procedure and available options
- [What recipients see](/en/share/what-recipients-see) — how to open and reveal
  a secret
- [Glossary](/en/start/glossary) — receipt, reveal, burn, passphrase
- [Security best practices](/en/security/best-practices) — sending links and
  passphrases safely
