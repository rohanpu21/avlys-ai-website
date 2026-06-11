// Client brands strip. Names render in the homepage marquee with the
// "Deployed for" framing - only list companies Avlys has actually worked
// with and has permission to name. Logos can be added later via `logo`.
export type MarqueeBrand = {
  name: string;
  logo?: string;
};

export const clientBrands: MarqueeBrand[] = [
  // Populated from the real client list (mid-size Indian and US brands).
  // Empty array = the client strip does not render.
];

// Technologies Avlys builds with - factual, verifiable from the portfolio.
export const techStack: MarqueeBrand[] = [
  { name: "OpenAI" },
  { name: "Anthropic" },
  { name: "LangGraph" },
  { name: "Next.js" },
  { name: "React" },
  { name: "Node.js" },
  { name: "Python" },
  { name: "PostgreSQL" },
  { name: "Supabase" },
  { name: "AWS" },
  { name: "Vercel" },
  { name: "Stripe" },
  { name: "Twilio" },
  { name: "WhatsApp Business API" },
  { name: "n8n" },
  { name: "Webflow" },
  { name: "Shopify" },
];
