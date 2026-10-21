---
title: Our Principles
description: The core values that drive our approach to privacy and security — what we deliberately avoid, how little we email you, and how little we store.
audience: end-user
pageType: concept
sourceOfTruth: onetimesecret/lib/onetime/models/customer.rb:218-236 (email, language, plan and reveal-notification fields; no name fields); onetimesecret/apps/web/auth/migrations/001_initial.rb (sign-in method tables); onetimesecret/lib/onetime/models/session_metadata.rb:79-106 (active-session fields); onetimesecret/apps/web/auth/config/features/audit_logging.rb:78-260 (sign-in history events, each with IP address and user agent); otto 2.11.0 lib/otto/privacy/config.rb:135 and lib/otto/privacy/redacted_fingerprint.rb:160-168 (last IPv4 octet masked by default; user-agent version numbers removed); onetimesecret/src/shared/stores/languageStore.ts:147-189 (language kept in sessionStorage and, signed in, on the account); deleting the sign-in history at closure is tracked in onetimesecret/onetimesecret#4819
---

Onetime Secret exists so you can share sensitive information without leaving it lying around. These principles shape every product and operational decision we make — and because they're written down, you can hold us to them.

## Our Commitments

- **[Privacy first](#privacy-first)** — the tracking and marketing practices we deliberately avoid, and how we keep those commitments verifiable
- **[Communication](#communication)** — why we send as little email as possible, and the three narrow categories we limit ourselves to
- **[Data minimization](#data-minimization)** — what little we store, how long we keep it, and what we never collect

## Privacy first

Privacy isn't a feature we bolt onto Onetime Secret — it's how the service is built. That shows up less in what we add than in what we leave out. This section covers the practices we deliberately avoid, why we avoid them, and how you can check that we mean it.

### Industry standards we skip

We don't use the tracking and marketing tools most services treat as table stakes:

- Analytics packages that track user behavior
- Social media integration buttons
- Advertising networks
- A/B testing frameworks
- Marketing automation tools
- Third-party tracking pixels

### Minimal email

The same restraint applies to your inbox: no marketing newsletters, no promotional offers, no re-engagement campaigns, and no tracking pixels or click-tracking links in anything we do send. [Communication](#communication) below breaks down exactly what we send and why.

### Why we skip these practices

These choices come down to three things we care about deeply:

- **Your data is yours.** We don't treat user information as a resource to mine.
- **The tool should just work.** When you need to share something sensitive, reliability matters more than anything else.
- **Trust is earned by what we choose not to do.** Every tracker we skip, every campaign we don't send, is a small proof of where our priorities lie.

### Trust through transparency

Any service can claim to respect privacy. We'd rather make our claims checkable:

- **Open source.** The core service is [open source](https://github.com/onetimesecret/onetimesecret) — you can read the code that handles your secrets, or run it yourself.
- **Plain-language policies.** Our [Privacy Policy](https://onetimesecret.com/info/privacy) states what we collect and why, in words you don't need a lawyer to parse.
- **Documented security practices.** [Security & Trust](/en/security) explains our security model, how we protect data, and how to report a vulnerability.
- **Direct dialogue.** Questions, feedback, and criticism are welcome — [contact us](https://onetimesecret.com/feedback) and a person will read it.

### The real impact

Skipping these practices isn't just philosophy — it changes the product:

- A leaner, faster service with fewer moving parts
- A smaller attack surface with fewer third-party dependencies
- Your data stays under your control instead of scattered across ad networks
- Our engineering time goes to the product, not to conversion funnels

### Looking forward

We'll keep choosing simplicity and privacy over marketing reach. That means we may grow more slowly than services that optimize for engagement — and we're fine with that. A privacy tool earns its reputation through consistent, quiet reliability.

## Communication

We take a deliberately minimal approach to user communication, out of respect for your time and your inbox.

### Our minimal-email philosophy

Most services flood your inbox with marketing newsletters, usage statistics, promotional offers, and re-engagement campaigns. We don't do any of that. You'll only hear from us for the service you're using, notices we're obligated to send, or updates you opted into.

Every email we send falls into one of three categories:

- **Transactional** — secret links, account notices, and billing notices. These are part of the service itself.
- **Service and security notices** — security advisories, breach notifications, policy changes, and deprecations. We send these when needed, including when we're legally required to. They're never marketing.
- **Product news** — feature announcements and similar updates. Strictly opt-in, rare, and every one includes a one-click unsubscribe.

No email we send contains tracking pixels or click-tracking links. We don't know whether you opened an email or what you clicked, and we like it that way. Your inbox belongs to you.

### Why minimal email matters

A privacy tool shouldn't behave like a marketing platform. By keeping our communications minimal:

- We reduce the surface area for phishing and social engineering — fewer legitimate emails from us means suspicious ones are easier to spot
- We stay focused on running a reliable service rather than optimizing engagement metrics
- We respect the trust you place in us when you share your email address

The time other companies spend drafting campaigns, we spend on the service itself: core reliability, stronger privacy safeguards, and keeping up with jurisdictional and regulatory requirements.

## Data minimization

We collect only the data required to deliver the service: temporary secrets, and the account information needed to sign you in, protect your account, and run paid subscriptions. Everything else, we never ask for.

### What we store

- **For every secret** — the encrypted secret itself, kept only until it's viewed or expires. After that, it's permanently deleted. The one exception: minimal encrypted backups we keep in case of emergency, covered in more detail in our [Privacy Policy](https://onetimesecret.com/info/privacy).
- **For account holders** — the items below. We don't collect names or profile details; the service doesn't need them, so we don't ask.
  - **Email address.** Your sign-in name, and where account email is sent.
  - **Sign-in methods.** A hash of your password (never the password itself), your two-factor secret and recovery codes, your passkeys, and the identity providers you connect.
  - **Settings.** Your language, your reveal-notification choice, and your plan.
  - **Active sessions.** For each signed-in device: a partially masked network address, its country when known, the browser, and when the session started and was last active. You can review and end them under Settings → Security; see [Sessions and connected identities](/en/account/sessions-and-identities).
  - **Sign-in history.** A record of sign-ins, failed sign-in attempts, sign-outs, password changes and resets, and two-factor and recovery-code changes. Each entry records a partially masked network address and the browser, with version numbers removed.

  Closing your account deletes all of these; see [Closing your account](/en/account/close-your-account).

### What we don't track

We don't use cookies for tracking, analytics, or advertising. The only cookie we set keeps you signed in if you create an account. Interface preferences like color mode live in your browser's own storage (`localStorage` and `sessionStorage`), not in cookies. Your language choice is kept there too, and when you are signed in it is also saved to your account.

### Why minimization matters

- **Less risk.** The less data we store, the less there is to protect. Collecting only what's necessary reduces potential security risks.
- **Clear purpose.** Every piece of information we collect has a specific job in delivering the service. No tracking, no analytics, no extras.
- **Zero-knowledge design.** We can't access your secrets and don't want to. Each secret is encrypted, accessible only once, and automatically deleted after viewing or expiration.

This approach has served us and our users well since 2012. It's simple, effective, and respects your privacy.

## Why principles matter

Written principles keep us consistent. They settle product decisions before they become debates, and they give you a fixed, public record to measure us against. When growth and privacy pull in different directions, these pages already say which one wins.

For the technical side of these commitments — encryption, data handling, vulnerability reporting — see [Security & Trust](/en/security).

**Questions about our approach?** [Contact us](https://onetimesecret.com/feedback).
