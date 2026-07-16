interface VersionSwitchProps {
  href: string;
  label: string;
}

export default function VersionSwitch({ href, label }: VersionSwitchProps) {
  return (
    <a
      href={href}
      data-cursor="link"
      className="fixed bottom-6 right-6 z-50 rounded-full border border-brass/50 bg-charcoal/80 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.15em] text-brass backdrop-blur transition-colors hover:bg-brass hover:text-charcoal"
    >
      {label}
    </a>
  );
}
