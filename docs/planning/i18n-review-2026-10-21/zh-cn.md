# Simplified Chinese (zh-cn) translation review

- Commit: d30489ac — 18 pages
- English base: HEAD d30489ac
- Register expected: formal 您 / 您的, no 你 (`_language-notes.md`; app governance `register.form=formal`, forbidden token `你`); observed: consistent, with one break: pricing/index.md:72 «你们»
- Findings: 0 critical, 7 major, 20 minor

## Verdict

The translation is accurate and fluent, and the security claims (one-time view, burn, passphrase, encryption, retention) are rendered faithfully. Terminology follows the docs glossary (the 内容 / 机密内容 / 机密信息 tiers, 一次性链接, 口令 vs 密码, 销毁, 回执, 方案, 区域). The problems are UI labels. On the branding page, the labels for logo, favicon refresh, corners, font and reveal instructions do not match the shipped zh app. The corner and font options are translated, but the app shows them in English. The Early Supporter plan name and the expiry options on the sharing page also differ from the app. The page can ship once the 7 major label fixes are made. The minor items are typography (semicolons, dash style) and wording consistency between pages.

## Findings

### custom-domains/branding.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| major | UI label | 27–33 | «在**品牌**选项卡的**标志**下» / «在**域名标志**窗口中» / «选择**保存标志**» / «然后选择**移除标志**，并通过**移除标志**确认» | The shipped zh app uses "Logo" for these: web.branding.logo «Logo», logo_modal_title «域名 Logo», logo_modal_save «保存 Logo», remove_logo «移除 Logo». Only «上传标志» (upload_logo) matches. | «在 **Logo** 下», «**域名 Logo** 窗口», «**保存 Logo**», «**移除 Logo**» |
| major | UI label | 40 | «请选择**从域名刷新 Favicon**» | App button web.branding.refresh_favicon is «从域名重新获取 favicon». | «请选择**从域名重新获取 favicon**» |
| major | UI label | 48 | «**圆角样式**：**方角**、**圆角**或**大圆角**。» | The field label is web.branding.corners «圆角», not 圆角样式. The three options come from the hard-coded English borderRadiusDisplayMap (SimpleBrandPanel.vue:83-86), so the zh app shows "Square", "Rounded" and "Extra Rounded". The translation's «圆角» for the "Rounded" option also has the same text as the field label. The same 圆角样式 wording is in the description (line 4). | «**圆角**：**Square**（方角）、**Rounded**（圆角）或 **Extra Rounded**（大圆角）。» |
| major | UI label | 49 | «**字体**：**衬线**、**无衬线**、**等宽**或**系统 UI**。» | The option labels come from the hard-coded English fontDisplayMap, so the zh app shows "Serif", "Sans Serif", "Monospace" and "System UI". The translation tells readers to look for Chinese labels that the app does not show. | «**字体**：**Serif**（衬线）、**Sans Serif**（无衬线）、**Monospace**（等宽）或 **System UI**（系统界面）。» |
| major | UI label | 58 | «**查看说明**：在收件人页面上**查看前**和**查看后**显示的文字» | The app's Delivery panel shows web.branding.delivery_reveal_instructions «显示说明», delivery_before_reveal «显示前» and delivery_after_reveal «显示后». The description (line 4) also says «查看说明». | «**显示说明**：在收件人页面上**显示前**和**显示后**显示的文字» |

### pricing/compare-plans.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| major | UI label | 33 | «会看到它显示为 **Identity Plus (Early Supporter)**» | English says accounts "see it as" this name. The zh app shows web.billing.plans.early_supporter_plan «Identity Plus (早期支持者)» (OrganizationSettings.vue:1935), so the quoted name is not what zh users see. Line 41 «Identity Plus (Early Supporter)» should match. | «会看到它显示为 **Identity Plus (早期支持者)**» |
| minor | terminology / typography | 21, 23 | «单点登录（SSO）» / «Beta» | Inconsistent with sibling pages and the app: custom-domains/index.md:25 and pricing/index.md:45 use half-width «单点登录 (SSO)», as the app does. pricing/index.md:49 renders "beta" as «测试版». | «单点登录 (SSO)» / «测试版» |

### share/index.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| major | UI label | 29 | «在表单上，这些选项显示为**过期时间**。» | English says each choice reads "Expires in …". In the zh app each option is web.secrets.expiresIn «将在 {duration} 后过期» (SecretForm.vue:427, TtlSelector.vue:114). «过期时间» is only the field label (web.LABELS.secret_ttl), so the sentence names the wrong text. | «在表单上，这些选项显示为**将在 … 后过期**。» |

### account/change-your-region.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | fluency | 39 | «如果在这些链接仍未处理完毕时就将域名指向新区域» | "while those links are outstanding" means they are still live. «仍未处理完毕» means "not finished processing", which is unclear for links. | «如果在这些链接仍然有效时就将域名指向新区域» |
| minor | fluency | 46 | «**移除临时子域名**，待域名在新区域中验证通过之后。» | The condition is placed after the main clause, which reads as English word order. | «待域名在新区域中验证通过后，**移除临时子域名**。» |

### api/client-libraries.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | typography | 11–12, 72–73 | «请查看每个条目的⏎状态说明» / «（最近提交⏎于 2019 年» | Hard line breaks inside CJK phrases. Browsers that do not drop segment breaks between Han characters render them as a stray space mid-phrase. The other zh pages put each paragraph on one line. | Join each paragraph onto one line. |
| minor | accuracy | 19 | «\| otsgo … \| 2024-03 \| 未提供文档 \|» | The column is "Regional / custom domain", and "not documented" means region support is not documented. «未提供文档» reads as "the library has no documentation". | «未说明» |

### api/index.mdoc

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | fluency | 45 | «经过身份验证的请求享有您方案的限制» | «享有…限制» ("enjoy … limits") is an odd collocation. | «经过身份验证的请求适用您方案的限额» |
| minor | fluency | 62 | «查看一条内容（这会消耗它）：» | «消耗» is a calque of "consumes". | «查看一条内容（查看后该内容即失效）：» |

### custom-domains/index.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | link | 40 | «[迁移自定义域名](/en/account/change-your-region#moving-a-custom-domain)» | The zh page exists (account/change-your-region), so the link sends zh readers to English. | `/zh-cn/account/change-your-region#迁移自定义域名` |
| minor | fluency | 46 | «可选地，更改域名的外观和行为：» | «可选地» is a calque of "Optionally". | «您还可以根据需要更改域名的外观和行为：» |

### custom-domains/setup-guide.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | link | 9, 21 | «(/en/custom-domains#what-each-plan-includes)» / «(/en/custom-domains#where-your-domain-is-served)» | The zh page exists, so these links send zh readers to English. | `/zh-cn/custom-domains#各方案包含的功能`, `/zh-cn/custom-domains#您的域名在哪里提供服务` |
| minor | typography (locale-wide) | 9, 25, 34, 64 | «Free 包含一个；Identity Plus…» | The docs glossary (标点符号: «不使用分号») and app governance ("No semicolons") forbid semicolons. The same «；» is also at security/data-protection.md:12, 17, 27; pricing/compare-plans.md:33; self-hosting/index.md:15, 46; share/index.md:37, 55, 61; share/use-cases.md:7. | Replace with «，» or «。» |

### index.mdoc

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | terminology | 10, 28, 34 | «发送第一条机密信息之后的一切» / «发送给您的机密信息» / «创建和获取内容» | The page mixes tiers 3 and 1 for "secret". The glossary asks for one tier per page («在同一页面中保持术语层级一致»). | Use «机密信息» on line 34 («创建和获取机密信息»), or accept 内容 as the API-term exception. |

### pricing/index.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | register | 72 | «### 你们提供客户支持吗？» | Contains 你, which the app governance forbids. It is the reader's question to the company, so no reader is addressed informally, but it can be avoided. | «### 是否提供客户支持？» |
| minor | terminology | 32 | «按域名设置的登录选项» | The same feature has a different name on each page: compare-plans.md:17 «按域名的登录配置», custom-domains/index.md:24 «登录设置». | «按域名的登录设置» on all three pages |

### security/data-protection.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | accuracy | 12 | «没有任何内容会无限期保留» | English hedges: "nothing is *intended* to live indefinitely". The translation states it as a fact, which strengthens a retention claim. | «任何内容都不应无限期保留» or «我们不打算无限期保留任何内容» |
| minor | typography | 11, 19, 23 | «一旦被查看 — 或到达过期时间 — 即被永久销毁» | A spaced Latin em dash in Chinese prose. Other zh pages use «——» (pricing/index.md:68, vulnerability-disclosure.md:25). | «一旦被查看（或到达过期时间），即被永久销毁» / «——» |

### security/vulnerability-disclosure.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | fluency | 28 | «作为回应，…我们不会采取追究行动。» | "In return" is «作为回报», not «作为回应». «采取追究行动» is unidiomatic. | «作为回报，…我们不会追究其法律责任。» |

### self-hosting/index.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | accuracy | 27 | «应用程序从不终止 TLS，因此默认前置一个代理» | "a proxy in front of it is assumed" means the reader must provide a proxy. «默认前置一个代理» reads as "a proxy is placed in front by default", as if one ships with the product. | «应用程序从不终止 TLS，因此需要在其前面部署一个代理» |
| minor | typography | 52, 56 | «**对方必须已经是活跃成员** — 该命令…» / «再降级旧所有者 — 唯一所有者保护机制…» | A spaced Latin em dash in Chinese prose (see data-protection). | «——» |

### share/why-secret-links.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | terminology | 29 | «也无法在签发系统中撤销密码、令牌或许可证密钥» | Revoking a credential is «吊销» on share/index.md:77 and share/use-cases.md:15. | «吊销» |

## Clean pages

- security/best-practices.md
- security/index.md
- self-hosting/configuration.md (prose and tip box. The YAML block is byte-identical to the English.)
- share/use-cases.md (only the locale-wide semicolon at line 7, listed under setup-guide)

## Terminology consistency

| English term | Renderings found (pages) | Expected (source) | Action |
|---|---|---|---|
| reveal | 查看 in prose on all pages; 显示 at share/index.md:41 and status «已显示» (share/index.md:67) | Docs glossary «查看 / 显示». App uses 显示 for the Delivery labels and STATUS.revealed | Keep 查看 in prose. Quote the app's 显示… text wherever a control or status is named (branding.md:58). |
| logo | 标志 (branding.md, custom-domains/index.md:21, compare-plans.md:15) | App: «上传标志» but «Logo», «域名 Logo», «保存 Logo», «移除 Logo» | Quote the app labels on branding.md. For prose, pick one form; the app itself is split. |
| per-domain sign-in settings | 登录设置 (custom-domains/index.md:24), 按域名设置的登录选项 (pricing/index.md:32), 按域名的登录配置 (compare-plans.md:17) | App: 登录设置 / 登录配置 (web.TITLES.domain_signin) | Align on 按域名的登录设置 |
| beta | Beta (compare-plans.md:23), 测试版 (pricing/index.md:49) | — | 测试版 |
| revoke (credential) | 吊销 (share/index.md:77, share/use-cases.md:15), 撤销 (why-secret-links.md:29) | — | 吊销 |
| Single sign-on (SSO) | 单点登录 (SSO) (custom-domains/index.md:25, pricing/index.md:45), 单点登录（SSO） (compare-plans.md:21) | App «单点登录 (SSO)» | Half-width parentheses |
| Identity Plus (Early Supporter) | Identity Plus (Early Supporter) (compare-plans.md:33, 41) | App «Identity Plus (早期支持者)» | Follow the app |
| secret (noun) | 机密内容 in docs prose; 内容 on API pages; 机密信息 on pricing and the hero; index.mdoc mixes 机密信息 and 内容 | Docs glossary tiers | Fix index.mdoc:34 or document the API exception |
| em dash | « — » (index.mdoc, share/index.md, share/use-cases.md, self-hosting/index.md, api/client-libraries.md, security/data-protection.md) vs «——» (security/index.md, branding.md, why-secret-links.md, pricing/index.md, vulnerability-disclosure.md, configuration.md) | Chinese 破折号 «——» | Normalise. At minimum, use «——» in running prose. |

## App UI label mismatches

| Page:line | Docs text | Shipped app string (key) | Note |
|---|---|---|---|
| custom-domains/branding.md:27 | 在**标志**下 | Logo (web.branding.logo) | |
| custom-domains/branding.md:28 | **域名标志** | 域名 Logo (web.branding.logo_modal_title) | |
| custom-domains/branding.md:29 | **保存标志** | 保存 Logo (web.branding.logo_modal_save) | |
| custom-domains/branding.md:33 | **移除标志** | 移除 Logo (web.branding.remove_logo) | |
| custom-domains/branding.md:40 | **从域名刷新 Favicon** | 从域名重新获取 favicon (web.branding.refresh_favicon) | |
| custom-domains/branding.md:39, 41 | **上传 Favicon** / **保存 Favicon** / **移除 Favicon** | 上传 favicon / 保存 favicon / 移除 favicon | Differ only in letter case. Optional. |
| custom-domains/branding.md:48 | **圆角样式** | 圆角 (web.branding.corners) | |
| custom-domains/branding.md:48 | **方角** / **圆角** / **大圆角** | Square / Rounded / Extra Rounded (hard-coded, brand-helpers.ts borderRadiusDisplayMap via SimpleBrandPanel.vue:83-86) | Not localized in the app |
| custom-domains/branding.md:49 | **衬线** / **无衬线** / **等宽** / **系统 UI** | Serif / Sans Serif / Monospace / System UI (hard-coded fontDisplayMap, SimpleBrandPanel.vue:262) | Not localized in the app |
| custom-domains/branding.md:58 | **查看说明** / **查看前** / **查看后** | 显示说明 / 显示前 / 显示后 (web.branding.delivery_reveal_instructions / delivery_before_reveal / delivery_after_reveal) | |
| pricing/compare-plans.md:33 | **Identity Plus (Early Supporter)** | Identity Plus (早期支持者) (web.billing.plans.early_supporter_plan) | |
| share/index.md:29 | 选项显示为**过期时间** | 将在 {duration} 后过期 (web.secrets.expiresIn) | 过期时间 is the field label web.LABELS.secret_ttl |

These labels were checked and match the app: 域名, 管理, 功能, 管理品牌, 品牌 / 投递 tabs, 上传标志, 替换, 更新, 品牌颜色, 字体, 语言, 添加域名, 自定义域名, 常用子域名, 使用我的根域名, 继续使用 {0}, 验证域名, 域名已验证并处于活跃状态, 活跃, 域名状态, 目标地址, DNS 记录, SSL 状态, SSL 续期, 最后监控, 上次验证检查失败, 保持在此页面, 点击查看 →, 新建 / 已预览 / 已显示, 生成密码, «您没有提供任何要分享的内容», 内容活动, 偏好设置, 更换区域, 可用区域.

## English source and general issues

- [new] App zh strings are stale and contradict the docs on SVG. web.branding.logo_modal_hint «PNG、JPG 或 SVG…», favicon_field_hint «支持 ICO、PNG 或 SVG…» and favicon_modal_hint «支持 ICO、PNG 或 SVG…» still list SVG. Their source_hash does not match the current en text ("PNG or JPG…", "ICO or PNG…"). branding.md:14 correctly says «不接受 SVG». The app's zh strings need a re-sync.
- [new] All locales: the localized Early Supporter plan name is in the app (web.billing.plans.early_supporter_plan). Translations should quote it instead of copying the English "Identity Plus (Early Supporter)" from pricing/compare-plans.md:40-41.
- [new] All locales: share/index.md:51-52 "the choices read **Expires in …**". Each option is web.secrets.expiresIn ("Expires in {duration}"), not the field label web.LABELS.secret_ttl ("Expires in"). Locales should quote the expiresIn pattern.
- [new] The zh-cn sidebar bundle (src/content/i18n/zh-cn.json) lacks 56 of the 82 English `sidebar.*` keys. These include sharingSecrets, shareASecret, yourReceipt, plansAndPricing, aboutSelfHosting, apiAndSdks and whereYourDataLives, so most of the nav falls back to English around the translated pages. `sidebar.brandGuide` is «品牌指南» while the page title is «为您的域名设置品牌».
- [new] security/index.md:38 "[Self-Hosting](https://github.com/onetimesecret/onetimesecret)" and security/data-protection.md:54 "[self-hosting](https://github.com/…)" link to GitHub rather than the docs page /self-hosting/. This affects every locale.
- [known] known-english-issues.md lists custom-domains/branding.md labels as not matching app keys (sv-1). This is out of date: at 145c1e7cfa the en app has web.branding.corners "Corners", tab_brand/tab_delivery, replace_logo "Replace", logo_modal_title "Domain logo", logo_modal_save "Save logo", remove_logo "Remove logo", refresh_favicon, delivery_reveal_instructions "Reveal instructions" and delivery_before_reveal / delivery_after_reveal "Before reveal" / "After reveal". The English page matches the app. Only the corner and font option names are hard-coded (nl-1).
- [known] custom-domains/branding.md corner and font option labels are hard-coded English in the app (nl-1). The zh translation translated them anyway (major finding above).
- [known] custom-domains/branding.md SVG vs the app logo hint (it-1). The en app hint is now fixed; the zh app hint is stale (see first item).
- [known] api/index.mdoc:61 passphrase "used to encrypt the value" vs share/index.md:75 "access check, not the encryption key" (fr-2). zh reproduces both faithfully (api/index.mdoc:60, share/index.md:43).
- [known] Sidebar zh-cn.json uses 地区 / 更改您的地区 for region, while the pages use 区域 / 更换区域 (ja-2, zh-cn-2).
- [known] index.mdoc "Setup your custom domain" (de-2, fr-2). zh renders it correctly as «设置您的自定义域名».
- [known] self-hosting/index.md "one generated secret" ambiguity (de-1). zh resolves it as «生成一个密钥».
- [known] custom-domains/setup-guide.md "no fixed limit" vs compare-plans.md "Unlimited" (sv-2). zh reproduces both («无固定上限» / «无限»).
- [known] api/client-libraries.md code-comment typos, link-label separators, Go library naming and audit-date footnote (de-1, es-1, fr-1, sv-2). They are preserved verbatim in zh.

## Not checked

- Rendering of the hard line breaks in api/client-libraries.md was not checked in a browser. Whether a space appears depends on the browser's CJK segment-break handling.
- No build, `dogfood.py check` or link checker was run (review was read-only). Emphasis flanking was checked with a script against both the clean copies and the marked repo files, and no breaks were found. The CJK heading slugs suggested for the anchors (e.g. `#迁移自定义域名`) assume Starlight's default github-slugger behaviour and were not checked in built output.

## Resolution (fix round, 2026-10-21)

26 of 27 findings fixed, 1 skipped. Labels were checked against `$APP/locales/content/zh/*.json` at 145c1e7cfa. The corner and font options were confirmed as hard-coded English in `brand-helpers.ts:216-221,266-270` and `SimpleBrandPanel.vue:84-86,262`. Validation: `dogfood.py check --base b2883096` passes for 14 files, and `pnpm test` (175 tests), `check:frontmatter`, `check:nav` and `pnpm build` (1306 pages) all pass. In the built HTML, the three new zh-cn anchors (`#迁移自定义域名`, `#各方案包含的功能`, `#您的域名在哪里提供服务`) match the heading ids.

| Commit | Subject |
|---|---|
| e592e4be | docs(i18n/zh-cn): match branding labels to the shipped app |
| 0835fb63 | docs(i18n/zh-cn): match plan and expiry labels to the shipped app |
| dc63d329 | docs(i18n/zh-cn): correct mistranslations in three pages |
| fb5ccbeb | docs(i18n/zh-cn): use consistent terms for sign-in, SSO, beta and revoke |
| cf9b831a | docs(i18n/zh-cn): fix register breaks |
| a7d0db3e | docs(i18n/zh-cn): link to Simplified Chinese pages that exist |
| 914fed37 | docs(i18n/zh-cn): fix fluency and typography |
| 32359f16 | docs(i18n/zh-cn): align sidebar labels with page titles |

Notes on fixes that differ from the suggested text:

- branding.md: the bold favicon labels now use the app's lower-case «上传 favicon» / «保存 favicon» / «移除 favicon». The heading «设置语言和显示说明» and custom-domains/index.md:21 now say «显示说明» to match the renamed setting. The font gloss for System UI is «系统界面».
- api/index.mdoc:45: «适用您方案的限制». 限制 is kept so it matches «匿名用户的限制» earlier in the same sentence. Line 62: «（查看后即失效）».
- vulnerability-disclosure.md:28: «我们不会追究其责任». The English says "pursue action", not "legal action", so 法律 is not added.
- pricing/index.md:32 and compare-plans.md:17 now use «按域名的登录设置». custom-domains/index.md:24 keeps «登录设置» because the English row says "Sign-in settings", without "per-domain".
- api/client-libraries.md: all 24 soft line breaks in prose are joined. There is no separator between CJK characters, and a space between CJK and Latin text, digits or a link.
- Semicolons: all 15 «；» listed are replaced with «，» or «。». Spaced « — » in running prose (data-protection.md:11, 19, 23; self-hosting/index.md:52, 56) is now «——».
- Sidebar: brandGuide «品牌» (the English label is "Branding"), switchingRegions «更换区域» (the page title). Nine keys were added: sharingSecrets «分享机密内容», shareASecret «分享内容» (docs glossary "Share a secret"), yourReceipt «您的回执», whatCustomDomainsDo «自定义域名的作用», plansAndPricing «方案与定价», aboutSelfHosting «关于自托管», apiAndSdks «API 与 SDK», ourApproachToSecurity «我们的安全方法», whereYourDataLives «您的数据存放在哪里».

### Skipped findings

| Page:line | Finding | Reason |
|---|---|---|
| index.mdoc:34 | «创建和获取内容» mixes tier 1 into a tier-3 page | The docs glossary maps "create secrets" / "retrieve secrets" to 创建内容 / 获取内容 for API operations (API 相关术语 table), and this sentence describes API use. The glossary's "one tier per page" rule conflicts with that row. See Decisions needed. |
| branding.md:4 | «圆角样式» in the description | Partly skipped. 显示说明 was fixed. «圆角样式» translates the English description's prose "corner style", not the **Corners** field label, so it stays. |
| (terminology table) em dash | « — » in index.mdoc:28-45, self-hosting/index.md:23-28, share/index.md:81-87, share/use-cases.md:43-45 and the api/client-libraries.md author lines | These are link/description and author/status separators, not dashes in running prose. The table asked for running prose at minimum. branding.md uses «——» for the same separator, so one separator style still needs to be chosen. |

### Decisions needed

- App (zh): `web.branding.logo_modal_hint` «PNG、JPG 或 SVG。…», `favicon_field_hint` «支持 ICO、PNG 或 SVG。…» and `favicon_modal_hint` «支持 ICO、PNG 或 SVG，…» still list SVG, but en says "PNG or JPG…" / "ICO or PNG…". These strings need a re-sync. branding.md:14 says «不接受 SVG».
- App (zh): logo labels are split. `upload_logo` is «上传标志», while `logo`, `logo_modal_title`, `logo_modal_save` and `remove_logo` use «Logo». The docs now quote both forms as shipped, and prose uses 标志. If the app changes `upload_logo` to «上传 Logo», branding.md:27 must follow.
- Docs glossary (zh-cn): decide whether API-operation phrases (创建内容 / 获取内容) are an exception to the one-tier-per-page rule. This blocks index.mdoc:34.
- Docs glossary (zh-cn): proposed new rows: reveal instructions (setting) → 显示说明; revoke (credential) → 吊销; beta → 测试版; Single sign-on (SSO) → 单点登录 (SSO) with half-width parentheses; the em dash in prose → «——»; one separator style for "link — description" lists («——» or « — »).
- Sidebar (zh-cn.json): 47 of the 82 English keys are still missing. Most are group labels or links to pages with no zh-cn translation (start, account, organizations, billing, install, contribute, and the custom-domain, sharing and self-hosting sub-pages). Two point at zh-cn pages outside this round's file list: `howTranslationsWork` (translations) and `translationGlossary` (translations/glossary). The unused `regions` «地区» key was left in place, as AGENTS.md asks.
- English, all locales: security/index.md:38 and security/data-protection.md:54 link "self-hosting" to GitHub, not `/self-hosting/` (zh-cn data-protection.md:33 follows the English).
- Build, all locales: a heading that ends in full-width punctuation keeps a U+E0101 mark in its built id. For example, «有问题或需要支持？» renders as `id="有问题或需要支持\u{E0101}"` in dist/zh-cn/custom-domains/index.html, so a link to that heading would not resolve. This is TextProv heading-id decoding, not the translation.
