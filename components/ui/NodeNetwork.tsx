"use client";

import { useMemo } from "react";

/** Animated abstract data-node network for the hero background. */
export function NodeNetwork() {
  const nodes = useMemo(() => {
    const seed = [
      [12, 22], [78, 18], [42, 32], [88, 48], [22, 58], [62, 64],
      [8, 78], [48, 82], [92, 86], [36, 12], [70, 38], [18, 42],
    ];
    return seed.map(([x, y], i) => ({ x, y, r: 2 + ((i * 7) % 4), d: i }));
  }, []);

  const edges = useMemo(() => {
    const e: Array<{ a: number; b: number; len: number }> = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const len = Math.hypot(dx, dy);
        if (len < 30) e.push({ a: i, b: j, len });
      }
    }
    return e;
  }, [nodes]);

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="absolute inset-0 h-full w-full opacity-40 pointer-events-none"
      style={{ aspectRatio: "1 / 1" }}
    >
      <defs>
        <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="oklch(0.8 0.11 86)" stopOpacity="0.95" />
          <stop offset="100%" stopColor="oklch(0.8 0.11 86)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Static link lines */}
      {edges.map((e, i) => (
        <line
          key={`l-${i}`}
          x1={nodes[e.a].x}
          y1={nodes[e.a].y}
          x2={nodes[e.b].x}
          y2={nodes[e.b].y}
          stroke="oklch(0.8 0.11 86)"
          strokeOpacity="0.2"
          strokeWidth="0.25"
        />
      ))}

      {/* Traveling transmission pulses */}
      {edges.map((e, i) => {
        const dur = 2 + (i % 5) * 0.6;
        const delay = (i * 0.37) % dur;
        return (
          <circle
            key={`p-${i}`}
            r="0.5"
            fill="oklch(0.9 0.12 86)"
            style={{ filter: "drop-shadow(0 0 1.5px oklch(0.8 0.11 86))" }}
          >
            <animate
              attributeName="cx"
              from={nodes[e.a].x}
              to={nodes[e.b].x}
              dur={`${dur}s`}
              begin={`-${delay}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="cy"
              from={nodes[e.a].y}
              to={nodes[e.b].y}
              dur={`${dur}s`}
              begin={`-${delay}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0;1;1;0"
              keyTimes="0;0.1;0.85;1"
              dur={`${dur}s`}
              begin={`-${delay}s`}
              repeatCount="indefinite"
            />
          </circle>
        );
      })}

      {/* Nodes */}
      {nodes.map((n, i) => (
        <g
          key={`n-${i}`}
          style={{
            animation: `node-pulse ${3 + (i % 4)}s ease-in-out infinite`,
            transformOrigin: `${n.x}px ${n.y}px`,
          }}
        >
          <circle
            cx={n.x}
            cy={n.y}
            r={n.r * 0.25}
            fill="oklch(0.8 0.11 86)"
            fillOpacity="0.8"
          />
          <circle
            cx={n.x}
            cy={n.y}
            r={n.r * 0.8}
            fill="url(#nodeGlow)"
            className="animate-pulse"
          />
        </g>
      ))}
    </svg>
  );
}
