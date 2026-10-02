# Avlys Data — Apple-inspired web design

Reviewed 2 October 2026. Scope: `/data`, including its public-source catalogue. This is an original web adaptation, not Apple's native Liquid Glass renderer, an Apple UI kit redistribution, or a redesign of every Avlys page.

## Official reference library

The following index points to Apple's living library rather than claiming to mirror every document or download every platform kit.

| Reference | What informs this implementation |
| --- | --- |
| [Apple Design](https://developer.apple.com/design/) | Entry point for design guidance and resources |
| [Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/) | Platform guidance and component reference |
| [Materials](https://developer.apple.com/design/human-interface-guidelines/materials) | Separate navigation/control materials from the content layer; use glass sparingly |
| [Meet Liquid Glass](https://developer.apple.com/videos/play/wwdc2025/219/) | Layering, rounded controls, subtle elevation and responsive interaction |
| [Get to know the new design system](https://developer.apple.com/videos/play/wwdc2025/356/) | Concentric geometry, clear grouping, tint for important actions |
| [Layout](https://developer.apple.com/design/human-interface-guidelines/layout) | Aligned hierarchy and layouts that adapt to available space |
| [Typography](https://developer.apple.com/design/human-interface-guidelines/typography) | Legible hierarchy; reference, not a bundled font |
| [Color](https://developer.apple.com/design/human-interface-guidelines/color) | Brand accents and sufficient contrast |
| [Accessibility](https://developer.apple.com/design/human-interface-guidelines/accessibility) | Contrast, accessible controls and user preferences |
| [Apple Design Resources](https://developer.apple.com/design/resources/) | Official platform UI kits, templates and tools; Figma/Sketch resource links |
| [App icons](https://developer.apple.com/design/human-interface-guidelines/app-icons/) | Platform icon templates and their production grids, not a universal website grid |
| [SF Symbols](https://developer.apple.com/sf-symbols/) | Native symbol library reference; not embedded in Avlys |
| [Fonts](https://developer.apple.com/fonts/) | Platform typography reference; no Apple font files copied |
| [Apple Design Resources licence](https://developer.apple.com/support/downloads/terms/apple-design-resources/Apple-Design-Resources-License-20230621-English.pdf) | Resource-use boundaries; do not treat the kits as a general-purpose web asset licence |

Some HIG pages are JavaScript-rendered; official indexed passages and the accessible WWDC transcripts informed this adaptation. No Apple account, paid download, Figma kit import, native SDK, icon archive or font installation was required.

## Avlys decisions

- Keep blue `#0066cc`, charcoal `#1d1d1f`, white and cool neutral surfaces, with original inline SVG symbols. Typography was subsequently updated to Geist Sans on `/data` as described below; other routes retain Inter.
- Use one frosted floating subnavigation and one grouped catalogue category control. Apply lighter translucency to search/filter fields. Avoid glass behind long dataset descriptions and licence terms.
- Nest the category controls concentrically: 30px outer radius, 8px inset and 23px inner radius. This is our web geometry, not a claimed Apple specification.
- Use a 1152px maximum content width, 24px desktop / 16px mobile side margins, a three-part category control, and two-column cards that become one column on phones. These are Avlys layout tokens, not Apple's app-icon grid.
- Use 44px-or-larger interactive targets, visible keyboard focus and native button, select and details semantics. Retain explicit labels and pressed states; colour is not the only selected-state signal.
- Start with opaque CSS surfaces. Add blur only through `@supports`; restore opaque materials for reduced-transparency or increased-contrast preferences. Include reduced-motion and forced-colour overrides.
- Preserve the original GatewayFlow particle animation and blue hero aura, restored at the user's request on 2 October 2026. Respect reduced motion and pause offscreen/background playback. Do not add lens-distortion filters, cursor-tracking effects or additional graphics dependencies. CSS translucency approximates depth; it does not reproduce Apple's dynamic native lensing.

## Content and functional boundaries

Keep all 15 catalogue entries, the image/audio/video counts, search, category hash URLs, empty state and email brief. Following the OTS presentation decision below, source/evidence links and detailed rights checks are internal research records rather than card content. Dataset descriptions are not an owned inventory, hosted dataset, exclusivity claim or automatic legal clearance.

### Avlys OTS presentation — 2 October 2026

The customer-facing catalogue uses Avlys OTS Data branding and descriptive collection names. Cards present coverage, reference collection scope, formats, annotations, use cases and technical limitations, with a request-a-quote action. They do not display free-data language, source-cost details, publisher links, licence badges or a review-condition filter. The short Data sources note identifies third-party/public research sourcing and confirms that availability and delivery terms are agreed separately.

Original names, source URLs, evidence links and licence checks remain in `app/data/publicDatasetCatalog.ts` and `docs/research/public-data-catalogue-2026-10-02.md`. The server maps those records to explicit customer-facing fields in `app/data/otsCataloguePresentation.ts`; research fields are not sent as catalogue props. Any required attribution and applicable conditions must still accompany a future delivery. No actual datasets are hosted or supplied by this page.

Copywriting choices: lead with the Avlys offering; use functional names so buyers can compare fit; keep specifications specific; use Request a quote because availability and delivery scope are not yet confirmed. Avoid claims of ownership, exclusive access or ready stock.

Keep the existing concept images accurately labelled and the original office photography. Do not replace good assets with generated mock screenshots. The initial glass restyling used a static blue light field; the latest agreed version restores the original animated hero without changing factual promises. See the [GEO implementation notes](../research/data-geo-2026-10-02.md) for the follow-up.

## Data-page typography — 2 October 2026

The user requested a sans-serif inspired by YC / San Francisco startup websites. Use [Geist Sans](https://vercel.com/font) as a visual interpretation, not a claim that YC companies share one font. The frontend-design pass uses a single consistent family, medium 550-weight display headings, 400-weight readable body copy, 500-weight actions, restrained negative heading tracking and tabular figures for dataset counts. Keep the approved Avlys colours and glass controls.

Load the variable Latin font with `next/font/google` on `/data` and its image/audio/video category pages, using `display: swap` and the scoped `--font-data-sans` variable. Next.js self-hosts the generated font assets; there is no client-side Google Fonts stylesheet request. Do not change the root layout or unrelated routes. Form controls inherit the same family. Typography does not change dataset scope.

## Local preview on a nearly full drive

`AVLYS_PREVIEW_MEMORY_CACHE=1` opts the Webpack development server into an in-memory cache. It does not affect normal development or production builds. The preview still creates compiled files under `.next/dev`; adequate free disk space is needed. Only the regenerable `.next/dev/cache/webpack` cache was removed during this task.
