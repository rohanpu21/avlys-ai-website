import Link from "next/link";

const navLinks = [
  { label: "Process", href: "#process" },
  { label: "Solutions", href: "#solutions" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Blog", href: "/blog" },
];

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border-subtle)] bg-[var(--background)]/95 backdrop-blur">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="font-mono text-sm uppercase tracking-[0.2em] transition-opacity hover:opacity-50">
          Avlys AI
        </Link>
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-[var(--muted)] transition-opacity hover:opacity-50"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="#contact"
            className="border border-[var(--border-strong)] px-4 py-2 font-mono text-xs uppercase tracking-[0.18em] transition-colors hover:bg-[var(--surface-hover)]"
          >
            Book Strategy Call
          </a>
        </div>
        <a
          href="#contact"
          className="border border-[var(--border-strong)] px-3 py-2 font-mono text-xs uppercase tracking-[0.18em] md:hidden"
        >
          Book Call
        </a>
      </nav>
    </header>
  );
};

export default Navbar;
