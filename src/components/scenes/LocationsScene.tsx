import { useRef } from "react";
import Beat from "../Beat";
import GujaratMap from "../GujaratMap";
import LocationCallouts from "../LocationCallouts";
import { useSceneProgress } from "../../lib/useSceneProgress";
import { computeCityStates } from "../../lib/mapTiming";
import { cameraPosition, cameraScale } from "../../lib/cameraPath";

export default function LocationsScene() {
  const sectionRef = useRef<HTMLElement>(null);
  const progress = useSceneProgress(sectionRef);
  const { activeId, revealedIds } = computeCityStates(progress);
  const cam = cameraPosition(progress);
  const scale = cameraScale(progress);

  return (
    <section
      ref={sectionRef}
      id="locations"
      data-scene="locations"
      data-scene-label="Where we are"
      className="relative h-[340vh]"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            transform: `scale(${scale})`,
            transformOrigin: `${cam.xPct}% ${cam.yPct}%`,
          }}
        >
          <img src="/images/map-texture.png" alt="" className="absolute inset-0 h-full w-full object-cover" />
          <GujaratMap activeId={activeId} revealedIds={revealedIds} />
          <LocationCallouts activeId={activeId} revealedIds={revealedIds} mapScale={scale} />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-charcoal/60 via-transparent to-charcoal/70" />

        <div className="pointer-events-none relative z-10 mx-auto h-full max-w-6xl px-6 md:px-12">
          <Beat progress={progress} start={0} end={0.045} fade={0.02} className="absolute inset-x-6 top-[10%] md:inset-x-12">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-brass">Beyond the workshop</p>
            <h2 className="max-w-2xl font-display text-4xl leading-tight text-canvas md:text-6xl">
              Vadodara, and everywhere it travels.
            </h2>
          </Beat>
        </div>
      </div>
    </section>
  );
}
