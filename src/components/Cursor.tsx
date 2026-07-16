import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const glyphRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const setDotX = gsap.quickSetter(dot, "x", "px") as (v: number) => void;
    const setDotY = gsap.quickSetter(dot, "y", "px") as (v: number) => void;
    const ringX = gsap.quickTo(ring, "x", { duration: 0.5, ease: "power3" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.5, ease: "power3" });

    function onMove(e: MouseEvent) {
      setDotX(e.clientX);
      setDotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    }
    function onDown() {
      gsap.to(ring, { scale: 0.72, duration: 0.2 });
    }
    function onUp() {
      gsap.to(ring, { scale: 1, duration: 0.2 });
    }
    function onOver(e: MouseEvent) {
      const target = (e.target as HTMLElement).closest("[data-cursor]");
      if (!target) return;
      const mode = target.getAttribute("data-cursor");
      gsap.to(ring, { scale: mode === "scissor" ? 1.7 : 2, duration: 0.25 });
      if (glyphRef.current) glyphRef.current.textContent = mode === "scissor" ? "✂" : mode === "link" ? "→" : "";
    }
    function onOut(e: MouseEvent) {
      const target = (e.target as HTMLElement).closest("[data-cursor]");
      if (!target) return;
      gsap.to(ring, { scale: 1, duration: 0.25 });
      if (glyphRef.current) glyphRef.current.textContent = "";
    }

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] hidden md:block" aria-hidden>
      <div ref={dotRef} className="absolute left-0 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brass" />
      <div
        ref={ringRef}
        className="absolute left-0 top-0 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-brass/70 text-xs leading-none text-brass"
      >
        <span ref={glyphRef} />
      </div>
    </div>
  );
}
