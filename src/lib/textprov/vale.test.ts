import { mkdtempSync, mkdirSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { it, expect } from 'vitest';

it('prepares only enrolled Vale input in a disposable checkout and preserves line numbers and genuine IVS', () => {
  const root = mkdtempSync(join(tmpdir(), 'docs-textprov-vale-'));
  try {
    const directory = join(root, 'src/content/docs/en');
    mkdirSync(directory, { recursive: true });
    const marked = '---\ntextprov: true\n---\n\nIdentity\u{E0101} plan. 辻\u{E0100}\n';
    writeFileSync(join(directory, 'marked.mdoc'), marked);
    const legacy = marked.replace('textprov: true', 'textprov: false');
    writeFileSync(join(directory, 'legacy.md'), legacy);
    const script = fileURLToPath(new URL('../../../bin/prepare-vale.mjs', import.meta.url));
    const denied = spawnSync(process.execPath, [script], { cwd: root, env: { ...process.env, CI: 'false' }, encoding: 'utf8' });
    expect(denied.status).not.toBe(0);
    expect(readFileSync(join(directory, 'marked.mdoc'), 'utf8')).toBe(marked);
    const result = spawnSync(process.execPath, [script], { cwd: root, env: { ...process.env, CI: 'true' }, encoding: 'utf8' });
    expect(result.status, result.stderr).toBe(0);
    expect(readFileSync(join(directory, 'marked.mdoc'), 'utf8')).toBe(marked.replace('\u{E0101}', ''));
    expect(readFileSync(join(directory, 'legacy.md'), 'utf8')).toBe(legacy);
  } finally { rmSync(root, { recursive: true, force: true }); }
});
