# Pinned Onetime Secret reference inputs

This directory holds `manifest.json` and nothing else. It pins the revision of
the `onetimesecret/onetimesecret` application that the documentation reference
pages describe, and records every upstream file the reference pipeline read at
that revision. No upstream bytes are vendored: the pipeline extracts structured
data from the pinned blobs during an explicit refresh and commits that data as
JSON snapshots under `src/data/reference/`.

```text
Pinned upstream sources (manifest.json)
    | explicit refresh: parse and validate
Committed JSON snapshots (src/data/reference/)
    |-- environment-variables.json
    `-- configuration.json
    | Astro components at build time
Rendered documentation
```

Refresh changes the data. Local code changes its presentation.

| Change | Upstream access needed? |
| --- | --- |
| Layout, tables, how descriptions are shown, navigation | No |
| How existing structured records are presented | No |
| Refresh to a newer application release | Yes |
| Fix extraction or capture information absent from the JSON | Yes |

## What the manifest records

- `upstream`: the repository, release label and full commit SHA.
- `environmentSource`: the upstream path, SHA-256 and line count of
  `.env.reference`, which `src/data/reference/environment-variables.json` was
  extracted from.
- `configurationSources`: one entry per upstream YAML input, with its path,
  role, SHA-256 and line count. `src/data/reference/configuration.json` was
  extracted from these.
- `extractorFormatVersion`, `refreshOwner`, `backupReviewer` and
  `accountabilityNote` (see below).

| Upstream path | Role |
| --- | --- |
| `.env.reference` | environment reference |
| `etc/defaults/config.defaults.yaml` | `config-defaults` |
| `etc/defaults/auth.defaults.yaml` | `auth-defaults` |
| `etc/defaults/logging.defaults.yaml` | `logging-defaults` |
| `etc/examples/billing.example.yaml` | `billing-example` |

`bin/reference/manifest.mjs` validates the manifest's structure and rejects any
other file under this directory. `bin/reference/validate-env.mjs` and
`bin/reference/validate-config.mjs` check each committed snapshot against the
manifest: format version, upstream revision, source hashes and line counts,
source spans, heading anchors and record structure. Both run offline from
`pnpm run reference:check`, which CI runs before the build.

## Rules

- Checking never reaches the network and never reads an application checkout.
  `pnpm run reference:check` works from a clean checkout of this repository
  alone.
- Nothing upstream is executed. During refresh, `.env.reference` is parsed as
  text and the YAML files are parsed as data with ERB spans replaced by inert
  placeholders. No shell, Ruby or ERB interpreter runs over them.
- Never record credentials, production configuration, a real `.env` or
  customer data. The upstream inputs are public documentation source in the
  application repository.
- The committed JSON stores structured records, not rendered Markdown. A
  record keeps the extractor's classification (a literal in the file, an
  ERB-derived default, or an expression only the running application can
  resolve), its source comment as lines, its release annotation and its source
  span. The billing example's catalog sections are stored as structure only:
  entry counts and field names, never values.

## Refresh runbook (maintainer)

Refreshing is the one operation that needs an application checkout. Network
access is confined to the maintainer updating that checkout; the refresh
command itself uses local Git commands. Use a checkout you trust: Git honors
its `.git/config`, which can affect command behavior.

1. Update a local read-only checkout of the application and fetch tags:

   ```sh
   git -C <path-to-app-checkout> fetch --tags origin
   ```

2. Decide the target release. Use a tagged release, not a branch: a branch
   tracks unreleased changes, and these snapshots document shipped behaviour.

3. Refresh both snapshots, both coverage reports and the manifest:

   ```sh
   node bin/reference.mjs refresh --repo <path-to-app-checkout> --ref v0.26.19
   ```

   Every input is read with `git -C <repo> show <commit>:<path>`, so the
   working tree of that checkout is never used and an uncommitted local edit
   cannot leak into a snapshot. The command resolves `<ref>` to a full SHA,
   extracts and validates both snapshots in memory, and writes nothing unless
   everything passes. It then writes `src/data/reference/environment-variables.json`,
   `src/data/reference/configuration.json`, the two coverage reports under
   `docs/reference/`, and this directory's `manifest.json` with the new
   revision, hashes and line counts.

   Refresh reads the paths listed in `environmentSource` and
   `configurationSources`; it does not discover new inputs. To onboard another
   role supported by `ROLES` in `bin/reference/manifest.mjs`, add its upstream
   path and role to `configurationSources` before refreshing. The command
   records its SHA-256 and line count. If upstream moves a file, change its
   `path` the same way.

4. Validate and review the data diff:

   ```sh
   pnpm run reference:check
   git --no-pager diff --stat vendor/onetimesecret src/data/reference docs/reference
   ```

   A page's layout does not change on refresh; only the data does. Build the
   site to see the result rendered, and run `pnpm run check:reference:html`
   after the build to compare every rendered heading, fragment and cell with
   the committed data.

5. Read the coverage reports in `docs/reference/coverage-environment.md` and
   `docs/reference/coverage-configuration.md`. A new unresolved or malformed
   environment entry, a new blocked structural block or a new unassigned key
   is a review item, not something to refresh past. An unassigned key fails
   the refresh until `OWNERSHIP_RULES` in `bin/reference/yaml-erb.mjs` gives
   it a page.

6. Include the manifest, both JSON snapshots and both coverage reports
   together in the refresh pull request, so one commit shows which upstream
   revision produced which published data.

## Accountability

`refreshOwner` in `manifest.json` names the maintainer who refreshes these
snapshots. `reference:check` warns while it is `"unassigned"` and still passes,
so the pipeline runs either way.

`backupReviewer` is `"none: single maintainer"`. Plan A6 asks for a second
reviewer, and this project does not have one; naming the same person twice
would satisfy the field and record a fiction. A declared absence is accepted in
the `none: <reason>` form, and only in that form does the manifest also require
`accountabilityNote` to state what the absence costs.

What it costs today: a refresh is reviewed mechanically rather than by a second
person. It arrives as a pull request whose data diff is the review surface, and
`reference:check` gates it. While the maintainer is unavailable, the freshness
workflow reports a changed upstream input to a queue nobody else reads, so the
snapshots go stale quietly instead of loudly. Phase 5 reduces that exposure by
having the freshness workflow open the refresh pull request itself, which turns
the obligation from remembering into reviewing.
