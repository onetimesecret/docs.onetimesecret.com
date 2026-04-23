Read both the SKILL.md, the agent profile, and the translation-guide.md + glossary.md references. The skill has specific
failure modes that enabled the de_AT regression. In order of severity.

The Danish example teach an incomplete lesson, but it's not wrong.. translation-guide.md:148-161 teaches a correct lesson for Danish: in "Du har 3
  nye …" contexts, Beskeder reads more naturally than the literal Hemmeligheder. The problem is the framing invites
  overgeneralization. An agent reads "prefer the less-literal term because the literal one feels too personal" and infers a
  general rule: always prefer the non-literal translation for UI. That inference produced the Geheimnis → Nachricht global
  substitution in de_AT — which is wrong, because German demonstrably uses both terms with different meanings. Geheimnis is the
   record/container (object-level verbs operate on it); Nachricht is the revealed content the recipient reads. Evidence:
  f95b03f44:src/locales/de_AT.json (the 2025-04 mature de_AT baseline) uses both, contextually split: "Dieses Geheimnis
  verbrennen" + "Ihre sichere Nachricht ist bereit".

  Two things the skill is missing:

  1. The object/content split as a named concept. Some polysemous source terms map to two target-language terms depending on
  whether the term refers to the lifecycle object or the content a user reads. German secret is the clear example; other
  languages may or may not split similarly. The rule: before picking a single translation for a core term, check whether the
  source term is acting as a lifecycle object (created, shared, burned, expired) or as content the recipient reads (revealed,
  displayed, encrypted in transit). If those are different words in the target language, both are needed.
  2. A "scope of the lesson" marker on single-language examples. The Danish case should stay, but framed as what it actually
  is: a Danish-specific observation, not a general principle. "In Danish, prefer Beskeder for UI contexts like Du har 3 nye ...
   because Hemmeligheder carries personal/intimate connotations. This is a Danish-specific preference — do not extrapolate to
  other languages without checking their own conventions."m is acting as a lifecycle object or as content the user reads — they may be different words in the
target language."

glossary.md is internally contradictory and ships project-specific choices as universal

Row 16: secret (noun) | Geheimnis | Geheimnis. Row 30: Share a secret | Geheimen Link erstellen | Ein Geheimnis teilen — the
DE cell doesn't use Geheimnis at all, contradicting row 16. Row 20: burn | zerstören | zerstören — but my project's in-tree
glossary uses verbrennen for AT (and löschen for DE). Row 32: Sign In | Anmelden | Eintragen asserts an AT-specific
difference that may or may not reflect current practice.

These aren't abstract problems — they're the same kind of contradiction that made the project's own de.md internally
inconsistent (Geheimnis in the table, Nachricht in the prose). The skill ships with this and then gets overlaid on project
guides, so the agent sees two inconsistent sources and has to reconcile.

Deeper issue: the skill's reference files hard-code onetimesecret-specific terminology decisions (Sicherheitsphrase,
benutzerdefinierter Bereich, Eintragen) while presenting them as general. Any other project using the skill inherits those
choices as defaults. The skill should either (a) strip the language tables and say "consult the project's glossary", or (b)
mark the tables clearly as "example from one project, not prescriptive" — which weakens their usefulness. Option (a) is
cleaner. Terminology belongs in projects, not in the skill.

No rule distinguishing "harmonization" from "rewrite"

b08e59838 was labeled "Harmonize Austrian German locale" and the agent executing it replaced Sie with du across 20 files.
Harmonization is a legitimate operation — aligning key structures, interpolation placeholders, ordering — but it never
touches text field values. The skill has no rule that says this. Anywhere. The agent saw the task as a translation task and
did what translators do: rewrite the text.

The skill should say: "harmonize" means key-structure only. If a task framed as harmonization asks you to change translation
text, the task is mislabeled — stop and clarify before proceeding.

No rule for "when file state and project guide disagree, trust the guide"

4982d4f84 was the first wave that introduced some du-form strings alongside existing Sie-form. A later agent opened the file,
  saw mixed state, and concluded the locale "preferred" informal. It then harmonized downward. The skill's workflow
(SKILL.md:14-21) has no step for "if current file state contradicts the project's per-locale guide, the guide wins and the
current state is the bug". Without that rule, any regression becomes self-propagating: each pass sees the previous pass's
output and treats it as canon.

No formality-lock or register-lock concept

Formality is mentioned (translation-guide.md:69-72, glossary.md:134-136) but as preference, never as lock. There's no rule
like: "once a project's guide specifies a register for a locale (formal Sie, informal tu, honorific 호-suffix Korean, etc.),
that register is a hard constraint — bulk operations that flip it across multiple files are regressions, not improvements,
regardless of what the current file state looks like." This is the specific check that would have blocked b08e59838.

No mature-baseline workflow step

The SKILL.md workflow goes: scope → read files → translate → validate → submit. There is no "before making large changes to
an existing locale, check what the mature hand-curated state looked like" step. In our case, git show
f95b03f44:src/locales/de_AT.json was trivially reachable and would have shown Sie + Geheimnis/Nachricht split within 30
seconds. The agent never looked.

The skill should add something like: "If your task touches more than N keys in an existing locale, first check a git snapshot
  from 12+ months ago or a pinned 'reference baseline' commit (if the project guide names one) to confirm tone, register, and
term usage. Large deviations from the baseline are a stop-and-ask signal, not a go-ahead."

No anti-patterns list

The skill has positive rules (preserve variables, imperative for buttons, distinguish password/passphrase). It has no list of
  "things that look like improvements but are regressions":
- Global find-replace of a brand/core term across a locale
- Register flips during cleanup or harmonization
- Replacement of localized placeholder data with US defaults (kontakt@musterfirma.gv.at → tom@myspace.com)
- Leaving English prose in the output when the phrase isn't on a brand-terms allowlist (Powered by)
- "Matching existing file state" when the file state contradicts the project guide
- Standardizing on one term where two context-dependent terms are correct

All five of these happened in the 2026-04 regression. The skill names none of them.

No placeholder-data rule

Nothing in the skill tells an agent that example/placeholder data is a localization surface: example email addresses, example
  names, example domains, example phone formats. kontakt@musterfirma.gv.at exists because someone localized the placeholder —
replacing it with tom@myspace.com erases that localization. The skill should call out placeholder data as something to
preserve and adapt, not to normalize.

Workflow never says "stop and ask before making large-scale changes"

The skill's one-task-at-a-time discipline is good, but within a single task the agent has no "pause and escalate" rule for
scale. If a task is "translate file X" and the agent decides mid-task to "also flip the register in file X because the
current state looks inconsistent with the rest of the locale", nothing stops it. The skill should say: "if your work within a
  task expands from translation to rewriting existing content in bulk, stop and ask the orchestrator before proceeding."

Agent profile and SKILL.md drift

The agent file at dotclaude/agents/saas-translator.md and the skill at dotclaude/skills/saas-translator/SKILL.md cover
overlapping ground with slightly different wording. Agent file says "Check ./locales/guides/for-translators/{LOCALE}.md if
present before translating" — singular, with if present. SKILL.md is firmer: "Do not skip the shared guides." The firmer
framing is right; the conditional framing in the agent file creates wiggle room an agent can hide in.

---
Summary of the top four changes to make

1. Replace the Danish binary example with an object/content split example. This is the single most leveraged change — it
rewrites the mental model the skill teaches for polysemous brand terms.
2. Add "harmonize = keys only, never text" as an explicit rule. Direct block on the specific failure mode.
3. Add "if file state contradicts the project guide, guide wins" as an explicit rule. Prevents the self-propagation loop.
4. Strip project-specific terminology tables from glossary.md or mark them as non-prescriptive examples. The skill's
reference files should teach how to resolve terminology, not hand-code one project's answers.

The lint recommendation (CI grep for \bdu\b in de_AT/**.json) I put in the new de_AT.md is the mechanical complement — prose
guides get skimmed, linters don't. But that lives in the project, not in the skill. The skill's job is to prevent the agent
from deciding the lint was wrong in the first place.
