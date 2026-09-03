"use client";

import Link from "next/link";
import posthog from "posthog-js";
import { useEffect } from "react";
import { siteConfig, whatsappUrl } from "../lib/site";

type BookCallCtaProps = {
  label?: string;
  variant?: "primary" | "ghost";
  location: string;
  className?: string;
};

const calLinkPath = siteConfig.bookingUrl.replace(/^https?:\/\/cal\.com\//, "");

const BookCallCta = ({
  label = "Book a strategy call",
  variant = "primary",
  location,
  className = "",
}: BookCallCtaProps) => {
  const hasWhatsapp = Boolean(siteConfig.whatsappNumber);
  const hasBooking = !hasWhatsapp && Boolean(siteConfig.bookingUrl);

  useEffect(() => {
    if (!hasBooking) return;
    (async () => {
      const { getCalApi } = await import("@calcom/embed-react");
      const cal = await getCalApi();
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
    })();
  }, [hasBooking]);

  const buttonClass = `${variant === "primary" ? "btn-pill-primary" : "btn-pill-ghost"} ${className}`;

  const trackClick = () => {
    posthog.capture("cta_click", {
      location,
      booking_enabled: hasBooking,
      whatsapp_enabled: hasWhatsapp,
    });
    if (hasWhatsapp) {
      posthog.capture("whatsapp_opened", { location });
    }
    if (hasBooking) {
      posthog.capture("booking_opened", { location });
    }
  };

  if (hasWhatsapp) {
    return (
      <a
        href={whatsappUrl()}
        target="_blank"
        rel="noopener noreferrer"
        onClick={trackClick}
        className={buttonClass}
      >
        {label}
      </a>
    );
  }

  if (hasBooking) {
    return (
      <button
        type="button"
        data-cal-link={calLinkPath}
        onClick={trackClick}
        className={buttonClass}
      >
        {label}
      </button>
    );
  }

  return (
    <Link href="/contact" onClick={trackClick} className={buttonClass}>
      {label}
    </Link>
  );
};

export default BookCallCta;
