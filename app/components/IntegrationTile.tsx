import Link from "next/link";
import Reveal from "./Reveal";

const capabilities = [
  "Customer platforms",
  "Internal applications",
  "AI agents",
  "Document workflows",
  "Connected systems",
];

// Connect the studio's product thinking with its enterprise engineering work.
const IntegrationTile = () => {
  return (
    <section className="on-dark bg-tile-1 px-6 py-20 text-on-dark">
      <Reveal className="mx-auto w-full max-w-4xl text-center">
        <h2 className="type-display-lg">
          Your product team, from idea to production.
        </h2>
        <p className="type-lead-airy mx-auto mt-6 max-w-2xl text-on-dark-muted">
          We work with your people to define the product, design the experience,
          and build the software behind it. AI, data, and integrations come
          together around your workflows, with the controls and human oversight
          your business needs.
        </p>
        <div className="mx-auto mt-10 flex max-w-2xl flex-wrap justify-center gap-x-6 gap-y-3">
          {capabilities.map((capability) => (
            <span key={capability} className="type-caption text-on-dark-muted">
              {capability}
            </span>
          ))}
        </div>
        <div className="mt-10">
          <Link
            href="/services/custom-software-development"
            className="text-[17px] text-primary-on-dark transition-opacity hover:opacity-70"
          >
            Explore custom software development &rarr;
          </Link>
        </div>
      </Reveal>
    </section>
  );
};

export default IntegrationTile;
