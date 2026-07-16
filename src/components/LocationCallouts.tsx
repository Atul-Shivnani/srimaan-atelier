import { cities, project } from "../data/locations";

interface LocationCalloutsProps {
  activeId: string | null;
  revealedIds: string[];
  /** Camera zoom the callouts are nested inside — compensated so tags stay a
   * constant on-screen size instead of ballooning with the map zoom. */
  mapScale?: number;
}

const points = cities.map((c) => project(c.lat, c.lon));

// Real cities can sit close together on the map (Bharuch and Ankleshwar are
// ~9km apart) — stagger a later city's tag further out so it doesn't sit
// directly on top of an earlier one.
const STACK_THRESHOLD = 10;
const stackIndex = points.map((p, i) => {
  let count = 0;
  for (let j = 0; j < i; j++) {
    if (Math.hypot(p.xPct - points[j].xPct, p.yPct - points[j].yPct) < STACK_THRESHOLD) count++;
  }
  return count;
});

export default function LocationCallouts({ activeId, revealedIds, mapScale = 1 }: LocationCalloutsProps) {
  return (
    <div className="absolute inset-0">
      {cities.map((city, i) => {
        const { xPct, yPct } = points[i];
        const revealed = revealedIds.includes(city.id);
        const active = activeId === city.id;
        const isHq = city.role === "hq";

        // Keep the tag on-screen: flip to the opposite side near edges.
        const flipX = xPct > 68;
        const flipY = yPct < 16;
        const stackPx = stackIndex[i] * 88;

        return (
          <div key={city.id} className="absolute" style={{ left: `${xPct}%`, top: `${yPct}%` }}>
            {/* Compensates the ancestor camera zoom so the tag renders at a
                constant screen size regardless of how zoomed-in the map is. */}
            <div style={{ transform: `scale(${1 / mapScale})`, transformOrigin: "0 0" }}>
              <div
                className="w-40 transition-all duration-500"
                style={{
                  transform: `translate(${flipX ? "calc(-100% - 14px)" : "14px"}, calc(${flipY ? "14px" : "-100% - 14px"} ${flipY ? "+" : "-"} ${stackPx}px)) scale(${revealed ? 1 : 0.85})`,
                  opacity: revealed ? 1 : 0,
                  pointerEvents: revealed ? "auto" : "none",
                }}
              >
                <div
                  className={`rounded-lg border bg-charcoal/90 px-3 py-2 shadow-[0_10px_25px_rgba(0,0,0,0.55)] backdrop-blur-sm ${
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
            </div>
          </div>
        );
      })}
    </div>
  );
}
