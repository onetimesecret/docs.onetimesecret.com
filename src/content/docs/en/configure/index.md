---
title: Configuration Overview
description: Which configuration pages you need before an instance boots, which before anyone uses it, and why plan tiers never gate a self-hosted instance.
audience: operator
pageType: concept
sourceOfTruth: onetimesecret/lib/onetime/utils/config_resolver.rb:36,56-59,71-73 with onetimesecret/lib/onetime/config.rb:329-360,1143-1145 and onetimesecret/lib/onetime/boot.rb:152,161 (etc/config.yaml is the override layer over the shipped etc/defaults/config.defaults.yaml, deep-merged, and resolved once at boot); onetimesecret/etc/defaults/auth.defaults.yaml:6-8 with onetimesecret/lib/onetime/auth_config.rb:36-41 (the authentication mode is the top-level key in etc/auth.yaml and takes exactly two values); onetimesecret/lib/onetime/config.rb:961-969 (a missing SECRET is a fatal config error) and onetimesecret/etc/defaults/config.defaults.yaml:7-11 (the shipped warning that changing it costs you the existing secrets); onetimesecret/apps/web/auth/config/base.rb:11-27 (full mode raises at boot without AUTH_SECRET and a 32-byte ACCOUNT_ID_SECRET, with an unset RACK_ENV failing closed to production); onetimesecret/lib/onetime/cli/customers/sync_auth_accounts_command.rb:56 (moving simple-mode accounts into full mode is a migration command, gated on full mode); onetimesecret/lib/onetime/boot.rb:365-366,402-404 with onetimesecret/lib/onetime/session.rb:235-249,261-272 (the Secure flag is derived from site.ssl or RACK_ENV production, and a request the app sees as plain HTTP drops the cookie with only a throttled warning); onetimesecret/etc/defaults/config.defaults.yaml:293-298 (autoverify ships false) with :944 (the CHANGEME from-address) and :947 plus onetimesecret/lib/onetime/mail/delivery/smtp.rb:70-73 (the smtp.provider.com placeholder satisfies the only host check there is); onetimesecret/lib/onetime/auth_config.rb:143-166 and :420-424 (SSO ships off and every full-mode feature predicate returns false in simple mode); onetimesecret/etc/defaults/config.defaults.yaml:216-279 (the site.secret_options block — durations, passphrase rules, content ceiling and generated values); onetimesecret/etc/defaults/config.defaults.yaml:411-450,453-465 (the middleware and CSP switches are on/off only, with no key setting a header value) and onetimesecret/etc/examples/Caddyfile-example:187-217 (the shipped proxy config is a second header emitter); onetimesecret/lib/onetime/models/organization/features/with_plan_entitlements.rb:23-32,48-56,199-200 with onetimesecret/lib/onetime/billing_config.rb:41-53 (billing off grants the full standalone entitlement set and every limit resolves to infinity)
---

These pages cover an instance you have already installed. If you have not, start
at [Self-Hosting Overview](/en/self-hosting).

Settings come from three places, and they layer. `etc/config.yaml` is your
override file; the shipped `etc/defaults/config.defaults.yaml` is deep-merged
underneath it, so your file carries only the keys you change, and an instance
with no `etc/config.yaml` at all runs on the defaults file alone. Where a key
also reads an environment variable, the page that owns the key names it — and
says so when there is none. The authentication mode and full mode's own features
live separately, in `etc/auth.yaml`. All of it is resolved once, at
boot — every change on these pages takes a restart.

## Settle these before the instance boots

[Secrets and keys](/en/configure/secrets-and-keys) decides whether the instance
starts and whether what it stores can ever be read back. With no `SECRET`,
config load is fatal. Full mode raises at boot without two more secrets, and an
unset `RACK_ENV` fails closed to production rather than excusing you from that.
The reason this page is first rather than merely early is that its subject is
the one thing you cannot revise cheaply later — change `SECRET` under existing
data and every secret already stored stops opening.

[Authentication](/en/configure/authentication) decides whether the instance has
accounts at all, and where they live. Two independent switches: one turns
accounts off entirely, the other picks the mode. The mode takes exactly two
values, and moving accounts from one to the other is a migration command rather
than a restart, so settle it before anyone signs up rather than after.

## Settle these before anyone uses it

Both of these boot clean and fail afterwards. Neither says anything at startup.

[Sessions and cookies](/en/configure/sessions-and-cookies) is the one that
catches installs behind a proxy. The `Secure` flag on the session cookie is
derived rather than set — `site.ssl` or `RACK_ENV=production` turns it on — and
Rack refuses to write a `Secure` cookie over a request it sees as plain HTTP.
Sign-in appears to succeed, the next request arrives with no session, and the
only trace is a throttled warning in the log. Read this page while you configure
the proxy, not after someone reports that logging in does nothing.

[Outbound email](/en/configure/email) decides whether the instance can talk to
its users. Two shipped values are placeholders and nothing at boot refuses
either of them: the from-address, and — on the shipped SMTP transport — the
host, which satisfies the only check there is and then fails at send time. That
matters more than it sounds, because new accounts must verify their address
before they can sign in unless you change that too. An instance with no working
mail accepts every signup and strands every one of them.

## Then, in whatever order your deployment needs

[Configure SSO](/en/configure/sso) is for handing authentication to an identity
provider. It needs full mode, it ships off, and in simple mode turning it on
does nothing and says nothing. Skip this page unless you are running an IdP.

[Secret options](/en/configure/secret-options) is the policy every secret is
created under: which lifetimes you offer, whether a passphrase is required, how
much content fits, and what a generated value looks like. All of it ships with
working defaults, so nothing here blocks a launch — but the shipped default is
that no passphrase is required, which means the link is the whole credential.
Decide whether that is what you want.

[Security headers](/en/configure/security-headers) is mostly a decision about
which layer owns your header values. Onetime Secret's config gives you on/off
switches and no key that sets a header's value, so tuning one is edge work. If
you run the full Docker Compose stack, the proxy config that ships with it is a
second emitter and already overrides some of what the application sends.

## Plans and tiers do not gate your instance

Billing is off unless a billing configuration turns it on, and none ships. With
it off, an organization is granted the full standalone entitlement set and every
limit resolves to infinity. Nothing on your instance is held back by a tier, and
no setting on these pages switches an entitlement on — there is no configuration
key that sets one at all.

What decides who can do what is role and organization membership. So when a page
here describes a permission, read it as a role question.

Some messages in the interface and in API responses are written for the hosted
service and reach you through shared code. If you meet one that talks about
upgrading a plan, it is not describing your instance, and there is nothing to
configure in response to it.
