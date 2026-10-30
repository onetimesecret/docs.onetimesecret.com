// src/components/config-generator/legacy-route.test.ts
//
// The route move is only safe if a bookmarked URL keeps working, so the
// forwarding rule gets its own tests rather than being reviewed by eye.
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

import {
  GENERATOR_ROUTE,
  LEGACY_GENERATOR_ROUTE,
  generatorTarget,
} from './legacy-route';

describe('generatorTarget', () => {
  it('keeps the query string that holds the reader’s selections', () => {
    expect(generatorTarget('?auth=full&datastore=valkey')).toBe(
      `${GENERATOR_ROUTE}?auth=full&datastore=valkey`,
    );
  });

  it('keeps the #apply-configuration fragment', () => {
    expect(generatorTarget('', '#apply-configuration')).toBe(
      `${GENERATOR_ROUTE}#apply-configuration`,
    );
  });

  it('keeps both, in the order a URL puts them', () => {
    expect(generatorTarget('?auth=full', '#apply-configuration')).toBe(
      `${GENERATOR_ROUTE}?auth=full#apply-configuration`,
    );
  });

  it('adds no stray punctuation when there is nothing to carry', () => {
    expect(generatorTarget()).toBe(GENERATOR_ROUTE);
    expect(generatorTarget('', '')).toBe(GENERATOR_ROUTE);
    expect(generatorTarget('?', '#')).toBe(GENERATOR_ROUTE);
  });

  it('accepts the bare forms as well as the browser’s', () => {
    expect(generatorTarget('auth=full', 'apply-configuration')).toBe(
      `${GENERATOR_ROUTE}?auth=full#apply-configuration`,
    );
  });
});

describe('the retired route', () => {
  const source = readFileSync(
    new URL('../../pages/en/self-hosting/configuration-generator.astro', import.meta.url),
    'utf8',
  );

  it('forwards through generatorTarget rather than a fixed URL', () => {
    expect(source).toContain('generatorTarget(window.location.search, window.location.hash)');
  });

  it('still answers at the slug the redirect table skips for English', () => {
    expect(LEGACY_GENERATOR_ROUTE).toBe('/en/self-hosting/configuration-generator/');
  });

  it('keeps a no-JavaScript path to the new route', () => {
    expect(source).toContain('http-equiv="refresh"');
    expect(source).toContain('<noscript>');
  });

  it('carries no copy of the tool', () => {
    expect(source).not.toContain('ConfigGenerator');
  });
});
