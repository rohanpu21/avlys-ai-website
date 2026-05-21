import Link from "next/link";
import { featuredServicePages } from "../data/services";

const Footer = () => {
  return (
    <footer className="border-t border-[var(--border-subtle)] px-6 py-12">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 text-sm text-[var(--muted)]">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--foreground)]">Avlys AI</p>
            <p className="mt-3 max-w-md text-sm leading-6">
              AI automation, calling agents, chatbots, custom platforms, and support systems for businesses
              in India and globally.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--foreground)]">
                Services
              </p>
              <div className="mt-4 grid gap-2">
                {featuredServicePages.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    className="transition-opacity hover:opacity-50"
                  >
                    {service.title}
                  </Link>
                ))}
                <Link href="/services" className="transition-opacity hover:opacity-50">
                  All Services
                </Link>
              </div>
            </div>
            <div className="flex flex-col gap-4 text-sm">
              <div className="flex flex-col gap-2">
                <a href="mailto:official@avlysai.com" className="transition-opacity hover:opacity-50">
                  official@avlysai.com
                </a>
                <a href="tel:+919337709699" className="transition-opacity hover:opacity-50">
                  +91 93377 09699
                </a>
              </div>
              <div className="flex items-center gap-4">
                <a
                  href="https://www.linkedin.com/company/avlys-ai/"
                  aria-label="LinkedIn"
                  className="text-[var(--muted-strong)] transition-colors hover:text-[var(--foreground)]"
                  target="_blank"
                  rel="noreferrer"
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="currentColor"
                  >
                    <path d="M20.45 20.45h-3.55v-5.4c0-1.28-.03-2.93-1.78-2.93-1.78 0-2.05 1.39-2.05 2.83v5.5H9.5V9h3.41v1.56h.05c.48-.9 1.64-1.84 3.36-1.84 3.6 0 4.27 2.37 4.27 5.45v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/avlysai?igsh=azd6aTB5eHpxd3Jq"
                  aria-label="Instagram"
                  className="text-[var(--muted-strong)] transition-colors hover:text-[var(--foreground)]"
                  target="_blank"
                  rel="noreferrer"
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="currentColor"
                  >
                    <path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm10 2H7a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Zm-5 3.5A5.5 5.5 0 1 1 6.5 14 5.5 5.5 0 0 1 12 8.5Zm0 2A3.5 3.5 0 1 0 15.5 14 3.5 3.5 0 0 0 12 10.5Zm5.25-3.75a1.25 1.25 0 1 1-1.25 1.25 1.25 1.25 0 0 1 1.25-1.25Z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted-strong)] sm:flex-row sm:justify-between">
          <span>Hyderabad, India / Remote-first</span>
          <span>2026 Avlys AI. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
