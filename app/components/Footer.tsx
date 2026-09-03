import Link from "next/link";
import { servicePages } from "../data/services";
import { siteConfig } from "../lib/site";

// Parchment footer with dense link columns per DESIGN-apple.md.
const Footer = () => {
  return (
    <footer className="bg-parchment px-6 py-16 text-ink-muted">
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div>
            <p className="text-[17px] font-semibold text-ink">Avlys AI</p>
            <p className="type-caption mt-3 max-w-xs">
              Custom software and AI integration for enterprise and mid-market
              teams in the US and India. Built in Hyderabad, delivered on your
              hours.
            </p>
          </div>
          <div>
            <p className="type-caption-strong text-ink">Services</p>
            <div className="mt-3 grid gap-1 text-[15px] leading-[2.2]">
              {servicePages.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="transition-opacity hover:opacity-60"
                >
                  {service.title}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="type-caption-strong text-ink">Company</p>
            <div className="mt-3 grid gap-1 text-[15px] leading-[2.2]">
              <Link href="/about" className="transition-opacity hover:opacity-60">
                About
              </Link>
              <Link href="/case-studies" className="transition-opacity hover:opacity-60">
                Case Studies
              </Link>
              <Link href="/portfolio" className="transition-opacity hover:opacity-60">
                Portfolio
              </Link>
              <Link href="/blog" className="transition-opacity hover:opacity-60">
                Insights
              </Link>
              <Link href="/contact" className="transition-opacity hover:opacity-60">
                Contact
              </Link>
            </div>
          </div>
          <div>
            <p className="type-caption-strong text-ink">Contact</p>
            <div className="mt-3 grid gap-1 text-[15px] leading-[2.2]">
              <a
                href={`mailto:${siteConfig.email}`}
                className="transition-opacity hover:opacity-60"
              >
                {siteConfig.email}
              </a>
              <a
                href={`tel:${siteConfig.phoneHref}`}
                className="transition-opacity hover:opacity-60"
              >
                {siteConfig.phone}
              </a>
              <a
                href={siteConfig.socialLinks[0]}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity hover:opacity-60"
              >
                LinkedIn
              </a>
              <a
                href={siteConfig.socialLinks[1]}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity hover:opacity-60"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-2 border-t border-hairline pt-6 sm:flex-row sm:justify-between">
          <span className="type-fine-print text-ink-faint">
            Hyderabad, India · Serving US and Indian teams
          </span>
          <span className="type-fine-print text-ink-faint">
            &copy; 2026 Avlys AI. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
