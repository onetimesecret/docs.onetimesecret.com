# English documentation content walkthrough

Review date: 2026-10-20 (America/Vancouver). Target: https://docs.onetime.dev, starting at `/en/start` and following sidebar order. This is an issue ledger for discussion; published content has not been edited.

The largest problems are conflicting descriptions of security behavior, plan availability, and account controls. Tone also changes sharply between older promotional pages and newer pages that explain implementation details at length. Resolve behavior and availability first, then simplify the wording around the agreed facts.

## How to use the ledger

The tables below preserve the original walkthrough observations. F001–F010 are **addressed** on `wip/docs-content-review`. Sharing secrets findings F011–F033 are also resolved: 22 addressed and F015 rejected with source evidence. Accounts findings F034–F048 are addressed. See the implementation records at the end. Other candidate findings remain **open**. An entry records a problem to consider, not approval of its suggested correction. Resolve each ID as addressed, rejected with evidence, or deferred with a reason. No application changes are implied.

- **H**: prioritize because the text affects security expectations, access, data loss, or purchase/setup decisions.
- **M**: task completion, navigation, ordering, or terminology problem.
- **L**: editorial issue, including phrasing preferences explicitly requested for this review.
- **Contradiction**: conflicting passages were observed; this alone does not establish which describes deployed behavior.
- **Gap**: an instruction or necessary explanation is missing.
- **Verify**: an assertion needs authoritative product, deployment, or policy evidence before rewriting.
- **Editorial**: a proposed language or ordering improvement.

Links identify the live pages reviewed. The live development server and this worktree are not identical: Getting started already differed at initial inspection, then changed again on the server before the final revisit. Treat live quotations as a dated snapshot and recheck before editing. Source files normally mirror `/en/<path>` under `src/content/docs/en/`, with directory overview pages in `index.md` or `index.mdoc`. The configuration generator is a custom route.

## Start here

| ID | Priority and kind | Location and observed wording | Problem and proposed direction |
| --- | --- | --- | --- |
| F001 | L Editorial | [Getting started](https://docs.onetime.dev/en/start), Core functionality: “straightforward solution”, “extra security layer”, “enhanced transparency” | **Resolved on live site at final revisit:** the Core functionality block was removed. This review did not make that change. The original observation remains here as historical evidence; do not apply a second fix. The local worktree still contains the older block. |
| F002 | M Editorial | Getting started: “Evaluate”, “Use”, “Integrate”, “Operate”; “the core action, end to end”; terms “that get used loosely elsewhere” | **Partially resolved on live site at final revisit:** headings now read Share secrets, Evaluate Onetime Secret, Integrate with your code, and Run your own instance, with sharing first. The “core action” and “used loosely elsewhere” descriptions remain open. Replace the glossary description with “Definitions of receipt, passphrase, organization, and other product terms.” |
| F003 | M Editorial | [Glossary](https://docs.onetime.dev/en/start/glossary): “the ones that actually cause trouble”, “Most of the vocabulary trouble … starts here”, “gives up the content”, “mints” | A beginner reference sounds like an internal critique. Define terms neutrally with concrete verbs such as displays, generates, and deletes. Keep product naming inconsistencies as brief usage notes. |
| F004 | M Editorial | Glossary: API aliases, raw entitlement/usage fields, system-role hierarchy, storage details among everyday terms | The third page in the beginner sequence becomes an implementation reference. Put secret/link/receipt/passphrase/reveal/burn first; move legacy API and operator vocabulary into separate sections or references. |
| F005 | M Contradiction | Glossary, Delete: “Not a word you will meet as an end user”, immediately followed by examples in app copy and account closure | The definition contradicts itself. Explain when the app uses delete and when burn is the specific action. Avoid an absolute prohibition that its own examples disprove. |
| F006 | M Verify | Glossary: “Team — Not an object in this product”; [pricing comparison](https://docs.onetime.dev/en/pricing/compare-plans): “Teams & Shared Dashboard”; live [product pricing](https://onetimesecret.com/en/pricing): “Organizations with teams” | Decide whether team is marketing shorthand for an organization, an upcoming feature, or a separate concept. The glossary cannot direct readers to ignore a term the sales pages sell without explaining that relationship. |
| F007 | H Contradiction | [Hosted or self-hosted](https://docs.onetime.dev/en/start/hosted-or-self-hosted): Full mode requires “Redis plus PostgreSQL and RabbitMQ”; [mode guide](https://docs.onetime.dev/en/self-hosting/simple-or-full-auth): SQLite default, PostgreSQL optional, jobs independently enabled | Reconcile mode prerequisites. Separate authentication mode from the services included in the full Compose stack. |
| F008 | M Contradiction | Hosted comparison: hosted “Setup effort — Sign up”; Getting started and first-secret guide: no account needed | Distinguish anonymous sharing from account/team setup. The table overstates the entry requirement. |
| F009 | H Verify | Hosted comparison: “data-protection guarantees are the same”, “every secret … start to finish”, “license yourself” | Running the same application does not establish identical operational protections. Limit the comparison to application behavior, describe operator responsibilities, and clarify what licensing action is actually required. |
| F010 | L Editorial | Hosted comparison: “cascades into”, “how much of your day the software asks for”, “your users or your regulators”, “the line self-hosting exists to cross” | The metaphors obscure a straightforward decision. Use cost, maintenance effort, infrastructure control, and residency requirements directly. |

## Sharing secrets

| ID | Priority and kind | Location and observed wording | Problem and proposed direction |
| --- | --- | --- | --- |
| F011 | H Contradiction | [Sharing secrets](https://docs.onetime.dev/en/share), “Check that it worked”: “Opening it consumes the secret”; [recipient guide](https://docs.onetime.dev/en/share/what-recipients-see), opening paragraph: “opening it is what destroys it”; both later explain that loading alone does not consume it | Reserve **open/load** for the confirmation page and **reveal** for consuming the secret. Apply the distinction to receiving instructions, troubleshooting, and the live product homepage too. |
| F012 | H Contradiction | [First secret](https://docs.onetime.dev/en/start/send-your-first-secret), Sharing secrets, and recipient guide describe the creator warning with different qualifications | First secret correctly qualifies that signed-out creators are not identified; the other pages promise a warning unconditionally. Keep the warning conditional and distinguish visiting from revealing. |
| F013 | H Contradiction | Sharing secrets: Stay on page “costs you the password”; [Preferences](https://docs.onetime.dev/en/account/preferences): generation takes you to the receipt anyway | Determine behavior separately for homepage and signed-in form, then use the same scope on all three guides, including First secret. Do not instruct readers to disable a preference unnecessarily. |
| F014 | H Contradiction | Sharing secrets describes generated-password display conditions without its passphrase exclusion; [Your receipt](https://docs.onetime.dev/en/share/your-receipt) says a passphrase prevents receipt display entirely | Put the exclusion next to the initial generation instructions. Later warnings cannot repair the earlier expectation that every generated value is displayed once. |
| F015 | H Contradiction | First secret and Sharing secrets say server content limits are in bytes; [environment reference](https://docs.onetime.dev/en/self-hosting/environment-variables), `SECRET_MAX_LENGTH`, says characters | Check the actual enforcement per API/version and document the unit consistently. Preserve any separate byte limit only if a current source establishes it. |
| F016 | M Editorial | Sharing secrets opening: “from nothing to delivered”, “what it costs you”; “refused outright”, “mints”, “ceiling”, “budget” | Replace rhetorical framing with “Create a secret, choose its settings, and send the link.” Retain precise limitations without presenting every option as a penalty. |
| F017 | H Editorial | Sharing secrets: “pass the link on yourself if more than one person needs it” after explaining only the first email address receives it | Multiple people need separate secrets if each must reveal the content. Explain the difference between forwarding a single-use link and delivering a copy to each person. |
| F018 | M Editorial | Your receipt: “most expensive mistake available on this service”, “path is the tell”, “spend your one look”, “Once, full stop”, “escape hatch”, “Almost nothing is pushed at you” | The consequences matter, but the dramatic wording adds friction. Lead with which link to send, what the receipt shows, how to burn, and the generated-password exception. Use a heading such as “Email notifications”. |
| F019 | M Contradiction | Your receipt: “holds none of it”, “What it never contains is the content”; later generated-password exception | Place the exception beside absolute statements or describe the regular case as “It does not redisplay content you entered.” The current repeated absolutes force readers to reinterpret earlier sections. |
| F020 | H Verify | Recipient guide: “Exactly one person ever receives the content”; “The page in front of you holds the only copy”; use cases promise recipients cannot reshare | At most one successful retrieval does not establish a unique human recipient or prevent copying. Describe the server retrieval property and explicitly allow for recipients saving or sharing what they read. |
| F021 | H Contradiction | Recipient guide: “Open a link without an account and you stay unidentified. Open it signed in and you do not”; [Secret Activity](https://docs.onetime.dev/en/organizations/audit-trail): “Entries reference short IDs only” | Align privacy explanations. Separate actor identifiers, displayed labels, exports, and masked network information. Do not promise anonymity from the absence of sign-in alone. The activity page also needs the material detail currently buried on the recipient page. |
| F022 | M Editorial | [Troubleshooting](https://docs.onetime.dev/en/share/when-a-link-doesnt-work): “turn every link into an oracle”, “terminal states”, “internal error is raised” | Put screen message → next action first. Reduce the security-design explanation to why the page does not distinguish missing, revealed, burned, and expired secrets. |
| F023 | H Verify | Troubleshooting states a 30-minute lockout accepts no attempts, then says entering the correct passphrase clears it; recipient guide says the same more briefly | Clarify whether a correct passphrase can be tested during lockout or only afterwards. Current wording offers contradictory recovery expectations. Confirm deployed limiter behavior before choosing wording. |
| F024 | M Editorial | [Receiving secrets](https://docs.onetime.dev/en/share/receiving-secrets) means requesting a submission, whereas “What recipients see” means receiving a link | Rename the navigation entry toward “Request a secret” or “Collect secrets”. Keep the existing first-paragraph redirect for people who already received a link. |
| F025 | H Verify | Receiving secrets: incoming-form senders “can still see that it was delivered” | A receipt can show creation or reveal status without proving email delivery. Name the observable status rather than implying successful delivery. Compare the sharing guide's “sent, not received” warning. |
| F026 | H Contradiction | [Why use secret links](https://docs.onetime.dev/en/share/why-secret-links): “encrypted end-to-end”; [Data protection](https://docs.onetime.dev/en/security/data-protection): TLS and encryption at rest | Use a source-backed description of the encryption boundary. TLS plus encrypted storage must not silently become a promise of end-to-end encryption. The same phrase appears as a translation-guide example. |
| F027 | H Contradiction | Why use secret links: “leaving no digital footprint”, “assurance that it won’t fall into the wrong hands”; receipt and activity pages describe retained records and bearer-link access | Replace guarantees with the concrete reduction in persistent secret copies. Account for receipts, activity, backups, and recipient copies. |
| F028 | M Verify | Why use secret links: “premium users” for reveal notifications and “business users” for audit trails | Use current plan names only where an entitlement is verified. Preferences explains reveal notifications without the premium restriction. |
| F029 | L Editorial | Why use secret links: “In today’s digital age”, “robust solution”, “unique blend”, “peace of mind”, “cutting-edge”, “unparalleled”; repetitive six-part benefits list | Replace the promotional essay with a concise explanation of why sharing a temporary link differs from pasting the secret into a persistent conversation. Use sentence-case “secret links”. |
| F030 | H Contradiction | [Use cases](https://docs.onetime.dev/en/share/use-cases), recovery codes: “securely store your backup/recovery codes using a secret link”; [2FA guide](https://docs.onetime.dev/en/account/two-factor-and-passkeys): “Not in Onetime Secret” | Remove the backup-storage recommendation. A valid use case could be delivering recovery codes to someone who then stores them durably. |
| F031 | H Verify | Use cases: license keys “can’t be … reused or shared”; interview assignments “can’t share the exact requirements”; payment/Wi-Fi examples imply lasting account protection | Limit the benefit to retrieving the hosted copy once and reducing exposure in message history. The service does not control use of a copied credential or document. |
| F032 | H Verify | Use cases, anonymous tips: “Limited log retention … about 2 weeks”; product [Terms](https://onetimesecret.com/terms) source says IP retention maximum 30 days | Establish which logs, operators, and periods are meant. Avoid turning an unscoped operational estimate into an anonymity assurance. This is a policy/deployment check, not a conclusion about current retention. |
| F033 | M Editorial | Use cases: repeated “Benefit” paragraphs, “Basic Password Sharing at work”, “Netflix and WiFi Passwords”; anonymity advice after “Summary” | Use consistent sentence-case, task-oriented examples. Move caveats with their examples and put any summary after substantive content. Prefer durable generic examples over a specific streaming brand. |

## Accounts

| ID | Priority and kind | Location and observed wording | Problem and proposed direction |
| --- | --- | --- | --- |
| F034 | H Contradiction | [Sessions](https://docs.onetime.dev/en/account/sessions-and-identities): Remove clears only entries and last activity moves only on that page; [v0.26.12 guide](https://docs.onetime.dev/en/self-hosting/upgrading-v0-26-12): next-request revocation and periodic last-use updates | The account guide describes the historical defect as current behavior. Current local app source at `145c1e7cfa`, `lib/onetime/session/active_session_gate.rb`, also describes enforcement through the active-session row. Rewrite against the deployed version and feature flag; do not leave users believing session controls are ineffective everywhere. No live revocation test was performed. |
| F035 | M Contradiction | [Signing in](https://docs.onetime.dev/en/account/signing-in) says session windows are “set out” on Sessions; Sessions describes the rolling window and links to configuration but omits the fixed maximum | State the user-facing expiry rules and deployment variability together. The upgrade guides and environment reference discuss 14-day remembered and 30-day absolute deadlines, which the account guide needs to reconcile. |
| F036 | M Editorial | Signing in: “handful of reasons”, “Four consequences”, detailed reset email anatomy, enumeration rationale, database cleanup explanation | Start with sign-in and password-reset steps, then common failures. Move implementation explanations below the action path and avoid counting sections unless the count helps. |
| F037 | M Contradiction | Signing in says existing-email SSO users must connect from Settings; Sessions describes a main-service proof-and-link flow at sign-in, with refusal limited to custom domains | Give the actual alternatives with their host scope. “Not automatically linked” does not mean “cannot link during sign-in after proving ownership”. |
| F038 | M Editorial | 2FA guide: “not enough to be careless with”, “Blunt version”, “single point of failure with extra steps”, “escape” | Remove admonishments and idioms from account-recovery instructions. Say where to save codes and what to do when a device is lost. |
| F039 | M Editorial | [Dashboard](https://docs.onetime.dev/en/account/dashboard-and-recent-secrets): “Where your account has…”, “that is easy to mistake for recovery”, “the exception in the other direction”, “the entry is there, and then it is not” | Lead with where to find receipts and which actions are available. Explain two lists and expiry once, without anticipating misconceptions in every paragraph. |
| F040 | H Contradiction | Preferences: each access is written to “the secret’s receipt along with a partial IP address … and … account”; recipient guide says that context belongs to organization activity, beyond the receipt | Correct the storage/display destination and link to the activity guide. Otherwise users look for identity and network details on a receipt that the other guide says cannot show them. |
| F041 | M Editorial | Preferences: “That is the whole list”, “things that turn out not to be settings”, “These come up often. None of them exists.” | A reference can describe available controls without sounding argumentative. Label account preferences, browser preferences, and related account settings; avoid unsupported assertions about what people commonly seek. |
| F042 | H Contradiction | [Organizations](https://docs.onetime.dev/en/organizations) says organization roles do not govern personal sign-in settings; [email change](https://docs.onetime.dev/en/account/change-your-email) and [closure](https://docs.onetime.dev/en/account/close-your-account) say those personal actions are hidden from members | Verify the actual restriction and its scope. The conceptual claim and procedural prerequisites cannot both stand unqualified. If this is a UI defect, document the workaround without presenting it as the intended authorization model. |
| F043 | M Editorial | Email change has consequences, unaffected data, stranded invitations, then prerequisites and steps | Move eligibility/password/new-inbox prerequisites ahead of the long consequence inventory. Retain sign-out and pending-invitation warnings next to the relevant step. Replace “lands”, “strands”, and “in flight” with completes, invalidates, and pending. |
| F044 | M Contradiction | Email-change page says there is “no undo” but explains reversing the process; closure calls email change “the other irreversible account change” | Distinguish “no undo button” from irreversible. An address change can be reversed through another confirmed change when both addresses remain available. |
| F045 | H Contradiction | [Region change](https://docs.onetime.dev/en/account/change-your-region): subscription recognition is automatic for same-email accounts; [subscription guide](https://docs.onetime.dev/en/billing/managing-your-subscription): ask support rather than assume; billing says organization owns subscription | Define how cross-region recognition maps to organizations and owners, including invitations/multiple organizations. Do not promise subscription portability based only on an account email without verifying the current federation rule. |
| F046 | M Editorial | Region change: “good news”, “about two minutes”, “That’s it”; Paid Accounts names only Identity Plus; fixed 30-day custom-domain wait | Remove timing reassurance that excludes domain work and verification. Cover Team Plus, and define the wait from the last secret created on the old domain rather than merely waiting 30 days from an unspecified event. |
| F047 | H Verify | Closure promises permanent deletion/no recreation, then describes SSO creating a fresh sign-in attached to a retained closed customer; retained email reservation may outlast 365-day record expiry | Separate verified cleanup behavior from known defects and policy. Explain the user consequence plainly. Confirm retention and reuse rules with the product/privacy owners before presenting the implementation anomaly as normal behavior. |
| F048 | H Editorial | Closure: SSO-only service means “the provider owns the account” | An identity provider supplying authentication does not by itself establish ownership of the Onetime Secret account. State which management controls are unavailable and who can help. |

## Organizations and billing

| ID | Priority and kind | Location and observed wording | Problem and proposed direction |
| --- | --- | --- | --- |
| F049 | M Gap | [Inviting members](https://docs.onetime.dev/en/organizations/inviting-members) explains benefits and plans but provides no invitation procedure | Add role selection, invite action, acceptance requirements, pending status, cancellation/resend/removal, and verification as supported by the app. It currently does not enable the task named by its title. |
| F050 | M Verify | [Ownership](https://docs.onetime.dev/en/organizations/ownership-and-transfer): transfer has “a command-line and an administrative interface”; [self-hosting](https://docs.onetime.dev/en/self-hosting): CLI is the only surface | Name the actual supported transfer mechanism in both places. Distinguish an operator console from an organization-owner UI. |
| F051 | M Editorial | Ownership: “deliberately hard to change”, “That is by design, not an oversight”; roles page: “two halves”, “intersection of two sets”, “Authorization is always read from your membership” | Explain who can do what, and how to request a transfer. The implementation defense and set-theory framing add length to simple role/plan rules. Keep the useful permissions table. |
| F052 | H Gap | [SSO](https://docs.onetime.dev/en/organizations/sso): generic “Exchange the connection details”, “Map identities”, gateway discussion, then interactive demos | Provide a real organization setup path: prerequisites, supported protocol/provider choices, fields/callbacks, test, rollout/recovery. Separate per-domain organization SSO from installation-wide SSO and gateway examples. The page currently routes readers into architecture instead of completing setup. |
| F053 | H Verify | SSO: “account lifecycle stay centralized”, “deprovisioning” | State the actual effect of IdP removal on existing sessions, identities, and organization membership. Sessions says removing an identity does not end existing sessions. Do not equate authentication integration with lifecycle provisioning. |
| F054 | M Contradiction | Sidebar “Audit log”; H1 “Secret Activity (audit log)”; glossary distinguishes “audit logs” from operator “Audit Log” | Use Secret Activity as the primary navigation and page name, retaining the sold feature label as an alias. Explain the separate operator log without relying on capitalization to distinguish products. |
| F055 | H Verify | Secret Activity: “who opened my link?”; “Secret burned — The creator destroyed”; earlier sharing pages allow anyone with receipt/passphrase to burn | Distinguish recorded actor attribution from proof of the intended recipient. An event type should not identify its actor as the creator unless the record establishes that. |
| F056 | M Gap | [Managing subscription](https://docs.onetime.dev/en/billing/managing-your-subscription) names Subscription tab and consequences but no change/cancel/payment procedure | Add the supported actions, billing-portal handoff, effective dates, and downgrade effects. Readers cannot manage the subscription from this explanation alone. |
| F057 | H Contradiction | [Docs pricing](https://docs.onetime.dev/en/pricing) calls free plan Free; live [pricing](https://onetimesecret.com/en/pricing) calls it Basic; [custom-domain overview](https://docs.onetime.dev/en/custom-domains) uses Identity | Establish canonical names and aliases. Do not silently rename historical API identifiers or third-party libraries. |
| F058 | H Contradiction | Docs comparison: Identity Plus “Up to 50” and Team Plus “Up to 100”; live pricing: “Invite unlimited members” | Verify entitlements and any growth-acknowledgment policy. Resolve public commercial promises together; do not infer the fix from either page alone. |
| F059 | H Contradiction | Docs comparison “Coming Soon — Audit logs and IP-based access rules”; Secret Activity says shipped v0.26.0; live pricing says audit trail Beta | Track availability separately from beta status. Split shipped/beta/planned entries instead of grouping unrelated features under one future heading. |
| F060 | M Contradiction | Docs comparison lists Workspace Branding as available; live pricing marks it Coming Soon; comparison also advertises future “Secretary Links” while Incoming Secrets is included | Verify feature identity and availability. Explain whether Secretary Links is distinct from incoming forms or remove the obsolete alternate name. |
| F061 | M Verify | Docs pricing: “SimpleStack℠ guarantee”, “unlimited sharing capacity”, “Full API access” versus Free “API access” | Define concrete limits/guarantees or remove vague qualifiers. A trademark-like promise without a definition and two unexplained API labels are unsuitable for a plan reference. |

## Custom domains

| ID | Priority and kind | Location and observed wording | Problem and proposed direction |
| --- | --- | --- | --- |
| F062 | H Contradiction | Domain overview calls custom domains a paid Identity feature; docs comparison and live pricing include one domain free | Separate domain allowance from paid branding and other domain controls. Update both the upgrade pitch and Important Considerations. |
| F063 | H Verify | Domain overview: “ensuring data locality compliance”, “only accessible to the intended recipient”, “automated rotation ensures … credentials cannot be reused”, “meeting compliance requirements” | A custom hostname does not establish compliance, recipient authentication, or credential rotation. Replace these with verified domain/branding behavior; qualify any workflow-specific controls. |
| F064 | M Editorial | Domain overview repeats Key Benefits, empty How It Works heading, Your Brand Our Security pitch, setup path, Getting Started, branding, five long use cases | Reduce to purpose, example link, prerequisites/availability, setup route, and related settings. Put procedures and examples on their existing destination pages. Empty headings should be removed or completed. |
| F065 | M Contradiction | Overview: Account Settings > Custom Domains; [setup](https://docs.onetime.dev/en/custom-domains/setup-guide): Dashboard > Custom Domains; organization/roles pages put domains under organizations | Verify the real navigation path and use it consistently, with organization context before DNS steps. Avoid “or equivalent button” in a product-specific procedure. |
| F066 | H Contradiction | Setup says SSL “may already be issued … domain may appear to work” before TXT verification; [DNS validation](https://docs.onetime.dev/en/custom-domains/dns-validation) says verification must finish before certificate issuance/serving, then repeats the earlier caveat | Separate ownership verification, routing, certificate issuance, and serving eligibility. Identify deployment/version exceptions so operators are not given mutually exclusive lifecycle diagrams. |
| F067 | M Verify | Setup: SSL renewal “typically about a year”; [branding](https://docs.onetime.dev/en/custom-domains/branding) and homepage settings: changes immediate but up to five minutes CDN delay | Source these timings and distinguish certificate expiry from renewal. Say whether settings are saved immediately while cached views update later. Do not retain unverified exact intervals as filler. |
| F068 | M Gap | Branding has an empty Upload logo section and vague “admin interface”; Email Sender is work in progress; Incoming Secrets says setup steps are not documented; Access and Privacy says controls “can include” broad behaviors | Replace placeholders with a finite task backlog: actual fields, defaults, allowed values, save/test steps, dependencies, and permission/plan prerequisites. A screenshot is optional; executable text instructions are the missing requirement. |
| F069 | M Contradiction | Branding says PNG/JPG only; [v0.26.15 guide](https://docs.onetime.dev/en/self-hosting/upgrading-v0-26-15) recommends PNG or WebP | Verify accepted upload types for the relevant screen/version and share the result across guides. |
| F070 | M Editorial | Links to the same pages use Homepage Secrets, Homepage and Incoming Secrets, Brand Guide, How Custom Domains Work, Custom Domains Overview, Email Sender; headings mix title and sentence case | Choose one descriptive page title and use it in navigation and cross-links. Preserve exact UI labels only when naming a control. “Branding your domain” is more task-specific than “Brand Guide”. |
| F071 | M Verify | Homepage/incoming page describes submitting “a document”; live About says text only; incoming overview says delivered to a configured recipients list | Clarify text versus file upload, and whether multiple recipients get independent secrets or compete for one reveal. Do not imply file support or multi-reader delivery through loose nouns. |

## Self-hosting and API

| ID | Priority and kind | Location and observed wording | Problem and proposed direction |
| --- | --- | --- | --- |
| F072 | H Contradiction | [Generator](https://docs.onetime.dev/en/self-hosting/configuration-generator) labels Full mode “adds PostgreSQL”; mode guide says SQLite default; [environment reference](https://docs.onetime.dev/en/self-hosting/environment-variables) also describes Full as PostgreSQL | Reconcile all mode descriptions, including generated help text and the default connection examples. Avoid teaching an unnecessary infrastructure requirement. |
| F073 | H Contradiction | Mode/service guides say worker and scheduler idle with jobs off; [v0.26.14](https://docs.onetime.dev/en/self-hosting/upgrading-v0-26-14) says neither `JOBS_ENABLED` nor `JOBS_SCHEDULER_ENABLED` stops the scheduler and domain refresh runs two minutes after start | Separate queue consumption from scheduled work. Verify which jobs run without a broker before instructing operators to omit services. |
| F074 | M Editorial | [Install with Docker](https://docs.onetime.dev/en/install/docker), Linux, service, proxy, verify pages repeatedly explain CI history, defective upstream examples, fail-fast syntax, source internals | Keep the useful operational facts but order each guide as prerequisites → commands → expected result → recovery. Move defect histories, test-lane rationale, and implementation mechanisms into notes after the working path. Current prose makes operators reconstruct the procedure from an investigation narrative. |
| F075 | H Gap | [Linux](https://docs.onetime.dev/en/install/linux) tells users to run installer with a password-protected datastore, then explains why it fails and instructs editing `.env` and rerunning | Make the anticipated first failure explicit before the command, or supply a verified preparation path that avoids it. A required error should not first be explained after a user encounters it. No installation commands were executed in this review. |
| F076 | H Contradiction | [Configuration](https://docs.onetime.dev/en/self-hosting/configuration) recommends copying `.env.example`; Linux warns copying it after installation discards generated secrets and permissions | Scope reference instructions to a fresh/manual setup, link to the installer workflow, and warn before any replacement instruction. The configuration reference should not undermine the installation guide. |
| F077 | H Contradiction | Configuration's session snippet explicitly sets `secure` false when `SSL` is false; [proxy guide](https://docs.onetime.dev/en/install/reverse-proxy-and-tls) says shipped config omits the key then falls back securely in production | Refresh the copied configuration against a pinned source version. This is a material behavior difference, not a spelling change. |
| F078 | M Contradiction | Configuration says its Redis logical-db map separates data; environment reference says those settings are informational and models use the URL database; copied branding defaults also differ from the newer neutral `BRAND_*` reference | Identify the reference version and replace stale copied sections. Do not present mutually incompatible configuration mechanisms as one current reference. |
| F079 | M Editorial | Environment reference is about 135,000 rendered characters; “all variables optional unless … required”, release-annotation exceptions and long internal issue histories | Add a short operator entry point, a version scope, topic index, and concise entries with default/required/effect. Keep canonical detailed source available separately. This review sampled sections and did not exhaustively fact-check every variable. |
| F080 | H Contradiction | Environment reference: root `SECRET` “only value needed for disaster recovery”; following entries label AUTH/ARGON2/ACCOUNT_ID secrets independent and require separate backups | Narrow root-secret recovery wording to values actually derived from it. List independent recovery requirements together so an operator does not discard necessary keys. |
| F081 | M Contradiction | [v0.26.6](https://docs.onetime.dev/en/self-hosting/upgrading-v0-26): filter mode without CIDRs first trusts all private peers, later “trusts nothing”; environment reference's `RABBITMQ_VERIFY_PEER` describes exact-true parsing while this guide describes shared boolean parsing | Correct each version-scoped statement against that release. Separate historical semantics from current defaults, particularly in reference pages reused by newer installs. |
| F082 | M Editorial | Upgrade guides: “two most recent … releases” in v0.26.6; v0.24 guide points v0.25 users backward to v0.24; v0.24 title but Docker image v0.24.5 | State exact source/target versions and prerequisites. Avoid “most recent” on a permanent release page and explain a deliberately selected patch tag. Do not judge historical prerequisites against current versions without checking the historical tag. |
| F083 | M Verify | v0.26.6 rollback uses an unexported `OTS_IMAGE_TAG=v0.26.4` on its own line; Docker install tells users to export it; diagnostic Caddy example places `header_up` directly in a `handle` block | Flag examples for version-specific command/config validation. The variable may not reach Compose in a fresh shell, and the Caddy directive placement needs checking. These examples were inspected, not executed. |
| F084 | H Contradiction | [API guide](https://docs.onetime.dev/en/api): “passphrase is used to encrypt the value”; glossary/sharing: access check, not encryption key; live [About](https://onetimesecret.com/en/about) also says key material | Reconcile API, public About, and user docs together. Local current Secret model at `145c1e7cfa` reveals the encrypted field independently of the supplied passphrase, consistent with the newer glossary, but deployed-version verification is still required. |
| F085 | M Contradiction | API says build on v2 and full reference is v1/v2; Getting started advertises v1/v2/v3; current app tree includes v3 | Explain public API stability and intended audience by version. Existence of v3 does not alone establish that third-party integrations should use it. |
| F086 | M Gap | API authentication example calls public `/status`; reveal/burn examples immediately after passphrase instructions omit the passphrase | Use an endpoint that demonstrates authentication and provide passphrase variants or qualify those examples as unprotected secrets. Otherwise a successful status request looks like proof of valid credentials. |
| F087 | M Gap | [Client libraries](https://docs.onetime.dev/en/api/client-libraries): Java declares `generateResponse` but retrieves via undefined `shareResponse`; official Ruby example uses legacy `/share` after recommending v2 | Fix the variable mismatch; lead with a verified current official-client example and label legacy examples clearly. No library examples were executed. |
| F088 | L Editorial | Client libraries: “GitHub page” links, “Go (lib)”, `autnentication`, `mulit-line`, `Somthing`, incomplete Bash comment; table order differs from section order | Use library names as links, align language/library order, and correct transcription errors without modifying library APIs. Keep last-audit dates rather than implying old activity snapshots are current. |

## Security and principles

| ID | Priority and kind | Location and observed wording | Problem and proposed direction |
| --- | --- | --- | --- |
| F089 | H Contradiction | [Principles](https://docs.onetime.dev/en/security/our-principles): “Zero-knowledge design. We can’t access your secrets”; live About says encryption happens “on our servers”; security overview promises transit/at-rest encryption | Replace the undefined zero-knowledge assertion with a technical description verified against the current system. Do not treat server deletion or missing credential context as proof that the service cannot access plaintext. |
| F090 | H Contradiction | Principles makes emergency backups an exception to permanent deletion; sharing/data-protection pages promise permanent destruction without discussing backup scope; Linux explains persistence and snapshots | Define deletion of the live record separately from backups and recipient copies. Put any material backup limitation in the data-protection reference and link to it where deletion is promised. |
| F091 | H Contradiction | Principles says only temporary secrets and minimum subscription information are collected; account/activity pages describe receipts, memos, identity records, sessions, authentication and organization activity, plus retained closed-customer records | Replace the incomplete inventory or explicitly scope it. Data protection should summarize categories and retention, linking to details, instead of only asserting minimization. |
| F092 | M Contradiction | Principles says language lives in browser storage; Preferences says signed-in language is saved to the account; principles starts from “since 2012” while live About says 2011 | Reconcile preference storage by sign-in state and establish which date means product start versus a later milestone. Avoid two unexplained origin dates. |
| F093 | H Editorial | [Where data lives](https://docs.onetime.dev/en/security/where-your-data-lives): choosing region “ensures … comply with any relevant data regulations”; provider profiles and legal summaries have no supporting links | Remove automatic-compliance assurances. Keep region/endpoint facts separate from legal context, with dated primary sources for any retained regulatory or provider assertions. This review does not determine legal compliance or revalidate provider certifications. |
| F094 | M Editorial | Where data lives repeats table facts in five profiles, repeats UK anycast note, adds unscheduled future countries; broad “no user data … shared” coexists with subscription federation | Lead with how to select a region and what is isolated; describe billing exceptions precisely. Move optional background below the task and verify roadmap statements before retaining them. |
| F095 | H Gap | [Best practices](https://docs.onetime.dev/en/security/best-practices) says secure channels for links and “metadata (like passphrases)” but omits the stronger different-channel rule; burn guidance omits the required passphrase | Use the same link/passphrase advice as First secret. State burn prerequisites next to incident response and distinguish burning a link from revoking a credential that has already been read. |
| F096 | M Verify | Best practices: per-use-case least-privilege API permissions, custom-domain compliance/auditing advantages, per-session ephemeral environments, Lite recommendation | Identify actual configurable token scopes and prerequisites. Keep optional infrastructure strategies separate from product controls; compare Lite guidance with Images and variants, which limits it to demos/testing. Avoid presenting branding as a security guarantee. |
| F097 | L Editorial | [Vulnerability disclosure](https://docs.onetime.dev/en/security/vulnerability-disclosure) | No separate substantive phrasing problem identified in this pass. Keep its concise reporting path as a useful model; apply any agreed sentence-case heading convention. This coverage note is retained so review does not imply a defect was found on every page. |

## Translations and contribution

| ID | Priority and kind | Location and observed wording | Problem and proposed direction |
| --- | --- | --- | --- |
| F098 | M Contradiction | [Translation overview](https://docs.onetime.dev/en/translations) and [quality checklist](https://docs.onetime.dev/en/translations/universal/quality-checklist): `/content/docs/...`; developer guide/repository: `src/content/docs/...` | Correct paths. “Translate only the values” in frontmatter is also too broad: translate human prose, preserve schema values, source references, IDs and technical metadata as applicable. |
| F099 | M Contradiction | [Style guide](https://docs.onetime.dev/en/translations/guide): Canadian English title, “Use American English”, 24-hour instruction followed by US 12-hour discussion; live English mixes organised/organization, colours/colors | Select the intended spelling/time convention and distinguish locale-specific rules from universal guidance. The current style guide cannot consistently evaluate the prose it governs. |
| F100 | M Contradiction | Style guide: borrowed words “never” used; universal guides explicitly recommend technical loan words; glossary uses French Canadian `mot de passe` for both password and passphrase while checklist requires distinct terms | Resolve normative rules together. Treat existing translations as evidence of usage, not automatically as approved terminology; flag ambiguous terms for native-language review. |
| F101 | M Contradiction | Translation glossary recommends informal German DE; checklist mandates formal German; Voice and Tone offers both without selecting a rule | Specify locale-specific formality once and link to it. Do not give mutually exclusive instructions to translators reviewing the same locale. |
| F102 | M Contradiction | Style guide/checklist list Global Elite and Custom Install but omit Team Plus; Brand Terms includes Team Plus and marks Global Elite retired | Synchronize current names and label historical ones consistently. Update “Metadata” in product-feature examples to reflect the receipt terminology decision. |
| F103 | M Editorial | Style guide renders raw pipe text for Mozilla attribution; empty “About the brand voice and tone”; leftover “Guidance: Pinpoint rules…”; “a attributive”, “how it works/”, “currency of the Canada”, “Km” | Remove template instructions and repair the visible attribution format and copy errors. Keep attribution intact while making it readable. |
| F104 | M Contradiction | Style guide: “All secrets use end-to-end encryption”; [Voice and Tone](https://docs.onetime.dev/en/translations/universal/voice-and-tone) recommends Delete secret/View secret despite glossary's burn/reveal distinction | Use accurate Onetime Secret examples. Generic folder/download/upload/backup examples also imply capabilities this text-only service does not provide; label generic examples or replace them with real controls. |
| F105 | M Editorial | Quality checklist: “Target grade: A”, completeness as percent of files, blanket no-English rule, H1 hierarchy without Starlight's generated title | Define useful acceptance criteria and preserve partial-translation/fallback expectations. Explain body headings start at H2 and technical/schema values remain unchanged. The stale product/path rules should be fixed before this checklist becomes a gate. |
| F106 | M Contradiction | [Developer on-ramp](https://docs.onetime.dev/en/contribute/developer-on-ramp) says every new page requires sidebar editing; repository guidance allows same-directory links and intentional exceptions; check list omits contrast and malformed-link checks | Describe reachability accurately and keep contributor checks aligned with repository guidance. Preserve the distinction between build, content checks, and link checking with lychee. |

## Homepage and sitewide patterns

| ID | Priority and kind | Location and observed wording | Problem and proposed direction |
| --- | --- | --- | --- |
| F107 | M Editorial | [Docs home](https://docs.onetime.dev/en/): “Everything past sending the first secret”; primary CTA “Setup your custom domain”; no prominent beginner CTA | The home page points advanced users onward while Getting started invites first-time users. Add a clear first-secret path and use the verb “Set up”. Keep branded-domain, API, and operator paths available. |
| F108 | M Editorial | Home: “OTS / B5A7”, “There was a secret here”; security link amid product navigation | The code-like label is unexplained and the illustration does not identify its purpose in extracted text. Assess its visible context and accessible explanation before keeping it. This review is a content/DOM pass, not a visual accessibility audit. |
| F109 | M Editorial | Sidebar puts Glossary before deployment choice; recipient troubleshooting before requesting secrets and rationale; billing explanation before plan comparison | Proposed order: try sharing → understand the essential terms → choose hosted/self-hosted; within sharing, distinguish send/open/request tasks; within billing, show plan overview/comparison before subscription management. Treat this as an editorial proposal, not an established usability result. |
| F110 | L Editorial | Sitewide: title case versus sentence case, `&` versus “and”, “Self-Hosting” versus “self-hosting”, “Signin”/“sign-in”/“login”, “Questions or Need Support?” versus “Questions or need support?” | Adopt sentence-case prose/headings and a small terminology sheet. Preserve exact quoted UI labels and proper library names. Normalize support sections or use a shared component after the content decisions are made. |
| F111 | L Editorial | Newer pages frequently use holds, carries, lands, claims; “mints”, “spent”, “inert”, “load-bearing”, “surface”, “front door”, “half the answer” | Authored prose conflicts with the repository's explicit vocabulary rules and its plain-language aim. Prefer stores, includes, appears, records, generates, unavailable, required, screen, command, and rule according to context. Do not mechanically replace words inside code or actual UI quotations. |
| F112 | M Editorial | Glossary, receipts, sharing, dashboard, account settings repeat at-most-once behavior, twice-lifetime receipts, passphrase loss, role/plan intersection, and anti-enumeration rationale | Choose canonical explanations and retain short contextual cautions with links. Repeated full explanations have already drifted into the contradictions above. Avoid turning every task page into a second reference. |
| F113 | H Contradiction | Live [product About](https://onetimesecret.com/en/about) reserves burn-before-reading for account holders; docs describe receipt-based burning without sign-in; product About lists 100/1000 KB limits versus docs' character-oriented reference | Reconcile public product copy with actual anonymous/authenticated behavior. Keep hosted limits distinct from configurable self-hosted defaults. These are observed public discrepancies, not verified production limits. |
| F114 | M Contradiction | Recipient guide says a “Powered by” attribution stays in the footer; live product homepage describes a recipient mock with “no Onetime Secret branding” | Check actual branding/attribution behavior and scope. Align the marketing mock description and docs with any plan-specific behavior. |

## Coverage and evidence boundaries

The walkthrough opened all 66 English sidebar destinations in order, starting at Getting started, then the docs homepage and nine release guides linked by Upgrade Guides. The sidebar count includes the custom configuration-generator route. Rendered text was read through the browser; the long environment reference was sampled rather than exhaustively reviewed. Configuration Reference was read for its opening and major copied sections; its entire YAML was not independently reconciled against application source.

| Sequence | Pages opened | Review scope |
| --- | --- | --- |
| Start here | Getting started; Send your first secret; Glossary; Hosted or self-hosted | Reader sequence, terminology, behavior consistency |
| Sharing | Sharing secrets; Your receipt; What recipients see; When a link does not work; Receiving secrets; Why use secret links; Use cases | All seven rendered pages |
| Account | Signing in; Two-factor and passkeys; Sessions and identities; Dashboard and recent secrets; Preferences; Change email; Change region; Close account | All eight rendered pages |
| Organizations | Overview; Roles; Inviting; Ownership; SSO; Secret Activity | All six rendered pages |
| Domains | Overview; Setup; DNS; Branding; Email sender; Homepage/incoming; Access/privacy | All seven rendered pages |
| Billing | How plans work; Managing subscription; Pricing; Comparison | All four rendered pages |
| Self-hosting | Overview; Mode; Images; Docker; Linux; Service; Proxy/TLS; Verify; Configuration; Generator; Environment; Upgrade index | All twelve opened; environment sampled; configuration not a complete source audit |
| API | API overview; Client libraries | Both rendered pages; examples inspected, not executed |
| Security | Overview; Data protection; Regions; Best practices; Principles; Vulnerability disclosure | All six rendered pages; legal/provider assertions not independently verified |
| Contributing | Developer on-ramp; Translations; Style; Glossary; Universal; Secret concept; Password/passphrase; Brand terms; Voice/tone; Checklist | All ten rendered pages; no audit of translated locale trees |
| Release guides | v0.26.18, .17, .15, .14, .12, .11, .6; v0.24.0; v0.23.0 | Rendered guides read; no migrations or historical command examples executed |
| Broader product | Live product homepage, `/en/pricing`, `/en/about`; selected local product source and content | Current public wording compared; local source is not proof of deployed version |

Selected local corroboration:

- Application checkout: `/Users/d/Projects/dev/onetimesecret/onetimesecret`, HEAD `145c1e7cfa`; inspected Secret model and ActiveSessionGate descriptions. The model exposes ciphertext through its encrypted-field mechanism; the session gate describes next-request revocation and periodic activity updates.
- Marketing-site content: `/Users/d/Projects/ops/sites/onetimesecret.com/src/content/pages/en/about.md`, `src/content/pages/terms.md`, and June invitation changelog entries. About and pricing were also checked live. The Terms retention comparison is from local source, not a live policy verification.
- Prior memory suggested separating per-install SSO from organization SSO. Current pages were inspected afresh; no old branch status or entitlement was treated as current evidence.

No secret was created, revealed or burned. No account, billing, invitation, DNS or security setting was changed. No published page or translation was edited. No build, test suite, installation, migration, SDK example, complete link crawl, screenshot review, or VoiceOver audit was performed.

## Suggested resolution order

1. Resolve the security and behavior contradictions: F011–F015, F020–F021, F026–F027, F030–F032, F034, F040, F047, F084, F089–F091, F113.
2. Establish current names, availability, and limits with the application and commercial sources: F006–F009, F028, F045, F053–F063, F114.
3. Reconcile installation/configuration guidance and historical version scope: F066–F083.
4. Finish procedures for invitations, SSO, billing, branding, sender, incoming forms, and access controls: F049, F052, F056, F068.
5. Apply the agreed terminology, navigation order, and editorial style; fix translator guidance before propagating English changes to other locales.

F097 is a reviewed-page coverage note with no separate substantive correction proposed. The other 113 entries are candidate changes or verification tasks. The initial review made no site edits. The implementation record below supersedes its original disposition counts.


## Start here resolution record

Applied on `wip/docs-content-review`, based on `chore/docs-content` at `487a3857`.
The branch already included the beginner-focused glossary rewrite and the task
heading changes observed during the walkthrough. Those changes were retained.
The remaining edits affect Getting started, Glossary, and Hosted or self-hosted.

| ID | Disposition | Final location and verification |
| --- | --- | --- |
| F001 | Addressed in base branch | Getting started no longer has the promotional Core functionality block; confirmed in branch source. |
| F002 | Addressed | Getting started retains the reader-task headings and sharing-first order; descriptions now explain actions and define terms without criticizing other copy. |
| F003 | Addressed in base branch | Glossary already uses neutral definitions and a brief introduction; retained after review. |
| F004 | Addressed in base branch | Glossary already groups everyday sharing terms first and omits the former API aliases, raw fields, and operator hierarchy; no new technical reference was needed for this task. |
| F005 | Addressed | Glossary explains delete as a general word, burn as the action for an unread secret, and account closure as a separate action. Existing burn/passphrase explanations remain. |
| F006 | Addressed within Start here | Glossary explains team as people working together, directs access management to organization membership, and distinguishes the Team Plus plan name. Cross-site plan names, availability, and limits remain tracked under F057–F060. |
| F007 | Addressed | Hosted comparison distinguishes Simple mode, Full mode's default SQLite database and optional PostgreSQL, queued jobs requiring RabbitMQ, and the additional services in the full Compose stack. Checked against application auth/config defaults and docker/README.md at `145c1e7cfa`. |
| F008 | Addressed | Hosted comparison explicitly permits basic sharing without an account and distinguishes account-feature signup. Links to Send your first secret. |
| F009 | Addressed | Removed identical-protection, universal infrastructure-control, and unexplained self-host licensing promises. Describes configuration, HTTPS, maintenance, and operator responsibilities; links to data protection and region-change guidance. |
| F010 | Addressed | Hosted comparison uses direct descriptions of setup, infrastructure, security configuration, and maintenance instead of the earlier metaphors. |

Validation completed:

- `node bin/check-nav.mjs`: passed, 67 sidebar links and 78 label keys.
- `node bin/check-orphans.mjs`: passed, 75 English pages, no orphan exceptions.
- `node bin/check-frontmatter.mjs`: passed, including 277 redirect fragments.
- Production build: passed, 1,289 pages and search index generated.
- Built HTML: 272 English internal link occurrences and their fragments resolved
  across the three edited pages, including shared navigation.
- `git diff --check`: passed.

The worktree had no dependencies installed. The initial `pnpm run` attempt
triggered installation and was stopped after registry DNS failures. Validation
then used a `node_modules` symlink to the existing main-checkout dependencies.
The first build could not resolve the installed native Markdown binding from
the prerendered bundle; the successful build used
`NODE_PATH=/Users/d/Projects/ops/sites/docs.onetimesecret.com/node_modules/.pnpm/satteri@0.10.5/node_modules`
with `node node_modules/astro/bin/astro.mjs build`. No dependency manifests or
lockfiles were changed.

No application behavior, installation commands, external links, translated
content, or browser rendering was tested in this implementation pass. The
unchanged first-secret guide and the broader audit remain separate work.

Current coverage: **10 addressed Start here findings**, **103 other open
candidate findings**, and F097 as a no-finding coverage note. No findings were
rejected or silently removed.


## Sharing secrets resolution record

Applied after the Start here changes, with the application source checked at
`145c1e7cfa`. All seven English sharing pages were revised. The existing
`/en/share/receiving-secrets` URL is retained, with **Request a secret** as its
page title and English sidebar label. Other locale labels were left alone.

Two supporting passages were corrected: the generated-password instructions in
Send your first secret, and the account/network attribution explanation in
Secret Activity. Other account, billing, marketing, and security pages remain
separate work; no claim is made that their broader discrepancies are resolved.

| ID | Disposition | Final location and evidence |
| --- | --- | --- |
| F011 | Addressed in Sharing secrets | Sharing overview, recipient guide, requesting guide, rationale, and troubleshooting consistently distinguish loading a confirmation page from submitting a reveal. `show_secret.rb` checks the explicit continue flag; `secret_state_management.rb` consumes only on reveal. Product-homepage wording remains outside this pass. |
| F012 | Addressed | Overview and recipient guide qualify creator warnings; anonymous creators cannot be identified. Checked against `show_secret.rb` and `Secret#owner?`. |
| F013 | Addressed | Overview and receipt explain that the signed-in form navigates for generated passwords even with Stay on page enabled. The supporting first-secret sentence now agrees. `WorkspaceSecretForm.vue:171-174` navigates when workspace mode is off OR the action is generate-password; the public form normally navigates to the receipt. |
| F014 | Addressed | Passphrase exclusion is next to generation instructions in Sharing secrets and in the receipt conditions. `show_receipt.rb` gates the displayed response with `!has_passphrase`. |
| F015 | Rejected with contrary evidence | The byte-limit explanation is retained and simplified. `lib/onetime/logic/base.rb:190-206`, `validate_secret_size`, explicitly compares `value.to_s.bytesize`; `useTextarea.ts` counts/truncates JavaScript string length. The environment reference's character wording is not evidence of character-based server enforcement. Reference corrections remain under the later reference audit. |
| F016 | Addressed | Sharing overview now starts with the task and uses direct descriptions of creation, lifetime, passphrase, delivery, receipt, and burn. Removed the cost framing and generation metaphors. |
| F017 | Addressed | Sharing overview says only the first address is emailed and instructs creating separate secrets for independent reveals. Recipient guide no longer suggests forwarding a single link to everyone. `base_secret_action.rb:524-527` passes `recipient.first` to delivery. |
| F018 | Addressed | Receipt now starts with the two link purposes, then status, notifications, generated-password conditions, burning, mistaken sharing, and lifetime. Removed dramatic cost/one-look metaphors and implementation justifications. |
| F019 | Addressed | Receipt distinguishes content entered by the sender from generated values in the opening and display section. Removed absolute statements that contradicted the generated-password exception. |
| F020 | Addressed | Recipient guide promises at most one successful retrieval rather than one human or the only copy. Sharing overview, rationale, and use cases explain that readers can save or forward the content. Atomic reveal checked in `secret_state_management.rb`. |
| F021 | Addressed | Recipient guide and the supporting Secret Activity paragraph distinguish receipt fetch history, organization events, short secret/receipt references, full authenticated account IDs, active-member email resolution, and optional network context. No anonymity promise. Checked `actor_attribution.rb`, `access_telemetry.rb`, `access_timeline.rb`, `RequestContext`, and `list_secret_activity.rb:125-140`. |
| F022 | Addressed | Troubleshooting opens with screen message → next action. The short history-privacy explanation follows the recovery steps; oracle/internal-error/terminal-state explanations were removed. |
| F023 | Addressed | Troubleshooting and recipient guide explain that lockout is checked before passphrase verification, so correct input cannot bypass it. `PassphraseRateLimiter#enforce_passphrase_tier_lock!` raises while locked; ShowSecret and BurnSecret call it in raise_concerns before process verifies the passphrase. Successful verification clears counters only when the gate permits the attempt. |
| F024 | Addressed | Receiving secrets became Request a secret in H1, description, and English sidebar label, preserving its route. It separately directs existing link recipients to the reveal/troubleshooting guides. |
| F025 | Addressed | Incoming-form receipt description names creation/reveal status and explicitly distinguishes it from notification delivery or proof of reader identity. No delivery guarantee is substituted. |
| F026 | Addressed in Sharing secrets | Why use secret links describes hosted HTTPS, encrypted storage, and server-side encryption/decryption. Removed end-to-end encryption wording. Checked Secret's encrypted ciphertext field and server-side reveal. The translation-guide example remains tracked under F104. |
| F027 | Addressed | Rationale describes reducing copies in conversation history, retained receipt/activity records, bearer-link access, and recipient copies. Removed no-footprint and wrong-hands guarantees. Backup-policy reconciliation remains under F090. |
| F028 | Addressed | Removed premium/business-user entitlement labels from the rationale. It links to Preferences and Secret Activity for their own prerequisites instead of duplicating plan restrictions. No new entitlement limit was inferred. |
| F029 | Addressed | Rationale is a concise explanation of temporary links, lifetime, actual protections, and limits. Removed the six-part promotional essay and uses sentence-case secret links. |
| F030 | Addressed | Recovery-code use case is delivery to someone who saves them durably. It warns against using an expiring link as the backup and links to the 2FA guide. |
| F031 | Addressed | License/Wi-Fi/credential examples describe hosted-copy retrieval only, not downstream reuse control. Removed the interview integrity promises and financial-account protection example. Credential revocation is distinguished from burning the link. |
| F032 | Addressed by removing the unsupported assertion | Removed the two-week logging figure, Tor-availability assertion, and suitability pitch for anonymous tips. Sensitive-disclosure guidance explains attribution limits without specifying retention or promising anonymity. No current operational retention period or legal conclusion was asserted. |
| F033 | Addressed | Use cases now has sentence-case task headings, generic Wi-Fi example, relevant limits beside each example, no repeated Benefit paragraphs, and next steps after substantive content. |

Validation completed:

- `node bin/check-nav.mjs`: passed, 67 sidebar links and 78 label keys.
- `node bin/check-orphans.mjs`: passed, 75 English pages, no orphan exceptions.
- `node bin/check-frontmatter.mjs`: passed, 277 redirect fragments resolved.
- `node bin/check-locales.mjs`: passed, 17 configured locales.
- `bash bin/check-malformed-links.sh`: passed.
- Production build: passed, 1,289 pages and search index generated. Used the
  existing dependency symlink and native-binding `NODE_PATH` documented in the
  Start here validation record.
- Built HTML: all nine edited content pages have exactly one H1; 971 English
  internal link occurrences and fragments resolve, including shared navigation.
- `git diff --check`: passed.

Source inspection established the application behavior described above. No
live secret, passphrase attempt, email, account, activity export, or incoming
submission was exercised. External URLs, deployed-version equivalence, backup
policy, and visual/VoiceOver behavior were not validated. No application code,
dependency manifest, or lockfile changed, and no new tests were added for these
prose changes.

Current coverage supersedes the earlier counts: **32 addressed**, **1 rejected
with evidence (F015)**, **80 open candidate findings**, and F097 as a no-finding
coverage note. No Sharing secrets finding is deferred or left unresolved within
this section's scope.


## Accounts resolution record

Applied after the Sharing secrets changes, with the application source checked
at `145c1e7cfa`. All eight English account pages were revised. The
Organizations overview note on roles was corrected as part of F042. Account
pages describe current behavior and service defaults without naming release
versions; version history stays in the upgrade guides.

| ID | Disposition | Final location and evidence |
| --- | --- | --- |
| F034 | Addressed | Sessions and connected identities says Remove and Logout All Other Sessions end those sessions on their next request, that last activity follows ordinary requests, and that entries show browser, masked network address, country, created and last-active times. Remove/remove-all delete `account_active_session_keys` rows (`apps/web/auth/routes/active_sessions.rb:99-137`); `ActiveSessionGate` returns `:revoked` for a missing row and `BaseSessionAuthStrategy` refuses with `SESSION_REVOKED` (`base_session_auth_strategy.rb:32-41`); `last_activity_at` comes from session metadata written on each ordinary request (`routes/active_sessions.rb:75`; `track_metadata.rb:101`); labels from `SessionListItem.vue:22-33`. The flag and auth-mode dependency is a note, not a warning that controls are ineffective. No live revocation test was performed. |
| F035 | Addressed | Sessions and Signing in both state the defaults: 24-hour inactivity without Remember me, 14 days from sign-in with it, 30-day maximum for every session, and operator variability. `config.defaults.yaml:468-471`; `remember_me.rb:68-69`; `active_session_gate.rb:349-354`. The 72-hour row deadline is omitted from user pages because the 24-hour default ends an unremembered session first. |
| F036 | Addressed | Signing in now opens with numbered sign-in and reset steps, then missing-email causes, other failures, and SSO. Removed the counted sections, the reset-email anatomy, the separate enumeration essay, and the reset-record explanation; the enumeration rationale is one sentence in the reset step. |
| F037 | Addressed | Signing in describes main-service linking during sign-in (password, or emailed link without a password, then the second factor), linking from Connected Identities, and the custom-domain refusal. `omniauth.rb:300-544`; `link_sso.rb:44-55`; `sso_link_confirm.rb:218-235`; `session-auth.json:166-167`. Sessions now paraphrases the custom-domain message accurately. |
| F038 | Addressed | Two-factor guide lists where to save codes, what to avoid, and what to do after signing in with a code. Removed the admonishments and idioms. Four codes checked at `mfa.rb:14`. |
| F039 | Addressed | Dashboard page leads with where receipts appear and an action table by surface, then content limits, list contents, statuses, entry fields, expiry (explained once), refresh and the signed-out list. Removed the gating qualifier; `/dashboard` and `/recent` have no entitlement gate (`src/apps/workspace/routes/dashboard.ts`). |
| F040 | Addressed | Preferences says the receipt records fetch and reveal/burn times only, and that reader account and masked network details go to Secret Activity for signed-in creators' secrets, visible to owners/admins on plans with it. `receipt/features/access_timeline.rb:48-107`; `access_telemetry.rb`; `list_secret_activity.rb:70-92`. Links to the recipient guide's sender section. |
| F041 | Addressed | Preferences is grouped as account preferences, browser preferences, settings decided elsewhere, and related account settings. Removed the "whole list", "turn out not to be settings" and "people look for" framing. |
| F042 | Addressed as documented behavior | Change Email, Region and Careful Consideration Zone are hidden in the UI unless the current organization role is owner or admin (`settings-navigation.ts:132,222,304`; `routes/account.ts:20-36`). The guards are deliberate (commit `f8180024d2`, PR #3309: "regular members' accounts are managed by the org owner"). The backend endpoints do not enforce the role (`request_email_change.rb:66-106`; `hooks/account.rb:1155-1180`); that gap is an application question and is not documented as a user workaround. Organizations note, email-change prerequisites and closure troubleshooting now say the same thing. |
| F043 | Addressed | Email change puts role, password, inbox, unused-address and pending-invitation prerequisites first; steps follow, with the sign-out warning in step 3; consequences follow verification. Replaced lands, strands and in flight. |
| F044 | Addressed | Email change has a "Changing back" section: no undo button, reversal by another confirmed change when the previous inbox is available and the address is unused. Closure's related link no longer calls email change irreversible. |
| F045 | Addressed | Changing your region says a subscription belongs to an organization in one region; the plan can be applied to the account's own workspace in the new region when the email matches the purchase email, not to joined organizations, and possibly not immediately; check the plan and contact support rather than buying again. Recognition matches an HMAC of the email (`email_hash.rb:46-55`) through `apps/web/billing/operations/webhook_handlers/subscription_federation.rb`; pending records are claimed only by the account's default workspace (`ensure_default_workspace.rb:181-195,409-529`). Removed the Stripe-email explanation, "refresh once", and the claim that all same-email accounts share status. |
| F046 | Addressed | Removed "good news", "about two minutes" and "That's it". Paid-plan section covers Identity Plus and Team Plus and says members are not moved. The custom-domain wait now runs from the last secret created on the old domain, uses the plan's longest lifetime via Compare plans instead of a fixed figure, and accounts for receipt pages on the share domain lasting twice the secret's lifetime (`receipt.rb:163-167,292`; `show_receipt.rb:365-368`). |
| F047 | Addressed with corrected facts | Source contradicts the old page: self-service closure runs `Customers::Purge`, which deletes the customer record (`destroy_customer_record.rb:87-94`), keeps a closed Rodauth row and its authentication audit log (`remove_authentication_data.rb:100-112,170-196`), removes non-owner memberships, deletes an empty sole-owned default workspace, and refuses closure for other members, domains, live billing or another owned organization (`purge_preflight.rb:553-586,636-658,744-752`). The email unique index covers open and unverified rows only (`001_initial.rb:31-32`); `purge_same_email_recreation_spec.rb` covers re-registration. The page now says the address can be reused for a new, empty account. The 365-day retention, retained email claim, and SSO reattachment caution were removed. The page lists the sign-in record and its audit history as deleted, per the decision to delete them at closure (onetimesecret/onetimesecret#4819); current code still keeps them. |
| F048 | Addressed | Removed "the provider owns the account". Closure remains available in full mode under SSO-only (`/auth/close-account` is exempt from `restrict_to`); the page instead names the blocked control: a password-less account cannot set a password where sign-in is restricted to SSO, because password setup uses the reset routes (`apps/web/auth/restrict_to.rb:104-113`), and directs the user to support or the operator. |

Application follow-ups found during verification (not documented as user
behavior):

- Change Email and account closure are hidden from members only in the UI;
  `POST /api/account/change-email` and `/auth/close-account` do not check the
  organization role (`request_email_change.rb:66-106`;
  `hooks/account.rb:1155-1180`). The `routes/account.ts:15-18` docblock still
  lists password, MFA, recovery codes and passkeys under the owner/admin guard.
- A password-less account can confirm closure with any non-empty text: the UI
  requires only a non-empty field and Rodauth skips the check when no password
  exists (`AccountDeleteButtonWithModalForm.vue:27,132`; Rodauth
  `close_account.rb:63-65`).
- `apply_pending_federation!` may return before saving the computed email hash
  when no pending record exists (`ensure_default_workspace.rb:437-516`), which
  would stop later webhooks matching the new workspace. Not tested at runtime.
- The closure refusal message is one hard-coded English string for every
  blocker; the blocker codes are not shown to the user.
- Closure keeps the Rodauth `accounts` row (status closed, plaintext email,
  `external_id`, timestamps) and every `account_authentication_audit_logs` row,
  whose metadata includes the masked IP and anonymized user agent per event.
  `TeardownAccount#close_auth_account` always passes `retain_account: true`
  (`teardown_account.rb:177-189`); nothing later prunes closed rows or their
  audit logs, so both are kept indefinitely. Decision: delete both at closure,
  tracked in onetimesecret/onetimesecret#4819. Closing your account now lists
  the sign-in record and its history as deleted, which describes the intended
  behavior until that issue ships.

Validation completed:

- `node bin/check-nav.mjs`: passed, 67 sidebar links and 78 label keys.
- `node bin/check-orphans.mjs`: passed, 75 English pages.
- `node bin/check-frontmatter.mjs`: passed, 277 redirect fragments resolved.
- `node bin/check-locales.mjs`: passed, 17 configured locales.
- `bash bin/check-malformed-links.sh`: passed.
- Production build: passed, 1,289 pages, with the dependency symlink and
  native-binding `NODE_PATH` from the Start here record.
- Built HTML: the eight account pages and Organizations each have one H1; 1,038
  English internal link occurrences and fragments on those pages resolve.
- `git diff --check`: passed.

Source inspection established the behavior above. No session was revoked, no
email changed, no account closed, no subscription or region change exercised,
and no custom domain moved. Translated account pages were not changed and now
lag the English corrections.

Current coverage supersedes the earlier counts: **47 addressed**, **1 rejected
with evidence (F015)**, **65 open candidate findings**, and F097 as a no-finding
coverage note. No Accounts finding is deferred.


## Request a secret naming follow-up

At the user's request, F024 now includes the internal key and route rename:

- English sidebar key: `requestSecret` (formerly `receivingSecrets`).
- Canonical page: `/en/share/request-secret`, from `share/request-secret.md`.
- Active English content links and sidebar target use the canonical route.
- The moved-page mapping redirects `/{locale}/share/receiving-secrets` directly
  to `/{locale}/share/request-secret` for all configured locales, preserving
  old published URLs and the English fallback behavior.

This supersedes the earlier decision to retain the old route. Earlier audit
observations and historical planning references retain their original names.

Rename validation: navigation, orphan, frontmatter, locale, and whitespace
checks passed. Production build passed. All 17 configured locale redirects
were checked to point directly to the new path; generated English redirect
HTML and English/French/Japanese canonical page outputs were also checked.


## Accounts verification follow-up

Runtime checks, policy and support confirmations, and related application
observations are tracked separately in the
[Accounts verification ledger](accounts-verification-ledger-2026-10-20.md).
All entries start open; the Accounts content dispositions above do not imply
that those checks have passed or that policy commitments have been approved.
