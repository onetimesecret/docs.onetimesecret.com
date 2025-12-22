// src/components/artifacts/2026/sso-demos/oidc-saml-bridge/demo.tsx

/**
 * OIDC→SAML Bridge via Forward Auth
 * Caddy + Logto + Entra ID
 *
 * SP-initiated flow with external auth gateway and protocol bridging.
 *
 * This demo shows OIDC-to-SAML protocol translation for enterprise SSO.
 * The application (OTS) uses OIDC, while the enterprise IdP (Entra) uses SAML.
 * Logto bridges the protocols, and Caddy enforces authentication at the gateway.
 *
 * Technology Stack: Caddy (reverse proxy with forward_auth), Logto
 * (OIDC provider + SAML SP), Entra ID (SAML IdP).
 * Some implementation details are specific to these technologies, though the
 * overall pattern applies to similar stacks.
 */

import React from "react";
import {
  SSODemoShell,
  Blank,
  Loading,
  Dashboard,
  LogtoSignIn,
  EntraLogin,
  EntraAutoSubmit,
} from "../shared";
import { STEPS } from "./steps.ts";
import { demoConfig } from "./config.ts";

/**
 * Screen mapping for this demo.
 * Maps step.userSees values to screen components.
 */
const screens = {
  blank: Blank,
  loading: Loading,
  dashboard: Dashboard,
  "logto-signin": LogtoSignIn,
  "entra-login": EntraLogin,
  "entra-autosubmit": EntraAutoSubmit,
};

/**
 * OIDC-SAML Bridge Demo
 * Uses the shared SSODemoShell with demo-specific steps, screens, and config.
 */
export default function OIDCSAMLBridge() {
  return <SSODemoShell steps={STEPS} screens={screens} config={demoConfig} />;
}
