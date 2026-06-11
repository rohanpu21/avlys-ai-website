export const siteConfig = {
  name: "Avlys AI",
  url: "https://avlysai.com",
  description:
    "Avlys AI builds custom software and integrates AI into the systems enterprises already run - ERP, CRM, and legacy applications. Fixed-scope pilots delivered in weeks by senior engineers across the US and India.",
  email: "official@avlysai.com",
  phone: "+91 93377 09699",
  phoneHref: "+919337709699",
  city: "Hyderabad",
  region: "Telangana",
  country: "IN",
  // Cal.com event link. When set, every "Book a strategy call" CTA opens the
  // embedded scheduler; while empty, CTAs fall back to the contact form.
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
