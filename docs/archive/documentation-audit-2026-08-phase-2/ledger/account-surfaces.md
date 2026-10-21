# Phase 2 verification ledger - account-surfaces

Verified against onetimesecret@aafe503 on the Phase 2 branch.

Scope: the signed-in dashboard and the "recent secrets" list; active sessions; connected SSO
identities; user preferences (locale, theme, TTL, passphrase, notifications, privacy); and
regions / jurisdictions.

**Reading this table.** All paths are APP-relative (`/home/user/onetimesecret`) unless prefixed
`MKTG` (`/home/user/onetimesecret.com`). Four structural caveats apply to every row:

1. **Two auth modes.** Sessions and connected identities live in the Rodauth app
   (`apps/web/auth/`), which only runs when `AUTHENTICATION_MODE=full`. The settings nav gates
   the whole Security section on `isFullAuthMode` (`src/apps/workspace/config/settings-navigation.ts:151`).
   See the `auth-and-account` ledger rows 2-3 for the mode question itself; this ledger does not
   re-derive it.
2. **The Rodauth gem is NOT vendored** in this checkout, and neither is Familia. Behaviour that
   lives inside either gem is marked `unverifiable` even where an APP comment asserts it.
3. **Two different "recent secrets" surfaces exist** and they are NOT the same component. `/dashboard`
   renders `RecentSecretsTable`; `/recent` renders `SecretReceiptTable`. Rows say which.
4. **Billing gate.** Two receipt endpoints call `require_entitlement!('api_access')`. This ledger
   records that the code gate exists and deliberately does **not** establish which accounts hold
   that entitlement — `etc/billing.yaml` was not supplied. Do not write a plan-tier sentence from
   these rows.

---

## Dashboard: which surface is which

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| 1 | `/dashboard` is the signed-in home: a secret-creation form with a privacy-options bar above it, and a list of recently created secrets below it. | verified | route `src/apps/workspace/routes/dashboard.ts:20-40` → `DashboardMain.vue` → `DashboardIndex.vue:55-78` |
| 2 | There is a second, separate page at `/recent` titled "Recent Secrets" that lists receipts split into "Not Received" and "Received". | verified | route `src/apps/workspace/routes/dashboard.ts:41-60`; `src/apps/workspace/dashboard/DashboardRecent.vue:119-124`; section headings `src/apps/secret/components/SecretReceiptTable.vue:52,88-92` |
| 3 | The `/recent` page splits entries by whether the secret is still outstanding: the server partitions on `is_destroyed`, so "Received" actually means revealed **or** burned **or** expired **or** orphaned. | verified | `apps/api/v2/logic/secrets/list_receipts.rb:94`; `is_destroyed` definition `lib/onetime/models/receipt/features/safe_dump_fields.rb:162` |
| 4 | `DashboardBasic.vue` / `DashboardEmpty.vue` are what a free-tier or team-less user sees. | refuted | Neither is referenced by any route (`src/apps/workspace/routes/dashboard.ts` imports only `DashboardMain` and `DashboardRecent`); both gate their table on `cust.feature_flags.beta` (`DashboardBasic.vue:17,35`, `DashboardEmpty.vue:21,80`). They are unreachable today. |

## The recent-secrets list: what it lists and for how long

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| 5 | For a signed-in user the list comes from the server, not the browser: `GET /api/v3/receipt/recent`. | verified | `apps/api/v3/routes.txt:11`; `src/shared/stores/receiptListStore.ts:85` |
| 6 | The list covers secrets you created in the **last 30 days**. Older entries are not returned even if the underlying record still exists. | verified (hard-coded, not configurable) | `apps/api/v2/logic/secrets/list_receipts.rb:32-34` (`@since = (Familia.now - 30.days).to_i`), applied at `:123` |
| 7 | An entry disappears from the list once its receipt record expires, which is **twice the secret's own lifetime** — a 7-day secret leaves a 14-day entry. | verified | `lib/onetime/models/receipt.rb:286` (`receipt.default_expiration = lifespan * 2`), class default `:29`, accessor `:163-166`; expired receipts drop out because `load_multi(...).compact` discards misses (`apps/api/v2/logic/secrets/list_receipts.rb:89`) |
| 8 | Because the receipt window (2x TTL) is usually shorter than the query window (30 days), the 30-day figure is an upper bound, not a retention promise. | verified (derived from rows 6-7) | same two citations |
| 9 | Only secrets you created **while signed in** appear. Anything created signed-out is never indexed to the account. | verified | `apps/api/v2/logic/secrets/base_secret_action.rb:432-433` — `cust.add_receipt receipt` runs inside `unless anonymous_user?` |
| 10 | Each row shows: status, creation time, time remaining, whether a passphrase was set, an optional memo you can edit inline, and the sharing domain when it differs from the site host. | verified | `src/apps/secret/components/SecretLinksTableRowConsole.vue:139-145,174-213,345-378,446-460`; field list `src/shared/composables/useRecentSecrets.ts:130-166` |
| 11 | Row statuses are New, Previewed, Revealed, Burned, Expired, and precedence is expired > burned > revealed > previewed > new. | verified | `src/apps/secret/components/SecretLinksTableRowConsole.vue:162-213` (`itemState` at `:165`, labels at `:174-213`); strings `locales/content/en/*.json` keys `web.STATUS.new/previewed/revealed/burned/expired` |
| 12 | The list refreshes itself when you switch back to the tab, throttled to once every 5 seconds. | verified | `src/apps/secret/components/RecentSecretsTable.vue:51,56-73,87` |
| 13 | The `/recent` page also polls every 5 minutes on its own. | verified | `src/apps/workspace/dashboard/DashboardRecent.vue:49-53`; the row table does the same at `src/apps/secret/components/SecretLinksTable.vue:71-76` |
| 14 | The `/recent` page has a manual refresh button. | refuted | The button exists but is hard-disabled with `v-if="false"` (`src/apps/workspace/dashboard/DashboardRecent.vue:99`). |
| 15 | Rows whose share identifier is missing are silently hidden rather than shown broken. | verified | `src/shared/composables/useRecentSecrets.ts:237` |
| 16 | Reading the list requires the `api_access` entitlement on the caller's organization. | verified (code gate only) | `apps/api/v2/logic/secrets/list_receipts.rb:46`; helper `lib/onetime/logic/base.rb:214-234`. **Which plans carry `api_access` is NOT established here** — billing config was not supplied. |
| 17 | The list can be scoped to a whole organization or to one custom domain. | verified in the API, unreachable in the UI | API supports `scope=org` / `scope=domain` (`apps/api/v2/logic/secrets/list_receipts.rb:36-37,126-170`), but no frontend caller ever passes `scope` — every call site is `fetch()` / `fetch({silent:true})` (`src/shared/composables/useReceiptList.ts:41`, `src/apps/secret/components/RecentSecretsTable.vue:66,84`). The "Showing all secrets in {name}" string is therefore dead today. |

## What the list can and cannot recover

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| 18 | The list never contains the secret's content. The serialized receipt carries state, timestamps, TTL, passphrase flag, memo and identifiers — no plaintext and no ciphertext. | verified | full field list `lib/onetime/models/receipt/features/safe_dump_fields.rb:54-171` |
| 19 | The list **does** carry the share-link identifier, so the app can rebuild the original secret URL for the Copy button. Copying it hands out a live one-view link. | verified | `secret_identifier` is dumped at `lib/onetime/models/receipt/features/safe_dump_fields.rb:79`; link rebuilt at `src/apps/secret/components/SecretLinksTableRowConsole.vue:119-122` |
| 20 | For secrets submitted through an Incoming form the share link and creator id are withheld from the receipt payload. | verified | provenance gate `lib/onetime/models/receipt.rb:88-101`; applied at `safe_dump_fields.rb:66-67,79` |
| 21 | A creator can view their own secret's value once from the receipt page — but only for a **generated** password, only on the first load, and only inside a short display window. Secrets you typed yourself are never shown back to you. | verified | `apps/api/v2/logic/secrets/show_receipt.rb:140-176`; one-shot claim `lib/onetime/models/receipt/features/access_timeline.rb:310-311` |
| 22 | That display window is a configurable number of seconds (self-hosted default 60) and can be switched off entirely by setting it to 0. | verified (SELF-HOSTED default) | `etc/defaults/config.defaults.yaml:257-259`. The hosted value is not in any repo — do not state 60 as the onetimesecret.com behaviour. |

## Actions the list offers

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| 23 | Each active row offers Copy (copies the share link to the clipboard) and Open (opens the share link in a new tab). Terminal rows offer neither. | verified | `src/apps/secret/components/SecretLinksTableRowConsole.vue:394` (`v-if="isActive"`), copy `:125-135,396-425`, open `:427-440`; `isActive` definition `:224` |
| 24 | Clicking anywhere else on a row opens that secret's receipt page at `/receipt/<id>`. | verified | `src/apps/secret/components/SecretLinksTableRowConsole.vue:239-245`; equivalent links in the other three row variants (`...RowTimeline.vue:250-254,321-327`, `...RowLedger.vue:291-297`, `...RowSlotMachine.vue:318-324`) |
| 25 | You can burn a secret directly from the recent-secrets list. | refuted | The `delete` event is wired but its handler is an explicit stub: `void record; // Suppress unused variable warning until burn logic is implemented` (`src/apps/secret/components/SecretLinksTable.vue:52-60`). No row variant renders a burn control. A component that does (`SecretLinksTableRowActions.vue:74-84`) is imported by nothing. |
| 26 | Burning happens on the receipt page instead, at `/receipt/<id>/burn`. | verified | SPA route `src/apps/secret/routes/receipt.ts:101`; API `POST /receipt/:identifier/burn` `apps/api/v3/routes.txt:14` |
| 27 | You can add or edit a short memo on a row to remind yourself what a secret was for; it is capped at 500 characters. | verified | inline editor `src/apps/secret/components/SecretLinksTableRowConsole.vue:84-113,345-378`; `PATCH /api/v3/receipt/:identifier` `apps/api/v3/routes.txt:12`; cap `apps/api/v2/logic/secrets/update_receipt.rb:16,23` |
| 28 | Editing a memo also requires the `api_access` entitlement. | verified (code gate only) | `apps/api/v2/logic/secrets/update_receipt.rb:29`. Same billing caveat as row 16. |
| 29 | A signed-in user can dismiss/clear the whole list. | refuted | The clear button is rendered only when `!isAuthenticated` (`src/apps/secret/components/RecentSecretsTable.vue:157`); for a signed-in user `clear()` only resets the local Pinia store, not the server (`src/shared/composables/useRecentSecrets.ts:249-251`). |

## Signed-out ("guest") recents — for contrast

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| 30 | Signed out, recent links are remembered only in the browser tab's sessionStorage, never on the server. | verified | `src/shared/stores/localReceiptStore.ts:48,59,138` |
| 31 | That local list holds at most 25 entries and drops entries whose TTL has elapsed. | verified | `src/shared/stores/localReceiptStore.ts:51,75,195` |
| 32 | Signing in or out wipes the browser-local list immediately. | verified | `src/shared/composables/useRecentSecrets.ts:350-356` |

## Sessions

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| 33 | Settings → Security → Active Sessions lists every device signed in to the account and lets you sign the others out. | verified | nav `src/apps/workspace/config/settings-navigation.ts:167-172`; route `/account/settings/security/sessions` `src/apps/workspace/routes/account.ts:284-287`; page `src/apps/workspace/account/ActiveSessions.vue` |
| 34 | The API behind it is `GET /auth/active-sessions`, `DELETE /auth/active-sessions/:id`, and `POST /auth/remove-all-active-sessions`. | verified | `apps/web/auth/routes/active_sessions.rb:16-18,71-74,102-104`; client `src/shared/composables/useActiveSessions.ts:50,82-83,121-122` |
| 35 | A session is dropped after 24 hours of inactivity, and can never live longer than 30 days no matter how active it is. | verified | `apps/web/auth/config/features/active_sessions.rb:20-21` |
| 36 | Every request refreshes the session's last-use timestamp, which is what makes the idle timeout a rolling window. | verified (as configured) | `apps/web/auth/config/features/active_sessions.rb:16-18` and route comment `apps/web/auth/routes/active_sessions.rb:23-27`. The mechanism itself is inside the rodauth gem, which is not readable here. |
| 37 | The browser session cookie is named `onetime.session` and itself expires after 24 hours. | verified (SELF-HOSTED default; hard-coded, no env override) | `etc/defaults/config.defaults.yaml:374,376` |
| 38 | Sessions are listed newest-activity-first and each row shows when it was created, when it was last active, and which one is the current session. | verified | ordering `apps/web/auth/routes/active_sessions.rb:42`; columns `:46-56`; rendering `src/apps/workspace/components/account/SessionListItem.vue:34-52,87-101` |
| 39 | Each session row shows the device/browser and the IP address it signed in from. | refuted | The API hard-codes `ip_address: nil, user_agent: nil` with TODOs (`apps/web/auth/routes/active_sessions.rb:51-52`). The UI's device-name parser and IP row are therefore dead: `deviceInfo` always resolves to "Unknown Browser" (`src/apps/workspace/components/account/SessionListItem.vue:22-32`) and the IP line is `v-if="session.ip_address"` (`:92`). |
| 40 | A "Remember me" badge marks long-lived sessions in the list. | refuted | `remember_enabled: false` is hard-coded with a TODO (`apps/web/auth/routes/active_sessions.rb:54`), so the badge at `SessionListItem.vue:79-86` never renders. |
| 41 | You cannot remove your current session from this page — sign out instead. | verified | `apps/web/auth/routes/active_sessions.rb:79-83` returns 400; the UI hides the Remove button on the current row (`src/apps/workspace/components/account/SessionListItem.vue:105`) |
| 42 | "Logout All Other Sessions" ends every session except the one you are using. | verified | `apps/web/auth/routes/active_sessions.rb:104-114` (`remove_all_active_sessions_except_current`); confirm dialog `src/apps/workspace/account/ActiveSessions.vue:156-196` |
| 43 | There is a cap on how many sessions can be active at once. | refuted | Only two settings are configured — the two deadlines in `apps/web/auth/config/features/active_sessions.rb:20-21`. A repo-wide grep for `max_session` / `session_limit` in `apps/web` and `lib/onetime` returns nothing. No cap exists in APP. |
| 44 | Session tracking is on by default; a self-hosted operator can turn it off with `AUTH_ACTIVE_SESSIONS_ENABLED=false`. | verified (SELF-HOSTED default) | `etc/defaults/auth.defaults.yaml:67-68`; reader `lib/onetime/auth_config.rb:106-107` |
| 45 | Sessions live in a database table keyed on (account, session id), storing only `created_at` and `last_use`. | verified | `apps/web/auth/migrations/001_initial.rb:155-161` |
| 46 | Session ids are stored hashed, so the page compares an HMAC rather than the raw id. | verified | `apps/web/auth/routes/active_sessions.rb:35-37` |

## Connected identities (SSO)

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| 47 | Settings → Security → Connected Identities lists the single sign-on providers linked to the account and lets you add or remove them. | verified | nav `src/apps/workspace/config/settings-navigation.ts:187-197`; route `src/apps/workspace/routes/account.ts:330-333`; page `src/apps/workspace/account/ConnectedIdentities.vue` |
| 48 | The tab only appears when SSO is switched on for the install — not when the account has a password. | verified | `visible: () => f.isSsoEnabled` (`src/apps/workspace/config/settings-navigation.ts:196`) with the rationale in the comment at `:188-191` |
| 49 | Each linked identity shows the provider, the issuer, and a masked form of the identifier the provider knows you by. | verified | `apps/web/auth/routes/identities.rb:169-185` (masking keeps first four and last four characters; identifiers of 8 characters or fewer show as `***`); rendering `src/apps/workspace/account/ConnectedIdentities.vue:210-220` |
| 50 | Identities are listed without a "connected on" date because the table does not record one. | verified | `apps/web/auth/routes/identities.rb:21-23`; the table has only `id`, `account_id`, `provider`, `uid` (`apps/web/auth/migrations/006_omniauth_identities.rb:10-18`) plus `issuer` (`008_issuer_scoped_identities.rb:32-33`) — no timestamp column |
| 51 | Adding a provider re-uses the ordinary sign-in redirect, flagged so the returning identity binds to the account you are already signed in to, and drops you back on the same panel. | verified | `src/apps/workspace/account/ConnectedIdentities.vue:40-51` |
| 52 | Only providers you have not already linked are offered as "Connect" buttons. | verified | `src/apps/workspace/account/ConnectedIdentities.vue:35-38` |
| 53 | If SSO is your only way in, the app refuses to let you remove your last identity; you must connect another provider (or set a password, where that is available) first. | verified | `apps/web/auth/routes/identities.rb:99-140` — 409 with `error_code: 'last_credential'`; the check is `locked.size <= 1 && !rodauth.has_password?` at `:105`; policy-aware message chosen client-side `src/shared/composables/useConnectedIdentities.ts:74-90` |
| 54 | An account that has a password may remove any identity, including its last one. | verified | same guard: the `has_password?` term short-circuits (`apps/web/auth/routes/identities.rb:105`, comment `:97-98`) |
| 55 | You can only ever see or delete your own identities. | verified | every query is pinned to `account_id` from the session (`apps/web/auth/routes/identities.rb:38-46,78`); cross-account ids yield 404 |

## Preferences: what is genuinely settable

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| 56 | The Preferences panel (Settings → Profile → Preferences) contains exactly two controls: appearance (light/dark) and language. | verified | `src/apps/workspace/account/settings/ProfileSettings.vue:189-273` — the section has two children and no others |
| 57 | Your language choice is saved to your account, so it follows you to another browser. | verified | `POST /api/account/update-locale` (`apps/api/account/routes.txt:16`) writes `cust.locale!` for a signed-in caller (`apps/api/account/logic/account/update_locale.rb:57`); the store posts on every change (`src/shared/stores/languageStore.ts:183-186`) |
| 58 | Signed out, a language choice is remembered for the session only. | verified | session-only branch `apps/api/account/logic/account/update_locale.rb:53-58`; browser copy in sessionStorage `src/shared/stores/languageStore.ts:154` |
| 59 | Only locales the install actually supports are accepted; anything else is rejected. | verified | `apps/api/account/logic/account/update_locale.rb:42,61-63` (`OT.supported_locales.include?`) |
| 60 | Language resolution order is: your saved account locale, then an explicit in-session choice, then the custom domain's brand locale, then the browser's language, then the default. | verified | `src/shared/stores/languageStore.ts:105-138` |
| 61 | Your light/dark choice is saved to your account. | refuted | It is browser-local only: `localStorage` key `restMode` (`src/shared/composables/useTheme.ts:15,41`), and the settings page's persist handler is an empty `// TODO: Persist theme preference to user settings` (`src/apps/workspace/account/settings/ProfileSettings.vue:44-55`). |
| 62 | The language control is hidden when internationalization is switched off for the install. | verified | `v-if="i18n_enabled"` (`src/apps/workspace/account/settings/ProfileSettings.vue:217`); config flag `etc/defaults/config.defaults.yaml:1205` (self-hosted default `false`) |
| 63 | You can set a default expiry (TTL) for the secrets you create, from your account settings. | refuted | No TTL control exists anywhere under `src/apps/workspace/account/` (grep for `default_ttl`/`defaultTtl`/`passphrase` over that directory returns no files). The only "memory" is the last TTL you picked, stored per-browser in `localStorage` under `onetimePreferredTtl` and restored on the dashboard form (`src/shared/stores/localReceiptStore.ts:50,98-108,363-364`; `src/apps/workspace/components/forms/WorkspaceSecretForm.vue:170-177,229-234`). |
| 64 | The system-wide default TTL and the list of TTL choices are install configuration, not user preferences. | verified (SELF-HOSTED config) | `etc/defaults/config.defaults.yaml:220,224`; built-in fallback of 7 days `lib/onetime/config.rb:39,140` |
| 65 | You can set a default passphrase, or make a passphrase mandatory for your own account. | refuted | `passphrase.required` is an install-level setting (`etc/defaults/config.defaults.yaml:242`), and per-domain `passphrase_required` is a **custom domain** brand setting, not an account one (`src/apps/workspace/components/domains/PrivacyDefaultsModal.vue:34-49`; `src/apps/workspace/composables/useWorkspacePrivacyDefaults.ts:83-101` — canonical domain returns `isEditable: false`). |
| 66 | Notification settings contain exactly one switch: email me when someone views one of my secrets. | verified | `VALID_FIELDS = %w[notify_on_reveal]` (`apps/api/account/logic/account/update_notification_preference.rb:16`); single toggle `src/apps/workspace/account/settings/NotificationSettings.vue:76-122` |
| 67 | That notification is off unless you turn it on. | verified | `notify_on_reveal?` is true only for the literal string `'true'` (`lib/onetime/models/customer.rb:241-242`); the UI defaults to `false` when unset (`src/apps/workspace/account/settings/NotificationSettings.vue:16`) |
| 68 | The notification email contains only the time of the view and the secret's short id — never who viewed it. | verified | template `lib/onetime/mail/templates/secret_revealed.txt.erb:1-3`; payload `apps/api/v3/logic/secrets.rb:118-125` carries only `secret_shortid`, `revealed_at`, `locale`; UI copy `web.settings.notifications.privacy_note` |
| 69 | The notification fires on an actual reveal, not merely on the recipient opening the link. | verified | `apps/api/v3/logic/secrets.rb:104` — `notify_owner_of_reveal if show_secret && !verification`; opt-in gate `:116` |
| 70 | A failed notification never blocks or reverses the reveal. | verified | `apps/api/v3/logic/secrets.rb:127-130` (rescued and logged) |
| 71 | The Privacy Settings page has no settings on it — it is a statement that there is no analytics or tracking, rendered as a permanently-on, disabled switch. | verified | `src/apps/workspace/account/settings/PrivacySettings.vue:57-67` (`aria-disabled="true"`, `cursor-not-allowed`); copy keys `web.settings.privacy.no_analytics_statement`, `web.settings.privacy.explanation` |
| 72 | "Stay on page" is a preference that persists across sessions. | verified | `localStorage` key `onetimeWorkspaceMode` (`src/shared/stores/localReceiptStore.ts:49,84-93,146-151`). Note it is a form-behaviour toggle ("Create multiple secrets without leaving this page"), not a privacy setting, and it is disabled for generated passwords (`web.secrets.workspace_mode_disabled_for_generate`). |

## Regions / jurisdictions

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| 73 | Regions are an optional feature. When off, the app serves no region data to the frontend at all. | verified (SELF-HOSTED default is OFF) | `etc/defaults/config.defaults.yaml:657-658`; serializer sends the block only when enabled (`apps/web/core/views/serializers/config_serializer.rb:57-58`) |
| 74 | A deployment's region list is configuration: `JURISDICTIONS=ID:domain,ID:domain,...`, plus `JURISDICTION` naming which one this host is. | verified | `etc/defaults/config.defaults.yaml:659-671`; parser `lib/onetime/config.rb:438-456` (a malformed entry raises `ConfigError` at `:443-445`) |
| 75 | The canonical list of regions onetimesecret.com runs, and which one is "current" on each host. | unverifiable | Both come from the hosted environment (`JURISDICTIONS`, `JURISDICTION`), which is in none of the three repos. Settled by the production env, or by reading the `regions` block onetimesecret.com serves in its bootstrap config (`apps/web/core/views/serializers/config_serializer.rb:550-570`). |
| 76 | The regions the marketing site offers a buyer today are EU, Canada, New Zealand, United States and United Kingdom. | verified (MKTG — buyer-facing offer, not app behaviour) | `MKTG src/data/ops/jurisdictions.ts:11,20,29,38,47`; the same five are the homepage trust badges `MKTG src/data/product/infrastructure.ts:28-32` |
| 77 | Brazil, Australia and Mexico are advertised as coming soon, not live. | verified (MKTG) | `MKTG src/data/ops/jurisdictions.ts:56-84` (`comingSoon: true` on each) |
| 78 | The marketing site names a city for each live region: Toronto, Nuremberg, Porirua, London, Hillsboro. | verified (MKTG) | `MKTG src/i18n/ui/en.json:354-360` |
| 79 | The app and the marketing site do not agree on the region set. | verified | APP ships display-name keys for EU, US, CA, UK, NZ **plus AT (Austria) and APAC (Asia-Pacific)** (`locales/content/en/feature-regions.json:166-193`; icon map `src/sources/jurisdictions.ts:20-27`), and has no key for BR/AU/MX. MKTG has the reverse gap. Neither list is authoritative — see row 75. |
| 80 | Region display names are resolved from translation keys of the form `web.regions.jurisdictions.<id>.name`, so an operator can add a region by config without shipping code. | verified | `lib/onetime/config.rb:450`; `apps/web/core/views/serializers/config_serializer.rb:558-560`; consumer `src/shared/stores/jurisdictionStore.ts:40-44` |
| 81 | Each region is a wholly separate deployment with its own infrastructure and storage, and customer data is never moved between regions. | verified as product policy stated in-product | UI strings `locales/content/en/feature-regions.json:6-17,94-97,150-153`. This is a policy claim the app asserts to users; no code path in APP transfers or replicates data between hosts, and none could be found (no cross-region migration code exists in `lib/` or `apps/`). |
| 82 | Switching regions does not move your account. To use another region you create a **new account** on that region's host with the same email address. | verified | `web.regions.switching_creates_new_account` (`locales/content/en/feature-regions.json:18-21`) and `web.regions.changing_regions_how_to` (`:154-157`); the UI's only affordance is a link to `https://<region domain>/signup` (`src/shared/components/modals/settings/JurisdictionList.vue:39`) |
| 83 | Your existing secrets stay in the region where you created them. | verified | `web.regions.switching_creates_new_account` (`locales/content/en/feature-regions.json:19`), `web.regions.data_sovereignty_description` (`:6-9`) |
| 84 | The footer region picker navigates the browser to the other region's host root; it does not migrate anything. | verified | `src/shared/components/ui/JurisdictionToggle.vue:74` (`window.location.href = 'https://' + jurisdiction.domain + '/'`); mounted in `TransactionalFooter.vue:114`, `ManagementFooter.vue:221`, `BrandedFooter.vue:55` |
| 85 | Settings → Region has three pages: your current region, the available regions, and why data sovereignty matters. `/account/region` redirects to the first. | verified | nav `src/apps/workspace/config/settings-navigation.ts:203-235`; routes `src/apps/workspace/routes/account.ts:95-143`; redirect `src/apps/workspace/account/DataRegion.vue:9-11` |
| 86 | The Region section is only visible to an organization owner or admin. | verified | `visible: () => f.isFullAuthMode && f.isOwnerOrAdmin` (`src/apps/workspace/config/settings-navigation.ts:213`) |
| 87 | When regions are configured but the feature flag is off, the picker collapses to just your own region. | verified | `src/shared/stores/jurisdictionStore.ts:163-166` |

## Reader-facing vocabulary (what the UI actually calls these things)

| # | Thing | The UI's word | Evidence |
|---|---|---|---|
| 88 | The dashboard list of your created secrets | **"Receipts"** on `/dashboard`; **"Recent Secrets"** on `/recent` and in the page title | `web.LABELS.receipts` at `src/apps/secret/components/RecentSecretsTable.vue:119`; `web.LABELS.title_recent_secrets` at `src/apps/workspace/dashboard/DashboardRecent.vue:88`; `web.TITLES.recent = "Recent Secrets"` |
| 89 | The per-secret detail page | **"receipt"** (`/receipt/<id>`). V3 dropped "metadata" entirely. | `apps/api/v3/logic/secrets.rb:26-42` ("V3 uses modern 'receipt' terminology exclusively") |
| 90 | The sessions page | **"Active Sessions"**, with "Current Session" / "Other Sessions" and the button **"Logout All Other Sessions"** | `locales/content/en/session-auth-extended.json:603-646` |
| 91 | The SSO page | **"Connected Identities"**; the card inside is headed **"Single sign-on"**; per-row labels are **"Issuer"** and **"Identifier"** | `locales/content/en/session-auth-extended.json` keys `web.auth.connections.title/section_title/issuer/identifier` |
| 92 | Regions | The nav says **"Region"**; the pages say **"Your Region"**, **"Available Regions"**, **"Why Data Sovereignty Matters"**. "Region" and "jurisdiction" are used interchangeably in code and near-interchangeably in copy. | `web.account.region`, `web.regions.your_region/available_regions/why_it_matters`; the region≈jurisdiction note is spelled out at `src/shared/stores/jurisdictionStore.ts:85-95` |
| 93 | The notification toggle | **"Secret Reveal Notifications"** — "Receive an email when someone views your secret" | `locales/content/en/*.json` key `web.settings.notifications.reveal_notifications.title/description` |
| 94 | Row statuses | New / Previewed / Revealed / Burned / Expired (rendered upper-case in the console row variant) | `web.STATUS.*`; `src/apps/secret/components/SecretLinksTableRowConsole.vue:174-208` |
| 95 | The multi-create toggle | **"Stay on page"** — "Create multiple secrets without leaving this page" | `locales/content/en/secret-manage.json:38-44` |

---

## Do not claim

- **Do not say the dashboard lists "all your secrets".** It lists receipts created in the last
  30 days that still exist, and a receipt only outlives its secret by 2x the secret's TTL
  (`list_receipts.rb:34`, `receipt.rb:286`). There is no archive and no pagination.
- **Do not say you can burn a secret from the recent list.** The handler is a stub
  (`SecretLinksTable.vue:52-60`). Burning is a receipt-page action.
- **Do not say the sessions list shows device, browser, location or IP.** All three fields are
  hard-coded `nil` server-side (`active_sessions.rb:51-52`). Only created / last-active /
  is-current are real. A writer looking at `SessionListItem.vue` will see a device parser and an
  IP row and wrongly conclude otherwise — both are unreachable.
- **Do not say a "Remember me" badge marks persistent sessions.** `remember_enabled` is hard-coded
  `false` (`active_sessions.rb:54`).
- **Do not state a maximum number of concurrent sessions.** None is configured anywhere in APP
  (row 43). If the docs need a number, the source would have to add one first.
- **Do not say your theme follows your account.** It is `localStorage` only, and the persist hook
  is an unimplemented TODO (`ProfileSettings.vue:44-55`).
- **Do not say there is an account-level default TTL or default passphrase.** Neither exists
  (rows 63, 65). The nearest true statement is "the app remembers the last expiry you chose, in
  this browser".
- **Do not say notification preferences are plural, or mention digests, recipient-side
  notifications, or per-secret notification settings.** `VALID_FIELDS` contains exactly one entry
  (`update_notification_preference.rb:16`).
- **Do not describe the recent-secrets list as scoped to an organization or a custom domain.** The
  API supports it; no UI path reaches it (row 17).
- **Do not name a canonical set of live regions from APP.** APP contains only icon and
  display-name metadata for seven identifiers, not a deployment list; the real list is a hosted env
  var (row 75). If the docs must name regions, cite MKTG as the source of the *offer* and say so.
- **Do not assert anything about the AT (Austria) or APAC region.** They exist only as translation
  keys and icon entries in APP (`feature-regions.json:186-193`, `src/sources/jurisdictions.ts:26-27`)
  and appear nowhere on the marketing site. That is not evidence a host exists.
- **Do not restate the in-product claim that subscription benefits carry across to an account
  created in another region** (`feature-regions.json:158-165`). That is a billing/entitlement
  assertion and this run is under a hard billing stop. Describe the account mechanics (new account,
  same email) and stop there.
- **Do not present the 60-second generated-password display window, the 7-day default TTL, or the
  24-hour cookie lifetime as hosted facts.** Each is a self-hosted default in
  `etc/defaults/config.defaults.yaml` (rows 22, 37, 64). The 24h idle / 30d absolute session
  deadlines (row 35) are different: they are hard-coded in APP source with no env override, so they
  are structural.
- **Do not say the dashboard "can recover a secret you lost".** It cannot show content (row 18),
  but it *can* re-copy the share link (row 19) — those are different statements and conflating them
  is the likeliest error on this page.
- **Do not describe `DashboardBasic` / `DashboardEmpty` behaviour** (free-tier dashboard, "create
  your first team" onboarding). Both components are unrouted and beta-flagged (row 4).
