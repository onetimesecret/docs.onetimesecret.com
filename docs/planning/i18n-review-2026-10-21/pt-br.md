# Brazilian Portuguese (pt-br) translation review

- Commit: 67f15567 — 18 pages
- English base: HEAD d30489ac
- Register expected: você (`_language-notes.md`; app governance `register.form` formal, pronoun você, possessives seu/sua, tu-forms forbidden); observed: consistent (no tu/teu/tua/ti, no o senhor/a senhora)
- Findings: 0 critical, 5 major, 19 minor

## Verdict

The translation is accurate and faithful. Security claims (one-time reveal, the passphrase as an access check, receipt lifetime, encryption, burn rules) match the English. All 18 code fences are byte-identical to the English. Terminology follows the docs glossary and app governance (mensagem confidencial, frase secreta/senha, comprovante, queimar, revelar). The 5 major findings are all on `custom-domains/branding.md`, where five quoted labels differ from the shipped pt_BR strings ("logo" vs "logotipo", "Após" vs "Depois da"). The minor findings are a few calques, three `/en/` anchor links whose targets now exist in pt-br, and two split renderings of a cross-reference title. The pages can ship once the branding labels are fixed.

## Findings

### account/change-your-region.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | fluency | 7 | «O Onetime Secret executa cada região» | "runs each region" calqued as "executa" | «O Onetime Secret opera cada região» |
| minor | fluency | 85 | «já tiverem sido reveladas, queimadas ou expiradas» | *expirar* is intransitive, so it has no passive participle in this construction | «já tiverem sido reveladas ou queimadas, ou tiverem expirado» |

### api/index.mdoc

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | fluency | 78 | «Construa sobre esta.» | Literal calque of "Build on this one." | «Use esta como base.» |

### custom-domains/branding.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| major | UI label | 34 | «em **Logo**» | Field heading is `web.branding.logo` = "Logotipo" (BrandLogoField.vue:37) | «em **Logotipo**» |
| major | UI label | 36 | «Na janela **Logo do domínio**» | `web.branding.logo_modal_title` = "Logotipo do domínio" | «Na janela **Logotipo do domínio**» |
| major | UI label | 37 | «Escolha **Salvar logo**.» | `web.branding.logo_modal_save` = "Salvar logotipo" | «Escolha **Salvar logotipo**.» |
| major | UI label | 42–43 | «depois **Remover logo**, e confirme com **Remover logo**» | `web.branding.remove_logo` = "Remover logotipo" (both occurrences) | «depois **Remover logotipo**, e confirme com **Remover logotipo**» |
| major | UI label | 80 | «**Após a revelação**» | `web.branding.delivery_after_reveal` = "Depois da revelação" (DeliveryPanel.vue:96) | «**Depois da revelação**» |

### custom-domains/index.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | markup/link | 55 | «(/en/account/change-your-region#moving-a-custom-domain)» | Target page exists in pt-br; the reader is sent to English | `/pt-br/account/change-your-region#mover-um-domínio-personalizado` |

### custom-domains/setup-guide.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | markup/link | 11 | «(/en/custom-domains#what-each-plan-includes)» | Target exists in pt-br | `/pt-br/custom-domains#o-que-cada-plano-inclui` |
| minor | markup/link | 34 | «(/en/custom-domains#where-your-domain-is-served)» | Target exists in pt-br | `/pt-br/custom-domains#onde-o-seu-domínio-é-servido` |
| minor | fluency | 25 | «insira o endereço» | `_language-notes.md` lists "Digite" as the pt-BR verb for typing; shipped pt_BR uses Digite/digite 46× vs Insira/insira 3× | «digite o endereço» |
| minor | fluency | 26 | «será perguntado onde» | Calque of "you are asked" (passive of *perguntar* with a person as subject) | «o sistema pergunta onde» |

### pricing/compare-plans.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | fluency | 30 | «é limitada por taxa por endereço de rede» | Two stacked "por" phrases read awkwardly | «tem limite de taxa por endereço de rede» |
| minor | UI label | 45 | «Marca do Workspace» | Entitlement label `web.billing.features.workspace_branding` = "Marca do Espaço de Trabalho". The app string is the outlier; every other pt_BR app string keeps "Workspace" | Keep the doc text and fix the app string (see general issues) |

### pricing/index.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | terminology | 50 | «Atividade das mensagens confidenciais, em beta» | `web.organizations.audit.title` = "Atividade de mensagens confidenciais"; compare-plans:23 and index.mdoc:29 use "de" | «Atividade de mensagens confidenciais, em beta» |

### security/data-protection.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | terminology | 27 | «[Práticas recomendadas de segurança]» | The target page's title is "Melhores práticas de segurança", also used by security/index:32 and why-secret-links:66 | «[Melhores práticas de segurança]» |

### self-hosting/index.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | terminology | 32 | «com um segredo gerado» | This is the app `SECRET` key (install/docker: `-e SECRET="$(cat .ots_secret)"`). "segredo" is the token that governance rule `rule.pt-secret-confidencial` bans, and it is ambiguous here | «com uma chave `SECRET` gerada» |
| minor | fluency | 45 | «a aplicação nunca termina TLS» | Calque of "terminates TLS" | «a aplicação nunca faz a terminação TLS» |
| minor | fluency | 103 | «O lado do usuário final disso é» | Literal calque of "The end-user side of this is" | «Para o lado do usuário final, consulte» |

### share/index.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | fluency | 103 | «uma mensagem confidencial criada sem conexão» | EN "made while signed out"; "sem conexão" reads as "offline". Line 18 uses the correct «sem estar conectado» | «criada sem estar conectado» |
| minor | fluency | 123 | «e insira a frase secreta» | Same Insira/Digite preference as setup-guide:25; the governance example uses «Digite a frase secreta» | «e digite a frase secreta» |

### share/use-cases.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | terminology | 72 | «[Práticas recomendadas de segurança]» | Does not match the target title "Melhores práticas de segurança" | «[Melhores práticas de segurança]» |

### share/why-secret-links.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | terminology | 65 | «[Atividade das mensagens confidenciais]» | App title is "Atividade de mensagens confidenciais" | «[Atividade de mensagens confidenciais]» |

## Clean pages

- api/client-libraries.md, index.mdoc, security/best-practices.md, security/index.md, security/vulnerability-disclosure.md, self-hosting/configuration.md

## Terminology consistency

| English term | Renderings found (pages) | Expected (source) | Action |
|---|---|---|---|
| Secret Activity | Atividade de mensagens confidenciais (index.mdoc:29, compare-plans:23); Atividade das mensagens confidenciais (pricing/index:50, why-secret-links:65) | "Atividade de mensagens confidenciais" (`web.organizations.audit.title`) | Normalise to "de" |
| Security best practices (page title) | Melhores práticas de segurança (best-practices title, security/index:32, why-secret-links:66); Práticas recomendadas de segurança (data-protection:27, use-cases:72) | Page title "Melhores práticas de segurança" | Normalise link text |
| logo | logo (branding, custom-domains/index:28); logotipo (compare-plans:15) | App: "Logotipo" in 4 of 5 branding keys; "Enviar logo" is the only "logo" | Use "logotipo" in labels (required); prose may stay "logo" or follow the app |
| enter (type text) | insira (setup-guide:25, share/index:123); digite (share/index:23, why-secret-links:27, best-practices:13) | Digite (`_language-notes.md`; governance examples) | Normalise to digite |
| "Check the result" heading | Verificar o resultado (branding:86); Confira o resultado (setup-guide:103) | One rendering | Optional: pick one |
| secret / secret link / receipt / burn / reveal / passphrase / password / owner / workspace | mensagem confidencial / link confidencial / comprovante / queimar / revelar / frase secreta / senha / proprietário / Workspace: consistent on all 18 pages | Docs glossary and governance | None |

## App UI label mismatches

| Page:line | Docs text | Shipped app string (key) | Note |
|---|---|---|---|
| custom-domains/branding.md:34 | Logo | Logotipo (`web.branding.logo`) | major |
| custom-domains/branding.md:36 | Logo do domínio | Logotipo do domínio (`web.branding.logo_modal_title`) | major |
| custom-domains/branding.md:37 | Salvar logo | Salvar logotipo (`web.branding.logo_modal_save`) | major |
| custom-domains/branding.md:42–43 | Remover logo | Remover logotipo (`web.branding.remove_logo`) | major |
| custom-domains/branding.md:80 | Após a revelação | Depois da revelação (`web.branding.delivery_after_reveal`) | major |
| pricing/compare-plans.md:45 | Marca do Workspace | Marca do Espaço de Trabalho (`web.billing.features.workspace_branding`) | minor; the app string is the outlier |
| pricing/index.md:50, share/why-secret-links.md:65 | Atividade das mensagens confidenciais | Atividade de mensagens confidenciais (`web.organizations.audit.title`) | minor |

All other quoted labels match the shipped pt_BR strings: the domain flow (Domínios, Gerenciar, Recursos, Adicionar domínio, Domínio personalizado, Subdomínios populares, Usar meu domínio raiz, Continuar com, Verificar Domínio, Domínio verificado e ativo, Ativo, Status do Domínio, Endereço de Destino, Registro DNS, Status do SSL, Renovação do SSL, Última Verificação, A última verificação falhou); branding (Gerenciar Marca, Marca, Entrega, Enviar logo, Substituir, Atualizar, Enviar/Salvar/Remover favicon, Atualizar favicon a partir do domínio, Cor da Marca, Cantos, Família de Fonte, Idioma, Instruções de revelação, Antes da revelação); and sharing (Você não forneceu nada para compartilhar, Permanecer na página, Expira em, Clique para revelar, Novo / Pré-visualizado / Revelado, Preferências, Identity Plus (Apoiador inicial)).

## English source and general issues

- [new] api/index.mdoc:40 — "the password is the API token from your account settings". The app labels it "API Key" (`web.account.api_key`; pt_BR "Chave de API"), and security/best-practices.md says "API Keys". Readers look for a "token" the settings page does not name.
- [new] pricing/compare-plans.md:36 "**flexible From domain**" and pricing/index.md:52 "Flexible email From domain": the app entitlement label is "Flexible Email Sender Domain" (`web.billing.features.flexible_from_domain`). Three wordings for one feature.
- [new] App (pt_BR) — `web.branding.upload_logo` = "Enviar logo", but the other logo keys use "logotipo" (Logotipo, Logotipo do domínio, Salvar logotipo, Remover logotipo). `web.billing.features.workspace_branding` / `web.billing.overview.entitlements.workspace_branding` = "Marca do Espaço de Trabalho", but the rest of the pt_BR app keeps "Workspace". Fix these app-side so the docs can quote one form.
- [new] Sidebar bundle `src/content/i18n/pt-br.json` (outside this commit) diverges from the re-synced titles. It uses Title Case ("Casos de Uso", "Comparar Planos", "Proteção de Dados"), "Alterando Sua Região" vs page title "Mudar de região", "Guia de Marca" vs "Marca personalizada do seu domínio", and "Bibliotecas Cliente" vs "Bibliotecas de cliente". It also lacks `shareASecret`, `whatCustomDomainsDo`, `plansAndPricing`, `aboutSelfHosting`, `ourApproachToSecurity` and `secretActivity`, which therefore render in English.
- [new] Correction to the [known] sv-1 item (branding labels): at app 145c1e7cfa, `web.branding.corners` ("Corners", SimpleBrandPanel.vue:218), `web.branding.delivery_reveal_instructions`, `delivery_before_reveal` and `delivery_after_reveal` (DeliveryPanel.vue) all exist and are rendered. The English page's Corners / Reveal instructions / Before reveal / After reveal match the app; "Corner Style" and "Pre-/Post-reveal Instructions" are other keys.
- [new] Correction to the [known] pl-2 item (Revealed status): `web.STATUS.revealed` ("Revealed"; pt_BR "Revelado") exists alongside `web.STATUS.received`, so for pt-br the docs status matches the app.
- [known] api/index.mdoc passphrase "used to encrypt the value" vs share/index.md "access check, not the encryption key" (fr-2). The pt-br translation mirrors both sentences faithfully.
- [known] self-hosting/index.md "one generated secret" ambiguity (de-1). pt-br rendered it "segredo"; see the finding at line 32.
- [known] index.mdoc "Setup your custom domain" (de-2, fr-2); index.mdoc "Configuration and upgrades" link label vs "Self-hosting overview" (pt-br-2).
- [known] pricing/index.md "$0/month" not localisable (nl-2); pt-br shows "$0/mês".
- [known] share/index.md empty-submission error quoted with a trailing period (da-2). pt-br copies the period after the app string «Você não forneceu nada para compartilhar».
- [known] custom-domains/setup-guide.md "no fixed limit" vs compare-plans "Unlimited" (sv-2). pt-br mirrors this: «não têm limite fixo» vs «Ilimitados».
- [known] api/client-libraries.md code-comment typos, link-label separators, csharp `#` comment, Java `shareResponse`, Bash CLI `ots burn` paste (de-1, es-1, fr-1, it-1, pl-1, zh-cn-2). The pt-br fences are identical to the English.

## Not checked

- Anchor slugs (`#mover-um-domínio-personalizado`, `#o-que-cada-plano-inclui`, `#onde-o-seu-domínio-é-servido`) are derived by hand on the assumption that Starlight keeps accented letters (github-slugger behaviour). They were not confirmed with a build, because this review was read-only and no build was run.
- `self-hosting/configuration.md` and `self-hosting/index.md` carry a legacy `sidebar.order` frontmatter key that the English lacks. It has no effect because `config/sidebar.mjs` lists links explicitly, so it is not reported as a finding.
