// src/components/artifacts/2026/sso-demos/oidc-saml-bridge/config.ts

import type { DemoConfig, ActorConfig, ProtocolStackConfig } from "../shared";

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
    {
      key: "caddy",
      label: "Caddy",
      subLabel: "Reverse Proxy",
      emoji: "🛡️",
      activeGradient: "bg-gradient-to-br from-amber-600 to-amber-700",
      activeShadow: "shadow-lg shadow-amber-500/30",
      activeRing: "ring-2 ring-amber-400/50",
    },
    {
      key: "logto",
      label: "Logto",
      subLabel: "Service Provider",
      emoji: "🔑",
      activeGradient: "bg-gradient-to-br from-purple-600 to-purple-700",
      activeShadow: "shadow-lg shadow-purple-500/30",
      activeRing: "ring-2 ring-purple-400/50",
    },
    {
      key: "entra",
      label: "Entra",
      subLabel: "Identity Provider",
      emoji: "🏢",
      activeGradient: "bg-gradient-to-br from-cyan-600 to-cyan-700",
      activeShadow: "shadow-lg shadow-cyan-500/30",
      activeRing: "ring-2 ring-cyan-400/50",
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
      subProtocol: "(via OAuth2Proxy)",
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
    href: "/artifacts/2026/sso-demos/",
    label: "All demos",
  },
  actorConfig,
  protocolStack,
};
