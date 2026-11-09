import type { DataModality, PublicDataset } from "./publicDatasetCatalog";

// Customer-facing descriptions. Original source and rights records are retained
// in publicDatasetCatalog.ts for feasibility review and delivery documentation.
export type OtsDataset = Pick<PublicDataset,
  "id" | "modality" | "name" | "kind" | "description" | "scale" | "coverage" |
  "formats" | "annotations" | "useCases" | "searchTerms" | "limitations"
>;

const presentation: Record<string, { name: string; limitations: string; kind?: string; description?: string; formats?: string }> = {
  docci: { name: "Detailed image captions", limitations: "Natural photographs rather than infographics. Keep training and evaluation splits separate." },
  eurosat: { name: "Satellite land-cover images", limitations: "Satellite patches, not street-level images or a current global map.", formats: "RGB image and multispectral archives" },
  "fashion-mnist": { name: "Apparel classification images", limitations: "A low-resolution benchmark, not full-resolution product photography or object-detection data." },
  clevr: { name: "Synthetic visual reasoning", limitations: "Rendered scenes, not natural photographs or specialist diagrams." },
  kmnist: { name: "Historical Japanese characters", limitations: "Isolated characters, not full-page documents. The stated scope covers this reference collection only." },
  "smithsonian-cc0": {
    name: "Cultural & scientific imagery", kind: "Museum & natural-history imagery",
    description: "Art, cultural objects and natural-history imagery with collection metadata for visual search and research.",
    limitations: "An item-level selection, not a fixed training set. Image resolution, metadata and task-specific annotation needs vary.",
  },
  fleurs: { name: "Multilingual read speech", limitations: "Read prompts, not spontaneous conversations or call-centre recordings. Confirm locale coverage and speaker splits for the task." },
  indicvoices: { name: "Indian-language speech", limitations: "Transcription coverage varies by release. These are human recordings, not human–bot support or escalation calls." },
  librispeech: { name: "English audiobook speech", limitations: "Narrated books, not spontaneous support calls. Some underlying recordings overlap with the multi-speaker read-speech option." },
  libritts: { name: "Multi-speaker read speech", limitations: "Read English sentences, not conversational dialogue. Some recordings overlap with the English audiobook-speech option." },
  "speech-commands": { name: "Short spoken commands", limitations: "Short words and background noise, not dictation or dialogue. The final selection depends on the task." },
  "lj-speech": { name: "Single-speaker English speech", limitations: "One speaker only; not suitable for evaluating broad speaker diversity." },
  droid: { name: "Robot manipulation demonstrations", limitations: "Robot-camera views, not human head-mounted video. Confirm camera, action and hardware compatibility with your pipeline." },
  "bridgedata-v2": { name: "Tabletop robot trajectories", limitations: "Robot image sequences and actions, not ordinary stock footage or human egocentric recordings." },
  "kubric-5d": { name: "Synthetic multi-view video", limitations: "Rendered scenes, not human-captured footage. Camera-view counts can vary by scene." },
};

// Use an explicit field list: do not pass publisher, access-cost, source URL or
// licence-research fields into the client catalogue when preparing server props.
export function toOtsCatalogue(records: PublicDataset[]): OtsDataset[] {
  return records.map((record) => {
    const display = presentation[record.id];
    if (!display) throw new Error(`Missing OTS presentation for ${record.id}`);
    return {
      id: record.id,
      modality: record.modality,
      name: display.name,
      kind: display.kind ?? record.kind,
      description: display.description ?? record.description,
      scale: record.scale,
      coverage: record.coverage,
      formats: display.formats ?? record.formats,
      annotations: record.annotations,
      useCases: record.useCases,
      searchTerms: record.searchTerms,
      limitations: display.limitations,
    };
  });
}

export const otsCategories: { id: DataModality; title: string; subtitle: string; description: string }[] = [
  { id: "image", title: "Images", subtitle: "Vision, captions & recognition", description: "Explore photographs, satellite imagery, historical characters and rendered scenes for computer vision and multimodal AI." },
  { id: "audio", title: "Audio", subtitle: "Speech, languages & commands", description: "Explore multilingual speech, Indian languages, audiobook recordings and voice commands for recognition and evaluation." },
  { id: "video", title: "Video", subtitle: "Motion, views & robot actions", description: "Explore robot demonstrations, action sequences and synthetic multi-view scenes. Human egocentric capture is scoped as a separate pilot." },
];

export function filterOtsDatasets(records: OtsDataset[], modality: DataModality, query: string) {
  const terms = query.toLocaleLowerCase().trim().split(/\s+/).filter(Boolean);
  return records.filter((record) => {
    if (record.modality !== modality) return false;
    const searchable = [record.name, record.kind, record.description, record.scale, record.coverage, record.formats, ...record.useCases, ...(record.searchTerms ?? [])].join(" ").toLocaleLowerCase();
    return terms.every((term) => searchable.includes(term));
  });
}
