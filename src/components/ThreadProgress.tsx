import { useEffect, useRef, useState } from "react";

interface Marker {
  id: string;
  label: string;
  frac: number;
}

export default function ThreadProgress() {
  const fillRef = useRef<HTMLDivElement>(null);
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [passed, setPassed] = useState<Record<string, boolean>>({});

  useEffect(() => {
    function computeMarkers() {
      const els = Array.from(document.querySelectorAll<HTMLElement>("[data-scene]"));
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      setMarkers(
        els.map((el) => {
          const docTop = el.getBoundingClientRect().top + window.scrollY;
          return {
            id: el.dataset.scene as string,
            label: el.dataset.sceneLabel || "",
            frac: docTop / docHeight,
          };
        }),
      );
    }
    computeMarkers();
    window.addEventListener("resize", computeMarkers);
    const t = window.setTimeout(computeMarkers, 500);
    return () => {
      window.removeEventListener("resize", computeMarkers);
      window.clearTimeout(t);
    };
  }, []);

  useEffect(() => {
    let raf = 0;
    function onScroll() {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? window.scrollY / docHeight : 0;
        if (fillRef.current) {
          fillRef.current.style.height = `${Math.min(100, progress * 100)}%`;
        }
        setPassed((prev) => {
          let changed = false;
          const next = { ...prev };
          markers.forEach((m) => {
            const isPassed = progress >= m.frac;
            if (next[m.id] !== isPassed) {
              next[m.id] = isPassed;
              changed = true;
            }
          });
          return changed ? next : prev;
        });
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [markers]);

  return (
    <div className="pointer-events-none fixed left-5 top-0 bottom-0 z-40 hidden w-6 md:flex" aria-hidden>
      <div
        className="relative mx-auto w-px"
        style={{
          background:
            "repeating-linear-gradient(to bottom, var(--color-bone) 0 5px, transparent 5px 11px)",
          opacity: 0.3,
        }}
      >
        <div
          ref={fillRef}
          className="absolute left-0 top-0 w-px"
          style={{
            background:
              "repeating-linear-gradient(to bottom, var(--color-brass) 0 5px, transparent 5px 11px)",
            height: "0%",
          }}
        />
        {markers.map((m) => (
          <div
            key={m.id}
            className={`absolute -left-[7px] flex h-[15px] w-[15px] -translate-y-1/2 items-center justify-center rounded-full border text-[8px] transition-all duration-500 ${
              passed[m.id]
                ? "scale-100 border-brass bg-brass text-charcoal shadow-[0_0_10px_rgba(201,162,39,0.7)]"
                : "scale-90 border-bone/40 bg-charcoal text-bone/50"
            }`}
            style={{ top: `${m.frac * 100}%` }}
            title={m.label}
          >
            ✂
          </div>
        ))}
      </div>
    </div>
  );
}
