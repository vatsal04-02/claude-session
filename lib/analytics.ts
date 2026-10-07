import { track as vercelTrack } from "@vercel/analytics";

/** Lightweight, cookieless event tracking (Vercel Web Analytics). No personal data is ever sent —
    only event names and short labels. Safe to call anywhere: it does nothing if analytics isn't loaded. */
export type EventName =
  | "cta_click" // any "Get My Free Audit" link/button
  | "whatsapp_click"
  | "audit_view" // the audit form scrolled into view
  | "form_start" // first interaction with the audit form
  | "form_submit" // valid submit sent
  | "form_success"
  | "form_error"
  | "section_view"; // key homepage sections seen

export function track(name: EventName, props?: Record<string, string | number | boolean>) {
  try {
    vercelTrack(name, props);
  } catch {
    /* analytics must never break the page */
  }
}
