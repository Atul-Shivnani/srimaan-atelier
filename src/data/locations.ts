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

// The background map is a real mosaic of OpenStreetMap tiles (zoom 11,
// x: 1437-1440, y: 890-898), so pins are projected with the same Web
// Mercator math the tiles themselves use — not a linear approximation —
// to land exactly on the real streets/labels underneath.
const ZOOM = 11;
const TILE_PX = 256;
const MOSAIC_LEFT_PX = 1437 * TILE_PX;
const MOSAIC_TOP_PX = 890 * TILE_PX;
const MOSAIC_WIDTH_PX = 4 * TILE_PX;
const MOSAIC_HEIGHT_PX = 9 * TILE_PX;

function mercatorPx(lat: number, lon: number) {
  const scale = TILE_PX * 2 ** ZOOM;
  const x = ((lon + 180) / 360) * scale;
  const latRad = (lat * Math.PI) / 180;
  const y = ((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2) * scale;
  return { x, y };
}

export function project(lat: number, lon: number): { xPct: number; yPct: number } {
  const { x, y } = mercatorPx(lat, lon);
  return {
    xPct: ((x - MOSAIC_LEFT_PX) / MOSAIC_WIDTH_PX) * 100,
    yPct: ((y - MOSAIC_TOP_PX) / MOSAIC_HEIGHT_PX) * 100,
  };
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
