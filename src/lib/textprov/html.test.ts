import { describe, it, expect, vi } from 'vitest';
import { JSDOM } from 'jsdom';
import { aiRuns, renderProvenance } from './html.mjs';

// Most cases exercise decoding itself; enrollment has its own test.
const render = (html: string, options = {}) => renderProvenance(html, { requireEnrollment: false, ...options });
const ai = (s: string) => Array.from(s).map(c => /\s/u.test(c) ? c : c + '\u{E0101}').join('');

describe('static TextProv HTML', () => {
  it('groups a fragmented passage across inline formatting while preserving exact ranges', () => {
    const source = `C\u{E0101}ho\u{E0101}o\u{E0101}s\u{E0101}e a\u{E0101} g\u{E0101}u\u{E0101}i\u{E0101}de`;
    const html = `<div class="sl-markdown-content"><p>${source} <em>for what</em> <a href="/next">you want</a> to do next.</p><p>Unmarked paragraph.</p></div>`;
    const doc = new JSDOM(render(html)).window.document;
    const paragraphs = doc.querySelectorAll('p');
    expect(paragraphs[0].textContent).toBe('Choose a guide for what you want to do next.');
    expect(paragraphs[1].querySelector('.textprov-passage')).toBeNull();
    expect([...paragraphs[0].querySelectorAll('.textprov-passage')].map(el => el.textContent).join('')).toBe('Choose a guide');
    expect([...paragraphs[0].querySelectorAll('.textprov-ai')].map(el => el.textContent).join('')).toBe('Coosagui');
    expect(doc.querySelector('a .textprov-passage')).toBeNull();
    expect(doc.querySelector('em .textprov-passage')).toBeNull();
    expect(render(render(html))).toBe(render(html));
  });

  it('groups across inline formatting and entities without changing attribution or links', () => {
    const html = `<div class="sl-markdown-content"><p>Old co<em>${ai('lo')}</em>ur &amp; <a href="/next">${ai('shape')}</a> untouched ending.</p></div>`;
    const result = render(html);
    const doc = new JSDOM(result).window.document;
    expect(doc.querySelector('p')?.textContent).toBe('Old colour & shape untouched ending.');
    expect([...doc.querySelectorAll('.textprov-passage')].map(el => el.textContent).join('')).toBe('colour & shape');
    expect([...doc.querySelectorAll('.textprov-ai')].map(el => el.textContent).join('')).toBe('loshape');
    expect(doc.querySelector('em .textprov-ai')?.textContent).toBe('lo');
    expect(doc.querySelector('a')?.getAttribute('href')).toBe('/next');
    expect(render(result)).toBe(result);
  });

  it.each([
    `<p>${ai('first')}<code>code</code>${ai('last')}</p>`,
    `<p>${ai('first')}<br>${ai('last')}</p>`,
    `<ul><li>${ai('first')}<ul><li>nested</li></ul>${ai('last')}</li></ul>`,
    `<table><tr><td>${ai('first')}</td><td>original</td><td>${ai('last')}</td></tr></table>`,
    `<p>${ai('first')}</p><p>original</p><p>${ai('last')}</p>`,
    `<p>${ai('first')}<span lang="">unknown</span>${ai('last')}</p>`,
    `<p>${ai('first')}<video>fallback</video>${ai('last')}</p>`,
    `<menu><li>${ai('first')}</li><li>${ai('last')}</li></menu>`,
  ])('does not join across excluded content, line breaks or block boundaries: %s', body => {
    const doc = new JSDOM(render(`<div class="sl-markdown-content">${body}</div>`)).window.document;
    expect([...doc.querySelectorAll('.textprov-passage')].map(el => el.textContent)).toEqual(['first', 'last']);
  });

  it('limits sparse edits to local words in a paragraph', () => {
    const doc = new JSDOM(
      render(`<div class="sl-markdown-content"><p>An ${ai('e')}dited word followed by several entirely original words and anothe${ai('r')} edit.</p></div>`),
    ).window.document;
    expect([...doc.querySelectorAll('.textprov-passage')].map(el => el.textContent)).toEqual(['edited', 'another']);
  });

  it('renders one recorded run that straddles a sentence boundary as one passage', () => {
    // Whitespace is never marked, so only unspaced scripts can straddle a boundary.
    const html = `<html lang="ja"><body><div class="sl-markdown-content"><p>これは日本${ai('語。次')}の文章です。</p></div></body></html>`;
    const doc = new JSDOM(render(html)).window.document;
    expect([...doc.querySelectorAll('.textprov-passage')].map(el => el.textContent)).toEqual(['日本語。次']);
    expect([...doc.querySelectorAll('.textprov-ai')].map(el => el.textContent)).toEqual(['語。次']);
  });

  it('segments with the inherited language and resets it at nested lang attributes', () => {
    // ICU segments these fixtures identically in every locale, so observe the
    // locale the adapter asks for rather than a difference in the output.
    const spy = vi.spyOn(Intl, 'Segmenter');
    const html = `<html lang="de-CH"><body><div class="sl-markdown-content"><p>Alt ${ai('neu')} <span lang="fr">${ai('mot')}</span> <span lang="">${ai('x')}</span></p></div></body></html>`;
    const doc = new JSDOM(render(html)).window.document;
    expect([...doc.querySelectorAll('.textprov-passage')].map(el => el.textContent)).toEqual(['neu', 'mot', 'x']);
    expect(spy.mock.calls.map(call => call[0])).toEqual(expect.arrayContaining(['de-CH', 'fr', '']));
    spy.mockRestore();
  });

  it.each([
    `<div>first${'\u{E0101}'}<hr>unrelated</div>`,
    `<details><summary>first${'\u{E0101}'}</summary>unrelated</details>`,
    `<div>first${'\u{E0101}'}<aside>unrelated</aside></div>`,
    `<p>first${'\u{E0101}'}<code>code</code>unrelated</p>`,
    `<p>first${'\u{E0101}'}<br>unrelated</p>`,
    `<p>first${'\u{E0101}'}<span lang="fr">unrelated</span></p>`,
  ])('does not expand a one-sided edit across a structural boundary: %s', body => {
    const doc = new JSDOM(render(`<div class="sl-markdown-content">${body}</div>`)).window.document;
    expect([...doc.querySelectorAll('.textprov-passage')].map(el => el.textContent)).toEqual(['first']);
  });

  it('preserves Unicode and exact attribution through inline DOM projection', () => {
    const body = `😀 Original caf<em>é\u{E0101}</em> &amp; <a href="/next">👩‍💻\u{E0101}</a> &#x65E5;本\u{E0101}語。 Original ending.`;
    const result = render(`<html lang="ja"><body><div class="sl-markdown-content"><p>${body}</p></div></body></html>`);
    const doc = new JSDOM(result).window.document;
    expect(doc.querySelector('p')?.textContent).toBe('😀 Original café & 👩‍💻 日本語。 Original ending.');
    expect([...doc.querySelectorAll('.textprov-ai')].map(el => el.textContent).join('')).toBe('é👩‍💻本');
    expect([...doc.querySelectorAll('.textprov-ai')].every(el => el.closest('.textprov-passage'))).toBe(true);
    // 本 expands to the dictionary word 日本語, not to the ideographic full stop.
    expect([...doc.querySelectorAll('.textprov-passage')].map(el => el.textContent).join('')).toBe('cafe\u0301 & 👩‍💻 日本語');
    expect(render(result)).toBe(result);
  });

  it.each([false, true])('renders many disjoint ranges without losing text (inline nodes: %s)', inline => {
    const fragment = `${ai('Edit')}. Original words here. `;
    const body = Array.from({ length: 1000 }, () => inline ? `<em>${fragment}</em>` : fragment).join('');
    const doc = new JSDOM(render(`<div class="sl-markdown-content"><p>${body}</p></div>`)).window.document;
    expect(doc.querySelector('p')?.textContent).toBe('Edit. Original words here. '.repeat(1000));
    expect(doc.querySelectorAll('.textprov-passage')).toHaveLength(1000);
    expect([...doc.querySelectorAll('.textprov-passage')].every(el => el.textContent === 'Edit')).toBe(true);
  });

  it('keeps whitespace unassigned in the exact inspection metadata', () => {
    expect(aiRuns(ai('AI words'))).toEqual([
      { state: 'ai', text: 'AI' }, { state: null, text: ' ' }, { state: 'ai', text: 'words' },
    ]);
    const doc = new JSDOM(render(`<div class="sl-markdown-content"><p>Plain <code>${ai('sample')}</code> stays plain.</p></div>`)).window.document;
    expect(doc.querySelector('.textprov-passage')).toBeNull();
  });

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

  it('decodes a heading ID and remaps TOC links to it when nothing else uses it', () => {
    const marked = ai('topic');
    const html = `<div class="sl-markdown-content"><h2 id="${marked}">${ai('Topic')}</h2><h2 id="other">Other</h2></div><a href="#${encodeURIComponent(marked)}">Topic</a>`;
    const doc = new JSDOM(render(html, { label: '/en/page/' })).window.document;
    expect(Array.from(doc.querySelectorAll('h2'), h => h.id)).toEqual(['topic', 'other']);
    expect(doc.querySelector('a')?.getAttribute('href')).toBe('#topic');
  });

  it('drops selectors the slugger orphaned by removing marked punctuation from a heading ID', () => {
    // A marked "1. Register, then test?" slugs to this: "." "," and "?" are
    // gone but each selector that followed them remains.
    const sel = '\u{E0101}';
    const marked = `1${sel}${sel}-${sel}r${sel}e${sel}g${sel}${sel}-${sel}t${sel}e${sel}s${sel}t${sel}${sel}`;
    const html = `<div class="sl-markdown-content"><h3 id="${marked}">${ai('1. Register, then test?')}</h3></div><a href="#${encodeURIComponent(marked)}">Step</a>`;
    const result = render(html);
    expect(result).not.toContain(sel);
    const doc = new JSDOM(result).window.document;
    expect(doc.querySelector('h3')?.id).toBe('1-reg-test');
    expect(doc.querySelector('a')?.getAttribute('href')).toBe('#1-reg-test');
  });

  it('fails, naming the page, when a decoded heading ID collides with an existing anchor', () => {
    // Renumbering to "topic-2" would keep this page's TOC working, but a link
    // from another page to #topic would reach a different heading, and nothing
    // later can see that: the fragment never reaches the server.
    const marked = ai('topic');
    const html = `<div class="sl-markdown-content"><h2 id="${marked}">${ai('Topic')}</h2><h2 id="topic">Topic</h2><h2 id="topic-1">Topic</h2></div><a href="#${encodeURIComponent(marked)}">Topic</a>`;
    expect(() => render(html, { label: '/en/page/' }))
      .toThrow('TextProv: decoded id "topic" is already used by another element; rename one of the headings (/en/page/)');
  });

  it('strips the marks that slugged punctuation leaves in heading IDs and their references', () => {
    // Like github-slugger, drop punctuation but keep the selector after it. A
    // cluster then ends in two selectors, and a quoted heading starts with one.
    const slug = (s: string) => s.toLowerCase().replace(/[?,()"]/gu, '').replaceAll(' ', '-');
    const headings = {
      'Questions or need support?': 'questions-or-need-support',
      'Set color, corners, and font': 'set-color-corners-and-font',
      'Ownership record (TXT)': 'ownership-record-txt',
      '"Incorrect passphrase"': 'incorrect-passphrase',
    };
    for (const [heading, expected] of Object.entries(headings)) {
      const id = slug(ai(heading));
      const html = '<div class="textprov-document" data-textprov-document="true"></div>' +
        `<div class="sl-markdown-content"><h2 id="${id}">${ai(heading)}</h2></div>` +
        `<a href="#${encodeURIComponent(id)}">${ai(heading)}</a><label for="${id}">Label</label>` +
        `<input aria-describedby="${id} other">`;
      const result = renderProvenance(html);
      expect(result).not.toContain('\u{E0101}');
      const doc = new JSDOM(result).window.document;
      expect(doc.querySelector('h2')?.id).toBe(expected);
      expect(doc.querySelector('a')?.getAttribute('href')).toBe(`#${expected}`);
      expect(doc.querySelector('label')?.getAttribute('for')).toBe(expected);
      expect(doc.querySelector('input')?.getAttribute('aria-describedby')).toBe(`${expected} other`);
    }
  });

  it('fails when an ID still contains a marker after cleaning', () => {
    expect(() => render('<h2 id="x\u{100061}\u{E0101}">Title</h2>', { label: '/en/start/' }))
      .toThrow('TextProv: malformed AI marker in id: "x<U+100061><U+E0101>" (/en/start/)');
  });

  it.each(['raw', 'percent-encoded', 'numeric entities', 'malformed escape'])(
    'rejects residual PUA in a %s local fragment without a local ID',
    (encoding) => {
      const marked = 'x\u{100061}\u{E0101}';
      const fragment =
        encoding === 'percent-encoded'
          ? encodeURIComponent(marked)
          : encoding === 'numeric entities'
            ? 'x&#x100061;&#xE0101;'
            : encoding === 'malformed escape'
              ? marked + '%'
              : marked;
      expect(() => render(`<a href="#${fragment}">Link</a>`, { label: '/en/start/' })).toThrow(
        `TextProv: malformed AI marker in href: "x<U+100061><U+E0101>${encoding === "malformed escape" ? "%" : ""}" (/en/start/)`,
      );
    },
  );

  it.each([
    'aria-labelledby',
    'aria-describedby',
    'aria-controls',
    'aria-owns',
    'aria-flowto',
    'aria-activedescendant',
    'aria-details',
    'aria-errormessage',
    'for',
    'list',
    'headers',
    'form',
  ])('rejects residual PUA in %s without a local ID', (attribute) => {
    const marked = 'x\u{100061}\u{E0101}';
    expect(() => render(`<input ${attribute}="other ${marked} last">`, { label: '/en/start/' })).toThrow(
      `TextProv: malformed AI marker in ${attribute}: "x<U+100061><U+E0101>" (/en/start/)`,
    );
  });

  it.each(['id', 'href', 'aria-describedby', 'for'])(
    'rejects a non-empty %s identifier that becomes empty after cleaning',
    (attribute) => {
      const marked = '\u{E0101}\u{E0101}';
      const value =
        attribute === 'href'
          ? '#' + encodeURIComponent(marked)
          : attribute === 'aria-describedby'
            ? `other ${marked} last`
            : marked;
      expect(() => render(`<a ${attribute}="${value}">Link</a>`, { label: '/en/start/' })).toThrow(
        `TextProv: decoded identifier in ${attribute} is empty: "<U+E0101><U+E0101>"; use a non-empty identifier (/en/start/)`,
      );
    },
  );

  it('cleans valid percent-encoded local fragments without a local ID', () => {
    for (const marked of [ai('topic'), '\u{100074}opic']) {
      expect(render(`<a href="#${encodeURIComponent(marked)}">Link</a>`)).toBe('<a href="#topic">Link</a>');
    }
  });

  it('preserves empty attributes and a bare fragment', () => {
    const html = '<p id="" aria-describedby="" for="">A&#xE0101;</p><a href="#">Top</a>';
    const doc = new JSDOM(render(html)).window.document;
    expect(doc.querySelector('p')?.getAttribute('id')).toBe('');
    expect(doc.querySelector('p')?.getAttribute('aria-describedby')).toBe('');
    expect(doc.querySelector('p')?.getAttribute('for')).toBe('');
    expect(doc.querySelector('a')?.getAttribute('href')).toBe('#');
  });

  it('preserves a genuine CJK IVS in a heading ID, its references and displayed text', () => {
    const ivs = '辻\u{E0100}';
    const html =
      `<div class="sl-markdown-content"><h2 id="${ivs}">${ivs}</h2></div>` +
      `<a href="#${encodeURIComponent(ivs)}">${ivs}</a><input aria-describedby="${ivs}">`;
    expect(render(html)).toBe(html);
  });

  it('normalizes U+E0101 even after CJK in identifiers without changing unmarked body text', () => {
    const id = '辻\u{E0101}';
    const body = '辻\u{E0100}';
    const html =
      `<div class="sl-markdown-content"><h2 id="${id}">${body}</h2></div>` +
      `<a href="#${encodeURIComponent(id)}">${body}</a><input aria-describedby="${id}">`;
    const doc = new JSDOM(render(html)).window.document;
    expect(doc.querySelector('h2')?.id).toBe('辻');
    expect(doc.querySelector('a')?.getAttribute('href')).toBe('#' + encodeURIComponent('辻'));
    expect(doc.querySelector('input')?.getAttribute('aria-describedby')).toBe('辻');
    expect(doc.querySelector('h2')?.textContent).toBe(body);
    expect(doc.querySelector('a')?.textContent).toBe(body);
    expect(doc.querySelector('.textprov-ai')).toBeNull();
  });

  it('leaves non-local URLs byte-for-byte unchanged, including their fragments', () => {
    const marked = 'x\u{100061}\u{E0101}';
    for (const prefix of [
      '/en/share/when-a-link-doesnt-work',
      '../other',
      '?view=all',
      'https://example.test/page',
      '//example.test/page',
    ]) {
      for (const fragment of [marked, encodeURIComponent(marked)]) {
        const html = `<a href="${prefix}#${fragment}">Link</a>`;
        expect(render(html)).toBe(html);
      }
    }
  });

  it('does not validate identifiers inside excluded samples', () => {
    const marked = 'x\u{100061}\u{E0101}';
    const html = `<pre><code id="${marked}" aria-describedby="${marked}"><a href="#${encodeURIComponent(marked)}">Sample</a></code></pre>`;
    expect(render(html)).toBe(html);
  });

  it('requires an actual enrollment element rather than a quoted flag in a code example', () => {
    const html = `<div class="textprov-document" data-textprov-document="false"></div><code>data-textprov-document="true"</code><div class="sl-markdown-content">${ai('Example')}</div>`;
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

  it('maps byte-identical marked IDs once instead of allocating a suffix', () => {
    const marked = ai('topic');
    const doc = new JSDOM(render(`<h2 id="${marked}">A</h2><h2 id="${marked}">B</h2>`)).window.document;
    expect(Array.from(doc.querySelectorAll('h2'), h => h.id)).toEqual(['topic', 'topic']);
  });

  it('cleans an excluded element\'s own labels but nothing inside it', () => {
    const sample = `<code title="${ai('Inner')}">${ai('x')}</code>`;
    const result = render(`<pre aria-label="${ai('Code sample')}">${sample}</pre>`);
    expect(result).toBe(`<pre aria-label="Code sample">${sample}</pre>`);
  });

  it('cleans accessibility and label references to a decoded ID but leaves opaque attributes alone', () => {
    const marked = ai('topic');
    const html = `<h2 id="other">Other</h2><h2 id="${marked}">${ai('Topic')}</h2><label for="${marked}">Label</label><input aria-labelledby="${marked} other" aria-controls="${marked}" data-private="${marked}">`;
    const doc = new JSDOM(render(html)).window.document;
    expect(doc.querySelector('label')?.getAttribute('for')).toBe('topic');
    expect(doc.querySelector('input')?.getAttribute('aria-labelledby')).toBe('topic other');
    expect(doc.querySelector('input')?.getAttribute('aria-controls')).toBe('topic');
    expect(doc.querySelector('input')?.getAttribute('data-private')).toBe(marked);
  });

  it('fails on a colliding decoded ID whatever refers to it', () => {
    const marked = ai('topic');
    expect(() => render(`<h2 id="topic">Topic</h2><h2 id="${marked}">${ai('Topic')}</h2><label for="${marked}">Label</label>`))
      .toThrow('decoded id "topic" is already used by another element');
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
