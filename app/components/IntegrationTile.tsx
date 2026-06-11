import Link from "next/link";
import Reveal from "./Reveal";

const systems = [
  "Salesforce",
  "SAP",
  "HubSpot",
  "NetSuite",
  "Zendesk",
  "Legacy ERPs",
  "Custom apps",
];

// Dark tile: the core positioning - integrate into existing systems,
// don't rip and replace.
const IntegrationTile = () => {
  return (
    <section className="on-dark bg-tile-1 px-6 py-20 text-on-dark">
      <Reveal className="mx-auto w-full max-w-4xl text-center">
        <h2 className="type-display-lg">
          We integrate AI into what you already run.
        </h2>
        <p className="type-lead-airy mx-auto mt-6 max-w-2xl text-on-dark-muted">
          Most AI initiatives stall because they demand new platforms, new
          processes, and a migration nobody asked for. We take the opposite
          path: AI capability embedded into your existing systems of record,
          behind your access controls, measured against a metric you choose.
        </p>
        <div className="mx-auto mt-10 flex max-w-2xl flex-wrap justify-center gap-x-6 gap-y-3">
          {systems.map((system) => (
            <span key={system} className="type-caption text-on-dark-muted">
              {system}
            </span>
          ))}
        </div>
        <div className="mt-10">
          <Link
            href="/services/ai-integration"
            className="text-[17px] text-primary-on-dark transition-opacity hover:opacity-70"
          >
            How AI integration works &rarr;
          </Link>
        </div>
      </Reveal>
    </section>
  );
};

export default IntegrationTile;
