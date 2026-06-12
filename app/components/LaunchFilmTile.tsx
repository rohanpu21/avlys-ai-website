"use client";

import { useEffect, useRef, useState } from "react";
import posthog from "posthog-js";

// Cinematic tile: full-bleed launch film below the hero. Muted/looping
// preview plays only while in view (and never under prefers-reduced-motion);
// the frosted caption bar opens the same film with sound.
const LaunchFilmTile = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.35 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!expanded) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setExpanded(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [expanded]);

  const openFilm = () => {
    posthog.capture("launch_film_opened");
    setExpanded(true);
  };

  return (
    <>
      <section ref={sectionRef} className="bg-true-black">
        <div className="relative aspect-video w-full overflow-hidden">
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            poster="/video/avlys-launch-poster.jpg"
            muted
            loop
            playsInline
            preload="none"
            aria-hidden="true"
          >
            <source src="/video/avlys-launch.webm" type="video/webm" />
            <source src="/video/avlys-launch.mp4" type="video/mp4" />
          </video>
          <button
            type="button"
            onClick={openFilm}
            className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-4 border-t border-white/10 bg-black/40 px-6 py-4 backdrop-blur-xl transition-colors hover:bg-black/55 sm:px-10"
          >
            <span className="type-tagline text-left text-on-dark">
              Avlys AI &mdash; watch the launch film
            </span>
            <span className="inline-flex min-h-[44px] items-center justify-center whitespace-nowrap rounded-full border border-primary-on-dark px-5 text-[14px] text-primary-on-dark transition-transform active:scale-95">
              Watch &#9656;
            </span>
          </button>
        </div>
      </section>

      {expanded && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label="Avlys AI launch film"
          onClick={() => setExpanded(false)}
        >
          <div
            className="relative w-full max-w-4xl"
            onClick={(event) => event.stopPropagation()}
          >
            <video
              className="w-full rounded-[18px]"
              poster="/video/avlys-launch-poster.jpg"
              controls
              autoPlay
              playsInline
            >
              <source src="/video/avlys-launch.webm" type="video/webm" />
              <source src="/video/avlys-launch.mp4" type="video/mp4" />
            </video>
            <button
              type="button"
              onClick={() => setExpanded(false)}
              aria-label="Close launch film"
              className="absolute -top-12 right-0 flex min-h-[44px] min-w-[44px] items-center justify-center text-[28px] leading-none text-on-dark transition-opacity hover:opacity-70"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default LaunchFilmTile;
