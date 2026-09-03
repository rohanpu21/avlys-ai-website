"use client";

import type { ChangeEvent, FormEvent } from "react";
import { useState } from "react";
import posthog from "posthog-js";
import { siteConfig } from "../lib/site";

type FormStatus = "idle" | "success";

type LeadFormState = {
  name: string;
  email: string;
  phone: string;
  company: string;
  projectType: string;
  message: string;
  website: string; // honeypot - humans never see or fill this
};

const initialState: LeadFormState = {
  name: "",
  email: "",
  phone: "",
  company: "",
  projectType: "",
  message: "",
  website: "",
};

const projectTypes = [
  "AI integration into existing systems",
  "Custom software build",
  "AI agents / automation",
  "AI consulting / readiness assessment",
  "Something else",
];

const inputClass =
  "w-full rounded-[11px] border border-hairline bg-canvas px-4 py-3 text-[15px] text-ink placeholder:text-ink-faint focus:border-primary-focus focus:outline-none";

const labelClass = "grid gap-1.5 text-[13px] font-semibold text-ink-muted";

// The form hands off to the visitor's own mail client, so the details land in
// the sales inbox even when no server-side mail transport is configured.
const buildMailtoUrl = (lead: LeadFormState) => {
  const subject = lead.company
    ? `Project details from ${lead.name} (${lead.company})`
    : `Project details from ${lead.name}`;

  const body = [
    `Name: ${lead.name}`,
    `Email: ${lead.email}`,
    `Company: ${lead.company || "Not provided"}`,
    `Phone: ${lead.phone || "Not provided"}`,
    `What they need: ${lead.projectType}`,
    "",
    "Project details:",
    lead.message,
  ].join("\n");

  return `mailto:${siteConfig.email}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
};

const LeadCaptureForm = () => {
  const [formState, setFormState] = useState<LeadFormState>(initialState);
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Honeypot: bots fill the hidden field. Drop the submission silently.
    if (formState.website) return;

    const lead: LeadFormState = {
      ...formState,
      name: formState.name.trim(),
      email: formState.email.trim(),
      phone: formState.phone.trim(),
      company: formState.company.trim(),
      message: formState.message.trim(),
    };

    // Opened first and synchronously so the browser still treats this as a
    // direct result of the click rather than a blocked background navigation.
    window.location.href = buildMailtoUrl(lead);

    posthog.capture("lead_submitted", {
      project_type: lead.projectType,
      has_company: Boolean(lead.company),
    });

    // Best-effort backup capture, so a visitor with no mail client configured
    // is not lost entirely. Failures stay silent: the mail handoff above is
    // the delivery path the visitor actually sees.
    void fetch("/api/leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...lead, source: "website" }),
    }).catch(() => {});

    setStatus("success");
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className={labelClass}>
          Name
          <input
            name="name"
            value={formState.name}
            onChange={handleChange}
            required
            autoComplete="name"
            className={inputClass}
          />
        </label>
        <label className={labelClass}>
          Work email
          <input
            name="email"
            type="email"
            value={formState.email}
            onChange={handleChange}
            required
            autoComplete="email"
            className={inputClass}
          />
        </label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className={labelClass}>
          Company
          <input
            name="company"
            value={formState.company}
            onChange={handleChange}
            autoComplete="organization"
            className={inputClass}
          />
        </label>
        <label className={labelClass}>
          Phone (optional)
          <input
            name="phone"
            type="tel"
            value={formState.phone}
            onChange={handleChange}
            autoComplete="tel"
            className={inputClass}
          />
        </label>
      </div>
      <label className={labelClass}>
        What do you need?
        <select
          name="projectType"
          value={formState.projectType}
          onChange={handleChange}
          required
          className={inputClass}
        >
          <option value="" disabled>
            Select one
          </option>
          {projectTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </label>
      <label className={labelClass}>
        Project details
        <textarea
          name="message"
          value={formState.message}
          onChange={handleChange}
          required
          rows={4}
          placeholder="The workflow or system, what you want it to do, and any timeline."
          className={inputClass}
        />
      </label>
      <input
        type="text"
        name="website"
        value={formState.website}
        onChange={handleChange}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />
      <button type="submit" className="btn-pill-primary">
        Send project details
      </button>
      {status === "success" && (
        <div className="rounded-[18px] border border-hairline bg-parchment p-5 text-[15px] text-ink">
          <p className="font-semibold text-ink">Inquiry prepared.</p>
          <p className="mt-1 text-ink-muted">
            Your email app should now be open with your project details ready to send. If it
            did not open, please send your details directly to{" "}
            <a href={`mailto:${siteConfig.email}`} className="font-semibold text-primary underline">
              {siteConfig.email}
            </a>
            .
          </p>
          <button
            type="button"
            onClick={() => {
              setFormState(initialState);
              setStatus("idle");
            }}
            className="mt-3 inline-block text-[14px] font-semibold text-primary transition-all active:scale-95 hover:opacity-75"
          >
            Send another inquiry &rarr;
          </button>
        </div>
      )}
    </form>
  );
};

export default LeadCaptureForm;
