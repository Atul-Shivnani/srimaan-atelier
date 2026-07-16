import { cities, project } from "../data/locations";
import { cityStart, cityEnd } from "./mapTiming";

const midpoints = cities.map((_, i) => cityStart(i) + 0.065);
const positions = cities.map((c) => project(c.lat, c.lon));
const center = {
  xPct: positions.reduce((s, p) => s + p.xPct, 0) / positions.length,
  yPct: positions.reduce((s, p) => s + p.yPct, 0) / positions.length,
};

// The map is shown "contained" (full extent visible, letterboxed) at
// scale 1, so zooming in on one city needs a much larger factor than a
// cover-cropped background would.
const ZOOM_IN = 4.5;
const ZOOM_OUT_START = cityEnd(cities.length - 1);

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function sequentialPosition(progress: number): { xPct: number; yPct: number } {
  if (progress <= midpoints[0]) return positions[0];
  if (progress >= midpoints[midpoints.length - 1]) return positions[positions.length - 1];

  for (let i = 0; i < midpoints.length - 1; i++) {
    if (progress >= midpoints[i] && progress <= midpoints[i + 1]) {
      const t = (progress - midpoints[i]) / (midpoints[i + 1] - midpoints[i]);
      const a = positions[i];
      const b = positions[i + 1];
      return { xPct: lerp(a.xPct, b.xPct, t), yPct: lerp(a.yPct, b.yPct, t) };
    }
  }
  return positions[0];
}

// Camera follows each city in turn, zoomed in, then pulls back to a full
// top-down overview once every location has had its moment.
export function cameraPosition(progress: number): { xPct: number; yPct: number } {
  if (progress <= ZOOM_OUT_START) return sequentialPosition(progress);

  const t = Math.min(1, (progress - ZOOM_OUT_START) / (1 - ZOOM_OUT_START));
  const last = positions[positions.length - 1];
  return { xPct: lerp(last.xPct, center.xPct, t), yPct: lerp(last.yPct, center.yPct, t) };
}

export function cameraScale(progress: number): number {
  if (progress <= ZOOM_OUT_START) return ZOOM_IN;
  const t = Math.min(1, (progress - ZOOM_OUT_START) / (1 - ZOOM_OUT_START));
  return lerp(ZOOM_IN, 1, t);
}
