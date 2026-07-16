export interface CityLocation {
  id: string;
  name: string;
  role: "hq" | "served";
  lat: number;
  lon: number;
  blurb: string;
}

// Real coordinates — order matches the narrative: HQ first, then the served
// corridor. Positions on the map are projected from these, not eyeballed.
export const cities: CityLocation[] = [
  {
    id: "vadodara",
    name: "Vadodara",
    role: "hq",
    lat: 22.3034,
    lon: 73.1845,
    blurb: "Headquarters. Narmada Apartments, Raopura — where every order starts.",
  },
  {
    id: "anand",
    name: "Anand",
    role: "served",
    lat: 22.5645,
    lon: 72.9289,
    blurb: "Dairy and manufacturing hub — corporate and industrial uniform clients.",
  },
  {
    id: "bharuch",
    name: "Bharuch",
    role: "served",
    lat: 21.7051,
    lon: 72.9959,
    blurb: "Chemical and industrial belt along the Narmada — safety and boiler-suit orders.",
  },
  {
    id: "ankleshwar",
    name: "Ankleshwar",
    role: "served",
    lat: 21.6266,
    lon: 73.0166,
    blurb: "GIDC industrial estate — one of our largest safety-wear client bases.",
  },
  {
    id: "nadiad",
    name: "Nadiad",
    role: "served",
    lat: 22.6939,
    lon: 72.8615,
    blurb: "Textile and trading town — corporate uniforms for growing local businesses.",
  },
];

// Bounding box the stylized map background is projected against, in
// degrees, with padding.
const BOUNDS = { lonMin: 72.75, lonMax: 73.3, latMin: 21.5, latMax: 22.85 };

// Longitude degrees compress relative to latitude away from the equator —
// correct for it so the projected shape isn't stretched east-west.
const LAT_COS = Math.cos((22.1 * Math.PI) / 180);

export function project(lat: number, lon: number): { xPct: number; yPct: number } {
  const x = (lon - BOUNDS.lonMin) * LAT_COS;
  const xMax = (BOUNDS.lonMax - BOUNDS.lonMin) * LAT_COS;
  const xPct = (x / xMax) * 100;
  const yPct = ((BOUNDS.latMax - lat) / (BOUNDS.latMax - BOUNDS.latMin)) * 100;
  return { xPct, yPct };
}

const EARTH_RADIUS_KM = 6371;

function haversineKm(aLat: number, aLon: number, bLat: number, bLon: number): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(bLat - aLat);
  const dLon = toRad(bLon - aLon);
  const a =
    Math.sin(dLat / 2) ** 2 + Math.cos(toRad(aLat)) * Math.cos(toRad(bLat)) * Math.sin(dLon / 2) ** 2;
  return EARTH_RADIUS_KM * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

const hq = cities.find((c) => c.role === "hq")!;

/** Straight-line distance from HQ, in whole km. 0 for the HQ itself. */
export function kmFromHq(city: CityLocation): number {
  return Math.round(haversineKm(hq.lat, hq.lon, city.lat, city.lon));
}
