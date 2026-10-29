---
textprov: true
title: Command Line Reference
description: Every command the ots command line registers, with what it writes, the flag that lets it write, its external effects and what it needs to run.
audience: operator
pageType: reference
draft: true
sourceOfTruth: onetimesecret/bin/ots:20-40 at v0.26.19 (the global switches parsed before dispatch); onetimesecret/lib/onetime/cli.rb:130-280 at v0.26.19 (the registered command tree, including app command auto-discovery); onetimesecret/lib/onetime/cli/write_gate.rb:20-104 at v0.26.19 (the shared write gate and its aliases); onetimesecret/lib/onetime/cli/option_types.rb:84-150 at v0.26.19 (numeric option coercion and the error on a non-numeric value); src/data/reference/cli.json (the per-command records and their evidence)
---

T󠄁h󠄁i󠄁s󠄁 r󠄁e󠄁f󠄁e󠄁r󠄁e󠄁n󠄁c󠄁e󠄁 l󠄁i󠄁s󠄁t󠄁s󠄁 e󠄁v󠄁e󠄁r󠄁y󠄁 c󠄁o󠄁m󠄁m󠄁a󠄁n󠄁d󠄁 t󠄁h󠄁e󠄁 `ots` c󠄁o󠄁m󠄁m󠄁a󠄁n󠄁d󠄁 l󠄁i󠄁n󠄁e󠄁 r󠄁e󠄁g󠄁i󠄁s󠄁t󠄁e󠄁r󠄁s󠄁,󠄁 w󠄁h󠄁a󠄁t󠄁 e󠄁a󠄁c󠄁h󠄁 o󠄁n󠄁e󠄁 w󠄁r󠄁i󠄁t󠄁e󠄁s󠄁,󠄁 t󠄁h󠄁e󠄁 f󠄁l󠄁a󠄁g󠄁 t󠄁h󠄁a󠄁t󠄁 l󠄁e󠄁t󠄁s󠄁 i󠄁t󠄁 w󠄁r󠄁i󠄁t󠄁e󠄁,󠄁 t󠄁h󠄁e󠄁 e󠄁f󠄁f󠄁e󠄁c󠄁t󠄁s󠄁 t󠄁h󠄁a󠄁t󠄁 l󠄁e󠄁a󠄁v󠄁e󠄁 t󠄁h󠄁e󠄁 h󠄁o󠄁s󠄁t󠄁 a󠄁n󠄁d󠄁 w󠄁h󠄁a󠄁t󠄁 h󠄁a󠄁s󠄁 t󠄁o󠄁 b󠄁e󠄁 a󠄁v󠄁a󠄁i󠄁l󠄁a󠄁b󠄁l󠄁e󠄁 f󠄁o󠄁r󠄁 i󠄁t󠄁 t󠄁o󠄁 r󠄁u󠄁n󠄁.󠄁 T󠄁h󠄁i󠄁s󠄁 r󠄁e󠄁f󠄁e󠄁r󠄁e󠄁n󠄁c󠄁e󠄁 r󠄁e󠄁f󠄁l󠄁e󠄁c󠄁t󠄁s󠄁 O󠄁n󠄁e󠄁t󠄁i󠄁m󠄁e󠄁 S󠄁e󠄁c󠄁r󠄁e󠄁t󠄁 v󠄁0󠄁.󠄁2󠄁6󠄁.󠄁1󠄁9󠄁 (󠄁`e98a88c9`)󠄁.󠄁

## R󠄁e󠄁a󠄁d󠄁i󠄁n󠄁g󠄁 t󠄁h󠄁e󠄁 t󠄁a󠄁b󠄁l󠄁e󠄁s󠄁

**W󠄁r󠄁i󠄁t󠄁e󠄁s󠄁** n󠄁a󠄁m󠄁e󠄁s󠄁 w󠄁h󠄁a󠄁t󠄁 a󠄁 c󠄁o󠄁m󠄁m󠄁a󠄁n󠄁d󠄁 c󠄁h󠄁a󠄁n󠄁g󠄁e󠄁s󠄁:󠄁 t󠄁h󠄁e󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁,󠄁 t󠄁h󠄁e󠄁 a󠄁u󠄁t󠄁h󠄁e󠄁n󠄁t󠄁i󠄁c󠄁a󠄁t󠄁i󠄁o󠄁n󠄁 d󠄁a󠄁t󠄁a󠄁b󠄁a󠄁s󠄁e󠄁,󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁,󠄁 t󠄁h󠄁e󠄁 m󠄁e󠄁s󠄁s󠄁a󠄁g󠄁e󠄁 b󠄁r󠄁o󠄁k󠄁e󠄁r󠄁,󠄁 o󠄁r󠄁 a󠄁 f󠄁i󠄁l󠄁e󠄁.󠄁 **G󠄁a󠄁t󠄁e󠄁** i󠄁s󠄁 t󠄁h󠄁e󠄁 f󠄁l󠄁a󠄁g󠄁 o󠄁r󠄁 p󠄁r󠄁o󠄁m󠄁p󠄁t󠄁 t󠄁h󠄁a󠄁t󠄁 s󠄁t󠄁a󠄁n󠄁d󠄁s󠄁 b󠄁e󠄁t󠄁w󠄁e󠄁e󠄁n󠄁 t󠄁h󠄁e󠄁 c󠄁o󠄁m󠄁m󠄁a󠄁n󠄁d󠄁 a󠄁n󠄁d󠄁 t󠄁h󠄁a󠄁t󠄁 c󠄁h󠄁a󠄁n󠄁g󠄁e󠄁.󠄁 **E󠄁x󠄁t󠄁e󠄁r󠄁n󠄁a󠄁l󠄁 e󠄁f󠄁f󠄁e󠄁c󠄁t󠄁s󠄁** c󠄁o󠄁v󠄁e󠄁r󠄁s󠄁 a󠄁n󠄁y󠄁t󠄁h󠄁i󠄁n󠄁g󠄁 t󠄁h󠄁a󠄁t󠄁 l󠄁e󠄁a󠄁v󠄁e󠄁s󠄁 t󠄁h󠄁e󠄁 h󠄁o󠄁s󠄁t󠄁,󠄁 i󠄁n󠄁c󠄁l󠄁u󠄁d󠄁i󠄁n󠄁g󠄁 m󠄁a󠄁i󠄁l󠄁,󠄁 D󠄁N󠄁S󠄁 a󠄁n󠄁d󠄁 T󠄁L󠄁S󠄁 l󠄁o󠄁o󠄁k󠄁u󠄁p󠄁s󠄁,󠄁 b󠄁r󠄁o󠄁k󠄁e󠄁r󠄁 t󠄁r󠄁a󠄁f󠄁f󠄁i󠄁c󠄁 a󠄁n󠄁d󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 c󠄁a󠄁l󠄁l󠄁s󠄁.󠄁 **P󠄁r󠄁i󠄁v󠄁i󠄁l󠄁e󠄁g󠄁e󠄁s󠄁** l󠄁i󠄁s󠄁t󠄁s󠄁 w󠄁h󠄁a󠄁t󠄁 t󠄁h󠄁e󠄁 c󠄁o󠄁m󠄁m󠄁a󠄁n󠄁d󠄁 n󠄁e󠄁e󠄁d󠄁s󠄁 t󠄁o󠄁 g󠄁e󠄁t󠄁 t󠄁h󠄁a󠄁t󠄁 f󠄁a󠄁r󠄁.󠄁

M󠄁a󠄁n󠄁y󠄁 c󠄁o󠄁m󠄁m󠄁a󠄁n󠄁d󠄁s󠄁 s󠄁h󠄁a󠄁r󠄁e󠄁 o󠄁n󠄁e󠄁 w󠄁r󠄁i󠄁t󠄁e󠄁 g󠄁a󠄁t󠄁e󠄁:󠄁 a󠄁 b󠄁a󠄁r󠄁e󠄁 r󠄁u󠄁n󠄁 i󠄁s󠄁 a󠄁 p󠄁r󠄁e󠄁v󠄁i󠄁e󠄁w󠄁 t󠄁h󠄁a󠄁t󠄁 w󠄁r󠄁i󠄁t󠄁e󠄁s󠄁 n󠄁o󠄁t󠄁h󠄁i󠄁n󠄁g󠄁,󠄁 `--apply` i󠄁s󠄁 t󠄁h󠄁e󠄁 o󠄁n󠄁l󠄁y󠄁 f󠄁l󠄁a󠄁g󠄁 t󠄁h󠄁a󠄁t󠄁 w󠄁r󠄁i󠄁t󠄁e󠄁s󠄁,󠄁 a󠄁n󠄁d󠄁 `-y`,󠄁 `--yes` a󠄁n󠄁d󠄁 `-f` a󠄁r󠄁e󠄁 a󠄁l󠄁i󠄁a󠄁s󠄁e󠄁s󠄁 f󠄁o󠄁r󠄁 `--apply` u󠄁n󠄁l󠄁e󠄁s󠄁s󠄁 a󠄁 r󠄁o󠄁w󠄁 s󠄁a󠄁y󠄁s󠄁 o󠄁t󠄁h󠄁e󠄁r󠄁w󠄁i󠄁s󠄁e󠄁.󠄁 `--dry-run` r󠄁e󠄁s󠄁t󠄁a󠄁t󠄁e󠄁s󠄁 t󠄁h󠄁e󠄁 d󠄁e󠄁f󠄁a󠄁u󠄁l󠄁t󠄁,󠄁 s󠄁o󠄁 p󠄁a󠄁s󠄁s󠄁i󠄁n󠄁g󠄁 i󠄁t󠄁 t󠄁o󠄁g󠄁e󠄁t󠄁h󠄁e󠄁r󠄁 w󠄁i󠄁t󠄁h󠄁 `--apply` i󠄁s󠄁 a󠄁n󠄁 e󠄁r󠄁r󠄁o󠄁r󠄁 r󠄁a󠄁t󠄁h󠄁e󠄁r󠄁 t󠄁h󠄁a󠄁n󠄁 a󠄁 g󠄁u󠄁e󠄁s󠄁s󠄁.󠄁 A󠄁 p󠄁i󠄁p󠄁e󠄁d󠄁 `y` i󠄁s󠄁 n󠄁o󠄁t󠄁 a󠄁 c󠄁o󠄁n󠄁f󠄁i󠄁r󠄁m󠄁a󠄁t󠄁i󠄁o󠄁n󠄁 o󠄁n󠄁 t󠄁h󠄁e󠄁s󠄁e󠄁 c󠄁o󠄁m󠄁m󠄁a󠄁n󠄁d󠄁s󠄁.󠄁

N󠄁o󠄁 r󠄁e󠄁g󠄁i󠄁s󠄁t󠄁e󠄁r󠄁e󠄁d󠄁 c󠄁o󠄁m󠄁m󠄁a󠄁n󠄁d󠄁 r󠄁e󠄁q󠄁u󠄁i󠄁r󠄁e󠄁s󠄁 r󠄁o󠄁o󠄁t󠄁.󠄁 T󠄁h󠄁e󠄁 c󠄁o󠄁m󠄁m󠄁a󠄁n󠄁d󠄁 b󠄁a󠄁s󠄁e󠄁 c󠄁l󠄁a󠄁s󠄁s󠄁e󠄁s󠄁 d󠄁e󠄁f󠄁i󠄁n󠄁e󠄁 a󠄁 p󠄁r󠄁i󠄁v󠄁i󠄁l󠄁e󠄁g󠄁e󠄁 c󠄁h󠄁e󠄁c󠄁k󠄁,󠄁 a󠄁n󠄁d󠄁 n󠄁o󠄁 c󠄁o󠄁m󠄁m󠄁a󠄁n󠄁d󠄁 a󠄁t󠄁 t󠄁h󠄁i󠄁s󠄁 r󠄁e󠄁l󠄁e󠄁a󠄁s󠄁e󠄁 c󠄁a󠄁l󠄁l󠄁s󠄁 i󠄁t󠄁.󠄁

W󠄁h󠄁e󠄁r󠄁e󠄁 a󠄁 c󠄁e󠄁l󠄁l󠄁 r󠄁e󠄁a󠄁d󠄁s󠄁 "󠄁n󠄁o󠄁t󠄁 d󠄁e󠄁t󠄁e󠄁r󠄁m󠄁i󠄁n󠄁e󠄁d󠄁 f󠄁r󠄁o󠄁m󠄁 s󠄁o󠄁u󠄁r󠄁c󠄁e󠄁"󠄁,󠄁 r󠄁e󠄁a󠄁d󠄁i󠄁n󠄁g󠄁 t󠄁h󠄁e󠄁 p󠄁i󠄁n󠄁n󠄁e󠄁d󠄁 s󠄁o󠄁u󠄁r󠄁c󠄁e󠄁 d󠄁i󠄁d󠄁 n󠄁o󠄁t󠄁 s󠄁e󠄁t󠄁t󠄁l󠄁e󠄁 i󠄁t󠄁,󠄁 a󠄁n󠄁d󠄁 n󠄁o󠄁 v󠄁a󠄁l󠄁u󠄁e󠄁 i󠄁s󠄁 g󠄁u󠄁e󠄁s󠄁s󠄁e󠄁d󠄁 i󠄁n󠄁 i󠄁t󠄁s󠄁 p󠄁l󠄁a󠄁c󠄁e󠄁.󠄁

## G󠄁l󠄁o󠄁b󠄁a󠄁l󠄁 s󠄁w󠄁i󠄁t󠄁c󠄁h󠄁e󠄁s󠄁

T󠄁h󠄁e󠄁s󠄁e󠄁 a󠄁r󠄁e󠄁 p󠄁a󠄁r󠄁s󠄁e󠄁d󠄁 b󠄁e󠄁f󠄁o󠄁r󠄁e󠄁 t󠄁h󠄁e󠄁 c󠄁o󠄁m󠄁m󠄁a󠄁n󠄁d󠄁 r󠄁u󠄁n󠄁s󠄁,󠄁 s󠄁o󠄁 t󠄁h󠄁e󠄁y󠄁 w󠄁o󠄁r󠄁k󠄁 w󠄁i󠄁t󠄁h󠄁 a󠄁n󠄁y󠄁 c󠄁o󠄁m󠄁m󠄁a󠄁n󠄁d󠄁.󠄁

| S󠄁w󠄁i󠄁t󠄁c󠄁h󠄁 | E󠄁f󠄁f󠄁e󠄁c󠄁t󠄁 |
| :--- | :--- |
| `-v`,󠄁 `--verbose` | T󠄁u󠄁r󠄁n󠄁s󠄁 o󠄁n󠄁 v󠄁e󠄁r󠄁b󠄁o󠄁s󠄁e󠄁 o󠄁u󠄁t󠄁p󠄁u󠄁t󠄁.󠄁 |
| `-D`,󠄁 `--debug` | T󠄁u󠄁r󠄁n󠄁s󠄁 o󠄁n󠄁 d󠄁e󠄁b󠄁u󠄁g󠄁 m󠄁o󠄁d󠄁e󠄁,󠄁 i󠄁n󠄁c󠄁l󠄁u󠄁d󠄁i󠄁n󠄁g󠄁 b󠄁a󠄁c󠄁k󠄁t󠄁r󠄁a󠄁c󠄁e󠄁s󠄁 o󠄁n󠄁 f󠄁a󠄁i󠄁l󠄁u󠄁r󠄁e󠄁.󠄁 |
| `--safe-boot` | S󠄁e󠄁t󠄁s󠄁 `SAFE_BOOT` s󠄁o󠄁 a󠄁 c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁 e󠄁r󠄁r󠄁o󠄁r󠄁 t󠄁h󠄁a󠄁t󠄁 i󠄁s󠄁 f󠄁a󠄁t󠄁a󠄁l󠄁 a󠄁t󠄁 b󠄁o󠄁o󠄁t󠄁 c󠄁a󠄁n󠄁 b󠄁e󠄁 b󠄁y󠄁p󠄁a󠄁s󠄁s󠄁e󠄁d󠄁 t󠄁o󠄁 r󠄁e󠄁a󠄁c󠄁h󠄁 t󠄁h󠄁e󠄁 c󠄁o󠄁n󠄁s󠄁o󠄁l󠄁e󠄁.󠄁 |

## C󠄁o󠄁r󠄁e󠄁 a󠄁n󠄁d󠄁 p󠄁r󠄁o󠄁c󠄁e󠄁s󠄁s󠄁 c󠄁o󠄁n󠄁t󠄁r󠄁o󠄁l󠄁

| C󠄁o󠄁m󠄁m󠄁a󠄁n󠄁d󠄁 | W󠄁r󠄁i󠄁t󠄁e󠄁s󠄁 | G󠄁a󠄁t󠄁e󠄁 | E󠄁x󠄁t󠄁e󠄁r󠄁n󠄁a󠄁l󠄁 e󠄁f󠄁f󠄁e󠄁c󠄁t󠄁s󠄁 | P󠄁r󠄁i󠄁v󠄁i󠄁l󠄁e󠄁g󠄁e󠄁s󠄁 | D󠄁e󠄁s󠄁c󠄁r󠄁i󠄁p󠄁t󠄁i󠄁o󠄁n󠄁 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `ots apitoken` | d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁;󠄁 t󠄁h󠄁e󠄁 R󠄁o󠄁d󠄁a󠄁u󠄁t󠄁h󠄁 a󠄁c󠄁c󠄁o󠄁u󠄁n󠄁t󠄁 r󠄁o󠄁w󠄁 i󠄁n󠄁 F󠄁u󠄁l󠄁l󠄁 m󠄁o󠄁d󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁,󠄁 a󠄁u󠄁t󠄁h󠄁 d󠄁a󠄁t󠄁a󠄁b󠄁a󠄁s󠄁e󠄁 i󠄁n󠄁 F󠄁u󠄁l󠄁l󠄁 m󠄁o󠄁d󠄁e󠄁 | G󠄁e󠄁n󠄁e󠄁r󠄁a󠄁t󠄁e󠄁 o󠄁r󠄁 d󠄁i󠄁s󠄁p󠄁l󠄁a󠄁y󠄁 B󠄁a󠄁s󠄁i󠄁c󠄁 A󠄁u󠄁t󠄁h󠄁 A󠄁P󠄁I󠄁 c󠄁r󠄁e󠄁d󠄁e󠄁n󠄁t󠄁i󠄁a󠄁l󠄁s󠄁 f󠄁o󠄁r󠄁 a󠄁 c󠄁u󠄁s󠄁t󠄁o󠄁m󠄁e󠄁r󠄁 |
| `ots audit` | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | R󠄁e󠄁a󠄁d󠄁 t󠄁h󠄁e󠄁 o󠄁p󠄁e󠄁r󠄁a󠄁t󠄁o󠄁r󠄁 a󠄁u󠄁d󠄁i󠄁t󠄁 t󠄁r󠄁a󠄁i󠄁l󠄁 |
| `ots audit list` | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | L󠄁i󠄁s󠄁t󠄁 r󠄁e󠄁c󠄁e󠄁n󠄁t󠄁 o󠄁p󠄁e󠄁r󠄁a󠄁t󠄁o󠄁r󠄁 a󠄁u󠄁d󠄁i󠄁t󠄁 e󠄁v󠄁e󠄁n󠄁t󠄁s󠄁 (󠄁n󠄁e󠄁w󠄁e󠄁s󠄁t󠄁 f󠄁i󠄁r󠄁s󠄁t󠄁)󠄁 |
| `ots boot-test` | n󠄁o󠄁n󠄁e󠄁:󠄁 b󠄁o󠄁o󠄁t󠄁s󠄁 a󠄁n󠄁d󠄁 i󠄁n󠄁i󠄁t󠄁i󠄁a󠄁l󠄁i󠄁z󠄁e󠄁s󠄁 t󠄁h󠄁e󠄁 a󠄁p󠄁p󠄁l󠄁i󠄁c󠄁a󠄁t󠄁i󠄁o󠄁n󠄁 r󠄁e󠄁g󠄁i󠄁s󠄁t󠄁r󠄁y󠄁 | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | T󠄁e󠄁s󠄁t󠄁 a󠄁p󠄁p󠄁l󠄁i󠄁c󠄁a󠄁t󠄁i󠄁o󠄁n󠄁 b󠄁o󠄁o󠄁t󠄁 a󠄁n󠄁d󠄁 r󠄁e󠄁g󠄁i󠄁s󠄁t󠄁r󠄁y󠄁 i󠄁n󠄁i󠄁t󠄁i󠄁a󠄁l󠄁i󠄁z󠄁a󠄁t󠄁i󠄁o󠄁n󠄁 |
| `ots completion` | n󠄁o󠄁n󠄁e󠄁;󠄁 p󠄁r󠄁i󠄁n󠄁t󠄁s󠄁 a󠄁 c󠄁o󠄁m󠄁p󠄁l󠄁e󠄁t󠄁i󠄁o󠄁n󠄁 s󠄁c󠄁r󠄁i󠄁p󠄁t󠄁 t󠄁o󠄁 s󠄁t󠄁a󠄁n󠄁d󠄁a󠄁r󠄁d󠄁 o󠄁u󠄁t󠄁p󠄁u󠄁t󠄁 | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁 b󠄁o󠄁o󠄁t󠄁:󠄁 t󠄁h󠄁e󠄁 c󠄁o󠄁m󠄁m󠄁a󠄁n󠄁d󠄁 r󠄁e󠄁g󠄁i󠄁s󠄁t󠄁r󠄁y󠄁 o󠄁n󠄁l󠄁y󠄁 | G󠄁e󠄁n󠄁e󠄁r󠄁a󠄁t󠄁e󠄁 a󠄁 s󠄁h󠄁e󠄁l󠄁l󠄁 c󠄁o󠄁m󠄁p󠄁l󠄁e󠄁t󠄁i󠄁o󠄁n󠄁 s󠄁c󠄁r󠄁i󠄁p󠄁t󠄁 (󠄁b󠄁a󠄁s󠄁h󠄁,󠄁 z󠄁s󠄁h󠄁,󠄁 f󠄁i󠄁s󠄁h󠄁)󠄁 |
| `ots console` | n󠄁o󠄁n󠄁e󠄁 i󠄁t󠄁s󠄁e󠄁l󠄁f󠄁;󠄁 r󠄁e󠄁p󠄁l󠄁a󠄁c󠄁e󠄁s󠄁 t󠄁h󠄁e󠄁 p󠄁r󠄁o󠄁c󠄁e󠄁s󠄁s󠄁 w󠄁i󠄁t󠄁h󠄁 `irb` (󠄁a󠄁n󠄁 i󠄁n󠄁t󠄁e󠄁r󠄁a󠄁c󠄁t󠄁i󠄁v󠄁e󠄁 s󠄁e󠄁s󠄁s󠄁i󠄁o󠄁n󠄁 c󠄁a󠄁n󠄁 w󠄁r󠄁i󠄁t󠄁e󠄁)󠄁 | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 u󠄁n󠄁l󠄁e󠄁s󠄁s󠄁 `--delay-boot` | R󠄁u󠄁b󠄁y󠄁 i󠄁r󠄁b󠄁 w󠄁i󠄁t󠄁h󠄁 O󠄁n󠄁e󠄁t󠄁i󠄁m󠄁e󠄁 p󠄁r󠄁e󠄁l󠄁o󠄁a󠄁d󠄁e󠄁d󠄁 |
| `ots help` | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁 b󠄁o󠄁o󠄁t󠄁:󠄁 f󠄁i󠄁l󠄁e󠄁s󠄁 a󠄁n󠄁d󠄁 e󠄁n󠄁v󠄁i󠄁r󠄁o󠄁n󠄁m󠄁e󠄁n󠄁t󠄁 o󠄁n󠄁l󠄁y󠄁 | D󠄁i󠄁s󠄁p󠄁l󠄁a󠄁y󠄁 h󠄁e󠄁l󠄁p󠄁 i󠄁n󠄁f󠄁o󠄁r󠄁m󠄁a󠄁t󠄁i󠄁o󠄁n󠄁 |
| `ots install check` | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | E󠄁x󠄁i󠄁t󠄁 0󠄁 i󠄁f󠄁 e󠄁n󠄁v󠄁i󠄁r󠄁o󠄁n󠄁m󠄁e󠄁n󠄁t󠄁 h󠄁a󠄁s󠄁 b󠄁e󠄁e󠄁n󠄁 i󠄁n󠄁i󠄁t󠄁i󠄁a󠄁l󠄁i󠄁z󠄁e󠄁d󠄁,󠄁 1󠄁 o󠄁t󠄁h󠄁e󠄁r󠄁w󠄁i󠄁s󠄁e󠄁 |
| `ots install mark` | d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁:󠄁 i󠄁n󠄁c󠄁r󠄁e󠄁m󠄁e󠄁n󠄁t󠄁s󠄁 t󠄁h󠄁e󠄁 `onetime:install:init_count` c󠄁o󠄁u󠄁n󠄁t󠄁e󠄁r󠄁 | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | R󠄁e󠄁c󠄁o󠄁r󠄁d󠄁 t󠄁h󠄁a󠄁t󠄁 b󠄁i󠄁n󠄁/󠄁s󠄁e󠄁t󠄁u󠄁p󠄁 -󠄁-󠄁i󠄁n󠄁i󠄁t󠄁 h󠄁a󠄁s󠄁 c󠄁o󠄁m󠄁p󠄁l󠄁e󠄁t󠄁e󠄁d󠄁 (󠄁i󠄁n󠄁c󠄁r󠄁e󠄁m󠄁e󠄁n󠄁t󠄁s󠄁 c󠄁o󠄁u󠄁n󠄁t󠄁e󠄁r󠄁)󠄁 |
| `ots load-path` | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁 b󠄁o󠄁o󠄁t󠄁:󠄁 f󠄁i󠄁l󠄁e󠄁s󠄁 a󠄁n󠄁d󠄁 e󠄁n󠄁v󠄁i󠄁r󠄁o󠄁n󠄁m󠄁e󠄁n󠄁t󠄁 o󠄁n󠄁l󠄁y󠄁 | L󠄁i󠄁s󠄁t󠄁s󠄁 t󠄁h󠄁e󠄁 f󠄁i󠄁r󠄁s󠄁t󠄁 5󠄁 p󠄁a󠄁t󠄁h󠄁s󠄁 i󠄁n󠄁 t󠄁h󠄁e󠄁 l󠄁o󠄁a󠄁d󠄁 p󠄁a󠄁t󠄁h󠄁 |
| `ots passwords` | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | P󠄁a󠄁s󠄁s󠄁w󠄁o󠄁r󠄁d󠄁 h󠄁a󠄁s󠄁h󠄁 s󠄁t󠄁a󠄁t󠄁i󠄁s󠄁t󠄁i󠄁c󠄁s󠄁 |
| `ots scheduler` | s󠄁c󠄁h󠄁e󠄁d󠄁u󠄁l󠄁e󠄁r󠄁 r󠄁u󠄁n󠄁 r󠄁e󠄁c󠄁o󠄁r󠄁d󠄁s󠄁,󠄁 a󠄁 P󠄁I󠄁D󠄁 f󠄁i󠄁l󠄁e󠄁 w󠄁i󠄁t󠄁h󠄁 `--daemonize`,󠄁 a󠄁n󠄁d󠄁 w󠄁h󠄁a󠄁t󠄁e󠄁v󠄁e󠄁r󠄁 t󠄁h󠄁e󠄁 e󠄁n󠄁a󠄁b󠄁l󠄁e󠄁d󠄁 j󠄁o󠄁b󠄁s󠄁 w󠄁r󠄁i󠄁t󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | w󠄁h󠄁a󠄁t󠄁e󠄁v󠄁e󠄁r󠄁 t󠄁h󠄁e󠄁 e󠄁n󠄁a󠄁b󠄁l󠄁e󠄁d󠄁 j󠄁o󠄁b󠄁s󠄁 r󠄁e󠄁a󠄁c󠄁h󠄁 (󠄁m󠄁a󠄁i󠄁l󠄁,󠄁 b󠄁r󠄁o󠄁k󠄁e󠄁r󠄁,󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁)󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | S󠄁t󠄁a󠄁r󠄁t󠄁 R󠄁u󠄁f󠄁u󠄁s󠄁 j󠄁o󠄁b󠄁 s󠄁c󠄁h󠄁e󠄁d󠄁u󠄁l󠄁e󠄁r󠄁 |
| `ots scheduler status` | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | S󠄁h󠄁o󠄁w󠄁 s󠄁c󠄁h󠄁e󠄁d󠄁u󠄁l󠄁e󠄁d󠄁 j󠄁o󠄁b󠄁s󠄁:󠄁 l󠄁a󠄁s󠄁t󠄁 r󠄁u󠄁n󠄁,󠄁 n󠄁e󠄁x󠄁t󠄁 d󠄁u󠄁e󠄁,󠄁 l󠄁a󠄁s󠄁t󠄁 e󠄁r󠄁r󠄁o󠄁r󠄁,󠄁 s󠄁c󠄁h󠄁e󠄁d󠄁u󠄁l󠄁e󠄁r󠄁 l󠄁i󠄁v󠄁e󠄁n󠄁e󠄁s󠄁s󠄁 |
| `ots server` | n󠄁o󠄁n󠄁e󠄁 i󠄁t󠄁s󠄁e󠄁l󠄁f󠄁;󠄁 s󠄁e󠄁r󠄁v󠄁e󠄁s󠄁 t󠄁h󠄁e󠄁 a󠄁p󠄁p󠄁l󠄁i󠄁c󠄁a󠄁t󠄁i󠄁o󠄁n󠄁 | n󠄁o󠄁n󠄁e󠄁 | l󠄁i󠄁s󠄁t󠄁e󠄁n󠄁s󠄁 o󠄁n󠄁 `--bind` a󠄁n󠄁d󠄁 `--port` | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | S󠄁t󠄁a󠄁r󠄁t󠄁 t󠄁h󠄁e󠄁 w󠄁e󠄁b󠄁 s󠄁e󠄁r󠄁v󠄁e󠄁r󠄁 (󠄁P󠄁u󠄁m󠄁a󠄁 o󠄁r󠄁 T󠄁h󠄁i󠄁n󠄁)󠄁 |
| `ots status` | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | p󠄁r󠄁o󠄁b󠄁e󠄁s󠄁 t󠄁h󠄁e󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁,󠄁 t󠄁h󠄁e󠄁 R󠄁o󠄁d󠄁a󠄁u󠄁t󠄁h󠄁 d󠄁a󠄁t󠄁a󠄁b󠄁a󠄁s󠄁e󠄁 a󠄁n󠄁d󠄁 t󠄁h󠄁e󠄁 b󠄁r󠄁o󠄁k󠄁e󠄁r󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | S󠄁h󠄁o󠄁w󠄁 s󠄁y󠄁s󠄁t󠄁e󠄁m󠄁-󠄁w󠄁i󠄁d󠄁e󠄁 s󠄁e󠄁r󠄁v󠄁i󠄁c󠄁e󠄁 s󠄁t󠄁a󠄁t󠄁u󠄁s󠄁 |
| `ots test-data` | d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁:󠄁 c󠄁r󠄁e󠄁a󠄁t󠄁e󠄁s󠄁 f󠄁i󠄁x󠄁t󠄁u󠄁r󠄁e󠄁 r󠄁e󠄁c󠄁o󠄁r󠄁d󠄁s󠄁,󠄁 o󠄁r󠄁 d󠄁e󠄁l󠄁e󠄁t󠄁e󠄁s󠄁 t󠄁h󠄁e󠄁m󠄁 w󠄁i󠄁t󠄁h󠄁 `--cleanup` | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | C󠄁r󠄁e󠄁a󠄁t󠄁e󠄁 o󠄁r󠄁 c󠄁l󠄁e󠄁a󠄁n󠄁u󠄁p󠄁 t󠄁e󠄁s󠄁t󠄁 d󠄁a󠄁t󠄁a󠄁 f󠄁o󠄁r󠄁 a󠄁 c󠄁u󠄁s󠄁t󠄁o󠄁m󠄁e󠄁r󠄁 |
| `ots totp` | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | G󠄁e󠄁n󠄁e󠄁r󠄁a󠄁t󠄁e󠄁 o󠄁r󠄁 v󠄁e󠄁r󠄁i󠄁f󠄁y󠄁 T󠄁O󠄁T󠄁P󠄁 c󠄁o󠄁d󠄁e󠄁s󠄁 f󠄁o󠄁r󠄁 M󠄁F󠄁A󠄁 t󠄁e󠄁s󠄁t󠄁i󠄁n󠄁g󠄁 |
| `ots version` | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁 b󠄁o󠄁o󠄁t󠄁:󠄁 f󠄁i󠄁l󠄁e󠄁s󠄁 a󠄁n󠄁d󠄁 e󠄁n󠄁v󠄁i󠄁r󠄁o󠄁n󠄁m󠄁e󠄁n󠄁t󠄁 o󠄁n󠄁l󠄁y󠄁 | D󠄁i󠄁s󠄁p󠄁l󠄁a󠄁y󠄁 v󠄁e󠄁r󠄁s󠄁i󠄁o󠄁n󠄁 i󠄁n󠄁f󠄁o󠄁r󠄁m󠄁a󠄁t󠄁i󠄁o󠄁n󠄁 |
| `ots worker` | w󠄁h󠄁a󠄁t󠄁e󠄁v󠄁e󠄁r󠄁 t󠄁h󠄁e󠄁 c󠄁o󠄁n󠄁s󠄁u󠄁m󠄁e󠄁d󠄁 j󠄁o󠄁b󠄁s󠄁 w󠄁r󠄁i󠄁t󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | c󠄁o󠄁n󠄁s󠄁u󠄁m󠄁e󠄁s󠄁 b󠄁r󠄁o󠄁k󠄁e󠄁r󠄁 m󠄁e󠄁s󠄁s󠄁a󠄁g󠄁e󠄁s󠄁;󠄁 t󠄁h󠄁e󠄁 e󠄁m󠄁a󠄁i󠄁l󠄁 w󠄁o󠄁r󠄁k󠄁e󠄁r󠄁 d󠄁e󠄁l󠄁i󠄁v󠄁e󠄁r󠄁s󠄁 m󠄁a󠄁i󠄁l󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁,󠄁 b󠄁r󠄁o󠄁k󠄁e󠄁r󠄁 | S󠄁t󠄁a󠄁r󠄁t󠄁 S󠄁n󠄁e󠄁a󠄁k󠄁e󠄁r󠄁s󠄁 j󠄁o󠄁b󠄁 w󠄁o󠄁r󠄁k󠄁e󠄁r󠄁s󠄁 |

A󠄁l󠄁i󠄁a󠄁s󠄁e󠄁s󠄁:󠄁 `build` i󠄁s󠄁 a󠄁n󠄁 a󠄁l󠄁i󠄁a󠄁s󠄁 o󠄁f󠄁 `ots version`;󠄁 `workers` i󠄁s󠄁 a󠄁n󠄁 a󠄁l󠄁i󠄁a󠄁s󠄁 o󠄁f󠄁 `ots worker`.󠄁

## C󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁

| C󠄁o󠄁m󠄁m󠄁a󠄁n󠄁d󠄁 | W󠄁r󠄁i󠄁t󠄁e󠄁s󠄁 | G󠄁a󠄁t󠄁e󠄁 | E󠄁x󠄁t󠄁e󠄁r󠄁n󠄁a󠄁l󠄁 e󠄁f󠄁f󠄁e󠄁c󠄁t󠄁s󠄁 | P󠄁r󠄁i󠄁v󠄁i󠄁l󠄁e󠄁g󠄁e󠄁s󠄁 | D󠄁e󠄁s󠄁c󠄁r󠄁i󠄁p󠄁t󠄁i󠄁o󠄁n󠄁 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `ots config` | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁 b󠄁o󠄁o󠄁t󠄁:󠄁 f󠄁i󠄁l󠄁e󠄁s󠄁 a󠄁n󠄁d󠄁 e󠄁n󠄁v󠄁i󠄁r󠄁o󠄁n󠄁m󠄁e󠄁n󠄁t󠄁 o󠄁n󠄁l󠄁y󠄁 | M󠄁a󠄁n󠄁a󠄁g󠄁e󠄁 a󠄁n󠄁d󠄁 v󠄁a󠄁l󠄁i󠄁d󠄁a󠄁t󠄁e󠄁 a󠄁p󠄁p󠄁l󠄁i󠄁c󠄁a󠄁t󠄁i󠄁o󠄁n󠄁 c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁 |
| `ots config brand` | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | D󠄁i󠄁a󠄁g󠄁n󠄁o󠄁s󠄁e󠄁 b󠄁r󠄁a󠄁n󠄁d󠄁-󠄁p󠄁a󠄁c󠄁k󠄁 r󠄁e󠄁s󠄁o󠄁l󠄁u󠄁t󠄁i󠄁o󠄁n󠄁 (󠄁#󠄁3󠄁8󠄁2󠄁2󠄁 n󠄁e󠄁u󠄁t󠄁r󠄁a󠄁l󠄁-󠄁b󠄁r󠄁a󠄁n󠄁d󠄁i󠄁n󠄁g󠄁 i󠄁n󠄁c󠄁i󠄁d󠄁e󠄁n󠄁t󠄁)󠄁 |
| `ots config validate` | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁 b󠄁o󠄁o󠄁t󠄁:󠄁 f󠄁i󠄁l󠄁e󠄁s󠄁 a󠄁n󠄁d󠄁 e󠄁n󠄁v󠄁i󠄁r󠄁o󠄁n󠄁m󠄁e󠄁n󠄁t󠄁 o󠄁n󠄁l󠄁y󠄁 | V󠄁a󠄁l󠄁i󠄁d󠄁a󠄁t󠄁e󠄁 c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁.󠄁d󠄁e󠄁f󠄁a󠄁u󠄁l󠄁t󠄁s󠄁.󠄁y󠄁a󠄁m󠄁l󠄁 a󠄁g󠄁a󠄁i󠄁n󠄁s󠄁t󠄁 t󠄁h󠄁e󠄁 g󠄁e󠄁n󠄁e󠄁r󠄁a󠄁t󠄁e󠄁d󠄁 J󠄁S󠄁O󠄁N󠄁 S󠄁c󠄁h󠄁e󠄁m󠄁a󠄁 |

## C󠄁u󠄁s󠄁t󠄁o󠄁m󠄁e󠄁r󠄁s󠄁

| C󠄁o󠄁m󠄁m󠄁a󠄁n󠄁d󠄁 | W󠄁r󠄁i󠄁t󠄁e󠄁s󠄁 | G󠄁a󠄁t󠄁e󠄁 | E󠄁x󠄁t󠄁e󠄁r󠄁n󠄁a󠄁l󠄁 e󠄁f󠄁f󠄁e󠄁c󠄁t󠄁s󠄁 | P󠄁r󠄁i󠄁v󠄁i󠄁l󠄁e󠄁g󠄁e󠄁s󠄁 | D󠄁e󠄁s󠄁c󠄁r󠄁i󠄁p󠄁t󠄁i󠄁o󠄁n󠄁 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `ots customers` | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | M󠄁a󠄁n󠄁a󠄁g󠄁e󠄁 c󠄁u󠄁s󠄁t󠄁o󠄁m󠄁e󠄁r󠄁 r󠄁e󠄁c󠄁o󠄁r󠄁d󠄁s󠄁 |
| `ots customers change-email` | d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 a󠄁n󠄁d󠄁 a󠄁u󠄁t󠄁h󠄁 d󠄁a󠄁t󠄁a󠄁b󠄁a󠄁s󠄁e󠄁:󠄁 e󠄁v󠄁e󠄁r󠄁y󠄁 s󠄁t󠄁o󠄁r󠄁e󠄁 k󠄁e󠄁y󠄁e󠄁d󠄁 o󠄁n󠄁 t󠄁h󠄁e󠄁 a󠄁d󠄁d󠄁r󠄁e󠄁s󠄁s󠄁 | `--apply`;󠄁 `--yes` h󠄁a󠄁s󠄁 n󠄁o󠄁 e󠄁f󠄁f󠄁e󠄁c󠄁t󠄁 | m󠄁a󠄁i󠄁l󠄁s󠄁 t󠄁h󠄁e󠄁 o󠄁l󠄁d󠄁 a󠄁n󠄁d󠄁 t󠄁h󠄁e󠄁 n󠄁e󠄁w󠄁 a󠄁d󠄁d󠄁r󠄁e󠄁s󠄁s󠄁 u󠄁n󠄁l󠄁e󠄁s󠄁s󠄁 `--no-notify` | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁,󠄁 a󠄁u󠄁t󠄁h󠄁 d󠄁a󠄁t󠄁a󠄁b󠄁a󠄁s󠄁e󠄁 i󠄁n󠄁 F󠄁u󠄁l󠄁l󠄁 m󠄁o󠄁d󠄁e󠄁 | C󠄁h󠄁a󠄁n󠄁g󠄁e󠄁 a󠄁 c󠄁u󠄁s󠄁t󠄁o󠄁m󠄁e󠄁r󠄁'󠄁s󠄁 a󠄁c󠄁c󠄁o󠄁u󠄁n󠄁t󠄁 e󠄁m󠄁a󠄁i󠄁l󠄁 a󠄁c󠄁r󠄁o󠄁s󠄁s󠄁 e󠄁v󠄁e󠄁r󠄁y󠄁 s󠄁t󠄁o󠄁r󠄁e󠄁 k󠄁e󠄁y󠄁e󠄁d󠄁 o󠄁n󠄁 i󠄁t󠄁 |
| `ots customers create` | d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁;󠄁 t󠄁h󠄁e󠄁 R󠄁o󠄁d󠄁a󠄁u󠄁t󠄁h󠄁 a󠄁c󠄁c󠄁o󠄁u󠄁n󠄁t󠄁 r󠄁o󠄁w󠄁 i󠄁n󠄁 F󠄁u󠄁l󠄁l󠄁 m󠄁o󠄁d󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁,󠄁 a󠄁u󠄁t󠄁h󠄁 d󠄁a󠄁t󠄁a󠄁b󠄁a󠄁s󠄁e󠄁 i󠄁n󠄁 F󠄁u󠄁l󠄁l󠄁 m󠄁o󠄁d󠄁e󠄁 | C󠄁r󠄁e󠄁a󠄁t󠄁e󠄁 a󠄁 n󠄁e󠄁w󠄁 c󠄁u󠄁s󠄁t󠄁o󠄁m󠄁e󠄁r󠄁 w󠄁i󠄁t󠄁h󠄁 t󠄁h󠄁e󠄁 s󠄁p󠄁e󠄁c󠄁i󠄁f󠄁i󠄁e󠄁d󠄁 e󠄁m󠄁a󠄁i󠄁l󠄁 a󠄁d󠄁d󠄁r󠄁e󠄁s󠄁s󠄁 |
| `ots customers dates` | d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁:󠄁 t󠄁e󠄁m󠄁p󠄁o󠄁r󠄁a󠄁r󠄁y󠄁 s󠄁o󠄁r󠄁t󠄁e󠄁d󠄁 s󠄁e󠄁t󠄁s󠄁 c󠄁a󠄁c󠄁h󠄁e󠄁d󠄁 f󠄁o󠄁r󠄁 3󠄁0󠄁 m󠄁i󠄁n󠄁u󠄁t󠄁e󠄁s󠄁 | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | R󠄁e󠄁p󠄁o󠄁r󠄁t󠄁 c󠄁u󠄁s󠄁t󠄁o󠄁m󠄁e󠄁r󠄁 r󠄁e󠄁c󠄁o󠄁r󠄁d󠄁 d󠄁a󠄁t󠄁e󠄁s󠄁 a󠄁n󠄁d󠄁 a󠄁g󠄁e󠄁 d󠄁i󠄁s󠄁t󠄁r󠄁i󠄁b󠄁u󠄁t󠄁i󠄁o󠄁n󠄁 |
| `ots customers diagnose` | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁,󠄁 a󠄁u󠄁t󠄁h󠄁 d󠄁a󠄁t󠄁a󠄁b󠄁a󠄁s󠄁e󠄁 i󠄁n󠄁 F󠄁u󠄁l󠄁l󠄁 m󠄁o󠄁d󠄁e󠄁 | D󠄁i󠄁a󠄁g󠄁n󠄁o󠄁s󠄁e󠄁 l󠄁o󠄁g󠄁i󠄁n󠄁,󠄁 s󠄁i󠄁g󠄁n󠄁u󠄁p󠄁,󠄁 a󠄁n󠄁d󠄁 d󠄁e󠄁f󠄁a󠄁u󠄁l󠄁t󠄁-󠄁w󠄁o󠄁r󠄁k󠄁s󠄁p󠄁a󠄁c󠄁e󠄁 p󠄁r󠄁o󠄁v󠄁i󠄁s󠄁i󠄁o󠄁n󠄁i󠄁n󠄁g󠄁 f󠄁a󠄁i󠄁l󠄁u󠄁r󠄁e󠄁s󠄁 |
| `ots customers doctor` | d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 w󠄁h󠄁e󠄁n󠄁 `--repair` i󠄁s󠄁 g󠄁i󠄁v󠄁e󠄁n󠄁;󠄁 a󠄁u󠄁d󠄁i󠄁t󠄁 o󠄁n󠄁l󠄁y󠄁 o󠄁t󠄁h󠄁e󠄁r󠄁w󠄁i󠄁s󠄁e󠄁 | `--repair` | n󠄁o󠄁n󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | C󠄁h󠄁e󠄁c󠄁k󠄁 c󠄁u󠄁s󠄁t󠄁o󠄁m󠄁e󠄁r󠄁 d󠄁a󠄁t󠄁a󠄁 i󠄁n󠄁t󠄁e󠄁g󠄁r󠄁i󠄁t󠄁y󠄁 |
| `ots customers finish-closures` | d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 a󠄁n󠄁d󠄁 a󠄁u󠄁t󠄁h󠄁 d󠄁a󠄁t󠄁a󠄁b󠄁a󠄁s󠄁e󠄁:󠄁 d󠄁e󠄁l󠄁e󠄁t󠄁e󠄁s󠄁 t󠄁h󠄁e󠄁 r󠄁e󠄁c󠄁o󠄁r󠄁d󠄁s󠄁 a󠄁 s󠄁t󠄁o󠄁p󠄁p󠄁e󠄁d󠄁 c󠄁l󠄁o󠄁s󠄁u󠄁r󠄁e󠄁 l󠄁e󠄁f󠄁t󠄁 | `--confirm` | n󠄁o󠄁n󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁,󠄁 a󠄁u󠄁t󠄁h󠄁 d󠄁a󠄁t󠄁a󠄁b󠄁a󠄁s󠄁e󠄁 i󠄁n󠄁 F󠄁u󠄁l󠄁l󠄁 m󠄁o󠄁d󠄁e󠄁 | F󠄁i󠄁n󠄁i󠄁s󠄁h󠄁 a󠄁c󠄁c󠄁o󠄁u󠄁n󠄁t󠄁 c󠄁l󠄁o󠄁s󠄁u󠄁r󠄁e󠄁s󠄁 t󠄁h󠄁a󠄁t󠄁 s󠄁t󠄁o󠄁p󠄁p󠄁e󠄁d󠄁 b󠄁e󠄁f󠄁o󠄁r󠄁e󠄁 t󠄁h󠄁e󠄁 c󠄁u󠄁s󠄁t󠄁o󠄁m󠄁e󠄁r󠄁 r󠄁e󠄁c󠄁o󠄁r󠄁d󠄁 w󠄁a󠄁s󠄁 d󠄁e󠄁l󠄁e󠄁t󠄁e󠄁d󠄁 (󠄁#󠄁4󠄁8󠄁3󠄁0󠄁)󠄁 |
| `ots customers list` | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | L󠄁i󠄁s󠄁t󠄁 a󠄁l󠄁l󠄁 c󠄁u󠄁s󠄁t󠄁o󠄁m󠄁e󠄁r󠄁s󠄁 g󠄁r󠄁o󠄁u󠄁p󠄁e󠄁d󠄁 b󠄁y󠄁 d󠄁o󠄁m󠄁a󠄁i󠄁n󠄁 |
| `ots customers normalize-emails` | a󠄁u󠄁t󠄁h󠄁 d󠄁a󠄁t󠄁a󠄁b󠄁a󠄁s󠄁e󠄁:󠄁 r󠄁e󠄁w󠄁r󠄁i󠄁t󠄁e󠄁s󠄁 m󠄁i󠄁x󠄁e󠄁d󠄁-󠄁c󠄁a󠄁s󠄁e󠄁 `accounts.email` r󠄁o󠄁w󠄁s󠄁 | `--confirm` | n󠄁o󠄁n󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁,󠄁 a󠄁u󠄁t󠄁h󠄁 d󠄁a󠄁t󠄁a󠄁b󠄁a󠄁s󠄁e󠄁 i󠄁n󠄁 F󠄁u󠄁l󠄁l󠄁 m󠄁o󠄁d󠄁e󠄁 | B󠄁r󠄁i󠄁n󠄁g󠄁 m󠄁i󠄁x󠄁e󠄁d󠄁-󠄁c󠄁a󠄁s󠄁e󠄁 a󠄁c󠄁c󠄁o󠄁u󠄁n󠄁t󠄁 e󠄁m󠄁a󠄁i󠄁l󠄁s󠄁 t󠄁o󠄁 t󠄁h󠄁e󠄁i󠄁r󠄁 c󠄁a󠄁n󠄁o󠄁n󠄁i󠄁c󠄁a󠄁l󠄁 f󠄁o󠄁r󠄁m󠄁 (󠄁#󠄁4󠄁7󠄁2󠄁6󠄁)󠄁 |
| `ots customers plan` | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | M󠄁a󠄁n󠄁a󠄁g󠄁e󠄁 a󠄁 c󠄁u󠄁s󠄁t󠄁o󠄁m󠄁e󠄁r󠄁'󠄁s󠄁 p󠄁l󠄁a󠄁n󠄁 |
| `ots customers plan set` | d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁:󠄁 t󠄁h󠄁e󠄁 c󠄁u󠄁s󠄁t󠄁o󠄁m󠄁e󠄁r󠄁 p󠄁l󠄁a󠄁n󠄁 i󠄁d󠄁 | p󠄁r󠄁o󠄁m󠄁p󠄁t󠄁,󠄁 o󠄁r󠄁 `--yes` | n󠄁o󠄁n󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | S󠄁e󠄁t󠄁 a󠄁 c󠄁u󠄁s󠄁t󠄁o󠄁m󠄁e󠄁r󠄁'󠄁s󠄁 p󠄁l󠄁a󠄁n󠄁 (󠄁v󠄁a󠄁l󠄁i󠄁d󠄁a󠄁t󠄁e󠄁d󠄁 a󠄁g󠄁a󠄁i󠄁n󠄁s󠄁t󠄁 t󠄁h󠄁e󠄁 b󠄁i󠄁l󠄁l󠄁i󠄁n󠄁g󠄁 c󠄁a󠄁t󠄁a󠄁l󠄁o󠄁g󠄁)󠄁 |
| `ots customers prune-closed-accounts` | a󠄁u󠄁t󠄁h󠄁 d󠄁a󠄁t󠄁a󠄁b󠄁a󠄁s󠄁e󠄁:󠄁 d󠄁e󠄁l󠄁e󠄁t󠄁e󠄁s󠄁 c󠄁l󠄁o󠄁s󠄁e󠄁d󠄁 a󠄁c󠄁c󠄁o󠄁u󠄁n󠄁t󠄁 r󠄁o󠄁w󠄁s󠄁 a󠄁n󠄁d󠄁 t󠄁h󠄁e󠄁i󠄁r󠄁 a󠄁u󠄁d󠄁i󠄁t󠄁 l󠄁o󠄁g󠄁s󠄁 | `--confirm` | n󠄁o󠄁n󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁,󠄁 a󠄁u󠄁t󠄁h󠄁 d󠄁a󠄁t󠄁a󠄁b󠄁a󠄁s󠄁e󠄁 i󠄁n󠄁 F󠄁u󠄁l󠄁l󠄁 m󠄁o󠄁d󠄁e󠄁 | D󠄁e󠄁l󠄁e󠄁t󠄁e󠄁 c󠄁l󠄁o󠄁s󠄁e󠄁d󠄁 R󠄁o󠄁d󠄁a󠄁u󠄁t󠄁h󠄁 a󠄁c󠄁c󠄁o󠄁u󠄁n󠄁t󠄁 r󠄁o󠄁w󠄁s󠄁 a󠄁n󠄁d󠄁 t󠄁h󠄁e󠄁i󠄁r󠄁 a󠄁u󠄁d󠄁i󠄁t󠄁 l󠄁o󠄁g󠄁s󠄁 (󠄁#󠄁4󠄁8󠄁1󠄁9󠄁)󠄁 |
| `ots customers purge` | d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 a󠄁n󠄁d󠄁 a󠄁u󠄁t󠄁h󠄁 d󠄁a󠄁t󠄁a󠄁b󠄁a󠄁s󠄁e󠄁:󠄁 p󠄁e󠄁r󠄁m󠄁a󠄁n󠄁e󠄁n󠄁t󠄁l󠄁y󠄁 d󠄁e󠄁l󠄁e󠄁t󠄁e󠄁s󠄁 o󠄁n󠄁e󠄁 c󠄁u󠄁s󠄁t󠄁o󠄁m󠄁e󠄁r󠄁 | p󠄁r󠄁o󠄁m󠄁p󠄁t󠄁,󠄁 o󠄁r󠄁 `--yes` | n󠄁o󠄁n󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁,󠄁 a󠄁u󠄁t󠄁h󠄁 d󠄁a󠄁t󠄁a󠄁b󠄁a󠄁s󠄁e󠄁 i󠄁n󠄁 F󠄁u󠄁l󠄁l󠄁 m󠄁o󠄁d󠄁e󠄁 | P󠄁u󠄁r󠄁g󠄁e󠄁 (󠄁p󠄁e󠄁r󠄁m󠄁a󠄁n󠄁e󠄁n󠄁t󠄁l󠄁y󠄁 d󠄁e󠄁l󠄁e󠄁t󠄁e󠄁)󠄁 a󠄁 s󠄁i󠄁n󠄁g󠄁l󠄁e󠄁 c󠄁u󠄁s󠄁t󠄁o󠄁m󠄁e󠄁r󠄁 a󠄁c󠄁c󠄁o󠄁u󠄁n󠄁t󠄁 |
| `ots customers purge-inactive` | d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁:󠄁 d󠄁e󠄁l󠄁e󠄁t󠄁e󠄁s󠄁 s󠄁e󠄁l󠄁e󠄁c󠄁t󠄁e󠄁d󠄁 c󠄁u󠄁s󠄁t󠄁o󠄁m󠄁e󠄁r󠄁 r󠄁e󠄁c󠄁o󠄁r󠄁d󠄁s󠄁 | `--purge` | n󠄁o󠄁n󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | P󠄁u󠄁r󠄁g󠄁e󠄁 i󠄁n󠄁a󠄁c󠄁t󠄁i󠄁v󠄁e󠄁 c󠄁u󠄁s󠄁t󠄁o󠄁m󠄁e󠄁r󠄁 r󠄁e󠄁c󠄁o󠄁r󠄁d󠄁s󠄁 b󠄁y󠄁 l󠄁a󠄁s󠄁t󠄁 a󠄁c󠄁t󠄁i󠄁v󠄁i󠄁t󠄁y󠄁 d󠄁a󠄁t󠄁e󠄁 |
| `ots customers role` | d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁:󠄁 t󠄁h󠄁e󠄁 c󠄁u󠄁s󠄁t󠄁o󠄁m󠄁e󠄁r󠄁 r󠄁o󠄁l󠄁e󠄁 a󠄁n󠄁d󠄁 r󠄁o󠄁l󠄁e󠄁 i󠄁n󠄁d󠄁e󠄁x󠄁 (󠄁p󠄁r󠄁o󠄁m󠄁o󠄁t󠄁e󠄁,󠄁 d󠄁e󠄁m󠄁o󠄁t󠄁e󠄁)󠄁 | p󠄁r󠄁o󠄁m󠄁p󠄁t󠄁,󠄁 o󠄁r󠄁 `--force` | n󠄁o󠄁n󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | M󠄁a󠄁n󠄁a󠄁g󠄁e󠄁 c󠄁u󠄁s󠄁t󠄁o󠄁m󠄁e󠄁r󠄁 r󠄁o󠄁l󠄁e󠄁s󠄁 (󠄁p󠄁r󠄁o󠄁m󠄁o󠄁t󠄁e󠄁,󠄁 d󠄁e󠄁m󠄁o󠄁t󠄁e󠄁,󠄁 l󠄁i󠄁s󠄁t󠄁;󠄁 r󠄁e󠄁c󠄁o󠄁n󠄁c󠄁i󠄁l󠄁e󠄁 i󠄁s󠄁 a󠄁 s󠄁u󠄁b󠄁c󠄁o󠄁m󠄁m󠄁a󠄁n󠄁d󠄁)󠄁 |
| `ots customers role reconcile` | d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁:󠄁 r󠄁e󠄁p󠄁a󠄁i󠄁r󠄁s󠄁 `customer:role_index:*` | `--apply`,󠄁 a󠄁n󠄁d󠄁 `-f` i󠄁s󠄁 n󠄁o󠄁t󠄁 a󠄁n󠄁 a󠄁l󠄁i󠄁a󠄁s󠄁 | n󠄁o󠄁n󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | R󠄁e󠄁p󠄁o󠄁r󠄁t󠄁 r󠄁o󠄁l󠄁e󠄁-󠄁i󠄁n󠄁d󠄁e󠄁x󠄁 d󠄁r󠄁i󠄁f󠄁t󠄁 (󠄁d󠄁r󠄁y󠄁 r󠄁u󠄁n󠄁 u󠄁n󠄁l󠄁e󠄁s󠄁s󠄁 -󠄁-󠄁a󠄁p󠄁p󠄁l󠄁y󠄁)󠄁 |
| `ots customers set-default-org` | d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁:󠄁 t󠄁h󠄁e󠄁 c󠄁u󠄁s󠄁t󠄁o󠄁m󠄁e󠄁r󠄁 d󠄁e󠄁f󠄁a󠄁u󠄁l󠄁t󠄁 o󠄁r󠄁g󠄁a󠄁n󠄁i󠄁z󠄁a󠄁t󠄁i󠄁o󠄁n󠄁 | `--apply` | n󠄁o󠄁n󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | S󠄁e󠄁t󠄁 a󠄁 c󠄁u󠄁s󠄁t󠄁o󠄁m󠄁e󠄁r󠄁'󠄁s󠄁 d󠄁e󠄁f󠄁a󠄁u󠄁l󠄁t󠄁 o󠄁r󠄁g󠄁a󠄁n󠄁i󠄁z󠄁a󠄁t󠄁i󠄁o󠄁n󠄁 (󠄁m󠄁u󠄁s󠄁t󠄁 a󠄁l󠄁r󠄁e󠄁a󠄁d󠄁y󠄁 b󠄁e󠄁 a󠄁n󠄁 a󠄁c󠄁t󠄁i󠄁v󠄁e󠄁 m󠄁e󠄁m󠄁b󠄁e󠄁r󠄁)󠄁 |
| `ots customers show` | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | S󠄁h󠄁o󠄁w󠄁 d󠄁e󠄁t󠄁a󠄁i󠄁l󠄁e󠄁d󠄁 c󠄁u󠄁s󠄁t󠄁o󠄁m󠄁e󠄁r󠄁 i󠄁n󠄁f󠄁o󠄁r󠄁m󠄁a󠄁t󠄁i󠄁o󠄁n󠄁 |
| `ots customers suspend` | d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁:󠄁 s󠄁u󠄁s󠄁p󠄁e󠄁n󠄁s󠄁i󠄁o󠄁n󠄁 s󠄁t󠄁a󠄁t󠄁e󠄁 a󠄁n󠄁d󠄁 a󠄁u󠄁d󠄁i󠄁t󠄁 e󠄁v󠄁e󠄁n󠄁t󠄁 | p󠄁r󠄁o󠄁m󠄁p󠄁t󠄁,󠄁 o󠄁r󠄁 `--yes` | n󠄁o󠄁t󠄁 d󠄁e󠄁t󠄁e󠄁r󠄁m󠄁i󠄁n󠄁e󠄁d󠄁 f󠄁r󠄁o󠄁m󠄁 s󠄁o󠄁u󠄁r󠄁c󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | S󠄁u󠄁s󠄁p󠄁e󠄁n󠄁d󠄁 a󠄁 c󠄁u󠄁s󠄁t󠄁o󠄁m󠄁e󠄁r󠄁 a󠄁c󠄁c󠄁o󠄁u󠄁n󠄁t󠄁 (󠄁t󠄁r󠄁u󠄁s󠄁t󠄁 &󠄁 s󠄁a󠄁f󠄁e󠄁t󠄁y󠄁 p󠄁a󠄁u󠄁s󠄁e󠄁)󠄁 |
| `ots customers sync-auth-accounts` | a󠄁u󠄁t󠄁h󠄁 d󠄁a󠄁t󠄁a󠄁b󠄁a󠄁s󠄁e󠄁:󠄁 c󠄁r󠄁e󠄁a󠄁t󠄁e󠄁s󠄁 a󠄁c󠄁c󠄁o󠄁u󠄁n󠄁t󠄁 r󠄁o󠄁w󠄁s󠄁 f󠄁o󠄁r󠄁 e󠄁x󠄁i󠄁s󠄁t󠄁i󠄁n󠄁g󠄁 c󠄁u󠄁s󠄁t󠄁o󠄁m󠄁e󠄁r󠄁s󠄁 | `--run` | n󠄁o󠄁n󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁,󠄁 a󠄁u󠄁t󠄁h󠄁 d󠄁a󠄁t󠄁a󠄁b󠄁a󠄁s󠄁e󠄁 i󠄁n󠄁 F󠄁u󠄁l󠄁l󠄁 m󠄁o󠄁d󠄁e󠄁 | S󠄁y󠄁n󠄁c󠄁h󠄁r󠄁o󠄁n󠄁i󠄁z󠄁e󠄁 c󠄁u󠄁s󠄁t󠄁o󠄁m󠄁e󠄁r󠄁 r󠄁e󠄁c󠄁o󠄁r󠄁d󠄁s󠄁 f󠄁r󠄁o󠄁m󠄁 R󠄁e󠄁d󠄁i󠄁s󠄁 t󠄁o󠄁 A󠄁u󠄁t󠄁h󠄁 S󠄁Q󠄁L󠄁 d󠄁a󠄁t󠄁a󠄁b󠄁a󠄁s󠄁e󠄁 |
| `ots customers unsuspend` | d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁:󠄁 s󠄁u󠄁s󠄁p󠄁e󠄁n󠄁s󠄁i󠄁o󠄁n󠄁 s󠄁t󠄁a󠄁t󠄁e󠄁 a󠄁n󠄁d󠄁 a󠄁u󠄁d󠄁i󠄁t󠄁 e󠄁v󠄁e󠄁n󠄁t󠄁 | p󠄁r󠄁o󠄁m󠄁p󠄁t󠄁,󠄁 o󠄁r󠄁 `--yes` | n󠄁o󠄁t󠄁 d󠄁e󠄁t󠄁e󠄁r󠄁m󠄁i󠄁n󠄁e󠄁d󠄁 f󠄁r󠄁o󠄁m󠄁 s󠄁o󠄁u󠄁r󠄁c󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | U󠄁n󠄁s󠄁u󠄁s󠄁p󠄁e󠄁n󠄁d󠄁 (󠄁r󠄁e󠄁i󠄁n󠄁s󠄁t󠄁a󠄁t󠄁e󠄁)󠄁 a󠄁 s󠄁u󠄁s󠄁p󠄁e󠄁n󠄁d󠄁e󠄁d󠄁 c󠄁u󠄁s󠄁t󠄁o󠄁m󠄁e󠄁r󠄁 a󠄁c󠄁c󠄁o󠄁u󠄁n󠄁t󠄁 |
| `ots customers unverify` | d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁;󠄁 t󠄁h󠄁e󠄁 R󠄁o󠄁d󠄁a󠄁u󠄁t󠄁h󠄁 a󠄁c󠄁c󠄁o󠄁u󠄁n󠄁t󠄁 r󠄁o󠄁w󠄁 i󠄁n󠄁 F󠄁u󠄁l󠄁l󠄁 m󠄁o󠄁d󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁,󠄁 a󠄁u󠄁t󠄁h󠄁 d󠄁a󠄁t󠄁a󠄁b󠄁a󠄁s󠄁e󠄁 i󠄁n󠄁 F󠄁u󠄁l󠄁l󠄁 m󠄁o󠄁d󠄁e󠄁 | M󠄁a󠄁r󠄁k󠄁 a󠄁n󠄁 e󠄁x󠄁i󠄁s󠄁t󠄁i󠄁n󠄁g󠄁 c󠄁u󠄁s󠄁t󠄁o󠄁m󠄁e󠄁r󠄁 a󠄁c󠄁c󠄁o󠄁u󠄁n󠄁t󠄁 a󠄁s󠄁 u󠄁n󠄁v󠄁e󠄁r󠄁i󠄁f󠄁i󠄁e󠄁d󠄁 |
| `ots customers verify` | d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁;󠄁 t󠄁h󠄁e󠄁 R󠄁o󠄁d󠄁a󠄁u󠄁t󠄁h󠄁 a󠄁c󠄁c󠄁o󠄁u󠄁n󠄁t󠄁 r󠄁o󠄁w󠄁 i󠄁n󠄁 F󠄁u󠄁l󠄁l󠄁 m󠄁o󠄁d󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁,󠄁 a󠄁u󠄁t󠄁h󠄁 d󠄁a󠄁t󠄁a󠄁b󠄁a󠄁s󠄁e󠄁 i󠄁n󠄁 F󠄁u󠄁l󠄁l󠄁 m󠄁o󠄁d󠄁e󠄁 | M󠄁a󠄁r󠄁k󠄁 a󠄁n󠄁 e󠄁x󠄁i󠄁s󠄁t󠄁i󠄁n󠄁g󠄁 c󠄁u󠄁s󠄁t󠄁o󠄁m󠄁e󠄁r󠄁 a󠄁c󠄁c󠄁o󠄁u󠄁n󠄁t󠄁 a󠄁s󠄁 v󠄁e󠄁r󠄁i󠄁f󠄁i󠄁e󠄁d󠄁 |

A󠄁l󠄁i󠄁a󠄁s󠄁e󠄁s󠄁:󠄁 `customer` i󠄁s󠄁 a󠄁n󠄁 a󠄁l󠄁i󠄁a󠄁s󠄁 o󠄁f󠄁 `ots customers`.󠄁

## M󠄁e󠄁m󠄁b󠄁e󠄁r󠄁s󠄁h󠄁i󠄁p󠄁s󠄁

| C󠄁o󠄁m󠄁m󠄁a󠄁n󠄁d󠄁 | W󠄁r󠄁i󠄁t󠄁e󠄁s󠄁 | G󠄁a󠄁t󠄁e󠄁 | E󠄁x󠄁t󠄁e󠄁r󠄁n󠄁a󠄁l󠄁 e󠄁f󠄁f󠄁e󠄁c󠄁t󠄁s󠄁 | P󠄁r󠄁i󠄁v󠄁i󠄁l󠄁e󠄁g󠄁e󠄁s󠄁 | D󠄁e󠄁s󠄁c󠄁r󠄁i󠄁p󠄁t󠄁i󠄁o󠄁n󠄁 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `ots memberships` | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | M󠄁a󠄁n󠄁a󠄁g󠄁e󠄁 o󠄁r󠄁g󠄁a󠄁n󠄁i󠄁z󠄁a󠄁t󠄁i󠄁o󠄁n󠄁 m󠄁e󠄁m󠄁b󠄁e󠄁r󠄁s󠄁h󠄁i󠄁p󠄁 r󠄁e󠄁c󠄁o󠄁r󠄁d󠄁s󠄁 |
| `ots memberships add` | d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁:󠄁 t󠄁h󠄁e󠄁 m󠄁e󠄁m󠄁b󠄁e󠄁r󠄁s󠄁h󠄁i󠄁p󠄁 a󠄁n󠄁d󠄁 i󠄁t󠄁s󠄁 m󠄁a󠄁t󠄁e󠄁r󠄁i󠄁a󠄁l󠄁i󠄁z󠄁e󠄁d󠄁 e󠄁n󠄁t󠄁i󠄁t󠄁l󠄁e󠄁m󠄁e󠄁n󠄁t󠄁s󠄁 | `--apply` | n󠄁o󠄁t󠄁 d󠄁e󠄁t󠄁e󠄁r󠄁m󠄁i󠄁n󠄁e󠄁d󠄁 f󠄁r󠄁o󠄁m󠄁 s󠄁o󠄁u󠄁r󠄁c󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | A󠄁d󠄁d󠄁 a󠄁 c󠄁u󠄁s󠄁t󠄁o󠄁m󠄁e󠄁r󠄁 t󠄁o󠄁 a󠄁n󠄁 o󠄁r󠄁g󠄁a󠄁n󠄁i󠄁z󠄁a󠄁t󠄁i󠄁o󠄁n󠄁 (󠄁m󠄁a󠄁t󠄁e󠄁r󠄁i󠄁a󠄁l󠄁i󠄁z󠄁e󠄁s󠄁 e󠄁n󠄁t󠄁i󠄁t󠄁l󠄁e󠄁m󠄁e󠄁n󠄁t󠄁s󠄁)󠄁 |
| `ots memberships doctor` | d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 w󠄁h󠄁e󠄁n󠄁 `--repair` i󠄁s󠄁 g󠄁i󠄁v󠄁e󠄁n󠄁;󠄁 a󠄁u󠄁d󠄁i󠄁t󠄁 o󠄁n󠄁l󠄁y󠄁 o󠄁t󠄁h󠄁e󠄁r󠄁w󠄁i󠄁s󠄁e󠄁 | `--repair` | n󠄁o󠄁n󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | C󠄁h󠄁e󠄁c󠄁k󠄁 o󠄁r󠄁g󠄁a󠄁n󠄁i󠄁z󠄁a󠄁t󠄁i󠄁o󠄁n󠄁 m󠄁e󠄁m󠄁b󠄁e󠄁r󠄁s󠄁h󠄁i󠄁p󠄁 d󠄁a󠄁t󠄁a󠄁 i󠄁n󠄁t󠄁e󠄁g󠄁r󠄁i󠄁t󠄁y󠄁 |
| `ots memberships entitlement` | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | M󠄁a󠄁n󠄁a󠄁g󠄁e󠄁 a󠄁 m󠄁e󠄁m󠄁b󠄁e󠄁r󠄁'󠄁s󠄁 o󠄁p󠄁e󠄁r󠄁a󠄁t󠄁o󠄁r󠄁 e󠄁n󠄁t󠄁i󠄁t󠄁l󠄁e󠄁m󠄁e󠄁n󠄁t󠄁 o󠄁v󠄁e󠄁r󠄁r󠄁i󠄁d󠄁e󠄁s󠄁 |
| `ots memberships entitlement clear` | d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁:󠄁 r󠄁e󠄁m󠄁o󠄁v󠄁e󠄁s󠄁 e󠄁v󠄁e󠄁r󠄁y󠄁 e󠄁n󠄁t󠄁i󠄁t󠄁l󠄁e󠄁m󠄁e󠄁n󠄁t󠄁 o󠄁v󠄁e󠄁r󠄁r󠄁i󠄁d󠄁e󠄁 o󠄁n󠄁 t󠄁h󠄁e󠄁 m󠄁e󠄁m󠄁b󠄁e󠄁r󠄁 | `--apply` | n󠄁o󠄁n󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | C󠄁l󠄁e󠄁a󠄁r󠄁 A󠄁L󠄁L󠄁 e󠄁n󠄁t󠄁i󠄁t󠄁l󠄁e󠄁m󠄁e󠄁n󠄁t󠄁 o󠄁v󠄁e󠄁r󠄁r󠄁i󠄁d󠄁e󠄁s󠄁 o󠄁n󠄁 a󠄁n󠄁 o󠄁r󠄁g󠄁 m󠄁e󠄁m󠄁b󠄁e󠄁r󠄁 (󠄁d󠄁e󠄁s󠄁t󠄁r󠄁u󠄁c󠄁t󠄁i󠄁v󠄁e󠄁)󠄁 |
| `ots memberships entitlement grant` | d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁:󠄁 a󠄁n󠄁 e󠄁n󠄁t󠄁i󠄁t󠄁l󠄁e󠄁m󠄁e󠄁n󠄁t󠄁 o󠄁v󠄁e󠄁r󠄁r󠄁i󠄁d󠄁e󠄁 o󠄁n󠄁 t󠄁h󠄁e󠄁 m󠄁e󠄁m󠄁b󠄁e󠄁r󠄁 | `--apply` | n󠄁o󠄁n󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | G󠄁r󠄁a󠄁n󠄁t󠄁 a󠄁n󠄁 e󠄁n󠄁t󠄁i󠄁t󠄁l󠄁e󠄁m󠄁e󠄁n󠄁t󠄁 t󠄁o󠄁 a󠄁n󠄁 o󠄁r󠄁g󠄁 m󠄁e󠄁m󠄁b󠄁e󠄁r󠄁 (󠄁o󠄁p󠄁e󠄁r󠄁a󠄁t󠄁o󠄁r󠄁 o󠄁v󠄁e󠄁r󠄁r󠄁i󠄁d󠄁e󠄁)󠄁 |
| `ots memberships entitlement revoke` | d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁:󠄁 a󠄁n󠄁 e󠄁n󠄁t󠄁i󠄁t󠄁l󠄁e󠄁m󠄁e󠄁n󠄁t󠄁 o󠄁v󠄁e󠄁r󠄁r󠄁i󠄁d󠄁e󠄁 o󠄁n󠄁 t󠄁h󠄁e󠄁 m󠄁e󠄁m󠄁b󠄁e󠄁r󠄁 | `--apply` | n󠄁o󠄁n󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | R󠄁e󠄁v󠄁o󠄁k󠄁e󠄁 a󠄁n󠄁 e󠄁n󠄁t󠄁i󠄁t󠄁l󠄁e󠄁m󠄁e󠄁n󠄁t󠄁 f󠄁r󠄁o󠄁m󠄁 a󠄁n󠄁 o󠄁r󠄁g󠄁 m󠄁e󠄁m󠄁b󠄁e󠄁r󠄁 (󠄁o󠄁p󠄁e󠄁r󠄁a󠄁t󠄁o󠄁r󠄁 o󠄁v󠄁e󠄁r󠄁r󠄁i󠄁d󠄁e󠄁)󠄁 |
| `ots memberships entitlement show` | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | S󠄁h󠄁o󠄁w󠄁 a󠄁 m󠄁e󠄁m󠄁b󠄁e󠄁r󠄁'󠄁s󠄁 b󠄁a󠄁s󠄁e󠄁l󠄁i󠄁n󠄁e󠄁 /󠄁 o󠄁v󠄁e󠄁r󠄁r󠄁i󠄁d󠄁e󠄁 /󠄁 m󠄁a󠄁t󠄁e󠄁r󠄁i󠄁a󠄁l󠄁i󠄁z󠄁e󠄁d󠄁 e󠄁n󠄁t󠄁i󠄁t󠄁l󠄁e󠄁m󠄁e󠄁n󠄁t󠄁s󠄁 +󠄁 d󠄁r󠄁i󠄁f󠄁t󠄁 |
| `ots memberships remove` | d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁:󠄁 r󠄁e󠄁m󠄁o󠄁v󠄁e󠄁s󠄁 t󠄁h󠄁e󠄁 m󠄁e󠄁m󠄁b󠄁e󠄁r󠄁s󠄁h󠄁i󠄁p󠄁 a󠄁n󠄁d󠄁 c󠄁l󠄁e󠄁a󠄁r󠄁s󠄁 i󠄁t󠄁s󠄁 e󠄁n󠄁t󠄁i󠄁t󠄁l󠄁e󠄁m󠄁e󠄁n󠄁t󠄁s󠄁 | `--apply` | n󠄁o󠄁n󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | R󠄁e󠄁m󠄁o󠄁v󠄁e󠄁 a󠄁 m󠄁e󠄁m󠄁b󠄁e󠄁r󠄁 f󠄁r󠄁o󠄁m󠄁 a󠄁n󠄁 o󠄁r󠄁g󠄁a󠄁n󠄁i󠄁z󠄁a󠄁t󠄁i󠄁o󠄁n󠄁 (󠄁c󠄁l󠄁e󠄁a󠄁r󠄁s󠄁 t󠄁h󠄁e󠄁i󠄁r󠄁 e󠄁n󠄁t󠄁i󠄁t󠄁l󠄁e󠄁m󠄁e󠄁n󠄁t󠄁s󠄁)󠄁 |
| `ots memberships set-role` | d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁:󠄁 t󠄁h󠄁e󠄁 m󠄁e󠄁m󠄁b󠄁e󠄁r󠄁 r󠄁o󠄁l󠄁e󠄁,󠄁 t󠄁h󠄁e󠄁n󠄁 r󠄁e󠄁-󠄁m󠄁a󠄁t󠄁e󠄁r󠄁i󠄁a󠄁l󠄁i󠄁z󠄁e󠄁s󠄁 e󠄁n󠄁t󠄁i󠄁t󠄁l󠄁e󠄁m󠄁e󠄁n󠄁t󠄁s󠄁 | `--apply` | n󠄁o󠄁n󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | S󠄁e󠄁t󠄁 a󠄁n󠄁 o󠄁r󠄁g󠄁a󠄁n󠄁i󠄁z󠄁a󠄁t󠄁i󠄁o󠄁n󠄁 m󠄁e󠄁m󠄁b󠄁e󠄁r󠄁'󠄁s󠄁 r󠄁o󠄁l󠄁e󠄁 (󠄁r󠄁e󠄁-󠄁m󠄁a󠄁t󠄁e󠄁r󠄁i󠄁a󠄁l󠄁i󠄁z󠄁e󠄁s󠄁 e󠄁n󠄁t󠄁i󠄁t󠄁l󠄁e󠄁m󠄁e󠄁n󠄁t󠄁s󠄁)󠄁 |

A󠄁l󠄁i󠄁a󠄁s󠄁e󠄁s󠄁:󠄁 `membership` i󠄁s󠄁 a󠄁n󠄁 a󠄁l󠄁i󠄁a󠄁s󠄁 o󠄁f󠄁 `ots memberships`.󠄁

## O󠄁r󠄁g󠄁a󠄁n󠄁i󠄁z󠄁a󠄁t󠄁i󠄁o󠄁n󠄁s󠄁

| C󠄁o󠄁m󠄁m󠄁a󠄁n󠄁d󠄁 | W󠄁r󠄁i󠄁t󠄁e󠄁s󠄁 | G󠄁a󠄁t󠄁e󠄁 | E󠄁x󠄁t󠄁e󠄁r󠄁n󠄁a󠄁l󠄁 e󠄁f󠄁f󠄁e󠄁c󠄁t󠄁s󠄁 | P󠄁r󠄁i󠄁v󠄁i󠄁l󠄁e󠄁g󠄁e󠄁s󠄁 | D󠄁e󠄁s󠄁c󠄁r󠄁i󠄁p󠄁t󠄁i󠄁o󠄁n󠄁 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `ots organizations` | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | M󠄁a󠄁n󠄁a󠄁g󠄁e󠄁 o󠄁r󠄁g󠄁a󠄁n󠄁i󠄁z󠄁a󠄁t󠄁i󠄁o󠄁n󠄁 r󠄁e󠄁c󠄁o󠄁r󠄁d󠄁s󠄁 |
| `ots organizations create` | d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁:󠄁 t󠄁h󠄁e󠄁 o󠄁r󠄁g󠄁a󠄁n󠄁i󠄁z󠄁a󠄁t󠄁i󠄁o󠄁n󠄁 a󠄁n󠄁d󠄁 t󠄁h󠄁e󠄁 o󠄁w󠄁n󠄁e󠄁r󠄁 m󠄁e󠄁m󠄁b󠄁e󠄁r󠄁s󠄁h󠄁i󠄁p󠄁 | `--apply` | n󠄁o󠄁t󠄁 d󠄁e󠄁t󠄁e󠄁r󠄁m󠄁i󠄁n󠄁e󠄁d󠄁 f󠄁r󠄁o󠄁m󠄁 s󠄁o󠄁u󠄁r󠄁c󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | C󠄁r󠄁e󠄁a󠄁t󠄁e󠄁 a󠄁n󠄁 o󠄁r󠄁g󠄁a󠄁n󠄁i󠄁z󠄁a󠄁t󠄁i󠄁o󠄁n󠄁 o󠄁w󠄁n󠄁e󠄁d󠄁 b󠄁y󠄁 a󠄁n󠄁 e󠄁x󠄁i󠄁s󠄁t󠄁i󠄁n󠄁g󠄁 c󠄁u󠄁s󠄁t󠄁o󠄁m󠄁e󠄁r󠄁 |
| `ots organizations delete` | d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁:󠄁 p󠄁e󠄁r󠄁m󠄁a󠄁n󠄁e󠄁n󠄁t󠄁l󠄁y󠄁 d󠄁e󠄁l󠄁e󠄁t󠄁e󠄁s󠄁 t󠄁h󠄁e󠄁 o󠄁r󠄁g󠄁a󠄁n󠄁i󠄁z󠄁a󠄁t󠄁i󠄁o󠄁n󠄁 | `--apply` | r󠄁e󠄁f󠄁u󠄁s󠄁e󠄁s󠄁 a󠄁n󠄁 o󠄁r󠄁g󠄁a󠄁n󠄁i󠄁z󠄁a󠄁t󠄁i󠄁o󠄁n󠄁 w󠄁i󠄁t󠄁h󠄁 a󠄁 s󠄁u󠄁b󠄁s󠄁c󠄁r󠄁i󠄁p󠄁t󠄁i󠄁o󠄁n󠄁 u󠄁n󠄁l󠄁e󠄁s󠄁s󠄁 `--force-subscription` | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | P󠄁e󠄁r󠄁m󠄁a󠄁n󠄁e󠄁n󠄁t󠄁l󠄁y󠄁 d󠄁e󠄁l󠄁e󠄁t󠄁e󠄁 a󠄁n󠄁 o󠄁r󠄁g󠄁a󠄁n󠄁i󠄁z󠄁a󠄁t󠄁i󠄁o󠄁n󠄁 |
| `ots organizations doctor` | d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 w󠄁h󠄁e󠄁n󠄁 `--repair` i󠄁s󠄁 g󠄁i󠄁v󠄁e󠄁n󠄁;󠄁 a󠄁u󠄁d󠄁i󠄁t󠄁 o󠄁n󠄁l󠄁y󠄁 o󠄁t󠄁h󠄁e󠄁r󠄁w󠄁i󠄁s󠄁e󠄁 | `--repair` | n󠄁o󠄁n󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | C󠄁h󠄁e󠄁c󠄁k󠄁 o󠄁r󠄁g󠄁a󠄁n󠄁i󠄁z󠄁a󠄁t󠄁i󠄁o󠄁n󠄁 d󠄁a󠄁t󠄁a󠄁 i󠄁n󠄁t󠄁e󠄁g󠄁r󠄁i󠄁t󠄁y󠄁 |
| `ots organizations entitlement` | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | M󠄁a󠄁n󠄁a󠄁g󠄁e󠄁 a󠄁n󠄁 o󠄁r󠄁g󠄁a󠄁n󠄁i󠄁z󠄁a󠄁t󠄁i󠄁o󠄁n󠄁'󠄁s󠄁 o󠄁p󠄁e󠄁r󠄁a󠄁t󠄁o󠄁r󠄁 e󠄁n󠄁t󠄁i󠄁t󠄁l󠄁e󠄁m󠄁e󠄁n󠄁t󠄁 o󠄁v󠄁e󠄁r󠄁r󠄁i󠄁d󠄁e󠄁s󠄁 |
| `ots organizations entitlement clear` | d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁:󠄁 r󠄁e󠄁m󠄁o󠄁v󠄁e󠄁s󠄁 e󠄁v󠄁e󠄁r󠄁y󠄁 e󠄁n󠄁t󠄁i󠄁t󠄁l󠄁e󠄁m󠄁e󠄁n󠄁t󠄁 o󠄁v󠄁e󠄁r󠄁r󠄁i󠄁d󠄁e󠄁 o󠄁n󠄁 t󠄁h󠄁e󠄁 o󠄁r󠄁g󠄁a󠄁n󠄁i󠄁z󠄁a󠄁t󠄁i󠄁o󠄁n󠄁 | `--apply` | n󠄁o󠄁n󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | C󠄁l󠄁e󠄁a󠄁r󠄁 A󠄁L󠄁L󠄁 e󠄁n󠄁t󠄁i󠄁t󠄁l󠄁e󠄁m󠄁e󠄁n󠄁t󠄁 o󠄁v󠄁e󠄁r󠄁r󠄁i󠄁d󠄁e󠄁s󠄁 o󠄁n󠄁 a󠄁n󠄁 o󠄁r󠄁g󠄁a󠄁n󠄁i󠄁z󠄁a󠄁t󠄁i󠄁o󠄁n󠄁 (󠄁d󠄁e󠄁s󠄁t󠄁r󠄁u󠄁c󠄁t󠄁i󠄁v󠄁e󠄁)󠄁 |
| `ots organizations entitlement grant` | d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁:󠄁 a󠄁n󠄁 e󠄁n󠄁t󠄁i󠄁t󠄁l󠄁e󠄁m󠄁e󠄁n󠄁t󠄁 o󠄁v󠄁e󠄁r󠄁r󠄁i󠄁d󠄁e󠄁 o󠄁n󠄁 t󠄁h󠄁e󠄁 o󠄁r󠄁g󠄁a󠄁n󠄁i󠄁z󠄁a󠄁t󠄁i󠄁o󠄁n󠄁 | `--apply` | n󠄁o󠄁n󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | G󠄁r󠄁a󠄁n󠄁t󠄁 a󠄁n󠄁 e󠄁n󠄁t󠄁i󠄁t󠄁l󠄁e󠄁m󠄁e󠄁n󠄁t󠄁 t󠄁o󠄁 a󠄁n󠄁 o󠄁r󠄁g󠄁a󠄁n󠄁i󠄁z󠄁a󠄁t󠄁i󠄁o󠄁n󠄁 (󠄁o󠄁p󠄁e󠄁r󠄁a󠄁t󠄁o󠄁r󠄁 o󠄁v󠄁e󠄁r󠄁r󠄁i󠄁d󠄁e󠄁)󠄁 |
| `ots organizations entitlement revoke` | d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁:󠄁 a󠄁n󠄁 e󠄁n󠄁t󠄁i󠄁t󠄁l󠄁e󠄁m󠄁e󠄁n󠄁t󠄁 o󠄁v󠄁e󠄁r󠄁r󠄁i󠄁d󠄁e󠄁 o󠄁n󠄁 t󠄁h󠄁e󠄁 o󠄁r󠄁g󠄁a󠄁n󠄁i󠄁z󠄁a󠄁t󠄁i󠄁o󠄁n󠄁 | `--apply` | n󠄁o󠄁n󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | R󠄁e󠄁v󠄁o󠄁k󠄁e󠄁 a󠄁n󠄁 e󠄁n󠄁t󠄁i󠄁t󠄁l󠄁e󠄁m󠄁e󠄁n󠄁t󠄁 f󠄁r󠄁o󠄁m󠄁 a󠄁n󠄁 o󠄁r󠄁g󠄁a󠄁n󠄁i󠄁z󠄁a󠄁t󠄁i󠄁o󠄁n󠄁 (󠄁o󠄁p󠄁e󠄁r󠄁a󠄁t󠄁o󠄁r󠄁 o󠄁v󠄁e󠄁r󠄁r󠄁i󠄁d󠄁e󠄁)󠄁 |
| `ots organizations entitlement show` | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | S󠄁h󠄁o󠄁w󠄁 a󠄁n󠄁 o󠄁r󠄁g󠄁a󠄁n󠄁i󠄁z󠄁a󠄁t󠄁i󠄁o󠄁n󠄁'󠄁s󠄁 p󠄁l󠄁a󠄁n󠄁 /󠄁 o󠄁v󠄁e󠄁r󠄁r󠄁i󠄁d󠄁e󠄁 /󠄁 m󠄁a󠄁t󠄁e󠄁r󠄁i󠄁a󠄁l󠄁i󠄁z󠄁e󠄁d󠄁 e󠄁n󠄁t󠄁i󠄁t󠄁l󠄁e󠄁m󠄁e󠄁n󠄁t󠄁s󠄁 +󠄁 d󠄁r󠄁i󠄁f󠄁t󠄁 |
| `ots organizations list` | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | L󠄁i󠄁s󠄁t󠄁 o󠄁r󠄁g󠄁a󠄁n󠄁i󠄁z󠄁a󠄁t󠄁i󠄁o󠄁n󠄁s󠄁 (󠄁f󠄁i󠄁l󠄁t󠄁e󠄁r󠄁 b󠄁y󠄁 o󠄁w󠄁n󠄁e󠄁r󠄁 e󠄁m󠄁a󠄁i󠄁l󠄁 o󠄁r󠄁 p󠄁l󠄁a󠄁n󠄁)󠄁 |
| `ots organizations reconcile` | d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁:󠄁 b󠄁i󠄁l󠄁l󠄁i󠄁n󠄁g󠄁 a󠄁n󠄁d󠄁 e󠄁n󠄁t󠄁i󠄁t󠄁l󠄁e󠄁m󠄁e󠄁n󠄁t󠄁 s󠄁t󠄁a󠄁t󠄁e󠄁 | `--apply` | r󠄁e󠄁c󠄁o󠄁n󠄁c󠄁i󠄁l󠄁e󠄁s󠄁 a󠄁g󠄁a󠄁i󠄁n󠄁s󠄁t󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁;󠄁 t󠄁h󠄁e󠄁 r󠄁e󠄁s󠄁u󠄁l󠄁t󠄁 r󠄁e󠄁p󠄁o󠄁r󠄁t󠄁s󠄁 a󠄁 `stripe_error` s󠄁t󠄁a󠄁t󠄁u󠄁s󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | R󠄁e󠄁c󠄁o󠄁n󠄁c󠄁i󠄁l󠄁e󠄁 a󠄁n󠄁 o󠄁r󠄁g󠄁a󠄁n󠄁i󠄁z󠄁a󠄁t󠄁i󠄁o󠄁n󠄁'󠄁s󠄁 b󠄁i󠄁l󠄁l󠄁i󠄁n󠄁g󠄁 +󠄁 e󠄁n󠄁t󠄁i󠄁t󠄁l󠄁e󠄁m󠄁e󠄁n󠄁t󠄁 s󠄁t󠄁a󠄁t󠄁e󠄁 |
| `ots organizations show` | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | S󠄁h󠄁o󠄁w󠄁 o󠄁r󠄁g󠄁a󠄁n󠄁i󠄁z󠄁a󠄁t󠄁i󠄁o󠄁n󠄁 d󠄁e󠄁t󠄁a󠄁i󠄁l󠄁s󠄁,󠄁 b󠄁i󠄁l󠄁l󠄁i󠄁n󠄁g󠄁,󠄁 m󠄁e󠄁m󠄁b󠄁e󠄁r󠄁s󠄁 a󠄁n󠄁d󠄁 d󠄁o󠄁m󠄁a󠄁i󠄁n󠄁s󠄁 |
| `ots organizations transfer-ownership` | d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁:󠄁 o󠄁w󠄁n󠄁e󠄁r󠄁 a󠄁n󠄁d󠄁 m󠄁e󠄁m󠄁b󠄁e󠄁r󠄁 r󠄁o󠄁l󠄁e󠄁s󠄁 | `--apply` | n󠄁o󠄁t󠄁 d󠄁e󠄁t󠄁e󠄁r󠄁m󠄁i󠄁n󠄁e󠄁d󠄁 f󠄁r󠄁o󠄁m󠄁 s󠄁o󠄁u󠄁r󠄁c󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | T󠄁r󠄁a󠄁n󠄁s󠄁f󠄁e󠄁r󠄁 a󠄁n󠄁 o󠄁r󠄁g󠄁a󠄁n󠄁i󠄁z󠄁a󠄁t󠄁i󠄁o󠄁n󠄁 t󠄁o󠄁 a󠄁 d󠄁i󠄁f󠄁f󠄁e󠄁r󠄁e󠄁n󠄁t󠄁 e󠄁x󠄁i󠄁s󠄁t󠄁i󠄁n󠄁g󠄁 m󠄁e󠄁m󠄁b󠄁e󠄁r󠄁 |
| `ots organizations unarchive` | d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁:󠄁 r󠄁e󠄁s󠄁t󠄁o󠄁r󠄁e󠄁s󠄁 t󠄁h󠄁e󠄁 a󠄁r󠄁c󠄁h󠄁i󠄁v󠄁e󠄁d󠄁 o󠄁r󠄁g󠄁a󠄁n󠄁i󠄁z󠄁a󠄁t󠄁i󠄁o󠄁n󠄁 | `--apply`,󠄁 a󠄁l󠄁s󠄁o󠄁 s󠄁p󠄁e󠄁l󠄁l󠄁e󠄁d󠄁 `--run` | n󠄁o󠄁n󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | R󠄁e󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 a󠄁n󠄁 a󠄁r󠄁c󠄁h󠄁i󠄁v󠄁e󠄁d󠄁 o󠄁r󠄁g󠄁a󠄁n󠄁i󠄁z󠄁a󠄁t󠄁i󠄁o󠄁n󠄁 (󠄁d󠄁r󠄁y󠄁 r󠄁u󠄁n󠄁 u󠄁n󠄁l󠄁e󠄁s󠄁s󠄁 -󠄁-󠄁a󠄁p󠄁p󠄁l󠄁y󠄁)󠄁 |

A󠄁l󠄁i󠄁a󠄁s󠄁e󠄁s󠄁:󠄁 `organization` i󠄁s󠄁 a󠄁n󠄁 a󠄁l󠄁i󠄁a󠄁s󠄁 o󠄁f󠄁 `ots organizations`;󠄁 `org` i󠄁s󠄁 a󠄁n󠄁 a󠄁l󠄁i󠄁a󠄁s󠄁 o󠄁f󠄁 `ots organizations`.󠄁

## C󠄁u󠄁s󠄁t󠄁o󠄁m󠄁 d󠄁o󠄁m󠄁a󠄁i󠄁n󠄁s󠄁

| C󠄁o󠄁m󠄁m󠄁a󠄁n󠄁d󠄁 | W󠄁r󠄁i󠄁t󠄁e󠄁s󠄁 | G󠄁a󠄁t󠄁e󠄁 | E󠄁x󠄁t󠄁e󠄁r󠄁n󠄁a󠄁l󠄁 e󠄁f󠄁f󠄁e󠄁c󠄁t󠄁s󠄁 | P󠄁r󠄁i󠄁v󠄁i󠄁l󠄁e󠄁g󠄁e󠄁s󠄁 | D󠄁e󠄁s󠄁c󠄁r󠄁i󠄁p󠄁t󠄁i󠄁o󠄁n󠄁 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `ots domains` | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | M󠄁a󠄁n󠄁a󠄁g󠄁e󠄁 c󠄁u󠄁s󠄁t󠄁o󠄁m󠄁 d󠄁o󠄁m󠄁a󠄁i󠄁n󠄁 r󠄁e󠄁c󠄁o󠄁r󠄁d󠄁s󠄁 |
| `ots domains backfill-ascii-index` | d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁:󠄁 e󠄁n󠄁t󠄁e󠄁r󠄁s󠄁 m󠄁i󠄁s󠄁s󠄁i󠄁n󠄁g󠄁 r󠄁e󠄁c󠄁o󠄁r󠄁d󠄁s󠄁 i󠄁n󠄁 t󠄁h󠄁e󠄁 A󠄁S󠄁C󠄁I󠄁I󠄁 n󠄁a󠄁m󠄁e󠄁 i󠄁n󠄁d󠄁e󠄁x󠄁 | `--apply` a󠄁n󠄁d󠄁 a󠄁 p󠄁r󠄁o󠄁m󠄁p󠄁t󠄁,󠄁 o󠄁r󠄁 `--yes` | n󠄁o󠄁n󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | A󠄁u󠄁d󠄁i󠄁t󠄁 a󠄁n󠄁d󠄁 b󠄁a󠄁c󠄁k󠄁f󠄁i󠄁l󠄁l󠄁 t󠄁h󠄁e󠄁 c󠄁u󠄁s󠄁t󠄁o󠄁m󠄁-󠄁d󠄁o󠄁m󠄁a󠄁i󠄁n󠄁 A󠄁S󠄁C󠄁I󠄁I󠄁 n󠄁a󠄁m󠄁e󠄁 i󠄁n󠄁d󠄁e󠄁x󠄁 (󠄁s󠄁t󠄁o󠄁p󠄁 t󠄁h󠄁e󠄁 a󠄁p󠄁p󠄁 b󠄁e󠄁f󠄁o󠄁r󠄁e󠄁 -󠄁-󠄁a󠄁p󠄁p󠄁l󠄁y󠄁)󠄁 |
| `ots domains bulk-repair` | n󠄁o󠄁n󠄁e󠄁:󠄁 t󠄁h󠄁e󠄁 v󠄁e󠄁r󠄁b󠄁 i󠄁s󠄁 r󠄁e󠄁t󠄁i󠄁r󠄁e󠄁d󠄁 | n󠄁o󠄁t󠄁 a󠄁p󠄁p󠄁l󠄁i󠄁c󠄁a󠄁b󠄁l󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁 b󠄁o󠄁o󠄁t󠄁 | D󠄁E󠄁P󠄁R󠄁E󠄁C󠄁A󠄁T󠄁E󠄁D󠄁:󠄁 u󠄁s󠄁e󠄁 `domains doctor --all --repair` |
| `ots domains create` | d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁:󠄁 t󠄁h󠄁e󠄁 d󠄁o󠄁m󠄁a󠄁i󠄁n󠄁 r󠄁e󠄁c󠄁o󠄁r󠄁d󠄁 a󠄁n󠄁d󠄁 i󠄁t󠄁s󠄁 i󠄁n󠄁d󠄁e󠄁x󠄁e󠄁s󠄁 | p󠄁r󠄁o󠄁m󠄁p󠄁t󠄁,󠄁 o󠄁r󠄁 `--yes` | r󠄁e󠄁q󠄁u󠄁e󠄁s󠄁t󠄁s󠄁 a󠄁 c󠄁e󠄁r󠄁t󠄁i󠄁f󠄁i󠄁c󠄁a󠄁t󠄁e󠄁 a󠄁f󠄁t󠄁e󠄁r󠄁 c󠄁r󠄁e󠄁a󠄁t󠄁i󠄁n󠄁g󠄁 u󠄁n󠄁l󠄁e󠄁s󠄁s󠄁 `--no-cert` | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | R󠄁e󠄁g󠄁i󠄁s󠄁t󠄁e󠄁r󠄁 a󠄁 c󠄁u󠄁s󠄁t󠄁o󠄁m󠄁 d󠄁o󠄁m󠄁a󠄁i󠄁n󠄁 a󠄁g󠄁a󠄁i󠄁n󠄁s󠄁t󠄁 a󠄁n󠄁 o󠄁r󠄁g󠄁a󠄁n󠄁i󠄁z󠄁a󠄁t󠄁i󠄁o󠄁n󠄁 |
| `ots domains doctor` | d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 w󠄁h󠄁e󠄁n󠄁 `--repair` i󠄁s󠄁 g󠄁i󠄁v󠄁e󠄁n󠄁;󠄁 a󠄁u󠄁d󠄁i󠄁t󠄁 o󠄁n󠄁l󠄁y󠄁 o󠄁t󠄁h󠄁e󠄁r󠄁w󠄁i󠄁s󠄁e󠄁 | `--repair` | n󠄁o󠄁n󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | C󠄁h󠄁e󠄁c󠄁k󠄁 c󠄁u󠄁s󠄁t󠄁o󠄁m󠄁 d󠄁o󠄁m󠄁a󠄁i󠄁n󠄁 d󠄁a󠄁t󠄁a󠄁 i󠄁n󠄁t󠄁e󠄁g󠄁r󠄁i󠄁t󠄁y󠄁 |
| `ots domains info` | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁t󠄁 d󠄁e󠄁t󠄁e󠄁r󠄁m󠄁i󠄁n󠄁e󠄁d󠄁 f󠄁r󠄁o󠄁m󠄁 s󠄁o󠄁u󠄁r󠄁c󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | S󠄁h󠄁o󠄁w󠄁 d󠄁e󠄁t󠄁a󠄁i󠄁l󠄁e󠄁d󠄁 i󠄁n󠄁f󠄁o󠄁r󠄁m󠄁a󠄁t󠄁i󠄁o󠄁n󠄁 a󠄁b󠄁o󠄁u󠄁t󠄁 a󠄁 d󠄁o󠄁m󠄁a󠄁i󠄁n󠄁 |
| `ots domains list` | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | L󠄁i󠄁s󠄁t󠄁 a󠄁l󠄁l󠄁 c󠄁u󠄁s󠄁t󠄁o󠄁m󠄁 d󠄁o󠄁m󠄁a󠄁i󠄁n󠄁s󠄁 w󠄁i󠄁t󠄁h󠄁 o󠄁r󠄁g󠄁a󠄁n󠄁i󠄁z󠄁a󠄁t󠄁i󠄁o󠄁n󠄁 i󠄁n󠄁f󠄁o󠄁 |
| `ots domains orphaned` | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | L󠄁i󠄁s󠄁t󠄁 d󠄁o󠄁m󠄁a󠄁i󠄁n󠄁s󠄁 w󠄁i󠄁t󠄁h󠄁o󠄁u󠄁t󠄁 o󠄁r󠄁g󠄁a󠄁n󠄁i󠄁z󠄁a󠄁t󠄁i󠄁o󠄁n󠄁 o󠄁w󠄁n󠄁e󠄁r󠄁s󠄁h󠄁i󠄁p󠄁 |
| `ots domains probe` | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | m󠄁a󠄁k󠄁e󠄁s󠄁 a󠄁n󠄁 H󠄁T󠄁T󠄁P󠄁S󠄁 r󠄁e󠄁q󠄁u󠄁e󠄁s󠄁t󠄁 t󠄁o󠄁 t󠄁h󠄁e󠄁 d󠄁o󠄁m󠄁a󠄁i󠄁n󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | M󠄁a󠄁k󠄁e󠄁 H󠄁T󠄁T󠄁P󠄁S󠄁 r󠄁e󠄁q󠄁u󠄁e󠄁s󠄁t󠄁 t󠄁o󠄁 v󠄁e󠄁r󠄁i󠄁f󠄁y󠄁 d󠄁o󠄁m󠄁a󠄁i󠄁n󠄁 s󠄁e󠄁r󠄁v󠄁e󠄁s󠄁 t󠄁r󠄁a󠄁f󠄁f󠄁i󠄁c󠄁 |
| `ots domains reconcile-sender` | t󠄁h󠄁e󠄁 l󠄁o󠄁c󠄁a󠄁l󠄁 m󠄁a󠄁i󠄁l󠄁e󠄁r󠄁 c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁 r󠄁e󠄁c󠄁o󠄁r󠄁d󠄁 f󠄁o󠄁r󠄁 t󠄁h󠄁e󠄁 d󠄁o󠄁m󠄁a󠄁i󠄁n󠄁 | `--dry-run` p󠄁r󠄁e󠄁v󠄁i󠄁e󠄁w󠄁s󠄁 | c󠄁o󠄁n󠄁t󠄁a󠄁c󠄁t󠄁s󠄁 t󠄁h󠄁e󠄁 m󠄁a󠄁i󠄁l󠄁 p󠄁r󠄁o󠄁v󠄁i󠄁d󠄁e󠄁r󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | R󠄁e󠄁c󠄁o󠄁n󠄁c󠄁i󠄁l󠄁e󠄁 a󠄁 s󠄁e󠄁n󠄁d󠄁e󠄁r󠄁 d󠄁o󠄁m󠄁a󠄁i󠄁n󠄁 w󠄁i󠄁t󠄁h󠄁 i󠄁t󠄁s󠄁 l󠄁o󠄁c󠄁a󠄁l󠄁 m󠄁a󠄁i󠄁l󠄁e󠄁r󠄁 c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁 |
| `ots domains remove` | d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁:󠄁 p󠄁e󠄁r󠄁m󠄁a󠄁n󠄁e󠄁n󠄁t󠄁l󠄁y󠄁 d󠄁e󠄁l󠄁e󠄁t󠄁e󠄁s󠄁 t󠄁h󠄁e󠄁 d󠄁o󠄁m󠄁a󠄁i󠄁n󠄁 r󠄁e󠄁c󠄁o󠄁r󠄁d󠄁 | `--apply` | n󠄁o󠄁n󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | R󠄁e󠄁m󠄁o󠄁v󠄁e󠄁 (󠄁p󠄁e󠄁r󠄁m󠄁a󠄁n󠄁e󠄁n󠄁t󠄁l󠄁y󠄁 d󠄁e󠄁l󠄁e󠄁t󠄁e󠄁)󠄁 a󠄁 c󠄁u󠄁s󠄁t󠄁o󠄁m󠄁 d󠄁o󠄁m󠄁a󠄁i󠄁n󠄁 |
| `ots domains repair` | d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁:󠄁 d󠄁o󠄁m󠄁a󠄁i󠄁n󠄁 a󠄁n󠄁d󠄁 o󠄁r󠄁g󠄁a󠄁n󠄁i󠄁z󠄁a󠄁t󠄁i󠄁o󠄁n󠄁 r󠄁e󠄁l󠄁a󠄁t󠄁i󠄁o󠄁n󠄁s󠄁h󠄁i󠄁p󠄁s󠄁 | `--apply` | n󠄁o󠄁t󠄁 d󠄁e󠄁t󠄁e󠄁r󠄁m󠄁i󠄁n󠄁e󠄁d󠄁 f󠄁r󠄁o󠄁m󠄁 s󠄁o󠄁u󠄁r󠄁c󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | F󠄁i󠄁x󠄁 d󠄁o󠄁m󠄁a󠄁i󠄁n󠄁 r󠄁e󠄁l󠄁a󠄁t󠄁i󠄁o󠄁n󠄁s󠄁h󠄁i󠄁p󠄁 i󠄁s󠄁s󠄁u󠄁e󠄁s󠄁 |
| `ots domains resolve-collisions` | d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁:󠄁 k󠄁e󠄁e󠄁p󠄁s󠄁 o󠄁n󠄁e󠄁 r󠄁e󠄁c󠄁o󠄁r󠄁d󠄁 p󠄁e󠄁r󠄁 c󠄁o󠄁l󠄁l󠄁i󠄁d󠄁i󠄁n󠄁g󠄁 n󠄁a󠄁m󠄁e󠄁;󠄁 `--write` w󠄁r󠄁i󠄁t󠄁e󠄁s󠄁 a󠄁 p󠄁l󠄁a󠄁n󠄁 f󠄁i󠄁l󠄁e󠄁 | `--apply` a󠄁n󠄁d󠄁 a󠄁 p󠄁r󠄁o󠄁m󠄁p󠄁t󠄁,󠄁 o󠄁r󠄁 `--yes` | n󠄁o󠄁t󠄁 d󠄁e󠄁t󠄁e󠄁r󠄁m󠄁i󠄁n󠄁e󠄁d󠄁 f󠄁r󠄁o󠄁m󠄁 s󠄁o󠄁u󠄁r󠄁c󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | P󠄁l󠄁a󠄁n󠄁 a󠄁n󠄁d󠄁 a󠄁p󠄁p󠄁l󠄁y󠄁 w󠄁h󠄁i󠄁c󠄁h󠄁 r󠄁e󠄁c󠄁o󠄁r󠄁d󠄁 t󠄁o󠄁 k󠄁e󠄁e󠄁p󠄁 f󠄁o󠄁r󠄁 e󠄁a󠄁c󠄁h󠄁 c󠄁u󠄁s󠄁t󠄁o󠄁m󠄁-󠄁d󠄁o󠄁m󠄁a󠄁i󠄁n󠄁 n󠄁a󠄁m󠄁e󠄁 c󠄁o󠄁l󠄁l󠄁i󠄁s󠄁i󠄁o󠄁n󠄁 (󠄁s󠄁t󠄁o󠄁p󠄁 t󠄁h󠄁e󠄁 a󠄁p󠄁p󠄁 b󠄁e󠄁f󠄁o󠄁r󠄁e󠄁 -󠄁-󠄁a󠄁p󠄁p󠄁l󠄁y󠄁)󠄁 |
| `ots domains transfer` | d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁:󠄁 m󠄁o󠄁v󠄁e󠄁s󠄁 t󠄁h󠄁e󠄁 d󠄁o󠄁m󠄁a󠄁i󠄁n󠄁 b󠄁e󠄁t󠄁w󠄁e󠄁e󠄁n󠄁 o󠄁r󠄁g󠄁a󠄁n󠄁i󠄁z󠄁a󠄁t󠄁i󠄁o󠄁n󠄁s󠄁 | `--apply` | n󠄁o󠄁t󠄁 d󠄁e󠄁t󠄁e󠄁r󠄁m󠄁i󠄁n󠄁e󠄁d󠄁 f󠄁r󠄁o󠄁m󠄁 s󠄁o󠄁u󠄁r󠄁c󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | T󠄁r󠄁a󠄁n󠄁s󠄁f󠄁e󠄁r󠄁 a󠄁 c󠄁u󠄁s󠄁t󠄁o󠄁m󠄁 d󠄁o󠄁m󠄁a󠄁i󠄁n󠄁 b󠄁e󠄁t󠄁w󠄁e󠄁e󠄁n󠄁 o󠄁r󠄁g󠄁a󠄁n󠄁i󠄁z󠄁a󠄁t󠄁i󠄁o󠄁n󠄁s󠄁 |
| `ots domains verify` | d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁:󠄁 v󠄁e󠄁r󠄁i󠄁f󠄁i󠄁c󠄁a󠄁t󠄁i󠄁o󠄁n󠄁 a󠄁n󠄁d󠄁 r󠄁e󠄁s󠄁o󠄁l󠄁v󠄁i󠄁n󠄁g󠄁 s󠄁t󠄁a󠄁t󠄁e󠄁 | `--dry-run` p󠄁r󠄁e󠄁v󠄁i󠄁e󠄁w󠄁s󠄁;󠄁 a󠄁 b󠄁a󠄁r󠄁e󠄁 r󠄁u󠄁n󠄁 w󠄁r󠄁i󠄁t󠄁e󠄁s󠄁 | p󠄁e󠄁r󠄁f󠄁o󠄁r󠄁m󠄁s󠄁 D󠄁N󠄁S󠄁 a󠄁n󠄁d󠄁 T󠄁L󠄁S󠄁 l󠄁o󠄁o󠄁k󠄁u󠄁p󠄁s󠄁 a󠄁g󠄁a󠄁i󠄁n󠄁s󠄁t󠄁 t󠄁h󠄁e󠄁 d󠄁o󠄁m󠄁a󠄁i󠄁n󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | V󠄁e󠄁r󠄁i󠄁f󠄁y󠄁 d󠄁o󠄁m󠄁a󠄁i󠄁n󠄁 o󠄁w󠄁n󠄁e󠄁r󠄁s󠄁h󠄁i󠄁p󠄁 a󠄁n󠄁d󠄁 S󠄁S󠄁L󠄁 s󠄁t󠄁a󠄁t󠄁u󠄁s󠄁 |

A󠄁l󠄁i󠄁a󠄁s󠄁e󠄁s󠄁:󠄁 `domain` i󠄁s󠄁 a󠄁n󠄁 a󠄁l󠄁i󠄁a󠄁s󠄁 o󠄁f󠄁 `ots domains`;󠄁 `ots domains add` r󠄁u󠄁n󠄁s󠄁 `ots domains create`;󠄁 `ots domains show` r󠄁u󠄁n󠄁s󠄁 `ots domains info`;󠄁 `ots domains reassign` r󠄁u󠄁n󠄁s󠄁 `ots domains transfer`.󠄁

## E󠄁m󠄁a󠄁i󠄁l󠄁

| C󠄁o󠄁m󠄁m󠄁a󠄁n󠄁d󠄁 | W󠄁r󠄁i󠄁t󠄁e󠄁s󠄁 | G󠄁a󠄁t󠄁e󠄁 | E󠄁x󠄁t󠄁e󠄁r󠄁n󠄁a󠄁l󠄁 e󠄁f󠄁f󠄁e󠄁c󠄁t󠄁s󠄁 | P󠄁r󠄁i󠄁v󠄁i󠄁l󠄁e󠄁g󠄁e󠄁s󠄁 | D󠄁e󠄁s󠄁c󠄁r󠄁i󠄁p󠄁t󠄁i󠄁o󠄁n󠄁 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `ots email config` | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | S󠄁h󠄁o󠄁w󠄁 c󠄁u󠄁r󠄁r󠄁e󠄁n󠄁t󠄁 e󠄁m󠄁a󠄁i󠄁l󠄁 d󠄁e󠄁l󠄁i󠄁v󠄁e󠄁r󠄁y󠄁 c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁 |
| `ots email preview` | n󠄁o󠄁n󠄁e󠄁;󠄁 r󠄁e󠄁n󠄁d󠄁e󠄁r󠄁s󠄁 a󠄁 t󠄁e󠄁m󠄁p󠄁l󠄁a󠄁t󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | `--open` l󠄁a󠄁u󠄁n󠄁c󠄁h󠄁e󠄁s󠄁 a󠄁 l󠄁o󠄁c󠄁a󠄁l󠄁 v󠄁i󠄁e󠄁w󠄁e󠄁r󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | R󠄁e󠄁n󠄁d󠄁e󠄁r󠄁 a󠄁 t󠄁e󠄁m󠄁p󠄁l󠄁a󠄁t󠄁e󠄁 f󠄁o󠄁r󠄁 v󠄁i󠄁s󠄁u󠄁a󠄁l󠄁 i󠄁n󠄁s󠄁p󠄁e󠄁c󠄁t󠄁i󠄁o󠄁n󠄁 |
| `ots email send` | n󠄁o󠄁n󠄁e󠄁 i󠄁n󠄁 t󠄁h󠄁e󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁;󠄁 `--execute` d󠄁e󠄁l󠄁i󠄁v󠄁e󠄁r󠄁s󠄁 t󠄁h󠄁e󠄁 m󠄁e󠄁s󠄁s󠄁a󠄁g󠄁e󠄁 | `--execute` | d󠄁e󠄁l󠄁i󠄁v󠄁e󠄁r󠄁s󠄁 t󠄁h󠄁r󠄁o󠄁u󠄁g󠄁h󠄁 t󠄁h󠄁e󠄁 c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁e󠄁d󠄁 m󠄁a󠄁i󠄁l󠄁 b󠄁a󠄁c󠄁k󠄁e󠄁n󠄁d󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | S󠄁e󠄁n󠄁d󠄁 a󠄁 t󠄁r󠄁a󠄁n󠄁s󠄁a󠄁c󠄁t󠄁i󠄁o󠄁n󠄁a󠄁l󠄁 e󠄁m󠄁a󠄁i󠄁l󠄁 (󠄁d󠄁r󠄁y󠄁-󠄁r󠄁u󠄁n󠄁 b󠄁y󠄁 d󠄁e󠄁f󠄁a󠄁u󠄁l󠄁t󠄁)󠄁 |
| `ots email sync-feedback` | d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁:󠄁 t󠄁h󠄁e󠄁 s󠄁u󠄁p󠄁p󠄁r󠄁e󠄁s󠄁s󠄁i󠄁o󠄁n󠄁 l󠄁i󠄁s󠄁t󠄁 | `--dry-run` p󠄁r󠄁e󠄁v󠄁i󠄁e󠄁w󠄁s󠄁;󠄁 a󠄁 b󠄁a󠄁r󠄁e󠄁 r󠄁u󠄁n󠄁 w󠄁r󠄁i󠄁t󠄁e󠄁s󠄁 | p󠄁u󠄁l󠄁l󠄁s󠄁 s󠄁u󠄁p󠄁p󠄁r󠄁e󠄁s󠄁s󠄁i󠄁o󠄁n󠄁 f󠄁e󠄁e󠄁d󠄁b󠄁a󠄁c󠄁k󠄁 f󠄁r󠄁o󠄁m󠄁 t󠄁h󠄁e󠄁 c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁e󠄁d󠄁 p󠄁r󠄁o󠄁v󠄁i󠄁d󠄁e󠄁r󠄁 (󠄁S󠄁E󠄁S󠄁,󠄁 L󠄁e󠄁t󠄁t󠄁e󠄁r󠄁m󠄁i󠄁n󠄁t󠄁,󠄁 S󠄁M󠄁T󠄁P󠄁2󠄁G󠄁O󠄁)󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | P󠄁u󠄁l󠄁l󠄁 E󠄁S󠄁P󠄁 s󠄁u󠄁p󠄁p󠄁r󠄁e󠄁s󠄁s󠄁i󠄁o󠄁n󠄁 f󠄁e󠄁e󠄁d󠄁b󠄁a󠄁c󠄁k󠄁 (󠄁S󠄁E󠄁S󠄁/󠄁L󠄁e󠄁t󠄁t󠄁e󠄁r󠄁m󠄁i󠄁n󠄁t󠄁/󠄁S󠄁M󠄁T󠄁P󠄁2󠄁G󠄁O󠄁)󠄁 i󠄁n󠄁t󠄁o󠄁 t󠄁h󠄁e󠄁 s󠄁u󠄁p󠄁p󠄁r󠄁e󠄁s󠄁s󠄁i󠄁o󠄁n󠄁 l󠄁i󠄁s󠄁t󠄁 |
| `ots email templates` | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | L󠄁i󠄁s󠄁t󠄁 a󠄁v󠄁a󠄁i󠄁l󠄁a󠄁b󠄁l󠄁e󠄁 e󠄁m󠄁a󠄁i󠄁l󠄁 t󠄁e󠄁m󠄁p󠄁l󠄁a󠄁t󠄁e󠄁s󠄁 |
| `ots email test` | p󠄁u󠄁b󠄁l󠄁i󠄁s󠄁h󠄁e󠄁s󠄁 t󠄁o󠄁 t󠄁h󠄁e󠄁 e󠄁m󠄁a󠄁i󠄁l󠄁 q󠄁u󠄁e󠄁u󠄁e󠄁 w󠄁i󠄁t󠄁h󠄁 `--enqueue` | `--dry-run` p󠄁r󠄁e󠄁v󠄁i󠄁e󠄁w󠄁s󠄁;󠄁 a󠄁 b󠄁a󠄁r󠄁e󠄁 r󠄁u󠄁n󠄁 s󠄁e󠄁n󠄁d󠄁s󠄁 | s󠄁e󠄁n󠄁d󠄁s󠄁 a󠄁 t󠄁e󠄁s󠄁t󠄁 m󠄁e󠄁s󠄁s󠄁a󠄁g󠄁e󠄁,󠄁 o󠄁r󠄁 e󠄁n󠄁q󠄁u󠄁e󠄁u󠄁e󠄁s󠄁 i󠄁t󠄁 f󠄁o󠄁r󠄁 a󠄁 w󠄁o󠄁r󠄁k󠄁e󠄁r󠄁 w󠄁i󠄁t󠄁h󠄁 `--enqueue` | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | S󠄁e󠄁n󠄁d󠄁 a󠄁 t󠄁e󠄁s󠄁t󠄁 e󠄁m󠄁a󠄁i󠄁l󠄁 t󠄁o󠄁 v󠄁e󠄁r󠄁i󠄁f󠄁y󠄁 d󠄁e󠄁l󠄁i󠄁v󠄁e󠄁r󠄁y󠄁 c󠄁o󠄁n󠄁n󠄁e󠄁c󠄁t󠄁i󠄁v󠄁i󠄁t󠄁y󠄁 |
| `ots email validate` | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | `--mx` a󠄁n󠄁d󠄁 `--smtp` m󠄁a󠄁k󠄁e󠄁 D󠄁N󠄁S󠄁 a󠄁n󠄁d󠄁 S󠄁M󠄁T󠄁P󠄁 p󠄁r󠄁o󠄁b󠄁e󠄁s󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | V󠄁a󠄁l󠄁i󠄁d󠄁a󠄁t󠄁e󠄁 a󠄁n󠄁 e󠄁m󠄁a󠄁i󠄁l󠄁 a󠄁d󠄁d󠄁r󠄁e󠄁s󠄁s󠄁 u󠄁s󠄁i󠄁n󠄁g󠄁 T󠄁r󠄁u󠄁e󠄁m󠄁a󠄁i󠄁l󠄁 |

## Q󠄁u󠄁e󠄁u󠄁e󠄁s󠄁 a󠄁n󠄁d󠄁 d󠄁e󠄁a󠄁d󠄁 l󠄁e󠄁t󠄁t󠄁e󠄁r󠄁s󠄁

| C󠄁o󠄁m󠄁m󠄁a󠄁n󠄁d󠄁 | W󠄁r󠄁i󠄁t󠄁e󠄁s󠄁 | G󠄁a󠄁t󠄁e󠄁 | E󠄁x󠄁t󠄁e󠄁r󠄁n󠄁a󠄁l󠄁 e󠄁f󠄁f󠄁e󠄁c󠄁t󠄁s󠄁 | P󠄁r󠄁i󠄁v󠄁i󠄁l󠄁e󠄁g󠄁e󠄁s󠄁 | D󠄁e󠄁s󠄁c󠄁r󠄁i󠄁p󠄁t󠄁i󠄁o󠄁n󠄁 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `ots queue dlq discard` | p󠄁e󠄁r󠄁m󠄁a󠄁n󠄁e󠄁n󠄁t󠄁l󠄁y󠄁 d󠄁r󠄁o󠄁p󠄁s󠄁 o󠄁n󠄁e󠄁 d󠄁e󠄁a󠄁d󠄁-󠄁l󠄁e󠄁t󠄁t󠄁e󠄁r󠄁 m󠄁e󠄁s󠄁s󠄁a󠄁g󠄁e󠄁 | p󠄁r󠄁o󠄁m󠄁p󠄁t󠄁,󠄁 o󠄁r󠄁 `--force`;󠄁 `--dry-run` p󠄁r󠄁e󠄁v󠄁i󠄁e󠄁w󠄁s󠄁 | a󠄁c󠄁k󠄁n󠄁o󠄁w󠄁l󠄁e󠄁d󠄁g󠄁e󠄁s󠄁 a󠄁n󠄁d󠄁 d󠄁r󠄁o󠄁p󠄁s󠄁 a󠄁 b󠄁r󠄁o󠄁k󠄁e󠄁r󠄁 m󠄁e󠄁s󠄁s󠄁a󠄁g󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁,󠄁 b󠄁r󠄁o󠄁k󠄁e󠄁r󠄁 | D󠄁i󠄁s󠄁c󠄁a󠄁r󠄁d󠄁 (󠄁p󠄁e󠄁r󠄁m󠄁a󠄁n󠄁e󠄁n󠄁t󠄁l󠄁y󠄁 d󠄁r󠄁o󠄁p󠄁)󠄁 o󠄁n󠄁e󠄁 m󠄁e󠄁s󠄁s󠄁a󠄁g󠄁e󠄁 f󠄁r󠄁o󠄁m󠄁 a󠄁 D󠄁e󠄁a󠄁d󠄁 L󠄁e󠄁t󠄁t󠄁e󠄁r󠄁 Q󠄁u󠄁e󠄁u󠄁e󠄁 |
| `ots queue dlq list` | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | r󠄁e󠄁a󠄁d󠄁s󠄁 t󠄁h󠄁e󠄁 d󠄁e󠄁a󠄁d󠄁-󠄁l󠄁e󠄁t󠄁t󠄁e󠄁r󠄁 q󠄁u󠄁e󠄁u󠄁e󠄁s󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁,󠄁 b󠄁r󠄁o󠄁k󠄁e󠄁r󠄁 | L󠄁i󠄁s󠄁t󠄁 m󠄁e󠄁s󠄁s󠄁a󠄁g󠄁e󠄁s󠄁 i󠄁n󠄁 D󠄁e󠄁a󠄁d󠄁 L󠄁e󠄁t󠄁t󠄁e󠄁r󠄁 Q󠄁u󠄁e󠄁u󠄁e󠄁s󠄁 |
| `ots queue dlq purge` | d󠄁e󠄁l󠄁e󠄁t󠄁e󠄁s󠄁 m󠄁e󠄁s󠄁s󠄁a󠄁g󠄁e󠄁s󠄁 f󠄁r󠄁o󠄁m󠄁 a󠄁 d󠄁e󠄁a󠄁d󠄁-󠄁l󠄁e󠄁t󠄁t󠄁e󠄁r󠄁 q󠄁u󠄁e󠄁u󠄁e󠄁 | p󠄁r󠄁o󠄁m󠄁p󠄁t󠄁,󠄁 o󠄁r󠄁 `--force` | p󠄁u󠄁r󠄁g󠄁e󠄁s󠄁 a󠄁 b󠄁r󠄁o󠄁k󠄁e󠄁r󠄁 q󠄁u󠄁e󠄁u󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁,󠄁 b󠄁r󠄁o󠄁k󠄁e󠄁r󠄁 | P󠄁u󠄁r󠄁g󠄁e󠄁 (󠄁d󠄁e󠄁l󠄁e󠄁t󠄁e󠄁)󠄁 m󠄁e󠄁s󠄁s󠄁a󠄁g󠄁e󠄁s󠄁 f󠄁r󠄁o󠄁m󠄁 a󠄁 D󠄁e󠄁a󠄁d󠄁 L󠄁e󠄁t󠄁t󠄁e󠄁r󠄁 Q󠄁u󠄁e󠄁u󠄁e󠄁 |
| `ots queue dlq replay` | r󠄁e󠄁p󠄁u󠄁b󠄁l󠄁i󠄁s󠄁h󠄁e󠄁s󠄁 m󠄁e󠄁s󠄁s󠄁a󠄁g󠄁e󠄁s󠄁 t󠄁o󠄁 t󠄁h󠄁e󠄁i󠄁r󠄁 o󠄁r󠄁i󠄁g󠄁i󠄁n󠄁a󠄁l󠄁 q󠄁u󠄁e󠄁u󠄁e󠄁,󠄁 w󠄁h󠄁e󠄁r󠄁e󠄁 w󠄁o󠄁r󠄁k󠄁e󠄁r󠄁s󠄁 p󠄁r󠄁o󠄁c󠄁e󠄁s󠄁s󠄁 t󠄁h󠄁e󠄁m󠄁 a󠄁g󠄁a󠄁i󠄁n󠄁 | n󠄁o󠄁n󠄁e󠄁 a󠄁t󠄁 a󠄁l󠄁l󠄁 | p󠄁u󠄁b󠄁l󠄁i󠄁s󠄁h󠄁e󠄁s󠄁 t󠄁o󠄁 t󠄁h󠄁e󠄁 b󠄁r󠄁o󠄁k󠄁e󠄁r󠄁;󠄁 r󠄁e󠄁p󠄁l󠄁a󠄁y󠄁e󠄁d󠄁 w󠄁o󠄁r󠄁k󠄁 r󠄁u󠄁n󠄁s󠄁 a󠄁g󠄁a󠄁i󠄁n󠄁,󠄁 i󠄁n󠄁c󠄁l󠄁u󠄁d󠄁i󠄁n󠄁g󠄁 e󠄁m󠄁a󠄁i󠄁l󠄁 d󠄁e󠄁l󠄁i󠄁v󠄁e󠄁r󠄁y󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁,󠄁 b󠄁r󠄁o󠄁k󠄁e󠄁r󠄁 | R󠄁e󠄁p󠄁l󠄁a󠄁y󠄁 m󠄁e󠄁s󠄁s󠄁a󠄁g󠄁e󠄁s󠄁 f󠄁r󠄁o󠄁m󠄁 D󠄁L󠄁Q󠄁 b󠄁a󠄁c󠄁k󠄁 t󠄁o󠄁 o󠄁r󠄁i󠄁g󠄁i󠄁n󠄁a󠄁l󠄁 q󠄁u󠄁e󠄁u󠄁e󠄁;󠄁 w󠄁o󠄁r󠄁k󠄁e󠄁r󠄁s󠄁 p󠄁r󠄁o󠄁c󠄁e󠄁s󠄁s󠄁 t󠄁h󠄁e󠄁m󠄁 a󠄁g󠄁a󠄁i󠄁n󠄁 |
| `ots queue dlq show` | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | r󠄁e󠄁a󠄁d󠄁s󠄁 o󠄁n󠄁e󠄁 d󠄁e󠄁a󠄁d󠄁-󠄁l󠄁e󠄁t󠄁t󠄁e󠄁r󠄁 m󠄁e󠄁s󠄁s󠄁a󠄁g󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁,󠄁 b󠄁r󠄁o󠄁k󠄁e󠄁r󠄁 | S󠄁h󠄁o󠄁w󠄁 d󠄁e󠄁t󠄁a󠄁i󠄁l󠄁s󠄁 o󠄁f󠄁 a󠄁 s󠄁p󠄁e󠄁c󠄁i󠄁f󠄁i󠄁c󠄁 D󠄁L󠄁Q󠄁 m󠄁e󠄁s󠄁s󠄁a󠄁g󠄁e󠄁 |
| `ots queue init` | R󠄁a󠄁b󠄁b󠄁i󠄁t󠄁M󠄁Q󠄁 t󠄁o󠄁p󠄁o󠄁l󠄁o󠄁g󠄁y󠄁:󠄁 v󠄁h󠄁o󠄁s󠄁t󠄁,󠄁 e󠄁x󠄁c󠄁h󠄁a󠄁n󠄁g󠄁e󠄁s󠄁 a󠄁n󠄁d󠄁 q󠄁u󠄁e󠄁u󠄁e󠄁s󠄁 | p󠄁r󠄁o󠄁m󠄁p󠄁t󠄁,󠄁 o󠄁r󠄁 `--force`;󠄁 `--dry-run` p󠄁r󠄁e󠄁v󠄁i󠄁e󠄁w󠄁s󠄁 | d󠄁e󠄁c󠄁l󠄁a󠄁r󠄁e󠄁s󠄁 t󠄁o󠄁p󠄁o󠄁l󠄁o󠄁g󠄁y󠄁 o󠄁n󠄁 t󠄁h󠄁e󠄁 b󠄁r󠄁o󠄁k󠄁e󠄁r󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁,󠄁 b󠄁r󠄁o󠄁k󠄁e󠄁r󠄁 | I󠄁n󠄁i󠄁t󠄁i󠄁a󠄁l󠄁i󠄁z󠄁e󠄁 R󠄁a󠄁b󠄁b󠄁i󠄁t󠄁M󠄁Q󠄁 v󠄁h󠄁o󠄁s󠄁t󠄁,󠄁 e󠄁x󠄁c󠄁h󠄁a󠄁n󠄁g󠄁e󠄁s󠄁,󠄁 a󠄁n󠄁d󠄁 q󠄁u󠄁e󠄁u󠄁e󠄁s󠄁 |
| `ots queue ping` | p󠄁u󠄁b󠄁l󠄁i󠄁s󠄁h󠄁e󠄁s󠄁 p󠄁i󠄁n󠄁g󠄁 m󠄁e󠄁s󠄁s󠄁a󠄁g󠄁e󠄁s󠄁 t󠄁o󠄁 t󠄁h󠄁e󠄁 s󠄁e󠄁l󠄁e󠄁c󠄁t󠄁e󠄁d󠄁 q󠄁u󠄁e󠄁u󠄁e󠄁s󠄁 | `--dry-run` p󠄁r󠄁e󠄁v󠄁i󠄁e󠄁w󠄁s󠄁 | p󠄁u󠄁b󠄁l󠄁i󠄁s󠄁h󠄁e󠄁s󠄁 t󠄁o󠄁 t󠄁h󠄁e󠄁 b󠄁r󠄁o󠄁k󠄁e󠄁r󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁,󠄁 b󠄁r󠄁o󠄁k󠄁e󠄁r󠄁 | T󠄁e󠄁s󠄁t󠄁 j󠄁o󠄁b󠄁 q󠄁u󠄁e󠄁u󠄁e󠄁 c󠄁o󠄁m󠄁m󠄁u󠄁n󠄁i󠄁c󠄁a󠄁t󠄁i󠄁o󠄁n󠄁 b󠄁y󠄁 s󠄁e󠄁n󠄁d󠄁i󠄁n󠄁g󠄁 p󠄁i󠄁n󠄁g󠄁 m󠄁e󠄁s󠄁s󠄁a󠄁g󠄁e󠄁s󠄁 |
| `ots queue reset` | d󠄁e󠄁l󠄁e󠄁t󠄁e󠄁s󠄁 q󠄁u󠄁e󠄁u󠄁e󠄁s󠄁 a󠄁n󠄁d󠄁 t󠄁h󠄁e󠄁 m󠄁e󠄁s󠄁s󠄁a󠄁g󠄁e󠄁s󠄁 i󠄁n󠄁 t󠄁h󠄁e󠄁m󠄁 | p󠄁r󠄁o󠄁m󠄁p󠄁t󠄁,󠄁 o󠄁r󠄁 `--force`;󠄁 `--dry-run` p󠄁r󠄁e󠄁v󠄁i󠄁e󠄁w󠄁s󠄁 | d󠄁e󠄁l󠄁e󠄁t󠄁e󠄁s󠄁 t󠄁o󠄁p󠄁o󠄁l󠄁o󠄁g󠄁y󠄁 o󠄁n󠄁 t󠄁h󠄁e󠄁 b󠄁r󠄁o󠄁k󠄁e󠄁r󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁,󠄁 b󠄁r󠄁o󠄁k󠄁e󠄁r󠄁 | R󠄁e󠄁s󠄁e󠄁t󠄁 R󠄁a󠄁b󠄁b󠄁i󠄁t󠄁M󠄁Q󠄁 q󠄁u󠄁e󠄁u󠄁e󠄁s󠄁 (󠄁W󠄁A󠄁R󠄁N󠄁I󠄁N󠄁G󠄁:󠄁 d󠄁e󠄁s󠄁t󠄁r󠄁o󠄁y󠄁s󠄁 p󠄁e󠄁n󠄁d󠄁i󠄁n󠄁g󠄁 m󠄁e󠄁s󠄁s󠄁a󠄁g󠄁e󠄁s󠄁)󠄁 |
| `ots queue status` | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | r󠄁e󠄁a󠄁d󠄁s󠄁 q󠄁u󠄁e󠄁u󠄁e󠄁 d󠄁e󠄁p󠄁t󠄁h󠄁s󠄁 f󠄁r󠄁o󠄁m󠄁 t󠄁h󠄁e󠄁 b󠄁r󠄁o󠄁k󠄁e󠄁r󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁,󠄁 b󠄁r󠄁o󠄁k󠄁e󠄁r󠄁 | S󠄁h󠄁o󠄁w󠄁 j󠄁o󠄁b󠄁 s󠄁y󠄁s󠄁t󠄁e󠄁m󠄁 s󠄁t󠄁a󠄁t󠄁u󠄁s󠄁 |

A󠄁l󠄁i󠄁a󠄁s󠄁e󠄁s󠄁:󠄁 `ots queues dlq discard` r󠄁u󠄁n󠄁s󠄁 `ots queue dlq discard`;󠄁 `ots queues dlq list` r󠄁u󠄁n󠄁s󠄁 `ots queue dlq list`;󠄁 `ots queues dlq purge` r󠄁u󠄁n󠄁s󠄁 `ots queue dlq purge`;󠄁 `ots queues dlq replay` r󠄁u󠄁n󠄁s󠄁 `ots queue dlq replay`;󠄁 `ots queues dlq show` r󠄁u󠄁n󠄁s󠄁 `ots queue dlq show`;󠄁 `ots queues init` r󠄁u󠄁n󠄁s󠄁 `ots queue init`;󠄁 `ots queues ping` r󠄁u󠄁n󠄁s󠄁 `ots queue ping`;󠄁 `ots queues reset` r󠄁u󠄁n󠄁s󠄁 `ots queue reset`;󠄁 `ots queues status` r󠄁u󠄁n󠄁s󠄁 `ots queue status`.󠄁

## M󠄁i󠄁g󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁s󠄁

| C󠄁o󠄁m󠄁m󠄁a󠄁n󠄁d󠄁 | W󠄁r󠄁i󠄁t󠄁e󠄁s󠄁 | G󠄁a󠄁t󠄁e󠄁 | E󠄁x󠄁t󠄁e󠄁r󠄁n󠄁a󠄁l󠄁 e󠄁f󠄁f󠄁e󠄁c󠄁t󠄁s󠄁 | P󠄁r󠄁i󠄁v󠄁i󠄁l󠄁e󠄁g󠄁e󠄁s󠄁 | D󠄁e󠄁s󠄁c󠄁r󠄁i󠄁p󠄁t󠄁i󠄁o󠄁n󠄁 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `ots migrate` | d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁:󠄁 w󠄁h󠄁a󠄁t󠄁e󠄁v󠄁e󠄁r󠄁 t󠄁h󠄁e󠄁 s󠄁e󠄁l󠄁e󠄁c󠄁t󠄁e󠄁d󠄁 m󠄁i󠄁g󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁 w󠄁r󠄁i󠄁t󠄁e󠄁s󠄁 | `--run`;󠄁 `--rollback ID` r󠄁e󠄁v󠄁e󠄁r󠄁s󠄁e󠄁s󠄁 | n󠄁o󠄁n󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | R󠄁u󠄁n󠄁 F󠄁a󠄁m󠄁i󠄁l󠄁i󠄁a󠄁-󠄁b󠄁a󠄁s󠄁e󠄁d󠄁 d󠄁a󠄁t󠄁a󠄁 m󠄁i󠄁g󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁s󠄁 |
| `ots migrations backfill-email-hash` | d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁:󠄁 `email_hash` o󠄁n󠄁 o󠄁r󠄁g󠄁a󠄁n󠄁i󠄁z󠄁a󠄁t󠄁i󠄁o󠄁n󠄁s󠄁 | `--run` | n󠄁o󠄁n󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | B󠄁a󠄁c󠄁k󠄁f󠄁i󠄁l󠄁l󠄁 e󠄁m󠄁a󠄁i󠄁l󠄁_󠄁h󠄁a󠄁s󠄁h󠄁 f󠄁o󠄁r󠄁 e󠄁x󠄁i󠄁s󠄁t󠄁i󠄁n󠄁g󠄁 o󠄁r󠄁g󠄁a󠄁n󠄁i󠄁z󠄁a󠄁t󠄁i󠄁o󠄁n󠄁s󠄁 |
| `ots migrations backfill-secret-counts` | d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁:󠄁 p󠄁e󠄁r󠄁-󠄁c󠄁u󠄁s󠄁t󠄁o󠄁m󠄁e󠄁r󠄁 `secrets_active` c󠄁o󠄁u󠄁n󠄁t󠄁e󠄁r󠄁s󠄁 | `--run` | n󠄁o󠄁n󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | B󠄁a󠄁c󠄁k󠄁f󠄁i󠄁l󠄁l󠄁 p󠄁e󠄁r󠄁-󠄁c󠄁u󠄁s󠄁t󠄁o󠄁m󠄁e󠄁r󠄁 l󠄁i󠄁v󠄁e󠄁-󠄁s󠄁e󠄁c󠄁r󠄁e󠄁t󠄁 c󠄁o󠄁u󠄁n󠄁t󠄁e󠄁r󠄁s󠄁 (󠄁s󠄁e󠄁c󠄁r󠄁e󠄁t󠄁s󠄁_󠄁a󠄁c󠄁t󠄁i󠄁v󠄁e󠄁)󠄁 |
| `ots migrations backfill-stripe-email-hash` | S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 c󠄁u󠄁s󠄁t󠄁o󠄁m󠄁e󠄁r󠄁 m󠄁e󠄁t󠄁a󠄁d󠄁a󠄁t󠄁a󠄁 | `--run` | w󠄁r󠄁i󠄁t󠄁e󠄁s󠄁 m󠄁e󠄁t󠄁a󠄁d󠄁a󠄁t󠄁a󠄁 o󠄁n󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 c󠄁u󠄁s󠄁t󠄁o󠄁m󠄁e󠄁r󠄁s󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁,󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 k󠄁e󠄁y󠄁 | B󠄁a󠄁c󠄁k󠄁f󠄁i󠄁l󠄁l󠄁 e󠄁m󠄁a󠄁i󠄁l󠄁_󠄁h󠄁a󠄁s󠄁h󠄁 m󠄁e󠄁t󠄁a󠄁d󠄁a󠄁t󠄁a󠄁 f󠄁o󠄁r󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 c󠄁u󠄁s󠄁t󠄁o󠄁m󠄁e󠄁r󠄁s󠄁 |
| `ots migrations backfill-subscription-status` | d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁:󠄁 s󠄁u󠄁b󠄁s󠄁c󠄁r󠄁i󠄁p󠄁t󠄁i󠄁o󠄁n󠄁 s󠄁t󠄁a󠄁t󠄁u󠄁s󠄁 a󠄁n󠄁d󠄁 p󠄁e󠄁r󠄁i󠄁o󠄁d󠄁 e󠄁n󠄁d󠄁 | `--run` | r󠄁e󠄁a󠄁d󠄁s󠄁 s󠄁u󠄁b󠄁s󠄁c󠄁r󠄁i󠄁p󠄁t󠄁i󠄁o󠄁n󠄁s󠄁 f󠄁r󠄁o󠄁m󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁,󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 k󠄁e󠄁y󠄁 | B󠄁a󠄁c󠄁k󠄁f󠄁i󠄁l󠄁l󠄁 s󠄁u󠄁b󠄁s󠄁c󠄁r󠄁i󠄁p󠄁t󠄁i󠄁o󠄁n󠄁_󠄁s󠄁t󠄁a󠄁t󠄁u󠄁s󠄁 a󠄁n󠄁d󠄁 s󠄁u󠄁b󠄁s󠄁c󠄁r󠄁i󠄁p󠄁t󠄁i󠄁o󠄁n󠄁_󠄁p󠄁e󠄁r󠄁i󠄁o󠄁d󠄁_󠄁e󠄁n󠄁d󠄁 f󠄁r󠄁o󠄁m󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 |
| `ots migrations dedupe-instances` | d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁:󠄁 c󠄁l󠄁a󠄁s󠄁s󠄁-󠄁l󠄁e󠄁v󠄁e󠄁l󠄁 i󠄁n󠄁s󠄁t󠄁a󠄁n󠄁c󠄁e󠄁 c󠄁o󠄁l󠄁l󠄁e󠄁c󠄁t󠄁i󠄁o󠄁n󠄁s󠄁 | `--run` | n󠄁o󠄁n󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | D󠄁e󠄁d󠄁u󠄁p󠄁l󠄁i󠄁c󠄁a󠄁t󠄁e󠄁 a󠄁n󠄁d󠄁 n󠄁o󠄁r󠄁m󠄁a󠄁l󠄁i󠄁z󠄁e󠄁 J󠄁S󠄁O󠄁N󠄁-󠄁q󠄁u󠄁o󠄁t󠄁e󠄁d󠄁 m󠄁e󠄁m󠄁b󠄁e󠄁r󠄁s󠄁 i󠄁n󠄁 c󠄁l󠄁a󠄁s󠄁s󠄁-󠄁l󠄁e󠄁v󠄁e󠄁l󠄁 i󠄁n󠄁s󠄁t󠄁a󠄁n󠄁c󠄁e󠄁 c󠄁o󠄁l󠄁l󠄁e󠄁c󠄁t󠄁i󠄁o󠄁n󠄁s󠄁 |
| `ots migrations dedupe-participations` | d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁:󠄁 p󠄁e󠄁r󠄁-󠄁i󠄁n󠄁s󠄁t󠄁a󠄁n󠄁c󠄁e󠄁 p󠄁a󠄁r󠄁t󠄁i󠄁c󠄁i󠄁p󠄁a󠄁t󠄁i󠄁o󠄁n󠄁 s󠄁e󠄁t󠄁s󠄁 | `--run` | n󠄁o󠄁n󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | R󠄁e󠄁m󠄁o󠄁v󠄁e󠄁 J󠄁S󠄁O󠄁N󠄁-󠄁q󠄁u󠄁o󠄁t󠄁e󠄁d󠄁 d󠄁u󠄁p󠄁l󠄁i󠄁c󠄁a󠄁t󠄁e󠄁s󠄁 f󠄁r󠄁o󠄁m󠄁 p󠄁e󠄁r󠄁-󠄁i󠄁n󠄁s󠄁t󠄁a󠄁n󠄁c󠄁e󠄁 p󠄁a󠄁r󠄁t󠄁i󠄁c󠄁i󠄁p󠄁a󠄁t󠄁i󠄁o󠄁n󠄁 s󠄁e󠄁t󠄁s󠄁 |
| `ots migrations dedupe-relationships` | d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁:󠄁 p󠄁e󠄁r󠄁-󠄁i󠄁n󠄁s󠄁t󠄁a󠄁n󠄁c󠄁e󠄁 r󠄁e󠄁l󠄁a󠄁t󠄁i󠄁o󠄁n󠄁s󠄁h󠄁i󠄁p󠄁 s󠄁o󠄁r󠄁t󠄁e󠄁d󠄁 s󠄁e󠄁t󠄁s󠄁 | `--run` | n󠄁o󠄁n󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | R󠄁e󠄁m󠄁o󠄁v󠄁e󠄁 J󠄁S󠄁O󠄁N󠄁-󠄁q󠄁u󠄁o󠄁t󠄁e󠄁d󠄁 d󠄁u󠄁p󠄁l󠄁i󠄁c󠄁a󠄁t󠄁e󠄁s󠄁 f󠄁r󠄁o󠄁m󠄁 p󠄁e󠄁r󠄁-󠄁i󠄁n󠄁s󠄁t󠄁a󠄁n󠄁c󠄁e󠄁 r󠄁e󠄁l󠄁a󠄁t󠄁i󠄁o󠄁n󠄁s󠄁h󠄁i󠄁p󠄁 s󠄁o󠄁r󠄁t󠄁e󠄁d󠄁 s󠄁e󠄁t󠄁s󠄁 |
| `ots migrations grant-probono-entitlements` | d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁:󠄁 e󠄁n󠄁t󠄁i󠄁t󠄁l󠄁e󠄁m󠄁e󠄁n󠄁t󠄁s󠄁 o󠄁n󠄁 l󠄁e󠄁g󠄁a󠄁c󠄁y󠄁 i󠄁d󠄁e󠄁n󠄁t󠄁i󠄁t󠄁y󠄁-󠄁p󠄁l󠄁a󠄁n󠄁 c󠄁u󠄁s󠄁t󠄁o󠄁m󠄁e󠄁r󠄁s󠄁 | `--run` | n󠄁o󠄁n󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | G󠄁r󠄁a󠄁n󠄁t󠄁 p󠄁r󠄁o󠄁-󠄁b󠄁o󠄁n󠄁o󠄁 e󠄁n󠄁t󠄁i󠄁t󠄁l󠄁e󠄁m󠄁e󠄁n󠄁t󠄁s󠄁 t󠄁o󠄁 l󠄁e󠄁g󠄁a󠄁c󠄁y󠄁 i󠄁d󠄁e󠄁n󠄁t󠄁i󠄁t󠄁y󠄁-󠄁p󠄁l󠄁a󠄁n󠄁 c󠄁u󠄁s󠄁t󠄁o󠄁m󠄁e󠄁r󠄁s󠄁 |

## S󠄁e󠄁s󠄁s󠄁i󠄁o󠄁n󠄁s󠄁

| C󠄁o󠄁m󠄁m󠄁a󠄁n󠄁d󠄁 | W󠄁r󠄁i󠄁t󠄁e󠄁s󠄁 | G󠄁a󠄁t󠄁e󠄁 | E󠄁x󠄁t󠄁e󠄁r󠄁n󠄁a󠄁l󠄁 e󠄁f󠄁f󠄁e󠄁c󠄁t󠄁s󠄁 | P󠄁r󠄁i󠄁v󠄁i󠄁l󠄁e󠄁g󠄁e󠄁s󠄁 | D󠄁e󠄁s󠄁c󠄁r󠄁i󠄁p󠄁t󠄁i󠄁o󠄁n󠄁 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `ots session` | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁 b󠄁o󠄁o󠄁t󠄁:󠄁 f󠄁i󠄁l󠄁e󠄁s󠄁 a󠄁n󠄁d󠄁 e󠄁n󠄁v󠄁i󠄁r󠄁o󠄁n󠄁m󠄁e󠄁n󠄁t󠄁 o󠄁n󠄁l󠄁y󠄁 | S󠄁e󠄁s󠄁s󠄁i󠄁o󠄁n󠄁 m󠄁a󠄁n󠄁a󠄁g󠄁e󠄁m󠄁e󠄁n󠄁t󠄁 a󠄁n󠄁d󠄁 i󠄁n󠄁s󠄁p󠄁e󠄁c󠄁t󠄁i󠄁o󠄁n󠄁 |
| `ots session delete` | d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁:󠄁 d󠄁e󠄁l󠄁e󠄁t󠄁e󠄁s󠄁 o󠄁n󠄁e󠄁 s󠄁e󠄁s󠄁s󠄁i󠄁o󠄁n󠄁 | p󠄁r󠄁o󠄁m󠄁p󠄁t󠄁,󠄁 o󠄁r󠄁 `--force` | n󠄁o󠄁n󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | D󠄁e󠄁l󠄁e󠄁t󠄁e󠄁 a󠄁 s󠄁e󠄁s󠄁s󠄁i󠄁o󠄁n󠄁 |
| `ots session inspect` | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | S󠄁h󠄁o󠄁w󠄁 d󠄁e󠄁t󠄁a󠄁i󠄁l󠄁e󠄁d󠄁 s󠄁e󠄁s󠄁s󠄁i󠄁o󠄁n󠄁 i󠄁n󠄁f󠄁o󠄁r󠄁m󠄁a󠄁t󠄁i󠄁o󠄁n󠄁 |
| `ots session list` | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | L󠄁i󠄁s󠄁t󠄁 a󠄁c󠄁t󠄁i󠄁v󠄁e󠄁 s󠄁e󠄁s󠄁s󠄁i󠄁o󠄁n󠄁s󠄁 |
| `ots session revoke-all` | d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁:󠄁 r󠄁e󠄁v󠄁o󠄁k󠄁e󠄁s󠄁 e󠄁v󠄁e󠄁r󠄁y󠄁 s󠄁e󠄁s󠄁s󠄁i󠄁o󠄁n󠄁 f󠄁o󠄁r󠄁 t󠄁h󠄁e󠄁 c󠄁u󠄁s󠄁t󠄁o󠄁m󠄁e󠄁r󠄁 | p󠄁r󠄁o󠄁m󠄁p󠄁t󠄁,󠄁 o󠄁r󠄁 `--force` | n󠄁o󠄁n󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | R󠄁e󠄁v󠄁o󠄁k󠄁e󠄁 e󠄁v󠄁e󠄁r󠄁y󠄁 s󠄁e󠄁s󠄁s󠄁i󠄁o󠄁n󠄁 f󠄁o󠄁r󠄁 a󠄁 c󠄁u󠄁s󠄁t󠄁o󠄁m󠄁e󠄁r󠄁 |
| `ots session search` | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | F󠄁i󠄁n󠄁d󠄁 s󠄁e󠄁s󠄁s󠄁i󠄁o󠄁n󠄁s󠄁 f󠄁o󠄁r󠄁 a󠄁 u󠄁s󠄁e󠄁r󠄁 |

A󠄁l󠄁i󠄁a󠄁s󠄁e󠄁s󠄁:󠄁 `sessions` i󠄁s󠄁 a󠄁n󠄁 a󠄁l󠄁i󠄁a󠄁s󠄁 o󠄁f󠄁 `ots session`.󠄁

## B󠄁a󠄁n󠄁n󠄁e󠄁r󠄁

| C󠄁o󠄁m󠄁m󠄁a󠄁n󠄁d󠄁 | W󠄁r󠄁i󠄁t󠄁e󠄁s󠄁 | G󠄁a󠄁t󠄁e󠄁 | E󠄁x󠄁t󠄁e󠄁r󠄁n󠄁a󠄁l󠄁 e󠄁f󠄁f󠄁e󠄁c󠄁t󠄁s󠄁 | P󠄁r󠄁i󠄁v󠄁i󠄁l󠄁e󠄁g󠄁e󠄁s󠄁 | D󠄁e󠄁s󠄁c󠄁r󠄁i󠄁p󠄁t󠄁i󠄁o󠄁n󠄁 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `ots banner` | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | M󠄁a󠄁n󠄁a󠄁g󠄁e󠄁 t󠄁h󠄁e󠄁 g󠄁l󠄁o󠄁b󠄁a󠄁l󠄁 b󠄁r󠄁o󠄁a󠄁d󠄁c󠄁a󠄁s󠄁t󠄁 b󠄁a󠄁n󠄁n󠄁e󠄁r󠄁 |
| `ots banner clear` | d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁:󠄁 d󠄁e󠄁l󠄁e󠄁t󠄁e󠄁s󠄁 t󠄁h󠄁e󠄁 `global_banner` k󠄁e󠄁y󠄁 | `--apply` | n󠄁o󠄁n󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | C󠄁l󠄁e󠄁a󠄁r󠄁 t󠄁h󠄁e󠄁 g󠄁l󠄁o󠄁b󠄁a󠄁l󠄁 b󠄁r󠄁o󠄁a󠄁d󠄁c󠄁a󠄁s󠄁t󠄁 b󠄁a󠄁n󠄁n󠄁e󠄁r󠄁 (󠄁d󠄁r󠄁y󠄁-󠄁r󠄁u󠄁n󠄁 b󠄁y󠄁 d󠄁e󠄁f󠄁a󠄁u󠄁l󠄁t󠄁)󠄁 |
| `ots banner set` | d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁:󠄁 t󠄁h󠄁e󠄁 `global_banner` k󠄁e󠄁y󠄁 | `--apply`,󠄁 a󠄁n󠄁d󠄁 `-f` i󠄁s󠄁 n󠄁o󠄁t󠄁 a󠄁n󠄁 a󠄁l󠄁i󠄁a󠄁s󠄁 | n󠄁o󠄁n󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | S󠄁e󠄁t󠄁 t󠄁h󠄁e󠄁 g󠄁l󠄁o󠄁b󠄁a󠄁l󠄁 b󠄁r󠄁o󠄁a󠄁d󠄁c󠄁a󠄁s󠄁t󠄁 b󠄁a󠄁n󠄁n󠄁e󠄁r󠄁 (󠄁d󠄁r󠄁y󠄁-󠄁r󠄁u󠄁n󠄁 b󠄁y󠄁 d󠄁e󠄁f󠄁a󠄁u󠄁l󠄁t󠄁)󠄁 |
| `ots banner show` | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | S󠄁h󠄁o󠄁w󠄁 t󠄁h󠄁e󠄁 c󠄁u󠄁r󠄁r󠄁e󠄁n󠄁t󠄁 g󠄁l󠄁o󠄁b󠄁a󠄁l󠄁 b󠄁r󠄁o󠄁a󠄁d󠄁c󠄁a󠄁s󠄁t󠄁 b󠄁a󠄁n󠄁n󠄁e󠄁r󠄁 |

## H󠄁o󠄁u󠄁s󠄁e󠄁k󠄁e󠄁e󠄁p󠄁i󠄁n󠄁g󠄁

| C󠄁o󠄁m󠄁m󠄁a󠄁n󠄁d󠄁 | W󠄁r󠄁i󠄁t󠄁e󠄁s󠄁 | G󠄁a󠄁t󠄁e󠄁 | E󠄁x󠄁t󠄁e󠄁r󠄁n󠄁a󠄁l󠄁 e󠄁f󠄁f󠄁e󠄁c󠄁t󠄁s󠄁 | P󠄁r󠄁i󠄁v󠄁i󠄁l󠄁e󠄁g󠄁e󠄁s󠄁 | D󠄁e󠄁s󠄁c󠄁r󠄁i󠄁p󠄁t󠄁i󠄁o󠄁n󠄁 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `ots housekeeping` | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | R󠄁u󠄁n󠄁 F󠄁a󠄁m󠄁i󠄁l󠄁i󠄁a󠄁 m󠄁o󠄁d󠄁e󠄁l󠄁 h󠄁o󠄁u󠄁s󠄁e󠄁k󠄁e󠄁e󠄁p󠄁i󠄁n󠄁g󠄁 c󠄁h󠄁o󠄁r󠄁e󠄁s󠄁 |
| `ots housekeeping list` | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | L󠄁i󠄁s󠄁t󠄁 m󠄁o󠄁d󠄁e󠄁l󠄁s󠄁 w󠄁i󠄁t󠄁h󠄁 r󠄁e󠄁g󠄁i󠄁s󠄁t󠄁e󠄁r󠄁e󠄁d󠄁 h󠄁o󠄁u󠄁s󠄁e󠄁k󠄁e󠄁e󠄁p󠄁i󠄁n󠄁g󠄁 c󠄁h󠄁o󠄁r󠄁e󠄁s󠄁 |
| `ots housekeeping run` | d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁:󠄁 w󠄁h󠄁a󠄁t󠄁e󠄁v󠄁e󠄁r󠄁 t󠄁h󠄁e󠄁 r󠄁e󠄁g󠄁i󠄁s󠄁t󠄁e󠄁r󠄁e󠄁d󠄁 c󠄁h󠄁o󠄁r󠄁e󠄁s󠄁 p󠄁e󠄁r󠄁s󠄁i󠄁s󠄁t󠄁 | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | R󠄁u󠄁n󠄁 h󠄁o󠄁u󠄁s󠄁e󠄁k󠄁e󠄁e󠄁p󠄁i󠄁n󠄁g󠄁 c󠄁h󠄁o󠄁r󠄁e󠄁s󠄁 f󠄁o󠄁r󠄁 a󠄁 m󠄁o󠄁d󠄁e󠄁l󠄁 |

## R󠄁a󠄁t󠄁e󠄁 l󠄁i󠄁m󠄁i󠄁t󠄁s󠄁

| C󠄁o󠄁m󠄁m󠄁a󠄁n󠄁d󠄁 | W󠄁r󠄁i󠄁t󠄁e󠄁s󠄁 | G󠄁a󠄁t󠄁e󠄁 | E󠄁x󠄁t󠄁e󠄁r󠄁n󠄁a󠄁l󠄁 e󠄁f󠄁f󠄁e󠄁c󠄁t󠄁s󠄁 | P󠄁r󠄁i󠄁v󠄁i󠄁l󠄁e󠄁g󠄁e󠄁s󠄁 | D󠄁e󠄁s󠄁c󠄁r󠄁i󠄁p󠄁t󠄁i󠄁o󠄁n󠄁 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `ots ratelimit` | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | L󠄁i󠄁s󠄁t󠄁 k󠄁n󠄁o󠄁w󠄁n󠄁 r󠄁a󠄁t󠄁e󠄁 l󠄁i󠄁m󠄁i󠄁t󠄁e󠄁r󠄁s󠄁 a󠄁n󠄁d󠄁 t󠄁h󠄁e󠄁i󠄁r󠄁 s󠄁u󠄁b󠄁j󠄁e󠄁c󠄁t󠄁 t󠄁y󠄁p󠄁e󠄁s󠄁 |
| `ots ratelimit keys` | n󠄁o󠄁n󠄁e󠄁;󠄁 p󠄁r󠄁i󠄁n󠄁t󠄁s󠄁 t󠄁h󠄁e󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 c󠄁o󠄁m󠄁m󠄁a󠄁n󠄁d󠄁s󠄁 a󠄁n󠄁 o󠄁p󠄁e󠄁r󠄁a󠄁t󠄁o󠄁r󠄁 c󠄁a󠄁n󠄁 r󠄁u󠄁n󠄁 | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | E󠄁m󠄁i󠄁t󠄁 v󠄁a󠄁l󠄁k󠄁e󠄁y󠄁-󠄁c󠄁l󠄁i󠄁 c󠄁o󠄁m󠄁m󠄁a󠄁n󠄁d󠄁s󠄁 t󠄁o󠄁 i󠄁n󠄁s󠄁p󠄁e󠄁c󠄁t󠄁 a󠄁n󠄁d󠄁 c󠄁l󠄁e󠄁a󠄁r󠄁 a󠄁 r󠄁a󠄁t󠄁e󠄁-󠄁l󠄁i󠄁m󠄁i󠄁t󠄁 e󠄁n󠄁t󠄁r󠄁y󠄁 |

## N󠄁o󠄁t󠄁i󠄁f󠄁i󠄁c󠄁a󠄁t󠄁i󠄁o󠄁n󠄁s󠄁

| C󠄁o󠄁m󠄁m󠄁a󠄁n󠄁d󠄁 | W󠄁r󠄁i󠄁t󠄁e󠄁s󠄁 | G󠄁a󠄁t󠄁e󠄁 | E󠄁x󠄁t󠄁e󠄁r󠄁n󠄁a󠄁l󠄁 e󠄁f󠄁f󠄁e󠄁c󠄁t󠄁s󠄁 | P󠄁r󠄁i󠄁v󠄁i󠄁l󠄁e󠄁g󠄁e󠄁s󠄁 | D󠄁e󠄁s󠄁c󠄁r󠄁i󠄁p󠄁t󠄁i󠄁o󠄁n󠄁 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `ots notifications deliveries` | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | L󠄁i󠄁s󠄁t󠄁 d󠄁e󠄁l󠄁i󠄁v󠄁e󠄁r󠄁y󠄁 e󠄁v󠄁e󠄁n󠄁t󠄁s󠄁 f󠄁o󠄁r󠄁 o󠄁u󠄁t󠄁b󠄁o󠄁u󠄁n󠄁d󠄁 e󠄁m󠄁a󠄁i󠄁l󠄁 a󠄁n󠄁d󠄁 w󠄁e󠄁b󠄁h󠄁o󠄁o󠄁k󠄁 n󠄁o󠄁t󠄁i󠄁f󠄁i󠄁c󠄁a󠄁t󠄁i󠄁o󠄁n󠄁s󠄁 |

## S󠄁i󠄁n󠄁g󠄁l󠄁e󠄁 s󠄁i󠄁g󠄁n󠄁-󠄁o󠄁n󠄁

| C󠄁o󠄁m󠄁m󠄁a󠄁n󠄁d󠄁 | W󠄁r󠄁i󠄁t󠄁e󠄁s󠄁 | G󠄁a󠄁t󠄁e󠄁 | E󠄁x󠄁t󠄁e󠄁r󠄁n󠄁a󠄁l󠄁 e󠄁f󠄁f󠄁e󠄁c󠄁t󠄁s󠄁 | P󠄁r󠄁i󠄁v󠄁i󠄁l󠄁e󠄁g󠄁e󠄁s󠄁 | D󠄁e󠄁s󠄁c󠄁r󠄁i󠄁p󠄁t󠄁i󠄁o󠄁n󠄁 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `ots sso` | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | M󠄁a󠄁i󠄁n󠄁t󠄁a󠄁i󠄁n󠄁 S󠄁S󠄁O󠄁 i󠄁d󠄁e󠄁n󠄁t󠄁i󠄁t󠄁y󠄁 r󠄁e󠄁c󠄁o󠄁r󠄁d󠄁s󠄁 (󠄁i󠄁s󠄁s󠄁u󠄁e󠄁r󠄁 b󠄁a󠄁c󠄁k󠄁f󠄁i󠄁l󠄁l󠄁)󠄁 |
| `ots sso backfill-issuer` | S󠄁S󠄁O󠄁 i󠄁d󠄁e󠄁n󠄁t󠄁i󠄁t󠄁y󠄁 r󠄁e󠄁c󠄁o󠄁r󠄁d󠄁s󠄁 | `--confirm` | n󠄁o󠄁t󠄁 d󠄁e󠄁t󠄁e󠄁r󠄁m󠄁i󠄁n󠄁e󠄁d󠄁 f󠄁r󠄁o󠄁m󠄁 s󠄁o󠄁u󠄁r󠄁c󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁,󠄁 a󠄁u󠄁t󠄁h󠄁 d󠄁a󠄁t󠄁a󠄁b󠄁a󠄁s󠄁e󠄁 i󠄁n󠄁 F󠄁u󠄁l󠄁l󠄁 m󠄁o󠄁d󠄁e󠄁 | B󠄁a󠄁c󠄁k󠄁f󠄁i󠄁l󠄁l󠄁 t󠄁h󠄁e󠄁 a󠄁u󠄁t󠄁h󠄁o󠄁r󠄁i󠄁t󠄁a󠄁t󠄁i󠄁v󠄁e󠄁 i󠄁s󠄁s󠄁u󠄁e󠄁r󠄁 o󠄁n󠄁t󠄁o󠄁 l󠄁e󠄁g󠄁a󠄁c󠄁y󠄁 t󠄁e󠄁n󠄁a󠄁n󠄁t󠄁 S󠄁S󠄁O󠄁 i󠄁d󠄁e󠄁n󠄁t󠄁i󠄁t󠄁i󠄁e󠄁s󠄁 |

## D󠄁i󠄁a󠄁g󠄁n󠄁o󠄁s󠄁t󠄁i󠄁c󠄁s󠄁

| C󠄁o󠄁m󠄁m󠄁a󠄁n󠄁d󠄁 | W󠄁r󠄁i󠄁t󠄁e󠄁s󠄁 | G󠄁a󠄁t󠄁e󠄁 | E󠄁x󠄁t󠄁e󠄁r󠄁n󠄁a󠄁l󠄁 e󠄁f󠄁f󠄁e󠄁c󠄁t󠄁s󠄁 | P󠄁r󠄁i󠄁v󠄁i󠄁l󠄁e󠄁g󠄁e󠄁s󠄁 | D󠄁e󠄁s󠄁c󠄁r󠄁i󠄁p󠄁t󠄁i󠄁o󠄁n󠄁 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `ots diagnostics sentry check-dsn` | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | p󠄁r󠄁o󠄁b󠄁e󠄁s󠄁 t󠄁h󠄁e󠄁 S󠄁e󠄁n󠄁t󠄁r󠄁y󠄁 h󠄁o󠄁s󠄁t󠄁 n󠄁a󠄁m󠄁e󠄁d󠄁 i󠄁n󠄁 t󠄁h󠄁e󠄁 D󠄁S󠄁N󠄁 | n󠄁o󠄁 b󠄁o󠄁o󠄁t󠄁:󠄁 f󠄁i󠄁l󠄁e󠄁s󠄁 a󠄁n󠄁d󠄁 e󠄁n󠄁v󠄁i󠄁r󠄁o󠄁n󠄁m󠄁e󠄁n󠄁t󠄁 o󠄁n󠄁l󠄁y󠄁 | P󠄁a󠄁r󠄁s󠄁e󠄁 a󠄁n󠄁d󠄁 p󠄁r󠄁o󠄁b󠄁e󠄁 a󠄁 S󠄁e󠄁n󠄁t󠄁r󠄁y󠄁 D󠄁S󠄁N󠄁 f󠄁o󠄁r󠄁 v󠄁a󠄁l󠄁i󠄁d󠄁i󠄁t󠄁y󠄁 a󠄁n󠄁d󠄁 c󠄁o󠄁n󠄁n󠄁e󠄁c󠄁t󠄁i󠄁v󠄁i󠄁t󠄁y󠄁 |
| `ots diagnostics sentry doctor` | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | `--send-event` c󠄁a󠄁p󠄁t󠄁u󠄁r󠄁e󠄁s󠄁 a󠄁 t󠄁e󠄁s󠄁t󠄁 e󠄁x󠄁c󠄁e󠄁p󠄁t󠄁i󠄁o󠄁n󠄁 t󠄁h󠄁r󠄁o󠄁u󠄁g󠄁h󠄁 t󠄁h󠄁e󠄁 S󠄁D󠄁K󠄁 | n󠄁o󠄁 b󠄁o󠄁o󠄁t󠄁:󠄁 f󠄁i󠄁l󠄁e󠄁s󠄁 a󠄁n󠄁d󠄁 e󠄁n󠄁v󠄁i󠄁r󠄁o󠄁n󠄁m󠄁e󠄁n󠄁t󠄁 o󠄁n󠄁l󠄁y󠄁 | R󠄁e󠄁p󠄁o󠄁r󠄁t󠄁 S󠄁e󠄁n󠄁t󠄁r󠄁y󠄁 c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁 a󠄁n󠄁d󠄁 c󠄁o󠄁n󠄁n󠄁e󠄁c󠄁t󠄁i󠄁v󠄁i󠄁t󠄁y󠄁 h󠄁e󠄁a󠄁l󠄁t󠄁h󠄁 |
| `ots diagnostics sentry send-test-event` | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | s󠄁e󠄁n󠄁d󠄁s󠄁 a󠄁n󠄁 e󠄁v󠄁e󠄁n󠄁t󠄁 t󠄁o󠄁 o󠄁n󠄁e󠄁 o󠄁r󠄁 b󠄁o󠄁t󠄁h󠄁 S󠄁e󠄁n󠄁t󠄁r󠄁y󠄁 p󠄁r󠄁o󠄁j󠄁e󠄁c󠄁t󠄁s󠄁 | n󠄁o󠄁 b󠄁o󠄁o󠄁t󠄁:󠄁 f󠄁i󠄁l󠄁e󠄁s󠄁 a󠄁n󠄁d󠄁 e󠄁n󠄁v󠄁i󠄁r󠄁o󠄁n󠄁m󠄁e󠄁n󠄁t󠄁 o󠄁n󠄁l󠄁y󠄁 | S󠄁e󠄁n󠄁d󠄁 a󠄁 t󠄁e󠄁s󠄁t󠄁 e󠄁v󠄁e󠄁n󠄁t󠄁 t󠄁o󠄁 S󠄁e󠄁n󠄁t󠄁r󠄁y󠄁 t󠄁o󠄁 v󠄁e󠄁r󠄁i󠄁f󠄁y󠄁 e󠄁n󠄁d󠄁-󠄁t󠄁o󠄁-󠄁e󠄁n󠄁d󠄁 d󠄁e󠄁l󠄁i󠄁v󠄁e󠄁r󠄁y󠄁 |

## B󠄁i󠄁l󠄁l󠄁i󠄁n󠄁g󠄁

| C󠄁o󠄁m󠄁m󠄁a󠄁n󠄁d󠄁 | W󠄁r󠄁i󠄁t󠄁e󠄁s󠄁 | G󠄁a󠄁t󠄁e󠄁 | E󠄁x󠄁t󠄁e󠄁r󠄁n󠄁a󠄁l󠄁 e󠄁f󠄁f󠄁e󠄁c󠄁t󠄁s󠄁 | P󠄁r󠄁i󠄁v󠄁i󠄁l󠄁e󠄁g󠄁e󠄁s󠄁 | D󠄁e󠄁s󠄁c󠄁r󠄁i󠄁p󠄁t󠄁i󠄁o󠄁n󠄁 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `ots billing` | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | M󠄁a󠄁n󠄁a󠄁g󠄁e󠄁 b󠄁i󠄁l󠄁l󠄁i󠄁n󠄁g󠄁,󠄁 p󠄁r󠄁o󠄁d󠄁u󠄁c󠄁t󠄁s󠄁,󠄁 a󠄁n󠄁d󠄁 p󠄁r󠄁i󠄁c󠄁e󠄁s󠄁 |
| `ots billing catalog` | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | M󠄁a󠄁n󠄁a󠄁g󠄁e󠄁 t󠄁h󠄁e󠄁 b󠄁i󠄁l󠄁l󠄁i󠄁n󠄁g󠄁 p󠄁l󠄁a󠄁n󠄁 c󠄁a󠄁t󠄁a󠄁l󠄁o󠄁g󠄁 |
| `ots billing catalog drift` | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | C󠄁o󠄁m󠄁p󠄁a󠄁r󠄁e󠄁 t󠄁h󠄁e󠄁 c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁e󠄁d󠄁 p󠄁l󠄁a󠄁n󠄁 c󠄁a󠄁t󠄁a󠄁l󠄁o󠄁g󠄁 a󠄁g󠄁a󠄁i󠄁n󠄁s󠄁t󠄁 t󠄁h󠄁e󠄁 l󠄁i󠄁v󠄁e󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 c󠄁a󠄁c󠄁h󠄁e󠄁 |
| `ots billing catalog generate-docs` | a󠄁 M󠄁a󠄁r󠄁k󠄁d󠄁o󠄁w󠄁n󠄁 f󠄁i󠄁l󠄁e󠄁 a󠄁t󠄁 `--output` | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | G󠄁e󠄁n󠄁e󠄁r󠄁a󠄁t󠄁e󠄁 p󠄁l󠄁a󠄁n󠄁-󠄁d󠄁e󠄁f󠄁i󠄁n󠄁i󠄁t󠄁i󠄁o󠄁n󠄁s󠄁.󠄁m󠄁d󠄁 f󠄁r󠄁o󠄁m󠄁 b󠄁i󠄁l󠄁l󠄁i󠄁n󠄁g󠄁.󠄁y󠄁a󠄁m󠄁l󠄁 |
| `ots billing catalog pull` | d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁:󠄁 t󠄁h󠄁e󠄁 p󠄁l󠄁a󠄁n󠄁 c󠄁a󠄁c󠄁h󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | r󠄁e󠄁a󠄁d󠄁s󠄁 p󠄁r󠄁o󠄁d󠄁u󠄁c󠄁t󠄁s󠄁 a󠄁n󠄁d󠄁 p󠄁r󠄁i󠄁c󠄁e󠄁s󠄁 f󠄁r󠄁o󠄁m󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁,󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 k󠄁e󠄁y󠄁 | P󠄁u󠄁l󠄁l󠄁 p󠄁r󠄁o󠄁d󠄁u󠄁c󠄁t󠄁s󠄁 a󠄁n󠄁d󠄁 p󠄁r󠄁i󠄁c󠄁e󠄁s󠄁 f󠄁r󠄁o󠄁m󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 t󠄁o󠄁 R󠄁e󠄁d󠄁i󠄁s󠄁 c󠄁a󠄁c󠄁h󠄁e󠄁 |
| `ots billing catalog push` | S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 p󠄁r󠄁o󠄁d󠄁u󠄁c󠄁t󠄁s󠄁 a󠄁n󠄁d󠄁 p󠄁r󠄁i󠄁c󠄁e󠄁s󠄁 | p󠄁r󠄁o󠄁m󠄁p󠄁t󠄁,󠄁 o󠄁r󠄁 `--force`;󠄁 `--dry-run` p󠄁r󠄁e󠄁v󠄁i󠄁e󠄁w󠄁s󠄁 | c󠄁r󠄁e󠄁a󠄁t󠄁e󠄁s󠄁 a󠄁n󠄁d󠄁 u󠄁p󠄁d󠄁a󠄁t󠄁e󠄁s󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 p󠄁r󠄁o󠄁d󠄁u󠄁c󠄁t󠄁s󠄁 a󠄁n󠄁d󠄁 p󠄁r󠄁i󠄁c󠄁e󠄁s󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁,󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 k󠄁e󠄁y󠄁 | P󠄁u󠄁s󠄁h󠄁 b󠄁i󠄁l󠄁l󠄁i󠄁n󠄁g󠄁 c󠄁a󠄁t󠄁a󠄁l󠄁o󠄁g󠄁 t󠄁o󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 (󠄁c󠄁r󠄁e󠄁a󠄁t󠄁e󠄁/󠄁u󠄁p󠄁d󠄁a󠄁t󠄁e󠄁 p󠄁r󠄁o󠄁d󠄁u󠄁c󠄁t󠄁s󠄁)󠄁 |
| `ots billing catalog sync` | S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 p󠄁r󠄁o󠄁d󠄁u󠄁c󠄁t󠄁s󠄁 a󠄁n󠄁d󠄁 p󠄁r󠄁i󠄁c󠄁e󠄁s󠄁,󠄁 t󠄁h󠄁e󠄁n󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁:󠄁 t󠄁h󠄁e󠄁 p󠄁l󠄁a󠄁n󠄁 c󠄁a󠄁c󠄁h󠄁e󠄁 a󠄁n󠄁d󠄁 m󠄁a󠄁t󠄁e󠄁r󠄁i󠄁a󠄁l󠄁i󠄁z󠄁e󠄁d󠄁 p󠄁l󠄁a󠄁n󠄁s󠄁 | p󠄁r󠄁o󠄁m󠄁p󠄁t󠄁,󠄁 o󠄁r󠄁 `--force`;󠄁 `--dry-run` p󠄁r󠄁e󠄁v󠄁i󠄁e󠄁w󠄁s󠄁 | p󠄁u󠄁s󠄁h󠄁e󠄁s󠄁 t󠄁o󠄁 a󠄁n󠄁d󠄁 p󠄁u󠄁l󠄁l󠄁s󠄁 f󠄁r󠄁o󠄁m󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁,󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 k󠄁e󠄁y󠄁 | F󠄁u󠄁l󠄁l󠄁 c󠄁a󠄁t󠄁a󠄁l󠄁o󠄁g󠄁 s󠄁y󠄁n󠄁c󠄁:󠄁 p󠄁u󠄁s󠄁h󠄁 t󠄁o󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁,󠄁 p󠄁u󠄁l󠄁l󠄁 t󠄁o󠄁 c󠄁a󠄁c󠄁h󠄁e󠄁,󠄁 m󠄁a󠄁t󠄁e󠄁r󠄁i󠄁a󠄁l󠄁i󠄁z󠄁e󠄁 p󠄁l󠄁a󠄁n󠄁s󠄁 |
| `ots billing catalog validate` | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | V󠄁a󠄁l󠄁i󠄁d󠄁a󠄁t󠄁e󠄁 p󠄁l󠄁a󠄁n󠄁 c󠄁a󠄁t󠄁a󠄁l󠄁o󠄁g󠄁 Y󠄁A󠄁M󠄁L󠄁 s󠄁t󠄁r󠄁u󠄁c󠄁t󠄁u󠄁r󠄁e󠄁 (󠄁s󠄁c󠄁h󠄁e󠄁m󠄁a󠄁 v󠄁a󠄁l󠄁i󠄁d󠄁a󠄁t󠄁i󠄁o󠄁n󠄁 o󠄁n󠄁l󠄁y󠄁)󠄁 |
| `ots billing checkout-links` | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | M󠄁a󠄁n󠄁a󠄁g󠄁e󠄁 s󠄁u󠄁p󠄁p󠄁o󠄁r󠄁t󠄁-󠄁i󠄁s󠄁s󠄁u󠄁e󠄁d󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 C󠄁h󠄁e󠄁c󠄁k󠄁o󠄁u󠄁t󠄁 l󠄁i󠄁n󠄁k󠄁s󠄁 |
| `ots billing checkout-links create` | a󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 C󠄁h󠄁e󠄁c󠄁k󠄁o󠄁u󠄁t󠄁 s󠄁e󠄁s󠄁s󠄁i󠄁o󠄁n󠄁 | `--dry-run` r󠄁e󠄁s󠄁o󠄁l󠄁v󠄁e󠄁s󠄁 w󠄁i󠄁t󠄁h󠄁o󠄁u󠄁t󠄁 c󠄁a󠄁l󠄁l󠄁i󠄁n󠄁g󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 | c󠄁r󠄁e󠄁a󠄁t󠄁e󠄁s󠄁 a󠄁 C󠄁h󠄁e󠄁c󠄁k󠄁o󠄁u󠄁t󠄁 s󠄁e󠄁s󠄁s󠄁i󠄁o󠄁n󠄁 a󠄁t󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁,󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 k󠄁e󠄁y󠄁 | C󠄁r󠄁e󠄁a󠄁t󠄁e󠄁 a󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 C󠄁h󠄁e󠄁c󠄁k󠄁o󠄁u󠄁t󠄁 l󠄁i󠄁n󠄁k󠄁 f󠄁o󠄁r󠄁 a󠄁 s󠄁p󠄁e󠄁c󠄁i󠄁f󠄁i󠄁c󠄁 c󠄁u󠄁s󠄁t󠄁o󠄁m󠄁e󠄁r󠄁 |
| `ots billing config` | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | D󠄁i󠄁s󠄁p󠄁l󠄁a󠄁y󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁 i󠄁n󠄁f󠄁o󠄁r󠄁m󠄁a󠄁t󠄁i󠄁o󠄁n󠄁 (󠄁s󠄁e󠄁c󠄁u󠄁r󠄁e󠄁l󠄁y󠄁 m󠄁a󠄁s󠄁k󠄁e󠄁d󠄁)󠄁 |
| `ots billing coupon` | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | I󠄁n󠄁s󠄁p󠄁e󠄁c󠄁t󠄁 o󠄁r󠄁 v󠄁a󠄁l󠄁i󠄁d󠄁a󠄁t󠄁e󠄁 a󠄁 s󠄁i󠄁n󠄁g󠄁l󠄁e󠄁 c󠄁o󠄁u󠄁p󠄁o󠄁n󠄁 /󠄁 p󠄁r󠄁o󠄁m󠄁o󠄁t󠄁i󠄁o󠄁n󠄁 c󠄁o󠄁d󠄁e󠄁 |
| `ots billing coupon validate` | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | r󠄁e󠄁a󠄁d󠄁s󠄁 t󠄁h󠄁e󠄁 c󠄁o󠄁u󠄁p󠄁o󠄁n󠄁 f󠄁r󠄁o󠄁m󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁,󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 k󠄁e󠄁y󠄁 | C󠄁h󠄁e󠄁c󠄁k󠄁 w󠄁h󠄁e󠄁t󠄁h󠄁e󠄁r󠄁 a󠄁 c󠄁o󠄁u󠄁p󠄁o󠄁n󠄁 o󠄁r󠄁 p󠄁r󠄁o󠄁m󠄁o󠄁t󠄁i󠄁o󠄁n󠄁 c󠄁o󠄁d󠄁e󠄁 i󠄁s󠄁 c󠄁u󠄁r󠄁r󠄁e󠄁n󠄁t󠄁l󠄁y󠄁 v󠄁a󠄁l󠄁i󠄁d󠄁 |
| `ots billing coupons` | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | r󠄁e󠄁a󠄁d󠄁s󠄁 c󠄁o󠄁u󠄁p󠄁o󠄁n󠄁s󠄁 f󠄁r󠄁o󠄁m󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁,󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 k󠄁e󠄁y󠄁 | L󠄁i󠄁s󠄁t󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 c󠄁o󠄁u󠄁p󠄁o󠄁n󠄁s󠄁 a󠄁n󠄁d󠄁 t󠄁h󠄁e󠄁i󠄁r󠄁 p󠄁r󠄁o󠄁m󠄁o󠄁t󠄁i󠄁o󠄁n󠄁 c󠄁o󠄁d󠄁e󠄁s󠄁 |
| `ots billing customers` | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | r󠄁e󠄁a󠄁d󠄁s󠄁 c󠄁u󠄁s󠄁t󠄁o󠄁m󠄁e󠄁r󠄁s󠄁 f󠄁r󠄁o󠄁m󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁,󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 k󠄁e󠄁y󠄁 | L󠄁i󠄁s󠄁t󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 c󠄁u󠄁s󠄁t󠄁o󠄁m󠄁e󠄁r󠄁s󠄁 |
| `ots billing customers create` | a󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 c󠄁u󠄁s󠄁t󠄁o󠄁m󠄁e󠄁r󠄁 | p󠄁r󠄁o󠄁m󠄁p󠄁t󠄁 i󠄁n󠄁 `--interactive` m󠄁o󠄁d󠄁e󠄁,󠄁 o󠄁t󠄁h󠄁e󠄁r󠄁w󠄁i󠄁s󠄁e󠄁 n󠄁o󠄁n󠄁e󠄁 | c󠄁r󠄁e󠄁a󠄁t󠄁e󠄁s󠄁 a󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 c󠄁u󠄁s󠄁t󠄁o󠄁m󠄁e󠄁r󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁,󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 k󠄁e󠄁y󠄁 | C󠄁r󠄁e󠄁a󠄁t󠄁e󠄁 a󠄁 n󠄁e󠄁w󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 c󠄁u󠄁s󠄁t󠄁o󠄁m󠄁e󠄁r󠄁 |
| `ots billing customers delete` | d󠄁e󠄁l󠄁e󠄁t󠄁e󠄁s󠄁 a󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 c󠄁u󠄁s󠄁t󠄁o󠄁m󠄁e󠄁r󠄁 | p󠄁r󠄁o󠄁m󠄁p󠄁t󠄁,󠄁 o󠄁r󠄁 `--yes` | d󠄁e󠄁l󠄁e󠄁t󠄁e󠄁s󠄁 t󠄁h󠄁e󠄁 c󠄁u󠄁s󠄁t󠄁o󠄁m󠄁e󠄁r󠄁 a󠄁t󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁,󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 k󠄁e󠄁y󠄁 | D󠄁e󠄁l󠄁e󠄁t󠄁e󠄁 a󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 c󠄁u󠄁s󠄁t󠄁o󠄁m󠄁e󠄁r󠄁 |
| `ots billing customers show` | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | r󠄁e󠄁a󠄁d󠄁s󠄁 t󠄁h󠄁e󠄁 c󠄁u󠄁s󠄁t󠄁o󠄁m󠄁e󠄁r󠄁 f󠄁r󠄁o󠄁m󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁,󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 k󠄁e󠄁y󠄁 | S󠄁h󠄁o󠄁w󠄁 d󠄁e󠄁t󠄁a󠄁i󠄁l󠄁e󠄁d󠄁 c󠄁u󠄁s󠄁t󠄁o󠄁m󠄁e󠄁r󠄁 i󠄁n󠄁f󠄁o󠄁r󠄁m󠄁a󠄁t󠄁i󠄁o󠄁n󠄁 |
| `ots billing diagnose` | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | D󠄁i󠄁a󠄁g󠄁n󠄁o󠄁s󠄁e󠄁 e󠄁n󠄁t󠄁i󠄁t󠄁l󠄁e󠄁m󠄁e󠄁n󠄁t󠄁 r󠄁e󠄁s󠄁o󠄁l󠄁u󠄁t󠄁i󠄁o󠄁n󠄁 f󠄁o󠄁r󠄁 a󠄁 u󠄁s󠄁e󠄁r󠄁 o󠄁r󠄁 o󠄁r󠄁g󠄁a󠄁n󠄁i󠄁z󠄁a󠄁t󠄁i󠄁o󠄁n󠄁 |
| `ots billing events` | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | r󠄁e󠄁a󠄁d󠄁s󠄁 e󠄁v󠄁e󠄁n󠄁t󠄁s󠄁 f󠄁r󠄁o󠄁m󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁,󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 k󠄁e󠄁y󠄁 | V󠄁i󠄁e󠄁w󠄁 r󠄁e󠄁c󠄁e󠄁n󠄁t󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 e󠄁v󠄁e󠄁n󠄁t󠄁s󠄁 |
| `ots billing invoices` | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | r󠄁e󠄁a󠄁d󠄁s󠄁 i󠄁n󠄁v󠄁o󠄁i󠄁c󠄁e󠄁s󠄁 f󠄁r󠄁o󠄁m󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁,󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 k󠄁e󠄁y󠄁 | L󠄁i󠄁s󠄁t󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 i󠄁n󠄁v󠄁o󠄁i󠄁c󠄁e󠄁s󠄁 |
| `ots billing orgs` | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | I󠄁n󠄁s󠄁p󠄁e󠄁c󠄁t󠄁 o󠄁r󠄁g󠄁a󠄁n󠄁i󠄁z󠄁a󠄁t󠄁i󠄁o󠄁n󠄁 b󠄁i󠄁l󠄁l󠄁i󠄁n󠄁g󠄁 s󠄁t󠄁a󠄁t󠄁e󠄁 |
| `ots billing orgs stripe` | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | L󠄁i󠄁s󠄁t󠄁 o󠄁r󠄁g󠄁a󠄁n󠄁i󠄁z󠄁a󠄁t󠄁i󠄁o󠄁n󠄁s󠄁 t󠄁h󠄁a󠄁t󠄁 h󠄁a󠄁v󠄁e󠄁 a󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 c󠄁u󠄁s󠄁t󠄁o󠄁m󠄁e󠄁r󠄁 i󠄁d󠄁 (󠄁i󠄁n󠄁d󠄁e󠄁x󠄁-󠄁b󠄁a󠄁c󠄁k󠄁e󠄁d󠄁)󠄁 |
| `ots billing orgs validate` | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | D󠄁e󠄁t󠄁e󠄁c󠄁t󠄁 o󠄁r󠄁g󠄁s󠄁 w󠄁h󠄁o󠄁s󠄁e󠄁 p󠄁l󠄁a󠄁n󠄁i󠄁d󠄁 d󠄁o󠄁e󠄁s󠄁n󠄁'󠄁t󠄁 r󠄁e󠄁s󠄁o󠄁l󠄁v󠄁e󠄁 i󠄁n󠄁 c󠄁a󠄁c󠄁h󠄁e󠄁 o󠄁r󠄁 c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁 |
| `ots billing payment-methods` | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | M󠄁a󠄁n󠄁a󠄁g󠄁e󠄁 c󠄁u󠄁s󠄁t󠄁o󠄁m󠄁e󠄁r󠄁 p󠄁a󠄁y󠄁m󠄁e󠄁n󠄁t󠄁 m󠄁e󠄁t󠄁h󠄁o󠄁d󠄁s󠄁 |
| `ots billing payment-methods set-default` | t󠄁h󠄁e󠄁 d󠄁e󠄁f󠄁a󠄁u󠄁l󠄁t󠄁 p󠄁a󠄁y󠄁m󠄁e󠄁n󠄁t󠄁 m󠄁e󠄁t󠄁h󠄁o󠄁d󠄁 o󠄁n󠄁 a󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 c󠄁u󠄁s󠄁t󠄁o󠄁m󠄁e󠄁r󠄁 | p󠄁r󠄁o󠄁m󠄁p󠄁t󠄁 | u󠄁p󠄁d󠄁a󠄁t󠄁e󠄁s󠄁 t󠄁h󠄁e󠄁 c󠄁u󠄁s󠄁t󠄁o󠄁m󠄁e󠄁r󠄁 a󠄁t󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁,󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 k󠄁e󠄁y󠄁 | S󠄁e󠄁t󠄁 d󠄁e󠄁f󠄁a󠄁u󠄁l󠄁t󠄁 p󠄁a󠄁y󠄁m󠄁e󠄁n󠄁t󠄁 m󠄁e󠄁t󠄁h󠄁o󠄁d󠄁 |
| `ots billing plans` | d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁:󠄁 r󠄁e󠄁f󠄁r󠄁e󠄁s󠄁h󠄁e󠄁s󠄁 t󠄁h󠄁e󠄁 p󠄁l󠄁a󠄁n󠄁 c󠄁a󠄁c󠄁h󠄁e󠄁 w󠄁i󠄁t󠄁h󠄁 `--refresh` | `--refresh` | `--refresh` r󠄁e󠄁a󠄁d󠄁s󠄁 f󠄁r󠄁o󠄁m󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | L󠄁i󠄁s󠄁t󠄁 p󠄁r󠄁o󠄁d󠄁u󠄁c󠄁t󠄁 p󠄁l󠄁a󠄁n󠄁 c󠄁a󠄁c󠄁h󠄁e󠄁 f󠄁r󠄁o󠄁m󠄁 R󠄁e󠄁d󠄁i󠄁s󠄁 |
| `ots billing plans materialize` | d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁:󠄁 m󠄁a󠄁t󠄁e󠄁r󠄁i󠄁a󠄁l󠄁i󠄁z󠄁e󠄁d󠄁 e󠄁n󠄁t󠄁i󠄁t󠄁l󠄁e󠄁m󠄁e󠄁n󠄁t󠄁s󠄁 o󠄁n󠄁 o󠄁r󠄁g󠄁a󠄁n󠄁i󠄁z󠄁a󠄁t󠄁i󠄁o󠄁n󠄁s󠄁 a󠄁n󠄁d󠄁,󠄁 w󠄁i󠄁t󠄁h󠄁 `--include-memberships`,󠄁 t󠄁h󠄁e󠄁i󠄁r󠄁 m󠄁e󠄁m󠄁b󠄁e󠄁r󠄁s󠄁 | `--run` | n󠄁o󠄁n󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | M󠄁a󠄁t󠄁e󠄁r󠄁i󠄁a󠄁l󠄁i󠄁z󠄁e󠄁 e󠄁n󠄁t󠄁i󠄁t󠄁l󠄁e󠄁m󠄁e󠄁n󠄁t󠄁s󠄁 o󠄁n󠄁 o󠄁r󠄁g󠄁a󠄁n󠄁i󠄁z󠄁a󠄁t󠄁i󠄁o󠄁n󠄁s󠄁 f󠄁r󠄁o󠄁m󠄁 p󠄁l󠄁a󠄁n󠄁 d󠄁e󠄁f󠄁i󠄁n󠄁i󠄁t󠄁i󠄁o󠄁n󠄁s󠄁 |
| `ots billing plans validate` | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | r󠄁e󠄁a󠄁d󠄁s󠄁 p󠄁r󠄁o󠄁d󠄁u󠄁c󠄁t󠄁s󠄁 a󠄁n󠄁d󠄁 p󠄁r󠄁i󠄁c󠄁e󠄁s󠄁 f󠄁r󠄁o󠄁m󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁,󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 k󠄁e󠄁y󠄁 | V󠄁a󠄁l󠄁i󠄁d󠄁a󠄁t󠄁e󠄁 p󠄁l󠄁a󠄁n󠄁 p󠄁r󠄁o󠄁d󠄁u󠄁c󠄁t󠄁i󠄁o󠄁n󠄁 r󠄁e󠄁a󠄁d󠄁i󠄁n󠄁e󠄁s󠄁s󠄁 (󠄁p󠄁r󠄁o󠄁d󠄁u󠄁c󠄁t󠄁s󠄁 +󠄁 p󠄁r󠄁i󠄁c󠄁e󠄁s󠄁)󠄁 |
| `ots billing prices` | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | r󠄁e󠄁a󠄁d󠄁s󠄁 p󠄁r󠄁i󠄁c󠄁e󠄁s󠄁 f󠄁r󠄁o󠄁m󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁,󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 k󠄁e󠄁y󠄁 | L󠄁i󠄁s󠄁t󠄁 a󠄁l󠄁l󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 p󠄁r󠄁i󠄁c󠄁e󠄁s󠄁 |
| `ots billing prices create` | a󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 p󠄁r󠄁i󠄁c󠄁e󠄁 | p󠄁r󠄁o󠄁m󠄁p󠄁t󠄁 | c󠄁r󠄁e󠄁a󠄁t󠄁e󠄁s󠄁 a󠄁 p󠄁r󠄁i󠄁c󠄁e󠄁 a󠄁t󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁,󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 k󠄁e󠄁y󠄁 | C󠄁r󠄁e󠄁a󠄁t󠄁e󠄁 a󠄁 n󠄁e󠄁w󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 p󠄁r󠄁i󠄁c󠄁e󠄁 |
| `ots billing prices generate` | n󠄁o󠄁n󠄁e󠄁;󠄁 p󠄁r󠄁i󠄁n󠄁t󠄁s󠄁 t󠄁h󠄁e󠄁 p󠄁r󠄁i󠄁c󠄁e󠄁-󠄁c󠄁r󠄁e󠄁a󠄁t󠄁i󠄁o󠄁n󠄁 c󠄁o󠄁m󠄁m󠄁a󠄁n󠄁d󠄁s󠄁 | n󠄁o󠄁n󠄁e󠄁 | l󠄁o󠄁o󠄁k󠄁s󠄁 p󠄁r󠄁o󠄁d󠄁u󠄁c󠄁t󠄁s󠄁 u󠄁p󠄁 a󠄁t󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 u󠄁n󠄁l󠄁e󠄁s󠄁s󠄁 `--no-lookup` | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁,󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 k󠄁e󠄁y󠄁 | G󠄁e󠄁n󠄁e󠄁r󠄁a󠄁t󠄁e󠄁 p󠄁r󠄁i󠄁c󠄁e󠄁 c󠄁r󠄁e󠄁a󠄁t󠄁i󠄁o󠄁n󠄁 c󠄁o󠄁m󠄁m󠄁a󠄁n󠄁d󠄁s󠄁 f󠄁r󠄁o󠄁m󠄁 b󠄁i󠄁l󠄁l󠄁i󠄁n󠄁g󠄁.󠄁y󠄁a󠄁m󠄁l󠄁 |
| `ots billing prices validate` | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | r󠄁e󠄁a󠄁d󠄁s󠄁 p󠄁r󠄁i󠄁c󠄁e󠄁s󠄁 f󠄁r󠄁o󠄁m󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁,󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 k󠄁e󠄁y󠄁 | V󠄁a󠄁l󠄁i󠄁d󠄁a󠄁t󠄁e󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 p󠄁r󠄁i󠄁c󠄁e󠄁s󠄁 (󠄁S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 A󠄁P󠄁I󠄁 o󠄁n󠄁l󠄁y󠄁)󠄁 |
| `ots billing products` | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | r󠄁e󠄁a󠄁d󠄁s󠄁 p󠄁r󠄁o󠄁d󠄁u󠄁c󠄁t󠄁s󠄁 f󠄁r󠄁o󠄁m󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁,󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 k󠄁e󠄁y󠄁 | L󠄁i󠄁s󠄁t󠄁 a󠄁l󠄁l󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 p󠄁r󠄁o󠄁d󠄁u󠄁c󠄁t󠄁s󠄁 a󠄁n󠄁d󠄁 m󠄁a󠄁n󠄁a󠄁g󠄁e󠄁 p󠄁r󠄁o󠄁d󠄁u󠄁c󠄁t󠄁 o󠄁p󠄁e󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁s󠄁 |
| `ots billing products create` | a󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 p󠄁r󠄁o󠄁d󠄁u󠄁c󠄁t󠄁 | p󠄁r󠄁o󠄁m󠄁p󠄁t󠄁,󠄁 o󠄁r󠄁 `--yes` | c󠄁r󠄁e󠄁a󠄁t󠄁e󠄁s󠄁 o󠄁r󠄁 u󠄁p󠄁d󠄁a󠄁t󠄁e󠄁s󠄁 a󠄁 p󠄁r󠄁o󠄁d󠄁u󠄁c󠄁t󠄁 a󠄁t󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁,󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 k󠄁e󠄁y󠄁 | C󠄁r󠄁e󠄁a󠄁t󠄁e󠄁 a󠄁 n󠄁e󠄁w󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 p󠄁r󠄁o󠄁d󠄁u󠄁c󠄁t󠄁 |
| `ots billing products events` | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | r󠄁e󠄁a󠄁d󠄁s󠄁 e󠄁v󠄁e󠄁n󠄁t󠄁s󠄁 f󠄁r󠄁o󠄁m󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁,󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 k󠄁e󠄁y󠄁 | S󠄁h󠄁o󠄁w󠄁 p󠄁r󠄁o󠄁d󠄁u󠄁c󠄁t󠄁-󠄁r󠄁e󠄁l󠄁a󠄁t󠄁e󠄁d󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 e󠄁v󠄁e󠄁n󠄁t󠄁s󠄁 |
| `ots billing products show` | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | r󠄁e󠄁a󠄁d󠄁s󠄁 t󠄁h󠄁e󠄁 p󠄁r󠄁o󠄁d󠄁u󠄁c󠄁t󠄁 f󠄁r󠄁o󠄁m󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁,󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 k󠄁e󠄁y󠄁 | S󠄁h󠄁o󠄁w󠄁 d󠄁e󠄁t󠄁a󠄁i󠄁l󠄁e󠄁d󠄁 p󠄁r󠄁o󠄁d󠄁u󠄁c󠄁t󠄁 i󠄁n󠄁f󠄁o󠄁r󠄁m󠄁a󠄁t󠄁i󠄁o󠄁n󠄁 |
| `ots billing products update` | S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 p󠄁r󠄁o󠄁d󠄁u󠄁c󠄁t󠄁 m󠄁e󠄁t󠄁a󠄁d󠄁a󠄁t󠄁a󠄁 | p󠄁r󠄁o󠄁m󠄁p󠄁t󠄁 | u󠄁p󠄁d󠄁a󠄁t󠄁e󠄁s󠄁 t󠄁h󠄁e󠄁 p󠄁r󠄁o󠄁d󠄁u󠄁c󠄁t󠄁 a󠄁t󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁,󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 k󠄁e󠄁y󠄁 | U󠄁p󠄁d󠄁a󠄁t󠄁e󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 p󠄁r󠄁o󠄁d󠄁u󠄁c󠄁t󠄁 m󠄁e󠄁t󠄁a󠄁d󠄁a󠄁t󠄁a󠄁 (󠄁d󠄁e󠄁l󠄁e󠄁t󠄁e󠄁 v󠄁i󠄁a󠄁:󠄁 s󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 p󠄁r󠄁o󠄁d󠄁u󠄁c󠄁t󠄁s󠄁 d󠄁e󠄁l󠄁e󠄁t󠄁e󠄁 P󠄁R󠄁O󠄁D󠄁U󠄁C󠄁T󠄁_󠄁I󠄁D󠄁)󠄁 |
| `ots billing products validate` | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | r󠄁e󠄁a󠄁d󠄁s󠄁 p󠄁r󠄁o󠄁d󠄁u󠄁c󠄁t󠄁s󠄁 f󠄁r󠄁o󠄁m󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁,󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 k󠄁e󠄁y󠄁 | V󠄁a󠄁l󠄁i󠄁d󠄁a󠄁t󠄁e󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 p󠄁r󠄁o󠄁d󠄁u󠄁c󠄁t󠄁 m󠄁e󠄁t󠄁a󠄁d󠄁a󠄁t󠄁a󠄁 c󠄁o󠄁m󠄁p󠄁l󠄁e󠄁t󠄁e󠄁n󠄁e󠄁s󠄁s󠄁 |
| `ots billing refunds` | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | r󠄁e󠄁a󠄁d󠄁s󠄁 r󠄁e󠄁f󠄁u󠄁n󠄁d󠄁s󠄁 f󠄁r󠄁o󠄁m󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁,󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 k󠄁e󠄁y󠄁 | L󠄁i󠄁s󠄁t󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 r󠄁e󠄁f󠄁u󠄁n󠄁d󠄁s󠄁 |
| `ots billing refunds create` | a󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 r󠄁e󠄁f󠄁u󠄁n󠄁d󠄁 | p󠄁r󠄁o󠄁m󠄁p󠄁t󠄁,󠄁 o󠄁r󠄁 `--yes` | r󠄁e󠄁f󠄁u󠄁n󠄁d󠄁s󠄁 a󠄁 c󠄁h󠄁a󠄁r󠄁g󠄁e󠄁 a󠄁t󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁,󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 k󠄁e󠄁y󠄁 | C󠄁r󠄁e󠄁a󠄁t󠄁e󠄁 a󠄁 r󠄁e󠄁f󠄁u󠄁n󠄁d󠄁 f󠄁o󠄁r󠄁 a󠄁 c󠄁h󠄁a󠄁r󠄁g󠄁e󠄁 |
| `ots billing sigma` | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 S󠄁i󠄁g󠄁m󠄁a󠄁 a󠄁n󠄁a󠄁l󠄁y󠄁t󠄁i󠄁c󠄁s󠄁 c󠄁o󠄁m󠄁m󠄁a󠄁n󠄁d󠄁s󠄁 |
| `ots billing sigma queries` | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | r󠄁e󠄁a󠄁d󠄁s󠄁 S󠄁i󠄁g󠄁m󠄁a󠄁 q󠄁u󠄁e󠄁r󠄁i󠄁e󠄁s󠄁 f󠄁r󠄁o󠄁m󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁,󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 k󠄁e󠄁y󠄁 | L󠄁i󠄁s󠄁t󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 S󠄁i󠄁g󠄁m󠄁a󠄁 q󠄁u󠄁e󠄁r󠄁i󠄁e󠄁s󠄁 |
| `ots billing sigma run` | a󠄁 f󠄁i󠄁l󠄁e󠄁 a󠄁t󠄁 `--output` w󠄁h󠄁e󠄁n󠄁 g󠄁i󠄁v󠄁e󠄁n󠄁 | n󠄁o󠄁n󠄁e󠄁 | r󠄁e󠄁t󠄁r󠄁i󠄁e󠄁v󠄁e󠄁s󠄁 a󠄁 S󠄁i󠄁g󠄁m󠄁a󠄁 s󠄁c󠄁h󠄁e󠄁d󠄁u󠄁l󠄁e󠄁d󠄁 q󠄁u󠄁e󠄁r󠄁y󠄁 r󠄁u󠄁n󠄁 f󠄁r󠄁o󠄁m󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁,󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 k󠄁e󠄁y󠄁 | E󠄁x󠄁e󠄁c󠄁u󠄁t󠄁e󠄁 a󠄁 S󠄁i󠄁g󠄁m󠄁a󠄁 q󠄁u󠄁e󠄁r󠄁y󠄁 |
| `ots billing subscriptions` | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | r󠄁e󠄁a󠄁d󠄁s󠄁 s󠄁u󠄁b󠄁s󠄁c󠄁r󠄁i󠄁p󠄁t󠄁i󠄁o󠄁n󠄁s󠄁 f󠄁r󠄁o󠄁m󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁,󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 k󠄁e󠄁y󠄁 | L󠄁i󠄁s󠄁t󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 s󠄁u󠄁b󠄁s󠄁c󠄁r󠄁i󠄁p󠄁t󠄁i󠄁o󠄁n󠄁s󠄁 |
| `ots billing subscriptions cancel` | c󠄁a󠄁n󠄁c󠄁e󠄁l󠄁s󠄁 a󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 s󠄁u󠄁b󠄁s󠄁c󠄁r󠄁i󠄁p󠄁t󠄁i󠄁o󠄁n󠄁 | p󠄁r󠄁o󠄁m󠄁p󠄁t󠄁,󠄁 o󠄁r󠄁 `--yes`;󠄁 `--dry-run` p󠄁r󠄁e󠄁v󠄁i󠄁e󠄁w󠄁s󠄁 | c󠄁a󠄁n󠄁c󠄁e󠄁l󠄁s󠄁 a󠄁t󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁,󠄁 i󠄁m󠄁m󠄁e󠄁d󠄁i󠄁a󠄁t󠄁e󠄁l󠄁y󠄁 w󠄁i󠄁t󠄁h󠄁 `--immediately` | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁,󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 k󠄁e󠄁y󠄁 | C󠄁a󠄁n󠄁c󠄁e󠄁l󠄁 a󠄁 s󠄁u󠄁b󠄁s󠄁c󠄁r󠄁i󠄁p󠄁t󠄁i󠄁o󠄁n󠄁 |
| `ots billing subscriptions pause` | p󠄁a󠄁u󠄁s󠄁e󠄁s󠄁 a󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 s󠄁u󠄁b󠄁s󠄁c󠄁r󠄁i󠄁p󠄁t󠄁i󠄁o󠄁n󠄁 | p󠄁r󠄁o󠄁m󠄁p󠄁t󠄁,󠄁 o󠄁r󠄁 `--yes` | p󠄁a󠄁u󠄁s󠄁e󠄁s󠄁 c󠄁o󠄁l󠄁l󠄁e󠄁c󠄁t󠄁i󠄁o󠄁n󠄁 a󠄁t󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁,󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 k󠄁e󠄁y󠄁 | P󠄁a󠄁u󠄁s󠄁e󠄁 a󠄁 s󠄁u󠄁b󠄁s󠄁c󠄁r󠄁i󠄁p󠄁t󠄁i󠄁o󠄁n󠄁 |
| `ots billing subscriptions resume` | r󠄁e󠄁s󠄁u󠄁m󠄁e󠄁s󠄁 a󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 s󠄁u󠄁b󠄁s󠄁c󠄁r󠄁i󠄁p󠄁t󠄁i󠄁o󠄁n󠄁 | p󠄁r󠄁o󠄁m󠄁p󠄁t󠄁,󠄁 o󠄁r󠄁 `--yes` | r󠄁e󠄁s󠄁u󠄁m󠄁e󠄁s󠄁 c󠄁o󠄁l󠄁l󠄁e󠄁c󠄁t󠄁i󠄁o󠄁n󠄁 a󠄁t󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁,󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 k󠄁e󠄁y󠄁 | R󠄁e󠄁s󠄁u󠄁m󠄁e󠄁 a󠄁 p󠄁a󠄁u󠄁s󠄁e󠄁d󠄁 s󠄁u󠄁b󠄁s󠄁c󠄁r󠄁i󠄁p󠄁t󠄁i󠄁o󠄁n󠄁 |
| `ots billing subscriptions update` | t󠄁h󠄁e󠄁 p󠄁r󠄁i󠄁c󠄁e󠄁 o󠄁r󠄁 q󠄁u󠄁a󠄁n󠄁t󠄁i󠄁t󠄁y󠄁 o󠄁n󠄁 a󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 s󠄁u󠄁b󠄁s󠄁c󠄁r󠄁i󠄁p󠄁t󠄁i󠄁o󠄁n󠄁 | p󠄁r󠄁o󠄁m󠄁p󠄁t󠄁 | u󠄁p󠄁d󠄁a󠄁t󠄁e󠄁s󠄁 t󠄁h󠄁e󠄁 s󠄁u󠄁b󠄁s󠄁c󠄁r󠄁i󠄁p󠄁t󠄁i󠄁o󠄁n󠄁 a󠄁t󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁,󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 k󠄁e󠄁y󠄁 | U󠄁p󠄁d󠄁a󠄁t󠄁e󠄁 s󠄁u󠄁b󠄁s󠄁c󠄁r󠄁i󠄁p󠄁t󠄁i󠄁o󠄁n󠄁 p󠄁r󠄁i󠄁c󠄁e󠄁 o󠄁r󠄁 q󠄁u󠄁a󠄁n󠄁t󠄁i󠄁t󠄁y󠄁 |
| `ots billing sync-billing-email` | d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁:󠄁 o󠄁r󠄁g󠄁a󠄁n󠄁i󠄁z󠄁a󠄁t󠄁i󠄁o󠄁n󠄁 b󠄁i󠄁l󠄁l󠄁i󠄁n󠄁g󠄁 e󠄁m󠄁a󠄁i󠄁l󠄁,󠄁 a󠄁n󠄁d󠄁 c󠄁o󠄁n󠄁t󠄁a󠄁c󠄁t󠄁 e󠄁m󠄁a󠄁i󠄁l󠄁 w󠄁i󠄁t󠄁h󠄁 `--update-contact-email` | `--apply` | r󠄁e󠄁a󠄁d󠄁s󠄁 c󠄁u󠄁s󠄁t󠄁o󠄁m󠄁e󠄁r󠄁s󠄁 f󠄁r󠄁o󠄁m󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁,󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 k󠄁e󠄁y󠄁 | S󠄁y󠄁n󠄁c󠄁 o󠄁r󠄁g󠄁a󠄁n󠄁i󠄁z󠄁a󠄁t󠄁i󠄁o󠄁n󠄁 b󠄁i󠄁l󠄁l󠄁i󠄁n󠄁g󠄁 e󠄁m󠄁a󠄁i󠄁l󠄁s󠄁 f󠄁r󠄁o󠄁m󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 c󠄁u󠄁s󠄁t󠄁o󠄁m󠄁e󠄁r󠄁 r󠄁e󠄁c󠄁o󠄁r󠄁d󠄁s󠄁 |
| `ots billing sync-org` | d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁:󠄁 o󠄁r󠄁g󠄁a󠄁n󠄁i󠄁z󠄁a󠄁t󠄁i󠄁o󠄁n󠄁 s󠄁u󠄁b󠄁s󠄁c󠄁r󠄁i󠄁p󠄁t󠄁i󠄁o󠄁n󠄁 s󠄁t󠄁a󠄁t󠄁e󠄁 | `--dry-run` p󠄁r󠄁e󠄁v󠄁i󠄁e󠄁w󠄁s󠄁 | r󠄁e󠄁a󠄁d󠄁s󠄁 s󠄁u󠄁b󠄁s󠄁c󠄁r󠄁i󠄁p󠄁t󠄁i󠄁o󠄁n󠄁s󠄁 f󠄁r󠄁o󠄁m󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁,󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 k󠄁e󠄁y󠄁 | S󠄁y󠄁n󠄁c󠄁 o󠄁r󠄁g󠄁a󠄁n󠄁i󠄁z󠄁a󠄁t󠄁i󠄁o󠄁n󠄁 s󠄁u󠄁b󠄁s󠄁c󠄁r󠄁i󠄁p󠄁t󠄁i󠄁o󠄁n󠄁 s󠄁t󠄁a󠄁t󠄁e󠄁 f󠄁r󠄁o󠄁m󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 |
| `ots billing test` | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | T󠄁e󠄁s󠄁t󠄁i󠄁n󠄁g󠄁 u󠄁t󠄁i󠄁l󠄁i󠄁t󠄁i󠄁e󠄁s󠄁 f󠄁o󠄁r󠄁 b󠄁i󠄁l󠄁l󠄁i󠄁n󠄁g󠄁 i󠄁n󠄁t󠄁e󠄁g󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁 |
| `ots billing test create-customer` | a󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 t󠄁e󠄁s󠄁t󠄁 c󠄁u󠄁s󠄁t󠄁o󠄁m󠄁e󠄁r󠄁,󠄁 w󠄁i󠄁t󠄁h󠄁 a󠄁 t󠄁e󠄁s󠄁t󠄁 c󠄁a󠄁r󠄁d󠄁 w󠄁h󠄁e󠄁n󠄁 `--with-card` | n󠄁o󠄁n󠄁e󠄁 | c󠄁r󠄁e󠄁a󠄁t󠄁e󠄁s󠄁 a󠄁 c󠄁u󠄁s󠄁t󠄁o󠄁m󠄁e󠄁r󠄁 a󠄁n󠄁d󠄁 a󠄁t󠄁t󠄁a󠄁c󠄁h󠄁e󠄁s󠄁 a󠄁 p󠄁a󠄁y󠄁m󠄁e󠄁n󠄁t󠄁 m󠄁e󠄁t󠄁h󠄁o󠄁d󠄁 a󠄁t󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁,󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 k󠄁e󠄁y󠄁 | C󠄁r󠄁e󠄁a󠄁t󠄁e󠄁 t󠄁e󠄁s󠄁t󠄁 c󠄁u󠄁s󠄁t󠄁o󠄁m󠄁e󠄁r󠄁 w󠄁i󠄁t󠄁h󠄁 p󠄁a󠄁y󠄁m󠄁e󠄁n󠄁t󠄁 m󠄁e󠄁t󠄁h󠄁o󠄁d󠄁 (󠄁t󠄁e󠄁s󠄁t󠄁 m󠄁o󠄁d󠄁e󠄁 o󠄁n󠄁l󠄁y󠄁)󠄁 |
| `ots billing test trigger-webhook` | n󠄁o󠄁n󠄁e󠄁 d󠄁i󠄁r󠄁e󠄁c󠄁t󠄁l󠄁y󠄁;󠄁 t󠄁h󠄁e󠄁 e󠄁m󠄁i󠄁t󠄁t󠄁e󠄁d󠄁 e󠄁v󠄁e󠄁n󠄁t󠄁 i󠄁s󠄁 p󠄁r󠄁o󠄁c󠄁e󠄁s󠄁s󠄁e󠄁d󠄁 b󠄁y󠄁 t󠄁h󠄁e󠄁 a󠄁p󠄁p󠄁l󠄁i󠄁c󠄁a󠄁t󠄁i󠄁o󠄁n󠄁 | n󠄁o󠄁n󠄁e󠄁 | s󠄁h󠄁e󠄁l󠄁l󠄁s󠄁 o󠄁u󠄁t󠄁 t󠄁o󠄁 t󠄁h󠄁e󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 C󠄁L󠄁I󠄁,󠄁 w󠄁h󠄁i󠄁c󠄁h󠄁 e󠄁m󠄁i󠄁t󠄁s󠄁 a󠄁 t󠄁e󠄁s󠄁t󠄁 e󠄁v󠄁e󠄁n󠄁t󠄁 | t󠄁h󠄁e󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 C󠄁L󠄁I󠄁 o󠄁n󠄁 `PATH` | T󠄁r󠄁i󠄁g󠄁g󠄁e󠄁r󠄁 a󠄁 t󠄁e󠄁s󠄁t󠄁 w󠄁e󠄁b󠄁h󠄁o󠄁o󠄁k󠄁 e󠄁v󠄁e󠄁n󠄁t󠄁 (󠄁r󠄁e󠄁q󠄁u󠄁i󠄁r󠄁e󠄁s󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 C󠄁L󠄁I󠄁)󠄁 |
| `ots billing update-stripe-metadata` | S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 c󠄁u󠄁s󠄁t󠄁o󠄁m󠄁e󠄁r󠄁 m󠄁e󠄁t󠄁a󠄁d󠄁a󠄁t󠄁a󠄁 f󠄁o󠄁r󠄁 o󠄁r󠄁g󠄁a󠄁n󠄁i󠄁z󠄁a󠄁t󠄁i󠄁o󠄁n󠄁s󠄁 i󠄁n󠄁 t󠄁h󠄁i󠄁s󠄁 r󠄁e󠄁g󠄁i󠄁o󠄁n󠄁 | `--apply` | u󠄁p󠄁d󠄁a󠄁t󠄁e󠄁s󠄁 c󠄁u󠄁s󠄁t󠄁o󠄁m󠄁e󠄁r󠄁s󠄁 a󠄁t󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁,󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 k󠄁e󠄁y󠄁 | R󠄁e󠄁a󠄁d󠄁 o󠄁r󠄁 u󠄁p󠄁d󠄁a󠄁t󠄁e󠄁 a󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 c󠄁u󠄁s󠄁t󠄁o󠄁m󠄁e󠄁r󠄁 m󠄁e󠄁t󠄁a󠄁d󠄁a󠄁t󠄁a󠄁 k󠄁e󠄁y󠄁 f󠄁o󠄁r󠄁 o󠄁r󠄁g󠄁s󠄁 i󠄁n󠄁 t󠄁h󠄁i󠄁s󠄁 r󠄁e󠄁g󠄁i󠄁o󠄁n󠄁 |
| `ots billing validate` | n󠄁o󠄁n󠄁e󠄁 | n󠄁o󠄁n󠄁e󠄁 | r󠄁u󠄁n󠄁s󠄁 t󠄁h󠄁e󠄁 c󠄁a󠄁t󠄁a󠄁l󠄁o󠄁g󠄁,󠄁 p󠄁r󠄁o󠄁d󠄁u󠄁c󠄁t󠄁,󠄁 p󠄁r󠄁i󠄁c󠄁e󠄁 a󠄁n󠄁d󠄁 p󠄁l󠄁a󠄁n󠄁 v󠄁a󠄁l󠄁i󠄁d󠄁a󠄁t󠄁i󠄁o󠄁n󠄁s󠄁 a󠄁s󠄁 s󠄁e󠄁p󠄁a󠄁r󠄁a󠄁t󠄁e󠄁 p󠄁r󠄁o󠄁c󠄁e󠄁s󠄁s󠄁e󠄁s󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁,󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 k󠄁e󠄁y󠄁 | R󠄁u󠄁n󠄁 a󠄁l󠄁l󠄁 b󠄁i󠄁l󠄁l󠄁i󠄁n󠄁g󠄁 v󠄁a󠄁l󠄁i󠄁d󠄁a󠄁t󠄁i󠄁o󠄁n󠄁s󠄁 (󠄁c󠄁o󠄁n󠄁v󠄁e󠄁n󠄁i󠄁e󠄁n󠄁c󠄁e󠄁 c󠄁o󠄁m󠄁m󠄁a󠄁n󠄁d󠄁)󠄁 |
| `ots billing webhooks` | d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁:󠄁 r󠄁e󠄁w󠄁r󠄁i󠄁t󠄁e󠄁s󠄁 s󠄁t󠄁o󠄁r󠄁e󠄁d󠄁 e󠄁v󠄁e󠄁n󠄁t󠄁s󠄁 w󠄁h󠄁e󠄁n󠄁 `--migrate` i󠄁s󠄁 g󠄁i󠄁v󠄁e󠄁n󠄁;󠄁 r󠄁e󠄁a󠄁d󠄁-󠄁o󠄁n󠄁l󠄁y󠄁 o󠄁t󠄁h󠄁e󠄁r󠄁w󠄁i󠄁s󠄁e󠄁 | `--migrate` | n󠄁o󠄁n󠄁e󠄁 | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 | I󠄁n󠄁s󠄁p󠄁e󠄁c󠄁t󠄁 w󠄁e󠄁b󠄁h󠄁o󠄁o󠄁k󠄁 e󠄁v󠄁e󠄁n󠄁t󠄁 p󠄁r󠄁o󠄁c󠄁e󠄁s󠄁s󠄁i󠄁n󠄁g󠄁 s󠄁t󠄁a󠄁t󠄁u󠄁s󠄁 |
| `ots billing webhooks replay` | r󠄁e󠄁p󠄁r󠄁o󠄁c󠄁e󠄁s󠄁s󠄁e󠄁s󠄁 s󠄁t󠄁o󠄁r󠄁e󠄁d󠄁 w󠄁e󠄁b󠄁h󠄁o󠄁o󠄁k󠄁 e󠄁v󠄁e󠄁n󠄁t󠄁s󠄁 | p󠄁r󠄁o󠄁m󠄁p󠄁t󠄁,󠄁 o󠄁r󠄁 `--force`/󠄁`--yes`;󠄁 `--dry-run` p󠄁r󠄁e󠄁v󠄁i󠄁e󠄁w󠄁s󠄁 | r󠄁e󠄁p󠄁r󠄁o󠄁c󠄁e󠄁s󠄁s󠄁i󠄁n󠄁g󠄁 c󠄁o󠄁n󠄁t󠄁a󠄁c󠄁t󠄁s󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 a󠄁n󠄁d󠄁 c󠄁a󠄁n󠄁 s󠄁e󠄁n󠄁d󠄁 n󠄁o󠄁t󠄁i󠄁f󠄁i󠄁c󠄁a󠄁t󠄁i󠄁o󠄁n󠄁s󠄁 u󠄁n󠄁l󠄁e󠄁s󠄁s󠄁 `--skip-notifications` | c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 d󠄁a󠄁t󠄁a󠄁s󠄁t󠄁o󠄁r󠄁e󠄁,󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 k󠄁e󠄁y󠄁 | R󠄁e󠄁p󠄁l󠄁a󠄁y󠄁 s󠄁t󠄁o󠄁r󠄁e󠄁d󠄁 w󠄁e󠄁b󠄁h󠄁o󠄁o󠄁k󠄁 e󠄁v󠄁e󠄁n󠄁t󠄁s󠄁 w󠄁i󠄁t󠄁h󠄁 f󠄁i󠄁l󠄁t󠄁e󠄁r󠄁i󠄁n󠄁g󠄁 |

## S󠄁h󠄁e󠄁l󠄁l󠄁 e󠄁n󠄁t󠄁r󠄁y󠄁 p󠄁o󠄁i󠄁n󠄁t󠄁s󠄁

T󠄁h󠄁e󠄁 s󠄁c󠄁r󠄁i󠄁p󠄁t󠄁s󠄁 o󠄁p󠄁e󠄁r󠄁a󠄁t󠄁o󠄁r󠄁s󠄁 r󠄁u󠄁n󠄁 d󠄁i󠄁r󠄁e󠄁c󠄁t󠄁l󠄁y󠄁.󠄁 E󠄁a󠄁c󠄁h󠄁 o󠄁n󠄁e󠄁 e󠄁i󠄁t󠄁h󠄁e󠄁r󠄁 d󠄁i󠄁s󠄁p󠄁a󠄁t󠄁c󠄁h󠄁e󠄁s󠄁 t󠄁o󠄁 `ots` o󠄁r󠄁 t󠄁o󠄁 a󠄁 t󠄁o󠄁o󠄁l󠄁 p󠄁a󠄁c󠄁k󠄁a󠄁g󠄁e󠄁 u󠄁n󠄁d󠄁e󠄁r󠄁 `tools/`.󠄁

| S󠄁c󠄁r󠄁i󠄁p󠄁t󠄁 | R󠄁o󠄁l󠄁e󠄁 |
| :--- | :--- |
| `bin/ots` | T󠄁h󠄁e󠄁 R󠄁u󠄁b󠄁y󠄁 e󠄁n󠄁t󠄁r󠄁y󠄁 p󠄁o󠄁i󠄁n󠄁t󠄁 f󠄁o󠄁r󠄁 e󠄁v󠄁e󠄁r󠄁y󠄁 `ots` c󠄁o󠄁m󠄁m󠄁a󠄁n󠄁d󠄁.󠄁 P󠄁a󠄁r󠄁s󠄁e󠄁s󠄁 t󠄁h󠄁e󠄁 g󠄁l󠄁o󠄁b󠄁a󠄁l󠄁 `-v`/󠄁`--verbose`,󠄁 `-D`/󠄁`--debug` a󠄁n󠄁d󠄁 `--safe-boot` s󠄁w󠄁i󠄁t󠄁c󠄁h󠄁e󠄁s󠄁,󠄁 t󠄁h󠄁e󠄁n󠄁 d󠄁i󠄁s󠄁p󠄁a󠄁t󠄁c󠄁h󠄁e󠄁s󠄁 t󠄁o󠄁 t󠄁h󠄁e󠄁 c󠄁o󠄁m󠄁m󠄁a󠄁n󠄁d󠄁 r󠄁e󠄁g󠄁i󠄁s󠄁t󠄁r󠄁y󠄁.󠄁 |
| `bin/install` | O󠄁p󠄁e󠄁r󠄁a󠄁t󠄁o󠄁r󠄁 f󠄁r󠄁o󠄁n󠄁t󠄁 d󠄁o󠄁o󠄁r󠄁 f󠄁o󠄁r󠄁 i󠄁n󠄁s󠄁t󠄁a󠄁l󠄁l󠄁i󠄁n󠄁g󠄁 f󠄁r󠄁o󠄁m󠄁 a󠄁 c󠄁h󠄁e󠄁c󠄁k󠄁o󠄁u󠄁t󠄁.󠄁 W󠄁r󠄁a󠄁p󠄁s󠄁 `bin/setup`;󠄁 `--reconcile` r󠄁e󠄁-󠄁d󠄁e󠄁r󠄁i󠄁v󠄁e󠄁s󠄁 c󠄁h󠄁i󠄁l󠄁d󠄁 k󠄁e󠄁y󠄁s󠄁 a󠄁n󠄁d󠄁 r󠄁e󠄁-󠄁a󠄁p󠄁p󠄁l󠄁i󠄁e󠄁s󠄁 b󠄁r󠄁o󠄁k󠄁e󠄁r󠄁 p󠄁o󠄁l󠄁i󠄁c󠄁i󠄁e󠄁s󠄁.󠄁 I󠄁d󠄁e󠄁m󠄁p󠄁o󠄁t󠄁e󠄁n󠄁t󠄁,󠄁 a󠄁n󠄁d󠄁 i󠄁t󠄁 n󠄁e󠄁v󠄁e󠄁r󠄁 r󠄁e󠄁g󠄁e󠄁n󠄁e󠄁r󠄁a󠄁t󠄁e󠄁s󠄁 a󠄁 l󠄁i󠄁v󠄁e󠄁 `SECRET`.󠄁 |
| `bin/setup` | P󠄁r󠄁e󠄁p󠄁a󠄁r󠄁e󠄁s󠄁 a󠄁 c󠄁h󠄁e󠄁c󠄁k󠄁o󠄁u󠄁t󠄁.󠄁 A󠄁 s󠄁h󠄁i󠄁m󠄁 t󠄁h󠄁a󠄁t󠄁 r󠄁u󠄁n󠄁s󠄁 t󠄁h󠄁e󠄁 l󠄁a󠄁n󠄁e󠄁s󠄁 i󠄁n󠄁 `tools/setup/setup.sh`;󠄁 `bin/setup --help` l󠄁i󠄁s󠄁t󠄁s󠄁 t󠄁h󠄁e󠄁m󠄁.󠄁 |
| `bin/doctor` | C󠄁h󠄁e󠄁c󠄁k󠄁s󠄁 t󠄁h󠄁e󠄁 e󠄁n󠄁v󠄁i󠄁r󠄁o󠄁n󠄁m󠄁e󠄁n󠄁t󠄁 a󠄁g󠄁a󠄁i󠄁n󠄁s󠄁t󠄁 t󠄁h󠄁e󠄁 m󠄁a󠄁n󠄁i󠄁f󠄁e󠄁s󠄁t󠄁 a󠄁n󠄁d󠄁 r󠄁u󠄁n󠄁s󠄁 l󠄁i󠄁v󠄁e󠄁 p󠄁r󠄁o󠄁b󠄁e󠄁s󠄁.󠄁 W󠄁r󠄁a󠄁p󠄁s󠄁 `bin/setup --doctor`;󠄁 `--operator` r󠄁e󠄁s󠄁t󠄁r󠄁i󠄁c󠄁t󠄁s󠄁 t󠄁h󠄁e󠄁 c󠄁h󠄁e󠄁c󠄁k󠄁s󠄁 t󠄁o󠄁 p󠄁r󠄁o󠄁d󠄁u󠄁c󠄁t󠄁i󠄁o󠄁n󠄁 c󠄁o󠄁n󠄁c󠄁e󠄁r󠄁n󠄁s󠄁 a󠄁n󠄁d󠄁 `--operator --bundle` w󠄁r󠄁i󠄁t󠄁e󠄁s󠄁 a󠄁 s󠄁a󠄁n󠄁i󠄁t󠄁i󠄁z󠄁e󠄁d󠄁 d󠄁i󠄁a󠄁g󠄁n󠄁o󠄁s󠄁t󠄁i󠄁c󠄁 a󠄁r󠄁c󠄁h󠄁i󠄁v󠄁e󠄁 o󠄁f󠄁 v󠄁a󠄁r󠄁i󠄁a󠄁b󠄁l󠄁e󠄁 n󠄁a󠄁m󠄁e󠄁s󠄁 o󠄁n󠄁l󠄁y󠄁.󠄁 |
| `bin/scheduler` | S󠄁t󠄁a󠄁r󠄁t󠄁s󠄁 t󠄁h󠄁e󠄁 s󠄁c󠄁h󠄁e󠄁d󠄁u󠄁l󠄁e󠄁r󠄁 d󠄁a󠄁e󠄁m󠄁o󠄁n󠄁.󠄁 S󠄁o󠄁u󠄁r󠄁c󠄁e󠄁s󠄁 `.env` w󠄁h󠄁e󠄁n󠄁 p󠄁r󠄁e󠄁s󠄁e󠄁n󠄁t󠄁,󠄁 t󠄁h󠄁e󠄁n󠄁 r󠄁u󠄁n󠄁s󠄁 `bin/ots scheduler`.󠄁 |
| `bin/worker` | S󠄁t󠄁a󠄁r󠄁t󠄁s󠄁 t󠄁h󠄁e󠄁 j󠄁o󠄁b󠄁 w󠄁o󠄁r󠄁k󠄁e󠄁r󠄁s󠄁.󠄁 S󠄁o󠄁u󠄁r󠄁c󠄁e󠄁s󠄁 `.env` w󠄁h󠄁e󠄁n󠄁 p󠄁r󠄁e󠄁s󠄁e󠄁n󠄁t󠄁,󠄁 t󠄁h󠄁e󠄁n󠄁 r󠄁u󠄁n󠄁s󠄁 `bin/ots worker`.󠄁 |
| `bin/console` | O󠄁p󠄁e󠄁n󠄁s󠄁 t󠄁h󠄁e󠄁 a󠄁p󠄁p󠄁l󠄁i󠄁c󠄁a󠄁t󠄁i󠄁o󠄁n󠄁 c󠄁o󠄁n󠄁s󠄁o󠄁l󠄁e󠄁 t󠄁h󠄁r󠄁o󠄁u󠄁g󠄁h󠄁 `bin/ots console`.󠄁 T󠄁a󠄁k󠄁e󠄁s󠄁 t󠄁h󠄁e󠄁 e󠄁n󠄁v󠄁i󠄁r󠄁o󠄁n󠄁m󠄁e󠄁n󠄁t󠄁 f󠄁r󠄁o󠄁m󠄁 t󠄁h󠄁e󠄁 s󠄁h󠄁e󠄁l󠄁l󠄁 r󠄁a󠄁t󠄁h󠄁e󠄁r󠄁 t󠄁h󠄁a󠄁n󠄁 s󠄁o󠄁u󠄁r󠄁c󠄁i󠄁n󠄁g󠄁 `.env`.󠄁 |
| `bin/envref` | E󠄁n󠄁t󠄁r󠄁y󠄁 p󠄁o󠄁i󠄁n󠄁t󠄁 f󠄁o󠄁r󠄁 t󠄁h󠄁e󠄁 c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁-󠄁a󠄁n󠄁n󠄁o󠄁t󠄁a󠄁t󠄁i󠄁o󠄁n󠄁 t󠄁o󠄁o󠄁l󠄁i󠄁n󠄁g󠄁.󠄁 S󠄁t󠄁a󠄁r󠄁t󠄁s󠄁 `tools/envref` t󠄁h󠄁r󠄁o󠄁u󠄁g󠄁h󠄁 i󠄁t󠄁s󠄁 l󠄁o󠄁c󠄁k󠄁e󠄁d󠄁 r󠄁u󠄁n󠄁t󠄁i󠄁m󠄁e󠄁;󠄁 `envref --help` l󠄁i󠄁s󠄁t󠄁s󠄁 t󠄁h󠄁e󠄁 s󠄁u󠄁b󠄁c󠄁o󠄁m󠄁m󠄁a󠄁n󠄁d󠄁s󠄁.󠄁 |
| `bin/irb` | L󠄁o󠄁a󠄁d󠄁s󠄁 m󠄁o󠄁d󠄁e󠄁l󠄁s󠄁,󠄁 a󠄁p󠄁p󠄁l󠄁i󠄁c󠄁a󠄁t󠄁i󠄁o󠄁n󠄁s󠄁 a󠄁n󠄁d󠄁 t󠄁e󠄁s󠄁t󠄁 h󠄁e󠄁l󠄁p󠄁e󠄁r󠄁s󠄁 i󠄁n󠄁t󠄁o󠄁 `irb` w󠄁i󠄁t󠄁h󠄁o󠄁u󠄁t󠄁 b󠄁o󠄁o󠄁t󠄁i󠄁n󠄁g󠄁.󠄁 S󠄁e󠄁l󠄁e󠄁c󠄁t󠄁s󠄁 t󠄁h󠄁e󠄁 a󠄁p󠄁p󠄁l󠄁i󠄁c󠄁a󠄁t󠄁i󠄁o󠄁n󠄁s󠄁 b󠄁y󠄁 `AUTHENTICATION_MODE`.󠄁 |
| `bin/dev` | D󠄁e󠄁v󠄁e󠄁l󠄁o󠄁p󠄁m󠄁e󠄁n󠄁t󠄁 p󠄁r󠄁o󠄁c󠄁e󠄁s󠄁s󠄁 r󠄁u󠄁n󠄁n󠄁e󠄁r󠄁 f󠄁o󠄁r󠄁 t󠄁h󠄁e󠄁 P󠄁r󠄁o󠄁c󠄁f󠄁i󠄁l󠄁e󠄁 s󠄁e󠄁r󠄁v󠄁i󠄁c󠄁e󠄁s󠄁 (󠄁c󠄁o󠄁n󠄁t󠄁r󠄁i󠄁b󠄁u󠄁t󠄁o󠄁r󠄁 t󠄁o󠄁o󠄁l󠄁i󠄁n󠄁g󠄁)󠄁.󠄁 |
| `bin/backend` | S󠄁t󠄁a󠄁r󠄁t󠄁s󠄁 o󠄁n󠄁l󠄁y󠄁 t󠄁h󠄁e󠄁 b󠄁a󠄁c󠄁k󠄁e󠄁n󠄁d󠄁 s󠄁e󠄁r󠄁v󠄁i󠄁c󠄁e󠄁 t󠄁h󠄁r󠄁o󠄁u󠄁g󠄁h󠄁 t󠄁h󠄁e󠄁 d󠄁e󠄁v󠄁e󠄁l󠄁o󠄁p󠄁m󠄁e󠄁n󠄁t󠄁 p󠄁r󠄁o󠄁c󠄁e󠄁s󠄁s󠄁 r󠄁u󠄁n󠄁n󠄁e󠄁r󠄁 (󠄁c󠄁o󠄁n󠄁t󠄁r󠄁i󠄁b󠄁u󠄁t󠄁o󠄁r󠄁 t󠄁o󠄁o󠄁l󠄁i󠄁n󠄁g󠄁)󠄁.󠄁 |
| `bin/frontend` | S󠄁t󠄁a󠄁r󠄁t󠄁s󠄁 o󠄁n󠄁l󠄁y󠄁 t󠄁h󠄁e󠄁 f󠄁r󠄁o󠄁n󠄁t󠄁e󠄁n󠄁d󠄁 s󠄁e󠄁r󠄁v󠄁i󠄁c󠄁e󠄁 t󠄁h󠄁r󠄁o󠄁u󠄁g󠄁h󠄁 t󠄁h󠄁e󠄁 d󠄁e󠄁v󠄁e󠄁l󠄁o󠄁p󠄁m󠄁e󠄁n󠄁t󠄁 p󠄁r󠄁o󠄁c󠄁e󠄁s󠄁s󠄁 r󠄁u󠄁n󠄁n󠄁e󠄁r󠄁 (󠄁c󠄁o󠄁n󠄁t󠄁r󠄁i󠄁b󠄁u󠄁t󠄁o󠄁r󠄁 t󠄁o󠄁o󠄁l󠄁i󠄁n󠄁g󠄁)󠄁.󠄁 |
| `bin/host-seam` | R󠄁u󠄁n󠄁s󠄁 t󠄁h󠄁e󠄁 p󠄁r󠄁o󠄁x󠄁y󠄁-󠄁s󠄁i󠄁m󠄁u󠄁l󠄁a󠄁t󠄁i󠄁o󠄁n󠄁 m󠄁a󠄁t󠄁r󠄁i󠄁x󠄁 f󠄁o󠄁r󠄁 t󠄁h󠄁e󠄁 p󠄁u󠄁b󠄁l󠄁i󠄁c󠄁-󠄁h󠄁o󠄁s󠄁t󠄁 s󠄁e󠄁a󠄁m󠄁 (󠄁c󠄁o󠄁n󠄁t󠄁r󠄁i󠄁b󠄁u󠄁t󠄁o󠄁r󠄁 t󠄁o󠄁o󠄁l󠄁i󠄁n󠄁g󠄁)󠄁.󠄁 |
| `bin/stripe-dev-webhook` | F󠄁o󠄁r󠄁w󠄁a󠄁r󠄁d󠄁s󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 w󠄁e󠄁b󠄁h󠄁o󠄁o󠄁k󠄁 e󠄁v󠄁e󠄁n󠄁t󠄁s󠄁 t󠄁o󠄁 a󠄁 l󠄁o󠄁c󠄁a󠄁l󠄁 d󠄁e󠄁v󠄁e󠄁l󠄁o󠄁p󠄁m󠄁e󠄁n󠄁t󠄁 s󠄁e󠄁r󠄁v󠄁e󠄁r󠄁 t󠄁h󠄁r󠄁o󠄁u󠄁g󠄁h󠄁 t󠄁h󠄁e󠄁 S󠄁t󠄁r󠄁i󠄁p󠄁e󠄁 C󠄁L󠄁I󠄁 (󠄁c󠄁o󠄁n󠄁t󠄁r󠄁i󠄁b󠄁u󠄁t󠄁o󠄁r󠄁 t󠄁o󠄁o󠄁l󠄁i󠄁n󠄁g󠄁)󠄁.󠄁 |
| `bin/testsuite` | R󠄁u󠄁n󠄁s󠄁 t󠄁h󠄁e󠄁 t󠄁e󠄁s󠄁t󠄁 s󠄁u󠄁i󠄁t󠄁e󠄁 t󠄁h󠄁r󠄁o󠄁u󠄁g󠄁h󠄁 `tools/testsuite` (󠄁c󠄁o󠄁n󠄁t󠄁r󠄁i󠄁b󠄁u󠄁t󠄁o󠄁r󠄁 t󠄁o󠄁o󠄁l󠄁i󠄁n󠄁g󠄁)󠄁.󠄁 |
| `bin/testsuite-installer` | R󠄁u󠄁n󠄁s󠄁 t󠄁h󠄁e󠄁 i󠄁n󠄁s󠄁t󠄁a󠄁l󠄁l󠄁e󠄁r󠄁 t󠄁e󠄁s󠄁t󠄁 s󠄁u󠄁i󠄁t󠄁e󠄁 t󠄁h󠄁r󠄁o󠄁u󠄁g󠄁h󠄁 `tools/testsuite-installer` (󠄁c󠄁o󠄁n󠄁t󠄁r󠄁i󠄁b󠄁u󠄁t󠄁o󠄁r󠄁 t󠄁o󠄁o󠄁l󠄁i󠄁n󠄁g󠄁)󠄁.󠄁 |
| `bin/visual` | R󠄁u󠄁n󠄁s󠄁 t󠄁h󠄁e󠄁 v󠄁i󠄁s󠄁u󠄁a󠄁l󠄁 r󠄁e󠄁g󠄁r󠄁e󠄁s󠄁s󠄁i󠄁o󠄁n󠄁 s󠄁u󠄁i󠄁t󠄁e󠄁,󠄁 s󠄁e󠄁e󠄁d󠄁i󠄁n󠄁g󠄁 f󠄁i󠄁x󠄁t󠄁u󠄁r󠄁e󠄁s󠄁 a󠄁n󠄁d󠄁 b󠄁o󠄁o󠄁t󠄁i󠄁n󠄁g󠄁 a󠄁 s󠄁e󠄁r󠄁v󠄁e󠄁r󠄁 (󠄁c󠄁o󠄁n󠄁t󠄁r󠄁i󠄁b󠄁u󠄁t󠄁o󠄁r󠄁 t󠄁o󠄁o󠄁l󠄁i󠄁n󠄁g󠄁)󠄁.󠄁 |

## S󠄁e󠄁e󠄁 a󠄁l󠄁s󠄁o󠄁

- [V󠄁e󠄁r󠄁i󠄁f󠄁y󠄁 y󠄁o󠄁u󠄁r󠄁 i󠄁n󠄁s󠄁t󠄁a󠄁l󠄁l󠄁](/en/install/verify)
- [C󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁 R󠄁e󠄁f󠄁e󠄁r󠄁e󠄁n󠄁c󠄁e󠄁](/en/self-hosting/configuration)
- [U󠄁p󠄁g󠄁r󠄁a󠄁d󠄁e󠄁 G󠄁u󠄁i󠄁d󠄁e󠄁s󠄁](/en/self-hosting/upgrade-guides)
