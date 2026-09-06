import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CallToAction from "../components/CallToAction";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Reveal from "../components/Reveal";
import { team } from "../data/team";
import TeamPortrait from "../components/TeamPortrait";
import StudioReels from "../components/StudioReels";
import StructuredData from "../components/StructuredData";
import { absoluteUrl, siteConfig } from "../lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Meet the founder-led team building AI-native custom software and enterprise automation at Avlys AI.",
  alternates: { canonical: "/about" },
};

const aboutUrl = absoluteUrl("/about");

const structuredData = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": `${aboutUrl}#webpage`,
  url: aboutUrl,
  name: "About Avlys AI",
  isPartOf: { "@id": `${siteConfig.url}/#website` },
  about: { "@id": `${siteConfig.url}/#organization` },
  inLanguage: "en-US",
};

const studioPhotos = [
  {
    src: "/studio/laptop.jpeg",
    alt: "Building at a desk in the Avlys studio",
  },
  {
    src: "/studio/dont-hire-us.jpeg",
    alt: "Avlys studio screen: Please Don't Hire Us. Seriously.",
  },
  {
    src: "/studio/logo-wall.jpeg",
    alt: "Avlys mark on the studio screen",
  },
  {
    src: "/studio/whiteboard.jpeg",
    alt: "Planning session at the Avlys studio whiteboard",
  },
];

const LinkedInIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
    <path d="M20.45 20.45h-3.55v-5.4c0-1.28-.03-2.93-1.78-2.93-1.78 0-2.05 1.39-2.05 2.83v5.5H9.5V9h3.41v1.56h.05c.48-.9 1.64-1.84 3.36-1.84 3.6 0 4.27 2.37 4.27 5.45v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
  </svg>
);

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <StructuredData data={structuredData} />
      <Navbar />
      <main>
        <section className="on-dark bg-true-black px-6 pb-16 pt-20 text-on-dark sm:pb-24 sm:pt-28">
          <div className="mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(400px,1.1fr)] lg:items-end">
            <Reveal>
              <p className="type-caption-strong uppercase tracking-[0.18em] text-on-dark-muted">About Avlys</p>
              <h1 className="type-hero mt-5 max-w-xl text-on-dark">Built close to the work.</h1>
              <p className="type-lead mt-7 max-w-lg text-on-dark-muted">We are a founder-led AI-native software team helping enterprises build what their operations need next.</p>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="relative aspect-[4/3] overflow-hidden bg-tile-1">
                <Image src="/team/office-build.jpeg" alt="An Avlys team member working from the office" fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
              </div>
            </Reveal>
          </div>
        </section>

        <section className="bg-canvas px-6 py-5">
          <div className="mx-auto grid w-full max-w-6xl gap-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted sm:grid-cols-3">
            <span>Founder-led delivery</span><span>Hyderabad · Bengaluru</span><span>AI-native from day one</span>
          </div>
        </section>

        <section className="bg-parchment px-6 py-20 sm:py-24">
          <div className="mx-auto w-full max-w-6xl">
            <Reveal className="max-w-2xl">
              <p className="type-caption-strong uppercase tracking-[0.18em] text-ink-faint">The people behind Avlys</p>
              <h2 className="type-display-lg mt-4 text-ink">A team that stays close to the outcome.</h2>
            </Reveal>
            <div className="mt-14 grid border-l border-t border-hairline sm:grid-cols-2 lg:grid-cols-3">
              {team.map((person, index) => (
                <Reveal key={person.name} delay={index * 0.035} className="h-full">
                  <article id={person.name.toLowerCase().replaceAll(" ", "-")} className="flex h-full scroll-mt-24 flex-col border-b border-r border-hairline bg-canvas p-7 sm:p-8">
                    <TeamPortrait person={person} />
                    <div className="mt-7 flex flex-1 flex-col">
                      <p className="type-caption-strong min-h-10 text-ink-muted">{person.role}</p>
                      <h3 className="mt-3 text-[25px] font-semibold leading-tight tracking-[-0.02em] text-ink">{person.name}</h3>
                      <p className="type-caption mt-2 sm:min-h-[60px] text-ink-muted">{person.experience}{person.experience && person.detail ? " · " : ""}{person.detail}</p>
                      <p className="type-caption mt-5 text-ink-muted">{person.bio}</p>
                      {person.experienceNote && <p className="type-caption mt-3 text-ink-muted">{person.experienceNote}</p>}
                      {person.linkedin && (
                        <a href={person.linkedin} target="_blank" rel="noopener noreferrer" className="mt-auto pt-7 inline-flex min-h-11 w-fit items-center gap-2 text-[15px] text-primary transition-opacity hover:opacity-65"><LinkedInIcon /> LinkedIn</a>
                      )}
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="on-dark bg-tile-1 px-6 py-20 text-on-dark sm:py-24">
          <div className="mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(300px,0.75fr)] lg:items-center">
            <Reveal>
              <p className="type-caption-strong uppercase tracking-[0.18em] text-on-dark-muted">How we work</p>
              <h2 className="type-display-lg mt-4 max-w-3xl">AI should live in the way work gets done—not beside it.</h2>
            </Reveal>
            <Reveal delay={0.08} className="space-y-5 text-on-dark-muted">
              <p className="text-[17px] leading-[1.55]">We begin with the operating reality: the decisions, handoffs, tools, data, and people that make your business move.</p>
              <p className="text-[17px] leading-[1.55]">Then we design, build, and evolve custom software that gives your team leverage without asking them to reinvent how they work.</p>
              <Link href="/contact" className="inline-flex pt-2 text-[17px] text-primary-on-dark transition-opacity hover:opacity-70">Start a conversation <span className="ml-2">→</span></Link>
            </Reveal>
          </div>
        </section>

        <section className="bg-canvas px-6 py-20 sm:py-24">
          <div className="mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-center">
            <Reveal>
              <p className="type-caption-strong uppercase tracking-[0.18em] text-ink-faint">Studio journal</p>
              <h2 className="type-display-lg mt-4 text-ink">Follow the work as it happens.</h2>
              <p className="type-caption mt-6 max-w-md text-ink-muted">Inside Avlys: product demos, engineering sessions, and the people building your next system.</p>
              <a href={siteConfig.socialLinks[1]} target="_blank" rel="noopener noreferrer" className="btn-pill-primary mt-8">View Avlys on Instagram</a>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="grid grid-cols-2 border-l border-t border-hairline">
                {studioPhotos.map((photo) => (
                  <div key={photo.src} className="relative aspect-square overflow-hidden border-b border-r border-hairline bg-parchment">
                    <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1024px) 28vw, 50vw" className="object-cover" />
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
          <StudioReels />
        </section>
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}
