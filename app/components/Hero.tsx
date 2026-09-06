"use client";

import Link from "next/link";
import { Fragment, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import BookCallCta from "./BookCallCta";

gsap.registerPlugin(useGSAP);

// Split per word so each can ride up out of its own clip box.
const headlineWords = ["AI-native", "custom", "software", "for", "enterprises."];

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

        <p data-hero-fade className="type-lead mt-6 max-w-2xl text-ink-muted">
          We build intelligent applications and integrate AI into your existing
          systems—from the first pilot to production.
        </p>

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
