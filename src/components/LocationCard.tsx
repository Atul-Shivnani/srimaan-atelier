import SwingTagCard from "./SwingTagCard";
import type { CityLocation } from "../data/locations";

interface LocationCardProps {
  city: CityLocation;
  rotate?: number;
  className?: string;
}

export default function LocationCard({ city, rotate = -2, className = "" }: LocationCardProps) {
  return (
    <SwingTagCard
      eyebrow={city.role === "hq" ? "Headquarters" : "Served area"}
      rotate={rotate}
      className={`md:w-80 ${className}`}
    >
      <div className="mb-3 flex h-28 w-full items-center justify-center rounded-lg border border-dashed border-charcoal/25 bg-charcoal-deep/5">
        <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-charcoal/40">
          Photo coming soon
        </span>
      </div>
      <p className="font-display text-2xl">{city.name}</p>
      <p className="mt-1 text-sm text-charcoal/70">{city.blurb}</p>
    </SwingTagCard>
  );
}
