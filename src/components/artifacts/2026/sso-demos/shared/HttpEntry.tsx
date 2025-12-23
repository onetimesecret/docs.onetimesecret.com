// src/components/artifacts/2026/sso-demos/shared/HttpEntry.tsx

import React, { useState } from "react";
import type { HttpMessage } from "./types.ts";

/**
 * Styling for each HTTP message type.
 * Colors are defined in sso-demo-theme.css using @theme block.
 * To customize, modify the --color-http-* values in that file.
 */
const TYPE_STYLES: Record<HttpMessage["type"], string> = {
  request: "border-l-4 border-http-request bg-http-request-dim",
  response: "border-l-4 border-http-response bg-http-response-dim",
  internal: "border-l-4 border-http-internal bg-gray-800",
  server: "border-l-4 border-http-server bg-http-server-dim",
  "server-response": "border-l-4 border-http-server bg-http-server-dim",
};

/** Labels for each HTTP message type */
const TYPE_LABELS: Record<HttpMessage["type"], string> = {
  request: "REQUEST",
  response: "RESPONSE",
  internal: "INTERNAL",
  server: "SERVER→SERVER",
  "server-response": "SERVER RESPONSE",
};

/** Directional icons for each HTTP message type */
const TYPE_ICONS: Record<HttpMessage["type"], JSX.Element> = {
  request: (
    <svg className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  ),
  response: (
    <svg className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
    </svg>
  ),
  internal: (
    <svg className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  server: (
    <svg className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
    </svg>
  ),
  "server-response": (
    <svg className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 17l-4 4m0 0l-4-4m4 4V3" />
    </svg>
  ),
};

interface HttpEntryProps {
  /** The HTTP message to display */
  entry: HttpMessage;
}

/**
 * Renders a single HTTP message in the authentication flow.
 * Supports requests, responses, internal processes, and server-to-server communication.
 * Includes expandable payload sections for decoded SAML/JWT content.
 */
export function HttpEntry({ entry }: HttpEntryProps) {
  const [expanded, setExpanded] = useState(false);
  const uniqueId = React.useId();

  return (
    <div className={`${TYPE_STYLES[entry.type]} rounded p-3 text-sm`}>
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center gap-2 text-xs text-gray-400">
            {TYPE_ICONS[entry.type]}
            <span className="font-mono font-semibold">{TYPE_LABELS[entry.type]}</span>
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
            aria-expanded={expanded}
            aria-controls={`payload-${uniqueId}`}
            className="flex-shrink-0 rounded bg-gray-700 px-2 py-1 text-xs hover:bg-gray-600"
          >
            {expanded ? "Hide decoded" : "Show decoded"}
          </button>
        )}
      </div>
      {expanded && entry.expandedPayload && (
        <div id={`payload-${uniqueId}`} className="mt-3 border-t border-gray-700 pt-3">
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
