import { beforeEach, describe, expect, it, vi } from 'vitest';
import render from './llm-markdown';
import { clearRenderFailures, renderFailures } from './llm-markdown-failures.mjs';

// The plugin's renderer needs a running Astro build (astro:content, the
// container), so it is replaced; `clean` is the real TextProv helper.
const simple = vi.hoisted(() => vi.fn<(entry: unknown, context: unknown) => Promise<string>>());
vi.mock('starlight-llm-actions/internal/simple-markdown', () => ({ default: simple }));

const ai = (s: string) => Array.from(s).map((c) => (/\s/u.test(c) ? c : c + '\u{E0101}')).join('');
const context = {} as Parameters<typeof render>[1];
const entry = (id: string, data: Record<string, unknown>, body?: string) => ({ id, body, data: { title: 'Page', ...data } });

describe('llm-markdown renderer', () => {
  beforeEach(() => {
    simple.mockReset();
    clearRenderFailures();
  });

  it('strips AI marks from the rendered Markdown of an enrolled page', async () => {
    simple.mockResolvedValue(`# Guide\n\nChoose ${ai('a guide')} for what you want.`);
    const page = entry('en/start', { textprov: true });
    await expect(render(page, context)).resolves.toBe('# Guide\n\nChoose a guide for what you want.');
    expect(simple).toHaveBeenCalledWith(page, context);
  });

  it('publishes a page that is not enrolled unchanged', async () => {
    const rendered = `辻\u{E0100} stays, and so does ${ai('this')}.`;
    simple.mockResolvedValue(rendered);
    await expect(render(entry('ja/start', {}), context)).resolves.toBe(rendered);
    expect(renderFailures().size).toBe(0);
  });

  it('serves the cleaned source of a page the container is known not to render', async () => {
    simple.mockRejectedValue(new Error('NoMatchingRenderer'));
    const page = entry('en/reference/generator', { textprov: true }, `Intro ${ai('text')}.\n\n{% config-generator /%}`);
    await expect(render(page, context)).resolves.toBe('Intro text.\n\n{% config-generator /%}');
    expect(renderFailures().size).toBe(0);
  });

  it('records and rethrows a failure on any other page', async () => {
    const error = new Error('NoMatchingRenderer');
    simple.mockRejectedValue(error);
    await expect(render(entry('en/start', { textprov: true }, 'source'), context)).rejects.toBe(error);
    expect(renderFailures()).toEqual(new Map([['en/start', 'NoMatchingRenderer']]));
  });
});
