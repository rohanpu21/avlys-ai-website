import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  // Hides the floating Next.js dev-tools badge. It never shipped to production
  // builds; this just keeps local previews clean.
  devIndicators: false,
  async redirects() {
    // Permanent redirects from the retired India-SMB service pages to the
    // enterprise service pages (also resolves the old homepage keyword
    // cannibalization with /services/ai-automation-agency-india).
    return [
      {
        source: "/services/ai-automation-agency-india",
        destination: "/services/ai-automation",
        permanent: true,
      },
      {
        source: "/services/ai-calling-agents",
        destination: "/services/ai-agents",
        permanent: true,
      },
      {
        source: "/services/custom-ai-chatbot-development",
        destination: "/services/ai-agents",
        permanent: true,
      },
      {
        source: "/services/lead-qualification-ai-agents",
        destination: "/services/ai-agents",
        permanent: true,
      },
      {
        source: "/services/whatsapp-ai-chatbots",
        destination: "/services/ai-automation",
        permanent: true,
      },
      {
        source: "/services/ai-customer-support-automation",
        destination: "/services/ai-automation",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
