# Avlys Data page handoff

Implemented locally on 6 September 2026 at `/data`.

## Included

- White, blue, and black page using the existing Avlys design tokens and typography.
- Shared navigation/footer links, sitemap entry, and cross-link from the existing data-preparation service page.
- Responsive hero, filterable four-category sample library, service options, process, egocentric pilot section, FAQ, and requirements-to-email composer.
- Explicit reserved sample spaces. No invented datasets, metrics, client logos, downloadable files, or sample recordings.
- Canonical and page-specific title/description metadata.

The frontend-design skill guided the restrained layout, typography, and light/dark section rhythm; the supplied website theme takes precedence over introducing a new visual identity.

## Files to extend later

- `app/data/page.tsx`: page content and sections.
- `app/data/data.module.css`: scoped styling.
- `app/data/datasetCatalog.ts`: category placeholder descriptions and expected metadata.
- `app/data/_components/DatasetGallery.tsx`: filtering and reserved preview spaces.
- `app/data/_components/ModalityMark.tsx`: format icons, not dataset imagery.
- `app/data/_components/DataBrief.tsx`: email composer.

## Sample-upload boundary

This phase reserves portfolio space only. There is no upload backend, file storage, authenticated library, or functioning download flow. The form prepares a mailto link and explicitly requires the visitor to review/send from their email application; it does not claim a request was submitted.

When samples arrive, first confirm display and licensing permissions, review sensitive information, and record actual quantities/formats. Replace the category placeholders with reviewed collection records and approved previews. Add an authenticated storage/upload workflow separately if required. Do not place private or unrestricted full datasets in public assets or Git.

## Verification

- `npm run lint`: passed.
- `npm run build -- --webpack`: passed; `/data` statically generated.
- Default `npm run build`: blocked by the existing invalid native Windows SWC binding; Turbopack cannot run with the WASM fallback. No dependency or build-script changes made to conceal this issue.
- Local browser checks: HTTP 200, title/canonical, single h1, all five filters, expandable details, FAQ, required form fields, email generation/reset, mobile menu navigation, and no page errors.
- No horizontal overflow at 320, 390, 768, 1024, and 1440 pixels.
- Desktop and mobile screenshots reviewed. Local QA script/screenshots are in ignored `.tools/qa-avlys-data.cjs` and `.tools/avlys-data-*.png`.
- No emails sent, samples uploaded, commits pushed, or deployment performed.
