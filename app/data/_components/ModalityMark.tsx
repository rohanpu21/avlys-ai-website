import type { DatasetCategoryId } from "../datasetCatalog";

// Format symbols, deliberately not simulated samples or measured waveforms.
export default function ModalityMark({ type }: { type: DatasetCategoryId }) {
  return (
    <svg viewBox="0 0 160 100" fill="none" aria-hidden="true">
      {type === "text" && <>
        <rect x="39" y="10" width="82" height="80" rx="5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M54 30h33M54 41h52M54 52h43M54 63h52M54 74h24" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </>}
      {type === "image" && <>
        <rect x="24" y="14" width="112" height="72" rx="5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="103" cy="35" r="8" stroke="currentColor" strokeWidth="1.5" />
        <path d="m35 74 27-31 22 24 13-13 29 26" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M49 35v-8h8m19 0h8v8m0 27v8h-8m-19 0h-8v-8" stroke="currentColor" strokeWidth="1.5" />
      </>}
      {type === "voice" && <>
        <rect x="66" y="12" width="28" height="48" rx="14" stroke="currentColor" strokeWidth="2" />
        <path d="M54 46v3a26 26 0 0 0 52 0v-3M80 75v13m-14 0h28M33 39v22m94-22v22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </>}
      {type === "egocentric" && <>
        <path d="M29 33V17h23m56 0h23v16m0 34v16h-23m-56 0H29V67" stroke="currentColor" strokeWidth="2" />
        <circle cx="80" cy="50" r="22" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="80" cy="50" r="7" stroke="currentColor" strokeWidth="1.5" />
        <path d="M47 50h14m38 0h14M80 17v14m0 38v14" stroke="currentColor" strokeWidth="1.5" />
      </>}
    </svg>
  );
}
