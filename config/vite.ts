export function createViteConfig() {
  // Remember, for security reasons, only variables prefixed with VITE_ are
  // available here to prevent accidental exposure of sensitive
  // environment variables to the client-side code.
  const viteBaseUrl = process.env.VITE_BASE_URL;

  // According to the documentation, we should be able to set the allowed hosts
  // via __VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS but as of 5.4.15m that is not
  // working as expected. So here we capture the value of that env var with
  // and without the __ prefix and if they're defined, add them to
  // server.allowedHosts below. -- Delano (2025-03-28)
  //
  // https://vite.dev/config/server-options.html#server-allowedhosts
  // https://github.com/vitejs/vite/security/advisories/GHSA-vg6x-rcgg-rjx6
  const viteAdditionalServerAllowedHosts =
    process.env.VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS;

  const __viteAdditionalServerAllowedHosts =
    process.env.__VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS;

  return {
    server: {
      origin: viteBaseUrl,
      allowedHosts: (() => {
        // NOTE: This is an Immediately Invoked Function Expression (IIFE)
        // that executes exactly once during config load/parsing time.
        // The returned array becomes the value of allowedHosts. We do
        // this to avoid adding empty strings to the array.
        //
        // Start with default allowed hosts
        const hosts = ["localhost", "127.0.0.1"];

        // Add additional hosts from environment variables if defined
        if (viteAdditionalServerAllowedHosts) {
          hosts.push(viteAdditionalServerAllowedHosts);
        }

        if (__viteAdditionalServerAllowedHosts) {
          hosts.push(__viteAdditionalServerAllowedHosts);
        }

        return hosts;
      })(),
    },
  };
}
