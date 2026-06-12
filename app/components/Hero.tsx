"use client";

import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import BookCallCta from "./BookCallCta";

gsap.registerPlugin(useGSAP);

const Hero = () => {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          "[data-hero-stagger]",
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.12, ease: "power3.out" }
        );
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className="bg-canvas px-6 pb-20 pt-20 sm:pt-28">
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center text-center">
        <h1 data-hero-stagger className="type-hero max-w-3xl text-ink">
          Custom software <span className="text-shimmer">and AI</span>, built
          into the systems you already run.
        </h1>
        <p data-hero-stagger className="type-lead mt-6 max-w-2xl text-ink-muted">
          Avlys AI designs, builds, and integrates AI-native software for
          enterprise and mid-market teams - without ripping out the ERP, CRM,
          and tools your operation depends on.
        </p>
        <div data-hero-stagger className="mt-9 flex flex-col gap-4 sm:flex-row">
          <BookCallCta location="hero" />
          <Link href="/case-studies" className="btn-pill-ghost">
            See case studies
          </Link>
        </div>
        <p data-hero-stagger className="type-caption mt-8 text-ink-faint">
          Fixed-scope pilots in 4-6 weeks. Senior engineers on every call. Full
          IP transfer.
        </p>
      </div>
    </section>
  );
};

export default Hero;
