# Instagram carousel

Added to the homepage after TeamPreview and to the existing About studio section.
Both instances use `app/components/StudioReels.tsx` and `app/data/studio.ts`.

- Seven user-provided reel shortcodes, in supplied order; tracking parameters removed.
- Local cover images in `public/studio/reels/` were retrieved from each reel's public `/embed/` page on 2026-09-06. These are original post covers, not generated replacements.
- Carousel advances one card every 6 seconds while visible. It pauses on mouse hover, keyboard focus, touch/manual navigation, and when a player opens. Manual interaction stays paused until Resume rotation is selected.
- Respects reduced motion, pauses rotation in background tabs, supports horizontal touch scrolling and previous/next wrapping.
- Instagram iframes load only after a visitor selects a cover. A direct source link remains available if Instagram requires sign-in, restricts embedding, or the post becomes unavailable. Only one player can be open per carousel.
- Neutral numbered labels are intentional: reel transcripts/captions have not been verified. No client outcomes or video descriptions were inferred from covers.
- Composio/Apify tools were not exposed in this session; no connected account was accessed and no Apify actor was run. There is no scheduled scraping or auto-sync integration.

Reels:

1. https://www.instagram.com/reel/DXtY5KHIH-x/
2. https://www.instagram.com/reel/DbqglsHoDCn/
3. https://www.instagram.com/reel/DbvcOzxvw2q/
4. https://www.instagram.com/reel/Db1bt9ayoZB/
5. https://www.instagram.com/reel/Db5GgxAvHPl/
6. https://www.instagram.com/reel/Db8CVcvzIEb/
7. https://www.instagram.com/reel/Db-bheeosCB/

QA: both routes, all seven links and local covers, 320/390/768/1440px overflow checks, next/previous wrapping, timed rotation, pause/resume, reduced-motion behavior, iframe creation, blocked-embed fallback, close and focus restoration. Actual Instagram video playback is controlled by Instagram and is not guaranteed by these tests.
