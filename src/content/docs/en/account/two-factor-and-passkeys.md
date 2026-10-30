---
textprov: true
title: Two-factor authentication and passkeys
description: Turn on two-factor authentication, keep your recovery codes somewhere you can actually reach them, and get back in when you can't produce a code.
audience: end-user
pageType: how-to
sourceOfTruth: onetimesecret/apps/web/auth/config/features/mfa.rb:14 (recovery codes issued per account)
---

Two-factor authentication (2FA) adds a second step to signing in: after your
password, the account asks for a six-digit code from an authenticator app. This
page covers turning it on, keeping the recovery codes usable, and what to do
when you cannot produce a code.

## Before you start

- **An account with a password.** Two-factor settings live under Settings →
  Security, alongside your password, your recovery codes and your active
  sessions.
- **An authenticator app that generates TOTP codes** — Google Authenticator,
  Authy, 1Password, Microsoft Authenticator, or any other. Text messages are
  not offered as a second factor.
- **Your password.** Turning two-factor authentication on or off requires it,
  and so does generating a new set of recovery codes.
- **Somewhere to keep the recovery codes** that is not the device holding your
  authenticator app.

:::note
Two-factor authentication and passkeys are both features an operator switches
on. The app tells its own sign-in page which methods exist, so you are only
offered what is enabled where you are signing in. If your security settings do
not show these options, they are not turned on for that site.
:::

## Turn on two-factor authentication

1. **Start setup** from the two-factor authentication settings. The server
   generates the secret and returns the QR code for it — the code you scan is
   the server's, so what your app stores and what the server expects cannot
   drift apart.
2. **Scan the QR code** with your authenticator app, or enter the secret
   manually if you cannot scan.
3. **Confirm with a code and your password.** Setup only completes once you
   send back a code the server accepts, which proves your app and the account
   agree before anything is switched on.
4. **Save your recovery codes.** They appear at the end of setup, once. Copy,
   download or print them before you finish.

**Verify it worked.** The settings page reports two-factor authentication as
enabled, and you get a "Two-factor authentication enabled" email. From then on,
a password sign-in stops halfway and asks for a code. Until that code is
accepted you are not signed in — the sign-in is held at the second-factor step
and your account is not accessible until it succeeds.

## Your recovery codes

Recovery codes are the self-service way back in when the authenticator app is
not available. They are short strings, generated for you when you enable 2FA.

- **You get four.** E󠄁a󠄁c󠄁h s󠄁ig󠄁n-󠄁in witho󠄁u󠄁t󠄁 t󠄁h󠄁e󠄁 a󠄁u󠄁t󠄁h󠄁e󠄁n󠄁t󠄁i󠄁c󠄁a󠄁t󠄁o󠄁r󠄁 u󠄁s󠄁e󠄁s󠄁 o󠄁n󠄁e󠄁.
- **Each code works once.** A u󠄁s󠄁e󠄁d󠄁 code i󠄁s rejected,󠄁 w󠄁i󠄁t󠄁h󠄁 the s󠄁am󠄁e󠄁 m󠄁essa󠄁ge󠄁 as a
  mistyped one.
- **They are shown once, when they are generated.** Afterwards the settings
  page reports only how many unused codes remain, not the codes themselves.
- **Generate a new set when you are running low.** Generating requires your
  password.

### Where to keep them

S󠄁a󠄁ve the c󠄁o󠄁d󠄁e󠄁s󠄁 somewhere you can r󠄁e󠄁a󠄁c󠄁h󠄁 i󠄁f󠄁 t󠄁h󠄁e󠄁 d󠄁e󠄁v󠄁i󠄁c󠄁e󠄁 w󠄁i󠄁t󠄁h󠄁 y󠄁o󠄁u󠄁r󠄁 a󠄁u󠄁t󠄁h󠄁e󠄁nt󠄁i󠄁c󠄁a󠄁t󠄁or󠄁 a󠄁p󠄁p󠄁
i󠄁s󠄁 l󠄁o󠄁s󠄁t o󠄁r󠄁 r󠄁e󠄁p󠄁l󠄁a󠄁c󠄁e󠄁d󠄁:󠄁

- **A󠄁 p󠄁a󠄁s󠄁s󠄁w󠄁o󠄁r󠄁d󠄁 m󠄁a󠄁n󠄁a󠄁g󠄁e󠄁r󠄁 y󠄁o󠄁u󠄁 c󠄁a󠄁n󠄁 open f󠄁r󠄁o󠄁m󠄁 a󠄁n󠄁o󠄁th󠄁e󠄁r󠄁 d󠄁e󠄁v󠄁ice**,󠄁 o󠄁r󠄁
- **A󠄁 p󠄁r󠄁in󠄁t󠄁e󠄁d󠄁 c󠄁o󠄁p󠄁y󠄁 k󠄁e󠄁p󠄁t󠄁 so󠄁m󠄁e󠄁w󠄁h󠄁e󠄁r󠄁e󠄁 p󠄁h󠄁y󠄁s󠄁i󠄁c󠄁a󠄁l󠄁l󠄁y󠄁 s󠄁e󠄁c󠄁u󠄁r󠄁e󠄁.󠄁**

D󠄁o󠄁 not ke󠄁e󠄁p th󠄁e󠄁m󠄁 only on the device that r󠄁u󠄁n󠄁s your authenticator app:󠄁 losing
that device wou󠄁l󠄁d󠄁 then󠄁 rem󠄁o󠄁v󠄁e both y󠄁o󠄁u󠄁r codes󠄁 a󠄁n󠄁d󠄁 y󠄁o󠄁u󠄁r󠄁 a󠄁u󠄁t󠄁h󠄁e󠄁n󠄁t󠄁i󠄁c󠄁a󠄁t󠄁o󠄁r󠄁.󠄁 D󠄁o󠄁 n󠄁o󠄁t󠄁
s󠄁t󠄁o󠄁r󠄁e󠄁 t󠄁h󠄁e󠄁m󠄁 i󠄁n󠄁 a󠄁 O󠄁n󠄁e󠄁t󠄁i󠄁m󠄁e󠄁 S󠄁e󠄁c󠄁r󠄁e󠄁t󠄁 lin󠄁k ei󠄁t󠄁h󠄁e󠄁r󠄁.󠄁 A󠄁 s󠄁e󠄁c󠄁r󠄁e󠄁t󠄁 i󠄁s󠄁 d󠄁e󠄁l󠄁e󠄁t󠄁e󠄁d󠄁 o󠄁n󠄁c󠄁e󠄁 i󠄁t󠄁 i󠄁s󠄁
r󠄁e󠄁v󠄁e󠄁a󠄁l󠄁e󠄁d󠄁 o󠄁r󠄁 e󠄁x󠄁p󠄁i󠄁r󠄁e󠄁s󠄁,󠄁 s󠄁o󠄁 i󠄁t󠄁 c󠄁a󠄁n󠄁n󠄁o󠄁t󠄁 s󠄁e󠄁r󠄁v󠄁e󠄁 a󠄁s󠄁 a󠄁 b󠄁a󠄁c󠄁k󠄁u󠄁p󠄁.󠄁

P󠄁r󠄁o󠄁t󠄁e󠄁c󠄁t󠄁 t󠄁h󠄁e󠄁 c󠄁o󠄁d󠄁e󠄁s󠄁 a󠄁s󠄁 y󠄁o󠄁u󠄁 w󠄁o󠄁u󠄁l󠄁d󠄁 a password.󠄁 E󠄁a󠄁c󠄁h󠄁 one c󠄁a󠄁n󠄁 c󠄁o󠄁m󠄁p󠄁l󠄁e󠄁t󠄁e󠄁 t󠄁h󠄁e󠄁 s󠄁e󠄁c󠄁o󠄁n󠄁d󠄁
step o󠄁f󠄁 a s󠄁i󠄁g󠄁n-󠄁i󠄁n󠄁.

## If you lose your authenticator

At the code prompt, choose **Use a recovery code instead** and enter one of
your codes. That signs you in.

A󠄁f󠄁t󠄁er󠄁 you s󠄁i󠄁g󠄁n󠄁 in:

- Set up your authenticator app again on the device you n󠄁o󠄁w󠄁 u󠄁se. Turning
  two-factor authentication off and setting it up again gives you a new secret
  and a new set of recovery codes.
- Check how many unused recovery codes you have left, and generate a new set if
  the number is low.

**If codes from the app are being rejected**, check the clock on the device
running it. TOTP codes are derived from the current time and expire quickly, so
a device whose clock has drifted produces codes the server will not accept. Use
the code showing right now, not one you copied a minute ago.

**If you keep entering wrong codes**, the authenticator step stops accepting
them for your account after several failures in a row. A󠄁 r󠄁ecovery code st󠄁i󠄁l󠄁l󠄁
s󠄁i󠄁g󠄁n󠄁s󠄁 y󠄁o󠄁u󠄁 i󠄁n󠄁 w󠄁h󠄁i󠄁l󠄁e the authentic󠄁a󠄁to󠄁r󠄁 s󠄁t󠄁ep󠄁 i󠄁s󠄁 locke󠄁d󠄁.

:::caution
An account can end up holding recovery codes with no authenticator configured.
Sign-in still asks for a second factor in that state, and a recovery code is the
only thing that will satisfy it. If that is where you are, use a code to get in
and then set two-factor authentication up cleanly.
:::

## If your recovery codes are gone too

There is deliberately no email-based way to switch off two-factor
authentication. Your email address can already reset your password, so an email
path to removing 2FA would mean anyone with your inbox had both — and 2FA would
be adding nothing.

That leaves one route: contact support, from the email address on the account.
Turning two-factor authentication off for an account is a manual action an
operator performs after establishing that the account is yours. It is not
self-service, there is no API for it, and because a human has to be satisfied
first, it is not instant. Expect to answer questions about the account that
only its holder could answer.

When it is done, both the authenticator secret and all remaining recovery codes
are removed, and you are emailed to say so. You then sign in with your password
alone, and should set two-factor authentication up again straight away.

## Passkeys

A passkey signs you in with whatever unlocks your device — Face ID, Touch ID,
Windows Hello — or with a hardware security key. Where passkeys are enabled you
will see a passkey option on the sign-in page and a Passkeys section in your
security settings where you can register one.

Two things worth knowing:

- **Registering a passkey does not replace your second factor.** When your
  account has an authenticator app configured, the second-factor step asks for
  an app code or a recovery code — a passkey is not offered there, and it is not
  a substitute for keeping your recovery codes.
- **Registering a passkey asks for your password**, and the browser prompt has a
  short window in which to touch the key or complete the biometric check. If it
  lapses, start again — nothing is left half-registered.

## What two-factor authentication does not cover

- **Signing in through an identity provider skips it.** If your account also
  signs in via SSO, that route does not ask for a second factor: the identity
  provider is trusted to enforce its own. Turning on 2FA here does not add a
  step there, so the factors that matter for that route are the ones your
  provider enforces. See [Single Sign-On](/en/organizations/sso).
- **It protects your account, not the links you have already sent.** Two-factor
  authentication guards signing in, your dashboard and your settings. A secret
  link behaves the same way regardless — see
  [What recipients see](/en/share/what-recipients-see).

## Turning it off

Disabling two-factor authentication requires your password, and sends you a
notification email so the change cannot happen quietly on an account someone
else has reached. If you suspect your authenticator or your codes are
compromised, turning 2FA off and setting it up again is the clean restart: a
new secret, a new set of recovery codes.

## Related

- [Signing in](/en/account/signing-in) — the methods available and what happens
  when a sign-in fails.
- [Sessions and identities](/en/account/sessions-and-identities) — see where you
  are signed in, and sign other devices out.
- [Security best practices](/en/security/best-practices) — how to handle the
  secrets themselves.

## Questions or need support?

We're here to help.

- Email: support@onetimesecret.com
- Feedback form: https://onetimesecret.com/feedback
