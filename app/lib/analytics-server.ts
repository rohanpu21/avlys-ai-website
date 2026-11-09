// Server-side ingestion only; import this helper from route handlers, never UI.
const anonymousIdPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const projectTypes = new Set([
  "Custom software build",
  "AI agents / automation",
  "Integration / modernization",
  "Product discovery / technical planning",
  "Ongoing engineering and support",
  "Something else",
]);

/** Best-effort anonymous telemetry after persistence, independent of the response. */
export async function captureSavedLead(request: Request, projectType?: string) {
  try {
    const distinctId = request.headers.get("X-POSTHOG-DISTINCT-ID");
    // The client omits these headers when disabled or opted out. Never derive an
    // identity from a submitted email address or from other request information.
    if (!distinctId || !anonymousIdPattern.test(distinctId)) return;

    const token = (
      process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN ||
      process.env.NEXT_PUBLIC_POSTHOG_TOKEN
    )?.trim();
    if (!token || token === "ph_project_token") return;

    const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";
    const endpoint = new URL(`${host.replace(/\/+$/, "")}/i/v0/e`);
    if (endpoint.protocol !== "https:") return;

    const sessionId = request.headers.get("X-POSTHOG-SESSION-ID");
    await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: AbortSignal.timeout(2000),
      body: JSON.stringify({
        api_key: token,
        distinct_id: distinctId,
        event: "lead_saved",
        properties: {
          $process_person_profile: false,
          $is_identified: false,
          site: "avlys-ai",
          environment: process.env.NODE_ENV,
          $host: new URL(request.url).host,
          delivery_method: "website_form",
          ...(sessionId && anonymousIdPattern.test(sessionId) ? { $session_id: sessionId } : {}),
          ...(projectType && projectTypes.has(projectType) ? { project_type: projectType } : {}),
        },
      }),
    });
  } catch {
    // Analytics outages, timeouts and configuration errors must not affect leads.
  }
}
