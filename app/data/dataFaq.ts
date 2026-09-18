// Buyer concerns and editorial decisions are traced in
// docs/avlys-data-page-research-2026-09-18.md. Terms remain project-specific.
export const dataFaqGroups = [
  {
    id: "getting-started",
    title: "Choosing the right data",
    items: [
      {
        question: "Should I use an existing dataset or commission a custom collection?",
        answer: "An existing collection is useful when its task, language, environment, labels, and usage rights match your needs. Custom collection is worth considering when those details do not fit. If you already have authorized source data, annotation and review may be the better starting point. Share the requirement so we can assess the options and availability.",
      },
      {
        question: "Can I review or download a sample before committing?",
        answer: "The sample library is coming soon and currently has no previews or downloads. You can share your requirements to discuss evaluation options, access, and permitted use. A small, agreed pilot can help evaluate fit before a larger collection.",
      },
      {
        question: "How much training data do I need?",
        answer: "There is no single record count that works for every model. It depends on the task, starting model, variation in real use, and performance you need to measure. Begin with representative examples and a separate evaluation set, identify the failure cases, and use the pilot results to decide whether more data or better coverage is needed.",
      },
      {
        question: "Can you support specific languages, accents, or rare scenarios?",
        answer: "Include the language and locale, domain, recording or capture conditions, and important edge cases in your brief. We will assess collection and reviewer feasibility before confirming coverage, volume, and availability for your requested scope.",
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
        question: "Is real-world data different from synthetic or AI-labeled data?",
        answer: "Yes. Captured data, generated examples, and model-assisted labels have different sources and review needs. Synthetic examples may help cover some scenarios, but should be evaluated against real use. Specify whether generation or automated labeling is allowed and what human review is required. The method should be disclosed for the agreed collection; illustrations on this page are not dataset samples.",
      },
    ],
  },
  {
    id: "rights-handling",
    title: "Rights & data handling",
    items: [
      {
        question: "What usage rights come with a dataset?",
        answer: "Permitted use is agreed for each collection. Training, evaluation, commercial deployment, redistribution, and exclusivity can have different terms. Public availability is not evidence of unrestricted reuse. Review source information and the applicable rights before accepting a collection; a preview is not a license to use the full dataset.",
      },
      {
        question: "Can you work with confidential or personal data?",
        answer: "Describe the sensitivity and your security requirements without sending the underlying files through this page or an initial email. Access controls, transfer method, processing location, retention, deletion, and any required agreements need to be reviewed before data is shared. We can then assess whether the project can meet your requirements.",
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
        question: "How is a data project priced? Is there a minimum order?",
        answer: "A quote depends on accepted units, collection difficulty, language or domain expertise, annotation depth, review, and usage rights. Units might be records, images, audio hours, or video episodes. Share an approximate volume and budget so pilot size, inclusions, minimum batch size, and pricing can be confirmed in your project quote.",
      },
      {
        question: "How quickly can a pilot or full dataset be delivered?",
        answer: "Timing depends on whether suitable data already exists, collection permissions, contributor or reviewer availability, and annotation complexity. Confirm the specification and access requirements first, then agree on a pilot schedule. Larger deliveries should be planned around accepted batches and pilot findings rather than an unverified turnaround promise.",
      },
      {
        question: "What files and documentation should we agree on?",
        answer: "Specify the file format and schema your pipeline expects, along with labels, IDs, metadata, and any training/evaluation split requirements. Depending on the task, formats to discuss include CSV or JSONL, COCO-style annotations, and audio with timestamped transcripts. Agree on a file manifest, labeling guide, quality findings, source and usage notes, and known limitations before delivery.",
      },
    ],
  },
] as const;
