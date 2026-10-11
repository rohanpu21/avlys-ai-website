"use client";

import { useEffect, useState } from "react";
import type { DataModality } from "../publicDatasetCatalog";
import { filterOtsDatasets, otsCategories, type OtsDataset } from "../otsCatalogueClient";
import { dataCategories } from "../dataContent";
import DataPageDatasetCard from "./DataPageDatasetCard";
import { FormatIcon } from "./DatasetCard";
import styles from "./catalogue.module.css";

const suggestedSearches: Record<DataModality, { label: string; query: string }[]> = {
  image: [
    { label: "Image captions", query: "caption" },
    { label: "Satellite imagery", query: "satellite" },
    { label: "Synthetic scenes", query: "synthetic" },
  ],
  audio: [
    { label: "Hindi speech", query: "Hindi" },
    { label: "Multilingual speech", query: "multilingual" },
    { label: "Voice commands", query: "commands" },
  ],
  video: [
    { label: "Robot actions", query: "robot" },
    { label: "Synthetic views", query: "synthetic" },
    { label: "Tabletop trajectories", query: "tabletop" },
  ],
};

export default function OtsDataCatalogue({ datasets }: { datasets: OtsDataset[] }) {
  const [modality, setModality] = useState<DataModality>("image");
  const [query, setQuery] = useState("");
  const [useCase, setUseCase] = useState("");
  const [collectionType, setCollectionType] = useState("");

  useEffect(() => {
    const syncCategory = () => {
      const match = otsCategories.find((category) => window.location.hash === `#datasets-${category.id}`);
      if (match) { setModality(match.id); setQuery(""); setUseCase(""); setCollectionType(""); }
    };
    syncCategory();
    window.addEventListener("hashchange", syncCategory);
    return () => window.removeEventListener("hashchange", syncCategory);
  }, []);

  function chooseCategory(next: DataModality) {
    setModality(next);
    setQuery("");
    setUseCase("");
    setCollectionType("");
    window.history.replaceState(null, "", `#datasets-${next}`);
  }

  function clearFilters() {
    setQuery("");
    setUseCase("");
    setCollectionType("");
  }

  const category = otsCategories.find((item) => item.id === modality)!;
  const categoryDatasets = datasets.filter((item) => item.modality === modality);
  const results = filterOtsDatasets(datasets, modality, query, { useCase, collectionType });
  const categoryCount = categoryDatasets.length;
  const useCases = [...new Set(categoryDatasets.flatMap((dataset) => dataset.useCases))].sort((a, b) => a.localeCompare(b));
  const collectionTypes = [...new Set(categoryDatasets.map((dataset) => dataset.kind))].sort((a, b) => a.localeCompare(b));
  const hasActiveFilters = Boolean(query.trim() || useCase || collectionType);

  return <section id="datasets" className={styles.section} aria-labelledby="catalogue-heading">
    <span id="samples" className={styles.anchor} aria-hidden="true" />
    <div className={styles.container}>
      <div className={styles.heading}>
        <div><p className={styles.eyebrow}>Off-the-shelf AI training data</p><h2 id="catalogue-heading" className="type-display-lg">Avlys OTS Data</h2></div>
        <p>Compare image, audio and video reference collections by coverage, formats and task. Fit, availability and permitted use are confirmed for each brief.</p>
      </div>
      <div className={styles.catalogueMeta}><span><span className={styles.statusDot} aria-hidden="true" />{datasets.length} reference options</span><span>Image · Audio · Video</span><span>Availability confirmed on request</span></div>

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
        <div className={styles.suggestions} role="group" aria-label={`Suggested searches for ${category.title}`}>
          <span className={styles.suggestionsLabel}>Suggested searches</span>
          {suggestedSearches[modality].map((item) => <button key={item.label} type="button" className={styles.suggestion} aria-pressed={query === item.query} onClick={() => { setQuery(item.query); setUseCase(""); setCollectionType(""); }}>{item.label}</button>)}
        </div>
        <div className={styles.controls}>
          <div className={styles.search}><label htmlFor="dataset-search">Search within {category.title.toLowerCase()}</label><div className={styles.searchField}><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 4.5 4.5" /></svg><input id="dataset-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try ‘Hindi’, ‘synthetic’ or ‘classification’" maxLength={120} aria-controls="dataset-results" aria-describedby="dataset-filter-hint" /></div></div>
          <div className={styles.filter}><label htmlFor="dataset-use-case">Filter by use case</label><select id="dataset-use-case" value={useCase} onChange={(event) => setUseCase(event.target.value)} aria-controls="dataset-results" aria-describedby="dataset-filter-hint"><option value="">All use cases</option>{useCases.map((item) => <option value={item} key={item}>{item}</option>)}</select></div>
          <div className={styles.filter}><label htmlFor="dataset-collection-type">Filter by collection type</label><select id="dataset-collection-type" value={collectionType} onChange={(event) => setCollectionType(event.target.value)} aria-controls="dataset-results" aria-describedby="dataset-filter-hint"><option value="">All collection types</option>{collectionTypes.map((item) => <option value={item} key={item}>{item}</option>)}</select></div>
        </div>
        <p id="dataset-filter-hint" className={styles.filterHint}>Search collection names, formats, coverage and tasks. Refinements combine to narrow the options shown.</p>
        <div className={styles.resultsMeta}><p role="status" aria-live="polite" aria-atomic="true">{results.length} of {categoryCount} {modality} datasets</p>{hasActiveFilters && <button id="clear-dataset-filters" type="button" onClick={clearFilters}>Clear all filters</button>}</div>

        <div id="dataset-results" className={styles.grid} aria-label={`${category.title} dataset results`}>
          {results.map((dataset) => <DataPageDatasetCard key={dataset.id} dataset={dataset} />)}
          {results.length === 0 && <div className={styles.empty}><h4>No matching datasets in {category.title.toLowerCase()}.</h4><p>Try a broader search or remove one of the refinements.</p><button type="button" onClick={clearFilters}>Clear all filters <span aria-hidden="true">→</span></button></div>}
        </div>
      </div>

      <div className={styles.pilot}><div><p className={styles.eyebrow}>From selection to specification</p><h3>Need more than an off-the-shelf dataset?</h3><p>Bring your language, domain and acceptance criteria. We’ll assess what fits, what needs preparation, and what calls for custom collection.</p></div><a href="#data-brief" className="btn-pill-primary">Scope a data pilot <span aria-hidden="true">→</span></a></div>
    </div>
  </section>;
}
