import React, { Fragment } from "react";

export function ActorDiagram({ actors }) {
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
