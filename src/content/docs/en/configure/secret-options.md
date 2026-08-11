---
title: Secret options
description: The lifetimes, passphrase rules, size limits and generator settings every secret is created under, which of them you can change, and what each one does when it refuses a request.
audience: operator
pageType: reference
sourceOfTruth: onetimesecret/etc/defaults/config.defaults.yaml:204-215,216-279 (the guest-route toggles and the whole site.secret_options block — default_ttl, the whitespace-separated ttl_options string, ttl_max_anonymous with its deprecated PLAN_TTL_ANONYMOUS alias and the note that the default is not an invariant, the four passphrase keys with the reason the minimum is 4, content.maximum_length, generated_value_display_ttl, and the password-generation defaults); onetimesecret/lib/onetime/config.rb:41,48-60,61-93 (the DEFAULTS hash — 7-day default_ttl, the 11-entry built-in duration list, the passphrase, content and password-generation defaults including symbols false), :392,:401-411 (coerce_ttl_seconds and the date/time refusal, whose message interpolates value.inspect, and the safe_load permitted_classes that let a Date reach it), :476-486 (ttl_options split on whitespace then to_i), :490-493,499-514 (default_ttl coerced, ttl_max_anonymous deliberately left uncoerced), :1280-1296 (deep_merge treating nil as "not specified", which is why an unset value keeps the built-in and why the YAML wins over DEFAULTS for symbols); onetimesecret/lib/onetime/errors.rb:5-11,44-46 with onetimesecret/lib/onetime/boot.rb:270-274 (ConfigError is a FatalBootError and always halts); onetimesecret/lib/onetime/models/features/with_entitlements.rb:43,48,72,84-105 (MAX_TTL at 365 days, the 7-day anonymous constant described as shipped default rather than invariant, and configured_anonymous_max_ttl clamping to 1..MAX_TTL, falling back on a malformed or non-positive value and logging it); onetimesecret/apps/api/v2/logic/secrets/base_secret_action.rb:101-115,120-126,128-139,165-182,192-212 (the floor from ttl_options.min, the default applied when no ttl is supplied, the entitlement gate, the 365-day safety clamp replacing the retired 30-day cap per issue 4008, the deliberate silent clamp for anonymous callers, and the lowest-of-the-ceilings resolution), :391-419,421-441 (passphrase length in characters with its three error strings, and the four complexity categories); onetimesecret/apps/api/v1/logic/secrets/base_secret_action.rb:45-58,350-381 (V1's own copy of validate_passphrase — the required rule and both length messages written identically to V2's, the configured minimum honoured, and enforce_complexity ignored by design); onetimesecret/apps/api/v1/application.rb:63 with onetimesecret/lib/onetime/application/base.rb:205-207 and onetimesecret/lib/onetime/application/registry.rb:147,157-165 (V1 is mounted unconditionally — no should_skip_loading? override exists under apps/api/v1), onetimesecret/apps/api/v1/controllers/index.rb:66,86,152,191 with onetimesecret/apps/api/v1/controllers/base.rb:43,50,60,71-74,86,156-157 (the anonymous-capable V1 secret endpoints, their rate limits, and the disabled-auth branch that only runs for a credentialed request); onetimesecret/lib/onetime/models/organization/features/with_materialized_limits.rb:69-84 (limit_for returns Float::INFINITY whenever billing is disabled, which is what makes ttl_options.max non-binding for an authenticated org caller on a stock instance); onetimesecret/lib/onetime/models/organization/features/with_plan_entitlements.rb:124-134 (free_tier_limits reading ENV['TTL_MAX_ANONYMOUS'] directly, without the deprecated alias), :23-32,48-56,199-200 (the standalone fail-open — full entitlement set, limits at infinity — that governs every gate on this page); onetimesecret/lib/onetime/logic/base.rb:181-193 (the byte-measured content ceiling, its error string, and why the client-side character hint is not the same budget); onetimesecret/apps/api/v2/logic/secrets/generate_secret.rb:37,44-55 (the pre-allocation length guard read from config rather than from the payload); onetimesecret/lib/onetime/utils.rb:47,58,117-134,136-165 (the ambiguous-character set, the safe fallback when every character set is disabled, the one-per-set guarantee and the SecureRandom shuffle); onetimesecret/lib/onetime/logic/guest_route_gating.rb:41-68,72-81 (the two refusal messages with their codes, and the gate applying only to an anonymous caller presenting no credentials); onetimesecret/lib/onetime/models/secret/features/secret_state_management.rb (the reveal and burn transitions, which no key under site.secret_options touches); onetimesecret/lib/onetime/initializers/print_log_banner.rb:101-104,392-428 (the Customization section of the boot banner and its four secret-option rows) emitted at :56 (header, info) and :109 (body, debug) on the Boot category via onetimesecret/lib/onetime/logger_methods.rb:130-132, whose shipped level is warn per onetimesecret/etc/defaults/logging.defaults.yaml (default_level and the loggers block) — with onetimesecret/lib/onetime/initializers/setup_loggers.rb:38-54,134-141,216-224,227-241 (an explicit per-category level is assigned over LOG_LEVEL/DEFAULT_LOG_LEVEL, and DEBUG_BOOT / DEBUG_LOGGERS are applied after) and onetimesecret/lib/onetime/utils/strings.rb:33,223-225 (the accepted truthy values); onetimesecret/apps/api/v1/logic/secrets/base_secret_action.rb:36-42,43,44 (the backward-compatibility header, V1_MIN_TTL 60, V1_MAX_TTL 2_592_000), :138-146 (v1 reads site.secret_options for default_ttl only), :150-151,153-162,170-177 (the plan-limit fallback to V1_MAX_TTL when billing is off, the lower-of-the-two, and the deliberate silent clamp ahead of the entitlement gate); onetimesecret/apps/api/v1/controllers/base.rb:142-157 (the three hardcoded rate-limit constants and the comment on their provenance), :161-181 (the fixed-window Lua counter and its key shape), :183-185 (the refusal message), :187-190 (the fail-open rescue), :168-169 with :50-74 (the exemption reaches only callers authenticated over Basic Auth)
---

Four things are decided the moment a secret is created: how long it may live,
whether a passphrase is needed to open it, how large its content may be, and —
when the caller asks the app to mint the value — how that value is generated.
Every one of them ships with a default and every one of them is yours to change.

The keys for all four sit under `site.secret_options` in `etc/config.yaml`, and
all but one of them also have an environment variable, so an instance configured
entirely through `.env` can set nearly all of them. The exception is
`password_generation.length_options`, which has no environment variable and can
only be set in YAML.

:::note[What your users see]
This page is the operator side of
[Sharing secrets](/en/share/), which describes the same settings from the point
of view of somebody creating a secret in the browser.
:::

## The durations you offer

`site.secret_options.ttl_options` (`TTL_OPTIONS`) is the list of lifetimes
presented on the create form, in seconds, written as **one whitespace-separated
string**:

```bash
TTL_OPTIONS="300 3600 86400 604800"
```

It is not comma-separated, and getting that wrong is silent. `TTL_OPTIONS`
splits on whitespace and each token is then read as an integer, so
`TTL_OPTIONS="300,3600"` yields one token, stops reading at the comma, and
leaves your instance with a single five-minute option. Nothing warns you.

Leave the key unset and the built-in list survives: an absent value means "not
specified", not "empty". The shipped list has eleven entries — 60 seconds, 5
minutes, 30 minutes, 1 hour, 4 hours, 12 hours, 1 day, 3 days, 7 days, 14 days,
30 days. Setting it to an *empty string* is different, and does wipe it.

The list is not only a menu. Its smallest entry is a floor and its largest is a
ceiling:

- A request for a shorter lifetime than the smallest entry is silently raised to
  it. (If the list resolves to nothing at all, the floor falls back to one
  minute.)
- The largest entry caps anonymous callers, in combination with the anonymous
  ceiling below.

`site.secret_options.default_ttl` (`DEFAULT_TTL`) is what a secret gets when the
caller supplies no lifetime at all. It ships at **7 days**. It is applied first
and then clamped like any other value, so a `default_ttl` outside your
`ttl_options` range is neither honoured nor rejected — it is quietly moved to
the nearest bound.

### A date in a TTL field stops the boot

TTL values are seconds. Writing an unquoted date into `default_ttl` — the shape
YAML happily parses as a `Date` — is refused outright rather than turned into a
nonsense lifetime, and refused fatally:

```text
site.secret_options.default_ttl must be a number of seconds, not a date/time (#<Date: 2026-08-10 ((2461263j,0s,0n),+0s,2299161j)>); quote the value or use integer seconds
```

The parenthesised part is the offending value as Ruby prints it, not the text
you wrote in the file, which is why a date arrives wrapped in Julian-day
arithmetic. A time renders plainly, as `2026-08-10 00:00:00 UTC`. In both cases
the fix is the one the message gives: quote it, or write integer seconds.

That is an `Onetime::ConfigError`, which always halts the boot. Strings and
decimals still coerce to integer seconds without complaint. The same guard
covers `features.incoming.default_ttl`.

## The ceilings, and which of them actually binds you

The ceilings described first are the ones the V2 and V3 secret endpoints apply.
API v1 applies a different set, at the end of this section.

There is an absolute upper bound of **365 days** that nothing can exceed. It is
not a knob.

If you have read that Onetime Secret caps secrets at 30 days, that is out of
date here: the hardcoded 30-day clamp that used to override every other ceiling
on this path was removed (issue #4008). 30 days remains the largest entry in the
shipped `ttl_options` list, which you can change. It is also still the ceiling on
API v1, [below](#api-v1-keeps-its-own-30-day-ceiling) — which is why the
statement has to name a path.

Beneath the 365-day bound, which ceiling applies depends on the caller:

- **Anonymous callers** get the lowest of the configured anonymous ceiling and
  the `ttl_options` maximum.
- **An authenticated caller whose request resolves an organization** is bounded
  by that organization's `secret_lifetime` limit. On a stock self-hosted
  instance billing is off, so every limit resolves to infinity — which means
  `ttl_options` **does not bind this caller at all** and the only remaining
  bound is the 365-day one. Your duration list still governs what the create
  form offers; an API client posting a longer `ttl` is not held to it.

There is also an entitlement gate that raises a loud error, rather than
shortening the secret, when an authenticated caller asks for more than the
free-tier lifetime. On a stock self-hosted instance it never fires: the
standalone entitlement set grants `extended_default_expiration` along with
everything else. Do not plan around it as though it were a limit you can tune —
there is no config key that sets an entitlement.

### Anonymous secrets have their own ceiling

`site.secret_options.ttl_max_anonymous` (`TTL_MAX_ANONYMOUS`) ships at **7
days** and is bounded to between one second and 365 days. The shipped comment
beside it calls that a sane default rather than a hard limit and says
self-hosted deployments may raise or lower it; the effective ceiling is the
lower of this value and the `ttl_options` maximum. Raising it is supported.

An anonymous request above the ceiling is **silently clamped, not rejected**,
and that is deliberate. The web form filters the durations it offers so a
browser never asks for more than it can have, but a `curl` or SDK caller that
posts 30 days on a default configuration gets a 7-day secret back and no
indication that anything was changed. If you have integrations creating
anonymous secrets, this is the setting to check before you go looking for a bug.

A malformed value does not stop the boot and is not read as zero. It falls back
to 7 days and says so:

```text
[WithEntitlements] Invalid site.secret_options.ttl_max_anonymous, using default
```

Zero and negative values take the same fallback, on the reasoning that `0`
almost certainly means "unset me" rather than "expire immediately".

`PLAN_TTL_ANONYMOUS` is the deprecated alias for the same setting, and it is
read on exactly one line — the shipped default that resolves the key — and
nowhere else. The free-tier limit that comes into play when billing is enabled
reads `TTL_MAX_ANONYMOUS` out of the environment directly and does not honour
the alias at all. Use `TTL_MAX_ANONYMOUS`.

### API v1 keeps its own 30-day ceiling

Everything above describes the V2 and V3 endpoints. API v1 carries its own
bounds as hardcoded constants — a **60-second floor** and a **30-day ceiling**,
neither taken from your configuration — and the code that declares them says
changing either would be a breaking change to the v1 contract. There is no key
for them.

On a self-hosted instance those constants are the whole answer. V1 takes the
lower of its own 30 days and whatever limit the caller's organization carries,
and with billing off it falls back to its own value, so 30 days is exactly the
ceiling. `TTL_OPTIONS` and `TTL_MAX_ANONYMOUS` do not move it: v1 reads
`site.secret_options` for `default_ttl` alone.

An over-ceiling `ttl` on v1 is clamped, not refused — and clamped before the
entitlement gate, so a request for a year comes back as a 30-day secret rather
than as an error. If you raise your ceilings and an integration still gets 30
days, check which API version it is on before you check your configuration.

## Passphrases

Four keys, all under `site.secret_options.passphrase`:

| Key | Environment variable | Ships as |
|---|---|---|
| `required` | `PASSPHRASE_REQUIRED` | `false` |
| `minimum_length` | `PASSPHRASE_MIN_LENGTH` | `4` |
| `maximum_length` | `PASSPHRASE_MAX_LENGTH` | `128` |
| `enforce_complexity` | `PASSPHRASE_ENFORCE_COMPLEXITY` | `false` |

The shipped default is that **no passphrase is required**, so on a stock
instance the link is the whole credential and whoever opens it first gets the
content. Setting `required` to true refuses creation without one:

```text
A passphrase is required for all secrets
```

A minimum of 4 is low, and the shipped comment says why it is what it is:
enough to stop a trivially guessable value while remaining compatible with
existing integrations. Raise it if your instance has no such integrations to
protect.

Both length checks count **characters**, unlike the content limit below, which
counts bytes:

```text
Passphrase must be at least 4 characters long
Passphrase must be no more than 128 characters long
```

Those three messages are the same on both APIs. The V1 and V2 secret logic hold
separate copies of this check, but the `required` rule and both length rules are
written identically in each, so a caller on an older integration sees exactly the
wording above.

`enforce_complexity` adds a requirement for at least one uppercase letter, one
lowercase letter, one digit and one symbol, and names the categories that are
missing:

```text
Passphrase must contain at least one uppercase letter, number, symbol
```

Two limits on that switch. The length and complexity checks run only against a
passphrase that was actually supplied: any caller who submits an empty one skips
both. With `required` left at false that is a legitimate way to create a secret,
so complexity constrains the passphrases people choose rather than guaranteeing
every secret has one. Turn `required` on as well if that is what you meant. A
caller who does supply a passphrase is held to complexity either way.

The second limit is scope, and it is where the two APIs diverge. Complexity is
the one passphrase rule V1 does not implement: the V1 secret paths ignore
`enforce_complexity` by design, to preserve behaviour older integrations depend
on, while still honouring `required` and the minimum and maximum lengths. So
that message above is one an operator will only ever see from a V2 or V3 client.
If complexity is a policy requirement rather than a preference, it is not
enforced everywhere.

## Content size

`site.secret_options.content.maximum_length` (`SECRET_MAX_LENGTH`) ships at
**10,000** and is measured in **bytes**. Content over the ceiling is rejected,
never truncated:

```text
Secret content must be no more than 10000 bytes long
```

The same value drives the character counter in the compose box, and those two
are not the same budget: a multibyte character can occupy up to four bytes, so
non-Latin content reaches the server ceiling well before the visible counter
suggests. Raising the ceiling raises the amount of data the datastore holds per
secret, which is what the limit exists to bound.

## Generated passwords

When a user asks the app to mint the value rather than typing one, these settle
what it mints. They live under `site.secret_options.password_generation`.

| Key | Environment variable | Ships as |
|---|---|---|
| `default_length` | `PASSWORD_GEN_LENGTH` | `12` |
| `maximum_length` | `PASSWORD_GEN_MAX_LENGTH` | `128` |
| `length_options` | — | `8, 12, 16, 20, 24, 32` |
| `character_sets.uppercase` | `PASSWORD_GEN_UPPERCASE` | on |
| `character_sets.lowercase` | `PASSWORD_GEN_LOWERCASE` | on |
| `character_sets.numbers` | `PASSWORD_GEN_NUMBERS` | on |
| `character_sets.symbols` | `PASSWORD_GEN_SYMBOLS` | on |
| `character_sets.exclude_ambiguous` | `PASSWORD_GEN_EXCLUDE_AMBIGUOUS` | on |

`length_options` is the exception noted at the top: no environment variable,
`etc/config.yaml` only, written either as a list or as a whitespace-separated
string in the same form as `ttl_options`.

`maximum_length` is a guard, not a preference: a request above it is refused
before the string is allocated, and the ceiling is read from your configuration
rather than from the request, so a caller cannot raise it by sending the key
itself.

```text
Generated password length must be no more than 128 characters
```

Two behaviours worth knowing before you touch the character sets. Disabling
every one of them does not produce an empty alphabet or an error — the generator
falls back to a built-in safe set, so switching everything off achieves nothing
you intended. And with more than one set enabled, the result is guaranteed to
contain at least one character from each; every character, including the final
shuffle, comes from a cryptographic random source.

`exclude_ambiguous` removes seven characters: `i`, `l`, `o`, `1`, `I`, `O` and
`0`. (The comment beside the setting in the shipped defaults lists five of them;
the code removes seven.)

One more setting belongs with this group.
`site.secret_options.generated_value_display_ttl`
(`GENERATED_VALUE_DISPLAY_TTL`) ships at **60** seconds and bounds *when* the
one-time display of a generated value on the receipt page may happen — not how
many times it may happen, which is once regardless. Setting it to `0` disables
the receipt-page display altogether, which means a generated password is never
shown to the person who created it.

## Removing anonymous operations

You can withdraw individual secret operations from callers who present no
credentials. The keys are under `site.interface.api.guest_routes`, all ship
enabled, and there is a global `enabled` above the six:

| Key | Environment variable |
|---|---|
| `enabled` | `API_GUEST_ROUTES_ENABLED` |
| `conceal` | `API_GUEST_CONCEAL` |
| `generate` | `API_GUEST_GENERATE` |
| `reveal` | `API_GUEST_REVEAL` |
| `burn` | `API_GUEST_BURN` |
| `show` | `API_GUEST_SHOW` |
| `receipt` | `API_GUEST_RECEIPT` |

The gate fires only when the caller is anonymous *and* presented no credentials
at all. An authenticated caller is never subject to it, so turning `conceal` off
makes creation an account-holders-only operation rather than switching it off.
That is only a policy if people can actually get accounts —
[Authentication](/en/configure/authentication) is the other half of the decision,
and its closed-instance section takes these switches together with the sign-up
gates.

A refused request carries one of two messages, with a matching code:

```text
Guest API access is disabled        (GUEST_ROUTES_DISABLED)
Guest conceal is disabled           (GUEST_CONCEAL_DISABLED)
```

### These switches do not reach API v1

The gate is called from the V2 and V3 secret logic and nowhere else. The V1 API
never consults it, and V1 is always mounted — nothing under
`site.interface.api` can keep it out of the URL map. With
`API_GUEST_ROUTES_ENABLED` set to false and every per-operation switch off
beneath it, a caller presenting no credentials can still create a secret through
`POST /api/v1/share`, `POST /api/v1/generate` and `POST /api/v1/create`, and
still reveal one through `POST /api/v1/secret/:key`.

Two things that does not mean. V1 is not unmetered — anonymous callers on those
paths are rate-limited, at **1000 creations and 1000 reveals per client IP per
20-minute fixed window**. And turning authentication off does not close it
either: V1's disabled-auth refusal sits inside the branch that handles a request
carrying credentials, so a request that sends none never reaches it.

Read that limit carefully before you count on it. All three numbers are
hardcoded constants with no config key and no environment variable. The window
is fixed rather than sliding, so a caller gets a fresh 1000 the moment it turns
over. Exceeding it returns `Rate limit exceeded. Please try again later.`;
losing the datastore makes the limiter **fail open** and the request proceeds.
Callers that authenticate with an API token are exempt, and anonymous callers
never are. And the client IP it counts against is the one the proxy layer
resolves, so on an install where
[the trusted-proxy settings](/en/install/reverse-proxy-and-tls) are left at
their shipped defaults behind a reverse proxy, every anonymous caller shares one
bucket.

Treat the switches above as what they are — they withdraw the anonymous route
from the current API. The v1 route stays open until something in front of the
app removes it.

## What none of these settings change

The behaviour that makes the product what it is has no knob at all. A secret is
revealed at most once, the claim is atomic, revealing destroys the stored
content, and a secret that was burned is indistinguishable from one that expired
or never existed. No key under `site.secret_options` touches any of it. The most
you can do is remove the anonymous route to an operation; you cannot change what
the operation does.

## Confirming a change took effect

The boot banner carries a **Customization** section built from the resolved
configuration, with rows for `Default TTL`, `TTL Options`, `Passphrase` and
`Password Generation`. Those are the values the app actually merged, after
defaults, environment and any `etc/config.yaml` have been reconciled — which
makes them worth more than re-reading your `.env`.

You have to ask for them. The banner goes to the `Boot` log category — its
header line at `info`, its whole body including that section at `debug` — and
`Boot` ships at `warn`, so a stock instance prints neither. Raising the global
level does not reach it: `LOG_LEVEL` and `DEFAULT_LOG_LEVEL` set the default for
categories that have no level of their own, and `Boot` has one. What works is
`DEBUG_BOOT=1`, set wherever the application process gets the rest of its
environment — the same `.env` your other variables live in — followed by a
restart. `DEBUG_LOGGERS=Boot:debug` does the same thing by name. Either has to
be present before start: the level is read once, while the loggers are being
built.
[Verify your install](/en/install/verify) covers the rest of the banner and what
a failed boot looks like.
