---
title: Preferences
description: The preferences saved to your account, the choices your browser remembers, and where other settings are decided.
audience: end-user
pageType: reference
sourceOfTruth: onetimesecret/lib/onetime/models/receipt/features/access_timeline.rb:48-107 (a receipt stores access counts and times, not reader details); onetimesecret/apps/api/v2/logic/secrets/access_telemetry.rb and actor_attribution.rb (reader account and masked network details go to the organization's Secret Activity record); onetimesecret/lib/onetime/models/customer.rb:358-359 (reveal notifications are off unless switched on)
---

Two preferences are saved to your account: the language you use the service in,
and whether you are emailed when one of your secrets is revealed. A few other
choices are remembered by your browser. Account changes such as your email
address, password and sign-in methods have their own pages.

## Account preferences

| Setting | Where it is | What it changes |
|---|---|---|
| **Language** | Settings → Profile → Preferences | The language of the interface, and of the security notices the service emails you |
| **Secret Reveal Notifications** | Settings → Profile → Notifications | Whether you are emailed when someone reveals one of your secrets |

Both follow your account rather than the device. Sign in from another browser or
computer and they are already applied.

## Language

Only languages the service has been translated into are offered.

Signed in, your choice is saved to your account. Signed out, it applies to that
browser session only.

Your language also sets the language of the **security notices the service
sends you**: sign-in alerts, password-change notices, two-factor changes, and
the reveal notification below. Emails sent in response to a form you just
submitted use the language you were using at the time instead. These include
the email-change confirmation and the password-reset email. An account with no
language chosen gets the service's default.

Your language does **not** set the language of the page your recipient opens.
That page uses, in order: a language the recipient chose, the language of the
custom domain the link was shared from, the recipient's browser language, then
the default. If you use the create form's optional recipient email field, that
email is written in your current language.

Translations are contributed by volunteers, and coverage varies by language;
see [Translations](/en/translations).

:::note
On a self-hosted installation with translations switched off, there is no
language control. See [Configuration](/en/self-hosting/configuration).
:::

## Secret reveal notifications

The switch is labelled **"Receive an email when someone views your secret"**. It
is off until you turn it on.

When it is on, the notification:

- **covers** the secrets you create **while signed in**. A secret created while
  signed out is not attached to an account and cannot notify anyone;
- **goes to** the email address on your account. There is no separate
  notification address;
- **is sent** when someone reveals the secret through the website. Opening the
  link without revealing, including by a mail scanner or chat preview, does not
  send one. Reveals through the older v1 or v2 API endpoints do not send one;
- **contains** the time of the reveal and the secret's short identifier. It
  does not identify the reader or include the content.

If the email fails to send, the reveal has still happened and the secret is
gone.

The switch controls only this email. There is no digest, no per-secret
notification setting, no notification when a secret is burned, and no
notification to the recipient. Emailing a link to someone is a separate choice
on the create form.

### Where reveal details are recorded

The secret's [receipt](/en/share/your-receipt) records when the link was fetched
and whether and when the secret was revealed or burned. It does not record who
revealed it or from where.

For secrets you create while signed in, the organization's
[Secret Activity](/en/organizations/audit-trail) record can hold more: the
reader's account if they were signed in, and partially masked network details
for link fetches. Owners and admins can view it on plans that include Secret
Activity. See
[What recipients see](/en/share/what-recipients-see#what-the-sender-learns-about-you).

## Privacy

The Privacy panel has no controls. It states that the service runs no
analytics or tracking, shown as a switch that is permanently on. For the
reasoning, see [Our principles](/en/security/our-principles).

## Browser preferences

These choices are saved in the browser where you made them. A different browser,
another computer, or cleared browser data starts from the defaults.

| Choice | What it does | Scope |
|---|---|---|
| **Appearance** (light or dark) | Sets the theme. Until you choose, it follows your device's light/dark setting | That browser |
| **The expiry you last picked** | Preselects that expiry on the create form in your account. If it is no longer offered, the form uses the service's default. The homepage create form does not use it | That browser |
| **Stay on page** | Keeps you on the create form after a secret is made. Generating a password from the form in your account still opens the receipt, because the receipt is where a generated password is shown | That browser |
| **The domain you are creating under** | Chooses which of your organization's domains a new secret is shared from | The signed-in session |

## Settings decided elsewhere

| Setting | Where it is decided |
|---|---|
| Expiry options and the default expiry | The service. Your account has no expiry setting; your browser remembers your last choice |
| Requiring a passphrase | Each secret, as you create it. The service, or a [custom domain's settings](/en/custom-domains/access-and-privacy), can also require one |
| How long you stay signed in | The service's session limits. There is no limit on how many sessions you have open. See [Sessions and connected identities](/en/account/sessions-and-identities) |
| Region | The site you create the account on. See [Changing your region](/en/account/change-your-region) |
| Branding, language and passphrase rules for a custom domain | The domain's settings, which apply to everyone sharing from it. See [Custom domains](/en/custom-domains) |

An account has no display name, username or profile picture; it is identified
by its email address.

## Related account settings

- [Changing your email address](/en/account/change-your-email): confirmed by
  email, and it signs out every session.
- [Signing in](/en/account/signing-in) and
  [Two-factor authentication and passkeys](/en/account/two-factor-and-passkeys):
  how you sign in, and your second factor.
- [Sessions and connected identities](/en/account/sessions-and-identities):
  where you are signed in, and which identity providers are linked.
- [Closing your account](/en/account/close-your-account): what closing deletes
  and what it keeps.

## Related

- [Your dashboard and recent secrets](/en/account/dashboard-and-recent-secrets)
  — the receipts for secrets you created, and how long they last
- [Sharing secrets](/en/share) — the choices you make for each secret
- [Custom domain access and privacy](/en/custom-domains/access-and-privacy) —
  defaults that apply to a whole domain
- [Translations](/en/translations) — which languages exist, and helping with one
- [Glossary](/en/start/glossary) — passphrase, receipt, reveal, burn

## Questions or need support?

We're here to help.

- Email: support@onetimesecret.com
- Feedback form: https://onetimesecret.com/feedback
