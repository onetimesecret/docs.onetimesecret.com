// src/components/artifacts/2026/sso-demos/oidc-saml-bridge/demo.jsx

/**
 * OIDC→SAML Bridge via Forward Auth
 * Caddy + Logto + Entra ID
 *
 * SP-initiated flow with external auth gateway and protocol bridging.
 *
 * This demo shows OIDC-to-SAML protocol translation for enterprise SSO.
 * The application (OTS) uses OIDC, while the enterprise IdP (Entra) uses SAML.
 * Logto bridges the protocols, and Caddy enforces authentication at the gateway.
 *
 * Technology Stack: Caddy (reverse proxy with forward_auth), Logto
 * (OIDC provider + SAML SP), Entra ID (SAML IdP).
 * Some implementation details are specific to these technologies, though the
 * overall pattern applies to similar stacks.
 */

import React, { useState, useEffect } from "react";
import { STEPS } from "./steps.ts";
import { BrowserScreen } from "./BrowserScreen.jsx";
import { HttpEntry } from "./HttpEntry.jsx";
import { ActorDiagram } from "./ActorDiagram.jsx";

const DEMO_VERSION = "0.2.0";

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
    <div className="min-h-screen bg-gray-900 p-4 font-sans text-gray-100">
      <div className="mx-auto max-w-6xl space-y-5">
        {/* Header */}
        <div className="text-center">
          <h1 className="mb-2 text-3xl font-bold tracking-tight text-amber-200">
            OIDC→SAML Bridge via Forward Auth
          </h1>
          <p className="text-base text-gray-400">
            <span className="font-medium text-gray-300">
              Caddy + OAuth2Proxy + Logto + Entra ID
            </span>
            <span className="mx-2 text-gray-600">·</span>A service
            Provider-initiated flow with protocol bridging
          </p>
        </div>

        {/* Controls and Progress */}
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg bg-gray-800/50 p-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
              disabled={currentStep === 0}
              className="rounded-md border border-gray-600 bg-transparent px-4 py-2 text-sm font-medium text-gray-300 transition-colors hover:border-gray-500 hover:bg-gray-700 hover:text-gray-100 disabled:cursor-not-allowed disabled:border-gray-700 disabled:text-gray-600"
            >
              ← Previous
            </button>
            <button
              onClick={() =>
                setCurrentStep((s) => Math.min(STEPS.length - 1, s + 1))
              }
              disabled={currentStep === STEPS.length - 1}
              className="rounded-md bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-md shadow-blue-500/20 transition-colors hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-gray-700 disabled:text-gray-500 disabled:shadow-none"
            >
              Next →
            </button>
            <button
              onClick={() => setAutoPlay(!autoPlay)}
              className={`rounded-md border px-3 py-2 text-xs font-medium transition-colors ${
                autoPlay
                  ? "border-red-500/50 bg-red-900/30 text-red-400 hover:bg-red-900/50"
                  : "border-gray-600 bg-transparent text-gray-400 hover:border-gray-500 hover:text-gray-300"
              }`}
            >
              {autoPlay ? "⏹ Stop" : "▶ Auto"}
            </button>
          </div>
          {/* Step counter with progress */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              {STEPS.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => setCurrentStep(i)}
                  title={`Step ${i + 1}: ${s.title}`}
                  className={`h-2 w-4 rounded-full transition-all hover:opacity-80 ${
                    i === currentStep
                      ? "w-6 bg-blue-500"
                      : i < currentStep
                        ? "bg-emerald-500"
                        : "bg-gray-600"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-medium text-gray-300">
              Step {currentStep + 1} of {STEPS.length}
            </span>
          </div>
        </div>

        {/* Step description */}
        <div className="rounded-lg border border-gray-700/50 bg-gray-800 p-4">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-lg font-bold shadow-lg shadow-blue-500/20">
              {step.id}
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-100">
                {step.title}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-gray-400">
                {step.description}
              </p>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="grid min-h-[36rem] grid-cols-2 gap-5">
          {/* Left: User view */}
          <div className="flex flex-col gap-3">
            <h2 className="flex items-center gap-2.5 text-base font-semibold">
              <svg
                className="h-5 w-5 text-blue-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              What the user sees
            </h2>
            {/* Browser mockup */}
            <div className="flex flex-1 flex-col overflow-hidden rounded-lg border border-gray-700 shadow-2xl">
              <div className="flex flex-shrink-0 items-center gap-2 bg-gradient-to-b from-gray-300 to-gray-400 px-3 py-2">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-500" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500" />
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                </div>
                <div className="mx-4 flex-1">
                  <div className="truncate rounded bg-white px-3 py-1 font-mono text-xs text-gray-700">
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
          <div className="flex flex-col gap-3">
            <h2 className="flex items-center gap-2.5 text-base font-semibold">
              <svg
                className="h-5 w-5 text-emerald-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              What's happening (HTTP)
            </h2>
            <div className="flex flex-1 flex-col rounded-lg border border-gray-700/50 bg-gray-800 p-4">
              <ActorDiagram actors={step.actors} />
              <div className="mb-4 flex-1 space-y-3 overflow-y-auto">
                {step.http.map((entry, i) => (
                  <HttpEntry key={i} entry={entry} />
                ))}
              </div>
              {/* Legend */}
              <div className="mt-auto border-t border-gray-700 pt-4">
                <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Legend
                </h3>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-sm border-l-4 border-blue-500 bg-blue-950/50" />
                    <span className="text-gray-400">Browser request</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-sm border-l-4 border-emerald-500 bg-emerald-950/50" />
                    <span className="text-gray-400">Server response</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-sm border-l-4 border-purple-500 bg-purple-950/50" />
                    <span className="text-gray-400">Server-to-server</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-sm border-l-4 border-gray-500 bg-gray-700/50" />
                    <span className="text-gray-400">Internal process</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Architecture visual */}
        <div className="rounded-lg border border-gray-700/50 bg-gray-800 p-5">
          <h3 className="mb-4 text-center text-xs font-semibold uppercase tracking-wider text-gray-500">
            Protocol Stack
          </h3>
          <div className="flex items-center justify-center gap-4">
            {/* OTS Application */}
            <div
              className={`flex min-w-[90px] flex-col items-center rounded-xl p-4 transition-all duration-300 ${
                step.actors.ots
                  ? "bg-gradient-to-br from-emerald-600 to-emerald-700 shadow-lg shadow-emerald-500/30 ring-2 ring-emerald-400/50"
                  : "bg-gray-700/80"
              }`}
            >
              <div className="mb-1.5 text-2xl">🔐</div>
              <div className="text-sm font-bold">OTS</div>
              <div className="text-[10px] text-gray-200/80">Application</div>
            </div>

            {/* Connector: OTS → Caddy */}
            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center">
                <div
                  className={`h-0.5 w-8 transition-all duration-300 ${
                    step.actors.ots || step.actors.caddy
                      ? "bg-emerald-500"
                      : "bg-gray-600"
                  }`}
                />
                <div
                  className={`h-0 w-0 border-y-4 border-l-[6px] border-y-transparent transition-colors duration-300 ${
                    step.actors.ots || step.actors.caddy
                      ? "border-l-emerald-500"
                      : "border-l-gray-600"
                  }`}
                />
              </div>
              <div className="text-[10px] text-gray-500">HTTP</div>
            </div>

            {/* Caddy + OAuth2Proxy */}
            <div
              className={`flex min-w-[90px] flex-col items-center rounded-xl p-4 transition-all duration-300 ${
                step.actors.caddy
                  ? "bg-gradient-to-br from-amber-600 to-amber-700 shadow-lg shadow-amber-500/30 ring-2 ring-amber-400/50"
                  : "bg-gray-700/80"
              }`}
            >
              <div className="mb-1.5 text-2xl">🛡️</div>
              <div className="text-sm font-bold">Caddy</div>
              <div className="text-[10px] text-gray-200/80">+ OAuth2Proxy</div>
            </div>

            {/* Connector: Caddy → Logto */}
            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center">
                <div
                  className={`h-0.5 w-8 transition-all duration-300 ${
                    step.actors.caddy || step.actors.logto
                      ? "bg-gradient-to-r from-amber-500 to-purple-500"
                      : "bg-gray-600"
                  }`}
                />
                <div
                  className={`h-0 w-0 border-y-4 border-l-[6px] border-y-transparent transition-colors duration-300 ${
                    step.actors.caddy || step.actors.logto
                      ? "border-l-purple-500"
                      : "border-l-gray-600"
                  }`}
                />
              </div>
              <div className="text-[10px] text-gray-500">OIDC</div>
            </div>

            {/* Logto */}
            <div
              className={`flex min-w-[90px] flex-col items-center rounded-xl p-4 transition-all duration-300 ${
                step.actors.logto
                  ? "bg-gradient-to-br from-purple-600 to-purple-700 shadow-lg shadow-purple-500/30 ring-2 ring-purple-400/50"
                  : "bg-gray-700/80"
              }`}
            >
              <div className="mb-1.5 text-2xl">🔑</div>
              <div className="text-sm font-bold">Logto</div>
              <div className="text-[10px] text-gray-200/80">OIDC + SAML SP</div>
            </div>

            {/* Connector: Logto → Entra */}
            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center">
                <div
                  className={`h-0.5 w-8 transition-all duration-300 ${
                    step.actors.logto && step.actors.entra
                      ? "bg-gradient-to-r from-purple-500 to-cyan-500"
                      : step.actors.entra
                        ? "bg-cyan-500"
                        : "bg-gray-600"
                  }`}
                />
                <div
                  className={`h-0 w-0 border-y-4 border-l-[6px] border-y-transparent transition-colors duration-300 ${
                    step.actors.entra
                      ? "border-l-cyan-500"
                      : "border-l-gray-600"
                  }`}
                />
              </div>
              <div className="text-[10px] text-gray-500">SAML</div>
            </div>

            {/* Entra */}
            <div
              className={`flex min-w-[90px] flex-col items-center rounded-xl p-4 transition-all duration-300 ${
                step.actors.entra
                  ? "bg-gradient-to-br from-cyan-600 to-cyan-700 shadow-lg shadow-cyan-500/30 ring-2 ring-cyan-400/50"
                  : "bg-gray-700/80"
              }`}
            >
              <div className="mb-1.5 text-2xl">🏢</div>
              <div className="text-sm font-bold">Entra</div>
              <div className="text-[10px] text-gray-200/80">
                Identity Provider
              </div>
            </div>
          </div>
        </div>

        {/* Footer with version */}
        <div className="flex items-center justify-between pt-4 text-xs text-gray-600">
          <a
            href="/artifacts/2026/sso-demos/"
            className="flex items-center gap-1 transition-colors hover:text-gray-400"
          >
            ← All demos
          </a>
          <div className="flex items-center gap-2">
            <span>OIDC→SAML Bridge Demo</span>
            <span className="rounded bg-gray-800 px-1.5 py-0.5 font-mono text-gray-500">
              v{DEMO_VERSION}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
