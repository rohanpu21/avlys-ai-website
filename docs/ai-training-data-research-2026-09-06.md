# Avlys AI: training-data market and page brief

Research date: 6 September 2026. This is a representative market map, not an exhaustive directory. Capabilities below are drawn from company publications; customer relationships are listed only where a specific announcement supports them. Vendor marketing claims are not independently audited.

## What Avlys would be selling

Separate three offers: text for language models; images and image-text pairs for vision and multimodal models; first-person video for embodied AI and robotics. Egocentric video is not interchangeable with robot action trajectories: a buyer may also need calibrated cameras, timestamps, hand/object tracking, depth or IMU streams, and an agreed action representation.

Raw collection, annotation, expert-written training examples, model evaluation, and licensing existing content are different businesses. Avlys should specify which deliverables it provides rather than presenting all of them as one generic data product.

## Indian companies and companies with substantial Indian operations

| Company | Geography / category | Published offering | Relevance to Avlys |
| --- | --- | --- | --- |
| [IndiVillage](https://www.indivillage.com/) | Indian data-operations business | Text, image, video and audio annotation; content moderation; model validation and pipeline automation | A close comparison for a managed data service with a named delivery team and documented QA |
| [Taskmonk](https://www.taskmonk.ai/) | Indian company; its [company notice](https://www.taskmonk.ai/privacy-policy) identifies a Bengaluru registered office | A labeling platform and human workflows for text, images, audio, video, LiDAR and documents; LLM and ecommerce applications | Benchmark workflow management, review queues, and customer reporting; distinguish platform sales from collection services |
| [Shaip](https://www.shaip.com/training-data/) | International business with Indian operations in Ahmedabad; current [contact page](https://www.shaip.com/contact-us/) describes its Ubiquity connection | Collection and annotation across text, audio, image and video; supervised fine-tuning examples, preference ranking, evaluation; physical-AI data including egocentric capture | Strong reference for organizing modality pages and clearly describing collection versus annotation |
| [iMerit](https://imerit.net/press/inside-indias-quiet-new-export-human-intelligence-for-artificial-minds/) | Global business with Indian roots and delivery operations | Expert AI data services; [medical language data](https://imerit.net/domains/medical-ai/medical-generative-ai/) and [robotics annotation](https://imerit.net/domains/autonomous-vehicles/robotics/) | Benchmark expert review and domain-specific annotation. It should not be described simply as an India-only company |
| [Cogito Tech](https://imerit.net/press/inside-indias-quiet-new-export-human-intelligence-for-artificial-minds/) | New York headquarters and workforce primarily in New Delhi, according to this republished press report | Domain-expert annotation and model testing in healthcare, financial compliance, legal AI and agriculture | Relevant cross-border competitor. The report names OpenAI among its clients; treat that as reported evidence, not a direct OpenAI announcement |
| [Innodata](https://innodata.com/generative-ai/data-solutions/) | International provider; not categorized here as an Indian-headquartered company | Expert training and evaluation data, preference optimization, red teaming; [image, video and sensor annotation](https://innodata.com/image-video-sensor-data-annotation/) | Benchmark how to package expert-written examples and evaluation as services beyond basic labeling |

No direct OpenAI supply relationship was established in this research for IndiVillage, Taskmonk, Shaip or iMerit. Offering LLM data does not establish that a company supplies ChatGPT.

## International providers and content licensors

| Company | Business model | Evidence and lesson |
| --- | --- | --- |
| [Scale AI](https://scale.com/) | Model data, evaluation and enterprise AI services | Scale describes partnerships with major model builders in its [AI blueprint](https://go.scale.com/hubfs/FY24%20-%20OFM%202.0/AI%20Blueprint%20Checklist%20v2.pdf). Its [documentation](https://docs.gp.scale.com/reference/v4/models/create-model) references the historical OpenAI GPT-3.5 fine-tuning partnership. That is not evidence that every OpenAI model uses a particular Scale dataset |
| [Appen](https://www.appen.com/) | Human data and managed expert operations | Publishes offerings for language-model alignment, agent tasks, speech, image-text/video data, physical AI and evaluation. Benchmark its separation of model objectives and modalities |
| [Sama](https://www.sama.com/) | Managed AI data services | Relevant competitor for visual-data annotation and quality workflows. Use verified project evidence before comparing accuracy or delivery scale |
| [Turing](https://www.turing.com/) | Expert datasets, reinforcement-learning environments and benchmarks | Focuses on software engineering, enterprise knowledge work and STEM; useful reference for a future expert-text offer rather than commodity text collection |
| [Shutterstock](https://investor.shutterstock.com/news-releases/news-release-details/shutterstock-expands-partnership-openai-signs-new-six-year) | Licensing an existing media library | A July 2023 announcement specifically describes a six-year OpenAI agreement covering image, video and music libraries and metadata. This is strong evidence of a disclosed data relationship, distinct from outsourced annotation |
| [Reddit](https://openai.com/index/openai-and-reddit-partnership/) | Structured content/API partnership | OpenAI's May 2024 announcement describes access to Reddit's Data API to bring Reddit content into ChatGPT and other products. Do not turn this into a claim that Reddit performs outsourced labeling or that all of its content trains every model |

## Egocentric specialists

| Provider | Published focus | What to investigate in a buyer evaluation |
| --- | --- | --- |
| [Claru](https://claru.ai/blog/best-egocentric-data-providers) | Purpose-built egocentric capture, enrichment and delivery for robotics and embodied AI | Capture specifications, task diversity, annotation format and sample quality; its competitor rankings are marketing material |
| [MoVo](https://www.movodata.com/) | Human demonstration data for humanoid models | Request representative samples and evidence behind delivery-volume claims |
| [Robgence](https://www.robgence.com/) | Egocentric video, multimodal sensors, motion capture, teleoperation and synthetic workflows | Separate raw video, aligned sensor streams and executable action data in the quote |
| [Contracted AI](https://contracted.ai/) | Egocentric video, embodied-reasoning annotations and robot-arm teleoperation | Check task definitions, review process and data-license scope |

These are providers' own descriptions, not independently verified rankings. [Ego4D](https://openaccess.thecvf.com/content/CVPR2022/papers/Grauman_Ego4D_Around_the_World_in_3000_Hours_of_Egocentric_Video_CVPR_2022_paper.pdf) is a useful research reference for the first-person modality, not a commercial supplier endorsement.

## Recommended Avlys offer

Start with three well-defined pilot deliverables. These are proposed specifications, not claims about services already delivered:

1. **Text and language data:** licensed or client-provided source documents; prompt-response examples; preference comparisons; multilingual annotation where qualified reviewers are available; a separate evaluation set. Deliver JSONL, source references, label guidelines and a quality report.
2. **Image and multimodal data:** scoped image collection; captions; classification, bounding boxes or segmentation; image-text matching. Deliver agreed COCO/JSON formats, source/license records, label taxonomy and reviewed samples.
3. **Egocentric video:** first-person task demonstrations in agreed environments; temporal activity labels and hand-object interactions. Agree camera placement, resolution, frame rate, synchronization and sensor requirements before collecting. Deliver videos, timestamps, annotations and a dataset card; only offer pose/depth/action channels that can actually be captured and validated.

Each pilot should establish acceptance criteria before volume: coverage, rejection reasons, reviewer agreement, held-out quality checks, provenance, permitted use and a rework process. Pricing should distinguish accepted items or hours from raw collection volume. Do not invent accuracy percentages, certifications, workforce size or customer logos.

## About-page copy draft

Status: draft for the next page iteration. The existing site already advertises data collection and preparation; egocentric delivery has not yet been confirmed as operational.

**Software, AI, and the data behind them.**

Avlys AI is a founder-led team building custom software, AI integrations, and data workflows for businesses. We work close to the people who use the systems, from defining the problem to preparing the data and delivering the application.

We are developing a training-data offering across text, images, and first-person video. Our focus is on datasets shaped around a model's task: language examples for LLMs, visual annotations for multimodal systems, and human activity demonstrations for embodied AI.

Each engagement starts with a defined scope and a sample batch, so the collection method, annotation rules, and review criteria can be agreed before scaling.

**Text and language** — Collection, preparation, annotation and evaluation examples for language-model workflows.

**Images and multimodal data** — Images, captions and visual annotations organized around the model's intended task.

**Egocentric video** — A developing capability for first-person human activity capture and annotation for robotics and embodied AI.

**CTA:** Discuss a data pilot → `/contact`.

Before publishing, confirm which services are available today, supported languages, collection environments, equipment, reviewer skills, sample availability and turnaround. Keep company comparisons in a separate sourced Insights article; use the About page to explain Avlys itself. Do not embed competitor logos as customers or partners.

## Search and content structure

Keep `/services/ai-training-data` as the main service page, with internal links from About, Services and relevant articles. Add text, image and egocentric subpages only when each has distinct examples and enough original content to answer a buyer's questions. Avoid near-duplicate pages for every keyword or city.

Initial topic hypotheses: AI training data services, text annotation services, image annotation services, multimodal training data, egocentric video data collection, and robotics demonstration datasets. These have not yet been validated for volume, difficulty or commercial demand; use OpenSEO and Search Console before prioritizing.

Useful first articles: choosing a training-data supplier; what an egocentric dataset contains; comparing raw collection, annotation and evaluation; and a documented Avlys pilot once real results exist. Publish sources, named authors, meaningful updates and clear service links. No SEO tool can guarantee the first position in Google.
