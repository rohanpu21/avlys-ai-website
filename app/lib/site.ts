export const siteConfig = {
  name: "Avlys AI",
  url: "https://avlysai.com",
  description:
    "Avlys AI is an AI-native product studio and enterprise engineering partner in India. We design, build, and evolve custom platforms, internal tools, and intelligent applications.",
  email: "sales@avlysai.com",
  phone: "+91 99377 30039",
  phoneHref: "+919937730039",
  // Dedicated chat channel, separate from scheduling.
  whatsappNumber: "919937730039",
  city: "Hyderabad",
  region: "Telangana",
  country: "IN",
  // Public HTTPS event URL. Hosted Cal.com events are embedded at /book.
  // Without it, /book offers a call request instead of a pretend calendar.
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL?.trim() ?? "",
  // Bump when /privacy text changes; shown on the page and used in the sitemap.
  privacyUpdated: "2026-11-11",
  socialLinks: [
    "https://www.linkedin.com/company/avlys-ai/",
    "https://www.instagram.com/avlysai?igsh=azd6aTB5eHpxd3Jq",
  ],
  keywords: [
    "AI-native product studio",
    "enterprise engineering partner",
    "custom software development company",
    "enterprise software development India",
    "AI agent development services",
    "AI consulting for enterprises",
    "AI automation services",
    "software integration and modernization",
  ],
};

export const absoluteUrl = (path = "/") =>
  new URL(path, siteConfig.url).toString();

export const whatsappUrl = (
  message = "Hi Avlys AI, I would like to discuss a software project."
) =>
  `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
