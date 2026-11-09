import type { Metadata } from "next";
import Link from "next/link";
import CalBooking from "../components/CalBooking";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { getBookingDestination } from "../lib/booking";
import { siteConfig } from "../lib/site";

export const metadata: Metadata = {
  title: "Book a discovery call",
  description: "Talk with Avlys AI about your next software product, internal platform or intelligent application. Start with a 30-minute discovery call.",
  alternates: { canonical: "/book" },
};

export default function BookingPage() {
  const booking = getBookingDestination(siteConfig.bookingUrl);
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <Navbar />
      <main className="px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 max-w-3xl">
            <p className="type-caption-strong uppercase tracking-[0.14em] text-primary">Let’s build something useful</p>
            <h1 className="type-hero mt-5">Your next product starts with a conversation.</h1>
            <p className="type-lead-airy mt-6 text-ink-muted">Tell us what you want to build. We’ll discuss the people, workflows and goals behind it, and agree on a practical next step.</p>
          </div>
          <div className="grid gap-10 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-14">
            <aside aria-label="About the discovery call">
              <p className="font-semibold">30-minute discovery call</p>
              <p className="mt-2 text-sm text-ink-muted">With the Avlys team · Online</p>
              <h2 className="mt-8 font-semibold">What we’ll cover</h2>
              <ul className="mt-4 space-y-4 text-sm leading-relaxed text-ink-muted">
                <li>Your product idea or business workflow.</li>
                <li>The users, systems and constraints that matter.</li>
                <li>Where custom software and AI can help.</li>
                <li>A next step toward a clearly scoped engagement.</li>
              </ul>
              <p className="mt-8 text-sm text-ink-muted">No detailed brief needed. Bring the problem you want to solve.</p>
            </aside>
            <section aria-label={booking ? "Choose your meeting time" : "Request a discovery call"} className="min-w-0 rounded-3xl border border-hairline bg-canvas p-5 sm:p-7">
              {booking ? <CalBooking booking={booking} /> : (
                <div className="flex min-h-72 flex-col items-start justify-center">
                  <h2 className="type-display-lg">Let’s find a time to talk.</h2>
                  <p className="mt-5 max-w-lg text-ink-muted">Send a few details about your project and your preferred availability. Our team will follow up to arrange the call.</p>
                  <Link href="/contact#project-form" className="btn-pill-primary mt-7">Request a discovery call</Link>
                  <a href={`mailto:${siteConfig.email}`} className="mt-5 inline-flex min-h-11 items-center text-sm text-primary">{siteConfig.email}</a>
                </div>
              )}
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
