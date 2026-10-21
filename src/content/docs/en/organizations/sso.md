---
title: Single sign-on (SSO)
description: Connect a custom domain to your identity provider so members sign in there with their work accounts, test it, require it, and remove access when someone leaves.
audience: end-user
pageType: how-to
plan: Team Plus
sourceOfTruth: onetimesecret at 145c1e7cfa — lib/onetime/models/custom_domain/sso_config.rb:17-50,122-124,740-753 (one configuration per verified custom domain; Entra ID, OIDC and SAML only); apps/api/domains/policies/domain_config_authorization.rb:105-106,154-155 (manage_org plus manage_sso, owner only); src/apps/workspace/components/domains/DomainSsoConfigForm.vue and locales/content/en/workspace-organizations.json (fields, callback URL, checks); apps/api/domains/logic/sso_config/{test_connection,run_diagnostics,put_sso_config,delete_sso_config}.rb (checks, 10 per hour, saved off until a check passes, deletion keeps identities and memberships); apps/web/auth/operations/join_domain_organization.rb and apps/web/auth/config/hooks/login.rb:161-177 (member role, domain-scoped, on every SSO sign-in); lib/onetime/models/custom_domain/signin_config.rb (requiring SSO per domain; the main service is unaffected); no SCIM, back-channel logout or token revalidation in apps/, lib/ or src/
---

Organization single sign-on lets people sign in on one of your
[custom domains](/en/custom-domains) through your identity provider (IdP). It
is set up per custom domain: each domain can use a different identity provider.

## Before you start

- Your organization is on **Team Plus**.
- You are the organization's **owner**. Admins see the SSO tab but cannot change
  it.
- The custom domain is **verified**; see the
  [custom domain setup guide](/en/custom-domains/setup-guide).
- You can register an application in your identity provider.

## Supported providers

| Provider | What you enter |
|---|---|
| **Microsoft Entra ID** | Tenant ID (a GUID; `common` and `organizations` are not accepted), Client ID, Client Secret |
| **Generic OIDC** | Issuer URL (the issuer itself, not its discovery URL; HTTPS on a public host), Client ID, and a Client Secret if your provider issues one |
| **SAML 2.0** | IdP SSO service URL, IdP Entity ID, and the IdP signing certificate in PEM format |

SAML 2.0 is listed only where the service has SAML turned on. Google and GitHub
sign-in cannot be used here, because they do not identify which organization a
user belongs to.

## Set up a domain

1. Open your organization's settings and choose the **SSO** tab. It lists your
   domains with their SSO status.
2. Choose **Configure** for the domain.
3. Choose the provider type. To change it later, delete the configuration and
   start again.
4. Copy the **Callback URL** into your identity provider's allowed redirect
   URIs. It has the form `https://<your-domain>/auth/sso/entra/callback` or
   `https://<your-domain>/auth/sso/oidc/callback`. For SAML, register the **SP
   Entity ID (metadata URL)** and **Assertion Consumer Service URL** shown on
   the form instead.
5. Enter a **Display Name** and the provider details from the table above.
6. Optionally, choose **Check provider settings** to confirm the provider can be
   reached before you save. This check saves nothing and does not test the
   client secret.
7. Choose **Save and check**. The configuration is saved switched off and
   turns on only when the check passes. If it fails, correct the details and
   choose **Check and turn on**. For Entra ID the check also requests a token
   with your credentials. You can run the check 10 times an hour.

A passing check does not test the callback URL or which users your provider
admits. The test sign-in below does.

## Test the sign-in

1. In a private browser window, open your custom domain's sign-in page.
2. Choose the **Sign in with** button for your provider and sign in as a test
   user.
3. In organization settings, open **Members**. The test user appears as a
   **Member**.

On their first sign-in, a person with a new email address gets an account
automatically and joins the organization as a member limited to that domain.
If they have a pending invitation, it is accepted instead, with the role it
offered. Roles are not taken from your identity provider; change them on the
Members tab.

A person who already has an account with the same email address, but has not
connected this provider, is refused on the domain. See
[How an identity is added](/en/account/sessions-and-identities#how-an-identity-is-added)
for what they can do.

Signing in through SSO does not ask for a second factor set up in Onetime
Secret. Enforce one at your identity provider.

## Require SSO on the domain

After a test sign-in succeeds, set the domain's sign-in settings to use single
sign-on only: in the domain's **Sign-In Configuration**, choose **One specific
method**, then **Single Sign-On**. Other sign-in methods are then refused on
that domain. See [Access and privacy](/en/custom-domains/access-and-privacy).

The domain's SSO settings do not apply on the main service. If your identity
provider stops working, sign in to the main service with your usual method and
fix or delete the configuration from there.

## When someone leaves

Onetime Secret does not hear from your identity provider when you disable or
remove a user. There is no provisioning (SCIM) connection and no sign-out
signal from the provider. Disabling a user at your provider stops their **next**
SSO sign-in only:

- **Sessions already signed in continue** until they end normally; see
  [What ends a session](/en/account/sessions-and-identities#what-ends-a-session).
- **Their organization membership stays** until you remove them on the Members
  tab.
- **Their account and connected identity stay.** Their account is not closed.

To remove access, remove the person on the Members tab **and** at your identity
provider. While the provider still lets them sign in, signing in through your
domain adds them back as a member.

## Turn SSO off

The SSO form has no off switch. Either turn SSO off in the domain's sign-in
settings, or delete the configuration.

Deleting the configuration removes only the connection settings. Members,
accounts and connected identities stay. If you create a new configuration with
the same issuer, existing connected identities work again. A different issuer,
SAML Entity ID or provider type does not match them, and people need to
connect the provider again.

:::note
**Self-hosting this yourself?** Besides organization SSO, an operator can enable
providers for the whole installation through environment variables. Those
appear on the main service rather than on custom domains, can include Google
and GitHub, and give new accounts their own workspace instead of joining an
organization. See [Environment variables](/en/self-hosting/environment-variables).
:::

## Related

- [Access and privacy](/en/custom-domains/access-and-privacy) — sign-in and sign-up settings for a custom domain.
- [Sessions and connected identities](/en/account/sessions-and-identities) — how identities are linked and how sessions end.
- [Inviting members](/en/organizations/inviting-members) — adding people with a chosen role.
- [SSO demos](/artifacts/2026/sso-demos/) — interactive walkthroughs of OIDC and SAML sign-in flows, including a gateway that connects an OIDC application to a SAML provider.

## Questions or Need Support?

We're here to help.

- Email: support@onetimesecret.com
- Feedback form: https://onetimesecret.com/feedback
