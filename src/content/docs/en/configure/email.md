---
title: Outbound email
description: The transport your instance sends through, the sender identity it sends as, the two values that must be set before any mail leaves, and what a failed delivery looks like in the log.
audience: operator
pageType: how-to
sourceOfTruth: onetimesecret/etc/defaults/config.defaults.yaml:937-961 (the shipped emailer block — mode, sender_provider, from, from_name, reply_to, the SMTP host/port/user/pass/auth/tls set, feedback_to and show_logo, each with the env var that overrides it); onetimesecret/etc/defaults/config.defaults.yaml:975-1036 (the email_providers block — the dedicated CUSTOM_MAIL_SES_* credentials and why they exist, SES region and DKIM/SPF fixtures, the SendGrid subdomain and selectors, and Lettermint's two tokens, base URL and SPF CNAME defaults); onetimesecret/etc/defaults/config.defaults.yaml:1039-1076 (the mail.truemail block — regex as the shipped validation type, the CHANGEME verifier_email, the commented-out verifier_domain line, allowed_domains_only and the three resolvers); onetimesecret/lib/onetime/mail/mailer.rb:121-136 (the noreply@example.com fallback from-address and the deprecated fromname key), :147-186 (sender-domain provisioning decoupled from transport, and how sender_provider resolves), :196-222 (mode is read and returned first, so it short-circuits both the RACK_ENV=test override at :203 and the credential auto-detection ladder below it), :292-315 (the transport dispatch table, the backend-selection log line and the unknown-provider fallback); onetimesecret/lib/onetime/mail/delivery/smtp.rb:23-41,61-66,68-73 (the transient and fatal error lists, classify_error falling through to super, and the ArgumentError raised when no SMTP host resolves), :50-56,116-124,126-148 (allow_unauthenticated_fallback — the guarded rescue, handle_auth_failure's OT.info line and the settings.except re-delivery, and the smtp_settings keys it strips) with onetimesecret/lib/onetime/mail/mailer.rb:342-355 (the key forwarded into the SMTP provider config, and its absence from every env fallback there); onetimesecret/lib/onetime/mail/delivery/base.rb:28-37,84-93 (NETWORK_ERRORS and the classify_error contract — verbatim at :85-86, ":unknown defaults to non-transient (fail fast)"); onetimesecret/lib/onetime/mail/delivery/logger.rb:14-38 and onetimesecret/lib/onetime/mail/delivery/disabled.rb:21-33 (what the logger and disabled backends do, and the statuses they report), :10-18 (the shipped comment naming the intended cases — SSO-only with AUTH_AUTOVERIFY, air-gapped, staging); onetimesecret/etc/defaults/config.defaults.yaml:293-298 (autoverify ships false — a new account verifies by email before it can sign in) with onetimesecret/etc/defaults/auth.defaults.yaml:61-92 (full mode's separate AUTH_VERIFY_ACCOUNT_ENABLED, default on) and onetimesecret/apps/web/auth/config/features/omniauth.rb:38-47 (SSO accounts created and verified on first login); onetimesecret/etc/defaults/config.defaults.yaml:1113 (jobs.enabled ships false) with onetimesecret/lib/onetime/jobs/workers/email_worker.rb:81-87 (the retriable predicate, and the with_retry call it is handed to — three attempts, 2.0s base delay), :93-101 (the two log branches and reject! to the DLQ), :136-140 (the transient= log line) and onetimesecret/apps/api/domains/logic/sender_config/send_test_email.rb:143-150 (transient_error versus delivery_failed), against onetimesecret/lib/onetime/jobs/publisher.rb:51,54 (FALLBACK_STRATEGIES and DEFAULT_FALLBACK = :async_thread), :525-527 (jobs_enabled? is !$rmq_channel_pool.nil?), :529-541 (with_fallback, "no retries, no sleeps"), :546-561 (execute_fallback); onetimesecret/apps/api/account/logic/account/create_account.rb:128-129,153-159 (verified = @autoverify, the unless @autoverify send, and the warning naming the three fixes) with onetimesecret/lib/onetime/logic/base.rb:403-416 (an exception is the helper's only failure signal), onetimesecret/lib/onetime/models/customer/features/status.rb:77-82 (pending?) and onetimesecret/apps/web/core/logic/authentication/authenticate_session.rb:98-110,138-168 (credentials verified first, then the pending branch returns) against :171 (@greenlighted = true, past it); onetimesecret/lib/onetime/mail/delivery/base.rb:49-73,100-102,153-174,208-245 (the suppression guard and its fail-open contract, synchronous-bounce recording, DeliveryError wrapping, and the exact send and failure log lines with obscured recipients), :229-245 (obscure_email preferring OT::Utils, which makes its domain-preserving local fallback dead code) with onetimesecret/lib/onetime/utils.rb:18 (Onetime::Utils extends Strings) and onetimesecret/lib/onetime/utils/strings.rb:186-218,232-243,260-281,286-291 and :67-69 (the mask actually emitted — local part and domain both masked, two characters of mailbox, one of the registrable host, public suffix preserved); onetimesecret/lib/onetime/class_methods.rb:272-293,318-330 with onetimesecret/etc/defaults/logging.defaults.yaml:41,54 (mail log lines resolve to the App category, which ships at warn); onetimesecret/lib/onetime/config.rb:986-988 (boot raises when the mail.truemail block is absent), :961-969 (the SECRET check, for contrast — no equivalent exists for the from-address); onetimesecret/lib/onetime/models/customer/features/role_index.rb:34-37 (feedback mail falls back to the first colonel)
---

Two values have to be set before any mail leaves the instance, and neither of
them stops the boot when it is wrong. Set those first, then pick a transport.

**Mail is load-bearing for sign-in.** `site.authentication.autoverify` /
`AUTH_AUTOVERIFY` ships `false`, which means a new account has to verify its
email address before it can sign in. An instance that cannot send mail is an
instance nobody can finish signing up for, and the failure looks like a working
site — the account is created, the mail never arrives, the sign-in is refused.
So turning delivery off is never a single setting: it has to be paired with a
way for accounts to become verified without mail. That pairing is under
[Choosing a transport](#choosing-a-transport); the verification switches
themselves are on [Authentication](/en/configure/authentication), with the rest
of the sign-in and sign-up gates.

## The two values a stock instance gets wrong

`emailer.from` — environment variable `FROM_EMAIL`, with the legacy alias
`FROM` — ships as `CHANGEME@example.com`. **Nothing validates it.** `SECRET` and
the datastore URI both refuse a placeholder at boot; the from-address has no
such check anywhere in the codebase, so an instance that never got one boots
clean, logs nothing unusual, and sends mail from an address that does not exist.
Treat it as required.

The shipped transport is SMTP, and `emailer.host` — `SMTP_HOST` — ships as
`smtp.provider.com`. That is a placeholder too, and it is the more deceptive of
the two: the SMTP backend checks only that *a* host resolved, so the placeholder
passes construction and the instance fails at send time instead of at startup.

A minimum that actually delivers, for the shipped SMTP transport:

```bash
FROM_EMAIL=secrets@example.com
SMTP_HOST=smtp.example.com
SMTP_USERNAME=...
SMTP_PASSWORD=...
```

Everything else below has a working default.

## Choosing a transport

`emailer.mode` / `EMAILER_MODE` selects the delivery backend. The shipped
default is `smtp`. Accepted values:

| Value | What it does |
|---|---|
| `smtp` | Shipped default. Delivers over SMTP using the settings below. |
| `ses` | Delivers through Amazon SES. |
| `sendgrid` | Delivers through SendGrid. |
| `lettermint` | Delivers through Lettermint's sending API, authenticated with `LETTERMINT_API_TOKEN`. |
| `logger` | Sends nothing. Writes the whole message to standard output. |
| `disabled` / `none` | Sends nothing. A no-op that validates no config at all. |

`logger` prints the message — recipient, sender, reply-to, subject, text body
and HTML body — between `=== EMAIL (Logger) ===` and `=== END EMAIL ===`. It
deliberately writes straight to standard output rather than through the
application logger, so a mis-set log level cannot hide it. If you see that block
in your output, no mail was sent.

`disabled` (or `none`) needs no host and no credentials, validates nothing, and
every send succeeds as a no-op.

**On its own it locks every new account out, and it does so silently.** With
`AUTH_AUTOVERIFY` at its shipped `false`, signup saves the account unverified and
then sends the verification mail. The helper that sends it treats a raised
exception as its only failure signal — and this backend raises nothing. So the
send reports success, no mail exists, and the warning the app logs when
verification mail fails never fires. The account is left pending, which means the
correct password is accepted and no session is issued.

The warning that does not fire here is the one that names the ways out: repair
the emailer config (`EMAILER_MODE` / `SMTP_HOST`), set `AUTH_AUTOVERIFY=true`, or
verify the account from the CLI with `bin/ots customers verify EMAIL`. For an
instance that is meant to have no mail, the second is the one you want. The two
settings go together or not at all:

```bash
EMAILER_MODE=disabled
AUTH_AUTOVERIFY=true
```

In full mode, account verification has a second and separate switch,
`AUTH_VERIFY_ACCOUNT_ENABLED`, which ships **on**. Turn that off as well:

```bash
AUTH_VERIFY_ACCOUNT_ENABLED=false
```

An SSO-only instance is the case this backend was written for — SSO accounts are
created and verified on first login, so no verification mail has to be delivered.
An air-gapped or staging instance gets there with the pairing above.

If you want no mail sent but still need the verification links, use `logger`
rather than `disabled`: nothing leaves the instance, and the link is in the
message printed to standard output.

**An unrecognised value does not stop the boot.** It logs
`[mail] Unknown provider 'sendgird', falling back to logger` and then quietly
does not deliver. A typo in `EMAILER_MODE` looks exactly like a working
instance until someone asks why they never got their verification email.

There is a credential auto-detection ladder in the code — it infers a provider
from whichever credentials it finds — but because `mode` ships as a non-empty
`smtp`, the ladder is short-circuited before it runs. It is a fallback for an
operator who explicitly blanks `mode`, not the normal path. Set `mode`.

`RACK_ENV=test` sits on that same fallback path, one rung above the ladder: it
forces `logger`, but only once `mode` has been found empty. A set `mode` is
returned first and wins in every environment, so on shipped defaults
`RACK_ENV=test` changes nothing about which transport you get.

## SMTP settings

| Config key | Environment variable | Shipped default |
|---|---|---|
| `emailer.host` | `SMTP_HOST` | `smtp.provider.com` — a placeholder; see above |
| `emailer.port` | `SMTP_PORT` | `587` |
| `emailer.user` | `SMTP_USERNAME` | unset |
| `emailer.pass` | `SMTP_PASSWORD` | unset |
| `emailer.auth` | `SMTP_AUTH` | unset |
| `emailer.tls` | `SMTP_TLS` | unset |

**One SMTP setting has no environment variable at all.**
`emailer.allow_unauthenticated_fallback` is YAML-only: there is no `SMTP_*` name
for it, and the shipped defaults file has no line for it either, so an operator
who wants it adds the key under `emailer:` in `etc/config.yaml` by hand. Unset —
the shipped state — is off.

Turned on, it changes what an SMTP authentication failure does: instead of
failing, the backend strips the username, password and authentication method from
the connection settings and sends the same message again, unauthenticated. It
logs `[smtp] Auth failed, retrying without auth: <message>` when it does — at
info level, which is below shipped verbosity (see
[When mail does not arrive](#when-mail-does-not-arrive)), so the second attempt
leaves no visible trace. Left off, the authentication error is raised straight
through to the caller — and it is on the fatal list below, so nothing retries it
either.

## Sender identity

| Config key | Environment variable | Shipped default |
|---|---|---|
| `emailer.from` | `FROM_EMAIL` (alias `FROM`) | `CHANGEME@example.com` |
| `emailer.from_name` | `FROM_NAME` | `Support` |
| `emailer.reply_to` | `REPLYTO_EMAIL` | falls back to `FROM_EMAIL`, then unset |
| `emailer.feedback_to` | `FEEDBACK_TO_EMAIL` | unset |
| `emailer.show_logo` | `EMAILER_SHOW_LOGO` | `false` |

The from-name has one trap of its own: the old YAML key `fromname` is still
read, and logs a deprecation when it is, but no code reads a `FROMNAME`
environment variable. `FROM_NAME` is the env var; `fromname` survives only in
YAML.

If `emailer.from` and `FROM_EMAIL` are both absent, a second fallback in code
supplies `noreply@example.com`. That path is only reached when the defaults file
is not supplying a from-address at all — on a stock install you get the
`CHANGEME` placeholder instead, which is the case worth guarding against.

`emailer.feedback_to` is the To address for feedback-form submissions. Left
unset, feedback is routed to the first colonel in the database, so a fresh
instance with no colonel has nowhere to send it.

`emailer.show_logo` ships **off**, deliberately: HTML mail carrying a logo the
recipient's mail client cannot fetch looks less trustworthy than mail with no
logo. Turn it on only once recipients can actually reach your instance's base
URI to load the image.

## Sender-domain provisioning is a different axis

Provisioning a custom sender domain — the DKIM and SPF records that let mail be
signed as *your* domain — is decoupled from the transport that carries the mail.
`emailer.sender_provider` / `CUSTOM_MAIL_PROVIDER` selects the provisioning
provider; unset, it falls back to whatever `mode` is. So you can deliver over
plain SMTP while provisioning sender domains through SES.

**SES has its own credential pair, and not setting it is a footgun.**
`CUSTOM_MAIL_SES_ACCESS_KEY_ID` and `CUSTOM_MAIL_SES_SECRET_ACCESS_KEY` (falling
back to `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`) are what the
provisioning client should use. Without them it silently reuses `emailer.user`
and `emailer.pass` — that is, it presents your SMTP login as an AWS key. Leave
them unset only when SES is also your delivery transport and the emailer
credentials already *are* the AWS keys. The region is `CUSTOM_MAIL_SES_REGION`,
default `us-east-1`; the DKIM selector count (3) and the SPF include
(`amazonses.com`) are fixed.

SendGrid takes `CUSTOM_MAIL_SENDGRID_SUBDOMAIN`, default `em`; its DKIM
selectors (`s1`, `s2`) and SPF include (`sendgrid.net`) are fixed.

Lettermint needs **two** tokens with different authentication schemes:
`LETTERMINT_API_TOKEN` for sending and `LETTERMINT_TEAM_TOKEN` for domain
provisioning. Setting only the first gives you working delivery and failing
provisioning. `LETTERMINT_BASE_URL` defaults to `https://api.lettermint.co/v1`,
and the SPF CNAME defaults are `lm-bounces` pointing at `bounces.lmta.net`.

There are no `EMAIL_PROVIDERS_*` environment variables. Nothing reads
`EMAIL_PROVIDERS_SES_REGION`, `EMAIL_PROVIDERS_SENDGRID_SUBDOMAIN` or
`EMAIL_PROVIDERS_LETTERMINT_SPF_INCLUDE`; the real names are the
`CUSTOM_MAIL_*` set above.

:::note[The same feature, from the other side]
[Email Sender](/en/custom-domains/email-sender) describes what a custom sender
address looks like to a user of the hosted service. This page is the operator
side of it — the provider credentials and DNS fixtures that back it.
:::

## Address validation

A `mail.truemail` block is **mandatory**. If it is missing, the boot fails at
config load with:

```text
No TrueMail config found
```

The defaults file supplies one, so this only bites an operator who has replaced
the config wholesale. The shipped validation type is `:regex` — cheap, offline,
no network calls. `:mx` and `:smtp` are opt-in. `verifier_email` ships as
`CHANGEME@example.com` and is used only by `:smtp` validation, so on a stock
instance that placeholder is inert. Resolvers default to `1.1.1.1`, `8.8.4.4`
and `208.67.220.220`, and `allowed_domains_only` ships `false`.

`VERIFIER_DOMAIN` does not work. It appears in the defaults file only inside a
commented-out line, so setting it has no effect.

## When mail does not arrive

**Look for the failure line first.** Every failed send logs:

```text
[mail] Delivery failed via SMTP to ab***@e***.com: <the provider's error>
```

`SMTP` there is the backend name, so it reads `SES`, `SendGrid`, `Lettermint`,
`Logger` or `Disabled` on the other transports. The error is then re-raised to
the caller as `<Backend> delivery error: <the provider's error>`.

Recipient addresses are obscured on **both** sides of the `@`: the first two
characters of the mailbox, then the first character of the domain and its public
suffix. `abby@example.com` logs as `ab***@e***.com`, and
`abby@mail.example.co.uk` as `ab***@m***.co.uk`. A mailbox of two characters or
fewer is printed whole, so `jo@example.com` logs as `jo@e***.com`. Grepping the
log for the address itself finds nothing — build the masked form and search for
that, remembering that every address with the same two leading characters and
the same domain initial collapses onto one string.

**The successful lines are invisible at shipped verbosity, and that is not a
symptom.** Successful sends log `[mail] Sent via SMTP to ab***@e***.com:
<subject>`, and the backend-selection line `[mail] Using smtp delivery backend`
is logged the same way — both at info level, under the `App` log category, which
ships at `warn`. So on a stock instance you see delivery *failures* and not
delivery successes. Set `DEBUG_APP=1` to see the rest, and confirm which backend
you actually got.

**No host.** If no SMTP host resolves at all, the backend raises at
construction:

```text
SMTP host must be configured
```

That is the honest failure. The shipped `smtp.provider.com` placeholder avoids
it by satisfying the check and failing later, at send time, against a hostname
that does not exist.

**Nothing in the mail path retries.** Each backend classifies the error it caught
as transient, fatal or unknown, and that single symbol becomes a single boolean
on the `DeliveryError` described above. The classification is a label attached to
a failure, not a retry policy — acting on it is the caller's business, not a
transport setting.

Note the asymmetry: **unknown counts as *not* transient.** The base class says so
in as many words — `:unknown defaults to non-transient (fail fast)` — so the flag
is false both for a recognised fatal error and for an error class the backend
does not recognise at all. For SMTP, transient means `Errno::ECONNREFUSED`,
`Errno::ECONNRESET`, `Errno::ETIMEDOUT`, `Net::OpenTimeout`, `Net::ReadTimeout`,
`Net::SMTPServerBusy`, `IOError` or `SocketError`; fatal means
`Net::SMTPAuthenticationError`, `Net::SMTPFatalError`, `Net::SMTPSyntaxError` or
`Net::SMTPUnknownError`. Anything outside those two lists falls through to the
base classifier, which recognises its own network-error list and returns unknown
for everything else.

Exactly one thing in the codebase acts on the flag by retrying: the RabbitMQ
email worker. It retries a transient `DeliveryError` up to three times with
exponential backoff, and sends it to the dead-letter queue when the retries run
out; a non-transient one skips the retries and goes to the dead-letter queue at
once. An error that is not a `DeliveryError` at all is retried too — the worker's
predicate only ever suppresses retries for a `DeliveryError` marked
non-transient. Two other places read the flag without retrying: the worker's own
log wording, and the custom-domain test-email API, which reports `transient_error`
rather than `delivery_failed`.

**That worker only runs when background jobs run, and background jobs ship
disabled.** With no RabbitMQ channel pool the publisher takes a fallback path
instead — a spawned thread by default, with synchronous, raise and drop as the
alternatives — and the wrapper around them is commented "no retries, no sleeps".
So on shipped defaults a failed send is retried by nothing, at any layer. A wrong
SMTP password fails once and stays failed, and so does a momentarily unreachable
relay.

**Nothing was sent, and the log says `Suppressed`.** Every send checks a
suppression list first. An address with a recorded bounce or complaint is
skipped, logged as `[mail] Suppressed via SMTP to ab***@e***.com: <subject>`,
and nothing is dispatched. The check fails open — if it errors, the mail goes
out — so it can never cause an outage of its own.

That list is populated by ESP feedback ingestion, not by a single failed send. A
synchronous SMTP 5xx is recorded as a bounce *event* only; one rejection does
not suppress an address. There is no config key for the list: it is datastore
state, not configuration, so there is nothing to set here to change its
behaviour.

For the boot failures that are not about mail — datastore, `SECRET`, an
assetless UI — see [Verify your install](/en/install/verify).
