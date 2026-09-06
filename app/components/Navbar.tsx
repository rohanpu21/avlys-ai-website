"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import BookCallCta from "./BookCallCta";

const navLinks = [
  { label: "Services", href: "/services" },
  { label: "AI Training Data", href: "/data" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About Us", href: "/about" },
  { label: "Insights", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

// Global nav per DESIGN-apple.md: ultra-thin true-black bar, 12px desktop links, responsive mobile menu.
const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-50 bg-true-black text-on-dark">
      <nav className="mx-auto flex h-12 w-full max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          onClick={() => setMobileMenuOpen(false)}
          className="flex items-center gap-2.5 text-[14px] font-semibold tracking-tight transition-opacity hover:opacity-70"
        >
          <span className="relative block h-8 w-8 overflow-hidden rounded-md">
            <Image
              src="/avlys-logo-mark.png"
              alt="Avlys AI Logo"
              fill
              sizes="32px"
              className="object-contain"
              priority
            />
          </span>
          Avlys AI
        </Link>

        {/* Desktop nav links */}
        <div className="hidden items-center gap-5 lg:flex">
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

        <div className="flex items-center gap-3">
          <BookCallCta
            location="navbar"
            label="Book a call"
            className="!min-h-0 !px-4 !py-1.5 !text-[12px]"
          />

          {/* Mobile hamburger toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            className="flex h-11 w-11 items-center justify-center rounded-lg text-on-dark-muted transition-all active:scale-95 hover:text-on-dark lg:hidden focus-visible:outline-2"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {mobileMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="4" y1="7" x2="20" y2="7" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="17" x2="20" y2="17" />
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile drawer overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-0 top-12 bottom-0 z-40 bg-true-black/95 backdrop-blur-xl border-t border-white/10 px-6 py-8 lg:hidden animate-in fade-in duration-200">
          <div className="mx-auto flex h-full max-w-md flex-col justify-between">
            <div className="flex flex-col gap-5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-[20px] font-semibold text-on-dark tracking-tight transition-opacity hover:opacity-70"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="border-t border-white/10 pt-6">
              <p className="type-caption text-on-dark-muted">
                Hyderabad · Bengaluru, India · Working globally
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
