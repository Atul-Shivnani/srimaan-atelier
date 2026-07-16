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

// Bounding box the map view is projected against, in degrees, with padding.
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
