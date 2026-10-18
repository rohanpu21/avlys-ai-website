import posthog from "posthog-js";

// Keep the original variable working for existing deployments.
const posthogToken = (
  process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN ||
  process.env.NEXT_PUBLIC_POSTHOG_TOKEN
)?.trim();
const posthogHost =
  process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";

if (
  typeof window !== "undefined" &&
  posthogToken &&
  posthogToken !== "ph_project_token"
) {
  posthog.init(posthogToken, {
    api_host: posthogHost,
    defaults: "2026-01-30",
    // Next.js navigation uses the History API after the first page load.
    capture_pageview: "history_change",
    capture_pageleave: true,
    person_profiles: "identified_only",
    autocapture: {
      dom_event_allowlist: ["click"],
      element_allowlist: ["a", "button"],
      capture_copied_text: false,
    },
    // Form values and mailto attributes can contain private project details.
    mask_all_text: true,
    mask_all_element_attributes: true,
    disable_session_recording: true,
    loaded: (client) => {
      client.register({
        site: "avlys-ai",
        environment: process.env.NODE_ENV,
      });
    },
  });
}
