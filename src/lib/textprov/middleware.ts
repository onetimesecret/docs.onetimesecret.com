import { defineMiddleware } from 'astro:middleware';
import { renderProvenance } from './html.mjs';

export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next();
  if (!response.headers.get('content-type')?.includes('text/html')) return response;
  // Starlight clears its route locals after next() returns. The component emits
  // an explicit enrollment flag while those locals are available.
  const source = await response.clone().text();
  if (!source.includes('data-textprov-document="true"')) return response;
  const html = renderProvenance(source);
  const headers = new Headers(response.headers);
  headers.delete('content-length');
  return new Response(html, { status: response.status, statusText: response.statusText, headers });
});
