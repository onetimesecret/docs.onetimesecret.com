---
title: Your dashboard and recent secrets
description: Where to find the receipts for secrets you created while signed in, what you can do from each entry, and when entries leave the list.
audience: end-user
pageType: reference
sourceOfTruth: "onetimesecret/apps/api/v2/logic/secrets/list_receipts.rb:32-34 (the list covers the last 30 days; hard-coded, not configurable); onetimesecret/lib/onetime/models/receipt.rb:286-288 (a receipt is created with twice the secret's lifetime); onetimesecret/lib/onetime/models/receipt.rb:38 and :304 (the entry's lifetime figure is the receipt's stored `secret_ttl`, written once at creation as the chosen lifespan and never decremented; serialized verbatim at onetimesecret/lib/onetime/models/receipt/features/safe_dump_fields.rb:90); onetimesecret/apps/api/v2/logic/secrets/list_receipts.rb:94 with safe_dump_fields.rb:162-166 (Received / Not Received partitions on `is_destroyed` = revealed, received, burned, expired or orphaned); onetimesecret/apps/api/v2/logic/secrets/show_receipt.rb:114,118 (the only non-spec callers of `expired!` and `orphaned!` — opening that one receipt is what records either state); onetimesecret/lib/onetime/models/receipt.rb:93-101,124-127 (`shows_share_link?` withholds the bearer key for `source: 'incoming'`); onetimesecret/src/apps/secret/components/SecretLinksTableRowConsole.vue:354 (the dashboard memo box takes 100 characters; the server itself accepts up to 500, onetimesecret/apps/api/v2/logic/secrets/update_receipt.rb:16); onetimesecret/src/apps/secret/components/SecretReceiptTableItem.vue:316-332 (the Recent Secrets page renders the memo read-only) and :387-400 (its burn control routes to the receipt's burn page); onetimesecret/apps/api/v2/logic/secrets/burn_secret.rb:62-69 (burning is gated on confirmation and, where set, the passphrase); onetimesecret/src/shared/stores/localReceiptStore.ts:51 (signed-out list holds at most 25 entries) and onetimesecret/src/apps/secret/components/RecentSecretsTable.vue:156-177 (the signed-out list can be dismissed); status wording from onetimesecret/locales/content/en/00-common.json (`web.STATUS.*`)"
---

Your dashboard lists the secrets you created while signed in during the last 30
days, below the form you create secrets with. The **Recent Secrets** page lists
the same entries with a slightly different set of controls.

Each entry is the [receipt](/en/share/your-receipt) for one secret. It shows the
secret's status and settings, and its share link while the secret is unread. It
does not contain the secret's content.

## What you can do from an entry

| Action | Dashboard | Recent Secrets page |
|---|---|---|
| **Copy** the share link | While the secret is *New* or *Previewed* | While the secret is *New* or *Previewed* |
| **Open** the share link in a new tab | While the secret is *New* or *Previewed* | While the secret is *New* or *Previewed* |
| **Open the receipt** | Every entry | Every entry |
| **Burn** the secret | Not offered; open the receipt instead | While the secret is *New* or *Previewed* |
| **Add or edit a memo** | Every entry, up to 100 characters | Shown, but not editable |

The share link is the same single-use link you sent. Anyone you give it to can
reveal the secret once. Secrets submitted through an
[incoming form](/en/custom-domains/homepage-and-incoming) have no share link to
copy or open.

**Burn** opens the secret's receipt at a confirmation page. The secret is
destroyed after you confirm, and after you enter the passphrase if one was set.
See [Your receipt](/en/share/your-receipt).

Once a secret has been revealed, burned or expired, only **Open the receipt** and
the memo remain. You cannot delete, hide or clear entries; they leave the list
as described in [When entries disappear](#when-entries-disappear).

## Secret content is not shown

Neither list stores or displays what you sent, so neither can restore content
you did not save. To share the same information again, create a new secret from
the original source.

The receipt can show an unread **generated password** once, within a short
window after you create it. See
[Seeing a generated password: one look](/en/share/your-receipt#seeing-a-generated-password-one-look)
for the conditions. Content you entered yourself is not shown again.

## What appears in the list

| The secret | In the list? |
|---|---|
| Created **while signed in**, in the last 30 days | Yes, until its receipt expires |
| Created **while signed out** | No. It is not attached to your account |
| Created more than 30 days ago | No |

There is no archive, pagination or search for older entries.

The **Recent Secrets** page groups entries under *Not Received* and *Received*.
*Received* means the service has recorded that the secret is finished: revealed,
burned, expired, or gone with no recorded outcome. It does not necessarily mean
someone read the secret. The status on each entry gives the outcome.

A secret moves to *Received* when its outcome is recorded. If its lifetime has
run out but nobody has opened its receipt, the expiry has not been recorded yet,
so the entry stays under *Not Received* and can still show *New* or *Previewed*.

## Statuses

| Status | What it means |
|---|---|
| **New** | Created. The share link has not been fetched. |
| **Previewed** | The share link has been fetched at least once, but nothing has been read. A mail scanner or a chat preview opening the link is enough to reach this. |
| **Revealed** | Someone completed a read. The secret is gone. |
| **Burned** | Destroyed before it was read. |
| **Expired** | The lifetime ran out with nobody reading it. This is recorded when the receipt is opened after the lifetime is up, not the instant it runs out. |
| **Orphaned** | The secret is gone and none of the outcomes above was recorded for it. This status appears on the receipt; in the list, these entries appear under *Received*. |

The status is the last outcome the service recorded for that secret. The list
and the receipt sometimes word the same finished secret differently; the
receipt is the more precise of the two.

## What each entry shows

| What you see | What it is |
|---|---|
| Status | The last outcome recorded for that secret |
| When you created it | Relative to now, for example "3 hours ago" |
| Lifetime | How long the secret was set to last, fixed when you created it |
| Passphrase | Whether one is required. Never the passphrase itself, which is not stored in a readable form |
| Memo | A short note you added, if any |
| Sharing domain | Shown when the secret was shared from a [custom domain](/en/custom-domains) rather than the site you are on |

The lifetime is the figure you chose at creation, not a countdown. A seven-day
secret shows seven days on its last day as well as its first. The list does not
show how much time a secret has left.

## When entries disappear

An entry lasts as long as its receipt, and **a receipt lasts twice the lifetime
of its secret**. A secret set to last one day leaves an entry for two days; a
secret set to last one hour leaves an entry for two hours. Because the list also
stops at 30 days, an entry leaves at whichever comes first.

The extra time lets you check whether a secret was read or expired after the
secret itself is gone. When the receipt expires, the entry and its receipt page
are removed without notice, and neither can be extended or restored.

To keep a lasting record that you shared something, save it somewhere you
control. In an organization, owners and admins on plans that include it can also
use [Secret Activity](/en/organizations/audit-trail).

## Refreshing the list

The dashboard list refreshes when you return to the tab and after you create a
secret. The **Recent Secrets** page refreshes periodically while it is open and
has a refresh control. Neither updates instantly; if a status looks out of date,
reload the page.

## Recent links when signed out

If you are not signed in, you still see the links you created recently, but the
list is kept in your browser rather than on the server. That list:

- lives only in the current browser tab, and is gone when you close it;
- keeps at most **25** entries, dropping the oldest;
- drops entries whose secret lifetime has run out;
- can be dismissed from the list itself, which discards it immediately;
- is cleared when you sign in or sign out.

No copy of this list is kept anywhere, and none of it is added to an account,
even if you sign in a minute later. To have your secrets listed, sign in before
you create them.

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
