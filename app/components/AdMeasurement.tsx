"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { setMetaMeasurementConsent, trackMetaPageView } from "../lib/marketing-events";

const preferenceKey = "avlys-ad-measurement";
const preferenceChanged = "avlys-ad-measurement-changed";
// Dispatched by the footer's "Ad measurement settings" link to reopen the notice.
export const openSettingsEvent = "avlys-ad-measurement-open";
type Preference = "allow" | "decline";
let sessionPreference: Preference | null = null;

function getPreference(): Preference | null {
  if (sessionPreference) return sessionPreference;
  try {
    const stored = window.localStorage.getItem(preferenceKey);
    return stored === "allow" || stored === "decline" ? stored : null;
  } catch {
    return null;
  }
}

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(preferenceChanged, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(preferenceChanged, onChange);
  };
}

export default function AdMeasurement({ pixelId }: { pixelId: string }) {
  const preference = useSyncExternalStore(subscribe, getPreference, () => null);
  const [editing, setEditing] = useState(false);
  const pathname = usePathname();
  const firstPath = useRef(true);

  useEffect(() => {
    setMetaMeasurementConsent(pixelId, preference === "allow");
  }, [pixelId, preference]);

  useEffect(() => {
    const open = () => setEditing(true);
    window.addEventListener(openSettingsEvent, open);
    return () => window.removeEventListener(openSettingsEvent, open);
  }, []);

  // The initial PageView is sent on init; later route changes are sent here.
  useEffect(() => {
    if (firstPath.current) {
      firstPath.current = false;
      return;
    }
    trackMetaPageView();
  }, [pathname]);

  function choose(next: Preference) {
    try {
      window.localStorage.setItem(preferenceKey, next);
      sessionPreference = null;
    } catch {
      // Use the preference for this visit if browser storage is unavailable.
      sessionPreference = next;
    }
    setMetaMeasurementConsent(pixelId, next === "allow");
    window.dispatchEvent(new Event(preferenceChanged));
    setEditing(false);
  }

  // Once a choice is made, the notice stays hidden; the footer link reopens it.
  if (preference && !editing) return null;

  // A slim bottom bar on phones so it doesn't hide the page (ad visitors land on /book);
  // a small card from sm up. Same opt-in choice and disclosure as /privacy#cookies.
  return (
    <section
      aria-label="Ad measurement"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-hairline bg-canvas px-4 py-3 text-ink sm:inset-x-auto sm:bottom-3 sm:left-3 sm:max-w-md sm:rounded-[18px] sm:border"
    >
      <p className="text-[13px] leading-snug text-ink-muted">
        Can Meta (Facebook, Instagram) measure our ads here? This sets cookies and sends hashed (scrambled) contact details you type on this site.{" "}
        <Link href="/privacy#cookies" className="text-primary underline">Privacy Policy</Link>
      </p>
      <div className="mt-2 flex gap-2">
        <button type="button" onClick={() => choose("allow")} className="btn-pill-primary min-h-11 px-5 text-sm">Allow</button>
        <button type="button" onClick={() => choose("decline")} className="min-h-11 rounded-full border border-hairline px-5 text-sm font-medium">Decline</button>
      </div>
    </section>
  );
}
