# Avlys Data editorial images

Generated with the built-in image-generation tool for the data page. These are conceptual illustrations, not dataset previews or evidence of a completed collection.

- `text-documents.webp`: tactile documents and a blue folder.
- `image-vision.webp`: curated architectural photographic prints.
- `voice-audio.webp`: charcoal microphone in a light studio.
- `egocentric-capture.webp`: first-person manual inspection scene.

The original PNG files are preserved at the source paths recorded in `docs/design-systems/data-image-prompts.json`, alongside the complete prompts and design references. WebP assets use quality 88, retain the original 1536 × 1024 dimensions, and total approximately 452 KiB before Next.js responsive image optimization.

The live page uses these four assets in its format and capture sections. The sample library remains empty. Global design tokens, navigation, and footer are unchanged by this imagery update.

Validation: all four images loaded in the browser; desktop and mobile compositions inspected; no horizontal overflow at 320, 390, 768, 1024, and 1440 pixel layouts. No browser console errors observed. Page ESLint and whitespace checks passed.
