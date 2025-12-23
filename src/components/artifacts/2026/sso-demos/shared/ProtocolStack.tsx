// src/components/artifacts/2026/sso-demos/shared/ProtocolStack.tsx

import React from "react";
import type { Actors, ProtocolStackConfig, ProtocolStackConnection } from "./types.ts";

interface ProtocolStackProps {
  /** Current active state of each component */
  actors: Actors;
  /** Stack configuration with components and connections */
  config: ProtocolStackConfig;
}

interface ConnectorProps {
  /** Connection configuration */
  connection: ProtocolStackConnection;
  /** Whether the connector should be highlighted */
  isActive: boolean;
}

/**
 * Protocol stack visualization showing the authentication architecture.
 * Components light up when active, with protocol labels on connections.
 */
export function ProtocolStack({ actors, config }: ProtocolStackProps) {
  const { components, connections } = config;

  // Build a map for quick lookup of connection info
  const connectionMap = new Map<string, ProtocolStackConnection>();
  connections.forEach((conn) => {
    connectionMap.set(`${conn.from}-${conn.to}`, conn);
  });

  return (
    <div className="rounded-lg border border-gray-700/50 bg-gray-800 p-5">
      <h3 className="mb-4 text-center text-xs font-semibold uppercase tracking-wider text-gray-500">
        Protocol Stack
      </h3>
      <div className="flex items-center justify-center gap-4">
        {components.map((component, i) => {
          const isActive = actors[component.key];
          const nextComponent = components[i + 1];
          const connection = nextComponent
            ? connectionMap.get(`${component.key}-${nextComponent.key}`)
            : null;

          return (
            <React.Fragment key={component.key}>
              {/* Component box */}
              <div
                className={`flex min-w-[90px] flex-col items-center rounded-xl p-4 transition-all duration-300 motion-reduce:transition-none ${
                  isActive
                    ? `${component.activeGradient} ${component.activeShadow} ${component.activeRing} border-2 border-white/30`
                    : "border-2 border-dashed border-gray-500 bg-gray-700/80"
                }`}
              >
                <div className="mb-1.5 text-2xl">{component.emoji}</div>
                <div className="text-sm font-bold">{component.label}</div>
                <div className="text-[10px] text-gray-200/80">
                  {component.subLabel}
                </div>
              </div>

              {/* Connector to next component */}
              {connection && (
                <Connector
                  connection={connection}
                  isActive={isActive || actors[nextComponent.key]}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Connector component between protocol stack components.
 */
function Connector({ connection, isActive }: ConnectorProps) {
  const activeColor = isActive ? connection.activeColor : "bg-gray-600";
  // Use explicit border colors if provided, otherwise derive from activeColor
  // This avoids brittle string manipulation for complex Tailwind classes
  const activeBorderLeft = isActive
    ? (connection.activeBorderLeft ?? connection.activeColor.replace("bg-", "border-l-"))
    : "border-l-gray-600";
  const activeBorderRight = isActive
    ? (connection.activeBorderRight ?? connection.activeColor.replace("bg-", "border-r-"))
    : "border-r-gray-600";

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="flex items-center gap-1" aria-hidden="true">
        {/* Connection status icon */}
        {isActive ? (
          <svg className="h-3 w-3 text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ) : (
          <svg className="h-3 w-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <circle cx="12" cy="12" r="9" strokeDasharray="4 2" />
          </svg>
        )}
        {/* Left arrow */}
        <div
          className={`h-0 w-0 border-y-4 border-r-[6px] border-y-transparent transition-colors duration-300 motion-reduce:transition-none ${activeBorderRight}`}
        />
        {/* Line - solid when active, dashed when inactive */}
        <div
          className={`h-0.5 w-6 transition-all duration-300 motion-reduce:transition-none ${activeColor} ${!isActive ? "border-t-2 border-dashed border-gray-500 bg-transparent" : ""}`}
        />
        {/* Right arrow */}
        <div
          className={`h-0 w-0 border-y-4 border-l-[6px] border-y-transparent transition-colors duration-300 motion-reduce:transition-none ${activeBorderLeft}`}
        />
      </div>
      {/* Protocol label */}
      <div className="text-center text-[10px] text-gray-500">
        {connection.protocol}
        {connection.subProtocol && (
          <>
            <br />
            <span className="text-gray-400">{connection.subProtocol}</span>
          </>
        )}
      </div>
    </div>
  );
}
