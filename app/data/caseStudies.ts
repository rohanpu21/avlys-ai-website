import { portfolioItems, type PortfolioItem } from "./portfolio";

export type VisualKind =
  | "website"
  | "commerce"
  | "marketplace"
  | "ai-system"
  | "voice-agent"
  | "automation"
  | "maintenance";

export type CaseStudyDetail = {
  headline: string;
  engagement?: "Software build" | "Architecture engagement" | "Prototype / MVP";
  deliveryTimeline?: string;
  verifiedResults?: { label: string; value: string; measurementNote: string }[];
  context: string;
  challenge: string;
  solution: string;
  deliverables: string[];
  outcomes: string[];
  process: string[];
  visualKind: VisualKind;
};

export type CaseStudy = PortfolioItem & CaseStudyDetail;

const processByKind: Record<VisualKind, string[]> = {
  website: [
    "Audited the existing presence, audience, and the conversion paths that mattered.",
    "Defined the information architecture, page structure, and content plan.",
    "Built the responsive interface, lead capture, and on-page SEO foundations.",
    "Tested performance and responsiveness, then handed over with documentation.",
  ],
  commerce: [
    "Mapped the catalog, checkout flow, and the trust points buyers need before paying.",
    "Designed the storefront structure, product presentation, and merchandising sections.",
    "Built the catalog, cart, checkout, and payment integration with speed work included.",
    "Verified the purchase flow end to end and set up the store for ongoing campaigns.",
  ],
  marketplace: [
    "Mapped every role - customers, vendors, admins - and the rules connecting them.",
    "Designed the data model, matching or listing logic, and payment/commission flows.",
    "Built the portals, onboarding, order management, and admin controls.",
    "Stress-tested the role workflows and handed over with operating documentation.",
  ],
  "ai-system": [
    "Audited the data sources, workflows, and constraints the system had to respect.",
    "Designed the agent architecture: orchestration, state, grounding, and human checkpoints.",
    "Built the pipelines, integrations, and evaluation harness around real cases.",
    "Reviewed accuracy and failure modes, then documented the architecture for extension.",
  ],
  "voice-agent": [
    "Defined call scenarios, qualification questions, escalation rules, and tone.",
    "Designed the call flow with structured data capture and handoff points.",
    "Connected telephony, scheduling, WhatsApp follow-up, and lead storage.",
    "Tested edge cases - failed calls, transfers, after-hours - before go-live.",
  ],
  automation: [
    "Mapped the manual workflow: where requests arrive, wait, and get dropped.",
    "Designed the automation rules, routing logic, and approval gates with the team.",
    "Built the flows, integrations, and logging so every action is traceable.",
    "Monitored the first weeks of real usage and tuned rules against actual cases.",
  ],
  maintenance: [
    "Audited the sites: versions, vulnerabilities, backup state, and performance.",
    "Set the maintenance calendar: updates, backups, scans, and reporting cadence.",
    "Ran the monthly cycle of patching, content updates, and performance fixes.",
    "Reported the work done each month with issues found and actions taken.",
  ],
};

const detailsBySlug: Record<string, Omit<CaseStudyDetail, "process"> & { process?: string[] }> = {
  "workshop-management-system": {
    headline: "An HR workshop demo with registration, waitlists, and human-reviewed insight drafts.",
    engagement: "Prototype / MVP",
    context:
      "HR teams needed a single place to publish quarterly workshops, manage capacity, and keep calendar and email reminders in sync without a spreadsheet pile.",
    challenge:
      "Workshop operations break when capacity, waitlists, reminders, and post-event notes live in different tools. AI summaries also cannot go out unreviewed.",
    solution:
      "The demo combines a Next.js portal, Fastify API, shared workflow rules, and mock adapters. PostgreSQL schemas and Google Workspace / Azure OpenAI adapters are included, but a durable repository, SSO/RBAC, and production worker wiring are still required. Production mode intentionally refuses to boot until that work is complete.",
    deliverables: ["Workshop portal and API foundation", "Capacity and FIFO waitlist rules", "Reminder and provider-adapter scaffolds", "AI draft approval workflow"],
    outcomes: [
      "A single operating surface for HR, facilitators, and employees.",
      "Hard capacity with an ordered waitlist instead of overbooking.",
      "Reminder rules demonstrated with mock adapters.",
      "AI notes that stay drafts until a human approves them.",
    ],
    process: ["Defined the workshop roles and registration rules.", "Implemented shared workflow contracts and a demo portal.", "Added database schemas and provider-adapter scaffolds.", "Kept production mode disabled pending durable storage, access control, and worker integration."],
    visualKind: "marketplace",
  },
  "mike-legal-ai": {
    headline: "A legal document workspace for ingest, conversion, and model-backed review.",
    context:
      "Legal teams needed a signed-in workspace to store documents, convert office files, and ask questions against the corpus without a loose chat window.",
    challenge:
      "Document intelligence fails when auth, storage, conversion, and model access are separate. Office files also need a reliable path into a reviewable PDF.",
    solution:
      "The implementation combines a Next.js frontend, an Express API, Supabase auth and Postgres, S3-compatible storage, LibreOffice conversion, and pluggable model providers.",
    deliverables: ["Authenticated document workspace", "Office-to-PDF conversion", "Object storage for source files", "Model-backed query interface"],
    outcomes: [
      "Documents live in one authenticated product instead of shared drives.",
      "Office files can be converted and reviewed in a consistent format.",
      "Teams can query the corpus without leaving the workspace.",
      "Storage and model providers can be swapped without rewriting the app.",
    ],
    process: ["Organized the workspace around authenticated document access.", "Connected metadata and object storage through the API.", "Added office-file conversion and model-provider adapters.", "Documented setup and configuration for the frontend and backend."],
    visualKind: "ai-system",
  },
  "magic-creation-studio-wedding-photography-erp": {
    headline: "A wedding photography ERP for bookings, shoots, albums, and studio ops.",
    context:
      "A photography studio needed one signed-in system for client bookings, shoot days, album delivery, and the admin work that usually sits in WhatsApp and sheets.",
    challenge:
      "Wedding studios lose track of dates, packages, and deliverables when operations stay in chat. The product had to feel like a business OS, not a brochure site.",
    solution:
      "Avlys built a Next.js 14 and Supabase ERP with authenticated studio workflows, operational records, and a shadcn/ui interface designed for daily use.",
    deliverables: ["Studio login and roles", "Booking and shoot records", "Album and delivery tracking", "Operational admin views"],
    outcomes: [
      "Studio work sits in one product instead of scattered chats.",
      "Bookings and shoot records stay attached to the same client.",
      "Album delivery has a visible status instead of a forgotten thread.",
      "A maintainable base for later studio modules.",
    ],
    visualKind: "marketplace",
  },
  "hospital-voice-agent": {
    headline: "A trilingual hospital receptionist that books appointments from inbound calls.",
    context:
      "This project explores inbound appointment reception in Hindi, Odia, and English, with bookings recorded in Google Calendar.",
    challenge:
      "The call flow needs to understand spoken requests, check available times, and confirm a booking while keeping the speech and calendar tools coordinated.",
    solution:
      "Avlys built a FastAPI call server with Sarvam speech, Groq tool-calling, and Google Calendar booking, plus a text test path so the flow can be checked without a live trunk.",
    deliverables: ["Inbound call flow", "Hindi / Odia / English handling", "Google Calendar booking tools", "Text-only test endpoint"],
    outcomes: [
      "After-hours calls can still request an appointment.",
      "Bookings land on the hospital calendar instead of a voicemail.",
      "The same agent can take Hindi, Odia, or English without a fork.",
      "Staff can rehearse the flow in text before connecting telephony.",
    ],
    process: ["Defined configurable hospital hours, doctors, and conversation prompts.", "Connected audio input and output through FastAPI and Sarvam speech services.", "Added Groq tool calls for calendar availability and appointment creation.", "Provided a text conversation endpoint for testing before telephony integration."],
    visualKind: "voice-agent",
  },
  "hiredesk-recruiting-match-system": {
    headline: "A recruiting match desk that parses resumes, ingests jobs, and ranks fit.",
    context:
      "Hiring teams needed a backend that could store resumes, pull jobs, and score matches instead of reading every PDF by hand.",
    challenge:
      "Matching quality depends on parsing, embeddings, and a second-pass rerank. Job ingest also has to run on a worker, not on the request path.",
    solution:
      "Avlys built a FastAPI service with Celery workers, Postgres models for resumes, jobs, and matches, JSearch ingest, embedding similarity, and LLM reranking.",
    deliverables: ["Resume parsing", "Job ingest worker", "Embedding match layer", "LLM rerank and match APIs"],
    outcomes: [
      "Resumes become structured profiles instead of unread PDFs.",
      "Jobs can be collected on a schedule instead of pasted one by one.",
      "First-pass ranking is vector-based, with a slower LLM rerank on top.",
      "A backend ready for a recruiter UI without rewriting the match core.",
    ],
    process: ["Defined profiles, jobs, and applications in Postgres.", "Added scheduled ingestion and embedding tasks through Celery and Redis.", "Combined vector and keyword retrieval with model-backed reranking.", "Documented provider configuration, migrations, workers, and health checks."],
    visualKind: "ai-system",
  },
  "ad-sakhi-ad-ops-studio": {
    headline: "A tiny ad-ops studio that turns a product URL into a 9:16 creative.",
    context:
      "A small team needed a desk to make vertical ads from a product page and then watch spend, without a full agency stack.",
    challenge:
      "Creative, auth, and spend live in different tools. The product had to make the ad first, then keep APIs and spend on the same signed-in desk.",
    solution:
      "Avlys built a Vite and React desk with Clerk auth and a FastAPI factory for creative generation, spend views, and connected API lines.",
    deliverables: ["Product-URL creative factory", "9:16 ad desk", "Spend view", "Signed-in API and MCP lines"],
    outcomes: [
      "A product URL can become a vertical creative without a design file handoff.",
      "Creative and spend sit on the same desk.",
      "Vendor keys stay in env files, with a demo path that needs none.",
      "Keyboard jumps keep make, spend, and lines one keystroke apart.",
    ],
    visualKind: "automation",
  },
  "bidsure-ai-tender-eligibility-platform": {
    headline: "A tender desk that checks contractor eligibility before a bid is assembled.",
    context:
      "Contractors waste time on tenders they cannot bid. The product needed to read requirements and flag eligibility before the writing starts.",
    challenge:
      "Tender packs are messy. Eligibility rules, documents, and bid assembly have to live in one product or the team falls back to folders.",
    solution:
      "Avlys collaborated on a Next.js and Prisma platform for tender intake, eligibility checks, and bid assembly around structured project requirements.",
    deliverables: ["Tender intake", "Eligibility checks", "Structured requirement model", "Bid assembly workspace"],
    outcomes: [
      "Contractors can see eligibility before sinking time into a bid.",
      "Requirements sit in a structured model instead of a PDF pile.",
      "Bid writing starts from the same record as the eligibility check.",
      "A product surface that can grow into more tender workflows.",
    ],
    visualKind: "ai-system",
  },
  "brand-sahayak-social-content-platform": {
    headline: "A social content desk with AI copy, brand-glossary translation, and scheduling.",
    context:
      "Brands needed one workspace to generate captions, keep terminology consistent across languages, and schedule posts without a spreadsheet calendar.",
    challenge:
      "AI copy drifts off-brand, and translation often ignores the glossary. Scheduling also has to respect workspace access, not a shared login.",
    solution:
      "Avlys built a React and Supabase platform with OpenAI generation, glossary-aware translation, scheduling, analytics, and RLS-backed workspaces.",
    deliverables: ["AI caption and hashtag generation", "Brand glossary translation", "Multi-platform scheduling", "Workspace access control"],
    outcomes: [
      "Captions can be drafted in the same place they are scheduled.",
      "Translation can follow a brand glossary instead of a generic dictionary.",
      "Workspaces keep teams off a shared password.",
      "Analytics sit next to the calendar instead of in a separate login.",
    ],
    visualKind: "automation",
  },
  "siddhi-vinayak-tiles-3d-showroom-website": {
    headline: "A 3D showroom website for tiles, marble, granite, and sanitaryware.",
    context:
      "A family-run showroom in Nuapada needed a site that could show materials in a room, not only as a flat catalog of photos.",
    challenge:
      "Material sites feel dead when every SKU is a JPEG. The 3D room also has to degrade cleanly on phones without WebGL or with reduced motion.",
    solution:
      "Avlys built a React, Vite, and Three.js showroom with a tilting tile wall, live floor retexturing, a filterable gallery, and WhatsApp contact, plus a static fallback.",
    deliverables: ["3D tile wall hero", "Interactive material visualizer", "Filterable gallery and lightbox", "Call and WhatsApp actions"],
    outcomes: [
      "Visitors can see a material on a floor, not only in a thumbnail.",
      "Content stays config-driven for categories, swatches, and hours.",
      "Devices without WebGL still get a usable material grid.",
      "Call and WhatsApp stay on screen for local buyers.",
    ],
    visualKind: "website",
  },
  "godwit-cafe-multi-city-website": {
    headline: "A three-city cafe website that sends guests to the right outlet, not a third-party app.",
    context:
      "Godwit Cafe runs Indore, Raipur, and Nagpur with different service models. Party-hall booking in Raipur still lived on phone and aggregator apps.",
    challenge:
      "Three outlets cannot share one generic landing page. Guests need the right menu, hours, and booking path without paying a 30 percent platform cut on every repeat visit.",
    solution:
      "Avlys built a single Next.js site with city pages, menu, and a direct booking path. Vercel and Lovable previews were the same website, not a second app.",
    deliverables: ["Multi-city website", "Outlet pages and menu", "Direct booking path", "Instagram and maps"],
    outcomes: [
      "One owned site for Indore, Raipur, and Nagpur.",
      "Party-hall interest can land on a form instead of a DM.",
      "Social posts have a permanent home next to the menu.",
      "No separate native app to maintain.",
    ],
    visualKind: "website",
  },
  "kikki-s-cafe-raipur-website": {
    headline: "A neighborhood cafe site for Kikki's on GE Road, Raipur.",
    context:
      "Kikki's Cafe has been a pure-veg comfort cafe since 2015. Reservations and story lived on Google and Instagram.",
    challenge:
      "A single outlet does not need an app. It needs a fast page for menu, reviews, hours, and a phone or WhatsApp enquiry.",
    solution:
      "Avlys shipped one website — kikkis-cafe.vercel.app — covering story, favourites, Google reviews, maps, and Instagram. The Lovable URL is the same site, not a second product.",
    deliverables: ["Single-outlet website", "Menu and story", "Maps and reviews", "Instagram embed"],
    outcomes: [
      "Raipur guests can read the menu without opening Zomato first.",
      "Reviews and address sit on a page the cafe owns.",
      "Phone and directions stay one tap away.",
      "No duplicate app case study.",
    ],
    visualKind: "website",
  },
  "taomish-ctrm-website-redesign": {
    headline: "An enterprise CTRM website redesign for trading, treasury, risk, and derivatives.",
    context:
      "Taomish needed taomish.com rebuilt as a premium B2B presence for Xceler, with clearer solution stories and a demo request path.",
    challenge:
      "Commodity CTRM sites fail when they look like a brochure. Navigation, storytelling, and lead capture had to match an enterprise buyer.",
    solution:
      "Avlys designed and built a Next.js redesign covering trading, treasury, risk analytics, and hedging, with a demo form. This is the website, not a second CTRM application case.",
    deliverables: ["Information architecture", "Enterprise UI", "Solution pages", "Demo lead capture"],
    outcomes: [
      "Trading, treasury, risk, and derivatives each have a clear path.",
      "Demo requests land in one form instead of a generic contact dump.",
      "The stack can take a headless CMS later without a rebuild.",
      "Website work stays separate from the Xceler product itself.",
    ],
    visualKind: "website",
  },
  "girish-lakhotya-bondsman-website": {
    headline: "A founder website for Girish Lakhotya and the Bond Smart initiative.",
    context:
      "Girish Lakhotya needed a public site for essays, video, and Bond Smart without splitting the brand into a marketing site and a separate app case.",
    challenge:
      "Personal brand sites either hide the product or become a second product. Bond Smart had to live as a section, not a duplicate portfolio card.",
    solution:
      "Avlys built girish-lakhotya.vercel.app as one Next.js presence: biography, thoughts, video, podcast, and Bond Smart. No second app listing.",
    deliverables: ["Founder website", "Thoughts and video index", "Bond Smart section", "Inquiry form"],
    outcomes: [
      "Press and speaking requests have a single URL.",
      "Bond Smart is explained without a separate product card.",
      "Essays and video sit next to the biography.",
      "The same deployment is not listed twice under another domain.",
    ],
    visualKind: "website",
  },
  "indexpilot": {
    headline: "A small indexing product shipped as one web surface.",
    context:
      "IndexPilot needed a public app for search-visibility work without a marketing site plus a dashboard as two portfolio items.",
    challenge:
      "Tiny tools get over-sold as platforms. This had to stay one URL.",
    solution:
      "Avlys shipped indexpilot-ashen.vercel.app as the product itself.",
    deliverables: ["Single web app", "Indexing surface", "Vercel deploy"],
    outcomes: [
      "One URL to share.",
      "No parallel marketing-site case study.",
      "A base that can grow modules later.",
      "Kept in the website group because that is the delivered surface.",
    ],
    visualKind: "website",
  },
  "hjsn-digital-platform": {
    engagement: "Architecture engagement",
    headline: "An education and profession platform with identity, membership, and modular services.",
    context:
      "HJSN needed Android, web, admin, and third-party gateways on one architecture: Aadhaar, Voter ID, payments, SMS, maps, and AI document checks.",
    challenge:
      "Identity, membership, education, and professional services needed shared access rules across mobile and web clients.",
    solution:
      "Avlys designed a five-layer stack — client, API gateway, application services, data, infrastructure — so new modules can attach without a rebuild. Cover is the architecture the team uses.",
    deliverables: ["Android and web client architecture", "Identity and membership service design", "Education and help-network module design", "Verification and payment integration boundaries"],
    outcomes: [
      "Mobile, web, and admin share one gateway.",
      "Identity verification is a service, not a one-off screen.",
      "Vector search and object storage sit beside Postgres, not as a second product.",
      "Infrastructure and cross-cutting concerns are defined alongside the application layers.",
    ],
    process: ["Mapped mobile, web, admin, and third-party client needs.", "Separated identity, membership, education, and professional service responsibilities.", "Defined data stores and external integration boundaries.", "Documented proposed infrastructure, access controls, and operational concerns."],
    visualKind: "marketplace",
  },
  "integrated-erp-and-club-management": {
    engagement: "Architecture engagement",
    headline: "An ERP that puts HR, finance, membership, and club billing on one database.",
    context:
      "The club needed employee, membership, billing, inventory, and approvals without reconciling five tools.",
    challenge:
      "ERP and a public website are different jobs. This case is the operations platform only.",
    solution:
      "Avlys proposed a unified ERP with role-based access, multi-location support, and dashboards on a single source of truth.",
    deliverables: ["HR and payroll", "Membership and billing", "Inventory and assets", "Approvals and reporting"],
    outcomes: [
      "Membership and finance share the same record.",
      "Approvals are workflow, not email chains.",
      "Multi-location reporting sits on one schema.",
      "No extra website card for the same ERP.",
    ],
    visualKind: "marketplace",
  },
  "bromechanic-multi-city-service-platform": {
    headline: "A multi-city bike-service platform with booking, masked calls, and CRM.",
    context:
      "BroMechanic was expanding beyond Bangalore with Google Ads dependence, mechanic leakage, and no city-wise routing.",
    challenge:
      "A marketing site without ops still leaks repeat jobs to mechanics. The website, CRM, and call masking had to be one platform.",
    solution:
      "Avlys designed city landing pages, slot booking, Exotel-style masked calling, mechanic assignment, and follow-up sequences as a single system.",
    deliverables: ["Multi-city SEO site", "Booking and CRM", "Call masking", "Mechanic assignment and follow-up"],
    outcomes: [
      "City pages and lead routing share the same pipeline.",
      "Customer and mechanic numbers can stay masked.",
      "Repeat service can be tracked instead of lost to WhatsApp.",
      "Not split into a website case and an app case.",
    ],
    visualKind: "marketplace",
  },
  "mns-job-and-career-portal": {
    headline: "An MNS-branded career portal with matching and auto-apply for students.",
    context:
      "MNS Institute wanted students to search and apply inside an MNS product, with nursing and healthcare as a core track, while jobs still come from partner APIs.",
    challenge:
      "A careers website that dumps students onto third-party boards loses the relationship. The portal had to own profile, matching, and tracking.",
    solution:
      "Avlys scoped a student portal, admin pipeline, job APIs, matching, and an application engine with email and WhatsApp notifications.",
    deliverables: ["Student profiles and resumes", "Job aggregation", "Match and auto-apply", "Admin recruitment dashboard"],
    outcomes: [
      "Students stay on an MNS-branded surface.",
      "Applications can be recorded even when a provider has no API.",
      "Nursing and other categories share the same filters.",
      "Not listed again as a separate mobile app.",
    ],
    visualKind: "marketplace",
  },
  "ai-trade-intel-equity-and-derivatives": {
    headline: "A behavioral-intelligence desk for Indian equity and derivatives.",
    context:
      "The client needed news ingest, swarm simulation, technical confirmation, and broker execution with explicit risk caps. The name stays confidential.",
    challenge:
      "Price-only bots miss crowd behavior. Swarm consensus also cannot trade without structure, sizing, and a hard reject when signals conflict.",
    solution:
      "Avlys built a five-layer flow: ingest, structured research, MiroFish-style swarm, signal fusion, and risk-controlled execution. The dashboard cover is an illustrative UI from that architecture, not a live brokerage login.",
    deliverables: ["News and market ingest", "Swarm consensus", "SMC and volatility fusion", "Risk console and execution bridge"],
    outcomes: [
      "Behavioral and technical signals must agree before an order.",
      "Position sizing and stops are part of the architecture, not an afterthought.",
      "The UI shows portfolio, swarm gauge, positions, and risk in one desk.",
      "Client identity is withheld by request.",
    ],
    visualKind: "ai-system",
  },
  "p2p-wi-fi-camera-ecosystem": {
    headline: "A P2P camera stack from firmware to phone, with no cloud video hop.",
    context:
      "Sanjay Pal needed firmware, Android, iOS, and a web viewer that pair on the local network without sending video through Avlys servers.",
    challenge:
      "Firmware, mobile, and web are one product. Splitting them into a website case and an app case would hide the hard part: pairing and WebRTC on the device.",
    solution:
      "Avlys scoped an embedded C/C++ bridge, native apps, PIN pairing, and a live web dashboard as a single ecosystem.",
    deliverables: ["Firmware WebRTC bridge", "Android and iOS apps", "Web live view", "mDNS pairing"],
    outcomes: [
      "Video stays device-to-device.",
      "Pairing uses a rotating PIN, not a cloud account.",
      "Web and mobile share the same handshake.",
      "Listed once, not as website plus app.",
    ],
    visualKind: "ai-system",
  },
  "realcrm-real-estate-pipeline": {
    headline: "A real-estate CRM with pipeline stages and a buyer nurture sequence.",
    context:
      "Sales managers needed contacts, scores, owners, and an email sequence in one desk, not a spreadsheet plus a separate automation product.",
    challenge:
      "Lead-automation diagrams and CRM screens are the same system. This card is the product UI, not a second website.",
    solution:
      "Avlys delivered a contact pipeline from new lead to closed-won, with an editable buyer nurture sequence and owner routing.",
    deliverables: ["Contact pipeline", "Scoring and owners", "Email sequence builder", "Export and add-contact flows"],
    outcomes: [
      "Stage counts sit above the same contact table.",
      "Nurture steps are visible next to the pipeline.",
      "WhatsApp and Meta ads can feed the same record.",
      "Not duplicated as a separate lead-automation website.",
    ],
    visualKind: "automation",
  },
  "darshan-thaker-b2b-engineering-cms-website": {
    headline: "A B2B engineering CMS built for technical trust and search visibility.",
    context:
      "The business needed a service-led website that could explain engineering capabilities, publish project content, and support local discovery.",
    challenge:
      "The site had to serve both technical evaluators and search users. The structure needed to handle services, projects, blog content, maps, and WhatsApp contact without becoming hard to manage.",
    solution:
      "Avlys delivered a WordPress and ACF architecture with dynamic service pages, project filtering, blog CMS, maps, WhatsApp CTA, CDN, security setup, and SEO-first content structure.",
    deliverables: ["Dynamic services CMS", "Project filtering", "Blog publishing system", "Maps and WhatsApp CTA"],
    outcomes: [
      "Better service discoverability for technical buyers.",
      "A CMS structure that supports ongoing project proof.",
      "More practical lead paths through maps and WhatsApp.",
      "Improved technical foundations for search and speed.",
    ],
    visualKind: "website",
  },
  "aqua-flight-luxury-yacht-services-rebuild": {
    headline: "A luxury service rebuild with refined navigation and premium service storytelling.",
    context:
      "Aqua Flight needed a full website rebuild that matched the expectations of luxury yacht buyers, charter clients, and concierge-style service users.",
    challenge:
      "Luxury service pages need restraint, clarity, and trust. The structure had to separate charter, buying, logistics, and concierge journeys without diluting the brand.",
    solution:
      "Avlys rebuilt the Webflow experience with improved information architecture, luxury UX patterns, SEO migration planning, and focused service landing zones.",
    deliverables: ["Webflow rebuild", "Luxury service information architecture", "SEO migration", "Service landing zones"],
    outcomes: [
      "A more premium browsing experience for high-intent visitors.",
      "Clearer routes into charter, buying, logistics, and concierge services.",
      "A stronger foundation for search migration and service growth.",
      "A visual system better aligned with luxury expectations.",
    ],
    visualKind: "website",
  },
  "luis-orozco-casino-and-gaming-brand-website": {
    headline: "A gaming brand website designed for atmosphere, credibility, and regional relevance.",
    context:
      "The brand needed an immersive website for Mexico and LATAM audiences, with research-led positioning and responsive execution.",
    challenge:
      "Gaming websites can easily become noisy. The challenge was to create energy and brand presence while preserving clear navigation, responsive layouts, and QA discipline.",
    solution:
      "Avlys handled research, Figma design, responsive development, WordPress/custom implementation, QA, and go-live support for the gaming brand site.",
    deliverables: ["Research-led website direction", "Figma design", "Responsive development", "QA and go-live support"],
    outcomes: [
      "A more immersive brand experience for regional users.",
      "A responsive site designed around fast scanning.",
      "A clearer handoff from design into implementation.",
      "A launch process supported by structured QA.",
    ],
    visualKind: "website",
  },
  "alesonfoods-d2c-food-e-commerce-website": {
    headline: "A mobile-first food commerce site with trust, checkout, and catalog clarity.",
    context:
      "The D2C food brand needed a storefront that could present products clearly, support cart and checkout, and build buyer trust on mobile.",
    challenge:
      "Food commerce depends on trust and speed. The experience had to make products easy to inspect, reduce checkout friction, and support SEO basics.",
    solution:
      "Avlys created a premium commerce build with catalog structure, cart, checkout, payment integration, trust sections, SEO setup, and ongoing support.",
    deliverables: ["D2C product catalog", "Cart and checkout", "Payment integration", "Trust and SEO sections"],
    outcomes: [
      "A clearer path from product interest to purchase.",
      "More confidence-building content around the catalog.",
      "A storefront structure ready for paid and organic traffic.",
      "A maintainable ecommerce base for future campaigns.",
    ],
    visualKind: "commerce",
  },
  "fat-cow-skincare-d2c-beauty-e-commerce-website": {
    headline: "An editorial skincare storefront built around concerns, ingredients, and trust.",
    context:
      "The skincare brand needed a commerce experience that felt educational, premium, and helpful before asking visitors to buy.",
    challenge:
      "Beauty commerce needs product clarity, ingredient confidence, mobile speed, and proof. The site also needed a quiz-style discovery path.",
    solution:
      "Avlys delivered a D2C storefront with editorial product sections, skin concern quiz direction, ingredient transparency, proof sections, mobile-first build, and SEO.",
    deliverables: ["Editorial storefront", "Skin concern quiz flow", "Ingredient transparency sections", "Mobile-first commerce UX"],
    outcomes: [
      "A more guided shopping experience for skincare buyers.",
      "Better product confidence through ingredient and proof content.",
      "Improved mobile browsing for D2C traffic.",
      "A structure that supports education-led conversion.",
    ],
    visualKind: "commerce",
  },
  "multi-vendor-marketplace-platform": {
    headline: "A scalable marketplace platform with customer, vendor, and admin workflows.",
    context:
      "The platform needed to support multiple vendors, customers, onboarding, order management, checkout, and commission logic across web and mobile surfaces.",
    challenge:
      "Marketplace builds require operational clarity across many roles. Admin control, vendor onboarding, order visibility, and payout logic needed to fit together cleanly.",
    solution:
      "Avlys designed and built the full-stack marketplace foundation with customer and vendor apps, admin panels, onboarding flows, order management, checkout, and commission rules.",
    deliverables: ["Customer and vendor apps", "Admin panels", "Order management", "Checkout and commission logic"],
    outcomes: [
      "A clearer operating system for marketplace roles.",
      "Separate workflows for customers, vendors, and admins.",
      "A scalable foundation for commerce operations.",
      "Improved visibility over onboarding, orders, and commissions.",
    ],
    visualKind: "marketplace",
  },
  "ariana-lloyd-webflow-directory-platform": {
    headline: "A Webflow directory platform with profiles, filtering, memberships, and booking flows.",
    context:
      "The project needed a directory-style marketplace that could support profiles, membership access, filtering, booking, messaging, and editorial content.",
    challenge:
      "Directory platforms depend on searchable structure and user trust. The technical challenge was connecting no-code and backend tools while keeping the experience cohesive.",
    solution:
      "Avlys assembled a Webflow, Memberstack, Wized, Xano, and Finsweet stack with profile directories, memberships, filtering, booking, messaging backend, editorial CMS, and mobile responsiveness.",
    deliverables: ["Profile directory", "Membership access", "Filtering and booking", "Messaging backend and editorial CMS"],
    outcomes: [
      "A structured directory experience for discovery and booking.",
      "A membership-ready platform with backend workflows.",
      "Cleaner content operations through editorial CMS.",
      "A responsive system built from connected no-code tools.",
    ],
    visualKind: "marketplace",
  },
  "kristen-leaman-creator-and-brand-jobs-board": {
    engagement: "Prototype / MVP",
    headline: "A creator-brand jobs board MVP with portals, payments, and CRM sync.",
    context:
      "The project needed to connect creators and brands through role-based access, job posting, applications, payments, and operational CRM workflows.",
    challenge:
      "The MVP had to validate marketplace behavior without overbuilding. Role-based flows, payments, and application handling had to be understandable from the first release.",
    solution:
      "Avlys built a creator economy marketplace MVP with brand and creator portals, job posting, applications, Stripe payments, GHL CRM sync, and support.",
    deliverables: ["Role-based portals", "Job posting and applications", "Stripe payments", "GHL CRM sync"],
    outcomes: [
      "A working MVP for creator-brand matching.",
      "Clearer role separation between brands and creators.",
      "Payment and CRM workflows connected to the platform.",
      "A practical base for marketplace validation.",
    ],
    visualKind: "marketplace",
  },
  "joanna-koh-client-vendor-service-platform": {
    headline: "A full-stack service marketplace with matching, scheduling, escrow, and admin control.",
    context:
      "The platform needed to coordinate clients and vendors through smart matching, scheduling, payments, reviews, and operational oversight.",
    challenge:
      "Service marketplaces need trust and control on both sides. Matching, escrow, scheduling, reviews, and admin visibility had to work as a complete system.",
    solution:
      "Avlys designed a full-stack service marketplace using React/Next.js, backend services, PostgreSQL, and Stripe with smart matching, scheduling, escrow payments, reviews, ratings, and admin dashboard.",
    deliverables: ["Smart matching", "Scheduling flows", "Escrow payments", "Reviews, ratings, and admin dashboard"],
    outcomes: [
      "A clearer marketplace workflow from discovery to payment.",
      "Better trust mechanisms through reviews and escrow.",
      "Operational visibility for platform admins.",
      "A full-stack base for service marketplace growth.",
    ],
    visualKind: "marketplace",
  },
  "off-grid-modular-ai-ecosystem": {
    headline: "An offline modular AI ecosystem for local routing, RAG, automation, and avatar rendering.",
    context:
      "The system needed to run AI workflows in an off-grid local environment with modular services for LLMs, automation, retrieval, and content generation.",
    challenge:
      "Offline AI stacks require careful service orchestration. The challenge was to connect local models, automation tools, vector storage, and generation pipelines without cloud dependency.",
    solution:
      "Avlys assembled an Ubuntu-based ecosystem using Ollama, LocalAI, n8n, ChromaDB, Wav2Lip, local RAG, LLM routing, outreach automation, content generation, and avatar rendering.",
    deliverables: ["Local LLM routing", "n8n automation", "ChromaDB RAG", "Avatar and content generation"],
    outcomes: [
      "A modular local AI environment for experimentation and operations.",
      "Reduced dependency on cloud-only AI workflows.",
      "Connected retrieval, automation, and generation services.",
      "A system architecture that can be extended module by module.",
    ],
    visualKind: "ai-system",
  },
  "agentic-ai-architecture-and-engineering": {
    engagement: "Architecture engagement",
    process: [
      "Mapped agent responsibilities, shared state, and operational constraints.",
      "Designed orchestration and human-review checkpoints.",
      "Specified state transitions, error recovery, and escalation paths.",
      "Documented the architecture and implementation considerations.",
    ],
    headline: "Enterprise multi-agent architecture for stateful workflows and human-in-the-loop control.",
    context:
      "The work focused on designing robust agentic systems that could coordinate multiple agents, state, tasks, errors, and documentation.",
    challenge:
      "Agentic systems become brittle when orchestration, state, and human checkpoints are not designed upfront. The architecture needed operational clarity, not just prompt chains.",
    solution:
      "Avlys designed multi-agent architectures using LangGraph, CrewAI, AutoGen, OpenAI, Anthropic, and Gemini patterns with orchestration, HITL workflows, state-managed pipelines, error handling, and documentation.",
    deliverables: ["Multi-agent orchestration", "Human-in-the-loop workflows", "State-managed pipelines", "Error handling and documentation"],
    outcomes: [
      "A clearer blueprint for production-grade agent systems.",
      "Better separation of agent responsibilities and state.",
      "Defined checkpoints for human review and error handling.",
      "Reusable architecture patterns for advanced AI workflows.",
    ],
    visualKind: "ai-system",
  },
  "multi-agent-customer-support-system": {
    engagement: "Architecture engagement",
    process: [
      "Mapped request types and support knowledge sources.",
      "Separated intent routing, policy retrieval, and structured data lookup.",
      "Specified grounding and observability requirements.",
      "Documented the proposed support architecture for implementation.",
    ],
    headline: "A three-agent support system design for routing, retrieval, and structured customer answers.",
    context:
      "The system explored how an ecommerce support flow could use multiple agents to route requests, answer policy questions, and retrieve structured data.",
    challenge:
      "Support automation needs grounding and observability. The design needed to avoid generic answers by separating routing, policy retrieval, data lookup, and monitoring.",
    solution:
      "Avlys designed a three-agent support system with Relevance AI and Langflow patterns, including routing, RAG policy answers, structured data retrieval, grounding, and observability research.",
    deliverables: ["Intent routing agent", "RAG policy answer flow", "Structured data retrieval", "Grounding and observability plan"],
    outcomes: [
      "A clearer support automation architecture for ecommerce use cases.",
      "Reduced risk of unsupported answers through grounding.",
      "Defined agent roles for routing, retrieval, and response.",
      "A research-backed base for support automation implementation.",
    ],
    visualKind: "ai-system",
  },
  "ai-real-estate-voice-agent": {
    headline: "A 24/7 real estate voice agent for calls, qualification, visits, and WhatsApp follow-up.",
    context:
      "Real estate teams miss high-intent leads when calls arrive after hours or during busy periods. The system needed to qualify and route prospects quickly.",
    challenge:
      "The agent had to handle natural call flow while collecting structured buyer details such as budget, location, timeline, and visit preference.",
    solution:
      "Avlys designed a voice and WhatsApp automation system that handles calls, screens buyer intent, schedules visits, sends brochures, and prepares structured lead notes.",
    deliverables: ["AI voice call flow", "Lead qualification script", "Visit scheduling handoff", "WhatsApp brochure follow-up"],
    outcomes: [
      "Fewer missed real estate inquiries after hours.",
      "Consistent qualification across every call.",
      "Structured notes for sales follow-up.",
      "A faster bridge from call interest to WhatsApp engagement.",
    ],
    visualKind: "voice-agent",
  },
  "lead-automation-suite": {
    headline: "A lead automation suite for capture, qualification, scoring, routing, and nurture.",
    context:
      "The system needed to reduce manual follow-up delays and make lead handling more consistent across capture channels.",
    challenge:
      "Lead data often becomes scattered across forms, chats, spreadsheets, and CRMs. The automation had to turn that mess into a repeatable workflow.",
    solution:
      "Avlys designed an end-to-end lead system with capture, qualification, scoring, routing, CRM handoff, and nurture sequences.",
    deliverables: ["Lead capture flow", "Qualification and scoring", "CRM routing", "Automated nurture sequences"],
    outcomes: [
      "Faster first response to inbound leads.",
      "Better prioritization for sales teams.",
      "Cleaner handoffs from intake to CRM.",
      "More consistent follow-up for not-ready prospects.",
    ],
    visualKind: "automation",
  },
  "whatsapp-chatbot-systems": {
    headline: "WhatsApp chatbot systems for FAQs, brochures, buyer requirements, and follow-up.",
    context:
      "Many Indian and global customers prefer WhatsApp for quick inquiry and follow-up. The system needed to make that channel more structured and useful.",
    challenge:
      "WhatsApp conversations can become hard to track when every buyer asks different questions. The bot needed to answer, collect context, and route next steps.",
    solution:
      "Avlys designed WhatsApp bots for brochures, FAQs, buyer requirements, lead capture, and automated follow-up across real estate, D2C, and service workflows.",
    deliverables: ["WhatsApp FAQ flow", "Brochure automation", "Buyer requirement capture", "Follow-up sequences"],
    outcomes: [
      "Instant responses to common WhatsApp questions.",
      "More structured buyer and customer data.",
      "Faster brochure and information delivery.",
      "Cleaner routing from chat to sales or support.",
    ],
    visualKind: "automation",
  },
};

export const caseStudies: CaseStudy[] = portfolioItems.map((item) => {
  const detail = detailsBySlug[item.slug];
  if (!detail) {
    throw new Error(`Missing case study detail for slug: ${item.slug}`);
  }
  return {
    ...item,
    ...detail,
    process: detail.process ?? processByKind[detail.visualKind],
  };
});

// Curated for the enterprise audience: platform and AI builds lead.
const featuredSlugs = [
  "mike-legal-ai",
  "workshop-management-system",
  "hospital-voice-agent",
  "hiredesk-recruiting-match-system",
];

export const featuredCaseStudies = featuredSlugs
  .map((slug) => caseStudies.find((caseStudy) => caseStudy.slug === slug))
  .filter((caseStudy): caseStudy is CaseStudy => Boolean(caseStudy));

export const getCaseStudy = (slug: string) =>
  caseStudies.find((caseStudy) => caseStudy.slug === slug);
