import Image from "next/image";

const publications = [
  {
    name: "Business Upturn",
    href: "https://businessupturn.com/brand-post/the-agency-that-says-no-why-avlys-ai-is-betting-on-less-software-not-more/",
    category: "Brand post",
  },
  {
    name: "India Shorts",
    href: "https://indiashorts.com/the-agency-that-says-no-why-avlys-ai-is-betting-on-less-software-not-more/297759/",
    category: "Press release",
  },
  {
    name: "The Eastern Herald",
    href: "https://easternherald.com/2026/09/05/the-agency-that-says-no-why-avlys-ai-is-betting-on-less-software-not-more/",
    category: "Press release",
  },
  {
    name: "KaroStartup",
    href: "https://www.karostartup.com/article/the-agency-that-says-no-why-avlys-ai-is-betting-on-less-software-not-more",
    category: "Press release",
  },
];

export default function PressMentions() {
  return (
    <section
      id="press"
      aria-labelledby="press-heading"
      className="scroll-mt-24 border-t border-hairline bg-parchment px-6 py-9 sm:py-10"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-7 md:grid-cols-[0.85fr_1.4fr] md:items-center lg:gap-12">
        <figure>
          <div className="overflow-hidden rounded-[18px] bg-tile-2">
            <Image
              src="/press/karostartup-avlys.jpeg"
              alt="Avlys team portrait published with the KaroStartup press release"
              width={1402}
              height={1122}
              sizes="(min-width: 1200px) 417px, (min-width: 768px) 38vw, calc(100vw - 48px)"
              className="h-auto w-full"
            />
          </div>
          <figcaption className="type-fine-print mt-2 text-ink-muted">
            Image from the KaroStartup press release.
          </figcaption>
        </figure>
        <div>
          <h2
            id="press-heading"
            className="type-caption-strong uppercase tracking-[0.14em] text-primary"
          >
            In the press
          </h2>
          <p className="mt-3 max-w-xl text-[19px] font-medium leading-snug tracking-tight sm:text-[21px]">
            The Agency That Says No: Why Avlys AI Is Betting on Less Software,
            Not More
          </p>
          <p className="type-caption mt-3 text-ink-muted">
            Selected publications of our press release. <time dateTime="2026-09-05">5 September 2026</time>
          </p>
          <ul className="mt-6 grid gap-x-6 sm:grid-cols-2">
            {publications.map((publication) => (
              <li
                key={publication.name}
                className="border-t border-hairline py-4"
              >
                <a
                  href={publication.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Read the Avlys AI press release in ${publication.name} (opens in a new tab)`}
                  className="group block rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                >
                  <span className="block text-[19px] font-semibold tracking-tight text-ink group-hover:text-primary">
                    {publication.name}
                  </span>
                  <span className="type-caption mt-1 block text-ink-muted">
                    {publication.category}
                  </span>
                  <span className="type-caption mt-2 inline-flex min-h-11 items-center gap-2 text-primary group-hover:underline group-hover:underline-offset-4">
                    Read article <span aria-hidden="true">↗</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
