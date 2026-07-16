import type { ReactNode } from "react";

interface BeatProps {
  progress: number;
  start: number;
  end: number;
  fade?: number;
  className?: string;
  children: ReactNode;
}

function computeOpacity(p: number, start: number, end: number, fade: number) {
  if (p < start - fade || p > end + fade) return 0;
  if (p < start) return (p - (start - fade)) / fade;
  if (p > end) return 1 - (p - end) / fade;
  return 1;
}

export default function Beat({ progress, start, end, fade = 0.07, className = "", children }: BeatProps) {
  const opacity = computeOpacity(progress, start, end, fade);
  const y = 30 * (1 - opacity);

  return (
    <div
      className={className}
      style={{
        opacity,
        transform: `translateY(${y}px)`,
        pointerEvents: opacity > 0.4 ? "auto" : "none",
      }}
    >
      {children}
    </div>
  );
}
