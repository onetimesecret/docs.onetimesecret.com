// @vitest-environment jsdom
// src/lib/textprov/display.test.ts
//
// The reader toggle's behaviour contract: a saved preference is applied to the
// root element and the switch on load, a click flips both and persists, and the
// script is harmless on pages without a toggle or without usable storage.
import { describe, expect, it } from 'vitest';
import { initTextProv } from './display';

const KEY = 'docs:textprov';

function page(markup = '<button data-textprov-toggle aria-checked="false"></button>') {
  document.documentElement.removeAttribute('data-textprov');
  document.body.innerHTML = markup;
  return document.querySelector<HTMLButtonElement>('[data-textprov-toggle]');
}

function memoryStorage(initial: Record<string, string> = {}): Storage {
  const store = new Map(Object.entries(initial));
  return {
    getItem: (k) => store.get(k) ?? null,
    setItem: (k, v) => void store.set(k, v),
    removeItem: (k) => void store.delete(k),
    clear: () => store.clear(),
    key: (i) => [...store.keys()][i] ?? null,
    get length() { return store.size; },
  };
}

describe('initTextProv', () => {
  it('defaults to hidden and marks the switch unchecked', () => {
    const toggle = page();
    initTextProv(document, memoryStorage());
    expect(document.documentElement.dataset.textprov).toBe('hidden');
    expect(toggle?.getAttribute('aria-checked')).toBe('false');
  });

  it('applies a saved "shown" preference on load', () => {
    const toggle = page();
    initTextProv(document, memoryStorage({ [KEY]: 'shown' }));
    expect(document.documentElement.dataset.textprov).toBe('shown');
    expect(toggle?.getAttribute('aria-checked')).toBe('true');
  });

  it('flips the root attribute and the switch on click, and persists the choice', () => {
    const toggle = page('<button data-textprov-toggle aria-checked="false"></button><p class="textprov-ai">Clean text</p>');
    const storage = memoryStorage();
    const text = document.body.textContent;
    initTextProv(document, storage);
    toggle?.click();
    expect(document.documentElement.dataset.textprov).toBe('shown');
    expect(toggle?.getAttribute('aria-checked')).toBe('true');
    expect(storage.getItem(KEY)).toBe('shown');
    toggle?.click();
    expect(document.documentElement.dataset.textprov).toBe('hidden');
    expect(storage.getItem(KEY)).toBe('hidden');
    // The toggle is CSS only; the decoded text never changes.
    expect(document.body.textContent).toBe(text);
  });

  it('does nothing on a page without a toggle', () => {
    page('<p>No toggle here.</p>');
    initTextProv(document, memoryStorage({ [KEY]: 'shown' }));
    expect(document.documentElement.dataset.textprov).toBeUndefined();
  });

  it('still toggles for this page when storage throws', () => {
    const toggle = page();
    const broken = {
      getItem: () => { throw new Error('denied'); },
      setItem: () => { throw new Error('denied'); },
    } as unknown as Storage;
    initTextProv(document, broken);
    expect(document.documentElement.dataset.textprov).toBe('hidden');
    toggle?.click();
    expect(document.documentElement.dataset.textprov).toBe('shown');
  });

  it('works without any storage', () => {
    const toggle = page();
    initTextProv(document);
    toggle?.click();
    expect(document.documentElement.dataset.textprov).toBe('shown');
  });
});


describe('several switches on one page', () => {
  it('keeps the sidebar and mobile switches in step and persists once', () => {
    page('<button data-textprov-toggle aria-checked="false" id="a"></button><button data-textprov-toggle aria-checked="false" id="b"></button>');
    const storage = memoryStorage();
    initTextProv(document, storage);
    const [a, b] = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-textprov-toggle]'));
    b.click();
    expect(document.documentElement.dataset.textprov).toBe('shown');
    expect(a.getAttribute('aria-checked')).toBe('true');
    expect(b.getAttribute('aria-checked')).toBe('true');
    expect(storage.getItem(KEY)).toBe('shown');
    a.click();
    expect(b.getAttribute('aria-checked')).toBe('false');
    expect(storage.getItem(KEY)).toBe('hidden');
  });
});
