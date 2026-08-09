# Phase 2 verification ledger - secret lifecycle
Verified against onetimesecret@aafe503 on the Phase 2 branch.

All paths are APP-relative (`/home/user/onetimesecret`). Every "verified" row cites lines I read.

Scope note on hosted vs self-hosted: this repo contains no production config
(`etc/` holds only `defaults/` and `examples/`; there is no `etc/config.yaml` and no
`etc/billing.yaml`). Therefore every number below that comes from
`etc/defaults/config.defaults.yaml`, `lib/onetime/config.rb` DEFAULTS or `.env.reference`
is the **self-hosted shipped default**. What onetimesecret.com actually runs is
**unverifiable from this repo** — it would be settled by the production config or a live
`GET /bootstrap/me`. Behaviour that lives in a code path (not a config value) is labelled
STRUCTURAL and is safe to state as "by default" for the hosted service too.

Billing gate: no plan-tier, seat, entitlement or price claim is asserted, corrected or
restated here. Rows 21-23 record only *that* entitlement gates exist and where, never what
any tier grants.

---

## Reader-facing vocabulary (what the UI actually calls these things)

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| 1 | The thing the recipient opens is called a **secret link**; the app's own button is "Create a secret link". | verified | `locales/content/en/00-common.json:79` (`web.COMMON.button_create_secret` = "Create a secret link"), `:747` `web.LABELS.secret_ttl` = "Expires in"; `web.LABELS.secret_link` = "Secret Link" |
| 2 | The creator-facing record is called a **receipt**. `metadata` is the retired name, kept only as a backward-compatible payload alias and URL alias. | verified | model is `Onetime::Receipt` (`lib/onetime/models/receipt.rb:6`); `apps/api/v2/logic/secrets/base_secret_action.rb:59-60` emits `receipt:` and `metadata:` as the same `safe_dump`; `apps/api/v2/routes.txt:15-18` marks `/private/*` and `apps/api/v1/routes.txt` marks `/metadata/*` `deprecated=true`; page title `web.TITLES.receipt` = "Secret Receipt" (`locales/content/en/00-common.json`) |
| 3 | Destroying a secret early is called **burning** it, in both product and UI copy. | verified | `locales/content/en/00-common.json:167` `web.COMMON.burn_this_secret_hint` = "Burning a secret will delete it before it has been read (click to confirm)"; `web.COMMON.burn`, `web.STATUS.burned` |
| 4 | The recipient's action is called **reveal**; the button copy is "Click to reveal →". | verified | `locales/content/en/00-common.json:179` `web.COMMON.click_to_continue` = "Click to reveal →"; API verb is `POST /secret/:identifier/reveal` (`apps/api/v3/routes.txt:18`) |
| 5 | Creator-facing status words are: New / Previewed / Revealed / Burned / Expired. | verified | `locales/content/en/00-common.json:960,964,984` — `web.STATUS.revealed` "Revealed", `.burned` "Burned", `.expired` "Expired"; plus `web.STATUS.previewed` "Previewed" and `web.STATUS.new_description` "Secret link has been created and not yet viewed" |
| 6 | The marketing site's vocabulary matches: "receipt … tracks when the secret is viewed or expires", "Secret will be deleted after this time, even if not viewed". | verified | MKTG `src/i18n/ui/en.json:242-243`, `:207`, `:202`, `:115` |

---

## Creating a secret — form fields and their contract

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| 7 | A secret is created by one of two operations: **conceal** (you type/paste the content) and **generate** (the server mints a random password). They are separate endpoints and are stamped on the receipt as `kind`. | verified | `apps/api/v2/logic/secrets/conceal_secret.rb:21-24` sets `@kind='conceal'`; `generate_secret.rb:27-29` sets `@kind='generate'`; routes `POST /secret/conceal` / `POST /secret/generate` (`apps/api/v3/routes.txt:15-16`, guest at `:29-30`); `receipt.kind` persisted in `Receipt.spawn_pair` (`lib/onetime/models/receipt.rb:307`) |
| 8 | Conceal rejects an empty body ("You did not provide anything to share"). | verified | `apps/api/v2/logic/secrets/conceal_secret.rb:29` |
| 9 | Secret content has a server-enforced size ceiling, measured in **bytes**, not characters — so multibyte content hits the limit sooner than the character counter in the browser suggests. | verified (STRUCTURAL: byte measurement) | `lib/onetime/logic/base.rb:184-193` (`value.to_s.bytesize <= max_length`, error "Secret content must be no more than N bytes long") |
| 10 | That ceiling is 10,000 by default. | verified as SELF-HOSTED default only | `etc/defaults/config.defaults.yaml:256` (`SECRET_MAX_LENGTH \|\| 10000`); `lib/onetime/config.rb:74-76`; `.env.reference:317-322`. Hosted value unverifiable; the browser reads it from the bootstrap payload |
| 11 | Oversized content is **rejected**, not silently truncated. | verified | `lib/onetime/logic/base.rb:190-193` raises a form error (HTTP 422 via `otto_hooks.rb:60`). No creation path writes `truncated` — see "Do not claim" |
| 12 | The passphrase field's contract is presence-based: omit the key = no passphrase; send the key = the value is used as-is, including an empty string. | verified | `apps/api/v2/logic/secrets/base_secret_action.rb:212-223` |
| 13 | The recipient field takes an email address and **requires an account** — an anonymous caller who supplies one gets 401, not a validation error. | verified | `apps/api/v2/logic/secrets/base_secret_action.rb:283-303` (`raise Onetime::Unauthorized, 'An account is required to send emails.'`); mapped to 401 at `lib/onetime/application/otto_hooks.rb:97` |
| 14 | Even though the API accepts a list of recipients, **only the first address is emailed**; the rest are recorded (obscured) on the receipt and logged as a warning. | verified | `apps/api/v2/logic/secrets/base_secret_action.rb:481-485` passes `recipient.first`; `lib/onetime/models/receipt/features/deprecated_fields.rb:62-95` caps at 10, warns on >1, "Deliver to first recipient only" |
| 15 | Recipient addresses are validated for deliverability (Truemail), not just shape. | verified | `apps/api/v2/logic/secrets/base_secret_action.rb:296-302` (`valid_email?`), comment at `:279-282` |
| 16 | Recipient addresses are obscured before they are ever returned to a client. | verified | `lib/onetime/models/receipt/features/safe_dump_fields.rb:100-105` (`OT::Utils.obscure_email` at the serialization boundary) |
| 17 | The generated password's length and character sets are configurable per request, but the length ceiling is read from config only — a request cannot raise its own ceiling. | verified | `apps/api/v2/logic/secrets/generate_secret.rb:37-56` (ceiling read from `maxlen_config`, not `merged_options`; oversized `length` rejected before allocation) |
| 18 | When more than one character set is enabled, the generated password is guaranteed to contain at least one character from each, and every character comes from a CSPRNG. | verified (STRUCTURAL) | `lib/onetime/utils.rb:138-163` (`SecureRandom` throughout; per-set guarantee) |
| 19 | Generated-password defaults: 12 characters, upper+lower+digits+symbols, ambiguous characters excluded, hard ceiling 128. | verified as SELF-HOSTED defaults only | `etc/defaults/config.defaults.yaml:263,267,271-279`; `.env.reference:274-315`. Note the YAML default for `symbols` is **true**, which differs from the Ruby DEFAULTS hash (`lib/onetime/config.rb:88`, `'symbols' => false`) — the YAML wins because deep_merge only preserves DEFAULTS on `nil` (`config.rb:1173-1188`) |
| 20 | The recipient field stays available in generate-password mode. | verified | HEAD commit aafe503 "fix(workspace): keep recipient field in generate-password mode (#4010)"; `src/shared/composables/useSecretConcealer.ts:110-114` validates recipient separately in generate mode |
| 21 | Creating a secret via the API is gated by an `api_access` entitlement check, and anonymous access to each verb is separately gated by `site.interface.api.guest_routes.*`. | verified (existence of gates only; no tier claim) | `apps/api/v2/logic/secrets/base_secret_action.rb:42` `require_entitlement!('api_access')`; `conceal_secret.rb:27`, `generate_secret.rb:23`, `reveal_secret.rb:63`, `show_secret.rb:49`, `burn_secret.rb:48`, `show_receipt.rb:69` call `require_guest_route_enabled!`; toggles at `etc/defaults/config.defaults.yaml:206-215` |
| 22 | A TTL above the free ceiling raises a loud entitlement error with an upgrade path rather than being silently shortened, for authenticated callers in an org. | verified (mechanism only; ceiling value NOT asserted — billing gate) | `apps/api/v2/logic/secrets/base_secret_action.rb:120-126` |
| 23 | For **anonymous** callers the over-ceiling TTL is silently clamped, not rejected. | verified | `apps/api/v2/logic/secrets/base_secret_action.rb:132-133`, and the design note at `:168-176` |

---

## TTL / lifetime and where the option list comes from

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| 24 | The duration list is `site.secret_options.ttl_options`, sourced from the `TTL_OPTIONS` env var, which is a **space-separated string of integer seconds** — not a comma-separated list and not YAML. | verified | `etc/defaults/config.defaults.yaml:224` interpolates the raw env var into YAML; `lib/onetime/config.rb:471-479` splits on `/\s+/` when the value is a String, then maps `to_i`. (This is the Phase 1 correction; re-derived independently.) |
| 25 | Leaving `TTL_OPTIONS` unset does **not** empty the list: `nil` means "not specified" and the built-in default array survives the merge. Setting it to an empty string *would* wipe it. | verified | `lib/onetime/config.rb:1173-1188` (`deep_merge` nil-preservation, with that exact caveat spelled out in the comment) |
| 26 | The built-in default duration list is 11 entries: 60s, 5m, 30m, 1h, 4h, 12h, 1d, 3d, 7d, 14d, 30d. | verified as SELF-HOSTED default only | `lib/onetime/config.rb:46-57` |
| 27 | `.env.example` states the TTL_OPTIONS default is "300 3600 86400 604800 (5m, 1h, 1d, 7d)". That contradicts the code. | verified (the contradiction is real) | `.env.example:56-57` vs `lib/onetime/config.rb:46-57`. Do not repeat the `.env.example` figure |
| 28 | The default lifetime when the caller sends no `ttl` is 7 days. | verified as SELF-HOSTED default only | `lib/onetime/config.rb:38` (`'default_ttl' => 7.days`), applied at `apps/api/v2/logic/secrets/base_secret_action.rb:115`; env override `DEFAULT_TTL` at `etc/defaults/config.defaults.yaml:220` |
| 29 | Requested TTLs are clamped into `[ttl_options.min, max_ttl]`, and a hard 30-day global cap is applied before the per-caller ceiling. | verified (STRUCTURAL) | `apps/api/v2/logic/secrets/base_secret_action.rb:100-133` (`@ttl = 30.days if ttl >= 30.days`, then min/max clamps) |
| 30 | Anonymous (no account) secrets have their own ceiling, `site.secret_options.ttl_max_anonymous` / `TTL_MAX_ANONYMOUS`, defaulting to 7 days and bounded to at most 365 days; operators may raise or lower it. | verified as SELF-HOSTED default | `lib/onetime/models/features/with_entitlements.rb:72` (`ANONYMOUS_MAX_TTL = 604_800`), `:87-105` (`configured_anonymous_max_ttl`, clamps to `[1, MAX_TTL]`, falls back on garbage); `etc/defaults/config.defaults.yaml:238`; `.env.reference:228-244` |
| 31 | The effective anonymous ceiling is the *lowest* of the configured anonymous ceiling and the configured `ttl_options` maximum (a third, plan-derived term applies only when billing is enabled). | verified (mechanism; the plan term's value NOT asserted) | `apps/api/v2/logic/secrets/base_secret_action.rb:186-206` |
| 32 | The browser's duration dropdown is filtered client-side to the ceiling the server would enforce, so the UI never offers a duration that would be silently shortened. | verified | `src/shared/composables/usePrivacyOptions.ts:76-136` |
| 33 | The secret's expiry is enforced by the datastore's own key TTL — no application code runs when a secret expires. | verified (STRUCTURAL) | `lib/onetime/models/receipt.rb:288` (`secret.default_expiration = lifespan`); `lib/onetime/models/secret.rb:56-58` ("TTL expiry still runs no application code") |
| 34 | The receipt deliberately outlives its secret: it is given **twice** the secret's lifetime, so the creator can still open the receipt page after the secret is gone. | verified (STRUCTURAL) | `lib/onetime/models/receipt.rb:287` (`receipt.default_expiration = lifespan * 2`), `:163-167` (`receipt_ttl` = `secret_ttl * 2`, with that exact rationale) |

---

## The receipt vs the secret: two objects, two URLs, two audiences

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| 35 | Creating a secret creates **two** linked records at once: a `Secret` (holds the ciphertext) and a `Receipt` (holds no content). They are minted in one chokepoint. | verified (STRUCTURAL) | `lib/onetime/models/receipt.rb:272-340` (`Receipt.spawn_pair`); called from `apps/api/v2/logic/secrets/base_secret_action.rb:407-413` |
| 36 | The secret link is `/secret/<secret identifier>`; the receipt page is `/receipt/<receipt identifier>`; the burn action is `/receipt/<receipt identifier>/burn`. They use *different* identifiers. | verified | `apps/api/v2/logic/secrets/show_receipt.rb:360-368` (`build_path(:secret, secret_identifier)` vs `build_path(:receipt, receipt_identifier)`); frontend routes `src/apps/secret/routes/secret.ts:59` and `src/apps/secret/routes/receipt.ts:81,101` |
| 37 | The receipt payload never carries the secret's plaintext except in the one generated-password case below; it carries state, timestamps, expiry and the share URL. | verified | `lib/onetime/models/receipt/features/safe_dump_fields.rb:54-171` (field list contains no content field); `apps/api/v2/logic/secrets/show_receipt.rb:291-338` |
| 38 | Anyone holding the **secret** identifier can consume the secret. Anyone holding the **receipt** identifier can burn it. Neither is checked against an account; the URL is the credential. | verified | `apps/api/v2/logic/secrets/burn_secret.rb:17-29` (explicit "Ownership Not Required" security note), route `POST /guest/receipt/:identifier/burn auth=noauth` (`apps/api/v3/routes.txt:34`); reveal likewise `auth=noauth` on the guest route (`:32`) |
| 39 | The receipt records how many times the secret **link** was fetched, and when it was first and last fetched, even after the secret itself is gone. | verified | `lib/onetime/models/receipt/features/access_timeline.rb:70-110` (append-only sorted set), `:316-343` (`access_count`, `first_access_at`, `last_access_at`); surfaced at `apps/api/v2/logic/secrets/show_receipt.rb:100-102` |
| 40 | That access counter saturates: only the newest 100 events are retained, so the count is a floor, not an exact total, under hammering. | verified | `lib/onetime/models/receipt/features/access_timeline.rb:30` (`ACCESS_EVENTS_MAX = 100`), `:20-26` and `:88-90` (oldest evicted) |
| 41 | Opening the receipt page is a safe read: it records a one-time "receipt viewed" audit event and does **not** advance the secret's state. | verified (STRUCTURAL) | `apps/api/v2/logic/secrets/show_receipt.rb:247-256`; `lib/onetime/models/receipt/features/access_timeline.rb:287-292` (`claim_once!(:receipt_viewed_at)`) |
| 42 | Once the secret is consumed or expired, the receipt clears its stored `secret_identifier` so the dead link is not echoed back. | verified | `lib/onetime/models/receipt/features/deprecated_fields.rb:163,197,228,261` (`self.secret_identifier = ''` on revealed/orphaned/burned/expired); `apps/api/v2/logic/secrets/show_receipt.rb:129-132` |
| 43 | A receipt whose secret vanished without a lifecycle transition is marked `orphaned`; one whose secret aged out is marked `expired` — both are set lazily, on the next receipt page load. | verified | `apps/api/v2/logic/secrets/show_receipt.rb:108-127` |

---

## The generated-password preview and GENERATED_VALUE_DISPLAY_TTL

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| 44 | The receipt page shows the plaintext value **only for generated passwords**. A secret you typed is never echoed back on the receipt page. | verified (STRUCTURAL) | `apps/api/v2/logic/secrets/show_receipt.rb:159-176` — the reveal is gated on `receipt.kind.to_s == 'generate'`; the comment at `:146-149` states the reason |
| 45 | That display happens **at most once**, enforced by an atomic claim, independent of any time window — a second or concurrent load never re-reveals it. | verified (STRUCTURAL) | `apps/api/v2/logic/secrets/show_receipt.rb:170-175` (`receipt.claim_secret_value_display!` last in the `&&`); `lib/onetime/models/receipt/features/access_timeline.rb:294-312` (one-shot claim on `secret_value_shown_at`) |
| 46 | `GENERATED_VALUE_DISPLAY_TTL` governs **when** that single display may happen, not how many times. It is a window measured from receipt creation; a first visit after the window shows nothing. Setting it to `0` disables the receipt-page display entirely. | verified | `apps/api/v2/logic/secrets/show_receipt.rb:160-163` (`receipt_age = now - receipt.created`; `within_window = display_ttl.positive? && receipt_age < display_ttl`) and the comment at `:155-158`; `etc/defaults/config.defaults.yaml:257-259`; `.env.reference:324-330` |
| 47 | The default window is 60 seconds. | verified as SELF-HOSTED default only | `etc/defaults/config.defaults.yaml:259` (`ENV['GENERATED_VALUE_DISPLAY_TTL'] \|\| 60`). Hosted value unverifiable |
| 48 | The window only applies while the receipt is still in state `new`. | verified | `apps/api/v2/logic/secrets/show_receipt.rb:159` (`if receipt.state?(:new)`) |
| 49 | If the response carrying that one display is lost in flight, the value is forfeited rather than shown twice. | verified (STRUCTURAL, and deliberate) | `lib/onetime/models/receipt/features/access_timeline.rb:303-307` |
| 50 | The UI's own explanation of this is "Careful: you will only see this once." | verified | `locales/content/en/secret-manage.json:210` (`web.receipt.only_see_once`) |

---

## One-time reveal semantics

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| 51 | Loading the secret link does **not** consume the secret. Consumption requires an explicit confirm: the client must send `continue=true` on the reveal call. | verified (STRUCTURAL) | `apps/api/v2/logic/secrets/reveal_secret.rb:59,81`; `apps/api/v2/logic/secrets/show_secret.rb:45,67`; browser sends `continue: true` only from the reveal action (`src/shared/stores/secretStore.ts:170-177`) |
| 52 | Exactly one caller can ever receive the plaintext. Concurrent reveals are resolved by an atomic compare-and-set in the datastore; losers get nothing. | verified (STRUCTURAL) | `lib/onetime/models/secret/features/secret_state_management.rb:107-128` (`reveal!`), `:172-189` (`win_reveal_claim!`); `lib/onetime/models/features/state_cas.rb:48-57,85-90` (Lua CAS) |
| 53 | Decryption happens *inside* the won-claim branch, so no code path can hand back plaintext without also spending the single reveal. | verified (STRUCTURAL) | `lib/onetime/models/secret/features/secret_state_management.rb:79-89` (design note) and `:109-127` (implementation) |
| 54 | On a successful reveal the secret record is destroyed immediately, before the HTTP response is built. If the response is lost in transit, the secret is gone. | verified (STRUCTURAL, and deliberate) | `lib/onetime/models/secret/features/secret_state_management.rb:219-227` (`consume_after_reveal!` → `destroy!`); `apps/api/v2/logic/secrets/reveal_secret.rb:181-185` states the intent verbatim |
| 55 | The compare-and-set fails closed against a gone key: a destroyed or TTL-evicted secret can never be resurrected by a stale in-memory instance. | verified (STRUCTURAL) | `lib/onetime/models/features/state_cas.rb:17-25` and the Lua at `:48-57` |
| 56 | A reveal that fails because the ciphertext cannot be decrypted (server key mismatch) rolls the claim back — the secret survives and is revealable again once the key is restored. | verified (STRUCTURAL) | `lib/onetime/models/secret/features/secret_state_management.rb:91-96,112-124`; the pre-check at `apps/api/v2/logic/secrets/reveal_secret.rb:67-72` |
| 57 | Revealing also cascades the receipt to `revealed` and stamps a timestamp, so the creator can see when it happened. | verified | `lib/onetime/models/secret/features/secret_state_management.rb:219-221`; `lib/onetime/models/receipt/features/deprecated_fields.rb:153-179` |
| 58 | The creator opening their own secret link consumes it exactly like a recipient would, and the UI warns them before they do. | verified | reveal is not ownership-gated (`apps/api/v2/logic/secrets/reveal_secret.rb`, no owner check on the non-verification branch); warning copy `web.shared.you_created_this_secret` = "You created this secret. If you view it, the recipient will not be able to see it." (`locales/content/en/secret-manage.json:342`), rendered at `src/apps/secret/reveal/canonical/ShowSecret.vue:85-107` |
| 59 | The creator's own fetch of their own link is recorded distinctly, as `previewed`, rather than as a third-party access. | verified | `apps/api/v2/logic/secrets/access_telemetry.rb:38-52` |

---

## Passphrase protection

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| 60 | The passphrase is an **access-control gate, not an encryption key**. It is hashed (argon2id) and checked before decryption; it does not participate in key derivation, and the service can decrypt the ciphertext without it. | verified (STRUCTURAL — this contradicts some existing marketing phrasing; see "Do not claim") | `lib/onetime/models/receipt.rb:262-268` (explicit contract note); `lib/onetime/models/features/passphrase_hashing.rb:32-36` (argon2id) and `:48-62` (verify); `lib/onetime/models/secret.rb:109-113` — `decrypted_secret_value` ignores the passphrase argument entirely |
| 61 | A wrong passphrase does not consume the secret; it returns an error and the secret stays revealable. | verified | `apps/api/v2/logic/secrets/reveal_secret.rb:81` (`show_secret` requires `correct_passphrase`), `:212-227` (error path, no reveal) |
| 62 | The error message a recipient sees is "Incorrect passphrase". | verified | `apps/api/v2/logic/secrets/reveal_secret.rb:226`; `locales/content/en/00-common.json:71` `web.COMMON.incorrect_passphrase` = "Incorrect passphrase"; the burn path uses `web.COMMON.error_passphrase` = "Double check that passphrase" (`burn_secret.rb:139`) |
| 63 | Passphrase length is bounded, and complexity can optionally be enforced (uppercase, lowercase, number, symbol) at creation time. | verified | `apps/api/v2/logic/secrets/base_secret_action.rb:355-403` |
| 64 | Passphrase defaults: not required, minimum 4 characters, maximum 128, complexity off. | verified as SELF-HOSTED defaults only | `etc/defaults/config.defaults.yaml:242-250`; `lib/onetime/config.rb:64-69`; `.env.reference:250-272` |
| 65 | Burning a passphrase-protected secret also requires the passphrase. | verified | `apps/api/v2/logic/secrets/burn_secret.rb:64,69` (`@greenlighted = viewable && correct_passphrase && continue`); the UI shows the field at `src/apps/secret/reveal/BurnSecret.vue:108-125` |
| 66 | The passphrase is never shown, echoed or recoverable; the receipt only reports `has_passphrase`. | verified | `lib/onetime/models/receipt/features/safe_dump_fields.rb:169` (`has_passphrase` boolean only); no safe_dump field exposes the hash |

---

## Burning

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| 67 | Burning destroys the secret before anyone reads it; it is permanent and cannot be undone. | verified | `lib/onetime/models/secret/features/secret_state_management.rb:134-149` (`burned!` → `destroy!`); UI copy `web.COMMON.burn_this_secret_confirm_hint` = "Burning a secret is permanent and cannot be undone" (`locales/content/en/00-common.json`) |
| 68 | Only a secret that has not yet been revealed or burned can be burned; a double-burn is a no-op that reports failure to the caller. | verified (STRUCTURAL) | `lib/onetime/models/secret/features/secret_state_management.rb:137,142` (guard + CAS); `apps/api/v2/logic/secrets/burn_secret.rb:98,114-123` (bookkeeping gated on winning) |
| 69 | Burning must be confirmed: a `continue` flag that is not literally `true`/`"true"` will not burn. | verified | `apps/api/v2/logic/secrets/burn_secret.rb:44,66-69` |
| 70 | After a burn, the recipient sees the same "no longer available" page as for any other terminal state — they are not told it was burned. | verified | the secret record is destroyed, so `Secret.load` returns nil and the reveal/show path raises the same `MissingSecret` (`apps/api/v2/logic/secrets/show_secret.rb:51`); UI copy `locales/content/en/secret-manage.json:298` `web.receipt.burning_a_secret_permanently_deletes_it_before_a` states exactly this ("The recipient will see a message indicating the secret doesn't exist") |
| 71 | The creator, by contrast, does see "Burned" plus the burn timestamp on their receipt. | verified | `lib/onetime/models/receipt/features/safe_dump_fields.rb:151,159` (`burned`, `is_burned`); `src/apps/secret/reveal/BurnSecret.vue:50-58` (`web.secrets.deleted_on_record_burned` = "Deleted on {0}") |

---

## What the recipient sees — and the deliberate absence of an existence oracle

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| 72 | A **fresh** secret shows a confirmation step ("Click to reveal →"), not the content, on first load. | verified | `src/shared/components/base/BaseShowSecret.vue:139-156` (confirmation slot rendered while `!details.show_secret`); `apps/api/v2/logic/secrets/show_secret.rb:67` |
| 73 | A **passphrase-protected** secret shows a passphrase field at that confirmation step; the metadata GET reports `has_passphrase` without revealing anything. | verified | `apps/api/v2/logic/secrets/show_secret.rb:66,101`; `lib/onetime/models/secret/features/safe_dump_fields.rb:62` |
| 74 | **Already-viewed, burned, expired and never-existed are indistinguishable to the caller.** All four produce the identical response. | verified (STRUCTURAL) | Single enforcement line, repeated across API versions: `apps/api/v2/logic/secrets/show_secret.rb:51`, `apps/api/v2/logic/secrets/reveal_secret.rb:65`, `apps/api/v1/logic/secrets/show_secret.rb:32` — `raise OT::MissingSecret if secret.nil? \|\| !secret.viewable?`, raised with **no argument** in every case, so the four states cannot even differ in message |
| 75 | The mechanism is that all four states leave *no secret record to load*: reveal and burn both `destroy!`, expiry is a datastore key TTL, and "never existed" is trivially absent. | verified (STRUCTURAL) | `lib/onetime/models/secret/features/secret_state_management.rb:147` (burn) and `:226` (reveal) both call `destroy!`; `lib/onetime/models/receipt.rb:288` sets the key TTL; `lib/onetime/models/secret.rb:56-58` confirms expiry runs no application code |
| 76 | The `!secret.viewable?` half of that guard closes the narrow window between the compare-and-set and the destroy, where a record briefly exists in state `revealed`. | verified (STRUCTURAL) | `lib/onetime/models/secret/features/secret_state_management.rb:31-35` (`viewable?` requires state `new`/`previewed`) and `:175-188` (state flipped before `consume_after_reveal!`) |
| 77 | That response is HTTP **404**, logged at info level, with a `RecordNotFound` error type. | verified | `lib/onetime/errors.rb:93-115` (`MissingSecret < RecordNotFound`, `to_h` → `error_type: 'RecordNotFound'`); `lib/onetime/application/otto_hooks.rb:51-58` registers status 404 / log_level :info for both classes (lines 56-57) |
| 78 | The page a recipient lands on says "This secret has been viewed or expired." — one message covering every terminal case. | verified | `locales/content/en/secret-manage.json:158-161` (`web.secrets.that_information_is_no_longer_available`); rendered by `src/apps/secret/reveal/UnknownSecret.vue:45,56` |
| 79 | A genuine load/parse/network failure is deliberately rendered *differently* from that terminal page, so a transient error is never reported to a recipient as a consumed secret. | verified | `src/shared/components/base/BaseShowSecret.vue:41-48,101-116` (`isNotFound` keyed on HTTP 404 only) |
| 80 | The status endpoint (`GET /secret/:id/status`) returns `state: "unknown"` with HTTP 200 for a secret that is not there — again identical across all four terminal states. | verified | `apps/api/v2/logic/secrets/show_secret_status.rb:44-50` |
| 81 | A checker *can* still learn whether a link is currently live (200 vs 404). What it cannot learn is which of the four terminal states a dead link is in. | verified — state this precisely; the guarantee is "which terminal state", not "whether the link ever existed" | same evidence as rows 74-80 |
| 82 | Secret and receipt identifiers are 62-character base-36 strings carrying 320 bits (256-bit random + 64-bit HMAC tag), so a link is not guessable. | verified | `lib/onetime/initializers/setup_diagnostics.rb:249-282` (`IDENTIFIER_LENGTH = 62`, "320 bits: 256-bit random + 64-bit HMAC tag"); generator wired at `lib/onetime/models/secret.rb:15-16` and `lib/onetime/models/receipt.rb:14-15` |
| 83 | Identifiers are stripped from error/telemetry reporting. | verified | routes tagged `sensitive=true` (`apps/api/v3/routes.txt:12-34`) feed the generated scrub patterns — `docs/development/frontend-diagnostics.md:58-62`; backend counterpart `lib/onetime/initializers/setup_diagnostics.rb` |
| 84 | Content is encrypted at rest with keys derived from the deployment's `SECRET` via HKDF, and the ciphertext is bound to the specific secret record (AAD = class:field:identifier). | verified | `lib/onetime/initializers/configure_familia.rb:109-122` (HKDF-derived versioned keys, `SECRET_PREVIOUS` decrypt-only), `:150-175` (XChaCha20-Poly1305 / AES-256-GCM domain separation); `lib/onetime/models/receipt.rb:253-259` (AAD is exactly `Onetime::Secret:ciphertext:<objid>`) |

---

## Rate limiting on the reveal / burn path

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| 85 | Passphrase guessing is rate-limited on **all three** passphrase-accepting paths: show, reveal and burn. | verified | `apps/api/v2/logic/secrets/show_secret.rb:62`, `reveal_secret.rb:76`, `burn_secret.rb:62` (with the rationale that burn is the same oracle at `:58-61`) |
| 86 | The limiter is two-tier: a tight per-secret+client-IP tier and a looser per-secret global backstop, so one attacker cannot lock the legitimate recipient out. | verified | `lib/onetime/security/passphrase_rate_limiter.rb:7-30`, `:97-114` |
| 87 | Thresholds: 5 failures per secret+IP, 20 per secret globally; 10-minute counting window; 30-minute lockout. Exceeding it returns HTTP 429 with a retry-after. | verified (these are code constants, not config — same on hosted and self-hosted) | `lib/onetime/security/passphrase_rate_limiter.rb:50,57,60,63`; `:176-191` raises `Onetime::LimitExceeded` with `retry_after`; mapped to 429 at `lib/onetime/application/otto_hooks.rb:75` |
| 88 | A correct passphrase clears the lockout state for that secret. | verified | `apps/api/v2/logic/secrets/reveal_secret.rb:105`, `show_secret.rb:74-75`, `burn_secret.rb:86`; `passphrase_rate_limiter.rb:158-170` |
| 89 | Callers with no resolvable IP fall back to the global backstop rather than sharing one poisoned bucket. | verified | `lib/onetime/security/passphrase_rate_limiter.rb:211-221` |
| 90 | In production the per-IP tier is /24-granular because the IP is masked upstream. | verified | `lib/onetime/security/passphrase_rate_limiter.rb:28-30`; masking middleware `Otto::Security::Middleware::IPPrivacyMiddleware` at `lib/onetime/application/middleware_stack.rb:297` |
| 91 | There is **no** general per-IP or per-secret request rate limit on the reveal path for secrets *without* a passphrase. | verified (absence) | The limiter calls above are all guarded by `if secret.has_passphrase?`; the rate-limiter registry (`lib/onetime/operations/ratelimit/registry.rb:41-95`) lists feedback / passphrase / invite / login / reset_request / create_account / dns — no secret-read limiter; the Rack stack (`lib/onetime/application/middleware_stack.rb:279-417`) contains no throttle, only `Onetime::Middleware::IPBan` (`:311`, admin-driven bans) |

---

## Email notifications

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| 92 | If you supply a recipient address, the service emails that person a **link**, never the content. | verified (STRUCTURAL) | `lib/onetime/mail/views/secret_link.rb:26-48` — the template's required data is `secret_key`, `recipient`, `sender_email`, and `uri_path` is `/secret/<key>`; no content field exists |
| 93 | That email is sent asynchronously and does not block secret creation. | verified | `lib/onetime/models/receipt/features/deprecated_fields.rb:96-110` (`Jobs::Publisher.enqueue_email`, "non-blocking") |
| 94 | The email tells the recipient whether a passphrase is required, without carrying it. | verified | `lib/onetime/mail/views/secret_link.rb:64-66,73-80` (`has_passphrase` passed into the template) |
| 95 | Account holders can opt in to an email telling them when their secret was revealed; it is off unless enabled. | verified | `lib/onetime/models/customer.rb:174,241-243` (`notify_on_reveal?` is false unless the stored value is `'true'`); template `lib/onetime/mail/views/secret_revealed.rb:20-46` |
| 96 | That notification fires on the V3 reveal endpoint — which is the one the web app uses — and never for anonymous or ownerless secrets. | verified | `apps/api/v3/logic/secrets.rb:89-130` (`notify_owner_of_reveal`, guards on `owner.nil?`/`anonymous?`/empty email/`notify_on_reveal?`); frontend targets `/api/v3` and `/api/v3/guest` (`src/shared/stores/secretStore.ts:22-23,96`) |
| 97 | The notification is best-effort: a failure to send it never fails or reverses the reveal. | verified | `apps/api/v3/logic/secrets.rb:126-129` (rescue-and-log) |
| 98 | The reveal notification email names only the secret's short id and the time — not the content. | verified | `lib/onetime/mail/views/secret_revealed.rb:25-46` |
| 99 | There is an "about to expire" warning email for account holders, but it ships **disabled** and skips anonymous secrets and short-lived ones. | verified as SELF-HOSTED default (hosted state unverifiable) | `etc/defaults/config.defaults.yaml:1104-1116` (`enabled: false`, `warning_hours: 24`, `min_ttl_hours: 48`, `batch_size: 100`); `lib/onetime/jobs/scheduled/expiration_warning_job.rb:63-65,102-114`; eligibility at `lib/onetime/models/receipt.rb:232-238` |
| 100 | No email is sent when a secret is burned, when it expires without being read, or when the link is merely fetched. | verified (absence) | The only secret-lifecycle mail templates are `secret_link`, `secret_revealed`, `incoming_secret` and `expiration_warning` (`lib/onetime/mail/mailer.rb:255-258`, `lib/onetime/operations/email/preview_template.rb:24`, `lib/onetime/jobs/scheduled/expiration_warning_job.rb:131-150`). `burned!` (`secret_state_management.rb:134-149`) enqueues nothing |

---

## Do not claim

- **"Only someone with the correct passphrase can decrypt it" / "we can't access it without the passphrase."**
  The app's *own* existing UI copy says this (`locales/content/en/secret-manage.json:306`, `web.receipt.and_never_stored_in_its_original_form_this_appro`), and MKTG `src/i18n/ui/en.json:202` is softer but adjacent. The source refutes the strong reading: the passphrase is argon2id-hashed and checked as an access gate, and `Secret#decrypted_secret_value` (`lib/onetime/models/secret.rb:109-113`) ignores its passphrase argument entirely. `Receipt.spawn_pair`'s security contract (`lib/onetime/models/receipt.rb:262-268`) says so in as many words: "An access-control gate, not an encryption input… it does not participate in key derivation." Say "the passphrase controls who may open the secret", not "the passphrase is the decryption key".
- **A number taken from `.env.example` for `TTL_OPTIONS`.** `.env.example:56-57` claims the default is `300 3600 86400 604800`; the code default is the 11-entry list at `lib/onetime/config.rb:46-57`. The APP's own env sample is wrong here.
- **`generated_value_display_ttl` limits how many times the generated value can be shown.** It does not. The at-most-once property comes from `claim_secret_value_display!` (`access_timeline.rb:294-312`); the TTL only bounds *when* that single display may occur (`show_receipt.rb:155-163`).
- **The receipt page shows you your secret again.** Only for `kind == 'generate'`. A concealed (typed) secret is never redisplayed on the receipt page (`show_receipt.rb:159-176`).
- **"Secrets that are too long are truncated."** They are rejected with a form error (`lib/onetime/logic/base.rb:190-193`). The `truncated` field on `Secret` is inside the *deprecated* field group (`lib/onetime/models/secret/features/deprecated_fields.rb:20`) and no creation path sets it; the matching receipt safe_dump field is commented out (`receipt/features/safe_dump_fields.rb:167-168`). The string `web.shared.secret_was_truncated` still exists in the locale bundle (`locales/content/en/secret-manage.json:370`) but nothing in the current create path produces that condition.
- **The content limit is 10,000 characters.** It is 10,000 *bytes* by default; the character-denominated number is only the browser hint (`lib/onetime/logic/base.rb:185-190` says this explicitly).
- **Opening the secret link marks it as viewed / burns it.** A GET is a safe read as of #3633; only an explicit `continue=true` reveal or a burn advances state (`show_secret.rb:106-119`, `access_telemetry.rb:11-16`). Any older doc describing a "viewed" state reached by loading the page is describing retired behaviour.
- **A secret can be in a "previewed" state today.** No request path stamps it any more; the value survives only for pre-#3633 records and as a backward-compat term (`show_receipt.rb:187-193`, `receipt/features/safe_dump_fields.rb:128-141`). `is_previewed` is now derived from the access timeline, not from state.
- **The frontend's `useSecretLifecycle` composable describes real states.** `src/apps/secret/composables/useSecretLifecycle.ts` enumerates `burned`/`expired`/`previewed` secret states, but it is dead code — the only reference to it anywhere in `src/` is its own definition. The API never returns a `burned` or `expired` *secret* record; those states live on the receipt.
- **Any plan-tier, seat, entitlement or price statement about TTL length.** `lib/onetime/models/features/with_entitlements.rb:54` (`DEFAULT_FREE_TTL`) and `base_secret_action.rb:120-126,200-204` reference free-tier and plan limits, but `etc/billing.yaml` is absent from this repo and the free-tier value is resolved from it at runtime. Nothing here settles what any tier grants. Hard stop per the billing gate.
- **Anything about what onetimesecret.com specifically has configured.** Every `secret_options` value in this repo is a shipped default under `etc/defaults/`. There is no production config here. Describe the behaviour and say the exact window/limit is the one the app shows.
- **"Anyone who has the receipt link can see your secret."** They cannot see it; they can burn it, and (for a generated password, once, inside the window) trigger the creator-side preview. The share link and its bearer identifier are also withheld from the receipt payload entirely for incoming-form provenance (`lib/onetime/models/receipt.rb:118-128`, `safe_dump_fields.rb:76-79`).
- **"Expired secrets are cleaned up by a background job."** Expiry is a datastore key TTL that runs no application code; the nightly reconcile job exists only to correct the owner's live-secret *counter*, not to delete secrets (`lib/onetime/models/secret.rb:52-59`).
- **A caching / `Cache-Control` claim about the secret page.** `no_cache: true` appears in the receipt response *payload* (`show_receipt.rb:90,345`), but I found no middleware setting `Cache-Control: no-store` on these routes. Unverifiable here — a live response-header capture would settle it.
- **Identifier format details beyond length and entropy.** The `Familia::VerifiableIdentifier` gem is not vendored in this checkout (`gem contents familia` finds nothing), so the exact encoding and the HMAC verification-on-read posture are known only from APP's own comments (`setup_diagnostics.rb:249-282`, `configure_familia.rb:124-142`), which note verification-on-read is **not** currently enabled. Do not claim links are HMAC-verified on use.
