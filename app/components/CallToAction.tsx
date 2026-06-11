import LeadCaptureForm from "./LeadCaptureForm";
import BookCallCta from "./BookCallCta";
import Reveal from "./Reveal";
import { siteConfig } from "../lib/site";

const CallToAction = () => {
  return (
    <section id="contact" className="on-dark bg-tile-1 px-6 py-20 text-on-dark">
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-start">
          <Reveal>
            <h2 className="type-display-lg">
              Book a strategy call.
            </h2>
            <p className="type-lead-airy mt-4 max-w-md text-on-dark-muted">
              30 minutes, engineers on the call, no deck. We&rsquo;ll map your
              workflow and tell you honestly whether AI pays back - and what a
              fixed-price pilot would look like.
            </p>
            <div className="mt-8">
              <BookCallCta location="footer_cta" />
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
            <div className="rounded-[18px] bg-canvas p-6 text-ink sm:p-8">
              <p className="type-caption-strong text-ink">
                Or tell us about the project
              </p>
              <p className="type-caption mt-1 text-ink-faint">
                We reply within one business day.
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
