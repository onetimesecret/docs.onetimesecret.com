// src/components/artifacts/2026/sso-demos/sso-flow-demo.jsx

import React, { useState, useEffect, Fragment } from "react";

import { STEPS } from "./sso-flow-demo-steps.ts";

function BrowserScreen({ type }) {
  const screens = {
    blank: (
      <div className="flex h-full items-center justify-center bg-white text-gray-400">
        <div className="animate-pulse">Loading...</div>
      </div>
    ),
    loading: (
      <div className="flex h-full items-center justify-center bg-white text-gray-400">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
          <span>Redirecting...</span>
        </div>
      </div>
    ),
    "logto-signin": (
      <div className="flex h-full items-center justify-center bg-gray-50 p-4">
        <div className="w-full max-w-sm rounded-lg bg-white p-8 shadow-lg">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-600 font-bold text-white">
              L
            </div>
            <h2 className="text-xl font-semibold text-gray-800">
              Sign in to OTS
            </h2>
          </div>
          <div className="space-y-3">
            <button className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 px-4 py-3 text-gray-700 hover:bg-gray-50">
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
            <button className="flex w-full items-center justify-center gap-3 rounded-lg bg-blue-600 px-4 py-3 font-medium text-white ring-2 ring-blue-600 ring-offset-2 hover:bg-blue-700">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
              </svg>
              → Sign in with Company SSO
            </button>
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">or</span>
              </div>
            </div>
            <input
              type="email"
              placeholder="Email"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-800"
              readOnly
            />
            <button className="w-full rounded-lg bg-gray-800 py-2 text-white">
              Continue
            </button>
          </div>
        </div>
      </div>
    ),
    "entra-login": (
      <div className="flex h-full bg-white">
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
                  fill="#333"
                  fontSize="15"
                  fontFamily="Segoe UI, sans-serif"
                >
                  Microsoft
                </text>
              </svg>
            </div>
            <h1 className="mb-2 text-2xl text-gray-800">Sign in</h1>
            <input
              type="email"
              value="alice@contoso.com"
              readOnly
              className="mb-4 w-full border-0 border-b-2 border-blue-500 bg-transparent px-0 py-2 text-gray-800 focus:outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              readOnly
              className="mb-6 w-full border-0 border-b border-gray-300 bg-transparent px-0 py-2 text-gray-800 focus:outline-none"
            />
            <button className="w-full bg-blue-600 py-2 font-medium text-white">
              Sign in
            </button>
            <div className="mt-4 text-sm text-gray-600">
              <span className="cursor-pointer text-blue-600">
                Can't access your account?
              </span>
            </div>
          </div>
        </div>
      </div>
    ),
    "entra-autosubmit": (
      <div className="flex h-full items-center justify-center bg-white">
        <div className="text-center text-gray-600">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
          <p>Signing you in...</p>
        </div>
      </div>
    ),
    dashboard: (
      <div className="h-full bg-gray-100">
        <nav className="flex items-center justify-between bg-slate-800 px-4 py-3 text-white">
          <div className="flex items-center gap-4">
            <span className="text-lg font-bold">🔐 OTS</span>
            <span className="text-sm text-slate-300">Dashboard</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm">alice@contoso.com</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 font-medium">
              A
            </div>
          </div>
        </nav>
        <div className="p-6">
          <div className="mb-4 rounded-lg bg-white p-6 shadow">
            <h2 className="mb-4 text-lg font-semibold text-gray-800">
              Create a Secret
            </h2>
            <textarea
              className="h-20 w-full resize-none rounded-lg border p-3 text-gray-800"
              placeholder="Enter your secret..."
              readOnly
            />
            <button className="mt-3 rounded-lg bg-emerald-600 px-4 py-2 text-white">
              Create Secret Link
            </button>
          </div>
          <div className="rounded-lg bg-white p-6 shadow">
            <h2 className="mb-4 text-lg font-semibold text-gray-800">
              Recent Secrets
            </h2>
            <div className="text-sm text-gray-500">No secrets created yet</div>
          </div>
        </div>
      </div>
    ),
  };
  return screens[type] || screens.blank;
}

function HttpEntry({ entry }) {
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

function ActorDiagram({ actors }) {
  const items = [
    { key: "browser", label: "Browser", color: "bg-blue-500" },
    { key: "caddy", label: "Caddy", color: "bg-orange-500" },
    { key: "logto", label: "Logto", color: "bg-purple-500" },
    { key: "entra", label: "Entra", color: "bg-cyan-500" },
    { key: "ots", label: "OTS", color: "bg-emerald-500" },
  ];

  return (
    <div className="mb-4 flex flex-wrap items-center gap-1">
      {items.map((item, i) => (
        <Fragment key={item.key}>
          <div
            className={`rounded px-3 py-1 text-xs font-medium transition-all ${
              actors[item.key]
                ? item.color + " text-white"
                : "bg-gray-700 text-gray-500"
            }`}
          >
            {item.label}
          </div>
          {i < items.length - 1 && <div className="text-gray-600">→</div>}
        </Fragment>
      ))}
    </div>
  );
}

export default function OIDCSAMLBridge() {
  const [currentStep, setCurrentStep] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);
  const step = STEPS[currentStep];

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setTimeout(() => {
      if (currentStep < STEPS.length - 1) {
        setCurrentStep((s) => s + 1);
      } else {
        setAutoPlay(false);
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [autoPlay, currentStep]);

  return (
    <div className="min-h-screen bg-gray-900 p-4 text-gray-100">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="mb-2 text-2xl font-bold">SSO Authentication Flow</h1>
          <p className="text-gray-400">OIDC + SAML: From click to dashboard</p>
        </div>

        {/* Progress bar */}
        <div className="flex items-center gap-1">
          {STEPS.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setCurrentStep(i)}
              className={`h-2 flex-1 rounded transition-all ${
                i === currentStep
                  ? "bg-blue-500"
                  : i < currentStep
                    ? "bg-emerald-500"
                    : "bg-gray-700"
              }`}
            />
          ))}
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
              disabled={currentStep === 0}
              className="rounded bg-gray-700 px-4 py-2 hover:bg-gray-600 disabled:opacity-50"
            >
              ← Previous
            </button>
            <button
              onClick={() =>
                setCurrentStep((s) => Math.min(STEPS.length - 1, s + 1))
              }
              disabled={currentStep === STEPS.length - 1}
              className="rounded bg-gray-700 px-4 py-2 hover:bg-gray-600 disabled:opacity-50"
            >
              Next →
            </button>
            <button
              onClick={() => setAutoPlay(!autoPlay)}
              className={`rounded px-4 py-2 ${autoPlay ? "bg-red-600 hover:bg-red-700" : "bg-emerald-600 hover:bg-emerald-700"}`}
            >
              {autoPlay ? "⏹ Stop" : "▶ Auto-play"}
            </button>
          </div>
          <div className="text-gray-400">
            Step {currentStep + 1} of {STEPS.length}
          </div>
        </div>

        {/* Step description */}
        <div className="rounded-lg bg-gray-800 p-4">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-lg font-bold">
              {step.id}
            </div>
            <div>
              <h3 className="text-lg font-semibold">{step.title}</h3>
              <p className="mt-1 text-gray-400">{step.description}</p>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="grid grid-cols-2 gap-6">
          {/* Left: User view */}
          <div className="space-y-4">
            <h2 className="flex items-center gap-2 text-lg font-semibold">
              <span className="h-3 w-3 rounded-full bg-blue-500" />
              What the user sees
            </h2>
            {/* Browser mockup */}
            <div
              className="flex flex-col overflow-hidden rounded-lg border border-gray-700 shadow-2xl"
              style={{ height: "calc(40rem + 2.5rem)" }}
            >
              <div className="flex flex-shrink-0 items-center gap-2 bg-gradient-to-b from-gray-300 to-gray-400 px-3 py-2">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-500" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500" />
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                </div>
                <div className="mx-4 flex-1">
                  <div className="truncate rounded bg-white px-3 py-1 font-mono text-sm text-gray-700">
                    {step.urlBar}
                  </div>
                </div>
              </div>
              <div className="flex-1 overflow-hidden">
                <BrowserScreen type={step.userSees} />
              </div>
            </div>
          </div>

          {/* Right: Technical view */}
          <div className="space-y-4">
            <h2 className="flex items-center gap-2 text-lg font-semibold">
              <span className="h-3 w-3 rounded-full bg-emerald-500" />
              What's happening (HTTP)
            </h2>
            <div
              className="flex flex-col rounded-lg bg-gray-800 p-4"
              style={{ height: "calc(40rem + 2.5rem)" }}
            >
              <ActorDiagram actors={step.actors} />
              <div className="mb-4 flex-1 space-y-3 overflow-y-auto">
                {step.http.map((entry, i) => (
                  <HttpEntry key={i} entry={entry} />
                ))}
              </div>
              {/* Legend */}
              <div className="mt-auto border-t border-gray-700 pt-4">
                <h3 className="mb-2 text-sm font-semibold">Legend</h3>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 border-l-4 border-blue-500 bg-blue-950/40" />
                    <span className="text-gray-300">Browser request</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 border-l-4 border-emerald-500 bg-emerald-950/40" />
                    <span className="text-gray-300">Server response</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 border-l-4 border-purple-500 bg-purple-950/40" />
                    <span className="text-gray-300">Server-to-server</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 border-l-4 border-gray-500 bg-gray-800" />
                    <span className="text-gray-300">Internal process</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Architecture visual */}
        <div className="rounded-lg bg-gray-800 p-6">
          <div className="flex items-center justify-center gap-4">
            <div
              className={`flex flex-col items-center rounded-lg p-4 transition-all ${step.actors.ots ? "bg-emerald-600 ring-2 ring-emerald-400" : "bg-gray-700"}`}
            >
              <div className="mb-2 text-2xl">🔐</div>
              <div className="font-semibold">OTS</div>
              <div className="text-xs text-gray-300">Application</div>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div
                className={`h-0.5 w-12 ${step.actors.ots || step.actors.caddy ? "bg-emerald-500" : "bg-gray-600"}`}
              />
              <div className="text-xs text-gray-500">Caddy</div>
            </div>
            <div
              className={`flex flex-col items-center rounded-lg p-4 transition-all ${step.actors.logto ? "bg-purple-600 ring-2 ring-purple-400" : "bg-gray-700"}`}
            >
              <div className="mb-2 text-2xl">🔑</div>
              <div className="font-semibold">Logto</div>
              <div className="text-xs text-gray-300">OIDC + SAML SP</div>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div
                className={`h-0.5 w-12 ${step.actors.logto && step.actors.entra ? "bg-purple-500" : step.actors.entra ? "bg-cyan-500" : "bg-gray-600"}`}
              />
              <div className="text-xs text-gray-500">SAML</div>
            </div>
            <div
              className={`flex flex-col items-center rounded-lg p-4 transition-all ${step.actors.entra ? "bg-cyan-600 ring-2 ring-cyan-400" : "bg-gray-700"}`}
            >
              <div className="mb-2 text-2xl">🏢</div>
              <div className="font-semibold">Entra</div>
              <div className="text-xs text-gray-300">Identity Provider</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
