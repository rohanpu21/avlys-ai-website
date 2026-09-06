# Website improvements — 6 September 2026

Implemented locally; no deployment or Git push performed.

## Content still needed

- Booking: set `NEXT_PUBLIC_BOOKING_URL` to the approved public HTTPS calendar URL, then restart/rebuild. Cal.com and Calendly links work as ordinary external scheduling links. Without a URL, the site says **Request a call** and opens the contact form, never WhatsApp or a fake calendar.
- Instagram: add four entries to `app/data/studio.ts`, each with a public reel shortcode, title, description, and local cover image. The About page shows them below the studio photos. Embeds load only after a visitor selects a cover; each card also links to Instagram. Empty content stays hidden.
- Deepak: confirmed portrait supplied and added on 6 September, cropped with CSS into the shared circular frame. Original pixels are retained; no AI retouching.
- Case studies: provide approved product screenshots, engagement status, delivery dates, and measured results. The existing portfolio artwork is labeled illustrative. `deliveryTimeline` and `verifiedResults` in `app/data/caseStudies.ts` accept approved evidence; each result requires a measurement note. Do not add invented metrics or label an architecture engagement as production work.

## Main changes

- Enterprise-only positioning, including service metadata, blog copy, and llms.txt.
- Consulting moved to `/services/enterprise-ai-consulting`; the old URL permanently redirects.
- Homepage puts documented work after the offer, followed by services, integration, process, and a team preview. Existing launch film and other sections are retained.
- Shared team data and circular portraits; shorter bios and equal-height About cards.
- Independent scheduling and WhatsApp actions, with truthful fallback labels.
- Footer lists Hyderabad and Bengaluru, About Us, and Ask AI about Avlys. AI links copy a public-site question and open the selected provider; no automatic message is sent.

## Brand assets

## Portrait and architecture update

- Govind Jain: Technical Advisor — Backend Systems (title chosen at the user's request). LinkedIn profile `https://www.linkedin.com/in/govind-jain/` supplied the IIT Roorkee B.Tech / class of 2023, Baya Systems tenure, current Senior Software Engineer role, and backend skills. The Avlys advisor title is proposed editorial positioning, not a title found on LinkedIn; confirm his agreement before public deployment.
- Deepak's user-confirmed photo is in `public/team/deepak-sahu.png`; `/about#deepak-sahu` links directly to his card.
- Four featured project diagrams were generated with the built-in image tool, reviewed, and saved under `public/portfolio/architecture/*-layered.png`. The user-supplied HJSN architecture is retained as `hjsn-digital-platform.jpeg` and clearly described as proposed architecture.
- Exact generation and correction prompts: `docs/architecture-image-prompts.json`. The later user-supplied layered reference supersedes the original sparse six-node treatment.
- Verification: matching GitHub READMEs for `rohanpu21/hospital-voice-agent`, `rohanpu21/mike-legal-ai`, and `rohanpu21/workshop-management-system`; Hiredesk `DEPLOY.md`. Workshop is a demo foundation, not a production-ready deployment.
- Full-size links, text descriptions, uncropped previews, and architecture-based social previews are wired for these five projects. Other portfolio projects still retain their existing visuals; the all-project diagram replacement is not complete.

AI-provider SVGs are from Simple Icons v14.0.0 (`https://github.com/simple-icons/simple-icons/tree/14.0.0/icons`), distributed under CC0. Brand marks remain the property of their respective owners; their inclusion does not imply affiliation.
