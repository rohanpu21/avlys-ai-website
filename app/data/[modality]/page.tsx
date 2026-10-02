import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Geist } from "next/font/google";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import StructuredData from "../../components/StructuredData";
import { siteConfig, whatsappUrl } from "../../lib/site";
import { dataCategories, dataSourceNote } from "../dataContent";
import { buildDataSchema } from "../dataSeo";
import { publicDatasets } from "../publicDatasetCatalog";
import { toOtsCatalogue } from "../otsCataloguePresentation";
import DatasetCard from "../_components/DatasetCard";
import styles from "../data.module.css";
import catalogue from "../_components/catalogue.module.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-data-sans", display: "swap" });
type Props = { params: Promise<{ modality: string }> };

export function generateStaticParams() {
  return dataCategories.map(({ id }) => ({ modality: id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { modality } = await params;
  const category = dataCategories.find(({ id }) => id === modality);
  if (!category) notFound();
  const title = `${category.title} | Avlys Data`;
  return {
    title: { absolute: title }, description: category.description,
    alternates: { canonical: `/data/${category.id}` },
    openGraph: { title, description: category.description, url: `/data/${category.id}`, type: "website" },
    twitter: { card: "summary_large_image", title, description: category.description },
  };
}

export default async function DataCategoryPage({ params }: Props) {
  const { modality } = await params;
  const category = dataCategories.find(({ id }) => id === modality);
  if (!category) notFound();
  const datasets = toOtsCatalogue(publicDatasets).filter((dataset) => dataset.modality === category.id);

  return <div className={`${geist.variable} ${styles.page}`}>
    <StructuredData data={buildDataSchema({ path: `/data/${category.id}`, title: category.title, description: category.description, faqs: category.faqs, categoryLabel: category.label })} />
    <a className={styles.skipLink} href="#category-main">Skip to data content</a>
    <Navbar />
    <main id="category-main">
      <section className={styles.categoryHero} aria-labelledby="category-heading"><div className={styles.container}>
        <nav className={styles.breadcrumbs} aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/data">Avlys Data</Link><span aria-hidden="true">/</span><span aria-current="page">{category.label}</span></nav>
        <p className={styles.heroEyebrow}>Avlys OTS Data / {category.label}</p>
        <h1 id="category-heading">{category.title}</h1>
        <p className={styles.categoryIntro}>{category.intro}</p>
        <div className={styles.actions}><Link className="btn-pill-primary" href="/data#data-brief">Request sample & pricing</Link><a className="btn-pill-ghost" href="#collections">Explore collections</a></div>
        <p className={styles.locationNote}>From Hyderabad and Bengaluru, India. Working with teams globally. Availability confirmed for your brief.</p>
        <nav className={styles.categoryLinks} aria-label="Data categories">{dataCategories.map((item) => <Link key={item.id} href={`/data/${item.id}`} aria-current={item.id === category.id ? "page" : undefined}>{item.label}<span aria-hidden="true">→</span></Link>)}</nav>
      </div></section>

      <section id="collections" className={catalogue.section} aria-labelledby="collections-heading"><div className={catalogue.container}>
        <div className={catalogue.heading}><div><p className={catalogue.eyebrow}>Explore the specifications</p><h2 id="collections-heading" className="type-display-lg">{category.label} collections</h2></div><p>Compare {datasets.length} options by task, coverage and format. Request sample availability and a quote for your chosen scope.</p></div>
        <div className={catalogue.grid}>{datasets.map((dataset) => <DatasetCard key={dataset.id} dataset={dataset} headingLevel="h3" />)}</div>
        <aside className={catalogue.rights} aria-labelledby="sources-heading"><h3 id="sources-heading">Data sources</h3><p>{dataSourceNote}</p></aside>
      </div></section>

      <section className={styles.section} aria-labelledby="requirements-heading"><div className={`${styles.container} ${styles.specGrid}`}>
        <div><p className={styles.eyebrow}>Build a useful first batch</p><h2 id="requirements-heading" className="type-display-lg">What to include<br />in your brief.</h2><p className={styles.specIntro}>Start with the task your model needs to perform. A scoped pilot establishes the selection, review process and delivery expectations before you scale.</p><Link href="/data#delivery" className={styles.textLink}>See the delivery checklist <span aria-hidden="true">→</span></Link></div>
        <ol className={styles.requirements}>{category.needs.map((need) => <li key={need}>{need}</li>)}</ol>
      </div></section>

      <section id="data-faq" className={styles.faqSection} aria-labelledby="category-faq-heading"><div className={`${styles.container} ${styles.specGrid}`}>
        <div><p className={styles.eyebrow}>Before you choose</p><h2 id="category-faq-heading" className="type-display-lg">{category.label} questions.</h2><Link className={styles.textLink} href="/data#data-faq">Pricing, quality & delivery FAQs <span aria-hidden="true">→</span></Link></div>
        <div>{category.faqs.map(({ question, answer }) => <details className={styles.faq} key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
      </div></section>

      <section className={styles.contactSection} aria-labelledby="category-contact-heading"><div className={`${styles.container} ${styles.specGrid}`}>
        <div><p className={styles.eyebrow}>From selection to scope</p><h2 id="category-contact-heading" className="type-display-lg">Let’s scope your<br />{category.label.toLowerCase()}.</h2><p className={styles.categoryContactCopy}>Share the task, coverage, approximate volume and timeline. We’ll discuss availability, sample arrangements and a quote for the agreed work.</p></div>
        <div><div className={styles.contactActions}><Link className="btn-pill-primary" href="/data#data-brief">Request sample & pricing</Link><a className="btn-pill-ghost" href={whatsappUrl(`Hi Avlys Data, I would like to discuss ${category.label.toLowerCase()} availability, samples and pricing.`)} target="_blank" rel="noopener noreferrer">Discuss on WhatsApp ↗</a></div><a className={styles.contactEmail} href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a><p><Link className={styles.contactEmail} href="/data">← All Avlys Data services</Link></p></div>
      </div></section>
    </main>
    <Footer />
  </div>;
}
