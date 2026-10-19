import { INDEXABLE } from "./config";

/* ════════════════════════════════════════════════════════════════════════════════════════
   HOMEPAGE CONTENT YOU NEED TO FILL IN — this file is the only place to do it.

   • BOOKING_URL   your Cal.com link. Until it is set, the primary call-to-action reads "Get a free audit"
                   and points to the audit form; "Book a 15-min call" never appears without it.
   • CLIENTS / STATS / CASE_STUDIES / PACKAGES   anything still wrapped in [BRACKETS] is a placeholder.

   How placeholders behave:
   • Local dev and Vercel preview deployments show them (dashed amber outline) so you can see the layout.
   • Production NEVER renders a bracketed placeholder: the Proof strip and Case studies stay hidden until every
     slot in them is filled, and package prices read "Get a quote" until a price is set.
   • `npm run build` on a production build fails if a bracketed placeholder ever reaches the HTML
     (scripts/check-build-urls.mjs).
   Need fewer slots? Delete entries from the arrays — a section only needs the slots that are left.
   ════════════════════════════════════════════════════════════════════════════════════════ */

/** Cal.com booking link, e.g. "https://cal.com/flowhq/15min". Leave "" until it exists. */
export const BOOKING_URL = "";

/** The primary call-to-action (hero + closing band). */
export const PRIMARY_CTA = BOOKING_URL
  ? ({ label: "Book a 15-min call", href: BOOKING_URL, external: true } as const)
  : ({ label: "Get a free audit", href: "#audit", external: false } as const);

/* ───────────────────────────── placeholder plumbing ───────────────────────────── */

/** Dev + Vercel previews show placeholders; production (INDEXABLE) never does. */
export const SHOW_PLACEHOLDERS = !INDEXABLE;
/** A value counts as filled when it is non-empty and has no [BRACKETED] part. */
export const isFilled = (s?: string) => !!s && !/\[[^\]]*\]/.test(s);

/* ───────────────────────────── 1. proof strip ───────────────────────────── */

/** Two client slots. `logo` is an optional path under /public (e.g. "/clients/acme.svg"). Never invent clients. */
export const CLIENTS: { name: string; detail: string; logo?: string }[] = [
  { name: "[CLIENT NAME]", detail: "[CLIENT TYPE · CITY]" },
  { name: "[CLIENT NAME]", detail: "[CLIENT TYPE · CITY]" },
];

/** Three stat slots: a real, defensible number and what it measures. */
export const STATS: { value: string; label: string }[] = [
  { value: "[STAT]", label: "[WHAT IT MEASURES]" },
  { value: "[STAT]", label: "[WHAT IT MEASURES]" },
  { value: "[STAT]", label: "[WHAT IT MEASURES]" },
];

const proofReady = [...CLIENTS.flatMap((c) => [c.name, c.detail]), ...STATS.flatMap((s) => [s.value, s.label])].every(isFilled);
export const SHOW_PROOF = SHOW_PLACEHOLDERS || proofReady;

/* ───────────────────────────── 2. case studies ───────────────────────────── */

export type CaseStudy = {
  /** fixed card label — describes the kind of project, not a claim */
  label: string;
  clientType: string;
  problem: string;
  built: string;
  /** a real, measurable result */
  result: string;
  /** path under /public, e.g. "/work/crm.webp" (16:10 works best) */
  screenshot?: string;
  screenshotAlt?: string;
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    label: "Custom CRM build",
    clientType: "[CLIENT TYPE · CITY]",
    problem: "[THE PROBLEM THEY HAD]",
    built: "[WHAT WE BUILT]",
    result: "[RESULT]",
  },
  {
    label: "Website + lead automation",
    clientType: "[CLIENT TYPE · CITY]",
    problem: "[THE PROBLEM THEY HAD]",
    built: "[WHAT WE BUILT]",
    result: "[RESULT]",
  },
];

const caseReady = (c: CaseStudy) => [c.clientType, c.problem, c.built, c.result].every(isFilled);
/** Production only shows finished case studies; previews show all so the layout can be reviewed. */
export const VISIBLE_CASES = SHOW_PLACEHOLDERS ? CASE_STUDIES : CASE_STUDIES.filter(caseReady);
export const SHOW_CASES = VISIBLE_CASES.length > 0;

/* ───────────────────────────── 3. packages ───────────────────────────── */

export type Pkg = {
  name: string;
  /** e.g. "₹15,000" — shown as "from ₹15,000". Leave as "₹[X]" until set; production then shows "Get a quote". */
  price: string | null;
  /** true = always a custom quote, no price slot */
  custom?: boolean;
  blurb: string;
  bullets: [string, string, string, string];
  /** setup + care-plan wording */
  terms: string;
  featured?: boolean;
};

export const PACKAGES: Pkg[] = [
  {
    name: "Lead Follow-up System",
    price: "₹[X]",
    blurb: "Never miss an enquiry again.",
    bullets: [
      "Enquiries captured from your website, WhatsApp, Instagram and calls",
      "Instant AI reply and automatic follow-ups",
      "Appointments booked into your calendar",
      "Every lead logged in a CRM or sheet you own",
    ],
    terms: "One-time setup. Optional monthly care plan.",
  },
  {
    name: "Growth System",
    price: "₹[X]",
    blurb: "Follow-up plus the tools to grow.",
    bullets: [
      "Everything in Lead Follow-up",
      "A website or landing page built to turn visitors into enquiries",
      "Review requests and re-booking reminders",
      "A monthly report on leads and bookings",
    ],
    terms: "One-time setup. Optional monthly care plan.",
    featured: true,
  },
  {
    name: "Custom CRM & Dashboards",
    price: null,
    custom: true,
    blurb: "Built around how your business runs.",
    bullets: [
      "A CRM shaped around your process",
      "Dashboards for leads, bookings and revenue",
      "Connected to the tools you already use",
      "You own the data and the accounts",
    ],
    terms: "Quoted after a short call. Optional monthly care plan.",
  },
];

/** What a package's price line shows: a real price, a placeholder (previews only), or "Get a quote". */
export function priceLine(p: Pkg): { text: string; placeholder: boolean } {
  if (p.custom || p.price === null) return { text: "Custom quote", placeholder: false };
  if (isFilled(p.price)) return { text: `from ${p.price}`, placeholder: false };
  return SHOW_PLACEHOLDERS ? { text: `from ${p.price}`, placeholder: true } : { text: "Get a quote", placeholder: false };
}
