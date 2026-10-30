# Phase 2 working files — documentation audit, August 2026

Working material from Phase 2 of the [August 2026 documentation
audit](../../planning/documentation-audit-2026-08.md). The phase shipped as
[#405](https://github.com/onetimesecret/docs.onetimesecret.com/pull/405) on 2026-08-06.

These files are archived rather than deleted because two of them are load-bearing
after the phase closed.

## Contents

| File | What it is |
|---|---|
| [`prep.md`](./prep.md) | The readiness assessment written before Phase 2 opened: verified starting state, the five-stream agent design, and the scope call. |
| [`deleted-files.md`](./deleted-files.md) | The deletion index — every one of the 263 files Phase 2 removed, grouped by family, with its merge target and a recovery command. |
| [`ledger/`](./ledger/) | Four claim → `file:line` verification ledgers, verified against `onetimesecret@aafe503`: `account-surfaces`, `auth-and-account`, `secret-lifecycle`, `vocabulary-and-orgs`. |

## Why these are kept

**The ledgers are the audit trail for 13 published end-user pages.** Each of those
pages carries a single `sourceOfTruth` line in its frontmatter. Everything behind
that line — the working, the claims that were *refuted* rather than confirmed, and
the per-topic "do not claim" lists — exists only here. A reviewer asking "where did
this sentence come from, and what did we decide not to say?" has nowhere else to
look, and an audit trail that requires knowing a commit hash to read is not an audit
trail.

The refuted rows matter as much as the verified ones. They are the record of claims
the docs *could* have made and deliberately did not — `/audit-events` as an API path,
"Security Events" as product vocabulary, a colonel bypassing every entitlement check,
a service-side passphrase recovery. Without them, a later writer re-derives the same
plausible-looking claim and ships it.

**`deleted-files.md` is the format later phases reuse.** Phase 3 splits
`self-hosting/installation` (8 locale copies) and faces the same
translated-but-orphaned problem; Phase 4 repeats it twice more. The index's shape —
family, copy count, merge target, then one line per file — is the template, and
Phase 3's prep points at it by name.

## What these are not

None of it is a source of truth. The ledgers were verified against the application
at one commit in August 2026 and go stale as the app moves. **Re-verify a row before
reusing it** rather than trusting it — the instruction every phase of the audit
inherits from Phase 1, whose own
[self-analysis](../../planning/documentation-audit-2026-08-self-analysis.md) found
that 4 of the audit's 10 headline rows overclaimed.

The billing gate applies here too. The ledgers deliberately record no plan-to-
entitlement mapping, no seat or member number, and no price, and they treat
`etc/examples/billing.example.yaml` as an example rather than as evidence. Do not
read a plan's contents out of them.

## Date archived

2026-08-09
