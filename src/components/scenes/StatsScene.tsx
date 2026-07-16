import { useRef } from "react";
import FrameCanvas from "../FrameCanvas";
import Beat from "../Beat";
import SwingTagCard from "../SwingTagCard";
import { useSceneProgress } from "../../lib/useSceneProgress";
import { stats, industries } from "../../data/content";

export default function StatsScene() {
  const sectionRef = useRef<HTMLElement>(null);
  const progress = useSceneProgress(sectionRef);

  return (
    <section
      ref={sectionRef}
      id="stats"
      data-scene="stats"
      data-scene-label="Ground covered"
      className="relative h-[320vh]"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <FrameCanvas scene="stitch" frameCount={121} sectionRef={sectionRef} />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/85 via-charcoal/30 to-charcoal/90" />

        <div className="relative z-10 mx-auto h-full max-w-6xl px-6 md:px-12">
          <Beat progress={progress} start={0.04} end={0.26} className="absolute inset-x-6 top-[14%] md:inset-x-12">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-brass">Stitch by stitch</p>
            <h2 className="max-w-2xl font-display text-4xl leading-tight text-canvas md:text-6xl">
              Every seam counts.
            </h2>
          </Beat>

          <Beat
            progress={progress}
            start={0.3}
            end={0.62}
            className="absolute inset-x-6 top-1/2 grid -translate-y-1/2 grid-cols-2 gap-4 md:inset-x-12 md:grid-cols-4 md:gap-5"
          >
            {stats.map((s, i) => (
              <SwingTagCard key={s.label} rotate={i % 2 === 0 ? -2 : 2}>
                <p className="font-display text-3xl text-maroon md:text-4xl">{s.value}</p>
                <p className="mt-2 text-sm font-medium">{s.label}</p>
                <p className="mt-1 text-xs text-charcoal/60">{s.detail}</p>
              </SwingTagCard>
            ))}
          </Beat>

          <Beat
            progress={progress}
            start={0.68}
            end={0.97}
            className="absolute inset-x-6 bottom-[12%] md:inset-x-12"
          >
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-bone/70">
              Industries we dress
            </p>
            <div className="flex flex-wrap gap-3">
              {industries.map((ind) => (
                <span
                  key={ind}
                  className="rounded-full border border-brass/40 px-4 py-2 text-xs text-canvas md:text-sm"
                >
                  {ind}
                </span>
              ))}
            </div>
          </Beat>
        </div>
      </div>
    </section>
  );
}
