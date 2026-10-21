# Polish (pl) translation review

- Commit: 6fecb636 — 17 pages
- English base: HEAD d30489ac
- Register expected: informal "ty" (Ty / Twój / Ci), 2nd-person singular imperatives (app governance `register.pl.informality`; docs glossary imperative table); observed: consistent (no Pan/Pani/Państwo forms; "Czy oferujecie" in the pricing FAQ addresses the company, not the reader)
- Findings: 0 critical, 4 major, 33 minor

## Verdict

The translation is accurate and complete. Code blocks match the English byte for byte, security claims are rendered faithfully (one-time view, burn, passphrase, encryption, GDPR roles), and plan names, limits and hostnames are correct. All four major findings are on `custom-domains/branding.md`: the page quotes UI labels taken from keys the Brand and Delivery panels do not render ("Styl narożników", "Instrukcje wyświetlania", "Przed/Po wyświetleniu"), uses a synonym for "Zastąp", and translates corner options that the app shows in English. The minor findings are mainly Polish fluency, two lifetime terms used side by side, and anchored `/en/` links whose page now exists in Polish. The locale can ship once the four branding labels are fixed.

## Findings

### account/change-your-region.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | fluency | 19 | «Nowe konto zaczyna jako puste.» | Calque of "starts empty". | «Nowe konto jest początkowo puste.» |
| minor | fluency | 31-32 | «i może nie zadziałać natychmiast» | EN "it may not take effect immediately". "zadziałać" reads as "may not work". | «i może nie zacząć obowiązywać od razu» |
| minor | grammar | 33 | «Sprawdź plan, zanim na nim polegasz.» | A one-off future action after "zanim" needs the perfective. | «Sprawdź plan, zanim zaczniesz na nim polegać.» |

### api/client-libraries.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | fluency | 38 | «zero zależności uruchomieniowych» | Calque of "zero runtime dependencies". | «brak zależności w czasie wykonywania» |

### custom-domains/branding.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| major | UI label | 35, 41, 49, 54 | «**Zamień**» | The shipped button reads "Zastąp" (`web.branding.replace_logo`, `web.branding.replace_favicon`). | «**Zastąp**» (all four lines) |
| major | UI label | 64 | «**Styl narożników**» | The Brand panel renders `web.branding.corners` = "Rogi" (SimpleBrandPanel.vue:218). "Styl narożników" is `corner_style`, which this panel does not render. | «**Rogi**» |
| major | UI label | 64 | «**Kwadratowe**, **Zaokrąglone** lub **Mocno zaokrąglone**» | The options are hard-coded in English (brand-helpers.ts `borderRadiusDisplayMap`, SimpleBrandPanel.vue:84-86). Readers will not find these Polish labels. | «**Square**, **Rounded** lub **Extra Rounded**» |
| major | UI label | 77-78 | «**Instrukcje wyświetlania**» … «**Przed wyświetleniem**» i «**Po wyświetleniu**» | The Delivery tab renders "Instrukcje ujawniania", "Przed ujawnieniem" and "Po ujawnieniu" (`web.branding.delivery_reveal_instructions` / `delivery_before_reveal` / `delivery_after_reveal`, DeliveryPanel.vue:73,81,96). The translation used the `pre_/post_reveal_instructions` keys instead. | «**Instrukcje ujawniania**» … «**Przed ujawnieniem**» i «**Po ujawnieniu**» |
| minor | terminology | 4, 70 | «instrukcje wyświetlania» / «## Ustaw język i instrukcje wyświetlania» | Prose name of the feature does not match the label the reader looks for. | «instrukcje ujawniania» |
| minor | grammar | 20, 46, 53, 87 | «favicon innej niż logo», «własnej favicon», «Przesłana … favicon», «starą favicon» | "favicon" is treated as feminine. Polish uses the masculine ("ten favicon"); the feminine form is "favikona". | «favicon inny niż logo», «własnego faviconu», «Przesłany … favicon», «stary favicon» |
| minor | consistency | 17 | «[Konfiguracja domeny niestandardowej]» | The target page title is «Konfigurowanie domeny niestandardowej», which change-your-region:71 also uses. | «[Konfigurowanie domeny niestandardowej]» |
| minor | fluency | 102 | «## Pytania lub potrzebujesz wsparcia?» | The heading mixes a noun with a clause, and other pages use «pomocy» instead of «wsparcia». | «## Masz pytania lub potrzebujesz pomocy?» |

### custom-domains/index.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | terminology | 27 | «logo, kolor, czcionka, instrukcje wyświetlania» | Should match the shipped Delivery label (see branding:77). | «instrukcje ujawniania» |
| minor | link | 54 | `/en/account/change-your-region#moving-a-custom-domain` | This page exists in pl, but the link goes to the English page. | `/pl/account/change-your-region#przenoszenie-domeny-niestandardowej` (confirm the slug in a build) |
| minor | fluency | 79 | «## Pytania lub potrzebujesz pomocy?» | Noun and clause mixed in one heading. | «## Masz pytania lub potrzebujesz pomocy?» |

### custom-domains/setup-guide.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | link | 11 | `/en/custom-domains#what-each-plan-includes` | This page exists in pl, but the link goes to the English page. | `/pl/custom-domains#co-obejmuje-każdy-plan` (confirm the slug) |
| minor | link | 35 | `/en/custom-domains#where-your-domain-is-served` | Same as line 11. | `/pl/custom-domains#gdzie-obsługiwana-jest-twoja-domena` (confirm the slug) |
| minor | accuracy | 75 | «Dla porównania, oto cele…» | EN "For reference"; «Dla porównania» means "for comparison". | «Poglądowo, oto cele…» |
| minor | fluency | 131 | «## Pytania lub potrzebujesz pomocy?» | Noun and clause mixed in one heading. | «## Masz pytania lub potrzebujesz pomocy?» |

### index.mdoc

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | grammar | 18 | «Zobacz na GitHub» | The locative is not inflected. | «Zobacz na GitHubie» |
| minor | accuracy | 32 | «## Rozwój» | EN "Development" means software development. «Rozwój» reads as "growth". | «## Programowanie» |

### pricing/compare-plans.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | consistency | 3 | «Porównaj plany» | The title and sidebar say «Porównaj plany», but three cross-links call the page «Porównanie planów» (change-your-region:81, custom-domains/index:34, pricing/index:63). | Change the three link texts to «Porównaj plany» |
| minor | terminology | 24 | «Czas życia sekretu» | Most pages render secret lifetime as «czas ważności» (see Terminology). | «Czas ważności sekretu» |

### pricing/index.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | fluency | 7 | «Udostępniaj poufne informacje z pewnością» | Calque of "with confidence". «z pewnością» means "certainly". | «Udostępniaj poufne informacje bez obaw» |
| minor | grammar | 66, 74 | «na [GitHub]» | The locative is not inflected. | «na [GitHubie]» |
| minor | fluency | 74 | «zgłaszaj jako issue na [GitHub]» | English "issue" is left in the prose. | «zgłaszaj w serwisie [GitHub](…/issues)» or «jako zgłoszenie (issue) na [GitHubie]» |

### security/best-practices.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | grammar | 49 | «znajdziesz na [GitHub]» | The locative is not inflected. | «znajdziesz na [GitHubie]» |

### security/data-protection.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | terminology | 14 | «Każdy sekret ma czas życia» | Secret lifetime is «czas ważności» on most pages. | «Każdy sekret ma czas ważności» |
| minor | fluency | 56 | «## Pytania lub potrzebujesz wsparcia?» | Noun and clause mixed in one heading. | «## Masz pytania lub potrzebujesz pomocy?» |

### security/vulnerability-disclosure.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | grammar | 47 | «projekt open source na [GitHub]» | The locative is not inflected. | «na [GitHubie]» |

### self-hosting/index.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | frontmatter | 5-6 | `sidebar:` / `order: 1` | Leftover key from the old pl page (present in 6fecb636^). The EN page has no `sidebar` key, and config/sidebar.mjs lists self-hosting explicitly, so the key has no effect. | Remove the `sidebar` block |

### share/index.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | UI label | 123 | «**Wyświetlono**» | The receipt shows `web.STATUS.revealed` = "Wyświetlony" (uppercased in SecretReceiptTableItem.vue:152). Findable, but not the shipped form. | «**Wyświetlony**» |
| minor | grammar | 36 | «losowe hasło o długości i z zestawów znaków skonfigurowanych przez usługę» | Mixed prepositional structure. | «losowe hasło o długości i zestawie znaków skonfigurowanych przez usługę» |
| minor | terminology | 102 | «otwiera stronę potwierdzającą» | «potwierdzenie» means receipt in this locale, so "confirmation page" can be read as the receipt page. | «otwiera stronę pośrednią» |

### share/why-secret-links.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | terminology | 28-30 | «Potwierdzenie wyświetlenia pobiera go jednorazowo. Nadawca może sprawdzić … w [potwierdzeniu]» | Adjacent sentences use «potwierdzenie» first for "confirming the reveal" and then for "receipt". Line 28 also uses «strony potwierdzającej». | «Załadowanie strony pośredniej nie zużywa sekretu. Zatwierdzenie wyświetlenia pobiera go jednorazowo.» |

### security/index.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | terminology | 21 | «wybieraj najkrótszy praktyczny czas życia» | Secret lifetime is «czas ważności» on most pages. | «wybieraj najkrótszy praktyczny czas ważności» |

### share/use-cases.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | terminology | 18 | «Wybierz krótki, praktyczny czas życia» | Secret lifetime is «czas ważności» on most pages. | «Wybierz krótki, praktyczny czas ważności» |

## Clean pages

- api/index.mdoc

## Terminology consistency

| English term | Renderings found (pages) | Expected (source) | Action |
|---|---|---|---|
| (secret) lifetime | «czas ważności» (change-your-region, api/index, pricing/index, share/index, why-secret-links); «czas życia» (compare-plans:24, security/index:21, share/use-cases:18, data-protection:14) | No app string; «czas ważności» is the majority | Normalise the four «czas życia» uses. Keep «czas życia (TTL)» for DNS in setup-guide:96 and «krótki czas życia danych» in data-protection:41 |
| reveal | «wyświetlić / wyświetlenie» in all prose; «ujawni-» only in the disclosure/exposure sense (best-practices:41, vulnerability-disclosure, use-cases:55,63, security/index:21) | App is split: `web.STATUS.revealed` "Wyświetlony" and `click_to_continue` "Kliknij, aby wyświetlić" vs Delivery-tab "Instrukcje ujawniania / Przed ujawnieniem / Po ujawnieniu" | Keep «wyświetl-» in prose; quote the three Delivery labels verbatim (branding:77-78) |
| receipt | «potwierdzenie», «link do potwierdzenia», «klucz potwierdzenia» (consistent) | Shipped app (potwierdzenie) | Avoid «strona potwierdzająca» / «Potwierdzenie wyświetlenia» nearby (share/index:102, why-secret-links:28) |
| Replace (logo/favicon) | «Zamień» (branding) | "Zastąp" (`web.branding.replace_logo`, `replace_favicon`) | Fix branding:35,41,49,54 |
| Corners | «Styl narożników» (branding:64), «styl narożników» (branding:4) | "Rogi" (`web.branding.corners`) | Fix the label at :64; the prose at :4 can stay |
| self-hosting | «self-hosting / self-hostingu / instancja self-hosted» on all pages | Translator normalisation (prior glossary) | Pages are consistent; the sidebar bundle is not (see general issues) |
| secret link | «link do sekretu» on all pages | Docs glossary «Link do sekretu / Tajny link» | Pages are consistent; the sidebar uses «Tajne linki» (see general issues) |
| "Questions or need support?" | «Pytania lub potrzebujesz pomocy?» (custom-domains/index, setup-guide); «…wsparcia?» (branding, data-protection) | — | Use one heading: «Masz pytania lub potrzebujesz pomocy?» |
| passphrase / password / burn / custom domain / workspace / owner / admin | «fraza dostępowa» / «hasło» / «zniszczyć» / «domena niestandardowa» / «przestrzeń robocza» / «właściciel» / «administrator» | Governance + docs glossary | Consistent, no action |

## App UI label mismatches

| Page:line | Docs text | Shipped app string (key) | Note |
|---|---|---|---|
| custom-domains/branding.md:35,41,49,54 | Zamień | Zastąp (`web.branding.replace_logo`, `web.branding.replace_favicon`) | BrandLogoField.vue:71, BrandFaviconField.vue:85 |
| custom-domains/branding.md:64 | Styl narożników | Rogi (`web.branding.corners`) | SimpleBrandPanel.vue:218; `corner_style` is not rendered there |
| custom-domains/branding.md:64 | Kwadratowe / Zaokrąglone / Mocno zaokrąglone | Square / Rounded / Extra Rounded (hard-coded) | brand-helpers.ts `borderRadiusDisplayMap`; not localised |
| custom-domains/branding.md:77 | Instrukcje wyświetlania | Instrukcje ujawniania (`web.branding.delivery_reveal_instructions`) | DeliveryPanel.vue:73 |
| custom-domains/branding.md:77 | Przed wyświetleniem | Przed ujawnieniem (`web.branding.delivery_before_reveal`) | DeliveryPanel.vue:81 |
| custom-domains/branding.md:78 | Po wyświetleniu | Po ujawnieniu (`web.branding.delivery_after_reveal`) | DeliveryPanel.vue:96 |
| share/index.md:123 | Wyświetlono | Wyświetlony (`web.STATUS.revealed`) | Inflection only |

These labels match the shipped pl strings: Domeny, Zarządzaj, Funkcje, Zarządzaj marką, Marka, Dostarczanie, Logo, Prześlij logo, Logo domeny, Zapisz logo, Usuń logo, Aktualizuj, Favicon, Prześlij/Zapisz/Usuń favicon, Odśwież favicon z domeny, Kolor marki, Rodzina czcionek (font options kept EN, correct), Język, Dodaj domenę, Domena niestandardowa, Popularne subdomeny, Użyj mojej domeny głównej, Kontynuuj z, Zweryfikuj domenę, Domena zweryfikowana i aktywna, Aktywny, Status domeny, Domena, Status, Adres docelowy, Rekord DNS, Status SSL, Odnowienie SSL, Ostatnio monitorowano, Ostatnia weryfikacja nie powiodła się, Pozostań na stronie, Wygasa za, Kliknij, aby wyświetlić, Nowy, Podglądnięty, Preferencje, Nie podano niczego do udostępnienia, Identity Plus (Early Supporter).

## English source and general issues

- [new] security/best-practices.md:16 — "if one secret is compromised, the entire set of information remains protected" overstates the protection: the compromised part is exposed. The likely intent is "the rest of the information remains protected". pl:15 reproduces this.
- [new, all locales] The known sv-1 item is out of date for app 145c1e7cfa. The English branding labels are correct: the Brand panel renders `web.branding.corners` ("Corners", SimpleBrandPanel.vue:218), and the Delivery tab renders `delivery_reveal_instructions` / `delivery_before_reveal` / `delivery_after_reveal` ("Reveal instructions" / "Before reveal" / "After reveal", DeliveryPanel.vue:73,81,96). Replace, Domain logo, Save/Remove logo and the favicon actions all have keys now. Locales that quoted `corner_style` or `pre_/post_reveal_instructions`, as pl did, show strings that do not appear on those panels.
- [new, app pl] The shipped pl app is split on "reveal": 12 reveal-bearing strings use «ujawni-» and 9 use «wyświetl-». For example, `web.STATUS.revealed` "Wyświetlony" and `web.COMMON.click_to_continue` "Kliknij, aby wyświetlić →" use one stem, while `web.branding.delivery_*` uses the other. The app glossary needs a decision; the docs prose follows «wyświetl-».
- [new, pl sidebar] src/content/i18n/pl.json has no values for `aboutSelfHosting`, `plansAndPricing`, `whatCustomDomainsDo`, `apiAndSdks`, `ourApproachToSecurity`, `sharingSecrets` or `shareASecret`, so these fall back to English. Three existing labels diverge from the re-synced page terms: `selfHosting` "Własny hosting" (pages use «self-hosting»), `whyUseSecretLinks` "Dlaczego używać tajnych linków" (page title «Dlaczego warto używać linków do sekretów?») and `brandGuide` "Przewodnik marki" (page title «Branding Twojej domeny»). This is the same pattern as the known mi/ja/zh-cn sidebar item.
- [known] The pl-2 item says "Revealed" maps to `web.STATUS.received` ("Odebrano"). That is wrong: the receipt components use `web.STATUS.revealed` (SecretReceiptTableItem.vue:152), which is "Wyświetlony" in pl. The only remaining gap is the inflection at share/index.md:123.
- [known] api/index.mdoc:61 vs share/index.md:75 passphrase-as-encryption contradiction (fr-2). pl api/index.mdoc:60 and share/index.md:81 translate both sides faithfully.
- [known] pricing/index.md "Self-Hosting Guide" link text vs page title (es-2). pl:74 «Przewodnika self-hostingu» vs title «Przegląd self-hostingu».
- [known] index.mdoc "Configuration and upgrades" link text vs self-hosting title (pt-br-2). pl:45 inherits it.
- [known] index.mdoc "Setup your custom domain" (de-2, fr-2). pl renders it as a verb («Skonfiguruj»), so it is not affected.
- [known] share/index.md empty-submission error with trailing period (da-2). pl:27 inherits it.
- [known] self-hosting/index.md "one generated secret" ambiguity (de-1). pl:32 «z jednym wygenerowanym sekretem» keeps the ambiguity.
- [known] custom-domains/branding.md SVG statement vs app hint (it-1). pl:18 inherits it.
- [known] Readers are sent to /en/ for pages missing from the locale tree (fr-1).

## Not checked

- Polish heading slugs suggested for the anchored links (custom-domains/index:54, setup-guide:11,35) were derived by hand using github-slugger rules. No build was run to confirm them.
- `Manage` next to the domain: I did not open DomainsTableActionsCell.vue to see which key it renders. Both candidate keys (`web.COMMON.manage`, `web.domains.detail.manage`) are «Zarządzaj» in pl.

## Resolution (fix round, 2026-10-21)

All 37 findings were addressed: 36 as reported (some with different wording, listed below) and 1 in part. The `[new, pl sidebar]` general issue was also fixed. Shipped labels were checked against app main 145c1e7cfa (`locales/content/pl/workspace-branding.json`, `00-common.json`; SimpleBrandPanel.vue:82-86 and :218, DeliveryPanel.vue:73,81,96, BrandLogoField.vue:71, BrandFaviconField.vue:85, SecretReceiptTableItem.vue:152). The `pnpm build` output confirms the Polish anchors `#przenoszenie-domeny-niestandardowej`, `#co-obejmuje-każdy-plan` and `#gdzie-obsługiwana-jest-twoja-domena`, which resolves the first "Not checked" item.

| Commit | Subject |
|---|---|
| 78f73dfd | docs(i18n/pl): match branding labels to the shipped app |
| c9ec457a | docs(i18n/pl): match receipt status labels to the shipped app |
| 3134af67 | docs(i18n/pl): correct mistranslations in setup-guide and index |
| ea3bc06b | docs(i18n/pl): use consistent terms for lifetime, reveal and page names |
| 16e7463e | docs(i18n/pl): link to Polish pages that exist |
| cf075358 | docs(i18n/pl): fix fluency and typography |
| 1522a71f | docs(i18n/pl): align sidebar labels with page titles |
| f8b723ca | docs(i18n/pl): reword the data-protection support heading |

Fixes that use different wording from the suggestion:

- custom-domains/setup-guide.md:75: «Informacyjnie, oto cele…» instead of «Poglądowo». "Poglądowo" means "for illustration", but the table lists the actual targets.
- custom-domains/branding.md:46: «Bez własnego favicona». The shipped app uses the masculine genitive «favicona» (`web.branding.refresh_favicon_queued` «…favicona…», `refresh_favicon_user_upload_hint` «…własny favicon…»), not «faviconu». Line 49 «Aby użyć własnej,» was changed to «własnego,» under the same agreement finding.
- share/index.md:36: «o długości i zestawach znaków». This keeps the English plural "character sets".
- pricing/index.md:74: «zgłaszaj w serwisie [GitHub](…/issues)», the reviewer's first option. It avoids repeating «zgłoszenie» from the next sentence.
- src/content/i18n/pl.json: added `sharingSecrets` «Udostępnianie sekretów», `shareASecret` «Udostępnij sekret», `whatCustomDomainsDo` «Do czego służą domeny niestandardowe», `plansAndPricing` «Plany i cennik», `aboutSelfHosting` «O self-hostingu», `apiAndSdks` «API i SDK» and `ourApproachToSecurity` «Nasze podejście do bezpieczeństwa». Changed `selfHosting` to «Self-hosting», `whyUseSecretLinks` to «Dlaczego warto używać linków do sekretów» and `brandGuide` to «Branding» (the English sidebar label is "Branding", not the page title).

### Skipped findings

| Page:line | Finding | Reason |
|---|---|---|
| security/data-protection.md:56 | Use the shared heading «Masz pytania lub potrzebujesz pomocy?» | Partly fixed. The page now has «## Pytania i pomoc», which removes the noun/clause mix and uses «pomoc», but it differs from the other three pages. Every heading ending in «pomocy?» fails `tools/dogfood.py check --base b2883096`. The `correspondence()` moved-block rule pairs the AI-written «y» with the single legacy «y» removed from «życia» on line 14 and reports "marked unchanged legacy text". HEAD-based checks pass at every step. |

### Decisions needed

- TextProv (`tools/dogfood.py` `correspondence()`): when exactly one unmatched old block and one unmatched new block have the same text (here a single «y» on lines 14 and 56), they are treated as moved text. Across separate commits this produces false "marked unchanged legacy text" failures that edits from HEAD cannot fix. If the rule is narrowed, for example to blocks longer than one cluster, data-protection.md:56 can use «Masz pytania lub potrzebujesz pomocy?» like the other pages.
- App pl glossary: reveal is split in the shipped app. `web.STATUS.revealed` «Wyświetlony» and `web.COMMON.click_to_continue` «Kliknij, aby wyświetlić →» use «wyświetl-»; `web.branding.delivery_reveal_instructions` / `delivery_before_reveal` / `delivery_after_reveal` use «ujawni-». The docs prose follows «wyświetl-» and quotes the Delivery labels exactly. If the app standardises on one stem, branding.md:4,70,77-78 and custom-domains/index.md:27 must follow.
- Docs glossary candidates (pl glossary.md, not edited): secret lifetime → «czas ważności» (DNS TTL stays «czas życia (TTL)»); favicon → masculine «favicon», genitive «favicona»; the reveal confirmation page → «strona pośrednia» (keeps «potwierdzenie» for the receipt only).
- English source, security/best-practices.md:16: "if one secret is compromised, the entire set of information remains protected" overstates the protection. pl:15 reproduces it; fix the English first, then re-sync.
- Known English issues inherited by pl, left unchanged until the English is fixed: pricing/index.md "Self-Hosting Guide" link text (es-2), index.mdoc "Configuration and upgrades" (pt-br-2), share/index.md empty-submission trailing period (da-2), self-hosting/index.md "one generated secret" (de-1), branding.md SVG statement (it-1), and the passphrase-as-encryption contradiction (fr-2).
