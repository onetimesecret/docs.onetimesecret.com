# Dutch (nl) translation review

- Commit: 6a1e221a — 17 pages
- English base: HEAD d30489ac
- Register expected: informal je/jij/jouw (docs `_language-notes.md`, app governance `register.form: informal`, `u`/`uw` forbidden); observed: consistent (no `u`/`uw` outside code; `jullie` addressing the company in pricing FAQ is correct)
- Findings: 0 critical, 0 major, 41 minor

## Verdict

The translation is accurate and complete. Security claims, plan limits, hostnames, DNS values and code blocks match the English, and every UI label checked matches the shipped nl app. The problems are consistency and polish: "self-hosting/self-hosted" is left in English on five pages; instance, data residency and expiry each have two or three renderings; a few sentences calque English word order or split separable verbs; three links use `/en/` where the nl page exists. It can ship as is. The terminology fixes should be done in one harmonisation pass.

## Findings

### account/change-your-region.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | terminology | 75 | «Ga uit van de eigen vervaltijd van elk bericht» | "expiry" is «vervaltijd» here, but «verlooptijd» on best-practices, data-protection, security/index and compare-plans. The app uses verlopen («Verloopt over») | «Ga uit van de eigen verlooptijd van elk bericht» |
| minor | terminology | 103, 105 | «## Dedicated instances» / «op een dedicated instance» | The heading is left in English. "instance" is «instantie» on client-libraries, best-practices and self-hosting/index | «## Dedicated instanties» / «op een dedicated instantie» |

### api/index.mdoc

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | fluency | 4 | «Maak, haal op en verbrand berichten vanuit je eigen code.» | The separable verb "ophalen" is split inside a coordinated list, which is ungrammatical (frontmatter description) | «Berichten aanmaken, ophalen en verbranden vanuit je eigen code.» |
| minor | terminology | 35 | «Een [zelf gehoste](/nl/self-hosting/) installatie» | "instance" is «installatie» here but «instantie» elsewhere. The attributive adjective is one word (zelfgehoste) | «Een [zelfgehoste](/nl/self-hosting/) instantie» |
| minor | accuracy | 79 | «maar nieuwe integraties moeten v2 gebruiken» | English "should use v2" is advice; «moeten» reads as a requirement | «maar voor nieuwe integraties kun je beter v2 gebruiken» |

### custom-domains/index.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | markup | 56 | «(/en/account/change-your-region#moving-a-custom-domain)» | The nl page exists (`account/change-your-region` is in the locale tree) | «(/nl/account/change-your-region#een-aangepast-domein-verhuizen)» |
| minor | fluency | 49, 51, 74 | «## Waar je domein wordt bediend» / «Het wordt bediend door de regionale site» / «wordt het domein niet meer bediend» | Calque of "served": «bedienen» means serving people or operating a machine, not hosting a domain | «## Waar je domein wordt gehost» / «Het wordt gehost door de regionale site» / «wordt het domein niet meer aangeboden» (if the heading changes, update the anchor in setup-guide:35) |
| minor | fluency | 55, 78 | «Om een domein vanuit een andere regio te bedienen, zie» / «Voor voorbeelden van … kunt delen, zie» | English "To …, see" word order | «Zie … als je een domein vanuit een andere regio wilt laten hosten.» / «Zie [Toepassingen](/nl/share/use-cases) voor voorbeelden van …» |

### custom-domains/setup-guide.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | markup | 11 | «(/en/custom-domains#what-each-plan-includes)» | The nl page exists | «(/nl/custom-domains#wat-elk-plan-bevat)» |
| minor | markup | 35 | «(/en/custom-domains#where-your-domain-is-served)» | The nl page exists | «(/nl/custom-domains#waar-je-domein-wordt-bediend)», or the new slug if the index.md heading is changed |
| minor | fluency | 63–65, 101–102 | «Bewaar dit record na de verificatie. … stopt de bediening van het domein.» / «Het domein wordt dan bediend» | "Keep this record" means leave it in DNS; «bewaren» means store or save. «bediening»/«bediend» is a calque of "served" | «Laat dit record na de verificatie staan. … zorgt ervoor dat het domein niet meer wordt aangeboden.» / «Het domein wordt dan aangeboden» |
| minor | style | 107 | «## Controleer het resultaat» | The same English heading ("Check the result") is «## Het resultaat controleren» in branding.md:83. Heading mood is mixed across pages (infinitive in branding, custom-domains/index, use-cases; imperative here, change-your-region, share/*) | Use one form; infinitive headings are the usual Dutch docs style |

### index.mdoc

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | fluency | 34 | «Maak en haal berichten op vanuit scripts» | «Maak … op» reads as «opmaken»; separable verb split across the coordination | «Maak berichten aan en haal ze op vanuit scripts, CI-pipelines en je eigen applicaties.» |
| minor | typography | 41 | «open-sourceapplicatie» | Spelled «opensourceproject» on best-practices:49; Woordenlijst writes opensource- closed | «opensourceapplicatie» |

### pricing/compare-plans.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | typography | 45 | «Werkruimte-branding» | Dutch compound needs no hyphen; the shipped app writes «Werkruimtebranding» (web.billing.features.workspace_branding) | «Werkruimtebranding» |

### pricing/index.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | terminology | 7 | «Deel vertrouwelijke informatie met vertrouwen, versterk je merk en bouw vertrouwen op.» | The glossary and language notes mark «vertrouwelijk» as avoid outside legal contexts. The sentence also repeats «vertrouw-» three times | «Deel gevoelige informatie met een gerust hart, versterk je merk en bouw vertrouwen op.» |
| minor | fluency | 31 | «Onbeperkt aangepaste domeinen» | «aantal» is missing, so it reads "unlimitedly custom domains" | «Onbeperkt aantal aangepaste domeinen» |
| minor | terminology | 74 | «in het zelf gehoste project» | The attributive adjective is one word | «in het zelfgehoste project» |

### security/best-practices.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | terminology | 47 | «## Geavanceerde beveiliging voor self-hosting» | English left in a heading; the same page uses «zelf host» (51), and other pages use «zelf hosten» | «## Geavanceerde beveiliging bij zelf hosten» |

### security/data-protection.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | terminology | 34, 46 | «(dataresidentie)» / «Regionale dataresidentie» | change-your-region:99 has «gegevensresidentie»; this page otherwise uses gegevens- compounds (gegevensbescherming, gegevensminimalisatie) | «gegevensresidentie» |
| minor | terminology | 60 | «houdt [self-hosting](…) alles binnen je eigen infrastructuur» | English left in prose | «houdt [zelf hosten](…) alles binnen je eigen infrastructuur» |

### security/index.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | terminology | 4 | «regionale dataresidentie» | See data-protection.md (frontmatter description) | «regionale gegevensresidentie» |
| minor | fluency | 22 | «Beperkte levensduur door ontwerp.» | Calque of "by design" | «Standaard een beperkte levensduur.» |
| minor | terminology | 39 | «**[Self-hosting](…)**» | English link label; api/index:94 and pricing/index:66 use «Zelf hosten» | «**[Zelf hosten](…)**» |

### security/vulnerability-disclosure.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | terminology | 24, 45, 46 | «een self-hosted versie» / «**Self-hosted:**» / «Voor self-hosted implementaties» | English loan; other pages use zelfgehost / zelf hosten | «een zelfgehoste versie» / «**Zelfgehost:**» / «Voor zelfgehoste implementaties» |
| minor | typography | 45 | «open-sourceproject» | See index.mdoc:41 | «opensourceproject» |

### self-hosting/index.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | terminology | 3 | «title: "Overzicht self-hosting"» | English term in the page title. Pages link here as «Zelf hosten» (api/index:94, pricing/index:66) | «Overzicht zelf hosten» |
| minor | frontmatter | 5–6 | «sidebar: / order: 1» | Legacy key not in the English frontmatter (structure.md). It has no effect because the sidebar is explicit in `config/sidebar.mjs` | Remove |
| minor | accuracy | 10 | «hoe accounts worden geverifieerd» | English "authenticated"; «geverifieerd» is the domain-verification word elsewhere | «hoe accounts worden geauthenticeerd» |
| minor | fluency | 30 | «Haast, en al een Valkey of Redis draaiend?» | Verbless calque | «Haast, en draai je al Valkey of Redis?» |
| minor | fluency | 91 | «Met `n` antwoorden is de manier om een overdracht vooraf te bekijken.» | Calque of "Answering n is how you preview a transfer" | «Door `n` te antwoorden, bekijk je een overdracht vooraf.» |

### share/index.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | fluency | 11, 131 | «Voor een kortere rondleiding, zie» / «Om optionele e-mails bij onthulling in te schakelen, zie» | English "For …, see" word order | «Zie [Verstuur je eerste bericht](…) voor een kortere rondleiding.» / «Zie [Voorkeuren](…) om optionele e-mails bij onthulling in te schakelen.» |
| minor | fluency | 49 | «na een herlaad» | «herlaad» is not a Dutch noun | «na het opnieuw laden» |
| minor | terminology | 55, 143 | «vervaltijd» | See change-your-region:75 | «verlooptijd» |
| minor | terminology | 61–62 | «Een beheerder van een zelf gehoste installatie» | Same as api/index:35 | «Een beheerder van een zelfgehoste instantie» |
| minor | fluency | 114 | «de maker van een bericht dat uitgelogd is aangemaakt» | Reads as if the message is logged out | «de maker van een bericht dat zonder inloggen is aangemaakt» |
| minor | terminology | 156 | «[Een bericht aanvragen](/en/share/request-secret)» | use-cases:53 links the same page as «Een bericht opvragen» | «[Een bericht opvragen](…)» |

### share/use-cases.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | terminology | 55 | «## Gevoelige onthullingen en anonimiteit» | «onthullen» is the product term for "reveal", so the heading reads as revealing secrets. English means disclosures (reports); the body (63) uses «melding» | «## Gevoelige meldingen en anonimiteit» |
| minor | fluency | 17, 23, 24 | «Stuur een inloggegeven» / «trek het inloggegeven dan in» / «een inloggegeven dat iemand al heeft gelezen» | Singular «inloggegeven» is unidiomatic; «inloggegevens» is used as a plural noun | «Stuur inloggegevens …» / «trek de inloggegevens dan in of roteer ze …» / «… inloggegevens die iemand al heeft gelezen niet intrekken» |

### share/why-secret-links.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | accuracy | 15–16 | «Een oud bericht kan de link nog bevatten, maar nadat het bericht niet meer beschikbaar is» | «bericht» means both the chat or email message and the secret in the same sentence, so the second clause can be read as the chat message | «Een oude e-mail of een oud chatbericht kan de link nog bevatten, maar zodra het bericht niet meer beschikbaar is, …» |
| minor | terminology | 24 | «Stel een vervaltijd in» | See change-your-region:75 | «Stel een verlooptijd in» |

## Clean pages

- api/client-libraries.md
- custom-domains/branding.md

## Terminology consistency

| English term | Renderings found (pages) | Expected (source) | Action |
|---|---|---|---|
| self-hosting / self-hosted | «zelf hosten» (api/index, index.mdoc, pricing/index); «zelfgehoste» (client-libraries ×4); «zelf gehoste» two words (api/index:35, pricing/index:74, share/index:61); English «self-hosting/self-hosted» (self-hosting/index:3 title, best-practices:47, data-protection:60, security/index:39, vulnerability-disclosure:24,45,46) | verb/noun «zelf hosten»; adjective «zelfgehost(e)» (prior glossary nl; Dutch spelling of zelf + participle as adjective) | Replace the English and the two-word attributive forms |
| instance | «instantie» (client-libraries, best-practices, self-hosting/index); «installatie» (api/index:35, share/index:62); «instance» (change-your-region:103,105) | «instantie» (shipped app: api.domains.errors.incoming_secrets_disabled «op deze instantie») | Harmonise to instantie |
| data residency | «gegevensresidentie» (change-your-region:99); «dataresidentie» (data-protection:34,46; security/index:4) | «gegevensresidentie» (prior glossary nl) | Harmonise |
| expiry / expiration | «verlooptijd» (best-practices, data-protection, security/index, compare-plans); «vervaltijd» (change-your-region:75, share/index:55,143, why-secret-links:24) | «verlooptijd» (app «Verloopt over», web.LABELS.secret_ttl; docs glossary "expires in → verloopt over") | Harmonise |
| Request a secret (page link) | «Een bericht aanvragen» (share/index:156); «Een bericht opvragen» (use-cases:53) | one form | Use «opvragen» (matches use-cases heading «Gevoelige informatie opvragen») |
| open source | «open-sourceapplicatie» (index.mdoc:41), «open-sourceproject» (vulnerability-disclosure:45), «opensourceproject» (best-practices:49) | closed «opensource-» | Harmonise |
| "Check the result" (heading) | «Het resultaat controleren» (branding:83); «Controleer het resultaat» (setup-guide:107) | one heading mood | Pick infinitive or imperative for all headings |
| reveal | «onthullen / Onthuld / Klik om te onthullen» (all pages) | App: «onthullen» (web.STATUS.revealed, web.COMMON.click_to_continue). Docs glossary.md still says "view/reveal → bekijken/weergeven" | Pages are right; update docs `translations/glossary.md` |
| secret link | «berichtlink» (all pages) | App is split: «Berichtlink» (web.secrets.secret_link, email.common.secret_link_label) vs «Beveiligde link» (web.LABELS.secret_link). Language notes give «beveiligde links» and also the contradictory example «Geheime koppelingen» | Pages consistent; record berichtlink in docs glossary and remove the «Geheime koppelingen» example |
| secret links (sidebar) | «Waarom geheime links gebruiken» (src/content/i18n/nl.json `whyUseSecretLinks`) vs page title «Waarom berichtlinks gebruiken?» | «berichtlinks»; «geheim» is forbidden (rule.nl-secret-noun) | Fix sidebar bundle (see general issues) |

## App UI label mismatches

| Page:line | Docs text | Shipped app string (key) | Note |
|---|---|---|---|
| — | — | — | None found. Checked and matching: Domeinen, Beheren, Functies, Merk beheren, Merk/Bezorging, Logo uploaden, Vervangen, Domeinlogo, Logo opslaan, Bijwerken, Logo verwijderen, Favicon uploaden/opslaan/verwijderen, Favicon vernieuwen van domein, Merkkleur, Hoeken, Lettertypefamilie, Taal, Onthullingsinstructies, Vóór onthullen, Na onthullen, Domein toevoegen, Aangepast domein, Populaire subdomeinen, Gebruik mijn hoofddomein, Doorgaan met {0}, Domein verifiëren, Domein geverifieerd en actief, Actief, Domeinstatus, Domein, Status, Doeladres, DNS-record, SSL-status, SSL-vernieuwing, Laatst gecontroleerd, Laatste verificatiecontrole mislukt, Blijf op pagina, Verloopt over, Klik om te onthullen, Nieuw / Bekeken in voorbeeld / Onthuld, Voorkeuren, Berichtactiviteit, Berichten op startpagina, Inkomende berichten, «Je hebt niets opgegeven om te delen». Corner and font option names stay English because the app hard-codes them (known issue). |

## English source and general issues

- [new] src/content/i18n/nl.json (nl sidebar bundle) is stale against the re-synced pages and uses the forbidden noun «geheim». These labels are rendered by `config/sidebar.mjs`:
  - `whyUseSecretLinks` «Waarom geheime links gebruiken» (page «Waarom berichtlinks gebruiken?»)
  - `useCases` «Gebruikscasussen» (page «Toepassingen»)
  - `setupGuide` «Installatiegids» (page «Een aangepast domein instellen»)
  - `brandGuide` «Merkgids» (EN label "Branding")
  - `selfHosting` «Zelf-hosting»
  - `clientLibraries` «Client bibliotheken» (page «Clientbibliotheken»)
  - `securityTrust` «Beveiliging & vertrouwen» (page «Beveiliging en vertrouwen»)

  Legacy keys `createSecrets` «Geheimen aanmaken» and `retrieveSecrets` «Geheimen ophalen» also contain «geheim». This extends the known mi/ja/zh-cn sidebar-divergence item to nl.
- [new] self-hosting/index.md in several locales (nl, bg, da, de, es, fr, it, ja at least) still has `sidebar: order: 1`, which the English page no longer has. It has no effect with the explicit sidebar config. Remove it in a locale cleanup.
- [new] Sign-in entitlement naming varies across English pages: custom-domains/index.md:33 "Sign-in settings", pricing/index.md:36 "Per-domain sign-in settings", pricing/compare-plans.md:20 "Per-domain sign-in configuration". Locales copy the variation (nl «Inloginstellingen» / «Inlogconfiguratie per domein»).
- [new] api/index.mdoc:40 "the password is the API token from your account settings". The account settings label is "API Key" (web.account.api_key; nl «API-sleutel»), and best-practices.md calls it "API Keys". Only web.settings.api.basic_auth_hint says "API token". Readers searching settings for «API-token» find «API-sleutel».
- [known] Passphrase encrypts (api/index.mdoc:61) vs is only an access check (share/index.md:75). nl reproduces both: api/index.mdoc:60 and share/index.md:82.
- [known] setup-guide "no fixed limit" vs compare-plans "Unlimited". nl reproduces it: setup-guide:10 «geen vaste limiet» vs compare-plans:11 «Onbeperkt».
- [known] index.mdoc "Setup your custom domain". nl renders it correctly as «Je aangepaste domein instellen».
- [known] index.mdoc link label "Configuration and upgrades" vs the page title "Self-hosting overview".
- [known] self-hosting/index.md "one generated secret" is ambiguous. nl chose the credential reading («één gegenereerde secret»).
- [known] pricing/index.md "$0/month" has no currency localisation (nl «$0/maand»).
- [known] Free/Basic tier naming.
- [known] setup-guide region table gives literal IPs for EU/US only.
- [known] Corner/Font option labels are hard-coded English in the app.
- [known] Many links stay `/en/` because the target pages are missing from locale trees.

## Not checked

- No build, `check:*` script or `dogfood.py check` was run. This review was read-only, and only the clean copies were read.
- The anchors I suggest for `/nl/` links (`#een-aangepast-domein-verhuizen`, `#wat-elk-plan-bevat`, `#waar-je-domein-wordt-bediend`) are derived from the nl headings with GitHub-style slugging, not from a built site.
- sourceOfTruth code claims were not re-verified. I checked only UI labels against `locales/content/nl` and plan limits against `billing.yaml.txt`; both match.

## Resolution (fix round, 2026-10-21)

40 of 41 findings fixed, 1 skipped. The nine flagged sidebar keys (general issues) are also fixed. `python3 tools/dogfood.py check --base b2883096` passes (15 files). `pnpm run check:frontmatter` passes. No build was run.

| Commit | Subject |
|---|---|
| ece10715 | docs(i18n/nl): correct mistranslations in api, self-hosting, share pages |
| ccba596d | docs(i18n/nl): use consistent terms for self-hosting, instance, expiry |
| 453e3bc0 | docs(i18n/nl): link to Dutch pages that exist |
| 8b9ee8d1 | docs(i18n/nl): fix fluency and typography |
| d1a3ba15 | docs(i18n/nl): align sidebar labels with page titles |
| de1050b0 | docs(i18n/nl): use gehost for a served domain in setup-guide |
| (this commit) | docs(planning): record Dutch fix-round resolution |

Some fixes use different wording from the suggestion. The reason is meaning or TextProv: the check rejected some rewordings because of how they aligned with legacy unmarked characters.

- share/why-secret-links:16: «zodra het beveiligde bericht niet meer beschikbaar is». This leaves «Een oud bericht» as is. «beveiligd bericht» is the glossary rendering of the secret, so the two senses are now distinct. The suggested «Een oude e-mail of een oud chatbericht» failed the TextProv check.
- security/best-practices:47: «## Geavanceerde beveiliging als je zelf host». This matches line 51 («als je Onetime Secret zelf host»). «bij zelf hosten» failed the TextProv check.
- security/index:22: «Altijd een beperkte levensduur.» «Standaard» would suggest a default that can be switched off, but every secret has an expiry.
- share/use-cases:17: «Stuur een set inloggegevens naar». «Stuur inloggegevens naar» failed the TextProv check.
- share/index:49: «na het herladen» instead of «na het opnieuw laden». This avoids saying «opnieuw» twice in the same clause.
- custom-domains/setup-guide:101–102: «Het domein wordt dan gehost» (de1050b0) instead of «aangeboden». This matches the new custom-domains/index heading «Waar je domein wordt gehost», and the cumulative check against b2883096 then passes. That commit comes after the sidebar commit, out of the protocol order.
- Sidebar: `setupGuide` «Domein instellen» (EN label "Setup guide"; page title «Een aangepast domein instellen»). `brandGuide` «Branding». `createSecrets`/`retrieveSecrets` «Berichten aanmaken»/«Berichten ophalen» (unused legacy keys, values changed, keys kept).
- The anchors `#een-aangepast-domein-verhuizen`, `#wat-elk-plan-bevat` and `#waar-je-domein-wordt-gehost` were checked with github-slugger 2.0.0. No other nl page links to the headings that changed (Dedicated instanties, gegevensresidentie, als je zelf host, meldingen).

### Skipped findings

| Page:line | Finding | Reason |
|---|---|---|
| custom-domains/setup-guide.md:107 | «## Controleer het resultaat» vs branding «## Het resultaat controleren» (heading mood) | Every heading in setup-guide is imperative (Voeg het domein toe, Maak de DNS-records aan, Verifieer het domein, Gebruik het domein), and so are the headings in share/index and change-your-region. Changing one heading would make the page inconsistent. Making all of them consistent means restyling headings and anchors across pages, which is a house-style decision (see below) and not a minimal fix. |

### Decisions needed

- Docs glossary (`src/content/docs/nl/translations/glossary.md`): "view/reveal → bekijken/weergeven" conflicts with the pages and the app, which use «onthullen» (web.STATUS.revealed «Onthuld», web.COMMON.click_to_continue). Proposed additions: secret link → «berichtlink»; self-hosting → «zelf hosten» (noun/verb), self-hosted → «zelfgehost(e)»; instance → «instantie»; data residency → «gegevensresidentie»; expiry/expiration → «verlooptijd»; served (domain) → «gehost»/«aangeboden»; disclosure (report) → «melding», never «onthulling»; open source → «opensource-» written closed.
- `src/content/docs/nl/translations/_language-notes.md:88`: the example «Geheime koppelingen» contradicts the «geheim» ban on lines 23, 150 and 151. Remove it or replace it with «Beveiligde links»/«Berichtlinks».
- App: «Berichtlink» (web.secrets.secret_link, email.common.secret_link_label) vs «Beveiligde link» (web.LABELS.secret_link). The docs use «berichtlink». The app should pick one.
- Heading mood house style for nl docs (infinitive vs imperative). branding, custom-domains/index and use-cases use infinitives; setup-guide, share/index and change-your-region use imperatives. A decision is needed before a cross-page pass, because changing headings changes anchors.
- `src/content/i18n/nl.json` keys this report did not flag, left unchanged: `nav.label.self-hosting` «Self-Hosting», which `src/components/starlight/nav-links.ts:44` renders in the top nav. Proposed: «Zelf hosten». Also `sidebar.secretLinks` «Geheime links», an unused legacy key that contains «geheim».
- "Dedicated instances": the nl docs keep the loanword «dedicated» («Dedicated instanties»). The app renders web.billing.features.dedicated_infrastructure as «Toegewijde infrastructuur». Decide whether docs should follow the app («toegewijde instanties»).
