# Cal.com booking setup

Implementation notes, 9 November 2026. The website contains a `/book` route,
Cal.com's React embed and PostHog booking events. The local environment now uses
Gaurav's observed public event URL:
`https://cal.com/gaurav-purohit-0ykosd/30min`. The public page and rebuilt local
website embed both load successfully. Without a valid configured URL, the page offers
a request/contact fallback rather than an available calendar.

## Selected setup and verified account settings

The user selected hosted Cal.com Individual Free with one host:

- Host: Gaurav (`gaurav@avlysai.com`).
- Current event: **Discovery Call**, 30 minutes. The former title was
  **30 min meeting**; the public URL still ends in `/30min`.
- Calendar and meeting location: Gaurav's Google Workspace Calendar and
  Google Meet.
- Required booking fields: name, email, phone number, **Company details**
  (short text), and **Product / project details** (long text, replacing the
  previous notes question).
- Dedicated availability schedule: **Discovery Calls**, ID `2617032`, saved
  with Monday–Saturday, **10:00–22:00**, and Sunday off. This is not the account's
  default schedule. The event's Availability settings confirm this schedule is
  assigned, the timezone is `Asia/Kolkata`, and the event has been saved.

Cal.com onboarding is complete. The 30-minute event editor confirms **Google
Meet** as its location and `gaurav@avlysai.com` as the destination calendar.
Google Meet is also the account's default conferencing tool. In the event's
**Basics** settings, **Add to calendar** uses Gaurav's default calendar. In
**Availability**, the **Check for conflicts** switch for `gaurav@avlysai.com` is
on and disabled because bookings are added to that same calendar. These are
verified settings, not an end-to-end booking test.

The public URL was observed in Cal.com's event list and configured locally.
The refreshed public page confirms **Discovery Call**, Gaurav/Avlys AI,
30 minutes and Google Meet. Its visitor timezone displays `Asia/Calcutta`
(Indian Standard Time), matching the schedule's `Asia/Kolkata` timezone.

Visitor-side checks on 9 November 2026 found 24 available half-hour start times
for Saturday, 14 November, from **10:00** to **21:30 IST**; the last call ends at
22:00. Sunday, 15 November returned no available slots. Opening the Saturday
10:00 booking form, without submitting it, confirmed all five fields are
required: name, email, phone number, Company details and Product / project
details.

The website's local production rebuild passed, including TypeScript and all 102
generated pages. On the rebuilt preview, homepage CTAs say **Book a discovery
call** and open `/book`; its loaded embed shows Gaurav's Discovery Call, Google
Meet, 30 minutes, IST, Saturday availability and Sunday closure. The loading
message clears when the calendar is ready. The direct public booking link also
points to the configured event.
No test meeting has been created, so Google Calendar event creation, invitation
delivery, actual Meet-link creation and busy-slot conflict checking are not yet
end-to-end verified. No paid plan or additional host is part of this setup.

### Google Calendar synchronization limits

Cal.com checks selected Google calendars for busy times and writes new bookings
to the selected destination calendar. These are separate settings:
[calendars and conferencing](https://cal.com/help/my-account/calendars-and-conferencing).

This is not a guarantee that every edit made directly in Google Calendar is
mirrored back into the Cal.com booking. Cal.com's
[official FAQ](https://cal.com/faq) states that canceling an event in an external
calendar does not automatically remove the Cal.com booking; declining through
Gmail's attendance buttons also does not cancel or change it. Deleting the
Google event alone must not be treated as canceling the Cal.com booking. The
documentation does not establish that directly changing a Google event's time
reschedules the Cal.com booking.

Reschedule or cancel through Cal.com's **Bookings** page or the links in the
booking confirmation, then verify the resulting Google Calendar event:
[manage a booking](https://cal.com/help/bookings/manage-a-booking). Existing
Cal.com bookings can independently block availability even if an external
calendar event has been removed:
[troubleshoot availability](https://cal.com/help/availabilities/troubleshoot-your-availability).

## Hosting arrangement

The supported setup is the Avlys Next.js website and booking page hosted on
Vercel, with the scheduling service hosted by Cal.com. Google Workspace provides
the host's Google Calendar and Google Meet account. This code does not deploy
or self-host Cal.com on Vercel.

Using hosted Cal.com avoids maintaining a separate scheduling application,
database, OAuth credentials and background jobs. If self-hosting is selected
later, revisit the origin/configuration and account integration requirements;
the current embed explicitly uses `https://app.cal.com`.

## Set up the event and Workspace connection

1. Sign into Gaurav's Cal.com account using `gaurav@avlysai.com` and keep the
   Individual Free plan. Configure the public profile and timezone
   (`Asia/Kolkata`).
2. Connect that person's Google Workspace account through Cal.com's calendar
   connection flow. A Workspace administrator may need to allow the app under
   the organization's access policy. Do not place Google credentials in the
   website repository.
3. Select all calendars that should prevent double booking, and choose the
   business calendar where new appointments will be written. Conflict calendars
   and the destination calendar are distinct settings.
4. Enable Google Meet as the meeting location and verify which Google account
   will create meeting links.
5. Use **Discovery Call**, the free, 30-minute event at the existing `/30min`
   URL. The assigned **Discovery Calls** schedule is verified with
   Monday–Saturday, 10:00–22:00 in `Asia/Kolkata`, and Sunday off. Review
   meeting buffers, minimum notice and the booking horizon. An auto-confirmed event
   matches the simplest current booking-conversion path. If host approval is
   required, the website records a request until the embed reports acceptance;
   later approval is not reconciled through a webhook.
6. The saved booking form requires name, email, phone number, **Company
   details** (short text), and **Product / project details** (long text).
   Configure reminder/cancellation/rescheduling options available to the
   account, then review the public page as a visitor.
7. Use the observed public event URL,
   `https://cal.com/gaurav-purohit-0ykosd/30min`. A profile-only Cal.com URL does
   not identify an event and is rejected by the website configuration.

References: [Cal.com calendars and conferencing](https://cal.com/help/my-account/calendars-and-conferencing),
[Cal.com embedding](https://cal.com/embed),
[Cal.com embed events](https://cal.com/help/embedding/embed-events).

## Configure the website locally

The actual public event URL is configured in `.env.local`:

```dotenv
NEXT_PUBLIC_BOOKING_URL=https://cal.com/gaurav-purohit-0ykosd/30min
```

This is a public URL, not a Cal.com API key. The implementation accepts HTTPS
URLs without embedded credentials. Standard event URLs on `cal.com`,
`www.cal.com` and `app.cal.com` activate the Cal.com embed. Other valid HTTPS
scheduler URLs produce an external-link experience, without completion tracking.

Restart the development server after changing the variable. All shared call
CTAs navigate to `/book`; they say “Book a discovery call” when a valid scheduler
is configured and “Request a call” otherwise. The page retains a direct booking
link and a contact-form alternative if the iframe is blocked or slow.

Keep the existing PostHog variables:

```dotenv
NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN=your_public_project_token
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

Use the project's public ingestion token, never a personal API key. See
[analytics configuration and event definitions](analytics.md).

## Vercel configuration

After local verification, set `NEXT_PUBLIC_BOOKING_URL` and the existing PostHog
variables in the intended Vercel environment. Configure Preview and Production
deliberately; do not assume a value set in one applies to the other.

Public environment values are embedded in the Next.js browser bundle at build
time. Changing them requires a new build/deployment; changing the dashboard
value alone does not update an existing deployment. Check the generated preview
before promoting the intended production version.

The inquiry fallback separately requires server-only `SUPABASE_URL` and
`SUPABASE_SERVICE_ROLE_KEY`, plus a compatible `lead_submissions` table accepting
`name`, `email`, `phone`, `company`, `message` and `source`. Do not prefix the
service-role key with `NEXT_PUBLIC_`. These Supabase values are missing locally,
so real inquiry persistence has not been verified. A saved row also does not
send a sales email: no notification transport is implemented yet.

## Measurement behavior and limits

- Booking CTA and outbound-link events measure intent. An external scheduler
  page does not report its completion back to the Avlys website.
- The embed uses `bookingSuccessfulV2`. A UID with `ACCEPTED` and
  `paymentRequired: false` produces `booking_confirmed`. Pending or
  accepted-but-payment-required responses produce `booking_requested`. Other
  or incomplete states do not become confirmed bookings.
- UID hashes are used only for local callback deduplication. PostHog receives
  provider, confirmation source, event type and allowed campaign labels, not
  names, emails, titles, attendee data or meeting links.
- These are embed callbacks, not signed webhook verification. Cancellations,
  later approval and cross-device duplicates need a future backend integration.
- The five standard UTM labels can pass through internal navigation into the
  embed. Their character allowlist is not a personal-data filter: never use
  personal or confidential information in campaign labels or page URLs.
- Existing SDK opt-out behavior is honored for telemetry; this implementation
  does not add a sitewide consent banner or initial opt-in gate. Review consent
  behavior for the analytics SDK, campaign storage and third-party scheduler
  together if adopting an opt-in policy.
- PostHog reporting does not automatically configure Google, Meta or ChatGPT
  advertising conversion tracking.

## Manual acceptance checks

1. Without an event URL, verify that `/book` shows the request fallback and
   does not pretend that a time has been reserved.
2. With the actual event URL, inspect `/book` on desktop and mobile. Confirm
   the intended host, event duration, timezone and available slots.
3. Visit a test URL with non-personal labels, for example
   `/?utm_source=meta&utm_medium=paid_social&utm_campaign=software_test`, then
   navigate through the shared CTA. Confirm the labels survive into the embed
   and the recorded booking event.
4. Make a genuine test booking in a test/approved slot. Verify exactly one
   expected completion event, confirmation email, destination-calendar event
   and working Meet link. Do not infer those outcomes from the CTA click.
5. Verify a busy calendar slot cannot be booked. Check a visitor in another
   timezone sees the correct local time and the invitation matches.
6. Test a pending-approval event if that mode will be used. It must appear as a
   request rather than a confirmed appointment.
7. Reschedule and cancel the test booking. Verify the scheduler's emails and
   calendar behavior; the website currently reports rescheduling only and does
   not reconcile cancellations.
8. Block or delay the embed. Confirm the direct booking link and contact
   alternative remain usable. Only `booking_external_opened` is expected when
   following the direct link; its external completion is not observed.
9. Test with blocked session storage and analytics unavailable or opted out.
   Booking must still work; attribution may be reduced and analytics events may
   be absent. Inspect event properties for accidental personal information.
10. After configuring a Supabase test environment, submit an inquiry and
    verify the actual database row and visible success. Confirm errors preserve
    entered details and show retry/email options. Check who will review new
    rows until notification delivery is added.
11. Repeat the key checks against the Vercel preview after environment changes
    and a rebuild. Production readiness requires the actual event/account and
    backend checks; unit tests or a sample event URL do not establish it.
# Local verification — 9 November 2026

The implementation passed 28 isolated booking/lead tests, lint for all 27 changed application files, TypeScript checking, and a complete production build with `next build --webpack` (102 generated pages). The local Windows native SWC binding is unavailable, so the default Turbopack build cannot run here; Webpack with the existing WASM fallback succeeds. The build needs network access for the existing Google Fonts.

Browser checks confirmed the desktop homepage, CTA navigation to `/book`, the unconfigured booking fallback to `/contact#project-form`, and retained form input with a clear failure message when local lead storage is unconfigured. End-to-end booking submission, saved leads, and the mobile booking flow still need verification.

After configuring the actual public booking URL, a second production Webpack
build passed with TypeScript and 102 generated pages. The restarted preview at
`http://127.0.0.1:3010/book` was checked in the browser: the configured CTA and
Cal.com embed both work, displaying the saved Discovery Call and availability.
This verifies loading and configuration, not submission, Google event creation
or booking-completion analytics.
