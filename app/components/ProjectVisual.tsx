import type { ReactNode } from "react";
import type { VisualKind } from "../data/caseStudies";

type ProjectVisualProps = {
  kind: VisualKind;
  title: string;
  category: string;
  index?: number;
  compact?: boolean;
};

const mutedLine = "bg-[rgba(255,255,255,0.12)]";
const strongLine = "bg-[rgba(255,255,255,0.32)]";

const BrowserChrome = ({ children }: { children: ReactNode }) => (
  <div className="h-full border border-[var(--border-subtle)] bg-[var(--background)]">
    <div className="flex h-9 items-center gap-2 border-b border-[var(--border-subtle)] px-4">
      <span className="h-2 w-2 bg-[rgba(255,255,255,0.28)]" />
      <span className="h-2 w-2 bg-[rgba(255,255,255,0.18)]" />
      <span className="h-2 w-2 bg-[rgba(255,255,255,0.12)]" />
      <span className="ml-3 h-2 flex-1 bg-[rgba(255,255,255,0.08)]" />
    </div>
    {children}
  </div>
);

const WebsiteVisual = () => (
  <BrowserChrome>
    <div className="grid h-[calc(100%-36px)] grid-cols-[1.15fr_0.85fr] gap-5 p-5">
      <div className="flex flex-col justify-between">
        <div>
          <div className={`h-4 w-24 ${strongLine}`} />
          <div className="mt-8 space-y-3">
            <div className={`h-5 w-11/12 ${strongLine}`} />
            <div className={`h-5 w-9/12 ${strongLine}`} />
            <div className={`h-5 w-7/12 ${mutedLine}`} />
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="h-9 border border-[var(--border-strong)] bg-[var(--foreground)]" />
            <div className="h-9 border border-[var(--border-subtle)]" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 border-t border-[var(--border-subtle)] pt-4">
          <div className={`h-10 ${mutedLine}`} />
          <div className={`h-10 ${mutedLine}`} />
          <div className={`h-10 ${mutedLine}`} />
        </div>
      </div>
      <div className="grid grid-rows-[1fr_0.8fr] gap-4">
        <div className="border border-[var(--border-subtle)] bg-[var(--surface-subtle)] p-4">
          <div className={`h-3 w-20 ${strongLine}`} />
          <div className="mt-5 space-y-3">
            <div className={`h-3 w-full ${mutedLine}`} />
            <div className={`h-3 w-10/12 ${mutedLine}`} />
            <div className={`h-3 w-8/12 ${mutedLine}`} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="border border-[var(--border-subtle)] p-3">
            <div className={`h-full ${mutedLine}`} />
          </div>
          <div className="border border-[var(--border-subtle)] p-3">
            <div className={`h-full ${mutedLine}`} />
          </div>
        </div>
      </div>
    </div>
  </BrowserChrome>
);

const CommerceVisual = () => (
  <BrowserChrome>
    <div className="grid h-[calc(100%-36px)] grid-cols-[1fr_0.72fr] gap-5 p-5">
      <div>
        <div className="grid grid-cols-3 gap-3">
          {[0, 1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="border border-[var(--border-subtle)] p-3">
              <div className={`aspect-square ${item % 2 ? mutedLine : strongLine}`} />
              <div className={`mt-3 h-2 w-10/12 ${mutedLine}`} />
              <div className={`mt-2 h-2 w-6/12 ${mutedLine}`} />
            </div>
          ))}
        </div>
      </div>
      <div className="border border-[var(--border-strong)] bg-[var(--surface-subtle)] p-4">
        <div className={`h-3 w-20 ${strongLine}`} />
        <div className="mt-6 space-y-4">
          {[0, 1, 2].map((item) => (
            <div key={item} className="grid grid-cols-[42px_1fr] gap-3">
              <div className={`h-10 ${mutedLine}`} />
              <div className="space-y-2">
                <div className={`h-2 w-full ${mutedLine}`} />
                <div className={`h-2 w-7/12 ${mutedLine}`} />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 border-t border-[var(--border-subtle)] pt-4">
          <div className="h-9 bg-[var(--foreground)]" />
        </div>
      </div>
    </div>
  </BrowserChrome>
);

const MarketplaceVisual = () => (
  <BrowserChrome>
    <div className="grid h-[calc(100%-36px)] grid-cols-[0.8fr_1.2fr_0.72fr] gap-4 p-5">
      <div className="border border-[var(--border-subtle)] p-4">
        <div className={`h-3 w-16 ${strongLine}`} />
        <div className="mt-6 space-y-3">
          {[0, 1, 2, 3, 4].map((item) => (
            <div key={item} className={`h-8 ${item === 1 ? strongLine : mutedLine}`} />
          ))}
        </div>
      </div>
      <div className="grid gap-3">
        <div className="grid grid-cols-[1fr_120px] gap-3">
          <div className="border border-[var(--border-subtle)] p-3">
            <div className={`h-3 w-8/12 ${mutedLine}`} />
          </div>
          <div className="border border-[var(--border-strong)] bg-[var(--foreground)]" />
        </div>
        {[0, 1, 2].map((item) => (
          <div key={item} className="grid grid-cols-[70px_1fr_90px] gap-4 border border-[var(--border-subtle)] p-4">
            <div className={`h-14 ${item === 0 ? strongLine : mutedLine}`} />
            <div className="space-y-3">
              <div className={`h-3 w-10/12 ${strongLine}`} />
              <div className={`h-2 w-full ${mutedLine}`} />
              <div className={`h-2 w-8/12 ${mutedLine}`} />
            </div>
            <div className={`h-8 ${mutedLine}`} />
          </div>
        ))}
      </div>
      <div className="border border-[var(--border-subtle)] bg-[var(--surface-subtle)] p-4">
        <div className={`h-3 w-20 ${strongLine}`} />
        <div className="mt-6 space-y-4">
          <div className={`h-16 ${mutedLine}`} />
          <div className={`h-16 ${mutedLine}`} />
          <div className={`h-16 ${strongLine}`} />
        </div>
      </div>
    </div>
  </BrowserChrome>
);

const AiSystemVisual = () => (
  <div className="relative h-full overflow-hidden border border-[var(--border-subtle)] bg-[var(--background)] p-6">
    <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
      <line x1="22%" y1="32%" x2="50%" y2="50%" stroke="rgba(255,255,255,0.18)" />
      <line x1="50%" y1="50%" x2="78%" y2="30%" stroke="rgba(255,255,255,0.18)" />
      <line x1="50%" y1="50%" x2="78%" y2="72%" stroke="rgba(255,255,255,0.18)" />
      <line x1="22%" y1="70%" x2="50%" y2="50%" stroke="rgba(255,255,255,0.18)" />
    </svg>
    <div className="relative grid h-full grid-cols-3 items-center gap-5">
      <div className="grid gap-5">
        <div className="border border-[var(--border-subtle)] bg-[var(--surface-subtle)] p-4">
          <div className={`h-3 w-16 ${strongLine}`} />
          <div className={`mt-5 h-12 ${mutedLine}`} />
        </div>
        <div className="border border-[var(--border-subtle)] p-4">
          <div className={`h-3 w-20 ${mutedLine}`} />
          <div className={`mt-5 h-12 ${mutedLine}`} />
        </div>
      </div>
      <div className="mx-auto flex h-36 w-36 items-center justify-center border border-[var(--border-strong)] bg-[var(--foreground)] text-[var(--background)]">
        <span className="font-mono text-xs uppercase tracking-[0.18em]">Core</span>
      </div>
      <div className="grid gap-5">
        <div className="border border-[var(--border-subtle)] p-4">
          <div className={`h-3 w-20 ${strongLine}`} />
          <div className={`mt-5 h-12 ${mutedLine}`} />
        </div>
        <div className="border border-[var(--border-subtle)] bg-[var(--surface-subtle)] p-4">
          <div className={`h-3 w-24 ${mutedLine}`} />
          <div className={`mt-5 h-12 ${strongLine}`} />
        </div>
      </div>
    </div>
  </div>
);

const VoiceAgentVisual = () => (
  <div className="grid h-full grid-cols-[0.76fr_1fr] gap-5 border border-[var(--border-subtle)] bg-[var(--background)] p-5">
    <div className="border border-[var(--border-strong)] bg-[var(--surface-subtle)] p-5">
      <div className="mx-auto h-8 w-20 border border-[var(--border-subtle)]" />
      <div className="mt-8 flex aspect-square items-center justify-center border border-[var(--border-strong)]">
        <div className="h-20 w-20 bg-[var(--foreground)]" />
      </div>
      <div className="mt-8 grid grid-cols-3 gap-3">
        {[0, 1, 2, 3, 4, 5].map((item) => (
          <div key={item} className={`aspect-square ${item % 2 ? mutedLine : strongLine}`} />
        ))}
      </div>
    </div>
    <div className="grid gap-4">
      <div className="border border-[var(--border-subtle)] p-4">
        <div className={`h-3 w-28 ${strongLine}`} />
        <div className="mt-5 space-y-3">
          <div className={`h-4 w-10/12 ${mutedLine}`} />
          <div className={`h-4 w-8/12 ${mutedLine}`} />
          <div className={`ml-auto h-4 w-7/12 ${strongLine}`} />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="border border-[var(--border-subtle)] p-4">
          <div className={`h-3 w-16 ${mutedLine}`} />
          <div className={`mt-5 h-12 ${strongLine}`} />
        </div>
        <div className="border border-[var(--border-subtle)] p-4">
          <div className={`h-3 w-20 ${mutedLine}`} />
          <div className={`mt-5 h-12 ${mutedLine}`} />
        </div>
        <div className="border border-[var(--border-subtle)] p-4">
          <div className={`h-3 w-14 ${mutedLine}`} />
          <div className={`mt-5 h-12 ${strongLine}`} />
        </div>
      </div>
    </div>
  </div>
);

const AutomationVisual = () => (
  <div className="h-full border border-[var(--border-subtle)] bg-[var(--background)] p-5">
    <div className="grid h-full grid-cols-4 gap-4">
      {["Capture", "Qualify", "Route", "Nurture"].map((label, index) => (
        <div key={label} className="relative border border-[var(--border-subtle)] bg-[var(--surface-subtle)] p-4">
          {index < 3 && (
            <div className="absolute right-[-17px] top-1/2 h-px w-8 bg-[rgba(255,255,255,0.2)]" />
          )}
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-[var(--muted-strong)]">
            {label}
          </p>
          <div className="mt-8 space-y-3">
            <div className={`h-10 ${index % 2 ? mutedLine : strongLine}`} />
            <div className={`h-10 ${mutedLine}`} />
            <div className={`h-10 ${index === 3 ? strongLine : mutedLine}`} />
          </div>
        </div>
      ))}
    </div>
  </div>
);

const MaintenanceVisual = () => (
  <div className="grid h-full grid-cols-[1fr_0.72fr] gap-5 border border-[var(--border-subtle)] bg-[var(--background)] p-5">
    <div className="grid grid-rows-[1fr_1fr] gap-4">
      {[0, 1].map((site) => (
        <div key={site} className="border border-[var(--border-subtle)] p-4">
          <div className="flex items-center justify-between">
            <div className={`h-3 w-24 ${strongLine}`} />
            <div className="h-3 w-3 bg-[var(--foreground)]" />
          </div>
          <div className="mt-6 grid grid-cols-4 gap-3">
            <div className={`h-14 ${mutedLine}`} />
            <div className={`h-14 ${strongLine}`} />
            <div className={`h-14 ${mutedLine}`} />
            <div className={`h-14 ${mutedLine}`} />
          </div>
        </div>
      ))}
    </div>
    <div className="border border-[var(--border-strong)] bg-[var(--surface-subtle)] p-4">
      <div className={`h-3 w-28 ${strongLine}`} />
      <div className="mt-6 space-y-4">
        {[0, 1, 2, 3, 4].map((item) => (
          <div key={item} className="grid grid-cols-[14px_1fr] gap-3">
            <div className="h-3 w-3 bg-[var(--foreground)]" />
            <div className={`h-3 ${mutedLine}`} />
          </div>
        ))}
      </div>
    </div>
  </div>
);

const visualByKind: Record<VisualKind, () => ReactNode> = {
  website: WebsiteVisual,
  commerce: CommerceVisual,
  marketplace: MarketplaceVisual,
  "ai-system": AiSystemVisual,
  "voice-agent": VoiceAgentVisual,
  automation: AutomationVisual,
  maintenance: MaintenanceVisual,
};

const ProjectVisual = ({
  kind,
  title,
  category,
  index = 1,
  compact = false,
}: ProjectVisualProps) => {
  const Visual = visualByKind[kind];

  return (
    <figure
      role="img"
      aria-label={`${title} project visual`}
      className={`overflow-hidden border border-[var(--border-subtle)] bg-[var(--surface-subtle)] ${
        compact ? "aspect-[1.35]" : "aspect-[1.65]"
      }`}
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b border-[var(--border-subtle)] px-4 py-3">
          <p className="truncate pr-4 font-mono text-[0.64rem] uppercase tracking-[0.16em] text-[var(--muted-strong)]">
            {category}
          </p>
          <p className="font-mono text-[0.64rem] uppercase tracking-[0.16em] text-[var(--muted-soft)]">
            {String(index).padStart(2, "0")}
          </p>
        </div>
        <div className="min-h-0 flex-1 p-4">
          <Visual />
        </div>
      </div>
    </figure>
  );
};

export default ProjectVisual;
