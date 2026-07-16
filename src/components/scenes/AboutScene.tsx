import { useRef } from "react";
import FrameCanvas from "../FrameCanvas";
import Beat from "../Beat";
import SwingTagCard from "../SwingTagCard";
import { useSceneProgress } from "../../lib/useSceneProgress";
import { about } from "../../data/content";

export default function AboutScene() {
  const sectionRef = useRef<HTMLElement>(null);
  const progress = useSceneProgress(sectionRef);

  return (
    <section
      ref={sectionRef}
      id="about"
      data-scene="about"
      data-scene-label="Who we are"
      className="relative h-[320vh]"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <FrameCanvas scene="cloth" frameCount={121} sectionRef={sectionRef} />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 via-charcoal/25 to-charcoal/85" />

        <div className="relative z-10 mx-auto h-full max-w-6xl px-6 md:px-12">
          <Beat progress={progress} start={0.05} end={0.34} className="absolute inset-x-6 top-[18%] md:inset-x-12">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-brass">{about.eyebrow}</p>
            <h2 className="max-w-2xl font-display text-4xl leading-tight text-canvas md:text-6xl">{about.title}</h2>
            <p className="mt-6 max-w-lg text-bone md:text-lg">{about.body}</p>
          </Beat>

          <Beat
            progress={progress}
            start={0.4}
            end={0.68}
            className="absolute inset-x-6 top-1/2 flex -translate-y-1/2 flex-col gap-5 md:inset-x-12 md:flex-row"
          >
            {about.facts.map((f, i) => (
              <SwingTagCard key={f.label} rotate={i % 2 === 0 ? -3 : 2} className="md:w-56">
                <p className="font-display text-4xl text-maroon">{f.value}</p>
                <p className="mt-2 text-sm leading-snug">{f.label}</p>
              </SwingTagCard>
            ))}
          </Beat>

          <Beat
            progress={progress}
            start={0.74}
            end={0.97}
            className="absolute inset-x-6 bottom-[14%] flex flex-col gap-4 md:inset-x-12 md:flex-row"
          >
            <SwingTagCard eyebrow="Authorized Distributor" rotate={-2} className="md:w-72">
              <p className="font-display text-xl">Mafatlal</p>
              <p className="mt-1 text-sm text-charcoal/70">India's heritage fabric brand since 1905.</p>
            </SwingTagCard>
            <SwingTagCard eyebrow="Authorized Distributor" rotate={2} className="md:w-72">
              <p className="font-display text-xl">Raymond</p>
              <p className="mt-1 text-sm text-charcoal/70">The complete man's fabric, for corporate wear.</p>
            </SwingTagCard>
          </Beat>
        </div>
      </div>
    </section>
  );
}
