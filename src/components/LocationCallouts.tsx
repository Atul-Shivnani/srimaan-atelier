import { cities, project } from "../data/locations";

interface LocationCalloutsProps {
  activeId: string | null;
  revealedIds: string[];
}

export default function LocationCallouts({ activeId, revealedIds }: LocationCalloutsProps) {
  return (
    <div className="absolute inset-0">
      {cities.map((city) => {
        const { xPct, yPct } = project(city.lat, city.lon);
        const revealed = revealedIds.includes(city.id);
        const active = activeId === city.id;
        const isHq = city.role === "hq";

        // Keep the tag on-screen: flip to the opposite side near edges.
        const flipX = xPct > 68;
        const flipY = yPct < 16;

        return (
          <div
            key={city.id}
            className="absolute w-40 transition-all duration-500"
            style={{
              left: `${xPct}%`,
              top: `${yPct}%`,
              transform: `translate(${flipX ? "calc(-100% - 14px)" : "14px"}, ${flipY ? "14px" : "calc(-100% - 14px)"}) scale(${revealed ? 1 : 0.85})`,
              opacity: revealed ? 1 : 0,
              pointerEvents: revealed ? "auto" : "none",
            }}
          >
            <div
              className={`rounded-lg border bg-charcoal/85 px-3 py-2 shadow-[0_10px_25px_rgba(0,0,0,0.45)] backdrop-blur-sm ${
                active ? "border-brass" : isHq ? "border-maroon-bright/50" : "border-brass/30"
              }`}
            >
              <p className={`font-mono text-[9px] uppercase tracking-[0.15em] ${isHq ? "text-maroon-bright" : "text-brass"}`}>
                {isHq ? "HQ" : "Served"}
              </p>
              <p className="font-display text-sm leading-tight text-canvas">{city.name}</p>
              <p className="mt-0.5 text-[10px] leading-snug text-bone/70">{city.blurb}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
