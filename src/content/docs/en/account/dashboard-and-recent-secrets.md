---
title: Your dashboard and recent secrets
description: The recent-secrets list is a list of receipts rather than of secrets — what each entry holds, what you can do from it, and when entries stop appearing.
audience: end-user
pageType: reference
sourceOfTruth: "onetimesecret/apps/api/v2/logic/secrets/list_receipts.rb:32-34 (the list covers the last 30 days; hard-coded, not configurable); onetimesecret/lib/onetime/models/receipt.rb:286-288 (a receipt is created with twice the secret's lifetime); onetimesecret/lib/onetime/models/receipt.rb:38 and :304 (the entry's lifetime figure is the receipt's stored `secret_ttl`, written once at creation as the chosen lifespan and never decremented; serialized verbatim at onetimesecret/lib/onetime/models/receipt/features/safe_dump_fields.rb:90); onetimesecret/apps/api/v2/logic/secrets/list_receipts.rb:94 with safe_dump_fields.rb:162-166 (Received / Not Received partitions on `is_destroyed` = revealed, received, burned, expired or orphaned); onetimesecret/apps/api/v2/logic/secrets/show_receipt.rb:114,118 (the only non-spec callers of `expired!` and `orphaned!` — opening that one receipt is what records either state); onetimesecret/lib/onetime/models/receipt.rb:93-101,124-127 (`shows_share_link?` withholds the bearer key for `source: 'incoming'`); onetimesecret/src/apps/secret/components/SecretLinksTableRowConsole.vue:354 (the dashboard memo box takes 100 characters; the server itself accepts up to 500, onetimesecret/apps/api/v2/logic/secrets/update_receipt.rb:16); onetimesecret/src/apps/secret/components/SecretReceiptTableItem.vue:316-332 (the Recent Secrets page renders the memo read-only) and :387-400 (its burn control routes to the receipt's burn page); onetimesecret/apps/api/v2/logic/secrets/burn_secret.rb:62-69 (burning is gated on confirmation and, where set, the passphrase); onetimesecret/src/shared/stores/localReceiptStore.ts:51 (signed-out list holds at most 25 entries) and onetimesecret/src/apps/secret/components/RecentSecretsTable.vue:156-177 (the signed-out list can be dismissed); status wording from onetimesecret/locales/content/en/00-common.json (`web.STATUS.*`)"
---

Where your account has the recent-secrets list, it appears in two places: on
your dashboard, which also carries the form you create secrets with, and on a
page of its own called **Recent Secrets**. Both are drawn from the same records,
but they are not the same screen and they do not offer the same controls. Where
that matters, this page says which is which.

## It lists receipts, not secrets

Every entry is a [receipt](/en/share/your-receipt) — the record of a secret, not
the secret itself. The list holds no content and cannot return any. Nothing in
either list will show you what you sent.

That matters most in the moment you are likeliest to come looking. If you have
lost the content — you did not save the password you pasted, you closed the tab
too soon — the list will not give it back. The answer is usually a new secret,
made from whatever the original source was.

There is one exception, and it lives on the receipt rather than in the list. If
the secret was a **generated password** and its receipt has not been opened yet,
opening the receipt can still show you that password — once, and only inside a
short window that starts when you create the secret. The conditions are exact
and worth reading before you rely on them: see
[Seeing a generated password: one look](/en/share/your-receipt#seeing-a-generated-password-one-look).
Content you typed yourself is never shown back to you.

:::caution
While a secret is unread the entry can also hand back its **share link**, and
that is easy to mistake for recovery. It is the same one-view link you sent, not
a fresh one and not the content. Anyone you give it to can read the secret,
once. Copy it deliberately.

Secrets submitted through an
[incoming form](/en/custom-domains/homepage-and-incoming) are the exception in
the other direction: the service withholds their share link by design, so no
usable link comes back from those entries even while the secret is unread.
:::

## What appears in the list

| The secret | In the list? |
|---|---|
| Secrets you created **while signed in** | Listed |
| Secrets you created **signed out** | Never listed — they are not attached to your account at all |
| Secrets created in the **last 30 days** | Listed, if the entry still exists |
| Anything older than 30 days | Not listed, and not reachable by scrolling |

The thirty-day figure is a fixed ceiling on the query, not a promise that
entries last that long — most stop appearing well before it, for the reason in
[When entries disappear](#when-entries-disappear). There is no archive behind
the list, no pagination, and no search.

The **Recent Secrets** page groups entries under *Not Received* and *Received*.
Read *Received* as **finished**, not as "someone got it": an entry moves into
that group once the service has recorded that its secret is finished — read,
burned or expired, or gone with no recorded reason at all. The status on the
entry says which.

The recording is what moves it. A secret whose lifetime has run out but whose
receipt nobody has opened has not been recorded as expired yet, so it stays
under *Not Received* and can still be shown as *New* or *Previewed*.

## Statuses

| Status | What it means |
|---|---|
| **New** | Created. The share link has not been fetched. |
| **Previewed** | The share link has been fetched at least once, but nothing has been read. A mail scanner or a chat preview opening the link is enough to reach this. |
| **Revealed** | Someone completed a read. The secret is gone. |
| **Burned** | Destroyed before it was read. |
| **Expired** | The lifetime ran out with nobody reading it. This is recorded when the receipt is opened after the lifetime is up, not the instant it runs out. |
| **Orphaned** | The secret is gone and none of the outcomes above was recorded for it. You will see this on the receipt itself; in the list these entries sit with the finished ones. |

Treat the status as the last outcome the service recorded for that secret rather
than as a live reading of it. A finished secret shows how it finished, but the
two surfaces do not always word the same finished secret identically — the
receipt is the more precise of the two.

## What each entry shows

| What you see | What it is |
|---|---|
| Status | The last outcome recorded for that secret |
| When you created it | Relative to now — "3 hours ago" |
| Lifetime | How long the secret was set to last, fixed when you created it |
| Passphrase | Whether one is required. Never the passphrase itself, which is not stored in a readable form |
| Memo | A short note you added, if any |
| Sharing domain | Shown when the secret was shared from a [custom domain](/en/custom-domains) rather than the site you are on |

The lifetime is not a countdown. It is the figure you chose at creation,
recorded once and never revised, so a seven-day secret reads as seven days on
its last day as well as its first. Nothing in the list tells you how much time a
secret has left.

## What you can do from an entry

| Action | Available on |
|---|---|
| **Copy** the share link to your clipboard | Entries that are still *New* or *Previewed*, and that have a share link to give |
| **Open** the share link in a new tab | The same entries |
| **Open the receipt** for that secret | Every entry, including finished ones |
| **Burn** the secret | Entries that are still *New* or *Previewed*, from the **Recent Secrets** page. The dashboard list does not offer it — open the receipt instead |
| **Add or edit a memo** | Every entry, from the dashboard list; the box there takes up to 100 characters and saves to the receipt. The **Recent Secrets** page shows the memo but will not let you change it |

Once a secret has been revealed, burned or expired there is no link left to copy
or open and nothing left to burn, so those actions are not offered on finished
entries.

Opening the receipt is the route to everything else the secret can still do.

:::note
Burning from the list does not destroy anything on the spot. It takes you to
that secret's own [receipt](/en/share/your-receipt), to a page that asks you to
confirm and — if you set one — requires the passphrase before the secret is
destroyed.
:::

There is no way to delete an entry, hide one, or clear the signed-in list.
Entries leave it on their own schedule and no sooner.

## When entries disappear

An entry lives exactly as long as its receipt does, and **a receipt is given
twice the lifetime of the secret it records**. A secret set to last a day leaves
an entry that is still there two days later; a secret set to last an hour leaves
one for two hours.

This is why thirty days is a ceiling rather than an expectation. For most
secrets the receipt runs out long before the thirty-day query window is anywhere
near it, and the entry simply stops being returned. Nothing announces this and
nothing is archived — the entry is there, and then it is not.

The gap between the two is deliberate: it is what lets you answer "was it read,
or did it expire?" after the secret itself is gone. It is not storage. Once the
receipt's own time is up, the entry and its receipt page both stop working, and
there is no way to extend either after the fact.

If you need a durable record that a share happened, keep it somewhere you
control. Inside an organization, the
[audit trail](/en/organizations/audit-trail) keeps its own account of these
events.

## The list refreshes itself

The dashboard list refreshes when you come back to the tab, and again as soon as
you create a secret. The **Recent Secrets** page refreshes itself periodically
while it is open and carries a refresh control you can press. Neither is a live
feed — if a status looks stale, reload the page.

## Signed out, the list is a different thing

If you are not signed in, you still see recent links, but they are held in your
browser rather than on the server. That list:

- lives only in the current browser tab, and is gone when you close it;
- holds at most **25** entries, dropping the oldest;
- drops entries whose secret lifetime has run out;
- can be dismissed outright from the list itself, which discards it immediately
  with no copy kept anywhere;
- is wiped the moment you sign in or sign out.

Once that list is gone there is no copy of it anywhere, and none of it ever
reaches an account. A secret created signed out is never added to an account's
list, not even if you sign in a minute later. If you want your secrets listed,
sign in before you create them.

## Related

- [Your receipt](/en/share/your-receipt) — what a single receipt tells you, and
  burning a secret before it is read
- [Sharing secrets](/en/share) — creating and sending a link
- [When a secret link doesn't work](/en/share/when-a-link-doesnt-work) — what to
  tell someone whose link is dead
- [Sessions and connected identities](/en/account/sessions-and-identities) —
  what is signed in right now
- [Glossary](/en/start/glossary) — receipt, burn, reveal, passphrase

## Questions or need support?

We're here to help.

- Email: support@onetimesecret.com
- Feedback form: https://onetimesecret.com/feedback
