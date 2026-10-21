---
title: Access and privacy
description: Choose how people sign in on your custom domain, require single sign-on, and see which homepage and sign-up controls apply.
plan: Identity Plus
audience: end-user
pageType: how-to
sourceOfTruth: onetimesecret at 145c1e7cfa — lib/onetime/models/custom_domain/signin_config.rb:31-35,55,230-298 (per-domain sign-in narrows the service's methods); src/apps/workspace/components/domains/DomainSigninConfigForm.vue:34-39 and locales/content/en/workspace-domains.json (How can users sign in?, methods, auto-save, Reset to defaults); apps/api/domains/logic/signin_config/base.rb:29 (custom_signin_config) and domain_config_authorization.rb:148-155 (owner only); lib/onetime/models/custom_domain/sso_config.rb and apps/api/domains/logic/sso_config/base.rb:28-41 (manage_sso, Team Plus); src/apps/workspace/domains/DomainDetail.vue:249 (sign-up settings not available in the app); lib/onetime/models/custom_domain/brand_settings.rb:40,488 (passphrase_required stored, not enforced); src/apps/workspace/components/domains/PrivacyDefaultsModal.vue (not mounted)
---

These settings decide who can sign in on your custom domain, and what
anonymous visitors can do there. Each domain has its own settings, and only the
organization's **owner** can change them.

## Sign-in settings

Sign-in settings choose which sign-in methods appear on your domain's sign-in
page. They need **Identity Plus** or **Team Plus**.

A domain can only narrow the methods the service offers. It cannot add a method
the service does not offer. Passkeys are tied to the main sign-in site and are
not available on custom domains.

1. Open the user menu, choose **Domains**, then **Manage** next to the domain.
2. Under **Features**, choose **Configure Sign-In**.
3. Under **How can users sign in?**, choose one:
   - **Any available method**: every method the service offers. You can turn
     individual methods off with **Allow on this domain**.
   - **One specific method**: only the method you pick, such as **Password**,
     **Email authentication** or **Single Sign-On**.
   - **Sign-in disabled**: nobody can sign in on this domain. Visitors to the
     sign-in page see a notice with a link back to the homepage.

Each choice is saved as soon as you make it. **Reset to defaults** returns the
domain to the service's sign-in settings; an SSO configuration is kept.

These settings apply on your custom domain only. People can still sign in on the
main site with their usual method.

### Require single sign-on

On **Team Plus**, the owner can connect the domain to an identity provider and
then choose **One specific method** and **Single Sign-On**. Set up and test the
connection first: restricting the domain to SSO before it works blocks sign-in
there. See [Single sign-on (SSO)](/en/organizations/sso).

## Sign-up settings

The app has no sign-up settings for a custom domain. Sign-up on your domain
follows the service's own rules.

## Privacy options

What anonymous visitors can do on your domain is set by the domain's
**Homepage** setting: a private landing page, a form for creating secrets, or
an incoming-secrets form. It is included on every plan. See
[Homepage and incoming secrets](/en/custom-domains/homepage-and-incoming).

A domain has no setting that requires a passphrase or sets a default expiry
for its secrets. Those are chosen for each secret; see
[Sharing secrets](/en/share).

## Related

- [Single sign-on (SSO)](/en/organizations/sso) — connect your identity
  provider to a domain.
- [Homepage and incoming secrets](/en/custom-domains/homepage-and-incoming) —
  what visitors can do on your domain's homepage.
- [Roles and permissions](/en/organizations/roles-and-permissions) — who can
  change a domain's settings.

## Questions or need support?

Email [support@onetimesecret.com](mailto:support@onetimesecret.com) or use the
[feedback form](https://onetimesecret.com/feedback).
