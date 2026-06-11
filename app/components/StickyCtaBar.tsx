"use client";

import { useEffect, useState } from "react";
import BookCallCta from "./BookCallCta";

// Frosted floating bar per DESIGN-apple.md's floating-sticky-bar: appears
// after the visitor scrolls past the hero, hides near the contact section.
const StickyCtaBar = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const contact = document.getElementById("contact");
      const pastHero = window.scrollY > window.innerHeight * 0.9;
      const beforeContact = contact
        ? contact.getBoundingClientRect().top > window.innerHeight
        : true;
      setVisible(pastHero && beforeContact);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="border-t border-hairline bg-parchment/80 px-6 py-3 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4">
          <p className="type-caption hidden text-ink sm:block">
            30 minutes, engineers on the call, no deck.
          </p>
          <BookCallCta location="sticky_bar" className="!min-h-0 !py-2 !text-[15px]" />
        </div>
      </div>
    </div>
  );
};

export default StickyCtaBar;
