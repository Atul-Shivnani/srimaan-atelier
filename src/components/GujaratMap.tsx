import { cities, project } from "../data/locations";

interface GujaratMapProps {
  activeId: string | null;
  revealedIds: string[];
  className?: string;
}

// Material "place" pin glyph, authored in a 24x24 box with its tip at (12, 22).
const PIN_PATH =
  "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z";

export default function GujaratMap({ activeId, revealedIds, className = "" }: GujaratMapProps) {
  const points = cities.map((c) => ({ city: c, ...project(c.lat, c.lon) }));

  const pathD = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.xPct} ${p.yPct}`).join(" ");

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
        opacity="0.5"
        vectorEffect="non-scaling-stroke"
      />

      {points.map(({ city, xPct, yPct }) => {
        const revealed = revealedIds.includes(city.id);
        const active = activeId === city.id;
        const isHq = city.role === "hq";
        const pinScale = (isHq ? 0.24 : 0.16) * (active ? 1.25 : 1);
        const haloR = isHq ? 3.6 : 2.8;

        return (
          <g key={city.id} transform={`translate(${xPct} ${yPct})`}>
            {active && (
              <circle r={haloR} fill="var(--color-brass)" opacity="0.16">
                <animate attributeName="r" values={`${haloR * 0.7};${haloR * 1.3};${haloR * 0.7}`} dur="2.4s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.24;0.06;0.24" dur="2.4s" repeatCount="indefinite" />
              </circle>
            )}
            <g
              style={{
                transform: revealed ? `scale(${pinScale})` : "scale(0)",
                transformOrigin: "12px 22px",
                transformBox: "fill-box",
                transition: "transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}
            >
              <path
                d={PIN_PATH}
                transform="translate(-12 -22)"
                fill={isHq ? "var(--color-maroon-bright)" : "var(--color-brass)"}
                stroke="var(--color-canvas)"
                strokeWidth="1"
              />
            </g>
          </g>
        );
      })}
    </svg>
  );
}
