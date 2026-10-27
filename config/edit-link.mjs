// config/edit-link.mjs
//
// Base URL for "Edit page" links. It has its own module so pages rendered at
// build time (src/pages/index.astro) can read it without importing
// config/starlight.mjs. That module pulls in config/sidebar.mjs, which reads
// files relative to its own path: bundled into dist/.prerender, those paths
// no longer exist.
export const EDIT_LINK_BASE_URL = "https://github.com/onetimesecret/docs.onetimesecret.com/edit/main/";
