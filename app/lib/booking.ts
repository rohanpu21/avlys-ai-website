export type BookingDestination = {
  url: string;
  calLink: string | null;
  calConfig: Record<string, string>;
};

export const campaignKeys = [
  "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term",
] as const;
export type CampaignAttribution = Partial<Record<(typeof campaignKeys)[number], string>>;

/** Only public HTTPS destinations are suitable for the booking CTA. */
export function getBookingDestination(value: string): BookingDestination | null {
  try {
    const url = new URL(value.trim());
    if (url.protocol !== "https:" || url.username || url.password) return null;
    url.hash = "";
    const isCal = ["cal.com", "www.cal.com", "app.cal.com"].includes(url.hostname);
    const path = url.pathname.replace(/^\/+|\/+$/g, "");
    if (isCal && path.split("/").length < 2) return null;
    return {
      url: url.href,
      calLink: isCal ? path : null,
      calConfig: isCal ? Object.fromEntries(url.searchParams) : {},
    };
  } catch {
    return null;
  }
}

/** Forward campaign labels only, never arbitrary query parameters or form data. */
export function readCampaignAttribution(search: string): CampaignAttribution {
  const params = new URLSearchParams(search);
  const attribution: CampaignAttribution = {};
  for (const key of campaignKeys) {
    const value = params.get(key)?.trim();
    if (value && /^[a-zA-Z0-9._~ -]{1,120}$/.test(value)) attribution[key] = value;
  }
  return attribution;
}

export function withCampaignAttribution(url: string, attribution: CampaignAttribution) {
  const destination = new URL(url);
  for (const key of campaignKeys) {
    if (attribution[key]) destination.searchParams.set(key, attribution[key]);
  }
  return destination.href;
}

export function bookingOutcome(data: { uid?: string; status?: string; paymentRequired?: boolean }) {
  if (!data.uid) return null;
  const status = data.status?.toUpperCase();
  if (status === "ACCEPTED" && data.paymentRequired === false) {
    return "booking_confirmed" as const;
  }
  return status === "PENDING" || (status === "ACCEPTED" && data.paymentRequired === true)
    ? "booking_requested" as const : null;
}
