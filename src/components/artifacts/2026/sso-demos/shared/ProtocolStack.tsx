// src/components/artifacts/2026/sso-demos/shared/ProtocolStack.tsx

import React from "react";

/**
 * Protocol stack visualization showing the authentication architecture.
 * Components light up when active, with protocol labels on connections.
 *
 * @param {Object} props
 * @param {import('./types').Actors} props.actors - Current active state of each component
 * @param {import('./types').ProtocolStackConfig} props.config - Stack configuration
 */
export function ProtocolStack({ actors, config }) {
  const { components, connections } = config;

  // Build a map for quick lookup of connection info
  const connectionMap = new Map();
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
                className={`flex min-w-[90px] flex-col items-center rounded-xl p-4 transition-all duration-300 ${
                  isActive
                    ? `${component.activeGradient} ${component.activeShadow} ${component.activeRing}`
                    : "bg-gray-700/80"
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
function Connector({ connection, isActive }) {
  const activeColor = isActive ? connection.activeColor : "bg-gray-600";
  const activeBorderLeft = isActive
    ? connection.activeColor.replace("bg-", "border-l-")
    : "border-l-gray-600";
  const activeBorderRight = isActive
    ? connection.activeColor.replace("bg-", "border-r-")
    : "border-r-gray-600";

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="flex items-center">
        {/* Left arrow */}
        <div
          className={`h-0 w-0 border-y-4 border-r-[6px] border-y-transparent transition-colors duration-300 ${activeBorderRight}`}
        />
        {/* Line */}
        <div
          className={`h-0.5 w-6 transition-all duration-300 ${activeColor}`}
        />
        {/* Right arrow */}
        <div
          className={`h-0 w-0 border-y-4 border-l-[6px] border-y-transparent transition-colors duration-300 ${activeBorderLeft}`}
        />
      </div>
      {/* Protocol label */}
      <div className="text-center text-[10px] text-gray-500">
        {connection.protocol}
        {connection.subProtocol && (
          <>
            <br />
            <span className="text-gray-600">{connection.subProtocol}</span>
          </>
        )}
      </div>
    </div>
  );
}
