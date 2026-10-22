# English source and cross-locale issues

Consolidated from the "English source and general issues" sections of the 16
locale reviews and the earlier `known-english-issues.md` list. Every item was
re-checked against the English page and, for behaviour and UI labels, the app
source.

- Docs: `i18n/latest-content` at b2883096 (review base d30489ac). English line
  numbers match the repo files.
- App: `onetimesecret` main at 145c1e7cfa (`$APP` below).
- Build: `dist/` from 2026-10-21 06:34. No English page, `config/`,
  `src/lib/`, `src/components/` or `vendor/` file changed after it, so the
  English build findings are current. Locale id counts predate the 08:39
  locale commits. `pnpm build` was not run.
- All 16 locales (bg da de es fr it ja ko mi nl pl pt-br sv tr uk zh-cn) have
  every page named in section 1.

Counts: 16 fixes, 7 decisions, 15 app-side, 11 governance, 3 tooling, 13 withdrawn.

## 1. Fix in English now

### E1. api/index.mdoc:61: passphrase described as the encryption key

- Current: "Add `"passphrase": "..."` to the `secret` object to require a
  passphrase on viewing. The passphrase is used to encrypt the value and is
  never stored in a recoverable form, so there is no way to retrieve a secret
  whose passphrase has been lost."
- Replace: "Add `"passphrase": "..."` to the `secret` object to require a
  passphrase on viewing. The passphrase is an access check, not the encryption
  key: the service stores only a one-way hash of it and checks it before
  decrypting the value. A lost passphrase cannot be recovered, so the secret can
  then be neither revealed nor burned; it is deleted when it expires."
- Evidence: `$APP/lib/onetime/models/receipt.rb:263-266` ("An access-control
  gate, not an encryption input … it does not participate in key
  derivation"); `lib/onetime/models/features/passphrase_hashing.rb:32-35`
  (argon2id hash); `lib/onetime/models/secret.rb:45` (`encrypted_field
  :ciphertext`, no passphrase input); `apps/api/v2/logic/secrets/reveal_secret.rb:86`
  and `burn_secret.rb:58-64` (passphrase verified before reveal or burn).
  share/index.md:75, share/why-secret-links.md:37-38 and
  share/what-recipients-see.md:82 are already correct; api/index.mdoc is the
  only English page that calls the passphrase an encryption input.
- Locales: yes, all 16 (each reproduces it at api/index.mdoc:60).

### E2. security/best-practices.md:16: "entire set … remains protected"

- Current: "This way, if one secret is compromised, the entire set of
  information remains protected."
- Replace: "This way, if one secret is compromised, the rest of the information
  remains protected."
- Evidence: the sentence contradicts itself; the compromised secret is exposed.
- Locales: yes. da and de already say "the rest"; the other 14 need the change.

### E3. share/index.md:28: empty submission and its error message

- Current: "An empty submission is rejected with *You did not provide anything
  to share.*"
- Replace: "**Create Link** stays unavailable until you enter some content."
- Evidence: both web forms disable the button and the Ctrl/Cmd+Enter shortcut
  when the content is empty or whitespace (`$APP/src/apps/secret/components/form/SecretForm.vue:161,584`,
  `src/apps/workspace/components/forms/WorkspaceSecretForm.vue:558`,
  `src/shared/components/ui/SplitButton.vue:38-42,124-128`). The quoted text is
  an English-only API error (`apps/api/v2/logic/secrets/conceal_secret.rb:28`,
  v1 `:18`); `web.COMMON.error_secret` is never rendered. Label:
  `web.LABELS.create_link_short` = "Create Link". This also retires the
  trailing-period item (da-2) and the es tú-form item (es-2).
- Locales: yes, all 16. Quote their `web.LABELS.create_link_short`.

### E4. self-hosting/index.md:31-33: "one generated secret"

- Current: "…brings up an instance on port 3000 with one generated secret."
- Replace: "…brings up an instance on port 3000 with a generated `SECRET`
  value."
- Evidence: en/install/docker.md:195-201 generates and passes `SECRET`, the
  root secret. mi translated it as a shared secret; es, fr, it, ja, pl and pt-br
  kept the ambiguity.
- Locales: yes, all 16.

### E5. custom-domains/setup-guide.md:12-13: "no fixed limit"

- Current: "Free includes one; Identity Plus and Team Plus have no fixed limit."
- Replace: "Free includes one; Identity Plus and Team Plus include unlimited
  custom domains."
- Evidence: catalog `limits.custom_domains: -1 # unlimited` (billing.yaml.txt:259,308,368);
  app `web.billing.features.unlimited_custom_domains` "Unlimited Custom Domains";
  custom-domains/index.md:28 and compare-plans.md:14 say "Unlimited".
  compare-plans.md:23 "No fixed limit" for members is a different, correct fact
  (member counts are not enforced); leave it.
- Locales: yes, all 16 (use the word their compare-plans page uses).

### E6. custom-domains/index.md:72-73: "both DNS records" has no antecedent

- Current: "Keep both DNS records in place, including the ownership TXT record
  after verification. If it is removed, the domain stops being served."
- Replace: "Keep the domain's ownership (TXT) and routing (CNAME or A) records in
  place after verification. If the TXT record is removed, the domain stops being
  served."
- Evidence: this page never introduces the two records; setup-guide.md:44-75
  does. setup-guide.md:64-66 confirms that losing the TXT record stops service.
- Locales: yes, all 16.

### E7. index.mdoc:12: "Setup" used as a verb

- Current: `text: Setup your custom domain`
- Replace: `text: Set up your custom domain`
- Locales: no. All 16 already render a verb.

### E8. pricing/index.md:77: link text names a page that does not exist

- Current: "[Self-Hosting Guide](/en/self-hosting/)"
- Replace: "[self-hosting overview](/en/self-hosting/)"
- Evidence: target title is "Self-Hosting Overview" (self-hosting/index.md:3).
- Locales: yes, all 16 (use their page title).

### E9. security/index.md:38 and security/data-protection.md:54: self-hosting links go to GitHub

- Current (index.md:38): "**[Self-Hosting](https://github.com/onetimesecret/onetimesecret)**
  — run Onetime Secret on your own infrastructure for full control."
- Replace: "**[Self-hosting](/en/self-hosting/)** — run Onetime Secret on your own
  infrastructure for full control."
- Current (data-protection.md:54): "[self-hosting](https://github.com/onetimesecret/onetimesecret)"
- Replace: "[self-hosting](/en/self-hosting/)"
- Locales: yes, link target only: `/<locale>/self-hosting/` (exists in all 16).

### E10. share/index.md:51-52: "Expires in …" cannot be quoted in verb-final languages

- Current: "On the form, the choices read **Expires in …**."
- Replace: "On the form, each choice reads like **Expires in 7 days**."
- Evidence: each option is `web.secrets.expiresIn` "Expires in {duration}"
  (`$APP/src/apps/secret/components/form/SecretForm.vue:427`); the 1-week
  default option renders "7 days" (`src/shared/composables/usePrivacyOptions.ts:53-74`,
  `lib/onetime/config.rb:59`). tr «{duration} içinde sona erer» puts the duration first.
- Locales: yes, all 16. Quote the localized pattern with the localized duration.

### E11. self-hosting/index.md:100-102: recovery step reads as contradictory

- Current: "If a transfer is interrupted inside that window, re-run the command:
  it is idempotent and demotes every other owner. `org doctor` marks that check
  `repairable: false` and will not fix it for you."
- Replace: "If a transfer is interrupted inside that window, re-run the transfer
  command, not `org doctor`. The transfer is idempotent and demotes every other
  owner; `org doctor` marks that check `repairable: false` and does not fix it."
- Evidence: `$APP/lib/onetime/cli/org/transfer_ownership_command.rb:30-32`
  ("RECOVERY IS TO RE-RUN THIS COMMAND, NOT THE DOCTOR"); `doctor_command.rb:396`.
- Locales: yes, all 16.

### E12. self-hosting/index.md:85: `extid` / `objid` undefined

- Current: "`ORG` is an organization extid or objid."
- Replace: "`ORG` is the organization's public ID (`extid`, the ID the CLI
  prints) or its internal ID (`objid`)."
- Evidence: `$APP/lib/onetime/cli/org/shared.rb:44` (lookup by extid, then
  objid) and `:57-59` (output shows the extid only, "never the objid").
- Locales: yes, all 16.

### E13. api/client-libraries.md:150: Java example uses an undefined variable (code block)

- Current: `.withSecretKey(shareResponse.getSecretKey())`
- Replace: `.withSecretKey(generateResponse.getSecretKey())`
- Evidence: upstream mpawlowski/onetime-java README uses `generateResponse`.
- Locales: copy the fence to all 16 (each has the same defect; checked).

### E14. api/client-libraries.md:169: shell comment in a C# block (code block)

- Current: `# You can use OneTimeSharp in any of your projects which are compatible with .NET (4.0+) or Mono (2.10.8+).`
- Replace: `// You can use OneTimeSharp in any of your projects which are compatible with .NET (4.0+) or Mono (2.10.8+).`
- Locales: copy to all 16 (same line in each; checked).

### E15. api/client-libraries.md:349-379: Bash fences (code blocks)

- :349 `autnentication` → `authentication`; :362 `# Share a secret (from stdin`
  → `# Share a secret (from stdin)`; :369 `mulit-line` → `multi-line`; :370
  `Somthing` → `Something`.
- :377-379, current:
  ```
  # Burn a secret:
  $ ots burn flsdlaun6hwczqu9utmc0vts5xj9xu1
  flsdlaun6hwczqu9utmc0vts5xj9xu1
  ```
  Replace:
  ```
  # Burn a secret, given its private metadata key:
  ./ots burn <key>
  ```
- Evidence: the removed lines duplicate the go-onetimesecret CLI output at
  :240-241. onetimesecret-bash `ots.bash:194-200,271` has a `burn` CLI action
  that takes the metadata key. The typos are inherited from the upstream README.
- Locales: copy both fences to all 16 (all four typos and the `ots burn` line
  are present in each; checked).

### E16. api/client-libraries.md: inconsistent library link text

- :36 "[GitHub page onetime-ruby]" → "[GitHub page - onetime-ruby]"
- :198 "[GitHub page - onetimesecret]" → "[GitHub page - go-onetimesecret]"
  (repo and table name, :21)
- :250 "[GitHub page]" → "[GitHub page - otsgo]"
- :307 "[GitHub page - OneTimeSecret-bash]" → "[GitHub page - onetimesecret-bash]"
- Locales: yes, link text only, all 16.

## 2. Needs a decision

### D1. Free vs Basic, and localized plan names (pricing/index.md:18-19, compare-plans.md:39-41)

The English sentences are true in English. In other languages the app shows
two names for the same plan:
- `web.billing.plans.free_plan` is localized in all 29 non-English bundles
  (it «Gratuito», mi «Kore Utu», tr «Ücretsiz») and is shown in the user-menu
  chip and no-plan fallbacks (`UserMenu.vue:688`, `OrganizationsSettings.vue:54`,
  `OrganizationSettings.vue:954,1980`, `BillingOverview.vue:62`).
- `getPlanLabel()` returns the hard-coded English `PLAN_LABELS.free_v1: 'Free'`
  (`src/types/billing.ts:90`) wherever the organization has a plan id. Same
  split for Early Supporter: localized `early_supporter_plan` on the legacy card
  (`OrganizationSettings.vue:1935`), English `PLAN_LABELS.identity`
  (`billing.ts:95`) elsewhere.
- The public pricing page takes the plan name from the billing API
  (`src/apps/secret/support/Pricing.vue:243`). The repo catalog names it
  "Free (<jurisdiction>)" (billing.yaml.txt:177), so "Basic" comes from the
  Stripe product and cannot be checked from either repo.

Options: (a) make "Free" an untranslated tier name like Identity Plus and drop
the localized `free_plan`; (b) treat "Free" as translatable and route
`getPlanLabel` through `free_plan` / `early_supporter_plan`; (c) leave it.
**Recommendation:** (b), plus rename the Stripe product from "Basic" to "Free".
Then delete the "Basic" sentences on both pages. Until then, locale pages use
their `free_plan` value and quote "Basic" in English. Add a "Free" row to
`translations/universal/brand-terms.md` ("translate; use
`web.billing.plans.free_plan`").

### D2. "API token" vs "API Key" (api/index.mdoc:40)

The settings page and nav say **API Key** (`$APP/src/apps/workspace/config/settings-navigation.ts:286`,
`account/settings/ApiSettings.vue:60`, `web.account.api_key`). The Basic-auth
hint and toasts say "API token" (`ApiSettings.vue:111` `web.settings.api.basic_auth_hint`,
`web.account.token_generated`). The docs define **API token** in
start/glossary.md:53 and also use it in account/close-your-account.md:78 and
install/verify.md:41, while security/best-practices.md:42-44 and brand-terms.md:83
say "API Keys".
Options: (a) docs use "API key" throughout; (b) keep "API token" and name the UI
section; (c) the app renames its section to "API token".
**Recommendation:** (a). api/index.mdoc:40 becomes "Use HTTP Basic
authentication. The username is your account email; the password is the API key
shown under **API Key** in your account settings." Also update glossary.md:53,
close-your-account.md:78 and install/verify.md:41. Leave the `APITOKEN` code
placeholder unchanged. See A6 for the app side. Locales: yes, all 16.

### D3. Per-domain sign-in naming (three wordings)

custom-domains/index.md:33 "Sign-in settings", pricing/index.md:36
"Per-domain sign-in settings", compare-plans.md:20 "Per-domain sign-in
configuration". App: `web.domains.signin.title` "Sign-In Configuration",
`web.domains.detail.signin_description` "Per-domain sign-in method
configuration". The target section is custom-domains/access-and-privacy.md:15
"## Sign-in settings".
**Recommendation:** use "sign-in configuration", which matches the app.
pricing/index.md:36 → "Per-domain sign-in configuration";
custom-domains/index.md:33 link text → "Sign-in configuration". Rename the
access-and-privacy.md H2 in its next edit and keep the old fragment working.
Locales: yes.

### D4. Flexible sender domain naming

pricing/index.md:52 "Flexible email From domain", compare-plans.md:36
"**flexible From domain**". App: `web.billing.features.flexible_from_domain`
"Flexible Email Sender Domain".
**Recommendation:** match the app: pricing/index.md:52 → "Flexible email
sender domain"; compare-plans.md:36 → "† Team Plus extends the custom email
sender with a **flexible email sender domain**: any domain, not just your custom
domain." Locales: yes.

### D5. setup-guide.md region table: literal IPs for EU/US only (:41-42, :77-85)

`dig` on 2026-10-21 shows that CA and NZ resolve to 37.16.6.131 and UK
(`identity.ingress`) resolves to the EU address 109.105.217.207. These look
like shared ingress addresses. :41-42 says "the examples below only show their
form", but the table lists real values.
Options: (a) keep the table and scope :41-42; (b) publish all five addresses;
(c) drop the A column.
**Recommendation:** (a). :41-42 → "Create both records in your DNS provider.
Copy the values from the domain's verification page; the host and value
examples in the next two sections show only their form." Locales: yes.

### D6. index.mdoc:45: "Configuration and upgrades" label on the overview page

- Current: "**[Configuration and upgrades](/en/self-hosting/)** —
  configuration, environment variables, and version upgrade guides."
- **Recommendation:** "**[Self-hosting overview](/en/self-hosting/)** —
  authentication mode, installation paths, upgrades, and operator-only tasks."
  This matches the target's title and contents (self-hosting/index.md:15-106).
  The alternative is to keep the label and point it at
  `/en/self-hosting/configuration/`. Locales: yes.

### D7. security/best-practices.md:62: client-side encryption filed under "Advanced self-hosted security"

The advice applies to every user, and "Encryption at Rest" misnames it.
**Recommendation:** remove item 5 from the self-hosted list and add it to the
secret-sharing list as "7. **Encrypt Before Sharing**: For highly sensitive
data, consider encrypting the content yourself before creating the secret, for
an additional layer of protection." Locales: yes.

## 3. App-side issues (app repo)

Filed as [onetimesecret#4847](https://github.com/onetimesecret/onetimesecret/issues/4847)
(2026-10-22, checked against app `main` at `ce2a691b3f`). The issue adds the en
logo aria-label (`click_to_upload_a_logo_with_recommendation`), the de and mi_NZ
expiry grammar, and the bg and zh wording splits, and supersedes the list below.

- **A1. Logo and favicon hints offer SVG in every non-English bundle.**
  `web.branding.logo_modal_hint`, `favicon_field_hint` and `favicon_modal_hint`
  list SVG in all 29 non-en bundles (bg da de es fr it ja ko mi nl pl pt_BR sv
  tr uk zh among them). en has dropped it ("PNG or JPG…", "ICO or PNG…"). The
  server rejects SVG (`apps/api/domains/logic/domains/update_domain_image.rb:16-18,117-118`)
  and the picker excludes it (`src/shared/components/modals/ImageUploadModal.vue:53`).
  Re-translate the three keys.
- **A2. Plan names hard-coded in English.** `PLAN_LABELS` (`src/types/billing.ts:87-96`)
  bypasses i18n, so Free and Identity Plus (Early Supporter) appear both
  localized and in English. See D1.
- **A3. Corner and font option names hard-coded in English.** `borderRadiusDisplayMap`
  and `fontDisplayMap` (`src/shared/utils/brand-helpers.ts:216-283`) are
  rendered at `SimpleBrandPanel.vue:84-86,262`. Add keys.
- **A4. The receipt page names one event two ways.** `StatusBadge` shows
  `web.STATUS.revealed` (`src/utils/status.ts:85`), while
  `TimelineDisplay.vue:146` shows `web.STATUS.received`. en: Revealed /
  Received; ja 表示済み / 受信済み; pl Wyświetlony / Odebrano. `status.ts:11-23`
  already marks `received` deprecated, so use `revealed` in the timeline.
- **A5. Reveal is split within locales.** `web.STATUS.revealed` /
  `web.COMMON.click_to_continue` vs `web.branding.delivery_*`: da Afsløret,
  afsløre / Visning; de Enthüllt / Anzeigen; ja 表示 / 閲覧; ko 공개 / 표시; pl
  Wyświetlony, wyświetlić / ujawniania; sv Avslöjad / visa, Visning; tr
  Gösterildi, Göstermek / Açığa çıkarma; uk Розкрито / показати; zh 已显示 / 点击查看.
  Pick one stem per locale in app governance; the docs glossaries follow (G2).
- **A6. API Key vs API token in en.** The section title is "API Key"; the hint
  and messages say token (`web.settings.api.basic_auth_hint`,
  `web.account.token_generated`, `web.account.keep_this_token_secure_it_provides_full_access_t`).
  Use one term (see D2).
- **A7. `web.STATUS.active` is reused for domains** (`src/shared/composables/useDomainStatus.ts:92`).
  The gender is wrong for "domain" in bg «Активна», uk «Активна» (feminine for
  тайна/таємниця; домейн/домен is masculine) and pl «Aktywny» (domena is
  feminine). The same applies to `inactive`. Add domain-specific status keys.
- **A8. "Custom domain" is split within bundles.** bg `web.domains.add.field_label`
  «Потребителски домейн» vs `custom_domain` / `TITLES.domains` «Персонализиран(и)»;
  uk `add.field_label` «Користувацький домен» vs «Власний домен / Власні домени».
  Settle together with G8.
- **A9. mi_NZ.** `web.COMMON.host` = «Kaiwhakahaere» (administrator) labels the
  DNS Host field; `web.domains.host_0`/`host_1` = «Kaiwhakahari» (misspelled).
  Logo is «Tohu» (`web.branding.logo`, `logo_modal_*`) but «moko» in
  `upload_logo` and `logo_controls`. `web.regions.jurisdictions.*.name` are
  English.
- **A10. bg SSO naming.** `web.domains.sso.title` «Единно влизане» vs
  `web.auth.connections.section_title` «Единично влизане (SSO)». Docs use «Единно».
- **A11. pt_BR.** `web.branding.upload_logo` «Enviar logo» and `logo_controls`
  «Controles do logo» vs «Logotipo» elsewhere; `web.billing.features.workspace_branding`
  and `overview.entitlements.workspace_branding` «Marca do Espaço de Trabalho»
  vs «Workspace» elsewhere.
- **A12. de `web.domains.detail.features` = «Features».** The heading is cited at
  branding.md:31. This loanword is acceptable; «Funktionen» would match the
  rest of the de app. Low priority.
- **A13. `web.billing.upgrade.needAuditLogs` is stale in en and every locale.**
  "Audit logs require Multi-Team plan or higher" names a plan that no longer
  exists, and no code references the key. Delete it.
- **A14. The empty-content API error is English-only.** `conceal_secret.rb`
  v1:18 and v2:28 raise a literal English string, and `web.COMMON.error_secret`
  is unused. Low priority: the web forms never send empty content (E3).
- **A15. Image size constant.** `update_domain_image.rb:19` sets
  `MAX_IMAGE_BYTES = 2 * 1024 * 1024 # 1 MB`. The client enforces 1 MB
  (`ImageUploadModal.vue:30`), which is what branding.md:22 documents. Fix the
  value or the comment.

## 4. Docs governance

- **G1. Shipped-string source (all locales).** Agents read UI strings from
  `/Users/d/Projects/run/onetimesecret-docker/locales/content/` (f9c2145dd,
  2026-07-11). That copy lacks `web.branding.tab_brand`, `replace_logo`,
  `corners`, `delivery_*` and `web.domains.add.*` for ja, ko, sv_SE, mi_NZ, bg
  and tr, all of which exist in `$APP`. Recheck every "kept English because
  unshipped" label in branding.md and setup-guide.md against `$APP` in all 16
  locales. Name `$APP/locales/content/<APP_LOCALE>/` in REVIEW_PROTOCOL.md and
  FIX_PROTOCOL.md.
- **G2. view/reveal glossary rows are stale.** Each glossary other than it
  has a template row (es «ver/mostrar», fr «consulter/afficher», da
  «vis/åben», uk «переглянути/показати», nl «bekijken/weergeven», pt-br
  «visualizar/exibir» and others) that contradicts the shipped reveal term. bg,
  da, de, fr, ko, pl, sv and tr also kept other languages' columns
  («ansehen/anzeigen | consulter/afficher»). Replace each row with two rows:
  open/preview and reveal. Use the locale's `web.STATUS.revealed` stem, after A5
  where the app is split.
- **G3. es register.** es `_language-notes.md:60-62,149` and app rule
  `rule.es-register-informal` (`$APP/generated/i18n/.resolved/es.json`) say tú,
  but the es docs pages use usted (41 usted markers, 0 tú across the tree).
  usted was the resolved choice for this re-sync. **Recommendation:** keep
  usted for docs and record a "docs register: usted" section in
  `_language-notes.md`. Quote UI strings verbatim.
- **G4. fr glossary.** The "email → courriel/e-mail" row (glossary.md:70)
  conflicts with the binding «e-mail»; use «e-mail». Row :97 is malformed
  (`| soumettre | einreichen | … | annuler | abréger |`). The scratchpad
  candidates in `prior/glossary-fr.md` conflict with `$APP` fr_FR and must be
  corrected before promotion: Previewed → «Aperçu», Delivery → «Distribution»,
  Domain/SSL Status → «État du domaine» / «État SSL», Upload logo → «Téléverser
  un logo», Font Family → «Police», Corners → «Coins». Option names stay
  English (A3).
- **G5. ko glossary corrupted.** From glossary.md:23 ("사용자 인터페이스 요소")
  the English and other-language columns were machine-translated into Korean,
  so the rows no longer align (:27-29). It also lists 사용자 정의 도메인 and 맞춤형
  브랜딩, which conflict with the app. Rebuild it from the English template and
  `$APP/locales/content/ko`; until then it is not a term lock.
- **G6. uk glossary and notes.** The glossary has no plan, workspace, receipt,
  region or self-hosting entries; view/reveal «переглянути/показати» conflicts
  with «розкрити / Розкрито». `_language-notes.md:39,93-95` cites files that
  no longer exist (`docs-overview.md`, `secret-links/index.md`,
  `translations/guide.md`).
- **G7. de vocabulary vs app.** For "secret", the de app uses «Nachricht» (277
  hits) against «Geheimnis» (6); the de docs glossary:14-15 binds Geheimnis for
  the record. "Secret Activity" is «Nachrichtenaktivität» in the app
  (`web.organizations.audit.title`). Plan is «Tarif» (about 118) against «Plan»
  (19); workspace is «Arbeitsbereich» (37) against «Workspace» (1).
  **Recommendation:** docs quote UI labels verbatim, including
  «Nachrichtenaktivität»; adopt «Tarif» and «Arbeitsbereich» in de prose; keep
  Geheimnis for the record noun in prose. Record this in de `_language-notes.md`.
- **G8. "Custom domain" in bg and uk.** The docs glossaries bind bg «потребителски
  домейн» and uk «користувацький домен»; both apps use these only in the
  add-domain field. **Recommendation:** adopt the app majority (bg
  «персонализиран домейн», uk «власний домен»), fix the one app key (A8), and
  update the glossaries and pages in the next re-sync.
- **G9. Corner and font option names.** Until A3 ships, locales should quote
  the English names the UI shows (Square, Rounded, Extra Rounded; Serif, Sans
  Serif, Monospace, System UI). de, es, fr, it, ja, ko (corners) and zh
  translated them.
- **G10. brand-terms.md** lists "Basic" but not "Free" (see D1).
- **G11. Translation coverage.** Locale pages link to `/en/` for pages absent
  from their trees (install/*, organizations/*, share/your-receipt,
  share/request-secret, start/send-your-first-secret,
  security/where-your-data-lives, security/our-principles,
  custom-domains/homepage-and-incoming, custom-domains/email-sender). This is
  expected; use it as the next-pages list, not as a defect.

## 5. Tooling / build

### T1. Heading ids keep U+E0101 marks (real bug, `src/lib/textprov/html.mjs`)

- Scale: `dist/` (06:34) has 224 ids containing U+E0101 on 142 pages, 10-18 per
  locale. en examples: `questions-or-need-support<M>`,
  `set-color<M>-corners-and-font`, `ownership-record-txt<M>`,
  `routing-record-cname-or-a<M>`, `<M>incorrect-passphrase<M>`, `<M>oops<M>-404<M>`.
- Live breakage: en/share/what-recipients-see.md:80 links to
  `/en/share/when-a-link-doesnt-work#incorrect-passphrase`, but the built id is
  `\u{E0101}incorrect-passphrase\u{E0101}`. The link does not reach its heading.
  In-page TOC links get the same residue, so they still work.
- Mechanism (reproduced with node): every grapheme in an enrolled source is
  followed by U+E0101. github-slugger 2.0.0 (`index.js:76`) deletes punctuation
  such as `?`, `,`, `(`, `)` and `"` but keeps the following selector. That
  selector joins the previous cluster (`t` + U+E0101 + U+E0101). `clean()`
  (`html.mjs:46`) strips one selector per cluster through `textprov.runs`, so
  one survives in `id` (`:83`, `:131`) and `href="#…"`. Text nodes fail the
  build on residual markers (`:101`); attributes have no such check, so the
  build passes silently. Test: "Questions or need support?" →
  `questions-or-need-support\u{E0101}`.
- Fix: in `renderProvenance`, after `clean()`, strip residual
  `textprov.mapping.selectors.ai` from `id`, fragment and id-reference values on
  enrolled pages. Then fail when any id still matches `candidate`. Add
  html.test.ts cases for headings with `?`, `,`, `(TXT)` and quotes (the current
  tests use only `ai('heading')`). Cost: a real U+E0101 ideographic variation
  sequence in a CJK heading would lose it in the id only; the visible text is
  unchanged. The upstream alternative is for `textprov.runs({strip:true})` to
  drop consecutive selectors.

### T2. Inert `sidebar: order:` frontmatter

`config/sidebar.mjs:222-228` sets the order explicitly and nothing is
autogenerated, so these keys have no effect.
- `order: 1` on self-hosting/index.md in all 16 locales.
- `order: 4` on self-hosting/configuration.md and `order: 5` on
  self-hosting/environment-variables.md in da, mi, pt-br, sv, tr, uk and zh-cn.
- English also has it on self-hosting/environment-variables.md (`order: 4`)
  and the upgrading-v0-* pages.

Remove them in one cleanup commit (frontmatter, outside TextProv scope).

### T3. Sidebar bundles (`src/content/i18n/<loc>.json`), all 16 locales

- Every bundle lacks 56 of the 78 keys `config/sidebar.mjs` requests, including
  the seven used by re-synced pages: `sharingSecrets`, `shareASecret`,
  `whatCustomDomainsDo`, `plansAndPricing`, `aboutSelfHosting`, `apiAndSdks`
  and `ourApproachToSecurity`. Those entries render in English.
- Existing labels are out of date. `brandGuide` still means "brand guide" in
  all 16, while en is "Branding". `setupGuide` reads "installation guide" in fr,
  it, nl and sv. Self-hosting labels differ from page terms in bg, de, es, ko,
  nl, pl, sv and uk. The region labels differ in ja, zh-cn and mi.
- Style defects: English-style Title Case in da, es, it and pt-br; nl uses the
  forbidden «geheim» (`whyUseSecretLinks`, legacy `createSecrets`,
  `retrieveSecrets`); fr lacks NBSP in `page.lastUpdated` «Dernière mise à
  jour:», `expressiveCode.copyButtonCopied` «Copié!» and
  `pagefind.search_suggestion`.
- Action: one sidebar re-sync per locale that takes labels from the re-synced
  page titles. `check:locales` does not compare bundle keys, so add a key-parity
  report if gaps should stay visible.

**Resolution (2026-10-22, sidebar pass).** Every key in `en.json` now exists in
all 16 bundles (54 to 63 keys added per locale, one commit per locale, terms
taken from the shipped app strings and this week's review decisions). The uk
and de self-hosting nav labels were aligned with the page titles. Existing
labels and the style defects above were not revisited. Term choices worth a
human look:

- The audit-trail page label follows the app page title (`web.organizations.audit.title`),
  not the billing entitlement («Audit Trail» / «Audit Logs») in every locale.
- bg: «потребителски домейни» kept (docs and glossary) against the app's
  «Персонализирани домейни»; «Табло» shortened from «Информационно табло».
- da: «Oversigt» now means both Dashboard and Overview; «Single sign-on (SSO)»
  left in English as the app does; «Tekstproveniens» for text provenance.
- de: «Geheimnis» (docs glossary) for the sharing labels where the app says
  «Nachricht»; «Pläne» where the app mostly says «Tarife»; du register.
- es: usted in the new labels; the bundle's older 404 strings are still tú.
  «llaves de acceso» for passkeys (the app splits llave/clave).
- fr: «Activité des secrets»; «Premiers pas» next to the legacy «Démarrage»;
  e-mail, not courriel.
- it: «Single Sign-On (SSO)» and «Self-hosting» kept in English (locked);
  «frase di sicurezza» for passphrase; tu register, sentence case.
- ja: サインイン (login page form) where the header says ログイン; 受信確認 for
  receipt; no space between Latin and kana, which the two newest API keys do use.
- ko: 수신확인 페이지 for receipt; «Simple 또는 Full 모드» keeps the config
  values; 멤버 per the unify decision while one app tab still says 구성원.
- mi: Title Case to match the bundle, where the newest page titles use
  sentence case; coinages without app precedent for configuration generator,
  text provenance, developer on-ramp and voice/tone; two-factor label is long.
- nl: «startpagina», «rechten» for permissions, «opvragen» for request.
- pl: «Reverse proxy» kept as a loan term; «Twoje» capitalised per the app.
- pt-br: «Seu recibo» follows the user-facing app, while the pt-br docs and admin
  strings say «comprovante»; flip the label if the receipt page uses comprovante.
- sv: «nycklar» for passkeys matches the app page title but is ambiguous;
  «lösenordsnycklar» is the safer alternative. «Inställningar» for preferences.
- tr: `hostingChoice` is a question («… mu, … mi?»); «Docker görüntüleri»
  rather than «imajları»; sentence case next to older Title Case entries.
- uk: «Уподобання» for preferences; «користувацькі домени» against the app's
  «Власні домени»; «ідентичності» is a literal rendering with no app term.
- zh-cn: 内容 (Tier 1) for secret in labels; 控制面板 per the app where the
  glossary says 仪表板; half-width «单点登录 (SSO)».

## 6. Withdrawn

- **sv-1 branding labels lack app keys.** Stale. `$APP` renders
  `web.branding.corners` "Corners" (`SimpleBrandPanel.vue:218`) and
  `delivery_reveal_instructions` / `delivery_before_reveal` / `delivery_after_reveal`
  (`DeliveryPanel.vue:73,81,96`), and has `tab_brand`, `tab_delivery`,
  `replace_logo`, `logo_modal_*`, `remove_logo` and `refresh_favicon` in every
  reviewed locale. The English page matches the app; the gap existed only in
  the docker bundle (G1).
- **pl-2 "Revealed" maps to `web.STATUS.received`.** Wrong. The receipt badge
  and lists use `web.STATUS.revealed` (`SecretReceiptTableItem.vue:152`,
  `status.ts:85`). The separate timeline label is A4.
- **it-1 branding.md SVG statement conflicts with the app.** The docs are
  correct (JPEG/PNG/GIF/WebP/BMP/TIFF, 1 MB, no SVG: `update_domain_image.rb:16-18`,
  `ImageUploadModal.vue:30,53`), and the en hint no longer offers SVG. The
  remaining conflict is the locale hints (A1).
- **bg `favicon_modal_hint` = «Favicon».** Not true at `$APP`; the bg value is
  the full hint (it still lists SVG, see A1). This came from the docker bundle.
- **es-1 `--yes (also -y and -f)`.** Correct: `transfer_ownership_command.rb:73`
  `aliases: ['-y', '-f']`.
- **es-1 audit date vs Ruby "last commit 2026-06".** Not a conflict: a July
  audit recorded a June commit.
- **fr-1/es-1 escaped underscore in "py\_onetimesecret".** It renders the same
  as `_`; no change needed. The real link-text problems are E16.
- **sv-2 "Preferences" link (share/index.md:121).** Correct. The link text is the
  docs page title, and en/account/preferences.md:20,53 documents the setting
  under Settings → Profile → Notifications.
- **da-2 data-protection.md lacks `textprov: true` and `sourceOfTruth`.** None
  of the four security/ pages, api/index.mdoc or client-libraries.md has them.
  The tool adds `textprov: true` when an agent edits a page; this is not a
  translation defect.
- **sv-1 "container images" vs "Docker image" (best-practices.md:50,54).** Both
  are accurate: the Lite image is a Docker image. No change.
- **nl-2 "$0/month" has no currency hook.** Zero needs no conversion; locales
  may format it by local convention («0 $», «$0/mês»).
- **de-2/fr-2/mi change-your-region.md:79 unwrapped line.** Source formatting
  only; the rendered paragraph is identical.
- **zh-cn-2 `needAuditLogs` names a "多团队" plan.** The finding is real but not
  limited to zh: the en source says "Multi-Team" and the key is unused (A13).

Items merged elsewhere: Free/Basic and Early Supporter (it, mi, tr, fr-2) → D1;
API token (de, es, ko, nl, pt-br, sv, tr, uk) → D2; sign-in naming (nl) → D3;
flexible From domain (pt-br) → D4; region table (nl-2, mi-2) → D5;
"Configuration and upgrades" (pt-br-2) → D6; Encryption at Rest (da-1) → D7;
empty-submission period and tú form (da-2, es-2) → E3; "no fixed limit" (sv-2) → E5;
"Keep both DNS records" (da-1) → E6; "Expires in …" (tr, zh-cn) → E10;
idempotent vs `repairable: false` (nl-1) → E11; `extid`/`objid` (mi-2) → E12;
client-libraries code and link items (de-1, es-1, fr-1, it-1, pl-1, sv-2,
zh-cn-2) → E13-E16; Secret Activity label (de-2) → G7; hard-coded option labels
(nl-1) → A3 and G9; self-hosting links to GitHub (zh-cn) → E9; heading ids (da,
ko) → T1; `sidebar: order:` (da, es, nl, sv) → T2; sidebar bundles (all) → T3.
