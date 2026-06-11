"use client";

import type { ChangeEvent, FormEvent } from "react";
import { useState } from "react";
import posthog from "posthog-js";

type FormStatus = "idle" | "loading" | "success" | "error";

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

const LeadCaptureForm = () => {
  const [formState, setFormState] = useState<LeadFormState>(initialState);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage(null);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formState.name.trim(),
          email: formState.email.trim(),
          phone: formState.phone.trim(),
          company: formState.company.trim(),
          projectType: formState.projectType,
          message: formState.message.trim(),
          website: formState.website,
          source: "website",
        }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        throw new Error(payload?.error || "Something went wrong. Please try again.");
      }

      posthog.capture("lead_submitted", {
        project_type: formState.projectType,
        has_company: Boolean(formState.company.trim()),
      });
      setFormState(initialState);
      setStatus("success");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to send the form right now.";
      setErrorMessage(message);
      setStatus("error");
    }
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
      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-pill-primary disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "loading" ? "Sending..." : "Send project details"}
      </button>
      {status === "success" && (
        <p className="text-[15px] text-ink">
          Thanks - we&rsquo;ll reply within one business day.
        </p>
      )}
      {status === "error" && (
        <p className="text-[15px] text-red-600">{errorMessage}</p>
      )}
    </form>
  );
};

export default LeadCaptureForm;
