import Link from "next/link";
import { team } from "../data/team";
import TeamPortrait from "./TeamPortrait";
import Reveal from "./Reveal";

export default function TeamPreview() {
  return (
    <section className="bg-parchment px-6 py-20">
      <div className="mx-auto w-full max-w-6xl">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="type-caption-strong uppercase tracking-[0.14em] text-ink-muted">The people behind the product</p>
            <h2 className="type-display-lg mt-4">Meet your collaborators.</h2>
            <p className="type-lead-airy mt-5 text-ink-muted">A founder-led team, involved from the first conversation to the systems you use every day.</p>
          </div>
          <Link href="/about" className="inline-flex min-h-11 items-center text-primary">About Us →</Link>
        </Reveal>
        <div className="mt-12 grid gap-10 sm:grid-cols-3">
          {team.filter((person) => ["Gopal Jain", "Gaurav Purohit", "Rohan Purohit"].includes(person.name)).map((person) => (
            <Reveal key={person.name}>
              <TeamPortrait person={person} />
              <h3 className="mt-5 text-[21px] font-semibold">{person.name}</h3>
              <p className="type-caption mt-2 text-ink-muted">{person.role}</p>
              <p className="type-caption mt-3 max-w-xs text-ink-muted">{person.bio}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
