# Documentation audit — self-analysis of the Phase 1 execution

**What this is:** an assessment of [`documentation-audit-2026-08.md`](./documentation-audit-2026-08.md)
(merged as #390) by the Claude session (Claude Fable 5, `claude-fable-5`) that executed its Phase 1 as
PRs #391–#394 on 2026-08-04. Every
headline claim was re-verified against app source (the `onetimesecret` repo) before any published page
was edited; this document records how the audit held up under that verification. "My checker" below
refers to `bin/check-nav.mjs` / `bin/check-orphans.mjs`, added in #394.

---

The audit is genuinely good work — better than most documentation audits I've seen, because it ranked
wrong statements above missing coverage and included its own adversarial pass (Appendix A) rather than
hiding refuted claims. That self-correction instinct is rare and worth keeping as a pattern.

But the exercise confirmed something important: even a carefully adversarially-checked audit
overclaimed in 4 of its 10 headline rows, always in the same direction — toward more alarm than the
source justifies. The sync-auth-accounts row is the clearest case: "every pre-existing user locked out
after upgrade" is a dramatic, actionable-sounding consequence that's simply false for default-mode
installs. If we'd shipped fixes straight from the report, we'd have replaced ~25 wrong statements with
several new ones (breaking the v0.24 upgrade guide's tag-era commands, misframing an auth-mode step as
an upgrade step, applying an XFF "fix" that breaks depth-mode deployments). Verify-before-edit wasn't
overhead; it was the difference between fixing the docs and rotating the errors.

Three takeaways I'd act on:

1. The report is a planning document, not a source of truth. It's fine to keep on develop, but anyone
   executing Phases 2–4 from it must re-verify against app source per claim, exactly as Phase 1 did.
   The unverified claims (Caddy on-demand TLS being fully broken, the DLQ silently discarding
   messages) are the kind that most need checking before they drive product-defect decisions.
2. The structural diagnosis is right and matters more than the individual errors. Hand-copied config
   references drift; navigation encoding billing tiers is fragile; nothing checked for dead sidebar
   links. The generated-reference plan and the drift checks address causes, not symptoms. Decision 7
   (who owns the app-repo generator) really is the highest-risk dependency — without it Phase 4
   recreates the exact problem being fixed.
3. The convergence was the strongest validation signal. The auditor's post-merge correction of the
   `_index.md` defect independently matched my checker's output; the 8-orphan count reproduced
   exactly. Where two independent methods agree, confidence is earned; where the audit stood alone,
   that's where the errors were.

Overall: solid audit, correct priorities, ~85% accurate on specifics — and the remaining 15% is
precisely why the PR pipeline included a verification stage. The system worked.

---

## Appendix A — the four headline rows that needed correction

Finding 1 has ten rows; six survived verification untouched (`TTL_OPTIONS`, `CSP_ENABLED`, Sentry
defaults, `:colonels:` removal, the stale audit-log page, and — from Finding 2 — the missing TXT
record). The four that didn't, all overclaims:

| Audit's claim | Verified reality | Shipped fix |
|---|---|---|
| `install.sh` / `rake ots:init` do not exist (invoked four times in the docs) | True at HEAD (removed 2026-07-13) — but the v0.24 tags ship `install.sh` and have no `bin/setup`, so the v0.24 upgrade guide's checked-out-tag steps must keep it | #391 keeps `./install.sh` there, with a note that v0.26+ replaces it with `bin/setup` |
| `bin/ots doctor`, `bin/ots customer create\|promote` are not registered commands | `customer create` works — `customer` is a registered alias of `customers`. True for top-level `doctor` and for `customer promote` (real form: `customers role promote`) | #391 prints the canonical plural forms |
| `sync-auth-accounts --run` is required on the v0.24→v0.25 upgrade; "every pre-existing user locked out" | It is the simple→full auth-mode *switch* step (shipped v0.24.0-rc0). The default mode is simple, and passwords upgrade bcrypt→argon2id transparently on next login — no lockout for default-mode upgrades | #391 reframes the section as "full mode only": preview, then `--run` |
| nginx's `$proxy_add_x_forwarded_for` append makes resolved client IPs spoofable | Conditional: spoofable only with `TRUSTED_PROXY_ENABLED=true` (default false) in filter mode. In depth mode the append is *required*, and the overwrite silently breaks resolution | #391 overwrites with `$remote_addr` and adds a filter-vs-depth callout; the Caddyfile gains `header_up X-Forwarded-For {client_ip}` |

One miscount below headline level: "three removed `UI_HOMEPAGE_*` vars" — two were removed
(`…TRUSTED_PROXY_DEPTH`, `…TRUSTED_IP_HEADER`); the third listed in the docs (`…DEFAULT_MODE`) never
existed in the app.

## Appendix B — errata still standing in the audit report

1. Translation math: "40 end-user pages … 34% reduction" — the proposed tree sums to 44 end-user
   pages (1 Home + 5 Start here + 30 Using + 8 Trust & security), i.e. 704 obligations against
   today's 976, a ~28% reduction.
2. Finding 2's zero-hit grep list still includes `TRUSTED_PROXY`, a claim the report's own Appendix A
   says was "invalidated outright" by the configuration generator.

Not an erratum: 305 features catalogued vs 183 + 121 = 304 gap topics is internally consistent —
exactly one catalogued feature is adequately documented.

## Appendix C — audit claims Phase 1 never verified

Verification covered only what Phase 1 touched. Still unverified, and load-bearing for Decisions 2–3:
Caddy on-demand TLS never issuing certificates (`is_resolving: nil`), the DLQ consumer silently
discarding secret links and expiration warnings, `JOBS_SCHEDULER_ENABLED` / `JOBS_FALLBACK_SYNC` being
read by no code, the billing-catalog mismatch behind `compare-plans.md`, the translation-parity counts,
and the 304-topic inventory totals. Re-verify each against app source before acting on it.
