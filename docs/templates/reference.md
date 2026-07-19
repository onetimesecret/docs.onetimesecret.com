---
title: <Noun of the thing being documented — e.g. "Environment variables">
description: <One sentence: what surface this page documents exhaustively.>
---

<!--
REFERENCE
Job: document what exists — parameters, endpoints, config keys, CLI flags —
precisely and exhaustively. Reference reports; it does not reason. If a reader
needs to know WHICH value to pick, that's a decision guide; link to it, don't
recreate it here.

GENERATE OR TABLE-DRIVE THIS WHERE POSSIBLE. If the source of truth exists in
the codebase (billing.yaml, env-var definitions, route lists), derive this page
from it rather than hand-maintaining a parallel copy that will drift. Note the
source below so the next maintainer knows where the truth lives.

Source of truth: <path/to/source, or "hand-maintained — no upstream source">

Delete these comments before publishing.
-->

<!-- One sentence stating what this page covers and, if relevant, the version
it reflects. -->

## <Group of entries>

<!-- One table per logical group. Keep column set consistent across the page.
Include type/default/required where they apply — those are the columns readers
scan for. -->

| Name | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `<KEY>` | `<type>` | `<default>` | <yes/no> | <what it controls> |
| `<KEY>` | `<type>` | `<default>` | <yes/no> | <what it controls> |

## <Second group>

| Name | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `<KEY>` | | | | |

## See also

<!-- Point to the how-to that uses these values and the concept page that
explains which to choose. -->

- [<How-to that applies these>](./<slug>)
- [<Decision guide for the choices these encode>](./<slug>)
