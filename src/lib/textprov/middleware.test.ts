import { describe, it, expect, vi } from 'vitest';

// astro:middleware is a virtual module; defineMiddleware only returns its argument.
vi.mock('astro:middleware', () => ({ defineMiddleware: (handler: unknown) => handler }));
const { onRequest } = await import('./middleware');

const marked = Array.from('Example', char => char + '\u{E0101}').join('');
const enrolled = `<div class="textprov-controls" data-textprov-document="true"></div><div class="sl-markdown-content">${marked}</div>`;

function run(body: string, type = 'text/html; charset=utf-8') {
  const response = new Response(body, { headers: { 'content-type': type, 'content-length': '1', etag: '"x"' } });
  const handler = onRequest as unknown as (context: unknown, next: () => Promise<Response>) => Promise<Response>;
  return handler({ url: new URL('https://docs.example.test/en/page/') }, async () => response).then(async result => ({
    same: result === response, headers: result.headers, text: await result.text(),
  }));
}

describe('TextProv middleware', () => {
  it('passes non-HTML responses through untouched', async () => {
    const result = await run(enrolled, 'application/json');
    expect(result.same).toBe(true);
  });

  it('passes unenrolled pages through with body and headers intact', async () => {
    const body = enrolled.replace('"true"', '"false"');
    const result = await run(body);
    expect(result.text).toBe(body);
    expect(result.headers.get('content-length')).toBe('1');
    expect(result.headers.get('etag')).toBe('"x"');
  });

  it('decodes enrolled pages and drops stale length and validator headers', async () => {
    const result = await run(enrolled);
    expect(result.same).toBe(false);
    expect(result.text).toContain('data-textprov="ai">Example</span>');
    expect(result.text).not.toContain('\u{E0101}');
    expect(result.headers.get('content-length')).toBeNull();
    expect(result.headers.get('etag')).toBeNull();
  });

  it('names the request path when a page fails to render', async () => {
    await expect(run(enrolled.replace(marked, 'x\u{100061}\u{E0101}'))).rejects.toThrow('(/en/page/)');
  });
});
