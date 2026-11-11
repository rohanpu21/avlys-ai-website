// Meta Pixel wrapper. Nothing loads until the visitor allows ad measurement,
// and no visitor or enquiry details (names, emails, phones) are ever sent.

type MarketingConversion = "avlys_lead_submitted" | "avlys_booking_confirmed";

const metaEvents = {
  avlys_lead_submitted: "Lead",
  avlys_booking_confirmed: "Schedule",
} as const;

type Fbq = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[];
  push: Fbq;
  loaded: boolean;
  version: string;
};
type MarketingWindow = Window & { dataLayer?: unknown; fbq?: Fbq; _fbq?: Fbq };

let pixelInitialized = false;
let pixelAllowed = false;

// Standard Meta loader stub: queues calls until fbevents.js arrives.
function installFbq(target: MarketingWindow) {
  if (target.fbq) return target.fbq;
  const fbq = function (...args: unknown[]) {
    if (fbq.callMethod) fbq.callMethod(...args);
    else fbq.queue.push(args);
  } as Fbq;
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.queue = [];
  target.fbq = fbq;
  target._fbq = fbq;

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.append(script);
  return fbq;
}

export function setMetaMeasurementConsent(pixelId: string, allowed: boolean) {
  if (pixelInitialized && pixelAllowed === allowed) return;
  pixelAllowed = allowed;
  const target = window as MarketingWindow;

  if (pixelInitialized) {
    target.fbq?.("consent", allowed ? "grant" : "revoke");
    return;
  }
  if (!allowed || !pixelId) return;

  const fbq = installFbq(target);
  fbq("consent", "grant");
  // Stop the pixel from scanning the page (form fields, buttons, metadata) on
  // its own; we only send the explicit events below. Automatic Advanced
  // Matching must also stay off for this dataset in Meta Events Manager.
  fbq("set", "autoConfig", false, pixelId);
  // Empty advanced-matching object: no hashed email or phone is ever sent.
  fbq("init", pixelId, {});
  fbq("track", "PageView");
  pixelInitialized = true;
}

/** Client-side navigations in Next.js do not reload the page, so report them. */
export function trackMetaPageView() {
  if (!pixelAllowed || !pixelInitialized) return;
  try {
    (window as MarketingWindow).fbq?.("track", "PageView");
  } catch {
    // Measurement must never affect navigation.
  }
}

/** Send a conversion without any visitor or enquiry details. */
export function trackMarketingConversion(event: MarketingConversion) {
  if (typeof window === "undefined") return;
  if (!(event in metaEvents)) return;

  const target = window as MarketingWindow;
  try {
    if (target.dataLayer === undefined) target.dataLayer = [];
    if (Array.isArray(target.dataLayer)) target.dataLayer.push({ event });
  } catch {
    // A blocked or unavailable tag manager must not affect the lead journey.
  }

  if (pixelAllowed && pixelInitialized) {
    try {
      target.fbq?.("track", metaEvents[event]);
    } catch {
      // Measurement must not affect a successful booking or enquiry.
    }
  }
}
