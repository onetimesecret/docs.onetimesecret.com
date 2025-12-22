// src/components/artifacts/2026/sso-demos/shared/screens/idp/EntraAutoSubmit.tsx

import React from "react";

/**
 * Entra auto-submit screen - shown when the IdP is posting
 * the SAML response back to the SP via an auto-submitting form.
 */
export function EntraAutoSubmit() {
  return (
    <div className="flex h-full items-center justify-center bg-slate-900">
      <div className="text-center text-slate-400" role="status" aria-live="polite">
        <div className="mx-auto mb-4 h-8 w-8 animate-spin motion-reduce:animate-none rounded-full border-4 border-blue-500 border-t-transparent" />
        <p>Signing you in...</p>
      </div>
    </div>
  );
}
