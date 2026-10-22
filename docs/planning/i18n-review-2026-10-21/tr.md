# Turkish (tr) translation review

- Commit: 64c5d969 — 18 pages
- English base: HEAD d30489ac
- Register expected: formal siz (`_language-notes.md` §5 "Formal Address"; app governance `rule.tr-register-formal`, forbidden tokens `sen`/`senin`); observed: consistent (no informal pronouns or 2sg suffixes on any page; buttons quoted as bare stems only where the app label is a bare stem)
- Findings: 0 critical, 6 major, 31 minor

## Verdict

The translation is accurate and complete. Security statements (one-time reveal, passphrase, receipts, burn, expiry, encryption) match the English, and code blocks, links and Markdoc tags are intact. Code blocks match the English byte for byte. Brand and plan names are correct, and every "Onetime Secret" suffix follows vowel harmony. Four of the six major findings are on the branding page, which leaves 15 UI labels in English. The current tr app (`$APP` at 145c1e7cfa) translates all of them: the translating agents used an older Docker bundle in which those keys were missing. The other two major findings are a wrong form label on share/index (the expiry options) and an ambiguous "örneğin" on self-hosting/index, which a reader will take as "for example". The minor findings are mostly calques: "reveal" rendered with "göster-" when the recipient is the subject, and "ship" rendered with "gönder-". The pages can ship once the 6 major findings are fixed.

## Findings

### account/change-your-region.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | fluency | 58–59 | «Bu bağlantılar henüz açıkken» | "while those links are outstanding": "açık" (open) is vague; the description (line 4) uses «bekleyen bağlantıları». | «Bu bağlantılar hâlâ geçerliyken» |
| minor | fluency | 69–70 | «oluşturulduğu süreyi korur» | Reads as "keeps the time when it was created", not "the lifetime it was created with". | «oluşturulurken belirlenen ömrü korur» |
| minor | fluency | 71 | «Bir düşürme neleri değiştirir» | "düşürme" has no object; unclear without "plan". | «Plan düşürme neleri değiştirir» |
| minor | terminology | 91, 93 | «Özel (dedicated) örnekler» | "özel" is the locale's word for "custom" (özel alan adı); the English gloss in parentheses shows the clash. | «Size ayrılmış (dedicated) örnekler» |

### api/client-libraries.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | fluency | 131 | «Bir örnek URL'si aldığından» | "Takes an instance URL"; «örnek URL'si» reads as "an example URL". | «Bir sunucu örneğinin (instance) URL'sini aldığından» |

### api/index.mdoc

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | terminology | 39 | «parola ise hesap ayarlarınızdaki API belirtecidir» | The tr app shows "API Anahtarı" (web.account.api_key), and its own Basic-auth hint says «parola olarak API anahtarınızı kullanın» (web.settings.api.basic_auth_hint). "API belirteci" appears nowhere in the app. | «parola ise hesap ayarlarınızdaki API anahtarıdır» |

### custom-domains/branding.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| major | UI label | 23, 27, 45, 55 | «**Brand** ve **Delivery** olmak üzere iki sekme» | The tr app labels the tabs "Marka" (web.branding.tab_brand) and "Teslimat" (web.branding.tab_delivery). | «**Marka** ve **Teslimat** olmak üzere iki sekme»; same on 27, 45, 55 |
| major | UI label | 27–33, 51, 60 | «**Replace**», «**Domain logo**», «**Save logo**», «**Update**», «**Remove logo**» | The tr app shows Değiştir (replace_logo), Alan adı logosu (logo_modal_title), Logoyu kaydet (logo_modal_save), Güncelle (web.LABELS.update), Logoyu kaldır (remove_logo). | Use the tr labels, e.g. «**Değiştir**'i», «**Logoyu kaydet**'i», «**Güncelle**'yi» |
| major | UI label | 39–41 | «**Upload favicon**», «**Save favicon**», «**Refresh favicon from domain**», «**Remove favicon**» | The tr app shows Favicon yükle, Favicon'u kaydet, Favicon'u alan adından yenile, Favicon'u kaldır (web.branding.upload_favicon, favicon_modal_save, refresh_favicon, remove_favicon). | Use the tr labels |
| major | UI label | 48, 58 | «**Corners**», «**Reveal instructions**», «**Before reveal** ve **After reveal**» | The tr app shows Köşeler (web.branding.corners), Açığa çıkarma talimatları, Açığa çıkarmadan önce, Açığa çıkardıktan sonra (delivery_reveal_instructions, delivery_before_reveal, delivery_after_reveal). Square/Rounded/Serif etc. are correctly left in English (hard-coded in brand-helpers.ts). | «**Köşeler**»; «**Açığa çıkarma talimatları**: … **Açığa çıkarmadan önce** ve **Açığa çıkardıktan sonra** …» |
| minor | terminology | 4, 53 | «gösterme yönergelerinizi», «Dil ve gösterme yönergelerini ayarlama» | The prose name for this feature differs from the app label "Açığa çıkarma talimatları"; once the label at line 58 is fixed, the heading and the label will not match. | «açığa çıkarma talimatlarınızı», «Dil ve açığa çıkarma talimatlarını ayarlama» |
| minor | fluency | 7 | «alıcının gizli mesajı gösterdiği sayfa» | "göstermek" with the recipient as subject means "displays/shows (to others)", not "reveals for themselves". | «alıcının gizli mesajı görüntülediği sayfa» |

### custom-domains/index.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | link / terminology | 40 | «[Özel alan adını taşıma](/en/account/change-your-region#moving-a-custom-domain) ve [Verileriniz nerede saklanır]» | The target page exists in tr, so the link should go to `/tr/…` with the tr anchor. The link text for where-your-data-lives differs from the one used on 4 other pages («Verilerinizin bulunduğu yer»). | `/tr/account/change-your-region#bir-özel-alan-adını-taşıma`; «[Verilerinizin bulunduğu yer]» |
| minor | fluency | 13 | «herkes onu bir kez gösterebilir» | Same "reveal" = "göster-" problem: with "anyone" as subject this reads as "can show it once". | «herkes onu bir kez görüntüleyebilir» |

### custom-domains/setup-guide.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | link | 11, 33 | «(/en/custom-domains#what-each-plan-includes)», «(/en/custom-domains#where-your-domain-is-served)» | The tr page exists; the links send readers to English. | `/tr/custom-domains#her-planın-içerdikleri`, `/tr/custom-domains#alan-adınızın-nereden-sunulduğu` |
| minor | terminology | 47–48, 51 | «bölgesinde (zone)», «bölgeyi sizin yerinize ekler» | "bölge" means "region" throughout the locale, including this page's table (line 73). At line 51, without the gloss, a reader will take "zone" as "region". | «DNS bölgesinde (zone)», «DNS bölgesini (zone) sizin yerinize ekler» |
| minor | fluency | 122 | «Giriş yapmışken bir gizli mesaj oluştururken, altında oluşturduğunuz alan adını seçin.» | Two stacked "-ken" clauses and a literal "under". | «Giriş yapmış olarak bir gizli mesaj oluştururken, mesajın oluşturulacağı alan adını seçin.» |

### index.mdoc

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | UI label | 29 | «Gizli Mesaj Etkinliği'ni inceleyin» | The tr app titles the feature "Gizli Mesaj Aktivitesi" (web.organizations.audit.title). The same term appears on pricing/index.md:49, pricing/compare-plans.md:23 and share/why-secret-links.md:38. | «Gizli Mesaj Aktivitesi'ni inceleyin»; same on the three other pages |

### pricing/compare-plans.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | terminology | 16, 33 | «Özel e-posta gönderen», «özel e-posta gönderen özelliğini» | Missing compound suffix; custom-domains/index.md and pricing/index.md:31 use «e-posta göndereni». | «Özel e-posta göndereni», «özel e-posta göndereni özelliğini» |

### pricing/index.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | UI label | 15 | «Uygulama ve bu belgeler ise **Free** adını kullanır.» | In the tr app, the user menu and organization settings render web.billing.plans.free_plan = "Ücretsiz" (UserMenu.vue:688, OrganizationSettings.vue:954). Only PLAN_LABELS hard-codes "Free". | «Uygulama bu planı **Ücretsiz** (bazı ekranlarda **Free**) olarak gösterir; bu belgeler **Free** adını kullanır.» |
| minor | fluency | 68 | «bekleyen veriler ise» | "data at rest"; «bekleyen» means "waiting/pending". The glossary rendering is «beklemede». | «beklemedeki veriler ise» |

### security/best-practices.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | fluency | 47 | «Gelişmiş kendi sunucusunda barındırma güvenliği» | 3rd-person "kendi sunucusunda" where the rest of the locale uses "kendi sunucunuzda"; the word order is also awkward. | «Kendi sunucunuzda barındırmada gelişmiş güvenlik» |
| minor | fluency | 49 | «Onetime Secret'in kendi örneğini çalıştıran kuruluşlar» | Reads as "Onetime Secret's own instance". | «kendi Onetime Secret örneğini çalıştıran kuruluşlar» |

### security/index.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | terminology | 27 | «[Verileriniz nerede saklanır]» | Link text for the same page differs from the 4 other occurrences («Verilerinizin bulunduğu yer»). | «[Verilerinizin bulunduğu yer]» |

### security/vulnerability-disclosure.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | fluency | 24, 26 | «**Test hesaplarını ve kendi verilerinizi kullanın**: mümkün olan her durumda.» | The English sentence is split into bold label + colon + trailing fragment; unnatural in Turkish (also line 24). | «Mümkün olan her durumda **test hesaplarını ve kendi verilerinizi kullanın**.»; line 24: «Herhangi bir kamuya açıklamadan önce sorunu inceleyip giderebilmemiz için **bize makul bir süre tanıyın**.» |

### self-hosting/configuration.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | frontmatter | 5–6 | «sidebar: order: 4» | The English page does not have this key, which is left over from the pre-sync tr file. Navigation comes from `config/sidebar.mjs`. self-hosting/index.md:5–6 has the same key (`order: 1`). | Remove the `sidebar` block on both pages |
| minor | fluency | 31 | «En yaygın ayarların çoğu» | "most of the most common settings". | «Yaygın ayarların çoğu» |

### self-hosting/index.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| major | accuracy | 10 | «Hesapların nasıl doğrulanacağına, örneğin genel internetten erişilebilir olup olmayacağına» | Intended as "the instance's", but «örneğin» is read as "for example". The sentence then says internet reachability is an example of account authentication, which merges two of the three decisions in the English. | «Hesapların nasıl doğrulanacağına, örneğinizin genel internetten erişilebilir olup olmayacağına» |
| minor | accuracy | 67 | «ve örneğin komut satırından yapılır» | The same ambiguity: this reads as "done, for example, from the command line", which weakens "done from the instance's command line". | «ve örneğinizin komut satırından yapılır» |
| minor | fluency | 17, 36, 39, 103 | «gönderilen varsayılandır», «projenin gönderdiği», «depo ile gönderilen», «gönderilen Compose yığınları» | "ship" (deliver with the product) rendered as "send". | «varsayılan olarak gelen moddur», «projeyle birlikte gelen», «depoyla birlikte gelen», «projeyle birlikte gelen Compose yığınları» |

### share/index.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| major | UI label | 47–48 | «Formda seçenekler **Sona erme süresi …** olarak görünür.» | The options render web.secrets.expiresIn (TtlSelector.vue:114, SecretForm.vue:427) = tr «{duration} içinde sona erer», so a reader sees e.g. "7 gün içinde sona erer". "Sona erme süresi" is the field label (web.LABELS.secret_ttl), not the option text. | «Formda seçenekler **… içinde sona erer** biçiminde görünür.» |
| minor | fluency | 38, 48, 60, 86, 100 | «kimse göstermemiş olsa bile», «herkes mesajı gösterebilir», «İçeriği göstermesi gereken her kişi» | "reveal" as "göster-" with the recipient as subject reads as "show/display". Line 100 «kendi gizli mesajınızı göstermeyin» reads as "do not show your secret [to others]". Keep «Gösterildi»/«gösterilir» for status and passive. | «kimse görüntülememiş olsa bile», «herkes mesajı görüntüleyebilir», «İçeriği görüntülemesi gereken», «**Test etmek için kendi gizli mesajınızı açmayın.**» |
| minor | fluency | 92, 108 | «bir e-posta tarayıcısı», «Bir tarayıcı yazılımı bu duruma neden olabilir» | «tarayıcı» primarily means "web browser". Line 108 then says that browser software causes "Previewed", which hides the point that an automated scanner can cause it. | «bir e-posta güvenlik tarayıcısı (scanner)», «Otomatik bir bağlantı tarayıcısı (scanner) bu duruma neden olabilir» |
| minor | fluency | 40 | «Giriş yapılmış oluşturma formu» | Calque of "signed-in creation form". | «Giriş yaptığınızda kullanılan oluşturma formu» |
| minor | fluency | 52 | «Kendi barındıran bir operatör» | "self-hosted operator"; the verb has no object. | «Hizmeti kendi sunucusunda barındıran bir operatör» |
| minor | fluency | 110 | «bir gösterme işlemi zamanıyla birlikte başarılı oldu» | Reads as "a reveal succeeded together with its time". | «gösterme işlemi başarılı oldu; zamanı da gösterilir» |
| minor | fluency | 124 | «kullanılamayan-gizli-mesaj sayfasını» | Hyphenated English compound; not Turkish. | «gizli mesajın artık kullanılamadığını bildiren sayfayı» |

## Clean pages

- security/data-protection.md
- share/use-cases.md
- share/why-secret-links.md (only the cross-page "Gizli Mesaj Etkinliği" item on line 38 and the reveal-verb pattern on line 29; see Terminology)

## Terminology consistency

| English term | Renderings found (pages) | Expected (source) | Action |
|---|---|---|---|
| reveal (recipient as subject) | göster- (custom-domains/branding:7, custom-domains/index:13, share/index:38,48,60,86,100, share/why-secret-links:29) | docs glossary "view/reveal = görüntüle/göster"; app status «Gösterildi», app branding «açığa çıkarma» | Use görüntüle-/aç- when the recipient acts; keep göster- for passive and status |
| Secret Activity | Gizli Mesaj Etkinliği (index.mdoc:29, pricing/index:49, pricing/compare-plans:23, share/why-secret-links:38) | «Gizli Mesaj Aktivitesi» (web.organizations.audit.title) | Align to app |
| API token / API key | API belirteci (api/index:39); API anahtarı (security/best-practices:41–43) | «API Anahtarı» (web.account.api_key) | API anahtarı |
| reveal instructions | gösterme yönergeleri (custom-domains/branding:4,53; custom-domains/index:21); label kept EN (branding:58) | «Açığa çıkarma talimatları» (web.branding.delivery_reveal_instructions) | Align to app |
| email sender | e-posta göndereni (custom-domains/index:22–23, pricing/index:31); e-posta gönderen (pricing/compare-plans:16,33; pricing/index:48) | — (app mixed: gönderici/gönderen) | «e-posta göndereni» in noun phrases |
| Where your data lives (link text) | Verilerinizin bulunduğu yer (account/change-your-region:9, security/data-protection:34, api/index:27,92); Verileriniz nerede saklanır (security/index:27, custom-domains/index:40) | — | One rendering |
| Setting up a custom domain (link text) | Özel alan adı kurma (page title; account/change-your-region:66); Özel alan adı kurulumu (custom-domains/branding:13) | tr page title | Use the title |
| DNS zone | bölge (zone) / bölge (custom-domains/setup-guide:48,51) | collides with region = bölge | «DNS bölgesi (zone)» |
| instance | örnek (consistent), but genitive «örneğin» collides with "for example" (self-hosting/index:10,67); «örnek URL'si» (api/client-libraries:131) | — | Use «örneğiniz-» or «sunucu örneği» where ambiguous |
| ship / shipped | gönder- (self-hosting/index:17,36,39,103) | — | «birlikte gelen» |
| dedicated (instance) | Özel (dedicated) (account/change-your-region:91,93) | collides with custom = özel | «size ayrılmış (dedicated)» |

Checked and consistent: secret = gizli mesaj, secret link = gizli bağlantı, receipt = makbuz, burn = yak-/yakıldı, passphrase = güvenlik ifadesi, password = parola, custom domain = özel alan adı, branding = markalama, organization = kuruluş, workspace = çalışma alanı, owner/admin = sahip/yönetici, region = bölge, self-hosting = kendi sunucunuzda barındırma. No "sır" anywhere.

## App UI label mismatches

Shipped strings from `$APP/locales/content/tr/*.json` at 145c1e7cfa.

| Page:line | Docs text | Shipped app string (key) | Note |
|---|---|---|---|
| custom-domains/branding:23,27,45,55 | Brand / Delivery | Marka / Teslimat (web.branding.tab_brand / tab_delivery) | Added to tr 2026-08-09 (c7b0cc2c86); absent from the Docker bundle the translators used |
| custom-domains/branding:27,33,39,41 | Replace | Değiştir (web.branding.replace_logo, replace_favicon) | |
| custom-domains/branding:28 | Domain logo | Alan adı logosu (web.branding.logo_modal_title) | |
| custom-domains/branding:29 | Save logo | Logoyu kaydet (web.branding.logo_modal_save) | |
| custom-domains/branding:31,51,60 | Update | Güncelle (web.LABELS.update) | |
| custom-domains/branding:33 | Remove logo | Logoyu kaldır (web.branding.remove_logo) | |
| custom-domains/branding:39 | Upload favicon / Save favicon | Favicon yükle / Favicon'u kaydet (web.branding.upload_favicon / favicon_modal_save) | |
| custom-domains/branding:40 | Refresh favicon from domain | Favicon'u alan adından yenile (web.branding.refresh_favicon) | |
| custom-domains/branding:41 | Remove favicon | Favicon'u kaldır (web.branding.remove_favicon) | |
| custom-domains/branding:48 | Corners | Köşeler (web.branding.corners); also Köşe Stili (web.branding.corner_style) | EN quotes "Corners" |
| custom-domains/branding:58 | Reveal instructions / Before reveal / After reveal | Açığa çıkarma talimatları / Açığa çıkarmadan önce / Açığa çıkardıktan sonra (web.branding.delivery_reveal_instructions / delivery_before_reveal / delivery_after_reveal) | |
| share/index:48 | Sona erme süresi … | {duration} içinde sona erer (web.secrets.expiresIn) | Option text; "Sona erme süresi" is the field label web.LABELS.secret_ttl |
| api/index:39 | API belirteci | API Anahtarı (web.account.api_key) | |
| index.mdoc:29 (+3 pages) | Gizli Mesaj Etkinliği | Gizli Mesaj Aktivitesi (web.organizations.audit.title) | |
| pricing/index:15 | Free ("the app calls it Free") | Ücretsiz (web.billing.plans.free_plan, UserMenu.vue:688) | PLAN_LABELS hard-codes "Free" elsewhere |
| custom-domains/setup-guide:44 | **Host:** | Sunucu (web.domains.host_0 / host_1) | Not a finding: the app's "Sunucu" (server) is a poor rendering of a DNS host label. A gloss «Host (Sunucu)» would help readers match the column |

Verified matching: Alan Adları, Yönet, Özellikler, Markayı Yönet, Logo yükle, Marka Rengi, Yazı Tipi Ailesi, Dil, Alan adı ekle, Özel Alan Adı, Popüler alt alan adları, Kök alan adımı kullan, {0} ile devam et, Alan Adını Doğrula, Alan adı doğrulandı ve aktif, Aktif, Alan Adı Durumu, Alan Adı, Hedef Adres, DNS Kaydı, SSL Durumu, SSL Yenileme, Son İzleme, Son doğrulama kontrolü başarısız oldu, Paylaşılacak herhangi bir şey girmediniz, Sayfada kal, Göstermek için tıklayın, Yeni / Önizlendi / Gösterildi, Ana Sayfa Gizli Mesajları, Gelen Gizli Mesajlar.

## English source and general issues

- [new] Process, likely all locales: the translating agents took "shipped" strings from `/Users/d/Projects/run/onetimesecret-docker/locales/content/<locale>/`, which lacks keys that `$APP` has at 145c1e7cfa. `prior/glossary-tr.md` records "everything else in workspace-branding.json is unshipped for tr (value None)", but the tr strings exist in `$APP` since 2026-08-09 (c7b0cc2c86). Recheck every "kept English because unshipped" decision against `$APP`, especially on custom-domains/branding.md.
- [new] api/index.mdoc:40 — "the password is the API token from your account settings": the settings screen labels it "API Key" (web.account.api_key); only web.settings.api.basic_auth_hint says "API token". Use one term.
- [new] share/index.md:51–52 — "On the form, the choices read **Expires in …**": the options come from the template web.secrets.expiresIn "Expires in {duration}". Verb-final locales put the duration first (tr «{duration} içinde sona erer»), so they cannot quote the prefix. Suggest "the choices read like **Expires in 7 days**".
- [new] pricing/index.md:18–19 — "The app and these docs call it **Free**": the user menu and organization settings render web.billing.plans.free_plan, which is localized (tr «Ücretsiz»). Only PLAN_LABELS (src/types/billing.ts:90) hard-codes "Free". The statement is true only in English.
- [new] tr sidebar bundle `src/content/i18n/tr.json`: sidebar.brandGuide «Marka Kılavuzu» ("Brand guide") does not match the EN label "Branding" or the page title «Alan adınızı markalama». sidebar.useCases «Kullanım Durumları» does not match the page title «Kullanım senaryoları». sidebar.sharingSecrets is missing, so the translated share/index.md shows the English label "Sharing secrets". Known-issues lists sidebar divergence only for mi/ja/zh-cn.
- [known] Passphrase "used to encrypt" (api/index.mdoc) vs "access check" (share/index.md, why-secret-links.md): tr mirrors both claims (api/index.mdoc:60, share/index.md:71, share/why-secret-links.md:23).
- [known] index.mdoc "Setup your custom domain": tr renders it correctly as a verb («Özel alan adınızı kurun»).
- [known] account/change-your-region.md step 4 unwrapped line: tr rewrapped it.
- [known] self-hosting/index.md "one generated secret": tr reads it as an app key («tek bir oluşturulmuş gizli anahtarla»).
- [known] api/client-libraries.md code-comment typos and C#/Java/Bash snippet problems: tr preserves code verbatim.
- [known] "no fixed limit" vs "Unlimited": tr mirrors both (setup-guide:10 «sabit bir sınır yok», compare-plans:11 «Sınırsız»).
- [known] custom-domains/branding.md label names vs app keys (Corners, Before/After reveal).
- [known] index.mdoc "Configuration and upgrades" and pricing/index.md "Self-Hosting Guide" link texts: tr mirrors both.
- [known] Secret Activity label; Free vs Basic naming; /en/ links to pages missing from locale trees.

## Not checked

- No build, `check:*` script or link checker was run (review only). The `/tr/` anchor slugs suggested above are derived from the tr headings and assume Starlight's default slugger; they were not rendered.
- self-hosting/configuration.md: the 597-line YAML block was compared to the English by script (byte-identical) and not read line by line.
- UI labels were compared against `$APP` at 145c1e7cfa as the protocol requires. Whether production currently serves those tr strings was not verified.

## Resolution (fix round, 2026-10-21)

| Commit | Subject |
|---|---|
| 1926ae88 | docs(i18n/tr): match branding labels to the shipped app |
| 004d5916 | docs(i18n/tr): match expiry, API key, plan and activity labels to the app |
| 153dc46f | docs(i18n/tr): correct mistranslations in self-hosting/index |
| 432a2a55 | docs(i18n/tr): use consistent terms for reveal, zone and instance |
| 5810dab6 | docs(i18n/tr): link to Turkish pages that exist |
| d44a0979 | docs(i18n/tr): fix fluency and typography |
| 484db777 | docs(i18n/tr): align sidebar labels with page titles |
| 5cee02ca | docs(i18n/tr): gloss the DNS zone on setup-guide line 51 |
| (this commit) | docs(planning): record Turkish fix-round resolution |

All 37 findings (6 major, 31 minor) are fixed. Every UI label was re-verified against `$APP/locales/content/tr/*.json` at 145c1e7cfa. Also fixed from the terminology table: custom-domains/index:21 «gösterme yönergeleri» → «açığa çıkarma talimatları»; account/change-your-region:95 «özel altyapı» → «size ayrılmış altyapı» (same "dedicated" collision as lines 91 and 93).

Wording that differs from the suggested fix:

- account/change-your-region:70 — «oluşturulurken belirlenen süreyi korur», not «ömrü»: the locale uses «süre» for a secret's lifetime throughout.
- security/vulnerability-disclosure:24 — kept «fırsat» (EN "opportunity") rather than «süre».
- custom-domains/setup-guide:51 — «bölgeyi (DNS zone)», not «DNS bölgesini (zone)». The suggested form passed `dogfood check --base HEAD` but failed `--base b2883096` once the line 11 link changed (see Decisions needed).
- src/content/i18n/tr.json — also added `sidebar.shareASecret` («Gizli mesaj paylaş», glossary "Share a secret"). That key, not `sharingSecrets`, labels the share/index link. `sharingSecrets` (the group heading) is now «Gizli mesaj paylaşma».

Validation run in the worktree: `python3 tools/dogfood.py check --base b2883096` (16 files, 0 failed), `pnpm test` (175 passed), `pnpm run check:frontmatter`, `pnpm run check:nav`, `pnpm build` (exit 0). The built `dist/tr/` pages contain the anchors `her-planın-içerdikleri`, `alan-adınızın-nereden-sunulduğu` and `bir-özel-alan-adını-taşıma`.

### Skipped findings

| Page:line | Finding | Reason |
|---|---|---|
| pricing/index:48 | Terminology table: «Esnek e-posta gönderen (From) alan adı» listed under "e-posta gönderen" | Not a finding row. EN is "Flexible email From domain"; here «gönderen» is a participle modifying «alan adı». «göndereni alan adı» would be ungrammatical. |
| custom-domains/setup-guide:44 | **Host:** vs app «Sunucu» | Marked "Not a finding" in the report. The docs label matches the EN docs; the fix belongs in the app (see below). |

### Decisions needed

- tr docs glossary (`src/content/docs/tr/translations/glossary.md`), proposed additions. Its "view/reveal = görüntüle/göster" row does not say which verb applies when. Proposed: when the recipient reveals, use görüntüle-/aç-; use göster- for passive forms and statuses («Gösterildi»). Also add: reveal instructions = «açığa çıkarma talimatları» (web.branding.delivery_reveal_instructions); Secret Activity = «Gizli Mesaj Aktivitesi» (web.organizations.audit.title); API key/token = «API anahtarı» (web.account.api_key); DNS zone = «DNS bölgesi (zone)»; dedicated instance = «size ayrılmış (dedicated) örnek»; instance genitive = «örneğiniz-»/«sunucu örneği», never bare «örneğin», which reads as "for example"; ship(ped) = «birlikte gelen»; email sender (noun) = «e-posta göndereni».
- English source, pricing/index.md:18–19: "The app and these docs call it **Free**" is true only in English, because UserMenu.vue:688 and OrganizationSettings.vue:954 render web.billing.plans.free_plan (tr «Ücretsiz»). tr now says the app shows «Ücretsiz» (and «Free» on some screens). The EN sentence needs rewording so other locales can follow.
- English source, share/index.md:51–52: "the choices read **Expires in …**" cannot be quoted in verb-final locales; tr now quotes «… içinde sona erer». Suggested EN: "the choices read like **Expires in 7 days**".
- English source, api/index.mdoc:40: "API token" vs the settings label "API Key" (web.account.api_key). tr now says «API anahtarı».
- App: web.domains.host_0 / host_1 tr «Sunucu» ("server") is a poor rendering of the DNS "Host" column label. «Host» or «Ana bilgisayar adı» would match what DNS providers show.
- Tooling (TextProv): `correspondence()` in tools/dogfood.py pairs single-character unmatched gaps across distant lines. Here the unmarked `s` of the old setup-guide:11 URL paired with a new `s` at :51. Per-commit `check --base HEAD` passed while the cumulative `check --base b2883096` failed, so cherry-picks should be re-checked against their own base. Separately, `dogfood edit` with a span that contains unmarked legacy clusters can attach marks to the wrong clusters (first attempt on branding.md:39). That uncommitted attempt was discarded by rewriting the file from `git show HEAD:` and redone with label-only spans.
- `$S/prior/glossary-tr.md` still says the workspace-branding strings are "unshipped for tr". They exist in `$APP` since c7b0cc2c86 (2026-08-09). Correct it before the next tr pass.
