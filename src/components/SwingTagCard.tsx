import type { ReactNode } from "react";

interface SwingTagCardProps {
  eyebrow?: string;
  rotate?: number;
  className?: string;
  children: ReactNode;
}

export default function SwingTagCard({ eyebrow, rotate = -2, className = "", children }: SwingTagCardProps) {
  return (
    <div
      className={`relative rounded-2xl border border-dashed border-charcoal/20 bg-canvas p-6 text-charcoal shadow-[0_25px_50px_rgba(0,0,0,0.4)] md:p-7 ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <span className="absolute -top-2.5 left-7 h-5 w-5 rounded-full border-2 border-charcoal/25 bg-charcoal-deep" />
      {eyebrow && (
        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-maroon">{eyebrow}</p>
      )}
      {children}
    </div>
  );
}
