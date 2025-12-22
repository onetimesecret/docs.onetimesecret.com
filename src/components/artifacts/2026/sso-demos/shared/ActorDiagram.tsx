// src/components/artifacts/2026/sso-demos/shared/ActorDiagram.tsx

import React, { Fragment } from "react";
import type { Actors, ActorConfig } from "./types.ts";

interface ActorDiagramProps {
  /** Current active state of each actor */
  actors: Actors;
  /** Configuration for actors to display */
  actorConfig: ActorConfig[];
}

/**
 * Horizontal strip showing which actors/components are active in the current step.
 * Actors light up when active, providing visual context for the HTTP flow.
 */
export function ActorDiagram({ actors, actorConfig }: ActorDiagramProps) {
  const ariaLabel = `Flow diagram showing: ${actorConfig.map(item => item.label).join(" arrow ")}`;

  return (
    <div className="mb-4 flex flex-wrap items-center gap-1" role="img" aria-label={ariaLabel}>
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
          {i < actorConfig.length - 1 && <div className="text-gray-400" aria-hidden="true">→</div>}
        </Fragment>
      ))}
    </div>
  );
}
