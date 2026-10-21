# Danish (da) translation review

- Commit: c22761f4 — 18 pages
- English base: HEAD d30489ac
- Register expected: informal du/din/dit/dine (`_language-notes.md` §6 "uformel tiltale"; governance `rule.da-register-informal`); observed: du throughout, no formal De/Deres; three lapses into plural "I/jeres" addressing the reader (index.mdoc:10, custom-domains/index.md:8, security/data-protection.md:33)
- Findings: 0 critical, 1 major, 28 minor

## Verdict

The translation is faithful and fluent. Security claims (one-time view, deletion, passphrase role, burn, encryption, receipt lifetime) match the English. The adgangskode/adgangssætning distinction and the besked/ødelæg rules hold on every page, and every UI label the pages quote matches the shipped da_DK strings. The main pattern is word-sense collision. "besked" is the product noun but is also used for an ordinary chat message, which produces one misleading sentence (why-secret-links:15). "ødelægge" and "afsløring" are likewise used outside their product meanings. Reveal is split between afsløre and visning across pages, and "i hvile" appears against the glossary's "under lagring". The pages can ship after the major fix; the minor findings are polish.

## Findings

### share/why-secret-links.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| major | accuracy | 15–16 | «En gammel besked kan stadig indeholde linket, men når beskeden ikke længere er tilgængelig» | English: "An old message can still contain the link, but after the secret is unavailable". "besked" is this locale's word for *secret*, so the sentence reads as "an old secret can still contain the link". It also suggests the chat message becomes unavailable. | «En gammel meddelelse kan stadig indeholde linket, men når beskeden ikke længere er tilgængelig, kan linket ikke hente indholdet.» |
| minor | grammar | 9 | «Når indholdet er blevet vist, ødelagt eller udløbet» | "blevet" distributes over the intransitive "udløbet", which gives the ungrammatical "er blevet udløbet". | «Når indholdet er afsløret, ødelagt eller udløbet» |
| minor | terminology | 28, 30, 46, 47, 60 | «Først når visningen bekræftes», «modtagerens visning», «kan få det vist», «Efter visningen», «notifikationer ved visning» | Reveal is rendered as visning here. The sibling pages share/index.md and share/use-cases.md use afsløre, and so does the app ("Klik for at afsløre", status "Afsløret"). share/index.md:71 calls the same notifications «e-mails om afsløring». | «afsløringen bekræftes», «modtagerens afsløring», «kan afsløre det», «Efter afsløringen», «valgfrie e-mails om afsløring» |

### share/use-cases.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | terminology | 9 | «reducerer antallet af kopier i beskedhistorikken» | English: "copies in message history" (chat history). With besked = secret, the compound can be read as "the secret's history". | «i samtalehistorikken» |
| minor | terminology | 35, 39 | «## Følsomme afsløringer og anonymitet», «Ved en afsløring, der kan bringe nogen i fare» | English: "Sensitive disclosures" (whistleblowing). In this locale afsløring is the reveal term, so the heading can be read as "sensitive reveals". | «## Følsomme indberetninger og anonymitet», «Ved en indberetning, der kan bringe nogen i fare» |
| minor | fluency | 19 | «hvem der kan forbinde» | Calque of "who can connect"; "forbinde" needs an object in Danish. | «hvem der kan oprette forbindelse» |

### security/data-protection.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | terminology | 11 | «Når en besked er blevet vist — eller er udløbet — ødelægges den permanent.» | English: "permanently destroyed". ødelægge is reserved for burn (`rule.da-burn-oedelaeg`; app status "Ødelagt" = burned), so a viewed secret is described with the burn state. security/index.md:15 uses «tilintetgjort» for the same sentence. | «… tilintetgøres den permanent.» |
| minor | terminology | 17 | «krypteret under overførsel og i hvile» | The docs glossary has "encrypted at rest → Krypteret under lagring", and security/index.md:16, best-practices.md:61 and pricing/index.md:69 use «under lagring». | «krypteret under overførsel og under lagring» |
| minor | fluency | 30 | «Kombinér den med et dedikeret, compliant system» | The English adjective "compliant" is left untranslated in prose. | «… med et dedikeret system, der opfylder kravene, til …» |
| minor | register | 33 | «holder [selvhosting] alt inden for jeres egen infrastruktur» | Switches to plural "jeres"; the locale register is du. | «… inden for din egen infrastruktur» |

### pricing/compare-plans.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | terminology / UI | 12 | «Forsidebeskeder» | The shipped app names this entitlement «Hjemmesidebeskeder» (`web.billing.features.homepage_secrets`). Other pages use «Hjemmeside og indgående beskeder». | «Hjemmesidebeskeder» |
| minor | terminology | 26 | «Krypteret under overførsel og i hvile» | Same glossary conflict as data-protection:17. | «Krypteret under overførsel og under lagring» |

### custom-domains/index.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | register | 8 | «fra en adresse, I selv ejer» | Plural "I"; the description on line 4 says «du selv ejer». | «fra en adresse, du selv ejer» |
| minor | terminology | 15, 18 | «én visning», «kan få det vist én gang» | English: "one reveal", "can reveal it once". Reveal is afsløre on share/index.md. | «én afsløring», «kan afsløre det én gang» |
| minor | link | 52 | `/en/account/change-your-region#moving-a-custom-domain` | The Danish page exists. The built anchor is `flytning-af-et-brugerdefineret-domæne` (dist/da). | `/da/account/change-your-region#flytning-af-et-brugerdefineret-domæne` |
| minor | terminology | 53 | «[Hvor dine data opbevares]» | Label for the same page is «Hvor dine data ligger» in change-your-region:7, api/index:27,92 and data-protection:23. | «Hvor dine data ligger» |

### custom-domains/setup-guide.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | link | 9 | `/en/custom-domains#what-each-plan-includes` | The Danish page exists. The built anchor is `hvad-hver-plan-omfatter`. | `/da/custom-domains#hvad-hver-plan-omfatter` |
| minor | link | 21 | `/en/custom-domains#where-your-domain-is-served` (label «Hvor dit domæne betjenes fra») | The Danish label points to the English page. The built anchor is `hvor-dit-domæne-betjenes-fra`. | `/da/custom-domains#hvor-dit-domæne-betjenes-fra` |

### custom-domains/branding.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | terminology | 29, 34, 60, 73 | «to faneblade», «På fanebladet **Brand**» | setup-guide.md:16,61,68 says «fanen», and the shipped app uses «fane» (four strings, no «faneblad»). | «to faner», «På fanen **Brand**» |

### security/best-practices.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | fluency | 27 | «phishingforsøg, der bruger domæner, som ligner» | "ligner" has no object; English: "similar-looking domains". | «… der bruger domæner, som ligner dit» |
| minor | terminology | 37, 39 | «Sikkerhed ved brug af API'en», «Onetime Secret-API'en» | The other six pages use the neuter «API'et». | «API'et», «Onetime Secret-API'et» |

### self-hosting/index.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | fluency | 13 | «Tilstanden afgør, hvad der ellers skal køre, så afgør den, før du installerer.» | The repeated "afgør" reads awkwardly. | «…, så beslut dig, før du installerer.» |
| minor | fluency | 44, 46 | «har ingen skærm i applikationen», «ingen skærm eller noget endepunkt» | Calque of "screen"; "skærm" means monitor. setup-guide.md:21 uses «skærmbillede». | «har intet skærmbillede i applikationen», «intet skærmbillede eller endepunkt» |

### index.mdoc

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | register / fluency | 10 | «Giv dit team et branded workspace på jeres eget domæne, integrér engangsbeskedlinks i jeres egne værktøjer» | The hero tagline mixes du ("dit team") with plural "jeres". "branded" is left in English. | «Giv dit team et workspace med dit eget brand på dit eget domæne, integrér engangsbeskedlinks i dine egne værktøjer, eller host det hele selv.» |

### pricing/index.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | terminology | 19 | «Beskedlinks, der kan vises én gang» | English: "can be revealed once"; see the reveal row in Terminology consistency. | «Beskedlinks, der kan afsløres én gang» |

### account/change-your-region.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | terminology | 4 | «uden at ødelægge udestående links» | English: "without breaking outstanding links". ødelægge is the burn verb, so this reads as burning the links. | «uden at udestående links holder op med at virke» |

### security/index.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | terminology | 36 | «[Hvor dine data opbevares]» | Inconsistent with «Hvor dine data ligger» used on four other pages. | «Hvor dine data ligger» |

### security/vulnerability-disclosure.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | fluency | 39 | «Vi tager ikke skridt mod sikkerhedsforskere» | English: "We will not pursue action against researchers" (safe harbour). "tage skridt mod" is unidiomatic and vague. | «Vi indleder ikke sager mod sikkerhedsforskere, der følger disse retningslinjer.» |

### self-hosting/configuration.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | fluency | 12 | «vælger du nogle få forudindstillede valg» | Repeats "vælge … valg". | «vælger du blandt nogle få forudindstillinger» |

## Clean pages

- api/client-libraries.md, api/index.mdoc, share/index.md

## Terminology consistency

| English term | Renderings found (pages) | Expected (source) | Action |
|---|---|---|---|
| reveal | afsløre / afsløring (account/change-your-region, api/index, pricing/compare-plans, share/index, share/use-cases); vise / visning / få vist (share/why-secret-links, custom-domains/index, pricing/index) | Docs glossary "view/reveal → vis/åben". Shipped app uses afsløre for the action and status ("Klik for at afsløre" `web.COMMON.click_to_continue`, "Afsløret" `web.STATUS.revealed`) and visning only in branding labels ("Visningsinstruktioner", "Før visning") | Use afsløre in prose. Keep visning only inside quoted branding labels (branding.md is correct). Split the glossary row into view → vis, reveal → afslør. |
| encrypted at rest | under lagring (security/index, security/best-practices, pricing/index); i hvile (pricing/compare-plans:26, security/data-protection:17) | Docs glossary «Krypteret under lagring» | Change «i hvile» → «under lagring». |
| destroyed (after view, not burn) | tilintetgjort (security/index:15); ødelægges (security/data-protection:11); ødelægge for "breaking" (account/change-your-region:4) | ødelæg is reserved for burn (`rule.da-burn-oedelaeg`) | Use tilintetgøre/slette for non-burn senses. |
| message (generic) | besked (share/why-secret-links:15, share/use-cases:9 «beskedhistorikken»); mail / henvendelse elsewhere | besked = product secret (`rule.da-secret-besked`) | Use meddelelse / samtale for generic messages. |
| Homepage secrets | Forsidebeskeder (pricing/compare-plans:12); Hjemmeside og indgående beskeder (custom-domains/index:26,62, pricing/index:21,63) | App: Hjemmesidebeskeder (`web.billing.features.homepage_secrets`); Hjemmeside (`web.admin.domains.configs.kinds.homepage`) | Use Hjemmesidebeskeder / Hjemmeside. |
| API (gender) | API'et (client-libraries, api/index, index.mdoc, compare-plans, self-hosting/index); API'en (security/best-practices:37,39) | Majority neuter | Use API'et. |
| tab | fane (custom-domains/setup-guide); faneblad (custom-domains/branding) | App: fane | Use fane. |
| "Where your data lives" (link label) | Hvor dine data ligger (change-your-region, api/index, data-protection); Hvor dine data opbevares (custom-domains/index:53, security/index:36) | No Danish page yet; pick one | Use «Hvor dine data ligger». |

## App UI label mismatches

| Page:line | Docs text | Shipped app string (key) | Note |
|---|---|---|---|
| pricing/compare-plans.md:12 | Forsidebeskeder | Hjemmesidebeskeder (`web.billing.features.homepage_secrets`, `web.billing.overview.entitlements.homepage_secrets`) | Plan feature name differs from the billing UI. |
| custom-domains/index.md:30, pricing/index.md:33 | Loginindstillinger | `web.domains.sso.back_to_signin` "Sign-in settings" has no da_DK string, so the app shows English | Docs wording matches other da_DK strings ("dette domænes loginindstillinger"). This is an app translation gap, not a docs error. |

All other quoted labels match shipped da_DK. This covers the branding labels (Domæner, Administrer, Funktioner, Administrer brand, Brand, Levering, Upload logo, Erstat, Domænelogo, Gem logo, Fjern logo, Upload favicon, Gem favicon, Opdater favicon fra domæne, Fjern favicon, Brandfarve, Hjørner, Skrifttype, Opdater, Sprog, Visningsinstruktioner, Før/Efter visning). It also covers the domain setup labels (Tilføj domæne, Brugerdefineret domæne, Populære underdomæner, Brug mit roddomæne, Fortsæt med, Bekræft domæne, Domæne bekræftet og aktivt, Aktiv, Domænestatus, Måladresse, DNS-post, SSL-status, SSL fornyes, Sidst overvåget, Sidste bekræftelseskontrol mislykkedes). The share labels match too: Bliv på siden, Udløber om, Klik for at afsløre, Ny/Forhåndsvist/Afsløret, Præferencer, and the error «Du har ikke angivet noget at dele».

## English source and general issues

- [new] security/best-practices.md:16 — "if one secret is compromised, the entire set of information remains protected" overstates the protection, because the compromised part is exposed. The da translation says "the rest of the information" («resten af oplysningerne»), which is the accurate sense.
- [new] Build, all locales including en: heading `id`s keep U+E0101 provenance marks wherever the slugger drops punctuation. Examples from dist built 2026-10-21 06:34: en `set-color<U+E0101>-corners-and-font`, `questions-or-need-support<U+E0101>`; da `angiv-farve<U+E0101>-hjørner-og-skrifttype`, `routingpost-cname-eller-a<U+E0101>`, `tjek<U+E0101>-at-det-virkede`, `sikkerhed-ved-brug-af-api<U+E0101>en` (16 da ids; 10–18 per locale). A hand-written `#fragment` link to such a heading cannot match. No link in the reviewed da pages currently targets an affected heading.
- [new] Sidebar bundle `src/content/i18n/da.json` diverges from the re-synced page titles and uses English title case. `sidebar.whyUseSecretLinks` is "Hvorfor Bruge Sikre Links" (page: "Hvorfor bruge beskedlinks?"). `sidebar.brandGuide` is "Brandvejledning" (page: "Branding af dit domæne"). Also affected: "Brugerdefinerede Domæner", "Sammenlign Planer", "Vores Principper", "Universelle Retningslinjer", and "Installation og Implementering" (pages now use udrulning). This is the same class as the known mi/ja/zh-cn sidebar item.
- [new] The da docs glossary (`src/content/docs/da/translations/glossary.md`) row "view/reveal → vis/åben" conflicts with the shipped app (afsløre for the action and status) and with most re-synced pages. This conflict caused the reveal split above.
- [new] da self-hosting/configuration.md and self-hosting/index.md keep the legacy frontmatter `sidebar: order:`. The English pages have no such key and the sidebar is manual, so the key is inert. This is cleanup only.
- [known] Passphrase contradiction: api/index.mdoc:61 ("used to encrypt the value") vs share/index.md:75 ("an access check, not the encryption key"). da reproduces both (api/index.mdoc:60, share/index.md:43).
- [known] Free/Basic naming. da follows the English ("Free-planen", pricing page shows "Basic").
- [known] index.mdoc hero "Setup your custom domain". da uses the correct verb «Opsæt».
- [known] self-hosting/index.md "one generated secret". da resolves it as «én genereret hemmelig nøgle» (the SECRET key).
- [known] index.mdoc links self-hosting as "Configuration and upgrades". da mirrors it («Konfiguration og opgraderinger»).
- [known] best-practices "container images" vs "Docker image". da mirrors it (container-images / Docker-image).
- [known] (sv-1) Branding labels said to lack app keys: in `$APP/locales/content/{en,da_DK}/workspace-branding.json` all of them exist (`web.branding.corners`, `tab_brand`, `tab_delivery`, `replace_logo`, `logo_modal_title`, `logo_modal_save`, `remove_logo`, `refresh_favicon`, `delivery_reveal_instructions`, `delivery_before_reveal`, `delivery_after_reveal`; Update = `web.LABELS.update`). The gap applies only to the older docker-shipped bundle.
- [known] share/index.md empty-submission error trailing period. da quotes the app string without the period.
- [known] custom-domains/index.md "Keep both DNS records" and setup-guide "no fixed limit" vs compare-plans "Unlimited". da reproduces both as written (Ingen fast grænse / Ubegrænset).
- [known] /en/ links to pages missing from locale trees. da has the same gaps (where-your-data-lives, our-principles, your-receipt, organizations/*, install/*, etc.).

## Not checked

- No build, test or dogfood run, because this is a read-only review. The heading-anchor observations come from the existing `dist/`, built at 06:34, before the 08:39 commit time. Its da headings match the reviewed text.
- The self-hosting/configuration.md YAML block (lines 40–636) was checked only for byte identity with the English (identical), not for content.
- Application `sourceOfTruth` claims were not re-verified. The English is unchanged, and the translation was checked against the English for numbers, limits, hostnames, flags and paths (all preserved).

## Resolution (fix round, 2026-10-21)

Fixed 26 of 29 findings (1 major, 25 minor) and the six flagged sidebar keys; skipped 3 (all reveal terminology). Validation: `python3 tools/dogfood.py check --base b2883096` (14 files, 0 failed), `pnpm run check:frontmatter`, `pnpm run check:nav`. No build or `pnpm test` run.

| Commit | Subject |
|---|---|
| 5a463506 | docs(i18n/da): match compare-plans labels to the shipped app |
| c683480c | docs(i18n/da): correct mistranslation in why-secret-links |
| 36b2ee6a | docs(i18n/da): use consistent terms for destroy, disclosure, message |
| 3f3b24d9 | docs(i18n/da): use consistent terms for at rest, API, tab, data page |
| a6c2ee4c | docs(i18n/da): fix register breaks |
| e4104716 | docs(i18n/da): link to Danish pages that exist |
| 0973712c | docs(i18n/da): fix fluency and typography |
| b6489f4c | docs(i18n/da): align sidebar labels with page titles |
| (this commit) | docs(planning): record Danish fix-round resolution |

Fixes that differ from the suggested wording:

- share/why-secret-links.md:9: «Når indholdet er vist, ødelagt eller udløbet». This fixes the grammar but keeps vis, because the glossary row has not changed (see the reveal row below).
- security/vulnerability-disclosure.md:39: «Vi tager ikke retslige skridt mod sikkerhedsforskere». Adding the one word gives the usual Danish safe-harbour wording.
- self-hosting/index.md:13: «så beslut dig for den, før du installerer».
- index.mdoc:10: «et workspace med dit brand på dit eget domæne» (avoids a third «dit eget»).
- security/best-practices.md:27: «som ligner dit», as suggested.

### Skipped findings

| Page:line | Finding | Reason |
|---|---|---|
| share/why-secret-links.md:28, 30, 46, 47, 60 | reveal rendered as visning / få vist; suggested afsløre | Fix protocol rule 3: the docs glossary wins for prose terms, and `da/translations/glossary.md:18` binds "view/reveal → vis/åben". The current text follows it. In line 60, «notifikationer ved visning» matches the app setting name «Notifikationer ved visning af besked» (`web.settings.notifications.reveal_notifications.title`), so the app does not use afsløre everywhere either. |
| custom-domains/index.md:15, 18 | «én visning», «kan få det vist én gang»; suggested afsløring | Same glossary binding (vis). |
| pricing/index.md:19 | «Beskedlinks, der kan vises én gang»; suggested afsløres | Same glossary binding (vis). |
| src/content/i18n/da.json `sidebar.installationDeployment` | "Installation og Implementering" (general issue) | `config/sidebar.mjs` does not reference this key, and AGENTS.md says to keep it. Editing it would have no visible effect. |
| self-hosting/configuration.md, self-hosting/index.md frontmatter `sidebar: order:` | legacy key (general issue, cleanup only) | The key has no effect and there was no finding against it. Left alone under the minimal-edits rule. |

### Decisions needed

- **Glossary: split reveal from view.** `src/content/docs/da/translations/glossary.md:18` has "view/reveal → vis/åben". The app uses afsløre for the action and the status ("Klik for at afsløre" `web.COMMON.click_to_continue`; "Afsløret" `web.STATUS.revealed`). It uses visning in the reveal-notification setting (`web.settings.notifications.reveal_notifications.title`) and in the branding labels ("Visningsinstruktioner", "Før/Efter visning"). share/index, share/use-cases, api/index, compare-plans and change-your-region use afsløre; why-secret-links, custom-domains/index, pricing/index and security/index use vis. If the row is split into view → vis and reveal → afslør, a follow-up should change why-secret-links:9, 28, 30, 46, 47, custom-domains/index:15, 18 and pricing/index:19. Keep «notifikationer ved visning» (why-secret-links:60) because it is the app's setting name.
- **Glossary candidates.** The glossary does not cover these terms, which this round unified: tab → fane; API → neuter «API'et»; whistleblowing disclosure → indberetning; generic (chat/email) message → meddelelse, and message history → samtalehistorik, since besked is reserved for the product secret; destroyed (not burned) → tilintetgøre, with ødelægge for burn only; "Where your data lives" link label → «Hvor dine data ligger».
- **App translation gap.** `web.domains.sso.back_to_signin` ("Sign-in settings", `locales/content/en/workspace-domains.json:562`) has no da_DK string, so the app shows English. The docs say «Loginindstillinger» (custom-domains/index.md:30, pricing/index.md:33), which matches the other da_DK wording ("dette domænes loginindstillinger").
- **Tooling: `tools/dogfood.py edit` can move legacy marks.** When the old span contains unmarked (legacy) clusters, `correspondence()` matches them first by raw encoding. That can tie them to an unrelated new character with the same letter in the replacement, which drops existing AI marks. It happened three times in this round: branding.md:29 «Siden» took the unmarked d/e from «faneblade»; best-practices.md:27 «domæner» took the unmarked «ner»; self-hosting/index.md:44 «skærmbillede» took the unmarked l from «applikationen». In each case `dogfood.py check` failed ("changed or lost an existing mark" / "marked unchanged legacy text"). I repaired each one with two narrower edits that put the unmarked clusters back in their original positions. Fixers working in other locales should keep spans tight, run `check --base HEAD` after every edit, and avoid including legacy unmarked text in a span.
