import { useEffect, useRef, useState } from "react";
import type { RefObject } from "react";
import { ScrollTrigger } from "../lib/gsap";
import { getCachedScene, preloadScene } from "../lib/frameCache";
import type { SceneName } from "../lib/frameCache";

interface FrameCanvasProps {
  scene: SceneName;
  frameCount: number;
  sectionRef: RefObject<HTMLElement | null>;
}

export default function FrameCanvas({ scene, frameCount, sectionRef }: FrameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameRef = useRef(0);
  const [ready, setReady] = useState(() => getCachedScene(scene) !== null);

  useEffect(() => {
    let cancelled = false;
    const cached = getCachedScene(scene);
    if (cached) {
      imagesRef.current = cached;
      setReady(true);
      return;
    }
    preloadScene(scene, frameCount).then((imgs) => {
      if (cancelled) return;
      imagesRef.current = imgs;
      setReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, [scene, frameCount]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const draw = () => {
      const img = imagesRef.current[frameRef.current];
      if (!img || !img.complete || img.naturalWidth === 0) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const cw = canvas.clientWidth;
      const ch = canvas.clientHeight;
      if (canvas.width !== cw * dpr || canvas.height !== ch * dpr) {
        canvas.width = cw * dpr;
        canvas.height = ch * dpr;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
      const dw = img.naturalWidth * scale;
      const dh = img.naturalHeight * scale;
      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
    };

    if (!ready || !sectionRef.current) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      frameRef.current = Math.floor(frameCount / 2);
      draw();
      const onResize = () => draw();
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }

    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        const idx = Math.min(frameCount - 1, Math.round(self.progress * (frameCount - 1)));
        if (idx !== frameRef.current) {
          frameRef.current = idx;
          draw();
        }
      },
    });

    draw();
    const onResize = () => draw();
    window.addEventListener("resize", onResize);

    return () => {
      st.kill();
      window.removeEventListener("resize", onResize);
    };
  }, [ready, scene, frameCount, sectionRef]);

  return (
    <div className="absolute inset-0">
      <canvas ref={canvasRef} className="block h-full w-full" />
      {!ready && <div className="absolute inset-0 bg-charcoal-deep" aria-hidden />}
    </div>
  );
}
