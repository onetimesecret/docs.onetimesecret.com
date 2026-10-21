# Spanish (es) translation review

- Commit: 2c4c6391 — 17 pages
- English base: HEAD d30489ac
- Register expected: tú per `src/content/docs/es/translations/_language-notes.md` and app governance (`rule.es-register-informal`, usted forbidden); the 2026-10-21 re-sync resolved es docs = usted, matching the pre-existing es docs corpus; observed: usted, consistent on all 17 pages (the only tú form is the verbatim app error quote at share/index.md:17, which is correct). See the governance note under "English source and general issues".
- Findings: 0 critical, 4 major, 33 minor

## Verdict

The translation is accurate and complete. There are no omissions or additions, structure and links are intact, usted is used consistently, and secreto / frase de contraseña / contraseña / destruir are used correctly throughout. UI labels on setup-guide and share/index match the shipped es app. The four major problems are:

- The branding page translates corner and font option labels that the app shows in English.
- use-cases uses "revelación" (the product term for "reveal") where the English means "disclosure".
- why-secret-links drops the conditional on the passphrase.

The rest are small UI-label differences on the branding page, terminology drift (lifetime, expiry, endpoints, settings) and fluency. It can ship once the four major findings are fixed.

## Findings

### account/change-your-region.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | terminology | 13 | «Los secretos, recibos, ajustes, organizaciones» | "settings" is «configuración» on line 20 and in the docs glossary | «Los secretos, recibos, configuración, organizaciones» |
| minor | fluency | 44 | «duran el doble que la duración de cada secreto» | "duran … duración" repeats itself | «duran el doble que cada secreto» |

### api/client-libraries.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | terminology | 13 | «llaman a los endpoints obsoletos de v1» | English loanword; the rest of the locale uses «puntos de conexión» | «llaman a los puntos de conexión obsoletos de v1» |
| minor | fluency | 76, 163 | «Usa la API v1 obsoleta solo contra `onetimesecret.com`» | Word-for-word calque of "against" | «Usa la API v1 obsoleta solo con `onetimesecret.com`» |

### api/index.mdoc

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | fluency | 29 | «y los enlaces que crea usan ese dominio» | English "links it creates" (the API); in a usted page «que crea» reads as "that you create" | «y los enlaces que crea la API usan ese dominio» |
| minor | fluency | 78 | «Construya sobre esta.» | Calque of "Build on this one" | «Use esta versión para sus integraciones.» |
| minor | terminology | 90 | «## Relacionado» | "Related" is «Contenido relacionado» on security/index.md:35 | «## Contenido relacionado» |

### custom-domains/branding.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| major | UI label | 65 | «**Cuadradas**, **Redondeadas** o **Muy redondeadas**» | The app shows these options in English (`borderRadiusDisplayMap` in src/shared/utils/brand-helpers.ts, no locale key), so the reader cannot find these labels | «**Square** (cuadradas), **Rounded** (redondeadas) o **Extra Rounded** (muy redondeadas)» |
| major | UI label | 66 | «**Serif**, **Sans serif**, **Monoespaciada** o **Interfaz del sistema**» | The app shows English option names (`fontDisplayMap`, hard-coded) | «**Serif**, **Sans Serif**, **Monospace** o **System UI**» |
| minor | UI label | 66 | «**Familia tipográfica**» | Shipped label is «Familia de fuente» (web.branding.font_family) | «**Familia de fuente**» |
| minor | UI label | 34 | «**Subir logotipo**» | Shipped label is «Subir logo» (web.branding.upload_logo) | «**Subir logo**» |
| minor | UI label | 51–52 | «**Guardar favicon**» | Shipped label is «Guardar el favicon» (web.branding.favicon_modal_save) | «**Guardar el favicon**» |
| minor | UI label | 53–54 | «**Actualizar favicon desde el dominio**» | Shipped label is «Actualizar el favicon desde el dominio» (web.branding.refresh_favicon) | «**Actualizar el favicon desde el dominio**» |
| minor | UI label | 55 | «**Eliminar favicon** y confirme con **Eliminar favicon**» | Shipped label is «Eliminar el favicon» (web.branding.remove_favicon) | «**Eliminar el favicon** y confirme con **Eliminar el favicon**» |
| minor | UI label | 63 | «**Color de la marca**» | Shipped label is «Color de marca» (web.branding.brand_color) | «**Color de marca**» |
| minor | UI label | 78 | «**Instrucciones de revelado**» | Shipped label is «Instrucciones de revelación» (web.branding.delivery_reveal_instructions); also in the description (line 4) and the heading (line 71) | «**Instrucciones de revelación**»; line 4 «instrucciones de revelación»; line 71 «## Establecer el idioma y las instrucciones de revelación» |
| minor | terminology | 95 | «## Relacionado» | Heading for "Related" differs between pages | «## Contenido relacionado» |

### custom-domains/index.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | link | 40 | `(/en/account/change-your-region#moving-a-custom-domain)` | The target exists in the es tree | `(/es/account/change-your-region#trasladar-un-dominio-personalizado)` |
| minor | terminology | 4 | «qué ajustes de dominio incluye cada plan» | "settings" elsewhere is «configuración» (lines 24, 34) | «qué configuración de dominio incluye cada plan» |

### custom-domains/setup-guide.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | link | 9 | `(/en/custom-domains#what-each-plan-includes)` | The target exists in the es tree | `(/es/custom-domains#qué-incluye-cada-plan)` |
| minor | link | 21 | `(/en/custom-domains#where-your-domain-is-served)` | The target exists in the es tree | `(/es/custom-domains#dónde-se-sirve-su-dominio)` |

### pricing/compare-plans.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | terminology | 4, 48 | «enlaces que caducan»; «una caducidad predeterminada» | expiry is «expiración»/«expirar» in the rest of the locale and in the app («Expira en») | «enlaces que expiran»; «una expiración predeterminada» |

### pricing/index.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | fluency | 7 | «Comparta información confidencial con confianza, eleve su marca y genere confianza.» | «confianza» appears twice; the English uses "confidence" and "trust" | «Comparta información confidencial con tranquilidad, refuerce su marca y genere confianza.» |
| minor | fluency | 67 | «¿Qué tan seguro es Onetime Secret?» | «Qué tan» is a Latin American form; the language notes ask for neutral Spanish | «¿Es seguro Onetime Secret?» |

### security/data-protection.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | terminology | 16 | «Cada secreto tiene una vida útil» | lifetime is «duración» on most pages | «Cada secreto tiene una duración» |

### security/index.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | terminology | 23 | «elija la vida útil más corta» | lifetime is «duración» on most pages | «elija la duración más corta» |

### security/vulnerability-disclosure.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | fluency | 33 | «no acceda, modifique ni elimine datos que no sean suyos» | «acceder» needs «a» and cannot share an object with transitive verbs | «no acceda a datos que no sean suyos ni los modifique o elimine» |

### self-hosting/index.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | terminology | 74 | «no tienen pantalla ni endpoint para ello» | English loanword; the locale uses «punto de conexión» | «no tienen pantalla ni punto de conexión para ello» |
| minor | fluency | 54 | «y avance hacia adelante» | Pleonasm | «y continúe en orden» |
| minor | fluency | 95 | «El propietario saliente se degrada, no se elimina.» | Reflexive «se degrada» reads as "deteriorates" | «El propietario saliente es degradado, no eliminado.» |

### share/index.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| minor | accuracy | 37 | «Añadir una frase de contraseña le exige presentar tanto el enlace como la frase de contraseña» | English "requires them" means the person opening the link; in a usted page «le» reads as the reader | «Si añade una frase de contraseña, quien abra el enlace debe presentar tanto el enlace como la frase de contraseña» |
| minor | terminology | 29–33 | «Cuando termina ese plazo»; «Los plazos disponibles»; «plazo máximo»; «del plazo elegido» | lifetime is «duración» on most pages, including this page's description | «esa duración»; «Las duraciones disponibles»; «duración máxima»; «de la duración elegida» |

### share/use-cases.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| major | accuracy | 55, 63 | «## Revelaciones sensibles y anonimato»; «Para una revelación que pueda poner a alguien en riesgo» | English "disclosures" means reporting sensitive information (whistleblowing). «revelación» is the product term for opening a secret, used on lines 8, 9, 20, 29 and 44 of this page, so the section reads as being about reveals | «## Comunicación de información sensible y anonimato»; «Para comunicar información que pueda poner a alguien en riesgo» |
| minor | fluency | 8 | «una única revelación correcta» | "successful" is not «correcta» | «una única revelación satisfactoria» |
| minor | terminology | 29, 44 | «Tras la revelación o la caducidad»; «puede caducar sin haberse leído» | expiry is «expiración»/«expirar» in the rest of the locale | «Tras la revelación o la expiración»; «puede expirar sin haberse leído» |

### share/why-secret-links.md

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| major | accuracy | 29 | «Cualquier persona con un enlace activo y la frase de contraseña requerida puede revelarlo.» | English "any required passphrase" is conditional. The definite article implies every secret has a passphrase, which overstates protection in the sentence about who can open a secret | «Cualquier persona con un enlace activo y, si se requiere, la frase de contraseña puede revelarlo.» |
| minor | terminology | 33 | «## Pasos siguientes» | "Next steps" is «Próximos pasos» on use-cases.md:67 | «## Próximos pasos» |

## Clean pages

- index.mdoc
- security/best-practices.md

## Terminology consistency

| English term | Renderings found (pages) | Expected (source) | Action |
|---|---|---|---|
| lifetime | duración (change-your-region, api/index, compare-plans, pricing, use-cases, why-secret-links, share/index description); vida útil (security/index:23, security/data-protection:16); plazo (share/index:29–33) | duración (prior glossary-es, majority) | Change «vida útil» and «plazo» |
| expiry / expire | expiración / expirar (most pages); caducidad / caducar (compare-plans:4,48; use-cases:29,44) | expiración / expirar (docs glossary «expira en»; app «Expira en») | Change the «caduc-» forms. Certificate expiry at setup-guide:77 («caducidad») is fine |
| endpoint | puntos de conexión (api/index, index.mdoc, data-protection, vulnerability-disclosure, change-your-region); endpoint(s) (client-libraries:13, self-hosting:74) | puntos de conexión (prior glossary-es) | Change the two loanwords |
| settings | configuración (most pages); ajustes (change-your-region:13, custom-domains/index:4, share/index:21) | configuración (docs glossary "Settings → Configuración") | Change «ajustes» |
| reveal instructions | instrucciones de revelado (branding:4,71,78; custom-domains/index:21) | Instrucciones de revelación (web.branding.delivery_reveal_instructions) | Align with the app |
| reveal | revelar / revelación (all pages) | Docs glossary.md says "view/reveal → ver/mostrar"; the app uses revelar («Clic para revelar», «Revelado») | Update src/content/docs/es/translations/glossary.md to revelar |
| disclosure (sensitive) | revelación (use-cases:55,63) | Must not collide with reveal = revelación | See the major finding |
| Related (heading) | Relacionado (api/index:90, branding:95); Contenido relacionado (security/index:35) | One rendering | Use «Contenido relacionado» |
| Next steps (heading) | Próximos pasos (use-cases:67); Pasos siguientes (why-secret-links:33) | One rendering | Use «Próximos pasos» |
| self-hosting | autoalojamiento (all pages); «Auto-hospedaje» (sidebar src/content/i18n/es.json `selfHosting`) | autoalojamiento | Fix the sidebar bundle |

## App UI label mismatches

| Page:line | Docs text | Shipped app string (key) | Note |
|---|---|---|---|
| custom-domains/branding.md:34 | Subir logotipo | Subir logo (web.branding.upload_logo) | The app uses «Logotipo» for the section and «logo» on the button |
| custom-domains/branding.md:51–52 | Guardar favicon | Guardar el favicon (web.branding.favicon_modal_save) | |
| custom-domains/branding.md:53–54 | Actualizar favicon desde el dominio | Actualizar el favicon desde el dominio (web.branding.refresh_favicon) | |
| custom-domains/branding.md:55 | Eliminar favicon | Eliminar el favicon (web.branding.remove_favicon) | Appears twice |
| custom-domains/branding.md:63 | Color de la marca | Color de marca (web.branding.brand_color) | |
| custom-domains/branding.md:65 | Cuadradas / Redondeadas / Muy redondeadas | Square / Rounded / Extra Rounded (no key; `borderRadiusDisplayMap`, src/shared/utils/brand-helpers.ts) | Hard-coded English in the app |
| custom-domains/branding.md:66 | Familia tipográfica | Familia de fuente (web.branding.font_family) | |
| custom-domains/branding.md:66 | Sans serif / Monoespaciada / Interfaz del sistema | Sans Serif / Monospace / System UI (no key; `fontDisplayMap`) | Hard-coded English in the app |
| custom-domains/branding.md:78 | Instrucciones de revelado | Instrucciones de revelación (web.branding.delivery_reveal_instructions) | |
| api/index.mdoc:39 | token de API | Clave API (web.account.api_key) | The English says "API token" but the app labels it "API Key"; see the English issues |
| share/index.md:17 | *No proporcionaste nada para compartir.* | No proporcionaste nada para compartir (web.COMMON.error_secret) | Trailing period only; the tú form is the shipped string and is quoted correctly |

Verified as matching the shipped es strings: Dominios, Gestionar, Funciones, Gestionar marca, Marca, Entrega, Logotipo, Reemplazar, Logotipo del dominio, Guardar logotipo, Eliminar logotipo, Actualizar, Subir favicon, Esquinas, Idioma, Antes de revelar, Después de revelar, Añadir dominio, Dominio personalizado, Subdominios populares, Usar mi dominio raíz, Continuar con, Verificar dominio, Dominio verificado y activo, Activo, Estado del dominio, Dirección de destino, Registro DNS, Estado SSL, Renovación SSL, Última monitorización, La última comprobación de verificación falló, Permanecer en la página, Expira en, Clic para revelar, Nuevo / Previsualizado / Revelado, Destruir, Preferencias, Actividad de secretos.

## English source and general issues

- [new] Register governance conflict (es). `src/content/docs/es/translations/_language-notes.md` ("Consistent Address — Informal 'tú' form") and app governance `rule.es-register-informal` (usted forbidden) both lock tú. The es docs corpus was usted before this commit and stays usted after it, as the re-sync resolved. Keep usted for the docs and add a docs-register section to `_language-notes.md`; otherwise every future review flags all es pages.
- [new] `src/content/docs/es/translations/glossary.md` lists "view/reveal → ver/mostrar", which conflicts with the shipped app (revelar, «Clic para revelar», «Revelado») and with every re-synced page.
- [new] Sidebar bundle `src/content/i18n/es.json`:
  - Labels use English-style Title Case («Por Qué Usar Enlaces Secretos», «Casos de Uso», «Dominios Personalizados», «Guía de Configuración», «Guía de Marca», «Comparar Planes», «Bibliotecas Cliente», «Mejores Prácticas de Seguridad»).
  - Labels diverge from page titles: «Mejores Prácticas de Seguridad» vs «Buenas prácticas de seguridad»; «Bibliotecas Cliente» vs «Bibliotecas de cliente»; «Auto-hospedaje» vs «autoalojamiento».
  - Keys are missing for translated in-scope pages (`shareASecret`, `whatCustomDomainsDo`, `plansAndPricing`, `aboutSelfHosting`, `ourApproachToSecurity`), so the es sidebar shows English labels for them.
- [new] api/index.mdoc:40: "the password is the API token from your account settings". The app labels this credential "API Key" (web.account.api_key; es «Clave API»), and security/best-practices.md uses "API Keys". Readers look for a "token" that the UI calls a key.
- [new] self-hosting/index.md: the locale copies keep a legacy `sidebar: order: 1` frontmatter key that the English page dropped (es line 5). This is harmless because `config/sidebar.mjs` lists pages explicitly, but it is the frontmatter difference reported in structure.md.
- [known] Passphrase "encrypt" vs "access check" contradiction (api/index.mdoc vs share/index.md). es reproduces both faithfully (api/index.mdoc:60, share/index.md:43).
- [known] Corner and Font Family option labels are hard-coded English in the app (nl-1). es localized them; see the branding findings.
- [known] share/index.md quotes the empty-submission error with a trailing period, and the shipped es string is in tú form (es-2, da-2).
- [known] pricing/index.md "[Self-Hosting Guide]" vs the page title (es-2). es renders it «Guía de autoalojamiento».
- [known] "no fixed limit" vs "Unlimited" (sv-2). es mirrors both («Sin límite fijo» / «Ilimitados»).
- [known] index.mdoc hero "Setup your custom domain" (de-2, fr-2). es renders it correctly as «Configure su dominio personalizado».
- [known] self-hosting/index.md "one generated secret" ambiguity (de-1). es «con un secreto generado» keeps the same ambiguity.
- [known] Locale readers are sent to /en/ pages that do not exist in the es tree (fr-1).

## Not checked

- I did not run a build. Anchor slugs in the suggested link fixes (`#trasladar-un-dominio-personalizado`, `#qué-incluye-cada-plan`, `#dónde-se-sirve-su-dominio`) come from the existing `dist/es` output, which was built before this commit; the es heading text is unchanged.
- I did not re-verify plan limits and prices against `billing.yaml.txt`. The translated figures match the English pages exactly.
