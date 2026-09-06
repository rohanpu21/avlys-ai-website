"use client";

import { useState } from "react";
import { datasetCategories, type DatasetCategoryId } from "../datasetCatalog";
import ModalityMark from "./ModalityMark";
import styles from "../data.module.css";

export default function DatasetGallery() {
  const [selected, setSelected] = useState<DatasetCategoryId | "all">("all");
  const categories = datasetCategories.filter((item) => selected === "all" || item.id === selected);

  return (
    <>
      <div className={styles.filters} role="group" aria-label="Filter sample categories">
        {[{ id: "all", shortLabel: "All formats" }, ...datasetCategories].map((item) => (
          <button type="button" key={item.id} aria-pressed={selected === item.id}
            aria-controls="dataset-results" className={styles.filter}
            onClick={() => setSelected(item.id as DatasetCategoryId | "all")}>
            {item.shortLabel}
          </button>
        ))}
      </div>
      <p className={styles.galleryNote} role="status">
        {selected === "all" ? "Four collection categories" : `${categories[0].label} category`} · Public samples coming soon
      </p>
      <div id="dataset-results" className={styles.gallery}>
        {categories.map((item) => (
          <article key={item.id} className={styles.sampleCard}>
            <div className={styles.sampleVisual}>
              <span className={styles.visualIndex}>{item.number} / {item.shortLabel.toUpperCase()}</span>
              <ModalityMark type={item.id} />
              <span className={styles.placeholderLabel}>Sample space reserved</span>
            </div>
            <div className={styles.sampleBody}>
              <div className={styles.cardTitle}><h3>{item.label}</h3>{item.id === "egocentric" && <span className={styles.badge}>Pilot</span>}</div>
              <p>{item.description}</p>
              <p className={styles.useCase}>{item.useCase}</p>
              <details className={styles.sampleDetails}>
                <summary>What the sample will include</summary>
                <p>{item.previewDescription}</p>
                <ul>{item.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
              </details>
            </div>
          </article>
        ))}
      </div>
      <p className={styles.galleryFootnote}>These are collection categories, not downloadable datasets. Approved previews, quantities, and licensing details will be added with each collection.</p>
    </>
  );
}
