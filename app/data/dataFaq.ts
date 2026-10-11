import { dataDefinition } from "./dataPageContent";

// Buyer concerns and editorial decisions are traced in
// docs/avlys-data-page-research-2026-09-18.md. Terms remain project-specific.
// Public-source additions: docs/research/public-data-catalogue-2026-10-02.md.
export const dataFaqGroups = [
  {
    id: "getting-started",
    title: "Choosing the right data",
    items: [
      {
        question: "What is Avlys Data?",
        answer: dataDefinition,
      },
      {
        question: "What does off-the-shelf (OTS) training data mean?",
        answer: "OTS means an existing collection considered for your task, rather than a new collection built entirely to your brief. Avlys OTS Data describes image, audio and video options and the preparation they may need. Confirm coverage, formats, availability and applicable usage terms before agreeing on supply. Custom text and document work is scoped separately.",
      },
      {
        question: "Does Avlys offer text and document training data?",
        answer: "Yes. Avlys scopes custom text and document training data to your model task. Work may include collection or preparation, cleaning, deduplication, normalization, PII handling, chunking and metadata for retrieval-augmented generation (RAG), or instruction/response formatting for fine-tuning. Agree on the output schema, quality checks and permitted use before work begins. Text and document work is custom-scoped, separate from the current off-the-shelf image, audio and video catalogue.",
      },
      {
        question: "Who collects and annotates Avlys Data projects?",
        answer: "Avlys’s accountable core data team handles collection, cleaning, annotation, and review. Annotation work starts with a small paid calibration batch against agreed guidelines, so edge cases can be resolved before a larger run. If a project needs specialist expertise the team does not have, Avlys says so before confirming scope.",
      },
      {
        question: "Should I use an existing dataset or commission a custom collection?",
        answer: "An existing collection is useful when its task, language, environment, labels, and usage rights match your needs. Custom collection is worth considering when those details do not fit. If you already have authorized source data, annotation and review may be the better starting point. Share the requirement so we can assess the options and availability.",
      },
      {
        question: "Can I review or download a sample before committing?",
        answer: "The Avlys OTS Data catalogue shows descriptions, not downloadable files. Tell us which collection fits your task. We will confirm availability, the requested selection and evaluation arrangements before agreeing on a first batch.",
      },
      {
        question: "How much training data do I need?",
        answer: "There is no single record count that works for every model. It depends on the task, starting model, variation in real use, and performance you need to measure. Begin with representative examples and a separate evaluation set, identify the failure cases, and use the pilot results to decide whether more data or better coverage is needed.",
      },
      {
        question: "Can you support specific languages, accents, or rare scenarios?",
        answer: "The current audio options include multilingual read speech and Indian-language speech, including Hindi, Bengali, Tamil, Telugu, Marathi, and others. Specify the language and locale, accent, speaking style, recording conditions, and edge cases so coverage, transcript detail, feasibility, and availability can be confirmed for your brief.",
      },
    ],
  },
  {
    id: "quality-evaluation",
    title: "Quality & evaluation",
    items: [
      {
        question: "How should we evaluate annotation quality?",
        answer: "Agree on labeling instructions, examples, error categories, and an acceptance threshold for the task. A pilot can then be reviewed against an agreed reference set. Depending on the task, checks may include reviewer agreement, transcript error rates, label precision and recall, or format validation. Agreement alone is not proof of correctness, and a single accuracy percentage does not describe every dataset.",
      },
      {
        question: "What happens if labels or files do not meet the specification?",
        answer: "Define how defects are reported, which items are re-reviewed, and what correction or replacement is included before production begins. The pilot is the place to resolve ambiguous instructions and test acceptance. Rework scope, review windows, and commercial terms should be written into the project agreement rather than assumed after delivery.",
      },
      {
        question: "How do you address bias, duplicates, and evaluation leakage?",
        answer: "Start with the situations the model will encounter and specify coverage across relevant languages, environments, and categories. Agree on duplicate checks and separate training and evaluation data by the appropriate unit, such as speaker, source document, or capture session. Review gaps and known limitations with the pilot. No dataset can be promised to be universally bias-free.",
      },
      {
        question: "Does Avlys offer synthetic AI training data?",
        answer: "Not as a confirmed Avlys-generated stock offering. The current OTS catalogue describes rendered visual-reasoning images and synthetic multi-view video as reference options; it does not represent Avlys-generated files or confirmed inventory. For custom synthetic data, share the modality, scenario coverage, output schema and intended use so feasibility, permitted use and scope can be confirmed. Evaluate generated examples against real-world data before use.",
      },
    ],
  },
  {
    id: "rights-handling",
    title: "Rights & data handling",
    items: [
      {
        question: "What usage rights come with a dataset?",
        answer: "Your quote and delivery agreement confirm the intended use, applicable usage terms and restrictions before data is supplied. The Avlys OTS label describes a data option; by itself, it does not grant rights beyond the written terms. Any custom collection or exclusivity arrangement must be agreed separately.",
      },
      {
        question: "What is included in an Avlys OTS Data quote?",
        answer: "The quote sets out the selected data, requested volume and any preparation needed: selection, deduplication, formatting, annotation, quality review and delivery documentation. Storage, transfer, evaluation arrangements and any additional work are specified before you proceed.",
      },
      {
        question: "Can you work with confidential or personal data?",
        answer: "Describe the sensitivity and security requirements without sending underlying files through this page or an initial email. Before files are shared, agree in writing on the authorized purpose, access, storage location, transfer method, processing region, retention, deletion, and any required agreements. Avlys will assess the project against those requirements before confirming whether it can proceed.",
      },
      {
        question: "Will our data be reused or sent to third-party AI providers?",
        answer: "Specify restrictions on reuse, model training, subprocessors, and external AI tools in the brief. Any proposed processing or access must be reviewed and agreed for the project before you share files. Buying annotation services does not by itself settle ownership, exclusivity, or reuse rights; these belong in the written terms.",
      },
    ],
  },
  {
    id: "pricing-delivery",
    title: "Pricing & delivery",
    items: [
      {
        question: "Does Avlys work with data buyers outside India?",
        answer: "Yes. Avlys AI works from Hyderabad and Bengaluru, India, with teams globally. Share your data task, region, language coverage and delivery needs. Processing location, access requirements, transfer arrangements and project feasibility are confirmed for your brief before work begins.",
      },
      {
        question: "How is a data project priced? Is there a minimum order?",
        answer: "A quote depends on accepted units, collection difficulty, language or domain expertise, annotation depth, review, and usage rights. Units might be records, images, audio hours, or video episodes. Share an approximate volume and budget so pilot size, inclusions, minimum batch size, and pricing can be confirmed in your project quote.",
      },
      {
        question: "How quickly can a pilot or full dataset be delivered?",
        answer: "Timing depends on whether suitable data already exists, collection permissions, contributor or reviewer availability, and annotation complexity. Confirm the specification and access requirements first, then agree on a pilot schedule. Larger deliveries should be planned around accepted batches and pilot findings rather than an unverified turnaround promise.",
      },
      {
        question: "What files and documentation should we agree on?",
        answer: "Specify the file format and schema your pipeline expects, along with labels, IDs, metadata, and any training/evaluation split requirements. Depending on the task, formats to discuss include CSV or JSONL, COCO-style annotations, and audio with timestamped transcripts. Agree on a file manifest, labeling guide, quality findings, usage terms and rights notes, and known limitations before delivery.",
      },
    ],
  },
] as const;
