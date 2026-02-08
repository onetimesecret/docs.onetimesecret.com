// src/components/artifacts/2026/sso-demos/oidc-saml-bridge/config.ts

import type { DemoConfig, ActorConfig, ProtocolStackConfig } from "../shared";
import { DEMOS_INDEX_PATH } from "../shared";

/**
 * Actor configuration for the OIDC→SAML Bridge demo.
 * Defines the components in the auth flow and their visual styling.
 *
 * Colors use semantic classes from sso-demo-theme.css (bg-actor-*).
 * To customize actor colors, modify the theme file.
 */
export const actorConfig: ActorConfig[] = [
  { key: "browser", label: "Browser", activeColor: "bg-actor-browser" },
  { key: "caddy", label: "Caddy", activeColor: "bg-actor-caddy" },
  { key: "logto", label: "Logto", activeColor: "bg-actor-logto" },
  { key: "entra", label: "Entra", activeColor: "bg-actor-entra" },
  { key: "ots", label: "OTS", activeColor: "bg-actor-ots" },
];

/**
 * Protocol stack configuration showing the architecture.
 * Colors use semantic classes from sso-demo-theme.css.
 */
export const protocolStack: ProtocolStackConfig = {
  components: [
    {
      key: "ots",
      label: "OTS",
      subLabel: "Application",
      emoji: "🔐",
      activeGradient: "bg-gradient-to-br from-actor-ots-600 to-actor-ots-700",
      activeShadow: "shadow-lg shadow-actor-ots/30",
      activeRing: "ring-2 ring-actor-ots/50",
    },
    {
      key: "caddy",
      label: "Caddy",
      subLabel: "Reverse Proxy",
      emoji: "🛡️",
      activeGradient: "bg-gradient-to-br from-actor-caddy-600 to-actor-caddy-700",
      activeShadow: "shadow-lg shadow-actor-caddy/30",
      activeRing: "ring-2 ring-actor-caddy/50",
    },
    {
      key: "logto",
      label: "Logto",
      subLabel: "Service Provider",
      emoji: "🔑",
      activeGradient: "bg-gradient-to-br from-actor-logto-600 to-actor-logto-700",
      activeShadow: "shadow-lg shadow-actor-logto/30",
      activeRing: "ring-2 ring-actor-logto/50",
    },
    {
      key: "entra",
      label: "Entra",
      subLabel: "Identity Provider",
      emoji: "🏢",
      activeGradient: "bg-gradient-to-br from-actor-entra-600 to-actor-entra-700",
      activeShadow: "shadow-lg shadow-actor-entra/30",
      activeRing: "ring-2 ring-actor-entra/50",
    },
  ],
  connections: [
    {
      from: "ots",
      to: "caddy",
      protocol: "HTTP",
      activeColor: "bg-actor-ots",
    },
    {
      from: "caddy",
      to: "logto",
      protocol: "OIDC",
      subProtocol: "(via oauth2-proxy)",
      activeColor: "bg-actor-caddy",
    },
    {
      from: "logto",
      to: "entra",
      protocol: "SAML",
      activeColor: "bg-actor-logto",
    },
  ],
};

/**
 * Full demo configuration.
 */
export const demoConfig: DemoConfig = {
  title: "Enterprise SAML for Modern Apps",
  subtitle: "Caddy + Logto bridge OIDC↔SAML to Entra",
  version: "0.3.0",
  backLink: {
    href: DEMOS_INDEX_PATH,
    label: "All demos",
  },
  actorConfig,
  protocolStack,
};
