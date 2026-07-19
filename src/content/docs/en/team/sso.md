---
title: Single Sign-On (SSO)
description: Connect Onetime Secret to your identity provider so your team signs in with their existing corporate credentials.
---

> **Status:** This page is a work in progress. SSO is part of our team-oriented
> capabilities. The interactive demos linked below are live today and walk
> through real authentication flows step by step.

## What is SSO?

Single Sign-On (SSO) lets your team access Onetime Secret using the accounts
they already have with your identity provider (IdP) — such as Microsoft Entra
ID, Okta, Auth0, Google, or Keycloak — instead of separate Onetime Secret
credentials. Authentication and account lifecycle stay centralized in your IdP,
which is where most organizations want them.

## When to use SSO

- You want employees to sign in with their existing corporate accounts.
- You need centralized control over who can access Onetime Secret.
- You want to enforce your organization's authentication policy (MFA, conditional access, deprovisioning) from one place.

## Setup overview

A typical SSO integration follows the same shape regardless of provider:

1. Register Onetime Secret as an application in your identity provider.
2. Exchange the connection details (issuer/metadata, client credentials, or SAML assertion settings).
3. Map identities so your IdP users resolve to the right access in Onetime Secret.
4. Test the round trip and roll the integration out to your team.

A common pattern is to put a gateway in front of the application so the app
itself only ever receives an already-authenticated request — _"my app doesn't
touch SAML, the gateway does."_

## Try it: interactive SSO demos

We've built step-by-step, interactive visualizations of real SSO flows — every
redirect, cookie, and token exchange — using Onetime Secret as the example
application:

- **[Browse all SSO demos](/artifacts/2026/sso-demos/)**
- **[Enterprise SAML for Modern Apps](/artifacts/2026/sso-demos/oidc-saml-bridge/)** — a Caddy + Logto gateway bridging OIDC ↔ SAML to Microsoft Entra ID.

## Related features

- [Signin Settings](/en/custom-domains/signin-settings) — require SSO for sign-in on a custom domain.
- [Signup Settings](/en/custom-domains/signup-settings) — control who can onboard.

## Questions or Need Support?

We're here to help.

- Email: support@onetimesecret.com
- Feedback form: https://onetimesecret.com/feedback
