#!/usr/bin/env node
//
// sidebar-render.mjs — print config/sidebar.mjs as an indented text outline.
//
// The sidebar is a nested array of createLink/createGroup calls, which is the
// right shape for Starlight and the wrong shape for a human comparing two
// versions of it. This renders the evaluated tree one entry per line, so two
// renders diff cleanly and a reviewer can read the whole navigation at once:
//
//   Home -> /
//   [Start here]
//     Where to begin -> start
//   [Translations & contributing] (collapsed)
//     ...
//
// Groups print as "[label]", with "(collapsed)" when collapsed by default.
// Links print as "label -> link", with "{badge text}" appended when the entry
// has a badge. Labels are the English ones (sidebar.mjs resolves them from
// src/content/i18n/en.json), so a mistyped key shows up here as the raw key.
//
// Usage:
//   node bin/sidebar-render.mjs                    # this checkout
//   node bin/sidebar-render.mjs <path/to/sidebar.mjs>
//
// The optional argument exists for comparing refs. sidebar.mjs reads the i18n
// bundles relative to its own location, so point it at a tree that has both
// config/ and src/content/i18n/ — for example:
//
//   tmp=$(mktemp -d)
//   git archive main config src/content/i18n | tar -x -C "$tmp"
//   node bin/sidebar-render.mjs "$tmp/config/sidebar.mjs" > /tmp/sidebar-main.txt
//   node bin/sidebar-render.mjs > /tmp/sidebar-branch.txt
//   diff /tmp/sidebar-main.txt /tmp/sidebar-branch.txt
//
// Read-only: it evaluates the module and prints. Validation lives in
// bin/check-nav.mjs and bin/check-orphans.mjs.
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

import { repoRoot } from "./lib/nav.mjs";

const target = process.argv[2]
  ? resolve(process.cwd(), process.argv[2])
  : resolve(repoRoot, "config", "sidebar.mjs");

const { sidebar } = await import(pathToFileURL(target).href);

const badgeText = (badge) => (typeof badge === "string" ? badge : badge.text);

function render(items, depth = 0) {
  const indent = "  ".repeat(depth);
  for (const item of items) {
    if (item.items) {
      console.log(`${indent}[${item.label}]${item.collapsed ? " (collapsed)" : ""}`);
      render(item.items, depth + 1);
    } else {
      console.log(`${indent}${item.label} -> ${item.link}${item.badge ? ` {${badgeText(item.badge)}}` : ""}`);
    }
  }
}

render(sidebar);
