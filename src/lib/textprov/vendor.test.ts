import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { JSDOM } from 'jsdom';
import { describe, expect, it } from 'vitest';
import { renderProvenance } from './html.mjs';
import textprov from '../../../vendor/textprov/textprov.cjs';

const vendor = new URL('../../../vendor/textprov/', import.meta.url);
const manifest = JSON.parse(readFileSync(new URL('manifest.json', vendor), 'utf8'));
const runtime = readFileSync(new URL('textprov.cjs', vendor), 'utf8');
const ai = (text: string) => textprov.segments(text).map((cluster: string) => /\s/u.test(cluster) ? cluster : cluster + '\u{E0101}').join('');

// Compare every displayed character, its exact attribution, and its passage
// membership. Wrapper names differ because docs prerenders only enrolled AI text.
function projection(doc: Document, exact: string, passage: string) {
  const result: { text: string; exact: boolean; passage: boolean }[] = [];
  const walker = doc.createTreeWalker(doc.querySelector('.sl-markdown-content')!, 4);
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    const parent = node.parentElement!;
    for (const text of Array.from(node.textContent!)) {
      result.push({ text, exact: !!parent.closest(exact), passage: !!parent.closest(passage) });
    }
  }
  return result;
}

describe('merged TextProv vendor contract', () => {
  it('keeps every copied file identical to the recorded upstream revision', () => {
    expect(manifest.revision).toMatch(/^[a-f0-9]{40}$/);
    for (const file of manifest.files) {
      const hash = createHash('sha256').update(readFileSync(new URL(file.path, vendor))).digest('hex');
      expect(hash, file.source).toBe(file.sha256);
    }
  });

  it('keeps the adapted presentation defaults equal to the canonical stylesheet', () => {
    const canonical = readFileSync(new URL('textprov.css', vendor), 'utf8');
    const adapted = readFileSync(new URL('../../styles/textprov.css', import.meta.url), 'utf8');
    const defaults = (css: string, prefix: string) => Array.from(css.matchAll(
      new RegExp(`--${prefix}-(tint|dot-strength|glow-opacity|glow-blur|glow-spread):\\s*([^;]+);`, 'g'),
    ), match => [match[1], match[2]]);
    expect(defaults(adapted, 'textprov')).toEqual(defaults(canonical, 'prov'));
  });

  it.each([
    `<p>C\u{E0101}ho\u{E0101}ose a ${ai('guide')} <em>for what</em> <a href="/next">you want</a> to do next.</p><p>Plain paragraph.</p>`,
    `<h2>${ai('Heading')}</h2><ul><li>Old ${ai('new')} end.</li><li>Plain.</li></ul><table><tr><td>${ai('日本語')} text</td><td>Plain cell.</td></tr></table>`,
    `<p>Legacy \u{100041}I and ${ai('cafe\u0301')} text. <code>Unmarked code</code></p>`,
  ])('matches the merged renderer for passage coverage and exact characters: %s', html => {
    const source = `<div class="sl-markdown-content">${html}</div>`;
    const upstream = new JSDOM(source, { runScripts: 'outside-only' });
    upstream.window.eval(runtime);
    // This is the browser entry point exposed by the unchanged vendored UMD.
    const renderer = (upstream.window as unknown as {
      textprov: { render: (root: Element, options: { strip: boolean }) => void };
    }).textprov;
    renderer.render(upstream.window.document.querySelector('.sl-markdown-content')!, { strip: true });
    const docs = new JSDOM(renderProvenance(source, { requireEnrollment: false }));
    expect(projection(docs.window.document, '.textprov-ai', '[data-textprov-passage]'))
      .toEqual(projection(upstream.window.document, '[data-prov]', '[data-prov-passage]'));
    upstream.window.close();
    docs.window.close();
  });
});
