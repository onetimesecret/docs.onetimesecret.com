// src/components/artifacts/2026/sso-demos/shared/screens/ots/Blank.tsx

import React from "react";

/**
 * Blank/redirect screen - shown when user first hits protected resource
 * and is about to be redirected to authentication.
 */
export function Blank() {
  return (
    <div className="flex h-full items-center justify-center bg-slate-900 text-slate-500">
      <div className="animate-pulse motion-reduce:animate-none" role="status" aria-live="polite">Redirecting to login...</div>
    </div>
  );
}
