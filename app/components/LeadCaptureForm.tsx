"use client";

import type { ChangeEvent, FormEvent } from "react";
import { useState } from "react";

type FormStatus = "idle" | "loading" | "success" | "error";

type LeadFormState = {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
};

const initialState: LeadFormState = {
  name: "",
  email: "",
  phone: "",
  company: "",
  message: "",
};

const LeadCaptureForm = () => {
  const [formState, setFormState] = useState<LeadFormState>(initialState);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
          message: formState.message.trim(),
          source: "website",
        }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        throw new Error(payload?.error || "Something went wrong. Please try again.");
      }

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
        <label className="grid gap-2 text-xs uppercase tracking-[0.16em] text-[var(--muted-strong)]">
          Name
          <input
            name="name"
            value={formState.name ?? ""}
            onChange={handleChange}
            required
            className="w-full border border-[var(--border-subtle)] bg-transparent px-4 py-3 text-sm text-[var(--foreground)] focus:border-[var(--border-strong)] focus:outline-none"
          />
        </label>
        <label className="grid gap-2 text-xs uppercase tracking-[0.16em] text-[var(--muted-strong)]">
          Email
          <input
            name="email"
            type="email"
            value={formState.email ?? ""}
            onChange={handleChange}
            required
            className="w-full border border-[var(--border-subtle)] bg-transparent px-4 py-3 text-sm text-[var(--foreground)] focus:border-[var(--border-strong)] focus:outline-none"
          />
        </label>
      </div>
      <label className="grid gap-2 text-xs uppercase tracking-[0.16em] text-[var(--muted-strong)]">
        Mobile Number
        <input
          name="phone"
          type="tel"
          value={formState.phone ?? ""}
          onChange={handleChange}
          required
          className="w-full border border-[var(--border-subtle)] bg-transparent px-4 py-3 text-sm text-[var(--foreground)] focus:border-[var(--border-strong)] focus:outline-none"
        />
      </label>
      <label className="grid gap-2 text-xs uppercase tracking-[0.16em] text-[var(--muted-strong)]">
        Company (Optional)
        <input
          name="company"
          value={formState.company ?? ""}
          onChange={handleChange}
          className="w-full border border-[var(--border-subtle)] bg-transparent px-4 py-3 text-sm text-[var(--foreground)] focus:border-[var(--border-strong)] focus:outline-none"
        />
      </label>
      <label className="grid gap-2 text-xs uppercase tracking-[0.16em] text-[var(--muted-strong)]">
        Project Details
        <textarea
          name="message"
          value={formState.message ?? ""}
          onChange={handleChange}
          required
          rows={4}
          className="w-full border border-[var(--border-subtle)] bg-transparent px-4 py-3 text-sm text-[var(--foreground)] focus:border-[var(--border-strong)] focus:outline-none"
        />
      </label>
      <button
        type="submit"
        disabled={status === "loading"}
        className="bg-[var(--foreground)] px-6 py-3 text-center font-mono text-xs uppercase tracking-[0.2em] text-[var(--background)] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "loading" ? "Sending..." : "Submit Request"}
      </button>
      {status === "success" && (
        <p className="text-sm text-[var(--muted-strong)]">
          Thanks! We will get back to you within 24 hours.
        </p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-400">{errorMessage}</p>
      )}
    </form>
  );
};

export default LeadCaptureForm;
