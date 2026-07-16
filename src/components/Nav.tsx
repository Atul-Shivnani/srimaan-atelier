import MagneticButton from "./MagneticButton";
import { site } from "../data/content";

const links = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#stats", label: "Reach" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-5 md:px-12">
      <a href="#top" data-cursor="link" className="font-display text-lg tracking-wide text-canvas">
        Srimaan
      </a>
      <nav className="hidden items-center gap-8 font-mono text-xs uppercase tracking-[0.15em] text-bone md:flex">
        {links.map((l) => (
          <a key={l.href} href={l.href} data-cursor="link" className="transition-colors hover:text-brass">
            {l.label}
          </a>
        ))}
      </nav>
      <MagneticButton
        href={`tel:${site.phoneHref}`}
        className="rounded-full border border-brass/60 px-5 py-2 font-mono text-xs uppercase tracking-[0.15em] text-brass transition-colors hover:bg-brass hover:text-charcoal"
      >
        Call us
      </MagneticButton>
    </header>
  );
}
