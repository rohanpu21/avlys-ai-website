"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { setOpenAIMeasurementConsent } from "../lib/marketing-events";

const preferenceKey = "avlys-chatgpt-ads-measurement";
const preferenceChanged = "avlys-chatgpt-ads-measurement-changed";
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

export default function OpenAIMeasurement({ pixelId }: { pixelId: string }) {
  const preference = useSyncExternalStore(subscribe, getPreference, () => null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    setOpenAIMeasurementConsent(pixelId, preference === "allow");
  }, [pixelId, preference]);

  function choose(next: Preference) {
    try {
      window.localStorage.setItem(preferenceKey, next);
      sessionPreference = null;
    } catch {
      // Use the preference for this visit if browser storage is unavailable.
      sessionPreference = next;
    }
    setOpenAIMeasurementConsent(pixelId, next === "allow");
    window.dispatchEvent(new Event(preferenceChanged));
    setEditing(false);
  }

  if (preference && !editing) {
    return (
      <button type="button" onClick={() => setEditing(true)} className="fixed bottom-3 left-3 z-50 rounded-md border border-hairline bg-canvas px-3 py-2 text-xs text-ink shadow-sm">
        Ad measurement settings
      </button>
    );
  }

  return (
    <section aria-label="ChatGPT ad measurement" className="fixed inset-x-3 bottom-3 z-50 max-w-sm rounded-xl border border-hairline bg-canvas p-4 text-sm text-ink shadow-lg">
      <p className="font-semibold">ChatGPT ad measurement</p>
      <p className="mt-1 text-ink-muted">
        Allow OpenAI to use cookies and hashed contact details, such as an email address or phone number, to measure whether its ads lead to enquiries or bookings?
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button type="button" onClick={() => choose("allow")} className="rounded-md border border-hairline px-3 py-2 font-medium">Allow</button>
        <button type="button" onClick={() => choose("decline")} className="rounded-md border border-hairline px-3 py-2 font-medium">Decline</button>
      </div>
    </section>
  );
}
