// src/lib/textprov/version.ts
//
// The TextProv display version the reader toggle paints, as YYYY-MM-DD.family.
// It names the reveal treatment, not the textprov package or the wire format.
// Keep it equal to --textprov-display-version in src/styles/textprov.css
// (display.test.ts checks the two agree) and to the upstream version the
// stylesheet was adapted from: textprov/textprov docs/development/display-versions.md.
export const DISPLAY_VERSION = '2026-10-27.asterisk';
