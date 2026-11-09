import { readCampaignAttribution, type CampaignAttribution } from "./booking";

const storageKey = "avlys-campaign";

export function getCampaignAttribution(): CampaignAttribution {
  if (typeof window === "undefined") return {};
  const current = readCampaignAttribution(window.location.search);
  try {
    if (Object.keys(current).length) {
      window.sessionStorage.setItem(storageKey, new URLSearchParams(current).toString());
      return current;
    }
    return readCampaignAttribution(window.sessionStorage.getItem(storageKey) ?? "");
  } catch {
    // Booking must work even when browser storage is unavailable.
    return current;
  }
}
