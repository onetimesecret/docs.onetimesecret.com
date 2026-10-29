# Phase 3 guide enrichment recovery

## Scope and sources

- Worktree: `.git/recovery-worktrees/guides`, branch `docs/phase3-guide-enrichment`.
- Starting docs commit: `fe1f61664d305ac9b49ab1f0908aebb197ad18ff`; initially clean.
- Research source: `docs/phase3-contd` at `8e83efa2`. Extracted topics were rewritten as focused additions, not copied as replacement guides.
- Authoritative application checkout: `/Users/d/Projects/dev/onetimesecret/onetimesecret`, clean at `f7794a9844a865dc346b7cded73d72c918a22700` when inspected. Application sources were read only.
- Published edits used the shared `tools/dogfood.py edit --state ai` command with the root venv interpreter. Existing marks, draft flags, sidebar labels, SSO architecture, and newer SQLite permission guidance were retained.

## Finding disposition and coverage

All eight reader-facing findings below are addressed. Evidence paths are relative to the application checkout at the SHA above; they describe source inspection, not runtime testing.

| ID | Reader risk and final location | Authoritative evidence | Final coverage |
| --- | --- | --- | --- |
| F1 | Changing the wrong middleware/CSP switch; `configure/security-headers.md`, response inspection step | `apps/web/auth/application.rb:21-39`; `lib/onetime/application/middleware_profile.rb:27-43,67-107`; `lib/onetime/middleware/registry.rb`; `etc/defaults/config.defaults.yaml:570-606`; `apps/web/core/middleware/request_setup.rb` | Addressed: separate Core, shared and auth-profile scopes; current auth-profile variables and all-environment defaults. |
| F2 | Running a site that sends no mail or expecting retries on the wrong path; `configure/email.md`, transport and troubleshooting | `lib/onetime/mail/mailer.rb:200-218,304-315`; `lib/onetime/mail/provider_registry.rb`; `lib/onetime/mail/delivery/{logger,disabled,base}.rb`; `lib/onetime/jobs/workers/email_worker.rb:154-159,204-215`; `lib/onetime/jobs/publisher.rb:162-194,620-648`; `lib/onetime/initializers/setup_loggers.rb:69,753-767`; `etc/defaults/config.defaults.yaml:1447-1472` | Addressed: explicit transports, placeholders, logger disclosure, typo fallback, masked-recipient diagnostics and worker/fallback retry distinction. |
| F3 | Assuming every API honors the same limits or guest switches; `configure/secret-options.md`, existing three steps | `apps/api/v1/logic/secrets/base_secret_action.rb:45-65,140-185,260-270,359-389`; `apps/api/v2/logic/secrets/base_secret_action.rb:130-205,391-441`; `lib/onetime/secret_lifetime_policy.rb`; `lib/onetime/models/organization/features/with_materialized_limits.rb:69-80`; `lib/onetime/logic/base.rb:190-210`; `lib/onetime/logic/guest_route_gating.rb`; V2 secret operation classes; `apps/api/v3/logic/secrets.rb` | Addressed: current canonical/custom guest policy, 365-day V2/V3 bound, fixed V1 TTL/content bounds, bytes versus characters, V1 complexity and guest-gating exceptions. |
| F4 | Mistaking successful boot for key/data compatibility; `configure/secrets-and-keys.md`, backup and verification | `lib/onetime/initializers/check_secret_verifier.rb:17-22,31-62`; `lib/tasks/init.rake:260-289`; `apps/web/auth/config/base.rb:12-29`; `lib/onetime/class_methods.rb:445-452` | Addressed: matching key/data backups, warn/enforce/off behavior, no ciphertext recovery from verifier adoption, independent full-mode boot guards. |
| F5 | Disabling cookie or Origin protection to bypass a proxy failure; `configure/sessions-and-cookies.md`, troubleshooting | `lib/onetime/session.rb:339-385`; `lib/onetime/middleware/assume_https.rb`; `lib/onetime/middleware/http_origin_options.rb`; `apps/web/auth/application.rb`; `lib/onetime/middleware/registry.rb` | Addressed: secure-cookie warning, scheme normalization with an origin-access boundary, independent auth Origin/IP checks. |
| F6 | Setting the docs release variable without changing the Compose image; `install/images-and-variants.md`, pinning | `docker/compose/docker-compose.simple.yml:22`; `docker/compose/docker-compose.full.yml` image interpolation; existing Docker guide sets both variables | Addressed: distinguish `OTS_VERSION` from `OTS_IMAGE_TAG`, without replacing the newer Docker guide. |
| F7 | Trying sudo from the unprivileged service account; `install/run-as-a-service.md`, unit installation | `etc/examples/systemd/onetimesecret-web.service:3-12,25-30`; Linux guide's service-account shell sequence | Addressed: exit the service-account shell before administrative commands; keep SQLite grants unchanged. |
| F8 | Diagnosing the wrong datastore or treating queue initialization as fatal; `install/linux.md`, datastore and installer sections | `etc/defaults/config.defaults.yaml:1375-1399`; `etc/examples/valkey.conf`; `etc/examples/systemd/onetimesecret-web.service:18`; `tools/setup/setup.sh:648-666` | Addressed: package-specific binary/service names, URL precedence, separate backup retention, nonfatal full-mode queue-init warning and jobs-dependent recovery. |

The final diff was compared separately with F1–F8. The task does not require changing every allowed file: `configure/authentication.md`, `configure/index.md`, `install/docker.md`, `install/reverse-proxy-and-tls.md`, `install/verify.md`, and `self-hosting/simple-or-full-auth.md` were left unchanged. No navigation or SSO files were edited.

## Superseded or excluded source material

These are rejected source-branch propositions, not deferred changes:

- S1: Do not import the old claim that `AUTH_SIGNUP` / `AUTH_SIGNIN` are inert in full mode. The newer authentication guidance remains intact, as requested.
- S2: Reject the production-only, untoggleable `/auth` middleware account. Current `middleware_profile :authenticated_web` and its scoped configuration replace it; F1 documents the current behavior.
- S3: Reject the claim that API v1 ignores the anonymous lifetime ceiling. Its current TTL dispatch calls `anonymous_max_ttl`, backed by `SecretLifetimePolicy`; F3 retains only the fixed V1 bounds and verified exceptions.
- S4: Reject the source branch's unchanged-systemd-unit recommendation for SQLite. The newer directory grant is necessary with the current unit's `ProtectSystem=strict` and tmp/log-only grants; it remains untouched.

Long gem-default header tables, exhaustive provider configuration, full password-generator reference, and the older authentication research were not imported. They would expand these task guides into references or duplicate current guidance. No new guarantee about an uninspected gem default was introduced. Source-branch attribution bytes were not copied into unrelated prose; all new prose was authored through TextProv.

## Validation and boundaries

Executed from this worktree using `/Users/d/Projects/ops/sites/docs.onetimesecret.com/.venv/bin/python` for Python commands:

- `tools/dogfood.py check --base fe1f61664d305ac9b49ab1f0908aebb197ad18ff`: strict cumulative check passed for eight eligible changed pages.
- `-m unittest discover -s tools/tests`: 66 tests passed.
- `pnpm test`: initially 14 suites / 266 tests passed; two jsdom suites failed to load `/src/...` paths in this `.git/recovery-worktrees` location.
- Identical full Vitest suite through `startVitest('test', [], { watch: false }, { server: { fs: { deny: [] } } })`: 16 suites / 287 tests passed. This was an in-memory test-runner override only; no test, configuration, or dependency file was edited. It removes the filesystem deny boundary for that local run, not for the application or production build.
- `pnpm run check:frontmatter`: passed, 94 English pages and 243 redirect fragments checked.
- `pnpm run check:nav`: passed, 76 sidebar links and 89 labels, zero warnings.
- `pnpm build`: passed, 1,324 pages built. Lightning CSS warned about `@theme` during minification.
- `pnpm run check:textprov`: passed, 1,009 expected enrolled pages, one marker each, no raw selectors.
- `pnpm run check:links:malformed`: passed.
- Source-level local-link check: all 38 local destinations in the eight changed guides resolved, including `verify#create-the-first-account`. Draft targets were checked against source files, not assumed to be published routes.
- `git diff --check`: passed.

The five changed configure pages retain `draft: true`, so the production build does not render them. Their Markdown/TextProv structure and local source targets were checked. No browser walkthrough, real SMTP delivery, account creation, proxy deployment, systemd startup, queue initialization, datastore restore, or key rotation was executed. Existing external release and systemd documentation links were not fetched; no new external links were added. Broader site-wide link checking was not run.

Dependency access uses the user-authorized `node_modules` symlink to the root installation. Build output and generated caches are uncommitted. No application code, other worktree content, dependency manifests, navigation, or locale content was intentionally changed.
