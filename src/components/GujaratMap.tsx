import { cities, project } from "../data/locations";

interface GujaratMapProps {
  activeId: string | null;
  revealedIds: string[];
  className?: string;
}

export default function GujaratMap({ activeId, revealedIds, className = "" }: GujaratMapProps) {
  const points = cities.map((c) => ({ city: c, ...project(c.lat, c.lon) }));

  const pathD = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.xPct} ${p.yPct}`)
    .join(" ");

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className={`absolute inset-0 h-full w-full overflow-visible ${className}`}
      aria-hidden
    >
      <path
        d={pathD}
        fill="none"
        stroke="var(--color-brass)"
        strokeWidth="0.18"
        strokeDasharray="0.6 0.9"
        opacity="0.55"
        vectorEffect="non-scaling-stroke"
      />

      {points.map(({ city, xPct, yPct }) => {
        const revealed = revealedIds.includes(city.id);
        const active = activeId === city.id;
        const r = city.role === "hq" ? 1.1 : 0.85;

        return (
          <g
            key={city.id}
            transform={`translate(${xPct} ${yPct})`}
            opacity={revealed ? 1 : 0}
            style={{ transition: "opacity 0.6s ease" }}
          >
            {active && (
              <circle r={r * 2.6} fill="var(--color-brass)" opacity="0.18">
                <animate attributeName="r" values={`${r * 1.6};${r * 3.2};${r * 1.6}`} dur="2.4s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.28;0.05;0.28" dur="2.4s" repeatCount="indefinite" />
              </circle>
            )}
            <circle
              r={active ? r * 1.5 : r}
              fill={city.role === "hq" ? "var(--color-maroon-bright)" : "var(--color-brass)"}
              stroke="var(--color-canvas)"
              strokeWidth="0.15"
              vectorEffect="non-scaling-stroke"
              style={{ transition: "r 0.4s ease" }}
            />
          </g>
        );
      })}
    </svg>
  );
}
