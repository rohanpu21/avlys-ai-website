export const siteConfig = {
  name: "Avlys AI",
  url: "https://avlysai.com",
  description:
    "Avlys AI builds custom software and integrates AI into the systems enterprises already run - ERP, CRM, and legacy applications. Fixed-scope pilots delivered in weeks by senior engineers across the US and India.",
  email: "sales@avlysai.com",
  phone: "+91 93377 09699",
  phoneHref: "+919337709699",
  // WhatsApp line for the "Book a strategy call" CTAs. Digits only, with the
  // country code and no "+", as wa.me requires.
  whatsappNumber: "919937730039",
  city: "Hyderabad",
  region: "Telangana",
  country: "IN",
  // Cal.com event link. Only used when whatsappNumber is empty: WhatsApp takes
  // precedence for every "Book a strategy call" CTA. While both are empty,
  // CTAs fall back to the contact form.
  bookingUrl: "",
  socialLinks: [
    "https://www.linkedin.com/company/avlys-ai/",
    "https://www.instagram.com/avlysai?igsh=azd6aTB5eHpxd3Jq",
  ],
  keywords: [
    "enterprise AI development company",
    "AI integration services",
    "custom software development company",
    "AI agent development services",
    "AI consulting for mid-sized companies",
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
