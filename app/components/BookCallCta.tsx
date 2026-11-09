"use client";

import Link from "next/link";
import posthog from "posthog-js";
import { siteConfig } from "../lib/site";
import { getBookingDestination } from "../lib/booking";
import { getCampaignAttribution } from "../lib/campaign-attribution";

type BookCallCtaProps = {
  label?: string;
  variant?: "primary" | "ghost";
  location: string;
  className?: string;
};

// Only a configured HTTPS scheduler may be presented as instant booking.
const booking = getBookingDestination(siteConfig.bookingUrl);

export default function BookCallCta({ label, variant = "primary", location, className = "" }: BookCallCtaProps) {
  const text = booking ? (label ?? "Book a discovery call") : "Request a call";
  const buttonClass = `${variant === "primary" ? "btn-pill-primary" : "btn-pill-ghost"} ${className}`;
  const trackClick = () => {
    const attribution = getCampaignAttribution();
    posthog.capture("cta_click", { location, booking_enabled: Boolean(booking), ...attribution });
    posthog.capture(booking ? "booking_opened" : "call_request_opened", { location, ...attribution });
  };
  return <Link href="/book" onClick={trackClick} className={buttonClass}>{text}</Link>;
}
