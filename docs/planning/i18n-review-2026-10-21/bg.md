# Bulgarian (bg) translation review

- Commit: 908c2faa — 17 pages
- English base: HEAD d30489ac
- Register expected: formal вие (app governance `register.form: formal`, `rule.bg-register-formal`; docs `_language-notes.md` does not cover register); observed: consistent (lowercase вие/ви/ваш in mid-sentence; no ти, твой or 2nd-singular forms in prose; singular imperatives appear only in quoted app button labels)
- Findings: 0 critical, 5 major, 38 minor

## Verdict

The translation is accurate. Every security statement matches the English: one reveal and then deletion, the passphrase as an access check (and, in api/index, the encryption claim, which also comes from the English), receipt lifetime, burn, and expiry. Glossary terms are stable across all 17 pages: тайна, тайна връзка, ключова фраза, парола, разписка, изтриване (burn) and разкриване. Markup, code blocks and links are intact.

All 5 major findings are UI labels on the branding and setup-guide pages that do not match the current shipped bg app. The translating agents took labels from an older app bundle, which does not have the newer branding and add-domain strings. The minor findings are mostly terminology splits between the two translation shards ("lifetime", "workspace", branding vs марка, audit logs), plus a few calques («билет» for "ticket", «живее» for "lasts").

The locale can ship once the 5 label rows are fixed. The minor findings can be fixed in one terminology pass.

## Findings

### account/change-your-region.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | terminology | 74, 80 | «тайната запазва срока на живот», «живеят два пъти по-дълго» | "Lifetime"/"last twice as long" are calqued as "life"/"live". The shard-1 pages use «срок на валидност». | «запазва срока на валидност», «са достъпни два пъти по-дълго» |
| minor | typography | 90 | «можете да преместите домейна без да чакате» | Bulgarian punctuation requires a comma before «без да». | «можете да преместите домейна, без да чакате» |
| minor | terminology | 95–96 | «изисквания за местоположение на данните» | "Data residency" is «резидентност на данните» on security/data-protection.md:41 and security/index.md:4. | «изисквания за резидентност на данните» |

### api/client-libraries.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | fluency | 37, 76, 311 | «API v1 (остарял)», «остарелия v1 API» … «като скриптово API» | The gender of "API" switches from masculine to neuter within the page. api/index.mdoc uses masculine throughout. | «като скриптов API» |

### api/index.mdoc

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | fluency | 7 | «в журнал, билет или история на чат» | «билет» is a travel or event ticket. A support ticket is «тикет» (or «заявка»). | «в журнал, тикет или история на чат» |
| minor | terminology | 45, 49 | «по-кратък максимален срок на живот», «тайна, която живее един час» | Same lifetime calque as on change-your-region. | «по-кратък максимален срок на валидност», «тайна, валидна един час» |
| minor | fluency | 4 | «официалните и общностните клиентски библиотеки» | «общностни» is an unusual adjective. The body uses «библиотеките от общността». | «официалните клиентски библиотеки и тези от общността» |

### custom-domains/branding.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| major | UI label | 35, 41, 49, 54 | «**Замени**» | The shipped button is «Замяна» (`web.branding.replace_logo`, `web.branding.replace_favicon`). | «**Замяна**» |
| major | UI label | 37, 41–42 | «**Запази логото**», «**Премахни логото**» | The shipped labels are «Запазване на логото» (`web.branding.logo_modal_save`) and «Премахване на логото» (`web.branding.remove_logo`). | «**Запазване на логото**», «**Премахване на логото**» |
| major | UI label | 49–55 | «под **Favicon**», «**Качи favicon**», «**Запази favicon**», «**Обнови favicon от домейна**», «**Премахни favicon**» | The shipped labels use «Икона»: «Икона», «Качване на икона», «Запазване на икона», «Опресняване на икона от домейна», «Премахване на икона» (`web.branding.favicon`, `upload_favicon`, `favicon_modal_save`, `refresh_favicon`, `remove_favicon`). | Use the shipped strings. «favicon» can stay in running prose. |
| minor | terminology | 17 | «[Настройване на потребителски домейн]» | The target page is titled «Настройка на потребителски домейн», and change-your-region.md:70 uses that title. | «[Настройка на потребителски домейн]» |

### custom-domains/index.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | terminology | 28, 43, 64 | «[Марка](/bg/custom-domains/branding)», «марка, начална страница», «[Марка на домейна ви]» | English says "Branding" and "Branding your domain", but «Марка» means "Brand". The target page title is «Брандиране на вашия домейн», and the app entitlement is «Персонализирано брандиране». | «[Брандиране]», «брандиране, начална страница», «[Брандиране на вашия домейн]» |
| minor | terminology | 28 | «инструкции при разкриване» | The app label and branding.md use «Инструкции за разкриване». | «инструкции за разкриване» |
| minor | link | 55 | «(/en/account/change-your-region#moving-a-custom-domain)» | The bg page exists, so this link sends bg readers to English. | Link the `/bg/` page and its generated heading anchor («Преместване на потребителски домейн»); check the slug after a build. |
| minor | fluency | 72 | «Поддържайте двата DNS записа на място» | Calque of "keep … in place". | «Запазете двата DNS записа» |

### custom-domains/setup-guide.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| major | UI label | 26 | «В **Персонализиран домейн** въведете адреса» | DomainForm.vue renders `web.domains.add.field_label`, which ships as «Потребителски домейн». «Персонализиран домейн» is a different string (`web.domains.custom_domain`). | «В **Потребителски домейн** въведете адреса» |
| major | UI label | 29 | «**Използвай основния ми домейн**» | Shipped `web.domains.add.root_domain_label` = «Използвай моя основен домейн». | «**Използвай моя основен домейн**» |
| minor | UI label | 108 | «собствената страница на домейна показва **Активен**» | The status shown comes from `web.STATUS.active` (via useDomainStatus.ts), which ships as «Активна». The difference is gender only. | «показва **Активна**» |
| minor | link | 11, 35 | «/en/custom-domains#what-each-plan-includes», «/en/custom-domains#where-your-domain-is-served» | The bg page exists, so these links send bg readers to English. | Link `/bg/custom-domains` with the anchors for «Какво включва всеки план» and «Къде се обслужва домейнът ви»; check the slugs after a build. |

### index.mdoc

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | terminology | 24, 28 | «## Марка и екипи», «DNS валидиране, марка и страница» | "Branding" again rendered as «марка». The hero tagline on the same page says «брандирано». | «## Брандиране и екипи», «DNS валидиране, брандиране и страница» |
| minor | UI label | 29 | «преглеждайте Активността на тайните» | The page title ships as «Активност на тайни» (`web.organizations.audit.title`). A capitalised label with an article attached reads oddly. The same «Активност на тайните» form appears in pricing/compare-plans.md:23, pricing/index.md:50 and share/why-secret-links.md:63. | «преглеждайте „Активност на тайни“» |
| minor | terminology | 44 | «обратно прокси» | self-hosting/index.md:44 uses masculine «Обратен прокси». | «обратен прокси» |
| minor | fluency | 37 | «официални и общностни SDK» | Same unusual adjective as on api/index.mdoc. | «официални SDK и такива от общността» |

### pricing/compare-plans.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | terminology | 45 | «Брандиране на работната област» | "Workspace" is «работно пространство» on the shard-2 pages and in app navigation (`web.layout.workspace`, `web.footer.workspace`). | «Брандиране на работното пространство» |
| minor | terminology | 23 | «(одитни дневници)» | The app entitlement is «Одитни логове» (`web.billing.features.audit_logs`). | «(одитни логове)» |

### pricing/index.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | terminology | 32, 63 | «Персонализирана марка и подател на имейли», «добавят марка» | English says "Custom branding". compare-plans.md:15 and the app (`web.billing.features.custom_branding`) use «Персонализирано брандиране». | «Персонализирано брандиране и подател на имейли», «добавят брандиране» |
| minor | terminology | 19, 35, 63 | «със срок на живот до 14 дни», «Срок на живот на тайните до 30 дни» | Lifetime split again. compare-plans.md:24 has «Срок на валидност на тайната» for the same row. | «срок на валидност» |
| minor | fluency | 74 | «отворете issue в GitHub», «никога като публичен issue» | The English noun "issue" is left in prose. | «отворете заявка (issue) в GitHub», «никога като публична заявка» |

### security/best-practices.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | spelling | 53 | «Използвайте ефимерни среди», «за ефимерни случаи» | Misspelling: the Bulgarian word is «ефемерен». | «ефемерни» (both occurrences) |

### security/data-protection.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | accuracy | 49–50 | «**Сертификати, споразумения за обработка на данни…**», «относно сертификати» | English "Certifications" means compliance attestations. «Сертификати» is the same word this page uses for SSL/TLS certificates (line 23). | «**Сертифициране, споразумения…**», «относно сертифициране» |

### security/vulnerability-disclosure.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | fluency | 7 | «Приемаме сигурността на Onetime Secret сериозно» | Calque of "take … seriously". pricing/index.md:69 uses the idiomatic form. | «Отнасяме се сериозно към сигурността на Onetime Secret» |
| minor | fluency | 23 | «екранни снимки или журнали» | The plural «журнали» reads as "magazines". The app uses «логове». | «екранни снимки или логове» |

### self-hosting/index.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | frontmatter | 5–6 | «sidebar: order: 1» | This key is not in the English frontmatter; it was carried over from the old bg page. It is the only frontmatter key that diverges in the locale. | Remove the key |
| minor | accuracy | 32 | «стартира екземпляр на порт 3000 с една генерирана тайна» | Follows the ambiguous English (known issue). The generated value is the `SECRET` key from the docker run example. «тайна» is the locale's word for a shared secret, so it locks in the wrong reading. | Once the English is clarified: «с един генериран ключ `SECRET`» |
| minor | fluency | 18 | «`simple` е доставяният по подразбиране режим» | Calque of "shipped default". | «`simple` е режимът по подразбиране» |

### share/index.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | fluency | 67–68 | «Добавянето на ключова фраза изисква да предостави и връзката, и ключовата фраза» | The object is missing (English: "requires them to supply"). | «…изисква от него да предостави и връзката, и ключовата фраза» |
| minor | fluency | 87 | «в чата, билета или имейла си» | «билет» used for "ticket". | «в чата, тикета или имейла си» |
| minor | fluency | 136–137 | «тя остава подчинена на избраното ѝ изтичане» | Calque of "remains subject to its chosen expiry". | «тя ще изтече в избрания срок» |
| minor | terminology | 4, 61, 144 | «срока ѝ на живот», «Разписката живее два пъти по-дълго», «срок на живот» | Lifetime split and "lives" calque. | «срока ѝ на валидност», «Разписката е достъпна два пъти по-дълго», «срок на валидност» |

### share/why-secret-links.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | fluency | 4, 15 | «имейл, чат или билети», «чат или билет» | «билет» used for "ticket". | «тикети», «тикет» |
| minor | accuracy | 47 | «Всеки с активна връзка и изискваната ключова фраза» | English says "any required passphrase". The translation reads as if a passphrase is always required. | «Всеки с активна връзка и ключовата фраза, ако се изисква такава,» |
| minor | terminology | 50 | «лицензен ключ» | share/use-cases.md:33 has «лицензионен ключ». | «лицензионен ключ» |
| minor | terminology | 21 | «Изберете ограничен срок на живот» | Lifetime split. | «Изберете ограничен срок на валидност» |

## Clean pages

- security/index.md, share/use-cases.md

## Terminology consistency

| English term | Renderings found (pages) | Expected (source) | Action |
|---|---|---|---|
| lifetime (secret) | срок на живот / живее (account/change-your-region, api/index, pricing/index, share/index, share/why-secret-links); срок на валидност (pricing/compare-plans, security/best-practices, security/data-protection, security/index, share/use-cases) | No app string. срок на валидност is the majority (9 vs 7) and was the shard-1 choice | Change the shard-2 pages to срок на валидност |
| workspace | работно пространство (account/change-your-region, index.mdoc); работна област (pricing/compare-plans:45) | работно пространство (app `web.layout.workspace`, `web.footer.workspace`; one app string, `web.organizations.organization`, still says Работна област) | Fix compare-plans |
| branding (feature) | брандиране (custom-domains/branding, pricing/compare-plans, self-hosting, index.mdoc hero); марка (custom-domains/index, index.mdoc body, pricing/index) | Персонализирано брандиране (app `web.billing.features.custom_branding`); Марка only for the Brand tab (`web.branding.tab_brand`) | Use брандиране for the feature |
| audit logs | одитни дневници (pricing/compare-plans:23) | Одитни логове (app `web.billing.features.audit_logs`) | Fix |
| Secret Activity | Активност на тайните (index.mdoc, pricing/compare-plans, pricing/index, share/why-secret-links) | Активност на тайни (`web.organizations.audit.title`) | Align with the app |
| ticket | билет (api/index, share/index, share/why-secret-links) | тикет | Fix |
| reverse proxy | обратно прокси (index.mdoc:44); Обратен прокси (self-hosting/index:44) | one form | Use обратен прокси |
| data residency | местоположение на данните (account/change-your-region:95); резидентност (на данните) (security/data-protection, security/index) | резидентност на данните (shard-1 choice) | Fix change-your-region |
| license key | лицензионен ключ (share/use-cases); лицензен ключ (share/why-secret-links) | лицензионен ключ | Fix why-secret-links |
| log | журнал (api/index, self-hosting/index, security/vulnerability-disclosure) | App uses логове | Optional; at least fix the plural журнали |
| Setting up a custom domain (link text) | Настройка (title, account/change-your-region:70); Настройване (custom-domains/branding:17) | Page title | Fix branding |
| secret / secret link / passphrase / password / receipt / burn / reveal / custom domain / region / self-hosting | тайна / тайна връзка / ключова фраза / парола / разписка / изтриване, изтрий / разкриване / потребителски домейн / регион / самостоятелно хостване: consistent on all pages | docs glossary + app governance | None |

## App UI label mismatches

| Page:line | Docs text | Shipped app string (key) | Note |
|---|---|---|---|
| custom-domains/branding.md:35, 41, 49, 54 | Замени | Замяна (`web.branding.replace_logo`, `web.branding.replace_favicon`) | Docs use the imperative; the app uses a verbal noun |
| custom-domains/branding.md:37 | Запази логото | Запазване на логото (`web.branding.logo_modal_save`) | |
| custom-domains/branding.md:41–42 | Премахни логото | Премахване на логото (`web.branding.remove_logo`) | |
| custom-domains/branding.md:49 | Favicon (field heading) | Икона (`web.branding.favicon`) | |
| custom-domains/branding.md:49 | Качи favicon | Качване на икона (`web.branding.upload_favicon`) | |
| custom-domains/branding.md:50–51 | Запази favicon | Запазване на икона (`web.branding.favicon_modal_save`) | |
| custom-domains/branding.md:52–53 | Обнови favicon от домейна | Опресняване на икона от домейна (`web.branding.refresh_favicon`) | |
| custom-domains/branding.md:54–55 | Премахни favicon | Премахване на икона (`web.branding.remove_favicon`) | |
| custom-domains/setup-guide.md:26 | Персонализиран домейн | Потребителски домейн (`web.domains.add.field_label`) | Docs quote `web.domains.custom_domain`, which is not the field label |
| custom-domains/setup-guide.md:29 | Използвай основния ми домейн | Използвай моя основен домейн (`web.domains.add.root_domain_label`) | |
| custom-domains/setup-guide.md:108 | Активен | Активна (`web.STATUS.active`) | Gender only |
| index.mdoc:29 (also pricing/compare-plans:23, pricing/index:50, share/why-secret-links:63) | Активност(та) на тайните | Активност на тайни (`web.organizations.audit.title`) | |

All other quoted labels match the shipped bg app at 145c1e7cfa:

- Branding page: Домейни, Управление, Функции, Управление на марката, Марка, Доставка, Лого, Качи лого, Лого на домейна, Актуализиране, Цвят на марката, Ъгли, Шрифт, Език, Инструкции за разкриване, Преди/След разкриване.
- Setup guide: Добави домейн, Популярни поддомейни, Продължи с, Потвърди домейна, Статус на домейна and its fields, Домейнът е потвърден и активен.
- Share page: Остани на страницата, Изтича след, Натиснете за разкриване, Нова/Прегледана/Разкрита, «Не сте предоставили нищо за споделяне».
- The corner and font option names stay in English, which is correct: the app hard-codes them in brand-helpers.ts.

## English source and general issues

- [new] Process (likely affects every locale): the bg agents took shipped UI strings from `$DOCKER/locales/content/bg/`. That bundle predates `web.branding.replace_logo`, `upload_favicon`, `web.domains.add.field_label`, `add.root_domain_label` and other keys that `$APP` (145c1e7cfa, the commit the English `sourceOfTruth` cites) now ships. Check branding.md and setup-guide.md label quotes in the other locales against `$APP`.
- [new] bg app strings (app repo, not docs): `web.branding.favicon_modal_hint` bg = «Favicon», where the English is "ICO or PNG. Up to 256KB. Replaces the auto-fetched icon.". `web.branding.favicon_field_hint` bg = «ICO, PNG или SVG…», which adds SVG; the English and branding.md say ICO or PNG only.
- [new] bg app SSO naming is split: «Единно влизане» (`web.domains.sso.title`, `signin.method_sso`) vs «Единично влизане (SSO)» (`web.auth.connections.section_title`). The docs consistently use «Единно влизане (SSO)».
- [new] Sidebar bundle `src/content/i18n/bg.json` diverges from the re-synced bg page titles:
  - `customDomains` «Персонализирани домейни» vs «Потребителски домейни»
  - `selfHosting` «Самостоятелен хостинг» vs «Самостоятелно хостване»
  - `comparePlans` «Сравняване на планове» vs «Сравнение на плановете»
  - `brandGuide` «Ръководство за брандинг» vs «Брандиране на вашия домейн»
  - `regionNZ` «Нова Зеландия (NZ)» vs «Аотеароа Нова Зеландия» (setup-guide.md:80)

  This is the same pattern as the known mi/ja/zh-cn sidebar item.
- [new] Docs glossary vs app: the docs glossary binds custom domain → «потребителски домейн», and all 17 pages follow it. The bg app uses «Персонализиран(и) домейн(и)» in most domain strings but «Потребителски домейн» for the add-domain field label. Pick one upstream.
- [new] security/best-practices.md:16: "if one secret is compromised, the entire set of information remains protected". The compromised part is not protected; the intended meaning is that the rest of the set stays protected.
- [known] api/index.mdoc passphrase "used to encrypt the value" vs share/index.md and share/why-secret-links.md "access check" (fr-2). bg reproduces both statements faithfully.
- [known] self-hosting/index.md "one generated secret" ambiguity (de-1). In bg this produced «една генерирана тайна»; see the finding above.
- [known] share/index.md empty-submission error has a trailing period; shipped bg «Не сте предоставили нищо за споделяне» has none (da-2).
- [known] pricing/index.md "Self-Hosting Guide" link text vs the "Self-hosting overview" title (es-2). bg reproduces it as «Ръководството за самостоятелно хостване» vs «Преглед на самостоятелното хостване».
- [known] Locale readers sent to /en/ for pages missing from the bg tree (fr-1).

## Resolution (fix round, 2026-10-21)

Fixed 42 of the 43 findings (5 major, 37 minor) and 4 of the 5 sidebar items. Skipped 1 finding and 1 sidebar item. Shipped labels were checked against `$APP/locales/content/bg` at 145c1e7cfa and their components (BrandLogoField.vue, BrandFaviconField.vue, ImageUploadModal.vue, DomainForm.vue, DomainHeader.vue via useDomainStatus.ts).

| Commit | Subject |
|---|---|
| 51c8f94c | docs(i18n/bg): match branding labels to the shipped app |
| 416efff5 | docs(i18n/bg): match add-domain labels to the shipped app |
| 1c1a327b | docs(i18n/bg): match the Secret Activity label to the shipped app |
| 17426e3e | docs(i18n/bg): correct mistranslations in three pages |
| 42390f3d | docs(i18n/bg): use consistent terms for lifetime, branding and ticket |
| 361519f9 | docs(i18n/bg): link to Bulgarian pages that exist |
| 0f13a9c3 | docs(i18n/bg): fix fluency and typography |
| b2103706 | docs(i18n/bg): align sidebar labels with page titles |

Notes on the fixes:

- account/change-your-region.md:77–78 had a third «срок на живот» that the finding did not list. It now reads «срок на валидност» like lines 74 and 80.
- share/why-secret-links.md:47 now reads «евентуално изискваната ключова фраза» instead of the suggested «ключовата фраза, ако се изисква такава». The suggested reordering failed `dogfood.py check`; the meaning ("any required passphrase") is the same.
- self-hosting/index.md:32 now reads «с един генериран ключ `SECRET`» before the English is clarified, because install/docker.md shows the generated value is the `SECRET` variable.
- index.mdoc:37 now reads «официални и създадени от общността SDK». The suggested «официални SDK и такива от общността» failed `dogfood.py check`.
- api/index.mdoc:4 now reads «официалните клиентски библиотеки и тези от общността».
- The sidebar `brandGuide` label is «Брандиране», which mirrors the English sidebar label "Branding" rather than the full page title.
- The three `/bg/` heading anchors were checked in the built `dist/bg/` pages: `какво-включва-всеки-план`, `къде-се-обслужва-домейнът-ви` and `преместване-на-потребителски-домейн`.

### Skipped findings

| Page:line | Finding | Reason |
|---|---|---|
| custom-domains/setup-guide.md:108 | «**Активен**» → «**Активна**» (`web.STATUS.active`) | `dogfood.py check` fails whenever this edit and the major line-29 fix («Използвай моя основен домейн») are both in the file. `correspondence()` treats the one deleted legacy «е» of «Активен» and the one inserted «е» of «основен» as a moved block, then reports "marked unchanged legacy text" at 29:25. Each edit passes alone, and 4 alternative wordings failed the same way. The label differs only in gender and is still findable. |
| src/content/i18n/bg.json `regionNZ` | «Нова Зеландия (NZ)» vs «Аотеароа Нова Зеландия» | The key is missing from `en.json` and `config/sidebar.mjs` does not use it, so the value is never rendered. AGENTS.md says not to clean up unused keys in passing. |

### Decisions needed

- TextProv: `tools/dogfood.py` `correspondence()` pairs single-cluster gaps with the same text across distant lines (the `old_gaps`/`new_gaps` move heuristic). This blocks setup-guide.md:108. Either limit move pairing to blocks longer than one cluster, or have a human make the one-word edit «Активен» → «Активна».
- English source: self-hosting/index.md "brings up an instance on port 3000 with one generated secret" (known de-1). bg now says «ключ `SECRET`». The English should say "a generated `SECRET` key" (or similar) so the locales stay aligned.
- Docs glossary (bg) is silent on these terms. Proposed rows, all now consistent across the 17 bg pages: lifetime → «срок на валидност»; ticket → «тикет»; branding (feature) → «брандиране» («Марка» only for the Brand tab); workspace → «работно пространство»; audit logs → «одитни логове»; data residency → «резидентност на данните»; reverse proxy → «обратен прокси»; license key → «лицензионен ключ».
- Docs glossary vs app: custom domain is «потребителски домейн» (docs glossary, add-domain field `web.domains.add.field_label`) vs «персонализиран домейн» (most other app domain strings, e.g. `web.domains.custom_domain`). Pick one upstream.
- bg app strings (app repo):
  - `web.branding.favicon_modal_hint` = «Favicon», but the English is a usage hint.
  - `web.branding.favicon_field_hint` adds SVG.
  - Button grammar is mixed: `web.branding.upload_logo` = «Качи лого» (imperative) vs `upload_favicon` = «Качване на икона» (verbal noun).
  - Audit logs appear as both «Одитни логове» (`web.billing.features.audit_logs`) and «одитни журнали» (`web.organizations.audit.upgrade_prompt`).
  - SSO appears as both «Единно влизане» and «Единично влизане (SSO)».
- Sidebar bundle: `nav.ariaLabel.selfHosting` still reads «Документация за самостоятелен хостинг». The report did not flag it, so it was left as is; «самостоятелно хостване» would match the visible label.
- «журнал» for "log" remains on api/index.mdoc:7 and self-hosting/index.md:9, 112 (the review marks it optional). Unifying it on «логове» would follow the app.
