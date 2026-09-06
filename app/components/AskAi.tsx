"use client";

import Image from "next/image";
import { useState } from "react";
import { siteConfig } from "../lib/site";

const providers = [
  { name: "ChatGPT", icon: "openai", url: "https://chatgpt.com/" },
  { name: "Claude", icon: "claude", url: "https://claude.ai/" },
  { name: "Gemini", icon: "googlegemini", url: "https://gemini.google.com/" },
  { name: "Perplexity", icon: "perplexity", url: "https://www.perplexity.ai/" },
];
const prompt = `What does Avlys AI do, which enterprise software and AI services does it offer, and who is on its team? Use ${siteConfig.url} and ${siteConfig.url}/about as sources. Distinguish published facts from assumptions and include source links.`;

export default function AskAi() {
  const [status, setStatus] = useState("");
  const [showPrompt, setShowPrompt] = useState(false);
  const copyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setStatus("Question copied. Paste it into your AI conversation.");
    } catch {
      setShowPrompt(true);
      setStatus("Copy the question below and paste it into your AI conversation.");
    }
  };
  return (
    <div className="max-w-md">
      <p className="type-caption-strong uppercase tracking-[0.1em] text-ink-muted">Ask AI about Avlys</p>
      <p className="type-fine-print mt-2 text-ink-muted">Choose an assistant to copy a question and open it in a new tab.</p>
      <div className="mt-3 flex gap-3">
        {providers.map((provider) => (
          <a key={provider.name} href={provider.url} onClick={() => { void copyPrompt(); }} target="_blank" rel="noopener noreferrer" title={provider.name} aria-label={`Ask ${provider.name} about Avlys (opens in a new tab)`} className="flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-canvas focus-visible:outline-2">
            <Image src={`/ai/${provider.icon}.svg`} alt="" width={26} height={26} />
          </a>
        ))}
      </div>
      <p role="status" className="type-fine-print mt-2 text-ink-muted">{status}</p>
      {showPrompt && <textarea aria-label="Question to ask about Avlys" readOnly value={prompt} onFocus={(event) => event.currentTarget.select()} className="mt-3 h-32 w-full rounded-lg border border-hairline bg-canvas p-3 text-[13px]" />}
    </div>
  );
}
