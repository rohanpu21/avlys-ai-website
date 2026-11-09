import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { runInNewContext } from "node:vm";
import ts from "typescript";

// Exercise the real route handler with isolated environment and database fakes.
// No credentials, network requests or real lead records are used by these tests.
const source = readFileSync(new URL("../app/api/leads/route.ts", import.meta.url), "utf8");
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;

function loadRoute({ configured = true, insert = async () => ({ error: null }), afterThrows = false } = {}) {
  const exports = {};
  const writes = [];
  const logs = [];
  const afterTasks = [];
  const analytics = [];
  runInNewContext(compiled, {
    exports,
    process: { env: configured ? { SUPABASE_URL: "https://example.invalid", SUPABASE_SERVICE_ROLE_KEY: "test-only" } : {} },
    console: { error: (...args) => logs.push(args) },
    require(name) {
      if (name === "next/server") return {
        NextResponse: { json: (body, init) => Response.json(body, init) },
        after: (callback) => {
          if (afterThrows) throw new Error("Test scheduling failure");
          afterTasks.push(callback);
        },
      };
      if (name === "../../lib/analytics-server") return {
        captureSavedLead: async (request, projectType) => analytics.push({ request, projectType }),
      };
      if (name === "@supabase/supabase-js") return {
        createClient: () => ({
          from: (table) => ({ insert: (rows) => {
            writes.push({ table, rows });
            return insert(rows);
          } }),
        }),
      };
      throw new Error(`Unexpected dependency: ${name}`);
    },
  });
  return { post: exports.POST, writes, logs, afterTasks, analytics };
}

const validLead = {
  name: " Example Person ",
  email: "person@example.invalid",
  company: "Example company",
  phone: "",
  projectType: "Custom software build",
  message: "A test inquiry that is never sent to a real database.",
  website: "",
  source: "website",
};

function request(body) {
  return new Request("https://example.invalid/api/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-forwarded-for": "192.0.2.1" },
    body: JSON.stringify(body),
  });
}

test("successful response waits for the database acknowledgement", async () => {
  let acknowledge;
  const pending = new Promise((resolve) => { acknowledge = resolve; });
  const route = loadRoute({ insert: () => pending });
  let responded = false;
  const responsePromise = route.post(request(validLead)).then((response) => {
    responded = true;
    return response;
  });
  await new Promise((resolve) => setImmediate(resolve));
  assert.equal(responded, false);
  assert.equal(route.writes.length, 1);
  assert.equal(route.writes[0].table, "lead_submissions");
  assert.equal(route.writes[0].rows[0].name, "Example Person");
  assert.equal(route.afterTasks.length, 0);
  acknowledge({ error: null });
  const response = await responsePromise;
  assert.equal(response.status, 201);
  assert.deepEqual(await response.json(), { ok: true, saved: true });
  assert.equal(route.analytics.length, 0);
  assert.equal(route.afterTasks.length, 1);
  await route.afterTasks[0]();
  assert.equal(route.analytics.length, 1);
  assert.equal(route.analytics[0].projectType, validLead.projectType);
});

test("database rejection is not acknowledged as saved or logged with inquiry text", async () => {
  const route = loadRoute({ insert: async () => ({ error: { code: "TEST_FAILURE", message: "private inquiry text" } }) });
  const response = await route.post(request(validLead));
  assert.equal(response.status, 503);
  assert.notEqual((await response.json()).saved, true);
  assert.equal(JSON.stringify(route.logs).includes("private inquiry text"), false);
  assert.equal(route.afterTasks.length, 0);
});

test("missing configuration returns a recoverable failure without writing", async () => {
  const route = loadRoute({ configured: false });
  const response = await route.post(request(validLead));
  assert.equal(response.status, 503);
  assert.match((await response.json()).error, /email/);
  assert.equal(route.writes.length, 0);
  assert.equal(route.afterTasks.length, 0);
});

test("malformed JSON and non-object or non-string fields are rejected", async () => {
  const route = loadRoute();
  const malformed = new Request("https://example.invalid/api/leads", { method: "POST", body: "{" });
  assert.equal((await route.post(malformed)).status, 400);
  for (const payload of [null, [], { ...validLead, name: 17 }, { ...validLead, company: {} }]) {
    assert.equal((await route.post(request(payload))).status, 400);
  }
  assert.equal(route.writes.length, 0);
});

test("invalid and oversized fields cannot be persisted", async () => {
  for (const patch of [{ name: " " }, { email: "not-an-email" }, { message: "x".repeat(4001) }, { projectType: "x".repeat(321) }]) {
    const route = loadRoute();
    assert.equal((await route.post(request({ ...validLead, ...patch }))).status, 400);
    assert.equal(route.writes.length, 0);
  }
});

test("honeypot drops the payload without claiming durable persistence", async () => {
  const route = loadRoute();
  const response = await route.post(request({ ...validLead, website: "bot-value" }));
  assert.equal(response.status, 200);
  assert.notEqual((await response.json()).saved, true);
  assert.equal(route.writes.length, 0);
});

test("per-instance rate limiting remains enforced", async () => {
  const route = loadRoute({ configured: false });
  for (let attempt = 0; attempt < 5; attempt++) {
    assert.equal((await route.post(request(validLead))).status, 503);
  }
  assert.equal((await route.post(request(validLead))).status, 429);
  assert.equal(route.writes.length, 0);
});

test("telemetry scheduling failures cannot change a saved inquiry response", async () => {
  const route = loadRoute({ afterThrows: true });
  const response = await route.post(request(validLead));
  assert.equal(response.status, 201);
  assert.deepEqual(await response.json(), { ok: true, saved: true });
});

const telemetrySource = readFileSync(new URL("../app/lib/analytics-server.ts", import.meta.url), "utf8");
const telemetryCompiled = ts.transpileModule(telemetrySource, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;

function loadTelemetry({ env = {}, fail = false } = {}) {
  const exports = {};
  const calls = [];
  const timeouts = [];
  runInNewContext(telemetryCompiled, {
    exports,
    URL,
    process: { env: { NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN: "test-token", NODE_ENV: "test", ...env } },
    AbortSignal: { timeout: (duration) => {
      timeouts.push(duration);
      return AbortSignal.abort();
    } },
    fetch: async (endpoint, options) => {
      calls.push({ endpoint: endpoint.href, options });
      if (fail) throw new Error("Test transport failure");
      return new Response(null, { status: 200 });
    },
  });
  return { capture: exports.captureSavedLead, calls, timeouts };
}

const anonymousId = "019a6d12-1234-7000-8000-123456789abc";
const sessionId = "019a6d12-5678-7000-8000-123456789abc";
const telemetryRequest = (headers = {}) => new Request("https://example.invalid/api/leads?private=never-forward", { headers });

test("no analytics identity, email identities and disabled configuration never emit server events", async () => {
  const telemetry = loadTelemetry();
  for (const value of [null, "person@example.invalid", " ", "anonymous"]) {
    await telemetry.capture(telemetryRequest(value ? { "X-POSTHOG-DISTINCT-ID": value } : {}));
  }
  assert.equal(telemetry.calls.length, 0);
  for (const token of ["", "ph_project_token"]) {
    const disabled = loadTelemetry({ env: { NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN: token } });
    await disabled.capture(telemetryRequest({ "X-POSTHOG-DISTINCT-ID": anonymousId }));
    assert.equal(disabled.calls.length, 0);
  }
});

test("saved lead telemetry uses anonymous top-level identity and bounded non-PII properties", async () => {
  const telemetry = loadTelemetry();
  await telemetry.capture(telemetryRequest({ "X-POSTHOG-DISTINCT-ID": anonymousId, "X-POSTHOG-SESSION-ID": sessionId }), "Custom software build");
  assert.equal(telemetry.calls.length, 1);
  assert.equal(telemetry.calls[0].endpoint, "https://us.i.posthog.com/i/v0/e");
  assert.deepEqual(JSON.parse(telemetry.calls[0].options.body), {
    api_key: "test-token",
    distinct_id: anonymousId,
    event: "lead_saved",
    properties: {
      $process_person_profile: false,
      $is_identified: false,
      site: "avlys-ai",
      environment: "test",
      $host: "example.invalid",
      $session_id: sessionId,
      delivery_method: "website_form",
      project_type: "Custom software build",
    },
  });
  assert.deepEqual(telemetry.timeouts, [2000]);
});

test("arbitrary project text and invalid sessions are omitted; transport failure is harmless", async () => {
  const telemetry = loadTelemetry({ fail: true });
  await assert.doesNotReject(telemetry.capture(telemetryRequest({ "X-POSTHOG-DISTINCT-ID": anonymousId, "X-POSTHOG-SESSION-ID": "person@example.invalid" }), "Private project details"));
  const body = JSON.parse(telemetry.calls[0].options.body);
  assert.equal(body.properties.project_type, undefined);
  assert.equal(body.properties.$session_id, undefined);
  assert.equal(telemetry.calls[0].options.body.includes("Private project"), false);
});
