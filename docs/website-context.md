# Avlys AI Website Context and Change Log

Last updated: 2026-06-11

## Project overview
- Framework: Next.js App Router (Next 16.2.4) with React 19
- Styling: Tailwind CSS v4 + design tokens in [app/globals.css](../app/globals.css), per the Apple design system spec in [DESIGN-apple.md](./DESIGN-apple.md)
- Font: Inter (SF Pro substitute) via [app/layout.tsx](../app/layout.tsx)
- Motion: GSAP + @gsap/react ([app/components/Reveal.tsx](../app/components/Reveal.tsx), hero stagger in [app/components/Hero.tsx](../app/components/Hero.tsx)), CSS marquee in globals.css
- Analytics: PostHog ([instrumentation-client.ts](../instrumentation-client.ts)); events: cta_click, booking_opened, lead_submitted
- Lead capture: [app/components/LeadCaptureForm.tsx](../app/components/LeadCaptureForm.tsx) → [app/api/leads/route.ts](../app/api/leads/route.ts) → Supabase `lead_submissions` (validation + honeypot + per-instance rate limit)

## Positioning (2026-06 enterprise pivot)
Target: enterprise/mid-market buyers of custom software + AI integration, US + India.
Differentiators: fixed-scope/fixed-price pilots (4-6 weeks), integrate-into-existing-systems (not rip-and-replace), senior engineers on every call, full IP transfer, 90-day post-deploy tuning.

## Site structure
- `/` home: Hero → LogoMarquee → IntegrationTile → ServicesGrid → Process → CaseStudyStrip → Testimonials → WhyAvlys → FAQ → CallToAction (+ StickyCtaBar)
- `/services` + 5 service pages (data: [app/data/services.ts](../app/data/services.ts)): ai-integration, custom-software-development, ai-agents, ai-automation, ai-consulting-mid-market
- `/case-studies` (+20 detail pages, data: [app/data/caseStudies.ts](../app/data/caseStudies.ts), curated featured list), `/portfolio` (filterable)
- `/about`, `/contact`, `/blog` (+post pages, data: [app/data/blog.ts](../app/data/blog.ts) aggregating app/data/posts/*)
- 301 redirects from retired India-SMB service slugs in [next.config.ts](../next.config.ts)

## Conversion system
- Single CTA language: "Book a strategy call". [app/components/BookCallCta.tsx](../app/components/BookCallCta.tsx) opens a Cal.com embed when `siteConfig.bookingUrl` ([app/lib/site.ts](../app/lib/site.ts)) is set; falls back to /contact while empty.
- Secondary path: lead form (phone optional, project-type qualifier).
- Sticky CTA bar appears after the hero, hides near #contact.

## Content rules (anti-slop)
- No invented metrics; testimonials require name/role/company ([app/data/testimonials.ts](../app/data/testimonials.ts) - section hidden while empty)
- Client marquee ([app/data/marquee.ts](../app/data/marquee.ts)) lists only real clients with permission; tech strip is always on
- Case-study processes are per-delivery-type, not copy-pasted

## SEO state
- sitemap.ts uses honest lastModified constants - bump them when content changes
- robots.ts allows search + AI crawlers; public/llms.txt published
- Root opengraph-image.tsx (light brand card), per-case-study OG generators (dark schematic)
- KNOWN ISSUE (2026-06): only the homepage was indexed by Google with a stale snippet. Required actions: set up Google Search Console, submit sitemap, request indexing; create profiles on Clutch/GoodFirms/DesignRush/Crunchbase; Google Business Profile (Hyderabad)

## Pending owner inputs
- Cal.com event link → siteConfig.bookingUrl
- Real client list + permissions → marquee.ts clientBrands
- Real testimonials → testimonials.ts
- Case-study metrics + named clients → caseStudies.ts rewrite
- Founder name/photo/LinkedIn → /about
