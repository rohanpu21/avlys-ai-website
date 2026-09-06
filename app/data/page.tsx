import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { siteConfig } from "../lib/site";
import DatasetGallery from "./_components/DatasetGallery";
import DataBrief from "./_components/DataBrief";
import ModalityMark from "./_components/ModalityMark";
import styles from "./data.module.css";

const description = "Explore Avlys Data: text, image, and voice data for AI training and evaluation, plus egocentric capture pilots. Public sample collections coming soon.";

export const metadata: Metadata = {
  title: "Avlys Data — AI Training Data",
  description,
  alternates: { canonical: "/data" },
  openGraph: { title: "Avlys Data — Data with context.", description, url: "/data", type: "website" },
  twitter: { card: "summary_large_image", title: "Avlys Data — AI Training Data", description },
};

const steps = [
  ["Define the brief.", "Agree on the task, language, format, and acceptance criteria before collection begins."],
  ["Review a pilot.", "Start with a scoped batch. Check the files and annotations against your requirements."],
  ["Check the details.", "Review quality, provenance, and permitted use. Resolve gaps before accepting a delivery."],
  ["Build from there.", "Agree on the next batch, delivery schedule, and packaging around what the pilot proves."],
];

export default function DataPage() {
  return (
    <div className={styles.page}>
      <a className={styles.skipLink} href="#data-main">Skip to data content</a>
      <Navbar />
      <div className={styles.subnav}>
        <div className={styles.container}>
          <a href="#data-main" className={styles.wordmark}>Avlys <span>Data</span></a>
          <nav aria-label="Data page"><a href="#samples">Sample library</a><a href="#process">Our approach</a><a href="#data-brief">Let’s talk <span aria-hidden="true">↗</span></a></nav>
        </div>
      </div>
      <main id="data-main">
        <section className={styles.hero} aria-labelledby="data-heading">
          <div className={styles.container}>
            <p className={styles.eyebrow}>AVLYS DATA / AI TRAINING & EVALUATION</p>
            <h1 id="data-heading">Better models start<br />with <span>the right data.</span></h1>
            <p className={styles.heroCopy}>Text, image, and voice data for AI teams.<br className={styles.desktopBreak} /> Egocentric capture pilots for the physical world.</p>
            <div className={styles.actions}><a href="#samples" className="btn-pill-primary">Explore the sample library <span aria-hidden="true">↓</span></a><a href="#data-brief" className={styles.textLink}>Discuss a requirement <span aria-hidden="true">↗</span></a></div>
            <div className={styles.formatStrip} aria-label="Our primary data formats">
              {([{ type: "text", label: "Language, in context.", name: "TEXT & DOCUMENTS" }, { type: "image", label: "The details that matter.", name: "IMAGES" }, { type: "voice", label: "More than words.", name: "VOICE & AUDIO" }] as const).map((format) => (
                <a key={format.type} href="#samples" className={styles.formatTile}>
                  <ModalityMark type={format.type} />
                  <div><span>{format.name}</span><p>{format.label}</p></div>
                  <span className={styles.formatArrow} aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
            <p className={styles.heroCaption}>Built around your task. Specified before delivery.</p>
          </div>
        </section>

        <section id="samples" className={styles.section} aria-labelledby="samples-heading">
          <div className={styles.container}>
            <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>THE SAMPLE LIBRARY</p><h2 id="samples-heading">See what goes<br />into the model.</h2></div><p>Explore our collection categories. Real sample previews and dataset specifications will be added here as they are approved.</p></div>
            <DatasetGallery />
          </div>
        </section>

        <section className={styles.offers} aria-labelledby="offers-heading">
          <div className={styles.container}>
            <p className={styles.eyebrow}>WAYS TO WORK TOGETHER</p><h2 id="offers-heading">Your brief. The right starting point.</h2>
            <div className={styles.offerGrid}>
              {[
                ["01", "Existing collections", "Tell us what you need. We’ll discuss relevant collections, availability, and permitted uses. Public previews are coming soon."],
                ["02", "Custom collection", "Scope a collection around your task, language, environment, and target format. Begin with an agreed pilot."],
                ["03", "Annotation & review", "Discuss labels, transcript requirements, and review criteria for your authorized data. Define the output before starting."],
              ].map(([n, title, text]) => <article key={n}><span className={styles.offerNumber}>{n}</span><h3>{title}</h3><p>{text}</p><a className={styles.textLink} href="#data-brief">Discuss the scope <span aria-hidden="true">↗</span></a></article>)}
            </div>
          </div>
        </section>

        <section id="process" className={styles.process} aria-labelledby="process-heading">
          <div className={styles.container}>
            <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>FROM REQUIREMENT TO DELIVERY</p><h2 id="process-heading">A clear brief.<br />An inspectable result.</h2></div><p>Quality starts with an agreed specification—not an unexplained accuracy number. This is how we propose to work together.</p></div>
            <ol className={styles.steps}>{steps.map(([title, body], index) => <li key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{body}</p></li>)}</ol>
            <div className={styles.deliveryNote}><span>THE DELIVERY CONVERSATION</span><p>Files & schema <b aria-hidden="true">/</b> Review criteria <b aria-hidden="true">/</b> Provenance & rights <b aria-hidden="true">/</b> Known limitations</p></div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="ego-heading">
          <div className={`${styles.container} ${styles.egoGrid}`}>
            <div className={styles.egoPlaceholder}>
              <span className={styles.eyebrow}>EGOCENTRIC / PILOT</span><ModalityMark type="egocentric" />
              <p>First-person task preview</p><span>Video space reserved · No sample uploaded</span>
            </div>
            <div><p className={styles.eyebrow}>A FIRST-PERSON PERSPECTIVE</p><h2 id="ego-heading">Real tasks.<br />A closer look.</h2><p className={styles.egoCopy}>We’re developing a smaller egocentric collection alongside our text, image, and voice work. Start with a focused capture pilot for your robotics or embodied-AI use case.</p><p className={styles.egoCopy}>Camera setup, task boundaries, sensors, and labels are scoped explicitly. Human video is not presented as robot action data.</p><a className={styles.textLink} href="#data-brief">Talk about a capture pilot <span aria-hidden="true">↗</span></a></div>
          </div>
        </section>

        <section className={styles.faqSection} aria-labelledby="faq-heading"><div className={`${styles.container} ${styles.faqGrid}`}>
          <div><p className={styles.eyebrow}>A FEW DETAILS</p><h2 id="faq-heading">Before you<br />get started.</h2></div>
          <div>{[
            ["Can I download a sample now?", "Not yet. The library currently reserves space for our samples. Approved previews, collection specifications, and access details will be added before downloads are offered."],
            ["What information will accompany each collection?", "The intended task, languages, accepted quantity, file format, annotation schema, review method, source information, permitted uses, and known limitations."],
            ["Can you collect data to our specification?", "Share your task, format, approximate volume, and timeline. We’ll discuss feasibility and a pilot scope before making a delivery commitment."],
            ["How will sample access and licensing work?", "Public previews will be reviewed separately from evaluation packs and full deliveries. Access and permitted use will be agreed for each collection; files will not be automatically available for unrestricted reuse."],
          ].map(([question, answer]) => <details key={question} className={styles.faq}><summary>{question}</summary><p>{answer}</p></details>)}</div>
        </div></section>

        <section id="data-brief" className={styles.contactSection} aria-labelledby="brief-heading"><div className={`${styles.container} ${styles.contactGrid}`}>
          <div><p className={styles.eyebrow}>LET’S START WITH THE TASK</p><h2 id="brief-heading">What does your<br />model need to learn?</h2><p>Share the data requirement. We’ll discuss what fits, what needs collecting, and what a useful first batch should contain.</p><a href={`mailto:${siteConfig.email}`} className={styles.contactEmail}>{siteConfig.email} <span aria-hidden="true">↗</span></a><a className={styles.phone} href={`tel:${siteConfig.phoneHref}`}>{siteConfig.phone}</a></div>
          <DataBrief />
        </div></section>
      </main>
      <Footer />
    </div>
  );
}
