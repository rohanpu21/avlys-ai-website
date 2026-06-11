import { clientBrands, techStack, type MarqueeBrand } from "../data/marquee";

type MarqueeRowProps = {
  items: MarqueeBrand[];
  duration: string;
};

const MarqueeRow = ({ items, duration }: MarqueeRowProps) => {
  // Content is duplicated so the -50% translate loops seamlessly.
  const loop = [...items, ...items];

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track" style={{ "--marquee-duration": duration } as React.CSSProperties}>
        {loop.map((item, index) => (
          <span
            key={`${item.name}-${index}`}
            className="type-tagline whitespace-nowrap px-8 text-ink-faint"
          >
            {item.name}
          </span>
        ))}
      </div>
    </div>
  );
};

// Horizontal scrolling brand strips: real clients (when provided) and the
// tech stack Avlys builds with. Sections render only when data exists.
const LogoMarquee = () => {
  if (clientBrands.length === 0 && techStack.length === 0) {
    return null;
  }

  return (
    <section className="border-y border-hairline bg-parchment py-10">
      <div className="mx-auto w-full max-w-6xl">
        {clientBrands.length > 0 && (
          <div className="mb-8">
            <p className="type-caption-strong mb-4 px-6 text-center uppercase tracking-wide text-ink-faint">
              Deployed for
            </p>
            <MarqueeRow items={clientBrands} duration="36s" />
          </div>
        )}
        {techStack.length > 0 && (
          <div>
            <p className="type-caption-strong mb-4 px-6 text-center uppercase tracking-wide text-ink-faint">
              We build with
            </p>
            <MarqueeRow items={techStack} duration="48s" />
          </div>
        )}
      </div>
    </section>
  );
};

export default LogoMarquee;
