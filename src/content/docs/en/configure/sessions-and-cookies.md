---
title: Sessions and cookies
description: Where the session settings live, why the session cookie is Secure on any production deployment, and what a silently dropped cookie looks like in the log.
audience: operator
pageType: how-to
sourceOfTruth: onetimesecret/etc/defaults/config.defaults.yaml:367-407 (every shipped session default, the deliberate omission of the secure key when SSL is not true, the SameSite and httponly comments, and the skip_paths list with its warning); onetimesecret/lib/onetime/boot.rb:79-101 (SESSION_DEFAULTS and the note that an operator-defined skip_paths replaces the shipped list wholesale), :235 (the resolved list is logged at boot, on the Boot category at info) with onetimesecret/etc/defaults/logging.defaults.yaml (default_level warn, and the loggers block entry for Boot, also warn), onetimesecret/lib/onetime/initializers/setup_loggers.rb:38-54,134-141,216-224,227-241 (LOG_LEVEL and DEFAULT_LOG_LEVEL set only the global default, an explicit per-category entry is assigned over it, and the DEBUG_* / DEBUG_LOGGERS overrides are applied afterwards) and onetimesecret/lib/onetime/logger_methods.rb:130-132 (boot_logger is the Boot category), :353-367 (the session-secret fallback to site.secret and the secure fallback), :402-404 (ssl_enabled? is site.ssl OR RACK_ENV production), :128 (an unset RACK_ENV resolves to production); onetimesecret/lib/onetime/application/middleware_stack.rb:429-445 (the five keys the session middleware is handed, so no domain and no httponly, and the SessionSkip middleware that consumes skip_paths); onetimesecret/lib/onetime/session.rb:18-49 (the storage layout and what the cookie carries), :36-41 (the secret does not hide the session id), :60 (the store subclasses Rack PersistedSecure), :94-104 (the fallback to site.secret and the ArgumentError when neither is set), :107-109 (why the cookie is not named rack.session), :126-129 (the codec), :140-149 (the datastore key is written with expire_after as its TTL), :246-249 (the override is observability-only and does not change Rack's decision), :261-272 (the throttled warning and its verbatim text), :286-294 (the scheme evidence logged with it), :459-469 (a payload whose HMAC does not verify becomes an empty session); onetimesecret/lib/onetime/key_derivation.rb:36-47,55-67,79-95 (HKDF, the purposes, and the two session sub-keys); onetimesecret/lib/tasks/init.rake:137-146 (rake ots:secrets re-derives the child keys from SECRET); onetimesecret/lib/onetime/config.rb:34-36 (SERVICE_PATHS), :329-360 (the shipped defaults file is deep-merged under the operator file), :961-969 (a missing SECRET is fatal at config load), :1143-1145 (path resolution) with onetimesecret/lib/onetime/utils/config_resolver.rb:36,56-59,71-73 (etc/config.yaml is the override layer over etc/defaults/config.defaults.yaml) and onetimesecret/lib/onetime/boot.rb:152,161 (config is loaded once at boot); onetimesecret/etc/defaults/auth.defaults.yaml:10-11 with onetimesecret/lib/onetime/auth_config.rb:57-58 (session config is auth-mode agnostic and was moved out of auth.yaml); onetimesecret/etc/defaults/config.defaults.yaml:612 (ASSUME_HTTPS ships false); onetimesecret/Dockerfile:303,415 with onetimesecret/docker/compose/docker-compose.simple.yml:30 and onetimesecret/docker/compose/docker-compose.full.yml:67 (the published image and both stacks run RACK_ENV production); rack-session 2.1.2, the version onetimesecret/Gemfile.lock:336 locks, lib/rack/session/abstract/id.rb:350-356,371-374,390 (a Secure cookie over a request the store sees as non-SSL fails security_matches? and commit_session returns early, so the cookie is never written)
---

The session middleware is handed five settings — the secret, the lifetime, the
cookie name, `Secure` and `SameSite` — plus a list of paths that must not mint a
session at all. Only the secret has an environment variable, one of the five is
derived at boot rather than set, and that derived one is what breaks installs
behind a proxy. Session handling is identical in simple and full mode; the
settings live in the site config rather than in `auth.yaml` for exactly that
reason.

## Where these settings live

Under `site.session` in `etc/config.yaml`. The shipped
`etc/defaults/config.defaults.yaml` is deep-merged underneath it, so your file
carries only the keys you change; if you have no `etc/config.yaml` at all, the
shipped defaults file is itself the resolved config. Configuration is resolved
and loaded once, at boot — restart the application after editing it.

```yaml
site:
  session:
    expire_after: 86400
    key: onetime.session
    same_site: lax
```

`SESSION_SECRET` is the only session setting with an environment variable.
`expire_after`, `key`, `same_site`, `httponly` and `skip_paths` are YAML-only, so
an instance configured entirely through environment variables cannot change any
of them. Nothing warns you about this: an environment variable that is never read
looks exactly like one that is.

## The Secure flag is derived, and a proxy that hides the scheme drops the cookie

The shipped configuration emits `site.session.secure` **only** when the `SSL`
environment variable is `true`. Omitting the key is deliberate — when it is
absent, boot fills it from `site.ssl` **or** `RACK_ENV=production`. The published
image and both Compose stacks run `RACK_ENV=production`, and an unset `RACK_ENV`
resolves to production too. So on an ordinary deployment the session cookie is
`Secure` whether or not you ever set `SSL`. Setting `SSL=true` forces the flag on;
leaving `SSL` unset does not turn it off.

That matters because of what Rack does next. The session store subclasses Rack's
`PersistedSecure`, which refuses to write a `Secure` cookie over a request it sees
as plain HTTP: the security check fails, committing the session returns early, and
the cookie is never written. The session is never persisted. The response looks
completely normal. Sign-in appears to succeed, the next request arrives with no
session, and there is nothing in the browser or in the HTTP status to explain it.

The application does not override that decision — deliberately. What it does is
make the drop visible:

```text
[Session] cookie NOT written: secure cookie over a request the app sees as non-SSL. Behind a TLS-terminating proxy, forward X-Forwarded-Proto: https or set ASSUME_HTTPS=true.
```

The warning carries the scheme signals Rack actually saw — `rack_url_scheme`,
`x_forwarded_proto`, `x_forwarded_ssl`, `https`, and whether an RFC 7239
`Forwarded` header was present at all — so the log distinguishes a proxy that
forwarded `http` from a proxy that forwarded nothing. It is throttled to one
emission per process per five-minute interval, so a single line can stand for
every failed sign-in in that window. Do not read the number of lines as a number
of affected users.

The fix is at the edge, not here: have the proxy forward `X-Forwarded-Proto`.
[Reverse proxy and TLS](/en/install/reverse-proxy-and-tls) has the nginx, Caddy
and Apache configuration, and covers `ASSUME_HTTPS` — the escape hatch for a
terminator that cannot forward the scheme at all, which ships off.

## What the cookie carries

The cookie holds a session id and nothing else: a plain 64-character hex string,
identical to the one in the datastore key. The payload lives server-side at
`session:<id>` — JSON, AES-256-GCM encrypted, Base64 encoded, HMAC signed.

The session secret does not hide the id; the application says so in its own
source. The id is visible to anyone who can read the cookie. What the secret
protects is the payload's integrity and confidentiality, through two HKDF
sub-keys derived from it — one for the HMAC, one for the encryption — so a single
secret yields two independent keys.

There is no cookie `domain` option. The middleware is handed exactly five keys —
`secret`, `expire_after`, `key`, `secure`, `same_site` — so the cookie is
host-only and cannot be widened to a parent domain.

The protection that guards this cookie against session fixation through cookies
set on subdomains is not a session setting at all. It is `cookie_tossing`, one
of the middleware toggles on
[Security headers](/en/configure/security-headers), and it ships off.

## The session secret

`SESSION_SECRET` is optional. Unset, it falls back to `site.secret`, which is
`SECRET`. With neither available the session middleware raises at boot:

```text
SESSION_SECRET is not set and no site secret available
```

You will rarely see that one, because a missing `SECRET` is already fatal earlier
in config load. It surfaces when that earlier refusal was waived with
`ALLOW_NIL_GLOBAL_SECRET`.

**Changing the secret signs everyone out, and does it quietly.** A stored payload
whose HMAC no longer verifies is not treated as an error — the store logs
`Session HMAC verification failed`, substitutes an empty session, and the request
continues as not signed in. Two ordinary operations hit this: rotating `SECRET` on
an instance that never set `SESSION_SECRET` explicitly, and re-running
`rake ots:secrets`, which re-derives the child keys — `SESSION_SECRET` among them
— from `SECRET`. Neither fails. Every live session simply stops being a session.

## Lifetime

`site.session.expire_after` ships at 86400 seconds, 24 hours. No environment
variable.

The same value is written as the TTL on the `session:<id>` datastore key, so an
expired session is not merely a cookie the browser stops presenting — the stored
payload is gone with it.

## SameSite, HttpOnly and the cookie name

`same_site` ships `lax`. The shipped configuration documents `strict`, `lax` and
`none`, and records why `strict` is not the default: it blocks cookies on
cross-site GET navigations, which breaks Stripe and OAuth redirect flows. If you
tighten it, that is what you are trading away.

`httponly` ships `true` and is not a working toggle. It is never handed to the
session middleware — the five keys above are the complete set — and the shipped
comment gives the reason: the flag is always true in Rack. Do not plan any change
around turning it off.

`key` is the cookie name, `onetime.session`. It is deliberately not Rack's default
`rack.session`, to blunt session fixation.

## Paths that must not mint a session

Health and status endpoints are polled by load balancers, uptime monitors and
orchestrators, none of which keep cookies. Every poll used to write a
`session:<hex>` key carrying the full lifetime TTL. `site.session.skip_paths` is
the list that stops it, and it ships with six entries: `/health`,
`/health/advanced`, `/auth/health`, `/api/v1/status`, `/api/v2/status` and
`/api/v3/status`.

Matching is exact string equality against the full external path as the client
sees it. `/health/` with a trailing slash is not `/health`, and a probe path of
your own has to be listed byte for byte.

**An operator-defined `skip_paths` replaces the shipped list wholesale.** It does
not merge. A config file that lists one probe path of your own drops all six
entries above, and the only symptom is session keys accumulating again.

Boot writes the resolved list, but you will not see it on a stock instance:

```text
Session skip_paths: ["/health", "/health/advanced", "/auth/health", "/api/v1/status", "/api/v2/status", "/api/v3/status"]
```

That line goes to the `Boot` log category at `info`, and `Boot` ships at `warn`,
so nothing is printed. Raising the global level does not reach it either —
`LOG_LEVEL` and `DEFAULT_LOG_LEVEL` set the default for categories that have no
level of their own, and `Boot` has one. Start the process with `DEBUG_BOOT=1` in
its environment and the line appears, along with the rest of the boot banner.
`DEBUG_LOGGERS=Boot:debug` does the same thing. Either has to be set before
start; nothing re-reads it afterwards.

Never list `/api/v*/secret/*/status`. The shipped configuration says so in as many
words: those are capability-token data reads audited as secret activity, not
probes, and skipping session handling on them is not a performance tweak.
