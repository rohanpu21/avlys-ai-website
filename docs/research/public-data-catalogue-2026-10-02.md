# Avlys Data: public-source catalogue and positioning

Research date: 2 October 2026. Scope: descriptions and source links, not downloading, hosting, buying or delivering datasets. This is a source-based screening memo, not legal advice or a completed rights clearance.

Historical research note: this memo records the initial public-source prototype and its verification. The later agreed OTS branding, private research-field mapping, Geist typography and restored animation are documented in [the design notes](../design-systems/apple-liquid-glass-web.md); the final category pages and latest validation are in [the GEO notes](data-geo-2026-10-02.md). References below to visible publisher links, licence badges, review filters, Inter typography and the initial build describe that earlier version, not the current UI. The final pre-push production build passed; live deployment and indexing are separate checks.

## Recommendation

Position Avlys as a practical data preparation and collection partner: **find a suitable source, define the missing coverage, agree on rights and quality, then run a pilot**. Publish a clearly attributed catalogue of public sources, alongside separately scoped collection and annotation services.

The implemented catalogue contains 15 entries: six image sources, six audio sources and three video/robotics sources. Nine have no additional dataset-specific flag; six explicitly flag access, territory, upstream, item-level, ShareAlike or code/data distinctions. Every source still needs a delivery-specific review. Smithsonian is a source collection, not a pre-cleared fixed dataset.

Do not claim these are Avlys-owned datasets, reserved inventory, exclusive licences, a certified anonymised supply, or an aggregate number of deliverable hours. Do not imply endorsement by a publisher. A public dataset can be a useful baseline without meeting a client's production requirements.

## How the research was screened

1. Used project publishers, official repositories, dataset cards and author papers for dataset facts and licence evidence. A software repository licence was not automatically applied to its data.
2. Separated commercial training/reuse from redistribution or paid delivery. Checked for non-commercial terms, access agreements, upstream rights and different licences for separate assets.
3. Recorded modality, content origin, intended tasks, formats, coverage, limitations, source links and publisher-reported size where useful. Counts are not promised supply.
4. Read relevant connected email threads and existing project discussions for requirements. Only general demand themes informed the public wording; client names, messages, volumes, prices, attachments and negotiations were not copied to the page.
5. No accounts were created, access agreements accepted, paid design components acquired or datasets downloaded for this task.

## Licensing conclusions

Commercial training, commercial distribution, sublicensing and exclusivity are separate questions. Creative Commons licences grant particular copyright/database permissions; they do not settle all privacy, publicity, trademark or contractual issues. The precise treatment of training and outputs can depend on jurisdiction and workflow. [Creative Commons AI explanation](https://creativecommons.org/2023/08/18/understanding-cc-licenses-and-generative-ai/).

| Basis | Commercial reuse / training screen | Paid delivery screen |
| --- | --- | --- |
| CC BY 4.0 | Commercial reuse is within the grant, subject to conditions and rights outside it. | Sharing and adaptation can be commercial. Preserve attribution, licence link, notices and change indications; do not restrict recipients' original rights. |
| MIT applied explicitly to data | Permissive commercial reuse, subject to notices and any upstream conditions. | Distribution/sale can be permitted while preserving required notices. |
| CC BY-SA 4.0 | Commercial reuse allowed; analyse the particular workflow. | Shared adaptations require the same or a compatible licence. Do not offer an exclusive proprietary replacement licence. Whether a trained model is an adaptation is not answered here. |
| CC0-designated assets | Reuse of waived rights allowed. Verify designation and other rights. | Commercial distribution possible for eligible assets; provenance is recommended even where attribution is not required. |
| US public domain statement | Territorial, not a worldwide assurance. | Check intended delivery/use jurisdictions and non-copyright rights. |

Primary terms: [CC BY deed](https://creativecommons.org/licenses/by/4.0/), [CC BY legal code](https://creativecommons.org/licenses/by/4.0/legalcode.en), [CC BY-SA](https://creativecommons.org/licenses/by-sa/4.0/), [CC0](https://creativecommons.org/publicdomain/zero/1.0/), [MIT](https://opensource.org/license/mit).

Commercially sensible offer: quote transparently for curation, deduplication, conversion, annotation, quality review, provenance work and agreed infrastructure. Where a compliant paid copy is allowed, do not pretend payment removes the customer's open-licence rights. “No source purchase price listed” is not “zero acquisition, processing or legal cost.”

## Included sources: primary evidence and boundaries

The detailed, maintainable descriptions are in `app/data/publicDatasetCatalog.ts`. Evidence links are also exposed beside each entry on `/data`.

| Source | Dataset licence evidence | Why it belongs / boundary |
| --- | --- | --- |
| DOCCI | [Google project page](https://google.github.io/docci/) explicitly licenses images and annotations CC BY 4.0. | Real images and detailed captions; not a specialist infographic inventory. |
| EuroSAT | [Publisher README](https://github.com/phelber/EuroSAT#license) explicitly applies MIT to the dataset and references Sentinel conditions. | Satellite classification; additional upstream conditions flag. The legacy ESA terms link failed to load during review; [current Copernicus terms](https://dataspace.copernicus.eu/terms-and-conditions) distinguish Sentinel data from unrelated portal content. Recheck the linked Sentinel legal notice before delivery. |
| Fashion-MNIST | [Publisher repository](https://github.com/zalandoresearch/fashion-mnist) and [MIT licence](https://github.com/zalandoresearch/fashion-mnist/blob/master/LICENSE). | Small apparel classification images, not high-resolution retail photography. |
| CLEVR | [Author project page](https://cs.stanford.edu/people/jcjohns/clevr/) applies CC BY 4.0 to the data. | Synthetic visual reasoning scenes; cannot fulfil a human-created-only requirement. |
| Kuzushiji-MNIST | [Publisher README](https://github.com/rois-codh/kmnist#license): CC BY-SA 4.0. | Historical character recognition. Shared adaptations need ShareAlike review. |
| Smithsonian Open Access selections | [Official FAQ](https://www.si.edu/openaccess/faq): commercial use of CC0-designated assets without a Smithsonian fee; third-party permissions remain the user's responsibility. | Item-level screening only. Direct fetch failed; the official FAQ's indexed text was available. Never apply CC0 to the whole institution or use its trademarks as endorsement. |
| FLEURS | [Google dataset card](https://huggingface.co/datasets/google/fleurs): CC BY 4.0. | Multilingual read-speech evaluation; not real support calls or human–bot dialogues. |
| IndicVoices | [AI4Bharat card](https://huggingface.co/datasets/ai4bharat/IndicVoices): CC BY 4.0, with a contact-sharing/access gate. | Strong Indian-language relevance. Conditions behind sign-in were not accepted or fully inspected; do not confirm supply until reviewed. |
| LibriSpeech ASR | [OpenSLR 12](https://www.openslr.org/12/): CC BY 4.0. | English narrated-speech benchmark; underlying material overlaps LibriTTS. |
| LibriTTS | [OpenSLR 60](https://www.openslr.org/60/): CC BY 4.0. | Sentence-aligned multi-speaker read speech. Do not infer permission for impersonation or speaker endorsement. |
| Speech Commands v0.02 | [Google card](https://huggingface.co/datasets/google/speech_commands/blob/main/README.md): CC BY 4.0; [original Google announcement](https://www.research.google/blog/launching-the-speech-commands-dataset/) corroborates the data licence. | Keyword spotting, not conversational ASR. Full-release and wrapper-specific counts differ. |
| LJ Speech 1.1 | [Publisher page](https://keithito.com/LJ-Speech-Dataset/): recordings, text and annotations described as US public domain. | Single-speaker baseline; geographic and voice-use review flag. |
| DROID | [Author paper, introduction](https://arxiv.org/html/2403.12945v1#S1) explicitly releases the dataset CC BY 4.0—not merely the paper. [Project](https://droid-dataset.github.io/). | Multi-camera robot data. Check the particular release, privacy processing and hardware applicability. |
| BridgeData V2 | [Project page](https://rail-berkeley.github.io/bridgedata/) explicitly releases all data CC BY 4.0. | Robot episodes and image observations, not generic MP4 footage. The code repository's MIT licence is separate. |
| Kubric-5D | [TRI publisher README licensing](https://github.com/TRI-ML/Kubric-5D#licensing): published archives CC BY 4.0, project-authored generation code CC BY-NC 4.0. | Synthetic multi-view video. Do not use the non-commercial generator for a paid production service without separate permission. |

### Sources investigated but not offered as resale-ready

| Source / group | Decision and evidence |
| --- | --- |
| Ego4D | Excluded from resale catalogue. The [official institutional licence compilation](https://ego4d-data.org/pdfs/Ego4D-Licenses-Draft.pdf) permits some commercial development but prohibits third-party sale, transfer or access to the database. The file is named a draft; executed current terms would still govern. |
| Ego-Exo4D | Not a raw-data resale source. [Official access documentation](https://docs.ego-exo4d-data.org/getting-started/) notes commercial use and redistribution restrictions; [licence](https://ego4d-data.org/pdfs/Ego-Exo4D-Model-License.pdf) contains transfer restrictions. |
| EPIC-KITCHENS | Excluded: [official page](https://epic-kitchens.github.io/2021) states CC BY-NC 4.0. Separate commercial permission is not assumed. |
| Free ST American English | Excluded: [OpenSLR 45](https://www.openslr.org/45/) specifies CC BY-NC-ND 4.0. |
| Open Images | Deferred, not labelled wholesale-cleared. [Official V7 description](https://storage.googleapis.com/openimages/web/factsfigures_v7.html) distinguishes CC BY 4.0 annotations from image licences and tells users to verify each image. |
| CIFAR | Deferred: the reviewed [author page](https://www.cs.toronto.edu/~kriz/cifar.html) did not provide sufficient explicit underlying-image resale evidence. A library's code licence is not enough. |
| RoboNet | Deferred: reviewed [project page](https://www.robonet.wiki/) and software repository did not settle the dataset redistribution terms sufficiently for inclusion. |
| MOVi / Kubric variants | Deferred rather than extrapolating from the generator or object-asset licences. Included Kubric-5D instead because its publisher expressly separates archive and code terms. |
| Blender open movies | Not included in this launch selection. Several official legacy licence pages failed to load; film assets, trademarks and actor publicity rights need separate screening. |

Not comprehensive legal clearance: other popular sources, including Common Voice releases, YouTube collections, COCO, web scrapes and purchased stock imagery, must be assessed independently. No blanket permission follows from being downloadable or labelled “open.”

## Context synthesis (private correspondence not reproduced)

Demand themes in relevant emails and project discussions:

- Multilingual and Indian-language speech, with exact sample-rate, transcription and speaker-coverage requirements. Reading, role-play, natural human conversation and real human–bot escalation calls are different products.
- Dense human-authored visual material, including technical or scientific graphics. Synthetic renders and simple classification images do not meet that requirement merely because both are images.
- First-person capture for physical AI, with task, environment, camera and annotation specifications to agree. Public robot trajectories do not prove human egocentric capacity.
- Source provenance and usage evidence are commercially important. A source's entire published volume is not cleared, reserved Avlys stock.

Use these themes to qualify a brief; do not publish unconfirmed operational capacity, client-specific requirements, supplier negotiations, budgets or claimed consents.

## Leading-provider positioning review

These are major providers selected for product relevance, not a verified ranking of the world's largest by revenue. Company sites were reviewed for structure and positioning; their claims were not independently audited.

| Provider | Observable approach | Avlys application |
| --- | --- | --- |
| [Scale](https://scale.com/) | Separates data services, evaluation and applications; leads with outcomes. | Separate public-source discovery from preparation and custom collection. No copied customer logos or scale claims. |
| [Appen](https://www.appen.com/) | Organises human-data capabilities around AI tasks and modalities. | Explain what each modality supports and what the buyer must specify. |
| [TELUS Digital](https://www.telusdigital.com/solutions/data-for-ai-training/data-collection-services) | Distinguishes collection from enrichment; discusses tailored requirements and quality processes. | Make the pilot and acceptance criteria explicit without borrowing its workforce or coverage statistics. |
| [Shaip speech catalogue](https://www.shaip.com/offerings/speech-data-catalog/) | Browse-by-category, search, language/type/rate filters, dataset detail pages. | Use clear modality selection, search and expandable specs. Add more filters only when the inventory justifies them. |
| [Toloka](https://toloka.ai/) | Focuses on agent/LLM tasks and routes buyers to an expert conversation. | Offer a concrete scoped brief, not a promise to supply every data type immediately. |
| [iMerit](https://imerit.ai/) | Groups specialist data work by industry and pairs it with quality/evaluation expertise. | Keep task fit, annotation and quality evidence close to the catalogue. Avoid unsupported guarantees. |

Recommended commercial focus: speech and image preparation first; robotics/egocentric work as carefully scoped pilots. A public catalogue is a discovery tool and evidence of sourcing discipline, not the business's moat. Valuable deliverables are task fit, labels, review records, clean manifests and accountable collection.

## Design references and mobile decisions

- Preserved Avlys tokens: white canvas, `#0066cc` blue, `#1d1d1f` charcoal, existing Inter typography and pill CTAs. The user-selected Swiss Scientific reference informed grid alignment, hierarchy, fine rules and restrained density—not a site-wide rebrand.
- Reviewed 21st.dev search metadata for [Tabbed Feature Categories](https://21st.dev/@olewandowski1/components/features-4), [FAQ Tabs Card](https://21st.dev/@arihantcodes_1f7b8c4d/components/faq-tabs-card), and [Searchable FAQ Accordion](https://21st.dev/@cnippet-dev/components/v-accordion-11). Borrowed the category/filter/disclosure patterns, not source code. Paid component retrieval was not used.
- Mobbin's MCP returned a paid-plan requirement. Its public [web-app discovery page](https://mobbin.com/discover/apps/web) was reachable but did not expose usable screen references through the available fetch. No claim of reviewing paid screens.
- No Cosmos connector was available. Reviewed the public [Cosmos site](https://www.cosmos.so/) and [product introduction](https://help.cosmos.so/en/articles/11846092-intro-to-cosmos) for collection/search/source-discovery patterns. No private boards or assets were copied.
- Mobile: three compact, visibly selected category buttons; no horizontal table; one-column dataset cards; readable inputs; licence and special conditions visible before expansion; sources and email brief actions have touch-sized targets.
- Accessibility: native buttons with `aria-pressed`, labelled inputs, live result count, native disclosure controls, focus outlines, reduced-motion support and category hash links. Catalogue link remains visible in the mobile subnavigation. No autoplay media or third-party dataset embeds were added.

## Before supplying any data commercially

1. Pin the exact release and selected records; retain source URLs, dates, licence copies and a manifest.
2. Confirm access/gating and upstream terms. Obtain advice on unresolved territory, ShareAlike, personal-data and downstream-model questions.
3. Verify whether training, redistribution and the customer's intended deployment are covered; reject unsupported exclusivity.
4. Inspect representativeness, personal information, transcript/label quality and duplicates. Protect held-out evaluation data and cross-source overlap.
5. Separate the no-purchase public source from Avlys service and infrastructure charges in the quote.
6. Agree on a pilot, acceptance method, correction scope and delivery rights before promising volume or timeline.

Website publication is separate from dataset delivery. This change prepares the local site and does not deploy it, accept dataset terms, or publish client information.

## Implementation verification

- Direct TypeScript and targeted ESLint checks passed; `git diff --check` passed for the changed tracked files.
- The production Webpack build passed and generated 97 pages, including `/data`. Existing Bun command shims and the native SWC binary failed in this environment; invoking the installed tools with Node and using Webpack/WASM avoided reinstalling dependencies. A sandboxed build initially could not fetch the existing Inter font; a network-enabled retry succeeded.
- Metadata assertions passed for 15 unique records, source/licence URL schemes, category and review-flag counts, search and empty results.
- Connected-browser checks verified keyboard category selection, Hindi search, FLEURS details, empty results, reset, additional-review filtering and video hash persistence after reload. Layout checks across all three categories at 320, 390, 768 and 1440 pixels showed no horizontal overflow.
- Desktop/mobile screenshots and browser check results are saved under `output/data-catalogue-qa/`. No browser console errors were captured in that check.
- The standalone browser harness initially timed out waiting for network idle. It was changed to wait for DOM content and visible catalogue controls; the completed interactive checks above were performed through the connected in-app browser, not claimed as a completed run of that harness.
