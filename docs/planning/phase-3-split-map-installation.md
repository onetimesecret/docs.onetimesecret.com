# Phase 3 split map — `self-hosting/installation.md`

**What this is:** stream B's part-1 deliverable — the line-exact map of how one 481-line page becomes
five, with a leftover accounting that proves lines 1–481 are covered once each, a placement call on
the mis-nested Valkey/Redis block, and a flag list of content that does not survive contact with app
source.

Written 2026-08-10 against `docs.onetimesecret.com@claude/phase-3-install-group` and
`onetimesecret@75ce160` (2026-08-10). Reads alongside
[`…-phase-3-prep.md`](./documentation-audit-2026-08-phase-3-prep.md) §4–5 and
[`…-phase-3-handoff.md`](./documentation-audit-2026-08-phase-3-handoff.md) §5–6, and does not restate
them.

Two orchestrator decisions are treated as settled throughout:

- **D-4.1** — operator pages do not restate defaults inline. They link to `self-hosting/environment-variables`
  and `self-hosting/configuration` and carry a `sourceOfTruth` citation. `check-frontmatter.mjs`
  assertion 4 is extended to `audience: operator`.
- **D-4.2** — the ownership-transfer page defers to Phase 4. Not this page's concern; noted only
  because it means no new Configure page is available to absorb overflow (§3).

---

## 1. Re-pinning

The prep, handoff and re-verification documents pin app-source line numbers to `onetimesecret@6af1fe3`.
Everything cited below was re-read at `75ce160`. Three items to report:

| Cited in | Claim | State at `75ce160` |
|---|---|---|
| prep §5 (D2) | `JOBS_SCHEDULER_ENABLED` instructed at `docker/README.md:90` | **Unchanged** — `docker/README.md:90` still reads `` `JOBS_SCHEDULER_ENABLED=true` for the `scheduler` service `` |
| prep §5 (D2) | `docker-compose.full.yml:253` instructs the same | **Unchanged** — `docker/compose/docker-compose.full.yml:253` is the comment `# Scheduled jobs additionally require JOBS_SCHEDULER_ENABLED=true.` |
| prep §5 (D2) | `JOBS_FALLBACK_SYNC` is instructed alongside it | **Changed meaning.** `JOBS_FALLBACK_SYNC` no longer appears in `docker/README.md` or any `docker/compose/*.yml`. It survives only as a commented line at `.env.reference:1786` and a CHANGELOG mention at `CHANGELOG.rst:170`. The "do not import the contradiction" constraint now binds only `JOBS_SCHEDULER_ENABLED`. |

Docs-repo line numbers are unaffected (different repo). One correction to the handoff's own reading:
handoff §5 records systemd as "185-189". The block is heading `183`, prose `185`, fence `187-198` —
**it runs to 198, not 189**, and the fence includes the `systemctl enable --now onetimesecret-worker
onetimesecret-scheduler` line that the shorter range excludes.

---

## 2. The split map

Seven target pages. Two are pure new writing and take no source lines; the source page contains
nothing about image selection and nothing about verifying an install.

| Target | Kind | Source lines it takes | Lines | New writing |
|---|---|---|---|---|
| `install/images-and-variants` | NEW | — | 0 | 100% |
| `install/docker` | SPL | 12–15, 29–69 | 45 | ~65% |
| `install/linux` | SPL | 70–161, 391–452 | 154 | ~45% |
| `install/run-as-a-service` | SPL | 162–199 | 38 | ~55% |
| `install/reverse-proxy-and-tls` | SPL | 200–390 | 191 | ~25% |
| `install/verify` | NEW | — | 0 | 100% |
| *(dropped)* | — | 1–11, 16–28, 471–481 | 35 | — |
| *(deferred, Phase 4)* | — | 453–470 | 18 | — |

### 2.1 `install/images-and-variants` (NEW)

Takes zero source lines. The source page names an image exactly once — line 37, inside the compose
fence — and names no registry, no variant and no tag policy. This page is written entirely from app
source and then **owns** the tag question, so no other install page states a version.

| Subject | App source at `75ce160` |
|---|---|
| Main image, two registries | `docker/bake.hcl:27-28` (`ghcr.io/onetimesecret`), `:31-32` (`onetimesecret/onetimesecret`) |
| Tagging model — `VERSION` is never a Docker tag | `docker/bake.hcl:17-20`, `:47-56` |
| Current documented pin | `README.md:29` and `docker/compose/docker-compose.simple.yml:22`, held in lockstep by `scripts/check-version-pins.sh:17-30` |
| Why pin rather than track `latest` | `docker/compose/docker-compose.simple.yml:7-11`; `docker/README.md` "Image Version (OTS_IMAGE_TAG)" §, `:95-108` |
| `OTS_IMAGE_TAG` override | `docker/README.md:76` (table row), `:103` |
| Lite variant (app + Redis in one container, ephemeral by design) | `docker/variants/README.md:5-31`, `docker/variants/lite.dockerfile` |
| Caddy proxy variant (rate-limit, security, DNS-challenge plugins) | `docker/variants/README.md:33-79`, `docker/variants/caddy.dockerfile` |
| s6 multi-process supervision | `docker/s6/`, referenced `docker/variants/README.md:84` |
| Ruby/Node pins baked into the image | `.ruby-version` (3.4.10), `.node-version` (22), enforced `scripts/check-version-pins.sh:11-14` |

**Do not state a version number on this page either.** Per D-4.1 it links to the app repo's pin and
carries `sourceOfTruth: onetimesecret/README.md:29`, because the pin moves at every release and
`check-version-pins.sh` is what keeps it honest — a docs copy is not covered by that guard.

### 2.2 `install/docker` (SPL)

| Source | Content | Treatment |
|---|---|---|
| 12–15 | `### Docker Deployment` + "Docker provides the most reliable…" | Heading becomes the page title; lead rewritten |
| 16–28 | `#### Using Docker Compose` + clone of `onetimesecret/docker-compose` | **Dropped, not moved** — see §5 S1 |
| 29–60 | Manual `docker-compose.yml` | Shape survives; every value re-derived from `docker/compose/docker-compose.simple.yml:18-113` |
| 61–69 | `.env` fence | Survives; `SECRET` generation replaced with the app repo's own form |

Replacement spine, all `75ce160`:

- Quick start is three lines, not a clone: `docker/README.md:44-48`.
- Stack selection (`include:` edit vs `-f` directly) — `docker/README.md:22-40`; the root wrapper is
  `docker-compose.yml:25-27`.
- Simple vs full — `docker/README.md:7-15` table.
- First account — `docker/README.md:50-55` (`docker compose exec app bin/ots customers create … --role colonel`, `:54`).
- Data persistence and the `/app/data` asymmetry between stacks — `docker/README.md:110-121`.
- Readiness contract (`healthcheck` → `bin/healthcheck.sh`) — `docker/compose/docker-compose.simple.yml:54-64`;
  this is the handoff to `install/verify`, not a second copy of it.

**Constraint carried in (prep §5, D2, re-pinned §1):** `install/docker` must not repeat the
`JOBS_SCHEDULER_ENABLED=true` instruction. The source page never mentions it (handoff §5 confirmed by
grep, still true), so this is import-prevention, not removal.

### 2.3 `install/linux` (SPL)

| Source | Content | Treatment |
|---|---|---|
| 70–73 | `### Manual Installation` + lead | Heading becomes the page title |
| 74–79 | `#### Installing Dependencies` + the Ruby-too-old `:::caution` | Survives; cite `.ruby-version` (3.4.10) rather than "3.4+" |
| 80–109 | Ubuntu/Debian fence | Largely survives; see S9 (Node 22 is correct), S24/S25 (the Redis service name) |
| 110–134 | CentOS/RHEL fence | Largely survives |
| 135–161 | `#### Application Setup` fence | **Rewritten** — four of its eight steps are wrong or redundant at HEAD (S10–S13), and the destructive one is S11 |
| 391–452 | `### Redis Configuration` | Moves here and is re-nested as an `##`. Placement argued in §3 |

The Application Setup fence is the single worst block on the page and must be rebuilt against
`bin/setup` / `scripts/setup/lib.sh` rather than edited:

| What the page says | What `75ce160` does |
|---|---|
| `bin/setup --init` (L149) | Correct, but `bin/install` is now the operator-named front door — `bin/install:3-9`, a thin wrapper over the same lane (`bin/setup:10`) |
| `bundle install --without development test` (L152) | Already done by `cmd_init` → `install_gems` (`scripts/setup/lib.sh:196-213`), frozen-lockfile |
| `cp .env.example .env` (L155) | **Destroys the `.env` that L149 just generated** — `cmd_init` runs `rake ots:env:setup`, then `rake ots:secrets`, then `chmod 600 .env` |
| `cp etc/defaults/config.defaults.yaml etc/config.yaml` (L156) | Already done by `seed_configs` (`scripts/setup/lib.sh:168-187`), which also seeds `auth.yaml`, `logging.yaml` and `etc/puma.rb` |
| `git rev-parse --short HEAD > .commit_hash.txt` (L159) | Optional — `lib/onetime/version.rb:53-70` falls back to `git rev-parse --short=7 HEAD` |
| *(nothing)* | **Missing step:** `pnpm run build`. `bin/setup` deliberately never runs it (`scripts/setup/lib.sh:236-237`), so the frontend at `public/web/dist` does not exist after following this page — which is also why S18 matters |

### 2.4 `install/run-as-a-service` (SPL)

The handoff calls this "closer to new writing than to moved content" on the basis that systemd has no
heading of its own. That is true of systemd alone; it is not true of the page. **Draw the boundary at
"installed" vs "kept running"** and the page inherits 38 lines and three real subjects:

| Source | Content | Treatment |
|---|---|---|
| 162–169 | `#### Starting the Application` + Procfile runner | Survives; `source .env.sh` replaced (S14) with `set -a; source .env; set +a` per `Procfile.production:13` |
| 170–178 | Direct Puma | Survives; the `cp puma.example.rb` step drops as redundant (S15) |
| 179–182 | `:::note[Separate processes in v0.24+]` — Puma only, worker/scheduler as processes | Survives as the page's process-model section; "PostgreSQL + RabbitMQ" needs narrowing (S16) |
| 183–199 | `#### Systemd Service (Production)` | Survives; the install commands match the units' own headers (`etc/examples/systemd/onetimesecret-web.service:4-6`) |

What the page must add, from source it can quote rather than paraphrase:

- The three shipped units — `etc/examples/systemd/onetimesecret-web.service`, `-worker.service`,
  `-scheduler.service`.
- The env contract the units actually use:
  `ExecStart=/bin/bash -lc 'set -a; source .env; set +a; exec bundle exec puma -C etc/puma.rb'`
  (`onetimesecret-web.service:30`) and the worker equivalent at `-worker.service:24`.
- The units' assumed layout — `User=onetime`, `WorkingDirectory=/var/lib/onetimesecret`
  (`onetimesecret-web.service:25-27`) — which **contradicts** the install path the source page's
  Application Setup produces (S17). One of the two has to move, and the app source is the arbiter.
- Hardening already in the units (`NoNewPrivileges`, `ProtectSystem=strict`, `ProtectHome`,
  `StateDirectory`, `PrivateTmp`) — `onetimesecret-web.service:41-46`.
- `EnvironmentFile=-/etc/default/onetimesecret` (`:39`) as the documented override point.

### 2.5 `install/reverse-proxy-and-tls` (SPL)

The largest inheritance: 191 lines, four config fences and the Phase 1 correction. Heading depth
shifts up one level — `## Reverse Proxy Configuration` and `## SSL/TLS Configuration` both become
`##` on the new page with nginx/Caddy/Apache/Certbot as `###`.

| Source | Content | Treatment |
|---|---|---|
| 200–203 | `## Reverse Proxy Configuration` + "adjust them to fit your specific needs" | Lead survives |
| 204–263 | `### Nginx` + full server block | Survives. **Lines 244 and 253 are load-bearing — §4.** Static-file location needs the S18 path fix; `listen 443 ssl http2` is stale nginx (S19) |
| 264–270 | `:::note[Client IP forwarding and proxy trust]` | **Survives verbatim — §4.** May be *appended to* per S20; may not be rewritten |
| 271–277 | Enable-the-site commands | Survives |
| 278–306 | `### Caddy` | Survives. **Lines 294 and 301 are load-bearing — §4.** Fence language tag is wrong (S21); the snippet is missing the server-level `trusted_proxies` block that makes `{client_ip}` mean what the note says (S22) |
| 307–344 | `### Apache` | Survives; same S18 path fix in the `Alias`/`<Directory>` pair |
| 345–346 | `## SSL/TLS Configuration` | Becomes a `##` on this page; the mis-nesting it caused is fixed by §3 |
| 347–375 | `### Let's Encrypt (Certbot)` | Survives; the crontab line is malformed (S23) |
| 376–390 | `### Custom SSL Certificates` | Survives |

One editorial addition this page owes and the source page never made: Caddy issues certificates
itself, so the Certbot section does not apply to a Caddy deployment. The shipped example is
`etc/examples/Caddyfile-example` (ACME email at `:21`, storage at `:32-34`, staging CA at `:41`).

### 2.6 `install/verify` (NEW)

Takes zero source lines. Lines 473–479 are generic ("set up monitoring and alerting") and seed
nothing. Written from the app's own three-layer health design, which is explicit about who owns what:

| Layer | Command / endpoint | Source |
|---|---|---|
| Environment view — pins, files, connectivity | `bin/doctor --operator` (and `--bundle` for a sanitized support archive) | `bin/doctor:3-5,15-20`, wrapping `bin/setup --doctor` (`bin/setup:14-18`) |
| Runtime service view | `bin/ots status` | `lib/onetime/cli/status_command.rb:22-27`, registered `:562` |
| HTTP liveness | `GET /health`, `GET /health/advanced` | `apps/web/auth/routes/health.rb:8-34` — returns `status`, `timestamp`, `database`, `version`, `mode`; 503 on error |
| Container liveness | `bin/healthcheck.sh` (role-aware: web → HTTP, worker/scheduler → AMQP TCP) | `docker/entrypoints/healthcheck.sh:1-21` |
| Compose readiness gate | `docker compose up --wait` | `docker/compose/docker-compose.simple.yml:54-64` |
| First account | `bin/ots customers create me@example.com --role colonel` | `README.md:32-37`; compose form at `docker/README.md:50-55` |

The ownership boundary at `docker/entrypoints/healthcheck.sh:14-20` is worth stating on the page —
`bin/doctor` owns environment, `/health/advanced` owns runtime, the container script owns liveness and
never re-implements the others.

---

## 3. The Valkey/Redis block — placement

**Lines 391–452 go to `install/linux`, re-nested as a top-level `##`. Lines 453–470 (the backup
script) defer to Phase 4's Operate group. `install/docker` gets a two-sentence cross-reference and no
copy of the prose.**

The reasoning, since this is the one judgement call in the map:

1. **It is not a TLS subject, and the current nesting is a filing error, not a hint.** `### Redis
   Configuration` at 391 sits under `## SSL/TLS Configuration` at 345 (handoff §5). Nothing in the
   block references TLS. There is no signal in the source structure to preserve.
2. **It is one decision, not two.** The block's actual content is a durability-versus-secrecy choice —
   memory-only (393–413) or persisted (415–440), with 442–446 stating the cost in plain terms. That
   decision is identical for a Docker operator and a bare-metal one. Splitting the *prose* across
   `install/docker` and `install/linux` duplicates the reasoning, which the "nothing silently
   duplicated" rule forbids and which is how the current tree got its Finding-1 problem.
3. **Only the mechanism differs, and only one of the two mechanisms is a config file.** Bare metal
   edits `/etc/redis/redis.conf` — and the app ships a canonical example for exactly this,
   `etc/examples/valkey.conf`, which the source page never mentions. Docker sets the same knobs as
   `valkey-server` flags on the service command (`docker/compose/docker-compose.simple.yml:74-87`),
   already authoritative and already correct. So `install/docker` needs a pointer plus a link to those
   flags — new writing, not moved content.
4. **A Configure page is not available.** Prep §5's Configure group is index · secrets-and-keys ·
   authentication · sso · email · secret-options · sessions-and-cookies · security-headers. None owns
   the datastore, and adding `configure/datastore` takes Phase 3 from 26 pages to 27 — outside the
   scope the orchestrator has fixed. D-4.2 already declined to add a page to Configure for a smaller
   subject.
5. **Backups are an Operate subject, and Operate is Phase 4** (prep §5, first line). The script at
   456–469 is backup *and* retention, with no restore half — it belongs with restore on a Phase 4
   page, not orphaned on an install page.

Consequence for `install/linux`: it inherits a section whose two options both disagree with the
shipped example (S24), so this is a rewrite against `etc/examples/valkey.conf`, keeping the source
page's genuinely good contribution — the explicit statement at 442–446 that persistence writes
plaintext-reachable secret material to `dump.rdb` and `appendonly.aof`.

**Deferral is not a drop.** Per prep §4.2 the split already produces a `deleted-files.md`-format index
for the seven locale copies; 453–470 gets one line in that index with `→ Phase 4 operate/backup-and-restore`
as its target, so the content is retrievable rather than lost to git archaeology.

---

## 4. The Phase 1 correction — verbatim, for diffing

This is the block the Phase 1 self-analysis flagged as the one the audit had backwards. It lands on
`install/reverse-proxy-and-tls` and **may not be paraphrased in transit**. Reproduced exactly as it
appears at `src/content/docs/en/self-hosting/installation.md`, with line numbers.

The nginx overwrite, once in each `location` block:

```
244:        proxy_set_header X-Forwarded-For $remote_addr;
253:        proxy_set_header X-Forwarded-For $remote_addr;
```

The reasoning, lines 264–269 (the full `:::note`, opener and closer included so the fence survives the
move intact):

```
264::::note[Client IP forwarding and proxy trust]
265:- The app ignores forwarded headers unless `TRUSTED_PROXY_ENABLED=true` — without it, every request is attributed to the proxy's address.
266:- The `$remote_addr` overwrite above is required for the default `TRUSTED_PROXY_MODE=filter`, which picks the **leftmost** non-proxy entry — an appended header would let clients spoof their IP to rate limits, bans, and audit records.
267:- Exception: with `TRUSTED_PROXY_MODE=depth`, keep the append (`$proxy_add_x_forwarded_for`) and set `TRUSTED_PROXY_DEPTH` to your hop count — overwriting in depth mode collapses the chain and misattributes requests to the proxy.
268:- The Caddy configuration below applies the same overwrite with `header_up X-Forwarded-For {client_ip}`.
269::::
```

The Caddy equivalent, once in each `handle` block:

```
294:            header_up X-Forwarded-For {client_ip}
301:            header_up X-Forwarded-For {client_ip}
```

### 4.1 Re-verification at `75ce160`

All four claims confirmed against app source, and the source is now more explicit than when Phase 1
wrote this:

| Claim | Evidence at `75ce160` |
|---|---|
| Forwarded headers ignored unless `TRUSTED_PROXY_ENABLED=true` | `.env.reference:1126-1137`; wiring `etc/defaults/config.defaults.yaml:499` |
| Default mode is `filter`, leftmost non-proxy entry wins | `.env.reference:1139-1145`, `:1171`; wiring `etc/defaults/config.defaults.yaml:534` |
| The overwrite is required under `filter`, and the exact nginx and Caddy forms | `.env.reference:1147-1151` — *"the edge proxy MUST OVERWRITE X-Forwarded-For with the real peer address, otherwise a client-supplied entry is returned as the client IP and IP rate limits/bans are spoofable"*, then `nginx: proxy_set_header X-Forwarded-For $remote_addr;` and `Caddy: header_up X-Forwarded-For {client_ip}` |
| Depth mode counts from the right and needs a fixed hop count | `.env.reference:1163-1170`; `TRUSTED_PROXY_DEPTH=1` default at `:1215`, wiring `etc/defaults/config.defaults.yaml:568` |
| Caddy `{client_ip}` honours Caddy's own `trusted_proxies` | `.env.reference:1152-1154`; the shipped example sets it at `etc/examples/Caddyfile-example:63-64` |

**One available sharpening — append only, do not substitute (S20).** Line 267 says the append is the
depth-mode form, full stop. `.env.reference:1155-1159` is finer-grained: the overwrite is *correct*
under depth mode at `TRUSTED_PROXY_DEPTH=1` (the default) because it leaves exactly one attested
entry, and only breaks at depth ≥ 2 where the chain the count depends on is collapsed. Line 267 is not
wrong — it is conservative, and it is correct for the case that matters (a multi-hop chain). Any edit
here is an added clause, not a replacement, and it needs `sourceOfTruth: onetimesecret/.env.reference:1155`.

---

## 5. Leftover accounting — lines 1–481

Ranges tile `1..481` with no gap and no overlap. Blank lines are folded into the range they trail;
fenced blocks are never split across dispositions.

| Lines | Count | Content | Disposition |
|---|---|---|---|
| 1–6 | 6 | Frontmatter (`title`, `description`, `sidebar.order: 3`) | drop (superseded) — each target writes its own; note the `sidebar.order: 3` collision with `self-hosting/index` and `simple-or-full-auth` (handoff §5) |
| 7–9 | 3 | "This guide covers deployment options for self-hosted Onetime Secret instances." | drop (superseded) — replaced by five per-page `description` values |
| 10–11 | 2 | `## Deployment Options` | drop (superseded) — the `install/` sidebar group is the container now |
| 12–15 | 4 | `### Docker Deployment` + lead | → `install/docker` |
| 16–28 | 13 | `#### Using Docker Compose`, `onetimesecret/docker-compose` clone | drop (superseded) — repo archived as of v0.24, `docker/README.md:3-5` (S1) |
| 29–60 | 32 | Manual `docker-compose.yml` fence | → `install/docker` |
| 61–69 | 9 | `.env` fence | → `install/docker` |
| 70–73 | 4 | `### Manual Installation` + lead | → `install/linux` |
| 74–79 | 6 | `#### Installing Dependencies` + Ruby `:::caution` | → `install/linux` |
| 80–109 | 30 | Ubuntu/Debian fence | → `install/linux` |
| 110–134 | 25 | CentOS/RHEL fence | → `install/linux` |
| 135–161 | 27 | `#### Application Setup` fence | → `install/linux` (rebuilt, §2.3) |
| 162–182 | 21 | `#### Starting the Application`, Procfile + Puma, v0.24 process note | → `install/run-as-a-service` |
| 183–199 | 17 | `#### Systemd Service (Production)` | → `install/run-as-a-service` |
| 200–203 | 4 | `## Reverse Proxy Configuration` + lead | → `install/reverse-proxy-and-tls` |
| 204–263 | 60 | `### Nginx` + server block (**244, 253**) | → `install/reverse-proxy-and-tls` |
| 264–270 | 7 | `:::note[Client IP forwarding and proxy trust]` (**266–268**) | → `install/reverse-proxy-and-tls`, verbatim |
| 271–277 | 7 | Enable-the-site commands | → `install/reverse-proxy-and-tls` |
| 278–306 | 29 | `### Caddy` (**294, 301**) | → `install/reverse-proxy-and-tls` |
| 307–344 | 38 | `### Apache` | → `install/reverse-proxy-and-tls` |
| 345–346 | 2 | `## SSL/TLS Configuration` | → `install/reverse-proxy-and-tls` |
| 347–375 | 29 | `### Let's Encrypt (Certbot)` | → `install/reverse-proxy-and-tls` |
| 376–390 | 15 | `### Custom SSL Certificates` (+ the stray double blank at 389–390) | → `install/reverse-proxy-and-tls` |
| 391–452 | 62 | `### Redis Configuration` — both options, the disk-persistence warning, restart | → `install/linux`, re-nested `##` (§3) |
| 453–470 | 18 | `#### Redis Backups` + script | **defer → Phase 4 `operate/backup-and-restore`**, indexed in the deletion ledger |
| 471–481 | 11 | `## Next Steps` + numbered list + sign-off | drop (superseded) — generic; L475's `[Configure your instance](./configuration)` is a relative link that breaks under `install/*` (S27, stream C input) |

**Totals.** 45 + 154 + 38 + 191 + 0 + 0 = 428 assigned to targets · 35 dropped · 18 deferred =
**481**. Contiguity checked pairwise across all 26 rows.

### 5.1 A note on the disposition scheme

The brief's three buckets are *target page*, *drop (superseded)*, *drop (duplicate of X)*. I used a
fourth — *defer* — for 453–470, and no row uses *drop (duplicate of X)*.

Calling the backup script "superseded" would have been false: nothing in Phase 3 supersedes it and
nothing in the app repo replaces it. Calling it a target-page assignment would have been worse — it
would have put a backup-and-retention script on an install page to avoid admitting a scope boundary.
The fourth bucket is the honest answer and it costs one line in a ledger Phase 3 is already producing.

No range is a duplicate of another. The page has redundancy *within* ranges (the rbenv install
appears at 89–97 and again at 121–127, `requirepass`/`bind` at 407–408 and 434–435), but every
duplicated pair lands on the same target page, so it is a de-duplication task inside `install/linux`
rather than a split decision. Named here so it is not rediscovered as a surprise.

### 5.2 Duplication guard across targets

Six subjects have a plausible home on two pages. Each resolves to one owner:

| Subject | Owner | The other page does |
|---|---|---|
| Image tag / pin | `install/images-and-variants` | `install/docker` writes `${OTS_IMAGE_TAG:-…}` and links |
| Valkey/Redis persistence policy | `install/linux` | `install/docker` links, and points at the compose `valkey-server` flags |
| `SECRET` generation and meaning | `configure/secrets-and-keys` (Phase 3, Configure) | both install pages generate it and link for the semantics |
| `.env` handling | split by mechanism, not duplicated — compose `env_file` on `install/docker`, `bin/install`-generated `.env` on `install/linux` | — |
| Process model (web / worker / scheduler) | `install/run-as-a-service` | `install/docker` describes services, links for the model |
| Post-install checks | `install/verify` | every install page ends with one link, not a checklist |

---

## 6. Factually suspect content

Flagged, not fixed. All evidence re-pinned to `onetimesecret@75ce160`. Ordered by consequence.

| # | Source | Claim | Evidence |
|---|---|---|---|
| S11 | 155 | `cp .env.example .env` runs *after* `bin/setup --init` at 149 and **overwrites the `.env` init just generated**, discarding the generated `SECRET` and the `chmod 600`. Following this page in order produces an instance whose secrets are the example file's empty values. | `bin/setup` `cmd_init`: `rake ots:env:setup` → `rake ots:secrets` → `chmod 600 "${ENV_FILE:-.env}"`; the guard at `bin/setup:591-597` exists precisely because a regenerated `SECRET` orphans every encrypted record |
| S14 | 166, 175 | `source .env.sh` — the file does not exist. | No `.env.sh` at `75ce160`. Live form is `set -a; source .env; set +a` (`Procfile.production:13`, `etc/examples/systemd/onetimesecret-web.service:30`, `-worker.service:24`). The app's own audit records it purged: `docs/specs/install-onboarding/install-onboarding-clean-room-validation.md:61` |
| S18 | 232–237, 330–335 | Static assets served from `/app/public/dist` (`root /app/public` + `location /dist/`; Apache `Alias /dist /app/public/dist`). | Frontend builds to `public/web/dist` — `vite.config.ts:243` (`publicDir: 'public/web'`), `:248` (`outDir: '../public/web/dist'`). `public/` at HEAD contains `web`, `vendor`, `branding`, `schemas` and no `dist`. Compounded: the page has no build step at all, and `bin/setup` deliberately never runs `pnpm run build` (`scripts/setup/lib.sh:236-237`) |
| S17 | 139–146 vs 189 | Application Setup installs to `~onetime/onetimesecret` via `useradd -r -m`, then tells the reader to copy unit files that assume a different path. | `etc/examples/systemd/onetimesecret-web.service:25-27` — `User=onetime`, `WorkingDirectory=/var/lib/onetimesecret`; the unit's own header states the assumption at `:9-11` |
| S1 | 18–27 | Directs the reader to clone `github.com/onetimesecret/docker-compose`. | `docker/README.md:3-5` — "The separate onetimesecret/docker-compose repository is **archived as of v0.24**." All compose config is now in-repo |
| S6 | 49 | `./etc:/app/etc` bind mount. | The image copies `etc/` (`Dockerfile:284`) and seeds `etc/config.yaml`, `auth.yaml`, `logging.yaml` and `etc/puma.rb` at build (`Dockerfile:318-324`, `:431-437`). Mounting an empty host dir over it shadows all four |
| S5 | 41 vs 56 | `REDIS_URL=redis://redis:6379/0` carries no password while the `redis` service sets `--requirepass ${REDIS_PASSWORD}`. As written the app cannot authenticate. | The shipped stack threads the password into the URL: `docker/compose/docker-compose.simple.yml:33` |
| S24 | 393–440 | Two hand-written `redis.conf` options, "memory-only" presented first. | The app ships a canonical example the page never mentions — `etc/examples/valkey.conf`, which enables persistence (`:26` `save 157680000 1`, `:30` `appendonly yes`, `:33` `appendfsync everysec`) and names the files `onetime.rdb` / `onetime.aof` (`:4-5`). The compose stack sets the same values as flags (`docker/compose/docker-compose.simple.yml:74-87`) |
| S4 | 37 | Image pinned `v0.26.2`. | The app repo's documented pin is `v0.26.1` in two places held in lockstep by CI — `README.md:29`, `docker/compose/docker-compose.simple.yml:22`, guarded by `scripts/check-version-pins.sh:17-30`. Newest tag at `75ce160` is `v0.26.4`. The docs number matches neither the pin nor the head |
| S23 | 373 | `echo "0 12 * * * /usr/bin/certbot renew --quiet" \| sudo tee -a /etc/crontab` | `/etc/crontab` takes a user field between the schedule and the command; this line has five fields and no user, so cron rejects it. Certbot's Debian/RHEL packages also ship their own systemd timer, making the entry redundant. No app-source dependency |
| S22 | 282–305 | Caddy block sets only `X-Forwarded-For` and declares no server-level trust. | `etc/examples/Caddyfile-example:63-64` sets `trusted_proxies static private_ranges` and `client_ip_headers X-Forwarded-For X-Real-IP` at the server level, and `:268-269` sets both `X-Forwarded-For {client_ip}` and `X-Real-IP {client_ip}`. Without the server-level block, `{client_ip}` is the direct peer — which is right for a bare Caddy but not for Caddy behind a CDN, the case `.env.reference:1152-1154` calls out |
| S16 | 180 | "full authentication mode (PostgreSQL + RabbitMQ)". | Over-specified. `bin/setup` `cmd_init`'s full-mode branch marks the PostgreSQL schema step "(Not required for SQLite.)", and `docker/README.md:114-117` says the full stack keeps a sqlite `auth.db` at `/app/data`. RabbitMQ is required; PostgreSQL is one of two options |
| S25 | 450 vs 101–102 | `sudo systemctl restart redis` after the page's own Debian steps used `redis-server`. | The shipped units hedge across both — `After=network.target redis-server.service valkey.service` (`etc/examples/systemd/onetimesecret-web.service:18`). Internal contradiction on the docs side |
| S26 | 465 | `redis-cli -a "$REDIS_PASSWORD" --rdb …` puts the password in the process list. | The shipped stack uses the env form instead: `REDISCLI_AUTH` at `docker/compose/docker-compose.simple.yml:69-73`. (Range defers to Phase 4 per §3 — flagged so it does not get carried forward unexamined) |
| S10 | 152 | `bundle install --without development test`. | Redundant after 149 (`install_gems`, `scripts/setup/lib.sh:196-213`, frozen-lockfile), and `--without` as a CLI flag is deprecated Bundler usage |
| S12 | 156 | `cp ./etc/defaults/config.defaults.yaml ./etc/config.yaml`. | Redundant — `seed_configs` (`scripts/setup/lib.sh:168-187`) already seeded it, plus `auth.yaml`, `logging.yaml`, `etc/puma.rb` |
| S15 | 172–173 | `cp etc/examples/puma.example.rb etc/puma.rb`. | Redundant for the same reason — `scripts/setup/lib.sh:182-186`. The inline comment ("the OCI image uses it unmodified") is correct: `Dockerfile:324` |
| S13 | 159 | `.commit_hash.txt` written manually. | Optional — `lib/onetime/version.rb:53-70` falls back to `git rev-parse --short=7 HEAD` and to `'dev'` |
| S2 | 26 | `docker-compose up -d` (the v1 binary). | App repo uses `docker compose` throughout — `docker/README.md:39,47`, `docker-compose.yml:7` |
| S3 | 33 | `version: '3.8'`. | Obsolete under the Compose Spec; no app-repo compose file carries it (`docker/compose/docker-compose.simple.yml` opens at `services:`, `:18`) |
| S8 | 52–56 | `redis:bookworm`. | The shipped stack runs `valkey/valkey:8.1-bookworm`, digest-pinned (`docker/compose/docker-compose.simple.yml:67`). Note this is drift *inside* the app repo too — `README.md:16` still starts `redis:bookworm` for its quick start — so it is a question to raise, not a unilateral docs fix |
| S19 | 217 | `listen 443 ssl http2;`. | Deprecated since nginx 1.25 in favour of `http2 on;`. Outside app source — flagged for completeness, lowest confidence |
| S21 | 282 | Caddyfile fence tagged ` ```nginx `. | Cosmetic; wrong highlighter |
| S27 | 475 | `[Configure your instance](./configuration)`. | Relative link; resolves to `install/configuration` once the page moves. Stream C input alongside `config/redirects.mjs:75-76` |
| S7 | 50 | `./logs:/app/logs`. | No `/app/logs` in `Dockerfile` or `docker/entrypoints/`; logging is configured by `etc/defaults/logging.defaults.yaml`. Likely inert rather than harmful |

### 6.1 Checked and correct

Recorded so nobody re-derives them:

| Source | Claim | Confirmed by |
|---|---|---|
| 77, 95–96, 125–126 | Ruby 3.4+ required, system Ruby insufficient | `.ruby-version` = `3.4.10`; `scripts/check-version-pins.sh:12-13` enforces it into both Dockerfiles |
| 105 | Node 22 (`setup_22.x`) | `.node-version` = `22`; `scripts/check-version-pins.sh:11` |
| 180 | Puma is the only web server; worker and scheduler are separate processes; simple mode needs only web | `Procfile.production:6-10,20-24`; the three shipped units |
| 187–198 | The systemd install commands | Match the units' own headers verbatim — `etc/examples/systemd/onetimesecret-web.service:4-6` |
| 39, 241, 250 | Port 3000 | `docker/compose/docker-compose.simple.yml:48-49`; `etc/defaults/config.defaults.yaml:4` (`HOST` default `localhost:3000`) |
| 43–44, 66–67 | `HOST` and `SSL` are real env vars | `etc/defaults/config.defaults.yaml:4,6`; `.env.reference:207-208` |
| 41 | `REDIS_URL` still accepted | `lib/onetime/initializers/check_redis_url.rb:19,26` — `REDIS_URL` or `VALKEY_URL` |
| 244, 253, 266–268, 294, 301 | The Phase 1 correction | §4.1 |

---

## 7. Open questions

1. **Install path for bare metal.** S17 is a genuine fork: either `install/linux` changes its
   `useradd`/clone steps to produce `/var/lib/onetimesecret`, or `install/run-as-a-service` ships a
   modified unit. The shipped units are app source and the docs are not, so the units win — but that
   makes `install/linux` prescribe a layout the source page never used, and stream A should confirm
   `/var/lib/onetimesecret` is the intended convention rather than an example-file default.
2. **Does `install/docker` document the `docker run` path at all?** `README.md:14-30` gives a
   four-step `docker run` quick start with a separate `redis:bookworm` container. It is the fastest
   path to a running instance and the source page omits it entirely. If it goes anywhere it is
   `install/docker`, but it collides with the compose story and with S8.
3. **`redis:bookworm` vs `valkey/valkey` (S8) is an app-repo inconsistency**, not a docs error. The
   docs cannot resolve it; someone should ask which the project intends the quick start to use before
   `install/docker` and `install/images-and-variants` pick one.
4. **Where the `bin/install` / `bin/setup --init` naming lands.** `bin/install` is the operator front
   door (`bin/install:3-9`) and `bin/setup --init` the same code path. Using both on one page is
   confusing; using only `bin/install` risks a reader searching for `setup`. A one-line call, and it
   affects `install/linux` and `install/verify` together.
5. **Deletion-ledger format for a deferral.** §3 puts 453–470 in the `deleted-files.md`-format index
   with a Phase 4 target. That index was designed for locale copies of merged pages (prep §4.2), so
   stream C should confirm a deferred-content row fits it rather than needing its own file.
