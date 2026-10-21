# Phase 2 verification ledger - vocabulary-and-orgs
Verified against onetimesecret@aafe503 on the Phase 2 branch.

All paths are APP-relative (`/home/user/onetimesecret`) unless prefixed `MKTG/`
(`/home/user/onetimesecret.com`). Locale citations are the shipped EN strings in
`locales/content/en/*.json`, which is what a hosted reader actually sees.

Scope note (billing gate): this ledger records entitlement identifiers that exist in code and
the mechanism by which they are enforced. It deliberately records **no** plan-to-entitlement
mapping, no seat/member number, and no price. `etc/examples/billing.example.yaml` is an example
file and was not used as evidence for anything.

---

## 1. secret vs receipt vs metadata vs private link

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| 1 | Every share creates two linked records: a **secret** (holds the encrypted payload) and a **receipt** (the creator's record of it). | verified | `lib/onetime/models/secret.rb:8-45`; `lib/onetime/models/receipt.rb:6-40`; both minted together in `Receipt.spawn_pair`, `lib/onetime/models/receipt.rb:272-308` |
| 2 | The two records have different identifiers and different URLs: the recipient link is `/secret/:identifier`, the creator's page is `/receipt/:identifier`. | verified | `src/apps/secret/routes/secret.ts:60`; `src/apps/secret/routes/receipt.ts:81`; server passthrough `apps/web/core/routes.txt:59-60` |
| 3 | The receipt outlives the secret: a receipt is created with twice the secret's lifespan. | verified (structural, code path) | `lib/onetime/models/receipt.rb:286` (`receipt.default_expiration = lifespan * 2`) vs `:288` (`secret.default_expiration = lifespan`) |
| 4 | The model-class fallback expirations are 7 days for a secret and 14 days for a receipt, but both are overridden per creation. | verified (shipped model default, not a hosted guarantee) | `lib/onetime/models/secret.rb:33`; `lib/onetime/models/receipt.rb:29`; overridden at `receipt.rb:286-289` |
| 5 | The UI calls the creator's page a **receipt**: page title "Secret Receipt", nav label "Receipts". | verified | `locales/content/en/00-common.json:1212-1214` (`web.TITLES.receipt`); `:819-821` (`web.LABELS.receipts`) |
| 6 | "Metadata" is a legacy internal/route name, not a word the current UI shows for the receipt. | verified | route aliases `/metadata/:key` marked `deprecated=true`, `apps/api/v1/routes.txt:39-42`; the one surviving key `web.TITLES.metadata` renders as "Secret Details", `locales/content/en/00-common.json:1208-1210` |
| 7 | The API keeps `metadata_url` as a backward-compatible alias of `receipt_url`. | verified | `apps/api/v1/logic/secrets/show_receipt.rb:275-277` (`@metadata_url = @receipt_url # maintain public API`); `apps/api/v2/logic/secrets/burn_secret.rb:172-173` |
| 8 | `/private/:key` and `/metadata/:key` still resolve, but `/receipt/:key` is the canonical path. | verified | `apps/api/v1/routes.txt:25-42` ("Canonical receipt paths" / "Legacy aliases — use /receipt/ paths instead"); same split at `apps/api/v2/routes.txt:8-18` |
| 9 | Some end-user copy still says "private link" when it means the receipt page. | verified (stale UI copy) | `locales/content/en/secret-manage.json:290-291`: "if you accidentally send the private link instead of the secret one" |
| 10 | The recipient-facing link is called the **secret link** in the UI. | verified | `locales/content/en/secret-manage.json:186` (`web.secrets.secret_link` = "Secret link"); `:282-283` "Lost your secret link?" |
| 11 | For a secret submitted through an incoming form, the receipt deliberately withholds the share link. | verified | `lib/onetime/models/receipt.rb:93-101` (`SOURCE_CAPABILITIES`, `'incoming' => { shows_share_link: false }`, unmapped values fail closed); consumed at `apps/api/v2/logic/secrets/show_receipt.rb:322-330` |
| 12 | The creator can see the secret's value on the receipt page exactly once. | verified | `lib/onetime/models/receipt.rb:62-70` (`secret_value_shown_at`, "claimed exactly once by `claim_secret_value_display!` (atomic HSETNX)"); reader-facing copy `locales/content/en/secret-manage.json:210` "Careful: you will only see this once." |
| 13 | MKTG also uses "receipt" for this object. | verified | `MKTG/src/i18n/ui/en.json` → `web.secrets.receiptLink` = "receipt" |

## 2. passphrase vs password

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| 14 | **Passphrase** is the optional secret-level protection the recipient must type to reveal a secret. It is a field on the Secret record, hashed with Argon2id. | verified | `lib/onetime/models/features/passphrase_hashing.rb:14-35` (adds `passphrase` field, `Argon2::Password.create`); `lib/onetime/models/secret.rb:25` (`feature :passphrase_hashing`) |
| 15 | Older secrets may carry a bcrypt passphrase hash; verification accepts both. | verified | `lib/onetime/models/features/passphrase_hashing.rb:41-62` (`passphrase_encryption` '2' = argon2id, '1'/legacy = bcrypt) |
| 16 | **Password** in the UI means either (a) the account's sign-in password or (b) a value the generator produces to be shared. It never means the passphrase. | verified | account sense: `locales/content/en/00-common.json:244` "Password", `:1173` "Forgot Password"; generator sense: `:20` "Generate Password", `locales/content/en/secret-homepage.json:63` "Password Generator" |
| 17 | The UI consistently labels the secret-level control "passphrase". | verified | `locales/content/en/secret-manage.json:14` "Enter Passphrase", `:110` "Enter a passphrase", `:310` "Passphrase Protection"; MKTG matches (`MKTG/src/i18n/ui/en.json` → `web.secrets.passphraseInputLabel` = "Passphrase") |
| 18 | A generated password is shown to the creator only on the receipt, so the "stay on page" flow is disabled for it. | verified | `locales/content/en/secret-manage.json:375`: "Disabled for generated passwords - you need to view the receipt to see the password" |
| 19 | The service can recover a forgotten passphrase. | refuted | `locales/content/en/secret-manage.json:306-307` "never stored in its original form … we can't access or recover your secret"; only the Argon2/bcrypt hash is stored, `passphrase_hashing.rb:32-35` |

## 3. organization vs workspace vs team

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| 20 | The code model is **Organization**. There is no Team model and no Workspace model. | verified | `lib/onetime/models/organization.rb` is the only such model; `ls lib/onetime/models/` has no team/workspace entry |
| 21 | "Workspace" is a UI synonym for organization, used inconsistently alongside "Organization" on the same screens. | verified | `locales/content/en/00-common.json:1342-1344` `web.TITLES.organizations_settings` = "Workspaces" but `:1346-1348` `web.TITLES.organization_settings` = "Organization Settings"; `locales/content/en/workspace-organizations.json:2-24` mixes "Organizations", "Workspace", "Workspaces" across adjacent keys |
| 22 | "Team" is not a product object. It survives as a URL alias and as loose prose. | verified | `src/apps/workspace/account/settings/OrganizationSettings.vue:64-67` (`team: 'members', // backwards compatibility for old URLs`); prose e.g. `locales/content/en/workspace-dashboard.json` "Teams let you collaborate with others in a shared workspace." |
| 23 | Every authenticated customer has an organization; it is created lazily on first entitlement-gated access, not at signup-auth time. | verified | `lib/onetime/logic/organization_context.rb:71-91` (`auth_org` lazy-creates); `apps/web/auth/operations/create_default_workspace.rb:19-23` names the callers and notes the auth path is read-only |
| 24 | The auto-created org is literally named "Default Workspace" and is flagged so it cannot be deleted. | verified | `apps/web/auth/operations/create_default_workspace.rb:167-176` (`'Default Workspace'`, then `org.is_default! true`); field comment `lib/onetime/models/organization.rb:71` |
| 25 | Org settings live at `/org/:extid/:tab`; the tab names are settings, members, domains, subscription, sso, activity. | verified | `src/apps/workspace/routes/organizations.ts:42`; tab map `src/apps/workspace/account/settings/OrganizationSettings.vue:74-82` |
| 26 | Reaching the org settings screen at all requires owner or admin of that org. | verified | `src/apps/workspace/routes/organizations.ts:47` (`requiresOrgRole: 'admin', // owner or admin of the org named by :extid`) |
| 27 | Organizations are addressed publicly by `extid`, never by the internal id. | verified | `lib/onetime/models/organization.rb:15-27`; `apps/api/organizations/routes.txt:11` ("Uses extid … objid is for internal use only") |
| 28 | A membership can be scoped to a single custom domain, and a domain-scoped member is barred from member management. | verified | `lib/onetime/models/organization_membership.rb:167,276-289` (`domain_scope_id`, `org_scoped?`, `domain_scoped?`, fail-closed `can_access_domain?`); set on SSO join at `apps/web/auth/operations/join_domain_organization.rb:82-91`; refusal at `apps/api/organizations/logic/members/update_member_role.rb:47-51` and `apps/api/organizations/logic/invitations/create_invitation.rb:43-47` |

## 4. colonel vs admin vs staff vs owner

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| 29 | There are two independent role axes: a **system role** on the Customer, and an **organization role** on the membership. | verified | system: `lib/onetime/application/authorization_policies.rb:41-67`; org: `lib/onetime/models/organization_membership.rb:142-146` |
| 30 | System roles are `colonel`, `admin`, `staff`, `customer` (plus the `anonymous` sentinel). | verified | `apps/web/auth/operations/customers/set_role.rb:35` (`VALID_ROLES = %w[colonel admin staff customer]`, described at `:19` as "the single source of truth for assignable roles"); anonymous at `lib/onetime/models/customer.rb:224-226` |
| 31 | **Colonel** is the site-operator superuser role - the term the app uses for what other products call a site admin. | verified | `lib/onetime/application/authorization_policies.rb:41-47` ("colonel: Site administrators with full access"); admin console mounted at `/colonel/*`, `src/apps/admin/routes.ts:30-148`; nav label "Colonels Only", `locales/content/en/10-layout.json:211` |
| 32 | System `admin` and `staff` exist in the hierarchy but are not distinct product roles today - `has_system_role?` is the only consumer, and only `colonel` is checked in app code. | verified | hierarchy `lib/onetime/application/authorization_policies.rb:58-66` (`admin` = colonel\|admin, `staff` = colonel\|admin\|staff); `lib/onetime/logic/base.rb:309` is the colonel check; no `has_system_role?('staff')` call site outside that module |
| 33 | An elevated system role only takes effect once the account's email is verified. | verified | `lib/onetime/application/authorization_policies.rb:55-56` (`return false unless cust.verified?`, "Defense in depth") |
| 34 | Colonel is granted by CLI, not by config and not self-service. | verified | `lib/onetime/models/customer/features/colonel_assignment.rb:6-15` ("Does NOT auto-assign roles - colonel promotion is managed exclusively via CLI commands"); `bin/ots customers role promote|demote|list`, `lib/onetime/cli/customers/role_command.rb:9-13` |
| 35 | The `site.authentication.colonels` config list only *identifies* colonel emails; it does not grant the role. | verified | `lib/onetime/models/customer/features/colonel_assignment.rb:30-51` (predicate + list reader only, no writer) |
| 36 | **Owner** is an organization role, not a system role. | verified | `lib/onetime/models/organization_membership.rb:102-106` (`ROLE_ENTITLEMENTS` keys); the deprecated `Organization#owner_id` is explicitly superseded by the membership role, `lib/onetime/models/organization.rb:68` |
| 37 | An org-level "admin" is a different thing from a system "admin". | verified | org admin: `lib/onetime/models/organization_membership.rb:80-88`; system admin: `authorization_policies.rb:61-62`; the two never meet in `require_entitlement!` |
| 38 | A colonel bypasses entitlement checks when acting on a named organization. | verified | `lib/onetime/logic/base.rb:309` (`return true if has_system_role?('colonel')` inside `require_entitlement_in!`) |
| 39 | A colonel also bypasses entitlement checks on their own org context (`require_entitlement!`). | refuted | `lib/onetime/logic/base.rb:214-284` contains no colonel branch; only anonymity short-circuits (`:222`) |
| 40 | A colonel can temporarily preview another plan's entitlements for their own session. | verified | `lib/onetime/entitlement_preview.rb:6-49` (ADR-020, request-scoped Fiber-local); UI copy `locales/content/en/admin-colonel.json:295` "Changes are temporary and affect only your session." |

## 5. entitlement vs permission vs capability vs plan

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| 41 | **Entitlement** is the code term for a named capability that gates a feature; the predicate is `can?('name')`. | verified | `lib/onetime/models/features/with_entitlements.rb:112-123` |
| 42 | The full set of entitlement identifiers in code is: `create_secrets`, `view_receipt`, `api_access`, `notifications`, `extended_default_expiration`, `manage_teams`, `manage_members`, `audit_logs`, `workspace_branding`, `ip_access_rules`, `custom_domains`, `homepage_secrets`, `incoming_secrets`, `custom_branding`, `custom_privacy_defaults`, `custom_mail_sender`, `flexible_from_domain`, `custom_signin_config`, `custom_signup_validation`, `manage_sso`, `manage_org`, `manage_billing`. | verified | `lib/onetime/models/organization/features/with_plan_entitlements.rb:48-56`; mirrored in the frontend constant `src/types/organization.ts:55-80` |
| 43 | `manage_teams` is a dead identifier: it appears in the entitlement list and has an error string, but no role template grants it and no server code checks it. | verified | absent from all three sets at `lib/onetime/models/organization_membership.rb:72-100`; the only `can?('manage_teams')` calls are in `apps/web/billing/try/plan_helpers_try.rb:172,180,212` (a try/test file) |
| 44 | `manage_orgs` appears in the frontend entitlement constant but nowhere in the Ruby entitlement list. | verified | `src/types/organization.ts:71` vs the Ruby list at `with_plan_entitlements.rb:48-56` |
| 45 | "Permission" is not a modelled concept; it is only user-facing prose in refusal messages. | verified | e.g. `locales/content/en/workspace-organizations.json:421` "You do not have permission to manage members"; `locales/content/en/workspace-domains.json:471`; no `Permission` class or field in `lib/onetime/models/` |
| 46 | "Capability" is not product vocabulary; the one code use is `SOURCE_CAPABILITIES` on the receipt, unrelated to authorization. | verified | `lib/onetime/models/receipt.rb:93-101`; no user-visible "capabilit*" string in `locales/content/en/*.json` |
| 47 | End users never see the word "entitlement" in the workspace UI; they see "Plan Features". | verified | `locales/content/en/workspace-billing.json` → `web.billing.overview.plan_features` = "Plan Features", and each entitlement renders through `web.billing.overview.entitlements.<id>` as a human name (e.g. `create_secrets` → "Create Secrets"); mapping at `src/shared/composables/useEntitlements.ts:16-44` |
| 48 | "Entitlement" is admin-console vocabulary. | verified | `locales/content/en/admin-organizations.json:67-151` ("Entitlement overrides", "Effective entitlements", "Effective = plan entitlements + grants - revokes") |
| 49 | A refused entitlement returns an `EntitlementRequired` error that names the entitlement and, when resolvable, an upgrade target. | verified | `lib/onetime/errors.rb:201-223` (subclass of `Forbidden`, `to_h` carries `entitlement`, `current_plan`, `upgrade_to`) |
| 50 | An operator can grant or revoke an individual entitlement independently of the plan, at org level and at membership level. | verified | org: `lib/onetime/operations/org/entitlement_override.rb`, CLI `lib/onetime/cli/org/entitlement_{grant,revoke,clear,show}_command.rb`; membership: `lib/onetime/models/organization_membership/features/with_materialized_entitlements.rb:184-215`; reconciliation order `plan + grants − revokes` at `:115-140` |
| 51 | When billing is disabled (self-hosted standalone), all entitlements are granted. | verified (self-hosted behaviour) | `lib/onetime/models/organization/features/with_plan_entitlements.rb:28-56` ("When billing is disabled or plan cache is empty, users get full access"); `billing_enabled?` at `lib/onetime/models/features/with_entitlements.rb:149-153` |
| 52 | Which plan carries which entitlement. | out of scope for this run | production `etc/billing.yaml` not in hand; `etc/examples/billing.example.yaml` is an example and cannot arbitrate. Do not derive it from `FREE_TIER_ENTITLEMENTS` - see "Do not claim" #4 |

## 6. Secret Activity vs Security Events vs audit log

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| 53 | **Secret Activity** is the org-scoped trail of what happened to that org's secrets: created, link/status fetched, previewed, revealed, burned, expired, orphaned. | verified | `lib/onetime/models/organization/features/secret_activity.rb:1-16`; event kinds enumerated in the UI labels `locales/content/en/workspace-organizations.json:691-734` |
| 54 | The UI title is "Secret Activity", under the org's Activity tab. | verified | `locales/content/en/workspace-organizations.json:667-669` (`web.organizations.audit.title` = "Secret Activity"); tab `src/apps/workspace/account/settings/OrganizationSettings.vue:74-82`, URL `/org/:extid/activity` |
| 55 | The shipped API path is `GET /api/organizations/:extid/secret-activity`. | verified | `apps/api/organizations/routes.txt:20`; client `src/shared/composables/useSecretActivity.ts:94` |
| 56 | The path `/audit-events` is documented anywhere authoritative. | refuted - do not document it | it appears only in `CHANGELOG.rst:57` and matches no route in `apps/api/organizations/routes.txt`. This is the D4 stale reference. |
| 57 | Secret Activity is gated by the `audit_logs` entitlement, which in role terms means owners and admins. | verified | endpoint gate `apps/api/organizations/logic/organizations/list_secret_activity.rb:85`; `audit_logs` sits in `ADMIN_ENTITLEMENTS`, `lib/onetime/models/organization_membership.rb:80-88`; reader-facing "Secret activity is available to organization owners and admins.", `locales/content/en/workspace-organizations.json:791-793` |
| 58 | Secret Activity has two independent switches: an instance-level exposure flag and an instance-level collection flag. | verified (self-hosted config, both default on) | exposure `features.organizations.audit_logs_enabled` (`ORGS_AUDIT_LOGS_ENABLED`), `etc/defaults/config.defaults.yaml:781`, enforced `list_secret_activity.rb:70-79`; collection `features.secret_activity.collect` (`SECRET_ACTIVITY_COLLECT`), `etc/defaults/config.defaults.yaml:789`, rationale `lib/onetime/models/organization/features/secret_activity.rb:30-35` |
| 59 | The trail is capped by event count, not by time; there is no retention TTL. | verified | `lib/onetime/models/organization/features/secret_activity.rb:22-27,36` ("No TTL: organizations are permanent records; the cap is the bound"); cap is configurable via `features.secret_activity.max_events`, floor `MIN_MAX_EVENTS` at `:44-45` |
| 60 | Events carry receipt/secret shortids only, never full identifiers. | verified | `CHANGELOG.rst:59-60`; actor handling and email-like id rejection at `lib/onetime/models/receipt/features/access_timeline.rb:204-218` |
| 61 | **Audit Log** is the separate, colonel-only record of mutating admin actions across the whole instance. | verified | `lib/onetime/models/colonel_audit_event.rb:6-27`; UI title "Audit Log" with description "Every mutating admin action, newest first", `locales/content/en/admin-audit.json` (`web.admin.audit.title`, `.description`); read endpoint `GET /api/colonel/audit` |
| 62 | "Security Events" is product vocabulary. | refuted | the phrase appears in neither APP locales nor `MKTG/src/i18n/ui/en.json`. Its only occurrence is the docs site's own `src/content/docs/en/team/audit-log.md:33`, where it names a *planned* capability |
| 63 | Account/authentication events (logins, SSO changes) appear in Secret Activity. | refuted | the event kinds are all secret-lifecycle (`locales/content/en/workspace-organizations.json:691-734`); the org trail is fanned out from Receipt state transitions only, `lib/onetime/models/organization/features/secret_activity.rb:8-13` |

## 7. canonical domain vs custom domain vs cluster host

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| 64 | **Canonical domain** is the code term for the instance's own host(s): `site.host` plus the configured default link domain. | verified | `lib/onetime/models/custom_domain.rb:1085-1090` (`canonical_hosts = [site.host, features.domains.default]`) |
| 65 | A custom domain that overlaps a canonical host - including a subdomain of it - cannot be registered, and this check is absolute (no colonel bypass). | verified | `lib/onetime/models/custom_domain.rb:1069-1120`; placement note at `:1082-1084` ("Placed before entitlement checks in AddDomain so it is absolute (no colonel bypass)") |
| 66 | The user-facing word for the canonical domain in the workspace UI is "default domain". | verified | `locales/content/en/workspace-domains.json` → `web.domains.canonical_no_settings` = "Default domain has no settings page"; the word "canonical" appears in no EN user string |
| 67 | **Custom domain** is both the model name and the user-facing term. | verified | `lib/onetime/models/custom_domain.rb`; `locales/content/en/api-entitlements-errors.json` → "Custom domains require a plan upgrade"; MKTG uses the same term |
| 68 | "Cluster" is not user-facing vocabulary. It is an API response key carrying the deployment's proxy settings, and the pre-rename name of the `features.domains.approximated` config block. | verified | response key `apps/api/domains/logic/domains/list_domains.rb:75`, schema `src/schemas/api/domains/responses/domains.ts:18-20` ("Custom domain details (proxy/cluster info)"); rename note `apps/web/core/views/helpers/initialize_view_vars.rb:344-352`; zero matches for "cluster" in `locales/content/en/*.json` |
| 69 | There is a single "cluster host" a customer points DNS at. | unverifiable as stated | what a customer is told to point at depends on `features.domains.validation_strategy` (`passthrough` / `approximated` / `caddy_on_demand`), `etc/defaults/config.defaults.yaml:734-747`, and the proxy values are per-deployment (`proxy_ip`, `proxy_host`, `vhost_target`), `lib/onetime/domain_validation/features.rb:128-140`. Would be settled by the hosted service's live `details.cluster` payload. Describe it as "the CNAME target the app shows you". |
| 70 | Setup is a CNAME, with an ALIAS/ANAME/A fallback for apex domains. | verified | `locales/content/en/workspace-domains.json` → `web.domains.dns.cname_heading` "Create a CNAME record" and `web.domains.dns.apex_notice` "Apex (root) domains can't use a CNAME record…" |

## 8. burn vs delete vs expire

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| 71 | A secret ends in exactly one of four terminal states: `revealed`, `burned`, `expired`, `orphaned`. | verified | receipt transitions `lib/onetime/models/receipt/features/deprecated_fields.rb:153,185,219,245`; each guarded from `new`/`previewed` only |
| 72 | **Burn** means the creator destroys the secret before anyone reads it. | verified | `lib/onetime/models/secret/features/secret_state_management.rb:134-149`; user copy `locales/content/en/secret-manage.json:263` "The burn feature lets you permanently delete a secret before anyone views it… Once burned, the secret cannot be recovered." |
| 73 | Burning is irreversible and cannot be undone. | verified | `secret_state_management.rb:135-136` ("we don't support going from :burned back to something else") plus `destroy!` at `:147`; copy `locales/content/en/00-common.json:172` "Burning a secret is permanent and cannot be undone" |
| 74 | Burn and reveal are both single-winner: concurrent requests cannot both succeed. | verified | atomic compare-and-set, `secret_state_management.rb:142` (burn) and `:172-189` (`win_reveal_claim!`) |
| 75 | **Expire** means the TTL ran out with nobody viewing; no application code runs, Redis simply drops the key. | verified | `lib/onetime/models/secret.rb:55-58` ("TTL expiry still runs no application code"); receipt-side transition is lazy, `deprecated_fields.rb:245-252` |
| 76 | A secret is gone when it is viewed **or** when it expires, whichever comes first. | verified | `locales/content/en/secret-manage.json:270-271`: "available for {0} or until it's viewed, whichever comes first" |
| 77 | "Delete" is not a distinct secret lifecycle verb. It appears in UI copy as the plain-English gloss of burn/reveal, and separately for account deletion. | verified | gloss: `locales/content/en/00-common.json:168` "Burning a secret will delete it before it has been read"; `locales/content/en/secret-manage.json:171` "Permanently deleted"; account sense: `locales/content/en/workspace-account.json:673-674` |
| 78 | The UI verb and button label is "Burn" / "Burn Secret". | verified | `locales/content/en/00-common.json:151-152` (`web.COMMON.burn` = "Burn"), `:1216-1218` (`web.TITLES.burn_secret` = "Burn Secret"); route `/receipt/:receiptIdentifier/burn`, `src/apps/secret/routes/receipt.ts:101` |
| 79 | Burning is possible after the secret has been viewed. | refuted | both burn guards require state `new` or `previewed`, `secret_state_management.rb:137,142` and `deprecated_fields.rb:220-222` |

## 9. Organization membership model - roles

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| 80 | Membership is its own record joining an organization and a customer; it holds the role, status, and invitation data. | verified | `lib/onetime/models/organization_membership.rb:8-20,136-180` |
| 81 | The three organization roles are `owner`, `admin`, `member`, and they nest: owner ⊇ admin ⊇ member. | verified | `lib/onetime/models/organization_membership.rb:102-106`; predicates `:236-247` (`admin?` is true for owner; `member?` is true for admin) |
| 82 | `owner` is the only role that can manage billing, SSO, IP rules, workspace branding, and org-level settings. | verified | `OWNER_ENTITLEMENTS`, `lib/onetime/models/organization_membership.rb:90-100`: `ip_access_rules`, `workspace_branding`, `custom_mail_sender`, `flexible_from_domain`, `custom_signin_config`, `custom_signup_validation`, `manage_sso`, `manage_org`, `manage_billing` |
| 83 | `admin` adds member management, custom domains, homepage/incoming secrets, branding, privacy defaults, and audit logs. | verified | `ADMIN_ENTITLEMENTS`, `lib/onetime/models/organization_membership.rb:80-88` |
| 84 | `member` covers core usage: create secrets, view receipts, API access, extended expiration, notifications. | verified | `MEMBER_ENTITLEMENTS`, `lib/onetime/models/organization_membership.rb:72-78` |
| 85 | Role names are displayed as Owner / Admin / Member with one-line descriptions. | verified | `locales/content/en/workspace-organizations.json` → `web.organizations.members.roles.{owner,admin,member}` and `.role_descriptions.*` ("Full access to all organization settings and members" / "Can manage members and most organization settings" / "Basic access to organization resources") |
| 86 | The role change endpoint accepts only `member` and `admin`; you cannot promote to owner or change an owner's role there. | verified | `apps/api/organizations/logic/members/update_member_role.rb:29` (`VALID_ROLES = %w[member admin]`), `:154-192` (`cannot_change_owner_role`, `cannot_promote_to_owner`) |
| 87 | Changing a member's role requires the `manage_org` entitlement, i.e. owner-level. | verified | `apps/api/organizations/logic/members/update_member_role.rb:44` |
| 88 | Ownership transfer exists, but only as an operator action - there is no end-user transfer endpoint. | verified | op `lib/onetime/operations/org/transfer_ownership.rb`; adapters are `bin/ots org transfer-ownership` (`lib/onetime/cli/org/transfer_ownership_command.rb:103`) and the colonel route `POST /api/colonel/organizations/:org_id/transfer-ownership … role=colonel`, `apps/api/colonel/routes.txt:74`. `apps/api/organizations/routes.txt` has no transfer route. |
| 89 | The last remaining owner cannot be demoted. | verified | `lib/onetime/operations/memberships/set_role.rb:40-43,93-96` (`:last_owner` guardrail via `sole_owner?`) |
| 90 | An owner cannot be removed from the org, and nobody can remove themselves through the member-removal endpoint. | verified | `apps/api/organizations/logic/members/remove_member.rb:160-175` |
| 91 | An admin can remove members but not other admins; a plain member can remove nobody. | verified | `apps/api/organizations/logic/members/remove_member.rb:187-205` |
| 92 | A colonel can remove any member except the owner. | verified | `apps/api/organizations/logic/members/remove_member.rb:177-178` (`return if cust.role?(:colonel)`, after the owner check) |
| 93 | Invitations are role-bearing: you invite someone as member or admin, never as owner. | verified | `apps/api/organizations/logic/invitations/create_invitation.rb:57-65` |
| 94 | An invitation expires 7 days after it is sent, and that window is a hardcoded constant, not configurable. | verified (structural) | `lib/onetime/models/organization_membership.rb:53` (`INVITATION_TTL_SECONDS = 7.days.to_i`), used at `:196` and `:208`; no config or env lookup |
| 95 | Accepting an invitation requires the accepting account's email to match the invited address. | verified | `lib/onetime/models/organization_membership.rb:327-334` (normalized comparison, defense-in-depth); primary check `apps/api/invite/logic/invites/accept_invite.rb:64-66` |
| 96 | Invitation statuses are pending, accepted, declined, expired. | partly verified - state the shipped subset | stored statuses are `active`/`pending`/`accepted`/`declined` (`lib/onetime/models/organization_membership.rb:148-149`, `:314-345`); `expired` is *derived* from `invited_at`, not stored (`:195-208`), and the frontend surfaces it as a display status (`src/types/organization.ts:94-99`, `:141-151`). `accepted` is unreachable today - see #97. |
| 97 | An invitation can land in "awaiting admin approval". | refuted for the shipped product | `Organization#requires_admin_approval?` is hardcoded `false`, `lib/onetime/models/organization.rb:126-132`; the branch is annotated unreachable at `lib/onetime/models/organization_membership.rb:344-348` |
| 98 | Invitations and member management are gated by the `manage_members` entitlement. | verified | `apps/api/organizations/logic/invitations/{create,resend,list,revoke}_invitation.rb` (`require_entitlement_in!(@organization, 'manage_members')`); frontend tab gate `src/apps/workspace/account/settings/OrganizationSettings.vue:662-665` |
| 99 | Listing members is gated by `manage_members`. | refuted | `apps/api/organizations/logic/members/list_members.rb:35` gates on `api_access`, not `manage_members` |
| 100 | Removing a member is gated by the `manage_members` entitlement. | refuted | `apps/api/organizations/logic/members/remove_member.rb:39-58` performs no `require_entitlement_in!`; it is a pure role check. Enforcement across member endpoints is uneven: invitations use `manage_members`, role change uses `manage_org`, list uses `api_access`, removal uses role only. |
| 101 | A membership records how it was provisioned, independent of role. | verified | `lib/onetime/models/organization_membership.rb:168-171` (`provisioning_source`, expected `'invited'`, `'sso'`, `'scim'` future, nil for self-created owner rows) |
| 102 | SSO sign-in on a domain can join a user to that domain's organization automatically, as a `member`. | verified | `apps/web/auth/operations/join_domain_organization.rb:80-91` (`role: 'member'`, `provisioning_source: 'sso'`, domain-scoped unless the SSO config grants org scope) |
| 103 | Invitation seats count against a member quota with both a per-role bucket and an aggregate cap; pending invitations occupy a seat. | verified (mechanism only - no numbers recorded) | `apps/api/organizations/logic/invitations/create_invitation.rb:144-171` (`role_owners_per_org` / `role_admins_per_org` / `role_members_per_org` plus `total_members_per_org`; counts include `pending_invitation_count`); UI mirror `src/apps/workspace/account/settings/OrganizationSettings.vue:667-690` |
| 104 | The UI calls quota units "members", not "seats". | verified | `locales/content/en/workspace-organizations.json` → `web.organizations.members.member_quota` = "{used} of {limit} members", `.limit_reached_hint` = "Member limit reached." |

## 10. The "plan AND role" rule

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| 105 | A member's effective permissions are the **intersection** of what the organization's plan grants and what their role template allows. A paid feature is still refused if the role does not carry it. | verified | `lib/onetime/models/organization_membership/features/with_materialized_entitlements.rb:13-18` (formula), computed at `:96-101` and `:238-249` |
| 106 | Equivalently: the membership can never exceed the organization's plan, and never exceed its role. | verified | same lines; comment at `:15-18` "The intersection ensures a membership never exceeds its org's plan, while ROLE_ENTITLEMENTS restricts which plan entitlements the role template permits" |
| 107 | Authorization reads the *membership*, not the organization. Checking the org alone would over-grant. | verified | `lib/onetime/logic/base.rb:199-201` ("Authorization checks use `auth_membership.can?`, not `auth_org.can?`. The membership is the single source of truth"); the check itself at `:272` |
| 108 | Per-member operator overrides are layered on afterwards: effective = (role∩plan) + grants − revokes. | verified | `with_materialized_entitlements.rb:115-140` (`apply_entitlements`) |
| 109 | Changing a role re-computes entitlements; setting the role field directly does not. | verified | `lib/onetime/models/organization_membership.rb:248-270` (`change_role!` is "the canonical way… direct assignment does not trigger re-materialization"); reinforced at `lib/onetime/operations/memberships/add.rb:22-25` |
| 110 | The whole chain fails closed: no org context, no membership, or an inactive membership all refuse. | verified | `lib/onetime/logic/base.rb:223-267` (three fail-closed branches, each raising `EntitlementRequired` with `context_unavailable`) |
| 111 | Anonymous callers are exempt from entitlement checks; a different mechanism gates them. | verified | `lib/onetime/logic/base.rb:218-222` ("Guest route gating (GuestRouteGating concern) handles access control for anonymous requests") |
| 112 | Secret Activity is the cleanest reader-facing example of "plan AND role" in one gate. | verified | `apps/api/organizations/logic/organizations/list_secret_activity.rb:81-85`: "Membership + plan gate in one: materialized entitlements are the org plan ∩ role grants, so this admits only admins/owners of orgs whose plan includes audit logs"; matching UI strings `locales/content/en/workspace-organizations.json:787-793` show the two refusals separately (upgrade prompt vs role notice) |

---

## Do not claim

1. **Do not claim any plan carries any entitlement.** The production `etc/billing.yaml` is not in this repo. `apps/web/billing/try/plan_helpers_try.rb` names plan ids (`@free_org`, `@identity_org`, `@multi_plan`, `@legacy_org`) and `locales/content/en/workspace-billing.json` contains upgrade strings that name plans - none of these are the billing catalog and none may be restated.

2. **Do not treat `etc/examples/billing.example.yaml` as evidence.** It is an example. `lib/onetime/models/organization_membership.rb:69` even says the role categories "mirror billing.example.yaml entitlement definitions" - that is a code comment about *shape*, not a statement about the shipped catalog.

3. **Do not restate `DEFAULT_FREE_TTL` (14 days) or `ANONYMOUS_MAX_TTL` (7 days) as hosted facts.** `lib/onetime/models/features/with_entitlements.rb:44-72` is explicit that `DEFAULT_FREE_TTL` "MUST match `free_v1.limits.secret_lifetime` in etc/billing.yaml" (a plan claim, gated) and that `ANONYMOUS_MAX_TTL` "is the shipped default, NOT an invariant", overridable via `site.secret_options.ttl_max_anonymous` / `TTL_MAX_ANONYMOUS`. Only `MAX_TTL` (365 days, `:43`) is a software bound.

4. **Do not use `FREE_TIER_ENTITLEMENTS` as the free plan's feature list.** `lib/onetime/models/organization/features/with_plan_entitlements.rb:58-70` is a *degraded-mode fallback* used "when billing is enabled but plan cache is empty", with a comment claiming it matches `free_v1`. Reading it as the free plan is exactly the inference the billing gate forbids, and the comment cannot be verified without `etc/billing.yaml`.

5. **Do not say "team" or "seat".** Neither is a modelled object. `team` survives only as a URL alias (`OrganizationSettings.vue:66`), and the quota UI says "members" (`web.organizations.members.member_quota`).

6. **Do not say "Security Events".** It exists nowhere in APP or MKTG; the only occurrence is the docs site's own `src/content/docs/en/team/audit-log.md:33`, describing an unshipped capability. If a page needs to distinguish the two shipped trails, use "Secret Activity" (org, end-user) and "Audit Log" (instance, colonel-only).

7. **Do not document `GET /api/organizations/:extid/audit-events`.** It matches no route. The shipped path is `/secret-activity` (`apps/api/organizations/routes.txt:20`). The `/audit-events` name survives only in `CHANGELOG.rst:57`.

8. **Do not equate "private link" with "receipt link" without a disambiguation.** The homepage tagline `web.homepage.tagline1` ("Paste a password, secret message or private link below.", `locales/content/en/secret-homepage.json:2-3`) uses "private link" to mean *content the user pastes in*. The receipt-page copy at `secret-manage.json:290-291` uses the same phrase to mean the receipt URL. A glossary entry that collapses the two will mislead.

9. **Do not say a colonel bypasses every entitlement check.** The bypass exists in `require_entitlement_in!` (`lib/onetime/logic/base.rb:309`) and not in `require_entitlement!` (`:214-284`). Some checks are also absolute by design: the canonical-domain overlap guard is placed ahead of entitlement checks specifically so a colonel cannot bypass it (`lib/onetime/models/custom_domain.rb:1082-1084`).

10. **Do not say `manage_teams`, `manage_orgs`, or "org-level admin approval" are features.** `manage_teams` is granted by no role template and checked by no server code (#43); `manage_orgs` exists only in the frontend constant (#44); `requires_admin_approval?` is hardcoded false (#97).

11. **Do not describe member-endpoint authorization as uniform.** It is not (#98-#100). If a page must summarise it, say "member management is limited to owners and admins" - which is true of every one of those endpoints in effect - and do not name a single entitlement as the gate for all of them.

12. **Do not state a CNAME target, proxy IP, or "cluster host" value.** Those are per-deployment (`lib/onetime/domain_validation/features.rb:128-140`) and strategy-dependent (`etc/defaults/config.defaults.yaml:734-747`). Say the app displays the exact record to create.

13. **Do not call "colonel" an internal-only word.** It is on-screen: the console lives at `/colonel/*` and the nav says "Colonels Only" (`locales/content/en/10-layout.json:211`). A glossary must define it, not hide it. But note it is a *self-hosted operator* concept - on the hosted service an end user never has it.

14. **Do not claim a per-org "audit retention period".** Retention is a count cap (`max_events`, default 10 000, floor 100), not a time window, and there is no TTL (`lib/onetime/models/organization/features/secret_activity.rb:22-45`; `etc/defaults/config.defaults.yaml:792`). Those numbers are self-hosted config defaults; the hosted value was not verifiable from this repo.
