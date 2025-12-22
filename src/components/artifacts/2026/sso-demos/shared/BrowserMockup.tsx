// src/components/artifacts/2026/sso-demos/shared/BrowserMockup.tsx

import React, { type ReactNode } from "react";

interface BrowserMockupProps {
  /** URL to display in the address bar */
  urlBar: string;
  /** Screen content to render inside the browser */
  children: ReactNode;
}

/**
 * Browser chrome wrapper component.
 * Provides the macOS-style browser window frame with traffic lights and URL bar.
 */
export function BrowserMockup({ urlBar, children }: BrowserMockupProps) {
  return (
    <div className="flex flex-1 flex-col overflow-hidden rounded-lg border border-gray-700 shadow-2xl">
      {/* Browser chrome */}
      <div className="flex flex-shrink-0 items-center gap-2 bg-gradient-to-b from-gray-300 to-gray-400 px-3 py-2">
        {/* Traffic lights */}
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-red-500" />
          <div className="h-3 w-3 rounded-full bg-yellow-500" />
          <div className="h-3 w-3 rounded-full bg-green-500" />
        </div>
        {/* URL bar */}
        <div className="mx-4 flex-1">
          <div className="truncate rounded bg-white px-3 py-1 font-mono text-xs text-gray-700">
            {urlBar}
          </div>
        </div>
      </div>
      {/* Screen content */}
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  );
}
