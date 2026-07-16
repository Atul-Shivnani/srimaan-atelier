import { useRef } from "react";
import FrameCanvas from "../FrameCanvas";
import Beat from "../Beat";
import SwingTagCard from "../SwingTagCard";
import MagneticButton from "../MagneticButton";
import { useSceneProgress } from "../../lib/useSceneProgress";
import { about, services, stats, industries, contactOptions, site } from "../../data/content";

const STORY_FRAME_COUNT = 484;
const QUARTER = 0.25;

export default function StoryScene() {
  const sectionRef = useRef<HTMLElement>(null);
  const progress = useSceneProgress(sectionRef);

  // Each chapter reuses the exact same beat timings the standalone scenes used,
  // just remapped from "progress through this chapter" to "progress through
  // the single continuous video" (one quarter of the timeline each).
  const aboutP = (progress - 0 * QUARTER) / QUARTER;
  const servicesP = (progress - 1 * QUARTER) / QUARTER;
  const statsP = (progress - 2 * QUARTER) / QUARTER;
  const contactP = (progress - 3 * QUARTER) / QUARTER;

  const inServices = servicesP >= -0.08 && servicesP <= 1.08;

  return (
    <section ref={sectionRef} className="relative h-[1300vh]">
      <div className="absolute inset-x-0 h-px w-px" style={{ top: "0%" }} data-scene="about" data-scene-label="Who we are" aria-hidden />
      <div className="absolute inset-x-0 h-px w-px" style={{ top: "25%" }} data-scene="services" data-scene-label="What we cut" aria-hidden />
      <div className="absolute inset-x-0 h-px w-px" style={{ top: "50%" }} data-scene="stats" data-scene-label="Ground covered" aria-hidden />
      <div className="absolute inset-x-0 h-px w-px" style={{ top: "75%" }} data-scene="contact" data-scene-label="Get in touch" aria-hidden />

      <div
        className="sticky top-0 h-screen overflow-hidden"
        data-cursor={inServices ? "scissor" : undefined}
      >
        <FrameCanvas scene="story" frameCount={STORY_FRAME_COUNT} sectionRef={sectionRef} />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/85 via-charcoal/25 to-charcoal/90" />

        <div className="relative z-10 mx-auto h-full max-w-6xl px-6 md:px-12">
          {/* Chapter 1 — the cloth (About) */}
          <Beat progress={aboutP} start={0.05} end={0.34} className="absolute inset-x-6 top-[18%] md:inset-x-12">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-brass">{about.eyebrow}</p>
            <h2 className="max-w-2xl font-display text-4xl leading-tight text-canvas md:text-6xl">{about.title}</h2>
            <p className="mt-6 max-w-lg text-bone md:text-lg">{about.body}</p>
          </Beat>

          <Beat
            progress={aboutP}
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
            progress={aboutP}
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

          {/* Chapter 2 — the cut (Services) */}
          <Beat progress={servicesP} start={0.04} end={0.26} className="absolute inset-x-6 top-[14%] md:inset-x-12">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-brass">One clean line</p>
            <h2 className="max-w-2xl font-display text-4xl leading-tight text-canvas md:text-6xl">Then, we cut.</h2>
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
                  progress={servicesP}
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

          {/* Chapter 3 — the stitch (Stats) */}
          <Beat progress={statsP} start={0.04} end={0.26} className="absolute inset-x-6 top-[14%] md:inset-x-12">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-brass">Stitch by stitch</p>
            <h2 className="max-w-2xl font-display text-4xl leading-tight text-canvas md:text-6xl">
              Every seam counts.
            </h2>
          </Beat>

          <Beat
            progress={statsP}
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

          <Beat progress={statsP} start={0.68} end={0.97} className="absolute inset-x-6 bottom-[12%] md:inset-x-12">
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-bone/70">
              Industries we dress
            </p>
            <div className="flex flex-wrap gap-3">
              {industries.map((ind) => (
                <span key={ind} className="rounded-full border border-brass/40 px-4 py-2 text-xs text-canvas md:text-sm">
                  {ind}
                </span>
              ))}
            </div>
          </Beat>

          {/* Chapter 4 — the finished shirt (Contact) */}
          <Beat progress={contactP} start={0.04} end={0.26} className="absolute inset-x-6 top-[14%] md:inset-x-12">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-brass">The finished shirt</p>
            <h2 className="max-w-2xl font-display text-4xl leading-tight text-canvas md:text-6xl">
              Let's cut yours.
            </h2>
            <p className="mt-6 max-w-lg text-bone md:text-lg">
              Tell us your workforce size and industry — swatches and a quotation follow within 48
              hours.
            </p>
          </Beat>

          <Beat
            progress={contactP}
            start={0.32}
            end={0.68}
            className="absolute inset-x-6 top-1/2 flex -translate-y-1/2 flex-col gap-4 md:inset-x-12 md:flex-row"
          >
            {contactOptions.map((c, i) => (
              <SwingTagCard key={c.label} eyebrow={c.label} rotate={i % 2 === 0 ? -2 : 2} className="md:w-72">
                <a href={c.href} data-cursor="link" className="text-base leading-snug hover:text-maroon">
                  {c.value}
                </a>
              </SwingTagCard>
            ))}
          </Beat>

          <Beat
            progress={contactP}
            start={0.74}
            end={0.99}
            className="absolute inset-x-6 bottom-[10%] flex flex-col items-start gap-6 md:inset-x-12 md:flex-row md:items-center md:justify-between"
          >
            <MagneticButton
              href={`mailto:${site.email}?subject=Uniform enquiry`}
              className="rounded-full bg-brass px-8 py-4 font-mono text-xs uppercase tracking-[0.15em] text-charcoal"
            >
              Request a quote
            </MagneticButton>
            <div className="font-mono text-xs text-bone/70">
              {site.hours.map((h) => (
                <p key={h.day}>
                  {h.day} — {h.hours}
                </p>
              ))}
            </div>
          </Beat>
        </div>
      </div>
    </section>
  );
}
