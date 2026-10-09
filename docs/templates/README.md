# Page templates

> These are authoring templates, not published pages. Everything under `docs/`
> is internal tooling; the site's published content lives in `src/content/docs/`.

Every doc on this site is one of four types. Before you write, decide which
one you're writing — the type determines the job of the page, and mixing two
jobs into one page is the most common way our docs go wrong.

Starting a new doc means **copying a template**, not starting from a blank
file. Copy the matching file below into `src/content/docs/en/<section>/`,
rename it, and fill in the frontmatter (see [Frontmatter](#frontmatter)) and headings.

| Type | Job | Copy this |
|------|-----|-----------|
| **Concept / Decision guide** | Name a tradeoff between real alternatives, in plain language, *before* configuration. | [`concept-decision-guide.md`](./concept-decision-guide.md) |
| **How-to / Task guide** | Get one specific job done. Narrow and imperative. | [`how-to-task-guide.md`](./how-to-task-guide.md) |
| **Reference** | Document what exists — parameters, endpoints, config keys, flags — precisely. | [`reference.md`](./reference.md) |
| **Architecture note** | Explain *why* a system behaves the way it does, below the level of a decision. | [`architecture-note.md`](./architecture-note.md) |

## Frontmatter

Besides `title` and `description`, every template carries three keys. Starlight
ignores them; they are for authors, reviewers and tooling that audit the docs.

| Key | Values | Meaning |
|-----|--------|---------|
| `pageType` | `concept`, `how-to`, `reference`, `architecture` | The type from the table above. Pre-filled in each template. |
| `audience` | `user`, `admin`, `developer`, `operator` | Who the page is for: people sending and receiving secrets; account, organization and domain administrators; API and client library integrators; self-hosters. |
| `sourceOfTruth` | Source paths, each with a parenthetical naming the claim it backs, separated by `;` | The application files the page was checked against, so a reviewer can re-check it after a release. Paths start at the repository name, e.g. `onetimesecret/lib/onetime/session.rb`. Delete the key on pages that describe no application behaviour. |

See [`upgrading-v0-26-15.md`](../../src/content/docs/en/self-hosting/upgrading-v0-26-15.md)
for a filled-in example.

## How to pick

Ask what the reader is trying to do:

- **Choosing between options they don't yet understand?** → Concept / Decision
  guide. This is the category we are most often missing. Any time the product
  asks someone to pick — a flag, a plan tier, an auth mode, a region, a
  deployment model — there should be a page that reasons about the choice
  before any page tells them how to configure it.
- **Already decided, now doing?** → How-to. Keep it lean. Resist the urge to
  explain the tradeoff here — link to the concept page instead.
- **Looking up an exact value?** → Reference. Prefer generating or
  table-driving these from the source of truth (`billing.yaml`, env-var
  definitions, route lists) so they don't rot.
- **Needs the invariant, not the choice** — an engineer, security reviewer, or
  advanced self-hoster asking "why does it work this way?" → Architecture note.

## The one rule that keeps them honest

A how-to that starts explaining a tradeoff wants to be (or link to) a concept
page. A concept page that lists exact config keys wants to hand off to a
reference. When a page is doing two jobs, split it.
