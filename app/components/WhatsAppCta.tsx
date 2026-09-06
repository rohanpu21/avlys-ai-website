"use client";

import posthog from "posthog-js";
import { whatsappUrl } from "../lib/site";

export default function WhatsAppCta({ location }: { location: string }) {
  return (
    <a href={whatsappUrl("Hi Avlys AI, I would like to discuss a software project.")} target="_blank" rel="noopener noreferrer"
      onClick={() => posthog.capture("whatsapp_opened", { location })}
      className="inline-flex min-h-11 items-center gap-2 text-[17px] text-primary-on-dark hover:opacity-75">
      Chat with us <span aria-hidden="true">↗</span>
    </a>
  );
}
