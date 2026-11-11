type MarketingConversion = "avlys_lead_submitted" | "avlys_booking_confirmed";

const openAIEvents = {
  avlys_lead_submitted: "lead_created",
  avlys_booking_confirmed: "appointment_scheduled",
} as const;

type PixelCommand =
  | ["consent", boolean]
  | ["init", { pixelId: string }]
  | ["measure", (typeof openAIEvents)[MarketingConversion], { type: "customer_action" }, { opt_out: true }];

type Pixel = ((...command: PixelCommand) => void) & { q?: PixelCommand[] };
type MarketingWindow = Window & { dataLayer?: unknown; oaiq?: Pixel };

let pixelInitialized = false;
let pixelAllowed = false;

export function setOpenAIMeasurementConsent(pixelId: string, allowed: boolean) {
  if (pixelInitialized && pixelAllowed === allowed) return;
  pixelAllowed = allowed;
  const target = window as MarketingWindow;

  if (pixelInitialized) {
    target.oaiq?.("consent", allowed);
    return;
  }
  if (!allowed || !pixelId) return;

  if (!target.oaiq) {
    const commands: PixelCommand[] = [];
    target.oaiq = Object.assign((...command: PixelCommand) => { commands.push(command); }, { q: commands });
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://bzrcdn.openai.com/sdk/oaiq.min.js";
    document.head.append(script);
  }

  target.oaiq("consent", true);
  target.oaiq("init", { pixelId });
  pixelInitialized = true;
}

/** Queue conversion events without including visitor or inquiry details. */
export function trackMarketingConversion(event: MarketingConversion) {
  if (typeof window === "undefined") return;
  if (event !== "avlys_lead_submitted" && event !== "avlys_booking_confirmed") return;

  const target = window as MarketingWindow;
  try {
    if (target.dataLayer === undefined) target.dataLayer = [];
    if (Array.isArray(target.dataLayer)) target.dataLayer.push({ event });
  } catch {
    // A blocked or unavailable tag manager must not affect the lead journey.
  }

  if (pixelAllowed && pixelInitialized) {
    try {
      target.oaiq?.("measure", openAIEvents[event], { type: "customer_action" }, { opt_out: true });
    } catch {
      // Measurement must not affect a successful booking or enquiry.
    }
  }
}
