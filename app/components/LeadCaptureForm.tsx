"use client";

import type { ChangeEvent, FormEvent } from "react";
import { useRef, useState } from "react";
import posthog from "posthog-js";
import { trackMarketingConversion } from "../lib/marketing-events";
import { siteConfig } from "../lib/site";

type FormStatus = "idle" | "submitting" | "success" | "error";

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
  "Custom software build",
  "AI agents / automation",
  "Integration / modernization",
  "Product discovery / technical planning",
  "Ongoing engineering and support",
  "Something else",
];

const inputClass =
  "w-full rounded-[11px] border border-hairline bg-canvas px-4 py-3 text-[15px] text-ink placeholder:text-ink-faint focus:border-primary-focus focus:outline-none";

const labelClass = "grid gap-1.5 text-[13px] font-semibold text-ink-muted";

const anonymousIdPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const analyticsHeaders = (): Record<string, string> => {
  try {
    if (!posthog.config?.token || posthog.config.token === "ph_project_token" || posthog.has_opted_out_capturing()) return {};

    const distinctId = posthog.get_distinct_id();
    if (!anonymousIdPattern.test(distinctId)) return {};

    const headers: Record<string, string> = { "X-POSTHOG-DISTINCT-ID": distinctId };
    const sessionId = posthog.get_session_id();
    if (anonymousIdPattern.test(sessionId)) headers["X-POSTHOG-SESSION-ID"] = sessionId;
    return headers;
  } catch {
    // No initialized/available analytics means no server-side analytics context.
    return {};
  }
};

// An explicit fallback only: opening a draft is not a delivered inquiry.
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
  const [errorMessage, setErrorMessage] = useState("");
  const submissionInFlight = useRef(false);
  const fieldsDisabled = status === "submitting" || status === "success";

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Honeypot: bots fill the hidden field. Drop the submission silently.
    if (formState.website || submissionInFlight.current || status === "success") return;

    const lead: LeadFormState = {
      ...formState,
      name: formState.name.trim(),
      email: formState.email.trim(),
      phone: formState.phone.trim(),
      company: formState.company.trim(),
      message: formState.message.trim(),
    };

    submissionInFlight.current = true;
    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...analyticsHeaders() },
        body: JSON.stringify({ ...lead, source: "website" }),
      });
      const result: unknown = await response.json().catch(() => null);
      const data = result && typeof result === "object" ? result : null;

      if (!response.ok || !data || !("ok" in data) || data.ok !== true || !("saved" in data) || data.saved !== true) {
        const message = data && "error" in data && typeof data.error === "string"
          ? data.error
          : "We couldn't confirm your inquiry was saved. Please try again or email us.";
        setErrorMessage(message);
        setStatus("error");
        return;
      }

      setStatus("success");
      trackMarketingConversion("avlys_lead_submitted");
      // A conversion represents an acknowledged database write, never an email draft.
      try {
        posthog.capture("lead_submitted", {
          project_type: lead.projectType,
          has_company: Boolean(lead.company),
          delivery_method: "website_form",
        });
      } catch {
        // Analytics availability must not change an already saved inquiry.
      }
    } catch {
      setErrorMessage("We couldn't confirm your inquiry was saved. Check your connection and try again, or email us.");
      setStatus("error");
    } finally {
      submissionInFlight.current = false;
    }
  };

  return (
    <form onSubmit={handleSubmit} aria-busy={status === "submitting"} className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className={labelClass}>
          Name
          <input
            name="name"
            value={formState.name}
            onChange={handleChange}
            required
            disabled={fieldsDisabled}
            maxLength={320}
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
            disabled={fieldsDisabled}
            maxLength={320}
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
            disabled={fieldsDisabled}
            maxLength={320}
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
            disabled={fieldsDisabled}
            maxLength={320}
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
          disabled={fieldsDisabled}
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
          disabled={fieldsDisabled}
          maxLength={4000}
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
      <button type="submit" disabled={fieldsDisabled} className="btn-pill-primary disabled:cursor-not-allowed disabled:opacity-60">
        {status === "submitting" ? "Sending…" : status === "error" ? "Try sending again" : status === "success" ? "Inquiry received" : "Send project details"}
      </button>
      {status === "error" && (
        <p role="alert" className="rounded-[11px] border border-hairline bg-parchment p-4 text-[14px] text-ink">
          {errorMessage} Your details are still here.
        </p>
      )}
      {status !== "success" && (
        <p className="text-[13px] text-ink-muted">
          Prefer email?{" "}
          <a href={buildMailtoUrl(formState)} className="font-semibold text-primary underline">
            Open an email draft
          </a>{" "}
          to {siteConfig.email}. You will need to send it from your email app.
        </p>
      )}
      {status !== "success" && (
        <p className="text-[13px] text-ink-muted">
          We use these details only to reply about your project. See our{" "}
          <a href="/privacy" className="font-semibold text-primary underline">
            Privacy Policy
          </a>
          .
        </p>
      )}
      {status === "success" && (
        <div role="status" className="rounded-[18px] border border-hairline bg-parchment p-5 text-[15px] text-ink">
          <p className="font-semibold text-ink">Your inquiry has been received.</p>
          <p className="mt-1 text-ink-muted">
            Thank you for sharing your project. Our team will review your details and contact you at the email address you provided.
          </p>
          <button
            type="button"
            onClick={() => {
              setFormState(initialState);
              setStatus("idle");
              setErrorMessage("");
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
