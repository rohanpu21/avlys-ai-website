# Avlys website analytics

PostHog runs once per browser page load from the root
`instrumentation-client.ts`, before React hydration. It tracks initial pageviews
and subsequent Next.js route changes through the History API. Do not add a
second PostHog provider or a separate pageview effect; that would duplicate events.

## Configuration

Copy `.env.example` to `.env.local` and replace the placeholder token with the
public ingestion token from the connected PostHog project's settings:

```dotenv
NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN=your_public_project_token
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

The connected project is project `400878` in PostHog US Cloud. Use its public
project token, never a personal API key. The original
`NEXT_PUBLIC_POSTHOG_TOKEN` variable remains supported as a fallback; the new
`NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` variable takes precedence.

Set the same values in the appropriate Vercel environments. Restart the local
server after changing them. Production and preview deployments need a new
build because Next.js embeds `NEXT_PUBLIC_*` values into the browser bundle.
Missing or example tokens leave analytics inactive.

## Captured events

| Event | Trigger |
| --- | --- |
| `$pageview` | Initial page load and client route changes |
| `$pageleave` | Page exit/navigation lifecycle |
| `$autocapture` | Link and button clicks, with text and attributes masked |
| `cta_click` | Call CTA click, with CTA location and scheduler availability |
| `booking_opened` | Configured booking link opened |
| `call_request_opened` | Contact form opened from a call CTA |
| `whatsapp_opened` | WhatsApp CTA clicked |
| `lead_submitted` | Inquiry prepared, with project type and whether company is present |
| `launch_film_opened` | Launch film opened |

`lead_submitted` means an inquiry was prepared in the visitor's email client;
it does not confirm email delivery or a completed booking.

Events have `site=avlys-ai` and `environment=development` or `production`.
Use the environment property to exclude local development traffic from reports.
For live-site reports, also filter `$host=avlysai.com`: a local `next start`
production-build check uses `environment=production` with a local hostname.

Automatic interaction capture is restricted to link and button clicks. It does
not capture input/change events or clipboard contents. DOM text and attributes
are masked so inquiry contents and populated mailto links are not included.
The existing custom events do not send names, emails, phone numbers, company
names, or free-text project descriptions. Session replay is disabled in code.

## Verification

1. Start the local server with the configured `.env.local`.
2. Open the homepage, then use the site's navigation to visit `/data`.
3. Check browser Network event requests to `https://us.i.posthog.com` and
   confirm that there is one `$pageview` for each route transition.
4. Click a call CTA and confirm `cta_click` and `call_request_opened` (or
   `booking_opened` if a scheduler is configured).
5. In PostHog's activity view, find the same events. Filter
   `environment=production` when reviewing live website traffic.

References: [PostHog Next.js integration](https://posthog.com/docs/libraries/next-js),
[JavaScript SDK configuration](https://posthog.com/docs/libraries/js/config),
and [SPA pageviews](https://posthog.com/tutorials/single-page-app-pageviews).
