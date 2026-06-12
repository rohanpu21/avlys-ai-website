import aiAgentsForEnterpriseAutomation2026 from "./posts/ai-agents-for-enterprise-automation-2026";
import agenticAiVsChatbotsDifference from "./posts/agentic-ai-vs-chatbots-difference";
import customAiSoftwareVsOffTheShelfTools from "./posts/custom-ai-software-vs-off-the-shelf-tools";
import customWebsiteDevelopmentCostIndia2026 from "./posts/custom-website-development-cost-india-2026";
import highConvertingLandingPageElements from "./posts/high-converting-landing-page-elements";
import nextjsVsWordpressForSmallBusinessWebsites2026 from "./posts/nextjs-vs-wordpress-for-small-business-websites-2026";
import reduceCartAbandonmentWithAiAutomation from "./posts/reduce-cart-abandonment-with-ai-automation";
import shopifyVsCustomEcommerceDevelopment from "./posts/shopify-vs-custom-ecommerce-development";
import whatIsAnAiAgentGuideForBusinessOwners from "./posts/what-is-an-ai-agent-guide-for-business-owners";
import whatIsDeepTechAiSoftware from "./posts/what-is-deep-tech-ai-software";
import type { BlogPost } from "./types";

export type { BlogCategory, BlogFAQ, BlogPost, BlogSection } from "./types";

const allPosts: BlogPost[] = [
  nextjsVsWordpressForSmallBusinessWebsites2026,
  customWebsiteDevelopmentCostIndia2026,
  shopifyVsCustomEcommerceDevelopment,
  reduceCartAbandonmentWithAiAutomation,
  whatIsAnAiAgentGuideForBusinessOwners,
  agenticAiVsChatbotsDifference,
  whatIsDeepTechAiSoftware,
  customAiSoftwareVsOffTheShelfTools,
  highConvertingLandingPageElements,
  aiAgentsForEnterpriseAutomation2026,
];

export const blogPosts: BlogPost[] = [...allPosts].sort(
  (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
);

export const blogCategories = Array.from(new Set(blogPosts.map((post) => post.category)));

export const getBlogPost = (slug: string) => blogPosts.find((post) => post.slug === slug);

export const getRelatedPosts = (slug: string, limit = 3) => {
  const current = getBlogPost(slug);

  if (!current) {
    return [];
  }

  const sameCategory = blogPosts.filter(
    (post) => post.slug !== slug && post.category === current.category
  );

  const others = blogPosts.filter(
    (post) => post.slug !== slug && post.category !== current.category
  );

  return [...sameCategory, ...others].slice(0, limit);
};
