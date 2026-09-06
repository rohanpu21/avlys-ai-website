import type { MetadataRoute } from "next";
import { blogPosts } from "./data/blog";
import { caseStudies } from "./data/caseStudies";
import { servicePages } from "./data/services";
import { absoluteUrl } from "./lib/site";

// Honest lastModified dates: bump these when the corresponding content
// actually changes (a `new Date()` on every build devalues the signal).
const SITE_REDESIGN_DATE = new Date("2026-09-06");
const CASE_STUDIES_UPDATED = new Date("2026-09-06");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: absoluteUrl("/"),
      lastModified: SITE_REDESIGN_DATE,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/services"),
      lastModified: SITE_REDESIGN_DATE,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/data"),
      lastModified: SITE_REDESIGN_DATE,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: absoluteUrl("/case-studies"),
      lastModified: CASE_STUDIES_UPDATED,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/portfolio"),
      lastModified: CASE_STUDIES_UPDATED,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/about"),
      lastModified: SITE_REDESIGN_DATE,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: absoluteUrl("/contact"),
      lastModified: SITE_REDESIGN_DATE,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/blog"),
      lastModified: SITE_REDESIGN_DATE,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...blogPosts.map((post) => ({
      url: absoluteUrl(`/blog/${post.slug}`),
      lastModified: new Date(post.updatedDate ?? post.publishedDate),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
    ...servicePages.map((service) => ({
      url: absoluteUrl(`/services/${service.slug}`),
      lastModified: SITE_REDESIGN_DATE,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
    ...caseStudies.map((caseStudy) => ({
      url: absoluteUrl(`/case-studies/${caseStudy.slug}`),
      lastModified: CASE_STUDIES_UPDATED,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
