import { cities, project } from "../data/locations";
import { cityStart } from "./mapTiming";

const midpoints = cities.map((_, i) => cityStart(i) + 0.065);
const positions = cities.map((c) => project(c.lat, c.lon));

export function cameraPosition(progress: number): { xPct: number; yPct: number } {
  if (progress <= midpoints[0]) return positions[0];
  if (progress >= midpoints[midpoints.length - 1]) return positions[positions.length - 1];

  for (let i = 0; i < midpoints.length - 1; i++) {
    if (progress >= midpoints[i] && progress <= midpoints[i + 1]) {
      const t = (progress - midpoints[i]) / (midpoints[i + 1] - midpoints[i]);
      const a = positions[i];
      const b = positions[i + 1];
      return { xPct: a.xPct + (b.xPct - a.xPct) * t, yPct: a.yPct + (b.yPct - a.yPct) * t };
    }
  }
  return positions[0];
}
