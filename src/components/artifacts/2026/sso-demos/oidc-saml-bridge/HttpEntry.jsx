import React, { useState } from "react";

export function HttpEntry({ entry }) {
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
