# Māori (mi) translation review

- Commit: 4f5b2724 — 18 pages
- English base: HEAD d30489ac
- Register expected: singular *koe* with *tō/ō/tāu/āu* (`_language-notes.md`; app governance `rule.mi_NZ-register-number`), company voice *mātou*; observed: consistent. The only *koutou* (pricing/index.md:73) is the reader addressing the company in the FAQ, which is correct.
- Findings: 0 critical, 14 major, 40 minor

## Verdict

Core terms are consistent across all 18 pages and match the glossary: karere huna, kupu karapa/kupuhipa, whakawareware, whakaatu, rihīti and hononga. Macrons are applied carefully. Code blocks, numbers, hostnames, IPs and CLI flags are preserved. There are three main problem groups. First, UI labels were taken from an outdated app bundle, so the branding page tells readers to look for English labels (and setup-guide gives two wrong Māori labels) that the current mi_NZ app shows differently. Second, three sentences change meaning: "never terminates TLS", "one generated secret" and "its own maximum lifetime". Third, *rohe* means both region and domain, which makes the custom-domain move procedure in change-your-region ambiguous. The locale can ship once the 14 major findings are fixed.

## Findings

### account/change-your-region.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| major | terminology | 70, 75, 76, 85 (vs 20, 79) | «i waihangatia i te rohe tawhito» | *rohe* means both region and domain. «te rohe tawhito» is "old region" at 20 and 79 but "old domain" at 70, 75, 76 and 85, so steps 4–5 of the move procedure are ambiguous. custom-domains/index.md resolves the same clash with *rohe-whenua*. | Use «te rohe ritenga tawhito» for the old domain (70, 75, 76, 85), or *rohe-whenua* for region throughout the page |
| minor | accuracy | 30 | «tērā pea e kore e mana tonu» | EN "may not take effect immediately". *mana tonu* can also mean "remain in effect". | «tērā pea kāore e mana i taua wā tonu» |

### api/client-libraries.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | fluency | 12 | «Ko ngā mea katoa atu i tēnei whārangi» | Reads as "everything other than this page" (EN "Everything else on this page") | «Ko ērā atu mea katoa i tēnei whārangi» |
| minor | fluency | 13 | «Ko te nuinga o ēnei pātaka i mua i te API v2» | *nō* is missing ("predate"); line 99 has it correctly | «Nō mua i te API v2 te nuinga o ēnei pātaka» |

### api/index.mdoc

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | terminology | 27, 79 | «kia mahi tonu ai tō hononga» / «me whakamahi ngā hononga hou i te v2» | "integration" is translated as *hononga*, the bound term for "link". Line 79 reads "new links should use v2". | «tō pāhekoheko» / «ngā pāhekoheko hou» |
| minor | accuracy | 95 | «whakahaerehia te taupānga ā-rohe» | EN "run the application locally". *ā-rohe* means "regional" on this site (*pae ā-rohe*). | «whakahaerehia te taupānga ki tō ake rorohiko» |

### custom-domains/branding.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| major | UI label | 30, 35, 62, 76 | «ko **Brand** me **Delivery**» | The tabs ship in mi_NZ: `web.branding.tab_brand` "Waitohu", `tab_delivery` "Tuku" (DomainBrand.vue:84-85) | «ko **Waitohu** me **Tuku**» |
| major | UI label | 36-38, 43-44 | «**Replace**», «**Domain logo**», «**Save logo**», «**Remove logo**» | Shipped mi_NZ strings: Whakakapi / Tohu rohe / Tiaki tohu / Tango tohu (`replace_logo`, `logo_modal_title`, `logo_modal_save`, `remove_logo`) | Use the shipped strings |
| major | UI label | 40, 71, 87 | «**Update**» | The save button is `web.LABELS.update` "Whakahou" (DomainHeader.vue:47) | «**Whakahou**» |
| major | UI label | 51-57 | «**Upload favicon**», «**Save favicon**», «**Refresh favicon from domain**», «**Remove favicon**» | Shipped: Tukuake favicon / Tiaki favicon / Whakahou favicon mai i te rohe / Tangohia favicon | Use the shipped strings (Replace → Whakakapi, as above) |
| major | UI label | 67 | «**Corners**» | `web.branding.corners` "Ngā Koki" (SimpleBrandPanel.vue:218). The option names Square/Rounded/Extra Rounded are hard-coded in English and can stay. | «**Ngā Koki**» |
| major | UI label | 82-83 | «**Reveal instructions**», «**Before reveal**», «**After reveal**» | Shipped: Tohutohu whakaatu / I mua i te whakaatu / I muri i te whakaatu (DeliveryPanel.vue:73-96) | Use the shipped strings |
| minor | UI label | 35 | «i raro i **Moko**» | The section heading is `web.branding.logo` "Tohu" (BrandLogoField.vue:37). The button «Tukuake moko» is correct, so readers can still find the control. | «i raro i **Tohu**» |
| minor | grammar | 48 | «Ki te kore he favicon āu ake» | Plural possessive used for a single favicon | «he favicon tāu ake» |
| minor | typography | 48 | «i tikina mai» | The passive of *tiki* is *tīkina*, as on api/index.mdoc:4 and share/index.md:92 | «i tīkina mai» |
| minor | accuracy | 71, 80 | «Ka wātea noa te pātene», «Ka puta noa tēnei kāri» | EN "only" is translated as *noa* ("just/freely") | «Ka wātea anake…», «Ka puta anake…» |
| minor | accuracy | 94 | «mō te rā kotahi pea» | EN "for up to a day"; *pea* means "perhaps" | «tae atu ki te kotahi rā» |

### custom-domains/index.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | terminology | 34 | «Whakatairite i ngā mahere» | The page title and sidebar use «Whakataurite mahere». pricing/index.md:63 has the same split. | «Whakataurite mahere» |

### custom-domains/setup-guide.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| major | UI label | 28 | «**Whakamahia tōku rohe pūtake**» | Shipped `web.domains.add.root_domain_label` is "Whakamahia taku rohe pakiaka" (DomainForm.vue:288) | «**Whakamahia taku rohe pakiaka**» |
| major | UI label | 45 | «**Kaihautū:**» | The verification page labels this field with `web.COMMON.host`, which ships as "Kaiwhakahaere" (VerifyDomainDetails.vue:163). The docs term is better and the app string is the defect (see general issues). | Fix the app string, or write «**Kaihautū** (i te taupānga: *Kaiwhakahaere*)» until then |
| minor | UI label | 29 | «**Haere tonu mā** _tō rohe_» | Shipped `web.domains.add.continue_with` is "Haere tonu me {0}" | «**Haere tonu me** _tō rohe_» |
| minor | UI label | 122 | «**I rahua te arowhai manatoko whakamutunga**» | Shipped `web.domains.last_check_failed` is "I rahua te manatoko whakamutunga" (one fewer word) | Use the shipped string |
| minor | terminology | 49, 52 | «te rohe-raraunga o te rohe pūtake» | "DNS zone" is *rohe-raraunga*, while line 32 uses «rohe raraunga» for (data) region. The same words carry two meanings on one page. | «te zone DNS o te rohe pūtake», or another term distinct from region |
| minor | terminology | 61 | «Ka tāruatia te manatoko i muri» | *tārua* is the locale's term for "copy", so this reads "verification is copied afterwards". "in the background" is lost. | «Ka mahia anō te manatoko i te papamuri» |
| minor | fluency | 50 | «he waehere hekehātene 32-pūāhua» | *hekehātene* is not an established word | «he waehere ā-tekau-mā-ono (hexadecimal), 32 ōna pūāhua» |
| minor | fluency | 105-106 | «me te tīpako **Kua manatokohia…**» | *tīpako* means "select"; EN "tooltip" | «me te kōrero āwhina **…**» |
| minor | fluency | 127-128 | «kōwhiria te rohe e waihanga ana koe i raro» | Literal calque of "the domain you are creating under" | «kōwhiria te rohe hei waihanga i te karere huna» |

### pricing/compare-plans.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| major | accuracy | 45 | «ngā tāhua īmēra» | EN "email templates". *tāhua* means fund/sum of money (*tahua* means menu). Template is *tauira*. | «ngā tauira īmēra» |
| minor | terminology | 11 | «Mutunga kore» | custom-domains/index.md:26 and pricing/index.md:31 use «kore-mutunga» | Use one form |
| minor | terminology | 15 | «(tohu, tae)» | "logo" is *moko* on branding.md and custom-domains/index.md:28 | Align with the term chosen for branding.md |

### pricing/index.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| major | product | 16 | «Ka kīia e te taupānga me ēnei tuhinga ko **Free**.» | The mi_NZ app shows this plan as "Kore Utu" (`web.billing.plans.free_plan`; UserMenu.vue:688, BillingOverview.vue:62), so the sentence is false for mi readers | «Ka kīia e ēnei tuhinga ko **Free**; ko **Kore Utu** tōna ingoa i te taupānga.», or lock "Free" in the app (see general issues) |
| minor | terminology | 48 | «te papatohu tiri» | compare-plans.md:22 has «papatohu tohatoha» | «te papatohu tohatoha» |
| minor | fluency | 69 | «i ngā āheinga maha» | EN "measures"; *āheinga* means "abilities" | «i ngā whakaritenga maha» |
| minor | fluency | 71 | «tōna haumaru tino» | The intensifier goes before the word | «tōna tino haumaru» |

### security/best-practices.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | accuracy | 47, 49 | «Te haumaru manaaki-ā-kiri mātāmua» | *mātāmua* means first/eldest/primary, not "advanced" | «Te haumaru manaaki-ā-kiri taumata teitei» |
| minor | fluency | 72 | «ō āheinga haumaru» | EN "security measures" (same word issue as pricing/index.md:69) | «ō whakaritenga haumaru» |

### security/data-protection.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | terminology | 9 | «tō ake hōtaka ūnga» | *hōtaka* means a software or broadcast programme; EN "compliance program" refers to an organisational effort | «tō ake kaupapa ūnga» |

### security/vulnerability-disclosure.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | grammar | 30-32 | «E tono ana mātou kia: … **Tukua mai he wā tika**» | *kia* is followed by imperative list items | «E tono ana mātou:» (keep the imperatives) |

### self-hosting/configuration.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | markup | 5-6 | «sidebar: / order: 4» | A stale frontmatter key carried over from the old page; EN has no `sidebar` key. It has no effect because config/sidebar.mjs is explicit. | Remove |

### self-hosting/index.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| major | accuracy | 44-45 | «kāore te taupānga e whakamutu i te TLS i ngā wā katoa» | EN "the application never terminates TLS". *kāore … i ngā wā katoa* means "not always", which implies the app sometimes terminates TLS. | «kāore rawa te taupānga e whakamutu i te TLS» |
| major | accuracy | 32 | «me tētahi karere huna kotahi i hangaia» | EN "one generated secret" is the `SECRET` app key (install/docker.md "Running a single container": `-e SECRET="$(cat .ots_secret)"`), not a shared *karere huna* | «me tētahi kī `SECRET` kotahi i hangaia» |
| minor | terminology | 35-36 | «Ngā āhua me ngā momo», «ngā āhua i whakaputaina» | Container "images" are translated as *āhua* (shape/form); best-practices.md:49,53 uses *atahanga* | «Ngā atahanga me ngā momo», «ngā atahanga i whakaputaina» |
| minor | grammar | 85 | «me noho kē rātou hei mema hohe» | EN singular "they" (one new owner) is translated with plural *rātou* | «me noho kē ia hei mema hohe» |
| minor | markup | 5-6 | «sidebar: / order: 1» | Stale frontmatter key, not in EN; no effect | Remove |

### share/index.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| major | accuracy | 52-53 | «He wā ora mōrahi ake tō te tohatoha ingoakore.» | EN "Anonymous sharing has its own maximum lifetime". *mōrahi ake* reads "a higher maximum", but the anonymous limit is shorter (7 days vs 14 on Free, compare-plans) | «He wā ora mōrahi motuhake tō te tohatoha ingoakore, he poto ake.» |
| minor | grammar | 69, 93, 105 | «e pau rānei i te karere huna», «…e uta noa ana i te whārangi e pau», «e pau i te whakaaturanga» | *pau* is stative; with an object it needs *whakapau* (as why-secret-links.md:31 has). Line 93 grammatically makes the mail scanner the thing consumed. | «e whakapau i te karere huna» (69, 93), «e whakapau i te whakaaturanga» (105) |
| minor | terminology | 70 | «ngā ngana hē e tāruatia ana» | *tārua* means copy; EN "repeated" | «ngā ngana hē auau» |
| minor | accuracy | 18, 103 | «i a koe e takiputa ana» | *takiputa* is the act of signing out; EN "while signed out" | «i a koe kāore i takiuru» |
| minor | fluency | 115 | «ka taea e te tangata e whai ana te whakawareware» | The object is missing (EN "someone with it") | «e te tangata e mau ana i te rihīti» |

### share/use-cases.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | typography | 3 (also security/best-practices.md:45,53,55; custom-domains/index.md:79; share/index.md:143; share/why-secret-links.md:64) | «Ngā keehi whakamahi» | Double-vowel spelling in a macron locale; the sidebar has "Kēhi Whakamahi" | «Ngā kēhi whakamahi» |
| minor | grammar | 36, 43 | «Me tiaki rātou i te kī … tō rātou raihana» | Singular "they" translated with plural *rātou* | «Me tiaki ia i te kī … tōna raihana» |
| minor | fluency | 31 | «ā, mō te roa» | EN "and for how long"; the phrase is incomplete | «ā, mō te pēhea te roa» |

### share/why-secret-links.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | accuracy | 21-22 | «me tētahi kupu karapa i whakaritea e koe» | EN "any passphrase you set" (optional); the translation reads as always required | «me te kupu karapa, mēnā i whakaritea e koe» |
| minor | terminology | 63, 65 | «Tukua tō karere huna tuatahi», «[Ngā kōwhiringa]» | The same targets are «Tukuna tō karere huna tuatahi» (share/index.md:11, use-cases.md:69) and «Manakohanga» (share/index.md:118) | Align with share/index.md |

## Clean pages

- index.mdoc
- security/index.md

## Terminology consistency

| English term | Renderings found (pages) | Expected (source) | Action |
|---|---|---|---|
| region | *rohe* (change-your-region, api/index, client-libraries, compare-plans, data-protection); *rohe-whenua* (custom-domains/index:50-55); *rohe raraunga* (setup-guide:32) | App uses *rohe*, the same word as domain; prior glossary allows *rohe-whenua* where domain also appears | Use *rohe-whenua* on pages that also discuss domains (change-your-region, setup-guide) |
| DNS zone | *rohe-raraunga* (setup-guide:49,52) | No glossary entry | Pick a term distinct from region |
| unlimited | *kore-mutunga* (custom-domains/index:26, pricing/index:31); *Mutunga kore* (compare-plans:11) | No glossary entry; the app uses both | Pick one |
| logo | *moko* (branding, custom-domains/index:28); *tohu* (compare-plans:15) | App: heading/modal "Tohu", upload button "Tukuake moko" | Follow the app heading (*tohu*) or record a decision |
| Compare plans (link text) | *Whakataurite mahere* (title, sidebar, change-your-region:76); *Whakatairite i ngā mahere* (custom-domains/index:34, pricing/index:63) | Sidebar `comparePlans` | *Whakataurite mahere* |
| deployment | *tukunga* (api/index:13, data-protection:49, self-hosting/index:65); *whakatakotoranga* (configuration:12,20,30, vulnerability-disclosure:50) | prior glossary: *whakatakotoranga* | *whakatakotoranga* |
| shared dashboard | *papatohu tohatoha* (compare-plans:22); *papatohu tiri* (pricing/index:48) | — | *papatohu tohatoha* |
| container image | *atahanga ipu* (best-practices); *āhua* (self-hosting/index:35-36) | prior glossary: *atahanga ipu* | *atahanga* |
| Next steps | *Ngā hipanga e whai ake nei* (use-cases:67; share/index:138 "hipanga"); *Ngā hīkoi e whai ake nei* (why-secret-links:61) | — | Pick one |
| Preferences (link text) | *Manakohanga* (share/index:118); *Ngā kōwhiringa* (why-secret-links:65) | App: `web.TITLES.preferences_settings` "Manakohanga"; settings nav `web.settings.preferences` "Ngā Hiahia" | *Manakohanga* |
| integration | *hononga* (api/index:27,79) | *hononga* is bound to "link" (governance glossary) | Use a distinct term, e.g. *pāhekoheko* |
| use cases | *keehi* (6 pages) | Sidebar "Kēhi Whakamahi" | *kēhi* |
| EU / US region names | *Uniana o Ūropi*, *Ngā Whenua o Amerika* (setup-guide:79,82, pricing/index:69) | Sidebar: "Kotahitanga o Ūropi", "Hononga o Amerika"; the app ships English names (`web.regions.jurisdictions.*.name`) | Decide on one set; the prior glossary flagged these for native review |

## App UI label mismatches

| Page:line | Docs text | Shipped app string (key) | Note |
|---|---|---|---|
| custom-domains/branding.md:30,35,62,76 | Brand / Delivery | Waitohu / Tuku (`web.branding.tab_brand`, `tab_delivery`) | Docs keep EN; mi string exists |
| custom-domains/branding.md:35 | Moko | Tohu (`web.branding.logo`) | Upload button is "Tukuake moko"; the app is inconsistent |
| custom-domains/branding.md:36,43,52,56 | Replace | Whakakapi (`web.branding.replace_logo`, `replace_favicon`) | |
| custom-domains/branding.md:37 | Domain logo | Tohu rohe (`web.branding.logo_modal_title`) | |
| custom-domains/branding.md:38 | Save logo | Tiaki tohu (`web.branding.logo_modal_save`) | |
| custom-domains/branding.md:43-44 | Remove logo | Tango tohu (`web.branding.remove_logo`) | |
| custom-domains/branding.md:40,71,87 | Update | Whakahou (`web.LABELS.update`) | |
| custom-domains/branding.md:51 | Upload favicon | Tukuake favicon (`web.branding.upload_favicon`) | |
| custom-domains/branding.md:53 | Save favicon | Tiaki favicon (`web.branding.favicon_modal_save`) | |
| custom-domains/branding.md:54-55 | Refresh favicon from domain | Whakahou favicon mai i te rohe (`web.branding.refresh_favicon`) | |
| custom-domains/branding.md:57 | Remove favicon | Tangohia favicon (`web.branding.remove_favicon`) | |
| custom-domains/branding.md:67 | Corners | Ngā Koki (`web.branding.corners`) | |
| custom-domains/branding.md:82 | Reveal instructions | Tohutohu whakaatu (`web.branding.delivery_reveal_instructions`) | |
| custom-domains/branding.md:83 | Before reveal / After reveal | I mua i te whakaatu / I muri i te whakaatu (`web.branding.delivery_before_reveal`, `delivery_after_reveal`) | |
| custom-domains/setup-guide.md:28 | Whakamahia tōku rohe pūtake | Whakamahia taku rohe pakiaka (`web.domains.add.root_domain_label`) | |
| custom-domains/setup-guide.md:29 | Haere tonu mā | Haere tonu me {0} (`web.domains.add.continue_with`) | |
| custom-domains/setup-guide.md:45 | Kaihautū | Kaiwhakahaere (`web.COMMON.host`) | The app string is wrong (it means "administrator"); fix it in the app |
| custom-domains/setup-guide.md:122 | I rahua te arowhai manatoko whakamutunga | I rahua te manatoko whakamutunga (`web.domains.last_check_failed`) | |
| pricing/index.md:16 | Free ("the app … calls it Free") | Kore Utu (`web.billing.plans.free_plan`) | See general issues |

All other labels match: Ngā Rohe, Whakahaere, Ngā Āhuatanga, Whakahaere Waitohu, Tukuake moko, Tae Waitohu, Whānau Momotuhi, Reo, Favicon, Tāpiri rohe, Rohe Ritenga, Ngā rohe-iti rongonui, Manatoko Rohe, Kua manatokohia kua hohe te rohe, Hohe, Tūnga Rohe, Wāhitau Whāinga, Tuhinga DNS, Tūnga SSL, Whakahou SSL, Aroturuki Whakamutunga, Uara, Noho ki te whārangi, Ka pau i roto i, Pāwhiri ki te whakaatu, Hou / Kua arokitea / Kua whakaatuhia, and the empty-submission error.

## English source and general issues

- [new] Translators used an outdated app bundle. The mi label policy ("shipped mi_NZ string, else EN verbatim") was applied against `$DOCKER/locales/content/mi_NZ/`, whose workspace-branding.json lacks `tab_brand`, `tab_delivery`, `delivery_*` and the logo/favicon action keys. Those keys have been in `$APP/locales/content/mi_NZ/` since 9099e9a6e0 (2026-07-13) and are used by the current components. Other locales whose agents used the docker bundle probably have the same gap on custom-domains/branding.md.
- [known] Update to the sv-1 branding-labels item: at app 145c1e7cfa the "Corners" label is `web.branding.corners` (SimpleBrandPanel.vue:218), not "Corner Style", and "Before reveal"/"After reveal" have keys (`delivery_before_reveal`, `delivery_after_reveal`, DeliveryPanel.vue:81,96). The English doc labels match the app; only the docker bundle lacked them.
- [new] pricing/index.md:19 — "The app and these docs call it **Free**." The mi_NZ app localises this plan name (`web.billing.plans.free_plan` = "Kore Utu"). brand-terms.md lists "Basic" as untranslated but not "Free". Decide whether Free is a locked tier name (then fix the app bundles) or reword the sentence for locales.
- [new] App mi_NZ `web.COMMON.host` = "Kaiwhakahaere" (administrator). It labels the TXT/CNAME Host field on the domain verification page (VerifyDomainDetails.vue:163,201; DomainDns.vue:101). `web.domains.host_0`/`host_1` = "Kaiwhakahari" is misspelled. This is an app-side fix.
- [new] App mi_NZ is internally inconsistent on "logo": `web.branding.logo` = "Tohu", `logo_modal_*` = "tohu", but `upload_logo` = "Tukuake moko" and `logo_controls` = "Ngā whakahaere moko".
- [new] App mi_NZ ships region names in English (`web.regions.jurisdictions.*.name`). The docs pages use Māori names, and the docs sidebar (mi.json `regionEU`, `regionUS`) uses a third set.
- [known] self-hosting/index.md "one generated secret" ambiguity. In mi it caused a mistranslation (rendered as a shared *karere huna*). install/docker.md confirms it is the `SECRET` key; clarifying the English would prevent this in other locales.
- [known] Passphrase contradiction between api/index.mdoc:61 ("used to encrypt the value") and share/index.md:75 ("not the encryption key"). mi follows each source faithfully.
- [known] Sidebar bundle mi.json diverges from re-synced page titles (Rohe Whakaritea, Hononga Muna, Aratohu Tohu, Whakatū Rānei, Kotahitanga o Ūropi, Hononga o Amerika).
- [known] custom-domains/setup-guide.md "no fixed limit" vs compare-plans.md "Unlimited". The split carries into mi (*Kāore he tepe pūmau* vs *Mutunga kore*/*kore-mutunga*).
- [known] account/change-your-region.md step 4 unwrapped source line; mi line 76 mirrors it.
- [known] index.mdoc "Setup your custom domain" and the "Configuration and upgrades" link text vs the "Self-hosting overview" title.

## Resolution (fix round, 2026-10-21)

All 54 findings were fixed (14 major, 40 minor), as were the "deployment" and "Next steps" rows of the terminology table and the four sidebar labels that are in use. Labels were checked against `$APP/locales/content/mi_NZ` at 145c1e7cfa. These fixes differ from the reviewer's suggested text:

- compare-plans.md:45 — «ngā tātauira īmēra», not «tauira». The app uses *tātauira* for template (`web.admin.emailtools.*`), and *tauira* already means "example" on these pages (*hei tauira*).
- share/index.md:52 — «He wā ora mōrahi motuhake», without «he poto ake». The English does not say the limit is shorter.
- share/index.md:18,103 — «i waihangatia me te kore e takiuru» ("created without signing in") instead of «i a koe kāore i takiuru». It avoids two consecutive *kāore* clauses.
- custom-domains/setup-guide.md:45 — «**Kaihautū** (ko **Kaiwhakahaere** te tapanga i te taupānga)». The docs term stays, and the shipped label is named so readers can find the field. Simplify it after the app fix below.
- custom-domains/setup-guide.md:49,52 — DNS zone is now «takiwā DNS». *takiwā* is not used for region or domain anywhere on the page.
- account/change-your-region.md — the old domain is now «te rohe ritenga (tawhito)» at lines 60, 70, 75, 76, 79, 82, 85 and 86, and region keeps *rohe*. This fixes the ambiguity without renaming region across the page or changing the title.
- pricing/index.md:16 — «Ka kīia e ēnei tuhinga ko **Free**; ka kīia e te taupānga ko **Free**, ko **Kore Utu** rānei.» The mi app shows both names: "Free" via `PLAN_LABELS` for organizations with `free_v1`, and "Kore Utu" (`web.billing.plans.free_plan`) in the user-menu chip and for organizations without a plan ID.
- compare-plans.md:15 — logo is «moko» in prose, because most pages already use it. Quoted UI labels on branding.md use the shipped *Tohu* strings.

| Commit | Subject |
|---|---|
| 5e82d663 | docs(i18n/mi): match branding labels to the shipped app |
| fbc1c60e | docs(i18n/mi): match domain setup labels to the shipped app |
| 75c99f22 | docs(i18n/mi): correct mistranslations across ten pages |
| 463009a7 | docs(i18n/mi): use consistent terms for domain, deployment and plans |
| 83ee4ca3 | docs(i18n/mi): fix fluency and typography |
| 7d477f99 | docs(i18n/mi): align sidebar labels with page titles |

### Skipped findings

| Page:line | Finding | Reason |
|---|---|---|
| setup-guide.md:79,82; pricing/index.md:69 (terminology table) | EU / US region names: decide on one set | The pages already agree with each other (*Uniana o Ūropi*, *Ngā Whenua o Amerika*). The differing sidebar keys `regionEU`/`regionUS` are not used by `config/sidebar.mjs`, so nothing visible conflicts. Choosing between the sets needs a native speaker (see below). |
| src/content/i18n/mi.json `secretLinks`, `regionEU`, `regionUS` | Sidebar divergence ([known] item) | No current sidebar entry uses these keys, and AGENTS.md says to keep unused keys. Only the keys in use were aligned: `customDomains`, `brandGuide`, `selfHosting`, `whyUseSecretLinks`. |

### Decisions needed

- App fix: mi_NZ `web.COMMON.host` = "Kaiwhakahaere" (administrator) labels the DNS Host field (VerifyDomainDetails.vue:163,201; DomainDns.vue:101). Change it to "Kaihautū", and correct the misspelled `web.domains.host_0`/`host_1` "Kaiwhakahari". Then simplify setup-guide.md:45 to «**Kaihautū:**».
- Plan name: decide whether "Free" is a locked tier name. If it is, set mi_NZ `web.billing.plans.free_plan` to "Free". If not, reword EN pricing/index.md:19 "The app and these docs call it **Free**" for locales that localize the label.
- App consistency: mi_NZ "logo" is "Tohu" (`web.branding.logo`, `logo_modal_*`, `remove_logo`) but "moko" (`upload_logo`, `logo_controls`). Pick one. The docs prose uses *moko*.
- Region names: a native speaker should choose between *Uniana o Ūropi* / *Ngā Whenua o Amerika* (docs pages) and *Kotahitanga o Ūropi* / *Hononga o Amerika* (unused sidebar keys). *Hononga* is the bound term for "link". The app ships English names.
- Glossary additions, which the docs glossary does not cover yet: integration → *pāhekoheko*; deployment → *whakatakotoranga*; container image → *atahanga (ipu)*; DNS zone → *takiwā DNS*; email template → *tātauira īmēra*; unlimited → *kore-mutunga*; use case → *kēhi whakamahi*; Next steps → *Ngā hipanga e whai ake nei*; logo (prose) → *moko*. Also: use *rohe ritenga* for a custom domain wherever the same passage also says *rohe* for region.
- English source ([known]): self-hosting/index.md "one generated secret" should name the `SECRET` key.
