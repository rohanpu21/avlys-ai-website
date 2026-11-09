import LeadCaptureForm from "./LeadCaptureForm";
import BookCallCta from "./BookCallCta";
import Reveal from "./Reveal";
import WhatsAppCta from "./WhatsAppCta";
import { siteConfig } from "../lib/site";
import Link from "next/link";

const CallToAction = ({ compact = false }: { compact?: boolean }) => {
  if (compact) {
    return (
      <section id="contact" className="on-dark bg-tile-1 px-6 py-16 text-on-dark">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="type-display-lg">What do you want to build?</h2>
          <p className="mt-4 text-[18px] leading-relaxed text-on-dark-muted">
            Tell us what you need the software to do.
          </p>
          <div className="mt-7">
            <BookCallCta location="footer_cta" />
          </div>
          <Link href="/contact#project-form" className="mt-4 inline-flex min-h-11 items-center text-[14px] text-on-dark-muted underline underline-offset-4 hover:text-on-dark">
            Send your project details
          </Link>
        </div>
      </section>
    );
  }
  return (
    <section id="contact" className="on-dark bg-tile-1 px-6 py-20 text-on-dark">
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-start">
          <Reveal>
            <h2 className="type-display-lg">
              Let’s talk about what you want to build.
            </h2>
            <p className="type-lead-airy mt-4 max-w-md text-on-dark-muted">
              A 30-minute discovery call to discuss your product, the workflows
              it needs to support, and the next step toward a scoped build.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <BookCallCta location="footer_cta" />
              <WhatsAppCta location="footer_cta" />
            </div>
            <div className="mt-8 flex flex-col gap-2 text-[15px] text-on-dark-muted">
              <a
                href={`mailto:${siteConfig.email}`}
                className="transition-opacity hover:opacity-70"
              >
                {siteConfig.email}
              </a>
              <a
                href={`tel:${siteConfig.phoneHref}`}
                className="transition-opacity hover:opacity-70"
              >
                {siteConfig.phone}
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div id="project-form" className="scroll-mt-24 rounded-[18px] bg-canvas p-6 text-ink sm:p-8">
              <p className="type-caption-strong text-ink">
                Tell us about the project
              </p>
              <p className="type-caption mt-1 text-ink-faint">
                Share the problem, the people who will use the software, and what success looks like.
              </p>
              <div className="mt-5">
                <LeadCaptureForm />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
