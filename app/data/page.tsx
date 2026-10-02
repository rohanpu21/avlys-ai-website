import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Geist } from "next/font/google";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import OfficePhoto from "../components/OfficePhoto";
import StructuredData from "../components/StructuredData";
import GatewayFlow from "@/components/ui/gateway-flow";
import { siteConfig, whatsappUrl } from "../lib/site";
import DataBrief from "./_components/DataBrief";
import OtsDataCatalogue from "./_components/PublicDataCatalogue";
import { publicDatasets } from "./publicDatasetCatalog";
import { toOtsCatalogue } from "./otsCataloguePresentation";
import { dataFaqGroups } from "./dataFaq";
import { dataDefinition, dataDescription } from "./dataContent";
import { buildDataSchema } from "./dataSeo";
import styles from "./data.module.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-data-sans",
  display: "swap",
});

const description = dataDescription;

export const metadata: Metadata = {
  title: { absolute: "AI Training Data, Collection & Annotation | Avlys Data" },
  description,
  alternates: { canonical: "/data" },
  openGraph: { title: "Avlys OTS Data — AI training data, built for your task.", description, url: "/data", type: "website" },
  twitter: { card: "summary_large_image", title: "Avlys OTS Data — AI Training Data & Annotation", description },
};

const steps = [
  ["Define the task.", "Specify the use case, coverage, sources, labels, and permitted use. Confirm feasibility before committing."],
  ["Scope a pilot.", "Agree on a representative first batch, review method, acceptance criteria, price, and timeline."],
  ["Review together.", "Inspect the files and labels. Record defects, resolve ambiguous instructions, and agree on corrections."],
  ["Scale what works.", "Use the accepted pilot to plan production batches, versioned delivery, and any further review."],
];

const deliveryChecklist = [
  ["Files & manifest", "Accepted units, stable IDs, file formats, and the agreed folder structure."],
  ["Labels & schema", "Field definitions, annotation guidelines, examples, and version notes."],
  ["Coverage & splits", "Relevant language, domain, or capture metadata and agreed evaluation splits."],
  ["Quality findings", "Review method, checked sample size, defect categories, and corrections."],
  ["Source & usage notes", "Collection method, relevant permissions, permitted uses, and restrictions."],
  ["Known limitations", "Coverage gaps, ambiguous labels, exclusions, and intended use boundaries."],
];

const officeGallery = [
  { photo: "discussion", caption: "Around the table at Avlys." },
  { photo: "whiteboard", caption: "Working through ideas together." },
  { photo: "workingSession", caption: "A working session." },
  { photo: "workspace", caption: "Our shared workspace." },
  { photo: "review", caption: "Back around the table." },
] as const;

export default function DataPage() {
  return (
    <div className={`${geist.variable} ${styles.page}`}>
      <StructuredData data={buildDataSchema({ path: "/data", title: "Avlys Data — AI training data, collection and annotation", description, faqs: dataFaqGroups.flatMap((group) => [...group.items]) })} />
      <a className={styles.skipLink} href="#data-main">Skip to data content</a>
      <Navbar />
      <div className={styles.subnav}>
        <div className={styles.container}>
          <a href="#data-main" className={styles.wordmark}>Avlys Data</a>
          <nav aria-label="Data page"><a href="#datasets">Catalogue</a><a href="#process">Our approach</a><a href="#data-faq">FAQs</a><a href="#data-brief">Let’s talk <span aria-hidden="true">↗</span></a></nav>
        </div>
      </div>
      <main id="data-main">
        <section className={styles.hero} aria-labelledby="data-heading">
          <div className={styles.heroStage}>
            <div className={`hero-aura ${styles.heroAura}`} aria-hidden="true" />
            <GatewayFlow opacity={0.55} />
            <div className={`${styles.container} ${styles.heroContent}`}>
              <nav className={`${styles.breadcrumbs} ${styles.heroBreadcrumbs}`} aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">Avlys Data</span></nav>
              <p className={styles.heroEyebrow}>Avlys Data / Off-the-shelf · Custom · Annotation</p>
              <h1 id="data-heading" className="type-hero">AI training data.<br /><span>Built for your task.</span></h1>
              <p className={`type-lead ${styles.heroCopy}`}>{dataDefinition}</p>
              <div className={styles.actions}><a href="#data-brief" className="btn-pill-primary">Request sample & pricing</a><a href="#datasets" className="btn-pill-ghost">Explore Avlys OTS Data</a></div>
              <p className={`type-caption ${styles.heroCaption}`}><span>Task-specific scope</span> <b aria-hidden="true">·</b> <span>Pilot before scale</span> <b aria-hidden="true">·</b> <span>Documented delivery</span></p>
            </div>
          </div>
          <div className={styles.container}>
            <div className={styles.formatStrip} aria-label="Our primary data formats">
              {([{ type: "text", image: "text-documents", label: "Language & document AI", name: "Text & documents", href: "#data-brief" }, { type: "image", image: "image-vision", label: "Computer vision", name: "Images", href: "/data/image" }, { type: "voice", image: "voice-audio", label: "Speech & conversational AI", name: "Voice & audio", href: "/data/audio" }] as const).map((format) => (
                <a key={format.type} href={format.href} className={styles.formatTile}>
                  <span className={styles.formatVisual}><Image src={`/data/visuals/${format.image}.webp`} alt="" width={1536} height={1024} sizes="(max-width: 640px) 112px, (max-width: 1200px) 33vw, 371px" /></span>
                  <div className={styles.formatLabel}><span className="type-caption">{format.name}</span><p>{format.label}</p></div>
                  <span className={styles.formatArrow} aria-hidden="true">→</span>
                </a>
              ))}
            </div>
            <p className={`type-fine-print ${styles.imageCaption}`}>Concept illustrations, not dataset samples. Text and document work is scoped separately from the OTS catalogue.</p>
          </div>
        </section>

        <OtsDataCatalogue datasets={toOtsCatalogue(publicDatasets)} />

        <section className={styles.offers} aria-labelledby="offers-heading">
          <div className={styles.container}>
            <div className={styles.centeredHeading}><p className={styles.eyebrow}>Ways to work together</p><h2 id="offers-heading" className="type-display-lg">Your brief. The right starting point.</h2></div>
            <div className={styles.offerGrid}>
              {[
                ["01", "Explore Avlys OTS Data", "Compare data types, coverage and formats. Request a quote for your selected collection and evaluate a sample once availability is confirmed."],
                ["02", "Collect to your brief", "Need a specific language, environment, or edge case? Define the capture requirements and start with a scoped pilot."],
                ["03", "Annotate & review", "Already have authorized data? Agree on labels, transcripts, review criteria, and correction terms before work begins."],
              ].map(([n, title, text]) => <article key={n}><span className={`type-caption-strong ${styles.offerNumber}`}>{n}</span><h3>{title}</h3><p className="type-caption">{text}</p><a className={styles.textLink} href="#data-brief">Discuss the scope <span aria-hidden="true">→</span></a></article>)}
            </div>
          </div>
        </section>

        <section id="process" className={styles.process} aria-labelledby="process-heading">
          <div className={styles.container}>
            <div className={styles.centeredHeading}><p className={styles.eyebrow}>From requirement to delivery</p><h2 id="process-heading" className="type-display-lg">Start small. Set the standard.</h2><p className="type-lead-airy">Agree on what a useful batch looks like before expanding the project. The pilot establishes the task, review process, and delivery expectations.</p></div>
            <ol className={styles.steps}>{steps.map(([title, body], index) => <li key={title}><span className="type-caption-strong">0{index + 1}</span><h3>{title}</h3><p className="type-caption">{body}</p></li>)}</ol>
            <div className={styles.deliveryNote}><span className="type-caption-strong">The delivery conversation</span><p className="type-caption">Files & schema <b aria-hidden="true">·</b> Review criteria <b aria-hidden="true">·</b> Provenance & rights <b aria-hidden="true">·</b> Known limitations</p></div>
          </div>
        </section>

        <section id="delivery" className={styles.section} aria-labelledby="delivery-heading">
          <div className={`${styles.container} ${styles.specGrid}`}>
            <div><p className={styles.eyebrow}>The delivery checklist</p><h2 id="delivery-heading" className="type-display-lg">Know what<br />you’re accepting.</h2><p className={`type-lead-airy ${styles.specIntro}`}>Useful data comes with context. Agree on these deliverables in your project scope so your team can inspect, integrate, and evaluate the result.</p><a href="#data-brief" className={styles.textLink}>Plan your first batch <span aria-hidden="true">→</span></a></div>
            <dl className={styles.specList}>{deliveryChecklist.map(([title, body], index) => <div key={title}><dt><span aria-hidden="true">0{index + 1}</span>{title}</dt><dd>{body}</dd></div>)}</dl>
          </div>
        </section>

        <section className={styles.egoSection} aria-labelledby="ego-heading">
          <div className={`${styles.container} ${styles.egoGrid}`}>
            <div className={styles.egoScope}>
              <Image className={styles.egoImage} src="/data/visuals/egocentric-capture.webp" alt="Concept illustration of first-person manual inspection: hands placing a blue component in a white tray." width={1536} height={1024} sizes="(max-width: 640px) calc(100vw - 96px), (max-width: 1200px) 45vw, 476px" />
              <span className={styles.eyebrow}>CAPTURE SCOPE / TO AGREE</span>
              <ul><li>Task & episode boundaries</li><li>Camera position & recording conditions</li><li>Available sensors & annotation needs</li></ul>
              <p>Concept illustration. No sample footage displayed.</p>
            </div>
            <div><p className={styles.eyebrow}>Egocentric video / pilot</p><h2 id="ego-heading" className="type-display-lg">A first-person view.<br />A focused pilot.</h2><p className={`type-lead-airy ${styles.egoCopy}`}>Explore task-based capture for robotics and embodied-AI research alongside our text, image, and voice work. Begin with one environment and a clear capture protocol.</p><p className={styles.egoNote}>Human first-person video is different from robot action trajectories. Camera setup, sensors, labels, and suitability for your pipeline need to be confirmed in the pilot scope.</p><a className={styles.textLink} href="#data-brief">Discuss a capture pilot <span aria-hidden="true">→</span></a></div>
          </div>
        </section>

        <section id="data-team" className={`${styles.section} ${styles.teamSection}`} aria-labelledby="data-team-heading">
          <div className={styles.container}>
            <div className={styles.sectionHeading}>
              <div><p className={styles.eyebrow}>The people behind Avlys</p><h2 id="data-team-heading" className="type-display-lg">Inside our office.<br />Close to the work.</h2></div>
              <p className="type-lead-airy">Meet the team behind the conversation. Real moments from our office, from whiteboard discussions to working sessions.</p>
            </div>
            <div className="grid gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
              {officeGallery.map(({ photo, caption }) => <OfficePhoto key={photo} photo={photo} caption={caption} sizes="(min-width: 1200px) 371px, (min-width: 1024px) 31vw, (min-width: 640px) 46vw, calc(100vw - 48px)" />)}
              <figure className="min-w-0">
                <video aria-label="A brief silent clip of the Avlys team around the office table" aria-describedby="data-office-video-caption" width={576} height={1024} controls muted playsInline preload="none" poster="/office/office-moment-poster.webp" className="aspect-[4/3] w-full bg-parchment object-contain">
                  <source src="/office/office-moment.mp4" type="video/mp4" />
                  <a href="/office/office-moment.mp4">Watch the office clip</a>
                </video>
                <figcaption id="data-office-video-caption" className="mt-3 text-[12px] leading-relaxed text-ink-muted">A moment in the office. 2-second silent clip.</figcaption>
              </figure>
            </div>
            <p className={styles.locationNote}>Avlys AI works from Hyderabad and Bengaluru, India, with teams globally. Data project scope and delivery arrangements are agreed for each brief.</p>
            <a href="/about" className={`${styles.textLink} mt-7`}>Get to know the Avlys team <span aria-hidden="true">→</span></a>
          </div>
        </section>

        <section id="data-faq" className={styles.faqSection} aria-labelledby="faq-heading"><div className={`${styles.container} ${styles.faqGrid}`}>
          <div><p className={styles.eyebrow}>Buyer questions, answered</p><h2 id="faq-heading" className="type-display-lg">Clarity before<br />commitment.</h2><p className={`type-lead-airy ${styles.faqIntro}`}>From the first sample to accepted delivery: what to ask, what to check, and what to agree on.</p><nav className={styles.faqNav} aria-label="FAQ topics">{dataFaqGroups.map((group) => <a key={group.id} href={`#faq-${group.id}`}>{group.title}<span aria-hidden="true">↓</span></a>)}</nav><a href="#data-brief" className={styles.textLink}>Have a different question? <span aria-hidden="true">→</span></a></div>
          <div>{dataFaqGroups.map((group) => <div id={`faq-${group.id}`} key={group.id} className={styles.faqGroup}><h3>{group.title}</h3>{group.items.map(({ question, answer }) => <details key={question} className={styles.faq}><summary>{question}</summary><p>{answer}</p></details>)}</div>)}</div>
        </div></section>

        <section id="data-brief" className={styles.contactSection} aria-labelledby="brief-heading"><div className={`${styles.container} ${styles.contactGrid}`}>
          <div><p className={styles.eyebrow}>Let’s start with the task</p><h2 id="brief-heading" className="type-display-lg">Tell us what<br />good data looks like.</h2><p className="type-lead-airy">A useful brief starts with the task, data format, language or domain, approximate volume, and timeline. We’ll use it to discuss feasibility and a first batch.</p><div className={styles.nextStep}><h3>What happens next?</h3><p>After you send the email, the next conversation covers fit, access requirements, and a scoped pilot or quote.</p></div><a href={`mailto:${siteConfig.email}`} className={styles.contactEmail}>{siteConfig.email} <span aria-hidden="true">→</span></a></div>
          <div><DataBrief /><div className={styles.contactActions}><a href={whatsappUrl("Hi Avlys Data, I would like to discuss training data, sample availability and pricing.")} target="_blank" rel="noopener noreferrer">Discuss on WhatsApp ↗</a><a href={`tel:${siteConfig.phoneHref}`}>Call {siteConfig.phone}</a></div></div>
        </div></section>
      </main>
      <Footer />
    </div>
  );
}
