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
  context: string;
  challenge: string;
  solution: string;
  deliverables: string[];
  outcomes: string[];
  process: string[];
  visualKind: VisualKind;
};

export type CaseStudy = PortfolioItem & CaseStudyDetail;

const defaultProcess = [
  "Mapped the user journey, operating workflow, and conversion or handoff points.",
  "Defined the information architecture, system rules, and implementation plan.",
  "Built the interface, integration layer, content structure, and launch-ready handoff.",
  "Reviewed performance, responsiveness, QA issues, and post-launch support needs.",
];

const detailsBySlug: Record<string, CaseStudyDetail> = {
  "pooja-banvar-professional-business-website": {
    headline: "A polished professional website built to turn credibility into inbound inquiries.",
    context:
      "The project needed a clear business presence with sharp service positioning, a mobile-friendly browsing path, and contact capture that did not feel like a generic template.",
    challenge:
      "The main challenge was balancing trust, clarity, and speed. Visitors needed to understand the offer quickly, move through the pages without friction, and reach the contact path from any device.",
    solution:
      "Avlys created a responsive WordPress website with custom styling, service-led page structure, on-page SEO foundations, analytics setup, and a cleaner inquiry flow.",
    deliverables: ["Responsive business website", "Contact lead capture", "On-page SEO setup", "Analytics and speed tuning"],
    outcomes: [
      "A more credible first impression for prospects and referral traffic.",
      "Cleaner service discovery across mobile and desktop.",
      "A direct contact path for qualified inquiries.",
      "A maintainable content foundation for future updates.",
    ],
    process: defaultProcess,
    visualKind: "website",
  },
  "saud-khan-freelance-developer-personal-website": {
    headline: "A mobile-first personal site designed around proof, services, and direct outreach.",
    context:
      "The website needed to present a freelance developer as credible, available, and easy to contact without overwhelming visitors with unnecessary pages.",
    challenge:
      "Personal sites often become either too minimal to convert or too crowded to scan. This project needed a focused portfolio narrative and a fast mobile experience.",
    solution:
      "Avlys built a responsive personal website with a compact CMS setup, service sections, SEO basics, contact flow, and post-launch support.",
    deliverables: ["Mobile-first website", "Portfolio and service sections", "CMS setup", "SEO and performance foundations"],
    outcomes: [
      "A sharper public profile for freelance opportunities.",
      "Clearer project and skill presentation.",
      "A lower-friction path from visitor interest to contact.",
      "A site structure that can grow with future case work.",
    ],
    process: defaultProcess,
    visualKind: "website",
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
    process: defaultProcess,
    visualKind: "website",
  },
  "aniket-nikhade-high-performance-custom-website": {
    headline: "A custom website focused on conversion quality, performance, and structured proof.",
    context:
      "The project required a custom build rather than a stock theme, with stronger UI, backend support, and search-ready technical details.",
    challenge:
      "The site needed to feel distinct while staying fast, responsive, and easy to maintain. Performance and structured data were important parts of the brief.",
    solution:
      "Avlys built a custom HTML, CSS, JavaScript, and CMS solution with conversion-focused UI, backend integration, structured data, Core Web Vitals work, and QA.",
    deliverables: ["Custom responsive interface", "Backend and CMS integration", "Structured data", "Core Web Vitals optimization"],
    outcomes: [
      "A more differentiated digital presence than a template site.",
      "Faster browsing and cleaner page structure.",
      "A stronger technical base for search engines.",
      "Better maintainability through CMS integration.",
    ],
    process: defaultProcess,
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
    process: defaultProcess,
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
    process: defaultProcess,
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
    process: defaultProcess,
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
    process: defaultProcess,
    visualKind: "commerce",
  },
  "shopify-freelance-build-d2c-brand-store": {
    headline: "A custom Shopify build with bespoke sections and conversion-ready store flows.",
    context:
      "The project needed a practical Shopify implementation that could move beyond default theme behavior while staying manageable for a D2C brand.",
    challenge:
      "The store needed custom sections, review and upsell support, speed work, and a clean operational handoff without overcomplicating the build.",
    solution:
      "Avlys handled Shopify Liquid customization, bespoke content sections, app integrations for reviews and upsells, speed optimization, and support.",
    deliverables: ["Shopify Liquid customization", "Custom store sections", "Reviews and upsell apps", "Speed optimization"],
    outcomes: [
      "A storefront that feels more tailored than a default theme.",
      "Cleaner merchandising sections for products and offers.",
      "Better support for trust and upsell moments.",
      "A practical Shopify base for future changes.",
    ],
    process: defaultProcess,
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
    process: defaultProcess,
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
    process: defaultProcess,
    visualKind: "marketplace",
  },
  "kristen-leaman-creator-and-brand-jobs-board": {
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
    process: defaultProcess,
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
    process: defaultProcess,
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
    process: defaultProcess,
    visualKind: "ai-system",
  },
  "agentic-ai-architecture-and-engineering": {
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
    process: defaultProcess,
    visualKind: "ai-system",
  },
  "multi-agent-customer-support-system": {
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
    process: defaultProcess,
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
    process: defaultProcess,
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
    process: defaultProcess,
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
    process: defaultProcess,
    visualKind: "automation",
  },
  "ngo-website-maintenance-dual-site-retainer": {
    headline: "A dual-site NGO maintenance retainer for updates, security, backups, and reporting.",
    context:
      "The client needed reliable ongoing care for two NGO websites without turning every update, patch, or backup into a one-off fire drill.",
    challenge:
      "Maintenance work is operationally important but easy to neglect. The sites needed predictable updates, backups, security checks, performance fixes, and reporting.",
    solution:
      "Avlys provided a monthly WordPress support retainer covering content updates, backups, patching, malware scans, performance improvements, fixes, and reporting.",
    deliverables: ["Monthly content updates", "Backups and patching", "Malware scans", "Performance fixes and reporting"],
    outcomes: [
      "More reliable upkeep across two NGO websites.",
      "Reduced operational risk from missed updates.",
      "Clearer visibility through reporting.",
      "A predictable support rhythm for ongoing website needs.",
    ],
    process: defaultProcess,
    visualKind: "maintenance",
  },
};

const fallbackDetail = (item: PortfolioItem): CaseStudyDetail => ({
  headline: `${item.title} delivered as a focused Avlys AI case study.`,
  context: item.description,
  challenge:
    "The project needed a cleaner operating model, stronger digital presentation, and a launch-ready system that could be maintained after delivery.",
  solution:
    "Avlys mapped the requirements, designed the workflow and interface, built the system, and prepared the handoff for ongoing use.",
  deliverables: [item.type, item.stack, "Responsive implementation", "Post-launch support"],
  outcomes: [
    "Clearer user journeys.",
    "A stronger technical foundation.",
    "More maintainable project structure.",
    "A practical path for future iteration.",
  ],
  process: defaultProcess,
  visualKind: "website",
});

export const caseStudies: CaseStudy[] = portfolioItems.map((item) => ({
  ...item,
  ...(detailsBySlug[item.slug] ?? fallbackDetail(item)),
}));

export const featuredCaseStudies = caseStudies.slice(0, 6);

export const getCaseStudy = (slug: string) =>
  caseStudies.find((caseStudy) => caseStudy.slug === slug);
