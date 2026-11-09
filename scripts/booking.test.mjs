import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { runInNewContext } from "node:vm";
import ts from "typescript";

// Exercise the production helpers with isolated browser/storage fakes.
// No scheduler, analytics endpoint, credentials, or real bookings are used.
function compile(relativePath) {
  return ts.transpileModule(
    readFileSync(new URL(relativePath, import.meta.url), "utf8"),
    { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } },
  ).outputText;
}

const bookingExports = {};
runInNewContext(compile("../app/lib/booking.ts"), {
  exports: bookingExports,
  URL,
  URLSearchParams,
});
const { getBookingDestination, readCampaignAttribution, withCampaignAttribution, bookingOutcome } = bookingExports;
const attributionCompiled = compile("../app/lib/campaign-attribution.ts");

function loadAttribution({ search = "", stored = "", failRead = false, failWrite = false, browser = true } = {}) {
  const exports = {};
  const writes = [];
  const storage = new Map(stored ? [["avlys-campaign", stored]] : []);
  const window = {
    location: { search },
    sessionStorage: {
      getItem(key) {
        if (failRead) throw new Error("Storage access denied");
        return storage.get(key) ?? null;
      },
      setItem(key, value) {
        if (failWrite) throw new Error("Storage quota exceeded");
        writes.push({ key, value });
        storage.set(key, value);
      },
    },
  };
  runInNewContext(attributionCompiled, {
    exports,
    URLSearchParams,
    ...(browser ? { window } : {}),
    require(name) {
      if (name === "./booking") return bookingExports;
      throw new Error(`Unexpected dependency: ${name}`);
    },
  });
  return { get: exports.getCampaignAttribution, window, writes, storage };
}

test("missing, malformed, non-HTTPS and credential-bearing booking URLs are disabled", () => {
  for (const value of [
    undefined, null, "", "  ", "not-a-url", "/book", "//cal.com/team/discovery",
    "http://cal.com/team/discovery", "javascript:alert(1)", "data:text/plain,booking",
    "https://user:password@cal.com/team/discovery", "https://person@calendar.example.invalid/event",
  ]) {
    assert.equal(getBookingDestination(value), null, `Unexpectedly accepted ${String(value)}`);
  }
});

test("Cal.com requires an event path rather than a profile or homepage", () => {
  for (const value of ["https://cal.com", "https://cal.com/", "https://cal.com/team", "https://cal.com/team/"]) {
    assert.equal(getBookingDestination(value), null, value);
  }
});

test("hosted Cal.com event URLs retain query settings and expose the embeddable event path", () => {
  for (const host of ["cal.com", "www.cal.com", "app.cal.com"]) {
    const destination = getBookingDestination(`  https://${host}/avlys/discovery/?layout=month_view#booking  `);
    assert.deepEqual({ ...destination, calConfig: { ...destination.calConfig } }, {
      url: `https://${host}/avlys/discovery/?layout=month_view`,
      calLink: "avlys/discovery",
      calConfig: { layout: "month_view" },
    });
  }
});

test("other HTTPS schedulers use direct-link fallback and cannot masquerade as the Cal.com embed", () => {
  for (const host of ["calendar.example.invalid", "cal.com.example.invalid"]) {
    const destination = getBookingDestination(`https://${host}/team/consultation?duration=45#details`);
    assert.ok(destination.calConfig);
    assert.deepEqual({ ...destination, calConfig: { ...destination.calConfig } }, {
      url: `https://${host}/team/consultation?duration=45`,
      calLink: null,
      calConfig: {},
    });
  }
});

test("Cal.com duration and timezone options survive in both embed configuration and direct fallback", () => {
  const destination = getBookingDestination(
    "https://cal.com/avlys/discovery?duration=45&cal.timezone=Asia%2FKolkata&layout=week_view&theme=dark",
  );
  assert.deepEqual({ ...destination.calConfig }, {
    duration: "45",
    "cal.timezone": "Asia/Kolkata",
    layout: "week_view",
    theme: "dark",
  });
  const fallback = new URL(withCampaignAttribution(destination.url, { utm_source: "meta" }));
  for (const [key, value] of Object.entries(destination.calConfig)) {
    assert.equal(fallback.searchParams.get(key), value, `Fallback changed scheduler option ${key}`);
  }
  assert.equal(fallback.searchParams.get("utm_source"), "meta");
});

test("a Cal.com link without query settings exposes an empty embed configuration", () => {
  const destination = getBookingDestination("https://cal.com/avlys/discovery");
  assert.ok(destination.calConfig);
  assert.deepEqual({ ...destination.calConfig }, {});
});

test("attribution accepts bounded campaign labels and excludes arbitrary query parameters", () => {
  const attribution = readCampaignAttribution(
    "?utm_source=meta&utm_medium=paid_social&utm_campaign=India.2026-11&utm_content=creative_2~a&utm_term=enterprise+software&email=person%40example.invalid&phone=123456789&project=private&gclid=click-id",
  );
  assert.deepEqual({ ...attribution }, {
    utm_source: "meta",
    utm_medium: "paid_social",
    utm_campaign: "India.2026-11",
    utm_content: "creative_2~a",
    utm_term: "enterprise software",
  });
});

test("attribution drops email-shaped, URL-shaped, control-character and oversized values", () => {
  const query = new URLSearchParams({
    utm_source: "person@example.invalid",
    utm_medium: "https://private.example.invalid",
    utm_campaign: "campaign\nprivate",
    utm_content: "x".repeat(121),
    utm_term: "   ",
  });
  assert.deepEqual({ ...readCampaignAttribution(query.toString()) }, {});
  assert.deepEqual({ ...readCampaignAttribution("?utm_source=%20google%20&utm_content=" + "a".repeat(120)) }, {
    utm_source: "google",
    utm_content: "a".repeat(120),
  });
});

test("booking handoff preserves scheduler settings and forwards only allowlisted campaign keys", () => {
  const attribution = readCampaignAttribution("?utm_source=chatgpt&utm_campaign=india_builds&email=person%40example.invalid");
  const result = new URL(withCampaignAttribution("https://cal.com/avlys/discovery?layout=month_view&utm_source=old", {
    ...attribution,
    project: "Private inquiry",
  }));
  assert.equal(result.origin, "https://cal.com");
  assert.equal(result.pathname, "/avlys/discovery");
  assert.equal(result.searchParams.get("layout"), "month_view");
  assert.equal(result.searchParams.get("utm_source"), "chatgpt");
  assert.equal(result.searchParams.getAll("utm_source").length, 1);
  assert.equal(result.searchParams.get("utm_campaign"), "india_builds");
  assert.equal(result.searchParams.has("email"), false);
  assert.equal(result.searchParams.has("project"), false);
});

test("only an identified accepted booking with no required payment counts as confirmed", () => {
  assert.equal(bookingOutcome({ uid: "booking-test-1", status: "ACCEPTED", paymentRequired: false }), "booking_confirmed");
  assert.equal(bookingOutcome({ uid: "booking-test-2", status: "accepted", paymentRequired: false }), "booking_confirmed");
  assert.equal(bookingOutcome({ status: "ACCEPTED", paymentRequired: false }), null);
  assert.equal(bookingOutcome({ uid: "", status: "ACCEPTED", paymentRequired: false }), null);
  assert.equal(bookingOutcome({ uid: "booking-test-3", status: "ACCEPTED" }), null);
});

test("pending or payment-required bookings remain requests rather than confirmed conversions", () => {
  for (const payload of [
    { uid: "pending-1", status: "PENDING", paymentRequired: false },
    { uid: "pending-2", status: "pending" },
    { uid: "paid-1", status: "ACCEPTED", paymentRequired: true },
  ]) {
    assert.equal(bookingOutcome(payload), "booking_requested");
  }
});

test("rejected, cancelled and unknown outcomes never create acquisition events", () => {
  for (const status of ["REJECTED", "CANCELLED", "unknown", "", undefined]) {
    for (const paymentRequired of [true, false, undefined]) {
      assert.equal(bookingOutcome({ uid: "not-confirmed", status, paymentRequired }), null);
    }
  }
});

test("campaign context survives internal navigation within the same session", () => {
  const attribution = loadAttribution({ search: "?utm_source=meta&utm_campaign=india_launch&email=private%40example.invalid" });
  assert.deepEqual({ ...attribution.get() }, { utm_source: "meta", utm_campaign: "india_launch" });
  assert.deepEqual(attribution.writes, [{ key: "avlys-campaign", value: "utm_source=meta&utm_campaign=india_launch" }]);
  attribution.window.location.search = "?layout=month_view";
  assert.deepEqual({ ...attribution.get() }, { utm_source: "meta", utm_campaign: "india_launch" });
  assert.equal(attribution.writes.length, 1);
});

test("a new campaign replaces prior session attribution without mixing campaign fields", () => {
  const attribution = loadAttribution({
    stored: "utm_source=meta&utm_campaign=previous&utm_content=old_creative",
    search: "?utm_source=google&utm_campaign=new",
  });
  assert.deepEqual({ ...attribution.get() }, { utm_source: "google", utm_campaign: "new" });
  attribution.window.location.search = "";
  assert.deepEqual({ ...attribution.get() }, { utm_source: "google", utm_campaign: "new" });
});

test("stored attribution is filtered again before reuse", () => {
  const attribution = loadAttribution({ stored: "utm_source=chatgpt&utm_campaign=person%40example.invalid&email=private%40example.invalid&unexpected=1" });
  assert.deepEqual({ ...attribution.get() }, { utm_source: "chatgpt" });
  assert.equal(attribution.writes.length, 0);
});

test("storage failures cannot interrupt the booking journey", () => {
  const writeFailure = loadAttribution({ search: "?utm_source=google", failWrite: true });
  assert.deepEqual({ ...writeFailure.get() }, { utm_source: "google" });
  const readFailure = loadAttribution({ failRead: true });
  assert.deepEqual({ ...readFailure.get() }, {});
});

test("server rendering and a fresh browser session have no inherited attribution", () => {
  assert.deepEqual({ ...loadAttribution({ browser: false }).get() }, {});
  assert.deepEqual({ ...loadAttribution().get() }, {});
});
