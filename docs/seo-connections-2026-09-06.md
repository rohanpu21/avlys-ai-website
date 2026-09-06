# SEO, hosting and CMS connection review

Checked 6 September 2026.

## Chrome follow-up

Homepage recrawl requested successfully on 6 September 2026. Search Console displayed **Indexing requested** and confirmed that the URL was added to a priority crawl queue. This confirms submission, not completion of recrawling or a refreshed Google Search favicon.

Chrome is authenticated to Vercel under `rohanpu21s-projects`. Its project listing associates `avlysai.com` with the favicon-fix production deployment. Chrome also exposes the verified `sc-domain:avlysai.com` Search Console property under the AVLYS Google account. The earlier setup screen belonged to a different Google account; no new DNS record or website tag is needed to use the existing verified property. The homepage URL Inspection reports that the page is indexed. Earlier unauthenticated findings below describe the initial in-app browser session, not the current Chrome access.

## Repository and deployment

- GitHub access authenticated successfully as `rohanpu21`.
- Local origin: `https://github.com/rohanpu21/avlys-ai-website.git`.
- Local HEAD matches the latest GitHub commit inspected: `d837c828a9d2046c9dd38b24c73f5eeb906497c7`.
- Recent changes: August training-data service addition; September 3 brand/favicon updates, portfolio cleanup and team bios; sitemap/robots updates; enlarged favicon revision with `v=3`.
- Live homepage returned HTTP 200 with Vercel hosting headers and the `v=3` icon metadata.
- Vercel management access is not authenticated in the available browser. No Vercel connector, CLI executable, relevant environment variable or CLI auth file was found in the checked locations. Production deployment details and environment settings therefore remain unverified.

## Favicon finding

The screenshot shows a black circle in Google Search. The checked local `app/icon.png` and `public/favicon-32x32.png` show the Avlys white-and-blue mark. Production HTML points at the updated icon assets, but this alone does not prove which binary Google last fetched.

Google's [favicon guidance](https://developers.google.com/search/docs/appearance/favicon-in-search) says recrawling may take days to weeks and recommends a stable URL and a square image larger than 48 pixels. A stale Google copy is a plausible explanation, not a proven diagnosis. Avoid repeatedly incrementing query-string versions. The existing 192px and 512px icons are appropriate candidates; confirm the live assets and request homepage indexing after property verification. Google controls the eventual search-result refresh.

## OpenSEO download

- Downloaded repository: `https://github.com/every-app/open-seo`.
- Local directory: `C:/avlys website/.tools/open-seo`.
- Revision: `3632f408528cd588fec98c3a174af8ea0ad205e8`.
- Excluded the checkout from the website's Git tracking, TypeScript and ESLint scans so this independent application's sources do not enter the website build.
- Download is complete. Dependencies, database and application runtime have not been initialized; paid API calls have not been made.
- This is a separate SEO operations application, not a CMS or a component to add to the public homepage.

Follow the downloaded `docs/LOCAL_DEVELOPMENT.md`: use its pinned `pnpm@10.30.1`, install with the frozen lockfile, apply local database migrations and configure `.env.local`. Keep local no-auth mode restricted to local development. Use the project's supported authenticated hosting configuration for a shared deployment.

## Account connections still needed

| System | Purpose | State / requirement |
| --- | --- | --- |
| Vercel | Inspect and release the website | Sign in to the browser tab opened during this review |
| Search Console | Clicks, impressions, queries, index inspection and sitemap submission | Google is signed in; `avlysai.com` domain setup reached DNS verification. The TXT record is visible in the open Search Console tab; it has not been installed or verified |
| Google Cloud OAuth | Let OpenSEO read Search Console | Enable Search Console API; create a Web application OAuth client; configure exact callback `<OpenSEO origin>/api/gsc/oauth/callback`; set `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, and `BETTER_AUTH_SECRET` of at least 32 characters in OpenSEO. Then authorize the verified property |
| DataForSEO | Keyword/SERP data, competitor research and rank tracking | API credentials and a spending budget are needed. OpenSEO expects `DATAFORSEO_API_KEY` as base64 of `login:password`; base64 is not encryption |
| PageSpeed Insights | Page performance diagnostics | Use on key landing pages; API access is separate from Search Console. Do not treat performance scores as ranking guarantees |
| CMS | Edit and publish original content | Current blog content is stored in `app/data/blog.ts`; no live CMS integration was found |

Search Console OAuth is described in the downloaded `docs/SELF_HOSTING_GOOGLE_SEARCH_CONSOLE.md` and Google's [authorization documentation](https://developers.google.com/webmaster-tools/v1/how-tos/authorizing). Store credentials in local ignored environment files or deployment secret settings, never in public browser code or this report.

The domain verification screen detected GoDaddy and also offers manual TXT verification. Do not authorize broad DNS access solely to add one record. Once the owner adds the displayed TXT record, finish verification, submit `https://avlysai.com/sitemap.xml`, inspect the homepage, and request indexing. An OpenSEO API connection alone does not establish domain ownership.

## CMS recommendation: Sanity

Use Sanity for Avlys's editorial content while keeping the existing Next.js site on Vercel. Its documented [Next.js App Router visual editing](https://www.sanity.io/docs/visual-editing/visual-editing-with-next-js-app-router) and [live content integration](https://www.sanity.io/docs/developer-guides/live-content-guide) fit an editor-managed marketing site with articles and service pages.

Start with article, author, service and site-settings content types. Article fields should include title, slug, summary, body, author, publication/update dates, sources, SEO title, description and share image. Require original content and editorial review. Derive canonical URLs from the site's trusted origin and slug; keep draft content out of public queries and the sitemap.

Before migration, create or choose a Sanity project and dataset under the owner's account. Configure preview and published-content access, migrate existing articles while preserving slugs and dates, and verify links, metadata and sitemap behavior. Keep current content working until migration is tested. Plan and usage costs should be reviewed in the account before choosing paid features. No Sanity project or subscription was created in this review.

Keep PostHog for conversion analytics, since it is already wired in the code. Search Console answers search visibility questions; PostHog answers what visitors do afterward. Add GA4 only if its reporting or integrations are needed, rather than duplicating tracking by default.
