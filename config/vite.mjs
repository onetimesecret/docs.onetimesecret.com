// config/vite.mjs

import tailwindcss from "@tailwindcss/vite";

/**
 * Spotnote: optional, dev-only UI feedback for coding agents.
 *
 * Click an element on the dev server, write what should change, and the agent
 * gets its exact file, line and column. The plugin stamps
 * data-spotnote="file:line:col" on elements and injects a picker (launcher in
 * the bottom-left corner). It does nothing in `astro build` or under Vitest.
 * https://github.com/harukikuri/spotnote
 *
 * Only this repository's own .astro and .vue files get stamps.
 * Starlight's components and Markdown/Markdoc content do not, so a click on
 * page prose resolves to the nearest stamped ancestor (a local override or
 * component), not to the content file.
 *
 * It is a devDependency, loaded only when installed: a --prod install, or
 * removing the package, leaves this config working.
 *
 * MCP server (optional, once per machine) so a local agent picks up notes as
 * you write them and can reply on them:
 *
 *   claude mcp add --scope user spotnote -- npx -y spotnote-mcp
 *   codex mcp add spotnote -- npx -y spotnote-mcp
 *
 * Then ask the agent: "Watch my Spotnote notes." The server listens on
 * 127.0.0.1:4848 only and saves notes in ~/.spotnote/. If the port is taken,
 * set SPOTNOTE_PORT to the same free port for the agent and for `pnpm dev`.
 * Without it, Enter copies the note as a prompt to paste instead.
 */
const spotnote = await import("spotnote").then(
  (m) => m.default,
  () => null,
);

/**
 * Builds allowedHosts array from environment variables.
 * This is exported so it can be reused in astro.config.mjs for consistent
 * host allowlisting across Vite and Astro's preview server.
 *
 * @returns {string[]} Array of allowed hostnames
 */
export function createAllowedHosts() {
  // According to the documentation, we should be able to set the allowed hosts
  // via __VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS but as of 5.4.15m that is not
  // working as expected. So here we capture the value of that env var with
  // and without the __ prefix and if they're defined, add them to the hosts array.
  // -- Delano (2025-03-28)
  //
  // https://vite.dev/config/server-options.html#server-allowedhosts
  // https://github.com/vitejs/vite/security/advisories/GHSA-vg6x-rcgg-rjx6
  const viteAdditionalServerAllowedHosts =
    process.env.VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS;

  const __viteAdditionalServerAllowedHosts =
    process.env.__VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS;

  // Start with default allowed hosts
  const hosts = ["localhost", "127.0.0.1"];

  // Add additional hosts from environment variables if defined
  // Supports comma-separated lists (e.g., "host1.com,host2.com")
  if (viteAdditionalServerAllowedHosts) {
    hosts.push(...viteAdditionalServerAllowedHosts.split(',').map(h => h.trim()));
  }

  if (__viteAdditionalServerAllowedHosts) {
    hosts.push(...__viteAdditionalServerAllowedHosts.split(',').map(h => h.trim()));
  }

  return hosts;
}

export function createViteConfig() {
  const allowedHosts = createAllowedHosts();

  return {
    // The generator imports YAML through a Vue island. Pre-bundle it at startup
    // instead of discovering it after the browser has requested the island.
    optimizeDeps: {
      include: ['yaml'],
    },
    server: {
      allowedHosts,
    },
    preview: {
      allowedHosts,
    },
    plugins: [tailwindcss(), spotnote?.()],
  };
}
