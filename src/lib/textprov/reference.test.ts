import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { createRequire } from 'node:module';
import { JSDOM } from 'jsdom';
import { describe, expect, it } from 'vitest';
import textprov from 'textprov';
import { renderProvenance } from './html.mjs';

// The published npm package is the reference implementation. Its UMD entry is
// evaluated in a browser-like document so the docs adapter can be compared
// against the renderer that ships with the same release.
const require = createRequire(import.meta.url);
const runtime = readFileSync(require.resolve('textprov'), 'utf8');
const canonical = readFileSync(require.resolve('textprov/textprov.css'), 'utf8');
// package.json is outside the package's exports map, so locate it beside the entry.
const installed = JSON.parse(readFileSync(join(dirname(require.resolve('textprov')), 'package.json'), 'utf8')) as { version: string };
const pinned = JSON.parse(readFileSync(new URL('../../../package.json', import.meta.url), 'utf8')) as {
  dependencies: Record<string, string>;
};
const ai = (text: string) => textprov.segments(text).map((cluster: string) => /\s/u.test(cluster) ? cluster : cluster + '\u{E0101}').join('');

// Exact attribution must match upstream; bounded passage context is a docs-only
// presentation policy and deliberately differs from upstream block expansion.
function projection(doc: Document, exact: string) {
  const result: { text: string; exact: boolean }[] = [];
  const walker = doc.createTreeWalker(doc.querySelector('.sl-markdown-content')!, 4);
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    const parent = node.parentElement!;
    for (const text of Array.from(node.textContent!)) {
      result.push({ text, exact: !!parent.closest(exact) });
    }
  }
  return result;
}

describe('published TextProv reference contract', () => {
  it('runs against the exact release pinned in package.json', () => {
    expect(pinned.dependencies.textprov).toMatch(/^\d+\.\d+\.\d+$/);
    expect(installed.version).toBe(pinned.dependencies.textprov);
  });

  it('keeps the adapted presentation defaults equal to the canonical stylesheet', () => {
    const adapted = readFileSync(new URL('../../styles/textprov.css', import.meta.url), 'utf8');
    const defaults = (css: string, prefix: string) => Array.from(css.matchAll(
      new RegExp(`--${prefix}-(tint|dot-strength|glow-opacity|glow-blur|glow-spread):\\s*([^;]+);`, 'g'),
    ), match => [match[1], match[2]]);
    expect(defaults(adapted, 'textprov')).toEqual(defaults(canonical, 'prov'));
  });

  it.each([
    `<p>C\u{E0101}ho\u{E0101}ose a ${ai('guide')} <em>for what</em> <a href="/next">you want</a> to do next.</p><p>Plain paragraph.</p>`,
    `<h2>${ai('Heading')}</h2><ul><li>Old ${ai('new')} end.</li><li>Plain.</li></ul><table><tr><td>${ai('日本語')} text</td><td>Plain cell.</td></tr></table>`,
    `<p>Legacy \u{100041}I and ${ai('café')} text. <code>Unmarked code</code></p>`,
  ])('matches the reference renderer for exact characters: %s', html => {
    const source = `<div class="sl-markdown-content">${html}</div>`;
    const upstream = new JSDOM(source, { runScripts: 'outside-only' });
    upstream.window.eval(runtime);
    // This is the browser entry point exposed by the package's UMD build.
    const renderer = (upstream.window as unknown as {
      textprov: { render: (root: Element, options: { strip: boolean }) => void };
    }).textprov;
    renderer.render(upstream.window.document.querySelector('.sl-markdown-content')!, { strip: true });
    const docs = new JSDOM(renderProvenance(source, { requireEnrollment: false }));
    expect(projection(docs.window.document, '.textprov-ai'))
      .toEqual(projection(upstream.window.document, '[data-prov]'));
    // Every exact mark still has context, but unmarked paragraph tails do not.
    expect([...docs.window.document.querySelectorAll('.textprov-ai')]
      .every(node => node.closest('[data-textprov-passage]'))).toBe(true);
    const coverage = (doc: Document, selector: string) => [...doc.querySelectorAll(selector)]
      .map(node => node.textContent).join('').length;
    expect(coverage(docs.window.document, '[data-textprov-passage]'))
      .toBeLessThan(coverage(upstream.window.document, '[data-prov-passage]'));
    upstream.window.close();
    docs.window.close();
  });
});
