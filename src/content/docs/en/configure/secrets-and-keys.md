---
title: Secrets and keys
description: The secrets you have to set before an instance is worth running, what each one protects, and which of them nothing can regenerate for you.
audience: operator
pageType: how-to
sourceOfTruth: onetimesecret/etc/defaults/config.defaults.yaml:7-11,12,13-20,371-372,1492 (the shipped "do not change the secret" comment and the runbook it points at, SECRET with no shipped default, the three secret_verifier_mode values with warn as the shipped one, SESSION_SECRET falling back to site.secret, and allow_nil_global_secret shipping false); onetimesecret/lib/onetime/config.rb:39,939-942,961-984 (the DEFAULTS entry, the whole of the SECRET validation — CHANGEME normalised to nil, the fatal error text, the escape hatch and its warning banner, and the absence of any length or charset rule — and the escape hatch being forced back to false when development.enabled is false); onetimesecret/lib/onetime/key_derivation.rb:19-23,26,36-47,55-67 (the four HKDF-SHA256 purposes with their info strings and lengths, the onetimesecret-v1 salt, and which two are runtime only); onetimesecret/lib/tasks/init.rake:13,15,125-127,132,137-146,149,152-157,159-176,177,197,232-291 (the three independent secrets at 32 bytes each, the .env target and its ENV_FILE override, the preserve-or-regenerate ladder including FORCE, the derived pair written while the runtime-only purposes are skipped, the five-word federation passphrase, the 64-bytes-of-entropy report, and the verify exit codes with the CONFIRM=yes gate on adopt); onetimesecret/lib/onetime/initializers/configure_familia.rb:26-30,32-44,49-70,72-77,118-120,124-146 (v2 encryption at rest with the v1 fallback retired, the oldest-first SECRET_PREVIOUS rule, how the decrypt-only key list is built, the content-addressed tag on new writes, and the IDENTIFIER_SECRET fallback derivation); onetimesecret/lib/onetime/secret_verifier.rb:15-23,33,35,54-60,68-92,94-118 (the verifier contract, the onetime:secret_verifier datastore key, the four outcomes, warn as the fallback for an unset or unrecognised mode, and status/adopt); onetimesecret/lib/onetime/initializers/check_secret_verifier.rb:31-33,35-62 (the boot wiring, the off skip, the enforce raise, and that a decrypt which cannot succeed does not consume the secret); onetimesecret/apps/web/core/controllers/health.rb:102-125 (the health error string that surfaces a mismatch); onetimesecret/lib/onetime/utils/totp.rb:81-85 (TOTP raising without AUTH_SECRET); onetimesecret/etc/defaults/auth.defaults.yaml:19,151-155 with onetimesecret/lib/onetime/auth_config.rb:73-75 (ARGON2_SECRET as an optional pepper living under the full block); onetimesecret/apps/web/auth/config/base.rb:11-27 (the two Rodauth guards, the production requirement, the 32-byte floor on ACCOUNT_ID_SECRET, and an unset RACK_ENV failing closed to production); onetimesecret/docker/README.md:66-72 (the shipped table splitting required, derived, independent and federation, including federation being multi-region only); onetimesecret/docker/compose/docker-compose.full.yml:74,75,76,77 (the empty-default interpolation that lets the full stack start without the three independent secrets, next to the mode defaulting to full)
---

Onetime Secret has one root secret and three that are not derived from it.
`SECRET` decides whether stored secrets can be decrypted. Two of the other three
decide whether the full-mode authentication layer boots at all, and the third
decides whether the passwords already on the instance still work. None of the
four can be reconstructed from the others, and none can be recovered from a
backup you did not take.

## Generate all of them in one step

From a source checkout:

```bash
bundle exec rake ots:secrets
```

The task writes into `.env` in the current directory, which from a checkout is
the repository-root `.env` the Compose stacks read as their `env_file`;
`ENV_FILE=path` points it somewhere else. It is safe to re-run. An existing
`SECRET` that is neither empty nor the literal `CHANGEME` is kept and only the
derived keys are recomputed; `FORCE=1` replaces it. The independent secrets and
the federation secret are likewise kept when already set, so re-running never
silently replaces them. `DERIVE=1` recomputes the derived keys alone and aborts
if the file carries no usable `SECRET`.

A newly generated `SECRET` is 64 random bytes, reported as 128 hex characters.

If you are running a published image rather than a checkout, generate each of
them with `openssl rand -hex 32` and put them in the environment.
[Install with Docker](/en/install/docker) covers which of them each Compose stack
refuses to start without, and which it will let you forget.

## SECRET and the four keys under it

`SECRET` is the root. YAML `site.secret`, environment variable `SECRET`, no
shipped default. Four keys are derived from it with HKDF-SHA256 over the fixed
salt `onetimesecret-v1`, each with its own `info` string:

| Derived key | `info` | Length | Written to `.env` |
|---|---|---|---|
| `SESSION_SECRET` | `session` | 64 bytes | yes |
| `IDENTIFIER_SECRET` | `verifiable-id` | 32 bytes | yes |
| familia-enc | `familia-enc` | 32 bytes | no, runtime only |
| key-verifier | `key-verifier` | 32 bytes | no, runtime only |

The familia-enc key is the one you never see and the one every stored secret
depends on. It encrypts secret content at rest, as a v2 key; the pre-2026-07-18
unsalted-SHA-256 v1 fallback has been retired, so with no `SECRET_PREVIOUS` set
there is exactly one encryption key in play and it comes from `SECRET`.

The two keys that do get written are conveniences rather than requirements.
`SESSION_SECRET` unset falls back to `site.secret`. `IDENTIFIER_SECRET` unset or
blank makes the app derive the value itself at boot, from `site.secret`, through
the same `verifiable-id` purpose the task uses — so an install that ran the task
and an install that never did end up with the same key.

## A SECRET the app accepts is not the same as a SECRET you should use

The boot check is exactly two conditions: not nil, and not the literal string
`CHANGEME`, which is normalised to nil. There is no minimum length, no charset
rule and no entropy estimate anywhere in the boot path. A one-character `SECRET`
boots, and everything on the instance is encrypted under it. Nothing will tell
you. Use what the task generates.

With no `SECRET` at all, config load is fatal:

```text
Global secret cannot be nil - set SECRET env var or site.secret in config
```

There is one escape hatch, `development.allow_nil_global_secret` (environment
variable `ALLOW_NIL_GLOBAL_SECRET`), which downgrades that failure to a
multi-line warning banner. It ships `false`, it lives under the `development:`
block, and config forces it back to `false` whenever `development.enabled` is
false. It is not a production option.

## The three secrets nothing can regenerate

`AUTH_SECRET`, `ARGON2_SECRET` and `ACCOUNT_ID_SECRET` are generated with
`SecureRandom` at 32 bytes each. They are not derived from `SECRET`, they cannot
be reconstructed from it, and each one rotates without invalidating the other
two. Back them up individually, alongside `SECRET`.

These are full mode's secrets. The authentication application is skipped entirely
unless the mode is `full`, which is what puts the guards below in the boot path
at all; the full Compose stack defaults the mode to `full`.
[Authentication](/en/configure/authentication) is where that mode is set, and
what else moves with it.

**`AUTH_SECRET`** is Rodauth's HMAC key. The auth application enables the
`hmac_secret_guard` feature and points it at `AUTH_SECRET`; in production the
secret is required and boot raises when it is missing. The guard itself lives in
the `rodauth-tools` gem rather than in the application, so there is no error
string in the app's own source to search your logs for — what you get is a boot
that stops. TOTP is a separate check inside the application, and it raises

```text
AUTH_SECRET environment variable must be set
```

**`ACCOUNT_ID_SECRET`** obfuscates the numeric account id inside email-link
tokens and the remember-me cookie, and it goes through the same guard plumbing.
The rule the application states beside it is one sentence: `ACCOUNT_ID_SECRET
(>= 32 bytes) is required in production (boot raises if missing)`. Both halves
of that — the requirement and the 32-byte length — are scoped to production.
Nothing in the application says what a shorter value does elsewhere, so set 32
bytes everywhere rather than relying on a short one being caught.

"In production" is not a condition you can dodge by leaving `RACK_ENV` out: an
unset `RACK_ENV` fails closed to production, so it gets the hard failure rather
than a lenient development path.

**`ARGON2_SECRET`** is optional — a pepper folded into password hashes for
defence in depth. Unset means argon2id with no pepper, which is not an error and
does not stop the boot. The trap is on the other side: introducing it later, or
changing it, invalidates every password hash that already exists. Set it before
the instance has accounts. It is a full-mode value, `full.argon2_secret` in
`etc/auth.yaml`.

### Nothing at the Compose layer will stop you

`SECRET`, `VALKEY_PASSWORD`, `RABBITMQ_USER` and `RABBITMQ_PASS` are interpolated
with Compose's fail-fast form. These three are not — they use the empty default,
so an unset value becomes the empty string and `docker compose up` proceeds with
no error and no warning. For `AUTH_SECRET` and `ACCOUNT_ID_SECRET` that means the
containers get created, the datastore and broker pass their healthchecks, and the
application container fails at boot. Nothing in the Compose output names the
missing variable; the failure is in the app container's log. [Install with Docker](/en/install/docker) has the commands that avoid
this.

## Changing SECRET

Every value already stored was encrypted under a key derived from the old
`SECRET`. Change it and none of that opens again. The shipped configuration says
so in its own comment, and points at the app repository's
`docs/runbooks/secret-rotation.md` for the procedure.

The condition is detected rather than hidden. At first boot an HKDF-derived
verifier is written to the datastore under `onetime:secret_verifier` with a
`SET NX` and compared on every boot after that, giving four outcomes: `adopted`,
`ok`, `mismatch`, `unavailable`.

What happens on a `mismatch` is the policy knob `site.secret_verifier_mode`
(environment variable `SECRET_VERIFIER_MODE`), with three values:

- `warn` — log loudly and keep booting. **This is the shipped default**, and an
  unset or unrecognised value falls back to it deliberately: halting by default
  would brick running deployments on their first upgrade.
- `enforce` — refuse the boot, raising `Onetime::SecretVerifierMismatch`.
- `off` — skip the check entirely.

So on a stock instance a wrong `SECRET` stops nothing. It is said twice, in two
different wordings, on two different surfaces. The boot log says it first, at
error level, and follows this line with the likely causes and the fix:

```text
[secret_verifier] SECRET MISMATCH: the running SECRET is not the one this datastore's existing data was encrypted with.
```

`GET /health/advanced` says it again, as the `error` field of its
`secret_verifier` sub-check — which is what degrades the endpoint's top-level
status:

```text
SECRET does not match the datastore key verifier; existing secrets cannot be decrypted
```

[Verify your install](/en/install/verify) has where to curl that from and what
else it covers.

One thing does go right on its own: a decrypt that cannot succeed does not
consume the secret. A reveal attempted across a bad rotation fails without
burning the secret it could not read.

### Rotating on purpose

`SECRET_PREVIOUS` is the supported route. It takes a comma-separated,
**oldest-first** list of prior secrets, registered decrypt-only, so envelopes
written before the rotation keep opening while new writes use a content-addressed
tag derived from the current `SECRET`. Append the outgoing `SECRET` to that list
on each rotation rather than replacing it.

Then re-stamp the verifier, or every subsequent boot reports the mismatch you
caused on purpose:

```bash
bundle exec rake ots:secrets:verify            # report only
CONFIRM=yes bundle exec rake ots:secrets:adopt
```

`verify` exits 0 when the stored verifier matches, 1 on a mismatch, 2 when no
verifier has ever been adopted, and 3 when the datastore is unreachable. `adopt`
does nothing without `CONFIRM=yes`.

## FEDERATION_SECRET

The fifth category, and the only one that is not per-instance: a generated
five-word passphrase, shared across instances. The task mints one and never
overwrites an existing value. It is multi-region only and has no role on a
single-region instance.

## What to back up

`SECRET`, `AUTH_SECRET`, `ARGON2_SECRET`, `ACCOUNT_ID_SECRET` and
`FEDERATION_SECRET`. Those five are the whole list, because everything else is
recoverable: `SESSION_SECRET` and `IDENTIFIER_SECRET` come back from `SECRET`
through HKDF, and the two runtime-only keys are derived at each boot rather than
saved.
