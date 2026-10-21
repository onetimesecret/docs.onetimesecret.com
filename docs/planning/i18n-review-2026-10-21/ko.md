# Korean (ko) translation review

- Commit: 7ef8d9b8 — 17 pages
- English base: HEAD d30489ac
- Register expected: 합쇼체 (-습니다) for statements, 해요체 -세요 / -해 주세요 for instructions, 저희 for first person, no 반말 (app rule.ko-register-politeness; `_language-notes.md` "consistent politeness levels"); observed: consistent. No forbidden 반말 tokens; 여러분 in the security pages is polite and acceptable.
- Findings: 0 critical, 6 major, 27 minor

## Verdict

The translation is accurate and complete. Security claims (one-time view, burn, passphrase, encryption, receipt lifetime) are faithful, and the core terms are used consistently on every page: 비밀 메시지, 비밀 링크, 수신확인, 소각, 공개, 접근 문구, 비밀번호, 요금제 and 작업 공간. Most problems are UI labels that do not match the shipped ko app (`$APP/locales/content/ko`). They cover the Delivery tab, the add-domain flow, **Stay on page** and the **Expires in** choices. The agent took these labels from an incomplete bundle, or wrote its own. There is also one broken bold in `api/index.mdoc`, plus small terminology drift between sibling pages (member, SSO, custom branding, reveal instructions). The pages can ship after the 6 major fixes.

Severity note: a UI label that names a different wording, where the reader cannot match the words on screen, is major. A near-miss that differs only by a word or a space (인기 하위 도메인 / 인기 있는 하위 도메인) is minor.

## Findings

### api/index.mdoc

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| major | markup | 9 | «**[api.onetimesecret.com](https://api.onetimesecret.com)**에 있습니다» | The closing `**` comes between `)` and the particle 에, so it is not right-flanking. The site's Markdoc (0.5.10) renders the literal asterisks: `**<a …>api.onetimesecret.com</a>**에` (verified). The English closes with `**.`. | «…전체 엔드포인트 참조는 다음 주소에 있습니다: **[api.onetimesecret.com](https://api.onetimesecret.com)**.» |
| minor | fluency | 95 | «[개발자 온램프]» | "on-ramp" is a calque that is not used in Korean docs. | «[개발자 시작 가이드]» |

### api/client-libraries.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | typography | 7 | «**공식 클라이언트는 [onetime-ruby](…)** 입니다.» | The space before the copula 입니다 is a workaround for the emphasis-flanking problem. Korean attaches the copula directly. | «**공식 클라이언트**는 [onetime-ruby](https://github.com/onetimesecret/onetime-ruby)입니다.» |
| minor | terminology | 13, 36, 75, 162 | «지원 종료된 v1 엔드포인트», «API v1(지원 종료)» | "deprecated" means discouraged but still working, and api/index:79 says v1 «여전히 작동하며». 지원 종료 means end of support. | «더 이상 권장되지 않는 v1 엔드포인트», «API v1(사용 중단 예정)» |
| minor | fluency | 12–13, 75, 162 | «`onetimesecret.com`에 대해 … v1 엔드포인트를 호출합니다» | «에 대해» is a literal calque of "against". | «`onetimesecret.com`의 … v1 엔드포인트를 호출합니다» |

### account/change-your-region.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | typography | 12–13 | «이동하여(⏎[이용 가능한 지역](…) 참조)» | The line break directly after "(" renders as a space: "이동하여( 이용 가능한 지역 참조)". | Keep "(" and the link on one line: «이동하여([이용 가능한 지역](…) 참조) 계정을 만듭니다.» |
| minor | terminology | 62 | «데이터 상주 요건» | "data residency" is 데이터 레지던시 on security/data-protection:30,42 and security/index:4. | «데이터 레지던시 요건» |
| minor | terminology | 16, 25, 26 | «구성원», «[구성원 초대]» | "members" is 멤버 on pricing/compare-plans:18–20 and self-hosting/index:82. See Terminology consistency. | «멤버», «[멤버 초대]» |

### custom-domains/branding.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| major | UI label | 75 | «**공개 지침**: 수신자 페이지의 **공개 전**과 **공개 후**에» | The Delivery tab shows «표시 안내», «표시 전» and «표시 후» (web.branding.delivery_reveal_instructions / delivery_before_reveal / delivery_after_reveal, used by DeliveryPanel.vue:73,81,96). None of the three docs labels appears on screen. | «**표시 안내**: 수신자 페이지의 **표시 전**과 **표시 후**에 표시되는 텍스트로» |
| minor | terminology | 4, 68 | «공개 지침» (description), «## 언어 및 공개 지침 설정» | Same label as line 75. | «표시 안내», «## 언어 및 표시 안내 설정» |
| major | UI label | 62 | «**모서리**: **사각**, **둥근** 또는 **더 둥근**.» | The corner options are hard-coded in English (brand-helpers.ts borderRadiusDisplayMap; SimpleBrandPanel.vue:78 "hardcoded English"), so the ko UI shows Square / Rounded / Extra Rounded. Line 63 correctly keeps the font options in English. | «**모서리**: **Square**, **Rounded** 또는 **Extra Rounded**.» |
| minor | UI label | 50 | «**도메인에서 파비콘 새로 고침**» | Shipped: «도메인에서 파비콘 새로고침» (web.branding.refresh_favicon). Near-miss (spacing only). | «**도메인에서 파비콘 새로고침**» |

### custom-domains/index.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | terminology | 22 | «로고, 색상, 글꼴, 공개 안내» | "reveal instructions" is 공개 지침 on branding.md and 표시 안내 in the app. | «로고, 색상, 글꼴, 표시 안내» |
| minor | link | 42 | «(/en/account/change-your-region#moving-a-custom-domain)» | The ko page exists, so the link sends ko readers to English unnecessarily. | `/ko/account/change-your-region#사용자-지정-도메인-이전` (id confirmed in dist/ko) |

### custom-domains/setup-guide.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| major | UI label | 21 | «**다음으로 계속** *내 도메인*을 선택합니다.» | The button is «{0}(으)로 계속» (web.domains.add.continue_with, DomainForm.vue:117), e.g. «secrets.example.com(으)로 계속». No button reads «다음으로 계속». | «입력한 도메인이 표시된 **…(으)로 계속** 버튼을 선택합니다(예: secrets.example.com(으)로 계속).» |
| minor | UI label | 20 | «**인기 하위 도메인**» | Shipped: «인기 있는 하위 도메인» (web.domains.add.subdomains_label). Near-miss. | «**인기 있는 하위 도메인**» |
| minor | UI label | 20 | «**내 루트 도메인 사용**» | Shipped: «루트 도메인 사용» (web.domains.add.root_domain_label). Near-miss. | «**루트 도메인 사용**» |
| minor | link | 10, 24 | «(/en/custom-domains#what-each-plan-includes)», «(/en/custom-domains#where-your-domain-is-served)» | The ko page exists. | `/ko/custom-domains#요금제별-포함-기능`, `/ko/custom-domains#도메인이-서비스되는-위치` (ids confirmed in dist/ko) |

### index.mdoc

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | fluency | 10 | «팀에 브랜드 작업 공간을 제공하고» | "branded workspace" reads as "a workspace for a brand". | «팀에 브랜드를 적용한 작업 공간을 제공하고» |
| minor | terminology | 29 | «구성원 초대» | Member term inconsistency (see Terminology consistency). | «멤버 초대» |

### pricing/compare-plans.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | terminology | 21 | «싱글 사인온(SSO)» | The app uses «Single Sign-On (SSO)» (web.billing.features.sso, entitlements.sso). Sibling pages also use it: custom-domains/index:26, pricing/index:42,46, index.mdoc:30. | «Single Sign-On(SSO)» |

### pricing/index.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | terminology | 32 | «맞춤형 브랜딩 및 이메일 발신자» | The app uses «사용자 지정 브랜딩» (web.billing.features.custom_branding), as does compare-plans:15. | «사용자 지정 브랜딩 및 이메일 발신자» |
| minor | terminology | 28, 34, 47, 63 | «구성원과 함께», «구성원 초대», «구성원용 관리자 역할» | The same feature rows read «멤버 초대» and «멤버에게 관리자 역할 부여» on compare-plans:18–19. | «멤버» throughout |
| minor | fluency | 7 | «브랜드를 높이고» | "elevate your brand" is a literal calque. | «브랜드 가치를 높이고» |

### security/best-practices.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | fluency | 11 | «무단 접근이 가능한 시간 창을 최소화» | "window of opportunity" is translated literally as 시간 창. | «무단 접근이 가능한 시간을 최소화» |

### security/data-protection.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | accuracy | 48 | «전용 컴플라이언스 시스템을 함께 사용하세요» | The English says "a dedicated compliant system", meaning a HIPAA-compliant system. The ko reads as "a compliance-management system". | «규정을 준수하는 전용 시스템을 함께 사용하세요» |

### self-hosting/index.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | frontmatter | 5–6 | «sidebar:⏎  order: 1» | This key was carried over from the previous ko file and is not in the English. It has no effect because config/sidebar.mjs builds the sidebar from explicit createLink entries. Flagged by structure.md. | Remove the `sidebar` key |
| minor | fluency | 17 | «`simple`은 기본 제공되는 기본값이며» | Redundant (기본 … 기본값). | «`simple`은 기본값이며» |
| minor | spelling | 88 | «이전을 미리보는 방법입니다» | 미리 보다 is written as two words. | «이전을 미리 보는 방법입니다» |

### share/index.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| major | UI label | 30 | «**페이지에 머무르기**가 활성화되어 있어도» | Shipped: «페이지 유지» (web.secrets.workspace_mode, RecentSecretsTable.vue:115). It is also present in the docker bundle the agent used. | «**페이지 유지**가 활성화되어 있어도» |
| major | UI label | 35 | «선택 항목이 **만료까지 …** 형태로 표시됩니다» | The choices render web.secrets.expiresIn «{duration} 후 만료» (TtlSelector.vue:114, SecretForm.vue:427), e.g. «1시간 후 만료». «만료까지» is only the section label web.LABELS.secret_ttl. | «선택 항목이 **… 후 만료** 형태로 표시됩니다» |

### share/use-cases.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | fluency | 34–35 | «링크는 공유된 사본의 가져오기만 제어할 뿐» | The nominalised 가져오기 makes the phrase awkward. | «링크는 공유된 사본을 가져오는 것만 제어할 뿐» |

### share/why-secret-links.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | accuracy | 13 | «브라우저, 링크, 그리고 설정한 접근 문구만 있으면 됩니다» | The English says "any passphrase you set", meaning only if one was set. The ko implies a passphrase always exists. | «브라우저와 링크, 그리고 접근 문구를 설정했다면 그 접근 문구만 있으면 됩니다» |

## Clean pages

- security/index.md
- security/vulnerability-disclosure.md

## Terminology consistency

| English term | Renderings found (pages) | Expected (source) | Action |
|---|---|---|---|
| reveal instructions | 공개 지침 (branding:4,68,75); 공개 안내 (custom-domains/index:22) | 표시 안내 (app web.branding.delivery_reveal_instructions) | Unify on 표시 안내 |
| member(s) | 구성원 (change-your-region:16,25,26; pricing/index:28,34,47,63; index.mdoc:29); 멤버 (compare-plans:18–20; self-hosting:82) | 멤버 (prior ko glossary; app members title and role name web.organizations.members.*). The app's org tab says 구성원 (web.organizations.tabs.members). | Unify on 멤버 |
| single sign-on | Single Sign-On (index.mdoc:30; custom-domains/index:26; pricing/index:42,46); 싱글 사인온 (compare-plans:21) | Single Sign-On (SSO) (app billing entitlements) | Fix compare-plans |
| custom branding | 사용자 지정 브랜딩 (compare-plans:15); 맞춤형 브랜딩 (pricing/index:32) | 사용자 지정 브랜딩 (app web.billing.features.custom_branding) | Fix pricing/index |
| data residency | 데이터 레지던시 (data-protection:30,42; security/index:4); 데이터 상주 (change-your-region:62) | 데이터 레지던시 (prior ko glossary) | Fix change-your-region |
| revoke (credential) | 취소 (use-cases:22,23); 폐기 (share/index:84; why-secret-links:29) | Prior ko glossary: 취소 | Pick one; 폐기 is the more common term for tokens and keys |
| viewed (secret) | 조회 (api/index:58,60,69); 열람 (security/index:14,22; data-protection:14; best-practices:70) | 열람 (app web.receipt.viewed «열람됨»; `_language-notes.md`) | Optional: align api/index to 열람 |
| deprecated | 지원 종료 (client-libraries ×4) | — | Reconsider (see client-libraries row) |
| Related (heading) | 관련 문서 (api/index:90; security/index:33); 관련 항목 (branding:92) | — | Unify |
| custom domain | 사용자 지정 도메인 (all pages) vs 사용자 정의 도메인 (sidebar bundle customDomains) | 사용자 지정 도메인 (app) | Fix sidebar bundle (see general issues) |
| self-hosting | 자체 호스팅 (all pages) vs 셀프 호스팅 (sidebar selfHosting, nav.label) | 자체 호스팅 (prior ko glossary) | Fix sidebar bundle |

Consistent on all 17 pages: secret 비밀 메시지, secret link 비밀 링크, receipt 수신확인, burn 소각, reveal 공개 (statuses 새 항목 / 미리보기됨 / 공개됨 and «클릭하여 공개» match the app), passphrase 접근 문구, password 비밀번호, plan 요금제 (tier names in Latin script), workspace 작업 공간, organization 조직, region 지역.

## App UI label mismatches

| Page:line | Docs text | Shipped app string (key) | Note |
|---|---|---|---|
| custom-domains/branding.md:75 | 공개 지침 | 표시 안내 (web.branding.delivery_reveal_instructions) | major |
| custom-domains/branding.md:75 | 공개 전 / 공개 후 | 표시 전 / 표시 후 (web.branding.delivery_before_reveal / delivery_after_reveal) | major |
| custom-domains/branding.md:62 | 사각 / 둥근 / 더 둥근 | Square / Rounded / Extra Rounded (hard-coded, brand-helpers.ts borderRadiusDisplayMap) | major; known nl-1 |
| custom-domains/branding.md:50 | 도메인에서 파비콘 새로 고침 | 도메인에서 파비콘 새로고침 (web.branding.refresh_favicon) | spacing only |
| custom-domains/setup-guide.md:21 | 다음으로 계속 *내 도메인* | {0}(으)로 계속 (web.domains.add.continue_with) | major |
| custom-domains/setup-guide.md:20 | 인기 하위 도메인 | 인기 있는 하위 도메인 (web.domains.add.subdomains_label) | near-miss |
| custom-domains/setup-guide.md:20 | 내 루트 도메인 사용 | 루트 도메인 사용 (web.domains.add.root_domain_label) | near-miss |
| share/index.md:30 | 페이지에 머무르기 | 페이지 유지 (web.secrets.workspace_mode) | major |
| share/index.md:35 | 만료까지 … | {duration} 후 만료 (web.secrets.expiresIn) | major |
| api/index.mdoc:39 | API 토큰 | API 키 (web.account.api_key) | Follows the English "API token"; English-source issue, see below |

Verified as matching: 도메인, 관리, 기능, 브랜드 관리, 브랜드 / 전달 tabs, 로고, 로고 업로드, 교체, 도메인 로고, 로고 저장, 로고 제거, 파비콘 업로드 / 저장 / 제거, 업데이트, 브랜드 색상, 모서리, 글꼴 패밀리, 언어, 도메인 추가, 사용자 지정 도메인, 도메인 인증, 도메인 확인 완료 및 활성 상태, 활성, 도메인 상태, 상태, 대상 주소, DNS 레코드, SSL 상태, SSL 갱신, 마지막 모니터링, 마지막 확인 검사 실패, 공유할 내용을 입력하지 않았습니다, 클릭하여 공개, 새 항목 / 미리보기됨 / 공개됨, 환경설정, 비밀 메시지 활동.

## English source and general issues

- [new] api/index.mdoc:40 — "the password is the API token from your account settings". The account settings label is "API Key" (web.account.api_key), and security/best-practices.md says "API Keys", so readers look for a "token" that the UI calls a key.
- [new] Translating-agent source: the ko agent took UI strings from `/Users/d/Projects/run/onetimesecret-docker/locales/content/ko`. That bundle lacks web.domains.add.* and web.branding.delivery_*. The agent recorded "Stay on page", "Popular subdomains", "Use my root domain" and "Continue with" as "not in shipped app". "Stay on page" exists even in the docker bundle (web.secrets.workspace_mode «페이지 유지»), and the other three exist in `$APP`. Other locales whose agents used the docker bundle probably have the same mismatches.
- [new] ko sidebar bundle `src/content/i18n/ko.json` lacks 56 of the 82 English sidebar keys. Five of the 17 re-synced pages fall back to English sidebar labels: whatCustomDomainsDo, plansAndPricing, ourApproachToSecurity, aboutSelfHosting, shareASecret. Several existing labels conflict with the re-synced pages:
  - customDomains «사용자 정의 도메인» (pages: 사용자 지정 도메인)
  - selfHosting, nav.label and nav.ariaLabel «셀프 호스팅» (pages: 자체 호스팅)
  - brandGuide «브랜드 가이드» (English: "Branding"; page title 도메인 브랜딩)
  - switchingRegions «지역 변경하기» (page title 지역 변경)
  - ourPrinciples «우리의 원칙» vs «저희의 원칙» (security/index:35)
  - communication «소통» vs «커뮤니케이션» (security/index:35)
  - notFound.createTitle «시크릿 만들기» (secret should be 비밀 메시지)
  - notFound.goToApp «Onetime Secret로» (the particle should be 으로; pages write «Onetime Secret으로»)
- [new] ko docs glossary `src/content/docs/ko/translations/glossary.md` is corrupted. From "사용자 인터페이스 요소" onward, the English and other-language columns were machine-translated into Korean and the rows no longer align (e.g. «| 피드백 > 피드백 > 정보 다시 보기 > …», «| 경고, 경고, 주의, 주의 알림…»). It also lists 사용자 정의 도메인 and 맞춤형 브랜딩, which conflict with the app. It cannot serve as a term lock.
- [new] App ko renders "reveal" two ways: 공개 (web.STATUS.revealed «공개됨», web.COMMON.click_to_continue «클릭하여 공개 →», web.branding.pre_reveal_instructions «공개 전 지침») and 표시 (Delivery tab web.branding.delivery_* «표시 안내 / 표시 전 / 표시 후»). The docs have to quote both. This is worth aligning in the app.
- [new] Site-wide heading ids: headings that end in "?" keep a U+E0101 mark in the generated id. In the current dist build (06:34 today), dist/en/custom-domains/index.html has `id="questions-or-need-support\u{E0101}"` and dist/ko has `id="질문이-있거나-지원이-필요하신가요\u{E0101}"`. A typed anchor to these headings will not match.
- [known] api/index.mdoc:61 vs share/index.md:75 passphrase-as-encryption contradiction (fr-2). The ko reproduces both versions faithfully (api/index:60, share/index:49).
- [known] self-hosting/index.md "one generated secret" ambiguity (de-1). The ko resolves it as the app key («자동 생성된 시크릿 값», line 31).
- [known] custom-domains/branding.md corner and font labels are hard-coded English (nl-1). The ko keeps the fonts in English but translated the corner options (major finding above).
- [known] custom-domains/branding.md logo formats vs the app hint (it-1); custom-domains/index.md "Keep both DNS records" (da-1).
- [known] setup-guide "no fixed limit" vs compare-plans "Unlimited" (sv-2). The ko mirrors this as 고정된 제한이 없습니다 / 무제한.
- [known] share/index.md empty-submission error has a trailing period (da-2). The ko string matches the shipped string apart from the period.
- [known] api/client-libraries.md code typos, the Java shareResponse, the C# `#` comment and the Go command under Bash "Burn a secret" are all reproduced verbatim in code blocks.
- [known] pricing/index.md "Self-Hosting Guide" link text (es-2); index.mdoc "Configuration and upgrades" (pt-br-2); /en/ fallbacks for pages missing from the locale tree (fr-1).

## Not checked

- No `pnpm build` or dogfood run (read-only review). Emphasis parity was checked by parsing the repo files, with marks, through the site's own @markdoc/markdoc 0.5.10 (.mdoc) and remark-parse 11 + remark-gfm (.md). The strong/emphasis counts match English on every page except api/index.mdoc (2 vs 3, the line 9 finding).
- The frontmatter keys audience, pageType, sourceOfTruth and plan are missing from all ko pages. This is assumed to be the locale convention, because structure.md does not flag it.
- The suggested /ko/ anchors are the ids in dist/ko (built 06:34 today). Those ids already match the re-synced ko headings, which changed in this commit, so the build used the new text.
