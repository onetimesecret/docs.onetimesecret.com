# Phase 3 decisions

**What this is:** the calls that were open when Phase 3 resumed locally on 2026-08-10, answered, plus the
corrections the research pass owed to the three documents that preceded it. It is the document to read
before [`…-phase-3-prep.md`](./documentation-audit-2026-08-phase-3-prep.md) and
[`…-phase-3-handoff.md`](./documentation-audit-2026-08-phase-3-handoff.md), both of which contain
statements this pass proved false.

Research inputs, all produced 2026-08-10 against `onetimesecret@75ce160`:

| Document | What it settles |
|---|---|
| [`phase-3-ledger-install-and-deploy.md`](./phase-3-ledger-install-and-deploy.md) | 139 rows. The factual spine for the eight Install & deploy pages |
| [`phase-3-ledger-configure.md`](./phase-3-ledger-configure.md) | 163 rows. The factual spine for the eight Configure pages |
| [`phase-3-split-map-installation.md`](./phase-3-split-map-installation.md) | Line-by-line accounting of the retired page, and its 27 defects |
| [`phase-3-nav-and-redirect-spec.md`](./phase-3-nav-and-redirect-spec.md) | Executable nav, redirect, deletion and checker edits |
| [`phase-3-reference-anchor-audit.md`](./phase-3-reference-anchor-audit.md) | What the surviving reference pages can and cannot be linked to |

---

## 1. Decisions

### D-4.1 — where numbers go — **amended**

The prep document recommended option 2: operator pages link to the surviving
`self-hosting/environment-variables` and `configuration.md` rather than restating values, with
`check-frontmatter.mjs`'s assertion 4 re-scoped to enforce it.

**That option does not survive contact with the pages it names.** The anchor audit measured them: 17
markdown anchors between the two, eleven of which index the **superseded v0.24 stack**. The entire current
v0.25 variable set — 116 names, `environment-variables.md:20-355` — sits inside one unbroken fence under
a single `#v025` anchor. `configuration.md` is 93.5% one 595-line YAML fence whose last anchor is at line
36. Of the twelve operator pages that need a reference, three have a usable topic anchor and in all three
cases it belongs to the v0.24 block, seven are wall-only, and two have nothing at all.

The audit also found fourteen staleness defects on those pages, including six inverted defaults
(`JOBS_ENABLED`, `I18N_ENABLED`, `AUTH_EMAIL_AUTH_ENABLED` documented as `true` when HEAD ships `false`;
`AUTHENTICATION_MODE` documented as `full` when HEAD ships `simple`), a renamed variable
(`PLAN_TTL_ANONYMOUS` → `TTL_MAX_ANONYMOUS`), a dead one (`FROMNAME`, live key is `FROM_NAME`) and a
`REDIS_URL` example naming a port that exists nowhere in the app.

Linking twenty-six new pages at a page that is wrong in fourteen places is not a reference contract. It is
a redirect to the defect.

**The call:** operator pages do **not** link to those two pages as a reference. They state a value inline
only where it is load-bearing for the instruction, and carry a `sourceOfTruth` citation to app source in
`billing/index.md:6`'s format. Assertion 4 extends to `audience: operator` with **`sourceOfTruth` alone**
as the exemption — not a link.

This is nearer the prep document's option 1 than its option 2, and the objection to option 1 stands: one
citation per page does not make twenty-six pages of restated defaults tracked. Two things answer it. Pages
are written to name a variable and its behaviour rather than recite its default, so there are far fewer
numbers to track than option 1 assumed. And the exit is now known: the app ships **`.env.reference`** —
1,995 lines, 361 variables, 26 topic sections, ratcheted in CI by `scripts/check-env-reference.sh:5-17` —
which is a generator source for Phase 4's `reference/*` that no planning document knew existed. When that
tree lands, the operator pages repoint at it and the citations become links.

### D-4.2 — the ownership-transfer page — **deferred to Phase 4, aside closed now**

A standalone page is deferred to Phase 4's Operate group: it is an operator action, Operate is where it
belongs, and a single-page `operate/` group in Phase 3 would pre-empt Phase 4's nav design.

The dangling reference does not wait. `self-hosting/index`'s Phase 3 update gains a short verified
subsection naming `bin/ots org transfer-ownership ORG NEW_OWNER`, so the aside on the published
`organizations/ownership-and-transfer` lands somewhere useful.

### D-4.4 — `installation.md` is retired and rewritten, not split — **new**

The prep and handoff documents both frame stream B as a split: five target pages, exact line ranges,
content carried across intact. The split map produced those line ranges and then found **27 defects** in
the source. Several make the documented path fail outright:

| | |
|---|---|
| `installation.md:155` | `cp .env.example .env` runs *after* `bin/setup --init`, overwriting the `.env` it just generated and discarding the generated `SECRET` and its `chmod 600` |
| `:166,175` | `source .env.sh` — the file does not exist at HEAD; the live form is `set -a; source .env; set +a` |
| `:232-237,330-335` | nginx and Apache serve static assets from `/app/public/dist`; assets build to `public/web/dist` and the app serves them itself |
| `:41,56` | the compose stack's `REDIS_URL` carries no password while the redis service sets `--requirepass`, so the app cannot authenticate |
| `:18-27` | directs the reader to clone `github.com/onetimesecret/docker-compose`, archived as of v0.24 |
| `:76-96` | "Ruby 3.4+"; HEAD enforces an exact match against `.ruby-version` and dies on any other patch |
| `:86` | the system-package list omits nine required packages |
| `:373` | the certbot cron line is missing `/etc/crontab`'s user field, so cron rejects it |

A move preserves prose. Nothing here is worth preserving except the Phase 1 `X-Forwarded-For` correction
and one sentence about persistence writing secret material to disk. The five successor pages are written
from the ledger; the retired page is mined, not trusted.

The consequence for stream C is unchanged — one `movedPages` row to `install/docker` and the
`start/installation` shim repointed at the same target in the same commit.

### Maintainer answers, 2026-08-10

**D-VERSION.** Docs carry no literal image tag. Commands use `$OTS_VERSION`, introduced once per page with
a pointer to the releases list. Three numbers were already in play — the app repo CI-pins `v0.26.1` in
three places, the newest tag is `v0.26.4`, and the docs said `v0.26.2`. A fourth number in the docs is a
fourth thing to drift.

**D-RHEL.** `install/linux` is Debian/Ubuntu only. The CentOS/RHEL steps are dropped: every clean-room
install lane in the app repo is Debian-derived plus macOS, so nobody has run them.

**D-SIZING.** The 2+ CPU cores / 2GB+ RAM / 10GB+ disk figures on `self-hosting/index` are confirmed by the
maintainer and stay, with the addition that they describe authentication mode **simple**, and that full mode
— PostgreSQL plus background workers plus scheduler — needs roughly double. Its `sourceOfTruth` is
maintainer confirmation rather than a repo path, and is written that way.

**D-FLOORS — open.** The maintainer is supplying the minimum supported Valkey/Redis, PostgreSQL and
RabbitMQ versions. Until they arrive, no page carries a minimum-version claim. `simple-or-full-auth.md:41`'s
existing floors are removed rather than corrected: nothing in the app declares a floor, and its
"RabbitMQ 4.3+" is above the 4.2 the project ships.

---

## 2. Corrections owed to the earlier planning documents

Each was stated as fact in a document Phase 3 was told to build on, and each is false at HEAD.

| Where | Claim | At HEAD |
|---|---|---|
| handoff §3, prep §4.4 | `bin/ots org transfer-ownership` has `--dry-run` | No such flag. Options are `--demote-to` (default `admin`), `--yes`/`-y`/`-f` and `--json`; the dry run happens automatically when `--yes` is omitted — `cli/org/transfer_ownership_command.rb:19-21,66-78` |
| handoff §5 | The `X-Forwarded-For` reasoning is three bullets at `:266-268` | Four bullets at `:265-268`. The handoff's range drops the `TRUSTED_PROXY_ENABLED` bullet — the master switch, which defaults to `false` and gates every other trusted-proxy setting |
| prep §1, handoff §6 | The `configuration-generator` locale 404 is a real defect for Phase 3 to fix | It does not exist. `configGeneratorRedirects` (`config/redirects.mjs:279-284`) already maps all 16 non-default locales; `bin/check-nav.mjs:89-93` warns unconditionally without ever consulting the redirect table. The fix is to the checker |
| prep §5, handoff §5 | `JOBS_SCHEDULER_ENABLED` **and** `JOBS_FALLBACK_SYNC` are both instructed and inert | Both are inert, but only `JOBS_SCHEDULER_ENABLED` is instructed (`docker/README.md:90`, `docker/compose/docker-compose.full.yml:253`). `JOBS_FALLBACK_SYNC` is instructed nowhere, so it is "do not introduce" rather than "do not inherit". The app states both defects itself at `.env.reference:1781-1793` |
| handoff §5 | `self-hosting/index` is at `sidebar.order: 3`, colliding three ways | It is at 1. The real collisions are `installation`/`simple-or-full-auth` at 3 and `environment-variables`/`upgrading-v0-23` at 5 |
| phase-2 `deleted-files.md:24` | A checker enforces "no redirect source is also a page" | Nothing does. `config/redirects.mjs` exports only `assertNoDuplicateSources` and `assertNoChainedRedirects`, and no `bin/` checker tests it |
| prep §3 | The example catalog's line numbers, re-pinned to `6af1fe3` | Unchanged at `75ce160` |

---

## 3. Content defects the pass found in already-published pages

Beyond the retired page. These are corrections, not notes.

**`simple-or-full-auth.md`** is wrong in four load-bearing ways: it frames "three modes" where the app has
two independent settings (`auth.mode` is `simple`|`full`; the off-switch is `site.authentication.enabled`);
it makes PostgreSQL a full-mode requirement when the account store defaults to SQLite at
`sqlite://data/auth.db`, which is what the shipped full stack runs; it makes RabbitMQ a full-mode
requirement when it is required only under `JOBS_ENABLED=true`, itself defaulting to `false`; and it asserts
three version floors that nothing declares.

**`self-hosting/index.md`** names an image tag that matches nothing, omits
`--add-host=host.docker.internal:host-gateway` from its `docker run` (which does not resolve on Linux
without it), and repeats the PostgreSQL error.

**One row is unresolved and stays unwritten.** `simple-or-full-auth.md:39` claims organizations are
unavailable in simple mode. `apps/api/organizations` loads in simple mode and `features.organizations.enabled`
carries no auth-mode gate. Settling it needs a runtime check — boot simple mode with `ENABLE_ORGS=true` and
hit the endpoints — not another read. Neither page restates the claim until then.

---

## 4. Still open

1. **D-FLOORS.** Minimum supported datastore versions, from the maintainer.
2. **The unresolved organizations-in-simple-mode row**, which needs a runtime check.
3. **The production `etc/billing.yaml`**, outstanding since Phase 2. Its reach is narrowed by the standalone
   finding but it still gates `features/billing-and-entitlements`, the pricing-page merge, and the
   corrections owed to `pricing/compare-plans` and `custom-domains/access-and-privacy`.
4. **App-repo defects worth filing**, none of which the docs can fix — the read-only clone blocks it:
   `docker/README.md`'s Quick Start omits `VALKEY_PASSWORD` and therefore cannot work; the shipped systemd
   unit comments repeat the PostgreSQL and RabbitMQ errors; `.env.example:70` pins a stale `OTS_IMAGE_TAG`
   that `check-version-pins.sh` does not scan; and the four `*_REDIRECT_URI` variables that
   `environment-variables.md` lists as required are read by no code at HEAD.
