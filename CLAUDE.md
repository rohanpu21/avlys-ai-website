@AGENTS.md

## Design Context

### Users
Enterprise and mid-market buyers (US + India) evaluating partners for custom software and AI integration into existing systems. They visit to judge credibility fast and book a strategy call.

### Brand Personality
Senior, precise, execution-focused. Numbers over adjectives. Working software over decks.

### Aesthetic Direction
Apple-style design system (full spec: docs/DESIGN-apple.md): alternating white/parchment/near-black full-bleed tiles, single Action Blue (#0066cc) interactive color, pill CTAs, Inter substituting SF Pro (17px body, tight display tracking, weight ladder 300/400/600), hairline borders, no decorative gradients or chrome shadows.

### Design Principles
- The color change between tiles IS the section divider - no borders or shadows on chrome.
- One accent color: every interactive element is Action Blue (#2997ff on dark tiles).
- One CTA, repeated: "Book a strategy call" in nav, after proof sections, and pre-footer.
- Real proof only: no invented metrics, no anonymous testimonials, no aspirational client logos.
- Motion is restrained (GSAP reveals, CSS marquee) and respects prefers-reduced-motion.

### Content Rules (anti-slop)
- Replace adjectives with nouns and numbers; if a number can't be verified, don't publish it.
- Testimonials require name, role, and company (data: app/data/testimonials.ts).
- Client marquee lists only real clients with permission (data: app/data/marquee.ts).
- Cal.com booking link lives in app/lib/site.ts (siteConfig.bookingUrl); CTAs fall back to /contact while it is empty.
