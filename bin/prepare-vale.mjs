// Vale does not remove in-band provenance before matching terminology rules.
// Normalize ONLY its disposable CI checkout, keeping filenames and line numbers
// for reviewdog. Never use this command to rewrite an author's marked source.
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { clean } from '../src/lib/textprov/html.mjs';
import { frontmatter } from '../tools/frontmatter.mjs';

if (process.env.CI !== 'true' || process.env.GITHUB_ACTIONS !== 'true') throw new Error('prepare-vale runs only in a disposable GitHub Actions checkout');
async function visit(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) await visit(path);
    else if (/\.(md|mdoc)$/.test(entry.name)) {
      const source = await readFile(path, 'utf8');
      let enrolled;
      try { enrolled = frontmatter(source)?.textprov === true; } catch (error) {
        // Vale is report-only; one unparseable file must not fail the workflow.
        console.warn(`prepare-vale: skipping ${path}: ${error.message}`);
        continue;
      }
      if (enrolled) await writeFile(path, clean(source));
    }
  }
}
await visit('src/content/docs/en');
