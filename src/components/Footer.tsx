import { site } from "../data/content";

const experiences = [
  { href: "/", label: "Classic cut" },
  { href: "/v2", label: "Continuous cut" },
  { href: "/locations", label: "Where we are" },
  { href: "/locations-v2", label: "Where we are · video" },
];

export default function Footer() {
  const currentPath = typeof window !== "undefined" ? window.location.pathname.replace(/\/+$/, "") || "/" : "/";

  return (
    <footer className="relative border-t border-bone/10 bg-charcoal px-6 py-10 md:px-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 md:gap-4">
        <nav className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.15em] text-bone/50">
          {experiences.map((e) => (
            <a
              key={e.href}
              href={e.href}
              data-cursor="link"
              className={`transition-colors hover:text-brass ${currentPath === e.href ? "text-brass" : ""}`}
            >
              {e.label}
            </a>
          ))}
        </nav>
        <div className="flex flex-col gap-4 text-sm text-bone/60 md:flex-row md:items-center md:justify-between">
          <p className="font-display text-lg text-canvas">Srimaan</p>
          <p>{site.address}</p>
          <p className="font-mono text-xs">
            © {new Date().getFullYear()} Srimaan Uniform. Authorized Mafatlal &amp; Raymond distributor.
          </p>
        </div>
      </div>
    </footer>
  );
}
