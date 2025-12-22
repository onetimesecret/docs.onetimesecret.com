// src/components/artifacts/2026/sso-demos/shared/ActorDiagram.tsx

import React, { Fragment } from "react";

/**
 * Horizontal strip showing which actors/components are active in the current step.
 * Actors light up when active, providing visual context for the HTTP flow.
 *
 * @param {Object} props
 * @param {import('./types').Actors} props.actors - Current active state of each actor
 * @param {import('./types').ActorConfig[]} props.actorConfig - Configuration for actors to display
 */
export function ActorDiagram({ actors, actorConfig }) {
  return (
    <div className="mb-4 flex flex-wrap items-center gap-1">
      {actorConfig.map((item, i) => (
        <Fragment key={item.key}>
          <div
            className={`rounded px-3 py-1 text-xs font-medium transition-all ${
              actors[item.key]
                ? item.activeColor + " text-white"
                : "bg-gray-700 text-gray-500"
            }`}
          >
            {item.label}
          </div>
          {i < actorConfig.length - 1 && <div className="text-gray-600">→</div>}
        </Fragment>
      ))}
    </div>
  );
}
