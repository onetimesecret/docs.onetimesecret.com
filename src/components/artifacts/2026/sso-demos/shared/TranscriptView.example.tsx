// src/components/artifacts/2026/sso-demos/shared/TranscriptView.example.tsx

/**
 * Example usage of TranscriptView component.
 * This demonstrates how to integrate the transcript view into a demo.
 */

import React from "react";
import { TranscriptView } from "./TranscriptView.tsx";
import { DEMOS_INDEX_PATH } from "./index.ts";
import type { Step, DemoConfig } from "./types.ts";

// Example configuration (would typically come from your demo's config.ts)
const exampleConfig: DemoConfig = {
  title: "OIDC-SAML Bridge Authentication Flow",
  subtitle: "Caddy + Logto (OIDC) + Entra (SAML)",
  version: "1.0.0",
  backLink: {
    href: DEMOS_INDEX_PATH,
    label: "Back to SSO Demos",
  },
  actorConfig: [
    { key: "browser", label: "Browser", activeColor: "bg-actor-browser" },
    { key: "caddy", label: "Caddy", activeColor: "bg-actor-caddy" },
    { key: "logto", label: "Logto", activeColor: "bg-actor-logto" },
    { key: "entra", label: "Entra", activeColor: "bg-actor-entra" },
    { key: "ots", label: "OTS", activeColor: "bg-actor-ots" },
  ],
  protocolStack: {
    components: [],
    connections: [],
  },
};

// Example steps (would typically come from your demo's steps.ts)
const exampleSteps: Step[] = [
  {
    id: 1,
    title: "User requests protected resource",
    userSees: "blank",
    urlBar: "https://secrets.example.com/dashboard",
    description: "User navigates to the dashboard. Caddy intercepts and checks auth.",
    securityNote: "Confidential clients must validate the state parameter on callback to prevent CSRF attacks.",
    http: [
      {
        type: "request",
        from: "Browser",
        to: "Caddy",
        method: "GET",
        url: "https://secrets.example.com/dashboard",
        headers: ["Cookie: (none)"],
        note: "No session cookie present",
      },
      {
        type: "response",
        from: "Caddy",
        to: "Browser",
        status: "302 Found",
        headers: [
          "Location: https://logto.example.com/oidc/auth?client_id=ots-app",
        ],
        note: "Not authenticated → redirect to Logto",
      },
    ],
    actors: {
      browser: true,
      caddy: true,
      logto: false,
      entra: false,
      ots: false,
    },
  },
  // Add more steps as needed...
];

/**
 * Example component showing TranscriptView usage.
 * This could be used in an Astro page or React component.
 */
export function ExampleTranscriptDemo() {
  return (
    <TranscriptView
      steps={exampleSteps}
      config={exampleConfig}
    />
  );
}

/**
 * Alternative: Use alongside interactive demo with tab switching
 */
export function ExampleWithTabSwitching() {
  const [view, setView] = React.useState<"interactive" | "transcript">("interactive");

  return (
    <div>
      {/* Tab switcher */}
      <div className="mb-4 flex gap-2">
        <button
          onClick={() => setView("interactive")}
          className={`px-4 py-2 rounded ${
            view === "interactive"
              ? "bg-blue-600 text-white"
              : "bg-gray-700 text-gray-300"
          }`}
        >
          Interactive Demo
        </button>
        <button
          onClick={() => setView("transcript")}
          className={`px-4 py-2 rounded ${
            view === "transcript"
              ? "bg-blue-600 text-white"
              : "bg-gray-700 text-gray-300"
          }`}
        >
          Full Transcript
        </button>
      </div>

      {/* Render based on selected view */}
      {view === "transcript" ? (
        <TranscriptView steps={exampleSteps} config={exampleConfig} />
      ) : (
        <div>Interactive demo would go here (SSODemoShell)</div>
      )}
    </div>
  );
}
