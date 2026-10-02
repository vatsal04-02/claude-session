import { NextResponse } from "next/server";

export const runtime = "nodejs";

type Payload = {
  name?: string;
  business?: string;
  phone?: string;
  email?: string;
  businessType?: string;
  automate?: string[];
  details?: string;
  date?: string;
  time?: string;
};

const clean = (v: unknown, max = 500) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const lead = {
    name: clean(body.name, 120),
    business: clean(body.business, 160),
    phone: clean(body.phone, 40),
    email: clean(body.email, 200),
    businessType: clean(body.businessType, 80),
    automate: Array.isArray(body.automate)
      ? body.automate.map((a) => clean(a, 60)).filter(Boolean).slice(0, 10)
      : [],
    details: clean(body.details, 1500),
    date: clean(body.date, 20),
    time: clean(body.time, 20),
    receivedAt: new Date().toISOString(),
  };

  if (!lead.name || !lead.business || !lead.phone || !/^\S+@\S+\.\S+$/.test(lead.email)) {
    return NextResponse.json(
      { ok: false, error: "Please fill in name, business, phone and a valid email." },
      { status: 422 }
    );
  }

  // Forward to any webhook (n8n, Zapier, Make, Slack, your CRM…) when configured.
  const hook = process.env.DEMO_WEBHOOK_URL;
  if (hook) {
    try {
      const res = await fetch(hook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });
      if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    } catch (err) {
      console.error("[demo] webhook delivery failed", err);
      return NextResponse.json(
        { ok: false, error: "We couldn't submit that just now. Please try again." },
        { status: 502 }
      );
    }
  } else {
    console.log("[demo] new request (set DEMO_WEBHOOK_URL to forward)", lead);
  }

  return NextResponse.json({ ok: true });
}
