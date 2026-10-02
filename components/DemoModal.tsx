"use client";

import { AnimatePresence, motion } from "motion/react";
import { Check, Loader2, X } from "lucide-react";
import { useLenis } from "lenis/react";
import { useEffect, useId, useRef, useState } from "react";
import { useDemo } from "@/lib/demo-context";
import { AUTOMATION_OPTIONS, BUSINESS_TYPES } from "@/lib/site";
import { cn } from "@/lib/cn";
import { WHATSAPP_MESSAGES, waLink } from "@/lib/whatsapp";
import { Button, EASE } from "./ui";

const TIMES = ["10:00 AM", "11:00 AM", "12:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM"];

type Form = {
  name: string;
  business: string;
  phone: string;
  email: string;
  businessType: string;
  automate: string[];
  details: string;
  date: string;
  time: string;
};

const EMPTY: Form = {
  name: "",
  business: "",
  phone: "",
  email: "",
  businessType: "",
  automate: [],
  details: "",
  date: "",
  time: "",
};

const FOCUSABLE =
  'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

export default function DemoModal() {
  const { isOpen, close } = useDemo();
  const lenis = useLenis();
  const [form, setForm] = useState<Form>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [serverError, setServerError] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const today = new Date().toISOString().slice(0, 10);

  // scroll lock (Lenis + native), focus management, Esc + focus trap
  useEffect(() => {
    if (!isOpen) return;
    const opener = document.activeElement as HTMLElement | null;
    lenis?.stop();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => panelRef.current?.querySelector<HTMLElement>("input")?.focus(), 150);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "Tab" && panelRef.current) {
        const els = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
        if (!els.length) return;
        const first = els[0];
        const last = els[els.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      lenis?.start();
      opener?.focus?.();
    };
  }, [isOpen, close, lenis]);

  // reset after the close animation
  useEffect(() => {
    if (isOpen) return;
    const t = setTimeout(() => {
      setForm(EMPTY);
      setErrors({});
      setStatus("idle");
      setServerError("");
    }, 400);
    return () => clearTimeout(t);
  }, [isOpen]);

  const set = <K extends keyof Form>(k: K, v: Form[K]) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const toggle = (opt: string) =>
    set("automate", form.automate.includes(opt) ? form.automate.filter((o) => o !== opt) : [...form.automate, opt]);

  const validate = () => {
    const e: typeof errors = {};
    if (!form.name.trim()) e.name = "Please enter your name";
    if (!form.business.trim()) e.business = "Please enter your business name";
    if (form.phone.replace(/\D/g, "").length < 8) e.phone = "Enter a valid phone / WhatsApp number";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email";
    if (!form.businessType) e.businessType = "Choose a business type";
    if (!form.automate.length && !form.details.trim()) e.automate = "Pick at least one option or describe it";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submitting = useRef(false); // synchronous guard: a double click can never send twice

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (submitting.current) return;
    if (!validate()) {
      panelRef.current?.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
      return;
    }
    submitting.current = true;
    setStatus("sending");
    setServerError("");
    const requirement = [
      `Business type: ${form.businessType}`,
      form.automate.length ? `Wants: ${form.automate.join(", ")}` : "",
      form.details.trim() ? `Notes: ${form.details.trim()}` : "",
    ]
      .filter(Boolean)
      .join(" | ");
    try {
      const res = await fetch("/api/demo-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          businessName: form.business,
          phone: form.phone,
          email: form.email,
          requirement,
          preferredDate: form.date,
          preferredTime: form.time,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error("save failed");
      setStatus("done");
    } catch {
      setServerError("We couldn't submit your request right now. Please try again or contact us on WhatsApp.");
      setStatus("error");
    } finally {
      submitting.current = false;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={close}
            aria-hidden
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            data-lenis-prevent
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.97 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="relative max-h-[92dvh] w-full overflow-y-auto overscroll-contain rounded-t-3xl border border-border bg-surface shadow-[0_40px_120px_-20px_rgba(0,0,0,0.9)] sm:max-w-[640px] sm:rounded-3xl"
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 grid h-9 w-9 cursor-pointer place-items-center rounded-full border border-border bg-surface-2 text-muted transition-colors hover:text-text"
            >
              <X className="h-4 w-4" />
            </button>

            {status === "done" ? (
              <div className="px-8 py-16 text-center md:py-20">
                <motion.div
                  initial={{ scale: 0, rotate: -30 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 260, damping: 16 }}
                  className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-success text-[#06251a] shadow-[0_0_0_10px_rgba(143,201,138,0.14),0_0_40px_rgba(143,201,138,0.4)]"
                >
                  <Check className="h-8 w-8" strokeWidth={3} />
                </motion.div>
                <h2 id={titleId} className="display mt-8 text-4xl">
                  You&apos;re on the list.
                </h2>
                <p className="mx-auto mt-3 max-w-sm text-muted">
                  Thanks — we&apos;ve received your demo request. We&apos;ll get in touch shortly.
                </p>
                <p className="label mt-8 text-subtle">Prefer WhatsApp?</p>
                <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
                  <Button variant="whatsapp" {...waLink(WHATSAPP_MESSAGES.submitted)}>
                    WhatsApp Us
                  </Button>
                  <Button variant="ghost" onClick={close} arrow={null}>
                    Close
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={submit} noValidate className="p-6 sm:p-8">
                <span className="label text-accent">Free 20-minute demo</span>
                <h2 id={titleId} className="mt-2 pr-10 display text-3xl sm:text-4xl">
                  Book your free demo
                </h2>
                <p className="mt-2 text-[15px] text-muted">
                  Tell us a little about your business. We&apos;ll come prepared.
                </p>

                <div className="mt-7 grid gap-4 sm:grid-cols-2">
                  <Field label="Name" error={errors.name}>
                    {(p) => (
                      <input {...p} autoComplete="name" value={form.name} onChange={(e) => set("name", e.target.value)} />
                    )}
                  </Field>
                  <Field label="Business name" error={errors.business}>
                    {(p) => (
                      <input
                        {...p}
                        autoComplete="organization"
                        value={form.business}
                        onChange={(e) => set("business", e.target.value)}
                      />
                    )}
                  </Field>
                  <Field label="Phone / WhatsApp" error={errors.phone}>
                    {(p) => (
                      <input
                        {...p}
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        value={form.phone}
                        onChange={(e) => set("phone", e.target.value)}
                      />
                    )}
                  </Field>
                  <Field label="Email" error={errors.email}>
                    {(p) => (
                      <input
                        {...p}
                        type="email"
                        autoComplete="email"
                        value={form.email}
                        onChange={(e) => set("email", e.target.value)}
                      />
                    )}
                  </Field>
                  <Field label="Business type" error={errors.businessType} className="sm:col-span-2">
                    {(p) => (
                      <select
                        {...p}
                        value={form.businessType}
                        onChange={(e) => set("businessType", e.target.value)}
                      >
                        <option value="">Select…</option>
                        {BUSINESS_TYPES.map((b) => (
                          <option key={b} value={b}>
                            {b}
                          </option>
                        ))}
                      </select>
                    )}
                  </Field>
                </div>

                <fieldset className="mt-5">
                  <legend className="mb-2 text-sm font-medium">What do you want to automate?</legend>
                  <div className="flex flex-wrap gap-2">
                    {AUTOMATION_OPTIONS.map((o) => {
                      const on = form.automate.includes(o);
                      return (
                        <label
                          key={o}
                          className={cn(
                            "flex cursor-pointer items-center gap-2 rounded-full border px-3.5 py-2 text-sm transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-accent",
                            on
                              ? "border-accent/60 bg-accent/15 text-accent"
                              : "border-border bg-bg/50 text-muted hover:border-border-bright"
                          )}
                        >
                          <input
                            type="checkbox"
                            className="sr-only"
                            checked={on}
                            onChange={() => toggle(o)}
                          />
                          {on && <Check className="h-3.5 w-3.5" />}
                          {o}
                        </label>
                      );
                    })}
                  </div>
                  <textarea
                    value={form.details}
                    onChange={(e) => set("details", e.target.value)}
                    rows={3}
                    placeholder="Anything else? e.g. “Leads from Instagram get lost”"
                    aria-label="Describe what you want to automate"
                    className={cn(inputCls, "mt-3 resize-none")}
                  />
                  {errors.automate && <p className="mt-1.5 text-sm text-danger">{errors.automate}</p>}
                </fieldset>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <Field label="Preferred date" error={errors.date}>
                    {(p) => (
                      <input
                        {...p}
                        type="date"
                        min={today}
                        value={form.date}
                        onChange={(e) => set("date", e.target.value)}
                        className={cn(p.className, "[color-scheme:dark]")}
                      />
                    )}
                  </Field>
                  <Field label="Preferred time" error={errors.time}>
                    {(p) => (
                      <select {...p} value={form.time} onChange={(e) => set("time", e.target.value)}>
                        <option value="">Any time</option>
                        {TIMES.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    )}
                  </Field>
                </div>

                {status === "error" && (
                  <div role="alert" className="mt-5 rounded-lg border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger">
                    <p>{serverError}</p>
                    <Button variant="whatsapp" className="mt-3" {...waLink(WHATSAPP_MESSAGES.general)}>
                      WhatsApp FlowHQ
                    </Button>
                  </div>
                )}

                <div className="mt-7 flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs text-subtle">No spam. We only use this to arrange your demo.</p>
                  <Button
                    type="submit"
                    size="lg"
                    disabled={status === "sending"} aria-busy={status === "sending"}
                    arrow={status === "sending" ? <Loader2 className="h-4 w-4 animate-spin" /> : undefined}
                    className="disabled:opacity-80"
                  >
                    {status === "sending" ? "Submitting…" : "Book my demo"}
                  </Button>
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const inputCls =
  "w-full rounded-xl border border-border bg-bg/60 px-4 py-3 text-[15px] text-text placeholder:text-subtle transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25";

function Field({
  label,
  error,
  className,
  children,
}: {
  label: string;
  error?: string;
  className?: string;
  children: (p: { id: string; className: string; "aria-invalid": boolean; "aria-describedby"?: string }) => React.ReactNode;
}) {
  const id = useId();
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium">
        {label}
      </label>
      {children({
        id,
        className: cn(inputCls, error && "border-danger/70"),
        "aria-invalid": !!error,
        "aria-describedby": error ? `${id}-err` : undefined,
      })}
      {error && (
        <p id={`${id}-err`} className="mt-1.5 text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
