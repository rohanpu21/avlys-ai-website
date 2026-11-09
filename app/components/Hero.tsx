"use client";

import Link from "next/link";
import { Fragment, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import BookCallCta from "./BookCallCta";
import { FluidParticlesBackground } from "@/components/ui/fluid-particles-background";

gsap.registerPlugin(useGSAP);

// Split per word so each can ride up out of its own clip box.
const headlineWords = ["Custom", "software", "built", "around", "your", "business."];

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
      className="relative isolate overflow-hidden bg-canvas px-6 py-14 sm:py-16"
    >
      <div
        data-hero-atmosphere
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <FluidParticlesBackground />
        <div className="hero-aura absolute left-1/2 top-[18%] h-[420px] w-[min(680px,92vw)] -translate-x-1/2" />
      </div>

      <div className="mx-auto flex w-full max-w-4xl flex-col items-center text-center">
        <p data-hero-fade className="type-caption-strong uppercase tracking-[0.14em] text-primary">
          AI-native product studio
        </p>
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
          We build customer portals, internal tools, and AI workflows for
          enterprise teams.
        </p>

        <div data-hero-fade className="mt-8 flex flex-col items-center gap-2 sm:flex-row sm:gap-6">
          <BookCallCta location="hero" />
          <Link href="/case-studies" className="inline-flex min-h-11 items-center text-[15px] font-medium text-primary underline-offset-4 hover:underline">
            See our work <span className="ml-2" aria-hidden="true">→</span>
          </Link>
        </div>

        <p data-hero-fade className="type-caption mt-4 text-ink-muted">
          30 minutes to talk about what you need.
        </p>
      </div>
    </section>
  );
};

export default Hero;
