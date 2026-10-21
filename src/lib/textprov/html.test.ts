import { describe, it, expect, vi } from 'vitest';
import { JSDOM } from 'jsdom';
import { aiRuns, renderProvenance } from './html.mjs';
import { initTextProv } from './display';

// Most cases exercise decoding itself; enrollment has its own test.
const render = (html: string, options = {}) => renderProvenance(html, { requireEnrollment: false, ...options });
const ai = (s: string) => Array.from(s).map(c => /\s/u.test(c) ? c : c + '\u{E0101}').join('');

describe('static TextProv HTML', () => {
  it('emits clean text and provenance spans for headings, links, emphasis, tables and non-Latin prose', () => {
    const html = `<title>${ai('Title')}</title><div class="sl-markdown-content"><h2 id="${ai('heading')}">${ai('Heading')}</h2><p>Old <em>${ai('日本語')}</em> <a href="/en/start">${ai('guide')}</a></p><table><tr><td>${ai('Cell')}</td></tr></table></div><a href="#${encodeURIComponent(ai('heading'))}" aria-label="${ai('Heading')}">${ai('Heading')}</a>`;
    const result = render(html);
    expect(result).not.toContain('\u{E0101}');
    const dom = new JSDOM(result).window.document;
    expect(dom.title).toBe('Title');
    expect(dom.querySelector('h2')?.id).toBe('heading');
    expect(dom.querySelector('a[href="#heading"]')?.textContent).toBe('Heading');
    expect(dom.querySelector('a[href="#heading"]')?.getAttribute('aria-label')).toBe('Heading');
    expect(dom.querySelector('em .textprov-ai')?.textContent).toBe('日本語');
    expect(dom.querySelector('td .textprov-ai')?.textContent).toBe('Cell');
    expect(dom.querySelector('.sl-markdown-content')?.textContent).toBe('HeadingOld 日本語 guideCell');
    expect(render(result)).toBe(result);
  });

  it('decodes numeric character references, escapes text and handles the supported legacy PUA form', () => {
    const result = render(`<div class="sl-markdown-content">A&#xE0101;&lt;&#917761;&amp;${String.fromCodePoint(0x100042)}</div>`);
    const doc = new JSDOM(result).window.document;
    expect(doc.querySelector('div')?.textContent).toBe('A<&B');
    expect(doc.querySelector('script')).toBeNull();
    expect(doc.querySelectorAll('.textprov-ai')).toHaveLength(2);
  });

  it('preserves genuine IVS, emoji variants, combining graphemes, code, scripts, styles and unmarked HTML', () => {
    const ivs = '辻\u{E0100}';
    const unchanged = `<!doctype html><div>${ivs} ❤️</div><script>"${ai('code')}"</script><style>/* ${ai('css')} */</style><pre><code>${ai('example')}</code></pre>`;
    expect(render(unchanged)).toBe(unchanged);
    expect(aiRuns(ivs)[0].text).toBe(ivs);
    const grapheme = 'e\u0301\u{E0101}';
    expect(render(`<div class="sl-markdown-content">${grapheme}</div>`)).toContain('>e\u0301</span>');
  });

  it('keeps decoded heading IDs unique without taking existing anchors and remaps TOC links', () => {
    const marked = ai('topic');
    const html = `<div class="sl-markdown-content"><h2 id="${marked}">${ai('Topic')}</h2><h2 id="topic">Topic</h2><h2 id="topic-1">Topic</h2></div><a href="#${encodeURIComponent(marked)}">Topic</a>`;
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const doc = new JSDOM(render(html, { label: '/en/page/' })).window.document;
    expect(Array.from(doc.querySelectorAll('h2'), h => h.id)).toEqual(['topic-2', 'topic', 'topic-1']);
    expect(doc.querySelector('a')?.getAttribute('href')).toBe('#topic-2');
    expect(warn).toHaveBeenCalledWith('TextProv: decoded id "topic" is taken; using "topic-2" (/en/page/)');
    warn.mockRestore();
  });

  it('requires an actual enrollment element rather than a quoted flag in a code example', () => {
    const html = `<div class="textprov-controls" data-textprov-document="false"></div><code>data-textprov-document="true"</code><div class="sl-markdown-content">${ai('Example')}</div>`;
    expect(renderProvenance(html)).toBe(html);
    const enrolled = html.replace('data-textprov-document="false"', 'data-textprov-document="true"');
    expect(renderProvenance(enrolled)).toContain('data-textprov="ai">Example</span>');
  });

  it('preserves raw-text elements, inert templates, and opaque island props', () => {
    for (const tag of ['noscript', 'iframe', 'noembed', 'noframes', 'xmp', 'plaintext', 'template']) {
      const html = `<${tag}><b>${ai('Example')}</b></${tag}>`;
      expect(render(html)).toBe(html);
    }
    const props = JSON.stringify({ value: [0, ai('Example')] });
    const html = `<astro-island props='${props}'><p>${ai('Example')}</p></astro-island>`;
    const doc = new JSDOM(render(html)).window.document;
    expect(doc.querySelector('astro-island')?.getAttribute('props')).toBe(props);
    expect(doc.querySelector('p')?.textContent).toBe('Example');
  });

  it('remaps accessibility and label references when a decoded ID collides', () => {
    const marked = ai('topic');
    const html = `<h2 id="topic">Topic</h2><h2 id="${marked}">${ai('Topic')}</h2><label for="${marked}">Label</label><input aria-labelledby="${marked} topic" aria-controls="${marked}" data-private="${marked}">`;
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const doc = new JSDOM(render(html)).window.document;
    warn.mockRestore();
    expect(doc.querySelector('label')?.getAttribute('for')).toBe('topic-1');
    expect(doc.querySelector('input')?.getAttribute('aria-labelledby')).toBe('topic-1 topic');
    expect(doc.querySelector('input')?.getAttribute('aria-controls')).toBe('topic-1');
    expect(doc.querySelector('input')?.getAttribute('data-private')).toBe(marked);
  });

  it('rejects malformed managed declarations while preserving excluded samples', () => {
    for (const value of ['x\u{E0101}\u{E0101}', ' \u{E0101}', '\u{E0101}', 'x\u{100061}\u{E0101}']) {
      expect(() => render(`<div class="sl-markdown-content">${value}</div>`)).toThrow('malformed AI marker');
      const code = `<code>${value}</code>`;
      expect(render(code)).toBe(code);
    }
  });

  it('names the page and spells out the offending code points in build errors', () => {
    expect(() => render('<p>Text x\u{100061}\u{E0101}y</p>', { label: '/en/start/' }))
      .toThrow('TextProv: malformed AI marker in managed text: "Text x<U+100061><U+E0101>y" (/en/start/)');
  });

  it('writes remapped fragment links back percent-encoded', () => {
    const marked = `a b${'\u{E0101}'}`;
    const reserved = `a#b${'\u{E0101}'}`;
    const result = render(`<h2 id="${marked}">Title</h2><a href="#${encodeURI(marked)}">Link</a><a href="#caf%C3%A9">Other</a>` +
      `<h2 id="${reserved}">Title</h2><a id="reserved" href="#${encodeURIComponent(reserved)}">Reserved</a>`);
    const doc = new JSDOM(result).window.document;
    expect(doc.querySelector('h2')?.id).toBe('a b');
    expect(doc.querySelector('a')?.getAttribute('href')).toBe('#a%20b');
    expect(result).toContain('href="#caf%C3%A9"');
    expect(doc.getElementById('reserved')?.getAttribute('href')).toBe('#a%23b');
  });

  it('handles marked text foster-parented out of a table without losing its source range', () => {
    const result = render(`<div class="sl-markdown-content"><table>${ai('Text')}<tr><td>Cell</td></tr></table></div>`);
    expect(result).not.toContain('\u{E0101}');
    expect(new JSDOM(result).window.document.querySelector('div')?.textContent).toContain('Text');
  });
});

describe('TextProv toggle', () => {
  function page() {
    return new JSDOM('<button data-textprov-toggle aria-pressed="false" hidden>TextProv</button><p class="textprov-ai">Clean text</p>', { url: 'https://docs.example.test' });
  }
  it('defaults to hidden, persists the choice, and never mutates page text', () => {
    const dom = page();
    const { document, localStorage } = dom.window;
    const text = document.body.textContent;
    initTextProv(document, localStorage);
    const button = document.querySelector('button')!;
    expect(button.hidden).toBe(false);
    expect(button.getAttribute('aria-pressed')).toBe('false');
    button.click();
    expect(document.documentElement.dataset.textprov).toBe('shown');
    expect(button.getAttribute('aria-pressed')).toBe('true');
    initTextProv(document, localStorage);
    expect(document.documentElement.dataset.textprov).toBe('shown');
    button.click();
    expect(document.documentElement.dataset.textprov).toBe('hidden');
    expect(document.body.textContent).toBe(text);
  });
  it('works when browser storage is denied', () => {
    const { document } = page().window;
    const storage = { getItem() { throw Error('denied'); }, setItem() { throw Error('denied'); } } as unknown as Storage;
    expect(() => initTextProv(document, storage)).not.toThrow();
    document.querySelector('button')!.click();
    expect(document.documentElement.dataset.textprov).toBe('shown');
  });
  it('leaves unenrolled pages and storage untouched', () => {
    const { document } = new JSDOM('<p>Unenrolled</p>').window;
    const storage = { getItem() { throw Error('read'); } } as unknown as Storage;
    expect(() => initTextProv(document, storage)).not.toThrow();
    expect(document.documentElement.dataset.textprov).toBeUndefined();
  });
});
