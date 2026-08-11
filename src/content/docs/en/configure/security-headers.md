---
title: Security headers
description: Which security headers Onetime Secret emits, which values you cannot change from its config, and what the shipped proxy adds or overrides on top.
audience: operator
pageType: how-to
sourceOfTruth: onetimesecret/etc/defaults/config.defaults.yaml:411-450 (the ten site.middleware toggles, their MIDDLEWARE_ env vars, and which six ship on); onetimesecret/etc/defaults/config.defaults.yaml:453-465 (CSP on by default via CSP_ENABLED, and the shipped note that the per-request nonce is available for custom script and style assets); onetimesecret/lib/onetime/middleware/security.rb:37-47,92-98 (the five security-critical toggles and the verbatim warn line a disable writes); onetimesecret/lib/onetime/middleware/security.rb:120-253 (the nine Rack::Protection components each toggle registers, the deliberate exclusion of EscapedParams at :209-212, and frame_options and strict_transport registered with no options at :221-224 and :244-248); onetimesecret/lib/onetime/middleware/security.rb:157-199 (the four CSRF bypasses in evaluation order — /auth/sso/* at :162, /auth/email-login at :168, the /api/ block at :183-190 with the Basic-Auth test at :184 and the authenticated-session test at :186-187, /billing/webhook at :196, and the closing false at :198 — against the shipped comment at :134-141 which lists only the first and third); onetimesecret/lib/onetime/application/middleware_stack.rb:511 (Onetime::Middleware::Security is a universal mount, so the Rack::Protection components wrap every app) with onetimesecret/lib/onetime/middleware/security.rb:77-111 (the builder that uses each enabled component and nothing else); onetimesecret/apps/api/v1/application.rb:91 (the router's not_found tuple, built without otto's per-route headers); onetimesecret/lib/onetime/middleware/static_files.rb:80-89 with onetimesecret/apps/web/core/application.rb:82-90 (MIDDLEWARE_STATIC_FILES gates asset serving and is not a protection); onetimesecret/apps/web/core/middleware/request_setup.rb:35-44,72-111 (the per-request nonce, HTML-only emission, and backstop mode) mounted only at onetimesecret/apps/web/core/application.rb:39, so the CSP layer is Core-only; otto-2.8.0/lib/otto/security/config.rb:112 (@security_headers = default_security_headers, seeded on every Otto instance) applied by plain assignment at otto-2.8.0/lib/otto/route.rb:187-192 and otto-2.8.0/lib/otto/route_handlers/base.rb:148-153, inside no content-type condition; rack-protection-4.2.1/lib/rack/protection/frame_options.rb:32-36 (||= gated on html? headers), strict_transport.rb:34-38 (||=, unconditional) and xss_header.rb:19-24 (x-xss-protection gated on html?, x-content-type-options not); onetimesecret/apps/web/core/application.rb:124-135 (nonce CSP enabled, and form-action widened with the active SSO origins); onetimesecret/lib/onetime/auth_config.rb:338-371,528-543 (where those IdP origins come from and the SSO_FORM_ACTION_ORIGINS override); otto-2.8.0/lib/otto/security/csp/policy.rb:254-268 (the twelve production directives) and :230-244 (the looser development set), pinned by onetimesecret/Gemfile:24 and onetimesecret/Gemfile.lock:278; otto-2.8.0/lib/otto/security/core.rb:219-222 with a repo-wide grep for report-uri and report-to (the gem supports CSP reporting, OTS never enables it, and nothing else adds it); otto-2.8.0/lib/otto/security/config.rb:905-911 applied at otto-2.8.0/lib/otto/route.rb:189 (the referrer, nosniff and XSS headers the app sends per route, which OTS never overrides); rack-protection-4.2.1/lib/rack/protection/frame_options.rb:22,32-35 (the SAMEORIGIN gem default, and the `html? headers` gate that scopes it) and rack-protection-4.2.1/lib/rack/protection/strict_transport.rb:23,34-38 (the one-year HSTS gem default); onetimesecret/apps/web/core/templates/partials/head-base.rue:7-9 (the referrer, nosniff and Permissions-Policy meta tags in the head template); onetimesecret/etc/examples/Caddyfile-example:187-217,394 (the shipped proxy header block and the server block that imports it) with onetimesecret/docker/variants/caddy.dockerfile:123 and onetimesecret/docker/compose/docker-compose.full.yml:52 (that file is baked into the caddy image and mounted into the full-stack proxy service); onetimesecret/apps/web/core/controllers/page.rb:83,94,99 (the app's only Cache-Control writes, all permissive); onetimesecret/apps/api/v1/controllers/helpers.rb:24-25 (API v1 emits no CSP and no nonce); onetimesecret/apps/web/auth/application.rb:33,35,38-43 (the Auth app's own six Rack::Protection mounts inside an Onetime.production? block, plus Rack::Deflater) with :22-24 (the full-mode-only load guard), :53-61 (build_router returns the Roda class, "Unlike Otto apps") and onetimesecret/lib/onetime/class_methods.rb:422-424,445-454,479-483 (production? resolves through env, which defaults RACK_ENV to production); onetimesecret/lib/onetime/application/base.rb:166-171,224-225 (the universal MiddlewareStack is configured before an app's own use calls, so the app's own mounts sit inside it); rack-protection-4.2.1/lib/rack/protection/content_security_policy.rb:40,53-69,71-76 (default_src 'self' as the whole default policy, one directive per option key, and the ||= behind an html? gate), .../http_origin.rb:23,26-30,32-40 and .../base.rb:12-19,39-42,82-85,92-110 (the 403 deny, the computed base URL, the safe-method list and drop_session), .../ip_spoofing.rb:14-24, .../session_hijacking.rb:17-30 (User-Agent tracking with a drop_session reaction, and no site.middleware key anywhere); rack-3.2.6/lib/rack/request.rb:254-264,746-761 (scheme resolution through Forwarded and X-Forwarded-Proto) with onetimesecret/lib/onetime/application/middleware_stack.rb:368-376 and onetimesecret/lib/onetime/middleware/assume_https.rb:22-28,46,49-59 (the app naming "the mounted auth app's HttpOrigin check" as an ASSUME_HTTPS consumer); onetimesecret/apps/web/auth/config/base.rb:61 (only_json?) with onetimesecret/apps/web/auth/router.rb:28,53,56,110-111 and roda-3.106.0/lib/roda/plugins/json.rb:79,93-95 plus roda-3.106.0/lib/roda/response.rb:108-128,180,212-217 (application/json for JSON results, text/html as the default for everything that sets no content type, including redirects); Gemfile.lock:318,330,377 (rack 3.2.6, rack-protection 4.2.1, roda 3.106.0)
---

Two things emit security headers on a Onetime Secret deployment, and Onetime
Secret's own configuration sets the value of neither. The application emits a
set whose values belong to the gems it is built on, from four separate layers
that cover four different sets of responses — so "the app sends header X" is
only ever true of some responses, and which ones depends on X. If you run the
full Docker Compose stack, the Caddy config that ships with it emits a second
set on top, and overrides two of the application's values in the process.

So the first thing to settle is which layer owns your header values, because
tuning them is edge work in every case.

## What Onetime Secret's config actually controls

Two kinds of switch, both on/off:

- `site.security.csp.enabled` / `CSP_ENABLED` — Content-Security-Policy, on by
  default.
- ten `site.middleware.*` keys, each with a `MIDDLEWARE_*` environment variable.

That is the whole surface. No key sets a header *value* — not the HSTS
`max-age`, not `X-Frame-Options`, not the referrer policy. One environment
variable reaches into a CSP directive, `SSO_FORM_ACTION_ORIGINS`, described
below; nothing else does. Changing any other value means changing it at your
reverse proxy. See
[Reverse proxy and TLS](/en/install/reverse-proxy-and-tls) for the proxy
configurations themselves.

## Content-Security-Policy

Onetime Secret has two Content-Security-Policy headers, emitted by two different
applications on two different parts of the URL space, and only one of them has a
switch. A full-mode production instance sends both. This section describes the
one with the switch; the other is under
[The `/auth` app sends a second CSP](#the-auth-app-sends-a-second-csp), and
`CSP_ENABLED` does not reach it.

CSP ships on. `CSP_ENABLED=false` turns off the policy described here, and that
is the only CSP knob Onetime Secret owns.

The header goes out on HTML responses only, in backstop mode — it never
overrides a policy a route has already set. The middleware that emits it,
`Core::Middleware::RequestSetup`, is mounted in the Core web app and nowhere
else, so no `/api/*` response carries this policy whatever its content type.
API v1 states the reasoning in its own code: it serves JSON and no browser
executes it.

The production policy is twelve directives:

```text
default-src 'none'
script-src 'nonce-<per-request>'
style-src 'self' 'unsafe-inline'
connect-src 'self' wss: https:
img-src 'self' data:
font-src 'self'
object-src 'none'
base-uri 'self'
form-action 'self'
frame-ancestors 'none'
manifest-src 'self'
worker-src 'self' blob:
```

That list lives in the `otto` gem, pinned `~> 2.8` and locked at `2.8.0`. No
Onetime Secret key adds a directive to it or removes one; the single value the
application changes is `form-action`, immediately below. An instance running in
development mode gets a looser set instead; the strict set above is what a
production instance sends.

`script-src` is nonce-based. A fresh 16-byte base64 nonce is minted per request
into `env['onetime.nonce']`, and the shipped views stamp it onto their `<script>`
and `<link>` tags. If you inject a script or style asset of your own, it has to
carry that nonce — the shipped config says as much at the point where it turns
CSP on.

### form-action is the one directive that widens by itself

Enabling SSO adds the active IdP origins to `form-action` automatically, and it
is a no-op when no provider is configured. `SSO_FORM_ACTION_ORIGINS`, space
separated, is the manual override — that is what you reach for with a sovereign
cloud endpoint or with per-domain SSO, where the origin is not one the app can
derive. [Configure SSO](/en/configure/sso) has both halves of that: which
origins the application can work out for itself, and which of the two SSO
surfaces you are on.

### Nothing reports CSP violations

No `report-uri` and no `report-to` directive is emitted, and there is no config
key for either. The `otto` gem supports reporting; Onetime Secret never turns it
on, and the shipped proxy config does not add it. A blocked request produces no
report anywhere, so a CSP problem in a customisation surfaces as a broken page
and nothing else.

### Turning CSP off costs you more than the directive list

`frame-ancestors 'none'` is stricter than the `X-Frame-Options: SAMEORIGIN` the
app sends alongside it, and modern browsers honour `frame-ancestors` where the
two disagree. With CSP on, embedding is blocked outright. With CSP off, your
anti-framing control falls back to whatever `X-Frame-Options` says — which on a
bare app is same-origin framing, not no framing.

### The `/auth` app sends a second CSP

Full mode mounts a separate application at `/auth`, described in
[Authentication](/en/configure/authentication). That application declares six
`Rack::Protection` components of its own, on top of the ones the toggles below
govern, and one of them is `Rack::Protection::ContentSecurityPolicy`.

Two conditions gate all six, both decided when the process loads rather than per
request:

- the auth mode is `full` — the app does not load at all otherwise;
- the environment resolves to production. An unset `RACK_ENV` resolves to
  production, and the published image and both Compose stacks set it
  explicitly, so this half is satisfied on any ordinary deployment.

The component is registered with no options, so its policy is the gem default
and nothing else — one directive:

```text
default-src 'self'
```

No nonce. Not the twelve directives above. It does not read
`site.security.csp.enabled`, and there is no key of any kind that switches it
off. What bounds it is the content type: like the Core middleware it defers to
a policy already on the response, and writes only when the response looks like
HTML. The `/auth` app answers its API in JSON, so those responses carry no CSP;
the ones that do carry it are the responses that finish without setting a
content type of their own, which Roda defaults to `text/html` — a browser
redirect through the SSO leg being the case you will actually meet.

So `CSP_ENABLED=false` is a statement about the Core web app. On a full-mode
production instance it leaves `/auth` sending `default-src 'self'` on its
HTML-typed responses.

## The middleware toggles

All ten live under `site.middleware.*`. The environment variable is the key name
uppercased with a `MIDDLEWARE_` prefix. Six ship on and four ship off:

| Key | Ships | What it is |
|---|---|---|
| `static_files` | on | Serves the frontend's built assets over an allowlist of paths. Not a protection, and emits no header. |
| `utf8_sanitizer` | on | `Rack::UTF8Sanitizer` — forces request parameters to valid UTF-8, with null-byte sanitization. |
| `authenticity_token` | on | CSRF token validation, over a `Rack::Protection::AuthenticityToken` subclass. |
| `frame_options` | on | `Rack::Protection::FrameOptions` — sets `X-Frame-Options`, on HTML responses only. |
| `path_traversal` | on | `Rack::Protection::PathTraversal` — blocks `../` in request paths. |
| `strict_transport` | on | `Rack::Protection::StrictTransport` — sets `Strict-Transport-Security` on every response, JSON included, and on plain-HTTP requests too. It inspects nothing about the request. |
| `http_origin` | **off** | `Rack::Protection::HttpOrigin` — checks the `Origin` header against the expected origin. |
| `xss_header` | **off** | `Rack::Protection::XSSHeader` — would set `X-XSS-Protection` on HTML responses and `X-Content-Type-Options` on all of them. |
| `cookie_tossing` | **off** | `Rack::Protection::CookieTossing` — blocks session fixation via cookies set on subdomains. |
| `ip_spoofing` | **off** | `Rack::Protection::IPSpoofing` — detects IP spoofing attempts by validating the client-address headers. |

`static_files` sits in this namespace but is not a security toggle: it gates the
middleware that serves `/dist` and the brand-pack asset URLs out of Rack. The
proxy configurations on
[Reverse proxy and TLS](/en/install/reverse-proxy-and-tls) all leave that job to
the app, so on those deployments turning it off takes the frontend's assets with
it.

`xss_header` being off does not mean `X-XSS-Protection` is absent. The
application sends `X-XSS-Protection: 1; mode=block` from the `otto` layer
described below, on every routed response, whatever this toggle says — with
`/auth` in full mode the one exception, because that app is not built on `otto`.

`cookie_tossing` is the one entry here that guards a cookie rather than emits or
checks a header, and the cookie it guards is the session cookie.
[Sessions and cookies](/en/configure/sessions-and-cookies) is where that cookie
is described, including why it is host-only to begin with.

### The toggles do not govern `/auth` in full mode

The nine protection toggles above configure a single middleware component,
mounted once for every application. In full mode the `/auth` app then adds six
`Rack::Protection` components of its own, under the production condition
described [above](#the-auth-app-sends-a-second-csp), and consults none of these
keys when it does. Three consequences, two of which are ways an install breaks:

**`http_origin` and `ip_spoofing` ship off, and run under `/auth` regardless.**
`HttpOrigin` refuses any unsafe request — anything that is not `GET`, `HEAD`,
`OPTIONS` or `TRACE` — whose `Origin` header does not match the origin the
application computes from the request's own scheme, host and port. A proxy that
terminates TLS and forwards neither `X-Forwarded-Proto` nor `Forwarded` makes
the application compute `http://your-host` while the browser sends
`Origin: https://your-host`, and every `POST` under `/auth` comes back
**403 Forbidden**. This is the same misconfiguration that silently drops the
session cookie, described on
[Sessions and cookies](/en/configure/sessions-and-cookies) — here it fails
loudly instead, and `ASSUME_HTTPS` fixes both. `IPSpoofing` refuses with 403
when a request carries `X-Forwarded-For` and also a `Client-IP` or `X-Real-IP`
whose value is not in that list — a shape a multi-hop proxy chain can produce
without anybody intending it.

**`frame_options` and `path_traversal` are mounted twice under `/auth`.**
Setting either toggle to false leaves the `/auth` copy running.

**`Rack::Protection::SessionHijacking` has no toggle at all**, which is why it
is absent from the table. It records the request's `User-Agent` in the session
the first time it sees it and empties the session when a later request presents
a different one — on `/auth` only, and in full mode and production only.

### Five of them log when you switch them off

`frame_options`, `path_traversal`, `strict_transport`, `authenticity_token` and
`utf8_sanitizer` are treated as security-critical. Disabling any one writes a
warn-level line of this shape:

```text
[Security] FrameOptions protection DISABLED (site.middleware.frame_options=false)
```

The component name varies — `UTF8Sanitizer`, `AuthenticityToken`,
`FrameOptions`, `PathTraversal`, `StrictTransport` — and the parenthesised key
is always the config key that did it. The four toggles that ship off stay quiet
by design, so seeing no such line does not mean every protection is on.

### CSRF, and where it deliberately does not apply

CSRF validation reads a `shrimp` parameter or an `X-CSRF-Token` header. There
are **four** deliberate bypasses, evaluated in this order:

1. **Any path under `/auth/sso/`.** The OAuth `state` parameter is the
   protection on those routes.
2. **The exact path `/auth/email-login`.** The magic-link token is itself the
   protection: it is one-time and time-limited, and the user arrives from an
   email client carrying neither a session nor a CSRF token.
3. **A request under `/api/` that either presents an `Authorization: Basic …`
   header, or has no session marked authenticated.** A CSRF attack rides an
   ambient session cookie; without one there is nothing to forge. That is what
   exempts API-key clients, anonymous and programmatic callers, unauthenticated
   secret recipients, the whole `/api/incoming/*` surface, and all of API v1 —
   which has no session auth at all. A session-authenticated request under
   `/api/` — a logged-in SPA user — falls through and must present a token.
4. **The exact path `/billing/webhook`.** It verifies a provider signature
   instead, and is called server-to-server rather than from a browser.

Everything else is validated.

Read the shipped code, not the comment above it: that comment lists only the
first and third rules, which is where the common "two bypasses" reading comes
from. The comment is short, not the code.

`Rack::Protection::EscapedParams` is excluded on purpose and there is no toggle
to add it. Escaping every parameter uniformly would corrupt passwords and secret
bodies — the two things this application exists to carry intact. Field-aware
sanitization is used instead.

## Header values you cannot set from Onetime Secret's config

Five values are emitted by the application and settable nowhere in its config.
They do not all go on the same responses, so read the scope column as part of
the claim:

| Header | Value the app sends | On which responses | Source |
|---|---|---|---|
| `X-Frame-Options` | `SAMEORIGIN` | HTML only | `rack-protection` default, registered with no options |
| `Strict-Transport-Security` | `max-age=31536000` | every response | `rack-protection` default |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | every response from a matched route in an `otto` app | `otto`'s per-route header set |
| `X-Content-Type-Options` | `nosniff` | every response from a matched route in an `otto` app | `otto`'s per-route header set |
| `X-XSS-Protection` | `1; mode=block` | every response from a matched route in an `otto` app | `otto`'s per-route header set |

The bottom three are written by `otto`'s route dispatcher, so a response that
never reaches a route carries none of them — an asset claimed by the static-files
middleware, or the API v1 router's own `Not Found` tuple. Nor does a response
from an application that is not built on `otto`: in full mode the `/auth` app is
a Roda application, and nothing in Onetime Secret writes those three names
itself, so `/auth` sends none of the three. The top two do not depend on routing
at all: the `Rack::Protection` components wrap every mounted app, `/auth`
included.

The two layers also differ on precedence, which matters if you set one of these
values in application code of your own. `otto` assigns, so it overwrites a value
already on the response. `rack-protection` writes with `||=`, so it defers to
one.

The HSTS value is worth reading twice: one year, **no `includeSubDomains` and no
`preload`**. `MIDDLEWARE_STRICT_TRANSPORT` is on/off only, so if you want
subdomain coverage or preload eligibility you set the header at your edge. The
shipped Caddy config already contains a commented-out block showing exactly
where a longer, subdomain-covering policy goes.

Two of them are also duplicated as HTML `<meta>` tags in the head template — a
`referrer` tag and an `http-equiv` `X-Content-Type-Options` tag. They restate
what the headers already say, and neither is an operator knob.

None of these five is beyond your reach; they are simply beyond the reach of
*this* application's config. You set them at the proxy — which is exactly what
the shipped Caddy config does to two of them, below.

## Permissions-Policy

The application emits no `Permissions-Policy` HTTP header and exposes no config
key for one.

What it does ship is a meta tag in the head template:

```html
<meta http-equiv="Permissions-Policy" content="geolocation=(), microphone=(), camera=()">
```

That tag is inert. `Permissions-Policy` is a header-only mechanism and browsers
ignore the `http-equiv` form of it, so nothing about geolocation, microphone or
camera is actually restricted. If you go looking in the templates and find that
line, it is not the policy you are looking at.

The shipped Caddy config takes the opposite path to the same place. It *does*
carry a `Permissions-Policy` line, and its value is the empty string. An empty
value declares zero directives, so it restricts nothing either.

What differs by deployment is the configuration, not the policy:

- **Full Compose stack.** The shipped proxy config sets `Permissions-Policy` to
  the empty string on every response it handles. It is a set, not a removal —
  the same block removes `Server` and `X-Powered-By` with a `-` prefix, and this
  line has none.
- **Anything else** — your own proxy, or the app bare. Nothing configures a
  `Permissions-Policy` anywhere in the stack.

Either way no directive is declared, so the effective policy on both is the
browser default. If you want a real one, write it at your edge; there is nowhere
else to put it. Whether the empty-valued line reaches a browser as an empty
header or as no header at all is a question for the `curl` at the end of this
page, run against your own deployment.

## What the shipped proxy config sets

`etc/examples/Caddyfile-example` is named "example" but it is the deployed
default of the documented full stack: it is baked into the `onetimesecret-caddy`
image and mounted read-only into the `proxy` service. Its header block is
imported into the one server block, so it applies to **every** response from that
vhost — not just HTML, and not just routed responses. It is the one layer in the
stack with a single uniform scope.

The snippet sets ten headers in all and strips two. Eight of the ten carry
security or caching policy:

```text
X-Content-Type-Options  nosniff
X-Frame-Options         DENY
X-XSS-Protection        1; mode=block
Referrer-Policy         no-referrer
Permissions-Policy      (empty)
Cache-Control           no-store, no-cache, must-revalidate, max-age=0
Pragma                  no-cache
X-Robots-Tag            noindex, nofollow, noarchive, nosnippet, noimageindex
```

The other two are operational rather than protective: `O-Request-ID`, a
per-request UUID set by its own line on every path except `/favicon.ico`, and
`O-Via`, which the file's own comment describes as taking its value from the
argument passed when the snippet is imported — the shipped server block passes
`main`. The two strips are `Server` and `X-Powered-By`, and `Server` is stripped
a second time on the proxy hop back from the app.

Four of the eight deserve attention before you deploy the stack:

**`X-Frame-Options: DENY`** replaces the app's `SAMEORIGIN` — a `set`, not an
add, on every response. Running the full stack means you send `DENY`; running
without that proxy means you send `SAMEORIGIN`.

**`Referrer-Policy: no-referrer`** is stricter than the app's
`strict-origin-when-cross-origin`, which the head template also states as a meta
tag. Behind the shipped proxy your instance therefore declares the referrer
policy twice, with two different values. Reconcile them — change the proxy line
or the template — rather than leaving a browser to arbitrate.

**`X-Robots-Tag: noindex, nofollow, …`** is something the application never
sends. Behind the shipped proxy every response on the vhost tells search engines
to stay away, including any public landing page you were counting on.

**`Cache-Control: no-store, …`** is also something the application never sends
blanket. The app's only cache directives are the *permissive* ones on cacheable
page routes, and the proxy's blanket `no-store` overrides them. Any claim about
caching on your instance has to name which layer it describes.

The shipped file's own comment attributes CSP to an application source file that
does not exist in the release; the claim it is making — that Caddy sets no CSP
— is still correct.

The proxy config sets no HSTS of its own. There is no line for it in the header
block, and the per-domain one in the server block ships commented out — that is
the block referred to above, and the value it suggests is
`max-age=63072000; includeSubDomains; preload`. So on the full stack the only
HSTS configured anywhere is the application's one-year value.

## If you are not running the shipped proxy

Then your instance sends exactly what the application sends. Four separate
layers emit it — the Core CSP middleware, the toggle-governed
`Rack::Protection` components, the `otto` route dispatcher and the `/auth`
app's own protection stack — and no two of them cover the same responses. So
read the set as scoped groups rather than one list:

- **HTML responses from the Core web app.** The twelve-directive nonce CSP. The
  middleware behind it is mounted in Core alone, so no `/api/*` response carries
  this one.
- **HTML-typed responses from `/auth`, in full mode and production only.** A
  second CSP, `default-src 'self'`, from the `/auth` app's own
  `Rack::Protection::ContentSecurityPolicy`. Independent of `CSP_ENABLED`.
- **HTML responses from any app.** `X-Frame-Options: SAMEORIGIN`, from
  `Rack::Protection::FrameOptions`.
- **Every response from a route that matched in an `otto` app, any content
  type.** `Referrer-Policy: strict-origin-when-cross-origin`,
  `X-Content-Type-Options: nosniff` and `X-XSS-Protection: 1; mode=block`, all
  three from `otto`'s default header set. A response produced without matching a
  route gets none of them — and neither does anything under `/auth` in full
  mode, because that app is built on Roda rather than `otto` and no Onetime
  Secret code writes those three names itself.
- **Every response, full stop.** `Strict-Transport-Security: max-age=31536000`,
  from the `strict_transport` middleware — JSON responses and plain-HTTP
  requests included, `/auth` included.

That is the whole security-header set — no `Permissions-Policy`, no
`X-Robots-Tag`, no blanket `Cache-Control`. "The application sends header X" is
five different claims depending on X, and a header you find on the homepage is
not evidence it is on your API responses or on `/auth`.

Whatever you want beyond that list — a real permissions policy, HSTS with
`includeSubDomains`, `DENY` instead of `SAMEORIGIN`, a robots directive — goes
into your proxy configuration. Confirm the result against the deployment rather
than the config, from outside it:

```bash
curl -sSI https://secrets.example.com/ | grep -iE '^(content-security-policy|strict-transport-security|x-frame-options|referrer-policy|permissions-policy|x-content-type-options|x-robots-tag|cache-control)'
```

Run it against the public hostname, not against the app port. Half of what this
page describes only exists on the hop the proxy makes. Run it a second time
against a path under `/auth` if you are in full mode: that surface is served by
a different application and answers with a different set.
