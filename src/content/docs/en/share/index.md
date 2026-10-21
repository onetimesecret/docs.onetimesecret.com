---
title: Sharing secrets
description: Create a one-time secret link, choose its lifetime and optional passphrase, send it, and check its receipt.
audience: end-user
pageType: how-to
sourceOfTruth: onetimesecret at 145c1e7cfa — lib/onetime/models/receipt.rb (receipt lifetime); apps/api/v2/logic/secrets/base_secret_action.rb (recipient validation and first-address delivery); lib/onetime/logic/base.rb (byte limit); src/shared/composables/useTextarea.ts (browser truncation); src/apps/workspace/components/forms/WorkspaceSecretForm.vue (generated-password navigation); apps/api/v2/logic/secrets/show_receipt.rb (generated-value display conditions); apps/api/v2/logic/secrets/show_secret.rb (safe loading and creator identification); apps/api/v2/logic/secrets/burn_secret.rb (passphrase check)
---

Create a secret link, send it to your recipient, and use the receipt to check
its status. You can enter your own content or generate a password to share.

For a shorter walkthrough, see
[Send your first secret](/en/start/send-your-first-secret).

## Before you start

You do not need an account to create a secret link and send it yourself.
Signing in lets you use the recipient email field and find receipts again in
[Dashboard and recent secrets](/en/account/dashboard-and-recent-secrets).
Secrets created while signed out are not added to your account later, so keep
their receipt links if you need to check their status.

## Write the secret, or generate one

**Type or paste the content.** Save your own copy first if you will need it
later. Content you enter is not shown back to you after you create the link.
An empty submission is rejected with *You did not provide anything to share.*

Check the content after pasting. The form truncates input beyond its character
limit. The server separately rejects content over its byte limit without
trimming it. Accented letters, non-Latin scripts, and emoji can use multiple
bytes, so content below the displayed character limit can still be rejected.

**Generate a password.** This creates a random password using the length and
character sets configured by the service. The web form does not let you change
those settings.

Without a passphrase, the generated value can be displayed once on the receipt,
within a short window after creation. With a passphrase, it is never displayed
on the receipt; the recipient must reveal it through the secret link.

The signed-in creation form opens the receipt when you generate a password,
even if **Stay on page** is enabled. That preference applies when you enter
your own content. Save the generated value before leaving the receipt; a
reload cannot show it again. See the full
[generated-password display conditions](/en/share/your-receipt#seeing-a-generated-password-one-look).

## Choose how long it lives

Choose the shortest expiration your recipient can realistically use. On the
form, the choices read **Expires in …**. When that lifetime ends, the stored
secret is deleted even if nobody has revealed it.

Available lifetimes depend on the service and your plan. Anonymous sharing has
its own maximum lifetime. A self-hosted operator configures the available
options; see [Environment variables](/en/self-hosting/environment-variables).

The receipt lasts twice the secret's chosen lifetime, measured from creation,
so you can check what happened after the secret is no longer available.

## Decide who can open it

Anyone with the secret link can reveal it. Adding a passphrase requires them
to supply both the link and the passphrase; the service does not check whether
they are your intended recipient.

- Send the passphrase through a **different channel** from the link, such as
  a phone call when you send the link by email.
- Keep the passphrase safe. It cannot be looked up or recovered by Onetime
  Secret, and it is also needed to burn the secret early.
- An incorrect passphrase does not reveal or consume the secret. Repeated
  incorrect attempts are rate limited.

The passphrase is an access check, not the encryption key for the content.
See [Data protection](/en/security/data-protection) for the service's encryption
and data-handling overview.

## Hand over the link

After creating the secret, send the **secret link**, whose address contains
`/secret/`. Keep the **receipt link**, under `/receipt/`, private.

Copy the secret link into your chat, ticket, or email. If you are signed in,
you can instead enter a recipient email address on the creation form:

- The email contains the link, not the secret content or passphrase.
- The address is checked before creation, but that check does not establish
  that the message was delivered or read.
- Only the first address is emailed if several are supplied. Create a separate
  secret for each person who needs to reveal the content. Forwarding one link
  does not give each recipient a separate reveal.

Loading the link opens a confirmation page without consuming the secret.
Selecting **Click to reveal** retrieves the content once. A mail scanner or
chat preview that only loads the page does not consume it; software that
submits the reveal action can.

After revealing the content, a recipient can save or share their own copy.
The one-time limit applies to retrieval from Onetime Secret.

## Check that it worked

**Do not reveal your own secret to test it.** Doing so consumes it before your
recipient can read it. A signed-in creator may see a warning; the app cannot
identify the creator of a secret made while signed out.

Open the **receipt** instead. Loading it does not consume the recipient's
reveal. It shows:

- **New**: the secret link has not been previewed.
- **Previewed**: the link has been loaded without revealing the content. A
  scanner can cause this status; it does not identify your recipient.
- **Revealed**: a reveal succeeded, with its time. This does not prove the
  intended person read the content.

See [Your receipt](/en/share/your-receipt) for other statuses and the conditions
for displaying a generated password. Keep the receipt private: someone with
it can burn an unread secret if they also supply its passphrase when required.

To enable optional reveal emails, see [Preferences](/en/account/preferences).

## If you need to take it back

Open the receipt and choose to **burn** the unread secret. Confirm the action
and enter its passphrase if one was set. Burning permanently removes the stored
secret. The recipient gets the same unavailable-secret page as for an expired
or already revealed link.

If you lose the passphrase, you cannot burn the secret; it remains subject to
its chosen expiry. Once a secret has been revealed, burning cannot remove any
copy the recipient saved. If you need to withdraw a password or API key that
someone has already read, change or revoke it in the system that issued it.

## More on sharing

- [Your receipt](/en/share/your-receipt) — statuses, lifetime, and burning
- [What recipients see](/en/share/what-recipients-see) — opening and revealing
  a secret
- [When a link doesn't work](/en/share/when-a-link-doesnt-work) — errors and
  next steps
- [Request a secret](/en/share/request-secret) — ask someone to send
  sensitive information to you
- [Why use secret links](/en/share/why-secret-links) — how links reduce copies
  in conversations
- [Use cases](/en/share/use-cases) — examples and their limitations
- [Custom domains](/en/custom-domains) — sharing through your own domain
