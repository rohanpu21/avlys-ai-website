import type { DataModality, PublicDataset } from "./publicDatasetCatalog";

export type OtsDataset = Pick<PublicDataset,
  "id" | "modality" | "name" | "kind" | "description" | "scale" | "coverage" |
  "formats" | "annotations" | "useCases" | "searchTerms" | "limitations"
>;

export const otsCategories: { id: DataModality; title: string; subtitle: string; description: string }[] = [
  { id: "image", title: "Images", subtitle: "Vision, captions & recognition", description: "Explore photographs, satellite imagery, historical characters and rendered scenes for computer vision and multimodal AI." },
  { id: "audio", title: "Audio", subtitle: "Speech, languages & commands", description: "Explore multilingual speech, Indian languages, audiobook recordings and voice commands for recognition and evaluation." },
  { id: "video", title: "Video", subtitle: "Motion, views & robot actions", description: "Explore robot demonstrations, action sequences and synthetic multi-view scenes. Human egocentric capture is scoped as a separate pilot." },
];

export function filterOtsDatasets(
  records: OtsDataset[],
  modality: DataModality,
  query: string,
  filters: { useCase?: string; collectionType?: string } = {},
) {
  const terms = query.toLocaleLowerCase().trim().split(/\s+/).filter(Boolean);
  return records.filter((record) => {
    if (record.modality !== modality) return false;
    if (filters.useCase && !record.useCases.includes(filters.useCase)) return false;
    if (filters.collectionType && record.kind !== filters.collectionType) return false;
    const searchable = [record.name, record.kind, record.description, record.scale, record.coverage, record.formats, record.annotations, ...record.useCases, ...(record.searchTerms ?? [])].join(" ").toLocaleLowerCase();
    return terms.every((term) => searchable.includes(term));
  });
}
