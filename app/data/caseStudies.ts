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
  engagement: "Software build" | "Architecture engagement" | "Scope proposal" | "Prototype / MVP";
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
    engagement: "Software build",
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
    engagement: "Software build",
    headline: "A custom studio operations platform for bookings, shoots, albums, and delivery.",
    context:
      "A photography studio needed one signed-in system for client bookings, shoot days, album delivery, and the admin work that usually sits in WhatsApp and sheets.",
    challenge:
      "Wedding studios lose track of dates, packages, and deliverables when operations stay in chat. The product had to feel like a business OS, not a brochure site.",
    solution:
      "Avlys built a Next.js 14 and Supabase platform with authenticated studio workflows, operational records, and a shadcn/ui interface designed for daily use.",
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
    engagement: "Software build",
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
    engagement: "Software build",
    headline: "A recruiting backend that parses resumes, ingests jobs, and ranks fit.",
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
    engagement: "Software build",
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
    engagement: "Software build",
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
    engagement: "Software build",
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
    engagement: "Software build",
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
    engagement: "Software build",
    headline: "A three-city cafe website that sends guests to the right outlet, not a third-party app.",
    context:
      "Godwit Cafe runs Indore, Raipur, and Nagpur with different service models. Party-hall booking in Raipur still lived on phone and aggregator apps.",
    challenge:
      "Each outlet has different menus, hours, and booking needs. Guests needed a clear route to the right location and a direct enquiry option.",
    solution:
      "Avlys built a Next.js site with city pages, menus, and a direct booking path for the three outlets.",
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
    engagement: "Software build",
    headline: "A neighborhood cafe site for Kikki's on GE Road, Raipur.",
    context:
      "Kikki's Cafe has been a pure-veg comfort cafe since 2015. Reservations and story lived on Google and Instagram.",
    challenge:
      "A single outlet does not need an app. It needs a fast page for menu, reviews, hours, and a phone or WhatsApp enquiry.",
    solution:
      "Avlys built a website covering the cafe's story, favourites, Google reviews, maps, and Instagram.",
    deliverables: ["Single-outlet website", "Menu and story", "Maps and reviews", "Instagram embed"],
    outcomes: [
      "Raipur guests can read the menu without opening Zomato first.",
      "Reviews and address sit on a page the cafe owns.",
      "Phone and directions stay one tap away.",
      "The cafe's story and social content are accessible alongside practical visit information.",
    ],
    visualKind: "website",
  },
  "taomish-ctrm-website-redesign": {
    engagement: "Software build",
    headline: "An enterprise CTRM website redesign for trading, treasury, risk, and derivatives.",
    context:
      "Taomish needed taomish.com rebuilt as a premium B2B presence for Xceler, with clearer solution stories and a demo request path.",
    challenge:
      "Commodity CTRM sites fail when they look like a brochure. Navigation, storytelling, and lead capture had to match an enterprise buyer.",
    solution:
      "Avlys designed and built a Next.js website covering trading, treasury, risk analytics, and hedging, with a demo form. The engagement covered the marketing website; Xceler application development was outside this scope.",
    deliverables: ["Information architecture", "Enterprise UI", "Solution pages", "Demo lead capture"],
    outcomes: [
      "Trading, treasury, risk, and derivatives each have a clear path.",
      "Demo requests land in one form instead of a generic contact dump.",
      "The stack can take a headless CMS later without a rebuild.",
      "Solution pages explain the Xceler offer to enterprise evaluators.",
    ],
    visualKind: "website",
  },
  "girish-lakhotya-bondsman-website": {
    engagement: "Software build",
    headline: "A founder website for Girish Lakhotya and the Bond Smart initiative.",
    context:
      "Girish Lakhotya needed a public home for his professional biography, essays, video, and the Bond Smart initiative.",
    challenge:
      "Visitors needed to understand the founder's work, find relevant media, and contact him about speaking, press, or the Bond Smart initiative.",
    solution:
      "Avlys built a Next.js website with biography, essays, video, podcasts, a Bond Smart section, and an inquiry form.",
    deliverables: ["Founder website", "Thoughts and video index", "Bond Smart section", "Inquiry form"],
    outcomes: [
      "Press and speaking enquiries have a direct contact path.",
      "A dedicated section explains the Bond Smart initiative.",
      "Essays and video sit next to the biography.",
      "Visitors can explore written and recorded material from the same site.",
    ],
    visualKind: "website",
  },
  "indexpilot": {
    engagement: "Software build",
    headline: "A focused web interface for search visibility and indexing work.",
    context:
      "IndexPilot needed a public web interface for its search-visibility and indexing offer.",
    challenge:
      "The project needed a focused interface and an accessible deployment for users to explore the indexing offer.",
    solution:
      "Avlys implemented a Next.js web interface and deployed it on Vercel. This case documents the web surface; indexing effectiveness has not been measured here.",
    deliverables: ["Single web app", "Indexing surface", "Vercel deploy"],
    outcomes: [
      "A web interface for the indexing offer.",
      "A deployed surface available through the project link.",
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
      "Avlys defined the modules and integration boundaries for the client, API gateway, application services, data, and infrastructure. This case study includes an architecture diagram. The cover is a product illustration.",
    deliverables: ["Android and web client architecture", "Identity and membership service design", "Education and help-network module design", "Verification and payment integration boundaries"],
    outcomes: [
      "Mobile, web, and admin share one gateway.",
      "Identity verification is a service, not a one-off screen.",
      "Vector search, object storage, and PostgreSQL have defined responsibilities in the proposed data layer.",
      "Infrastructure and cross-cutting concerns are defined alongside the application layers.",
    ],
    process: ["Mapped mobile, web, admin, and third-party client needs.", "Separated identity, membership, education, and professional service responsibilities.", "Defined data stores and external integration boundaries.", "Documented proposed infrastructure, access controls, and operational concerns."],
    visualKind: "marketplace",
  },
  "integrated-erp-and-club-management": {
    engagement: "Architecture engagement",
    headline: "An operations architecture connecting club membership, billing, HR, and finance.",
    context:
      "The club needed employee, membership, billing, inventory, and approvals without reconciling five tools.",
    challenge:
      "Membership, employee records, billing, and approvals needed shared data and clear access boundaries across locations.",
    solution:
      "Avlys proposed a unified operations platform with role-based access, multi-location workflows, and reporting over shared records. This engagement covers architecture and scope, rather than an implemented application.",
    deliverables: ["HR and payroll module scope", "Membership and billing model", "Inventory and asset requirements", "Approval and reporting design"],
    outcomes: [
      "A shared record model for membership and finance.",
      "Defined approval steps and role boundaries.",
      "A reporting design covering multiple locations.",
      "Documented module boundaries for a future build.",
    ],
    visualKind: "marketplace",
  },
  "bromechanic-multi-city-service-platform": {
    engagement: "Architecture engagement",
    headline: "A multi-city bike-service platform design for bookings, dispatch, and follow-up.",
    context:
      "BroMechanic was expanding beyond Bangalore with Google Ads dependence, mechanic leakage, and no city-wise routing.",
    challenge:
      "A marketing site without ops still leaks repeat jobs to mechanics. The website, CRM, and call masking had to be one platform.",
    solution:
      "Avlys designed city landing pages, slot booking, Exotel-style masked calling, mechanic assignment, and follow-up sequences as a single system.",
    deliverables: ["City-page and booking flow design", "Customer pipeline design", "Call-masking integration plan", "Mechanic assignment and follow-up rules"],
    outcomes: [
      "A shared design for city-level intake and lead routing.",
      "Defined call-masking boundaries between customers and mechanics.",
      "A repeat-service tracking flow for the operations team.",
      "Connected requirements for bookings, dispatch, and follow-up.",
    ],
    visualKind: "marketplace",
  },
  "mns-job-and-career-portal": {
    engagement: "Scope proposal",
    headline: "A career-portal proposal for student matching, applications, and recruitment tracking.",
    context:
      "MNS Institute wanted students to search and apply inside an MNS product, with nursing and healthcare as a core track, while jobs still come from partner APIs.",
    challenge:
      "A careers website that dumps students onto third-party boards loses the relationship. The portal had to own profile, matching, and tracking.",
    solution:
      "Avlys scoped a student portal, admin pipeline, job APIs, matching, and an application engine with email and WhatsApp notifications.",
    deliverables: ["Student profile requirements", "Job aggregation scope", "Matching and application workflow scope", "Admin recruitment dashboard requirements"],
    outcomes: [
      "A proposed student journey within the MNS brand.",
      "Application tracking requirements for different job providers.",
      "Shared filtering requirements for nursing and other categories.",
      "A defined starting scope for implementation planning.",
    ],
    visualKind: "marketplace",
  },
  "ai-trade-intel-equity-and-derivatives": {
    engagement: "Software build",
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
    engagement: "Scope proposal",
    headline: "A P2P camera ecosystem proposal spanning firmware, mobile, and web.",
    context:
      "Sanjay Pal needed firmware, Android, iOS, and a web viewer that pair on the local network without sending video through Avlys servers.",
    challenge:
      "Firmware, mobile clients, and a browser viewer needed a shared pairing and WebRTC design that avoids a central video relay.",
    solution:
      "Avlys scoped an embedded C/C++ bridge, native apps, PIN pairing, and a live web dashboard as a single ecosystem.",
    deliverables: ["Firmware WebRTC bridge scope", "Android and iOS client requirements", "Web viewer requirements", "mDNS and PIN-pairing design"],
    outcomes: [
      "A proposed device-to-device video path.",
      "A rotating-PIN pairing design.",
      "A shared handshake specification for web and mobile.",
      "Defined responsibilities across firmware and client applications.",
    ],
    visualKind: "ai-system",
  },
  "realcrm-real-estate-pipeline": {
    engagement: "Software build",
    headline: "A custom sales workspace connecting real-estate enquiries, ownership, and buyer follow-up.",
    context:
      "Sales managers needed contacts, scores, owners, and follow-up sequences in one workspace so each enquiry had a clear next step.",
    challenge:
      "Enquiries from different channels needed consistent qualification, a responsible sales owner, and visible progress through the buying journey.",
    solution:
      "Avlys delivered a contact pipeline from new lead to closed-won, with an editable buyer nurture sequence and owner routing.",
    deliverables: ["Contact pipeline", "Scoring and owners", "Email sequence builder", "Export and add-contact flows"],
    outcomes: [
      "Stage counts sit above the same contact table.",
      "Nurture steps are visible next to the pipeline.",
      "WhatsApp and Meta ads can feed the same record.",
      "Owner assignment gives each contact a clear follow-up responsibility.",
    ],
    visualKind: "automation",
  },
  "darshan-thaker-b2b-engineering-cms-website": {
    engagement: "Software build",
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
    engagement: "Software build",
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
    engagement: "Software build",
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
    engagement: "Software build",
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
    engagement: "Software build",
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
    engagement: "Software build",
    headline: "A marketplace platform with customer, vendor, and admin workflows.",
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
      "Shared order and commission records for commerce operations.",
      "Improved visibility over onboarding, orders, and commissions.",
    ],
    visualKind: "marketplace",
  },
  "ariana-lloyd-webflow-directory-platform": {
    engagement: "Software build",
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
    engagement: "Architecture engagement",
    headline: "A service-marketplace architecture for matching, scheduling, payments, and admin control.",
    context:
      "The platform needed to coordinate clients and vendors through smart matching, scheduling, payments, reviews, and operational oversight.",
    challenge:
      "Service marketplaces need trust and control on both sides. Matching, escrow, scheduling, reviews, and admin visibility had to work as a complete system.",
    solution:
      "Avlys designed a full-stack service marketplace using React/Next.js, backend services, PostgreSQL, and Stripe with smart matching, scheduling, escrow payments, reviews, ratings, and admin dashboard.",
    deliverables: ["Matching and scheduling design", "Payment and escrow workflow design", "Review and rating model", "Admin dashboard requirements"],
    outcomes: [
      "A defined marketplace workflow from discovery to payment.",
      "Proposed trust mechanisms using reviews and payment controls.",
      "Documented operational views for platform admins.",
      "Architecture and workflow requirements for a future build.",
    ],
    visualKind: "marketplace",
  },
  "off-grid-modular-ai-ecosystem": {
    engagement: "Prototype / MVP",
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
    engagement: "Architecture engagement",
    headline: "A real-estate voice-agent design for qualification, visits, and WhatsApp follow-up.",
    context:
      "Real estate teams miss high-intent leads when calls arrive after hours or during busy periods. The system needed to qualify and route prospects quickly.",
    challenge:
      "The agent had to handle natural call flow while collecting structured buyer details such as budget, location, timeline, and visit preference.",
    solution:
      "Avlys designed a voice and WhatsApp automation system that handles calls, screens buyer intent, schedules visits, sends brochures, and prepares structured lead notes.",
    deliverables: ["AI voice call flow", "Lead qualification script", "Visit scheduling handoff", "WhatsApp brochure follow-up"],
    outcomes: [
      "A proposed intake flow for after-hours enquiries.",
      "Defined qualification questions and handoff rules.",
      "A structured note format for sales follow-up.",
      "A designed handoff from calls to WhatsApp information delivery.",
    ],
    visualKind: "voice-agent",
  },
  "lead-automation-suite": {
    engagement: "Architecture engagement",
    headline: "A lead-automation design for capture, qualification, scoring, routing, and nurture.",
    context:
      "The system needed to reduce manual follow-up delays and make lead handling more consistent across capture channels.",
    challenge:
      "Lead data often becomes scattered across forms, chats, spreadsheets, and CRMs. The automation had to turn that mess into a repeatable workflow.",
    solution:
      "Avlys designed an end-to-end lead system with capture, qualification, scoring, routing, CRM handoff, and nurture sequences.",
    deliverables: ["Lead capture flow", "Qualification and scoring", "CRM routing", "Automated nurture sequences"],
    outcomes: [
      "Defined response and routing rules for inbound leads.",
      "A scoring model for sales prioritization.",
      "Documented handoffs from intake to the sales workspace.",
      "Nurture-sequence designs for prospects who are not ready to buy.",
    ],
    visualKind: "automation",
  },
  "whatsapp-chatbot-systems": {
    engagement: "Architecture engagement",
    headline: "WhatsApp workflow designs for FAQs, brochures, buyer requirements, and follow-up.",
    context:
      "Many Indian and global customers prefer WhatsApp for quick inquiry and follow-up. The system needed to make that channel more structured and useful.",
    challenge:
      "WhatsApp conversations can become hard to track when every buyer asks different questions. The bot needed to answer, collect context, and route next steps.",
    solution:
      "Avlys designed WhatsApp bots for brochures, FAQs, buyer requirements, lead capture, and automated follow-up across real estate, D2C, and service workflows.",
    deliverables: ["WhatsApp FAQ flow", "Brochure automation", "Buyer requirement capture", "Follow-up sequences"],
    outcomes: [
      "Defined answer paths for common WhatsApp questions.",
      "A structured buyer-requirement capture flow.",
      "Brochure and information delivery rules.",
      "Designed routing from chat to sales or support.",
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
    // Only publish process steps documented for this engagement.
    process: detail.process ?? [],
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
