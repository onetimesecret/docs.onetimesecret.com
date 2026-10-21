# French (fr) translation review

- Commit: c51c3016 — 17 pages
- English base: HEAD d30489ac
- Register expected: formal vous (`_language-notes.md` "Vouvoiement standard"; app governance `register.fr.formality`); observed: consistent (no tu/ton/ta/te forms on any page)
- Findings: 0 critical, 5 major, 37 minor

## Verdict

The translation is accurate and fluent. Every security statement (one-time reveal, passphrase behaviour, receipts, burn, expiry, encryption) matches the English, and markup, code blocks and links are intact. Most problems are UI labels that do not match the shipped fr_FR app: the Delivery tab, the English-only corner and font options, the receipt status "Previewed", and an error message left in English. The other recurring problem is terminology drift: "plan" vs "forfait" and "courriel" vs "e-mail" across pages. The home page also mistranslates "incoming page" as "page d'accueil". The locale can ship once the 5 major findings are fixed; the minor findings can be fixed in one terminology pass.

## Findings

### account/change-your-region.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | typography | 4 | «n'échangent pas de données ; changer» | Frontmatter description uses a regular space before `;`; the body uses NBSP. | NBSP before `;` |
| minor | fluency | 50–51 | «jusqu'à ce qu'ils soient révélés, brûlés ou expirés» | "expirer" takes avoir; line 97 of the same page correctly writes «ont expiré». | «jusqu'à ce qu'ils soient révélés ou brûlés, ou qu'ils expirent» |

### api/index.mdoc

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | terminology | 7 | «de sorte que l'identifiant ne reste jamais dans un journal» | English: "the credential". Singular «l'identifiant» reads as a username or ID, not a password or token. | «de sorte que les identifiants ne restent jamais dans un journal…» |
| minor | fluency | 78 | «Construisez sur celle-ci.» | Literal translation of "Build on this one." | «C'est celle-ci qu'il faut utiliser.» |

### custom-domains/branding.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| major | UI label | 29, 73 | «**Livraison**» | The shipped tab is «Distribution» (`web.branding.tab_delivery`). The reader cannot find a "Livraison" tab. | «**Distribution**» |
| major | UI label | 65–66 | «**Carrés**, **Arrondis** ou **Très arrondis**» … «**Sans serif**, **Monospace** ou **Interface système**» | These option labels are hard-coded in English in the app (`src/shared/utils/brand-helpers.ts` `borderRadiusDisplayMap`, `fontDisplayMap`). French users see Square / Rounded / Extra Rounded and Serif / Sans Serif / Monospace / System UI. | «**Square**, **Rounded** ou **Extra Rounded**»; «**Serif**, **Sans Serif**, **Monospace** ou **System UI**» |
| minor | UI label | 66 | «**Famille de police**» | Shipped label is «Police» (`web.branding.font_family`). | «**Police**» |
| minor | UI label | 34, 50 | «**Téléverser le logo**», «**Téléverser le favicon**» | Shipped buttons are «Téléverser un logo» / «Téléverser un favicon» (`web.branding.upload_logo`, `upload_favicon`). | «**Téléverser un logo**», «**Téléverser un favicon**» |
| minor | terminology | 13, 90, 92, 101 | «dispose d'un plan», «Si votre plan change», «passe à un plan» | The app, the sidebar and 6 other pages use «forfait». | «forfait» |
| minor | terminology | 75, 99 | «des courriels», «Expéditeur de courriel», «courriels de liens secrets» | App governance binds email → «e-mail». custom-domains/index.md:29 uses «Expéditeur d'e-mail». | «e-mails», «Expéditeur d'e-mail» |
| minor | terminology | 106 | «formulaire de retours» | 5 other pages use «formulaire de retour d'information». | «formulaire de retour d'information» |
| minor | fluency | 75 | «la langue par défaut des pages destinataires» | "pages destinataires" means pages that are recipients. | «des pages des destinataires» |
| minor | fluency | 87 | «au chargement de page suivant» | Unidiomatic. | «au prochain chargement de la page» |

### custom-domains/index.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | link | 57 | `/en/account/change-your-region#moving-a-custom-domain` | The French page exists; this link sends the reader to English. | `/fr/account/change-your-region#déplacer-un-domaine-personnalisé` |
| minor | terminology | 73 | «auprès de votre registraire» | «registraire» is Quebec usage (OQLF). fr_FR/FranceTerme uses «bureau d'enregistrement». | «auprès de votre bureau d'enregistrement» |

### custom-domains/setup-guide.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | terminology | 9–10 | «Le forfait gratuit en inclut un» | English: "Free" (plan name). Every other page keeps «Free». | «Le forfait Free en inclut un» |
| minor | link | 12, 39 | `/en/custom-domains#what-each-plan-includes`, `/en/custom-domains#where-your-domain-is-served` | The French page exists. | `/fr/custom-domains#ce-que-chaque-forfait-inclut`, `/fr/custom-domains#où-votre-domaine-est-servi` |
| minor | terminology | 15 | «chez votre registraire» | Quebec usage (see custom-domains/index.md:73). | «chez votre bureau d'enregistrement» |
| minor | UI label | 31 | «**Sous-domaines populaires**» | Shipped label is «Sous-domaines courants» (`web.domains.add.subdomains_label`). | «**Sous-domaines courants**» |
| minor | fluency | 117 | «Un domaine qui nécessite une attention» | Unidiomatic. | «Un domaine qui nécessite votre attention» |
| minor | UI label | 121, 124, 130 | «**Statut du domaine**», «**Statut**», «**Statut SSL**» | Shipped panel labels are «État du domaine», «État», «État SSL» (`web.domains.domain_status`, `web.COMMON.status`, `web.domains.ssl_status`). | «**État du domaine**», «**État**», «**État SSL**» |
| minor | UI label | 134 | «**Échec de la dernière vérification**» | Shipped string is «La dernière vérification a échoué» (`web.domains.last_check_failed`). | «**La dernière vérification a échoué**» |

### index.mdoc

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| major | accuracy | 28 | «validation DNS, image de marque et page d'accueil pour les secrets qui vous sont envoyés» | English: "an incoming page for secrets sent to you". «page d'accueil» means homepage, which is a separate feature ("Homepage and incoming secrets"). | «…et page de réception pour les secrets qui vous sont envoyés» |
| minor | accuracy | 37 | «SDK officiels et communautaires, et ceux qui prennent en charge les régions» | English: "and which ones support regions" (the page tells you which). | «…et lesquels prennent en charge les régions et les domaines personnalisés» |

### pricing/compare-plans.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | terminology | 3, 4, 9, 36, 37, 42 | title «Comparer les plans»; «Comparez nos plans»; «Fonctionnalité / Plan»; «le plan Free» | The sidebar (`sidebar.comparePlans`) and the links on change-your-region.md:86, custom-domains/index.md:34 and pricing/index.md:63 all say «Comparer les forfaits»; the app uses «forfait». | «Comparer les forfaits», «forfait(s)» throughout |
| minor | terminology | 16, 33, 45 | «Expéditeur de courriel personnalisé», «modèles de courriel» | Governance binds «e-mail». | «Expéditeur d'e-mail personnalisé», «modèles d'e-mail» |

### pricing/index.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | fluency | 7 | «en toute confiance, valorisez votre marque et renforcez la confiance» | «confiance» repeated in one sentence. | «…valorisez votre marque et inspirez confiance.» |
| minor | fluency | 49 | «Domaine d'expéditeur (From) des e-mails flexible» | «flexible» ends up far from its noun. compare-plans.md:33 uses «domaine d'expédition flexible». | «Domaine d'expédition (From) flexible pour les e-mails» |

### security/best-practices.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | terminology | 19 | «Vérifiez à deux fois les adresses courriel» | Governance binds «e-mail»; «adresse courriel» is Quebec usage. | «les adresses e-mail» |

### security/data-protection.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | terminology | 17, 24 | «dans les limites de votre plan», «sur tous les plans» | Should be «forfait», as in the app and the other pages. | «forfait», «sur tous les forfaits» |
| minor | terminology | 53 | «un canal plus sûr que le courriel» | Governance binds «e-mail». | «plus sûr que l'e-mail» |

### security/index.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | terminology | 18 | «au repos sur tous les plans» | Should be «forfait». | «sur tous les forfaits» |
| minor | fluency | 20–21 | «ajoutant une couche que le lien seul ne peut pas déverrouiller» | This participle clause follows English syntax. | «ce qui ajoute une protection que le lien seul ne suffit pas à lever» |

### self-hosting/index.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | style | 14, 28 | «## Choisissez d'abord un mode d'authentification», «## Choisissez un parcours d'installation» | The headings use the imperative. The rule (`rule.fr-infinitive-buttons`) and every other page use the infinitive or a noun in headings. | «## Choisir d'abord un mode d'authentification», «## Choisir un parcours d'installation» |
| minor | terminology | 84 | «une adresse courriel» | Governance binds «e-mail». | «une adresse e-mail» |

### share/index.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| major | UI label | 27–28 | «refusée avec le message *You did not provide anything to share.*» | The message is left in English. The fr_FR app shows «Vous n'avez rien fourni à partager» (`web.COMMON.error_secret`). | «…refusée avec le message *Vous n'avez rien fourni à partager*.» |
| minor | fluency | 56 | «les options se lisent **Expire dans …**» | Literal translation of "the choices read". | «les options s'affichent sous la forme **Expire dans …**» |
| major | UI label | 125 | «**Prévisualisé** : le lien a été chargé» | The receipt status badge shows «Aperçu» (`web.STATUS.previewed`, rendered by StatusBadge). The reader cannot match "Prévisualisé" to it. | «**Aperçu** : le lien a été chargé…» |
| minor | grammar | 141 | «saisissez sa phrase secrète si une a été définie» | «une» cannot stand alone as a pronoun subject here. | «…si une phrase secrète a été définie» |

### share/use-cases.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | terminology | 17, 23, 24 | «Envoyez un identifiant à un collègue», «renouvelez l'identifiant», «révoquer un identifiant» | Singular «identifiant» is used for "credential". Line 58 of the same page uses «identifiant de compte» for "account identifier", so one word covers both meanings. | «Envoyez des identifiants à un collègue…», «renouvelez ces identifiants…», «révoquer des identifiants que quelqu'un a déjà lus» |

### share/why-secret-links.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | typography | 3 | `title: "Pourquoi utiliser des liens secrets ?"` | Regular space before `?` in the title; the body uses NBSP. | NBSP before `?` |
| minor | grammar | 27 | «en saisissant sa phrase secrète si une a été définie» | Same error as share/index.md:141. | «…si une phrase secrète a été définie» |

## Clean pages

- api/client-libraries.md
- security/vulnerability-disclosure.md

## Terminology consistency

| English term | Renderings found (pages) | Expected (source) | Action |
|---|---|---|---|
| plan | «forfait» (change-your-region, api/index, custom-domains/index, setup-guide, pricing/index, share/index); «plan» (branding, compare-plans, data-protection, security/index) | «forfait» (shipped fr_FR app, e.g. «Faire passer {org} au forfait {plan}»; sidebar «Comparer les forfaits»; prior glossary) | Replace «plan» on the 4 pages; retitle compare-plans |
| email | «e-mail» (change-your-region, api/index, custom-domains/index, pricing/index, vulnerability-disclosure, share/index, why-secret-links); «courriel» (branding, compare-plans, best-practices, data-protection, self-hosting) | «e-mail» (app governance `glossary.email` → e-mail; app ships no «courriel») | Replace «courriel» on the 5 pages |
| Free (plan) | «Free» (custom-domains/index, compare-plans, pricing/index); «forfait gratuit» (setup-guide:10) | «Free» (brand terms; pricing pages) | Fix setup-guide |
| credential | «identifiant» singular (api/index:7, use-cases:17,23,24); «identifiants» (data-protection:54, use-cases:4) | Plural «identifiants (de connexion)»; keep singular «identifiant» for "identifier" (setup-guide:52, self-hosting:85, use-cases:58) | Pluralise or reword the credential sense |
| feedback form | «formulaire de retour d'information» (5 pages); «formulaire de retours» (branding:106) | «formulaire de retour d'information» (docs glossary Feedback → Retour d'information) | Fix branding |
| registrar | «registraire» (custom-domains/index:73, setup-guide:15) | «bureau d'enregistrement» (FranceTerme, fr_FR) | Replace |
| Previewed (status) | «Prévisualisé» (share/index:125; prior glossary) | «Aperçu» (`web.STATUS.previewed`) | Follow the app; correct the glossary candidate |
| Delivery (tab) | «Livraison» (branding:29,73; prior glossary) | «Distribution» (`web.branding.tab_delivery`) | Follow the app; correct the glossary candidate |
| Domain Status / Status / SSL Status | «Statut du domaine / Statut / Statut SSL» (setup-guide; prior glossary) | «État du domaine / État / État SSL» (shipped fr_FR) | Follow the app; correct the glossary candidate |

## App UI label mismatches

| Page:line | Docs text | Shipped app string (key) | Note |
|---|---|---|---|
| custom-domains/branding.md:29,73 | Livraison | Distribution (`web.branding.tab_delivery`) | Tab not findable by name |
| custom-domains/branding.md:65 | Carrés / Arrondis / Très arrondis | Square / Rounded / Extra Rounded (hard-coded, `brand-helpers.ts` `borderRadiusDisplayMap`) | Not localised in the app; quote in English |
| custom-domains/branding.md:66 | Sans serif / Interface système | Sans Serif / System UI (hard-coded, `fontDisplayMap`) | Not localised in the app; quote in English |
| custom-domains/branding.md:66 | Famille de police | Police (`web.branding.font_family`) | |
| custom-domains/branding.md:34 | Téléverser le logo | Téléverser un logo (`web.branding.upload_logo`) | Article only |
| custom-domains/branding.md:50 | Téléverser le favicon | Téléverser un favicon (`web.branding.upload_favicon`) | Article only |
| custom-domains/setup-guide.md:31 | Sous-domaines populaires | Sous-domaines courants (`web.domains.add.subdomains_label`) | |
| custom-domains/setup-guide.md:121 | Statut du domaine | État du domaine (`web.domains.domain_status`) | |
| custom-domains/setup-guide.md:124 | Statut | État (`web.COMMON.status`) | |
| custom-domains/setup-guide.md:130 | Statut SSL | État SSL (`web.domains.ssl_status`) | |
| custom-domains/setup-guide.md:134 | Échec de la dernière vérification | La dernière vérification a échoué (`web.domains.last_check_failed`) | |
| share/index.md:28 | *You did not provide anything to share.* | Vous n'avez rien fourni à partager (`web.COMMON.error_secret`) | Left in English |
| share/index.md:125 | Prévisualisé | Aperçu (`web.STATUS.previewed`) | Receipt status badge |
| pricing/compare-plans.md:12 | Secrets via la page d'accueil | Secrets sur la page d'accueil (`web.billing.features.homepage_secrets`) | Plan feature name in billing UI; align if convenient (not counted as a finding) |

## English source and general issues

- [new] security/best-practices.md:16 — "if one secret is compromised, the entire set of information remains protected" contradicts itself: the compromised part is exposed. It should mean "the rest of the information remains protected". The fr text reproduces it.
- [new] src/content/i18n/fr.json (sidebar bundle, not in this commit) — labels diverge from the re-synced page titles: `setupGuide` «Guide d'installation» (page «Configurer un domaine personnalisé»; «installation» also suggests self-hosting), `brandGuide` «Guide de marque», `clientLibraries` «Bibliothèques client» (page «Bibliothèques clientes»), `securityBestPractices` «Meilleures pratiques de sécurité» (page «Bonnes pratiques de sécurité»). The bundle also lacks NBSP in «Dernière mise à jour:», «Copié!» and «recherches suivantes:». Same class of problem as the known mi/ja/zh-cn sidebar item.
- [new] src/content/docs/fr/translations/glossary.md — lists view/reveal → «consulter/afficher» and email → «courriel/e-mail». The app ships «révéler» (Révélé, Cliquez pour révéler), and governance binds «e-mail». The stale entry likely caused the «courriel» drift on 5 pages. The "Boutons et actions" table also has a malformed first row («soumettre | einreichen | soumettre | action de formulaire | annuler | abréger…»).
- [new] $S/prior/glossary-fr.md — the candidates «Previewed → Prévisualisé», «Delivery → Livraison», «Domain Status / SSL Status → Statut du domaine / Statut SSL», «Corners: Square / Rounded / Extra Rounded → Carrés / Arrondis / Très arrondis», «Font Family / System UI → Famille de police / Interface système» and «Upload logo/favicon → Téléverser le logo / le favicon» conflict with the shipped fr_FR strings or with hard-coded English labels. Correct them before they are promoted to a glossary.
- [known] api/index.mdoc passphrase "used to encrypt the value" vs share/index.md "an access check, not the encryption key" — fr reproduces both faithfully (api/index.mdoc:60, share/index.md:83).
- [known] Free vs Basic naming — fr setup-guide renders it as «forfait gratuit» (finding above).
- [known] branding.md Corner/Font option labels are hard-coded English — fr translated them (major finding above).
- [known] index.mdoc hero "Setup your custom domain" — fr «Configurer votre domaine personnalisé» is correct.
- [known] self-hosting/index.md "one generated secret" ambiguity — fr «avec un secret généré» keeps it.
- [known] pricing/index.md "Self-Hosting Guide" link text vs page title — fr «Guide d'auto-hébergement» vs title «Aperçu de l'auto-hébergement».
- [known] index.mdoc "Configuration and upgrades" vs page title — fr «Configuration et mises à niveau» vs «Aperçu de l'auto-hébergement».
- [known] setup-guide "no fixed limit" vs compare-plans "Unlimited" — fr «pas de limite fixe» vs «Illimités».
- [known] share/index.md error string with trailing period — fr left the whole string in English (major finding above).
- [known] client-libraries code-comment typos and the misplaced `ots burn` line are preserved verbatim in fr code blocks.
- [known] /en/ links to pages missing from the fr tree (install/*, organizations/*, share/your-receipt, etc.).

## Not checked

- No build, `pnpm test` or `dogfood.py check` was run; this was a read-only review of the clean copies. The suggested `/fr/…#…` anchor slugs (accented, github-slugger style) were derived from the fr headings, not confirmed against a built site.
- UI strings were compared against the fr_FR bundle in the local app checkout (`$APP/locales/content/fr_FR`), which may differ from the deployed version.
