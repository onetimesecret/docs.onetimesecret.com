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
import { STEPS } from "./oidc-saml-bridge-steps.ts";
import { BrowserScreen } from "./BrowserScreen.jsx";
import { HttpEntry } from "./HttpEntry.jsx";
import { ActorDiagram } from "./ActorDiagram.jsx";

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
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="mb-2 text-3xl font-bold tracking-tight">
            OIDC→SAML Bridge via Forward Auth
          </h1>
          <p className="text-base text-gray-400">
            Caddy + Logto + Entra ID: SP-initiated flow with protocol bridging
          </p>
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
              className="rounded bg-gray-700 px-4 py-2 text-sm font-medium hover:bg-gray-600 disabled:opacity-50"
            >
              ← Previous
            </button>
            <button
              onClick={() =>
                setCurrentStep((s) => Math.min(STEPS.length - 1, s + 1))
              }
              disabled={currentStep === STEPS.length - 1}
              className="rounded bg-gray-700 px-4 py-2 text-sm font-medium hover:bg-gray-600 disabled:opacity-50"
            >
              Next →
            </button>
            <button
              onClick={() => setAutoPlay(!autoPlay)}
              className={`rounded px-4 py-2 text-sm font-medium ${autoPlay ? "bg-red-600 hover:bg-red-700" : "bg-emerald-600 hover:bg-emerald-700"}`}
            >
              {autoPlay ? "⏹ Stop" : "▶ Auto-play"}
            </button>
          </div>
          <div className="text-sm text-gray-400">
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
              <p className="mt-1 text-sm leading-relaxed text-gray-400">
                {step.description}
              </p>
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
