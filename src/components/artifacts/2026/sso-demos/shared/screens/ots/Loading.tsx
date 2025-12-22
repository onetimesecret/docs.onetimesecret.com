// src/components/artifacts/2026/sso-demos/shared/screens/ots/Loading.tsx

import React from "react";

/**
 * Loading/processing screen - shown during redirect flows
 * when the browser is following authentication redirects.
 */
export function Loading() {
  return (
    <div className="flex h-full items-center justify-center bg-slate-900 text-slate-400">
      <div className="flex flex-col items-center gap-2" role="status" aria-live="polite">
        <div className="h-8 w-8 animate-spin motion-reduce:animate-none rounded-full border-4 border-blue-500 border-t-transparent" />
        <span>Redirecting...</span>
      </div>
    </div>
  );
}
