import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

type LeadPayload = {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  message?: string;
  source?: string;
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

    const name = payload.name?.trim();
    const email = payload.email?.trim();
    const phone = payload.phone?.trim();
    const message = payload.message?.trim();

    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: "Name, email, mobile number, and message are required." },
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
        message,
        source: payload.source || "website",
      },
    ]);

    if (error) {
      return NextResponse.json({ error: "Unable to save the request." }, { status: 500 });
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected server error.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
