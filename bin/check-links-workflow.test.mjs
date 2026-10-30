import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import { extname } from 'node:path';
import { parse } from 'yaml';

const root = new URL('../', import.meta.url);
const workflow = parse(readFileSync(new URL('.github/workflows/check-links.yml', root), 'utf8'));
const step = workflow.jobs['check-internal-links'].steps.find(step => step.uses?.startsWith('lycheeverse/lychee-action@'));
const extensions = step.with.args.match(/--fallback-extensions\s+(\S+)/)[1].split(',');

// Source checks resolve page files; component-generated fragment IDs are checked
// separately by check:reference:html against the production build.
describe('internal link workflow target resolution', () => {
  it.each(['md', 'mdoc', 'mdx'])('resolves extensionless links to .%s pages', extension => {
    expect(extensions).toContain(extension);
  });

  it('covers every source format in the reference directory', () => {
    const pages = readdirSync(new URL('src/content/docs/en/reference/', root));
    expect(pages).toContain('environment-variables.mdx');
    for (const page of pages) {
      expect(extensions, page).toContain(extname(page).slice(1));
    }
    expect(step.with.fail).toBe(true);
  });
});
