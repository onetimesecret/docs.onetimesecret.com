# Italian (it) translation review

- Commit: ba198352 — 17 pages
- English base: HEAD d30489ac
- Register expected: informal tu (app governance `rule.it-register-informal`; `_language-notes.md` "avoid overly formal language"); observed: consistent (no voi or Lei forms; "Offrite assistenza ai clienti?" in pricing/index.md:73 addresses the company, not the reader)
- Findings: 0 critical, 1 major, 27 minor

## Verdict

The translation is accurate and complete. Security statements (one-time reveal, passphrase behaviour, burn, receipts, encryption, data retention) match the English on every page, and the core terms follow the docs glossary and app governance. All but one of the named UI labels match the shipped it_IT strings. The one major problem is on the branding page: the corner option labels are translated, but the app shows them only in English. The minor findings are recurring headings and link text worded differently on different pages, a few grammar slips, three `/en/` links that should point to the existing `/it/` pages, and a stale frontmatter key. The locale can ship once the corner labels are fixed.

## Findings

### api/client-libraries.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | fluency | 37 | «Supporta le API v1 (deprecata) e v2» | Agreement mismatch: plural «le API» with singular «deprecata». | «Supporta l'API v1 (deprecata) e l'API v2» |

### api/index.mdoc

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | fluency | 58 | «`record.receipt.identifier` è tua:» | English "is yours". The bare «è tua» has no noun to agree with and reads as broken. | «`record.receipt.identifier` è la tua chiave:» |
| minor | fluency | 78 | «Costruisci su questa.» | Word-for-word calque of "Build on this one". | «Usa questa per le nuove integrazioni.» |
| minor | terminology | 90 | «## Argomenti correlati» | The same "Related" heading is «Pagine correlate» on branding.md:95 and security/index.md:35. | «## Pagine correlate» |

### custom-domains/branding.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| major | UI label | 65 | «**Quadrati**, **Arrotondati** o **Molto arrotondati**» | The app renders these options in English only: `borderRadiusDisplayMap` in src/shared/utils/brand-helpers.ts:217-223, used in SimpleBrandPanel.vue:83-87, with no locale key. An Italian reader sees "Square", "Rounded" and "Extra Rounded" and cannot find the translated names. The font options on line 66 are correctly kept in English. | «**Square**, **Rounded** o **Extra Rounded**» (an Italian gloss in parentheses is optional) |
| minor | accuracy | 76 | «Questa scheda compare solo dove il servizio offre più di una lingua.» | English "This card appears". On this page «scheda» means a tab (lines 29, 61, 73), so the sentence reads as if the whole **Consegna** tab appears only on multi-language services. | «Questo riquadro compare solo dove…» |

### custom-domains/index.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | markup | 53 | «(/en/account/change-your-region#moving-a-custom-domain)» | The target page exists in the it tree, so the link should point to it. | «(/it/account/change-your-region#spostare-un-dominio-personalizzato)» |
| minor | terminology | 62 | «[Branding del tuo dominio](/it/custom-domains/branding)» | The link text does not match the target page title «Branding del dominio». | «[Branding del dominio]» |

### custom-domains/setup-guide.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | markup | 11 | «(/en/custom-domains#what-each-plan-includes)» | The target page exists in the it tree, so the link should point to it. | «(/it/custom-domains#cosa-include-ogni-piano)» |
| minor | markup | 34 | «(/en/custom-domains#where-your-domain-is-served)» | The target page exists in the it tree, so the link should point to it. | «(/it/custom-domains#dove-viene-servito-il-tuo-dominio)» |
| minor | grammar | 93 | «senza che tu premi il pulsante» | «senza che» needs the subjunctive. | «senza che tu prema il pulsante» |
| minor | fluency | 127 | «Quando crei un segreto con accesso effettuato» | Calque of "while signed in". | «Quando crei un segreto dopo aver effettuato l'accesso» |

### pricing/compare-plans.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | terminology | 12 | «Segreti dalla homepage» | The shipped feature name is «Segreti in home page» (`web.billing.features.homepage_secrets`). | «Segreti in home page» |
| minor | terminology | 23 | «(registri di controllo)» | The shipped name for audit logs is «Log di audit» (`web.billing.features.audit_logs`). | «(log di audit)» |
| minor | UI label | 38 | «lo vedono come **Identity Plus (Early Supporter)**» | On the organization billing card the shipped it_IT label is «Identity Plus (Sostenitore iniziale)» (`web.billing.plans.early_supporter_plan`, OrganizationSettings.vue:1935). The organization list and billing overview show the hard-coded English name. See the general issues section. | «lo vedono come **Identity Plus (Early Supporter)** o **Identity Plus (Sostenitore iniziale)**» |
| minor | terminology | 46 | «Convalida dell'iscrizione per dominio» | The app calls sign-up validation «Convalida della registrazione» (`web.domains.signup.title`). | «Convalida della registrazione per dominio» |

### pricing/index.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | UI label | 16 | «L'app e questa documentazione lo chiamano **Free**.» | For Italian users the app shows «Gratuito» on the user-menu plan chip and in the organization settings (`web.billing.plans.free_plan`), and "Free" only where `getPlanLabel` is used. The sentence is only partly true in it_IT. | «Nell'app compare come **Gratuito** o **Free**; questa documentazione lo chiama **Free**.» |
| minor | terminology | 49 | «Dominio email del mittente flessibile» | The same feature is «dominio "Da" flessibile» in compare-plans.md:33. The adjective position also makes «flessibile» seem to modify «mittente». | «Dominio "Da" flessibile per le email» |

### security/data-protection.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | terminology | 65 | «## Domande o bisogno di supporto?» | Other pages use «Domande o bisogno di assistenza?» (branding.md:103, custom-domains/index.md:78, setup-guide.md:131). | «## Domande o bisogno di assistenza?» |

### security/index.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | fluency | 22 | «**Durata limitata per design.**» | «per design» is an anglicism. | «**Durata limitata per impostazione.**» |

### self-hosting/index.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | frontmatter | 5-6 | «sidebar:» / «order: 1» | A stale key from the previous version that the English page no longer has (the parity check flags it). It has no effect, because config/sidebar.mjs does not autogenerate. | Remove `sidebar.order` |
| minor | grammar | 47 | «dimostra che l'istanza stia davvero servendo» | «dimostrare che» takes the indicative here, and «servendo» is a calque of "serving". | «verifica che l'istanza risponda davvero alle richieste» |

### share/index.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | fluency | 41 | «Il modulo di creazione con accesso effettuato apre la ricevuta» | Calque of "signed-in creation form". The same pattern appears at 104: «Chi lo ha creato con accesso effettuato». | «Se hai effettuato l'accesso, il modulo di creazione apre la ricevuta» |

### share/use-cases.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | terminology | 52 | «offri un modulo in entrata sul tuo dominio personalizzato» | "incoming form": the locale and app use «segreti in arrivo» for this feature, and «modulo in entrata» is unnatural. | «offri un modulo per i segreti in arrivo sul tuo dominio personalizzato» |
| minor | terminology | 53 | «[Richiedere un segreto](/en/share/request-secret)» | share/index.md:143 links the same page as «Richiedi un segreto». | Use one form on both pages |

### share/why-secret-links.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | fluency | 10 | «il servizio non lo serve più attraverso quel link» | «servizio … serve» is a clumsy echo. | «il servizio non lo rende più disponibile tramite quel link» |
| minor | fluency | 53 | «nella loro sede a lungo termine prevista» | Awkward stacking of modifiers. | «nella sede prevista per la conservazione a lungo termine» |
| minor | terminology | 57 | «## Passi successivi» | share/use-cases.md:67 uses «Prossimi passi» for "Next steps". | «## Prossimi passi» |

## Clean pages

- account/change-your-region.md
- index.mdoc
- security/best-practices.md
- security/vulnerability-disclosure.md

## Terminology consistency

| English term | Renderings found (pages) | Expected (source) | Action |
|---|---|---|---|
| Related (heading) | «Argomenti correlati» (api/index.mdoc); «Pagine correlate» (custom-domains/branding.md, security/index.md) | «Pagine correlate» (majority) | Fix api/index.mdoc:90 |
| Next steps (heading) | «Prossimi passi» (share/use-cases.md); «Passi successivi» (share/why-secret-links.md) | One form | Fix why-secret-links.md:57 |
| Questions or need support? | «…assistenza?» (branding, custom-domains/index, setup-guide); «…supporto?» (security/data-protection) | «assistenza» (majority) | Fix data-protection.md:65 |
| Request a secret (link text) | «Richiedi un segreto» (share/index); «Richiedere un segreto» (share/use-cases) | One form | Normalise |
| flexible From domain | «dominio "Da" flessibile» (compare-plans); «Dominio email del mittente flessibile» (pricing/index) | One form | Fix pricing/index.md:49 |
| audit logs | «registri di controllo» (compare-plans) | «Log di audit» (app `web.billing.features.audit_logs`) | Align |
| Homepage secrets | «Segreti dalla homepage» (compare-plans) | «Segreti in home page» (app `web.billing.features.homepage_secrets`) | Align |
| sign-up | «iscrizione» (compare-plans) | «registrazione» (app `web.domains.signup.*`) | Align |
| incoming (form) | «modulo in entrata» (share/use-cases); «segreti in arrivo» everywhere else | «segreti in arrivo» (app `web.TITLES.incoming`) | Align |
| How-to section headings | imperative in setup-guide and share/index («Aggiungi il dominio»); infinitive in branding and use-cases («Aprire le impostazioni del brand») | One style per locale | Optional; not counted as a finding |
| secret, secret link, one-time link, receipt, burn, reveal, passphrase, password, custom domain, workspace, organization, region, hosted service, self-hosting | segreto, link segreto, link monouso, ricevuta, distruggere, rivelare/rivelazione, frase di sicurezza, password, dominio personalizzato, area di lavoro, organizzazione, regione, servizio in hosting, self-hosting: consistent on all 17 pages | Docs glossary and app governance | None |

## App UI label mismatches

| Page:line | Docs text | Shipped app string (key) | Note |
|---|---|---|---|
| custom-domains/branding.md:65 | **Quadrati** / **Arrotondati** / **Molto arrotondati** | "Square" / "Rounded" / "Extra Rounded" (hard-coded `borderRadiusDisplayMap`, brand-helpers.ts:217-223; no locale key) | Major. The reader cannot find these labels. |
| pricing/compare-plans.md:38 | **Identity Plus (Early Supporter)** | «Identity Plus (Sostenitore iniziale)» (`web.billing.plans.early_supporter_plan`) on the org billing card; English `PLAN_LABELS.identity` elsewhere | Minor. The app itself uses both names. |
| pricing/index.md:16 | lo chiamano **Free** | «Gratuito» (`web.billing.plans.free_plan`) on the user-menu chip and in org settings; English `PLAN_LABELS.free_v1` elsewhere | Minor. The app itself uses both names. |
| pricing/compare-plans.md:23 | registri di controllo | «Log di audit» (`web.billing.features.audit_logs`) | Minor. This is a descriptive gloss. |
| pricing/compare-plans.md:46 | Convalida dell'iscrizione | «Convalida della registrazione» (`web.domains.signup.title`) | Minor |
| share/index.md:25 | *Non hai fornito nulla da condividere.* | «Non hai fornito nulla da condividere» (`web.COMMON.error_secret`), with no period | Same as the English; already reported (da-2) |

These labels were checked and match the shipped it_IT strings: Domini, Gestisci, Funzionalità, Gestisci brand, Marchio, Consegna, Carica logo, Sostituisci, Logo del dominio, Salva logo, Aggiorna, Rimuovi logo, Carica la favicon, Salva la favicon, Aggiorna la favicon dal dominio, Rimuovi la favicon, Colore brand, Angoli, Famiglia font, Lingua, Istruzioni di rivelazione, Prima della rivelazione, Dopo la rivelazione, Aggiungi dominio, Dominio personalizzato, Sottodomini più diffusi, Usa il mio dominio radice, Continua con, Verifica dominio, Dominio verificato e attivo, Attivo, Stato dominio, Dominio, Stato, Indirizzo di destinazione, Record DNS, Stato SSL, Rinnovo SSL, Ultimo monitoraggio, Ultimo controllo di verifica non riuscito, Resta sulla pagina, Scade tra, Clicca per rivelare, Nuovo, In anteprima, Rivelato, Preferenze, Attività dei segreti.

## English source and general issues

- [new] pricing/index.md:18-19 says "The app and these docs call it **Free**." The app shows the free plan under two names: the localized `web.billing.plans.free_plan` (UserMenu.vue:688 plan chip, OrganizationSettings.vue:954 and :1980, OrganizationsSettings.vue:54, BillingOverview.vue:62) and the hard-coded English `PLAN_LABELS.free_v1: 'Free'` (src/types/billing.ts:90) through `getPlanLabel`. In every locale with a translated `free_plan` (it: «Gratuito»), readers see both names. This adds to the known Free/Basic issue (fr-2).
- [new] pricing/compare-plans.md:40-41 says accounts "see it as **Identity Plus (Early Supporter)**." The app has the same split: the localized `web.billing.plans.early_supporter_plan` on the legacy-plan billing card (OrganizationSettings.vue:1935) and the hard-coded English `PLAN_LABELS.identity` (src/types/billing.ts:95) in OrganizationsSettings, BillingOverview and PlanSelector. Translated docs cannot name one label until the app uses a single one.
- [known] Corner and font option labels are hard-coded English (nl-1). The it page translated the corner labels anyway; this is the major finding above.
- [known] The passphrase-as-encryption-key contradiction (fr-2) is reproduced faithfully: api/index.mdoc:60 «La frase di sicurezza viene usata per crittografare il valore» against share/index.md:74 «La frase di sicurezza è un controllo di accesso, non la chiave di crittografia».
- [known] Free vs Basic naming lock (fr-2).
- [known] index.mdoc links self-hosting as "Configuration and upgrades" while the page title is "Self-hosting overview" (pt-br-2). In it: «Configurazione e aggiornamenti» against «Panoramica del self-hosting».
- [known] pricing/index.md "Self-Hosting Guide" link text (es-2). In it: «Guida al self-hosting».
- [known] "no fixed limit" against "Unlimited" (sv-2). In it: setup-guide.md:10 «non hanno un limite fisso» against custom-domains/index.md:25 and compare-plans.md:11 «Illimitati».
- [known] self-hosting/index.md "one generated secret" is ambiguous (de-1). The it text «con un unico segreto generato» keeps the ambiguity.
- [known] share/index.md quotes the empty-submission error with a period the UI string does not have (da-2).
- [known] branding.md says SVG is not accepted, while the app hint says otherwise (it-1).
- [known] Many links still send locale readers to /en/ pages that do not exist in the locale tree (fr-1).

## Not checked

- I ran no build or site checks (`pnpm build`, `check:links`); this was a source-only review under a read-only mandate. I derived the Italian anchor slugs in the suggested fixes from the it headings and did not confirm them against rendered output.
- I did not verify the English claims themselves (prices, limits, lifetimes, DNS targets) against billing.yaml.txt or DNS. The translation reproduces the English figures unchanged on every page.
