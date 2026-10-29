// src/lib/textprov/version.ts
//
// The TextProv display version the reader toggle paints, as v<spec version>-<family>.
// The prefix is the TextProv spec (proposal) version the treatment was designed
// against, not the textprov package version and not the 0.2 experiment identifier.
// Keep it equal to --textprov-display-version in src/styles/textprov.css
// (display.test.ts checks the two agree) and to the upstream version the
// stylesheet was adapted from: textprov/textprov docs/development/display-versions.md.
export const DISPLAY_VERSION = 'v0.3.0-asterisk';
