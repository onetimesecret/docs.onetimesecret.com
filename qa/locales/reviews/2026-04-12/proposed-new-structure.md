Something like this, that can mechanically produce the locale specific guide (including the UX and security guidelines):

```
translation-rules/
├── base.yaml                    # Universal rules
├── base/docs/                   # Rationale prose the resolver embeds
├── baselines.yaml               # {locale: {commit: sha, path: ..., justification: ...}}
├── de/
│   ├── rules.yaml               # German grammar overlay
│   ├── register.yaml            # Formality for DE
│   └── glossary.yaml            # DE terms
├── de_AT/
│   ├── rules.yaml               # AT overrides to DE rules
│   ├── register.yaml            # AT formality (Sie, no exceptions)
│   └── glossary.yaml            # AT-specific terms
├── resolve.py                   # Merge script
└── tests/                       # Resolver test fixtures
    ├── inheritance/
    └── lint/
```

**⏺ The shape is right — this is the loop-breaker.** Rules are hand-edited, outputs are generated, agents read outputs but can't write back to them. The only way new guidance enters the system is a human PR to a YAML file. That kills the assistant→change-log→guide→assistant round trip definitively.

## Refinements and Missing Pieces

### base.yaml Structure

`base.yaml` absorbs most of the current UX and security guides. What reduces cleanly to rules (interpolation preservation, number format, "no emojis in UI strings", "don't translate brand names", placeholder semantics) becomes `base.yaml` keys. What doesn't reduce — rationale prose, brand voice, "why we translate error messages conservatively" — stays as `base/docs/*.md` and the resolver embeds those verbatim into output sections. Rules drive the lint; prose drives the reader. Both come from the same tree.

### Structured Glossary

`glossary.yaml` needs to carry structured examples, not just term pairs. The highest-leverage content in the current `glossary.md` and `language-notes.md` is worked examples — English source, translated target, context. Those need to be first-class data so the lint has teeth:

```yaml
terms:
  secret_object:        # the record/container
    en: secret
    de: Geheimnis
    de_AT: Geheimnis
    contexts: [burn, share, create, view, destroy, expire]
  secret_payload:       # the revealed content
    en: message
    de: Nachricht
    de_AT: Nachricht
    contexts: [post_reveal, encrypted, truncated]

examples:
  - id: login_password_prompt
    en: "Enter your password"
    de: "Gib dein Passwort ein"
    de_AT: "Geben Sie Ihr Passwort ein"
    rule_refs: [register.de_AT.formality]
```

Now `resolve.py --lint` can assert: every example in `de_AT` conforms to `register.de_AT.formality = Sie`; every string containing the English word "secret" in a burn/share/create context maps to "Geheimnis" not "Nachricht"; every interpolation `{var}` in en is preserved in targets. The rule tree becomes its own test suite.

### Hard Enums for Register

`register.yaml` should be a hard enum, not prose. For `de_AT`:

```yaml
formality:
  value: formal
  pronouns: [Sie, Ihr, Ihnen, Ihre]
  forbidden: [du, dein, dich, dir, deine, deinen]
  rationale: "Austrian B2B default. Locked — see baselines.yaml commit f95b03f44."
  exceptions: []   # explicit empty list, not missing
```

The `forbidden` list is what the CI lint greps against `locales/content/de_AT/*.json`. Prose-only rules are how the April 2026 regression slipped past.

### Explicit Inheritance Semantics

Inheritance semantics need to be explicit, not implicit. "de_AT overrides de" is ambiguous — what happens to lists, to nested objects, to the exceptions array? Proposal: deep-merge for maps, replace for scalars, `merge_strategy` key on lists (`append` | `replace` | `prepend` | `dedup`). Put it in the resolver spec, not in tribal knowledge. The resolver needs its own tests for this.

### Baselines and Tests

`baselines.yaml` is what my earlier structural proposal called `baselines.md` but in machine form — one commit pin per locale with justification. The resolver uses it for regression checks: "does the current locale content still agree with the baseline on any key that exists in both?" If not, flag the drift.

`tests/` is the unglamorous necessity — the resolver has merge logic, the lint has assertions, both need tests. Without them the resolver becomes the new drift vector.

### Dual-Output Resolver

The resolver produces two things from one input:

1. **Human-readable guides for translators:** `docs.onetimesecret.com/src/content/docs/<lang>/translations/*.md` (Astro frontmatter, prose embedded from `base/docs/`) and `onetimesecret/locales/guides/for-translators/<locale>.md` (with `# GENERATED — source: translation-rules/ commit X` header).
2. **Machine-readable merged data for tooling and agents:** `onetimesecret/locales/guides/.resolved/<locale>.json`. This is what the CI lint reads. This is what a translation agent ingests for structured context instead of parsing Markdown prose.

Same source, two audiences, zero copy-paste. The lint runs against the JSON, not the Markdown, so prose edits can't desync the rules.
