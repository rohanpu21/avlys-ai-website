"use client";

import { useState, type FormEvent } from "react";
import { siteConfig } from "../../lib/site";
import styles from "../data.module.css";

export default function DataBrief() {
  const [emailDraft, setEmailDraft] = useState("");

  function prepareBrief(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fields = new FormData(event.currentTarget);
    const body = `Hi Avlys Data,\n\nI would like to discuss a data requirement.\n\nData type: ${fields.get("modality")}\nLanguage / domain: ${fields.get("domain") || "To discuss"}\nRequirements:\n${fields.get("requirements")}\n\n`;
    setEmailDraft(`mailto:${siteConfig.email}?subject=${encodeURIComponent("Avlys Data — project brief")}&body=${encodeURIComponent(body)}`);
  }

  return (
    <form className={styles.briefForm} onSubmit={prepareBrief} onChange={() => setEmailDraft("")}>
      <label htmlFor="data-modality">What kind of data?</label>
      <select id="data-modality" name="modality" required defaultValue="">
        <option value="" disabled>Select a format</option>
        <option>Text & documents</option><option>Images</option><option>Voice & audio</option>
        <option>Egocentric video pilot</option><option>Multiple formats</option>
      </select>
      <label htmlFor="data-domain">Language or domain <span>(optional)</span></label>
      <input id="data-domain" name="domain" maxLength={160} placeholder="e.g. Hindi speech, retail images" />
      <label htmlFor="data-requirements">What are you building?</label>
      <textarea id="data-requirements" name="requirements" required minLength={10} maxLength={1800} rows={4}
        placeholder="Tell us the task, approximate volume, desired format, and timeline." />
      <p className={styles.formNote}>No files or sensitive data, please. This prepares an email; nothing is submitted through this page.</p>
      <button className="btn-pill-primary" type="submit">Prepare email brief <span aria-hidden="true">↗</span></button>
      {emailDraft && <div className={styles.draftReady} role="status">
        <p>Your brief is ready. Open your email app to review and send it.</p>
        <a href={emailDraft}>Continue in email <span aria-hidden="true">↗</span></a>
        <p>Or email us directly at <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.</p>
      </div>}
    </form>
  );
}
