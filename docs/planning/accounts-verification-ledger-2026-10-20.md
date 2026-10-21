# Accounts verification and policy follow-up ledger

This ledger tracks follow-up checks identified while resolving Accounts findings
F034–F048 in the [content walkthrough](content-walkthrough-2026-10-20.md#accounts).
It separates runtime evidence from approval of policy and support commitments.
The documentation changes do not establish either of those independently.

Entries are **Open** unless their row says otherwise. No checks below were
performed as part of creating this ledger. Apart from the records under
[Evidence and decisions](#evidence-and-decisions), no policy approvals were
obtained and no follow-up is scheduled. Owners and target environments remain
unassigned. Application-source evidence
was recorded in the walkthrough against `145c1e7cfa`; recheck the implementation
and deployed version before executing these checks.

## How to close an entry

Record the date, owner, environment and application revision, evidence or
approved decision, result, and any resulting documentation or application
change. Use Open, In progress, Passed, Failed, Confirmed, or Deferred; a deferral
needs a reason. Runtime checks pass on observed outcomes, and policy entries
close only with a recorded decision from the responsible owner. Do not put
passwords, tokens, recovery codes, personal data or live secret links here.

## Runtime checks

Use disposable accounts and secrets in an agreed test environment. Domain,
billing and destructive account actions need fixtures appropriate to that
environment before execution.

| ID | Status | Check and evidence needed | Related findings and pages |
| --- | --- | --- | --- |
| AR01 | Open | Remove one active session and log out all other sessions. Verify the affected browsers are refused on their next request, the current session survives logout-all, and last activity advances on ordinary requests. Record authentication mode and session-tracking configuration. | F034; Sessions and connected identities |
| AR02 | Open | Verify inactivity, Remember me and absolute session deadlines, including background polling not extending activity. Record actual configuration and test clock or elapsed-time method rather than assuming service defaults. | F035; Sessions; Signing in |
| AR03 | Open | Change a password and complete a password reset separately. Verify which sessions end, rejection of older sessions, reset-link expiry and replacement, and the subsequent sign-in path. | F036; Signing in; Sessions |
| AR04 | Open | Connect and remove an SSO identity; exercise existing-account linking during sign-in, password-less email proof, second-factor completion, custom-domain refusal, and protection against removing the last sign-in method. | F037; Signing in; Sessions |
| AR05 | Open | Enable and disable 2FA, use a recovery code, regenerate codes, and register and use a passkey. Verify recovery-code count and single use, resulting notifications, and the documented interaction between passkeys, 2FA and SSO. | F038; Two-factor authentication and passkeys |
| AR06 | Open | Request and confirm an email change. Verify new-inbox confirmation, expiry and resend behavior, replacement of pending requests, sign-out of all sessions, address reversal, and role-dependent UI visibility. | F042–F044; Changing your email address |
| AR07 | Open | Enable reveal notifications and reveal a disposable secret. Verify delivery and contents, no notification on link fetch alone, and the separation between receipt details and organization Secret Activity. | F040–F041; Preferences |
| AR08 | Open | Create an account in a second region and verify subscription recognition for the account's own workspace, its timing, and exclusion of organizations joined by invitation. Confirm records and memberships are not copied. | F045; Changing your region |
| AR09 | Open | Move a disposable custom domain between regions using a temporary subdomain. Verify outstanding secret and receipt behavior before and after DNS changes, expiry waits, and domain verification. | F046; Changing your region |
| AR10 | Open | Exercise closure blockers, then close a disposable account. Verify sessions and credentials stop working, the account record and workspace are removed, memberships are removed, no authentication row or authentication event history remains for the account (once onetimesecret/onetimesecret#4819 ships; see AP01), and previously shared secrets retain their documented behavior. | F047–F048; Closing your account |
| AR11 | Open | After closure, register with the same address through password and SSO paths. Verify a new empty account, no restoration of old records, and no reattachment to the closed account. | F047; Closing your account; Signing in |

## Policy and support confirmations

These entries ask whether the documented behavior is an approved commitment.
A source-code observation alone does not close them.

| ID | Status | Decision or confirmation needed | Suggested responsible function / dependency |
| --- | --- | --- | --- |
| AP01 | Confirmed | Decide whether a closed authentication row, plaintext email, external identifier, timestamps and authentication event history should remain after closure; specify retention and deletion rules. Decided 2026-10-20: delete both at closure. Implementation is tracked in onetimesecret/onetimesecret#4819; see [Evidence and decisions](#evidence-and-decisions). | Product and privacy; AR10; application follow-up AX05 |
| AP02 | Open | Confirm retention, access and attribution rules for a former member's activity in other organizations after account closure. Specify the applicable retention period or policy source. | Product and privacy; AR10 |
| AP03 | Open | Confirm that a closed account's address may be reused for a new empty account through both password and SSO registration, and that this is intended service policy. | Product and identity/security; AR11 |
| AP04 | Open | Confirm support can recover access after loss of all second factors or withdrawal of the only identity provider. Define identity checks, permitted actions, limits, and approved wording without promising a response time. | Support and identity/security; AR04–AR05 |
| AP05 | Open | Confirm the intended owner/admin restriction on personal email changes and closure, and the supported route for ordinary members. Resolve the UI/backend discrepancy before treating it as an authorization guarantee. | Product and identity/security; AR06, AR10; AX01 |
| AP06 | Open | Confirm cross-region subscription recognition, eligible workspaces, matching rules, timing, and the support route when recognition fails. Confirm the advice not to purchase a second subscription. | Billing and product; AR08; AX03 |
| AP07 | Open | Confirm the manual assistance offered for SSO-only account closure, organization ownership transfer, and dedicated-instance region changes. Record prerequisites and escalation routes for each service. | Support and operations; F048; AR09–AR10 |

## Related application follow-ups

These are existing observations from the walkthrough, carried here so runtime
and policy decisions can resolve them together. They are not newly reproduced
defects, approved fixes, or user workarounds.

| ID | Status | Observation to investigate | Related checks |
| --- | --- | --- | --- |
| AX01 | Open | Email-change and closure controls restrict members in the UI, while the recorded backend paths do not check organization role. The account-route docblock also lists more controls under the guard than the UI enforces. Establish the intended authorization and reconcile enforcement and comments. | AP05; AR06, AR10 |
| AX02 | Open | For a password-less account, the recorded closure UI accepts non-empty text and Rodauth skips password verification. Determine the intended confirmation and authentication requirements. | AP07; AR10 |
| AX03 | Open | `apply_pending_federation!` may return without saving the computed email hash when no pending record exists, potentially preventing later webhook matching. Reproduce before classifying as a defect. | AP06; AR08 |
| AX04 | Open | Closure uses one hard-coded English refusal message for all blockers and does not expose blocker codes. Check diagnosis and localization needs. | AR10 |
| AX05 | In progress | Recorded closure code retains the authentication row and audit history indefinitely, while the `remove_authentication_data.rb` header says audit logs are deleted. The retention decision is recorded under AP01; the code and comment fix is onetimesecret/onetimesecret#4819. Closing your account already describes the decided behavior. | AP01; AR10 |

## Evidence and decisions

Add dated records here and update the corresponding row when follow-up work
occurs.

### AP01: sign-in record at closure (2026-10-20)

- **Owner:** delano.
- **Evidence:** at `145c1e7cfa`, closure keeps the `accounts` row (closed
  status, plaintext email, `external_id`, timestamps) and every
  `account_authentication_audit_logs` row, with nothing pruning them later. See
  the walkthrough's [Accounts resolution record](content-walkthrough-2026-10-20.md#accounts-resolution-record).
- **Decision:** delete both when the account is closed.
- **Documentation:** Closing your account lists the sign-in record and its
  history as deleted (e956cef0). Until #4819 ships, the page is ahead of the
  service.
- **Application:** onetimesecret/onetimesecret#4819, open. The issue also covers
  administrative purge and rows kept by earlier closures.
