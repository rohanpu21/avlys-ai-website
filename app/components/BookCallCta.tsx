"use client";

import Link from "next/link";
import posthog from "posthog-js";
import { siteConfig } from "../lib/site";

type BookCallCtaProps = {
  label?: string;
  variant?: "primary" | "ghost";
  location: string;
  className?: string;
};

// Only a configured HTTPS scheduler may be presented as instant booking.
const bookingUrl = (() => {
  try {
    const url = new URL(siteConfig.bookingUrl);
    return url.protocol === "https:" ? url.href : null;
  } catch {
    return null;
  }
})();

export default function BookCallCta({ label, variant = "primary", location, className = "" }: BookCallCtaProps) {
  const text = bookingUrl ? (label ?? "Book a strategy call") : "Request a call";
  const buttonClass = `${variant === "primary" ? "btn-pill-primary" : "btn-pill-ghost"} ${className}`;
  const trackClick = () => {
    posthog.capture("cta_click", { location, booking_enabled: Boolean(bookingUrl) });
    posthog.capture(bookingUrl ? "booking_opened" : "call_request_opened", { location });
  };
  return bookingUrl ? (
    <a href={bookingUrl} target="_blank" rel="noopener noreferrer" onClick={trackClick} className={buttonClass}>{text}</a>
  ) : (
    <Link href="/contact#project-form" onClick={trackClick} className={buttonClass}>{text}</Link>
  );
}
