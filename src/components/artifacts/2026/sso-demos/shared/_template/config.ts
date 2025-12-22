// src/components/artifacts/2026/sso-demos/shared/_template/config.ts
//
// Template: Copy this directory to create a new demo (e.g., sso-demos/my-demo/).
// The import path below is already correct for the copied location.

import type { DemoConfig, ActorConfig, ProtocolStackConfig } from "../shared";

/**
 * Actor configuration for the demo.
 * Define the components in your auth flow and their visual styling.
 *
 * Common actors:
 * - browser: Always include this
 * - Your auth proxy/gateway (e.g., caddy, nginx, traefik)
 * - Your OIDC provider (e.g., logto, auth0, okta, keycloak)
 * - Your SAML IdP if applicable (e.g., entra, okta, onelogin)
 * - Your application (e.g., ots)
 */
export const actorConfig: ActorConfig[] = [
  { key: "browser", label: "Browser", activeColor: "bg-blue-500" },
  // Add your actors here:
  // { key: "proxy", label: "Proxy", activeColor: "bg-orange-500" },
  // { key: "idp", label: "IdP", activeColor: "bg-purple-500" },
  { key: "ots", label: "OTS", activeColor: "bg-emerald-500" },
];

/**
 * Protocol stack configuration showing the architecture.
 * Components appear left-to-right, connections link adjacent components.
 */
export const protocolStack: ProtocolStackConfig = {
  components: [
    {
      key: "ots",
      label: "OTS",
      subLabel: "Application",
      emoji: "🔐",
      activeGradient: "bg-gradient-to-br from-emerald-600 to-emerald-700",
      activeShadow: "shadow-lg shadow-emerald-500/30",
      activeRing: "ring-2 ring-emerald-400/50",
    },
    // Add more components here matching your actorConfig
  ],
  connections: [
    // Define connections between adjacent components:
    // {
    //   from: "ots",
    //   to: "proxy",
    //   protocol: "HTTP",
    //   activeColor: "bg-emerald-500",
    // },
  ],
};

/**
 * Full demo configuration.
 */
export const demoConfig: DemoConfig = {
  title: "Your Demo Title",
  subtitle: "Brief description of the auth flow",
  version: "0.1.0",
  backLink: {
    href: "/artifacts/2026/sso-demos/",
    label: "All demos",
  },
  actorConfig,
  protocolStack,
};
