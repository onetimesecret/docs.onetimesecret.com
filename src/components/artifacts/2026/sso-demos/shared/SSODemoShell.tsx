// src/components/artifacts/2026/sso-demos/shared/SSODemoShell.tsx

import React, { useState, useEffect, type ComponentType } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { BrowserMockup } from "./BrowserMockup.tsx";
import { HttpEntry } from "./HttpEntry.tsx";
import { ActorDiagram } from "./ActorDiagram.tsx";
import { ProtocolStack } from "./ProtocolStack.tsx";
import { TranscriptView } from "./TranscriptView.tsx";
import type { Step, DemoConfig } from "./types.ts";

/** Duration in ms for each step during autoplay */
const AUTOPLAY_INTERVAL = 3000;

interface SSODemoShellProps {
  /** Array of demo steps */
  steps: Step[];
  /** Map of screen keys to screen components */
  screens: Record<string, ComponentType>;
  /** Demo configuration */
  config: DemoConfig;
}

/**
 * Main shell component for SSO demos.
 * Handles navigation, keyboard controls, autoplay, and layout.
 * Demos provide their steps, screens, and configuration.
 */
export function SSODemoShell({ steps, screens, config }: SSODemoShellProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [viewMode, setViewMode] = useState<"interactive" | "transcript">("interactive");
  const step = steps[currentStep];

  // Keyboard navigation: ← → arrows and space for autoplay
  useHotkeys("left", () => setCurrentStep((s) => Math.max(0, s - 1)), []);
  useHotkeys(
    "right",
    () => setCurrentStep((s) => Math.min(steps.length - 1, s + 1)),
    []
  );
  useHotkeys(
    "space",
    (e) => {
      e.preventDefault();
      setAutoPlay((a) => !a);
    },
    []
  );

  // Toggle between interactive and transcript view
  useHotkeys(
    "t",
    (e) => {
      e.preventDefault();
      setViewMode((v) => (v === "interactive" ? "transcript" : "interactive"));
    },
    []
  );

  // Autoplay: advance to next step after interval
  useEffect(() => {
    if (!autoPlay) return;
    const timer = setTimeout(() => {
      if (currentStep < steps.length - 1) {
        setCurrentStep((s) => s + 1);
      } else {
        setAutoPlay(false);
      }
    }, AUTOPLAY_INTERVAL);
    return () => clearTimeout(timer);
  }, [autoPlay, currentStep, steps.length]);

  // Progress bar animation for autoplay
  useEffect(() => {
    if (!autoPlay) {
      setLoadingProgress(0);
      return;
    }
    // Reset to 0, then animate to 100 after brief delay for render
    setLoadingProgress(0);
    const timer = setTimeout(() => {
      setLoadingProgress(100);
    }, 50);
    return () => clearTimeout(timer);
  }, [autoPlay, currentStep]);

  // Get the screen component for the current step
  const ScreenComponent = screens[step.userSees];

  return (
    <div className="min-h-screen bg-gray-900 p-4 font-sans text-gray-100">
      {/* Skip link for keyboard users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-blue-600 focus:px-4 focus:py-2 focus:text-white focus:rounded"
      >
        Skip to demo content
      </a>

      <div className="mx-auto max-w-6xl space-y-5">
        {/* Header */}
        <div className="text-center">
          <h1 className="mb-2 text-3xl font-bold tracking-tight text-amber-200">
            {config.title}
          </h1>
          <p className="text-base text-gray-400">{config.subtitle}</p>
        </div>

        {/* Controls and Progress */}
        <nav aria-label="Demo navigation" className="flex flex-wrap items-center justify-between gap-4 rounded-lg bg-gray-800/50 p-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
              disabled={currentStep === 0}
              className="rounded-md border border-gray-600 bg-transparent px-4 py-2 text-sm font-medium text-gray-300 transition-colors motion-reduce:transition-none hover:border-gray-500 hover:bg-gray-700 hover:text-gray-100 disabled:cursor-not-allowed disabled:border-gray-700 disabled:text-gray-600"
            >
              ← Previous
            </button>
            <button
              onClick={() =>
                setCurrentStep((s) => Math.min(steps.length - 1, s + 1))
              }
              disabled={currentStep === steps.length - 1}
              className="rounded-md bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-md shadow-blue-500/20 transition-colors motion-reduce:transition-none hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-gray-700 disabled:text-gray-500 disabled:shadow-none"
            >
              Next →
            </button>
            <button
              onClick={() => setAutoPlay(!autoPlay)}
              aria-pressed={autoPlay}
              aria-label={autoPlay ? "Stop autoplay" : "Start autoplay"}
              className={`rounded-md border px-3 py-2 text-xs font-medium transition-colors motion-reduce:transition-none ${
                autoPlay
                  ? "border-red-500/50 bg-red-900/30 text-red-400 hover:bg-red-900/50"
                  : "border-gray-600 bg-transparent text-gray-400 hover:border-gray-500 hover:text-gray-300"
              }`}
            >
              {autoPlay ? "⏹ Stop" : "▶ Auto"}
            </button>
            <span className="mx-1 text-gray-600">|</span>
            <button
              onClick={() => setViewMode(viewMode === "interactive" ? "transcript" : "interactive")}
              aria-pressed={viewMode === "transcript"}
              aria-label={viewMode === "interactive" ? "Switch to transcript view" : "Switch to interactive view"}
              className={`rounded-md border px-3 py-2 text-xs font-medium transition-colors motion-reduce:transition-none ${
                viewMode === "transcript"
                  ? "border-amber-500/50 bg-amber-900/30 text-amber-400 hover:bg-amber-900/50"
                  : "border-gray-600 bg-transparent text-gray-400 hover:border-gray-500 hover:text-gray-300"
              }`}
            >
              {viewMode === "transcript" ? "◀ Interactive" : "📄 Transcript"}
            </button>
          </div>
          {/* Step counter with progress */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              {steps.map((s, i) => {
                const isCompleted = i < currentStep;
                const isCurrent = i === currentStep;
                const isPending = i > currentStep;

                return (
                  <button
                    key={s.id}
                    onClick={() => setCurrentStep(i)}
                    aria-label={`${isCompleted ? "Completed" : isCurrent ? "Current" : "Pending"} step ${i + 1}: ${s.title}`}
                    className={`flex h-6 items-center justify-center rounded-full p-1 transition-all motion-reduce:transition-none hover:opacity-80 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 ${
                      isCurrent
                        ? "w-8 bg-blue-500 ring-2 ring-blue-300 ring-offset-2 ring-offset-gray-800"
                        : isCompleted
                          ? "w-6 bg-emerald-500"
                          : "w-6 border-2 border-dashed border-gray-500 bg-gray-700"
                    }`}
                  >
                    {isCompleted && (
                      <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                    {isPending && (
                      <svg className="h-2 w-2 text-gray-400" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                );
              })}
            </div>
            <span className="text-sm font-medium text-gray-300">
              Step {currentStep + 1} of {steps.length}
            </span>
          </div>
        </nav>

        {/* Live region for screen reader announcements */}
        <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
          Step {currentStep + 1} of {steps.length}: {step.title}
        </div>

        {/* Keyboard shortcuts help */}
        {viewMode === "interactive" && (
          <div className="rounded-lg border border-gray-700/50 bg-gray-800/50 p-3 text-xs text-gray-400">
            <span className="font-semibold text-gray-300">Keyboard shortcuts: </span>
            <span className="inline-flex gap-4">
              <span><kbd className="rounded bg-gray-700 px-1.5 py-0.5 font-mono">←</kbd> Previous</span>
              <span><kbd className="rounded bg-gray-700 px-1.5 py-0.5 font-mono">→</kbd> Next</span>
              <span><kbd className="rounded bg-gray-700 px-1.5 py-0.5 font-mono">Space</kbd> Toggle autoplay</span>
              <span><kbd className="rounded bg-gray-700 px-1.5 py-0.5 font-mono">T</kbd> Transcript view</span>
            </span>
          </div>
        )}

        {/* Conditional: Interactive demo or Transcript view */}
        {viewMode === "transcript" ? (
          <TranscriptView steps={steps} config={config} />
        ) : (
          <>
            {/* Step description */}
            <div className="grid min-h-32 grid-cols-[1fr_auto] items-center gap-6 rounded-lg border border-gray-700/50 bg-gray-800 px-5 py-4">
              {/* Left: Step info */}
              <div className="flex items-center gap-4">
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

              {/* Right: Security note (if available) */}
              {step.securityNote && (
                <div className="flex max-w-md items-start gap-3 self-center border-l border-gray-700 pl-6">
                  <svg
                    className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                  <p className="text-xs leading-relaxed text-gray-500">
                    {step.securityNote}
                  </p>
                </div>
              )}
            </div>

            {/* Main content */}
            <main id="main-content" className="grid min-h-[50rem] grid-cols-2 gap-5">
          {/* Left: User view */}
          <div className="flex flex-col gap-3">
            <h2 className="flex items-center gap-2.5 text-base font-semibold">
              <svg
                className="h-5 w-5 text-blue-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
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
            <BrowserMockup
              urlBar={step.urlBar}
              loadingProgress={loadingProgress}
              loadingDuration={AUTOPLAY_INTERVAL}
            >
              {ScreenComponent ? <ScreenComponent /> : null}
            </BrowserMockup>
          </div>

          {/* Right: Technical view */}
          <div className="flex flex-col gap-3">
            <h2 className="flex items-center gap-2.5 text-base font-semibold">
              <svg
                className="h-5 w-5 text-emerald-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
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
              <ActorDiagram
                actors={step.actors}
                actorConfig={config.actorConfig}
              />
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
            </main>

            {/* Protocol Stack */}
            <ProtocolStack actors={step.actors} config={config.protocolStack} />

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 text-xs text-gray-600">
              <a
                href={config.backLink.href}
                className="flex items-center gap-1 text-gray-500 transition-colors hover:text-gray-300"
              >
                ← {config.backLink.label}
              </a>
              <div className="flex items-center gap-2">
                <span>An Authentication Flow Demo</span>
                <span className="rounded bg-gray-800 px-1.5 py-0.5 font-mono text-gray-500">
                  v{config.version}
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
