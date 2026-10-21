---
title: Preferences
description: What you can actually set on your account, what each setting changes, and which things people expect to be settable but are not.
audience: end-user
pageType: reference
---

Two preferences are saved to your account: the language you read the service in,
and whether it emails you when one of your secrets is read. Everything else you
can change is remembered by the browser you changed it in, or is not a setting
at all. This page lists all three groups, including the things that turn out not
to be settings.

## Saved to your account

| Setting | Where it is | What it changes |
|---|---|---|
| **Language** | Settings → Profile → Preferences | The language of the interface, and of the security notices the service emails you |
| **Secret Reveal Notifications** | Settings → Profile → Notifications | Whether you are emailed when someone reads one of your secrets |

That is the whole list of preferences. Both follow the account rather than the
device: sign in from another browser or another computer and both are already
applied. Your email address, your password and second factor, and your connected
identities are also held on your account, but they are credentials rather than
preferences and are covered under [Settings that live somewhere
else](#settings-that-live-somewhere-else).

## Language

Only the languages the service has actually been translated into are offered,
and one it does not have is refused rather than quietly accepted.

Signed in, your choice is written to your account and is what the service uses
from then on, everywhere. Signed out, the choice belongs to that browser session
and is not attached to any account, so it lasts as long as the session does.

Your language also sets the language of the **security notices the service sends
you** — sign-in alerts, the notice that your password changed, two-factor
changes, and the reveal notification below. Emails triggered by a form you have
just submitted go out in the language you were using when you submitted it
instead: confirming an email-address change, and the password-reset email you
asked for, both follow the request rather than the account. An account with no
language chosen gets the service's default.

It does **not** set the language of the page your recipient opens. Their page
picks its own: a language they chose explicitly, then the brand language of the
custom domain the link was shared from, then their browser's language, then the
default. Choosing German for yourself does not send anyone a German page. If you
use the create form's optional recipient field, though, the email carrying that
link is written in the language you are reading the service in, not theirs.

Translations are contributed by volunteers, and coverage varies by language —
see [Translations](/en/translations).

:::note
On a self-hosted install where translations are switched off, there is no
language control at all. See [Configuration](/en/self-hosting/configuration).
:::

## Secret reveal notifications

One switch — **"Receive an email when someone views your secret"** — and it is
off unless you turn it on.

When it is on, the notification:

- **covers** the secrets you create **while signed in** — a secret created
  signed out has no account attached and can never notify anyone;
- **goes to** the email address on your account, and nowhere else; there is no
  separate notification address;
- **fires** when someone reveals the secret through the site, which is what
  a recipient opening your link does. It does not fire when the link is merely
  fetched, so a mail scanner or a chat preview does not trigger one. A reveal
  performed through the older v1 or v2 API endpoints does not notify you;
- **contains** the time of the read and the secret's short identifier, and
  nothing else — it does not name the reader, and it does not carry the content,
  which cannot be retrieved.

If the email fails to send, the read still happened and the secret is still
gone. Sending the notification is not part of the reveal and cannot reverse it.

The switch controls that one email and nothing else. There is no digest or
summary, no per-secret version of it, no notification when a secret is burned,
and no reveal notification is ever sent to the recipient. Emailing the link
itself to someone is a separate, per-secret choice on the create form, not a
notification setting.

The email is deliberately thin. The read itself is recorded, though: each access
is written to the secret's receipt along with a partial IP address and a partial
browser identifier, and a reader who was signed in is recorded by account. To
find out what happened to a particular secret, open its
[receipt](/en/share/your-receipt) or your
[recent secrets](/en/account/dashboard-and-recent-secrets).

## Privacy settings

The Privacy panel has nothing on it to change. It states that the service runs
no analytics and no tracking — "This isn't a setting because there's nothing to
turn on or off" — and shows that as a switch which is permanently on and cannot
be moved. So there is no opt-out here to find, because there is no control here
at all. For the stance behind that, see
[Our principles](/en/security/our-principles).

## Remembered by your browser, not your account

These are real choices that stick, but they stick to the browser you made them
in. A new browser, a different computer, or a cleared browser starts from the
defaults again.

| Choice | What it does | Scope |
|---|---|---|
| **Appearance** (light or dark) | Sets the theme. Until you choose, it follows your device's own light/dark setting | The browser you set it in. It is not saved to your account, so set it again on each one |
| **The expiry you last picked** | Pre-selects that expiry on the create form in your account next time. If it is no longer one of the offered options, the form falls back to the service's default. The homepage create form does not use it | The browser you set it in |
| **Stay on page** | Keeps you on the create form after a secret is made, so you can make another without navigating. When you generate a password from the form in your account, the app takes you to the receipt anyway, because that is the only place a generated password is shown | The browser you set it in |
| **The domain you are creating under** | Chooses which of your organization's domains a new secret is shared from | The signed-in session |

## What is not settable

These come up often. None of them exists.

| People look for | What is true instead |
|---|---|
| A default expiry for my account | The expiry choices, and which one is preselected, come from the service. Your account has no expiry setting — only the per-browser memory above |
| A default passphrase, or "always require a passphrase on my secrets" | A passphrase is decided per secret, as you create it. A requirement can be imposed by the service, or on links shared from a custom domain by [that domain's settings](/en/custom-domains/access-and-privacy) — never by your account |
| How long my sign-in lasts, or a limit on simultaneous sign-ins | Both windows are fixed and neither is per-account; nothing caps how many sessions are open. See [Sessions and connected identities](/en/account/sessions-and-identities) |
| A display name, username or profile picture | An account has none. It is identified by its email address |
| A setting to move my account to another region | A region is a separate service, not a preference. See [Changing your region](/en/account/change-your-region) |
| Turning analytics off | See [Privacy settings](#privacy-settings) above |

## Settings that live somewhere else

Several things people file under "preferences" are account changes with
consequences of their own, and each has its own page:

- [Changing your email address](/en/account/change-your-email) — confirmed by
  email, and it signs out every session.
- [Signing in](/en/account/signing-in) and
  [Two-factor authentication and passkeys](/en/account/two-factor-and-passkeys)
  — how you get in, and the second factor.
- [Sessions and connected identities](/en/account/sessions-and-identities) —
  what is signed in right now, and which identity providers are linked.
- [Closing your account](/en/account/close-your-account) — what closing deletes
  and what it does not.

Your account's language and notification switch are yours alone, and changing
either affects nobody else. Settings that apply to everybody sharing a custom
domain — its branding, the language it serves, whether its links require a
passphrase — belong to the domain rather than to any one account, and are
covered under [Custom domains](/en/custom-domains).

## Related

- [Your dashboard and recent secrets](/en/account/dashboard-and-recent-secrets)
  — what the service keeps a record of, and for how long
- [Sharing secrets](/en/share) — the choices you make per secret, which is where
  most of the "settings" people look for actually live
- [Custom domain access and privacy](/en/custom-domains/access-and-privacy) —
  defaults that apply to a whole domain
- [Translations](/en/translations) — which languages exist, and helping with one
- [Glossary](/en/start/glossary) — passphrase, receipt, reveal, burn

## Questions or need support?

We're here to help.

- Email: support@onetimesecret.com
- Feedback form: https://onetimesecret.com/feedback
