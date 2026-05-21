export type ServicePage = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  eyebrow: string;
  h1: string;
  description: string;
  proof: string[];
  outcomes: string[];
  workflow: string[];
  faqs: Array<{
    question: string;
    answer: string;
  }>;
};

export const servicePages: ServicePage[] = [
  {
    slug: "ai-automation-agency-india",
    title: "AI Automation Agency India",
    metaTitle: "AI Automation Agency India | Avlys AI",
    metaDescription:
      "Avlys AI builds AI automation systems for Indian businesses: chatbots, calling agents, CRM workflows, lead routing, customer support automation, and custom software.",
    keywords: [
      "AI automation agency India",
      "AI automation company India",
      "AI automation agency Hyderabad",
      "business automation India",
    ],
    eyebrow: "AI Automation Agency India",
    h1: "AI automation systems for Indian businesses.",
    description:
      "Avlys AI maps manual workflows, designs AI agents around your business rules, and ships production-ready automation for sales, support, operations, and internal teams.",
    proof: ["Hyderabad-based", "India and global delivery", "Strategy to post-launch support"],
    outcomes: [
      "Faster lead response across website, WhatsApp, and phone channels.",
      "Cleaner handoffs into CRM, spreadsheets, dashboards, and operator workflows.",
      "Reusable systems your team can maintain instead of one-off demos.",
      "Documented automation logic for sales, support, and operations.",
    ],
    workflow: [
      "Audit the workflow, data sources, handoff rules, and success criteria.",
      "Design the chatbot, calling agent, integration flow, or custom platform architecture.",
      "Build the interface, prompts, automations, CRM sync, and operator controls.",
      "Launch, review real usage, and improve the system after deployment.",
    ],
    faqs: [
      {
        question: "What does an AI automation agency do?",
        answer:
          "An AI automation agency identifies repeatable business workflows and builds AI agents, chatbots, integrations, and dashboards that complete or accelerate those workflows.",
      },
      {
        question: "Does Avlys AI work with Indian businesses?",
        answer:
          "Yes. Avlys AI is based in Hyderabad and works with Indian and international clients across service, real estate, commerce, marketplace, and support workflows.",
      },
      {
        question: "What can be automated first?",
        answer:
          "The fastest starting points are lead capture, follow-up, FAQ support, appointment booking, call qualification, WhatsApp responses, and CRM routing.",
      },
    ],
  },
  {
    slug: "ai-calling-agents",
    title: "AI Calling Agents",
    metaTitle: "AI Calling Agents for Lead Qualification | Avlys AI",
    metaDescription:
      "Build AI calling agents for inbound calls, outbound qualification, appointment booking, reminders, and follow-ups with CRM and WhatsApp handoffs.",
    keywords: [
      "AI calling agents",
      "voice AI agent India",
      "AI phone agent",
      "AI appointment booking agent",
    ],
    eyebrow: "AI Calling Agents",
    h1: "Voice AI agents for leads, bookings, and follow-ups.",
    description:
      "Avlys AI builds calling agents that answer inbound inquiries, qualify prospects, collect requirements, schedule next steps, and pass structured notes to your team.",
    proof: ["Inbound and outbound flows", "CRM-ready summaries", "WhatsApp handoffs"],
    outcomes: [
      "Lower missed-call leakage during peak hours and after business hours.",
      "Consistent qualification questions for every prospect.",
      "Call summaries, budget, timeline, and next action captured for sales teams.",
      "Follow-up messages sent through WhatsApp, email, or CRM workflows.",
    ],
    workflow: [
      "Define call scenarios, qualification questions, escalation rules, and tone.",
      "Connect telephony, calendar, CRM, WhatsApp, and lead storage systems.",
      "Test edge cases, failed calls, transfer rules, and human handoff paths.",
      "Monitor call outcomes and improve prompts after real conversations.",
    ],
    faqs: [
      {
        question: "Can an AI calling agent qualify real estate leads?",
        answer:
          "Yes. It can ask budget, location, timeline, property type, visit preference, and financing questions before routing qualified leads to the sales team.",
      },
      {
        question: "Can the voice agent transfer to a human?",
        answer:
          "Yes. Transfer rules can be designed for urgent calls, high-intent leads, unsupported questions, or VIP customers.",
      },
      {
        question: "Does the calling agent store call notes?",
        answer:
          "It can store structured summaries, tags, outcomes, call status, and next steps in a CRM, spreadsheet, database, or dashboard.",
      },
    ],
  },
  {
    slug: "whatsapp-ai-chatbots",
    title: "WhatsApp AI Chatbots",
    metaTitle: "WhatsApp AI Chatbot for Business | Avlys AI",
    metaDescription:
      "Avlys AI builds WhatsApp AI chatbots for FAQs, brochures, lead capture, requirement collection, follow-up automation, and customer support.",
    keywords: [
      "WhatsApp AI chatbot",
      "WhatsApp chatbot for business India",
      "AI WhatsApp bot",
      "WhatsApp automation agency",
    ],
    eyebrow: "WhatsApp AI Chatbots",
    h1: "WhatsApp chatbots that qualify and route buyers.",
    description:
      "Avlys AI designs WhatsApp automation for businesses that need faster replies, guided discovery, brochure delivery, requirement capture, and structured sales handoffs.",
    proof: ["Lead capture", "FAQ automation", "Brochure and follow-up flows"],
    outcomes: [
      "Instant replies to common buyer and customer questions.",
      "Structured requirement collection before human involvement.",
      "Automated brochure, pricing, catalog, or booking links.",
      "Clean routing to sales, support, or operations based on intent.",
    ],
    workflow: [
      "Map conversation paths for inquiries, FAQs, objections, and support cases.",
      "Design response logic, knowledge sources, and qualification fields.",
      "Connect WhatsApp API, CRM, lead sheets, forms, or internal tools.",
      "Launch with analytics and iterate based on conversation data.",
    ],
    faqs: [
      {
        question: "What can a WhatsApp AI chatbot do?",
        answer:
          "It can answer FAQs, collect customer requirements, share brochures, qualify leads, book appointments, trigger follow-ups, and route conversations to humans.",
      },
      {
        question: "Is WhatsApp automation useful for Indian businesses?",
        answer:
          "Yes. Many Indian buyers already prefer WhatsApp for service inquiries, real estate discussions, D2C questions, and appointment coordination.",
      },
      {
        question: "Can the chatbot connect to a CRM?",
        answer:
          "Yes. The bot can send qualified leads, tags, notes, and conversation summaries into a CRM, spreadsheet, database, or custom dashboard.",
      },
    ],
  },
  {
    slug: "custom-ai-chatbot-development",
    title: "Custom AI Chatbot Development",
    metaTitle: "Custom AI Chatbot Development Company India | Avlys AI",
    metaDescription:
      "Build custom AI chatbots for websites, WhatsApp, support portals, lead capture, onboarding, knowledge bases, and business workflows.",
    keywords: [
      "custom AI chatbot development",
      "AI chatbot development company India",
      "website AI chatbot",
      "enterprise AI chatbot",
    ],
    eyebrow: "Custom AI Chatbot Development",
    h1: "Custom AI chatbots for support, sales, and operations.",
    description:
      "Avlys AI builds chatbots that understand your services, collect structured data, answer grounded questions, and hand off conversations to the right system or person.",
    proof: ["Website and WhatsApp", "Knowledge-grounded answers", "Human handoff"],
    outcomes: [
      "Reduced repeat support questions and faster customer replies.",
      "Lead forms replaced with guided conversations.",
      "Knowledge-base answers grounded in approved business information.",
      "Cleaner routing across sales, support, and operations teams.",
    ],
    workflow: [
      "Collect FAQs, service pages, policies, brochures, and internal knowledge.",
      "Design intents, conversation paths, fallback behavior, and handoff rules.",
      "Build the chatbot, retrieval layer, admin controls, and analytics.",
      "Review transcripts and improve answer quality after launch.",
    ],
    faqs: [
      {
        question: "How is a custom AI chatbot different from a generic bot?",
        answer:
          "A custom chatbot is built around your services, customer journeys, handoff rules, knowledge sources, and internal tools instead of a generic scripted flow.",
      },
      {
        question: "Can the chatbot answer from our documents?",
        answer:
          "Yes. It can use approved website content, documents, FAQs, policies, and product information as a retrieval source.",
      },
      {
        question: "Can Avlys AI build both the chatbot and backend system?",
        answer:
          "Yes. Avlys AI can build the chatbot, integration layer, database, dashboard, and workflow automation around it.",
      },
    ],
  },
  {
    slug: "ai-customer-support-automation",
    title: "AI Customer Support Automation",
    metaTitle: "AI Customer Support Automation | Avlys AI",
    metaDescription:
      "Automate customer support with AI agents, ticket routing, FAQ answers, policy retrieval, escalation paths, and human handoff workflows.",
    keywords: [
      "AI customer support automation",
      "AI support agent",
      "customer service AI automation",
      "AI ticket routing",
    ],
    eyebrow: "AI Customer Support Automation",
    h1: "Support automation that answers, routes, and escalates.",
    description:
      "Avlys AI builds support systems that resolve repeat questions, retrieve approved policies, collect context, and escalate sensitive cases to your team.",
    proof: ["FAQ resolution", "Policy-grounded answers", "Escalation workflows"],
    outcomes: [
      "Lower support load from repeat questions.",
      "Faster triage for order, service, account, and policy requests.",
      "Consistent answers grounded in approved documentation.",
      "Better visibility into unresolved customer issues.",
    ],
    workflow: [
      "Audit current support channels, issue types, policy sources, and escalation paths.",
      "Design support intents, knowledge retrieval, ticket routing, and human takeover.",
      "Build the assistant, integrations, moderation rules, and reporting view.",
      "Review tickets and transcripts to improve coverage over time.",
    ],
    faqs: [
      {
        question: "Can AI fully replace a support team?",
        answer:
          "Usually no. The best support systems automate repeat questions and triage while escalating complex, sensitive, or high-value cases to humans.",
      },
      {
        question: "Can the AI support agent follow company policy?",
        answer:
          "Yes. It can be grounded on approved policies and designed to avoid unsupported promises, with escalation for edge cases.",
      },
      {
        question: "What channels can be automated?",
        answer:
          "Common channels include website chat, WhatsApp, internal dashboards, support forms, email workflows, and ticketing tools.",
      },
    ],
  },
  {
    slug: "lead-qualification-ai-agents",
    title: "Lead Qualification AI Agents",
    metaTitle: "Lead Qualification AI Agents | Avlys AI",
    metaDescription:
      "Build AI agents that capture, qualify, score, route, and follow up with leads across website, WhatsApp, phone, forms, and CRM workflows.",
    keywords: [
      "lead qualification AI agents",
      "AI lead automation",
      "AI lead scoring",
      "AI sales automation India",
    ],
    eyebrow: "Lead Qualification AI Agents",
    h1: "AI agents that qualify leads before your team steps in.",
    description:
      "Avlys AI builds lead automation systems that respond quickly, ask the right questions, score readiness, route prospects, and trigger follow-up sequences.",
    proof: ["Lead capture", "Qualification logic", "CRM routing"],
    outcomes: [
      "Faster first response across high-intent lead channels.",
      "Standardized qualification questions for budget, timeline, need, and fit.",
      "Better prioritization for sales teams.",
      "Automated nurturing for leads that are not ready yet.",
    ],
    workflow: [
      "Define qualification criteria, lead stages, routing rules, and sales handoff expectations.",
      "Build the AI intake flow across website, WhatsApp, calls, or forms.",
      "Connect scoring, CRM updates, notifications, and follow-up messaging.",
      "Review conversion data and tune qualification rules.",
    ],
    faqs: [
      {
        question: "What questions can an AI lead agent ask?",
        answer:
          "It can ask about budget, timeline, location, problem, team size, preferred solution, urgency, decision-maker status, and contact preferences.",
      },
      {
        question: "Can the agent score leads automatically?",
        answer:
          "Yes. It can score leads based on explicit answers, source, urgency, buying fit, and custom criteria defined with your sales team.",
      },
      {
        question: "Where do qualified leads go?",
        answer:
          "They can be routed to a CRM, spreadsheet, Slack, email, dashboard, calendar flow, or directly to a salesperson.",
      },
    ],
  },
];

export const featuredServicePages = servicePages.slice(0, 4);

export const getServicePage = (slug: string) =>
  servicePages.find((service) => service.slug === slug);
