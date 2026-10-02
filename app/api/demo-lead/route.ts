import { NextResponse } from "next/server";

export const runtime = "nodejs";

type Incoming = Record<string, unknown>;

const clean = (v: unknown, max: number) =>
  typeof v === "string" ? v.replace(/\s+/g, " ").trim().slice(0, max) : "";

// Best-effort guard against the same submission arriving twice within 30s (double click / retry).
const recent = new Map<string, number>();
const DEDUPE_MS = 30_000;

export async function POST(req: Request) {
  let body: Incoming;
  try {
    body = (await req.json()) as Incoming;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // normalise
  const lead = {
    name: clean(body.name, 120),
    businessName: clean(body.businessName, 160),
    phone: clean(body.phone, 40),
    email: clean(body.email, 200).toLowerCase(),
    requirement: clean(body.requirement, 1500),
    preferredDate: clean(body.preferredDate, 20),
    preferredTime: clean(body.preferredTime, 20),
  };

  // validate
  const problems: string[] = [];
  if (!lead.name) problems.push("name");
  if (!lead.businessName) problems.push("businessName");
  if (lead.phone.replace(/\D/g, "").length < 8) problems.push("phone");
  if (!/^\S+@\S+\.\S+$/.test(lead.email)) problems.push("email");
  if (!lead.requirement) problems.push("requirement");
  if (lead.preferredDate && !/^\d{4}-\d{2}-\d{2}$/.test(lead.preferredDate)) problems.push("preferredDate");
  if (problems.length) {
    return NextResponse.json({ ok: false, error: "Missing or invalid fields.", fields: problems }, { status: 422 });
  }

  const hook = process.env.DEMO_WEBHOOK_URL;
  if (!hook) {
    console.error("[demo-lead] DEMO_WEBHOOK_URL is not set");
    return NextResponse.json({ ok: false, error: "Lead capture is not configured." }, { status: 503 });
  }

  const key = `${lead.email}|${lead.phone.replace(/\D/g, "")}|${lead.requirement}`;
  const now = Date.now();
  for (const [k, t] of recent) if (now - t > DEDUPE_MS) recent.delete(k);
  if (recent.has(key)) return NextResponse.json({ ok: true, duplicate: true });

  const payload = { ...lead, source: "FlowHQ Website", submittedAt: new Date().toISOString() };

  try {
    const res = await fetch(hook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      redirect: "follow",
      signal: AbortSignal.timeout(10_000),
    });
    const data = await res.json().catch(() => null);
    if (!res.ok || !data || data.ok !== true) throw new Error(`Webhook responded ${res.status}`);
  } catch (err) {
    console.error("[demo-lead] webhook delivery failed:", err instanceof Error ? err.message : err);
    return NextResponse.json({ ok: false, error: "Could not save the lead." }, { status: 502 });
  }

  recent.set(key, now);
  return NextResponse.json({ ok: true });
}
