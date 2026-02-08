# SSO Demo Shared Components

Reusable React components for creating interactive authentication flow demos.
Each demo shows the same OTS application protected by different authentication architectures.

## Quick Start: Creating a New Demo

1. **Copy the template:**
   ```bash
   cp -r src/components/artifacts/2026/sso-demos/shared/_template \
         src/components/artifacts/2026/sso-demos/your-demo-name
   ```

2. **Update imports in `demo.tsx`:**
   ```tsx
   // Change from ".." to "../shared"
   import { SSODemoShell, Blank, Loading, Dashboard } from "../shared";
   ```

3. **Customize your demo:**
   - `config.ts` - Define actors, protocol stack, and metadata
   - `steps.ts` - Define the authentication flow steps
   - `demo.tsx` - Wire up screens and export the component

4. **Create an Astro page:**
   ```astro
   ---
   // src/pages/artifacts/2026/sso-demos/your-demo-name/index.astro
   import DemoLayout from '../../../../../layouts/DemoLayout.astro';
   import YourDemo from '../../../../../components/artifacts/2026/sso-demos/your-demo-name/demo.tsx';
   ---
   <DemoLayout title="Your Demo Title">
     <YourDemo client:load />
   </DemoLayout>
   ```

## Available Components

### Core Components

| Component | Description |
|-----------|-------------|
| `SSODemoShell` | Main orchestrator with navigation, keyboard controls, autoplay |
| `HttpEntry` | HTTP message display with expandable payloads |
| `ActorDiagram` | Horizontal actor indicator strip |
| `ProtocolStack` | Protocol stack visualization |
| `BrowserMockup` | Browser chrome wrapper |

### OTS Screens (Constant Across Demos)

| Screen | Key | Description |
|--------|-----|-------------|
| `Blank` | `blank` | Initial redirect state ("Redirecting to login...") |
| `Loading` | `loading` | Processing state (spinner) |
| `Dashboard` | `dashboard` | Authenticated OTS dashboard |

### IdP Screens (Pick Per Demo)

| Screen | Key | Description |
|--------|-----|-------------|
| `LogtoSignIn` | `logto-signin` | Logto OIDC provider login |
| `EntraLogin` | `entra-login` | Microsoft Entra ID login |
| `EntraAutoSubmit` | `entra-autosubmit` | Entra SAML auto-submit |
| `OktaLogin` | `okta-login` | Okta login page |
| `Auth0Universal` | `auth0-universal` | Auth0 Universal Login |
| `GoogleOAuth` | `google-oauth` | Google OAuth consent |
| `KeycloakLogin` | `keycloak-login` | Keycloak login page |

## Type Reference

### Step

```typescript
interface Step {
  id: number;                    // Step number displayed in UI
  title: string;                 // Short title
  userSees: string;              // Key into screens map
  urlBar: string;                // URL in browser mockup
  description: string;           // Detailed explanation
  securityNote?: string;         // Optional security tip
  http: HttpMessage[];           // HTTP messages in this step
  actors: Record<string, boolean>; // Which actors are active
}
```

### HttpMessage

```typescript
interface HttpMessage {
  type: "request" | "response" | "internal" | "server" | "server-response";
  from: string;
  to: string;
  method?: string;               // GET, POST, etc.
  url?: string;
  headers?: string[];
  body?: string;
  note?: string;                 // Explanatory note
  status?: string;               // HTTP status (responses)
  label?: string;                // Label (internal processes)
  expandedPayload?: {            // Decoded content (SAML, JWT)
    label: string;
    content: string;
  };
}
```

### DemoConfig

```typescript
interface DemoConfig {
  title: string;                 // Demo title
  subtitle: string;              // Description
  version: string;               // Semantic version
  backLink: { href: string; label: string };
  actorConfig: ActorConfig[];    // Actor definitions
  protocolStack: ProtocolStackConfig;
}
```

### ActorConfig

```typescript
interface ActorConfig {
  key: string;                   // Unique identifier
  label: string;                 // Display name
  activeColor: string;           // Tailwind bg color (e.g., "bg-blue-500")
}
```

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `←` | Previous step |
| `→` | Next step |
| `Space` | Toggle autoplay |
| `T` | Toggle transcript view |
| `R` | Restart demo |
| `1` / `2` / `3` | Playback speed (slow / normal / fast) |

## Adding New IdP Screens

1. Create the component in `shared/screens/idp/`:
   ```tsx
   // YourIdPLogin.tsx
   import React from "react";

   export function YourIdPLogin() {
     return (
       <div className="flex h-full items-center justify-center bg-slate-900">
         {/* Your IdP login mockup */}
       </div>
     );
   }
   ```

2. Export from `shared/screens/idp/index.ts`:
   ```typescript
   export { YourIdPLogin } from "./YourIdPLogin.tsx";
   ```

3. Re-export from `shared/index.ts`:
   ```typescript
   export { YourIdPLogin } from "./screens/idp/index.ts";
   ```

## Directory Structure

```
shared/
├── _template/              # Copy to create new demos
│   ├── config.ts
│   ├── demo.tsx
│   └── steps.ts
├── screens/
│   ├── ots/                # OTS app screens (constant)
│   │   ├── Blank.tsx
│   │   ├── Dashboard.tsx
│   │   └── Loading.tsx
│   └── idp/                # IdP screens (pick per demo)
│       ├── EntraAutoSubmit.tsx
│       ├── EntraLogin.tsx
│       ├── LogtoSignIn.tsx
│       └── ...
├── ActorDiagram.tsx
├── BrowserMockup.tsx
├── HttpEntry.tsx
├── ProtocolStack.tsx
├── SSODemoShell.tsx
├── types.ts
└── index.ts
```
