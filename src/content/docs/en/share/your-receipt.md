---
title: Your receipt
description: Every secret you create hands you two links — one for your recipient and one you keep — and mixing them up is the costliest mistake you can make here.
audience: end-user
pageType: concept
sourceOfTruth: onetimesecret/lib/onetime/models/receipt.rb:286-287 (a receipt is created with twice the secret's lifetime); onetimesecret/lib/onetime/initializers/setup_diagnostics.rb:249-282 (62-character identifiers); on-screen wording from onetimesecret/locales/content/en/secret-manage.json and 00-common.json
---

Creating a secret produces two records at once, not one: the **secret**, which
holds the encrypted content, and the **receipt**, which holds none of it. Each
gets its own address. One of them is for the person you are sending to. The
other is yours to keep.

They look alike, they are not interchangeable, and sending the wrong one is the
most expensive mistake available on this service.

:::note
You may see the receipt called something else. Some older on-screen copy says
*private link*, and the API still carries *metadata* as a backward-compatible
name for the same thing. **Receipt** is the current name, and `/receipt/…` the
current address.
:::

## Two links, and only one of them is for sending

|  | Secret link | Receipt |
|---|---|---|
| Address | `/secret/…` | `/receipt/…` |
| Who it is for | your recipient | you |
| What it hands whoever holds it | the content, exactly once | the secret's status — and the power to destroy it |
| Carries the content | yes | no (one exception, below) |
| Outlives the secret | no | yes |

The two identifiers are different values, and both are 62 characters long, so
you cannot tell them apart at a glance. The path is the tell: `/secret/` is the
one you send, `/receipt/` is the one you keep.

Neither link is checked against an account. Anyone holding the secret link can
consume the secret; anyone holding the receipt link can burn it. The URL *is*
the credential. Treat your receipt as private, and keep in mind that it lands in
your browser history like any other page you open.

## What happens if you send the wrong one

Say you paste the receipt link into the chat window instead of the secret link.

- **Your recipient gets nothing they can use.** The receipt has never carried
  the content of a secret you typed, so there is nothing there for them to read.
- **They can destroy it.** Burning is available to whoever holds the receipt
  address, with no sign-in and no ownership check. It is permanent.
- **If it was a generated password, they may spend your one look at it.** See
  [the next section](#seeing-a-generated-password-one-look) — the single display
  goes to whoever opens the receipt first, inside the window.

The app's own explanation of why the generated value is shown only once names
this exact scenario: so that someone who reaches the receipt page later — from
your browser history, or because you sent the receipt link by mistake — cannot
see the value.

:::caution[If you sent the receipt link to the wrong person]
Do not try to repair it by also sending the correct link. Burn the secret while
it is still unread, then create a new one and send that. A secret whose receipt
address is in someone else's hands can be destroyed by them at any moment,
which means your recipient may find nothing when they finally open it.
:::

If the receipt link simply went to the *right* person by mistake, the exposure
is smaller: send them the secret link and ask them to discard the first one.

## What your receipt tells you

Opening your receipt is safe. It does not count as a view, does not consume the
secret, and does not move it any closer to being gone. The only thing it can
spend is the single look at a generated password described below.

The receipt reports:

- **Status.** *New* — created, nothing has happened yet. *Revealed* — someone
  read it, with the time. *Burned* — you destroyed it, with the time.
  *Expired* — the lifetime ran out unread. A further status covers the rare case
  where the secret disappeared without any of those being recorded.
- **Whether the secret link has been fetched, how often, and when.** Fetching is
  not revealing — loading a secret link is a read-only step, so a mail scanner or
  chat preview can push this count above zero without anything having been
  consumed. The count is capped, so under repeated automated hits it is a floor
  rather than an exact total. Once the count is above zero, the receipt marks the
  secret *Previewed*. That word means only that someone opened the secret link.
  It is not a record of your own visit, and the same scanner can set it.
- **When you created it and when it expires.**
- **Whether a passphrase is required** — never the passphrase itself. It is not
  stored in a readable form and nobody, including Onetime Secret, can look it
  up.
- **The recipient address, obscured**, if you had the service send the email.
- **A short note**, if you are signed in. You add it from your
  [recent secrets](/en/account/dashboard-and-recent-secrets) list, not from the
  receipt, which shows it read-only. On a receipt for a secret submitted to you
  through an [incoming form](/en/custom-domains/homepage-and-incoming), the note
  came from the sender.

What it never contains is the content. Once a secret has been revealed, burned
or expired, the receipt also stops echoing the secret link back at you, so a
dead address is not left lying around.

While the secret is still live, its share link is still held on the receipt. If
you are signed in, the same secrets appear on your
[recent secrets](/en/account/dashboard-and-recent-secrets) page, where a
still-active entry offers a copy action — which hands out a live, one-view link,
so copy it deliberately. The exception is a secret submitted to you through an
[incoming form](/en/custom-domains/homepage-and-incoming): those receipts
deliberately withhold the share link.

### Almost nothing is pushed at you

The receipt is mostly something you check rather than something that notifies
you. Account holders can turn on an email that tells them when one of their
secrets was revealed; it is off unless you enable it, it names only the secret's
short id and the time, and it never carries the content or says who opened it. It
does not fire for secrets created while signed out.

Expiry is the exception. An account holder may also receive a warning email
shortly before a long-lived secret expires, and there is no account setting that
turns that one off. Nothing is emailed at the moment a secret actually expires,
when you burn one, or when the link is merely fetched.

## Seeing a generated password: one look

If you asked the service to generate a password instead of typing content
yourself, your receipt can show you that value — once. A secret you typed is
never shown back to you, on the reasoning that you already have it.

Several conditions govern that one display:

- **Once, full stop.** The display is claimed atomically the first time it
  happens. A reload, a second device or a simultaneous load shows nothing. If
  the page fails to arrive — the connection drops, the tab closes — the look is
  spent anyway. That is deliberate; the alternative is a value that can be shown
  twice.
- **Inside a short window that starts when you create the secret.** If your
  first visit to the receipt lands after the window has closed, you never see the
  value at all. The window bounds *when* the single display may happen, not how
  many times it may happen.
- **Only while the receipt is still *New*.** Once the secret has been revealed
  or burned, the receipt will not show the value.
- **Only if you did not set a passphrase.** A generated password that has a
  passphrase on it is never displayed on the receipt, on the first visit or any
  other, so you never learn the value at all — only your recipient does. If you
  need the password yourself, do not put a passphrase on a generated one.

On screen the one-look part is stated plainly: *Careful: you will only see this
once.*

In practice: open your receipt straight away, and put the password where it
actually belongs — your password manager, your configuration — before you leave
the page. If you miss the window, the password is not lost to the recipient;
their link still works. It is only lost to you.

:::note[Running your own instance?]
The length of that window is a setting, and it can be switched off entirely.
See [Configuration](/en/self-hosting/configuration) for
`generated_value_display_ttl`.
:::

## Burning a secret before anyone reads it

**Burning** destroys a secret before it has been read. You do it from your
receipt, it must be confirmed, and it is permanent — there is no undo and no
recovery.

Burning only works while the secret is still unread. Once it has been revealed
there is nothing left to destroy, and a second burn attempt simply reports that
it did not happen.

If you set a passphrase, burning asks for the passphrase too. That is worth
knowing before you rely on burning as your escape hatch: if you have lost the
passphrase, you cannot burn the secret either, and your only option is to let it
expire.

Your recipient is not told that you burned it. They get the same *This secret
has been viewed or expired* page that covers every other dead link — see
[What recipients see](/en/share/what-recipients-see). Only your receipt records
what actually happened, as *Burned*, with the time.

## How long the receipt lasts

The receipt is deliberately given **twice** the secret's own lifetime. A secret
set to last a day leaves a receipt that is still there two days later.

That gap is the whole point. It is what lets you answer the question a recipient
brings you when their link has stopped working — was it read, did you burn it,
or did it expire — long after the secret itself is gone. The fetch history
survives the secret too, so "was it opened before it expired?" is still
answerable.

When the receipt's own time runs out, its address stops working too. There is no
archive behind it and no way to extend it after the fact. If you need a durable
record that a share happened, keep it somewhere you control; inside an
organization, the [audit trail](/en/organizations/audit-trail) keeps its own
account of these events.

None of this ever brings the content back. A receipt records what happened to a
secret, not what was in it. When someone needs the information again, the answer
is always a new secret.

## Related

- [Sharing secrets](/en/share) — creating and sending a link
- [What recipients see](/en/share/what-recipients-see) — the other side of the
  same secret
- [When a secret link doesn't work](/en/share/when-a-link-doesnt-work) — what to
  tell someone whose link is dead
- [Recent secrets](/en/account/dashboard-and-recent-secrets) — the receipts for
  secrets you created recently, in one list
- [Glossary](/en/start/glossary) — receipt, burn, reveal, passphrase
- [Security best practices](/en/security/best-practices) — handing over links
  and passphrases safely
