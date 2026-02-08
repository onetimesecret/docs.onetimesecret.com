// src/components/artifacts/2026/sso-demos/shared/ActorDiagram.tsx

import { Fragment } from "react";
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
      {actorConfig.map((item, i) => {
        const isActive = actors[item.key];

        return (
          <Fragment key={item.key}>
            <div
              className={`flex items-center gap-1.5 rounded px-3 py-1 text-xs font-medium transition-all ${
                isActive
                  ? item.activeColor + " border-2 border-white/40 text-white shadow-md"
                  : "border-2 border-dashed border-gray-500 bg-gray-700/50 text-gray-500"
              }`}
            >
              {isActive && (
                <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="12" cy="12" r="8" />
                </svg>
              )}
              {!isActive && (
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <circle cx="12" cy="12" r="8" />
                </svg>
              )}
              {item.label}
            </div>
            {i < actorConfig.length - 1 && <div className="text-gray-400" aria-hidden="true">→</div>}
          </Fragment>
        );
      })}
    </div>
  );
}
