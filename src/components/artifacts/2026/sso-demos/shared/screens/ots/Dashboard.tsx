// src/components/artifacts/2026/sso-demos/shared/screens/ots/Dashboard.tsx

import { useState } from "react";

interface Secret {
  id: string;
  preview: string;
  created: string;
}

/**
 * OTS Dashboard screen - the authenticated state of the application.
 * This is the "constant" across all SSO demos - the SaaS app being protected.
 * Includes interactive elements to show the app is functional post-authentication.
 */
export function Dashboard() {
  const [secretText, setSecretText] = useState("");
  const [recentSecrets, setRecentSecrets] = useState<Secret[]>([]);

  const handleCreateSecret = () => {
    const fakeId = Math.random().toString(36).substring(2, 10);
    setRecentSecrets((prev) => [
      {
        id: fakeId,
        preview:
          secretText.length > 24
            ? secretText.substring(0, 24) + "..."
            : secretText,
        created: "Just now",
      },
      ...prev.slice(0, 2).map((s) => ({ ...s, created: "Earlier" })),
    ]);
    setSecretText("");
  };

  const isDisabled = !secretText.trim();

  return (
    <div className="h-full bg-slate-900">
      <nav className="flex items-center justify-between bg-slate-800 px-4 py-3 text-white">
        <div className="flex items-center gap-4">
          <span className="text-lg font-bold">🔐 OTS</span>
          <span className="text-sm text-slate-400">Dashboard</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-300">alice@contoso.com</span>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 font-medium">
            A
          </div>
        </div>
      </nav>
      <div className="p-6">
        <div className="mb-4 rounded-lg border border-slate-700 bg-slate-800 p-6">
          <h2 id="create-secret-heading" className="mb-4 text-lg font-semibold text-slate-100">
            Create a Secret
          </h2>
          <label htmlFor="secret-text" className="sr-only">Secret content</label>
          <textarea
            id="secret-text"
            aria-describedby="create-secret-heading"
            className="h-20 w-full resize-none rounded-lg border border-slate-600 bg-slate-700 p-3 text-slate-100 placeholder-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            placeholder="Enter your secret..."
            value={secretText}
            onChange={(e) => setSecretText(e.target.value)}
          />
          <button
            onClick={handleCreateSecret}
            disabled={isDisabled}
            className="mt-3 rounded-lg bg-emerald-600 px-4 py-2 text-white transition-colors hover:bg-emerald-500 active:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-600 disabled:text-slate-400"
          >
            Create Secret Link
          </button>
        </div>
        <div className="rounded-lg border border-slate-700 bg-slate-800 p-6">
          <h2 className="mb-4 text-lg font-semibold text-slate-100">
            Recent Secrets
          </h2>
          {recentSecrets.length > 0 ? (
            <div className="space-y-2">
              {recentSecrets.map((secret) => (
                <div
                  key={secret.id}
                  className="flex items-center justify-between rounded-lg border border-slate-600 bg-slate-700/50 p-3 text-sm"
                >
                  <div className="flex items-center gap-3">
                    <span className="rounded bg-slate-600 px-2 py-0.5 font-mono text-xs text-slate-300">
                      {secret.id}
                    </span>
                    <span className="text-slate-300">{secret.preview}</span>
                  </div>
                  <span className="text-xs text-slate-500">
                    {secret.created}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-sm text-slate-500">No secrets created yet</div>
          )}
        </div>
      </div>
    </div>
  );
}
