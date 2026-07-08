---
title: <Why ___ works the way it does>
description: <One sentence: the invariant or behaviour this note explains, and for whom.>
---

<!--
ARCHITECTURE NOTE
Job: explain WHY a system behaves the way it does, below the level of a
decision. Audience: engineers, security reviewers, advanced self-hosters who
need the invariant, not the choice. Lower volume than the other types, highest
trust payoff — this is what substantiates claims like "server-side encryption"
or "we can't read your secrets".

Be precise and verifiable. State invariants as invariants. If you can't stand
behind a sentence under scrutiny, cut it. Link to the code, RFC, or config that
enforces what you're describing.

Delete these comments before publishing.
-->

## What guarantee this provides

<!-- State the invariant up front, in one or two sentences, as plainly as you
can. This is the claim the rest of the note substantiates. -->

## How it works

<!-- The mechanism. Enough detail that a skeptical reader can follow the chain
from behaviour back to the property. Diagrams, data flow, lifecycle — whatever
makes the invariant legible. -->

## What it does and does not protect against

<!-- The honest boundary. Every real guarantee has an edge; naming it is what
makes the rest credible. State the threat model: what an attacker (or operator,
or bug) can and cannot do. -->

**Protects against:** <...>

**Does not protect against:** <...>

## Where this is enforced

<!-- Point at the mechanism of record: the code path, config default, or
external dependency that makes the invariant true. This is what lets a reviewer
check the claim rather than trust it. -->

## Related

- [<Decision or how-to page that relies on this guarantee>](./<slug>)
