import { cities } from "../data/locations";

// Each city gets an equal scroll "slot"; the pin glows and its card is shown
// for most of the slot, with a short fade at each edge shared with GujaratMap.
const SLOT = 0.18;
const START_OFFSET = 0.05;
export const FADE = 0.04;

export function cityStart(i: number) {
  return START_OFFSET + i * SLOT;
}

export function cityEnd(i: number) {
  return cityStart(i) + SLOT - 0.05;
}

export function computeCityStates(progress: number) {
  let activeId: string | null = null;
  const revealedIds: string[] = [];

  cities.forEach((city, i) => {
    const start = cityStart(i);
    const end = cityEnd(i);
    if (progress >= start - FADE) revealedIds.push(city.id);
    if (progress >= start - FADE && progress <= end + FADE) activeId = city.id;
  });

  return { activeId, revealedIds };
}
