# Japanese (ja) translation review

- Commit: 28d63ed7 — 17 pages
- English base: HEAD d30489ac
- Register expected: polite teineigo です/ます; address usually omitted, お客様 only where a possessor is needed; buttons in noun/imperative form (docs `glossary.md` 敬語とトーン, app governance `rule.ja-register-teineigo`). Observed: consistent, with two breaks: plain-form hero tagline in index.mdoc and «あなた» in a link text on share/use-cases. No forbidden casual tokens.
- Findings: 0 critical, 8 major, 23 minor

## Verdict

The translation is accurate and complete. Security claims, one-time semantics, passphrase wording, plan limits, hostnames, DNS values, CLI flags and code blocks match the English, and the です/ます register holds. The main problem is UI labels. On custom-domains/branding and custom-domains/setup-guide, several labels came from a stale app bundle (onetimesecret-docker, 2026-07-11) and do not match the current ja app. The branding corner and font options are translated, but the app shows them in English. The other majors are a GDPR controller/processor sentence that can be read with the roles swapped, and the receipt status «閲覧済み». The page can ship after the 8 major fixes. The minor findings are consistency issues: "reveal" is rendered as 閲覧, 表示 or 公開, "email sender" as 送信者 or 送信元, and shard-1 pages use half-width colons while shard-2 pages use full-width ones.

## Findings

### account/change-your-region.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | fluency | 4, 39 | «未処理のリンクを壊さずに» / «それらのリンクが未処理のまま» | English "outstanding links" means links still live. 未処理 means "unprocessed" | «まだ有効なリンクを壊さずに» / «それらのリンクがまだ有効なうちに» |
| minor | fluency | 30 | «受信確認を確認するために、引き続きログインできます。» | 確認を確認 repeats the same word | «受信確認を見るために、引き続きログインできます。» |

### api/index.mdoc

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | accuracy | 58 | «受信確認のキーを受信者に送らないでください。» | English "Never send the receipt key" is absolute. The translation drops the emphasis on a security instruction | «受信確認のキーは決して受信者に送らないでください。» |

### custom-domains/branding.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| major | ui-label | 48 | «**四角**、**角丸**、または**角丸（大）**» | The app renders these options as hard-coded English (`borderRadiusDisplayMap` in src/shared/utils/brand-helpers.ts). A ja reader sees "Square / Rounded / Extra Rounded", not these words | «**Square**（四角）、**Rounded**（角丸）、または **Extra Rounded**（角丸・大）» |
| major | ui-label | 49 | «**セリフ**、**サンセリフ**、**等幅**、または**システム UI**» | The app renders these as hard-coded English (`fontDisplayMap`) | «**Serif**、**Sans Serif**、**Monospace**、または **System UI**» |
| major | ui-label | 58 (also 4, 53) | «**公開時の説明**: 受信者ページの**公開前**と**公開後**» | The shipped ja labels are 閲覧手順 / 閲覧前 / 閲覧後 (web.branding.delivery_reveal_instructions, delivery_before_reveal, delivery_after_reveal) | «**閲覧手順**: 受信者ページの**閲覧前**と**閲覧後**»; use 閲覧手順 in the description and the heading as well |
| major | ui-label | 40 | «**ドメインからファビコンを再取得**» | The shipped label is «ドメインからファビコンを更新» (web.branding.refresh_favicon) | «**ドメインからファビコンを更新**» |
| minor | ui-label | 27, 33, 39, 41 | «**置き換え**» | The shipped button is «置換» (web.branding.replace_logo, replace_favicon). The reader can still find it | «**置換**» |
| minor | terminology | 73 | «[メール送信元](/en/custom-domains/email-sender)» | custom-domains/index and the app use メール送信者 | «[メール送信者](/en/custom-domains/email-sender)» |

### custom-domains/index.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | link | 40 | «[カスタムドメインを移す](/en/account/change-your-region#moving-a-custom-domain)» | The ja page exists, so this link sends ja readers to the English page | `/ja/account/change-your-region#カスタムドメインを移す` |
| minor | terminology | 21 | «ロゴ、色、フォント、閲覧時の案内» | "reveal instructions" is a third rendering. branding.md uses 公開時の説明 and the app uses 閲覧手順 | «ロゴ、色、フォント、閲覧手順» |

### custom-domains/setup-guide.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| major | ui-label | 19 | «**次で続行** _ご自身のドメイン_ を選びます。» | The app button is «{0}で続行» (web.domains.add.continue_with) and renders as e.g. «secrets.example.comで続行». No button reads «次で続行» | «**（ドメイン名）で続行** を選びます。» |
| major | ui-label | 18 | «**よく使われるサブドメイン** のいずれかを選ぶか» | The shipped label is «人気のサブドメイン» (web.domains.add.subdomains_label) | «**人気のサブドメイン** のいずれかを選ぶか» |
| minor | ui-label | 77, 78, 79 | «**SSL更新日**» / «**最終監視日時**» / «**前回の検証チェックに失敗しました**» | The current app strings are SSL更新 / 最終監視 / 最後の検証チェックが失敗しました (web.domains.ssl_renews, last_monitored, last_check_failed; changed in app 64a5a6e305, 2026-08-09). The doc follows the older bundle. The reader can still find them | «**SSL更新**» / «**最終監視**» / «**最後の検証チェックが失敗しました**» |
| minor | link | 9, 21 | «(/en/custom-domains#what-each-plan-includes)» / «(/en/custom-domains#where-your-domain-is-served)» | The ja page exists | `/ja/custom-domains#各プランに含まれるもの` / `/ja/custom-domains#ドメインが提供される場所` |

### index.mdoc

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | register | 10 | «…あるいはすべてを自分でホストする。最初のシークレットを送った後のすべてがここにあります。» | The hero tagline mixes plain form (ホストする。) with です/ます in the next sentence | «独自ドメイン上のブランド付きワークスペースをチームに提供したり、ワンタイムのシークレットリンクを自社のツールに組み込んだり、すべてをセルフホストしたりできます。最初のシークレットを送った後に必要なことは、すべてここにあります。» |

### pricing/compare-plans.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | accuracy | 31 | «カスタムメール送信元が**柔軟な From ドメイン**に拡張されます» | This reads as "the sender is extended *into* a From domain". English says Team Plus *adds* a flexible From domain to the custom sender | «Team Plus では、カスタムメール送信者に**柔軟な From ドメイン**が加わります。» |
| minor | terminology | 16 | «カスタムメール送信元» | The app (api.entitlements.errors.custom_mail_sender_required) and custom-domains/index use メール送信者 | «カスタムメール送信者» |

### pricing/index.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | fluency | 3 | «価格設定» | This is a calque of "Pricing" and means "setting prices". The page itself calls the pricing page «料金ページ» | «料金» or «料金プラン» |

### security/best-practices.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | typography | 11–72 | «**適切な有効期限を設定する**: » | Half-width ": " after Japanese labels. Shard-2 pages (setup-guide, share/index, api/index) use full-width «：». The same half-width form appears in branding.md 47–58, data-protection.md 39–40, client-libraries.md «作者: » and self-hosting/index.md 34 | Use «：» consistently across the locale |

### security/data-protection.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| major | accuracy | 29 | «お客様がデータ管理者（コントローラー）として、Onetime Secret が関与する限定的なデータの処理者（プロセッサー）として機能します。» | «Onetime Secret が関与する» reads first as a relative clause ("the limited data Onetime Secret is involved with"). That makes the customer both controller and processor. English assigns processor to Onetime Secret | «お客様はデータ管理者（コントローラー）として、Onetime Secret は対象となる限定的なデータの処理者（プロセッサー）として機能します。» |
| minor | terminology | 23 (also security/index.md:27) | «[データの保管場所](/en/security/where-your-data-lives/)» | change-your-region, api/index (×2) and custom-domains/index use «データの保存場所» | «[データの保存場所](…)» |
| minor | addition | 37 | «いつでもお手伝いいたします。» | English "We're here to help." «いつでも» adds an availability promise ("any time") | «お気軽にお問い合わせください。» |

### security/index.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | terminology | 26 | «**[私たちの理念](/en/security/our-principles)**» | The ja sidebar label for this page is «私たちの原則» (sidebar.ourPrinciples) | «**[私たちの原則](/en/security/our-principles)**» |

### security/vulnerability-disclosure.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | fluency | 11 | «安全なチャネルを調整します。» | Calque of "coordinate a secure channel" | «安全な連絡手段をご用意します。» |

### self-hosting/index.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | frontmatter | 5–6 | «sidebar: / order: 1» | The English frontmatter has no `sidebar` key. config/sidebar.mjs lists this page explicitly, so the key is an inert leftover | Remove the `sidebar` block |

### share/index.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| major | ui-label | 67 | «**閲覧済み**：閲覧が成功し» | The receipt status badge renders web.STATUS.revealed = «表示済み» (src/utils/status.ts → StatusBadge.vue). The receipt timeline uses web.STATUS.received = «受信済み». Neither shows «閲覧済み» | «**表示済み**：閲覧が成功し» |
| minor | terminology | 84 | «[シークレットをリクエストする](/en/share/request-secret)» | share/use-cases.md:31,33 calls the same page «シークレットを依頼する» | Pick one form for both pages |

### share/use-cases.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | terminology | 3 | «使用例» | The ja sidebar label (sidebar.useCases) and the link texts on custom-domains/index, share/index and share/why-secret-links all say «ユースケース» | «ユースケース» |
| minor | terminology | 7, 9, 13, 19, 27 | «各リンクで成功する表示は 1 回だけです» / «表示ページ» / «表示後» | "reveal" is 表示 here. share/index, why-secret-links, api/index and security/index use 閲覧 | «各リンクで成功する閲覧は1回だけです» / «閲覧ページ» / «閲覧後» |
| minor | register | 37 | «[送信者があなたについて知ること]» | «あなた» breaks the locale's omitted-address style | «[送信者に伝わる情報]» |

## Clean pages

- api/client-libraries.md (only the locale-wide colon style, noted under best-practices)
- share/why-secret-links.md

## Terminology consistency

| English term | Renderings found (pages) | Expected (source) | Action |
|---|---|---|---|
| secret, secret link, receipt, burn, passphrase, password, custom domain, workspace, organization, region, self-hosting | シークレット, シークレットリンク, 受信確認, 削除, パスフレーズ, パスワード, カスタムドメイン, ワークスペース, 組織, リージョン, セルフホスティング (all pages) | docs glossary, app governance | None, consistent |
| reveal (prose) | 閲覧 (share/index, why-secret-links, api/index, security/index, data-protection, change-your-region, custom-domains/index, pricing/index); 表示 (share/use-cases, pricing/compare-plans:29, custom-domains/branding:7); 公開 (custom-domains/branding labels) | 閲覧 (glossary 表示/閲覧; app 閲覧前/閲覧後/閲覧手順) | Normalise prose to 閲覧. Keep «クリックして表示» (button) and «表示済み» (status) as shipped |
| reveal instructions | 公開時の説明 (branding:4,53,58); 閲覧時の案内 (custom-domains/index:21) | 閲覧手順 (web.branding.delivery_reveal_instructions) | Align both |
| email sender | メール送信者 (custom-domains/index, pricing/index:31); メール送信元 (branding:73, compare-plans:16,31) | メール送信者 (web.domains.email.*, custom_mail_sender) | Use 送信者. Keep 送信元 only for "From domain" |
| Where your data lives | データの保存場所 (change-your-region, api/index ×2, custom-domains/index); データの保管場所 (security/index:27, data-protection:23) | データの保存場所 (majority; ja sidebar has no key) | Align |
| credential | 認証情報 (api/index:7); 資格情報 (share/use-cases, data-protection) | 資格情報 (prior ja glossary) | Align api/index |
| Use cases | 使用例 (use-cases title); ユースケース (sidebar, 3 link texts) | ユースケース (sidebar.useCases) | Retitle |
| Request a secret | シークレットをリクエストする (share/index:84); シークレットを依頼する (share/use-cases:31,33) | One form | Pick one |
| Our principles | 私たちの理念 (security/index:26) | 私たちの原則 (sidebar.ourPrinciples) | Align |
| we / our (company) | 当社 (pricing/index, best-practices); 私たち (security/index, vulnerability-disclosure) | One form | Pick one (当社 suits the corporate pages) |
| transfer ownership | 移管 (self-hosting/index:46–58) | 所有権を譲渡 (web.admin.domaintoolbox.transfer.title) | Consider 譲渡 |

## App UI label mismatches

| Page:line | Docs text | Shipped app string (key) | Note |
|---|---|---|---|
| custom-domains/branding.md:48 | 四角 / 角丸 / 角丸（大） | Square / Rounded / Extra Rounded (hard-coded, brand-helpers.ts `borderRadiusDisplayMap`) | Not localized in the app |
| custom-domains/branding.md:49 | セリフ / サンセリフ / 等幅 / システム UI | Serif / Sans Serif / Monospace / System UI (hard-coded, `fontDisplayMap`) | Not localized in the app |
| custom-domains/branding.md:4,53,58 | 公開時の説明 | 閲覧手順 (web.branding.delivery_reveal_instructions) | |
| custom-domains/branding.md:58 | 公開前 / 公開後 | 閲覧前 / 閲覧後 (web.branding.delivery_before_reveal / delivery_after_reveal) | |
| custom-domains/branding.md:40 | ドメインからファビコンを再取得 | ドメインからファビコンを更新 (web.branding.refresh_favicon) | |
| custom-domains/branding.md:27,33,39,41 | 置き換え | 置換 (web.branding.replace_logo / replace_favicon) | Near match |
| custom-domains/setup-guide.md:18 | よく使われるサブドメイン | 人気のサブドメイン (web.domains.add.subdomains_label) | |
| custom-domains/setup-guide.md:19 | 次で続行 _ご自身のドメイン_ | {0}で続行 (web.domains.add.continue_with) | Domain name comes first |
| custom-domains/setup-guide.md:77 | SSL更新日 | SSL更新 (web.domains.ssl_renews) | Changed 2026-08-09 |
| custom-domains/setup-guide.md:78 | 最終監視日時 | 最終監視 (web.domains.last_monitored) | Changed 2026-08-09 |
| custom-domains/setup-guide.md:79 | 前回の検証チェックに失敗しました | 最後の検証チェックが失敗しました (web.domains.last_check_failed) | Changed 2026-08-09 |
| share/index.md:67 | 閲覧済み | 表示済み (web.STATUS.revealed, receipt badge); 受信済み (web.STATUS.received, receipt timeline) | |

Labels checked and matching: ドメイン, 管理, 機能, ブランドを管理, ブランド / 配信 tabs, ロゴ, ロゴをアップロード, ドメインロゴ, ロゴを保存, 更新, ロゴを削除, ファビコン, ファビコンをアップロード, ファビコンを保存, ファビコンを削除, ブランドカラー, 角, フォントファミリー, 言語, ドメインを追加, カスタムドメイン, ルートドメインを使用, ドメインを検証, ドメインは検証済みで有効です, 有効, ドメインステータス, ターゲットアドレス, DNSレコード, SSLステータス, 共有する内容が入力されていません, ページに留まる, 有効期限, クリックして表示, 新規, プレビュー済み, 削除, 環境設定, APIトークン, シークレットアクティビティ.

## English source and general issues

- [new] Process: the ja translators took "shipped" UI strings from `/Users/d/Projects/run/onetimesecret-docker/locales/content/ja` (2026-07-11). App commit 64a5a6e305 (2026-08-09) changed ja domain and branding strings after that. The docs `sourceOfTruth` cites app 145c1e7cfa. The label mismatches above follow from this, and other locales whose agents used the same bundle are likely to drift the same way.
- [new] src/content/i18n/ja.json has no entry for sidebar keys used by in-scope pages: `shareASecret`, `whatCustomDomainsDo`, `plansAndPricing`, `aboutSelfHosting`, `ourApproachToSecurity`, `whereYourDataLives`, `requestSecret`. The ja sidebar falls back to English for share, custom-domains, pricing, self-hosting, security and where-your-data-lives. Other bundles were not checked.
- [new] App (not English docs): the receipt page shows the reveal state with two keys, web.STATUS.revealed in StatusBadge.vue and web.STATUS.received in TimelineDisplay.vue. In ja these render as 表示済み and 受信済み on the same page. Extends the known pl-2 item.
- [known] api/index.mdoc passphrase "used to encrypt the value" vs share/index.md "access check, not the encryption key" (fr-2). ja reproduces both statements faithfully.
- [known] self-hosting/index.md "one generated secret" is ambiguous (de-1). ja renders it with the product noun «シークレット», so ja readers will read it as a shareable secret. Revisit after the English is fixed.
- [known] custom-domains/branding.md corner and font option labels are hard-coded English in the app (nl-1); the ja findings above depend on this.
- [known] share/index.md "Revealed" status maps to web.STATUS.received (pl-2).
- [known] Sidebar ja.json `switchingRegions` = 地域の変更方法 vs page title リージョンの変更 (ja-2).
- [known] index.mdoc "Setup your custom domain"; "Configuration and upgrades" vs page title (de-2, fr-2, pt-br-2).
- [known] pricing/index.md "[Self-Hosting Guide]" link text vs page title (es-2).
- [known] api/client-libraries.md code-comment typos, link-text separators, audit date, C# `#` comment, Java `shareResponse`, Go naming, Bash CLI burn line (de-1, es-1, fr-1, it-1, pl-1, sv-2, zh-cn-2).
- [known] custom-domains/setup-guide.md region table mixes literal IPs and "As shown on the verification page" (nl-2, mi-2).
- [known] custom-domains/index.md "Keep both DNS records" (da-1).
- [known] share/index.md empty-submission error quoted with a trailing period (da-2).

## Not checked

- No site build or `dogfood.py check` was run; this review was read-only. The suggested `/ja/…#<Japanese heading>` anchors are derived from the slugger rule, not confirmed against a build.
- Prices, limits and lifetimes were checked for parity with the English only, not against `billing.yaml.txt`.
- Other locales' sidebar bundles were not read, per the protocol.
