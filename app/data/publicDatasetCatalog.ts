// Editorial metadata only. No dataset files, sample records, or private client data.
// Source audit: docs/research/public-data-catalogue-2026-10-02.md
export const catalogueReviewedAt = "2026-10-02";

export type DataModality = "image" | "audio" | "video";
export type LicenseId = "cc-by" | "mit" | "cc-by-sa" | "cc0" | "us-pd";

export const licenceGuides: Record<LicenseId, { label: string; url: string; training: string; redistribution: string }> = {
  "cc-by": {
    label: "CC BY 4.0",
    url: "https://creativecommons.org/licenses/by/4.0/",
    training: "Commercial reuse, including training, is allowed within the licensed rights. Retain attribution and review rights outside copyright for the intended use.",
    redistribution: "Commercial sharing and adaptation are allowed with attribution, a licence link and change notices. Recipients retain the original licence rights; do not add restrictions to them.",
  },
  mit: {
    label: "MIT",
    url: "https://opensource.org/license/mit",
    training: "The dataset publisher applies MIT terms, which permit commercial reuse. Keep the copyright and permission notice and check any upstream content conditions.",
    redistribution: "Copies may be distributed commercially with the required copyright and permission notice. This does not make the original data exclusive to Avlys.",
  },
  "cc-by-sa": {
    label: "CC BY-SA 4.0",
    url: "https://creativecommons.org/licenses/by-sa/4.0/",
    training: "Commercial reuse is permitted within the licensed rights. Review how attribution and ShareAlike apply to the particular training and output workflow.",
    redistribution: "Commercial sharing is allowed. Shared adaptations must use the same or a compatible licence, with attribution and change notices. Do not promise a proprietary exclusive dataset.",
  },
  cc0: {
    label: "CC0 · selected assets",
    url: "https://creativecommons.org/publicdomain/zero/1.0/",
    training: "CC0-designated content can be reused commercially within the rights waived. Confirm the designation on each selected item and review privacy, publicity and other rights separately.",
    redistribution: "Commercial redistribution of eligible CC0 material is allowed. Keep a provenance record; do not imply endorsement or that every item in the collection is CC0.",
  },
  "us-pd": {
    label: "US public domain",
    url: "https://keithito.com/LJ-Speech-Dataset/",
    training: "The publisher describes the recordings, text and annotations as public domain in the United States. Commercial use elsewhere needs a territorial rights check.",
    redistribution: "US public-domain status can support commercial redistribution in the US. Do not assume worldwide clearance or permission to imitate or endorse a speaker.",
  },
};

export type PublicDataset = {
  id: string;
  name: string;
  publisher: string;
  modality: DataModality;
  kind: string;
  description: string;
  scale: string;
  coverage: string;
  formats: string;
  annotations: string;
  useCases: string[];
  searchTerms?: string[];
  limitations: string;
  licence: LicenseId;
  sourceUrl: string;
  licenceEvidenceUrl: string;
  access: string;
  reviewNote?: string;
};

export const datasetCategories: { id: DataModality; title: string; subtitle: string; description: string }[] = [
  { id: "image", title: "Images", subtitle: "Vision, captions & recognition", description: "Photographs, satellite patches, handwriting and rendered scenes. Match the image type and labels to the task—not just the file count." },
  { id: "audio", title: "Audio", subtitle: "Speech, languages & commands", description: "Multilingual reading, spontaneous speech, audiobooks and short commands. These are not interchangeable with live customer-service or human–bot conversations." },
  { id: "video", title: "Video", subtitle: "Motion, views & robot actions", description: "Robot observation sequences and synthetic multi-view video. These sources are distinct from human first-person footage; a custom egocentric pilot needs its own scope." },
];

export const publicDatasets: PublicDataset[] = [
  {
    id: "docci", name: "DOCCI", publisher: "Google", modality: "image", kind: "Photography + detailed captions",
    description: "Real photographs paired with detailed descriptions for testing how precisely vision-language systems understand a scene.",
    scale: "15,000 captioned images", coverage: "Objects, spatial relationships and scene details",
    formats: "JPEG images; JSONL descriptions and metadata", annotations: "Detailed image descriptions and published split identifiers.",
    useCases: ["Image captioning", "Vision-language evaluation"],
    limitations: "Not a dense infographic collection. Keep evaluation splits separate from training; the additional unannotated image release is a separate subset.",
    licence: "cc-by", sourceUrl: "https://google.github.io/docci/", licenceEvidenceUrl: "https://google.github.io/docci/",
    access: "Public source; no purchase price listed.",
  },
  {
    id: "eurosat", name: "EuroSAT", publisher: "Helber et al. / EuroSAT", modality: "image", kind: "Satellite imagery",
    description: "Labelled Sentinel-2 patches for land-use and land-cover classification, with RGB and multispectral versions.",
    scale: "27,000 images · 10 classes", coverage: "13 spectral bands in the multispectral release",
    formats: "RGB image and multispectral archives via the publisher", annotations: "Land-cover class labels and georeferenced imagery.",
    useCases: ["Land-cover classification", "Remote sensing"],
    limitations: "Not street-level imagery or a current global map. Preserve Copernicus provenance and check the Sentinel conditions linked by the publisher.",
    licence: "mit", sourceUrl: "https://github.com/phelber/EuroSAT", licenceEvidenceUrl: "https://github.com/phelber/EuroSAT#license",
    access: "Public source; no purchase price listed.", reviewNote: "MIT dataset terms plus upstream Copernicus Sentinel conditions.",
  },
  {
    id: "fashion-mnist", name: "Fashion-MNIST", publisher: "Zalando Research", modality: "image", kind: "Apparel classification",
    description: "Small grayscale clothing images with category labels for lightweight vision baselines and model comparisons.",
    scale: "70,000 images · 10 classes", coverage: "28 × 28 pixels · 60,000 train / 10,000 test",
    formats: "Compressed IDX image and label files", annotations: "One apparel class per image.",
    useCases: ["Image classification", "Baseline benchmarking"],
    limitations: "Low-resolution benchmark—not full-resolution product photography, a retail catalogue or a detection dataset.",
    licence: "mit", sourceUrl: "https://github.com/zalandoresearch/fashion-mnist", licenceEvidenceUrl: "https://github.com/zalandoresearch/fashion-mnist/blob/master/LICENSE",
    access: "Public source; no purchase price listed.",
  },
  {
    id: "clevr", name: "CLEVR", publisher: "Stanford / CLEVR authors", modality: "image", kind: "Synthetic visual reasoning",
    description: "Rendered arrangements of geometric objects with questions, answers and structured scene information.",
    scale: "Synthetic scene benchmark", coverage: "Shape, colour, material, count and spatial relations",
    formats: "Rendered images; JSON questions and scene information", annotations: "Question–answer pairs; scene graphs where supplied in the release.",
    useCases: ["Visual question answering", "Compositional reasoning"],
    limitations: "Synthetic, not human-created visual material. Does not represent natural photographs, specialist diagrams or real-world image diversity.",
    licence: "cc-by", sourceUrl: "https://cs.stanford.edu/people/jcjohns/clevr/", licenceEvidenceUrl: "https://cs.stanford.edu/people/jcjohns/clevr/",
    access: "Public source; no purchase price listed.",
  },
  {
    id: "kmnist", name: "Kuzushiji-MNIST", publisher: "ROIS-DS Center for Open Data in the Humanities", modality: "image", kind: "Historical character recognition",
    description: "Cropped historical Japanese characters for recognition experiments, based on digitised books.",
    scale: "70,000 images · 10 classes", coverage: "28 × 28 grayscale Kuzushiji characters",
    formats: "MNIST-format and NumPy archives", annotations: "Character class labels and a class mapping.",
    useCases: ["Character recognition", "Historical OCR baselines"],
    limitations: "Isolated characters, not full-page OCR. Kuzushiji-49 and Kuzushiji-Kanji are separate releases; do not combine their counts.",
    licence: "cc-by-sa", sourceUrl: "https://github.com/rois-codh/kmnist", licenceEvidenceUrl: "https://github.com/rois-codh/kmnist#license",
    access: "Public source; no purchase price listed.", reviewNote: "ShareAlike applies to shared adaptations; review the delivery licence.",
  },
  {
    id: "smithsonian-cc0", name: "Smithsonian Open Access", publisher: "Smithsonian Institution", modality: "image", kind: "Source collection · CC0 selections",
    description: "A source for eligible museum and scientific imagery. Build an item-level selection using the CC0 designation, not the institution name alone.",
    scale: "Collection, not a fixed training set", coverage: "Art, cultural objects and natural-history material",
    formats: "Item-specific media and collection metadata", annotations: "Museum descriptions; task-specific labels would need to be scoped.",
    useCases: ["Collection search", "Visual heritage research"],
    limitations: "Only selected CC0 assets qualify. Resolution, metadata, authorship and third-party rights vary; not every Smithsonian image is open access.",
    licence: "cc0", sourceUrl: "https://www.si.edu/openaccess", licenceEvidenceUrl: "https://www.si.edu/openaccess/faq",
    access: "Eligible CC0 items are available without a licence purchase.", reviewNote: "Item-level designation and other-rights review required before selection.",
  },
  {
    id: "fleurs", name: "FLEURS", publisher: "Google", modality: "audio", kind: "Multilingual read speech",
    description: "Recorded readings of parallel prompts for multilingual speech recognition and cross-language evaluation.",
    scale: "102 languages", coverage: "Read speech · 16 kHz audio",
    formats: "Audio with text and language metadata", annotations: "Reference transcriptions and published train / validation / test splits.",
    useCases: ["Multilingual ASR", "Speech evaluation"],
    searchTerms: ["Asturian", "Bosnian", "Catalan", "Croatian", "Danish", "Dutch", "English", "Finnish", "French", "Galician", "German", "Greek", "Hungarian", "Icelandic", "Irish", "Italian", "Kabuverdianu", "Luxembourgish", "Maltese", "Norwegian", "Occitan", "Portuguese", "Spanish", "Swedish", "Welsh", "Armenian", "Belarusian", "Bulgarian", "Czech", "Estonian", "Georgian", "Latvian", "Lithuanian", "Macedonian", "Polish", "Romanian", "Russian", "Serbian", "Slovak", "Slovenian", "Ukrainian", "Arabic", "Azerbaijani", "Hebrew", "Kazakh", "Kyrgyz", "Mongolian", "Pashto", "Persian", "Sorani-Kurdish", "Tajik", "Turkish", "Uzbek", "Afrikaans", "Amharic", "Fula", "Ganda", "Hausa", "Igbo", "Kamba", "Lingala", "Luo", "Northern-Sotho", "Nyanja", "Oromo", "Shona", "Somali", "Swahili", "Umbundu", "Wolof", "Xhosa", "Yoruba", "Zulu", "Assamese", "Bengali", "Gujarati", "Hindi", "Kannada", "Malayalam", "Marathi", "Nepali", "Oriya", "Odia", "Punjabi", "Sindhi", "Tamil", "Telugu", "Urdu", "Burmese", "Cebuano", "Filipino", "Indonesian", "Javanese", "Khmer", "Lao", "Malay", "Maori", "Thai", "Vietnamese", "Cantonese", "Mandarin", "Chinese", "Japanese", "Korean"],
    limitations: "Read prompts, not natural conversations or call-centre audio. Check locale coverage, speaker splits and transcript quality for the target task.",
    licence: "cc-by", sourceUrl: "https://huggingface.co/datasets/google/fleurs", licenceEvidenceUrl: "https://huggingface.co/datasets/google/fleurs",
    access: "Public source; no purchase price listed.",
  },
  {
    id: "indicvoices", name: "IndicVoices", publisher: "AI4Bharat", modality: "audio", kind: "Indian-language speech",
    description: "Read, extempore and conversational recordings spanning Indian languages, with transcription coverage that varies by release.",
    scale: "22 languages", coverage: "Multiple districts and speaking styles",
    formats: "Release-specific audio, transcripts and metadata", annotations: "Transcribed and untranscribed subsets; inspect the chosen version.",
    useCases: ["Indian-language ASR", "Speech coverage evaluation"],
    searchTerms: ["Hindi", "Bengali", "Tamil", "Telugu", "Marathi", "Gujarati", "Kannada", "Malayalam", "Urdu", "Odia", "Punjabi", "Assamese"],
    limitations: "Human speech is not evidence of human–bot escalation calls. No blanket claim of PII clearance, production suitability or access approval.",
    licence: "cc-by", sourceUrl: "https://huggingface.co/datasets/ai4bharat/IndicVoices", licenceEvidenceUrl: "https://huggingface.co/datasets/ai4bharat/IndicVoices#license",
    access: "Gated: sign-in and acceptance of provider conditions. No purchase price listed.", reviewNote: "Public card states CC BY 4.0; access conditions still need review before use or supply.",
  },
  {
    id: "librispeech", name: "LibriSpeech ASR", publisher: "OpenSLR / LibriSpeech authors", modality: "audio", kind: "English audiobook speech",
    description: "Segmented English audiobook recordings with aligned text, designed for speech-recognition training and evaluation.",
    scale: "Approximately 1,000 hours", coverage: "English · 16 kHz read speech",
    formats: "FLAC audio; text transcripts", annotations: "Aligned transcripts and clean / other subsets with established splits.",
    useCases: ["English ASR", "Transcription benchmarking"],
    limitations: "Narrated books, not spontaneous support calls. Shares underlying material with LibriTTS; do not count them as wholly independent inventory.",
    licence: "cc-by", sourceUrl: "https://www.openslr.org/12/", licenceEvidenceUrl: "https://www.openslr.org/12/",
    access: "Public source; no purchase price listed.",
  },
  {
    id: "libritts", name: "LibriTTS", publisher: "Google / OpenSLR", modality: "audio", kind: "Multi-speaker read speech",
    description: "Sentence-level English recordings with original and normalised text for speech-synthesis research and evaluation.",
    scale: "Approximately 585 hours", coverage: "English · 24 kHz multi-speaker speech",
    formats: "WAV audio; original and normalised text", annotations: "Sentence-aligned text, speaker information and published splits.",
    useCases: ["Speech synthesis research", "Text–audio alignment"],
    limitations: "Derived from LibriVox material also used in LibriSpeech. A data licence is not blanket consent for voice impersonation or endorsement.",
    licence: "cc-by", sourceUrl: "https://www.openslr.org/60/", licenceEvidenceUrl: "https://www.openslr.org/60/",
    access: "Public source; no purchase price listed.",
  },
  {
    id: "speech-commands", name: "Speech Commands v0.02", publisher: "Google", modality: "audio", kind: "Short spoken commands",
    description: "Short English words and background noise for keyword-spotting and compact voice-interface experiments.",
    scale: "105,829 audio files", coverage: "35 words · 16 kHz · mostly one-second clips",
    formats: "WAV audio; labels and split lists", annotations: "Word labels and speaker identifiers; noise recordings have different lengths.",
    useCases: ["Keyword spotting", "On-device voice recognition"],
    limitations: "Not a dictation or dialogue corpus. Wrapper-specific subsets can differ from the full v0.02 release.",
    licence: "cc-by", sourceUrl: "https://huggingface.co/datasets/google/speech_commands", licenceEvidenceUrl: "https://huggingface.co/datasets/google/speech_commands/blob/main/README.md",
    access: "Public source; no purchase price listed.",
  },
  {
    id: "lj-speech", name: "LJ Speech 1.1", publisher: "Keith Ito / Linda Johnson recordings", modality: "audio", kind: "Single-speaker read speech",
    description: "Short passages from English books paired with text, recorded by one speaker.",
    scale: "13,100 clips · about 24 hours", coverage: "English · 22.05 kHz · single speaker",
    formats: "16-bit mono WAV; pipe-delimited metadata", annotations: "Original and normalised text for each clip.",
    useCases: ["Speech synthesis baselines", "Audio–text alignment"],
    limitations: "Limited speaker diversity. Check rights outside the United States and the intended voice use before a commercial delivery.",
    licence: "us-pd", sourceUrl: "https://keithito.com/LJ-Speech-Dataset/", licenceEvidenceUrl: "https://keithito.com/LJ-Speech-Dataset/",
    access: "Public source; no purchase price listed.", reviewNote: "Publisher's public-domain statement is US-specific, not worldwide clearance.",
  },
  {
    id: "droid", name: "DROID", publisher: "DROID research collaboration", modality: "video", kind: "Real robot demonstrations",
    description: "Multi-camera robot observations paired with actions and task context for manipulation-policy learning.",
    scale: "76,000 trajectories · about 350 hours", coverage: "564 scenes · Franka robot platform",
    formats: "Video and robot-state data; release-specific training formats", annotations: "Camera calibration, language instructions and robot observations / actions.",
    useCases: ["Robot imitation learning", "Visual manipulation"],
    limitations: "Robot views, not human head-mounted video. Check the selected release, privacy processing and hardware compatibility before use.",
    licence: "cc-by", sourceUrl: "https://droid-dataset.github.io/", licenceEvidenceUrl: "https://arxiv.org/html/2403.12945v1#S1",
    access: "Public release; large storage and transfer requirements may apply.",
  },
  {
    id: "bridgedata-v2", name: "BridgeData V2", publisher: "UC Berkeley / BridgeData authors", modality: "video", kind: "Robot image sequences + actions",
    description: "Robot manipulation episodes with image observations and action data across varied tabletop environments.",
    scale: "60,096 trajectories", coverage: "24 environments · WidowX robot platform",
    formats: "Image sequences, robot states and release-specific episode archives", annotations: "Task language and robot trajectories, including teleoperated and scripted collections.",
    useCases: ["Language-conditioned control", "Robot policy learning"],
    limitations: "Not ordinary MP4 stock footage or human egocentric capture. Data is CC BY 4.0; the separate code repository licence is not the data licence.",
    licence: "cc-by", sourceUrl: "https://rail-berkeley.github.io/bridgedata/", licenceEvidenceUrl: "https://rail-berkeley.github.io/bridgedata/",
    access: "Public source; storage and preparation costs are separate.",
  },
  {
    id: "kubric-5d", name: "Kubric-5D", publisher: "Toyota Research Institute / AnyView authors", modality: "video", kind: "Synthetic multi-view video",
    description: "Physically simulated scenes filmed by virtual moving cameras, with aligned camera metadata.",
    scale: "10,000 synthetic scenes", coverage: "Up to 16 views per scene · 24 fps · 576 × 384",
    formats: "MP4 videos; JSON metadata; NPZ camera arrays", annotations: "Per-frame camera intrinsics, extrinsics and timestamps.",
    useCases: ["Novel-view synthesis", "Dynamic scene understanding"],
    limitations: "Rendered, not human-captured footage. One published scene has fewer views. The data licence does not authorise commercial use of the separate generation code.",
    licence: "cc-by", sourceUrl: "https://github.com/TRI-ML/Kubric-5D", licenceEvidenceUrl: "https://github.com/TRI-ML/Kubric-5D#licensing",
    access: "Published dataset archives; no purchase price listed.", reviewNote: "Archives: CC BY 4.0. Project-authored generation code: CC BY-NC 4.0.",
  },
];

export function filterPublicDatasets(modality: DataModality, query: string, review: "all" | "standard" | "additional") {
  const terms = query.toLocaleLowerCase().trim().split(/\s+/).filter(Boolean);
  return publicDatasets.filter((dataset) => {
    if (dataset.modality !== modality) return false;
    if (review === "standard" && dataset.reviewNote) return false;
    if (review === "additional" && !dataset.reviewNote) return false;
    const searchable = [dataset.name, dataset.publisher, dataset.kind, dataset.description, dataset.scale, dataset.coverage, dataset.formats, ...dataset.useCases, ...(dataset.searchTerms ?? []), licenceGuides[dataset.licence].label].join(" ").toLocaleLowerCase();
    return terms.every((term) => searchable.includes(term));
  });
}
