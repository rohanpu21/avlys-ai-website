import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

type LeadPayload = {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  projectType?: string;
  message?: string;
  website?: string;
  source?: string;
};

const MAX_FIELD_LENGTH = 320;
const MAX_MESSAGE_LENGTH = 4000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Per-instance rate limit: cheap protection alongside the honeypot.
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;
const requestLog = new Map<string, number[]>();

const isRateLimited = (key: string) => {
  const now = Date.now();
  const recent = (requestLog.get(key) ?? []).filter(
    (time) => now - time < RATE_LIMIT_WINDOW_MS
  );
  recent.push(now);
  requestLog.set(key, recent);
  return recent.length > RATE_LIMIT_MAX;
};

const getSupabaseClient = () => {
  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error("Missing Supabase environment variables.");
  }

  return createClient(url, serviceRoleKey, {
    auth: { persistSession: false },
  });
};

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as LeadPayload;

    // Honeypot: bots fill the hidden field; answer success and drop it.
    if (payload.website) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again in a minute." },
        { status: 429 }
      );
    }

    const name = payload.name?.trim();
    const email = payload.email?.trim();
    const phone = payload.phone?.trim() || "";
    const projectType = payload.projectType?.trim();
    const message = payload.message?.trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and project details are required." },
        { status: 400 }
      );
    }

    if (
      name.length > MAX_FIELD_LENGTH ||
      email.length > MAX_FIELD_LENGTH ||
      phone.length > MAX_FIELD_LENGTH ||
      (payload.company?.length ?? 0) > MAX_FIELD_LENGTH ||
      message.length > MAX_MESSAGE_LENGTH
    ) {
      return NextResponse.json(
        { error: "One of the fields is too long." },
        { status: 400 }
      );
    }

    if (!EMAIL_PATTERN.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const supabase = getSupabaseClient();
    const { error } = await supabase.from("lead_submissions").insert([
      {
        name,
        email,
        phone,
        company: payload.company?.trim() || null,
        message: projectType ? `[${projectType}] ${message}` : message,
        source: payload.source || "website",
      },
    ]);

    if (error) {
      console.error("Lead insert failed:", error.message);
      return NextResponse.json({ error: "Unable to save the request." }, { status: 500 });
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error(
      "Lead endpoint error:",
      error instanceof Error ? error.message : error
    );
    return NextResponse.json({ error: "Unexpected server error." }, { status: 500 });
  }
}
