// src/components/artifacts/2026/sso-demos/shared/_template/demo.tsx
//
// Template: Copy this file to your new demo directory and customize.
//
// Steps to create a new demo:
// 1. Copy this entire _template directory to a new location:
//    e.g., src/components/artifacts/2026/sso-demos/my-new-demo/
// 2. Update the imports below to use "../shared" instead of ".."
// 3. Customize config.ts with your actors and protocol stack
// 4. Customize steps.ts with your authentication flow
// 5. Update the screens map below with the screens your demo uses
// 6. Create an Astro page to host the demo (see existing demos for examples)

import React from "react";
import {
  SSODemoShell,
  // OTS screens (constant across demos)
  Blank,
  Loading,
  Dashboard,
  // IdP screens (pick what you need)
  // LogtoSignIn,
  // EntraLogin,
  // EntraAutoSubmit,
  // OktaLogin,
  // Auth0Universal,
  // GoogleOAuth,
  // KeycloakLogin,
} from ".."; // Change to "../shared" when you copy this to a new demo
import { STEPS } from "./steps.ts";
import { demoConfig } from "./config.ts";

/**
 * Screen mapping for this demo.
 * Maps step.userSees values to screen components.
 *
 * Available screens from shared/screens/:
 *
 * OTS (always available):
 * - Blank: Initial redirect state
 * - Loading: Processing/redirecting state
 * - Dashboard: Authenticated OTS dashboard
 *
 * IdP screens (import as needed):
 * - LogtoSignIn: Logto OIDC provider login
 * - EntraLogin: Microsoft Entra ID login
 * - EntraAutoSubmit: Entra SAML auto-submit
 * - OktaLogin: Okta login page
 * - Auth0Universal: Auth0 Universal Login
 * - GoogleOAuth: Google OAuth consent
 * - KeycloakLogin: Keycloak login page
 */
const screens = {
  blank: Blank,
  loading: Loading,
  dashboard: Dashboard,
  // Add your IdP screens here:
  // "logto-signin": LogtoSignIn,
  // "okta-login": OktaLogin,
};

/**
 * Your Demo Component
 * Rename this function to match your demo.
 */
export default function TemplateDemoComponent() {
  return <SSODemoShell steps={STEPS} screens={screens} config={demoConfig} />;
}
