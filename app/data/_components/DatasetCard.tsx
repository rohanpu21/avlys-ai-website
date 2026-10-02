import { siteConfig } from "../../lib/site";
import type { DataModality } from "../publicDatasetCatalog";
import type { OtsDataset } from "../otsCataloguePresentation";
import styles from "./catalogue.module.css";

export function FormatIcon({ modality }: { modality: DataModality }) {
  return <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    {modality === "image" ? <><rect x="4" y="5" width="24" height="22" rx="3" /><circle cx="22" cy="11" r="2" /><path d="m5 24 8-9 6 6 4-4 5 6" /></> : modality === "audio" ? <><path d="M5 13v6M10.5 8v16M16 3v26M21.5 9v14M27 13v6" strokeLinecap="round" /></> : <><rect x="3" y="7" width="19" height="18" rx="3" /><path d="m22 13 7-4v14l-7-4M10 12l6 4-6 4z" /></>}
  </svg>;
}

export default function DatasetCard({ dataset, headingLevel = "h4" }: { dataset: OtsDataset; headingLevel?: "h3" | "h4" }) {
  const Heading = headingLevel;
  const brief = `mailto:${siteConfig.email}?subject=${encodeURIComponent(`Avlys OTS Data — ${dataset.name}`)}&body=${encodeURIComponent(`Hi Avlys Data,\n\nPlease quote for ${dataset.name}.\n\nOur task:\nRequired coverage / volume:\nPreferred formats and annotations:\nPreparation needed:\nTimeline:\n\nPlease confirm availability, sample options and delivery scope.\n`)}`;
  return <article className={styles.card} aria-labelledby={`dataset-${dataset.id}`}>
    <div className={styles.cardHeader}><p className={styles.kind}><FormatIcon modality={dataset.modality} />{dataset.kind}</p><span className={styles.brandTag}>Avlys OTS Data</span></div>
    <Heading id={`dataset-${dataset.id}`}>{dataset.name}</Heading>
    <p className={styles.description}>{dataset.description}</p>
    <div className={styles.facts}><p><span>Reference collection scope</span><strong>{dataset.scale}</strong></p><p>{dataset.coverage}</p></div>
    <ul className={styles.tags} aria-label="Potential uses">{dataset.useCases.map((use) => <li key={use}>{use}</li>)}</ul>
    <details className={styles.details}>
      <summary>Dataset specifications<span className={styles.srOnly}> for {dataset.name}</span><span className={styles.expand} aria-hidden="true" /></summary>
      <dl><div><dt>Formats & labels</dt><dd>{dataset.formats}. {dataset.annotations}</dd></div><div><dt>Fit & scope</dt><dd>{dataset.limitations}</dd></div></dl>
    </details>
    <div className={styles.cardFooter}><a href={brief}>Request a quote<span aria-hidden="true"> →</span><span className={styles.srOnly}> by email: {dataset.name}</span></a></div>
  </article>;
}
