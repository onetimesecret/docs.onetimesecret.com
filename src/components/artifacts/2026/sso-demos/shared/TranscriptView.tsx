// src/components/artifacts/2026/sso-demos/shared/TranscriptView.tsx

import React, { useCallback, useState, useMemo } from "react";
import type { Step, DemoConfig, HttpMessage, ActorConfig } from "./types.ts";

interface TranscriptViewProps {
  /** Array of demo steps to render as transcript */
  steps: Step[];
  /** Demo configuration */
  config: DemoConfig;
}

/**
 * TranscriptView renders the entire SSO flow as a readable document.
 * Designed for reading/text-oriented learners who prefer a full transcript
 * over interactive demos. Print-friendly, accessible, and exportable.
 */
export function TranscriptView({ steps, config }: TranscriptViewProps) {
  /**
   * Copies entire transcript as plain text to clipboard
   */
  const handleCopyAll = useCallback(async () => {
    const transcript = generatePlainTextTranscript(steps, config);
    try {
      await navigator.clipboard.writeText(transcript);
      alert("Transcript copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy transcript:", err);
      alert("Failed to copy transcript. Please try again.");
    }
  }, [steps, config]);

  return (
    <div className="min-h-screen bg-gray-900 font-sans text-gray-100 print:bg-white print:text-black">
      {/* Skip link for keyboard users */}
      <a
        href="#transcript-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded focus:bg-amber-600 focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to transcript content
      </a>

      <div className="mx-auto max-w-5xl p-6 print:p-0">
        {/* Header */}
        <header className="mb-8 border-b border-gray-700 pb-6 print:border-black">
          <div className="mb-4 flex items-start justify-between print:block">
            <div className="flex-1">
              <h1 className="mb-2 text-3xl font-bold tracking-tight text-amber-200 print:text-black">
                {config.title}
              </h1>
              <p className="text-base text-gray-400 print:text-gray-800">
                {config.subtitle}
              </p>
            </div>
            <div className="flex gap-2 print:hidden">
              <button
                onClick={handleCopyAll}
                className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-md transition-colors hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-gray-900"
                aria-label="Copy entire transcript to clipboard"
              >
                Copy All
              </button>
              <button
                onClick={() => window.print()}
                className="rounded-md border border-gray-600 bg-transparent px-4 py-2 text-sm font-medium text-gray-300 transition-colors hover:border-gray-500 hover:bg-gray-700 hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-900"
                aria-label="Print transcript"
              >
                Print
              </button>
            </div>
          </div>
          <div className="text-xs text-gray-500 print:text-gray-700">
            <span className="font-mono">v{config.version}</span>
            <span className="mx-2">•</span>
            <span>{steps.length} steps</span>
            <span className="mx-2">•</span>
            <span>Full transcript view</span>
          </div>
        </header>

        {/* Main transcript content */}
        <main id="transcript-content">
          <nav
            aria-label="Table of contents"
            className="mb-8 rounded-lg border border-gray-700 bg-gray-800 p-4 print:border-gray-300 print:bg-gray-50"
          >
            <h2 className="mb-3 text-base font-semibold text-gray-100 print:text-black">
              Table of Contents
            </h2>
            <ol className="space-y-1.5 text-sm">
              {steps.map((step) => (
                <li key={step.id}>
                  <a
                    href={`#step-${step.id}`}
                    className="text-amber-400 hover:text-amber-300 hover:underline print:text-amber-700"
                  >
                    Step {step.id}: {step.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          {/* Render each step as an article */}
          <div className="space-y-8">
            {steps.map((step, index) => (
              <StepArticle
                key={step.id}
                step={step}
                index={index}
                totalSteps={steps.length}
                nextStepId={steps[index + 1]?.id}
                actorConfig={config.actorConfig}
              />
            ))}
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-12 border-t border-gray-700 pt-6 text-center text-xs text-gray-600 print:border-gray-300 print:text-gray-700">
          <p>
            <a
              href={config.backLink.href}
              className="text-amber-400 hover:underline print:text-amber-700"
            >
              ← {config.backLink.label}
            </a>
          </p>
          <p className="mt-2">
            Generated transcript for {config.title} • v{config.version}
          </p>
        </footer>
      </div>
    </div>
  );
}

/**
 * Individual step article with hover highlighting support.
 */
function StepArticle({
  step,
  index,
  totalSteps,
  nextStepId,
  actorConfig,
}: {
  step: Step;
  index: number;
  totalSteps: number;
  nextStepId?: number;
  actorConfig: ActorConfig[];
}) {
  const [highlightedActor, setHighlightedActor] = useState<string | null>(null);

  // Build a map from actor labels to keys for matching HTTP from/to fields
  const labelToKeyMap = useMemo(() => {
    const map: Record<string, string> = {};
    actorConfig.forEach((actor) => {
      map[actor.label.toLowerCase()] = actor.key;
      map[actor.key.toLowerCase()] = actor.key;
    });
    return map;
  }, [actorConfig]);

  // Get actor key from a from/to string
  const getActorKeyFromString = useCallback(
    (str: string): string | null => {
      const normalized = str.toLowerCase().trim();
      // Try direct match first
      if (labelToKeyMap[normalized]) return labelToKeyMap[normalized];
      // Try partial match (e.g., "Caddy (Auth Layer)" should match "caddy")
      for (const [label, key] of Object.entries(labelToKeyMap)) {
        if (normalized.includes(label) || label.includes(normalized)) {
          return key;
        }
      }
      return null;
    },
    [labelToKeyMap],
  );

  // Check if an HTTP entry involves the highlighted actor
  const isHttpEntryHighlighted = useCallback(
    (entry: HttpMessage): boolean => {
      if (!highlightedActor) return false;
      const fromKey = entry.from ? getActorKeyFromString(entry.from) : null;
      const toKey = entry.to ? getActorKeyFromString(entry.to) : null;
      return fromKey === highlightedActor || toKey === highlightedActor;
    },
    [highlightedActor, getActorKeyFromString],
  );

  // Get actors involved in an HTTP entry
  const getActorsInEntry = useCallback(
    (entry: HttpMessage): string[] => {
      const actors: string[] = [];
      if (entry.from) {
        const key = getActorKeyFromString(entry.from);
        if (key) actors.push(key);
      }
      if (entry.to) {
        const key = getActorKeyFromString(entry.to);
        if (key && !actors.includes(key)) actors.push(key);
      }
      return actors;
    },
    [getActorKeyFromString],
  );

  return (
    <article
      id={`step-${step.id}`}
      role="article"
      aria-labelledby={`step-${step.id}-title`}
      className="scroll-mt-4 border-l-4 border-amber-500 bg-gray-800/50 p-6 print:break-inside-avoid print:border-amber-600 print:bg-white print:shadow-sm"
    >
      {/* Step header */}
      <header className="mb-4">
        <div className="mb-2 flex items-center gap-3">
          <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-amber-700 text-base font-bold shadow-lg print:bg-amber-600">
            {step.id}
          </span>
          <h2
            id={`step-${step.id}-title`}
            className="text-xl font-bold text-gray-100 print:text-black"
          >
            {step.title}
          </h2>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-gray-300 print:text-gray-800">
          {step.description}
        </p>
      </header>

      {/* What the user sees */}
      <section className="mb-4">
        <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-gray-400 print:text-gray-700">
          Location
        </h3>
        <div className="rounded-md bg-gray-900 p-3 print:bg-gray-100">
          <p className="mb-1 text-xs text-gray-500 print:text-gray-600">
            Browser URL:
          </p>
          <code className="block break-all font-mono text-sm text-amber-300 print:text-amber-800">
            {step.urlBar}
          </code>
          <p className="mt-2 text-xs text-gray-400 print:text-gray-700">
            Screen: <span className="font-mono">{step.userSees}</span>
          </p>
        </div>
      </section>

      {/* Active actors - moved above HTTP for better flow */}
      <section className="mb-4">
        <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-gray-400 print:text-gray-700">
          Active Components
          <span className="ml-2 text-xs font-normal normal-case text-gray-500 print:hidden">
            (hover to highlight requests)
          </span>
        </h3>
        <div className="flex flex-wrap gap-2">
          {Object.entries(step.actors)
            .filter(([_, active]) => active)
            .map(([actorKey]) => {
              const actor = actorConfig.find((a) => a.key === actorKey);
              const colorInfo = getActorColorInfo(actor?.activeColor);
              const isHighlighted = highlightedActor === actorKey;

              return (
                <button
                  key={actorKey}
                  onMouseEnter={() => setHighlightedActor(actorKey)}
                  onMouseLeave={() => setHighlightedActor(null)}
                  onFocus={() => setHighlightedActor(actorKey)}
                  onBlur={() => setHighlightedActor(null)}
                  className={`cursor-pointer rounded-full border-2 px-3 py-1 text-xs font-semibold transition-all print:border print:bg-gray-100 ${
                    isHighlighted
                      ? `${colorInfo.bgClass} ${colorInfo.borderClass} ${colorInfo.textClass} scale-105 shadow-lg`
                      : `${colorInfo.bgMutedClass} ${colorInfo.borderClass} ${colorInfo.textClass} hover:scale-105`
                  }`}
                  aria-pressed={isHighlighted}
                  aria-label={`${actor?.label || actorKey} - click to highlight related requests`}
                >
                  <span
                    className={`mr-1.5 inline-block h-2 w-2 rounded-full ${colorInfo.dotClass}`}
                    aria-hidden="true"
                  />
                  {actor?.label || actorKey}
                </button>
              );
            })}
        </div>
      </section>

      {/* HTTP exchanges */}
      <section className="mb-4">
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-400 print:text-gray-700">
          HTTP Exchanges
        </h3>
        <div className="space-y-3">
          {step.http.map((entry, i) => (
            <HttpTranscriptEntry
              key={i}
              entry={entry}
              index={i}
              isHighlighted={isHttpEntryHighlighted(entry)}
              involvedActors={getActorsInEntry(entry)}
              onHoverActors={(actors) => {
                if (actors.length > 0) {
                  setHighlightedActor(actors[0]);
                } else {
                  setHighlightedActor(null);
                }
              }}
              actorConfig={actorConfig}
            />
          ))}
        </div>
      </section>

      {/* Security note */}
      {step.securityNote && (
        <section className="rounded-md border border-amber-500/30 bg-amber-900/20 p-4 print:border-amber-600 print:bg-amber-50">
          <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-amber-400 print:text-amber-900">
            <svg
              className="h-4 w-4"
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
            Security Note
          </h3>
          <p className="text-xs leading-relaxed text-gray-300 print:text-gray-800">
            {step.securityNote}
          </p>
        </section>
      )}

      {/* Skip link to next step */}
      {index < totalSteps - 1 && nextStepId && (
        <a
          href={`#step-${nextStepId}`}
          className="mt-4 inline-block text-xs text-amber-400 hover:underline print:hidden"
        >
          Skip to next step →
        </a>
      )}
    </article>
  );
}

/**
 * Renders a single HTTP message in the transcript with hover highlighting support.
 */
function HttpTranscriptEntry({
  entry,
  index,
  isHighlighted,
  involvedActors,
  onHoverActors,
  actorConfig,
}: {
  entry: HttpMessage;
  index: number;
  isHighlighted: boolean;
  involvedActors: string[];
  onHoverActors: (actors: string[]) => void;
  actorConfig: ActorConfig[];
}) {
  const [showPayload, setShowPayload] = React.useState(false);
  const uniqueId = React.useId();

  // Determine message type label and styling
  const typeConfig = getHttpMessageTypeConfig(entry.type);

  return (
    <div
      className={`rounded-md border-l-4 p-4 transition-all print:break-inside-avoid print:bg-gray-50 ${
        isHighlighted
          ? "bg-gray-800 ring-2 ring-amber-400/50 ring-offset-1 ring-offset-gray-900"
          : "bg-gray-900/50 hover:bg-gray-800/70"
      }`}
      style={{ borderLeftColor: typeConfig.borderColor }}
      onMouseEnter={() => onHoverActors(involvedActors)}
      onMouseLeave={() => onHoverActors([])}
    >
      {/* Message header */}
      <div className="mb-2">
        <div className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-400 print:text-gray-700">
          <span
            className="rounded px-1.5 py-0.5"
            style={{ backgroundColor: `${typeConfig.borderColor}20` }}
          >
            {typeConfig.label}
          </span>
          {entry.from && entry.to && (
            <span className="font-medium text-gray-300 print:text-gray-600">
              {entry.from} → {entry.to}
            </span>
          )}
        </div>
        {entry.label && (
          <p className="mb-1 text-sm font-medium text-yellow-400 print:text-yellow-800">
            {entry.label}
          </p>
        )}
      </div>

      {/* Request details */}
      {entry.method && entry.url && (
        <div className="mb-2">
          <code className="block font-mono text-sm print:break-all">
            <span className="text-emerald-400 print:text-emerald-700">
              {entry.method}
            </span>{" "}
            <span className="text-blue-300 print:text-blue-700">
              {entry.url}
            </span>
          </code>
        </div>
      )}

      {/* Response status */}
      {entry.status && (
        <div className="mb-2">
          <code className="block font-mono text-sm text-emerald-400 print:text-emerald-700">
            {entry.status}
          </code>
        </div>
      )}

      {/* Headers */}
      {entry.headers && entry.headers.length > 0 && (
        <div className="mb-2">
          <h4 className="mb-1 text-xs font-semibold text-gray-500 print:text-gray-700">
            Headers:
          </h4>
          <pre
            className="overflow-x-auto rounded bg-black/30 p-2 font-mono text-xs text-gray-400 print:bg-gray-100 print:text-gray-800"
            aria-label="HTTP headers"
          >
            {entry.headers.join("\n")}
          </pre>
        </div>
      )}

      {/* Body */}
      {entry.body && (
        <div className="mb-2">
          <h4 className="mb-1 text-xs font-semibold text-gray-500 print:text-gray-700">
            Body:
          </h4>
          <pre
            className="overflow-x-auto rounded bg-black/30 p-2 font-mono text-xs text-gray-300 print:bg-gray-100 print:text-gray-800"
            aria-label="HTTP body"
          >
            {entry.body}
          </pre>
        </div>
      )}

      {/* Note */}
      {entry.note && (
        <p className="mb-2 text-xs italic text-yellow-500/80 print:text-yellow-800">
          Note: {entry.note}
        </p>
      )}

      {/* Expanded payload (SAML, JWT, etc.) */}
      {entry.expandedPayload && (
        <div className="mt-3 border-t border-gray-700 pt-3 print:border-gray-300">
          <button
            onClick={() => setShowPayload(!showPayload)}
            aria-expanded={showPayload}
            aria-controls={`payload-${uniqueId}`}
            className="mb-2 rounded bg-gray-700 px-3 py-1 text-xs font-medium text-gray-200 hover:bg-gray-600 print:hidden"
          >
            {showPayload ? "Hide" : "Show"} {entry.expandedPayload.label}
          </button>
          {(showPayload || typeof window !== "undefined") && (
            <div
              id={`payload-${uniqueId}`}
              className={`${showPayload ? "block" : "hidden"} print:block`}
            >
              <h4 className="mb-1 text-xs font-semibold text-gray-400 print:text-gray-700">
                {entry.expandedPayload.label}:
              </h4>
              <pre
                className="overflow-x-auto rounded bg-black/40 p-3 font-mono text-xs text-green-300 print:bg-gray-100 print:text-gray-900"
                aria-label={entry.expandedPayload.label}
              >
                {entry.expandedPayload.content}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/**
 * Gets color classes for an actor based on their activeColor from config.
 */
function getActorColorInfo(activeColor?: string): {
  bgClass: string;
  bgMutedClass: string;
  borderClass: string;
  textClass: string;
  dotClass: string;
} {
  // Map Tailwind bg-* classes to their color families
  const colorMap: Record<
    string,
    {
      bgClass: string;
      bgMutedClass: string;
      borderClass: string;
      textClass: string;
      dotClass: string;
    }
  > = {
    "bg-blue-500": {
      bgClass: "bg-blue-500/30",
      bgMutedClass: "bg-blue-950/50",
      borderClass: "border-blue-500",
      textClass: "text-blue-200",
      dotClass: "bg-blue-500",
    },
    "bg-orange-500": {
      bgClass: "bg-orange-500/30",
      bgMutedClass: "bg-orange-950/50",
      borderClass: "border-orange-500",
      textClass: "text-orange-200",
      dotClass: "bg-orange-500",
    },
    "bg-purple-500": {
      bgClass: "bg-purple-500/30",
      bgMutedClass: "bg-purple-950/50",
      borderClass: "border-purple-500",
      textClass: "text-purple-200",
      dotClass: "bg-purple-500",
    },
    "bg-cyan-500": {
      bgClass: "bg-cyan-500/30",
      bgMutedClass: "bg-cyan-950/50",
      borderClass: "border-cyan-500",
      textClass: "text-cyan-200",
      dotClass: "bg-cyan-500",
    },
    "bg-emerald-500": {
      bgClass: "bg-emerald-500/30",
      bgMutedClass: "bg-emerald-950/50",
      borderClass: "border-emerald-500",
      textClass: "text-emerald-200",
      dotClass: "bg-emerald-500",
    },
    "bg-rose-500": {
      bgClass: "bg-rose-500/30",
      bgMutedClass: "bg-rose-950/50",
      borderClass: "border-rose-500",
      textClass: "text-rose-200",
      dotClass: "bg-rose-500",
    },
    "bg-amber-500": {
      bgClass: "bg-amber-500/30",
      bgMutedClass: "bg-amber-950/50",
      borderClass: "border-amber-500",
      textClass: "text-amber-200",
      dotClass: "bg-amber-500",
    },
  };

  // Default to gray if no color or unknown color
  const defaultColors = {
    bgClass: "bg-gray-500/30",
    bgMutedClass: "bg-gray-800/50",
    borderClass: "border-gray-500",
    textClass: "text-gray-200",
    dotClass: "bg-gray-500",
  };

  if (!activeColor) return defaultColors;
  return colorMap[activeColor] || defaultColors;
}

/**
 * Returns configuration for each HTTP message type.
 */
function getHttpMessageTypeConfig(type: HttpMessage["type"]) {
  const configs = {
    request: {
      label: "REQUEST",
      borderColor: "#3b82f6", // blue-500
    },
    response: {
      label: "RESPONSE",
      borderColor: "#10b981", // emerald-500
    },
    internal: {
      label: "INTERNAL",
      borderColor: "#6b7280", // gray-500
    },
    server: {
      label: "SERVER→SERVER",
      borderColor: "#a855f7", // purple-500
    },
    "server-response": {
      label: "SERVER RESPONSE",
      borderColor: "#a855f7", // purple-500
    },
  };

  return configs[type];
}

/**
 * Generates a plain text version of the transcript for clipboard export.
 */
function generatePlainTextTranscript(
  steps: Step[],
  config: DemoConfig,
): string {
  const lines: string[] = [];

  // Header
  lines.push("=".repeat(80));
  lines.push(config.title);
  lines.push(config.subtitle);
  lines.push(`Version: ${config.version}`);
  lines.push("=".repeat(80));
  lines.push("");

  // Each step
  steps.forEach((step, stepIndex) => {
    lines.push("");
    lines.push(`STEP ${step.id}: ${step.title}`);
    lines.push("-".repeat(80));
    lines.push("");
    lines.push(`Description: ${step.description}`);
    lines.push("");
    lines.push(`What the User Sees:`);
    lines.push(`  Browser URL: ${step.urlBar}`);
    lines.push(`  Screen: ${step.userSees}`);
    lines.push("");

    // HTTP exchanges
    lines.push(`HTTP Exchanges:`);
    step.http.forEach((entry, i) => {
      lines.push("");
      lines.push(`  [${i + 1}] ${getHttpMessageTypeConfig(entry.type).label}`);
      if (entry.from && entry.to) {
        lines.push(`      ${entry.from} → ${entry.to}`);
      }
      if (entry.label) {
        lines.push(`      ${entry.label}`);
      }
      if (entry.method && entry.url) {
        lines.push(`      ${entry.method} ${entry.url}`);
      }
      if (entry.status) {
        lines.push(`      ${entry.status}`);
      }
      if (entry.headers && entry.headers.length > 0) {
        lines.push(`      Headers:`);
        entry.headers.forEach((h) => lines.push(`        ${h}`));
      }
      if (entry.body) {
        lines.push(`      Body:`);
        entry.body.split("\n").forEach((line) => lines.push(`        ${line}`));
      }
      if (entry.note) {
        lines.push(`      Note: ${entry.note}`);
      }
      if (entry.expandedPayload) {
        lines.push(`      ${entry.expandedPayload.label}:`);
        entry.expandedPayload.content
          .split("\n")
          .forEach((line) => lines.push(`        ${line}`));
      }
    });

    // Active components
    lines.push("");
    lines.push(`Active Components:`);
    const activeActors = Object.entries(step.actors)
      .filter(([_, active]) => active)
      .map(([key]) => key);
    lines.push(`  ${activeActors.join(", ")}`);

    // Security note
    if (step.securityNote) {
      lines.push("");
      lines.push(`Security Note:`);
      lines.push(`  ${step.securityNote}`);
    }

    if (stepIndex < steps.length - 1) {
      lines.push("");
      lines.push("~".repeat(80));
    }
  });

  lines.push("");
  lines.push("=".repeat(80));
  lines.push(`End of transcript - ${config.title}`);
  lines.push("=".repeat(80));

  return lines.join("\n");
}
