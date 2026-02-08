// src/components/artifacts/2026/sso-demos/shared/types.ts

/**
 * Shared type definitions for SSO demo components.
 * These types support multiple authentication flow demos with consistent interfaces.
 */

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
  type: "request" | "response" | "internal" | "server" | "server-response";
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
 * Generic actor state - tracks which system components are active in a step.
 * Keys are actor identifiers, values indicate if that actor is active.
 */
export type Actors = Record<string, boolean>;

/**
 * Configuration for a single actor in the diagram.
 */
export interface ActorConfig {
  /** Unique identifier matching keys in Actors */
  key: string;
  /** Display label */
  label: string;
  /** Tailwind background color class when active */
  activeColor: string;
}

/**
 * Configuration for a component in the protocol stack visualization.
 */
export interface ProtocolStackComponent {
  /** Unique identifier matching keys in Actors */
  key: string;
  /** Display label */
  label: string;
  /** Secondary label (e.g., "Reverse Proxy", "Identity Provider") */
  subLabel: string;
  /** Emoji icon */
  emoji: string;
  /** Tailwind gradient classes when active */
  activeGradient: string;
  /** Tailwind shadow classes when active */
  activeShadow: string;
  /** Tailwind ring classes when active */
  activeRing: string;
}

/**
 * Configuration for a connection between components in the protocol stack.
 */
export interface ProtocolStackConnection {
  /** Source component key */
  from: string;
  /** Destination component key */
  to: string;
  /** Protocol label (e.g., "HTTP", "OIDC", "SAML") */
  protocol: string;
  /** Optional secondary protocol info */
  subProtocol?: string;
  /** Tailwind background color class for the connector line when active */
  activeColor: string;
  /** Tailwind border-left color class for left arrow when active (defaults to derived from activeColor) */
  activeBorderLeft?: string;
  /** Tailwind border-right color class for right arrow when active (defaults to derived from activeColor) */
  activeBorderRight?: string;
}

/**
 * Full configuration for the protocol stack visualization.
 */
export interface ProtocolStackConfig {
  components: ProtocolStackComponent[];
  connections: ProtocolStackConnection[];
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
  /** What screen/state the user sees (key into screen map) */
  userSees: string;
  /** URL displayed in the browser address bar */
  urlBar: string;
  /** Detailed description of what's happening in this step */
  description: string;
  /** Security-related note or best practice for this step */
  securityNote?: string;
  /** Array of HTTP messages that occur in this step */
  http: HttpMessage[];
  /** Which system components are active/involved in this step */
  actors: Actors;
}

/**
 * Configuration for the demo shell component.
 */
export interface DemoConfig {
  /** Demo title displayed in header */
  title: string;
  /** Demo subtitle/description */
  subtitle: string;
  /** Semantic version string */
  version: string;
  /** Link back to demo index */
  backLink: {
    href: string;
    label: string;
  };
  /** Actor configuration for the diagram strip */
  actorConfig: ActorConfig[];
  /** Protocol stack visualization configuration */
  protocolStack: ProtocolStackConfig;
}
