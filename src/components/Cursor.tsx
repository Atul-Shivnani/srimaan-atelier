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

    const lastPoint = { x: -1, y: -1 };
    let activeMode: string | null = null;

    // Hit-tests whatever is actually under the cursor right now, rather than
    // relying on mouseover/mouseout bubbling (which fires on every child
    // boundary crossing and re-fires when data-cursor is toggled by scroll
    // instead of by mouse movement).
    function refreshCursorMode() {
      if (lastPoint.x < 0) return;
      const el = document.elementFromPoint(lastPoint.x, lastPoint.y) as HTMLElement | null;
      const target = el?.closest("[data-cursor]");
      const mode = target?.getAttribute("data-cursor") ?? null;
      if (mode === activeMode) return;
      activeMode = mode;

      gsap.to(ring, { scale: mode === "scissor" ? 1.7 : mode === "link" ? 2 : 1, duration: 0.25 });
      if (glyphRef.current) glyphRef.current.textContent = mode === "scissor" ? "✂" : mode === "link" ? "→" : "";
    }

    function onMove(e: MouseEvent) {
      lastPoint.x = e.clientX;
      lastPoint.y = e.clientY;
      setDotX(e.clientX);
      setDotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
      refreshCursorMode();
    }
    function onDown() {
      gsap.to(ring, { scale: 0.72, duration: 0.2 });
    }
    function onUp() {
      refreshCursorMode();
      gsap.to(ring, { scale: activeMode === "scissor" ? 1.7 : activeMode === "link" ? 2 : 1, duration: 0.2 });
    }
    let scrollRaf = 0;
    function onScroll() {
      cancelAnimationFrame(scrollRaf);
      scrollRaf = requestAnimationFrame(refreshCursorMode);
    }

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(scrollRaf);
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
