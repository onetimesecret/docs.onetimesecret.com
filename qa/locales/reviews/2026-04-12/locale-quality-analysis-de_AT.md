date: 2026-04-12
---

Clean answer from the April 15 2025 snapshot (f95b03f44:src/locales/de_AT.json). The mature human-curated de_AT used both
   terms with a semantic split, not either/or:

  Geheimnis — the technical object, lifecycle noun, container. Used in actions and states:
  - burn_this_secret → "Dieses Geheimnis verbrennen"
  - view_secret → "Ansicht Geheimnis"
  - share_a_secret → "Ein Geheimnis teilen"
  - create_new_secret → "Neues Geheimnis erstellen"
  - title_recent_secrets → "Neueste Geheimnisse"
  - destroyed_description → "Das Geheimnis wurde dauerhaft zerstört"
  - expiring_soon → "Geheimnis läuft bald aus"

  Nachricht — the user's content payload, what the recipient actually reads:
  - post_reveal_default → "Ihre sichere Nachricht wird unten angezeigt"
  - your_message_is_ready → "Ihre sichere Nachricht ist bereit"
  - this_message_for_you → "Diese Nachricht ist für Sie bestimmt"
  - encrypted_message → "Diese Nachricht ist verschlüsselt"
  - secret_was_truncated → "Die Nachricht wurde gekürzt"
  - click_to_continue → "Nachricht anzeigen →"

  And formality is uniformly Sie throughout: "Sind Sie sicher, dass Sie dieses Geheimnis verbrennen wollen", "Wenn Sie ein
  Geheimnis verbrennen", "Klicken Sie bitte", "Ihre sichere Nachricht".

  What this changes

  The current de.md guide is wrong to frame the term as a binary choice. Lines 158–177 argue Nachricht "for UI" vs.
  Geheimnis "for technical documentation" — that's an either/or. The actual mature translation uses an object vs. content
  split, not a UI vs. docs split. Both terms appear in UI strings; they refer to different things:

  - Verbs that operate on the record → Geheimnis (burn, share, create, view, destroy, expire)
  - Nouns that describe what the reader sees → Nachricht (the decrypted payload, the content that is revealed, the thing
  that was truncated)

  This is linguistically sound: in German you'd say "Das Geheimnis enthält eine Nachricht" — the secret (container) holds a
   message (content). Collapsing both into one term breaks the metaphor in either direction.

  Implications for the revert plan and the guide update:

  1. The initial "Geheimnis → Nachricht regression" framing was half right. Global replacement of Geheimnis with Nachricht
  broke the split by erasing the container term; but the reverse — demanding Geheimnis everywhere — would break it equally,
   and would contradict the authoritative 2025-04 snapshot. The revert should restore the split, not pick one side.
  2. The de.md guide needs to be corrected, not just clarified. Replace the "Nachricht (UI) / Geheimnis (docs)" section
  with an object-vs-content rule, drawn from the actual term usage in the f95b03f44 snapshot. Pin concrete examples from
  that snapshot — it's much easier to write "burn" + container → Geheimnis; "view revealed content" → Nachricht than to
  rely on a translator's judgment about what "sounds too personal".
  3. The revert-and-merge script needs a new validation step. After reverting, lint each de_AT file to confirm it preserves
   the object/content split — i.e., no string where Nachricht is the object of verbrennen/teilen/erstellen/löschen (those
  demand Geheimnis), and no string where Geheimnis appears in post_reveal / encrypted_message / message_ready contexts
  (those demand Nachricht). This is a grep-level check, not a full NLP task.
  4. The 2025-04-15 snapshot is the authoritative baseline, not e5fe5566f^. f95b03f44 predates the directory split (de_AT
  was still a single JSON file). The reverted content needs to be mapped from the old flat structure into the current
  per-file layout. That's more work than a straight git checkout per file, but it's the only way to get the Sie +
  Geheimnis/Nachricht-split baseline the locale actually had.

The de_AT regression isn't a one-off translation agent mistake — it's the endpoint of a
five-month drift that the guide documents themselves made inevitable.

The mechanism: change-log promoted to guidance

de-translation-notes.txt is a conversational transcript: user asks "what did you change and why", assistant answers.
Descriptive. Every paragraph is about a specific locale and a specific set of edits the assistant made. When the
assistant said "The existing partial translations predominantly used the informal 'Du'. This was made consistent across
user-facing instructions and questions" (line 69), it was describing what it did to the DE (Germany) locale, not what
anyone should do going forward, and not anything about de_AT.

language-notes.md lines 56–122 are a near-verbatim copy of that conversation's "Thinking Behind Changes & Important
Examples" section. No regional tagging, no distinction between descriptive and prescriptive, no mention that the du-form
examples are DE-only. A translation agent reading this file for de_AT guidance sees:
- A table (line 128) saying Förmliche Anrede: du (informal - DE), Sie (formal - AT) — correct.
- Examples at lines 77, 79, 86, 117–118 using du-form as patterns to imitate — no regional qualifier.
- A "Regional Formality Considerations" section at line 134 that correctly says AT uses Sie — added later, as a band-aid,
  without removing the conflicting examples earlier in the same file.

An agent trying to honor both sections picks the most literal signal: the examples. That's how b08e59838 got "Gib deine
Anmeldedaten ein" — it's lifted straight from the example patterns in language-notes.md lines 117–118.

The glossary vs. language-notes contradiction

glossary.md line 14: secret (noun) | Geheimnis | Geheimnis for both DE and AT. Line 121: "einheitlich als Geheimnis
übersetzt werden". Categorical.

language-notes.md section 1 (lines 12–38): secret → Nachricht (UI) / Geheimnis (technical documentation), arguing
Geheimnis is "too personal/intimate", and the example Sie haben 3 neue Nachrichten. Directly contradicts the glossary it
nominally supplements.

Neither document captures what the actual mature de_AT locale did in 2025-04: Geheimnis for the record (burn, share,
create, view, destroy) and Nachricht for the payload content (what is revealed, encrypted, truncated). The
object-vs-content split has no source in either guide file. Whoever ran the harmonization pass had no way to reproduce it
  from the guide — because the guide doesn't describe it.

The unused early warning

The 2025-11-16 locale-quality-analysis-de.md is the smoking gun. It analyzed the DE docs locale — the locale
language-notes.md says should use du — and found:
- "Inconsistent formality (mixing informal 'du' with formal forms)" as a critical issue (§3)
- Explicit recommendation: "Use formal 'Sie' exclusively" for DE docs (line 175, line 373)
- Example fix patterns: "Wenn du Fragen hast, kontaktiere uns" → "Wenn Sie Fragen haben, kontaktieren Sie uns"

This review, done five months before the April 2026 de_AT regression, says the current guide-endorsed du-form produces
unprofessional output even in the DE locale it was designed for. The review wasn't propagated back as a correction to
language-notes.md. The bad guidance persisted. Then a translation agent ran against de_AT using the same guide, and the
exact pattern the Nov 2025 review warned about happened again, in the locale that was supposed to be Sie in the first
place.

The u?/umlaut encoding issue in that review is a red herring — a file-handling bug specific to the docs project. But the
formality finding is a direct indictment of language-notes.md, and it was available for five months before it mattered.

The feedback loop has no human anchor

Trace the loop:
1. An assistant translates the DE locale in OneTimeSecret (picking du because the existing partial DE strings used du).
2. The assistant is asked to report what it did → de-translation-notes.txt.
3. Someone copy-pastes that report into docs.onetimesecret.com's translation guide → language-notes.md.
4. The app project's locales/guides/for-translators/de.md is generated from the docs project.
5. A future translation agent reads the guide to translate de_AT.
6. Go to 1.

Nothing in this loop consults a native-speaker review, the 2025-04 human-curated de_AT.json, or the November 2025 QA
analysis. The April 2026 de_AT regression is the output of five months of assistant→assistant copying with no human in
the loop. The glossary's Geheimnis rule and the "Regional Formality Considerations" section are the only human-authored
anchors in the chain, and they're contradicted by the transplanted change-log content sitting in the same files.

Concrete retrospective implications

The revert baseline question is settled. f95b03f44 (2025-04-15) is the last known-good human-curated de_AT content. It
predates the assistant→guide→assistant loop. It has Sie formality and the object/content split. It's the only defensible
baseline. e5fe5566f^ is downstream of the corrupting loop and carries partial du-form drift.

The guide repair is the real deliverable, not the locale revert. Reverting locale files without fixing language-notes.md
means the next translation pass regenerates the exact same regression. Order of operations: fix language-notes.md (strip
the change-log content, tag every example by region, remove du-form patterns from AT-relevant sections, add the
object/content split rule with f95b03f44 examples), reconcile glossary.md's "always Geheimnis" rule with that split, then
  revert + replay the locale files against the fixed guide.

The November 2025 review should be re-read as a pre-mortem. Its recommendations for DE docs (formal Sie, consistent tone,
  encoding discipline) apply to every locale that goes through the same pipeline. Ignoring it cost five months and
produced the de_AT regression. It's worth auditing what other locales the loop has since touched — hu, el_GR, he all
appear in recent harmonization commits on this branch — to see if the same du-form/Nachricht patterns leaked into them.

The feedback loop itself needs an anchor. Whatever the guide-update mechanism is, it needs at least one non-agent input:
a pinned human-curated reference per locale (f95b03f44 for de_AT), or a native-speaker review gate before guide changes
land, or both. Without an anchor, the loop will drift again — probably in the same direction, since the du-form examples
are still in the source guide as of now.
