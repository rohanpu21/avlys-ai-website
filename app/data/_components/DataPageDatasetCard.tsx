import { siteConfig } from "../../lib/site";
import type { OtsDataset } from "../otsCatalogueClient";
import { FormatIcon } from "./DatasetCard";
import styles from "./catalogue.module.css";

export default function DataPageDatasetCard({ dataset }: { dataset: OtsDataset }) {
  const brief = `mailto:${siteConfig.email}?subject=${encodeURIComponent(`Avlys OTS Data — ${dataset.name}`)}&body=${encodeURIComponent(`Hi Avlys Data,\n\nPlease confirm availability and pricing for ${dataset.name}.\n\nOur task:\nRequired coverage / volume:\nPreferred formats and annotations:\nPreparation needed:\nTimeline:\n\nPlease confirm sample options and delivery scope.\n`)}`;
  return <article className={styles.card} aria-labelledby={`dataset-${dataset.id}`}>
    <div className={styles.cardHeader}><p className={styles.kind}><FormatIcon modality={dataset.modality} />{dataset.kind}</p><span className={styles.brandTag}>Reference option</span></div>
    <h4 id={`dataset-${dataset.id}`}>{dataset.name}</h4>
    <p className={styles.description}>{dataset.description}</p>
    <div className={styles.facts}><p><span>Reference collection scope</span><strong>{dataset.scale}</strong></p><p>{dataset.coverage}</p></div>
    <ul className={styles.tags} aria-label="Potential uses">{dataset.useCases.map((use) => <li key={use}>{use}</li>)}</ul>
    <details className={styles.details}>
      <summary>Dataset specifications<span className={styles.srOnly}> for {dataset.name}</span><span className={styles.expand} aria-hidden="true" /></summary>
      <dl><div><dt>Formats &amp; labels</dt><dd>{dataset.formats}. {dataset.annotations}</dd></div><div><dt>Fit &amp; scope</dt><dd>{dataset.limitations}</dd></div></dl>
    </details>
    <div className={styles.cardFooter}><a href={brief}>Check availability &amp; pricing<span aria-hidden="true"> →</span><span className={styles.srOnly}> by email: {dataset.name}</span></a></div>
  </article>;
}
