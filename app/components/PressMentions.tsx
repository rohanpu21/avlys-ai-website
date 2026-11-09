import { siteConfig } from "../lib/site";

const publications = [
  {
    name: "Business Upturn",
    href: "https://businessupturn.com/brand-post/the-agency-that-says-no-why-avlys-ai-is-betting-on-less-software-not-more/",
  },
  {
    name: "India Shorts",
    href: "https://indiashorts.com/the-agency-that-says-no-why-avlys-ai-is-betting-on-less-software-not-more/297759/",
  },
  {
    name: "The Eastern Herald",
    href: "https://easternherald.com/2026/09/05/the-agency-that-says-no-why-avlys-ai-is-betting-on-less-software-not-more/",
  },
  {
    name: "KaroStartup",
    href: "https://www.karostartup.com/article/the-agency-that-says-no-why-avlys-ai-is-betting-on-less-software-not-more",
  },
];

const [linkedInUrl, instagramUrl] = siteConfig.socialLinks;

const mediaLinks = [
  { name: "Instagram", href: instagramUrl },
  {
    name: "YouTube (Rohan Purohit)",
    href: "https://www.youtube.com/@rohanpurohit3711/videos",
  },
  { name: "LinkedIn", href: linkedInUrl },
];

export default function PressMentions() {
  return (
    <section
      id="press"
      aria-labelledby="press-heading"
      className="scroll-mt-24 border-y border-hairline bg-parchment px-6 py-7 sm:py-8"
    >
      <div className="mx-auto w-full max-w-6xl">
        <h2 id="press-heading" className="text-xl font-semibold tracking-tight text-ink">
          Media
        </h2>
        <div className="mt-4 grid gap-5 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] md:gap-8">
          <div>
            <h3 className="type-caption-strong text-primary">In the press</h3>
            <ul className="mt-1 grid grid-cols-2 gap-x-5">
              {publications.map((publication) => (
                <li key={publication.name}>
                  <a
                    href={publication.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Read the Avlys AI press release in ${publication.name} (opens in a new tab)`}
                    className="group flex min-h-11 items-center gap-2 rounded-sm py-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                  >
                    <span className="text-[17px] font-semibold leading-tight tracking-tight text-ink group-hover:text-primary">
                      {publication.name}
                    </span>
                    <span aria-hidden="true" className="text-primary">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="border-t border-hairline pt-4 md:border-l md:border-t-0 md:pl-8 md:pt-0">
            <h3 className="type-caption-strong text-primary">Videos and updates</h3>
            <ul className="mt-2 flex flex-wrap gap-2">
              {mediaLinks.map(({ name, href }) => (
                <li key={name}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-2 rounded-full border border-hairline bg-canvas px-3.5 py-2 text-sm font-medium text-ink transition-colors hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    {name}
                    <span aria-hidden="true" className="text-primary">↗</span>
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
