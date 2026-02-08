// src/components/artifacts/2026/sso-demos/shared/index.ts

/**
 * Shared components for SSO authentication flow demos.
 *
 * Usage:
 *   import { SSODemoShell, HttpEntry, Dashboard, LogtoSignIn } from '../shared';
 *   import type { Step, DemoConfig } from '../shared';
 */

// Constants
/** Base path for the SSO demos index page */
export const DEMOS_INDEX_PATH = "/artifacts/2026/sso-demos/";

// Types
export type {
  ExpandedPayload,
  HttpMessage,
  Actors,
  ActorConfig,
  ProtocolStackComponent,
  ProtocolStackConnection,
  ProtocolStackConfig,
  Step,
  DemoConfig,
} from "./types.ts";

// Core components
export { SSODemoShell } from "./SSODemoShell.tsx";
export { TranscriptView } from "./TranscriptView.tsx";
export { HttpEntry } from "./HttpEntry.tsx";
export { ActorDiagram } from "./ActorDiagram.tsx";
export { ProtocolStack } from "./ProtocolStack.tsx";
export { BrowserMockup } from "./BrowserMockup.tsx";

// Screens - OTS application (constant across demos)
export { Dashboard, Blank, Loading } from "./screens/ots/index.ts";

// Screens - Identity Providers (pick per demo)
export {
  LogtoSignIn,
  EntraLogin,
  EntraAutoSubmit,
  OktaLogin,
  Auth0Universal,
  GoogleOAuth,
  KeycloakLogin,
} from "./screens/idp/index.ts";
