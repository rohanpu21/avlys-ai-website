export const dataUpdatedAt = "2026-10-02";
export const dataDescription = "Avlys Data offers off-the-shelf AI training data, custom collection and annotation for image, audio, video and text projects. Request sample availability and pricing.";
export const dataDefinition = "Avlys Data is the AI training-data service from Avlys AI. We help AI and robotics teams source, prepare and annotate image, audio, video and text data, with a scoped pilot before larger delivery.";
export const dataSourceNote = "Avlys OTS Data includes third-party and public research collections, with Avlys sourcing and preparation services. Sizes describe reference collections, not confirmed stock. Availability, final scope and applicable usage terms are confirmed before delivery.";

export const dataCategories = [
  {
    id: "image",
    label: "Image data",
    title: "Image training data for computer vision",
    description: "Explore Avlys image training data for captioning, classification, satellite imagery and visual reasoning. Request sample availability, annotation and pricing.",
    intro: "Avlys Data helps computer-vision teams select and prepare image collections for classification, image captioning, visual search and vision-language evaluation. Explore the image types below, then scope the labels, resolution and coverage your task needs.",
    needs: ["Image type, domain and target classes", "Resolution, quantity and capture variation", "Captions, class labels or other annotation", "Training and evaluation splits, including duplicate checks"],
    faqs: [
      { question: "What image data can I request from Avlys?", answer: "The catalogue describes captioned photographs, satellite image patches, apparel images, synthetic visual-reasoning scenes, historical characters and cultural or scientific imagery. Their formats and coverage serve different tasks. Availability and the final selection are confirmed for your brief before delivery." },
      { question: "Can Avlys prepare custom image annotations?", answer: "Image annotation is scoped around the labels, schema and review process your model needs. A pilot establishes examples, exclusions and acceptance criteria. Custom capture or additional labels are agreed separately from the reference collection described in the catalogue." },
    ],
  },
  {
    id: "audio",
    label: "Audio data",
    title: "Audio training data for speech AI",
    description: "Explore Avlys audio training data for multilingual speech, Indian languages, audiobooks and voice commands. Discuss transcripts, coverage and sample availability.",
    intro: "Avlys Data helps speech-AI teams scope audio, transcription and review for speech recognition, keyword spotting and model evaluation. The catalogue includes multilingual read speech, Indian-language speech and voice commands. These are not interchangeable with support-call recordings.",
    needs: ["Language, locale, accents and speaking style", "Audio hours, speaker coverage and recording conditions", "Sample rate, file format and transcript requirements", "Speaker-separated evaluation sets and transcript review criteria"],
    faqs: [
      { question: "Can Avlys help source Hindi and Indian-language speech data?", answer: "The catalogue includes Indian-language and multilingual speech options. Specify the language, locale, accent, speaking style and transcript needs so availability can be checked for that scope. A collection's language count alone does not establish that it fits your task." },
      { question: "Is read speech the same as conversational or call-centre data?", answer: "No. Read speech, spontaneous conversation and support calls differ in vocabulary, turn-taking, noise and recording conditions. For conversational data, specify the environment, speaker turns, timestamps and redaction requirements. Custom conversation collection and access requirements need a separate scope review." },
    ],
  },
  {
    id: "video",
    label: "Video data",
    title: "Video training data for robotics and AI",
    description: "Explore Avlys video data for robot manipulation and synthetic multi-view tasks. Discuss cameras, actions, annotations or an egocentric capture pilot.",
    intro: "Avlys Data helps teams specify video and observation sequences for robot manipulation, action understanding and multi-view evaluation. The catalogue describes robot demonstrations and synthetic scenes. Human egocentric capture is a separate pilot, scoped around your environment and recording requirements.",
    needs: ["Task, environment, episode boundaries and volume", "Camera views, frame rate and calibration", "Robot platform, action format and sensor requirements", "Annotations, scene-separated evaluation and pipeline compatibility"],
    faqs: [
      { question: "What video data options does Avlys describe?", answer: "The catalogue describes multi-camera robot demonstrations, tabletop manipulation trajectories and synthetic multi-view scenes. Check camera format, task descriptions, action representation and hardware compatibility against your pipeline. A video collection and a robot-action dataset may require different preparation." },
      { question: "Does Avlys offer egocentric video data for robotics?", answer: "You can discuss a first-person capture pilot with Avlys. Environment, camera placement, contributor permissions, sensors, annotations and delivery scope are agreed before collection. Robot trajectories and synthetic scenes are not human head-camera recordings, and this page does not claim a ready-to-deliver egocentric inventory." },
    ],
  },
] as const;
