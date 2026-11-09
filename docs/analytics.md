# Avlys website analytics

Implementation updated 9 November 2026. PostHog is the existing website analytics
system. It initializes once from `instrumentation-client.ts`, before React
hydration, and tracks initial pageviews and subsequent Next.js route changes
through the History API. Do not add a second PostHog provider or a separate
pageview effect; that would duplicate events.

PostHog can report the booking and inquiry funnel. It does not automatically
replace Google Ads, Meta or OpenAI conversion tags and server integrations.
Those advertising integrations are separate work.

## Google Tag Manager

Container `GTM-TBTTLJPG` is installed once in the shared `app/layout.tsx` head,
so every route includes it. This uses Google's current manual-install snippet:
an asynchronous `gtm.js` loader and the `dataLayer` / `gtag('js', new Date())`
initializer. The root layout persists across client-side navigation. Do not add
another copy in individual pages, or a second standalone Google tag loader.

PostHog remains initialized by `instrumentation-client.ts`; do not install it
again through this GTM container. Installing the container does not itself
configure or verify GA4, Google Ads conversions, Meta pixels, consent settings,
or SPA pageview triggers. Those are managed and tested in the GTM workspace.
The site's existing PostHog events are not automatically forwarded to GTM.

For local verification, inspect the document head for exactly one external
`gtm.js?id=GTM-TBTTLJPG` script and one `google-tag-manager-init` script, then
repeat after an internal route change. Use Tag Assistant to validate published
container tags and conversion behavior after deployment. This code change is
local until the website is deployed; the live-site installation test will not
see it before then.

Reference: [Google's current web-container installation guide](https://support.google.com/tagmanager/answer/14847097).

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
Missing or example tokens leave analytics inactive. Booking and lead persistence
must continue to work when analytics is unavailable.

## Captured events

| Event | Trigger |
| --- | --- |
| `$pageview` | Initial page load and client route changes |
| `$pageleave` | Page exit/navigation lifecycle |
| `$autocapture` | Link and button clicks, with text and attributes masked |
| `cta_click` | Call CTA click, with CTA location and scheduler availability |
| `booking_opened` | CTA selected with a valid configured scheduler; navigation goes to `/book` |
| `call_request_opened` | CTA selected without a configured scheduler; navigation goes to the request fallback on `/book` |
| `booking_external_opened` | Direct scheduler link selected from `/book`; completion in that external page is not observed |
| `booking_confirmed` | Cal.com embed reports a booking UID, status `ACCEPTED`, and `paymentRequired: false` |
| `booking_requested` | Cal.com embed reports a booking UID and either `PENDING`, or `ACCEPTED` with payment still required |
| `booking_rescheduled` | Cal.com embed reports successful rescheduling; diagnostic only |
| `whatsapp_opened` | WhatsApp CTA clicked |
| `lead_submitted` | Browser receives a successful `/api/leads` response containing `ok: true` and `saved: true` after the database insert |
| `lead_saved` | Best-effort server telemetry scheduled after a successful database insert, subject to the analytics gates below |
| `launch_film_opened` | Launch film opened |

### Lead conversion semantics

The revised `lead_submitted` event means an acknowledged durable save, not email
delivery or an appointment. Before this implementation, the same event name
meant an inquiry was prepared in the visitor's email client. Historical events
must not be interpreted as saved leads. Record the production deployment time
and use it as the reporting boundary; the new browser event also carries
`delivery_method=website_form`.

`lead_saved` is a separate server-side observation of the save. Do not add its
count to `lead_submitted`: both can describe the same inquiry. Choose one event
as the funnel outcome and use the other to diagnose browser/server coverage.
Neither is a complete database ledger; blockers, consent choices, invalid
analytics IDs, network timeouts and other telemetry failures can reduce counts.
The `lead_submissions` table remains the operational record.

The form retains details on failure, exposes retry and an explicit email-draft
fallback, and avoids repeated submission while a request is in flight or after
success. Opening that email draft never emits a successful lead event. The API
does not provide a persistent idempotency key, so a retry after an ambiguous
network failure can still produce another database row.

### Booking conversion semantics

The implementation uses Cal.com's `bookingSuccessfulV2` embed callback.
`booking_confirmed` is a browser-reported accepted appointment with no payment
required, not a
signed webhook or independently verified backend booking. Unknown status,
missing UID or missing payment state does not produce a confirmed event.

Booking UID hashes are used locally to suppress repeated callbacks in memory
and, when available, tab session storage. Neither the UID nor its hash is sent
as a custom PostHog property. This is not cross-device deduplication. Reschedules
remain separate diagnostic events; cancellations and later acceptance of a
pending booking are not currently reconciled through webhooks.

When someone uses the direct booking-link fallback, only the outbound click is
observed. Their completion on the external site is not tracked by this website.
See [booking setup](booking-setup.md) for configuration and manual verification.

## Attribution and privacy boundaries

The five standard campaign labels (`utm_source`, `utm_medium`, `utm_campaign`,
`utm_content`, `utm_term`) are allowlisted. Values must contain 1–120 ASCII
letters, digits, spaces or `. _ ~ -`. Valid labels are kept in tab-scoped
`sessionStorage`, included in booking CTA/completion properties, and forwarded
to Cal.com. A new tagged visit replaces the stored label set. If storage is
blocked, only attribution currently available in the URL can be used.

This validation is not a personal-data detector. Campaign administrators must
never put names, emails, phone numbers, company names or project details in UTM
labels or other page URLs. The browser's normal pageview URL may also contain
query parameters. Ad click IDs such as `gclid`, `fbclid` and `oppref` are not
forwarded by this implementation, and campaign labels are not currently saved
with inquiry rows in Supabase.

The client sends `X-POSTHOG-DISTINCT-ID` only when PostHog is configured, has not
opted out, and its distinct ID has UUID syntax. The optional session header must
also have UUID syntax. The server revalidates those IDs, requires a configured
public ingestion token and HTTPS ingestion endpoint, and only includes a
known project type. It never derives an analytics identity from form fields,
email addresses or request metadata. Server telemetry runs through Next.js
`after()` with a two-second request timeout and cannot undo a saved lead.

This gate honors the SDK's existing opt-out state; it is not a standalone
consent manager. There is currently no sitewide consent banner or initial
opt-in gate in this implementation. PostHog initializes when configured, and
campaign session storage is accessed at initialization. If an opt-in policy is
required, apply it consistently to initialization, storage, browser events and
server context before release.

Events have `site=avlys-ai` and `environment=development` or `production`.
Use the environment property to exclude local development traffic from reports.
For live-site reports, also filter `$host=avlysai.com`: a local `next start`
production-build check uses `environment=production` with a local hostname.

Automatic interaction capture is restricted to link and button clicks. It does
not capture input/change events or clipboard contents. DOM text and attributes
are masked so inquiry contents and populated mailto links are not included.
The custom event properties do not intentionally include names, emails, phone
numbers, company names, free-text project descriptions, booking titles,
attendee information or meeting URLs. The UTM naming rule above still applies.
Session replay is disabled in code.

## Current setup limitations

- Gaurav's actual Cal.com event URL is configured locally, and the rebuilt
  `/book` embed has been verified. No test appointment has been submitted, so
  booking-completion telemetry and invitation delivery remain unverified.
- Local Supabase configuration is missing, so a real persisted lead has not
  been verified locally. The API returns a visible availability error when
  `SUPABASE_URL` or `SUPABASE_SERVICE_ROLE_KEY` is absent.
- A successful database save does not notify the sales team by email. There is
  no email-notification transport or CRM handoff in the current endpoint. Assign
  an owner to review saved records, or add and verify notification delivery.
- Server telemetry is best-effort; it has no durable queue or retry mechanism.

## Verification

1. Start the local server with the configured `.env.local`.
2. Open the homepage, then use the site's navigation to visit `/data`.
3. Check browser Network event requests to `https://us.i.posthog.com` and
   confirm that there is one `$pageview` for each route transition.
4. Click a call CTA and confirm `/book` opens, with `cta_click` and
   `call_request_opened` (or `booking_opened` when a scheduler is configured).
5. With a configured Cal.com event, complete a test booking. Confirm the
   accepted unpaid booking emits one `booking_confirmed`, pending approval
   emits `booking_requested`, and rescheduling is not another acquisition.
   Verify the calendar invitation and Meet link separately.
6. Use non-personal test UTMs and confirm they reach the embed and booking event
   after internal navigation. Test the external fallback and confirm it records
   only the outbound event.
7. With a configured Supabase test environment, submit an inquiry and verify
   the row, success response, browser `lead_submitted` and eligible server
   `lead_saved`. Do not sum the two events. Confirm failures retain form values
   and do not emit successful conversion events.
8. Test with PostHog unavailable and with the SDK opted out. Lead persistence
   must still succeed; opted-out clients must omit server analytics headers.
   Confirm invalid/non-UUID identifiers do not produce server telemetry.
9. In PostHog's activity view, find the same events. For live reporting, filter
   both `environment=production` and `$host=avlysai.com`.

Suggested funnel: campaign landing `$pageview` → `booking_opened` →
`booking_confirmed`. Track inquiry saves as a separate funnel. Attended calls,
qualified opportunities and signed projects require additional operational data.

References: [PostHog Next.js integration](https://posthog.com/docs/libraries/next-js),
[JavaScript SDK configuration](https://posthog.com/docs/libraries/js/config),
and [SPA pageviews](https://posthog.com/tutorials/single-page-app-pageviews).
