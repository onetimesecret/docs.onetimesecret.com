---
title: Site and interface configuration
description: "Key records for the site, internationalization and diagnostics sections of the Onetime Secret configuration file, with shapes, values, environment reads and source locations."
audience: operator
pageType: reference
sourceOfTruth: "onetimesecret/etc/defaults/config.defaults.yaml:1-2102 (vendored at v0.26.19 and rendered by bin/reference.mjs)"
---

This reference reflects Onetime Secret v0.26.19 (`e98a88c9`).

## config file: site

### config: site.host

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `localhost:3000` | `HOST` | the value above | not annotated | `etc/defaults/config.defaults.yaml:7` |

### config: site.ssl

```
Turns https/http on or off when generating links
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | `false` | `SSL` | `false` | not annotated | `etc/defaults/config.defaults.yaml:9` |

### config: site.secret

```
IMPORTANT: After setting the secret, it should not be changed.
Be sure to create and store a backup in a secure offsite
location. Changing the secret can lead to unforeseen issues
like not being able to decrypt existing secrets.
See docs/runbooks/secret-rotation.md before touching it.
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | no value | `SECRET` | no value | not annotated | `etc/defaults/config.defaults.yaml:15` |

### config: site.secret_verifier_mode

```
Boot-time SECRET verifier (QS-6). The app stores an HKDF-derived
verifier in the datastore and checks it on every boot, so a changed
SECRET (or a datastore from another install) is detected instead of
silently making existing secrets undecryptable.
  warn    - log loudly on mismatch, keep booting (default)
  enforce - refuse to boot on mismatch
  off     - skip the check (escape hatch for multi-tenant datastores)
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `warn` | `SECRET_VERIFIER_MODE` | the value above | v0.26.0 | `etc/defaults/config.defaults.yaml:23` |

### config: site.legal.terms_url

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| JSON string | no value | `TERMS_URL` | no value | v0.26.8 | `etc/defaults/config.defaults.yaml:39` |

### config: site.legal.privacy_url

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| JSON string | no value | `PRIVACY_URL` | no value | v0.26.8 | `etc/defaults/config.defaults.yaml:40` |

### config: site.legal.dpa_url

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| JSON string | no value | `DPA_URL` | no value | v0.26.8 | `etc/defaults/config.defaults.yaml:41` |

### config: site.legal.cookie_url

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| JSON string | no value | `COOKIE_URL` | no value | v0.26.8 | `etc/defaults/config.defaults.yaml:42` |

### config: site.legal.aup_url

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| JSON string | no value | `AUP_URL` | no value | v0.26.8 | `etc/defaults/config.defaults.yaml:43` |

### config: site.legal.security_url

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| JSON string | no value | `SECURITY_URL` | no value | v0.26.8 | `etc/defaults/config.defaults.yaml:44` |

### config: site.interface.ui.enabled

```
Controls whether the web interface is enabled
When false, only a basic explanation page is shown
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | no value | `UI_ENABLED` | `true` | not annotated | `etc/defaults/config.defaults.yaml:50` |

### config: site.interface.ui.homepage.mode

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | no value | `UI_HOMEPAGE_MODE` | no value | not annotated | `etc/defaults/config.defaults.yaml:93` |

### config: site.interface.ui.homepage.matching_cidrs

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string |  | `UI_HOMEPAGE_MATCHING_CIDRS` | the value above | not annotated | `etc/defaults/config.defaults.yaml:94` |

### config: site.interface.ui.homepage.mode_header

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `O-Homepage-Mode` | `UI_HOMEPAGE_MODE_HEADER` | the value above | not annotated | `etc/defaults/config.defaults.yaml:95` |

### config: site.interface.ui.homepage.disabled_variant

```
Deployment-wide default landing page for the CANONICAL site when the
homepage secret form is gated by auth (auth.required or mode=external).
One of: closed (quiet two-tagline, no CTA), minimal, or v1. Per-domain
config and the ?variant= URL override take precedence; blank uses the
frontend default (closed). Applies to the canonical site only —
custom domains use custom_disabled_variant below.
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | no value | `DEFAULT_DISABLED_HOMEPAGE_VARIANT` | no value | v0.25.10 | `etc/defaults/config.defaults.yaml:102` |

### config: site.interface.ui.homepage.custom_disabled_variant

```
Deployment-wide default landing page for CUSTOM DOMAINS whose homepage
is private (homepage disabled, or incoming mode degraded at runtime).
Same values as disabled_variant (closed / minimal / v1). Kept separate
so the canonical and custom-domain defaults stay decoupled: a custom
domain does NOT inherit disabled_variant. Per-domain config
(homepage_config.disabled_homepage_variant) and the ?variant= URL
override take precedence; blank uses the frontend default (closed).
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | no value | `DEFAULT_CUSTOM_DOMAIN_DISABLED_HOMEPAGE_VARIANT` | no value | v0.26.2 | `etc/defaults/config.defaults.yaml:110` |

### config: site.interface.ui.homepage.public_links.recipient_intro

```
URL the "What is this link?" affordance points at. When empty,
the affordance is hidden in the disabled-homepage view.
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | no value | `HOMEPAGE_PUBLIC_LINKS_RECIPIENT_INTRO` | no value | v0.25.6 | `etc/defaults/config.defaults.yaml:117` |

### config: site.interface.ui.capabilities.burn

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | no value | `UI_CAPABILITIES_BURN` | `true` | v0.25.0 | `etc/defaults/config.defaults.yaml:124` |

### config: site.interface.ui.capabilities.show

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | no value | `UI_CAPABILITIES_SHOW` | `true` | v0.25.0 | `etc/defaults/config.defaults.yaml:125` |

### config: site.interface.ui.capabilities.receipt

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | no value | `UI_CAPABILITIES_RECEIPT` | `true` | v0.25.0 | `etc/defaults/config.defaults.yaml:126` |

### config: site.interface.ui.capabilities.recipient

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | no value | `UI_CAPABILITIES_RECIPIENT` | `true` | v0.25.0 | `etc/defaults/config.defaults.yaml:127` |

### config: site.interface.ui.header.enabled

```
Control switch to enable/disable header customization
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | no value | `HEADER_ENABLED` | `true` | not annotated | `etc/defaults/config.defaults.yaml:137` |

### config: site.interface.ui.header.logo.href

```
Where the logo lockup links to. Unset uses '/'.
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| JSON string | no value | `LOGO_LINK` | no value | v0.26.0 | `etc/defaults/config.defaults.yaml:145` |

### config: site.interface.ui.header.logo.show_name

```
Show the product name as a text mark next to the logo icon.
Unset (default): shown, unless a custom brand logo is configured
(custom logos usually embed their own wordmark). Set true/false
to force either way. The product name itself comes from
BRAND_PRODUCT_NAME and remains active in page titles, MFA labels,
and emails regardless of this knob.
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | no value | `LOGO_SHOW_NAME` | no value | v0.26.0 | `etc/defaults/config.defaults.yaml:152` |

### config: site.interface.ui.header.logo.prominent

```
Render the logo at a larger size in the authenticated header.
Useful for rasterized brand assets (e.g. BRAND_LOGO_URL=/img/brand.png)
that need more visual presence alongside the org/domain switchers.
The default (unset/false) keeps the logo compact (40px) so context
switchers fit on the same row. When true, custom logos render at
80px in authenticated views. Unauthenticated views (branded
homepage / disabled page) always render the logo prominently.
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | no value | `LOGO_PROMINENT` | no value | v0.26.0 | `etc/defaults/config.defaults.yaml:160` |

### config: site.interface.ui.header.navigation.enabled

```
Enable/disable header navigation entirely
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | no value | `HEADER_NAV_ENABLED` | `true` | not annotated | `etc/defaults/config.defaults.yaml:164` |

### config: site.interface.ui.footer_links.enabled

```
Global toggle to enable/disable all footer links
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | no value | `FOOTER_LINKS` | `false` | not annotated | `etc/defaults/config.defaults.yaml:169` |

### config: site.interface.ui.footer_links.groups[0].name

```
The "legal" group is a projection of site.legal above: each link's
URL resolves from there (normalize_legal in lib/onetime/config.rb),
and an entry whose URL is unset is dropped from the payload — no
placeholder, no dead link. Set the URLs via TERMS_URL, PRIVACY_URL,
DPA_URL, COOKIE_URL, AUP_URL, SECURITY_URL (or site.legal directly).
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `legal` | none | the value above is the shipped default | not annotated | `etc/defaults/config.defaults.yaml:177` |

### config: site.interface.ui.footer_links.groups[0].i18n_key

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `web.footer.legals` | none | the value above is the shipped default | not annotated | `etc/defaults/config.defaults.yaml:178` |

### config: site.interface.ui.footer_links.groups[0].links[0].text

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `Terms of Service` | none | the value above is the shipped default | not annotated | `etc/defaults/config.defaults.yaml:180` |

### config: site.interface.ui.footer_links.groups[0].links[0].i18n_key

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `web.layout.terms_of_service` | none | the value above is the shipped default | not annotated | `etc/defaults/config.defaults.yaml:181` |

### config: site.interface.ui.footer_links.groups[0].links[1].text

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `Privacy Policy` | none | the value above is the shipped default | not annotated | `etc/defaults/config.defaults.yaml:182` |

### config: site.interface.ui.footer_links.groups[0].links[1].i18n_key

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `web.layout.privacy_policy` | none | the value above is the shipped default | not annotated | `etc/defaults/config.defaults.yaml:183` |

### config: site.interface.ui.footer_links.groups[0].links[2].text

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `Data Processing Agreement` | none | the value above is the shipped default | not annotated | `etc/defaults/config.defaults.yaml:184` |

### config: site.interface.ui.footer_links.groups[0].links[2].i18n_key

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `web.footer.dpa` | none | the value above is the shipped default | not annotated | `etc/defaults/config.defaults.yaml:185` |

### config: site.interface.ui.footer_links.groups[0].links[3].text

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `Cookie Policy` | none | the value above is the shipped default | not annotated | `etc/defaults/config.defaults.yaml:186` |

### config: site.interface.ui.footer_links.groups[0].links[3].i18n_key

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `web.footer.cookie_policy` | none | the value above is the shipped default | not annotated | `etc/defaults/config.defaults.yaml:187` |

### config: site.interface.ui.footer_links.groups[0].links[4].text

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `Acceptable Use Policy` | none | the value above is the shipped default | not annotated | `etc/defaults/config.defaults.yaml:188` |

### config: site.interface.ui.footer_links.groups[0].links[4].i18n_key

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `web.footer.acceptable_use` | none | the value above is the shipped default | not annotated | `etc/defaults/config.defaults.yaml:189` |

### config: site.interface.ui.footer_links.groups[0].links[5].text

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `Security` | none | the value above is the shipped default | not annotated | `etc/defaults/config.defaults.yaml:190` |

### config: site.interface.ui.footer_links.groups[0].links[5].i18n_key

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `web.footer.security` | none | the value above is the shipped default | not annotated | `etc/defaults/config.defaults.yaml:191` |

### config: site.interface.ui.footer_links.groups[1].name

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `resources` | none | the value above is the shipped default | not annotated | `etc/defaults/config.defaults.yaml:192` |

### config: site.interface.ui.footer_links.groups[1].i18n_key

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `web.footer.resources` | none | the value above is the shipped default | not annotated | `etc/defaults/config.defaults.yaml:193` |

### config: site.interface.ui.footer_links.groups[1].links[0].text

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `Docs` | none | the value above is the shipped default | not annotated | `etc/defaults/config.defaults.yaml:195` |

### config: site.interface.ui.footer_links.groups[1].links[0].i18n_key

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `web.footer.docs` | none | the value above is the shipped default | not annotated | `etc/defaults/config.defaults.yaml:196` |

### config: site.interface.ui.footer_links.groups[1].links[0].url

```
Replace with your documentation URL
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `https://docs.onetimesecret.com/` | `DOCS_URL` | the value above | not annotated | `etc/defaults/config.defaults.yaml:198` |

### config: site.interface.ui.footer_links.groups[1].links[1].text

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `Status` | none | the value above is the shipped default | not annotated | `etc/defaults/config.defaults.yaml:199` |

### config: site.interface.ui.footer_links.groups[1].links[1].i18n_key

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `web.COMMON.status` | none | the value above is the shipped default | not annotated | `etc/defaults/config.defaults.yaml:200` |

### config: site.interface.ui.footer_links.groups[1].links[1].url

```
Replace with your status page URL if you have one
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `https://status.onetimesecret.com/` | `STATUS_URL` | the value above | not annotated | `etc/defaults/config.defaults.yaml:202` |

### config: site.interface.ui.footer_links.groups[2].name

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `support` | none | the value above is the shipped default | not annotated | `etc/defaults/config.defaults.yaml:203` |

### config: site.interface.ui.footer_links.groups[2].i18n_key

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `web.footer.support` | none | the value above is the shipped default | not annotated | `etc/defaults/config.defaults.yaml:204` |

### config: site.interface.ui.footer_links.groups[2].links[0].text

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `About` | none | the value above is the shipped default | not annotated | `etc/defaults/config.defaults.yaml:206` |

### config: site.interface.ui.footer_links.groups[2].links[0].i18n_key

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `web.COMMON.about` | none | the value above is the shipped default | not annotated | `etc/defaults/config.defaults.yaml:207` |

### config: site.interface.ui.footer_links.groups[2].links[0].url

```
Replace with your about page URL
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `https://onetimesecret.com/about` | `ABOUT_URL` | the value above | not annotated | `etc/defaults/config.defaults.yaml:209` |

### config: site.interface.ui.footer_links.groups[2].links[1].text

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `Contact` | none | the value above is the shipped default | not annotated | `etc/defaults/config.defaults.yaml:210` |

### config: site.interface.ui.footer_links.groups[2].links[1].i18n_key

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `web.footer.contact` | none | the value above is the shipped default | not annotated | `etc/defaults/config.defaults.yaml:211` |

### config: site.interface.ui.footer_links.groups[2].links[1].url

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `/feedback` | `CONTACT_URL` | the value above | not annotated | `etc/defaults/config.defaults.yaml:212` |

### config: site.interface.ui.workspace_links.enabled

```
Global toggle to enable/disable all footer links
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | no value | `WORKSPACE_LINKS` | `false` | v0.25.0 | `etc/defaults/config.defaults.yaml:217` |

### config: site.interface.ui.workspace_links.links[0].text

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `API Docs` | none | the value above is the shipped default | not annotated | `etc/defaults/config.defaults.yaml:219` |

### config: site.interface.ui.workspace_links.links[0].i18n_key

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `web.footer.api_docs` | none | the value above is the shipped default | not annotated | `etc/defaults/config.defaults.yaml:220` |

### config: site.interface.ui.workspace_links.links[0].url

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `https://api.onetimesecret.com/` | `WORKSPACE_API_DOCS_URL` | the value above | not annotated | `etc/defaults/config.defaults.yaml:221` |

### config: site.interface.ui.workspace_links.links[1].text

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `Branding Guide` | none | the value above is the shipped default | not annotated | `etc/defaults/config.defaults.yaml:222` |

### config: site.interface.ui.workspace_links.links[1].i18n_key

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `web.footer.branding_guide` | none | the value above is the shipped default | not annotated | `etc/defaults/config.defaults.yaml:223` |

### config: site.interface.ui.workspace_links.links[1].url

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `https://docs.onetimesecret.com/` | `WORKSPACE_BRANDING_GUIDE_URL` | the value above | not annotated | `etc/defaults/config.defaults.yaml:224` |

### config: site.interface.ui.show_version

```
Show or hide the version number in the workspace footer
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | no value | `FOOTER_VERSION_ENABLED` | `true` | v0.25.5 | `etc/defaults/config.defaults.yaml:231` |

### config: site.interface.ui.help.enabled

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | no value | `HELP_ENABLED` | `true` | v0.25.5 | `etc/defaults/config.defaults.yaml:234` |

### config: site.interface.api.enabled

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | no value | `API_ENABLED` | `true` | not annotated | `etc/defaults/config.defaults.yaml:238` |

### config: site.interface.api.guest_routes.enabled

```
Global toggle - disables all guest routes when false
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | no value | `API_GUEST_ROUTES_ENABLED` | `true` | not annotated | `etc/defaults/config.defaults.yaml:243` |

### config: site.interface.api.guest_routes.conceal

```
Fine-grained controls (checked only when enabled=true)
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | no value | `API_GUEST_CONCEAL` | `true` | not annotated | `etc/defaults/config.defaults.yaml:245` |

### config: site.interface.api.guest_routes.generate

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | no value | `API_GUEST_GENERATE` | `true` | not annotated | `etc/defaults/config.defaults.yaml:246` |

### config: site.interface.api.guest_routes.reveal

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | no value | `API_GUEST_REVEAL` | `true` | not annotated | `etc/defaults/config.defaults.yaml:247` |

### config: site.interface.api.guest_routes.burn

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | no value | `API_GUEST_BURN` | `true` | not annotated | `etc/defaults/config.defaults.yaml:248` |

### config: site.interface.api.guest_routes.show

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | no value | `API_GUEST_SHOW` | `true` | not annotated | `etc/defaults/config.defaults.yaml:249` |

### config: site.interface.api.guest_routes.receipt

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | no value | `API_GUEST_RECEIPT` | `true` | not annotated | `etc/defaults/config.defaults.yaml:250` |

### config: site.support.host

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | no value | `SUPPORT_HOST` | no value | not annotated | `etc/defaults/config.defaults.yaml:460` |

### config: site.session.secret

```
Session secret for HMAC signing. Falls back to site.secret if not set.
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | no value | `SESSION_SECRET` | no value | v0.24.0 | `etc/defaults/config.defaults.yaml:466` |

### config: site.session.expire_after

```
Session lifetime in seconds (default: 24 hours)
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| integer | `86400` | none | the value above is the shipped default | v0.24.0 | `etc/defaults/config.defaults.yaml:468` |

### config: site.session.absolute_timeout

```
Absolute session lifetime in seconds since sign-in, however active the
session is (default: 30 days). 0 disables the bound. See config.yaml.
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `2592000` | `SESSION_ABSOLUTE_TIMEOUT` | the value above | v0.26.14 | `etc/defaults/config.defaults.yaml:471` |

### config: site.session.key

```
Cookie name
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `onetime.session` | none | the value above is the shipped default | v0.24.0 | `etc/defaults/config.defaults.yaml:473` |

### config: site.session.same_site

```
SameSite cookie attribute (strict|lax|none)
Required for Stripe/OAuth redirects - 'strict' blocks cookies on cross-site GET navigations
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `lax` | none | the value above is the shipped default | v0.24.0 | `etc/defaults/config.defaults.yaml:513` |

### config: site.session.httponly

```
Prevent JavaScript access to cookies (always true in Rack)
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | `true` | none | the value above is the shipped default | v0.24.0 | `etc/defaults/config.defaults.yaml:515` |

### config: site.session.skip_paths[0]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `/health` | none | the value above is the shipped default | not annotated | `etc/defaults/config.defaults.yaml:528` |

### config: site.session.skip_paths[1]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `/health/advanced` | none | the value above is the shipped default | not annotated | `etc/defaults/config.defaults.yaml:529` |

### config: site.session.skip_paths[2]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `/auth/health` | none | the value above is the shipped default | not annotated | `etc/defaults/config.defaults.yaml:530` |

### config: site.session.skip_paths[3]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `/api/v1/status` | none | the value above is the shipped default | not annotated | `etc/defaults/config.defaults.yaml:531` |

### config: site.session.skip_paths[4]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `/api/v2/status` | none | the value above is the shipped default | not annotated | `etc/defaults/config.defaults.yaml:532` |

### config: site.session.skip_paths[5]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `/api/v3/status` | none | the value above is the shipped default | not annotated | `etc/defaults/config.defaults.yaml:533` |

### config: site.middleware.static_files

```
Serve static files for frontend vue application
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | no value | `MIDDLEWARE_STATIC_FILES` | `true` | v0.24.0 | `etc/defaults/config.defaults.yaml:539` |

### config: site.middleware.utf8_sanitizer

```
Sanitizes request parameters to ensure proper UTF-8 encoding
Prevents encoding-based attacks and malformed input
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | no value | `MIDDLEWARE_UTF8_SANITIZER` | `true` | v0.24.0 | `etc/defaults/config.defaults.yaml:542` |

### config: site.middleware.authenticity_token

```
Protects against Cross-Site Request Forgery (CSRF) attacks
Validates that requests originate from the same site
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | no value | `MIDDLEWARE_AUTHENTICITY_TOKEN` | `true` | v0.24.0 | `etc/defaults/config.defaults.yaml:545` |

### config: site.middleware.http_origin

```
Protects against Cross-Site Request Forgery (CSRF) attacks
Validates HTTP Origin header matches expected origin
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | no value | `MIDDLEWARE_HTTP_ORIGIN` | `false` | v0.24.0 | `etc/defaults/config.defaults.yaml:548` |

### config: site.middleware.xss_header

```
Sets X-XSS-Protection header to enable browser XSS filtering
Modern browsers rely less on this as CSP becomes standard
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | no value | `MIDDLEWARE_XSS_HEADER` | `false` | v0.24.0 | `etc/defaults/config.defaults.yaml:551` |

### config: site.middleware.frame_options

```
Prevents your site from being embedded in frames (clickjacking protection)
Sets X-Frame-Options header to SAMEORIGIN or DENY
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | no value | `MIDDLEWARE_FRAME_OPTIONS` | `true` | v0.24.0 | `etc/defaults/config.defaults.yaml:554` |

### config: site.middleware.path_traversal

```
Blocks directory traversal attacks using "../" in paths
Critical for preventing unauthorized file access
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | no value | `MIDDLEWARE_PATH_TRAVERSAL` | `true` | v0.24.0 | `etc/defaults/config.defaults.yaml:557` |

### config: site.middleware.cookie_tossing

```
Refuses (403) a request whose Cookie header carries the session cookie
(site.session.key) more than once, so a cookie planted by a sibling or
parent host cannot compete with the real one (Onetime::Middleware::
CookieTossing, RISK-2026-08-14-COOKIE-TOSSING). Default on since
v0.26.14; set MIDDLEWARE_COOKIE_TOSSING=false to disable.
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | no value | `MIDDLEWARE_COOKIE_TOSSING` | `true` | v0.24.0 | `etc/defaults/config.defaults.yaml:563` |

### config: site.middleware.ip_spoofing

```
Prevents IP spoofing attacks by validating IP addresses
Useful when IP-based access controls are implemented
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | no value | `MIDDLEWARE_IP_SPOOFING` | `false` | v0.24.0 | `etc/defaults/config.defaults.yaml:566` |

### config: site.middleware.strict_transport

```
Forces all connections to use HTTPS via HSTS headers
Disable only for development or when behind a secure proxy
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | no value | `MIDDLEWARE_STRICT_TRANSPORT` | `true` | v0.24.0 | `etc/defaults/config.defaults.yaml:569` |

### config: site.middleware.profiles.authenticated_web.deflater

```
Gzip response compression via Rack::Deflater
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | no value | `MIDDLEWARE_AUTH_DEFLATER` | `true` | v0.26.5 | `etc/defaults/config.defaults.yaml:580` |

### config: site.middleware.profiles.authenticated_web.content_security_policy

```
Content-Security-Policy header via Rack::Protection
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | no value | `MIDDLEWARE_AUTH_CONTENT_SECURITY_POLICY` | `true` | v0.26.5 | `etc/defaults/config.defaults.yaml:582` |

### config: site.middleware.profiles.authenticated_web.frame_options

```
X-Frame-Options clickjacking protection
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | no value | `MIDDLEWARE_AUTH_FRAME_OPTIONS` | `true` | v0.26.5 | `etc/defaults/config.defaults.yaml:584` |

### config: site.middleware.profiles.authenticated_web.http_origin

```
Origin-based CSRF protection with a display-domain allow_if
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | no value | `MIDDLEWARE_AUTH_HTTP_ORIGIN` | `true` | v0.26.5 | `etc/defaults/config.defaults.yaml:586` |

### config: site.middleware.profiles.authenticated_web.ip_spoofing

```
Rejects requests with disagreeing forwarded-IP headers
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | no value | `MIDDLEWARE_AUTH_IP_SPOOFING` | `true` | v0.26.5 | `etc/defaults/config.defaults.yaml:588` |

### config: site.middleware.profiles.authenticated_web.path_traversal

```
Normalizes "../" segments out of request paths
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | no value | `MIDDLEWARE_AUTH_PATH_TRAVERSAL` | `true` | v0.26.5 | `etc/defaults/config.defaults.yaml:590` |

### config: site.middleware.profiles.authenticated_web.session_hijacking

```
Ties the session to stable client attributes
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | no value | `MIDDLEWARE_AUTH_SESSION_HIJACKING` | `true` | v0.26.5 | `etc/defaults/config.defaults.yaml:592` |

### config: site.security.csp.enabled

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | no value | `CSP_ENABLED` | `true` | v0.24.0 | `etc/defaults/config.defaults.yaml:606` |

### config: site.network.trusted_proxy.enabled

```
Turns proxy-aware IP resolution on. The mode, header, cidrs, and
depth settings below do nothing while this is false.

When false, forwarded headers are ignored and the client IP is
REMOTE_ADDR — the address that opened the connection. That is right
only when clients connect to the app directly: put a
proxy in front and REMOTE_ADDR is the proxy, so every request looks
like it came from one address. When true, the client IP is read out
of the forwarded headers using `mode` below. Behind a proxy you
control, you want true. Behind one you cannot configure to overwrite
X-Forwarded-For, set true and set `mode` to depth, which picks the
client by its position in the chain so a forged entry is never
reached.
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | no value | `TRUSTED_PROXY_ENABLED` | `false` | v0.25.5 | `etc/defaults/config.defaults.yaml:640` |

### config: site.network.trusted_proxy.mode

```
How to resolve client IP behind proxies:

'filter' (default): CIDR-walk. Otto::Utils.resolve_client_ip walks the
  forwarded chain LEFT-TO-RIGHT and returns the first entry that is not
  in the trusted-proxy set — i.e. the LEFTMOST non-proxy entry becomes
  the client IP. The trusted set is the RFC1918/loopback/link-local
  private ranges (always trusted in this mode) plus every range in
  `cidrs` below. Works for most k8s/cloud deployments where the proxy
  tier has enumerable internal addresses. Note: filter mode reads the
  X-Forwarded-For family only (X-Forwarded-For, X-Real-IP, X-Client-IP)
  and REJECTS any other `header` value below at boot.

  SECURITY — read before enabling: the edge proxy MUST OVERWRITE
  X-Forwarded-For with the real peer address so the resolved client IP
  is always proxy-attested:
    nginx:  proxy_set_header X-Forwarded-For $remote_addr;
    Caddy:  header_up X-Forwarded-For {remote_host}
  Use 'depth' instead when you cannot make the edge overwrite: it counts
  positions from the right, so a forged leftmost entry is never reached.

'depth': Position-based counting. Skip exactly N rightmost hops.
  Use when:
  - CDN has a public IP (not RFC1918)
  - Variable proxy depth that filter can't handle
  - You need deterministic hop selection regardless of IP class
  - Your edge appends to X-Forwarded-For and you cannot change it

When filter and depth differ:
  - CDN with public IP: filter returns CDN IP (add to cidrs or use depth)
  - Variable hop count: filter handles automatically; depth fails if wrong
  - Forged leftmost entry: filter returns it (see SECURITY above); depth
    ignores it, since only the position N-from-the-right is read

Matched case-insensitively and canonicalized (like `header` below). The
set is closed: any other value falls back to filter — the safer mode —
and WARNs at boot naming the value, rather than failing the boot. The
'filter' default here is documentation; the app applies the same default
itself, so an unset or programmatically assembled config behaves
identically.
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `filter` | `TRUSTED_PROXY_MODE` | the value above | v0.25.5 | `etc/defaults/config.defaults.yaml:681` |

### config: site.network.trusted_proxy.header

```
Depth mode only: which header to read the forwarding chain from.
The accepted set is closed — exactly one of:
- X-Forwarded-For: Most common (nginx, Caddy, HAProxy, AWS ALB/ELB,
  Cloudflare, Fastly, most k8s ingresses)
- Forwarded: RFC 7239 standard; IPv6 addresses are bracketed,
  e.g. for="[2001:db8::1]". HAProxy and Apache can emit it, but it
  remains uncommon in practice
- Both: Try Forwarded first, fall back to X-Forwarded-For

Matched case-insensitively and canonicalized; any other value raises
at boot instead of silently resolving from the wrong header.

Vendor client-IP headers are NOT selectable — CF-Connecting-IP,
True-Client-IP and friends are never read for client-IP resolution,
and they carry a single address rather than a chain, so there are no
hops to count. (Vendor GEO headers such as CF-IPCountry are a separate
concern with its own resolution path; this setting does not affect
them.) If the edge only sets one of those, have it write the chain
into X-Forwarded-For. Filter mode reads the X-Forwarded-For family
only (X-Forwarded-For, X-Real-IP, X-Client-IP) and never RFC 7239
Forwarded: with `mode: filter`, any value here other than
X-Forwarded-For FAILS THE BOOT with a message naming both keys.
Leave it at the default (or unset) unless mode is depth.
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `X-Forwarded-For` | `TRUSTED_PROXY_HEADER` | the value above | v0.25.5 | `etc/defaults/config.defaults.yaml:706` |

### config: site.network.trusted_proxy.cidrs

```
Filter mode only: Additional CIDR ranges to trust as proxies
beyond RFC1918 defaults. Use when your CDN or proxy has public IPs.
Example: ["203.0.113.0/24", "2001:db8::/32"]
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string |  | `TRUSTED_PROXY_CIDRS` | the value above | v0.25.5 | `etc/defaults/config.defaults.yaml:711` |

### config: site.network.trusted_proxy.depth

```
Depth mode only: Number of proxy hops to skip from the right.
1 = standard single reverse proxy (nginx/Caddy)
2 = CDN → reverse proxy → app
No-proxy / direct connection: set enabled: false above rather
than depth: 0; the master switch falls back to REMOTE_ADDR.
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| integer | `1` | `TRUSTED_PROXY_DEPTH` | the value above | v0.25.5 | `etc/defaults/config.defaults.yaml:718` |

### config: site.network.geo.header

```
Optional app-level geo header, checked BEFORE the built-in vendor
headers. FILTER MODE ONLY — setting it under depth mode would trip
Otto's boot-time depth/geo_header conflict, so it is ignored there.
Leave blank to use only the built-in vendor headers (e.g. CF-IPCountry).
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | no value | `GEO_HEADER` | no value | v0.26.5 | `etc/defaults/config.defaults.yaml:739` |

### config: site.network.geo.db_path

```
Optional path to a local MaxMind-format country database (.mmdb) for
deployments without a geo-tagging CDN (direct-connect, or depth mode).
Looked up on the ALREADY-MASKED IP, so raw addresses never reach it.
Works in ALL modes. Requires the optional 'maxmind-db' gem; a bad path
or missing gem fails at boot (not per-request). Blank = disabled.
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | no value | `GEO_DB_PATH` | no value | v0.26.5 | `etc/defaults/config.defaults.yaml:746` |

### config: site.network.assume_https

```
Assume HTTPS at the origin (opt-in, INDEPENDENT of trusted_proxy).

Upgrade-only: when true, requests that do not already look like HTTPS
are marked as HTTPS before any downstream consumer reads the scheme
(Secure session cookie, HttpOrigin, CSRF, HSTS, scheme redirects).

Only enable when a real TLS-terminating proxy fronts the origin AND it
does NOT forward X-Forwarded-Proto: https (e.g. Cloudflare Tunnel).
Standard nginx/Caddy/ALB setups forward the scheme and do NOT need
this. Never enable on a directly-reachable origin: it would let a
plain-HTTP client be treated as HTTPS. Also keep site.ssl at its https
default when this is on: pairing assume_https with site.ssl:false makes
config-driven share/email/redirect links emit http:// while clients use
https (mixed-content downgrade of generated URLs).
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | no value | `ASSUME_HTTPS` | `false` | v0.26.2 | `etc/defaults/config.defaults.yaml:762` |

### config: site.network.public_host_rewrite

```
Public host rewrite (opt-in, default off).

For installs behind a proxy that rewrites Host to the origin target
and sends the public hostname in X-Forwarded-Host. When true, a request
classified as a canonical host, a subdomain of one, or a registered
custom domain has its Host set to that hostname before the mounted
apps run, so code that reads the request host directly sees the same
host as the rest of the application. The Host header as received stays
available in env['onetime.original_http_host']. Requests that do not
classify, and requests whose Host already names the public host, are
left as they are. No effect behind a proxy that preserves Host and
overwrites or removes X-Forwarded-Host.
The public port comes from the trusted proxy, never from an origin-hop
Host: the port in X-Forwarded-Host or, when that is a bare hostname,
a single-valued X-Forwarded-Port. The scheme-default port is left out.
See docs/operations/proxy-authority-header.md.
Since unreleased
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | no value | `PUBLIC_HOST_REWRITE` | `false` | not annotated | `etc/defaults/config.defaults.yaml:780` |

### config: site.admin.elevation.enabled

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | no value | `COLONEL_ELEVATION_ENABLED` | `true` | v0.26.11 | `etc/defaults/config.defaults.yaml:829` |

### config: site.admin.elevation.window

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `600` | `COLONEL_ELEVATION_WINDOW` | the value above | v0.26.11 | `etc/defaults/config.defaults.yaml:830` |

### config: site.admin.elevation.reauth_grace

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `0` | `COLONEL_ELEVATION_REAUTH_GRACE` | the value above | v0.26.11 | `etc/defaults/config.defaults.yaml:831` |

### config: site.admin.rate_limit.enabled

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | no value | `COLONEL_RATE_LIMIT_ENABLED` | `true` | v0.26.11 | `etc/defaults/config.defaults.yaml:878` |

### config: site.admin.rate_limit.elevation.enabled

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | no value | `COLONEL_ELEVATION_RATE_LIMIT_ENABLED` | `true` | v0.26.11 | `etc/defaults/config.defaults.yaml:880` |

### config: site.admin.rate_limit.elevation.max_attempts

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `5` | `COLONEL_ELEVATION_MAX_ATTEMPTS` | the value above | v0.26.11 | `etc/defaults/config.defaults.yaml:881` |

### config: site.admin.rate_limit.elevation.window

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `900` | `COLONEL_ELEVATION_RATE_WINDOW` | the value above | v0.26.11 | `etc/defaults/config.defaults.yaml:882` |

### config: site.admin.rate_limit.elevation.lockout

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `900` | `COLONEL_ELEVATION_LOCKOUT` | the value above | v0.26.11 | `etc/defaults/config.defaults.yaml:883` |

### config: site.admin.rate_limit.mutation.enabled

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | no value | `COLONEL_MUTATION_RATE_LIMIT_ENABLED` | `true` | v0.26.11 | `etc/defaults/config.defaults.yaml:885` |

### config: site.admin.rate_limit.mutation.max_attempts

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `120` | `COLONEL_MUTATION_MAX_ATTEMPTS` | the value above | v0.26.11 | `etc/defaults/config.defaults.yaml:886` |

### config: site.admin.rate_limit.mutation.window

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `300` | `COLONEL_MUTATION_RATE_WINDOW` | the value above | v0.26.11 | `etc/defaults/config.defaults.yaml:887` |

### config: site.admin.rate_limit.mutation.lockout

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `300` | `COLONEL_MUTATION_LOCKOUT` | the value above | v0.26.11 | `etc/defaults/config.defaults.yaml:888` |

### config: site.admin.rate_limit.destructive.enabled

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | no value | `COLONEL_DESTRUCTIVE_RATE_LIMIT_ENABLED` | `true` | v0.26.11 | `etc/defaults/config.defaults.yaml:890` |

### config: site.admin.rate_limit.destructive.max_attempts

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `10` | `COLONEL_DESTRUCTIVE_MAX_ATTEMPTS` | the value above | v0.26.11 | `etc/defaults/config.defaults.yaml:891` |

### config: site.admin.rate_limit.destructive.window

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `300` | `COLONEL_DESTRUCTIVE_RATE_WINDOW` | the value above | v0.26.11 | `etc/defaults/config.defaults.yaml:892` |

### config: site.admin.rate_limit.destructive.lockout

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `900` | `COLONEL_DESTRUCTIVE_LOCKOUT` | the value above | v0.26.11 | `etc/defaults/config.defaults.yaml:893` |

### config: site.admin.rate_limit.handle_resolve.enabled

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | no value | `COLONEL_HANDLE_RESOLVE_RATE_LIMIT_ENABLED` | `true` | v0.26.11 | `etc/defaults/config.defaults.yaml:895` |

### config: site.admin.rate_limit.handle_resolve.max_attempts

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `60` | `COLONEL_HANDLE_RESOLVE_MAX_ATTEMPTS` | the value above | v0.26.11 | `etc/defaults/config.defaults.yaml:896` |

### config: site.admin.rate_limit.handle_resolve.window

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `300` | `COLONEL_HANDLE_RESOLVE_RATE_WINDOW` | the value above | v0.26.11 | `etc/defaults/config.defaults.yaml:897` |

### config: site.admin.rate_limit.handle_resolve.lockout

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `300` | `COLONEL_HANDLE_RESOLVE_LOCKOUT` | the value above | v0.26.11 | `etc/defaults/config.defaults.yaml:898` |

### config: site.admin.session.enabled

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | no value | `ADMIN_SESSION_LIFETIME_ENABLED` | `true` | v0.26.11 | `etc/defaults/config.defaults.yaml:930` |

### config: site.admin.session.idle_timeout

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `3600` | `ADMIN_SESSION_IDLE_TIMEOUT` | the value above | v0.26.11 | `etc/defaults/config.defaults.yaml:931` |

### config: site.admin.session.absolute_timeout

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `43200` | `ADMIN_SESSION_ABSOLUTE_TIMEOUT` | the value above | v0.26.11 | `etc/defaults/config.defaults.yaml:932` |

### config: site.admin.allowed_hosts

```
Which HOSTNAMES serve the Colonel admin surfaces (/colonel shell and
/api/colonel API). A request whose validated detected host is not on this
list receives the same 404 as the CIDR gate below.

Unset (default): ENFORCED, anchored on the canonical hosts —
features.domains.default and site.host, each with its www. variant. A
stock canonical deployment sees no change; tenant custom domains and
operator link-pool domains (features.domains.link_domains) stop serving
the admin console, which is the point.

Set but BLANK (ADMIN_ALLOWED_HOSTS="" or only whitespace/commas): the
same anchor fallback as unset at runtime, plus a boot WARN (#4127) — the
operator wrote an allowlist that names nothing, and on a localhost or
bare-IP install that written config yields no host gate at all (the
anchors have nothing to anchor on, so the gate self-disables below).

Set to serve admin on its own hostname (recommended; pair it with an edge
rule that 404s /colonel and /api/colonel on every OTHER vhost). Explicit
entries are matched LITERALLY — list the www. form too if you need it.

  ADMIN_ALLOWED_HOSTS=admin.example.com

"*" ANYWHERE in the list disables the host gate entirely and logs a WARN
at boot; any other entry beside it is ignored (and named in a second
WARN). The CIDR gate is unaffected. This is the escape hatch for installs
reached by bare IP or by a hostname that is not the canonical domain.

Matching is case-insensitive, port-stripped and trailing-dot-stripped.
ASCII/A-label only: there is no IDN library in this project, so an
internationalized domain must be given in its punycode (xn--) form.

UNUSABLE ENTRIES — a wildcard pattern (*.example.com), a non-ASCII name,
a localhost form, or an IP literal — can never match a detected host.
Each is dropped and named in a boot WARN. If NOTHING in an explicitly set
list survives, the gate stays ACTIVE with an EMPTY allowlist: /colonel and
/api/colonel 404 on every hostname, rather than the admin console being
served on every hostname. The operator asked to restrict it, and a typo
must not produce the opposite. Onetime::Config.check_admin_allowed_hosts
says so at boot (WARN); it does NOT abort the boot, because the surfaces
are already fail-closed and the rest of the app is innocent.
Set "*" to turn the gate off on purpose.

The forwarded host header (X-Forwarded-Host) only counts toward this
gate when
site.network.trusted_proxy is configured AND the peer passed it. Behind a
proxy that forwards the public hostname instead of rewriting Host, set
trusted_proxy or both admin surfaces 404 (see
docs/operations/admin-network-isolation.md).

INACTIVE only when this list is UNSET and neither canonical anchor is a
hostname the app could ever detect — the stock local-dev and bare-IP
self-hosted posture (site.host defaults to localhost:3000). The gate
self-disables and logs a WARN at boot rather than locking the admin
surfaces out of installs that have no routable hostname to anchor on.
This exemption never applies to a list an operator set (above).

Boot logs the effective posture of both factors on one INFO line, "Admin
surface isolation posture", including the site.network.trusted_proxy
state — with no trusted proxy declared, both gates judge inputs any peer
on a private address can influence.

NO `|| []` FALLBACK HERE — deliberate (#4127). Unset must render nil and
a set-but-blank value (ADMIN_ALLOWED_HOSTS="" or whitespace/commas only)
must render a list with nothing in it, because
Onetime::Config.check_admin_allowed_hosts WARNs at boot on the second
shape and stays silent on the first. Folding both to [] here made an
explicitly written blank allowlist indistinguishable from no allowlist
at all. (DEFAULTS in lib/onetime/config.rb carries no allowed_hosts key
for the same reason — deep_merge would resolve nil back to it.)
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | no value | `ADMIN_ALLOWED_HOSTS` | no value | v0.26.5 | `etc/defaults/config.defaults.yaml:1003` |

### config: site.admin.allowed_cidrs

```
Optional network isolation for the Colonel admin surfaces (/colonel shell
and /api/colonel API). When set to a non-empty list of CIDR ranges, any
request whose trusted-proxy-resolved client IP falls OUTSIDE the allowlist
receives a 404 (indistinguishable-from-absent, not a 403) on both
surfaces. This is defense-in-depth ON TOP OF the two app-layer auth layers
(role=colonel at the router + verify_one_of_roles!(colonel:true) in each
logic class), which still enforce beneath it.

Empty/unset (default): NO-OP. Both surfaces stay reachable and the auth
layers are the sole gate — the correct posture for self-hosted
single-container installs, which cannot require a VPN. A list that IS set
but where no entry parses as a CIDR is the opposite case and denies both
surfaces (with an ERROR at boot): a list an operator wrote is never
silently disabled. Set this on cloud
deployments to private ranges only (e.g. a Tailscale/VPN CGNAT range like
100.64.0.0/10, or an office RFC1918 range). Self-hosted operators who want
isolation without app config can instead front the surfaces with a reverse
proxy (see docs/operations/admin-network-isolation.md).

IMPORTANT: resolution uses the trusted-proxy-aware client IP, so behind a
reverse proxy you must also configure site.network.trusted_proxy or every
request resolves to the proxy hop. A raw X-Forwarded-For header cannot
bypass the allowlist.

Entries may be as fine as a single host (/32, IPv6 /128): membership is
judged against the full-precision resolved client IP, even though request
logs carry only its privacy-masked form. An entry that does not parse as
a CIDR is dropped and named in a boot WARN.

Example: ["100.64.0.0/10", "10.0.0.0/8"]
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string |  | `ADMIN_ALLOWED_CIDRS` | the value above | v0.26.0 | `etc/defaults/config.defaults.yaml:1035` |

### config: site.admin.rodauth_admin_url

```
Base URL of the standalone Rodauth Admin instance (onetimesecret/
rodauth-admin), the tool that administers the SQL-backed accounts in
full auth mode. Optional, no credential, and nothing is ever requested
from it: the colonel console only renders OUTBOUND links to it (the
customer page deep-links to the matching account by extid; the sessions
console links to it when it is not the session authority). Unset means
those links render as plain text. Mirrors COLONEL_CONSOLE_URL on the
admin side. Example: http://127.0.0.1:9292 (reached over an SSH tunnel).
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| JSON string | no value | `RODAUTH_ADMIN_URL` | no value | v0.26.12 | `etc/defaults/config.defaults.yaml:1045` |

### config: site.brand_pack

```
Brand pack selection (#3739, v2 #3774). A brand pack is the single unit of
branding: a directory of root-served assets (favicon.ico, icon-*.png,
site.webmanifest, etc.) plus an optional brand.yaml identity manifest
(colours, product name — absorbed into the brand: block below at boot, as a
fallback beneath operator config and BRAND_* env).

Resolution ALWAYS lands on a pack: an unset brand_pack resolves to the
tracked `default` pack (public/branding/default, the neutral keyhole set).
A brand_pack NAME is resolved across two search roots, first existing wins:
  1. etc/branding/<name>     — operator space (runtime mounts / confext)
  2. public/branding/<name>  — vendor space (tracked default + generated packs)
brand_assets_dir (an explicit path, e.g. a runtime mount) wins over
brand_pack; a missing path or unknown name falls back to the default pack.
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| JSON string | no value | `BRAND_PACK` | no value | v0.26.0 | `etc/defaults/config.defaults.yaml:1060` |

### config: site.brand_assets_dir

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| JSON string | no value | `BRAND_ASSETS_DIR` | no value | v0.26.0 | `etc/defaults/config.defaults.yaml:1061` |

### config: site.interface.ui.workspace_links.links (conditional)

The shipped defaults file sets `text`, `i18n_key`, `url` inside a conditional block, so it states no unconditional value for `site.interface.ui.workspace_links.links`.

```erb
        <% if ENV['WORKSPACE_FEEDBACK_ENABLED'] != 'false' %>
        - text: Feedback
          i18n_key: web.TITLES.feedback
          url: <%= ENV['WORKSPACE_FEEDBACK_URL'] || '/feedback' %>
        <% end %>
```

| Source |
| --- |
| `etc/defaults/config.defaults.yaml:225-229` |

### config: site.session (conditional)

The shipped defaults file sets `secure` inside a conditional block, so it states no unconditional value for `site.session`.

```erb
    <% if %w[true false].include?(ENV['SESSION_COOKIE_SECURE'].to_s) %>
    secure: <%= ENV['SESSION_COOKIE_SECURE'] %>  # Since v0.24.0
    <% elsif ENV['SSL'] == 'true' %>
    secure: true  # Since v0.24.0
    <% elsif ENV['SSL'] == 'false' && %w[dev development test testing].include?(ENV['RACK_ENV'].to_s.downcase) %>
    secure: false  # Since v0.24.0
    <% end %>
```

| Source |
| --- |
| `etc/defaults/config.defaults.yaml:504-510` |

## config file: internationalization

### config: internationalization.enabled

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | `false` | `I18N_ENABLED` | `false` | not annotated | `etc/defaults/config.defaults.yaml:1859` |

### config: internationalization.default_locale

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `en` | `I18N_DEFAULT_LOCALE` | the value above | not annotated | `etc/defaults/config.defaults.yaml:1860` |

### config: internationalization.date_format

```
Date/time display format. Accepts a preset keyword or a date-fns pattern.
Setting date_format alone controls both date-only and date+time display.
Set datetime_format only if you need a different format for date+time contexts.

Presets:
  locale  - browser-native formatting (default)
  iso8601 - 2026-03-21 / 2026-03-21 14:30:00
  us      - 03/21/2026 / 03/21/2026 2:30:00 PM
  eu      - 21/03/2026 / 21/03/2026 14:30
  eu-dot  - 21.03.2026 / 21.03.2026 14:30
  uk      - 21 Mar 2026 / 21 Mar 2026 14:30
  long    - March 21, 2026 / March 21, 2026 2:30 PM

Or pass a raw date-fns pattern: https://date-fns.org/docs/format
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `locale` | `I18N_DATE_FORMAT` | the value above | v0.24.6 | `etc/defaults/config.defaults.yaml:1875` |

### config: internationalization.datetime_format

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `locale` | `I18N_DATETIME_FORMAT` | the value above | v0.24.6 | `etc/defaults/config.defaults.yaml:1876` |

### config: internationalization.fallback_locale.ca[0]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `ca_ES` | none | the value above is the shipped default | v0.24.3 | `etc/defaults/config.defaults.yaml:1878` |

### config: internationalization.fallback_locale.ca[1]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `en` | none | the value above is the shipped default | v0.24.3 | `etc/defaults/config.defaults.yaml:1878` |

### config: internationalization.fallback_locale.ca-ES[0]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `ca_ES` | none | the value above is the shipped default | v0.24.3 | `etc/defaults/config.defaults.yaml:1879` |

### config: internationalization.fallback_locale.ca-ES[1]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `en` | none | the value above is the shipped default | v0.24.3 | `etc/defaults/config.defaults.yaml:1879` |

### config: internationalization.fallback_locale.da[0]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `da_DK` | none | the value above is the shipped default | v0.24.3 | `etc/defaults/config.defaults.yaml:1880` |

### config: internationalization.fallback_locale.da[1]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `en` | none | the value above is the shipped default | v0.24.3 | `etc/defaults/config.defaults.yaml:1880` |

### config: internationalization.fallback_locale.da-DK[0]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `da_DK` | none | the value above is the shipped default | v0.24.3 | `etc/defaults/config.defaults.yaml:1881` |

### config: internationalization.fallback_locale.da-DK[1]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `en` | none | the value above is the shipped default | v0.24.3 | `etc/defaults/config.defaults.yaml:1881` |

### config: internationalization.fallback_locale.de[0]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `de` | none | the value above is the shipped default | not annotated | `etc/defaults/config.defaults.yaml:1882` |

### config: internationalization.fallback_locale.de[1]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `de_AT` | none | the value above is the shipped default | not annotated | `etc/defaults/config.defaults.yaml:1882` |

### config: internationalization.fallback_locale.de[2]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `en` | none | the value above is the shipped default | not annotated | `etc/defaults/config.defaults.yaml:1882` |

### config: internationalization.fallback_locale.de-AT[0]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `de_AT` | none | the value above is the shipped default | not annotated | `etc/defaults/config.defaults.yaml:1883` |

### config: internationalization.fallback_locale.de-AT[1]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `de` | none | the value above is the shipped default | not annotated | `etc/defaults/config.defaults.yaml:1883` |

### config: internationalization.fallback_locale.de-AT[2]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `en` | none | the value above is the shipped default | not annotated | `etc/defaults/config.defaults.yaml:1883` |

### config: internationalization.fallback_locale.el[0]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `el_GR` | none | the value above is the shipped default | v0.24.3 | `etc/defaults/config.defaults.yaml:1884` |

### config: internationalization.fallback_locale.el[1]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `en` | none | the value above is the shipped default | v0.24.3 | `etc/defaults/config.defaults.yaml:1884` |

### config: internationalization.fallback_locale.el-GR[0]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `el_GR` | none | the value above is the shipped default | v0.24.3 | `etc/defaults/config.defaults.yaml:1885` |

### config: internationalization.fallback_locale.el-GR[1]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `en` | none | the value above is the shipped default | v0.24.3 | `etc/defaults/config.defaults.yaml:1885` |

### config: internationalization.fallback_locale.fr[0]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `fr_FR` | none | the value above is the shipped default | not annotated | `etc/defaults/config.defaults.yaml:1886` |

### config: internationalization.fallback_locale.fr[1]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `fr_CA` | none | the value above is the shipped default | not annotated | `etc/defaults/config.defaults.yaml:1886` |

### config: internationalization.fallback_locale.fr[2]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `en` | none | the value above is the shipped default | not annotated | `etc/defaults/config.defaults.yaml:1886` |

### config: internationalization.fallback_locale.fr-CA[0]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `fr_CA` | none | the value above is the shipped default | not annotated | `etc/defaults/config.defaults.yaml:1887` |

### config: internationalization.fallback_locale.fr-CA[1]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `fr_FR` | none | the value above is the shipped default | not annotated | `etc/defaults/config.defaults.yaml:1887` |

### config: internationalization.fallback_locale.fr-CA[2]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `en` | none | the value above is the shipped default | not annotated | `etc/defaults/config.defaults.yaml:1887` |

### config: internationalization.fallback_locale.it[0]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `it_IT` | none | the value above is the shipped default | not annotated | `etc/defaults/config.defaults.yaml:1888` |

### config: internationalization.fallback_locale.it[1]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `en` | none | the value above is the shipped default | not annotated | `etc/defaults/config.defaults.yaml:1888` |

### config: internationalization.fallback_locale.mi[0]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `mi_NZ` | none | the value above is the shipped default | v0.24.3 | `etc/defaults/config.defaults.yaml:1889` |

### config: internationalization.fallback_locale.mi[1]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `en` | none | the value above is the shipped default | v0.24.3 | `etc/defaults/config.defaults.yaml:1889` |

### config: internationalization.fallback_locale.mi-NZ[0]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `mi_NZ` | none | the value above is the shipped default | v0.24.3 | `etc/defaults/config.defaults.yaml:1890` |

### config: internationalization.fallback_locale.mi-NZ[1]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `en` | none | the value above is the shipped default | v0.24.3 | `etc/defaults/config.defaults.yaml:1890` |

### config: internationalization.fallback_locale.pt[0]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `pt_BR` | none | the value above is the shipped default | not annotated | `etc/defaults/config.defaults.yaml:1891` |

### config: internationalization.fallback_locale.pt[1]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `pt_PT` | none | the value above is the shipped default | not annotated | `etc/defaults/config.defaults.yaml:1891` |

### config: internationalization.fallback_locale.pt[2]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `en` | none | the value above is the shipped default | not annotated | `etc/defaults/config.defaults.yaml:1891` |

### config: internationalization.fallback_locale.pt-BR[0]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `pt_BR` | none | the value above is the shipped default | v0.24.3 | `etc/defaults/config.defaults.yaml:1892` |

### config: internationalization.fallback_locale.pt-BR[1]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `pt_PT` | none | the value above is the shipped default | v0.24.3 | `etc/defaults/config.defaults.yaml:1892` |

### config: internationalization.fallback_locale.pt-BR[2]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `en` | none | the value above is the shipped default | v0.24.3 | `etc/defaults/config.defaults.yaml:1892` |

### config: internationalization.fallback_locale.pt-PT[0]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `pt_PT` | none | the value above is the shipped default | v0.24.3 | `etc/defaults/config.defaults.yaml:1893` |

### config: internationalization.fallback_locale.pt-PT[1]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `pt_BR` | none | the value above is the shipped default | v0.24.3 | `etc/defaults/config.defaults.yaml:1893` |

### config: internationalization.fallback_locale.pt-PT[2]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `en` | none | the value above is the shipped default | v0.24.3 | `etc/defaults/config.defaults.yaml:1893` |

### config: internationalization.fallback_locale.sl[0]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `sl_SI` | none | the value above is the shipped default | v0.24.3 | `etc/defaults/config.defaults.yaml:1894` |

### config: internationalization.fallback_locale.sl[1]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `en` | none | the value above is the shipped default | v0.24.3 | `etc/defaults/config.defaults.yaml:1894` |

### config: internationalization.fallback_locale.sl-SI[0]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `sl_SI` | none | the value above is the shipped default | v0.24.3 | `etc/defaults/config.defaults.yaml:1895` |

### config: internationalization.fallback_locale.sl-SI[1]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `en` | none | the value above is the shipped default | v0.24.3 | `etc/defaults/config.defaults.yaml:1895` |

### config: internationalization.fallback_locale.sv[0]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `sv_SE` | none | the value above is the shipped default | v0.24.3 | `etc/defaults/config.defaults.yaml:1896` |

### config: internationalization.fallback_locale.sv[1]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `en` | none | the value above is the shipped default | v0.24.3 | `etc/defaults/config.defaults.yaml:1896` |

### config: internationalization.fallback_locale.sv-SE[0]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `sv_SE` | none | the value above is the shipped default | v0.24.3 | `etc/defaults/config.defaults.yaml:1897` |

### config: internationalization.fallback_locale.sv-SE[1]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `en` | none | the value above is the shipped default | v0.24.3 | `etc/defaults/config.defaults.yaml:1897` |

### config: internationalization.fallback_locale.default[0]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `en` | none | the value above is the shipped default | not annotated | `etc/defaults/config.defaults.yaml:1898` |

### config: internationalization.locales[0]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `ar` | none | the value above is the shipped default | not annotated | `etc/defaults/config.defaults.yaml:1906` |

### config: internationalization.locales[1]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `bg` | none | the value above is the shipped default | not annotated | `etc/defaults/config.defaults.yaml:1907` |

### config: internationalization.locales[2]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `ca_ES` | none | the value above is the shipped default | not annotated | `etc/defaults/config.defaults.yaml:1908` |

### config: internationalization.locales[3]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `cs` | none | the value above is the shipped default | not annotated | `etc/defaults/config.defaults.yaml:1909` |

### config: internationalization.locales[4]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `da_DK` | none | the value above is the shipped default | not annotated | `etc/defaults/config.defaults.yaml:1910` |

### config: internationalization.locales[5]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `de` | none | the value above is the shipped default | not annotated | `etc/defaults/config.defaults.yaml:1911` |

### config: internationalization.locales[6]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `de_AT` | none | the value above is the shipped default | not annotated | `etc/defaults/config.defaults.yaml:1912` |

### config: internationalization.locales[7]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `el_GR` | none | the value above is the shipped default | not annotated | `etc/defaults/config.defaults.yaml:1913` |

### config: internationalization.locales[8]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `en` | none | the value above is the shipped default | not annotated | `etc/defaults/config.defaults.yaml:1914` |

### config: internationalization.locales[9]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `eo` | none | the value above is the shipped default | not annotated | `etc/defaults/config.defaults.yaml:1915` |

### config: internationalization.locales[10]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `es` | none | the value above is the shipped default | not annotated | `etc/defaults/config.defaults.yaml:1916` |

### config: internationalization.locales[11]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `fr_CA` | none | the value above is the shipped default | not annotated | `etc/defaults/config.defaults.yaml:1917` |

### config: internationalization.locales[12]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `fr_FR` | none | the value above is the shipped default | not annotated | `etc/defaults/config.defaults.yaml:1918` |

### config: internationalization.locales[13]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `he` | none | the value above is the shipped default | not annotated | `etc/defaults/config.defaults.yaml:1919` |

### config: internationalization.locales[14]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `hu` | none | the value above is the shipped default | not annotated | `etc/defaults/config.defaults.yaml:1920` |

### config: internationalization.locales[15]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `it_IT` | none | the value above is the shipped default | not annotated | `etc/defaults/config.defaults.yaml:1921` |

### config: internationalization.locales[16]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `ja` | none | the value above is the shipped default | not annotated | `etc/defaults/config.defaults.yaml:1922` |

### config: internationalization.locales[17]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `ko` | none | the value above is the shipped default | not annotated | `etc/defaults/config.defaults.yaml:1923` |

### config: internationalization.locales[18]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `mi_NZ` | none | the value above is the shipped default | not annotated | `etc/defaults/config.defaults.yaml:1924` |

### config: internationalization.locales[19]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `nl` | none | the value above is the shipped default | not annotated | `etc/defaults/config.defaults.yaml:1925` |

### config: internationalization.locales[20]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `pl` | none | the value above is the shipped default | not annotated | `etc/defaults/config.defaults.yaml:1926` |

### config: internationalization.locales[21]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `pt_BR` | none | the value above is the shipped default | not annotated | `etc/defaults/config.defaults.yaml:1927` |

### config: internationalization.locales[22]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `pt_PT` | none | the value above is the shipped default | not annotated | `etc/defaults/config.defaults.yaml:1928` |

### config: internationalization.locales[23]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `ru` | none | the value above is the shipped default | not annotated | `etc/defaults/config.defaults.yaml:1929` |

### config: internationalization.locales[24]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `sl_SI` | none | the value above is the shipped default | not annotated | `etc/defaults/config.defaults.yaml:1930` |

### config: internationalization.locales[25]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `sv_SE` | none | the value above is the shipped default | not annotated | `etc/defaults/config.defaults.yaml:1931` |

### config: internationalization.locales[26]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `tr` | none | the value above is the shipped default | not annotated | `etc/defaults/config.defaults.yaml:1932` |

### config: internationalization.locales[27]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `uk` | none | the value above is the shipped default | not annotated | `etc/defaults/config.defaults.yaml:1933` |

### config: internationalization.locales[28]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `vi` | none | the value above is the shipped default | not annotated | `etc/defaults/config.defaults.yaml:1934` |

### config: internationalization.locales[29]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `zh` | none | the value above is the shipped default | not annotated | `etc/defaults/config.defaults.yaml:1935` |

## config file: diagnostics

### config: diagnostics.enabled

```
If this is false, the rest of the settings are ignored
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | `false` | `DIAGNOSTICS_ENABLED` | `false` | not annotated | `etc/defaults/config.defaults.yaml:1938` |

### config: diagnostics.sentry.defaults.dsn

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | no value | `SENTRY_DSN` | no value | not annotated | `etc/defaults/config.defaults.yaml:1957` |

### config: diagnostics.sentry.defaults.sampleRate

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `0.10` | `SENTRY_SAMPLE_RATE` | the value above | not annotated | `etc/defaults/config.defaults.yaml:1958` |

### config: diagnostics.sentry.defaults.maxBreadcrumbs

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `5` | `SENTRY_MAX_BREADCRUMBS` | the value above | not annotated | `etc/defaults/config.defaults.yaml:1959` |

### config: diagnostics.sentry.defaults.logErrors

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | no value | `SENTRY_LOG_ERRORS` | `true` | not annotated | `etc/defaults/config.defaults.yaml:1960` |

### config: diagnostics.sentry.defaults.org_id

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | no value | `SENTRY_ORG_ID` | no value | v0.25.0 | `etc/defaults/config.defaults.yaml:1961` |

### config: diagnostics.sentry.backend.dsn

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | no value | `SENTRY_DSN_BACKEND` | no value | not annotated | `etc/defaults/config.defaults.yaml:1966` |

### config: diagnostics.sentry.frontend.dsn

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | no value | `SENTRY_DSN_FRONTEND` | no value | not annotated | `etc/defaults/config.defaults.yaml:1976` |

### config: diagnostics.sentry.frontend.trackComponents

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | no value | `SENTRY_VUE_TRACK_COMPONENTS` | `true` | not annotated | `etc/defaults/config.defaults.yaml:1977` |

### config: diagnostics.sentry.workers.dsn

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | no value | `SENTRY_DSN_WORKERS` | no value | v0.25.0 | `etc/defaults/config.defaults.yaml:1984` |
