# Avlys AI Website Context and Change Log

Last updated: 2026-04-30

## Project overview
- Framework: Next.js App Router (Next 16.2.4) with React 19
- Styling: Tailwind CSS v4 + CSS variables in [app/globals.css](../app/globals.css)
- Fonts: Geist Sans + Geist Mono via [app/layout.tsx](../app/layout.tsx)
- Primary pages:
  - Home: [app/page.tsx](../app/page.tsx)
  - Portfolio listing: [app/portfolio/page.tsx](../app/portfolio/page.tsx)
- Data module: [app/data/portfolio.ts](../app/data/portfolio.ts)
- Lead capture API: [app/api/leads/route.ts](../app/api/leads/route.ts)

## Current site structure (home page)
- Navbar (sticky, CTA button links to contact form)
- Hero (headline + CTAs)
- Process shift block (old vs Avlys way)
- Solutions grid
- Portfolio preview (4 items)
- Why Avlys features
- Contact / lead form
- Footer (contact + social icons)

Home page sections and anchors:
- #process: [app/components/ProblemSolution.tsx](../app/components/ProblemSolution.tsx)
- #solutions: [app/components/SolutionsGrid.tsx](../app/components/SolutionsGrid.tsx)
- #portfolio: [app/components/PortfolioPreview.tsx](../app/components/PortfolioPreview.tsx)
- #contact: [app/components/CallToAction.tsx](../app/components/CallToAction.tsx)

## Blog section
- Added a blog section for SEO/organic growth content.
  - [app/data/blog.ts](../app/data/blog.ts) — post data model + 10 initial posts across Web Development, E-Commerce Development, Agentic AI Apps, Deep Tech AI Software, Landing Page Design, and AI Agents for Enterprises.
  - [app/blog/page.tsx](../app/blog/page.tsx) — blog index/listing.
  - [app/blog/[slug]/page.tsx](../app/blog/[slug]/page.tsx) — article page with Article/BreadcrumbList/FAQPage structured data.
  - [app/blog/opengraph-image.tsx](../app/blog/opengraph-image.tsx) and [app/blog/[slug]/opengraph-image.tsx](../app/blog/[slug]/opengraph-image.tsx) — OG images.
  - Wired into [app/sitemap.ts](../app/sitemap.ts), [app/components/Navbar.tsx](../app/components/Navbar.tsx), and [app/components/Footer.tsx](../app/components/Footer.tsx).
- New posts should follow the same `BlogPost` shape in `app/data/blog.ts` (slug, metaTitle/metaDescription, keywords, category, intro/sections/takeaways/faqs) — pages and structured data are generated automatically from that array.

## Change log (summary of work done)
- Removed the old Proof block and replaced it with a Portfolio preview section.
  - [app/components/WhyAvlys.tsx](../app/components/WhyAvlys.tsx)
  - [app/components/PortfolioPreview.tsx](../app/components/PortfolioPreview.tsx)
- Centralized portfolio data into a shared module used by the preview and full portfolio page.
  - [app/data/portfolio.ts](../app/data/portfolio.ts)
  - [app/portfolio/page.tsx](../app/portfolio/page.tsx)
- Added a lead capture form inside the CTA section.
  - [app/components/LeadCaptureForm.tsx](../app/components/LeadCaptureForm.tsx)
  - [app/components/CallToAction.tsx](../app/components/CallToAction.tsx)
- Wired form submission to Supabase via a server route.
  - [app/api/leads/route.ts](../app/api/leads/route.ts)
- Added Mobile Number field to the form and API insert.
  - [app/components/LeadCaptureForm.tsx](../app/components/LeadCaptureForm.tsx)
  - [app/api/leads/route.ts](../app/api/leads/route.ts)
- Updated footer with LinkedIn and Instagram icons + links.
  - [app/components/Footer.tsx](../app/components/Footer.tsx)
- Updated navbar order to Process -> Solutions -> Portfolio and CTA to jump to #contact.
  - [app/components/Navbar.tsx](../app/components/Navbar.tsx)

## Supabase integration
Environment variables required in .env.local:
- SUPABASE_URL=...
- SUPABASE_SERVICE_ROLE_KEY=...

Table needed (example):
```
create table if not exists lead_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text not null,
  company text,
  message text not null,
  source text default 'website',
  created_at timestamp with time zone default now()
);
```

## Security audit (current state)

### Findings (high to low)
1) Service-role key in a server route
   - Risk: If the server environment leaks, the key grants full database access.
   - Mitigation: Keep the key server-only, never expose to client, and restrict the Supabase project with RLS. Consider using a limited key or RPC function.
   - File: [app/api/leads/route.ts](../app/api/leads/route.ts)

2) No rate limiting or bot protection on lead capture
   - Risk: Spam or abuse of the form and database writes.
   - Mitigation: Add rate limiting (middleware or edge), CAPTCHA/honeypot, and basic IP throttling.
   - File: [app/api/leads/route.ts](../app/api/leads/route.ts)

3) Input validation is minimal
   - Risk: Poor data quality; potential abuse (very long strings, invalid email/phone).
   - Mitigation: Validate length and format server-side (email/phone regex or library) and enforce max size.
   - File: [app/api/leads/route.ts](../app/api/leads/route.ts)

4) Error handling returns generic errors but logs nothing
   - Risk: Hard to debug in production.
   - Mitigation: Log errors server-side (without PII) or use a logging service.
   - File: [app/api/leads/route.ts](../app/api/leads/route.ts)

### Positive notes
- Supabase key is only used server-side in an API route.
- Form uses POST and does not expose credentials on the client.

## Testing audit (current state)

### Coverage gaps
- No automated tests found (unit, integration, or e2e).
- No form submission test to verify Supabase insert in dev.

### Manual checks recommended
- Navbar anchors scroll to the correct sections:
  - #process, #solutions, #portfolio, #contact
- CTA button "Book Strategy Call" scrolls to the form.
- Form submission:
  - Required fields: name, email, phone, message
  - Optional field: company
  - Success and error states display correctly
- Portfolio page filter buttons update the list count and cards.

### Suggested minimal tests (if added later)
- Playwright e2e: home page load, anchor navigation, form validation, portfolio filters.
- API test: POST /api/leads with valid and invalid payloads.

## Quick edit pointers
- Navbar links/CTA: [app/components/Navbar.tsx](../app/components/Navbar.tsx)
- Portfolio preview cards: [app/components/PortfolioPreview.tsx](../app/components/PortfolioPreview.tsx)
- Portfolio data: [app/data/portfolio.ts](../app/data/portfolio.ts)
- Lead form UI: [app/components/LeadCaptureForm.tsx](../app/components/LeadCaptureForm.tsx)
- Lead API handler: [app/api/leads/route.ts](../app/api/leads/route.ts)
- Footer socials: [app/components/Footer.tsx](../app/components/Footer.tsx)
