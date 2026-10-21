import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, it, expect } from 'vitest';
import { vendoredModule } from '../../../config/textprov.mjs';

// The dev server runs the vendored UMD bundle as an ES module through this
// transform. Production and Vitest load it through CommonJS interop instead,
// so nothing else exercises the dev path.
const path = fileURLToPath(new URL('../../../vendor/textprov/textprov.cjs', import.meta.url)).replaceAll('\\', '/');
const source = readFileSync(path, 'utf-8');

describe('TextProv dev transform', () => {
  it('exports the decoder when the bundle runs as an ES module', async () => {
    const result = vendoredModule.transform(source, `${path}?v=1`);
    expect(result).not.toBeNull();
    const url = `data:text/javascript;base64,${Buffer.from(result!.code).toString('base64')}`;
    const { default: textprov } = await import(/* @vite-ignore */ url);
    expect(typeof textprov.runs).toBe('function');
    expect(typeof textprov.segments).toBe('function');
  });

  it('prefixes the first line, so bundle line numbers do not shift', () => {
    const result = vendoredModule.transform(source, path);
    expect(result!.code.split('\n').length).toBe(source.split('\n').length + 2);
  });

  it('leaves other modules alone', () => {
    expect(vendoredModule.transform(source, '/elsewhere/textprov.cjs')).toBeNull();
  });
});
