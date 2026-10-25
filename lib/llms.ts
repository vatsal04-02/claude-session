/**
 * llms.txt (https://llmstxt.org) — a plain-text briefing for AI search and answer engines (GEO).
 * Built at export time from the same data the pages use, so it can never disagree with the site.
 *   /llms.txt       who we are + an annotated map of every page
 *   /llms-full.txt  the same, plus every FAQ answer, service summary and guide's short answer
 */
import { SITE_URL } from "./config";
import { HOME_FAQS } from "./faq";
import { INDUSTRIES } from "./industries";
import { CLUSTERS, RESOURCES } from "./resources";
import { PACKAGES } from "./content";
import { ORG_DEFINITION } from "./schema";
import { PROCESS, SERVICES } from "./services";
import { CONTACT_EMAIL, INSTAGRAM_URL, LINKEDIN_URL, YOUTUBE_URL } from "./site";
import { WHATSAPP_NUMBER } from "./whatsapp";

const u = (path: string) => `${SITE_URL}${path}`;
const phone = `+${WHATSAPP_NUMBER.slice(0, 2)} ${WHATSAPP_NUMBER.slice(2, 7)} ${WHATSAPP_NUMBER.slice(7)}`;

const facts = [
  "## Key facts",
  "",
  "- Name: Flow HQ (also written FlowHQ)",
  "- What: AI automation studio — lead capture, instant replies, follow-ups, appointment booking, CRM updates and team alerts",
  "- Channels: website forms, WhatsApp (official WhatsApp Business API), Instagram, phone calls, email",
  "- Based in: Lucknow, Uttar Pradesh, India; works with businesses across India",
  "- Founders: Prachi Pathak and Vatsal Tripathi (co-founders; they build every system themselves)",
  `- Industries: ${INDUSTRIES.map((i) => i.name).join(", ")}`,
  "- Pricing model: free audit, then a fixed quote before anything is built; one-time setup plus an optional monthly care plan; no lock-in",
  "- Ownership: the client owns the system, the data and the accounts",
  `- Contact: WhatsApp ${phone} · ${CONTACT_EMAIL} · ${u("/#audit")}`,
  `- Profiles: ${[INSTAGRAM_URL, YOUTUBE_URL, LINKEDIN_URL].join(" · ")}`,
];

function pageMap() {
  const out: string[] = [];
  out.push("## Services", "");
  SERVICES.forEach((s) => out.push(`- [${s.nav}](${u(`/${s.slug}/`)}): ${s.metaDescription}`));
  out.push("", "## Industries", "");
  INDUSTRIES.forEach((i) => out.push(`- [${i.name}](${u(`/industries/${i.slug}/`)}): ${i.metaDescription}`));
  CLUSTERS.forEach((c) => {
    out.push("", `## Guides: ${c.name}`, "");
    RESOURCES.filter((r) => r.cluster === c.id).forEach((r) => out.push(`- [${r.title}](${u(`/resources/${r.slug}/`)}): ${r.description}`));
  });
  out.push(
    "",
    "## Tools",
    "",
    `- [Manual work cost calculator](${u("/calculator/")}): estimate what slow replies and repetitive admin cost a business each month`,
    `- [Live demo](${u("/#try-it")}): sample runs of the system handling an Instagram DM, a missed call, a website form, an after-hours WhatsApp and a quiet lead`
  );
  return out;
}

export function llmsTxt() {
  return [
    "# Flow HQ",
    "",
    `> ${ORG_DEFINITION}`,
    "",
    "Not just AI — systems that work. Every enquiry is captured in one place, answered instantly, followed up, booked and logged, and the right person on the team is notified.",
    "",
    ...facts,
    "",
    ...pageMap(),
    "",
    "## Optional",
    "",
    `- [Full text for AI assistants](${u("/llms-full.txt")}): every FAQ answer, service summary and guide summary in one file`,
    "",
  ].join("\n");
}

export function llmsFullTxt() {
  const out = [llmsTxt().trimEnd(), "", "---", "", "## Frequently asked questions", ""];
  HOME_FAQS.forEach(([q, a]) => out.push(`### ${q}`, "", a, ""));
  out.push("## How a project works", "");
  PROCESS.forEach((p, i) => out.push(`${i + 1}. ${p.title}: ${p.body}`));
  out.push("", "## Packages", "");
  PACKAGES.forEach((p) => out.push(`### ${p.name}`, "", `${p.blurb} ${p.terms}`, "", ...p.bullets.map((b) => `- ${b}`), ""));
  out.push("## Services in detail", "");
  SERVICES.forEach((s) => {
    out.push(`### ${s.schema.name}`, "", `URL: ${u(`/${s.slug}/`)}`, "", s.intro, "", "What we build:", ...s.builds.map((b) => `- ${b.title}: ${b.body}`), "");
    s.faqs.forEach(([q, a]) => out.push(`Q: ${q}`, `A: ${a}`, ""));
  });
  out.push("## Industries in detail", "");
  INDUSTRIES.forEach((i) => {
    out.push(`### ${i.name}`, "", `URL: ${u(`/industries/${i.slug}/`)}`, "", i.intro, "");
    i.faqs.forEach(([q, a]) => out.push(`Q: ${q}`, `A: ${a}`, ""));
  });
  out.push("## Guides: short answers", "");
  RESOURCES.forEach((r) => out.push(`### ${r.title}`, "", `URL: ${u(`/resources/${r.slug}/`)} · updated ${r.updated}`, "", r.summary, ""));
  return out.join("\n");
}
