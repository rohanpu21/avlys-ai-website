# Avlys Data: research and page improvements

Research date: 18 September 2026. Scope: `/data`, retaining Avlys's existing white, blue, and charcoal design, typography, shared navigation, footer, and button styles.

## Subsequent owner instruction: keep the sample library empty

The owner will supply the sample library later. The live page now shows only a "Sample library / Coming soon" notice in this section: no format cards, filters, previews, or download links. The gallery component is not rendered. Future population must use the owner's supplied material. The sample FAQ and navigation were updated to match. The earlier gallery implementation and filter checks described below are historical.

## Evidence and scope

Reddit is the primary source for buyer questions, per the owner's instruction. Twitter/X is excluded from the research basis and future FAQ research. Vendor websites and primary documentation support answer verification and page structure. This is a focused review, not an exhaustive survey of Reddit. Community posts identify questions; they do not establish a vendor's reliability or Avlys's capabilities. All published FAQ answers are original editorial copy.

### Vendor and documentation sources

| Source | Observed pattern | Application to Avlys |
| --- | --- | --- |
| [Defined.ai dataset catalogue](https://defined.ai/datasets) | Data type, language, domain, and collection specifications help buyers evaluate relevance. | Make the four format guides task-specific. Keep them distinct from a stocked dataset catalogue while availability is unconfirmed. |
| [Shaip data collection](https://www.shaip.com/offerings/data-collection/) | Clear collection categories, custom requirements, and buyer questions about scope, quality, and cost. | Separate existing collection enquiries, custom collection, and annotation/review. Add project-scoped answers instead of copying provider promises. |
| [Appen collection guidance](https://www.appen.com/blog/what-are-data-collection-solutions) and [conversational data challenges](https://www.appen.com/blog/how-to-solve-common-data-challenges-in-conversational-design) | Useful collection starts with intended use, representative scenarios, and language/domain requirements. | Lead with the model's task and an inspectable pilot; include coverage and review in the brief. |
| [Hugging Face dataset cards](https://huggingface.co/docs/hub/datasets-cards) | Dataset documentation makes language, license, task, intended use, and limitations discoverable. | Add a delivery checklist covering files/schema, coverage/splits, review findings, source/usage notes, and limitations. |

### Reddit question sources

| Source | Question theme used |
| --- | --- |
| [Reddit: working with third-party data providers](https://www.reddit.com/r/MachineLearning/comments/1lzil1y/dhas_anyone_here_worked_with_third_party_data/) | How to assess annotation quality and a provider before scaling. |
| [Reddit: data processing and labeling cost](https://www.reddit.com/r/MachineLearning/comments/1ldaof1/d_why_is_data_processing_especially_labeling_so/) | What drives cost, inconsistent labels, and rework. |
| [Reddit: licensing datasets](https://www.reddit.com/r/MachineLearning/comments/1n6swom/d_how_can_i_license_datasets/) | Finding suitable data and clarifying access and usage rights. |

These Reddit threads identify useful concerns without establishing their frequency across the platform. Provenance and quality answers remain supported by the Reddit provider discussion and primary dataset documentation. No FAQ depends on the removed Twitter/X source. No private communities, accounts, or paid analytics were accessed.

## FAQ coverage

Four groups contain 14 server-rendered questions:

1. Choosing the right data: existing versus custom, preview access, required quantity, and language/scenario coverage.
2. Quality and evaluation: metrics, rejected files and correction terms, coverage/duplicates/leakage, and synthetic or model-assisted data.
3. Rights and handling: permitted use, confidential data requirements, reuse and external AI tools.
4. Pricing and delivery: pricing units/minimums, timelines, formats and documentation.

The quality, cost, rework, sample, and licensing themes are grounded in the discussions above. Other questions address gaps a buyer must resolve when comparing the vendor workflows and dataset documentation. They are editorial additions, not claimed verbatim community questions. Rights and security answers ask for project-specific review; they do not establish a legal conclusion, certification, or existing operational control.

## Implemented decisions

- Primary action leads to a useful data brief; format exploration remains a secondary action.
- Service choices appear before the format guide so visitors understand what they can request.
- Text, image, voice, and egocentric cards describe specifications and use cases, with honest preview status.
- A four-step pilot process defines acceptance before production. A six-item delivery checklist makes that discussion concrete.
- Egocentric capture remains a scoped pilot, clearly distinguished from robot action trajectories.
- FAQ groups have topic links and native keyboard-operable disclosures. They remain readable without client-side JavaScript.
- The brief now includes the requested service. It prepares a reviewable email addressed to the existing sales address; it does not submit a lead or upload files.
- Metadata describes the actual training-data and annotation offering.

No approved public dataset inventory, downloadable sample, published pricing, standard turnaround, certification, or confirmed usage rights was supplied for this update. The existing coming-soon sample status is retained. Format illustrations are not represented as dataset media.

## Further improvements when evidence is available

Add one approved evaluation sample with its schema, coverage, rights summary, and limitations. Add a permissioned delivery example or measured pilot result. Consider testing the brief CTA against a sample-review CTA only once approved samples can actually be shared. These are future opportunities, not implemented claims.

## Validation

- Production build with webpack passed, including TypeScript and generation of all 97 pages. The environment's existing native SWC warning used the working WASM fallback.
- Data-page ESLint passed. Full-repository lint was blocked by five existing CommonJS-import errors in the unrelated, untracked `output/lark-portfolio/build-wiki.cjs`.
- Browser checks: one H1, correct `/data` canonical, all five format filters, all 14 FAQ disclosures opened and closed with Enter, required form validation, correct service and field encoding in the email draft, and clearing the draft after editing.
- Responsive widths checked: 320, 390, 768, 1024, and 1440 pixels; no document horizontal overflow. Desktop hero/FAQ and mobile hero/expanded FAQ visually inspected. No browser console errors were observed during these checks.
- Shared global CSS, Navbar, and Footer have no changes from this work. No email was sent during testing.
