// Public category placeholders only. No datasets or private asset URLs belong here.
// Replace these with reviewed collection records when approved samples are ready.
export const datasetCategories = [
  {
    id: "text",
    label: "Text & documents",
    shortLabel: "Text",
    number: "01",
    description: "Scope document extraction, language understanding, or model evaluation around your domain and target schema.",
    previewDescription: "Text excerpts and structured annotations will appear here.",
    details: ["Language & domain", "Source & usage rights", "Record count & schema"],
    useCase: "Language models · Document AI",
  },
  {
    id: "image",
    label: "Images",
    shortLabel: "Images",
    number: "02",
    description: "Define the objects, scenes, lighting, and edge cases your vision model needs to recognize, with labels suited to the task.",
    previewDescription: "Image samples and annotation overlays will appear here.",
    details: ["Categories & resolution", "Annotation format", "Review criteria"],
    useCase: "Computer vision · Visual understanding",
  },
  {
    id: "voice",
    label: "Voice & audio",
    shortLabel: "Voice",
    number: "03",
    description: "Specify language, accent, recording conditions, and transcription needs for speech recognition or conversational AI.",
    previewDescription: "Playable audio and aligned transcripts will appear here.",
    details: ["Language & locale", "Recording conditions", "Duration & transcript format"],
    useCase: "Speech recognition · Conversational AI",
  },
  {
    id: "egocentric",
    label: "Egocentric video",
    shortLabel: "Egocentric",
    number: "04",
    description: "Explore a focused first-person capture pilot with explicit task boundaries, camera setup, and annotation requirements.",
    previewDescription: "Task recordings and action timelines will appear here.",
    details: ["Task & camera setup", "Available sensors", "Episode & label specifications"],
    useCase: "Robotics · Embodied AI pilots",
  },
] as const;

export type DatasetCategoryId = (typeof datasetCategories)[number]["id"];
