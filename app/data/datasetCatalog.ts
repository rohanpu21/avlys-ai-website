// Public category placeholders only. No datasets or private asset URLs belong here.
// Replace these with reviewed collection records when approved samples are ready.
export const datasetCategories = [
  {
    id: "text",
    label: "Text & documents",
    shortLabel: "Text",
    number: "01",
    description: "Language, meaning, and structure. A place for text collections, document pairs, and their annotations.",
    previewDescription: "Text excerpts and structured annotations will appear here.",
    details: ["Language & domain", "Source & usage rights", "Record count & schema"],
    useCase: "Language models · Document AI",
  },
  {
    id: "image",
    label: "Images",
    shortLabel: "Images",
    number: "02",
    description: "Visual context, clearly labeled. A place to inspect images alongside their annotation layers.",
    previewDescription: "Image samples and annotation overlays will appear here.",
    details: ["Categories & resolution", "Annotation format", "Review criteria"],
    useCase: "Computer vision · Visual understanding",
  },
  {
    id: "voice",
    label: "Voice & audio",
    shortLabel: "Voice",
    number: "03",
    description: "Speech with context. A place for recordings, transcripts, speaker labels, and capture details.",
    previewDescription: "Playable audio and aligned transcripts will appear here.",
    details: ["Language & locale", "Recording conditions", "Duration & transcript format"],
    useCase: "Speech recognition · Conversational AI",
  },
  {
    id: "egocentric",
    label: "Egocentric video",
    shortLabel: "Egocentric",
    number: "04",
    description: "Real tasks, from a first-person perspective. A smaller pilot collection for embodied-AI exploration.",
    previewDescription: "Task recordings and action timelines will appear here.",
    details: ["Task & camera setup", "Available sensors", "Episode & label specifications"],
    useCase: "Robotics · Embodied AI pilots",
  },
] as const;

export type DatasetCategoryId = (typeof datasetCategories)[number]["id"];
