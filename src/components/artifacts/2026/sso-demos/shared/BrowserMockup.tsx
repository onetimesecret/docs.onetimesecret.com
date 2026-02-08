// src/components/artifacts/2026/sso-demos/shared/BrowserMockup.tsx

import { type ReactNode } from "react";

interface BrowserMockupProps {
  /** URL to display in the address bar */
  urlBar: string;
  /** Screen content to render inside the browser */
  children: ReactNode;
  /** Progress percentage (0-100) for loading indicator. Only shown when > 0. */
  loadingProgress?: number;
  /** Duration in ms for the progress animation */
  loadingDuration?: number;
}

/**
 * Browser chrome wrapper component.
 * Provides the macOS-style browser window frame with traffic lights and URL bar.
 */
export function BrowserMockup({
  urlBar,
  children,
  loadingProgress = 0,
  loadingDuration = 3500,
}: BrowserMockupProps) {
  const showProgress = loadingProgress > 0;

  return (
    <div className="flex flex-1 flex-col overflow-hidden rounded-lg border border-gray-700 shadow-2xl">
      {/* Browser chrome */}
      <div className="flex flex-shrink-0 items-center gap-2 bg-gradient-to-b from-gray-300 to-gray-400 px-3 py-2">
        {/* Traffic lights */}
        <div className="flex gap-1.5" aria-hidden="true">
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
      {/* Loading progress bar - like browser page load indicator */}
      <div
        className="h-1 w-full bg-gray-600"
        role="progressbar"
        aria-valuenow={loadingProgress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Step progress"
      >
        <div
          className="h-full bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-400 shadow-sm shadow-blue-500/50 motion-reduce:transition-none"
          style={{
            width: `${loadingProgress}%`,
            transition: showProgress ? `width ${loadingDuration}ms linear` : 'none',
          }}
        />
      </div>
      {/* Demo warning banner - clarifies this is not a real login */}
      <div
        className="flex items-center justify-center gap-1.5 bg-amber-900/40 px-3 py-1 text-xs text-amber-200"
        role="note"
        aria-label="This is a demo simulation. Do not enter real credentials."
      >
        <svg
          className="h-3.5 w-3.5 flex-shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>Demo simulation — do not enter real credentials</span>
      </div>
      {/* Screen content */}
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  );
}
