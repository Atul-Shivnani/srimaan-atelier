import { useRef } from "react";
import FrameCanvas from "../FrameCanvas";
import Beat from "../Beat";
import GujaratMap from "../GujaratMap";
import LocationCard from "../LocationCard";
import { useSceneProgress } from "../../lib/useSceneProgress";
import { computeCityStates, cityStart, cityEnd, FADE } from "../../lib/mapTiming";
import { cities } from "../../data/locations";

const MAP_FRAME_COUNT = 289;

export default function LocationsSceneV2() {
  const sectionRef = useRef<HTMLElement>(null);
  const progress = useSceneProgress(sectionRef);
  const { activeId, revealedIds } = computeCityStates(progress);

  return (
    <section
      ref={sectionRef}
      id="locations"
      data-scene="locations"
      data-scene-label="Where we are"
      className="relative h-[300vh]"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <FrameCanvas scene="map" frameCount={MAP_FRAME_COUNT} sectionRef={sectionRef} />
        <GujaratMap activeId={activeId} revealedIds={revealedIds} className="z-[1]" />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/75 via-charcoal/10 to-charcoal/85" />

        <div className="relative z-10 mx-auto h-full max-w-6xl px-6 md:px-12">
          <Beat progress={progress} start={0} end={0.045} fade={0.02} className="absolute inset-x-6 top-[14%] md:inset-x-12">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-brass">Beyond the workshop</p>
            <h2 className="max-w-2xl font-display text-4xl leading-tight text-canvas md:text-6xl">
              Vadodara, and everywhere it travels.
            </h2>
          </Beat>

          {cities.map((city, i) => (
            <Beat
              key={city.id}
              progress={progress}
              start={cityStart(i)}
              end={cityEnd(i)}
              fade={FADE}
              className="absolute inset-x-6 bottom-[12%] md:inset-x-12"
            >
              <LocationCard city={city} rotate={i % 2 === 0 ? -2 : 2} />
            </Beat>
          ))}
        </div>
      </div>
    </section>
  );
}
