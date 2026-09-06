export const siteConfig = {
  name: "Avlys AI",
  url: "https://avlysai.com",
  description:
    "Avlys AI is a founder-led AI-native custom software development partner for enterprises, building intelligent systems and automation for teams in India and globally.",
  email: "sales@avlysai.com",
  phone: "+91 99377 30039",
  phoneHref: "+919937730039",
  // Dedicated chat channel, separate from scheduling.
  whatsappNumber: "919937730039",
  city: "Hyderabad",
  region: "Telangana",
  country: "IN",
  // Public HTTPS calendar URL (Cal.com, Calendly, or another scheduler).
  // Without it, CTAs honestly offer a call request via the contact form.
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL?.trim() ?? "",
  socialLinks: [
    "https://www.linkedin.com/company/avlys-ai/",
    "https://www.instagram.com/avlysai?igsh=azd6aTB5eHpxd3Jq",
  ],
  keywords: [
    "enterprise AI development company",
    "AI integration services",
    "custom software development company",
    "AI agent development services",
    "AI consulting for enterprises",
    "integrate AI into existing software",
    "AI automation services",
    "custom software development India USA",
  ],
};

export const absoluteUrl = (path = "/") =>
  new URL(path, siteConfig.url).toString();

export const whatsappUrl = (
  message = "Hi Avlys AI, I would like to book a strategy call."
) =>
  `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
