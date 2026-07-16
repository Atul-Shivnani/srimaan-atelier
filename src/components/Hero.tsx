import { useEffect, useRef, useState } from "react";
import MagneticButton from "./MagneticButton";

interface HeroProps {
  frameSrc?: string;
}

export default function Hero({ frameSrc = "/frames/cloth/frame_001.jpg" }: HeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const img = new Image();
    img.src = frameSrc;
    img.onload = () => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const draw = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const cw = canvas.clientWidth;
        const ch = canvas.clientHeight;
        canvas.width = cw * dpr;
        canvas.height = ch * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
        const dw = img.naturalWidth * scale;
        const dh = img.naturalHeight * scale;
        ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
      };
      draw();
      setReady(true);
      window.addEventListener("resize", draw);
    };
  }, [frameSrc]);

  return (
    <section id="top" className="relative flex h-screen items-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div
        className={`absolute inset-0 bg-charcoal transition-opacity duration-1000 ${ready ? "opacity-60" : "opacity-100"}`}
      />
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 md:px-12">
        <p className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-brass">
          Mafatlal &amp; Raymond · Authorized Distributors · Vadodara
        </p>
        <h1 className="max-w-3xl font-display text-5xl leading-[1.05] text-canvas md:text-7xl">
          Cut. Stitched.
          <br />
          <span className="italic text-maroon-bright">Worn</span> for fifty years.
        </h1>
        <p className="mt-6 max-w-xl text-lg text-bone">
          Every uniform we make starts on the same bolt of heritage fabric. Scroll to watch it
          become one.
        </p>
        <div className="mt-10 flex items-center gap-6">
          <MagneticButton
            href="#about"
            className="rounded-full bg-brass px-7 py-3 font-mono text-xs uppercase tracking-[0.15em] text-charcoal"
          >
            Begin the story
          </MagneticButton>
        </div>
      </div>
      <div className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-bone/60">
        Scroll
      </div>
    </section>
  );
}
