import { site } from "../data/content";

export default function Footer() {
  return (
    <footer className="relative border-t border-bone/10 bg-charcoal px-6 py-10 md:px-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 text-sm text-bone/60 md:flex-row md:items-center md:justify-between">
        <p className="font-display text-lg text-canvas">Srimaan</p>
        <p>{site.address}</p>
        <p className="font-mono text-xs">
          © {new Date().getFullYear()} Srimaan Uniform. Authorized Mafatlal &amp; Raymond distributor.
        </p>
      </div>
    </footer>
  );
}
