import React, { useState } from "react";

function DashboardScreen() {
  const [secretText, setSecretText] = useState("");
  const [recentSecrets, setRecentSecrets] = useState([]);

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
          <h2 className="mb-4 text-lg font-semibold text-slate-100">
            Create a Secret
          </h2>
          <textarea
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

export function BrowserScreen({ type }) {
  const screens = {
    blank: (
      <div className="flex h-full items-center justify-center bg-slate-900 text-slate-500">
        <div className="animate-pulse">Redirecting to login...</div>
      </div>
    ),
    loading: (
      <div className="flex h-full items-center justify-center bg-slate-900 text-slate-400">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
          <span>Redirecting...</span>
        </div>
      </div>
    ),
    "logto-signin": (
      <div className="flex h-full items-center justify-center bg-slate-900 p-4">
        <div className="w-full max-w-sm rounded-lg border border-slate-700 bg-slate-800 p-8 shadow-lg">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-600 font-bold text-white">
              L
            </div>
            <h2 className="text-xl font-semibold text-slate-100">
              Sign in to OTS
            </h2>
          </div>
          <div className="space-y-3">
            <button className="flex w-full items-center justify-center gap-3 rounded-lg border border-slate-600 bg-slate-700 px-4 py-3 text-slate-200 hover:bg-slate-600">
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
            <button className="flex w-full items-center justify-center gap-3 rounded-lg bg-blue-600 px-4 py-3 font-medium text-white ring-2 ring-blue-500 ring-offset-2 ring-offset-slate-800 hover:bg-blue-500">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
              </svg>
              → Sign in with Company SSO
            </button>
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-600" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-slate-800 px-2 text-slate-500">or</span>
              </div>
            </div>
            <input
              type="email"
              placeholder="Email"
              className="box-border w-full appearance-none border border-slate-600 bg-slate-700 px-4 py-3 text-slate-200 placeholder-slate-400 outline-none"
              style={{ borderRadius: "0.5rem" }}
              readOnly
            />
            <button className="w-full rounded-lg bg-slate-600 py-2 text-slate-200 hover:bg-slate-500">
              Continue
            </button>
          </div>
        </div>
      </div>
    ),
    "entra-login": (
      <div className="flex h-full bg-slate-900">
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
                  fill="#94a3b8"
                  fontSize="15"
                  fontFamily="Segoe UI, sans-serif"
                >
                  Microsoft
                </text>
              </svg>
            </div>
            <h1 className="mb-2 text-2xl text-slate-100">Sign in</h1>
            <input
              type="email"
              value="alice@contoso.com"
              readOnly
              className="mb-4 w-full border-0 border-b-2 border-blue-500 bg-transparent px-0 py-2 text-slate-200 focus:outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              readOnly
              className="mb-6 w-full border-0 border-b border-slate-600 bg-transparent px-0 py-2 text-slate-200 placeholder-slate-500 focus:outline-none"
            />
            <button className="w-full bg-blue-600 py-2 font-medium text-white hover:bg-blue-500">
              Sign in
            </button>
            <div className="mt-4 text-sm text-slate-400">
              <span className="cursor-pointer text-blue-400 hover:text-blue-300">
                Can't access your account?
              </span>
            </div>
          </div>
        </div>
      </div>
    ),
    "entra-autosubmit": (
      <div className="flex h-full items-center justify-center bg-slate-900">
        <div className="text-center text-slate-400">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
          <p>Signing you in...</p>
        </div>
      </div>
    ),
    dashboard: <DashboardScreen />,
  };
  return screens[type] || screens.blank;
}
