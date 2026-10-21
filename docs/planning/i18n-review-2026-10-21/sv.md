# Swedish (sv) translation review

- Commit: 09f59016 — 18 pages
- English base: HEAD d30489ac
- Register expected: informal du (`_language-notes.md`; app governance `rule.sv-register-informal`, standalone `ni`/`Ni` forbidden); observed: du throughout, with 3 `ni` slips (custom-domains/index.md:8, security/best-practices.md:72, pricing/index.md:73)
- Findings: 0 critical, 12 major, 32 minor

## Verdict

The meaning is accurate. Security claims (encryption, one-time reveal, passphrase as an access check, burn, receipt lifetime) match the English, and nothing was omitted or added. Most major findings are UI labels. On custom-domains/branding.md the translator kept English labels or used the wrong key, reasoning that an older Docker bundle had no Swedish strings for them. The app repo's sv_SE bundle has had these strings since 2026-07-13, so a Swedish reader cannot find "Brand", "Delivery", "Replace", "Update" and the others. Setup-guide quotes two field labels wrong, and share/index.md tells the reader to "bränna" when the button says "Radera denna hemlighet permanent". The rest is two `ni` register breaks and term drift between the two shards (SSO, din/dina data, use cases, hosted service). The pages can ship once the 12 major findings are fixed.

## Findings

### custom-domains/branding.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| major | ui-label | 29, 34, 60, 74 | «två flikar, **Brand** och **Delivery**», «På fliken **Brand**», «På fliken **Delivery**» | The shipped sv_SE tab labels are "Varumärke" (`web.branding.tab_brand`) and "Leverans" (`web.branding.tab_delivery`), so the English labels do not appear in the Swedish UI | «**Varumärke** och **Leverans**», «På fliken **Varumärke**», «På fliken **Leverans**» |
| major | ui-label | 35, 41, 50, 54 | «**Replace**» | The shipped label is "Ersätt" (`web.branding.replace_logo`, `web.branding.replace_favicon`) | «**Ersätt**» |
| major | ui-label | 36, 37, 41–42 | «fönstret **Domain logo**», «**Save logo**», «**Remove logo**» (x2) | The shipped labels are "Domänens logotyp" (`logo_modal_title`), "Spara logotyp" (`logo_modal_save`) and "Ta bort logotyp" (`remove_logo`) | «fönstret **Domänens logotyp**», «**Spara logotyp**», «**Ta bort logotyp**» |
| major | ui-label | 49–55 | «**Upload favicon**», «**Save favicon**», «**Refresh favicon from domain**», «**Remove favicon**» (x2) | The shipped labels are "Ladda upp favicon", "Spara favicon", "Uppdatera favicon från domän" and "Ta bort favicon" (`web.branding.upload_favicon`, `favicon_modal_save`, `refresh_favicon`, `remove_favicon`) | Use the four shipped labels |
| major | ui-label | 39, 68, 84 | «**Update**» | The header save button uses `web.LABELS.update` (DomainHeader.vue:47), which is "Uppdatera" in sv | «**Uppdatera**» |
| major | ui-label | 64 | «**Hörnstyling**:» | The English page says "Corners". SimpleBrandPanel renders `web.branding.corners`, which is "Hörn"; "Hörnstyling" is the unused `corner_style` key | «**Hörn**:» |
| major | ui-label | 79–80 | «**Instruktioner**: … under **Instruktioner före visning** och **Instruktioner efter visning**» | DeliveryPanel.vue renders `delivery_reveal_instructions` = "Visningsinstruktioner", `delivery_before_reveal` = "Före visning" and `delivery_after_reveal` = "Efter visning". The quoted labels come from the unused `instructions`/`pre_reveal_instructions` keys | «**Visningsinstruktioner**: … under **Före visning** och **Efter visning**» |

### custom-domains/setup-guide.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| major | ui-label | 25 | «I **Egen domän** anger du adressen» | DomainForm.vue:159 renders `web.domains.add.field_label`, which is "Anpassad domän". "Egen domän" is a different key (`web.domains.custom_domain`) | «I **Anpassad domän** anger du adressen» |
| major | ui-label | 27 | «välj en av de **Populära subdomänerna**» | The shipped label is "Populära underdomäner" (`web.domains.add.subdomains_label`). The inflected form with "sub-" cannot be found in the UI | «välj ett alternativ under **Populära underdomäner**» |
| minor | ui-label | 105 | «**Domänen är verifierad och aktiv**» | The shipped tooltip is "Domänen verifierad och aktiv" (`web.domains.status_tooltip_active`) | «**Domänen verifierad och aktiv**» |
| minor | links | 11, 34 | «(/en/custom-domains#what-each-plan-includes)», «(/en/custom-domains#where-your-domain-is-served)» | The target page exists in sv | `/sv/custom-domains#vad-varje-plan-omfattar`, `/sv/custom-domains#var-din-domän-betjänas` (update the second if the heading changes; see custom-domains/index.md) |
| minor | fluency | 52 | «bara värdetiketten» | Ambiguous next to the "**Värde:**" bullet: it reads as "värde-etikett" (value label), but the English means the host label | «bara värdnamnet (etiketten)» |
| minor | fluency | 90 | «eller markerar domänens status» | "markera" means highlight; the English means click the status text | «eller klickar på domänens status» |
| minor | fluency | 126 | «väljer du den domän du skapar under» | Calque of "the domain you are creating under" | «väljer du vilken domän hemligheten ska skapas på» |

### custom-domains/index.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| major | register | 8 | «från en adress som ni äger» | Uses the forbidden `ni` and switches from du to ni in the middle of the sentence ("din organisation … som ni äger") | «från en adress som du äger» |
| minor | terminology | 31 | «[Single sign-on (SSO)]» | The app uses "Enkel inloggning (SSO)" (`web.organizations.sso.title`), and so do compare-plans.md:21 and index.mdoc:30 | «[Enkel inloggning (SSO)]» |
| minor | fluency | 47, 49, 56, 73 | «Var din domän betjänas», «Den betjänas av», «betjäna en domän», «slutar domänen att betjänas» | "betjäna" means serving customers, not serving a website | «Var din domän levereras», «Den levereras av», «leverera en domän», «slutar domänen att fungera» |
| minor | links | 54 | «(/en/account/change-your-region#moving-a-custom-domain)» | The target page exists in sv | `/sv/account/change-your-region#flytta-en-anpassad-domän` |
| minor | terminology | 55 | «[Var dina data lagras]» | The same target is called «Var din data finns» on 4 other links (change-your-region.md:9, api/index.mdoc:27, :92, data-protection.md:35) | «[Var din data finns]» |
| minor | terminology | 78 | «[Användningsområden](/sv/share/use-cases)» | The page title and sidebar label `sidebar.useCases` are "Användningsfall" | «[Användningsfall]» |

### security/best-practices.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| major | register | 72 | «Gå regelbundet igenom hur ni delar hemligheter» | Forbidden `ni`; the rest of the page uses du. English: "review your secret sharing practices" | «Gå regelbundet igenom hur du delar hemligheter» |
| minor | fluency | 4, 7, 76 | «dessa bästa praxis» | "praxis" is uncountable in Swedish, so "dessa bästa praxis" is a calque | «dessa rekommendationer» / «denna beprövade praxis» |
| minor | grammar | 55 | «**Införa tidsbaserade begränsningar**» | Infinitive among imperative list headings ("Använd", "Ställ in") | «**Inför tidsbaserade begränsningar**» |
| minor | fluency | 59 | «För detaljerade granskningsloggar över…» | The imperative "För" reads as the preposition "för" | «Spara detaljerade granskningsloggar över…» |
| minor | orthography | 70 | «bränn-funktion» | Breaks the compound rule (`rule.sv-compound-words`) | «funktionen för att bränna» (the app button is "Radera denna hemlighet permanent") |

### share/index.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| major | ui-label | 129 | «välj att **bränna** den olästa hemligheten» | The receipt button (BurnButtonForm.vue:75, `web.COMMON.burn_this_secret`) says "Radera denna hemlighet permanent". The sv app never uses "bränn", so the bolded action cannot be found | «välj **Radera denna hemlighet permanent** för att bränna den olästa hemligheten» |
| minor | fluency | 19, 108 | «Hemligheter som skapas utloggad», «som gjordes utloggad» | The participle needs a subject | «Hemligheter som skapas när du är utloggad», «som skapades av någon som var utloggad» |

### api/index.mdoc

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | ui-label | 39 | «lösenordet är API-token från dina kontoinställningar» | The account settings label is "API-nyckel" (`web.account.api_key`), and the noun needs the definite form | «lösenordet är API-nyckeln från dina kontoinställningar» |
| minor | fluency | 27 | «Den rena värden `onetimesecret.com`» | "ren värd" is not idiomatic for "bare host" | «Värden `onetimesecret.com` utan regionprefix» |
| minor | fluency | 49 | «Skapa en hemlighet som finns i en timme:» | Unnatural rendering of "lives for one hour" | «Skapa en hemlighet som gäller i en timme:» |
| minor | fluency | 69 | «innan någon visar den» | With a person as subject, "visa" means "show", not "view" | «innan någon har öppnat den» |

### pricing/index.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | register | 73 | «### Erbjuder ni kundsupport?» | Grammatically correct plural address of the company, but standalone `ni` is a forbidden token in sv governance and will trip the lint | «### Finns det kundsupport?» |
| minor | terminology | 49 | «Flexibel Från-domän för e-post» | The app and compare-plans.md:33 use "Flexibel avsändardomän för e-post" (`web.billing.features.flexible_from_domain`) | «Flexibel avsändardomän för e-post» |
| minor | terminology | 42, 46 | «med single sign-on», «Single sign-on (SSO)» | compare-plans.md:21 and the app use "Enkel inloggning (SSO)" | «med enkel inloggning», «Enkel inloggning (SSO)» |

### self-hosting/index.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | fluency | 32 | «med en genererad secret» | English word left in the prose. It means the app `SECRET` key (see the known English ambiguity) | «med en genererad `SECRET`-nyckel» |
| minor | terminology | 35–36 | «[Avbilder och varianter]», «avbilderna» | best-practices.md:49,53 uses "containeravbildningarna"/"Docker-avbildning"; "avbildning" is the established term | «[Avbildningar och varianter]», «avbildningarna» |
| minor | fluency | 74 | «så överföringen är din att utföra» | Calque of "is yours to perform" | «så det är du som måste utföra överföringen» |

### share/use-cases.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | orthography | 73 | «förtida förstöring» | "förstöring" is not standard Swedish | «radering i förtid» |
| minor | fluency | 30 | «Efter visning eller utgång» | "utgång" means exit, not expiry | «När den har visats eller gått ut» |

### share/why-secret-links.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | terminology | 61 | «[Användningsområden](/sv/share/use-cases)» | The page title and sidebar label are "Användningsfall" | «[Användningsfall]» |
| minor | ui-label | 62 | «[Preferenser](/en/account/preferences)» | The app tab is "Inställningar" (`web.settings.preferences`), and share/index.md:125 already uses it | «[Inställningar]» |

### account/change-your-region.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | fluency | 4, 61 | «utan att bryta utestående länkar», «medan de länkarna fortfarande är utestående» | Calques ("utestående" is used for debts; "bryta länkar") | «utan att befintliga länkar slutar fungera», «medan de länkarna fortfarande används» |

### security/data-protection.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | fluency | 44 | «agerar du personuppgiftsansvarig» | Missing "som"; the idiomatic form is "är du" | «är du personuppgiftsansvarig» |

### security/index.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | terminology | 36 | «[Var dina data lagras]» | Same link target as «Var din data finns» on 4 other pages | «[Var din data finns]» |

## Clean pages

- api/client-libraries.md, index.mdoc, pricing/compare-plans.md, security/vulnerability-disclosure.md, self-hosting/configuration.md

## Terminology consistency

| English term | Renderings found (pages) | Expected (source) | Action |
|---|---|---|---|
| burn | bränn/bränna/bränning (all pages) | Docs glossary: "bränn". App governance: "radera permanent" (`rule.sv-burn-radera-permanent`), and the shipped buttons say "Radera (denna hemlighet) permanent" | Known glossary conflict (flagged by the translators). Decide upstream. Until then, quote the app label wherever the reader must click (share/index.md:129) |
| single sign-on (SSO) | Enkel inloggning (SSO) (compare-plans, index.mdoc); Single sign-on (SSO) / single sign-on (custom-domains/index, pricing/index) | App: "Enkel inloggning (SSO)" | Align to the app |
| your data (link text for where-your-data-lives) | Var din data finns (change-your-region, api/index x2, data-protection); Var dina data lagras (custom-domains/index, security/index) | One rendering per target | Use «Var din data finns»; din/dina data also mixes within data-protection.md (7 vs 42) |
| use cases | Användningsfall (title, sidebar, share/index); Användningsområden (custom-domains/index, why-secret-links) | The page title | Use «Användningsfall» |
| hosted service | värdtjänsten / Värdtjänst (index.mdoc:26,43); den hostade tjänsten / Hostad tjänst (vulnerability-disclosure:23,43, why-secret-links:35) | One term | Pick one; «värdtjänsten» reads better |
| Preferences | Inställningar (share/index); Preferenser (why-secret-links) | App: "Inställningar" | Use «Inställningar» |
| subdomain | subdomän (setup-guide, change-your-region) | The app uses only "underdomän" (6 strings, 0 "subdomän") | Use «underdomän»; the field-label row above is mandatory, the prose is optional |
| container image | containeravbildning / Docker-avbildning (best-practices); avbild (self-hosting/index) | avbildning | Align |
| branding | varumärkesprofil (all pages) | Docs glossary: "anpassad varumärkning"; app: varumärkesprofil(ering) | Known conflict; update the docs glossary row, the pages are fine |
| "Questions or need support?" heading | Frågor eller behov av support? (branding, custom-domains/index); Frågor eller behöver du support? (setup-guide, data-protection) | One heading | Use «Har du frågor eller behöver du support?» |
| secret / secret link / receipt / reveal / passphrase / custom domain / region / self-hosting / workspace | hemlighet / hemlig länk / kvitto / visa, visning (status label Avslöjad) / lösenfras / anpassad domän / region / självhosting / arbetsyta | Docs glossary + app | Consistent; no action |

## App UI label mismatches

| Page:line | Docs text | Shipped app string (key) | Note |
|---|---|---|---|
| custom-domains/branding.md:29,34,60 | Brand | Varumärke (`web.branding.tab_brand`) | Kept in English |
| custom-domains/branding.md:29,74 | Delivery | Leverans (`web.branding.tab_delivery`) | Kept in English |
| custom-domains/branding.md:35,41,50,54 | Replace | Ersätt (`web.branding.replace_logo` / `replace_favicon`) | Kept in English |
| custom-domains/branding.md:36 | Domain logo | Domänens logotyp (`web.branding.logo_modal_title`) | Kept in English |
| custom-domains/branding.md:37 | Save logo | Spara logotyp (`web.branding.logo_modal_save`) | Kept in English |
| custom-domains/branding.md:41–42 | Remove logo | Ta bort logotyp (`web.branding.remove_logo`) | Kept in English |
| custom-domains/branding.md:49 | Upload favicon | Ladda upp favicon (`web.branding.upload_favicon`) | Kept in English |
| custom-domains/branding.md:51 | Save favicon | Spara favicon (`web.branding.favicon_modal_save`) | Kept in English |
| custom-domains/branding.md:52 | Refresh favicon from domain | Uppdatera favicon från domän (`web.branding.refresh_favicon`) | Kept in English |
| custom-domains/branding.md:54–55 | Remove favicon | Ta bort favicon (`web.branding.remove_favicon`) | Kept in English |
| custom-domains/branding.md:39,68,84 | Update | Uppdatera (`web.LABELS.update`) | Kept in English |
| custom-domains/branding.md:64 | Hörnstyling | Hörn (`web.branding.corners`) | Wrong key (`corner_style`) |
| custom-domains/branding.md:79 | Instruktioner | Visningsinstruktioner (`web.branding.delivery_reveal_instructions`) | Wrong key (`instructions`) |
| custom-domains/branding.md:79–80 | Instruktioner före visning / Instruktioner efter visning | Före visning / Efter visning (`web.branding.delivery_before_reveal` / `delivery_after_reveal`) | Wrong keys (`pre_/post_reveal_instructions`) |
| custom-domains/setup-guide.md:25 | Egen domän | Anpassad domän (`web.domains.add.field_label`) | Wrong key (`web.domains.custom_domain`) |
| custom-domains/setup-guide.md:27 | Populära subdomänerna | Populära underdomäner (`web.domains.add.subdomains_label`) | Inflected and term changed |
| custom-domains/setup-guide.md:105 | Domänen är verifierad och aktiv | Domänen verifierad och aktiv (`web.domains.status_tooltip_active`) | Wording differs; still findable |
| share/index.md:129 | bränna | Radera denna hemlighet permanent (`web.COMMON.burn_this_secret`) | Docs glossary vs app conflict |
| share/why-secret-links.md:62 | Preferenser | Inställningar (`web.settings.preferences`) | Link label |
| api/index.mdoc:39 | API-token | API-nyckel (`web.account.api_key`) | Follows the English; see the English issue below |

## English source and general issues

- [known] The "(sv-1)" entry in known-english-issues.md says Brand/Delivery tabs, Replace, Save logo, Update, Remove logo, the favicon actions and Domain logo "have no entries in the docker-shipped sv_SE bundle". This is stale. All of them exist in `$APP/locales/content/sv_SE/workspace-branding.json` and `00-common.json`, added in app commit 20c3945dc4 (2026-07-13). The Docker bundle the translators used is older than the app repo. Other locales that kept these labels in English for the same reason probably have the same mismatches. Only the corner/font option names (brand-helpers.ts) are really hard-coded English.
- [new] App: sv_SE `web.branding.logo_modal_hint` says «PNG, JPG eller SVG», and `favicon_field_hint` / `favicon_modal_hint` also list SVG. The English source strings have dropped SVG ("PNG or JPG", "ICO or PNG"). Swedish users see SVG offered in the app while custom-domains/branding.md:22 says SVG is not accepted. The sv strings are stale. Related to the known (it-1) docs/app logo-format conflict.
- [new] api/index.mdoc:40 — "the password is the API token from your account settings". The account settings label is "API Key" (`web.account.api_key`), and security/best-practices.md:42–44 says "API Keys", so the English uses two names for the same credential.
- [new] Sidebar bundle `src/content/i18n/sv.json` does not match the re-synced sv page titles. `sidebar.setupGuide` = «Installationsguide» ("installation guide"; the page is «Konfigurera en anpassad domän»). `sidebar.brandGuide` = «Varumärkesguide» (pages use «varumärkesprofil»). `sidebar.switchingRegions` = «Byte av region» (page «Byta region»). `sidebar.selfHosting` = «Egen hosting» and `nav.ariaLabel.selfHosting` = «Egenhostingdokumentation» (pages use «självhosting»). This is the same pattern as the known mi/ja/zh-cn sidebar item.
- [new] sv self-hosting/configuration.md:5–6 and self-hosting/index.md:5–6 keep a legacy `sidebar: order:` frontmatter key that the English pages do not have. It does nothing (the sidebar is defined explicitly in config/sidebar.mjs) but can be removed.
- [known] api/index.mdoc:61 vs share/index.md:75 — the passphrase is described as an encryption input on one page and an access check on the other (fr-2). The sv text follows each page faithfully, so the contradiction carries over.
- [known] self-hosting/index.md "one generated secret" is ambiguous (de-1). sv left "secret" in English (self-hosting/index.md:32).
- [known] custom-domains/setup-guide.md "no fixed limit" vs compare-plans "Unlimited" (sv-2); sv mirrors both.
- [known] Free/Basic tier naming (fr-2); sv uses "Free" and quotes "Basic" as the English does.
- [known] share/index.md "Preferences" link text (sv-2); sv uses «Inställningar», which matches the app tab.
- [known] index.mdoc "Setup your custom domain" (de-2, fr-2); sv «Konfigurera din anpassade domän» is correct.
- [known] Many locale links still point to /en/ pages missing from the sv tree (fr-1).

## Not checked

- The plan numbers in compare-plans.md and pricing/index.md (lifetimes, domain counts) were compared with the English, not re-derived from billing.yaml.txt.
- The suggested anchors (`#flytta-en-anpassad-domän`, `#vad-varje-plan-omfattar`, `#var-din-domän-betjänas`) assume Starlight's github-slugger output. I did not confirm them with a build.
- No build, test or link check was run. This review was a source comparison only.
