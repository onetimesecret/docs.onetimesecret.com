---
textprov: true
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

We collect only the data required to deliver the service: temporary secrets, and the account information needed t󠄁o s󠄁i󠄁g󠄁n󠄁 y󠄁o󠄁u󠄁 i󠄁n󠄁,󠄁 p󠄁ro󠄁t󠄁e󠄁c󠄁t󠄁 y󠄁o󠄁u󠄁r󠄁 a󠄁c󠄁c󠄁o󠄁u󠄁n󠄁t󠄁,󠄁 a󠄁n󠄁d󠄁 r󠄁u󠄁n󠄁 paid subscriptions. Everything else, we never ask for.

### What we store

- **For every secret** — the encrypted secret itself, kept only until it's viewed or expires. After that, it's permanently deleted. The one exception: minimal encrypted backups we keep in case of emergency, covered in more detail in our [Privacy Policy](https://onetimesecret.com/info/privacy).
- **For account holders** — t󠄁h󠄁e󠄁 i󠄁t󠄁ems󠄁 b󠄁e󠄁lo󠄁w. We don't collect names or profile details; the service doesn't need them, so we don't ask.󠄁
  - **E󠄁m󠄁a󠄁i󠄁l󠄁 a󠄁d󠄁d󠄁r󠄁e󠄁s󠄁s󠄁.󠄁** Y󠄁o󠄁u󠄁r󠄁 s󠄁i󠄁g󠄁n󠄁-󠄁i󠄁n󠄁 n󠄁a󠄁m󠄁e󠄁,󠄁 a󠄁n󠄁d󠄁 w󠄁h󠄁e󠄁r󠄁e󠄁 a󠄁c󠄁c󠄁o󠄁u󠄁n󠄁t󠄁 e󠄁m󠄁a󠄁i󠄁l󠄁 i󠄁s󠄁 s󠄁e󠄁n󠄁t󠄁.󠄁
  - **S󠄁i󠄁g󠄁n󠄁-󠄁i󠄁n󠄁 m󠄁e󠄁t󠄁h󠄁o󠄁d󠄁s󠄁.󠄁** A󠄁 h󠄁a󠄁s󠄁h󠄁 o󠄁f󠄁 y󠄁o󠄁u󠄁r󠄁 p󠄁a󠄁s󠄁s󠄁w󠄁o󠄁r󠄁d󠄁 (󠄁n󠄁e󠄁v󠄁e󠄁r󠄁 t󠄁h󠄁e󠄁 p󠄁a󠄁s󠄁s󠄁w󠄁o󠄁r󠄁d󠄁 i󠄁t󠄁s󠄁e󠄁l󠄁f󠄁)󠄁,󠄁 y󠄁o󠄁u󠄁r󠄁 t󠄁w󠄁o󠄁-󠄁f󠄁a󠄁c󠄁t󠄁o󠄁r󠄁 s󠄁e󠄁c󠄁r󠄁e󠄁t󠄁 a󠄁n󠄁d󠄁 r󠄁e󠄁c󠄁o󠄁v󠄁e󠄁r󠄁y󠄁 c󠄁o󠄁d󠄁e󠄁s󠄁,󠄁 y󠄁o󠄁u󠄁r󠄁 p󠄁a󠄁s󠄁s󠄁k󠄁e󠄁y󠄁s󠄁,󠄁 a󠄁n󠄁d󠄁 t󠄁h󠄁e󠄁 i󠄁d󠄁e󠄁n󠄁t󠄁i󠄁t󠄁y󠄁 p󠄁r󠄁o󠄁v󠄁i󠄁d󠄁e󠄁r󠄁s󠄁 y󠄁o󠄁u󠄁 c󠄁o󠄁n󠄁n󠄁e󠄁c󠄁t󠄁.󠄁
  - **S󠄁e󠄁t󠄁t󠄁i󠄁n󠄁g󠄁s󠄁.󠄁** Y󠄁o󠄁u󠄁r󠄁 l󠄁a󠄁n󠄁g󠄁u󠄁a󠄁g󠄁e󠄁,󠄁 y󠄁o󠄁u󠄁r󠄁 r󠄁e󠄁v󠄁e󠄁a󠄁l󠄁-󠄁n󠄁o󠄁t󠄁i󠄁f󠄁i󠄁c󠄁a󠄁t󠄁i󠄁o󠄁n󠄁 c󠄁h󠄁o󠄁i󠄁c󠄁e󠄁,󠄁 a󠄁n󠄁d󠄁 y󠄁o󠄁u󠄁r󠄁 p󠄁l󠄁a󠄁n󠄁.󠄁
  - **A󠄁c󠄁t󠄁i󠄁v󠄁e󠄁 s󠄁e󠄁s󠄁s󠄁i󠄁o󠄁n󠄁s󠄁.󠄁** F󠄁o󠄁r󠄁 e󠄁a󠄁c󠄁h󠄁 s󠄁i󠄁g󠄁n󠄁e󠄁d󠄁-󠄁i󠄁n󠄁 d󠄁e󠄁v󠄁i󠄁c󠄁e󠄁:󠄁 a󠄁 p󠄁a󠄁r󠄁t󠄁i󠄁a󠄁l󠄁l󠄁y󠄁 m󠄁a󠄁s󠄁k󠄁e󠄁d󠄁 n󠄁e󠄁t󠄁w󠄁o󠄁r󠄁k󠄁 a󠄁d󠄁d󠄁r󠄁e󠄁s󠄁s󠄁,󠄁 i󠄁t󠄁s󠄁 c󠄁o󠄁u󠄁n󠄁t󠄁r󠄁y󠄁 w󠄁h󠄁e󠄁n󠄁 k󠄁n󠄁o󠄁w󠄁n󠄁,󠄁 t󠄁h󠄁e󠄁 b󠄁r󠄁o󠄁w󠄁s󠄁e󠄁r󠄁,󠄁 a󠄁n󠄁d󠄁 w󠄁h󠄁e󠄁n󠄁 t󠄁h󠄁e󠄁 s󠄁e󠄁s󠄁s󠄁i󠄁o󠄁n󠄁 s󠄁t󠄁a󠄁r󠄁t󠄁e󠄁d󠄁 a󠄁n󠄁d󠄁 w󠄁a󠄁s󠄁 l󠄁a󠄁s󠄁t󠄁 a󠄁c󠄁t󠄁i󠄁v󠄁e󠄁.󠄁 Y󠄁o󠄁u󠄁 c󠄁a󠄁n󠄁 r󠄁e󠄁v󠄁i󠄁e󠄁w󠄁 a󠄁n󠄁d󠄁 e󠄁n󠄁d󠄁 t󠄁h󠄁e󠄁m󠄁 u󠄁n󠄁d󠄁e󠄁r󠄁 S󠄁e󠄁t󠄁t󠄁i󠄁n󠄁g󠄁s󠄁 →󠄁 S󠄁e󠄁c󠄁u󠄁r󠄁i󠄁t󠄁y󠄁;󠄁 s󠄁e󠄁e󠄁 [S󠄁e󠄁s󠄁s󠄁i󠄁o󠄁n󠄁s󠄁 a󠄁n󠄁d󠄁 c󠄁o󠄁n󠄁n󠄁e󠄁c󠄁t󠄁e󠄁d󠄁 i󠄁d󠄁e󠄁n󠄁t󠄁i󠄁t󠄁i󠄁e󠄁s󠄁](/en/account/sessions-and-identities).󠄁
  - **S󠄁i󠄁g󠄁n󠄁-󠄁i󠄁n󠄁 h󠄁i󠄁s󠄁t󠄁o󠄁r󠄁y󠄁.󠄁** A󠄁 r󠄁e󠄁c󠄁o󠄁r󠄁d󠄁 o󠄁f󠄁 s󠄁i󠄁g󠄁n󠄁-󠄁i󠄁n󠄁s󠄁,󠄁 f󠄁a󠄁i󠄁l󠄁e󠄁d󠄁 s󠄁i󠄁g󠄁n󠄁-󠄁i󠄁n󠄁 a󠄁t󠄁t󠄁e󠄁m󠄁p󠄁t󠄁s󠄁,󠄁 s󠄁i󠄁g󠄁n󠄁-󠄁o󠄁u󠄁t󠄁s󠄁,󠄁 p󠄁a󠄁s󠄁s󠄁w󠄁o󠄁r󠄁d󠄁 c󠄁h󠄁a󠄁n󠄁g󠄁e󠄁s󠄁 a󠄁n󠄁d󠄁 r󠄁e󠄁s󠄁e󠄁t󠄁s󠄁,󠄁 a󠄁n󠄁d󠄁 t󠄁w󠄁o󠄁-󠄁f󠄁a󠄁c󠄁t󠄁o󠄁r󠄁 a󠄁n󠄁d󠄁 r󠄁e󠄁c󠄁o󠄁v󠄁e󠄁r󠄁y󠄁-󠄁c󠄁o󠄁d󠄁e󠄁 c󠄁h󠄁a󠄁n󠄁g󠄁e󠄁s󠄁.󠄁 E󠄁a󠄁c󠄁h󠄁 e󠄁n󠄁t󠄁r󠄁y󠄁 r󠄁e󠄁c󠄁o󠄁r󠄁d󠄁s󠄁 a󠄁 p󠄁a󠄁r󠄁t󠄁i󠄁a󠄁l󠄁l󠄁y󠄁 m󠄁a󠄁s󠄁k󠄁e󠄁d󠄁 n󠄁e󠄁t󠄁w󠄁o󠄁r󠄁k󠄁 a󠄁d󠄁d󠄁r󠄁e󠄁s󠄁s󠄁 a󠄁n󠄁d󠄁 t󠄁h󠄁e󠄁 b󠄁r󠄁o󠄁w󠄁s󠄁e󠄁r󠄁,󠄁 w󠄁i󠄁t󠄁h󠄁 v󠄁e󠄁r󠄁s󠄁i󠄁o󠄁n󠄁 n󠄁u󠄁m󠄁b󠄁e󠄁r󠄁s󠄁 r󠄁e󠄁m󠄁o󠄁v󠄁e󠄁d󠄁.󠄁

  C󠄁l󠄁o󠄁s󠄁i󠄁n󠄁g󠄁 y󠄁o󠄁u󠄁r󠄁 a󠄁c󠄁c󠄁o󠄁u󠄁n󠄁t󠄁 d󠄁e󠄁l󠄁e󠄁t󠄁e󠄁s󠄁 a󠄁l󠄁l󠄁 o󠄁f󠄁 t󠄁h󠄁e󠄁s󠄁e󠄁;󠄁 s󠄁e󠄁e󠄁 [C󠄁l󠄁o󠄁s󠄁i󠄁n󠄁g󠄁 y󠄁o󠄁u󠄁r󠄁 a󠄁c󠄁c󠄁o󠄁u󠄁n󠄁t󠄁](/en/account/close-your-account).

### What we don't track

We don't use cookies for tracking, analytics, or advertising. The only cookie we set keeps you signed in if you create an account. Interface preferences like color mode live in your browser's own storage (`localStorage` and `sessionStorage`), not in cookies.󠄁 Y󠄁o󠄁u󠄁r󠄁 l󠄁a󠄁n󠄁g󠄁u󠄁a󠄁g󠄁e󠄁 c󠄁h󠄁o󠄁i󠄁c󠄁e󠄁 i󠄁s󠄁 k󠄁e󠄁p󠄁t󠄁 t󠄁h󠄁e󠄁r󠄁e󠄁 t󠄁o󠄁o󠄁,󠄁 a󠄁n󠄁d󠄁 w󠄁h󠄁e󠄁n󠄁 y󠄁o󠄁u󠄁 a󠄁r󠄁e󠄁 s󠄁i󠄁g󠄁n󠄁e󠄁d󠄁 i󠄁n󠄁 i󠄁t󠄁 i󠄁s󠄁 a󠄁l󠄁s󠄁o󠄁 s󠄁a󠄁v󠄁e󠄁d󠄁 t󠄁o󠄁 y󠄁o󠄁u󠄁r󠄁 a󠄁c󠄁c󠄁o󠄁u󠄁n󠄁t󠄁.

### Why minimization matters

- **Less risk.** The less data we store, the less there is to protect. Collecting only what's necessary reduces potential security risks.
- **Clear purpose.** Every piece of information we collect has a specific job in delivering the service. No tracking, no analytics, no extras.
- **Zero-knowledge design.** We can't access your secrets and don't want to. Each secret is encrypted, accessible only once, and automatically deleted after viewing or expiration.

This approach has served us and our users well since 2012. It's simple, effective, and respects your privacy.

## Why principles matter

Written principles keep us consistent. They settle product decisions before they become debates, and they give you a fixed, public record to measure us against. When growth and privacy pull in different directions, these pages already say which one wins.

For the technical side of these commitments — encryption, data handling, vulnerability reporting — see [Security & Trust](/en/security).

**Questions about our approach?** [Contact us](https://onetimesecret.com/feedback).
