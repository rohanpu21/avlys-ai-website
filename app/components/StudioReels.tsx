"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { studioReels } from "../data/studio";
import styles from "./StudioReels.module.css";

const reels = studioReels.filter((reel) => /^[A-Za-z0-9_-]+$/.test(reel.id));

export default function StudioReels({ standalone = false }: { standalone?: boolean }) {
  const headingId = useId();
  const trackId = useId();
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const playButtons = useRef<(HTMLButtonElement | null)[]>([]);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [inView, setInView] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(true);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [firstVisible, setFirstVisible] = useState(0);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => setReducedMotion(media.matches);
    const syncVisibility = () => setPageVisible(!document.hidden);
    syncMotion();
    syncVisibility();
    media.addEventListener("change", syncMotion);
    document.addEventListener("visibilitychange", syncVisibility);
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting), { threshold: 0.25 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      media.removeEventListener("change", syncMotion);
      document.removeEventListener("visibilitychange", syncVisibility);
      observer.disconnect();
    };
  }, []);

  const rotating = !paused && !hovered && inView && pageVisible && !reducedMotion && !playingId;

  useEffect(() => {
    if (!rotating || reels.length < 2) return;
    const timer = window.setInterval(() => {
      const track = trackRef.current;
      if (!track) return;
      const step = ((track.firstElementChild as HTMLElement)?.offsetWidth ?? track.clientWidth) + 24;
      const atEnd = track.scrollLeft >= track.scrollWidth - track.clientWidth - 8;
      track.scrollTo({ left: atEnd ? 0 : track.scrollLeft + step, behavior: "smooth" });
    }, 6000);
    return () => window.clearInterval(timer);
  }, [rotating]);

  function move(direction: number) {
    setPaused(true);
    setPlayingId(null);
    const track = trackRef.current;
    if (!track) return;
    const step = ((track.firstElementChild as HTMLElement)?.offsetWidth ?? track.clientWidth) + 24;
    const end = track.scrollWidth - track.clientWidth;
    const next = direction > 0
      ? (track.scrollLeft >= end - 8 ? 0 : track.scrollLeft + step)
      : (track.scrollLeft <= 8 ? end : track.scrollLeft - step);
    track.scrollTo({ left: next, behavior: reducedMotion ? "instant" : "smooth" });
  }

  if (!reels.length) return null;
  return (
    <section
      id="studio-reels"
      ref={sectionRef}
      aria-labelledby={headingId}
      aria-roledescription="carousel"
      className={`scroll-mt-24 ${standalone ? "bg-parchment px-6 py-20" : "mt-16"}`}
      onPointerEnter={(event) => { if (event.pointerType === "mouse") setHovered(true); }}
      onPointerLeave={() => setHovered(false)}
      onFocusCapture={(event) => {
        if (!(event.target as HTMLElement).closest("[data-rotation-control]")) setPaused(true);
      }}
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="type-caption-strong uppercase tracking-[0.14em] text-primary">On Instagram</p>
            <h2 id={headingId} className="type-display-lg mt-3">From the studio.</h2>
            <p className="type-caption mt-3 max-w-xl text-ink-muted">Seven reels from our feed. Tap a cover to load Instagram, or open the original post.</p>
          </div>
          <div className="flex items-center gap-2">
            {!reducedMotion && (
              <button type="button" data-rotation-control aria-controls={trackId} className={styles.rotation} onClick={() => { setPaused(!paused); setPlayingId(null); }}>
                {paused ? "Resume rotation" : "Pause rotation"}
              </button>
            )}
            <button type="button" aria-label="Previous reels" aria-controls={trackId} onClick={() => move(-1)} className={styles.arrow}>←</button>
            <button type="button" aria-label="Next reels" aria-controls={trackId} onClick={() => move(1)} className={styles.arrow}>→</button>
          </div>
        </div>
        <div
          id={trackId}
          ref={trackRef}
          className={styles.track}
          aria-live="off"
          onPointerDown={() => setPaused(true)}
          onScroll={() => {
            const track = trackRef.current;
            if (!track) return;
            const step = ((track.firstElementChild as HTMLElement)?.offsetWidth ?? 1) + 24;
            setFirstVisible(Math.min(reels.length - 1, Math.round(track.scrollLeft / step)));
          }}
          onKeyDown={(event) => {
            if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
              event.preventDefault();
              move(event.key === "ArrowRight" ? 1 : -1);
            }
          }}
        >
          {reels.map((reel, index) => {
            const url = `https://www.instagram.com/reel/${reel.id}/`;
            const playing = playingId === reel.id;
            return (
              <article key={reel.id} className={styles.card} aria-label={`${index + 1} of ${reels.length}: ${reel.title}`} aria-roledescription="slide">
                <div className={styles.media}>
                  {playing ? (
                    <iframe src={`${url}embed/`} title={`${reel.title} — Instagram player`} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen className="absolute inset-0 h-full w-full border-0 bg-canvas" />
                  ) : (
                    <button
                      ref={(node) => { playButtons.current[index] = node; }}
                      type="button"
                      onClick={() => { setPaused(true); setPlayingId(reel.id); }}
                      aria-label={`Load ${reel.title} from Instagram`}
                      className={styles.coverButton}
                    >
                      <Image src={reel.cover} alt="" fill sizes="(min-width: 1200px) 368px, (min-width: 1024px) 31vw, (min-width: 640px) 46vw, 85vw" className="object-cover" />
                      <span className={styles.play} aria-hidden="true">▶</span>
                      <span className={styles.badge}>View reel ↗</span>
                    </button>
                  )}
                  {playing && (
                    <button
                      type="button"
                      aria-label="Close player"
                      className="absolute right-3 top-3 z-10 min-h-11 rounded-full border border-hairline bg-canvas px-4 text-[14px] text-primary"
                      onClick={() => {
                        setPlayingId(null);
                        window.requestAnimationFrame(() => playButtons.current[index]?.focus({ preventScroll: true }));
                      }}
                    >Close ×</button>
                  )}
                </div>
                <div className="flex items-center justify-between gap-2 pt-4">
                  <h3 className="text-[17px] font-semibold">{reel.title}</h3>
                  <span className="type-caption text-ink-muted">{String(index + 1).padStart(2, "0")} / {String(reels.length).padStart(2, "0")}</span>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <a href={url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-[15px] text-primary hover:underline" aria-label={`Watch ${reel.title} on Instagram (opens in a new tab)`}>Watch on Instagram ↗</a>
                </div>
              </article>
            );
          })}
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-ink-muted">
          <p className="type-caption">{reducedMotion ? "Use the arrows or swipe to explore." : "Changes every 6 seconds. Pauses when you interact."}</p>
          <p className="type-caption" role="status" aria-live={rotating ? "off" : "polite"}>Reel {firstVisible + 1} of {reels.length}</p>
        </div>
        <p className="type-fine-print mt-3 text-ink-muted">Instagram loads only after you select a reel and may require sign-in. If playback is unavailable, use “Watch on Instagram.”</p>
      </div>
    </section>
  );
}
