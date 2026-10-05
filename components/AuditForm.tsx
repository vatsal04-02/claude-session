"use client";

import { Check, Loader2 } from "lucide-react";
import { useId, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { GOOGLE_SHEET_URL } from "@/lib/site";
import { WHATSAPP_MESSAGES, waLink } from "@/lib/whatsapp";
import { Button } from "./ui";

const inputCls =
  "w-full rounded-xl border border-border bg-bg/60 px-4 py-3 text-[15px] text-text placeholder:text-subtle transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25";

const waText = "text-[14px] text-[#25D366] underline decoration-[#25D366]/40 underline-offset-4 transition-opacity hover:opacity-80";

/** The single audit action: Name, Phone, Business Type, Message → Google Apps Script → sheet row. */
export default function AuditForm() {
  const [f, setF] = useState({ name: "", phone: "", businessType: "", message: "" });
  const [err, setErr] = useState<{ name?: string; phone?: string }>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const sending = useRef(false); // synchronous guard against double submits
  const uid = useId();

  const set = (k: keyof typeof f, v: string) => {
    setF((p) => ({ ...p, [k]: v }));
    if (k === "name" || k === "phone") setErr((e) => ({ ...e, [k]: undefined }));
  };

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (sending.current) return;
    const e: typeof err = {};
    if (!f.name.trim()) e.name = "Please enter your name";
    if (f.phone.replace(/\D/g, "").length < 8) e.phone = "Enter a valid phone number";
    setErr(e);
    if (Object.keys(e).length) return;

    sending.current = true;
    setStatus("sending");
    try {
      // text/plain keeps this a "simple" request (no CORS preflight, which Apps Script can't answer); body is JSON
      const res = await fetch(GOOGLE_SHEET_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          name: f.name.trim(),
          phone: f.phone.trim(),
          businessType: f.businessType.trim(),
          message: f.message.trim(),
          source: "FlowHQ website",
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error("save failed");
      setStatus("done");
    } catch {
      setStatus("error");
    } finally {
      sending.current = false;
    }
  };

  if (status === "done") {
    return (
      <div className="rounded-2xl border border-border bg-surface p-8 text-center md:p-10">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-success text-[#06251a]">
          <Check className="h-7 w-7" strokeWidth={3} />
        </span>
        <p className="mt-6 text-[22px] font-semibold tracking-tight">Thanks! We&apos;ll reach out soon.</p>
        <p className="mt-6 text-[14px] text-muted">
          Prefer WhatsApp?{" "}
          <a {...waLink(WHATSAPP_MESSAGES.submitted)} className={waText}>
            WhatsApp us
          </a>
        </p>
      </div>
    );
  }

  const field = (k: keyof typeof f, label: string, props: React.InputHTMLAttributes<HTMLInputElement> = {}) => {
    const id = `${uid}-${k}`;
    const e = k === "name" || k === "phone" ? err[k] : undefined;
    return (
      <div>
        <label htmlFor={id} className="mb-1.5 block text-sm font-medium">
          {label}
        </label>
        <input
          id={id}
          value={f[k]}
          onChange={(ev) => set(k, ev.target.value)}
          aria-invalid={!!e}
          aria-describedby={e ? `${id}-err` : undefined}
          className={cn(inputCls, e && "border-danger/70")}
          {...props}
        />
        {e && (
          <p id={`${id}-err`} className="mt-1.5 text-sm text-danger">
            {e}
          </p>
        )}
      </div>
    );
  };

  return (
    <form onSubmit={submit} noValidate className="rounded-2xl border border-border bg-surface p-6 md:p-8">
      <div className="space-y-4">
        {field("name", "Name", { autoComplete: "name" })}
        {field("phone", "Phone", { type: "tel", inputMode: "tel", autoComplete: "tel" })}
        {field("businessType", "Business Type")}
        <div>
          <label htmlFor={`${uid}-message`} className="mb-1.5 block text-sm font-medium">
            Message
          </label>
          <textarea
            id={`${uid}-message`}
            rows={3}
            value={f.message}
            onChange={(ev) => set("message", ev.target.value)}
            className={cn(inputCls, "resize-none")}
          />
        </div>
      </div>

      {status === "error" && (
        <div role="alert" className="mt-5 rounded-lg border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger">
          <p>Something went wrong — please reach us on WhatsApp instead.</p>
          <a {...waLink(WHATSAPP_MESSAGES.general)} className={cn(waText, "mt-2 inline-block")}>
            WhatsApp FlowHQ
          </a>
        </div>
      )}

      <Button
        type="submit"
        size="lg"
        className="mt-6 w-full disabled:opacity-80"
        disabled={status === "sending"}
        aria-busy={status === "sending"}
        arrow={status === "sending" ? <Loader2 className="h-4 w-4 animate-spin" /> : undefined}
      >
        {status === "sending" ? "Submitting…" : "Get My Free Audit"}
      </Button>
      <p className="mt-4 text-center text-[13px] text-subtle">
        Prefer WhatsApp?{" "}
        <a {...waLink(WHATSAPP_MESSAGES.general)} className={waText}>
          Message us
        </a>
      </p>
    </form>
  );
}
