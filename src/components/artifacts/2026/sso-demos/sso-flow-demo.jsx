import React, { useState, useEffect, Fragment } from "react";

/**
 * SSO Authentication Flow Demo
 *
 * External auth gateway with protocol bridging.
 *
 * Implementation Type: Service Provider-Initiated (SP-initiated) flow with Logto
 * acting as both OIDC provider and SAML Service Provider.
 *
 * This demo walks through what happens when a user opens the dashboard but needs
 * to authenticate. It covers the complete OIDC + SAML authentication dance across
 * three systems: our application (OTS), an authentication broker (Logto), and a
 * customer's identity provider (Entra/Azure AD).
 *
 * Technology Stack: This demo uses Caddy (reverse proxy), OAuth2 Proxy / Logto
 * adapter (auth layer), Logto (OIDC + SAML bridge), and Entra ID (enterprise IdP).
 * Some implementation details (API paths, data structures, configuration) are
 * specific to these technologies, though the overall flow applies to similar stacks.
 *
 * NOTE: This is a static, self-contained demo that does not connect or interact
 * with any systems. It is simplified for educational purposes and is NOT intended
 * as a reference implementation. Additional technical details are necessary for a
 * secure production implementation.
 *
 *
 * Security Notes for Production Implementation:
 *
 * User credentials only ever go to Entra (the customer's identity provider)—
 * neither your app nor Logto ever see passwords. The reverse proxy handles
 * authentication, but application-level security remains OTS's responsibility.
 *
 * Step 1 - Initial redirect to authentication:
 *   Confidential clients (like this Caddy setup) must validate the `state`
 *   parameter on callback to prevent CSRF attacks. Public clients (like SPAs
 *   with React/Vue) should additionally implement PKCE.
 *
 * Step 2 - Logto sign-in page:
 *   Session cookies must use HttpOnly and Secure flags. SameSite policy should
 *   be configured based on whether components share the same domain.
 *
 * Step 4 - Browser redirects to Entra:
 *   SAML AuthnRequest signing is recommended for high-security environments to
 *   prevent tampering. Always validate the decoded structure. The RelayState
 *   parameter preserves application state across the SAML roundtrip.
 *
 * Step 7 - Browser POSTs assertion to Logto:
 *   The SAML assertion contains the signed proof of identity from Entra.
 *   Production must validate signature, timestamps, InResponseTo field, and
 *   prevent replay attacks.
 *
 * Step 9 - Token exchange:
 *   This is the Authorization Code Flow with Client Secret. The browser never
 *   sees this request since the token exchange happens server-to-server (between
 *   Caddy and Logto). Note: the `identities` structure is Logto-specific.
 *
 * Step 10 - Authenticated request reaches OTS:
 *   After authentication, your app only receives identity headers from the
 *   reverse proxy and never validates tokens directly. Restrict OTS to only
 *   accept traffic from Caddy. OTS must set appropriate security headers
 *   (Content-Security-Policy, CORS) for browser protection—reverse proxy
 *   authentication doesn't replace application-level security headers.
 *
 * Step 11 - Subsequent requests:
 *   Session timeouts must be configured consistently across browser cookies,
 *   OAuth2 proxy sessions, and application sessions to prevent security gaps.
 */
const STEPS = [
  {
    id: 1,
    title: "User requests protected resource",
    userSees: "blank",
    urlBar: "https://secrets.example.com/dashboard",
    description:
      "User navigates to the dashboard. Caddy intercepts and checks auth.",
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
        type: "internal",
        from: "Caddy",
        to: "Auth Layer",
        label: "forward_auth subrequest",
        note: "Caddy asks auth layer: is this user authenticated?",
      },
      {
        type: "response",
        from: "Caddy",
        to: "Browser",
        status: "302 Found",
        headers: [
          "Location: https://logto.example.com/oidc/auth?",
          "  client_id=ots-app",
          "  &redirect_uri=https://secrets.example.com/oauth2/callback",
          "  &response_type=code",
          "  &scope=openid profile email",
          "  &state=random-csrf-token",
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
  {
    id: 2,
    title: "Browser follows redirect to Logto",
    userSees: "logto-signin",
    urlBar:
      "https://logto.example.com/sign-in?first_screen=signIn&interaction_id=abc123",
    description:
      "Browser lands on Logto's sign-in page. User sees login options.",
    http: [
      {
        type: "request",
        from: "Browser",
        to: "Logto",
        method: "GET",
        url: "https://logto.example.com/oidc/auth?client_id=ots-app&...",
        headers: [],
      },
      {
        type: "response",
        from: "Logto",
        to: "Browser",
        status: "302 Found",
        headers: [
          "Location: https://logto.example.com/sign-in?...",
          "Set-Cookie: logto_session_id=sess_abc123; HttpOnly; Secure; SameSite=Lax",
        ],
        note: "Logto creates pre-auth session, redirects to sign-in UI",
      },
      {
        type: "request",
        from: "Browser",
        to: "Logto",
        method: "GET",
        url: "https://logto.example.com/sign-in?first_screen=signIn&...",
        headers: ["Cookie: logto_session_id=sess_abc123"],
      },
      {
        type: "response",
        from: "Logto",
        to: "Browser",
        status: "200 OK",
        headers: ["Content-Type: text/html"],
        note: "Sign-in page HTML",
      },
    ],
    actors: {
      browser: true,
      caddy: false,
      logto: true,
      entra: false,
      ots: false,
    },
  },
  {
    id: 3,
    title: "User clicks Enterprise SSO",
    userSees: "logto-signin",
    urlBar:
      "https://logto.example.com/sign-in?first_screen=signIn&interaction_id=abc123",
    description:
      "User identifies themselves or clicks the SSO button. Logto initiates SAML request to Entra.",
    http: [
      {
        type: "request",
        from: "Browser",
        to: "Logto",
        method: "POST",
        url: "https://logto.example.com/api/interaction/single-sign-on/connectors/entra-saml/authorization-url",
        headers: [
          "Cookie: logto_session_id=sess_abc123",
          "Content-Type: application/json",
        ],
        body: '{ "state": "sso-state-xyz" }',
        note: "Request SSO redirect URL",
      },
      {
        type: "response",
        from: "Logto",
        to: "Browser",
        status: "200 OK",
        headers: ["Content-Type: application/json"],
        body: '{\n  "redirectTo": "https://login.microsoftonline.com/{tenant}/saml2?SAMLRequest=base64..."\n}',
        note: "Logto returns SAML AuthnRequest URL",
      },
    ],
    actors: {
      browser: true,
      caddy: false,
      logto: true,
      entra: false,
      ots: false,
    },
  },
  {
    id: 4,
    title: "Browser redirects to Entra (IdP)",
    userSees: "entra-login",
    urlBar: "https://login.microsoftonline.com/contoso.com/saml2",
    description:
      "Browser follows redirect to customer's Entra. The SAMLRequest is a base64-encoded (and optionally signed) XML document. RelayState preserves application state.",
    http: [
      {
        type: "request",
        from: "Browser",
        to: "Entra",
        method: "GET",
        url: "https://login.microsoftonline.com/{tenant}/saml2?SAMLRequest=...&RelayState=sso-state-xyz",
        headers: [],
        expandedPayload: {
          label: "Decoded SAMLRequest",
          content: `<samlp:AuthnRequest
  xmlns:samlp="urn:oasis:names:tc:SAML:2.0:protocol"
  ID="_abc123"
  Version="2.0"
  IssueInstant="2024-01-15T10:30:00Z"
  Destination="https://login.microsoftonline.com/{tenant}/saml2"
  ProtocolBinding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST"
  AssertionConsumerServiceURL="https://logto.example.com/api/authn/saml/entra-connector">
  <saml:Issuer>https://logto.example.com</saml:Issuer>
  <samlp:NameIDPolicy Format="urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress"/>
</samlp:AuthnRequest>`,
        },
      },
      {
        type: "response",
        from: "Entra",
        to: "Browser",
        status: "200 OK",
        headers: [
          "Content-Type: text/html",
          "Set-Cookie: ESTSAUTH=...; HttpOnly; Secure",
        ],
        note: "Entra login page (or auto-proceeds if session exists)",
      },
    ],
    actors: {
      browser: true,
      caddy: false,
      logto: false,
      entra: true,
      ots: false,
    },
  },
  {
    id: 5,
    title: "User authenticates with Entra",
    userSees: "entra-login",
    urlBar: "https://login.microsoftonline.com/contoso.com/oauth2/authorize",
    description:
      "User enters credentials (or is auto-logged-in via Windows SSO). MFA may be required.",
    http: [
      {
        type: "request",
        from: "Browser",
        to: "Entra",
        method: "POST",
        url: "https://login.microsoftonline.com/{tenant}/login",
        headers: ["Content-Type: application/x-www-form-urlencoded"],
        body: "login=alice@contoso.com&passwd=••••••••&ctx=...",
        note: "Credentials submitted",
      },
      {
        type: "response",
        from: "Entra",
        to: "Browser",
        status: "200 OK / 302",
        headers: [],
        note: "May redirect to MFA, or proceed directly",
      },
    ],
    actors: {
      browser: true,
      caddy: false,
      logto: false,
      entra: true,
      ots: false,
    },
  },
  {
    id: 6,
    title: "Entra issues SAML Response",
    userSees: "entra-autosubmit",
    urlBar: "https://login.microsoftonline.com/contoso.com/saml2",
    description:
      "After successful auth, Entra returns a signed SAML assertion via auto-submitting form.",
    http: [
      {
        type: "response",
        from: "Entra",
        to: "Browser",
        status: "200 OK",
        headers: ["Content-Type: text/html"],
        body: `<html>
<body onload="document.forms[0].submit()">
  <form method="POST" action="https://logto.example.com/api/authn/saml/entra-connector">
    <input type="hidden" name="SAMLResponse" value="base64-encoded-assertion"/>
    <input type="hidden" name="RelayState" value="sso-state-xyz"/>
  </form>
</body>
</html>`,
        note: "Auto-submit form with SAML assertion",
      },
    ],
    actors: {
      browser: true,
      caddy: false,
      logto: false,
      entra: true,
      ots: false,
    },
  },
  {
    id: 7,
    title: "Browser POSTs assertion to Logto",
    userSees: "loading",
    urlBar: "https://logto.example.com/api/authn/saml/entra-connector",
    description:
      "Browser auto-submits the SAML Response to Logto's assertion consumer service.",
    http: [
      {
        type: "request",
        from: "Browser",
        to: "Logto",
        method: "POST",
        url: "https://logto.example.com/api/authn/saml/entra-connector",
        headers: [
          "Content-Type: application/x-www-form-urlencoded",
          "Cookie: logto_session_id=sess_abc123",
        ],
        body: "SAMLResponse=PHNhbWxw...&RelayState=sso-state-xyz",
        expandedPayload: {
          label: "Decoded SAMLResponse (assertion)",
          content: `<samlp:Response xmlns:samlp="urn:oasis:names:tc:SAML:2.0:protocol"
  ID="_response_abc456"
  InResponseTo="_abc123"
  Version="2.0"
  IssueInstant="2024-01-15T10:31:00Z"
  Destination="https://logto.example.com/api/authn/saml/entra-connector">
  <saml:Issuer>https://sts.windows.net/{tenant}/</saml:Issuer>
  <samlp:Status>
    <samlp:StatusCode Value="urn:oasis:names:tc:SAML:2.0:status:Success"/>
  </samlp:Status>
  <saml:Assertion>
    <saml:Issuer>https://sts.windows.net/{tenant}/</saml:Issuer>
    <ds:Signature><!-- Entra's signature --></ds:Signature>
    <saml:Subject>
      <saml:NameID>alice@contoso.com</saml:NameID>
      <saml:SubjectConfirmation Method="urn:oasis:names:tc:SAML:2.0:cm:bearer">
        <saml:SubjectConfirmationData InResponseTo="_abc123"
          NotOnOrAfter="2024-01-15T10:36:00Z"
          Recipient="https://logto.example.com/api/authn/saml/entra-connector"/>
      </saml:SubjectConfirmation>
    </saml:Subject>
    <saml:Conditions NotBefore="2024-01-15T10:30:00Z" NotOnOrAfter="2024-01-15T10:36:00Z">
      <saml:AudienceRestriction>
        <saml:Audience>https://logto.example.com</saml:Audience>
      </saml:AudienceRestriction>
    </saml:Conditions>
    <saml:AuthnStatement AuthnInstant="2024-01-15T10:31:00Z" SessionIndex="_session_abc123">
      <saml:AuthnContext>
        <saml:AuthnContextClassRef>urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport</saml:AuthnContextClassRef>
      </saml:AuthnContext>
    </saml:AuthnStatement>
    <saml:AttributeStatement>
      <saml:Attribute Name="http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress">
        <saml:AttributeValue>alice@contoso.com</saml:AttributeValue>
      </saml:Attribute>
      <saml:Attribute Name="http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname">
        <saml:AttributeValue>Alice</saml:AttributeValue>
      </saml:Attribute>
      <saml:Attribute Name="http://schemas.microsoft.com/ws/2008/06/identity/claims/groups">
        <saml:AttributeValue>group-id-123</saml:AttributeValue>
      </saml:Attribute>
    </saml:AttributeStatement>
  </saml:Assertion>
</samlp:Response>`,
        },
      },
      {
        type: "internal",
        from: "Logto",
        to: "Logto",
        label: "Validate SAML assertion",
        note: "Verify signature against Entra's certificate, check timestamps, audience, etc.",
      },
      {
        type: "response",
        from: "Logto",
        to: "Browser",
        status: "302 Found",
        headers: [
          "Location: https://logto.example.com/oidc/auth/{interaction-id}",
          "Set-Cookie: logto_session_id=sess_abc123_authenticated; HttpOnly; Secure",
        ],
        note: "Session now contains verified identity",
      },
    ],
    actors: {
      browser: true,
      caddy: false,
      logto: true,
      entra: false,
      ots: false,
    },
  },
  {
    id: 8,
    title: "Logto completes OIDC flow",
    userSees: "loading",
    urlBar:
      "https://secrets.example.com/oauth2/callback?code=authz_code_xyz&state=random-csrf-token",
    description:
      "Logto issues authorization code, redirects back to the original application.",
    http: [
      {
        type: "request",
        from: "Browser",
        to: "Logto",
        method: "GET",
        url: "https://logto.example.com/oidc/auth/{interaction-id}",
        headers: ["Cookie: logto_session_id=sess_abc123_authenticated"],
      },
      {
        type: "response",
        from: "Logto",
        to: "Browser",
        status: "302 Found",
        headers: [
          "Location: https://secrets.example.com/oauth2/callback?code=authz_code_xyz&state=random-csrf-token",
        ],
        note: "Authorization code issued, redirect to app",
      },
    ],
    actors: {
      browser: true,
      caddy: false,
      logto: true,
      entra: false,
      ots: false,
    },
  },
  {
    id: 9,
    title: "Caddy exchanges code for tokens",
    userSees: "loading",
    urlBar:
      "https://secrets.example.com/oauth2/callback?code=authz_code_xyz&state=random-csrf-token",
    description:
      "Auth layer receives the code and exchanges it server-to-server with Logto for tokens.",
    http: [
      {
        type: "request",
        from: "Browser",
        to: "Caddy",
        method: "GET",
        url: "https://secrets.example.com/oauth2/callback?code=authz_code_xyz&state=random-csrf-token",
        headers: [],
      },
      {
        type: "server",
        from: "Caddy (Auth Layer)",
        to: "Logto",
        label: "Server-to-server token exchange",
        method: "POST",
        url: "https://logto.example.com/oidc/token",
        headers: [
          "Content-Type: application/x-www-form-urlencoded",
          "Authorization: Basic base64(client_id:client_secret)",
        ],
        body: "grant_type=authorization_code&code=authz_code_xyz&redirect_uri=https://secrets.example.com/oauth2/callback",
        note: "Browser never sees this request",
      },
      {
        type: "server-response",
        from: "Logto",
        to: "Caddy (Auth Layer)",
        status: "200 OK",
        body: `{
  "access_token": "at_xyz...",
  "id_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "refresh_token": "rt_abc..."
}`,
        expandedPayload: {
          label: "Decoded id_token (JWT)",
          content: `{
  "iss": "https://logto.example.com/oidc",
  "sub": "user_abc123",
  "aud": "ots-app",
  "exp": 1705323600,
  "iat": 1705320000,
  "email": "alice@contoso.com",
  "email_verified": true,
  "name": "Alice Smith",
  "identities": {
    "entra-saml": {
      "userId": "alice@contoso.com",
      "details": {
        "groups": ["group-id-123"]
      }
    }
  }
}`,
        },
        note: "Auth layer now has user identity. Logto maps SAML attributes (emailaddress, givenname, groups) to OIDC claims (email, name, identities).",
      },
      {
        type: "response",
        from: "Caddy",
        to: "Browser",
        status: "302 Found",
        headers: [
          "Location: https://secrets.example.com/dashboard",
          "Set-Cookie: _oauth2_proxy=encrypted-session-data; HttpOnly; Secure; SameSite=Lax; Path=/",
        ],
        note: "Auth layer creates its own session, redirects to original destination",
      },
    ],
    actors: {
      browser: true,
      caddy: true,
      logto: true,
      entra: false,
      ots: false,
    },
  },
  {
    id: 10,
    title: "Authenticated request reaches OTS",
    userSees: "dashboard",
    urlBar: "https://secrets.example.com/dashboard",
    description:
      "Finally! The user reaches their dashboard. OTS receives identity headers from Caddy.",
    http: [
      {
        type: "request",
        from: "Browser",
        to: "Caddy",
        method: "GET",
        url: "https://secrets.example.com/dashboard",
        headers: ["Cookie: _oauth2_proxy=encrypted-session-data"],
      },
      {
        type: "internal",
        from: "Caddy",
        to: "Auth Layer",
        label: "forward_auth validation",
        note: "Decrypt session cookie, validate not expired",
      },
      {
        type: "server",
        from: "Caddy",
        to: "OTS",
        method: "GET",
        url: "/dashboard",
        headers: [
          "X-Forwarded-For: 192.168.1.100",
          "X-Forwarded-Proto: https",
          "X-Auth-Request-User: alice@contoso.com",
          "X-Auth-Request-Email: alice@contoso.com",
          "X-Auth-Request-Groups: group-id-123",
          "X-Auth-Request-Access-Token: at_xyz...",
        ],
        note: "OTS trusts these headers implicitly (internal network)",
      },
      {
        type: "server-response",
        from: "OTS",
        to: "Browser (via Caddy)",
        status: "200 OK",
        headers: ["Content-Type: text/html"],
        note: "Dashboard HTML rendered with user context",
      },
    ],
    actors: {
      browser: true,
      caddy: true,
      logto: false,
      entra: false,
      ots: true,
    },
  },
  {
    id: 11,
    title: "Subsequent requests",
    userSees: "dashboard",
    urlBar: "https://secrets.example.com/api/secrets",
    description:
      "All future requests follow the same pattern: session cookie → forward_auth → identity headers → OTS.",
    http: [
      {
        type: "request",
        from: "Browser",
        to: "Caddy",
        method: "GET",
        url: "https://secrets.example.com/api/secrets",
        headers: ["Cookie: _oauth2_proxy=encrypted-session-data"],
      },
      {
        type: "internal",
        from: "Caddy",
        to: "Auth Layer",
        label: "forward_auth (fast path)",
        note: "Session valid → 200 + headers (no redirects)",
      },
      {
        type: "server",
        from: "Caddy",
        to: "OTS",
        method: "GET",
        url: "/api/secrets",
        headers: [
          "X-Auth-Request-User: alice@contoso.com",
          "X-Auth-Request-Email: alice@contoso.com",
        ],
      },
      {
        type: "server-response",
        from: "OTS",
        to: "Browser",
        status: "200 OK",
        body: '{"secrets": [...]}',
        note: "Normal API response",
      },
    ],
    actors: {
      browser: true,
      caddy: true,
      logto: false,
      entra: false,
      ots: true,
    },
  },
];

function BrowserScreen({ type }) {
  const screens = {
    blank: (
      <div className="flex h-full items-center justify-center bg-white text-gray-400">
        <div className="animate-pulse">Loading...</div>
      </div>
    ),
    loading: (
      <div className="flex h-full items-center justify-center bg-white text-gray-400">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
          <span>Redirecting...</span>
        </div>
      </div>
    ),
    "logto-signin": (
      <div className="flex h-full items-center justify-center bg-gray-50 p-4">
        <div className="w-full max-w-sm rounded-lg bg-white p-8 shadow-lg">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-600 font-bold text-white">
              L
            </div>
            <h2 className="text-xl font-semibold text-gray-800">
              Sign in to OTS
            </h2>
          </div>
          <div className="space-y-3">
            <button className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 px-4 py-3 text-gray-700 hover:bg-gray-50">
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </button>
            <button className="flex w-full items-center justify-center gap-3 rounded-lg bg-blue-600 px-4 py-3 font-medium text-white ring-2 ring-blue-600 ring-offset-2 hover:bg-blue-700">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
              </svg>
              → Sign in with Company SSO
            </button>
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">or</span>
              </div>
            </div>
            <input
              type="email"
              placeholder="Email"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-800"
              readOnly
            />
            <button className="w-full rounded-lg bg-gray-800 py-2 text-white">
              Continue
            </button>
          </div>
        </div>
      </div>
    ),
    "entra-login": (
      <div className="flex h-full bg-white">
        <div className="flex flex-1 items-center justify-center p-8">
          <div className="w-full max-w-sm">
            <div className="mb-8">
              <svg className="h-7 w-28" viewBox="0 0 120 28">
                <rect x="0" y="0" width="12" height="12" fill="#f25022" />
                <rect x="14" y="0" width="12" height="12" fill="#7fba00" />
                <rect x="0" y="14" width="12" height="12" fill="#00a4ef" />
                <rect x="14" y="14" width="12" height="12" fill="#ffb900" />
                <text
                  x="34"
                  y="19"
                  fill="#333"
                  fontSize="15"
                  fontFamily="Segoe UI, sans-serif"
                >
                  Microsoft
                </text>
              </svg>
            </div>
            <h1 className="mb-2 text-2xl text-gray-800">Sign in</h1>
            <input
              type="email"
              value="alice@contoso.com"
              readOnly
              className="mb-4 w-full border-0 border-b-2 border-blue-500 bg-transparent px-0 py-2 text-gray-800 focus:outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              readOnly
              className="mb-6 w-full border-0 border-b border-gray-300 bg-transparent px-0 py-2 text-gray-800 focus:outline-none"
            />
            <button className="w-full bg-blue-600 py-2 font-medium text-white">
              Sign in
            </button>
            <div className="mt-4 text-sm text-gray-600">
              <span className="cursor-pointer text-blue-600">
                Can't access your account?
              </span>
            </div>
          </div>
        </div>
      </div>
    ),
    "entra-autosubmit": (
      <div className="flex h-full items-center justify-center bg-white">
        <div className="text-center text-gray-600">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
          <p>Signing you in...</p>
        </div>
      </div>
    ),
    dashboard: (
      <div className="h-full bg-gray-100">
        <nav className="flex items-center justify-between bg-slate-800 px-4 py-3 text-white">
          <div className="flex items-center gap-4">
            <span className="text-lg font-bold">🔐 OTS</span>
            <span className="text-sm text-slate-300">Dashboard</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm">alice@contoso.com</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 font-medium">
              A
            </div>
          </div>
        </nav>
        <div className="p-6">
          <div className="mb-4 rounded-lg bg-white p-6 shadow">
            <h2 className="mb-4 text-lg font-semibold text-gray-800">
              Create a Secret
            </h2>
            <textarea
              className="h-20 w-full resize-none rounded-lg border p-3 text-gray-800"
              placeholder="Enter your secret..."
              readOnly
            />
            <button className="mt-3 rounded-lg bg-emerald-600 px-4 py-2 text-white">
              Create Secret Link
            </button>
          </div>
          <div className="rounded-lg bg-white p-6 shadow">
            <h2 className="mb-4 text-lg font-semibold text-gray-800">
              Recent Secrets
            </h2>
            <div className="text-sm text-gray-500">No secrets created yet</div>
          </div>
        </div>
      </div>
    ),
  };
  return screens[type] || screens.blank;
}

function HttpEntry({ entry }) {
  const [expanded, setExpanded] = useState(false);

  const typeStyles = {
    request: "border-l-4 border-blue-500 bg-blue-950/40",
    response: "border-l-4 border-emerald-500 bg-emerald-950/40",
    internal: "border-l-4 border-gray-500 bg-gray-800",
    server: "border-l-4 border-purple-500 bg-purple-950/40",
    "server-response": "border-l-4 border-purple-500 bg-purple-950/40",
  };

  const labels = {
    request: "→ REQUEST",
    response: "← RESPONSE",
    internal: "⚙ INTERNAL",
    server: "🔒 SERVER→SERVER",
    "server-response": "🔒 SERVER RESPONSE",
  };

  return (
    <div className={`${typeStyles[entry.type]} rounded p-3 text-sm`}>
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center gap-2 text-xs text-gray-400">
            <span className="font-mono">{labels[entry.type]}</span>
            {entry.from && entry.to && (
              <span>
                {entry.from} → {entry.to}
              </span>
            )}
          </div>
          {entry.label && (
            <div className="mb-1 font-medium text-yellow-400">
              {entry.label}
            </div>
          )}
          {entry.method && (
            <div className="font-mono">
              <span className="text-emerald-400">{entry.method}</span>{" "}
              <span className="break-all text-blue-300">{entry.url}</span>
            </div>
          )}
          {entry.status && (
            <div className="font-mono text-emerald-400">{entry.status}</div>
          )}
          {entry.headers && entry.headers.length > 0 && (
            <div className="mt-2 font-mono text-xs text-gray-400">
              {entry.headers.map((h, i) => (
                <div key={i}>{h}</div>
              ))}
            </div>
          )}
          {entry.body && (
            <pre className="mt-2 overflow-x-auto rounded bg-black/30 p-2 font-mono text-xs whitespace-pre-wrap text-gray-300">
              {entry.body}
            </pre>
          )}
          {entry.note && (
            <div className="mt-2 text-xs text-yellow-500/80 italic">
              💡 {entry.note}
            </div>
          )}
        </div>
        {entry.expandedPayload && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex-shrink-0 rounded bg-gray-700 px-2 py-1 text-xs hover:bg-gray-600"
          >
            {expanded ? "Hide decoded" : "Show decoded"}
          </button>
        )}
      </div>
      {expanded && entry.expandedPayload && (
        <div className="mt-3 border-t border-gray-700 pt-3">
          <div className="mb-1 text-xs text-gray-400">
            {entry.expandedPayload.label}
          </div>
          <pre className="overflow-x-auto rounded bg-black/40 p-3 font-mono text-xs whitespace-pre-wrap text-green-300">
            {entry.expandedPayload.content}
          </pre>
        </div>
      )}
    </div>
  );
}

function ActorDiagram({ actors }) {
  const items = [
    { key: "browser", label: "Browser", color: "bg-blue-500" },
    { key: "caddy", label: "Caddy", color: "bg-orange-500" },
    { key: "logto", label: "Logto", color: "bg-purple-500" },
    { key: "entra", label: "Entra", color: "bg-cyan-500" },
    { key: "ots", label: "OTS", color: "bg-emerald-500" },
  ];

  return (
    <div className="mb-4 flex flex-wrap items-center gap-1">
      {items.map((item, i) => (
        <Fragment key={item.key}>
          <div
            className={`rounded px-3 py-1 text-xs font-medium transition-all ${
              actors[item.key]
                ? item.color + " text-white"
                : "bg-gray-700 text-gray-500"
            }`}
          >
            {item.label}
          </div>
          {i < items.length - 1 && <div className="text-gray-600">→</div>}
        </Fragment>
      ))}
    </div>
  );
}

export default function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);
  const step = STEPS[currentStep];

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setTimeout(() => {
      if (currentStep < STEPS.length - 1) {
        setCurrentStep((s) => s + 1);
      } else {
        setAutoPlay(false);
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [autoPlay, currentStep]);

  return (
    <div className="min-h-screen bg-gray-900 p-4 text-gray-100">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="mb-2 text-2xl font-bold">SSO Authentication Flow</h1>
          <p className="text-gray-400">OIDC + SAML: From click to dashboard</p>
        </div>

        {/* Progress bar */}
        <div className="flex items-center gap-1">
          {STEPS.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setCurrentStep(i)}
              className={`h-2 flex-1 rounded transition-all ${
                i === currentStep
                  ? "bg-blue-500"
                  : i < currentStep
                    ? "bg-emerald-500"
                    : "bg-gray-700"
              }`}
            />
          ))}
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
              disabled={currentStep === 0}
              className="rounded bg-gray-700 px-4 py-2 hover:bg-gray-600 disabled:opacity-50"
            >
              ← Previous
            </button>
            <button
              onClick={() =>
                setCurrentStep((s) => Math.min(STEPS.length - 1, s + 1))
              }
              disabled={currentStep === STEPS.length - 1}
              className="rounded bg-gray-700 px-4 py-2 hover:bg-gray-600 disabled:opacity-50"
            >
              Next →
            </button>
            <button
              onClick={() => setAutoPlay(!autoPlay)}
              className={`rounded px-4 py-2 ${autoPlay ? "bg-red-600 hover:bg-red-700" : "bg-emerald-600 hover:bg-emerald-700"}`}
            >
              {autoPlay ? "⏹ Stop" : "▶ Auto-play"}
            </button>
          </div>
          <div className="text-gray-400">
            Step {currentStep + 1} of {STEPS.length}
          </div>
        </div>

        {/* Step description */}
        <div className="rounded-lg bg-gray-800 p-4">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-lg font-bold">
              {step.id}
            </div>
            <div>
              <h3 className="text-lg font-semibold">{step.title}</h3>
              <p className="mt-1 text-gray-400">{step.description}</p>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="grid grid-cols-2 gap-6">
          {/* Left: User view */}
          <div className="space-y-4">
            <h2 className="flex items-center gap-2 text-lg font-semibold">
              <span className="h-3 w-3 rounded-full bg-blue-500" />
              What the user sees
            </h2>
            {/* Browser mockup */}
            <div
              className="flex flex-col overflow-hidden rounded-lg border border-gray-700 shadow-2xl"
              style={{ height: "calc(40rem + 2.5rem)" }}
            >
              <div className="flex flex-shrink-0 items-center gap-2 bg-gradient-to-b from-gray-300 to-gray-400 px-3 py-2">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-500" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500" />
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                </div>
                <div className="mx-4 flex-1">
                  <div className="truncate rounded bg-white px-3 py-1 font-mono text-sm text-gray-700">
                    {step.urlBar}
                  </div>
                </div>
              </div>
              <div className="flex-1 overflow-hidden">
                <BrowserScreen type={step.userSees} />
              </div>
            </div>
          </div>

          {/* Right: Technical view */}
          <div className="space-y-4">
            <h2 className="flex items-center gap-2 text-lg font-semibold">
              <span className="h-3 w-3 rounded-full bg-emerald-500" />
              What's happening (HTTP)
            </h2>
            <div
              className="flex flex-col rounded-lg bg-gray-800 p-4"
              style={{ height: "calc(40rem + 2.5rem)" }}
            >
              <ActorDiagram actors={step.actors} />
              <div className="mb-4 flex-1 space-y-3 overflow-y-auto">
                {step.http.map((entry, i) => (
                  <HttpEntry key={i} entry={entry} />
                ))}
              </div>
              {/* Legend */}
              <div className="mt-auto border-t border-gray-700 pt-4">
                <h3 className="mb-2 text-sm font-semibold">Legend</h3>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 border-l-4 border-blue-500 bg-blue-950/40" />
                    <span className="text-gray-300">Browser request</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 border-l-4 border-emerald-500 bg-emerald-950/40" />
                    <span className="text-gray-300">Server response</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 border-l-4 border-purple-500 bg-purple-950/40" />
                    <span className="text-gray-300">Server-to-server</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 border-l-4 border-gray-500 bg-gray-800" />
                    <span className="text-gray-300">Internal process</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Architecture visual */}
        <div className="rounded-lg bg-gray-800 p-6">
          <div className="flex items-center justify-center gap-4">
            <div
              className={`flex flex-col items-center rounded-lg p-4 transition-all ${step.actors.ots ? "bg-emerald-600 ring-2 ring-emerald-400" : "bg-gray-700"}`}
            >
              <div className="mb-2 text-2xl">🔐</div>
              <div className="font-semibold">OTS</div>
              <div className="text-xs text-gray-300">Application</div>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div
                className={`h-0.5 w-12 ${step.actors.ots || step.actors.caddy ? "bg-emerald-500" : "bg-gray-600"}`}
              />
              <div className="text-xs text-gray-500">Caddy</div>
            </div>
            <div
              className={`flex flex-col items-center rounded-lg p-4 transition-all ${step.actors.logto ? "bg-purple-600 ring-2 ring-purple-400" : "bg-gray-700"}`}
            >
              <div className="mb-2 text-2xl">🔑</div>
              <div className="font-semibold">Logto</div>
              <div className="text-xs text-gray-300">OIDC + SAML SP</div>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div
                className={`h-0.5 w-12 ${step.actors.logto && step.actors.entra ? "bg-purple-500" : step.actors.entra ? "bg-cyan-500" : "bg-gray-600"}`}
              />
              <div className="text-xs text-gray-500">SAML</div>
            </div>
            <div
              className={`flex flex-col items-center rounded-lg p-4 transition-all ${step.actors.entra ? "bg-cyan-600 ring-2 ring-cyan-400" : "bg-gray-700"}`}
            >
              <div className="mb-2 text-2xl">🏢</div>
              <div className="font-semibold">Entra</div>
              <div className="text-xs text-gray-300">Identity Provider</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
