import { useRef } from "react";
import FrameCanvas from "../FrameCanvas";
import Beat from "../Beat";
import SwingTagCard from "../SwingTagCard";
import { useSceneProgress } from "../../lib/useSceneProgress";
import { services } from "../../data/content";

export default function ServicesScene() {
  const sectionRef = useRef<HTMLElement>(null);
  const progress = useSceneProgress(sectionRef);

  return (
    <section
      ref={sectionRef}
      id="services"
      data-scene="services"
      data-scene-label="What we cut"
      data-cursor="scissor"
      className="relative h-[340vh]"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <FrameCanvas scene="scissor" frameCount={121} sectionRef={sectionRef} />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/85 via-charcoal/30 to-charcoal/90" />

        <div className="relative z-10 mx-auto h-full max-w-6xl px-6 md:px-12">
          <Beat progress={progress} start={0.04} end={0.26} className="absolute inset-x-6 top-[14%] md:inset-x-12">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-brass">One clean line</p>
            <h2 className="max-w-2xl font-display text-4xl leading-tight text-canvas md:text-6xl">
              Then, we cut.
            </h2>
            <p className="mt-6 max-w-lg text-bone md:text-lg">
              Five product lines, one standard of finish — patterned and cut to your workforce, not
              off a rack.
            </p>
          </Beat>

          <div className="absolute inset-x-6 bottom-[8%] top-[30%] md:inset-x-12">
            <div className="grid h-full grid-cols-2 gap-4 md:grid-cols-5 md:gap-5">
              {services.map((s, i) => (
                <Beat
                  key={s.slug}
                  progress={progress}
                  start={0.3 + i * 0.08}
                  end={0.97}
                  fade={0.07}
                  className={i === 4 ? "col-span-2 md:col-span-1" : ""}
                >
                  <SwingTagCard rotate={i % 2 === 0 ? -2 : 2} className="flex h-full flex-col p-4">
                    <div className="mb-3 aspect-[4/5] w-full overflow-hidden rounded-lg bg-charcoal-deep">
                      <img src={s.image} alt={s.name} className="h-full w-full object-cover" />
                    </div>
                    <p className="font-display text-base leading-tight">{s.name}</p>
                    <p className="mt-1 text-xs leading-snug text-charcoal/65">{s.description}</p>
                  </SwingTagCard>
                </Beat>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
