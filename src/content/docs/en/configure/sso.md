---
title: Configure SSO
description: The four SSO providers a self-hosted instance can register, what each one requires, where the callback URL actually comes from, and which variables do nothing at all.
audience: operator
pageType: how-to
sourceOfTruth: onetimesecret/apps/web/auth/config/features/omniauth.rb:18-21,29-30,38-47,51-54 (the four OmniAuth strategies, the /sso route prefix, and SSO accounts being auto-created and auto-verified); onetimesecret/apps/web/auth/config/features/omniauth.rb:320-363,386-407,422-442,456-477 (the all-or-nothing per-provider registration gate, the boot log lines, the deliberately omitted redirect_uri, OIDC discovery and PKCE, and the placeholder registrations used for tenant SSO); onetimesecret/apps/web/auth/config/features/omniauth.rb:60-98,165-167,175-198,271-280 (issuer-scoped identities and the refusal of issuerless providers on the tenant surface); onetimesecret/apps/web/auth/config/hooks/omniauth_tenant.rb:61-100 (per-request tenant credential injection, and the redirect URI derived from the request host at :86); onetimesecret/apps/web/auth/config/hooks/omniauth.rb:616-671 (signup-domain validation on the SSO account-creation path and its two rejection codes); onetimesecret/lib/onetime/auth_config.rb:143-166 (the sso master switch, the legacy omniauth synonym, full-mode gating, and the org-level switch); onetimesecret/lib/onetime/auth_config.rb:179-207,228-282,324-336,338-371,420-483 (restrict_to, the SSO_DISPLAY_NAME deprecation, platform fallback, email-linking trust precedence, the provider definitions with their route and display defaults, and the CSP form-action origins); onetimesecret/etc/defaults/auth.defaults.yaml:86-149 (the shipped defaults, all off, and the deprecation notes); onetimesecret/etc/defaults/config.defaults.yaml:849-851 (the org-level sso_enabled default) and onetimesecret/etc/defaults/config.defaults.yaml:309-317 (the signup-domain allowlist default); onetimesecret/lib/onetime/models/organization/features/with_plan_entitlements.rb:23-32,48-56,199-200 (manage_sso sits in STANDALONE_ENTITLEMENTS, so the entitlement gate never binds on a stock self-hosted instance); onetimesecret/apps/api/domains/logic/sso_config/base.rb:13-18,27-30,37-40 (the authorization model on the per-domain SSO API)
---

Onetime Secret's SSO is OmniAuth and `rodauth-omniauth` — OpenID Connect and
OAuth, four providers: generic **OIDC**, **Microsoft Entra ID**, **Google** and
**GitHub**. There is no SAML support. No SAML gem is in the bundle and no SAML
strategy is registered, so an identity provider that only speaks SAML cannot be
connected to the application directly.

## Decide these two things first

**Full mode.** SSO is full-mode only. In simple mode SSO stays off no matter
what you put in the environment, so `AUTH_SSO_ENABLED=true` on a simple-mode
instance changes nothing and says nothing.
[Simple or Full mode](/en/self-hosting/simple-or-full-auth) covers the switch
and what else moves with it.

**Which of the two surfaces.** They are separate features with separate
switches:

- **Platform SSO** — one set of provider credentials, from the environment,
  for the whole instance. That is what this page describes, up to
  [Per-domain SSO](#per-domain-sso).
- **Per-domain SSO** — each custom domain carries its own SSO configuration,
  and its credentials are injected per request. Its switch is
  `ORGS_SSO_ENABLED`.

The master switch for platform SSO is `AUTH_SSO_ENABLED`, or `full.features.sso`
in `etc/auth.yaml`. It ships **disabled**; you have to turn it on. The older key
name `omniauth` is still accepted as a synonym for `sso`, so a configuration
written against it keeps working.

## Providers, and what each one requires

A provider registers only when **all** of its required variables are present and
non-empty. There is no partial registration — set two of Entra's three values
and Entra does not register at all.

| Provider | Required | Route name | Display name |
|---|---|---|---|
| OIDC | `OIDC_ISSUER`, `OIDC_CLIENT_ID` | `oidc` | `SSO` |
| Microsoft Entra ID | `ENTRA_TENANT_ID`, `ENTRA_CLIENT_ID`, `ENTRA_CLIENT_SECRET` | `entra` | `Microsoft` |
| Google | `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` | `google` | `Google` |
| GitHub | `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET` | `github` | `GitHub` |

The route names and labels in the last two columns are defaults. Override them
with `OIDC_ROUTE_NAME` / `ENTRA_ROUTE_NAME` / `GOOGLE_ROUTE_NAME` /
`GITHUB_ROUTE_NAME` and the matching `*_DISPLAY_NAME`. `SSO_DISPLAY_NAME` still
exists but is deprecated — it survives only as the fallback label for OIDC on a
single-provider instance.

`OIDC_CLIENT_SECRET` is not in the required column on purpose. It is added to the
client options only when it is non-empty, because PKCE flows may have no secret
at all, and PKCE is on for OIDC.

For OIDC, `OIDC_ISSUER` is the entire endpoint configuration. The provider is
registered with discovery enabled and carries no endpoint options of its own, so
every endpoint the flow uses is resolved from the issuer rather than configured
here. Scope is fixed at `openid email profile` and the response type at `code`;
neither has a variable.

### Nothing fails loudly, so read the boot log

An incompletely configured provider does not stop the boot and does not raise —
it is simply absent. The only trace is one error-level log line naming exactly
what is missing:

```text
[OmniAuth] Missing OIDC configuration: OIDC_CLIENT_ID
```

with `Missing Entra ID configuration`, `Missing GitHub configuration` and
`Missing Google configuration` for the others. A provider that did register logs
its own line at the same point:

```text
[OmniAuth] Configuring OIDC provider 'oidc' with issuer: https://idp.example.com, client_id: abcd12345...
```

So `[OmniAuth]` is the string to grep for after a restart. It is the whole
diagnostic surface for provider configuration.

## The `*_REDIRECT_URI` variables are read by nothing

`OIDC_REDIRECT_URI`, `ENTRA_REDIRECT_URI`, `GOOGLE_REDIRECT_URI` and
`GITHUB_REDIRECT_URI` are not read by any code. `OIDC_REDIRECT_URI` does not
occur anywhere in the application at all; the other three appear only inside a
spec fixture. Setting them has no effect, and — because nothing reads them —
produces no warning either. If you found them listed as required in the
environment-variable reference, that entry is wrong.

The application derives its own redirect URI at request time, from the host the
request arrived on. What you have to do instead is register the callback **at
your identity provider**, in this shape:

```text
https://<your-host>/auth/sso/<route-name>/callback
```

The routes are `POST /auth/sso/:provider` to start and
`GET /auth/sso/:provider/callback` to return, where `:provider` is the route
name from the table above. A default OIDC setup on `secrets.example.com`
therefore registers `https://secrets.example.com/auth/sso/oidc/callback`.
Because the value is derived from the request, the URL you register has to be
the one your users actually reach.

Route names are not cosmetic. The route name is also the value stored in the
`provider` column of the identities table, so it identifies existing SSO
identities as well as the URL. Choose it before your first login, not after.

## Every user your IdP will authenticate can get an account

SSO accounts are **auto-created and auto-verified** on first login. This is the
shipped behaviour and it is the one to think hardest about: with SSO on and a
provider configured, anyone your identity provider will authenticate gets an
account on your instance, created and marked verified without any further step
from you. The application's own note on that setting says as much — it "allows
any IdP user to create accounts".

The control is the signup-domain allowlist, and the SSO path is not exempt from
it. Before creating an account the application checks the address from the IdP,
in this order:

1. A structurally unusable email claim from the IdP is refused outright and the
   browser lands on `/signin?auth_error=invalid_email`.
2. A per-custom-domain signup configuration, if the request arrived on a custom
   domain that has one enabled.
3. Otherwise the global list — `allowed_signup_domains`, set with the
   `ALLOWED_SIGNUP_DOMAIN` variable (singular, comma-separated).

A rejected address lands on `/signin?auth_error=domain_not_allowed`. That code is
deliberately generic — it does not disclose which domains are allowed — so it is
all a rejected user can report back to you.

The global list ships **empty**, and an empty list allows every domain. Matching
is exact and case-insensitive on the full domain, with no subdomain wildcarding:
`example.com` does not admit `mail.example.com`. If you enable SSO against an
IdP whose user population is larger than the set of people you want holding
accounts, set this list in the same change. It is one list across every way an
account can be created, not an SSO-specific one —
[Authentication](/en/configure/authentication#restricting-who-can-get-an-account)
covers all three paths it is enforced on.

## Matching an existing account by email is refused by default

When an SSO identity arrives with an email that already belongs to an account,
the link is **refused**, not made automatically.

Opt in per provider with `OIDC_TRUST_EMAIL_FOR_LINKING`,
`ENTRA_TRUST_EMAIL_FOR_LINKING`, `GOOGLE_TRUST_EMAIL_FOR_LINKING` or
`GITHUB_TRUST_EMAIL_FOR_LINKING`. A per-provider setting wins over the global
`SSO_TRUST_EMAIL_FOR_LINKING`, which is deprecated. All of them ship `false`.

Turn one on only where you control both the application and the identity
provider. The shipped configuration says so in as many words, and the flag has
no effect on the per-domain surface by construction — it cannot be used to trust
a tenant's IdP.

## Restricting sign-in to SSO

Login can be narrowed to a single method with `AUTH_SSO_ONLY=true`, alongside
`AUTH_PASSWORD_ONLY`, `AUTH_EMAIL_AUTH_ONLY` and `AUTH_WEBAUTHN_ONLY`. There is
one sharp edge: setting **more than one** of the four does not restrict to their
union, it yields no restriction at all. Two of them on is silently the same as
none of them on.

`AUTH_SSO_ONLY` does more than hide the password form. It also disables
password-based account management — destroying an account, changing a password
and changing an email address all go with it. It is also ignored unless SSO is
enabled *and* at least one provider is configured, so a restriction cannot take
effect on an instance where no provider ever registered.

## Per-domain SSO

The second surface gives each custom domain its own SSO configuration, with
credentials injected per request rather than read from the environment. Its
switch is `ORGS_SSO_ENABLED`, or `features.organizations.sso_enabled`, and it
ships **disabled**.

With it on, provider routes register even when no platform credentials exist —
using placeholder credentials, so that a tenant's real values can be injected
when a request arrives. A provider route that answers on an instance with none
of that provider's variables set is expected under this switch.

**GitHub and Google are refused on this surface, by design.** Neither carries an
issuer, so an identity from them keys as `(provider, '', uid)` — a single row
shared across every domain on the instance. The callback is rejected before any
identity lookup happens, and the browser lands on
`/signin?auth_error=sso_not_configured`. OIDC and Entra ID are unaffected and
are what per-domain SSO is for. The underlying reason is that identities are
keyed on `(provider, issuer, uid)` rather than `(provider, uid)`, which is what
keeps one tenant's IdP from producing an identity that matches another's.

A custom domain with no configuration of its own falls back to the platform
credentials only when `SSO_ALLOW_PLATFORM_FALLBACK=true`. It ships `false`, so
by default a domain without its own configuration gets nothing rather than
quietly getting yours.

### The entitlement message in this code path is not for you

The per-domain SSO API authorizes on three things: the `manage_sso`
entitlement, ownership of the organization, and the `sso_enabled` feature flag.
On a stock self-hosted instance the first of those never binds. Billing is off,
which grants the full standalone entitlement set, and `manage_sso` is in it.

So self-hosted, the real gates are the ones you can act on: `ORGS_SSO_ENABLED`,
and being the owner of the organization that holds the domain. Role is the whole
answer. If you meet the plan-upgrade wording that lives in that authorization
path, it is the hosted service's message and it does not describe your instance.

## SSO widens the CSP `form-action` directive

Enabling SSO adds the active identity providers' origins to the
`Content-Security-Policy` `form-action` directive automatically. That matters
because the sign-in flow is a form POST that redirects to the IdP, and Chromium
enforces `form-action` across the whole redirect chain — without the origin, the
redirect is blocked.

Two cases need the manual override, `SSO_FORM_ACTION_ORIGINS`, which takes a
space-separated list of origins:

- **Sovereign clouds.** Entra's origin is hard-pinned to
  `https://login.microsoftonline.com`. There is no variable for a different
  authority, so a sovereign-cloud tenant declares its origin here.
- **Per-domain SSO**, where the IdP origins are not known from the environment.

That variable is the only one on this page that reaches into a header value.
[Security headers](/en/configure/security-headers) has the rest of the policy it
edits — including that nothing reports a CSP violation, so a redirect blocked
this way leaves no trace anywhere to read.

:::note[On the hosted service]
This page is the self-hosted operator's side. For what SSO looks like to the
people using an organization on the hosted service — where it is configured
per organization, by the organization owner — see
[Single Sign-On (SSO)](/en/organizations/sso).
:::
