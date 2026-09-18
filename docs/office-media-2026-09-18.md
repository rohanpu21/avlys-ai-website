# Avlys office media

The owner supplied five office photographs and a short video on 18 September 2026 for use on the Avlys website. These are real supplied photographs, not generated images. No names, job titles, client identities, or office location have been inferred from the media.

## Asset mapping

All sources remain unchanged in `C:/Users/KIIT/Downloads/`.

| Supplied source | Website asset |
| --- | --- |
| WhatsApp Image 2026-09-18 at 1.39.39 PM (1).jpeg | `/office/team-discussion.webp` |
| WhatsApp Image 2026-09-18 at 1.39.39 PM.jpeg | `/office/whiteboard-session.webp` |
| WhatsApp Image 2026-09-18 at 1.39.40 PM.jpeg | `/office/working-session.webp` |
| WhatsApp Image 2026-09-18 at 1.39.38 PM (1).jpeg | `/office/shared-workspace.webp` |
| WhatsApp Image 2026-09-18 at 1.39.38 PM.jpeg | `/office/team-review.webp` |
| WhatsApp Video 2026-09-18 at 1.39.40 PM.mp4 | `/office/office-moment.mp4`, `/office/office-moment-poster.webp` |

Photos are WebP derivatives at their original 960 × 1280 resolution, quality 84. Orientation is normalized and metadata omitted. No generative retouching, color replacement, or changes to people, screens, or surroundings were made. Display crops use CSS object positioning; full photographs remain in the files.

The 1.67-second video is normalized to upright 576 × 1024 H.264 with fast-start metadata, with a silent web derivative and a poster from the actual clip. The original audio remains in the source file. The page labels the clip as silent and uses native controls, no autoplay, inline playback, and `preload="none"`.

## Placement

- Homepage: two real office photographs in the existing team section, above individual profiles.
- About: team discussion photo in the hero; the other four photos in the office gallery, alongside the optional short video. Earlier assets remain in the repository.
- Contact: team photograph and About link after the enquiry form, keeping the form's existing position.
- Data: all five photographs and the short office video in a dedicated `#data-team` section before the FAQs, with a link to About. This replaces the single enquiry-area photo. Generated format illustrations remain separate; the sample library stays empty.

The shared OfficePhoto component provides meaningful alt text, explicit aspect ratios, responsive image sizes, and per-photo focal positions. Only the About hero is preloaded; other photographs use Next.js lazy loading. Core design tokens, navigation, footer, and enquiry submission behavior are unchanged.

## Validation

- Targeted ESLint and the production webpack build passed, including TypeScript and all 97 generated pages. The existing native SWC warning continues to use the working WASM fallback.
- Homepage, About, Contact, and Data checked at 320, 390, 768, and 1440 pixels with no horizontal overflow.
- Photo crops visually reviewed on the homepage, About, Contact, and Data; the About gallery and video reviewed on mobile as well as desktop.
- The office video plays using native controls; no autoplay, no audio track, and no preload. Gallery images load successfully. No browser console errors observed.
- The data sample library still contains no images or sample cards.
