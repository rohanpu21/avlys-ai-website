"use client";

import { useEffect, useState } from "react";
import type { DataModality } from "../publicDatasetCatalog";
import { filterOtsDatasets, otsCategories, type OtsDataset } from "../otsCataloguePresentation";
import { dataCategories, dataSourceNote } from "../dataContent";
import DatasetCard, { FormatIcon } from "./DatasetCard";
import styles from "./catalogue.module.css";

export default function OtsDataCatalogue({ datasets }: { datasets: OtsDataset[] }) {
  const [modality, setModality] = useState<DataModality>("image");
  const [query, setQuery] = useState("");

  useEffect(() => {
    const syncCategory = () => {
      const match = otsCategories.find((category) => window.location.hash === `#datasets-${category.id}`);
      if (match) { setModality(match.id); setQuery(""); }
    };
    syncCategory();
    window.addEventListener("hashchange", syncCategory);
    return () => window.removeEventListener("hashchange", syncCategory);
  }, []);

  function chooseCategory(next: DataModality) {
    setModality(next);
    setQuery("");
    window.history.replaceState(null, "", `#datasets-${next}`);
  }

  const category = otsCategories.find((item) => item.id === modality)!;
  const results = filterOtsDatasets(datasets, modality, query);
  const categoryCount = datasets.filter((item) => item.modality === modality).length;

  return <section id="datasets" className={styles.section} aria-labelledby="catalogue-heading">
    <span id="samples" className={styles.anchor} aria-hidden="true" />
    <div className={styles.container}>
      <div className={styles.heading}>
        <div><p className={styles.eyebrow}>Off-the-shelf AI training data</p><h2 id="catalogue-heading" className="type-display-lg">Avlys OTS Data</h2></div>
        <p>Explore off-the-shelf image, audio and video data options. Compare coverage, formats and use cases, then tell us what your model needs.</p>
      </div>
      <div className={styles.catalogueMeta}><span><span className={styles.statusDot} aria-hidden="true" />{datasets.length} dataset options</span><span>Image · Audio · Video</span><span>Availability confirmed on request</span></div>

      <div className={styles.categories} role="group" aria-label="Choose a data category">
        {otsCategories.map((item) => <button id={`datasets-${item.id}`} key={item.id} type="button" aria-pressed={modality === item.id} aria-controls="dataset-results" onClick={() => chooseCategory(item.id)} className={styles.category}>
          <span className={styles.categoryIcon}><FormatIcon modality={item.id} /></span>
          <span className={styles.categoryLabel}><span className={styles.categoryTitle}>{item.title}<span className={styles.count}>{datasets.filter((entry) => entry.modality === item.id).length}<span className={styles.srOnly}> datasets</span></span></span><span className={styles.categorySubtitle}>{item.subtitle}</span></span>
          <span className={styles.categoryArrow} aria-hidden="true">↗</span>
        </button>)}
      </div>

      <nav className={styles.categoryLinks} aria-label="Detailed data guides">
        <span>Explore by task:</span>{dataCategories.map((item) => <a key={item.id} href={`/data/${item.id}`}>{item.label} guide <span aria-hidden="true">↗</span></a>)}
      </nav>

      <div className={styles.browser}>
        <div className={styles.categoryIntro}><h3>{modality === "image" ? "Image" : category.title} datasets</h3><p>{category.description}</p></div>
        <div className={styles.controls}>
          <div className={styles.search}><label htmlFor="dataset-search">Search within {category.title.toLowerCase()}</label><div className={styles.searchField}><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 4.5 4.5" /></svg><input id="dataset-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by data type, language or task" maxLength={120} aria-controls="dataset-results" /></div></div>
        </div>
        <div className={styles.resultsMeta}><p role="status" aria-live="polite" aria-atomic="true">{results.length} of {categoryCount} {modality} datasets</p>{query && <button type="button" onClick={() => setQuery("")}>Clear search</button>}</div>

        <div id="dataset-results" className={styles.grid} aria-label={`${category.title} dataset results`}>
          {results.map((dataset) => <DatasetCard key={dataset.id} dataset={dataset} />)}
          {results.length === 0 && <div className={styles.empty}><h4>No matching datasets in {category.title.toLowerCase()}.</h4><p>Try another keyword or switch categories above.</p><button type="button" onClick={() => setQuery("")}>Show all {category.title.toLowerCase()} datasets <span aria-hidden="true">→</span></button></div>}
        </div>
      </div>

      <aside className={styles.rights} aria-labelledby="catalogue-sources-heading">
        <h3 id="catalogue-sources-heading">Data sources</h3>
        <p>{dataSourceNote}</p>
      </aside>

      <div className={styles.pilot}><div><p className={styles.eyebrow}>From selection to specification</p><h3>Need more than an off-the-shelf dataset?</h3><p>Bring your language, domain and acceptance criteria. We’ll assess what fits, what needs preparation, and what calls for custom collection.</p></div><a href="#data-brief" className="btn-pill-primary">Scope a data pilot <span aria-hidden="true">→</span></a></div>
    </div>
  </section>;
}
