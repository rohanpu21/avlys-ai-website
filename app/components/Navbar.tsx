import Link from "next/link";
import BookCallCta from "./BookCallCta";

const navLinks = [
  { label: "Services", href: "/services" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

// Global nav per DESIGN-apple.md: ultra-thin true-black bar, 12px links.
const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 bg-true-black text-on-dark">
      <nav className="mx-auto flex h-11 w-full max-w-5xl items-center justify-between px-6">
        <Link
          href="/"
          className="text-[14px] font-semibold tracking-tight transition-opacity hover:opacity-70"
        >
          Avlys AI
        </Link>
        <div className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[12px] text-on-dark-muted transition-colors hover:text-on-dark"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <BookCallCta
          location="navbar"
          label="Book a call"
          className="!min-h-0 !px-4 !py-1.5 !text-[12px]"
        />
      </nav>
    </header>
  );
};

export default Navbar;
