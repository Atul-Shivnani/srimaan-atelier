import { useEffect, useState } from "react";
import type { RefObject } from "react";
import { ScrollTrigger } from "./gsap";

// Rounding step for reported progress. Card fade windows are ~0.07 wide, so
// snapping to the nearest 0.2% (500 steps over the whole scroll) is visually
// seamless while letting React bail out of re-rendering on unchanged state
// instead of re-rendering the whole beat tree on every scroll frame.
const STEP = 500;

export function useSceneProgress(sectionRef: RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!sectionRef.current) return;

    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => setProgress(Math.round(self.progress * STEP) / STEP),
    });

    return () => st.kill();
  }, [sectionRef]);

  return progress;
}
