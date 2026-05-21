import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { caseStudies, getCaseStudy } from "../../data/caseStudies";

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

type ImageProps = {
  params: Promise<{
    slug: string;
  }>;
  searchParams?: Promise<{
    variant?: string;
  }>;
};

type VisualLayout =
  | "serviceSite"
  | "personalSite"
  | "engineeringCms"
  | "performanceSite"
  | "luxurySite"
  | "gamingSite"
  | "foodCommerce"
  | "beautyCommerce"
  | "shopifyStore"
  | "vendorMarketplace"
  | "directoryPlatform"
  | "jobsBoard"
  | "serviceMarketplace"
  | "offgridAi"
  | "agenticAi"
  | "supportAi"
  | "voiceAgent"
  | "leadAutomation"
  | "whatsappAutomation"
  | "maintenanceReport";

type VisualSpec = {
  layout: VisualLayout;
  product: string;
  surface: string;
  primary: string;
  secondary: string;
  modules: string[];
  flow: string[];
  metrics: string[];
  evidence: string[];
};

export function generateStaticParams() {
  return caseStudies.map((caseStudy) => ({
    slug: caseStudy.slug,
  }));
}

const visualSpecs: Record<string, VisualSpec> = {
  "pooja-banvar-professional-business-website": {
    layout: "serviceSite",
    product: "Professional business website",
    surface: "Homepage + inquiry path",
    primary: "Services, proof, and contact flow",
    secondary: "A calm website system built to turn referral traffic into qualified inquiries.",
    modules: ["Hero offer", "Service cards", "Lead form", "Analytics"],
    flow: ["Visitor", "Service page", "Proof block", "Inquiry"],
    metrics: ["Responsive", "SEO ready", "Contact capture"],
    evidence: ["On-page SEO", "Speed tuning", "Lead capture"],
  },
  "saud-khan-freelance-developer-personal-website": {
    layout: "personalSite",
    product: "Freelance developer portfolio",
    surface: "Profile + proof stack",
    primary: "Compact personal site with direct outreach",
    secondary: "A mobile-first proof page for services, projects, and contact.",
    modules: ["Profile", "Projects", "Services", "Contact"],
    flow: ["Recruiter", "Proof", "Offer", "Message"],
    metrics: ["Mobile first", "CMS ready", "Fast load"],
    evidence: ["Portfolio sections", "SEO basics", "Contact path"],
  },
  "darshan-thaker-b2b-engineering-cms-website": {
    layout: "engineeringCms",
    product: "B2B engineering CMS",
    surface: "Services + projects + blog CMS",
    primary: "Technical credibility with searchable project proof",
    secondary: "Dynamic service pages, project filtering, maps, blog publishing, and WhatsApp CTA.",
    modules: ["ACF fields", "Project filters", "Maps CTA", "Blog CMS"],
    flow: ["Search", "Service", "Project", "WhatsApp"],
    metrics: ["Dynamic CMS", "Local SEO", "CDN + security"],
    evidence: ["Service schema", "Project filters", "Publishing workflow"],
  },
  "aniket-nikhade-high-performance-custom-website": {
    layout: "performanceSite",
    product: "High-performance custom website",
    surface: "Core Web Vitals + structured data",
    primary: "Custom interface built around speed and conversion",
    secondary: "A lean custom build with CMS integration, structured data, and QA.",
    modules: ["Custom UI", "CMS", "Schema", "Vitals"],
    flow: ["Landing", "Proof", "Conversion", "QA"],
    metrics: ["CWV ready", "Structured data", "CMS control"],
    evidence: ["Backend integration", "Performance pass", "Responsive QA"],
  },
  "aqua-flight-luxury-yacht-services-rebuild": {
    layout: "luxurySite",
    product: "Luxury yacht services rebuild",
    surface: "Charter + buying + concierge journeys",
    primary: "Premium service architecture without visual noise",
    secondary: "A Webflow rebuild for high-intent luxury service visitors.",
    modules: ["Charter", "Buy", "Logistics", "Concierge"],
    flow: ["Discover", "Service path", "Request", "Concierge"],
    metrics: ["Luxury IA", "SEO migration", "Landing zones"],
    evidence: ["Service routing", "Premium UX", "Migration planning"],
  },
  "luis-orozco-casino-and-gaming-brand-website": {
    layout: "gamingSite",
    product: "Casino and gaming brand website",
    surface: "LATAM brand experience",
    primary: "Immersive gaming site with controlled navigation",
    secondary: "Research, Figma direction, responsive build, QA, and go-live support.",
    modules: ["Campaigns", "Games", "Region", "Support"],
    flow: ["Campaign", "Game detail", "Signup", "QA"],
    metrics: ["LATAM ready", "Responsive", "Launch support"],
    evidence: ["Research", "Figma design", "Go-live QA"],
  },
  "alesonfoods-d2c-food-e-commerce-website": {
    layout: "foodCommerce",
    product: "D2C food ecommerce",
    surface: "Catalog + cart + checkout",
    primary: "Mobile-first storefront with trust and checkout clarity",
    secondary: "A premium product path from catalog discovery to payment.",
    modules: ["Catalog", "Cart", "Payments", "Trust"],
    flow: ["Browse", "Product", "Cart", "Checkout"],
    metrics: ["Mobile store", "Payment ready", "SEO catalog"],
    evidence: ["Trust blocks", "Product grid", "Checkout flow"],
  },
  "fat-cow-skincare-d2c-beauty-e-commerce-website": {
    layout: "beautyCommerce",
    product: "D2C skincare storefront",
    surface: "Concern quiz + ingredients + proof",
    primary: "Editorial commerce built around skin concerns",
    secondary: "A guided storefront that educates before it sells.",
    modules: ["Skin quiz", "Ingredients", "Proof", "Products"],
    flow: ["Concern", "Routine", "Product", "Checkout"],
    metrics: ["Quiz-led", "Ingredient proof", "Mobile commerce"],
    evidence: ["Concern flow", "Education", "Trust proof"],
  },
  "shopify-freelance-build-d2c-brand-store": {
    layout: "shopifyStore",
    product: "Shopify D2C brand store",
    surface: "Liquid sections + reviews + upsells",
    primary: "Custom Shopify sections with conversion support",
    secondary: "A practical store build beyond default theme behavior.",
    modules: ["Liquid", "Reviews", "Upsells", "Speed"],
    flow: ["Hero", "Merchandise", "Review", "Upsell"],
    metrics: ["Custom sections", "App stack", "Speed pass"],
    evidence: ["Liquid build", "Upsell apps", "Store handoff"],
  },
  "multi-vendor-marketplace-platform": {
    layout: "vendorMarketplace",
    product: "Multi-vendor marketplace",
    surface: "Customer + vendor + admin workflows",
    primary: "Operational control for vendors, orders, and commissions",
    secondary: "A scalable commerce platform with role separation and admin visibility.",
    modules: ["Customers", "Vendors", "Orders", "Commissions"],
    flow: ["Onboard", "List", "Order", "Payout"],
    metrics: ["Role model", "Admin panel", "Commission logic"],
    evidence: ["Vendor app", "Customer app", "Order dashboard"],
  },
  "ariana-lloyd-webflow-directory-platform": {
    layout: "directoryPlatform",
    product: "Webflow directory platform",
    surface: "Profiles + filtering + booking",
    primary: "Searchable directory with membership workflows",
    secondary: "A no-code platform connected through Webflow, Memberstack, Wized, Xano, and Finsweet.",
    modules: ["Profiles", "Filters", "Booking", "Messaging"],
    flow: ["Search", "Profile", "Book", "Message"],
    metrics: ["Memberships", "Xano backend", "Editorial CMS"],
    evidence: ["Directory filters", "Profile pages", "Booking flow"],
  },
  "kristen-leaman-creator-and-brand-jobs-board": {
    layout: "jobsBoard",
    product: "Creator-brand jobs board",
    surface: "Portals + applications + payments",
    primary: "MVP marketplace for creators and brands",
    secondary: "Role-based portals, job posting, applications, Stripe, and CRM sync.",
    modules: ["Brand portal", "Creator portal", "Jobs", "Stripe"],
    flow: ["Post", "Apply", "Review", "Pay"],
    metrics: ["MVP", "CRM sync", "Role portals"],
    evidence: ["Applications", "Stripe payments", "GHL workflow"],
  },
  "joanna-koh-client-vendor-service-platform": {
    layout: "serviceMarketplace",
    product: "Client-vendor service platform",
    surface: "Matching + scheduling + escrow",
    primary: "Full-stack marketplace with trust and admin controls",
    secondary: "Smart matching, scheduling, escrow payments, reviews, ratings, and dashboarding.",
    modules: ["Matching", "Schedule", "Escrow", "Reviews"],
    flow: ["Request", "Match", "Book", "Release"],
    metrics: ["PostgreSQL", "Stripe escrow", "Admin dashboard"],
    evidence: ["Matching rules", "Escrow flow", "Review system"],
  },
  "off-grid-modular-ai-ecosystem": {
    layout: "offgridAi",
    product: "Off-grid modular AI ecosystem",
    surface: "Local LLMs + RAG + automation",
    primary: "Offline AI operating environment with modular services",
    secondary: "Ubuntu, Ollama, LocalAI, n8n, ChromaDB, Wav2Lip, and local generation workflows.",
    modules: ["Ollama", "LocalAI", "n8n", "ChromaDB"],
    flow: ["Prompt", "Route", "Retrieve", "Generate"],
    metrics: ["Offline", "Local RAG", "Avatar render"],
    evidence: ["LLM routing", "Workflow engine", "Vector store"],
  },
  "agentic-ai-architecture-and-engineering": {
    layout: "agenticAi",
    product: "Agentic AI architecture",
    surface: "LangGraph + CrewAI + HITL",
    primary: "Stateful multi-agent systems with review checkpoints",
    secondary: "A production blueprint for orchestration, state, errors, and human review.",
    modules: ["Planner", "Executor", "Reviewer", "Memory"],
    flow: ["Task", "State", "Tool", "Review"],
    metrics: ["HITL", "Stateful", "Error handling"],
    evidence: ["Agent roles", "Pipeline state", "Docs handoff"],
  },
  "multi-agent-customer-support-system": {
    layout: "supportAi",
    product: "Multi-agent support system",
    surface: "Routing + RAG + observability",
    primary: "Three-agent support design for grounded ecommerce answers",
    secondary: "Intent routing, policy retrieval, structured data lookup, grounding, and monitoring.",
    modules: ["Router", "Policy RAG", "Data lookup", "Monitor"],
    flow: ["Ticket", "Route", "Retrieve", "Answer"],
    metrics: ["Grounded", "Observable", "Three agents"],
    evidence: ["Routing logic", "Policy answers", "Trace view"],
  },
  "ai-real-estate-voice-agent": {
    layout: "voiceAgent",
    product: "AI real estate voice agent",
    surface: "Call + qualification + WhatsApp",
    primary: "24/7 lead qualification system for real estate teams",
    secondary: "A voice flow that screens budget, timeline, location, and visit intent, then follows up on WhatsApp.",
    modules: ["Inbound call", "Lead score", "Visit", "WhatsApp"],
    flow: ["Call", "Qualify", "Schedule", "Brochure"],
    metrics: ["24/7", "Budget capture", "Visit handoff"],
    evidence: ["Call transcript", "Lead notes", "WhatsApp follow-up"],
  },
  "lead-automation-suite": {
    layout: "leadAutomation",
    product: "Lead automation suite",
    surface: "Capture + score + route + nurture",
    primary: "Sales workflow that turns scattered leads into prioritized action",
    secondary: "A complete lead handling system across forms, chats, scoring, CRM routing, and nurture.",
    modules: ["Capture", "Score", "Route", "Nurture"],
    flow: ["Form", "Score", "Owner", "Follow-up"],
    metrics: ["Faster response", "CRM handoff", "Nurture logic"],
    evidence: ["Lead scoring", "Routing rules", "Follow-up queue"],
  },
  "whatsapp-chatbot-systems": {
    layout: "whatsappAutomation",
    product: "WhatsApp chatbot systems",
    surface: "FAQs + brochures + requirement capture",
    primary: "Structured WhatsApp automation for buyers and support",
    secondary: "Bots that answer questions, send brochures, capture requirements, and route next steps.",
    modules: ["FAQ", "Brochure", "Requirements", "Follow-up"],
    flow: ["Question", "Answer", "Capture", "Route"],
    metrics: ["Instant reply", "Structured data", "Auto follow-up"],
    evidence: ["Chat flow", "Buyer fields", "Sequence queue"],
  },
  "ngo-website-maintenance-dual-site-retainer": {
    layout: "maintenanceReport",
    product: "Dual-site NGO maintenance",
    surface: "Backups + patches + malware + reports",
    primary: "Monthly care system for two WordPress sites",
    secondary: "Predictable content updates, patching, scans, backups, performance fixes, and reporting.",
    modules: ["Backups", "Patches", "Malware", "Reports"],
    flow: ["Audit", "Patch", "Backup", "Report"],
    metrics: ["2 sites", "Monthly", "Risk reduced"],
    evidence: ["Update log", "Security scan", "Performance report"],
  },
};

const fallbackSpec = (slug: string): VisualSpec => ({
  layout: "serviceSite",
  product: slug.replace(/-/g, " "),
  surface: "Case study system view",
  primary: "Project-specific delivery system",
  secondary: "A representative view of the shipped workflow, interface, and operating model.",
  modules: ["Interface", "Workflow", "Handoff", "Support"],
  flow: ["Discover", "Build", "Launch", "Improve"],
  metrics: ["Responsive", "Documented", "Launch ready"],
  evidence: ["Project scope", "Delivery flow", "Outcome map"],
});

const ink = "#ffffff";
const bg = "#1f2228";
const muted = "rgba(255,255,255,0.66)";
const soft = "rgba(255,255,255,0.42)";
const surface = "rgba(255,255,255,0.035)";
const surfaceStrong = "rgba(255,255,255,0.07)";
const border = "1px solid rgba(255,255,255,0.14)";
const borderStrong = "1px solid rgba(255,255,255,0.22)";

const textBlock = (text: string, style = {}) => (
  <div style={{ display: "flex", ...style }}>{text}</div>
);

const Tag = ({ children }: { children: string }) => (
  <div
    style={{
      display: "flex",
      padding: "7px 9px",
      border,
      color: "rgba(255,255,255,0.78)",
      fontSize: 13,
      letterSpacing: 1.7,
      textTransform: "uppercase",
      whiteSpace: "nowrap",
    }}
  >
    {children}
  </div>
);

const Line = ({ width = "100%", opacity = 0.18 }: { width?: string; opacity?: number }) => (
  <div
    style={{
      display: "flex",
      width,
      height: 8,
      background: `rgba(255,255,255,${opacity})`,
    }}
  />
);

const TopDots = () => (
  <div style={{ display: "flex", gap: 8 }}>
    {[0.34, 0.22, 0.14].map((opacity) => (
      <div
        key={opacity}
        style={{
          display: "flex",
          width: 9,
          height: 9,
          background: `rgba(255,255,255,${opacity})`,
        }}
      />
    ))}
  </div>
);

const BrowserFrame = ({
  title,
  children,
  width = 650,
  height = 382,
}: {
  title: string;
  children: ReactNode;
  width?: number;
  height?: number;
}) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      width,
      height,
      border: borderStrong,
      background: surface,
    }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "15px 18px",
        borderBottom: border,
      }}
    >
      <TopDots />
      {textBlock(title, {
        color: soft,
        fontSize: 14,
        letterSpacing: 2,
        textTransform: "uppercase",
      })}
    </div>
    <div style={{ display: "flex", flex: 1, padding: 24 }}>{children}</div>
  </div>
);

const SidePanel = ({
  title,
  items,
  metrics,
}: {
  title: string;
  items: string[];
  metrics: string[];
}) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      width: 330,
      gap: 14,
    }}
  >
    <div style={{ display: "flex", flexDirection: "column", gap: 10, border, padding: 18, background: surface }}>
      {textBlock(title, { fontSize: 23, lineHeight: 1.16 })}
      {items.slice(0, 4).map((item, index) => (
        <div key={item} style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {textBlock(String(index + 1).padStart(2, "0"), {
            width: 30,
            color: soft,
            fontSize: 14,
          })}
          <Line width={`${84 - index * 9}%`} opacity={0.18} />
          {textBlock(item, { width: 110, color: muted, fontSize: 16 })}
        </div>
      ))}
    </div>
    <div style={{ display: "flex", gap: 12 }}>
      {metrics.slice(0, 2).map((metric) => (
        <div
          key={metric}
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            gap: 8,
            border,
            padding: 14,
            background: "rgba(255,255,255,0.025)",
          }}
        >
          {textBlock(metric, { fontSize: 17, lineHeight: 1.15 })}
          <Line width="62%" opacity={0.22} />
        </div>
      ))}
    </div>
  </div>
);

const WebsiteScene = ({ spec }: { spec: VisualSpec }) => (
  <div style={{ display: "flex", gap: 30, alignItems: "stretch" }}>
    <BrowserFrame title={spec.surface}>
      <div style={{ display: "flex", flex: 1, flexDirection: "column", gap: 22 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Line width="105px" opacity={0.28} />
          <div style={{ display: "flex", gap: 10 }}>
            {spec.modules.slice(0, 3).map((module) => (
              <Tag key={module}>{module}</Tag>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", gap: 24, flex: 1 }}>
          <div style={{ display: "flex", flex: 1.3, flexDirection: "column", justifyContent: "space-between" }}>
            {textBlock(spec.product, { fontSize: 42, lineHeight: 0.98 })}
            {textBlock(spec.primary, { color: muted, fontSize: 23, lineHeight: 1.22, maxWidth: 410 })}
            <div style={{ display: "flex", gap: 12 }}>
              {spec.evidence.slice(0, 3).map((item) => (
                <div key={item} style={{ display: "flex", flex: 1, flexDirection: "column", gap: 9, border, padding: 12 }}>
                  {textBlock(item, { color: muted, fontSize: 16 })}
                  <Line width="72%" opacity={0.2} />
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", width: 175, flexDirection: "column", gap: 12 }}>
            {[0, 1, 2, 3].map((index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  flex: index === 0 ? 1.35 : 1,
                  border,
                  background: index === 0 ? surfaceStrong : "transparent",
                  padding: 12,
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Line width={`${80 - index * 9}%`} opacity={0.22} />
                <Line width={`${58 + index * 7}%`} opacity={0.12} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </BrowserFrame>
    <SidePanel title="Conversion path" items={spec.flow} metrics={spec.metrics} />
  </div>
);

const CommerceScene = ({ spec }: { spec: VisualSpec }) => (
  <div style={{ display: "flex", gap: 30, alignItems: "stretch" }}>
    <BrowserFrame title={spec.surface}>
      <div style={{ display: "flex", flex: 1, gap: 22 }}>
        <div style={{ display: "flex", flex: 1.1, flexDirection: "column", gap: 16 }}>
          {textBlock(spec.product, { fontSize: 42, lineHeight: 1 })}
          <div style={{ display: "flex", flex: 1, gap: 12 }}>
            {[0, 1, 2].map((index) => (
              <div key={index} style={{ display: "flex", flex: 1, flexDirection: "column", border, padding: 12, gap: 12 }}>
                <div style={{ display: "flex", height: 88, background: index === 1 ? "rgba(255,255,255,0.16)" : surfaceStrong }} />
                <Line width="80%" opacity={0.2} />
                <Line width={`${56 + index * 10}%`} opacity={0.13} />
                {textBlock(spec.modules[index] ?? "Product", { color: muted, fontSize: 16 })}
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", width: 205, flexDirection: "column", border: borderStrong, padding: 16, gap: 13, background: surface }}>
          {textBlock("Checkout", { fontSize: 24 })}
          {spec.flow.map((item, index) => (
            <div key={item} style={{ display: "flex", alignItems: "center", gap: 11 }}>
              <div style={{ display: "flex", width: 24, height: 24, border, alignItems: "center", justifyContent: "center", fontSize: 12 }}>
                {index + 1}
              </div>
              {textBlock(item, { color: muted, fontSize: 16 })}
            </div>
          ))}
          <div style={{ display: "flex", marginTop: "auto", background: ink, color: bg, padding: "12px 14px", fontSize: 15, letterSpacing: 2 }}>
            PAYMENT READY
          </div>
        </div>
      </div>
    </BrowserFrame>
    <SidePanel title="Store proof" items={spec.modules} metrics={spec.metrics} />
  </div>
);

const MarketplaceScene = ({ spec }: { spec: VisualSpec }) => (
  <div style={{ display: "flex", gap: 30, alignItems: "stretch" }}>
    <BrowserFrame title={spec.surface}>
      <div style={{ display: "flex", flex: 1, flexDirection: "column", gap: 18 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          {textBlock(spec.product, { fontSize: 40, lineHeight: 1 })}
          <Tag>{spec.metrics[0]}</Tag>
        </div>
        <div style={{ display: "flex", flex: 1, gap: 14 }}>
          {spec.modules.slice(0, 4).map((module, index) => (
            <div key={module} style={{ display: "flex", flex: 1, flexDirection: "column", border, padding: 14, gap: 12, background: index === 1 ? surfaceStrong : "transparent" }}>
              {textBlock(module, { fontSize: 20 })}
              {[0, 1, 2].map((row) => (
                <div key={row} style={{ display: "flex", flexDirection: "column", gap: 8, border, padding: 10 }}>
                  <Line width={`${86 - row * 14}%`} opacity={0.2} />
                  <Line width={`${50 + row * 10}%`} opacity={0.12} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </BrowserFrame>
    <SidePanel title="Operating model" items={spec.flow} metrics={spec.metrics} />
  </div>
);

const AiScene = ({ spec }: { spec: VisualSpec }) => (
  <div style={{ display: "flex", gap: 30, alignItems: "stretch" }}>
    <BrowserFrame title={spec.surface}>
      <div style={{ display: "flex", flex: 1, gap: 22 }}>
        <div style={{ display: "flex", flex: 1, flexDirection: "column", justifyContent: "space-between" }}>
          {textBlock(spec.product, { fontSize: 39, lineHeight: 1 })}
          <div style={{ display: "flex", flex: 1, gap: 14, alignItems: "stretch" }}>
            <div style={{ display: "flex", flex: 1, flexWrap: "wrap", gap: 12, alignContent: "center" }}>
            {spec.modules.slice(0, 4).map((module, index) => (
              <div
                key={module}
                style={{
                  display: "flex",
                  width: 132,
                  height: 78,
                  border: index === 1 ? borderStrong : border,
                  background: index === 2 ? surfaceStrong : "transparent",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 10,
                  textAlign: "center",
                  fontSize: 16,
                }}
              >
                  {module}
              </div>
            ))}
            </div>
            <div style={{ display: "flex", width: 42, flexDirection: "column", justifyContent: "center", gap: 10 }}>
              {[0, 1, 2, 3].map((index) => (
                <Line key={index} width={`${32 - index * 3}px`} opacity={0.2} />
              ))}
            </div>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            {spec.evidence.slice(0, 3).map((item) => (
              <Tag key={item}>{item}</Tag>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", width: 218, flexDirection: "column", gap: 10, border, padding: 14, background: "#17191e" }}>
          {textBlock("Trace log", { color: soft, fontSize: 15, letterSpacing: 2, textTransform: "uppercase" })}
          {spec.flow.map((step, index) => (
            <div key={step} style={{ display: "flex", gap: 10, alignItems: "center" }}>
              {textBlock(`0${index + 1}`, { color: soft, fontSize: 14 })}
              <Line width={`${72 - index * 8}%`} opacity={0.18} />
              {textBlock(step, { color: muted, fontSize: 15 })}
            </div>
          ))}
        </div>
      </div>
    </BrowserFrame>
    <SidePanel title="System evidence" items={spec.metrics} metrics={spec.evidence} />
  </div>
);

const VoiceScene = ({ spec }: { spec: VisualSpec }) => (
  <div style={{ display: "flex", gap: 30, alignItems: "stretch" }}>
    <BrowserFrame title={spec.surface}>
      <div style={{ display: "flex", flex: 1, gap: 20 }}>
        <div style={{ display: "flex", flex: 1, flexDirection: "column", gap: 16 }}>
          {textBlock("Live call qualification", { fontSize: 32, lineHeight: 1.05 })}
          <div style={{ display: "flex", height: 76, alignItems: "center", gap: 8, border, padding: 13 }}>
            {[25, 48, 34, 61, 23, 54, 39, 66, 28, 51, 36, 58].map((height, index) => (
              <div key={index} style={{ display: "flex", width: 16, height, background: index % 3 === 0 ? ink : "rgba(255,255,255,0.28)" }} />
            ))}
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <div style={{ display: "flex", flex: 1, flexDirection: "column", gap: 10, border, padding: 13 }}>
              {textBlock("Buyer", { color: soft, fontSize: 14, letterSpacing: 2 })}
              {textBlock("Budget, location, timeline", { fontSize: 20, lineHeight: 1.2 })}
            </div>
            <div style={{ display: "flex", flex: 1, flexDirection: "column", gap: 10, border, padding: 13, background: surfaceStrong }}>
              {textBlock("Agent", { color: soft, fontSize: 14, letterSpacing: 2 })}
              {textBlock("Visit + brochure handoff", { fontSize: 20, lineHeight: 1.2 })}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", width: 220, flexDirection: "column", gap: 12 }}>
          {spec.flow.map((step, index) => (
            <div key={step} style={{ display: "flex", flexDirection: "column", border, padding: 13, gap: 8, background: index === 3 ? surfaceStrong : "transparent" }}>
              {textBlock(step, { fontSize: 19 })}
              <Line width={`${78 - index * 7}%`} opacity={0.18} />
            </div>
          ))}
        </div>
      </div>
    </BrowserFrame>
    <SidePanel title="Lead card" items={spec.evidence} metrics={spec.metrics} />
  </div>
);

const AutomationScene = ({ spec }: { spec: VisualSpec }) => (
  <div style={{ display: "flex", gap: 30, alignItems: "stretch" }}>
    <BrowserFrame title={spec.surface}>
      <div style={{ display: "flex", flex: 1, flexDirection: "column", gap: 18 }}>
        {textBlock(spec.product, { fontSize: 42, lineHeight: 1 })}
        <div style={{ display: "flex", flex: 1, gap: 13 }}>
          {spec.modules.map((module, index) => (
            <div key={module} style={{ display: "flex", flex: 1, flexDirection: "column", gap: 12 }}>
              {textBlock(module, { color: muted, fontSize: 18 })}
              {[0, 1, 2].map((card) => (
                <div key={card} style={{ display: "flex", flexDirection: "column", gap: 9, border, padding: 12, background: index === card ? surfaceStrong : "transparent" }}>
                  <Line width={`${80 - card * 10}%`} opacity={0.21} />
                  <Line width={`${56 + index * 8}%`} opacity={0.12} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </BrowserFrame>
    <SidePanel title="Automation path" items={spec.flow} metrics={spec.metrics} />
  </div>
);

const MaintenanceScene = ({ spec }: { spec: VisualSpec }) => (
  <div style={{ display: "flex", gap: 30, alignItems: "stretch" }}>
    <BrowserFrame title={spec.surface}>
      <div style={{ display: "flex", flex: 1, gap: 18 }}>
        <div style={{ display: "flex", flex: 1, flexDirection: "column", gap: 12 }}>
          {textBlock("Monthly maintenance report", { fontSize: 34, lineHeight: 1 })}
          <div style={{ display: "flex", gap: 10 }}>
            {spec.metrics.map((metric) => (
              <div key={metric} style={{ display: "flex", flex: 1, flexDirection: "column", gap: 8, border: borderStrong, padding: 11, background: surface }}>
                {textBlock(metric, { fontSize: 18 })}
                <Line width="70%" opacity={0.2} />
              </div>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {spec.flow.map((item, index) => (
              <div key={item} style={{ display: "flex", alignItems: "center", gap: 12, border, padding: "8px 10px" }}>
                <div style={{ display: "flex", width: 24, height: 24, border: borderStrong, alignItems: "center", justifyContent: "center", fontSize: 12 }}>
                  {index + 1}
                </div>
                {textBlock(item, { fontSize: 16 })}
                <Line width={`${52 + index * 8}%`} opacity={0.13} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </BrowserFrame>
    <SidePanel title="Care checklist" items={spec.modules} metrics={spec.evidence} />
  </div>
);

const renderScene = (spec: VisualSpec) => {
  if (["foodCommerce", "beautyCommerce", "shopifyStore"].includes(spec.layout)) {
    return <CommerceScene spec={spec} />;
  }

  if (["vendorMarketplace", "directoryPlatform", "jobsBoard", "serviceMarketplace"].includes(spec.layout)) {
    return <MarketplaceScene spec={spec} />;
  }

  if (["offgridAi", "agenticAi", "supportAi"].includes(spec.layout)) {
    return <AiScene spec={spec} />;
  }

  if (spec.layout === "voiceAgent") {
    return <VoiceScene spec={spec} />;
  }

  if (["leadAutomation", "whatsappAutomation"].includes(spec.layout)) {
    return <AutomationScene spec={spec} />;
  }

  if (spec.layout === "maintenanceReport") {
    return <MaintenanceScene spec={spec} />;
  }

  return <WebsiteScene spec={spec} />;
};

export default async function Image({ params, searchParams }: ImageProps) {
  const { slug } = await params;
  const query = searchParams ? await searchParams : {};
  const caseStudy = getCaseStudy(slug);

  if (!caseStudy) {
    notFound();
  }

  const spec = visualSpecs[caseStudy.slug] ?? fallbackSpec(caseStudy.slug);
  const variant = query?.variant === "system" ? "SYSTEM VIEW" : "CASE STUDY";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: bg,
          color: ink,
          padding: "36px 42px 34px",
          fontFamily: "Arial",
          border: "1px solid rgba(255,255,255,0.18)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          {textBlock("AVLYS AI", { fontSize: 17, letterSpacing: 7 })}
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <Tag>{caseStudy.category}</Tag>
            {textBlock(variant, { fontSize: 17, letterSpacing: 7 })}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 34, alignItems: "flex-end" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 735 }}>
              {textBlock(caseStudy.title, { fontSize: caseStudy.title.length > 50 ? 38 : 43, lineHeight: 0.98 })}
              {textBlock(spec.secondary, { color: muted, fontSize: 20, lineHeight: 1.3 })}
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "flex-end", width: 330 }}>
              {spec.metrics.map((metric) => (
                <Tag key={metric}>{metric}</Tag>
              ))}
            </div>
          </div>

          {renderScene(spec)}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", color: soft, fontSize: 18 }}>
          {textBlock(caseStudy.type)}
          {textBlock(caseStudy.stack)}
          {textBlock(caseStudy.market)}
        </div>
      </div>
    ),
    size
  );
}
