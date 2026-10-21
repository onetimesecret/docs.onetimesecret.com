# Ukrainian (uk) translation review

- Commit: c14b0c6d — 18 pages
- English base: HEAD d30489ac
- Register expected: formal "ви" with -іть/-те plural imperatives (app governance `rule.uk-register-formal`; `_language-notes.md` "Звернення до користувача"); observed: consistent (no ти/твій forms; docs prose uses lowercase "ви/ваш" throughout, capitals only at sentence or list-item start)
- Findings: 0 critical, 6 major, 50 minor

## Verdict

The translation is accurate and complete. Code blocks are unchanged, plan names, limits, prices, hostnames and DNS targets are correct, and the security claims (one-time reveal, burn, passphrase, encryption, receipt lifetime, GDPR roles) match the English. "Secret" is always таємниця/таємний, never секрет: the one "секретним ключем" correctly refers to the SECRET env var. All six major findings are UI labels on `custom-domains/branding.md` and `custom-domains/setup-guide.md` that do not match the strings the shipped uk app renders. The minor findings are Russianisms and calques (повідомте нас, у плані, із коробки, піднімає, включає), terms used two ways across pages (брендинг/брендування, самостійний хостинг/розгортання, домашня/головна сторінка, стан/статус), and anchored `/en/` links whose Ukrainian page now exists. The locale can ship after the six label fixes.

## Findings

### account/change-your-region.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | fluency | 7 | «Onetime Secret запускає кожен регіон (CA, EU, NZ, UK, US) як окремий сервіс» | EN "runs each region" is rendered as "launches each region". | «Onetime Secret працює в кожному регіоні (CA, EU, NZ, UK, US) як окремий сервіс» |
| minor | fluency | 70 | «на власний час завершення кожної таємниці» | EN "each secret's own expiry time"; «час завершення» means "completion time". | «на час закінчення терміну дії кожної таємниці» |

### api/index.mdoc

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | fluency | 4 | «а також офіційна та спільнотні клієнтські бібліотеки» | «спільнотні» is not a standard adjective; the singular/plural pairing is awkward. | «а також офіційна клієнтська бібліотека та бібліотеки спільноти» |
| minor | fluency | 7 | «Типовий сценарій — сценарій або конвеєр» | «сценарій» is used twice in two senses ("pattern", then "script"). | «Типовий підхід — скрипт або конвеєр» |
| minor | fluency | 62 | «Розкрийте таємницю, що витрачає її:» | The relative clause reads as "the secret that consumes it". | «Розкрийте таємницю (після цього отримати її знову неможливо):» |
| minor | fluency | 79 | «оригінальний API з кодуванням форми» | EN "original" here means "first". In Ukrainian «оригінальний» suggests "unusual" or "authentic". | «початковий API з даними форми (form-encoded)» |

### custom-domains/branding.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| major | UI label | 64 | «**Стиль кутів**» | `SimpleBrandPanel.vue:218` renders `web.branding.corners` = «Кути». «Стиль кутів» is the `corner_style` key, which this panel does not use. | «**Кути**» |
| major | UI label | 77 | «**Інструкції щодо розкриття**» | The shipped label is «Інструкції з розкриття» (`web.branding.delivery_reveal_instructions`, `DeliveryPanel.vue:73`). | «**Інструкції з розкриття**». Also change line 4, the heading at line 70 and custom-domains/index.md:27. |
| major | UI label | 77 | «**Перед розкриттям**» | The shipped label is «До розкриття» (`web.branding.delivery_before_reveal`, `DeliveryPanel.vue:81`). | «**До розкриття**» |
| minor | fluency | 87 | «Браузери можуть показувати старий favicon ще до доби.» | EN "for up to a day". «ще до доби» reads as "still before a day". | «Браузери можуть показувати старий favicon ще протягом доби.» |

### custom-domains/index.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | grammar | 15 | «одне розкриття, після чого її видалено» | EN "then it is deleted" describes a consequence. «її видалено» states that the secret has already been deleted. | «одне розкриття, після чого її буде видалено» |
| minor | link | 52 | `/en/account/change-your-region#moving-a-custom-domain` | The Ukrainian page exists. The built anchor is `перенесення-користувацького-домену` (confirmed in `dist/uk/account/change-your-region/index.html`). | `/uk/account/change-your-region#перенесення-користувацького-домену` |

### custom-domains/setup-guide.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| major | UI label | 25 | «У полі **Власний домен**» | The Add domain field label is `web.domains.add.field_label` = «Користувацький домен» (`DomainForm.vue:159`). «Власний домен» comes from a different key (`web.domains.custom_domain`). | «У полі **Користувацький домен**» |
| major | UI label | 28 | «**Використовувати мій кореневий домен**» | The shipped label is «Використати мій кореневий домен» (`web.domains.add.root_domain_label`). | «**Використати мій кореневий домен**» |
| major | UI label | 107 | «на власній сторінці домену показано **Активний**» | The domain page header shows `displayStatus` (`DomainHeader.vue:143`, `useDomainStatus.ts:93`), which is `web.STATUS.active` = «Активна». «Активний» is `web.COMMON.active`, which is used only for the SSL row. | «показано **Активна**» |
| minor | UI label | 27 | «виберіть один із **Популярних піддоменів**» | The bolded label is inflected. The shipped label is «Популярні піддомени» (`web.domains.add.subdomains_label`). | «виберіть один із варіантів у розділі **Популярні піддомени**» |
| minor | Russianism | 9 | «включає користувацький домен. Free включає один» | «включати» meaning "to include, contain" is a calque of Russian «включает». | «передбачає користувацький домен. Free передбачає один» |
| minor | link | 11 | `/en/custom-domains#what-each-plan-includes` | The Ukrainian page exists. The built anchor is `що-входить-до-кожного-тарифного-плану`. | `/uk/custom-domains#що-входить-до-кожного-тарифного-плану` |
| minor | link | 34 | `/en/custom-domains#where-your-domain-is-served` | The Ukrainian page exists. The built anchor is `де-обслуговується-ваш-домен`. | `/uk/custom-domains#де-обслуговується-ваш-домен` |
| minor | fluency | 61 | «Збережіть цей запис після підтвердження.» | EN "Keep this record". «Збережіть» reads as "Save". | «Не видаляйте цей запис після підтвердження.» |
| minor | fluency | 85 | «він не є конфліктом» | Calque of "it is not a conflict". | «він із ними не конфліктує» |
| minor | fluency | 94 | «але можуть тривати день або довше» | EN "can take a day or longer". «тривати» says the changes last a day. | «але інколи на це йде доба або більше» |

### index.mdoc

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | terminology | 28 | «перевірка DNS, брендинг і сторінка вхідних таємниць» | The section heading on line 24 says «Брендування», and so do branding.md and custom-domains/index.md. | «перевірка DNS, брендування і сторінка вхідних таємниць» |
| minor | fluency | 37 | «офіційні та спільнотні SDK» | «спільнотні» is not standard, and there is only one official SDK. | «офіційний SDK і SDK спільноти» |

### pricing/compare-plans.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | terminology | 16 | «Власний відправник електронної пошти» | "Custom" is rendered «користувацький» in the row above (line 15) and «власний» here. | «Користувацький відправник електронної пошти» (or «власний» in both rows, see the terminology table) |
| minor | fluency | 27 | «\| Платно \| Ні \| Ні \| Так \| Так \|» | The row label "Paid" is rendered as an adverb. | «Платний» |
| minor | fluency | 30 | «Створення таємниць обмежується за частотою за мережевою адресою» | «за» appears twice in a row, which makes the sentence awkward. | «Частоту створення таємниць обмежено для кожної мережевої адреси» |
| minor | grammar | 33-34 | «**гнучким доменом відправника**: будь-який домен, а не лише ваш користувацький домен» | The explanation after the colon does not agree in case with the instrumental. | «…: будь-яким доменом, а не лише вашим користувацьким доменом» |

### pricing/index.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | frontmatter | 4 | «вашим потребам у безпечному обміні» | The object is missing (EN "secure sharing needs"). | «вашим потребам у безпечному обміні таємницями» |
| minor | fluency | 7 | «підносьте свій бренд» | Calque of "elevate your brand". | «посилюйте свій бренд» |
| minor | Russianism | 63 | «Тарифний план Free включає обмін таємницями» | «включає» is a calque; see setup-guide.md:9. | «Тарифний план Free охоплює обмін таємницями» |
| minor | fluency | 74 | «створивши issue на GitHub … ніколи не через публічний issue» | English "issue" is left in running prose. | «створивши звернення (issue) на GitHub … ніколи не через публічне звернення» |

### security/best-practices.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | Russianism | 25 | «дає кілька переваг у плані безпеки» | «у плані» is a calque of Russian «в плане». | «дає кілька переваг для безпеки» |
| minor | typography | 11-72 | «**Встановлюйте відповідний термін дії**: Вибирайте» | Every list item capitalises the word after the colon. Ukrainian uses lowercase here, as other uk pages do (branding.md:62, setup-guide.md:113). | «**…**: вибирайте…» (all 19 items) |
| minor | fluency | 11 | «Це мінімізує вікно можливостей для несанкціонованого доступу.» | Calque of "window of opportunity". | «Це скорочує час, протягом якого можливий несанкціонований доступ.» |
| minor | fluency | 13 | «Це додає додатковий рівень безпеки» | Tautology. | «Це створює додатковий рівень захисту» |
| minor | fluency | 53 | «Це може бути особливо корисно для особливо чутливих операцій.» | «особливо» appears twice. | «Це може бути корисно для особливо чутливих операцій.» |

### security/data-protection.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | terminology | 44 | «а Onetime Secret — процесором щодо обмеженого обсягу залучених даних» | The GDPR "processor" is calqued. Ukrainian GDPR texts use «обробник» (or «оператор»), not «процесор». | «а Onetime Secret — обробником даних щодо обмеженого обсягу залучених даних» |

### security/vulnerability-disclosure.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | Russianism | 9 | «будь ласка, повідомте нас» | «повідомити» takes the dative in Ukrainian. The accusative is a calque of Russian «уведомить нас». | «будь ласка, повідомте нам» |
| minor | fluency | 30 | «**Дати нам обґрунтовану можливість**» | EN "reasonable opportunity". «обґрунтовану» means "justified". | «**Дати нам достатньо часу**» |

### self-hosting/configuration.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | frontmatter | 5-6 | `sidebar:` / `order: 4` | This key is left over from the old page and the English page no longer has it. It has no effect because `config/sidebar.mjs` lists links explicitly. | Remove |
| minor | typography | 20, 21, 26 | «**`.env`** - Змінні середовища», «файл - це `etc/config.yaml`» | A spaced hyphen is used as a dash. | « — » |

### self-hosting/index.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | terminology | 3 | «Огляд самостійного хостингу» | Every link to this page and section uses «Самостійне розгортання» (api/index.mdoc:94, pricing/index.md:66, index.mdoc:39). | «Огляд самостійного розгортання» |
| minor | frontmatter | 5-6 | `sidebar:` / `order: 1` | Same leftover key as configuration.md. | Remove |
| minor | Russianism | 18 | «`simple` — типовий режим із коробки» | «із коробки» is a calque of Russian «из коробки». | «`simple` — режим за замовчуванням, з яким постачається застосунок» |
| minor | fluency | 30 | «Форма з одним `docker run`» | Calque of "the single docker run form". | «Варіант з однією командою `docker run`» |
| minor | Russianism | 32 | «піднімає екземпляр на порту 3000» | IT-slang calque of Russian «поднимает». | «запускає екземпляр на порту 3000» |
| minor | grammar | 98 | «повідомляє перевірку 4 (`membership_role_sync`) як попередження» | «повідомляти» needs «про». EN "reports check 4 as a warning". | «позначає перевірку 4 (`membership_role_sync`) як попередження» |
| minor | fluency | 103 | «Сторона кінцевого користувача описана в статті» | Calque of "the end-user side". | «Інструкції для кінцевих користувачів наведено в статті» |

### share/index.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | UI label | 25 | «*Ви нічого не надали для передачі.*» | The shipped error is «Ви не надали нічого для передачі», with no period (`web.COMMON.error_secret`). | «*Ви не надали нічого для передачі*» |
| minor | fluency | 46 | «## Виберіть, скільки воно діятиме» | «воно» has no antecedent, and the subject is таємниця (feminine). | «## Виберіть, скільки діятиме таємниця» |
| minor | fluency | 63 | «чи це саме ваш запланований одержувач» | EN "intended recipient". «запланований» means "planned". | «чи це саме той одержувач, якому ви її призначили» (as in why-secret-links.md:45) |
| minor | fluency | 91 | «Натискання **Натисніть, щоб показати** отримує вміст один раз.» | "Pressing 'Press to show' retrieves…" is clumsy. | «Кнопка **Натисніть, щоб показати** отримує вміст один раз.» |

### share/use-cases.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | accuracy | 42 | «їхньому законному власнику облікового запису» | EN "intended account holder". «законному» means "lawful". | «тому власнику облікового запису, для якого вони призначені» |
| minor | grammar | 44 | «його термін дії може закінчитися непрочитаним» | «непрочитаним» agrees with «термін», not with the link. | «термін дії посилання може закінчитися ще до того, як його відкриють» |
| minor | terminology | 55, 63 | «Чутливі розкриття та анонімність», «Для розкриття, яке може наразити когось на ризик» | "Disclosure" is rendered with «розкриття», the term this page (lines 8-9, 20) and the whole locale use for "reveal". | «## Повідомлення чутливої інформації та анонімність»; «Для повідомлення, яке може наразити когось на ризик» |

## Clean pages

- api/client-libraries.md
- security/index.md
- share/why-secret-links.md

## Terminology consistency

| English term | Renderings found (pages) | Expected (source) | Action |
|---|---|---|---|
| custom domain | користувацький домен (all prose); «Власний домен» quoted as a field label (setup-guide:25); sidebar «Власні домени» | Docs glossary: користувацький домен. Shipped app: «Власні домени» (`web.TITLES.domains`, `web.COMMON.custom_domains_title`) but «Користувацький домен» (`web.domains.add.field_label`) | Keep the glossary term in prose and quote labels verbatim. The glossary/app split needs an upstream lock (see general issues). |
| custom (adj.) | користувацький брендинг (compare-plans:15, pricing/index:32); власний відправник (compare-plans:16) | Glossary: користувацький брендинг; app: «Власне брендування» | Use one adjective per page; follow whatever the custom-domain lock decides. |
| branding | брендування (branding.md, custom-domains/index:41, index.mdoc:24, self-hosting/index:11); брендинг (index.mdoc:28, compare-plans:4,15,45, pricing/index:32,63) | Glossary: «користувацький брендинг»; app: «брендування» | Pick брендування (app, page title) |
| self-hosting | самостійне розгортання (11 hits, 8 pages); самостійний хостинг (self-hosting/index:3; sidebar `selfHosting`) | No glossary entry; the two shards split | самостійне розгортання |
| homepage | домашня сторінка (branding:85, custom-domains/index:26,42, pricing/index:21,63); головна сторінка (compare-plans:12) | App: «Головна сторінка» in most keys, «Таємниці домашньої сторінки» in billing | Pick one; головна сторінка matches the app majority |
| Unlimited | «Без обмежень» (custom-domains/index:25); «Необмежено» (compare-plans:11); «не мають фіксованого ліміту» (setup-guide:10) | No app string | One rendering for the table cells (EN split is known, see below) |
| status (receipt/domain) | стан (share/index:8,19,113,133; use-cases:71); статус (why-secret-links:28, setup-guide:90,101,107) | App: «Статус» | статус |
| reveal instructions | інструкції щодо розкриття (branding:4,70,77; custom-domains/index:27) | App: «Інструкції з розкриття» | Follow the app |
| API key / token | ключі API (best-practices:41,43; share/index:128); токен API (api/index:39) | App: «API-ключ» (`web.account.api_key`) | API-ключ (see the EN issue on api/index) |
| "Questions or need support?" heading | «Маєте запитання або потрібна підтримка?» (branding:102, custom-domains/index:77); «Запитання чи потрібна підтримка?» (setup-guide:131, data-protection:56) | Same EN heading everywhere | Use one heading |
| reveal | розкрити / розкриття throughout; the button quoted as «Натисніть, щоб показати» | Docs glossary «переглянути/показати»; app `web.STATUS.revealed` «Розкрито» | The pages are right; the glossary entry is stale |

These terms are used consistently and match the governance: secret → таємниця/таємний (no секрет), passphrase → парольна фраза (32 hits, no ключова фраза), password → пароль, receipt → квитанція, burn → знищити, workspace → робоча область, plan → тарифний план with Latin tier names, region → регіон.

## App UI label mismatches

| Page:line | Docs text | Shipped app string (key) | Note |
|---|---|---|---|
| custom-domains/branding.md:64 | **Стиль кутів** | Кути (`web.branding.corners`) | `SimpleBrandPanel.vue:218`; `corner_style` is not rendered here |
| custom-domains/branding.md:77 | **Інструкції щодо розкриття** | Інструкції з розкриття (`web.branding.delivery_reveal_instructions`) | `DeliveryPanel.vue:73` |
| custom-domains/branding.md:77 | **Перед розкриттям** | До розкриття (`web.branding.delivery_before_reveal`) | `DeliveryPanel.vue:81`; «Після розкриття» matches |
| custom-domains/setup-guide.md:25 | **Власний домен** | Користувацький домен (`web.domains.add.field_label`) | `DomainForm.vue:159`; the translator took `web.domains.custom_domain` |
| custom-domains/setup-guide.md:27 | **Популярних піддоменів** | Популярні піддомени (`web.domains.add.subdomains_label`) | inflected inside bold |
| custom-domains/setup-guide.md:28 | **Використовувати мій кореневий домен** | Використати мій кореневий домен (`web.domains.add.root_domain_label`) | |
| custom-domains/setup-guide.md:107 | **Активний** | Активна (`web.STATUS.active`) | `DomainHeader.vue:143` via `useDomainStatus.ts:93` |
| share/index.md:25 | *Ви нічого не надали для передачі.* | Ви не надали нічого для передачі (`web.COMMON.error_secret`) | word order; extra period |

All other quoted labels match the shipped uk strings: Домени, Керувати, Функції, Керувати брендом, Бренд, Доставка, Логотип, Завантажити логотип, Замінити, Логотип домену, Зберегти логотип, Оновити, Видалити логотип, Favicon, Завантажити/Зберегти/Видалити favicon, Оновити favicon з домену, Колір бренду, Сімейство шрифтів, Мова, Після розкриття, Додати домен, Продовжити з {0}, Підтвердити домен, Домен підтверджено та активовано, Статус домену, Цільова адреса, DNS-запис, Статус SSL, SSL оновлюється, Останній моніторинг, Остання перевірка підтвердження не вдалася, Залишитися на сторінці, Термін дії закінчується через, Натисніть, щоб показати, Нова / Попередній перегляд / Розкрито, Активність таємниць. The corner and font option names correctly stay in English.

## English source and general issues

- [new] api/index.mdoc:40 — "the password is the API token from your account settings". The app labels this credential "API Key" (`web.account.api_key`; uk «API-ключ»), and security/best-practices.md says "API Keys". A reader looking for "API token" in account settings will not find it.
- [new] custom-domains/setup-guide.md:110 — "the domain's own page shows **Active**". The app reuses `web.STATUS.active` for domain status. In uk that string is feminine («Активна», written for таємниця), which is wrong for домен (masculine). This affects any gendered locale. A domain-specific status key would fix it.
- [new] The shipped uk app is inconsistent on "custom domain": `web.domains.add.field_label` «Користувацький домен» vs `web.domains.custom_domain` / `web.TITLES.domains` «Власний домен / Власні домени». The docs glossary binds «користувацький домен». One rendering needs to be locked in the app governance (`.resolved/uk.json` has no entry) and the docs glossary. «власний домен» reads more naturally: «користувацький» means "the user's".
- [new] `src/content/i18n/uk.json` sidebar labels (not part of this commit) no longer match the re-synced page titles: `customDomains` «Власні домени» vs «Користувацькі домени»; `brandGuide` «Гайд по бренду» (EN is now "Branding"; «по» + dative is a Russianism) vs «Брендування вашого домену»; `useCases` «Випадки використання» vs «Сценарії використання»; `comparePlans` «Порівняння тарифів» vs «Порівняння тарифних планів»; `selfHosting` «Самостійний хостинг» vs «Самостійне розгортання»; `environmentVariables` «Змінні оточення» (calque) vs «Змінні середовища» used in the pages. This is the same pattern as the known mi/ja/zh-cn sidebar entry.
- [new] The uk docs glossary (`translations/glossary.md`) has no entries for plan, workspace, receipt, region or self-hosting. Its view/reveal row («переглянути/показати») conflicts with the розкрити/«Розкрито» that the pages and app use. `_language-notes.md` "Пріоритетні виправлення" points at files that no longer exist (`docs-overview.md`, `secret-links/index.md`, `translations/guide.md`).
- [known] Passphrase as encryption key (api/index) vs access check (share/index, why-secret-links). uk mirrors both: api/index.mdoc:60 vs share/index.md:72.
- [known] Custom-domain limit "no fixed limit" (setup-guide) vs "Unlimited" (compare-plans). uk carries the split in three forms (see the terminology table).
- [known] self-hosting/index.md "one generated secret" is ambiguous. uk renders it as the SECRET key («з одним згенерованим секретним ключем»), which is correct per install/docker.md "Running a single container".
- [known] The sv-1 branding-label entry is outdated at app 145c1e7cfa. `SimpleBrandPanel.vue:218` renders `web.branding.corners`, and `DeliveryPanel.vue:73,81,96` render `delivery_reveal_instructions` / `delivery_before_reveal` / `delivery_after_reveal`. The English labels Corners / Reveal instructions / Before reveal / After reveal therefore match the app. Locales that quote `corner_style` or `pre/post_reveal_instructions` (as uk did) are wrong.
- [known] share/index.md empty-submission error has a trailing period; uk copies it.
- [known] pricing/index.md "Self-Hosting Guide" link text vs page title; uk mirrors it («Посібник із самостійного розгортання»).
- [known] index.mdoc "Setup your custom domain"; uk is unaffected («Налаштуйте свій користувацький домен»).
