<!--
Default PR template. Submitting a translation? Use the translation template
instead by appending ?template=translation.md to the PR URL.
-->

## What changed

<!-- Briefly describe the change and why. -->

## Page taxonomy

Every page is one of four types (see [`docs/templates/`](../docs/templates/)):
Concept / Decision guide, How-to, Reference, or Architecture note. New pages
should start from a template.

- [ ] **Does this change introduce a decision axis** — a new flag, plan tier,
  entitlement, region, or config choice? If so, is there a Concept / Decision
  guide that reasons about the choice (not just a how-to that configures it),
  created or updated in this PR?
- [ ] N/A — this change introduces no new decision the reader has to make.

## Checklist

- [ ] Internal links resolve within the current locale (no 404s) — either relative (`./page`) or locale-prefixed absolute (`/en/page`)
- [ ] New pages were copied from a [template](../docs/templates/) and match its type's job
- [ ] Sidebar and translation keys updated if navigation changed
