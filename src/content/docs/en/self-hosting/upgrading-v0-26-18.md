---
title: Upgrading to v0.26.18
description: Rename the custom domain name index, resolve duplicate domain records, and update purge scripts when upgrading to v0.26.18
audience: operator
pageType: how-to
sourceOfTruth: onetimesecret/migrations/2026-10-15/20261015_01_rename_ascii_display_domain_index.rb (the key rename, its refusal to overwrite, and its rollback); onetimesecret/docs/runbooks/custom-domain-ascii-index-backfill.md:63-457 (the backfill, collision plan review and apply, and index rollback); onetimesecret/lib/onetime/cli/customers_command.rb:43-45 (purge and purge-inactive)
sidebar:
  order: 18
---

v0.26.18 renames the custom domain name index that v0.26.14 introduced, adds `bin/ots domains resolve-collisions` to remove duplicate domain records, and renames the customer purge commands. One migration ships with it, so rollback is no longer a tag swap.

If you are upgrading from v0.26.16 or earlier, follow the [v0.26.17 guide](./upgrading-v0-26-17) as well, using `backfill-ascii-index` and `purge` wherever it names `backfill-canonical-index` and `purge-one`.

## Before You Start

- Record the tag you are running now.
- Plan a maintenance window if you have custom domains. The rename and any backfill or collision removal run with the web, worker and scheduler processes stopped.
- Run the commands from a shell with the application's configuration and `VALKEY_URL` or `REDIS_URL`, for example a one-off container. If custom domains use a mail sender provider, the shell also needs its credentials: the collision apply and its dry run read each provider's domain list.

## What Changes

| Area | Change | Action required? |
| :--- | :--- | :--- |
| Custom domain name index | Key renamed from `custom_domain:canonical_display_domain_index` to `custom_domain:ascii_display_domain_index`. The application reads only the new key. | Yes, if you have custom domains |
| Duplicate domain records | New `bin/ots domains resolve-collisions` plans and removes them | Only if the backfill reports collisions |
| Index backfill | `backfill-canonical-index` renamed to `backfill-ascii-index` | Update scripts |
| Customer purge | `purge-one` becomes `purge`; bulk `purge` becomes `purge-inactive` | Update scripts |
| Colonel domain removal | Response drops `reasserts_survivor`, adds `sender_cleanup` | Only if you script against it |

:::caution
Skipping the rename produces no error. The application starts with an empty index, a domain registered on v0.26.14 through v0.26.17 can be registered again under another spelling of its name, and every entry reports as missing. Once v0.26.18 has written to the new key, the rename refuses to run until you merge the two keys by hand.
:::

## The Upgrade Checklist

1. **Stop the web, worker and scheduler processes.** Leave Valkey or Redis running.

2. **Snapshot the datastore** (a managed-service snapshot, or `BGSAVE` and a copy of the RDB file once `LASTSAVE` changes).

3. **Rename the index** with the v0.26.18 code, by its path. It also renames the `:before-backfill` copy from an earlier backfill and does nothing where neither key exists.

   ```bash
   bin/ots migrate migrations/2026-10-15/20261015_01_rename_ascii_display_domain_index.rb
   bin/ots migrate migrations/2026-10-15/20261015_01_rename_ascii_display_domain_index.rb --run
   ```

   Run it by path rather than with `bin/ots migrate --run`, which applies every pending migration.

4. **Check the index.**

   ```bash
   bin/ots domains backfill-ascii-index
   ```

   Exit 0 with nothing `missing` or `stale` means the index is complete: skip to step 7. Exit 1 lists collisions, conflicts or unreadable records.

5. **Only if the report lists collisions**, make and review a plan. A collision is two or more records sharing one name in its ASCII form, such as `bücher.example.com` and `xn--bcher-kva.example.com`.

   ```bash
   bin/ots domains resolve-collisions --write collision-plan.json > collision-plan-01.txt
   ```

   `collision-plan.json` has one entry per collision. Each entry lists every record's evidence and the record the rule proposes to keep, and is marked `auto` (the rule chose one) or `manual` (it could not). Edit the file:

   - For each `manual` group, set `keep` to the extid to keep and `approved` to `true`, or set `skip` to `true`.
   - For any group that would remove a record whose cached billing is labeled `live_or_recoverable` or `unknown`, or whose organization cannot be loaded, set `approved` to `true` after checking it, or skip the group. This applies to `auto` groups too.

   :::caution
   Removed records' brand settings and configurations are deleted, not merged into the kept record. The plan's DNS, billing and routing evidence is stored data, not a live check. `--yes` skips the confirmation prompt and approves nothing.
   :::

   The [collision section of the runbook](https://github.com/onetimesecret/onetimesecret/blob/v0.26.18/docs/runbooks/custom-domain-ascii-index-backfill.md#6-resolve-collisions-and-conflicts) explains every field and how to resolve conflicts and unreadable records.

6. **Only if you made a plan**, preview and apply it:

   ```bash
   bin/ots domains resolve-collisions --apply --plan collision-plan.json --dry-run
   bin/ots domains resolve-collisions --apply --plan collision-plan.json
   ```

   Keep the plan and each report. Exit 1 means a group was skipped or did not finish; the report gives the reason per group.

7. **Fill the index**, repeating until it exits 0:

   ```bash
   bin/ots domains backfill-ascii-index --apply
   ```

8. **Start the application.**

9. **Update scripts** that call the renamed commands:

   ```bash
   bin/ots customers purge IDENTIFIER                         # one account, was purge-one
   bin/ots customers purge-inactive --older-than 3y           # bulk preview, was purge
   bin/ots customers purge-inactive --older-than 3y --purge   # bulk delete
   ```

## Verify

1. `bin/ots domains doctor --all` reports no `ascii_index_*` finding.
2. `valkey-cli -u "$VALKEY_URL" EXISTS custom_domain:canonical_display_domain_index` returns `0`.
3. Each kept domain serves its secret links. On the Approximated strategy, check it with `bin/ots domains probe <name>`.

## Troubleshooting

### The rename reports "already exists … not renamed"

v0.26.18 ran before the rename, and a backfill or registration wrote the new key. Merge the two keys by hand, or delete the new key, run the rename again, and continue from step 4. The backfill rebuilds any entries lost with the deleted key.

### `resolve-collisions --apply` skips a group

The report gives the reason. A group whose evidence changed since the plan was made needs a new plan. A group pending approval needs `approved: true` in the plan. A sender identity that could not be read names the record it stopped on: a provider failure is worth a retry; a local one needs that record's mailer configuration repaired or removed.

### A custom domain stops resolving after the upgrade

The log shows `[CustomDomain] Refused the index entry for …`: an index entry names a record stored under a different name, and v0.26.18 refuses it rather than serving that record. Run `bin/ots domains doctor --all` and follow the runbook's conflict steps.

### A purge script fails with an unknown command or option

`purge-one` no longer exists, and `purge` now takes one account identifier. Use the commands in step 9.

## Rollback

v0.26.17 reads only the old key. With the application stopped, rename it back using the v0.26.18 code, then pin the tag you recorded:

```bash
bin/ots migrate --rollback 20261015_01_rename_ascii_display_domain_index --run
```

Records removed by `resolve-collisions` are restored only from the snapshot taken in step 2. No configuration variables were added.
