"use client";

import { useRef } from "react";
import posthog from "posthog-js";

export default function LaunchFilmTile() {
  const hasPlayed = useRef(false);

  function trackFirstPlay() {
    if (hasPlayed.current) return;
    hasPlayed.current = true;
    posthog.capture("launch_film_opened");
  }

  return (
    <section
      id="launch-film"
      aria-labelledby="launch-film-heading"
      className="scroll-mt-24 bg-parchment px-6 py-12"
    >
      <div className="mx-auto w-full max-w-3xl">
        <h2 id="launch-film-heading" className="type-display-lg text-ink">
          Avlys AI launch film
        </h2>
        <video
          aria-labelledby="launch-film-heading"
          className="mt-5 aspect-video w-full rounded-[18px] bg-true-black"
          poster="/video/avlys-launch-poster.jpg"
          controls
          playsInline
          preload="none"
          onPlay={trackFirstPlay}
        >
          <source src="/video/avlys-launch.webm" type="video/webm" />
          <source src="/video/avlys-launch.mp4" type="video/mp4" />
          <a href="/video/avlys-launch.mp4">Open the launch film</a>
        </video>
      </div>
    </section>
  );
}
