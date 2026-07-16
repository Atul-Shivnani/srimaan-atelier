import { useRef } from "react";
import type { ReactNode, MouseEvent, ElementType } from "react";
import { gsap } from "../lib/gsap";

interface MagneticButtonProps {
  as?: ElementType;
  href?: string;
  onClick?: () => void;
  className?: string;
  children: ReactNode;
  cursor?: string;
}

export default function MagneticButton({
  as: Comp = "a",
  href,
  onClick,
  className = "",
  children,
  cursor = "link",
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);

  function onMove(e: MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(el, { x: x * 0.35, y: y * 0.35, duration: 0.4, ease: "power3.out" });
  }
  function onLeave() {
    const el = ref.current;
    if (!el) return;
    gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
  }

  return (
    <Comp
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      data-cursor={cursor}
      className={className}
    >
      {children}
    </Comp>
  );
}
