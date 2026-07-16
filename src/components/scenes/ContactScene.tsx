import { useRef } from "react";
import FrameCanvas from "../FrameCanvas";
import Beat from "../Beat";
import SwingTagCard from "../SwingTagCard";
import MagneticButton from "../MagneticButton";
import { useSceneProgress } from "../../lib/useSceneProgress";
import { contactOptions, site } from "../../data/content";

export default function ContactScene() {
  const sectionRef = useRef<HTMLElement>(null);
  const progress = useSceneProgress(sectionRef);

  return (
    <section
      ref={sectionRef}
      id="contact"
      data-scene="contact"
      data-scene-label="Get in touch"
      className="relative h-[320vh]"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <FrameCanvas scene="shirt" frameCount={121} sectionRef={sectionRef} />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/85 via-charcoal/25 to-charcoal/95" />

        <div className="relative z-10 mx-auto h-full max-w-6xl px-6 md:px-12">
          <Beat progress={progress} start={0.04} end={0.26} className="absolute inset-x-6 top-[14%] md:inset-x-12">
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
            progress={progress}
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
            progress={progress}
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
