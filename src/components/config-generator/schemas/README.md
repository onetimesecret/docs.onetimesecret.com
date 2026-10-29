# Vendored config JSON schemas

These files are **generated artifacts copied from the main application repo**
([`onetimesecret/onetimesecret`](https://github.com/onetimesecret/onetimesecret)).
They are the source of truth for config field structure, types, defaults, and
value constraints, and drive the client-side Configuration Generator
(`src/components/config-generator/`).

| File | Source (app repo) | Zod origin |
|---|---|---|
| `config-static.schema.json` | `generated/schemas/config/static.schema.json` | `src/schemas/shapes/config/config.ts` (`staticConfigShape`) |
| `config-auth.schema.json` | `generated/schemas/config/auth.schema.json` | `src/schemas/shapes/config/auth.ts` (`authConfigShape`) |

## How to regenerate / re-sync

In a checkout of the app repo:

```sh
pnpm run schemas:json:generate      # writes generated/schemas/config/*.schema.json
```

Then copy the two files here (renaming `static` → `config-static`, `auth` →
`config-auth`) and commit. The app repo's `generated/schemas/` is git-ignored
(a build artifact), which is why these are vendored rather than imported.

Vendored at app repo tag `v0.26.18` (commit `a4f02e8`).

### Compatibility with v0.26.19

Phase 4 selected `v0.26.19` (`e98a88c9`) as the documented application
baseline. These two files were generated at `v0.26.18` and have NOT been
regenerated, because regenerating them means executing application code, which
the Phase 4 evidence contract forbids in this environment.

They are still accurate for `v0.26.19`: every input to
`pnpm run schemas:json:generate` for these two schemas is byte-identical
between the two tags. Checked with `git diff --name-only v0.26.18 v0.26.19`
over `src/schemas/shapes/` (only `shapes/domains/sso-config.ts` differs, which
neither schema reaches), `src/schemas/contracts/config/`,
`src/schemas/utils/augment.ts` and `src/schemas/scripts/generate.ts` (no
differences). So the page states `v0.26.19` on the strength of unchanged
inputs, not of a refreshed artifact. Re-run that comparison before moving the
baseline again; if any of those paths change, regenerate rather than restating
the newer tag.

## Why vendored (not fetched)

Keeping the rendered schemas in this repo makes the static docs build
self-contained and reproducible — no network dependency at build time, and the
generator works in local previews. The trade-off is manual re-sync when the
config surface changes; the table above records exactly where each file comes
from. A future `schemas:sync`/drift-check script (or publishing the schemas to a
stable URL for the docs build to fetch) could automate this — see
`docs/specs/config-generator.md` in the app repo.

## What the schemas do and don't cover

The generator reads **defaults and constraints** from these schemas where they
exist. Two things the schemas intentionally do **not** carry, which the
generator supplies from its own small preset manifest
(`src/components/config-generator/presets.ts`):

- **ENV-var mapping** — which environment variable backs each config key lives
  only in the app's ERB `etc/defaults/*.yaml`, not the schema.
- **Presets / curation** — the schema describes the whole config surface
  (hundreds of fields); the manifest picks the handful of installer-facing
  choices and how each maps to config keys.
