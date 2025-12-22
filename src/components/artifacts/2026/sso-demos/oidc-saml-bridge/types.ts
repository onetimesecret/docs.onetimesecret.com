// src/components/artifacts/2026/sso-demos/oidc-saml-bridge/types.ts

/**
 * Represents an expanded payload (e.g., decoded SAML or JWT content)
 * shown in technical details for educational purposes.
 */
export interface ExpandedPayload {
  /** Label describing what this payload represents */
  label: string;
  /** The decoded/formatted content to display */
  content: string;
}

/**
 * Represents a single HTTP message in the authentication flow.
 * Can be a browser request, server response, internal process, or server-to-server communication.
 */
export interface HttpMessage {
  /** Type of HTTP message */
  type: 'request' | 'response' | 'internal' | 'server' | 'server-response';
  /** Source of the message */
  from: string;
  /** Destination of the message */
  to: string;
  /** HTTP method (GET, POST, etc.) - present for requests */
  method?: string;
  /** Full URL - present for requests */
  url?: string;
  /** HTTP headers array */
  headers?: string[];
  /** Request/response body content */
  body?: string;
  /** Additional explanatory note about this message */
  note?: string;
  /** HTTP status code - present for responses */
  status?: string;
  /** Label for internal processes */
  label?: string;
  /** Optional expanded payload for decoded content (SAML, JWT, etc.) */
  expandedPayload?: ExpandedPayload;
}

/**
 * Tracks which actors (system components) are active in a given step.
 * Used to visually highlight active components in the architecture diagram.
 */
export interface Actors {
  browser: boolean;
  caddy: boolean;
  logto: boolean;
  entra: boolean;
  ots: boolean;
}

/**
 * Represents a single step in the SSO authentication flow demo.
 * Each step shows what the user sees, the technical HTTP flow,
 * and which system components are involved.
 */
export interface Step {
  /** Step number/identifier */
  id: number;
  /** Human-readable title for this step */
  title: string;
  /** What screen/state the user sees (e.g., 'blank', 'logto-signin', 'dashboard') */
  userSees: string;
  /** URL displayed in the browser address bar */
  urlBar: string;
  /** Detailed description of what's happening in this step */
  description: string;
  /** Security-related note or best practice for this step */
  securityNote: string;
  /** Array of HTTP messages that occur in this step */
  http: HttpMessage[];
  /** Which system components are active/involved in this step */
  actors: Actors;
}
