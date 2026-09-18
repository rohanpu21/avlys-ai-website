import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import OfficePhoto from "../components/OfficePhoto";
import { siteConfig } from "../lib/site";
import DataBrief from "./_components/DataBrief";
import { dataFaqGroups } from "./dataFaq";
import styles from "./data.module.css";

const description = "Scope AI training and evaluation data with Avlys: text, images, voice, custom collection, and annotation. Discuss a pilot, quality criteria, and usage rights.";

export const metadata: Metadata = {
  title: "Avlys Data — AI Training Data & Annotation",
  description,
  alternates: { canonical: "/data" },
  openGraph: { title: "Avlys Data — AI training data, built for your task.", description, url: "/data", type: "website" },
  twitter: { card: "summary_large_image", title: "Avlys Data — AI Training Data & Annotation", description },
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
    <div className={styles.page}>
      <a className={styles.skipLink} href="#data-main">Skip to data content</a>
      <Navbar />
      <div className={styles.subnav}>
        <div className={styles.container}>
          <a href="#data-main" className={styles.wordmark}>Avlys <span>Data</span></a>
          <nav aria-label="Data page"><a href="#samples">Sample library</a><a href="#process">Our approach</a><a href="#data-faq">FAQs</a><a href="#data-brief">Let’s talk <span aria-hidden="true">↗</span></a></nav>
        </div>
      </div>
      <main id="data-main">
        <section className={styles.hero} aria-labelledby="data-heading">
          <div className={styles.container}>
            <p className={styles.eyebrow}>AVLYS DATA / AI TRAINING & EVALUATION</p>
            <h1 id="data-heading">AI training data.<br /><span>Built for your task.</span></h1>
            <p className={styles.heroCopy}>Text, images, and voice for training and evaluation.<br className={styles.desktopBreak} /> Scope your collection, annotation, and quality requirements<br className={styles.desktopBreak} /> around a pilot you can inspect.</p>
            <div className={styles.actions}><a href="#data-brief" className="btn-pill-primary">Discuss your data brief <span aria-hidden="true">↗</span></a><a href="#process" className={styles.textLink}>Explore our approach <span aria-hidden="true">↓</span></a></div>
            <div className={styles.formatStrip} aria-label="Our primary data formats">
              {([{ type: "text", image: "text-documents", label: "Language & document AI", name: "TEXT & DOCUMENTS" }, { type: "image", image: "image-vision", label: "Computer vision", name: "IMAGES" }, { type: "voice", image: "voice-audio", label: "Speech & conversational AI", name: "VOICE & AUDIO" }] as const).map((format) => (
                <a key={format.type} href="#data-brief" className={styles.formatTile}>
                  <span className={styles.formatVisual}><Image src={`/data/visuals/${format.image}.webp`} alt="" width={1536} height={1024} sizes="(max-width: 640px) 112px, (max-width: 1200px) 33vw, 384px" /></span>
                  <div className={styles.formatLabel}><span>{format.name}</span><p>{format.label}</p></div>
                  <span className={styles.formatArrow} aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
            <p className={styles.heroCaption}>Task-specific scope <span aria-hidden="true">·</span> Pilot before scale <span aria-hidden="true">·</span> Documented delivery</p>
            <p className={styles.imageCaption}>Concept illustrations · Dataset samples coming separately</p>
          </div>
        </section>

        <section className={styles.offers} aria-labelledby="offers-heading">
          <div className={styles.container}>
            <p className={styles.eyebrow}>WAYS TO WORK TOGETHER</p><h2 id="offers-heading">Your brief. The right starting point.</h2>
            <div className={styles.offerGrid}>
              {[
                ["01", "Explore existing data", "Have a defined task? Discuss collection fit, availability, and licensing. Evaluate a relevant sample when access is confirmed."],
                ["02", "Collect to your brief", "Need a specific language, environment, or edge case? Define the capture requirements and start with a scoped pilot."],
                ["03", "Annotate & review", "Already have authorized data? Agree on labels, transcripts, review criteria, and correction terms before work begins."],
              ].map(([n, title, text]) => <article key={n}><span className={styles.offerNumber}>{n}</span><h3>{title}</h3><p>{text}</p><a className={styles.textLink} href="#data-brief">Discuss the scope <span aria-hidden="true">↗</span></a></article>)}
            </div>
          </div>
        </section>

        <section id="samples" className={styles.section} aria-labelledby="samples-heading">
          <div className={styles.container}>
            <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>SAMPLE LIBRARY</p><h2 id="samples-heading">Coming soon.</h2></div><p>Samples will be added here when they are ready.</p></div>
          </div>
        </section>

        <section id="process" className={styles.process} aria-labelledby="process-heading">
          <div className={styles.container}>
            <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>FROM REQUIREMENT TO DELIVERY</p><h2 id="process-heading">Start small.<br />Set the standard.</h2></div><p>Agree on what a useful batch looks like before expanding the project. The pilot establishes the task, review process, and delivery expectations.</p></div>
            <ol className={styles.steps}>{steps.map(([title, body], index) => <li key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{body}</p></li>)}</ol>
            <div className={styles.deliveryNote}><span>THE DELIVERY CONVERSATION</span><p>Files & schema <b aria-hidden="true">/</b> Review criteria <b aria-hidden="true">/</b> Provenance & rights <b aria-hidden="true">/</b> Known limitations</p></div>
          </div>
        </section>

        <section id="delivery" className={styles.section} aria-labelledby="delivery-heading">
          <div className={`${styles.container} ${styles.specGrid}`}>
            <div><p className={styles.eyebrow}>THE DELIVERY CHECKLIST</p><h2 id="delivery-heading">Know what<br />you’re accepting.</h2><p className={styles.specIntro}>Useful data comes with context. Agree on these deliverables in your project scope so your team can inspect, integrate, and evaluate the result.</p><a href="#data-brief" className={styles.textLink}>Plan your first batch <span aria-hidden="true">↗</span></a></div>
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
            <div><p className={styles.eyebrow}>EGOCENTRIC VIDEO / PILOT</p><h2 id="ego-heading">A first-person view.<br />A focused pilot.</h2><p className={styles.egoCopy}>Explore task-based capture for robotics and embodied-AI research alongside our text, image, and voice work. Begin with one environment and a clear capture protocol.</p><p className={styles.egoCopy}>Human first-person video is different from robot action trajectories. Camera setup, sensors, labels, and suitability for your pipeline need to be confirmed in the pilot scope.</p><a className={styles.textLink} href="#data-brief">Discuss a capture pilot <span aria-hidden="true">↗</span></a></div>
          </div>
        </section>

        <section id="data-team" className={styles.section} aria-labelledby="data-team-heading">
          <div className={styles.container}>
            <div className={styles.sectionHeading}>
              <div><p className={styles.eyebrow}>THE PEOPLE BEHIND AVLYS</p><h2 id="data-team-heading">Inside our office.<br />Close to the work.</h2></div>
              <p>Meet the team behind the conversation. Real moments from our office, from whiteboard discussions to working sessions.</p>
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
            <a href="/about" className={`${styles.textLink} mt-7`}>Get to know the Avlys team <span aria-hidden="true">↗</span></a>
          </div>
        </section>

        <section id="data-faq" className={styles.faqSection} aria-labelledby="faq-heading"><div className={`${styles.container} ${styles.faqGrid}`}>
          <div><p className={styles.eyebrow}>BUYER QUESTIONS, ANSWERED</p><h2 id="faq-heading">Clarity before<br />commitment.</h2><p className={styles.faqIntro}>From the first sample to accepted delivery: what to ask, what to check, and what to agree on.</p><nav className={styles.faqNav} aria-label="FAQ topics">{dataFaqGroups.map((group) => <a key={group.id} href={`#faq-${group.id}`}>{group.title}<span aria-hidden="true">↓</span></a>)}</nav><a href="#data-brief" className={styles.textLink}>Have a different question? <span aria-hidden="true">↗</span></a></div>
          <div>{dataFaqGroups.map((group) => <div id={`faq-${group.id}`} key={group.id} className={styles.faqGroup}><h3>{group.title}</h3>{group.items.map(({ question, answer }) => <details key={question} className={styles.faq}><summary>{question}</summary><p>{answer}</p></details>)}</div>)}</div>
        </div></section>

        <section id="data-brief" className={styles.contactSection} aria-labelledby="brief-heading"><div className={`${styles.container} ${styles.contactGrid}`}>
          <div><p className={styles.eyebrow}>LET’S START WITH THE TASK</p><h2 id="brief-heading">Tell us what<br />good data looks like.</h2><p>A useful brief starts with the task, data format, language or domain, approximate volume, and timeline. We’ll use it to discuss feasibility and a first batch.</p><div className={styles.nextStep}><h3>What happens next?</h3><p>After you send the email, the next conversation covers fit, access requirements, and a scoped pilot or quote.</p></div><a href={`mailto:${siteConfig.email}`} className={styles.contactEmail}>{siteConfig.email} <span aria-hidden="true">↗</span></a></div>
          <DataBrief />
        </div></section>
      </main>
      <Footer />
    </div>
  );
}
