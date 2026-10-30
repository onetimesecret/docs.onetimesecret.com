// bin/reference/fixtures/snapshot-inputs.mjs
//
// The fixture upstream inputs under fixtures/snapshot/, shaped the way
// `bin/reference.mjs refresh` hands them to the configuration extractor.
import { readFileSync } from "node:fs";

import { CONFIG_ROLES } from "../extract-config.mjs";
import { sha256 } from "../manifest.mjs";

export const SNAPSHOT_PATHS = {
  "config-defaults": "etc/defaults/config.defaults.yaml",
  "auth-defaults": "etc/defaults/auth.defaults.yaml",
  "logging-defaults": "etc/defaults/logging.defaults.yaml",
  "billing-example": "etc/examples/billing.example.yaml",
};

export function fixtureText(role) {
  return readFileSync(new URL(`./snapshot/${SNAPSHOT_PATHS[role]}`, import.meta.url), "utf8");
}

/** Inputs as refresh hands them over, with any role's text or path overridden. */
export function inputsFor({ texts = {}, paths = {} } = {}) {
  return new Map(
    CONFIG_ROLES.map((role) => {
      const text = texts[role] ?? fixtureText(role);
      return [
        role,
        {
          role,
          path: paths[role] ?? SNAPSHOT_PATHS[role],
          text,
          sha256: sha256(text),
          lines: (text.match(/\n/g) ?? []).length,
        },
      ];
    }),
  );
}
