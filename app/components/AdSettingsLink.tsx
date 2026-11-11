"use client";

import { openSettingsEvent } from "./AdMeasurement";

// Footer entry point for changing the ad-measurement choice at any time.
export default function AdSettingsLink() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(openSettingsEvent))}
      className="text-left transition-opacity hover:opacity-60"
    >
      Ad measurement settings
    </button>
  );
}
