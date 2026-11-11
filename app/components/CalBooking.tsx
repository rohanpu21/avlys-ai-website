"use client";

import Cal, { getCalApi, type EmbedEvent } from "@calcom/embed-react";
import Link from "next/link";
import posthog from "posthog-js";
import { useEffect, useRef, useState } from "react";
import { bookingOutcome, withCampaignAttribution, type BookingDestination, type CampaignAttribution } from "../lib/booking";
import { getCampaignAttribution } from "../lib/campaign-attribution";

const namespace = "avlys-discovery";

export default function CalBooking({ booking }: { booking: BookingDestination }) {
  const [attribution, setAttribution] = useState<CampaignAttribution | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "unavailable">("loading");
  const [outcome, setOutcome] = useState<"booking_confirmed" | "booking_requested" | null>(null);
  const seen = useRef(new Set<string>());

  useEffect(() => {
    let disposed = false;
    let removeListeners: (() => void) | undefined;
    const campaign = getCampaignAttribution();
    // Initialize the SDK and listeners before mounting the embedded calendar.
    if (!booking.calLink) return;
    const timeout = window.setTimeout(() => {
      if (!disposed) setStatus("unavailable");
    }, 15000);

    const onReady = () => {
      if (disposed) return;
      window.clearTimeout(timeout);
      setStatus("ready");
    };
    const onFailed = () => {
      if (disposed) return;
      window.clearTimeout(timeout);
      setStatus("unavailable");
    };
    const onBooked = async (event: EmbedEvent<"bookingSuccessfulV2">) => {
      if (disposed) return;
      const data = event.detail.data;
      const result = bookingOutcome(data);
      if (!result || !data.uid) return;
      setOutcome(result);
      // Hash the provider ID: never send booking titles, meeting URLs or attendee details.
      try {
        const digest = await window.crypto.subtle.digest("SHA-256", new TextEncoder().encode(data.uid));
        const id = Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
        if (disposed) return;
        const key = `${result}:${id}`;
        if (seen.current.has(key)) return;
        seen.current.add(key);
        try {
          if (window.sessionStorage.getItem(key)) return;
          window.sessionStorage.setItem(key, "1");
        } catch { /* In-memory deduplication still applies when storage is blocked. */ }
        posthog.capture(result, {
          provider: "cal.com",
          confirmation_source: "embed",
          event_type_id: data.eventTypeId,
          ...campaign,
        });
      } catch { /* Analytics must never prevent the booking confirmation from being shown. */ }
    };
    const onRescheduled = () => {
      if (!disposed) posthog.capture("booking_rescheduled", { provider: "cal.com" });
    };

    void getCalApi({ namespace }).then((cal) => {
      if (disposed) return;
      cal("on", { action: "linkReady", callback: onReady });
      cal("on", { action: "linkFailed", callback: onFailed });
      cal("on", { action: "bookingSuccessfulV2", callback: onBooked });
      cal("on", { action: "rescheduleBookingSuccessfulV2", callback: onRescheduled });
      cal("ui", { theme: "light", hideEventTypeDetails: false, layout: "month_view" });
      removeListeners = () => {
        cal("off", { action: "linkReady", callback: onReady });
        cal("off", { action: "linkFailed", callback: onFailed });
        cal("off", { action: "bookingSuccessfulV2", callback: onBooked });
        cal("off", { action: "rescheduleBookingSuccessfulV2", callback: onRescheduled });
      };
      setAttribution(campaign);
    }).catch(onFailed);

    return () => {
      disposed = true;
      window.clearTimeout(timeout);
      removeListeners?.();
    };
  }, [booking.calLink]);

  const directUrl = withCampaignAttribution(booking.url, attribution ?? {});

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 text-sm">
        <p className="text-ink-muted">Choose a time that works for you.</p>
        <a href={directUrl} target="_blank" rel="noopener noreferrer"
          onClick={(event) => {
            const campaign = getCampaignAttribution();
            event.currentTarget.href = withCampaignAttribution(booking.url, campaign);
            posthog.capture("booking_external_opened", { provider: booking.calLink ? "cal.com" : "external", ...campaign });
          }}
          className="inline-flex min-h-11 items-center font-medium text-primary">
          Open booking page <span aria-hidden="true" className="ml-2">↗</span>
        </a>
      </div>
      {outcome && (
        <p role="status" className="mb-5 rounded-2xl border border-primary/20 bg-primary/5 p-5 text-ink">
          {outcome === "booking_confirmed"
            ? "Your call is booked. Check your email for the invitation and meeting details."
            : "Your booking request was received. Check your email for the next step and confirmation."}
        </p>
      )}
      {booking.calLink ? (
        <>
          {status !== "ready" && (
            <p role="status" className="mb-4 rounded-2xl bg-parchment p-5 text-sm text-ink-muted">
              {status === "loading" ? "Loading available times…" : "The calendar is taking longer to load. Open the booking page above, or send us your project details below."}
            </p>
          )}
          {attribution && (
            <Cal namespace={namespace} calLink={booking.calLink}
              calOrigin="https://app.cal.com"
              config={{ layout: "month_view", theme: "light", ...booking.calConfig, ...attribution }}
              className="min-h-[650px] w-full overflow-auto rounded-2xl" />
          )}
          <noscript><p>Use the booking link above to choose a time.</p></noscript>
        </>
      ) : (
        <p className="rounded-2xl bg-parchment p-6 text-ink-muted">Use the booking link above to see available times.</p>
      )}
      <p className="mt-5 text-sm text-ink-muted">
        Prefer to write first? <Link href="/contact#project-form" className="text-primary underline underline-offset-4">Send your project details</Link>.
      </p>
    </div>
  );
}
