---
title: "Phase 3 — nav, redirect and frontmatter edit specification"
description: "Executable edit spec for stream B part 2 and stream C: the install/ sidebar group, the installation redirect family, the operator frontmatter backfill, and the configuration-generator locale warning."
---

# Phase 3 — nav, redirect and frontmatter edit specification

**What this is:** the exact mechanical edits for the `install/` sidebar group, the
`self-hosting/installation` redirect family, the seven-page operator frontmatter backfill, and the
`configuration-generator` locale warning. Written to be executed without re-reading the checkers.

Companion documents:
[`…-phase-3-prep.md`](./documentation-audit-2026-08-phase-3-prep.md) (the plan),
[`…-phase-3-handoff.md`](./documentation-audit-2026-08-phase-3-handoff.md) (established facts),
[`…-phase-3-reverification.md`](./documentation-audit-2026-08-phase-3-reverification.md) (stream A's
backward pass).

**Two decisions are settled and this spec assumes them.**

- **D-4.1** — operator pages do not restate defaults inline. They link to
  `self-hosting/environment-variables` / `self-hosting/configuration` and carry `sourceOfTruth`.
  `bin/check-frontmatter.mjs` assertion 4 is extended to `audience: operator`. §3.4 has the code.
- **D-4.2** — the ownership-transfer page is deferred to Phase 4 (Operate). Phase 3 adds a short
  verified subsection to `self-hosting/index` naming `bin/ots org transfer-ownership`. §3.5 has the
  re-pinned citations.

**Line-number pins.** Everything cited below was read at the current working tree of
`docs.onetimesecret.com@claude/phase-3-install-group` and at `onetimesecret@75ce160` (2026-08-10),
not at the `6af1fe3` pin the three planning documents use. §0 lists every place a planning document's
number or claim is wrong at HEAD.

---

## 0. Corrections to the planning documents

Read this section before executing anything; four of these change what you would otherwise type.

| Claim | Where | State at HEAD |
|---|---|---|
| "`self-hosting/index` and `simple-or-full-auth` both sit at `sidebar.order: 3`, as does `installation`" | handoff §5 | **Wrong on `index`.** `src/content/docs/en/self-hosting/index.md:5` is `order: 1`. The real collisions are `installation` = `simple-or-full-auth` = 3 (`installation.md:5`, `simple-or-full-auth.md:5`) and `environment-variables` = `upgrading-v0-23` = 5 (`environment-variables.md:5`, `upgrading-v0-23.md:5`). |
| "`config/redirects.mjs` asserts no redirect source is also a page" | `docs/archive/documentation-audit-2026-08-phase-2/deleted-files.md:24`, echoed in prep §4.2 | **No such assertion exists.** `config/redirects.mjs` exports exactly two: `assertNoDuplicateSources` (`:237-249`) and `assertNoChainedRedirects` (`:214-227`). Nothing in `bin/` checks it either (grep-verified across `bin/*.mjs` and `bin/lib/*.mjs`). The constraint is real but **unenforced** — deleting the 8 `installation.md` files is manual discipline, and `pnpm build` is the only thing that will notice. |
| "the reasoning is at **266-268** — three bullets" (the Phase 1 `X-Forwarded-For` correction) | handoff §5 | The `:::note[Client IP forwarding and proxy trust]` block is `installation.md:264-269` and carries **four** bullets at `:265-268`. The handoff's range silently drops the `TRUSTED_PROXY_ENABLED=true` bullet at `:265`. The two `proxy_set_header X-Forwarded-For $remote_addr;` lines are at **244** and **253**, exactly as stated. |
| "`bin/ots org transfer-ownership` … has `--dry-run` and `--demote-to`" | handoff §3, re-verification §6.1 | **No `--dry-run` flag exists at HEAD.** `lib/onetime/cli/org/transfer_ownership_command.rb` declares three options — `:demote_to` (`:66-69`), `:yes` (`:70-74`), `:json` (`:75-78`). Dry-run is *internal*: `TransferOwnership#initialize` defaults `dry_run: true` (`lib/onetime/operations/org/transfer_ownership.rb:175`) and the CLI runs a preview at `:135` before prompting, then applies with `dry_run: false` at `:92`. An operator suppresses the preview with `--yes`; they cannot request a preview-only run. Do not write `--dry-run` on any page. |
| "non-EN locales 404" for `configuration-generator` | prep §1 nav-warning row, handoff §6 | **They do not.** `configGeneratorRedirects` (`config/redirects.mjs:279-284`) already sends all 16 non-default locales to `/en/self-hosting/configuration-generator/`. The `check:nav` WARN is unconditional and redirect-blind (`bin/check-nav.mjs:89-93`). See §4. |

One planning-document assumption **confirmed**: `installation.md` mentions neither
`JOBS_SCHEDULER_ENABLED` nor `JOBS_FALLBACK_SYNC` (grep-verified), so this is a "do not import"
constraint on `install/docker`, not a strip-out.

---

## 1. NAV — the `install/` sidebar group

### 1.1 There are no order values in `config/sidebar.mjs`

`createLink` (`config/sidebar.mjs:92-101`) and `createGroup` (`:114-122`) emit `{label, link,
translations, attrs}` and `{label, translations, items, collapsed}`. Neither carries an `order`.
Starlight renders a manual sidebar in **array order**. `sidebar.order` in page frontmatter is
consumed only by `autogenerate` groups, and there are none — `grep -rn "autogenerate" config/ src/
astro.config.mjs` returns nothing, and `config/starlight.mjs:97` passes the manual `sidebar` array
straight through.

**Consequence for the "slot `features/` and `configure/` in later without renumbering" requirement:**
it is already satisfied and the only way to break it is to invent a numbering scheme. Adding a
group later is a pure array splice that touches no existing entry. Do not add `order` keys to
`sidebar.mjs`.

`sidebar.order` frontmatter is therefore **inert for navigation**. It is still worth keeping
coherent (§3.3) because it is the only in-file record of intended reading order and because it
becomes live the moment anyone converts a group to `autogenerate`.

### 1.2 The edit: replace `config/sidebar.mjs:204-221`

Current block (lines 204-221):

```js
  createGroup("selfHosting", [
    createGroup("installAndDeploy", [
      createLink("aboutSelfHosting", "self-hosting"),
      createLink("authModeChoice", "self-hosting/simple-or-full-auth"),
      createLink("installationDeployment", "self-hosting/installation"),
    ]),

    createGroup("configure", [
      createLink("configurationReference", "self-hosting/configuration"),
      createLink("configurationGenerator", "self-hosting/configuration-generator"),
      createLink("environmentVariables", "self-hosting/environment-variables"),
    ]),

    createGroup("troubleshootAndUpgrade", [
      createLink("upgradingToV024", "self-hosting/upgrading-v0-24"),
      createLink("upgradingToV023", "self-hosting/upgrading-v0-23"),
    ]),
  ]),
```

Replacement:

```js
  createGroup("selfHosting", [
    // Install & deploy. The first two are orientation and the one decision that
    // changes what you install; the six install/* pages are the split of the
    // retired self-hosting/installation (Phase 3, stream B) in the order a
    // first-time operator meets them. install/ has no index page on purpose —
    // nothing links to /en/install/ and the group IS the index.
    createGroup("installAndDeploy", [
      createLink("aboutSelfHosting", "self-hosting"),
      createLink("authModeChoice", "self-hosting/simple-or-full-auth"),
      createLink("imagesAndVariants", "install/images-and-variants"),
      createLink("installWithDocker", "install/docker"),
      createLink("installOnLinux", "install/linux"),
      createLink("runAsAService", "install/run-as-a-service"),
      createLink("reverseProxyAndTls", "install/reverse-proxy-and-tls"),
      createLink("verifyYourInstall", "install/verify"),
    ]),

    // Configure. The three entries below are the surviving reference pages;
    // Phase 4 retires them as movedPages families. Phase 3's eight configure/*
    // pages are appended ABOVE them when they land — the task-shaped pages read
    // first, the reference pages last.
    createGroup("configure", [
      createLink("configurationReference", "self-hosting/configuration"),
      createLink("configurationGenerator", "self-hosting/configuration-generator"),
      createLink("environmentVariables", "self-hosting/environment-variables"),
    ]),

    // A createGroup("features", [...]) call goes here when the first
    // features/* page lands. It is NOT added empty: bin/check-nav.mjs:68-72
    // fails on a group with no items.

    createGroup("troubleshootAndUpgrade", [
      createLink("upgradingToV024", "self-hosting/upgrading-v0-24"),
      createLink("upgradingToV023", "self-hosting/upgrading-v0-23"),
    ]),
  ]),
```

**What moves out of the self-hosting group:** exactly one entry —
`createLink("installationDeployment", "self-hosting/installation")` at `:208`. It is deleted, not
relocated. Its six successors are new links, not moved ones.

**What stays:** `aboutSelfHosting` and `authModeChoice` keep their positions. The `configure` and
`troubleshootAndUpgrade` groups are untouched by this edit.

### 1.3 i18n keys

Six new keys, added to `src/content/i18n/en.json` inside the existing top-level `sidebar` object
(the file is `{"nav": {...}, "sidebar": {...}, "staging.bannerWarning": ..., …}` — `sidebar` is a
nested object, not dotted keys):

| Key | English label |
|---|---|
| `sidebar.imagesAndVariants` | `Images and variants` |
| `sidebar.installWithDocker` | `Install with Docker` |
| `sidebar.installOnLinux` | `Install on Linux` |
| `sidebar.runAsAService` | `Run as a service` |
| `sidebar.reverseProxyAndTls` | `Reverse proxy and TLS` |
| `sidebar.verifyYourInstall` | `Verify your install` |

All six are globally distinct from the 79 existing `sidebar.*` labels, which
`bin/check-nav.mjs:79-87` requires — it compares labels across the **whole tree**, not against
siblings, and a duplicate is a hard failure.

`sidebar.installationDeployment` ("Installation & Deployment") becomes **orphaned**. Do not delete
it: it exists in all 17 locale bundles and the repo's established treatment for a retired sidebar key
is to keep it and document it. Add it to the "Orphaned i18n Keys" list in `CLAUDE.md` alongside
`sidebar.v1` / `sidebar.v2` / `sidebar.createSecrets` / `sidebar.retrieveSecrets` / `sidebar.trust`,
with the reason: *the Installation & Deployment page was split into six `install/*` pages in
Phase 3.*

Reserved for later, not added now: `sidebar.features` ("Features") for the Features group.

### 1.4 Do the six keys have to be added to all 17 locale JSON files?

**No.** Two independent reasons, both verified:

1. **`check-locales` does not read the i18n bundles at all.** `bin/check-locales.mjs:14-48` compares
   `configuredLocales()` (the keys of `i18nConfig.locales`, `bin/lib/nav.mjs:145-149`) against
   `localeDirs()` (directory names under `src/content/docs`, `:152-159`) and the
   `config/unconfigured-locales.allow` allowlist. No key parity check exists anywhere in `bin/`.
2. **`buildTranslations` is designed for English-only keys.** `config/sidebar.mjs:70-79` skips any
   locale whose bundle has no value for the key, and the header comment at `:62-67` states the
   intent outright: *"This lets us add English-only sidebar keys without breaking the build or
   hand-editing all 16 non-English locale files first — the translation pipeline fills them in
   later."* A locale with no value falls back to the English `label`.

So: **edit `src/content/i18n/en.json` only.** The other 16 bundles are the translation pipeline's
work, not this commit's.

(The `i18n` content collection schema in `src/content.config.ts:58-83` is also not a gate here —
`config/sidebar.mjs:10-18` reads the JSON with `readFileSync`, bypassing the collection entirely.)

### 1.5 Group ordering, stated so the next two groups cost nothing

Final order of the four sub-groups inside `selfHosting`, by array position:

1. `installAndDeploy` — 8 items after this edit
2. `configure` — 3 items now, 11 when Phase 3's `configure/*` pages land (new ones prepended)
3. `features` — absent now, spliced in between 2 and 4 when the first `features/*` page lands
4. `troubleshootAndUpgrade` — 2 items now, 9 in Phase 4

Nothing about this ordering is encoded in a number anywhere, which is the point.

---

## 2. REDIRECTS

### 2.1 The mechanism cannot fan 1:5, and why

`createRedirectsConfig` (`config/redirects.mjs:262-380`) expands `movedPages` at `:268-275`:

```js
  const movedPageRedirects = Object.fromEntries(
    LOCALES.flatMap((locale) =>
      movedPages.map(({ from, to, fragment, toDefaultLocale }) => [
        `/${locale}/${from}`,
        localeUrl(toDefaultLocale ? i18nConfig.defaultLocale : locale, to, fragment),
      ]),
    ),
  );
```

One row produces one key per locale and one target. A second row with the same `from` is rejected by
`assertNoDuplicateSources` (`:237-249`), which exists precisely because `Object.fromEntries` would
otherwise silently keep the last. `fragment` cannot help — it appends `#anchor` to the *same* target.

**Therefore: exactly one new `movedPages` row, with exactly one target.**

### 2.2 The target must be `install/docker`, and `self-hosting` is disqualified

The obvious-looking alternative — send the retired six-jobs page to the `self-hosting` hub, which
reaches all six successors in one click — **creates a redirect loop for readers in 16 locales.**

All 17 `self-hosting/index.md` files carry two relative `./installation` links (verified:
`grep -rc "](\./installation)"` returns 2 for every locale). The English copy is edited by this phase
(`src/content/docs/en/self-hosting/index.md:47,71`); the other 16 are **not**, under the same
English-only policy that produced the shims at `:75-76` and is explained at `:70-74`. A French reader
on `/fr/self-hosting/` clicking *Installation et déploiement* would go
`/fr/self-hosting/installation` → redirect → `/fr/self-hosting/` — back to the page they clicked
from, with no error and no explanation. That is disqualifying on its own.

`install/docker` is the target. The supporting reasons, in order of weight:

1. **No loop.** No non-EN page links relatively to `./docker` or to `install/*`; those slugs did not
   exist before this phase.
2. **It is the successor the retired page led with.** `installation.md:10` is
   `## Deployment Options`, `:12` is `### Docker Deployment` — the first thing under the first
   heading. `self-hosting/index.md:36` labels it `### Docker (Recommended)`.
3. **The other four readers are one click away, in the same sidebar group.** After §1.2 the Install &
   deploy group lists all six install pages adjacently, so a reader who wanted nginx or Valkey sees
   `Reverse proxy and TLS` in the sidebar of the page they land on. Landing them on the hub buys one
   click of precision and costs the loop above.
4. **Chain-safe.** `install/docker` is not a `movedPages` `from` and is a real content page, so
   `pathKey("/en/install/docker/")` = `/en/install/docker` is not in the redirect key set.
5. **Locale behaviour is the accepted Phase 2 outcome.** `install/docker` is EN-only, so a French
   reader gets Starlight's EN fallback — correct-but-untranslated, exactly what
   `deleted-files.md:30-33` records as the deliberate choice.

### 2.3 The exact `movedPages` edits

**Edit A — repoint the shim at `config/redirects.mjs:75`.** Replace:

```js
  { from: "start/installation", to: "self-hosting/installation" },
```

with:

```js
  { from: "start/installation", to: "install/docker" },
```

Leave `:76` (`{ from: "start/configuration", to: "self-hosting/configuration" }`) **unchanged** —
`self-hosting/configuration` survives Phase 3 and is Phase 4's to retire. Add a `TODO(phase-4)`
comment beside it if you want the reciprocal reminder; do not change the value.

Update the shim comment at `:70-74` so it stays true. Current text ends "…so route the stale targets
back to the real pages instead." Append one sentence:

```js
  // …so route the stale targets back to the real pages instead. Phase 3 split
  // self-hosting/installation into six install/* pages; the installation shim
  // now points at install/docker, the successor the retired page led with, and
  // NOT at self-hosting — every non-EN self-hosting/index.md still links
  // ./installation, so that target would loop the reader back to the page they
  // clicked from.
```

**Edit B — add the retirement row.** Insert into `movedPages` in the "Start here" block, immediately
after `:69` (`{ from: "self-hosting/getting-started", to: "start/run-your-own-instance" }`) and
before the shim comment at `:70`:

```js
  // Phase 3: the 481-line six-jobs installation page split into six install/*
  // pages. A movedPages row fans one `from` to one `to` (assertNoDuplicateSources
  // forbids a second row for the same slug and `fragment` only appends an anchor
  // to the same target), so a 1:6 split has to pick one successor. install/docker
  // is it — see docs/planning/phase-3-nav-and-redirect-spec.md §2.2.
  { from: "self-hosting/installation", to: "install/docker" },
```

Net effect on the table: 35 rows → 36 rows; generated `movedPageRedirects` grows by 17 keys
(`LOCALES` is the 17 keys of `i18nConfig.locales`, `config/redirects.mjs:28`).

### 2.4 What `assertNoChainedRedirects` does if you get this wrong

`config/redirects.mjs:214-227`:

```js
export function assertNoChainedRedirects(redirects) {
  const keys = new Set(Object.keys(redirects).map(pathKey));
  const chains = [];
  for (const [from, to] of Object.entries(redirects)) {
    if (isOffsiteTarget(to)) continue;
    if (keys.has(pathKey(to))) chains.push(`  ${from} -> ${to}`);
  }
  if (chains.length > 0) {
    throw new Error(
      `config/redirects.mjs: ${chains.length} chained redirect(s) — the target is itself a ` +
        `redirect key, which 404s in a static build:\n${chains.join("\n")}`,
    );
  }
}
```

`pathKey` (`:190-193`) strips the fragment and trailing slashes, so `/en/self-hosting/installation/`
and `/en/self-hosting/installation` compare equal.

**Do Edit B without Edit A** and the run is: key set now contains
`/{locale}/self-hosting/installation` for all 17 locales; the shim's target
`/{locale}/self-hosting/installation/` normalises to that key; **17 chains**, and the thrown message
begins `config/redirects.mjs: 17 chained redirect(s)` listing
`/en/start/installation -> /en/self-hosting/installation/` first. It throws from
`createRedirectsConfig` (`:377`), which is called by `astro.config.mjs` — so `pnpm build` fails
before any page renders, and `pnpm test` fails at `bin/lib/redirects.test.mjs:84-91` ("the live
table"), and `pnpm check:frontmatter` fails at `bin/check-frontmatter.mjs:222` where it iterates the
same config. Three of the five checks. It is loud.

**Do Edit A without Edit B** and nothing throws — but `/{locale}/self-hosting/installation` gets no
redirect at all, so every stale inbound link 404s once the eight files are deleted. Silent. Both
edits go in the same commit.

### 2.5 EN links that must be repointed in the same commit

A docs page linking through a redirect is not caught by anything (`bin/check-links.sh` runs lychee
over `dist/`, and a redirect stub is a 200). Four EN links, exact:

| File:line | Current | Repoint to |
|---|---|---|
| `src/content/docs/en/self-hosting/index.md:47` | `[Installation & Deployment](./installation)` | `[Install with Docker](/en/install/docker/)` (this sits under `### Manual Installation`, so `[Install on Linux](/en/install/linux/)` is the better fit — pick by what the rewritten §3.5 index says) |
| `src/content/docs/en/self-hosting/index.md:71` | `2. **[Installation & Deployment](./installation)** - Detailed deployment options` | a list of the six install pages, or `2. **[Install with Docker](/en/install/docker/)** — the recommended path |
| `src/content/docs/en/start/index.md:69-70` | `- **[Installation & deployment](/en/self-hosting/installation/)** — Docker and\n  manual options` | `- **[Install with Docker](/en/install/docker/)** — or [on Linux](/en/install/linux/) |
| `src/content/docs/en/start/run-your-own-instance.md:112` | `1. **[Configure your deployment](/en/self-hosting/installation)** for production use` | `1. **[Reverse proxy and TLS](/en/install/reverse-proxy-and-tls/)** for production use` |

Non-EN copies are **not** edited: 32 `./installation` links across 16 non-EN
`self-hosting/index.md`, and 7 in `start/run-your-own-instance.md` (`da:101`, `mi:81`, `pt-br:81`,
`sv:81`, `tr:81`, `uk:81`, `zh-cn:81`). The redirect table is what serves them; that is the whole
reason the shims exist.

Also stale after this edit, planning documents only, fix opportunistically:
`docs/planning/documentation-audit-2026-08.md:423`.

---

## 3. FRONTMATTER BACKFILL — the seven `self-hosting/` pages

### 3.1 Allowed `pageType` values

Read out of `src/content.config.ts:40`:

```ts
  pageType: z.enum(["concept", "how-to", "reference", "architecture"]).optional(),
```

**`concept` · `how-to` · `reference` · `architecture`.** Four values, no others.
`bin/check-frontmatter.mjs:117-125` reads this enum out of the schema at check time via
`schemaEnums()` (`bin/lib/frontmatter.mjs:186-200`) rather than restating it, so a fifth value
requires widening the `z.enum` — there is no second place to edit.

For reference, the sibling enums: `audience` is `["end-user", "operator", "developer",
"contributor"]` (`src/content.config.ts:33-35`); `plan` is `["Free", "Identity Plus", "Team Plus"]`
(`:26`).

### 3.2 The seven blocks, verbatim

All seven get `audience: operator`. `sourceOfTruth` is a **single string**; omit it where nothing on
the page needs one — `bin/check-frontmatter.mjs:127-131` fails on an empty or whitespace-only value,
and an uncited citation is worse than none.

**1. `src/content/docs/en/self-hosting/index.md`** — replace lines 1-6:

```yaml
---
title: Self-Hosting Overview
description: Complete guide to running your own Onetime Secret instance
audience: operator
pageType: concept
sourceOfTruth: onetimesecret/lib/onetime/cli/org/transfer_ownership_command.rb:55-80
sidebar:
  order: 1
---
```

**2. `src/content/docs/en/self-hosting/simple-or-full-auth.md`** — replace lines 1-6:

```yaml
---
title: "Simple or Full: choosing your authentication mode"
description: A decision guide for self-hosters choosing between Simple and Full authentication mode in Onetime Secret v0.24+ — what each needs to run, what each unlocks, and how hard it is to switch later.
audience: operator
pageType: concept
sourceOfTruth: onetimesecret/etc/defaults/auth.defaults.yaml:8
sidebar:
  order: 2
---
```

(`auth.defaults.yaml:7-8` at `onetimesecret@75ce160` is
`# Can be overridden with AUTHENTICATION_MODE environment variable` /
`mode: <%= ENV['AUTHENTICATION_MODE'] || 'simple' %>` — the shipped default is `simple`.)

**3. `src/content/docs/en/self-hosting/configuration.md`** — replace lines 1-6:

```yaml
---
title: Configuration Reference
description: Complete reference for all Onetime Secret configuration options
audience: operator
pageType: reference
sourceOfTruth: onetimesecret/etc/defaults/config.defaults.yaml:1-1543
sidebar:
  order: 3
---
```

**4. `src/content/docs/en/self-hosting/environment-variables.md`** — replace lines 1-6:

```yaml
---
title: Environment Variables Reference
description: A reference for Onetime Secret environment variables
audience: operator
pageType: reference
sourceOfTruth: onetimesecret/.env.reference:1-1995
sidebar:
  order: 4
---
```

**5. `src/content/docs/en/self-hosting/upgrading-v0-24.md`** — replace lines 1-6:

```yaml
---
title: Upgrading to v0.24.0
description: Guide for upgrading Onetime Secret from v0.22 or v0.23 to v0.24.0
audience: operator
pageType: how-to
sourceOfTruth: onetimesecret/.env.reference:330
sidebar:
  order: 5
---
```

`.env.reference:322-330` at HEAD carries the `GENERATED_VALUE_DISPLAY_TTL` block, `Default: 60.` on
`:329`, `#GENERATED_VALUE_DISPLAY_TTL=60` on `:330`. **This page also needs a one-line body edit** —
see §3.4.

**6. `src/content/docs/en/self-hosting/upgrading-v0-23.md`** — replace lines 1-6:

```yaml
---
title: Upgrading to v0.23.0
description: Guide for upgrading Onetime Secret to v0.23.0 — maintenance release with config migration
audience: operator
pageType: how-to
sidebar:
  order: 6
---
```

No `sourceOfTruth`: the page states no configurable default (measured — 0 `statedDefaults` hits).

**7. `src/content/docs/en/self-hosting/installation.md`** — **skip this file if the split lands in
the same PR**, since it is deleted (§5). If the backfill ships first, use:

```yaml
---
title: Installation & Deployment
description: Comprehensive guide for production deployment of Onetime Secret
audience: operator
pageType: how-to
sidebar:
  order: 3
---
```

with `configuration` at 4, `environment-variables` at 5, `upgrading-v0-24` at 6, `upgrading-v0-23`
at 7 for the interim, then closing the gap when the file is deleted.

### 3.3 The `sidebar.order` collisions, resolved

Current values, read from each file's line 5:

| Page | Current | Final |
|---|---|---|
| `index.md` | 1 | **1** |
| `simple-or-full-auth.md` | 3 ← collision | **2** |
| `installation.md` | 3 ← collision | *(deleted)* |
| `configuration.md` | 4 | **3** |
| `environment-variables.md` | 5 ← collision | **4** |
| `upgrading-v0-24.md` | 6 | **5** |
| `upgrading-v0-23.md` | 5 ← collision | **6** |

Both collisions clear. `upgrading-v0-24` sorts before `upgrading-v0-23`, matching the sidebar array
at `config/sidebar.mjs:218-219` (newest upgrade path first). Remember these numbers change nothing
at runtime (§1.1) — they exist so the file agrees with the sidebar.

The six new `install/` pages get `order: 1..6` in `src/content/docs/en/install/`, matching §1.2's
array order: `images-and-variants` 1, `docker` 2, `linux` 3, `run-as-a-service` 4,
`reverse-proxy-and-tls` 5, `verify` 6.

### 3.4 Extending assertion 4 to `audience: operator` (D-4.1)

**What assertion 4 currently does.** It fires on a page that names an ALL_CAPS environment variable
and writes a numeric value beside it, *only* when the page declares `audience: end-user` and carries
no `sourceOfTruth`. The detection is `statedDefaults()` (`bin/lib/frontmatter.mjs:237-267`): an
`ENV_VAR` match (`:211`, two underscore-separated segments minimum, so `SSO`/`GDPR`/`CNAME` cannot
fire) followed within 120 characters by something matching `VALUE` (`:213`, requires a **digit**), in
prose only — fenced code blocks are skipped (`:243-249`) and the lookahead stops at a blank line, a
fence, or a new list item (`BLOCK_BREAK`, `:221`).

The gate is these twelve lines, `bin/check-frontmatter.mjs:136-147`:

```js
  // Rule 3 applies to reader-facing prose only. An operator page states the
  // value because the value is the subject; sourceOfTruth is the declared
  // exception, and it carries the citation that keeps the copy auditable.
  if (fields.audience !== "end-user") continue;
  endUserPages++;
  if (fields.sourceOfTruth) continue;

  for (const stated of statedDefaults(body)) {
    problems.push(
      `${page.path}:${bodyLine + stated.line - 1}: end-user page states the default for ${stated.variable} outright: "${stated.excerpt}" — link to the page that owns it (/en/self-hosting/environment-variables) instead, or add sourceOfTruth frontmatter citing the app source you read it from`,
    );
  }
```

**The exact replacement.** Two new module-level constants near `REQUIRED_ANCHORS`
(`bin/check-frontmatter.mjs:80-89`):

```js
// D-4.1. The two pages that own every default until the generated Reference
// lands in Phase 4. An operator page that states a default must LINK to one of
// them as well as citing sourceOfTruth — the citation makes the copy auditable,
// the link is what stops 26 operator pages becoming Finding 1 at scale. These
// two are exempt from their own rule: stating values is what they are for.
const REFERENCE_OWNERS = ["self-hosting/environment-variables", "self-hosting/configuration"];

/**
 * True when `body` carries a Markdown link to a page that owns defaults.
 * Accepts the absolute form (/en/self-hosting/configuration/) and the sibling
 * relative form (./configuration) the self-hosting tree already uses.
 */
function linksToReferenceOwner(body) {
  const targets = REFERENCE_OWNERS.flatMap((slug) => [slug, `./${slug.split("/").pop()}`]);
  return [...body.matchAll(/\]\(([^)\s]+)/g)].some(([, href]) =>
    targets.some((target) => href.includes(target)),
  );
}
```

and a counter beside `let endUserPages = 0;` (`:106`):

```js
let operatorPages = 0;
```

Then replace `:136-147` with:

```js
  // Rule 3 applies to prose that is not itself the reference. sourceOfTruth is
  // the end-user exception; D-4.1 makes the operator exception stricter —
  // citation AND a link to the page that owns the value.
  const { audience } = fields;
  if (audience === "end-user") endUserPages++;
  else if (audience === "operator") operatorPages++;
  else continue;

  if (REFERENCE_OWNERS.includes(page.slug)) continue;

  const exempt =
    audience === "end-user"
      ? Boolean(fields.sourceOfTruth)
      : Boolean(fields.sourceOfTruth) && linksToReferenceOwner(body);
  if (exempt) continue;

  for (const stated of statedDefaults(body)) {
    const where = `${page.path}:${bodyLine + stated.line - 1}`;
    problems.push(
      audience === "end-user"
        ? `${where}: end-user page states the default for ${stated.variable} outright: "${stated.excerpt}" — link to the page that owns it (/en/self-hosting/environment-variables) instead, or add sourceOfTruth frontmatter citing the app source you read it from`
        : `${where}: operator page states the default for ${stated.variable} outright: "${stated.excerpt}" — D-4.1: an operator page links to the page that owns the value (${REFERENCE_OWNERS.map((s) => `/en/${s}`).join(" or ")}) AND carries sourceOfTruth. This page ${fields.sourceOfTruth ? "cites sourceOfTruth but links to neither owner" : "does neither"}`,
    );
  }
```

Finally, the summary line at `:290-293` — replace `${endUserPages} end-user` with
`${endUserPages} end-user, ${operatorPages} operator`.

Also rewrite the header comment for assertion 4 (`:33-53`), which currently says the check is
"[s]coped that narrowly on purpose — the self-hosting and reference trees state values because
stating values is their job". That sentence is now false. Replace it with the D-4.1 rule: the two
reference pages are exempt because they own the values; every other operator page must link to one
of them.

**What this fires on, measured, not guessed.** `statedDefaults()` was run over all seven pages at
the current working tree:

| Page | Hits |
|---|---|
| `self-hosting` | 0 |
| `self-hosting/simple-or-full-auth` | 0 |
| `self-hosting/installation` | 0 |
| `self-hosting/configuration` | 0 (and exempt as an owner) |
| `self-hosting/environment-variables` | 0 (and exempt as an owner) |
| `self-hosting/upgrading-v0-23` | 0 |
| `self-hosting/upgrading-v0-24` | **1** |

The single hit is `src/content/docs/en/self-hosting/upgrading-v0-24.md:320`:

```
- `GENERATED_VALUE_DISPLAY_TTL=60` — controls how long generated passwords show on the receipt page (seconds; 0 to disable)
```

It is in a bullet list in prose, not a fence, so it fires. §3.2 gives it
`sourceOfTruth: onetimesecret/.env.reference:330`, which satisfies half the operator exemption; the
page links to neither owner (grep-verified), so it still fails. **Required body edit** — line 316 is
currently:

```
The `.env.example` file documents every supported environment variable. Key patterns:
```

Change it to:

```
Every supported environment variable is documented in the [Environment Variables reference](./environment-variables). Key patterns:
```

That single edit makes `linksToReferenceOwner` true and the page exempt. Run
`pnpm check:frontmatter` after: it should report `63 EN pages (40 end-user, 7 operator)` and exit 0.

**Forward-looking note for the six new `install/` pages.** The Phase 1 proxy correction that must
survive the split (`installation.md:264-269`) names `TRUSTED_PROXY_ENABLED=true`,
`TRUSTED_PROXY_MODE=filter`, `TRUSTED_PROXY_MODE=depth` and `TRUSTED_PROXY_DEPTH` — none with a
numeric value, so `statedDefaults` will **not** fire on `install/reverse-proxy-and-tls`. The checker
will not force D-4.1 there. Do it anyway: `sourceOfTruth: onetimesecret/.env.reference:1171`
(`TRUSTED_PROXY_MODE=filter`) or `onetimesecret/etc/defaults/config.defaults.yaml:485`
(`trusted_proxy:`), plus a link to `./environment-variables`.

### 3.5 D-4.2 — the `bin/ots org transfer-ownership` subsection on `self-hosting/index`

Re-pinned at `onetimesecret@75ce160`. State only what is below.

- **Command:** `bin/ots org transfer-ownership ORG NEW_OWNER`
  (`lib/onetime/cli/org/transfer_ownership_command.rb:8-11`, registered at `:232`).
- **Arguments:** `ORG` is an organization extid or objid (`:60-61`); `NEW_OWNER` is an email, extid
  or Rodauth account ID and **must already be an active member** (`:64-65`).
- **Options, and only these three:** `--demote-to ROLE` (`:66-69`, default `admin` per `:80`, valid
  values are `Onetime::Operations::Memberships::SetRole::VALID_ROLES - ['owner']` — see
  `lib/onetime/operations/org/transfer_ownership.rb:114-116`), `--yes` (`:70-74`, skips the
  confirmation prompt), `--json` (`:75-78`).
- **There is no `--dry-run`.** The command *always* previews first: `confirm!` runs the operation with
  `dry_run: true` (`:135`) and prints "Would demote: N owner membership(s)" (`:162`) before prompting;
  the apply pass runs at `:92` with `dry_run: false`. `--yes` suppresses the prompt, not the preview
  computation. The operation class defaults `dry_run: true`
  (`lib/onetime/operations/org/transfer_ownership.rb:175`).
- **What it does not do:** it does not add the new owner if they are not already a member (D28), and
  it does not remove the outgoing owner (D27) — it demotes them, to `admin` unless `--demote-to` says
  otherwise. It promotes before demoting so the sole-owner guard never trips, and it is idempotent.
- **`sourceOfTruth` for the section:**
  `onetimesecret/lib/onetime/cli/org/transfer_ownership_command.rb:55-80`.

Do **not** restate the in-app invariants on this page. `organizations/ownership-and-transfer` tells
end users an owner cannot be removed at all, which is correct for the in-app API
(`remove_member.rb:161-166`) and **false at the CLI layer**, which refuses only the sole owner
(`memberships/remove.rb:80` → `support.rb:20-24`). Handoff §3 is explicit that this must not be
repeated on an operator page.

---

## 4. LOCALE 404 — `configuration-generator.astro`

### 4.1 The premise is already false

Read the file first, as instructed:
`src/pages/en/self-hosting/configuration-generator.astro` is 36 lines. It renders
`ConfigGenerator.vue` (`:10`, `client:load` at `:35`) inside `StarlightPage` (`:9`, `:18-24`) with a
hard-coded `title` (`:12`) and `description` (`:13-15`), and two body links to
`/en/self-hosting/configuration/` and `/en/self-hosting/environment-variables/` (`:30-31`). It has
no frontmatter, no schema, no `getStaticPaths`.

**Non-EN locales do not 404.** `configGeneratorRedirects` (`config/redirects.mjs:279-284`) already
maps `/{locale}/self-hosting/configuration-generator` → `/en/self-hosting/configuration-generator/`
for all 16 non-default locales, and the comment at `:277-278` says exactly why. The `check:nav`
warning fires anyway because `bin/check-nav.mjs:89-93` warns on **every** `src/pages`-served sidebar
link, unconditionally, without consulting the redirect table:

```js
for (const slug of pagesOnly) {
  console.warn(
    `WARN: sidebar link "${slug}" is served by src/pages, no locale fallback — non-EN locales 404 unless redirected in config/redirects.mjs`,
  );
}
```

Note the message's own escape clause: *"unless redirected in `config/redirects.mjs`"*. The check
never checks.

So the real defect is a warning that cannot be cleared and therefore trains people to ignore
`check:nav` output. That is what to fix.

### 4.2 The three options

| | Option | Cost | Verdict |
|---|---|---|---|
| **A** | **Teach `check-nav` to consult the redirect table.** The redirect entry already exists; make the warning conditional on its absence. | ~12 lines in `bin/check-nav.mjs`. No content, no build-output change. | **Recommended.** |
| **B** | **Move into the content collection.** Turn it into `src/content/docs/en/self-hosting/configuration-generator.mdoc` with a Markdoc tag wrapping the Vue island. | Needs a new Markdoc tag in `markdoc.config.mjs`, hydration wiring, and it drops the EN-only redirect in favour of a 17-locale fallback build of an English-only interactive tool. It also collides head-on with `configGeneratorRedirects`, which would then be a redirect whose source is a real page — the unenforced-but-real constraint in §0. | Rejected: highest cost, and the fallback ships an untranslated tool under 16 translated URLs, which is worse than an explicit redirect. |
| **C** | **Per-locale route.** `src/pages/[locale]/self-hosting/configuration-generator.astro` with `getStaticPaths` over `i18nConfig.locales`. | 17 copies of an EN-only tool; every generated route collides with an existing `configGeneratorRedirects` key, so you must delete `:279-284` too; zero reader benefit because the component's strings are English. | Rejected. |

### 4.3 The exact edit (option A)

In `bin/check-nav.mjs`, after the imports at `:39`, add:

```js
import { i18nConfig } from "../config/i18n.mjs";

// The warning below asks whether non-EN locales 404. config/redirects.mjs may
// already answer no — configGeneratorRedirects does exactly that for the
// EN-only Configuration Generator. A warning that fires whether or not the
// problem was solved is a warning nobody can clear, so consult the table.
const { createRedirectsConfig } = await import(
  new URL("../config/redirects.mjs", import.meta.url).href
);
const redirected = new Set(
  Object.keys(createRedirectsConfig()).map((key) => key.replace(/\/+$/, "")),
);
const nonDefaultLocales = Object.keys(i18nConfig.locales).filter(
  (locale) => locale !== i18nConfig.defaultLocale,
);
```

and replace `:89-93` with:

```js
for (const slug of [...pagesOnly].sort()) {
  const uncovered = nonDefaultLocales.filter((locale) => !redirected.has(`/${locale}/${slug}`));
  if (uncovered.length === 0) continue;
  console.warn(
    `WARN: sidebar link "${slug}" is served by src/pages and ${uncovered.length} of ${nonDefaultLocales.length} non-default locales have no redirect for it (${uncovered.slice(0, 3).join(", ")}${uncovered.length > 3 ? ", …" : ""}) — those readers 404; add a fan-out in config/redirects.mjs`,
  );
}
```

`pagesOnly` is a `Set` of slugs and is still used for the count in the OK line at `:100-103`; the
count now reports slugs *warned about* rather than slugs served by `src/pages`. Change that line's
variable to a counter incremented inside the loop, or accept that it reports 0 — either is fine, but
say which in the commit message.

**Expected result:** `pnpm check:nav` prints `check:nav OK — 69 sidebar links resolve across 14
groups (0 warnings)` after §1.2 lands (64 links − 1 removed + 6 added = 69). That closes the
"1 known warning" row that has been carried since Phase 2 (`…-prep.md` §1).

**One risk to note in review:** this makes `check:nav` import `config/redirects.mjs`, which runs both
redirect assertions as a side effect of `createRedirectsConfig()`. A chained-redirect bug will now
fail `check:nav` too. That is more failing checks for one bug, not a new bug — and
`bin/check-frontmatter.mjs:185-187` already takes the same dependency.

---

## 5. The seven non-EN `installation.md` copies, and the deletion index

### 5.1 The files

Measured with `wc -l` at the current working tree. Eight files are deleted; seven are translations.

| Locale | Path | Lines |
|---|---|---|
| `da` | `src/content/docs/da/self-hosting/installation.md` | 65 |
| `mi` | `src/content/docs/mi/self-hosting/installation.md` | 421 |
| `pt-br` | `src/content/docs/pt-br/self-hosting/installation.md` | 36 |
| `sv` | `src/content/docs/sv/self-hosting/installation.md` | 420 |
| `tr` | `src/content/docs/tr/self-hosting/installation.md` | 421 |
| `uk` | `src/content/docs/uk/self-hosting/installation.md` | 421 |
| `zh-cn` | `src/content/docs/zh-cn/self-hosting/installation.md` | 421 |
| — | *(EN source)* `src/content/docs/en/self-hosting/installation.md` | 481 |

**2,205 translated lines**, but the loss is not uniform: five near-complete translations (420-421
lines each) and two stubs. `pt-br` (36 lines) and `da` (65 lines) are pointer pages — `da:10` and
`da:39` both say "see the English version of this page" and link
`/en/self-hosting/installation`, which is itself about to become a redirect. Both stubs are pure
loss-free deletions.

The `self-hosting` tree exists in all 17 configured locales; only these 7 ever carried
`installation.md`. The other 10 (`bg`, `de`, `es`, `fr`, `it`, `ja`, `ko`, `nl`, `pl`, and EN) were
already served by fallback for this page.

### 5.2 The deletion index entry format

Template:
`docs/archive/documentation-audit-2026-08-phase-2/deleted-files.md`. Phase 3's file is not archived
yet — write it to
`docs/planning/documentation-audit-2026-08-phase-3-deleted-files.md` and move it into
`docs/archive/documentation-audit-2026-08-phase-3/` when the phase closes.

The Phase 2 format is: YAML frontmatter with `title`/`description`; an H1; a paragraph naming the
commit and file count; a "Why these files were deleted rather than moved" section; a "Recovering a
deleted file" section with three `git` incantations; a "Deleted families" table
(`| Source page (per locale) | Copies | Merged into |`); and a "Full index" fenced block with one
`path -> target` line per file (`deleted-files.md:85-86`: *"One line per deleted file:
`path → merge target`."*).

**Phase 3 needs one structural addition:** Phase 2 knew only *moves* and *merges*. This is a
**split**, and the table's "Merged into" column cannot express a 1:6 fan-out. Add a preceding
paragraph naming all six successors, then reuse the table with the redirect target in the column.

Family-table row:

```markdown
| Source page (per locale) | Copies | Merged into |
|---|---|---|
| `self-hosting/installation` | 8 | `install/docker` (split; see note) |
```

Footnote under the table (Phase 2's own footnote at `:80-81` explains its 17/1 counts and needs the
8 explained the same way):

```markdown
8-copy family: EN plus the seven locales that carried a translation (`da`, `mi`, `pt-br`, `sv`,
`tr`, `uk`, `zh-cn`). The other nine configured locales were already served by the EN fallback for
this page.
```

Full-index block, EN first then locales alphabetically, matching Phase 2's within-family ordering:

```
src/content/docs/da/self-hosting/installation.md -> install/docker
src/content/docs/en/self-hosting/installation.md -> install/docker
src/content/docs/mi/self-hosting/installation.md -> install/docker
src/content/docs/pt-br/self-hosting/installation.md -> install/docker
src/content/docs/sv/self-hosting/installation.md -> install/docker
src/content/docs/tr/self-hosting/installation.md -> install/docker
src/content/docs/uk/self-hosting/installation.md -> install/docker
src/content/docs/zh-cn/self-hosting/installation.md -> install/docker
```

The "Why these files were deleted rather than moved" section needs a third bullet for the split
reason. Phase 2's two are (1) a real file at the old path collides with the generated redirect, and
(2) relocating a stale translation to the merge target breaks the anchor contract. Add:

```markdown
3. *Relocated to one split target*: a 481-line page that did six jobs has no single successor. The
   translation would sit under a title it no longer matches — `install/docker` would carry a
   translated nginx, Certbot and Valkey walkthrough. This is the "translated-but-wrong" outcome
   Phase 2 rejected, arriving by a different route.
```

---

## 6. Execution order and verification

One commit per numbered step; the redirect step must be atomic.

1. **Frontmatter backfill** (§3.2, §3.3) + the `upgrading-v0-24.md:316` body edit (§3.4) +
   the assertion-4 extension (§3.4). Verify: `pnpm check:frontmatter` reports
   `63 EN pages (40 end-user, 7 operator)` and exits 0. This step is independent of everything else
   and is the cheapest thing on the list.
2. **`check-nav` redirect awareness** (§4.3). Verify: `pnpm check:nav` exits 0 with 0 warnings.
   Independent of steps 1, 3, 4.
3. **The split** — write the six `install/*` pages, then delete the eight `installation.md` files,
   then the sidebar edit (§1.2) and the six i18n keys (§1.3), **then in the same commit** the two
   redirect edits (§2.3) and the four EN link repoints (§2.5). Nothing between the deletion and the
   redirect edits is a valid intermediate state.
4. **The deletion index** (§5.2).

Full gate after step 3: `pnpm check:frontmatter && pnpm check:nav && pnpm check:orphans &&
pnpm check:locales && pnpm test && pnpm build`. Expected deltas: `check:orphans` 63 → 68 EN pages
(+6 install pages, −1 installation), 0 allowlisted; `check:nav` 64 → 69 links, 14 groups, 0 warnings;
`check:locales` unchanged (no locale directory is added or removed — every one keeps its
`self-hosting/` tree); `pnpm test` 86 passing (`bin/lib/redirects.test.mjs:89` asserts >600 redirect
keys; the table grows, so this stays green).

`astro check` is broken in this repo and exits 1 on any input — use `pnpm build`.

---

## 7. Risks

1. **A partial redirect commit fails the build in three places at once.** Edit B without Edit A
   throws `17 chained redirect(s)` out of `createRedirectsConfig` and takes `check:frontmatter`,
   `pnpm test` and `pnpm build` down with it. Edit A without Edit B is silent and 404s every stale
   inbound link. Ship both together (§2.4).
2. **Nothing enforces "no redirect source is also a page."** The claim in
   `deleted-files.md:24` is false at HEAD. If any of the eight `installation.md` files survives the
   commit that adds the `movedPages` row, the collision is undetected by every check in `bin/`
   (§0, §2.3).
3. **`self-hosting` as the redirect target would loop 16 locales.** 32 unedited relative
   `./installation` links in non-EN `self-hosting/index.md` would send readers straight back to the
   page they clicked from. If anyone re-opens the target choice, this is the fact that closes it
   (§2.2).
4. **The assertion-4 extension needs a body edit to go green.** `upgrading-v0-24.md:320` fires the
   moment that page gains `audience: operator`. The fix is one sentence at `:316` (§3.4) — but if the
   frontmatter backfill ships without it, `check:frontmatter` exits 1.
5. **`--dry-run` does not exist.** Three planning documents say it does. Any operator page that
   prints `bin/ots org transfer-ownership --dry-run` documents a flag that will error (§0, §3.5).
6. **Six sidebar labels must stay globally unique.** `bin/check-nav.mjs:79-87` compares labels across
   the whole tree, not against siblings. The eight `configure/*` and ten `features/*` pages still to
   come will need the same care — "Email", "SSO", "Custom domains" and "Branding" all already exist
   as end-user labels and cannot be reused verbatim.
7. **`check:nav` gains a dependency on `config/redirects.mjs`.** A redirect bug will now fail
   `check:nav` as well. Same class of coupling `check-frontmatter.mjs:185-187` already has, but
   worth naming in review (§4.3).
8. **2,205 translated lines are deleted with no re-translation ticket.** Five of the seven copies are
   near-complete. Phase 4 repeats this twice more, at 636 and 499 lines. The deletion index is the
   only record; file the re-translation follow-up rather than relying on it being noticed.
