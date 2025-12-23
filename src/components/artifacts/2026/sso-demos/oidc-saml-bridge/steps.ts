// src/components/artifacts/2026/sso-demos/oidc-saml-bridge/steps.ts

import type { Step } from "../shared";

const STEPS: Step[] = [
  {
    id: 1,
    title: "User requests protected resource",
    userSees: "blank",
    urlBar: "https://secrets.example.com/dashboard",
    description:
      "User navigates to the dashboard. Caddy intercepts and checks auth.",
    securityNote:
      "Confidential clients (like this Caddy setup) must validate the `state` parameter on callback to prevent CSRF attacks. Public clients (like SPAs with React/Vue) should additionally implement PKCE.",
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
        to: "OAuth2Proxy",
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
    securityNote:
      "Session cookies must use HttpOnly and Secure flags. SameSite policy should be configured based on whether components share the same domain.",
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
    securityNote:
      "SAML AuthnRequest signing is recommended for high-security environments to prevent tampering. Always validate the decoded structure. The RelayState parameter preserves application state across the SAML roundtrip.",
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
    securityNote:
      "The SAML assertion contains the signed proof of identity from Entra. Production must validate signature, timestamps, InResponseTo field, and prevent replay attacks.",
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
      caddy: true,
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
    securityNote:
      "This is the Authorization Code Flow with Client Secret. The browser never sees this request since the token exchange happens server-to-server (between Caddy and Logto).",
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
        from: "Caddy (OAuth2Proxy)",
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
        to: "Caddy (OAuth2Proxy)",
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
    securityNote:
      "After authentication, your app only receives identity headers from the reverse proxy and never validates tokens directly. Restrict OTS to only accept traffic from Caddy. OTS must set appropriate security headers (Content-Security-Policy, CORS) for browser protection—reverse proxy authentication doesn't replace application-level security headers.",
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
        to: "OAuth2Proxy",
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
    urlBar: "https://secrets.example.com/dashboard",
    description:
      "All future requests follow the same pattern: session cookie → forward_auth → identity headers → OTS.",
    securityNote:
      "Session timeouts must be configured consistently across browser cookies, OAuth2 proxy sessions, and application sessions to prevent security gaps.",
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
        to: "OAuth2Proxy",
        label: "forward_auth (fast path)",
        note: "Session valid → 200 + headers (no redirects)",
      },
      {
        type: "server",
        from: "Caddy",
        to: "OTS",
        method: "GET",
        url: "/dashboard",
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

export { STEPS };
