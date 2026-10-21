# German (de) translation review

- Commit: ff448649 — 17 pages
- English base: HEAD d30489ac
- Register expected: informal `du`/`dein` (`_language-notes.md`; app governance `register.form: informal`, `rule.de-du`); observed: consistent (no Sie forms; `Bietet ihr Kundensupport an?` at pricing/index.md:73 addresses the company, which is correct)
- Findings: 0 critical, 5 major, 29 minor

## Verdict

The translation is accurate and complete. Security statements (one-time reveal, deletion, passphrase behaviour, receipt lifetime, encryption) match the English, no content is missing or added, and the du register holds on every page. The major problems are UI labels on the branding page and the setup guide that do not match the shipped German app strings, so a reader cannot find the named control. The minor problems are terminology drift (owner role, Secret Activity, workspace, a leftover "Tarif"), several English calques, and two `/en/` links whose German target exists. The pages can ship once the 5 major label fixes are made.

## Findings

### account/change-your-region.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | terminology | 79 | «nach einem Tarifwechsel» | The docs normalised "plan" to Plan/Pläne; this is the only "Tarif" in the 17 pages | «nach einem Planwechsel» |
| minor | terminology | 102 | «Anforderungen an den Datenstandort» | "data residency" is «Datenresidenz» on data-protection.md:35,48 and security/index.md:4 | «Anforderungen an die Datenresidenz» |
| minor | terminology | 35 | «die Einstellungen deines Workspace» | The reader is sent into the app, which calls this «Arbeitsbereich» (web.layout.workspace, web.organizations.organization); see the terminology table | «die Einstellungen deines Arbeitsbereichs» (if the app term is adopted) |

### api/index.mdoc

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | fluency | 4 | «Erstelle, rufe ab und lösche Geheimnisse aus deinem eigenen Code» | The separable verb in a coordinated list is ungrammatical | «Geheimnisse aus deinem eigenen Code erstellen, abrufen und löschen: …» |
| minor | fluency | 27 | «Der nackte Host `onetimesecret.com`» | Calque of "bare host" | «Der Host `onetimesecret.com` ohne Regionspräfix» |

### custom-domains/branding.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| major | ui-label | 28 | «Wähle unter **Funktionen** die Option» | The shipped de heading is «Features» (web.domains.detail.features, untranslated in de) | «Wähle unter **Features** die Option», or translate the app string to «Funktionen» |
| major | ui-label | 66 | «**Eckig**, **Abgerundet** oder **Stark abgerundet**» | The app shows these options in English, hard-coded in brand-helpers.ts `borderRadiusDisplayMap`, so the German names cannot be found | «**Square**, **Rounded** oder **Extra Rounded**» |
| major | ui-label | 67 | «**Schriftfamilie**: … **System-UI**» | The shipped label is «Schriftart» (web.branding.font_family). The option is the hard-coded «System UI» | «**Schriftart**: **Serif**, **Sans Serif**, **Monospace** oder **System UI**» |
| major | ui-label | 80–81 | «**Hinweise zum Aufdecken** … **Vor dem Aufdecken** und **Nach dem Aufdecken**» | Shipped: «Anzeige-Anweisungen», «Vor dem Anzeigen», «Nach dem Anzeigen» (web.branding.delivery_reveal_instructions / delivery_before_reveal / delivery_after_reveal) | «**Anzeige-Anweisungen**: Text, der auf der Empfängerseite **Vor dem Anzeigen** und **Nach dem Anzeigen** angezeigt wird» |
| minor | ui-label | 54 | «**Favicon von Domain aktualisieren**» | Shipped: «Favicon von der Domain aktualisieren» (web.branding.refresh_favicon). Still findable | «**Favicon von der Domain aktualisieren**» |
| minor | terminology | 14 | «Du bist **Eigentümer** der Organisation» | The owner role is «Inhaber» in the app (web.organizations.members.roles.owner) and on custom-domains/index.md:42 and setup-guide.md:12 | «Du bist **Inhaber** der Organisation» |

### custom-domains/index.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | link | 58 | `(/en/account/change-your-region#moving-a-custom-domain)` | The German page exists. The built anchor is `benutzerdefinierte-domain-umziehen` | `/de/account/change-your-region#benutzerdefinierte-domain-umziehen` |
| minor | terminology | 29 | «Anweisungen zum Aufdecken» | branding.md uses «Hinweise zum Aufdecken» and the app uses «Anzeige-Anweisungen» | «Anzeige-Anweisungen» |

### custom-domains/setup-guide.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| major | ui-label | 31 | «Wähle **Weiter mit** _deiner Domain_.» | The shipped button reads «Mit {0} fortfahren» (web.domains.add.continue_with). Nothing in the app says «Weiter mit» | «Wähle **Mit** _deiner Domain_ **fortfahren**.» |
| minor | ui-label | 30 | «Wähle eine der **Beliebten Subdomains**» | The label is inflected. Shipped: «Beliebte Subdomains» (web.domains.add.subdomains_label) | «Wähle unter **Beliebte Subdomains** eine Subdomain oder **Meine Root-Domain verwenden**.» |
| minor | link | 11, 37 | `(/en/custom-domains#what-each-plan-includes)`, `(/en/custom-domains#where-your-domain-is-served)` | The German page exists. The built anchors are `was-jeder-plan-enthält` and `wo-deine-domain-ausgeliefert-wird` | `/de/custom-domains#was-jeder-plan-enthält`, `/de/custom-domains#wo-deine-domain-ausgeliefert-wird` |
| minor | accuracy | 119 | «ein Feld **Domain-Status** mit diesen Angaben» | English has "panel". «Feld» means a single input field | «einen Bereich **Domain-Status** mit diesen Angaben» |

### index.mdoc

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | fluency | 34 | «Erstelle und rufe Geheimnisse aus Skripten, CI-Pipelines und deinen eigenen Anwendungen ab.» | Awkward split of the separable verb across the coordination | «Erstelle Geheimnisse und rufe sie aus Skripten, CI-Pipelines und deinen eigenen Anwendungen ab.» |
| minor | fluency | 41 | «die onetimesecret.com antreibt» | Calque of "powers" | «auf der onetimesecret.com läuft» |
| minor | typography | 3, 9 | «Onetime Secret Dokumentation» | A compound with a multi-word name needs hyphens throughout. The brand stays intact | «Onetime-Secret-Dokumentation» or «Dokumentation zu Onetime Secret» |

### pricing/compare-plans.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | terminology | 23 | «Geheimnis-Aktivität (Audit-Protokolle)» | The app (web.organizations.audit.title) and index.mdoc:29, pricing/index.md:50 and why-secret-links.md:67 all use «Nachrichtenaktivität» | «Nachrichtenaktivität (Audit-Protokolle)» |
| minor | typography | 37 | «dem früheren Identity Plus-Plan» | Missing hyphen in the compound | «dem früheren Identity-Plus-Plan» or «dem früheren Plan Identity Plus» |

### pricing/index.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | fluency | 28, 42 | «Geheimnisse teilen unter deiner eigenen Domain und Marke, mit Mitgliedern.» / «Geheimnisse teilen für Teams, …» | Follows English word order | «Geheimnisse unter deiner eigenen Domain und Marke teilen, mit Mitgliedern.» / «Geheimnisse im Team teilen, mit Single Sign-On und Admin-Rollen.» |
| minor | fluency | 50 | «Nachrichtenaktivität, in der Beta» | Unidiomatic | «Nachrichtenaktivität (Beta)» |

### security/best-practices.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | accuracy | 15, 55 | «verteile sie auf mehrere Geheimnisse» / «beschränke den Zugriff auf Geheimnisse zeitlich» | English says "consider splitting" and "consider implementing". Dropping "consider" turns optional advice into an instruction | «erwäge, sie auf mehrere Geheimnisse zu verteilen» / «erwäge, den Zugriff auf Geheimnisse zeitlich zu beschränken» |

### self-hosting/index.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | terminology | 75, 92, 98–104 | «Organisationseigentümer», «Eigentümer-Mitgliedschaften», «Der bisherige Eigentümer» | The owner role is «Inhaber» in the app and on the custom-domains pages. Keep «Eigentümerschaft» for "ownership" | «Organisationsinhaber», «Inhaber-Mitgliedschaften», «Der bisherige Inhaber» |
| minor | fluency | 93–94 | «Mit `n` antworten ist der Weg, eine Übertragung nur in der Vorschau anzusehen.» | Calque | «Antworte mit `n`, um eine Übertragung nur als Vorschau zu sehen.» |
| minor | fluency | 107–109 | «das ist es, was deine Nutzer gelesen haben werden, bevor sie sich an dich wenden» | Calque | «diese Seite haben deine Nutzer meist gelesen, bevor sie sich an dich wenden» |
| minor | typography | 4 | «einer eigenen Onetime Secret Instanz» | Missing hyphens in the compound | «einer eigenen Onetime-Secret-Instanz» |

### share/index.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | typography / accuracy | 144 | «Seite „Geheimnis nicht verfügbar"» | The closing quote is an ASCII `"` (U+0022), not `“`. The quoted page title does not exist in the app; English only says "the same unavailable-secret page" | «dieselbe Seite für nicht verfügbare Geheimnisse» |
| minor | fluency | 112 | «gilt für den Abruf von Onetime Secret» | This can be read as "retrieving Onetime Secret". English: "retrieval from Onetime Secret" | «gilt für den Abruf aus Onetime Secret» |

### share/use-cases.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | accuracy | 58, 66 | «Sensible Enthüllungen und Anonymität» / «Für eine Enthüllung, die jemanden gefährden könnte» | "Disclosure" here means a confidential report (whistleblowing). «Enthüllung» means exposé and clashes with the reveal status «Enthüllt» | «Vertrauliche Meldungen und Anonymität» / «Für eine Meldung, die jemanden gefährden könnte» |
| minor | typography | 49 | «Für dein Onetime Secret Konto» | Missing hyphens in the compound | «Für dein Onetime-Secret-Konto» |

### share/why-secret-links.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | grammar | 53–54 | «widerruft auch kein Passwort, Token oder keinen Lizenzschlüssel in dem System, das ihn ausgestellt hat» | Mixed negation and case, and «ihn» refers only to the Lizenzschlüssel | «widerruft auch keine Passwörter, Token oder Lizenzschlüssel in dem System, das sie ausgestellt hat» |

## Clean pages

- api/client-libraries.md
- security/data-protection.md (only items in the terminology table)
- security/index.md (only items in the terminology table)
- security/vulnerability-disclosure.md

## Terminology consistency

| English term | Renderings found (pages) | Expected (source) | Action |
|---|---|---|---|
| owner (role) | Inhaber (change-your-region:31; custom-domains/index:42,44; setup-guide:12); Eigentümer (branding:14; self-hosting:75,92,98–104) | Inhaber (app web.organizations.members.roles.owner; prior glossary) | Change the role uses of Eigentümer to Inhaber |
| Secret Activity | Nachrichtenaktivität (index.mdoc:29; pricing/index:50; why-secret-links:67); Geheimnis-Aktivität (compare-plans:23) | Nachrichtenaktivität (app web.organizations.audit.title) | Fix compare-plans:23. The conflict with the secret = Geheimnis rule is already known (de-2) |
| workspace | Workspace (change-your-region:29,31,35; index.mdoc:4,10,26; compare-plans:45) | App: Arbeitsbereich (web.layout.workspace, web.organizations.organization; 26 shipped hits vs 1 "Workspace"). Prior glossary: Workspace | Orchestrator decision: adopt Arbeitsbereich or record Workspace as docs-only |
| plan | Plan/Pläne everywhere; Tarifwechsel (change-your-region:79) | Plan (orchestrator normalisation). The shipped app mostly uses Tarif (about 61 hits vs about 17 Plan) | Fix the leftover. The decision conflicts with the app's majority term; record it |
| reveal instructions | Hinweise zum Aufdecken (branding:4,73,80); Anweisungen zum Aufdecken (custom-domains/index:29) | Anzeige-Anweisungen (app web.branding.delivery_reveal_instructions) | Use the app label |
| reveal | aufdecken (all pages); status «Enthüllt» (share/index:128, matches web.STATUS.revealed); «Enthüllung» for "disclosure" (use-cases:58,66) | aufdecken (prior glossary); app button «Klicke zum Anzeigen» | Keep aufdecken in prose. Quote app labels verbatim. Do not use Enthüllung for "disclosure" |
| data residency | Datenresidenz (data-protection:35,48; security/index:4); Datenstandort (change-your-region:102) | Datenresidenz (prior glossary) | Align change-your-region:102 |
| Where your data lives (link text) | «Wo deine Daten liegen» (change-your-region:9; api/index:27,92; custom-domains/index:59); «Wo deine Daten gespeichert sind» (data-protection:40; security/index:38) | «Wo deine Daten gespeichert sind» (prior glossary) | Pick one form |
| passphrase protection | Passphrasenschutz (best-practices:13); Schutz durch Passphrase (security/index:19) | Passphrasenschutz (docs glossary, DE column) | Align security/index:19 |
| "Questions or need support?" | «Fragen oder Unterstützung nötig?» (branding:107); «Fragen oder Hilfe nötig?» (custom-domains/index:85; setup-guide:139); «Fragen oder Hilfe benötigt?» (data-protection:64) | One form | Align |
| self-hosting | Self-Hosting (all pages) vs «Selbst-Hosting» (sidebar bundle sidebar.selfHosting, nav.label.self-hosting) | Self-Hosting (prior glossary) | Fix the sidebar bundle (see general issues) |

## App UI label mismatches

| Page:line | Docs text | Shipped app string (key) | Note |
|---|---|---|---|
| custom-domains/branding.md:28 | Funktionen | Features (web.domains.detail.features) | de app string is untranslated |
| custom-domains/branding.md:54 | Favicon von Domain aktualisieren | Favicon von der Domain aktualisieren (web.branding.refresh_favicon) | Differs only by the article |
| custom-domains/branding.md:66 | Eckig / Abgerundet / Stark abgerundet | Square / Rounded / Extra Rounded (hard-coded, src/shared/utils/brand-helpers.ts `borderRadiusDisplayMap`) | Known nl-1: quote in English |
| custom-domains/branding.md:67 | Schriftfamilie; System-UI | Schriftart (web.branding.font_family); System UI (hard-coded `fontDisplayMap`) | |
| custom-domains/branding.md:80 | Hinweise zum Aufdecken | Anzeige-Anweisungen (web.branding.delivery_reveal_instructions) | |
| custom-domains/branding.md:80–81 | Vor dem Aufdecken / Nach dem Aufdecken | Vor dem Anzeigen / Nach dem Anzeigen (web.branding.delivery_before_reveal / delivery_after_reveal) | |
| custom-domains/setup-guide.md:31 | Weiter mit _deiner Domain_ | Mit {0} fortfahren (web.domains.add.continue_with) | |
| custom-domains/setup-guide.md:30 | Beliebten Subdomains | Beliebte Subdomains (web.domains.add.subdomains_label) | The inflected form is still findable |
| pricing/compare-plans.md:23 | Geheimnis-Aktivität | Nachrichtenaktivität (web.organizations.audit.title) | |
| account/change-your-region.md:35 | Workspace | Arbeitsbereich (web.layout.workspace) | Prose, not a quoted label |

## English source and general issues

- [new] api/index.mdoc:40 — "the password is the API token from your account settings": the app labels it "API Key" (web.account.api_key, de «API-Schlüssel»), and security/best-practices.md:42 says "API Keys". The docs need one term that matches the app.
- [new] security/best-practices.md:16 — "if one secret is compromised, the entire set of information remains protected" contradicts itself, since the compromised part is not protected. The intended meaning is "the rest of the set". The de translation already says «der Rest der Informationen».
- [new] App: the de string for web.domains.detail.features is untranslated ("Features"). This is the heading branding.md:31 tells readers to look under.
- [new] Sidebar bundle src/content/i18n/de.json: `sidebar.brandGuide` = «Markenrichtlinie» ("brand guideline") for "Branding" is the wrong meaning and does not match the page title. `sidebar.selfHosting` and `nav.label.self-hosting` = «Selbst-Hosting», while every re-synced page uses «Self-Hosting». `sidebar.securityBestPractices` = «Sicherheits-Best-Practices», while the page title is «Bewährte Sicherheitspraktiken».
- [new] App vs docs vocabulary for de: the shipped app uses «Tarif» for plan (about 61 hits vs about 17 «Plan»/«Pläne») and «Arbeitsbereich» for workspace (26 vs 1). The re-synced docs use Plan and Workspace. The docs need a recorded decision, or the app needs a harmonisation task.
- [known] Passphrase as encryption key vs access check (fr-2). de reproduces both statements faithfully (api/index.mdoc:60, share/index.md:83).
- [known] Secret Activity = «Nachrichtenaktivität» in the app (de-2). de pages are still split; see compare-plans.md:23.
- [known] index.mdoc hero "Setup your custom domain" (de-2, fr-2). de renders it correctly as «Benutzerdefinierte Domain einrichten».
- [known] self-hosting/index.md "one generated secret" (de-1). The "Running a single container" section of install/docker.md shows this is the `SECRET` value, so de «Secret-Schlüssel» (line 33) is the correct reading.
- [known] branding.md SVG vs app hint (it-1). The de app hints also say «PNG, JPG oder SVG» (web.branding.*).
- [known] Hard-coded English corner and font option names (nl-1). de translated them anyway (branding.md:66–67).
- [known] Correction to sv-1: DeliveryPanel.vue:73–96 renders web.branding.delivery_reveal_instructions / delivery_before_reveal / delivery_after_reveal ("Reveal instructions", "Before reveal", "After reveal"), and SimpleBrandPanel.vue:218 renders web.branding.corners ("Corners"). The English labels match the app. The "Pre-reveal Instructions" keys are not what the Delivery tab shows.
- [known] "Unlimited" vs "no fixed limit" for custom domains (sv-2). de follows the English («Unbegrenzt» / «keine feste Obergrenze»).
- [known] share/index.md "Preferences" link target (sv-2).

## Not checked

- No build or `pnpm` checks were run (this was a read-only review). The anchors suggested above come from the existing `dist/de/` output.
- Plan limits and prices were not re-verified against `billing.yaml.txt`. The de numbers match the English pages one for one.
- The user-menu path to **Domains** and the order of the domain-detail screens were not checked against the running app, only against the locale strings and Vue sources cited above.
