export const siteConfig = {
  name: "Avlys AI",
  url: "https://avlysai.com",
  description:
    "Avlys AI is a Hyderabad-based AI automation agency building AI calling agents, WhatsApp chatbots, customer support automation, lead qualification systems, and custom software for Indian and global businesses.",
  email: "official@avlysai.com",
  phone: "+91 93377 09699",
  phoneHref: "+919337709699",
  city: "Hyderabad",
  region: "Telangana",
  country: "IN",
  socialLinks: [
    "https://www.linkedin.com/company/avlys-ai/",
    "https://www.instagram.com/avlysai?igsh=azd6aTB5eHpxd3Jq",
  ],
  keywords: [
    "AI automation agency India",
    "AI automation agency Hyderabad",
    "AI calling agents",
    "voice AI agents India",
    "WhatsApp AI chatbot",
    "custom AI chatbots",
    "AI customer support automation",
    "lead qualification AI agents",
    "business automation India",
    "custom AI agents for business",
  ],
};

export const absoluteUrl = (path = "/") =>
  new URL(path, siteConfig.url).toString();
