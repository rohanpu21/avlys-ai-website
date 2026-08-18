"use client";

import Link from "next/link";
import { Fragment, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import BookCallCta from "./BookCallCta";

gsap.registerPlugin(useGSAP);

// Split per word so each can ride up out of its own clip box.
const headlineWords = [
  "Software",
  "and",
  "AI",
  "that",
  "fit",
  "how",
  "you",
  "already",
  "work.",
];

// Two separate propositions rather than one clause - the build offer and the
// data offer read as distinct services instead of a single run-on sentence.
const heroPoints = [
  {
    title: "Custom software, built with AI.",
    body: "Avlys AI delivers fixed-scope builds at record speed and lower cost, integrated into the ERP, CRM, and tools you already run.",
  },
  {
    title: "Data collection and preparation.",
    body: "Any data type - collected, annotated, cleaned, and evaluated by our core team, ready for the model that consumes it.",
  },
];

const Hero = () => {
  const ref = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  // The sweep is clipped to the h1's own text, so it can only run once the
  // per-word transforms are gone - a transformed word paints outside the
  // parent's clipped background and would drop out mid-animation.
  const startHeadlineShimmer = () => {
    const headline = headlineRef.current;
    if (!headline) return;

    headline.querySelectorAll<HTMLElement>("[data-hero-word]").forEach((word) => {
      word.style.transform = "";
    });
    headline.classList.add("text-shimmer");
  };

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      // Initial states live here rather than in CSS, so a reduced-motion
      // visitor never lands on hidden or displaced text.
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

        tl.fromTo(
          "[data-hero-atmosphere]",
          { autoAlpha: 0, scale: 0.9 },
          { autoAlpha: 1, scale: 1, duration: 1.8, ease: "power2.out" },
          0
        )
          .fromTo(
            "[data-hero-word]",
            { yPercent: 115 },
            {
              yPercent: 0,
              duration: 1,
              stagger: 0.055,
              onComplete: startHeadlineShimmer,
            },
            0.1
          )
          .fromTo(
            "[data-hero-fade]",
            { autoAlpha: 0, y: 22 },
            { autoAlpha: 1, y: 0, duration: 0.85, stagger: 0.12 },
            "-=0.5"
          );
      });
    },
    { scope: ref }
  );

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden bg-canvas px-6 pb-20 pt-20 sm:pt-28"
    >
      <div
        data-hero-atmosphere
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="hero-grid absolute inset-0" />
        <div className="hero-aura absolute left-1/2 top-[18%] h-[420px] w-[min(680px,92vw)] -translate-x-1/2" />
      </div>

      <div className="mx-auto flex w-full max-w-4xl flex-col items-center text-center">
        <Link
          data-hero-fade
          href="/services/ai-training-data"
          className="inline-flex items-center gap-2 rounded-full border border-hairline bg-parchment px-3.5 py-1.5 text-[13px] font-semibold text-ink-muted transition-colors hover:border-ink-faint"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
          </span>
          New - data collection &amp; preparation
        </Link>

        <h1 ref={headlineRef} className="type-hero mt-6 max-w-3xl text-ink">
          {headlineWords.map((word, index) => (
            <Fragment key={`${word}-${index}`}>
              <span className="word-mask">
                <span data-hero-word className="inline-block">
                  {word}
                </span>
              </span>
              {index < headlineWords.length - 1 ? " " : null}
            </Fragment>
          ))}
        </h1>

        <div className="mt-8 grid w-full max-w-3xl gap-5 text-left sm:mt-10 sm:grid-cols-2 sm:gap-8">
          {heroPoints.map((point, index) => (
            <div
              key={point.title}
              data-hero-fade
              className="border-t border-hairline pt-4"
            >
              <span className="type-caption-strong text-primary">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="mt-2 text-[17px] leading-[1.45] text-ink-muted">
                <span className="font-semibold text-ink">{point.title}</span>{" "}
                {point.body}
              </p>
            </div>
          ))}
        </div>

        <div data-hero-fade className="mt-9 flex flex-col gap-4 sm:flex-row">
          <BookCallCta location="hero" />
          <Link href="/case-studies" className="btn-pill-ghost">
            See case studies
          </Link>
        </div>

        <p data-hero-fade className="type-caption mt-8 text-ink-faint">
          Fixed-scope pilots in 4-6 weeks. Senior engineers on every call. Full
          IP transfer.
        </p>
      </div>
    </section>
  );
};

export default Hero;
