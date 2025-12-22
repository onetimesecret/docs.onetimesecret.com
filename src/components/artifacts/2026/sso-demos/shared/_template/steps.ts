// src/components/artifacts/2026/sso-demos/shared/_template/steps.ts
//
// Template: Copy this directory to create a new demo (e.g., sso-demos/my-demo/).
// The import path below is already correct for the copied location.

import type { Step } from "../shared";

/**
 * Define the steps of your authentication flow.
 *
 * Each step includes:
 * - id: Step number (displayed in the UI)
 * - title: Short title for the step
 * - userSees: Key matching a screen in your screens map
 * - urlBar: URL shown in the browser mockup
 * - description: Detailed explanation
 * - securityNote: Optional security consideration
 * - http: Array of HTTP messages
 * - actors: Which components are active (must match actorConfig keys)
 */
export const STEPS: Step[] = [
  {
    id: 1,
    title: "User requests protected resource",
    userSees: "blank",
    urlBar: "https://your-app.example.com/dashboard",
    description:
      "User navigates to a protected page. Describe what happens next.",
    securityNote:
      "Optional: Add a security best practice or consideration here.",
    http: [
      {
        type: "request",
        from: "Browser",
        to: "Your App",
        method: "GET",
        url: "https://your-app.example.com/dashboard",
        headers: ["Cookie: (none)"],
        note: "No session cookie present",
      },
      {
        type: "response",
        from: "Your App",
        to: "Browser",
        status: "302 Found",
        headers: ["Location: https://your-idp.example.com/authorize?..."],
        note: "Redirect to identity provider",
      },
    ],
    actors: {
      browser: true,
      ots: true,
      // Set other actors to true/false based on involvement
    },
  },
  {
    id: 2,
    title: "User authenticates",
    userSees: "loading", // Use a screen key from your screens map
    urlBar: "https://your-idp.example.com/login",
    description: "User enters credentials at the identity provider.",
    http: [
      {
        type: "request",
        from: "Browser",
        to: "IdP",
        method: "GET",
        url: "https://your-idp.example.com/login",
      },
      {
        type: "response",
        from: "IdP",
        to: "Browser",
        status: "200 OK",
        headers: ["Content-Type: text/html"],
        note: "Login page rendered",
      },
    ],
    actors: {
      browser: true,
      ots: false,
      // idp: true, // Uncomment when you add this actor
    },
  },
  {
    id: 3,
    title: "Authentication complete",
    userSees: "dashboard",
    urlBar: "https://your-app.example.com/dashboard",
    description: "User is authenticated and reaches their destination.",
    http: [
      {
        type: "request",
        from: "Browser",
        to: "Your App",
        method: "GET",
        url: "https://your-app.example.com/dashboard",
        headers: ["Cookie: session=..."],
      },
      {
        type: "response",
        from: "Your App",
        to: "Browser",
        status: "200 OK",
        note: "Dashboard rendered with user context",
      },
    ],
    actors: {
      browser: true,
      ots: true,
    },
  },
];
