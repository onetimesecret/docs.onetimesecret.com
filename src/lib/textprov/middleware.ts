import { defineMiddleware } from 'astro:middleware';
import { renderProvenance } from './html.mjs';

export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next();
  if (!response.headers.get('content-type')?.includes('text/html')) return response;
  // Starlight clears its route locals after next() returns. The component emits
  // an explicit enrollment flag while those locals are available.
  // The body is read once and a response rebuilt either way. Cloning kept the
  // original object for unenrolled pages, but at the cost of buffering every
  // page twice, and nothing downstream needs that object back.
  const source = await response.text();
  const enrolled = source.includes('data-textprov-document="true"');
  const headers = new Headers(response.headers);
  if (enrolled) {
    // Decoding changes the length and the content; drop the stale validators.
    headers.delete('content-length');
    headers.delete('etag');
  }
  const html = enrolled ? renderProvenance(source, { requireEnrollment: true, label: context.url.pathname }) : source;
  return new Response(html, { status: response.status, statusText: response.statusText, headers });
});
