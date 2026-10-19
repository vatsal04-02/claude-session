import { BellRing, CalendarCheck, Check, Database, Inbox, ChartColumn, Sparkles } from "lucide-react";
import { cn } from "@/lib/cn";
import { chan } from "./channels";
import { Reveal, SectionHeading } from "./ui";
import { CONTAINER, BAND } from "@/lib/layout";

/* Bento: six capabilities, each with a small UI snippet. All snippets are illustrative samples (no real customers or numbers). */

const Snip = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div aria-hidden className={cn("mt-4 flex-1 rounded-[10px] border border-white/[0.06] bg-[#110c09] p-2.5 md:p-3", className)}>
    {children}
  </div>
);

function InboxSnippet() {
  const rows = [
    { c: chan("whatsapp"), t: "What are your timings?", at: "10:47", unread: true },
    { c: chan("instagram"), t: "Is the weekend batch open?", at: "11:05", unread: true },
    { c: chan("form"), t: "Consultation request", at: "11:12", unread: false },
  ];
  return (
    <Snip>
      <ul className="space-y-1.5">
        {rows.map(({ c, t, at, unread }) => (
          <li key={t} className="flex items-center gap-3 rounded-lg bg-white/[0.03] px-2.5 py-2">
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-white/[0.06] text-muted">
              <c.Icon className="h-3.5 w-3.5" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="text-[11px] text-subtle">{c.name}</div>
              <div className="truncate text-[12.5px] text-text">{t}</div>
            </div>
            <span className="font-mono text-[11px] text-subtle">{at}</span>
            {unread && <span className="h-1.5 w-1.5 rounded-full bg-accent" />}
          </li>
        ))}
      </ul>
    </Snip>
  );
}

function ChatSnippet() {
  return (
    <Snip className="flex flex-col justify-center gap-2">
      <div className="max-w-[85%] rounded-xl rounded-bl-sm bg-white/[0.06] px-3 py-2 text-[12.5px] text-text">Is the weekend batch open?</div>
      <div className="ml-auto max-w-[88%] rounded-xl rounded-br-sm border border-accent/30 bg-accent/[0.12] px-3 py-2 text-[12.5px] text-text">Yes — seats are open. Want a call tomorrow at 11 AM?</div>
      <div className="ml-auto flex items-center gap-1.5 text-[11px] text-subtle">
        <Sparkles className="h-3 w-3 text-accent-2" /> Sent automatically
      </div>
    </Snip>
  );
}

function BookingSnippet() {
  return (
    <Snip>
      <div className="flex items-center justify-between text-[11px] text-subtle">
        <span>Saturday</span>
        <CalendarCheck className="h-3.5 w-3.5" />
      </div>
      <div className="mt-2 grid grid-cols-3 gap-1.5 text-center text-[12px]">
        {["10:30", "12:00", "2:30"].map((t, i) => (
          <span key={t} className={cn("rounded-md border py-1.5", i === 0 ? "border-accent/50 bg-accent/[0.14] font-medium text-text" : "border-white/[0.08] text-muted")}>
            {t}
          </span>
        ))}
      </div>
      <div className="mt-2.5 flex items-center gap-2 rounded-lg bg-white/[0.04] px-2.5 py-2 text-[12px] text-muted">
        <BellRing className="h-3.5 w-3.5 text-accent-2" /> Reminder sent · Fri 6 PM
      </div>
    </Snip>
  );
}

function CrmSnippet() {
  const rows = [
    ["Riya S.", "Booked", "text-success border-success/30 bg-success/10"],
    ["Neha K.", "Replied", "text-accent-2 border-accent/40 bg-accent/10"],
    ["Pooja T.", "Follow-up due", "text-warning border-warning/30 bg-warning/10"],
  ] as const;
  return (
    <Snip>
      <div className="mb-1.5 flex items-center justify-between text-[11px] text-subtle">
        <span>CRM · Google Sheet</span>
        <span className="flex items-center gap-1 text-success">
          <Check className="h-3 w-3" strokeWidth={3} /> Synced
        </span>
      </div>
      <ul className="divide-y divide-white/[0.06]">
        {rows.map(([n, s, cls]) => (
          <li key={n} className="flex items-center justify-between py-1.5 text-[12.5px] text-text">
            {n}
            <span className={cn("rounded-full border px-2 py-0.5 text-[11px]", cls)}>{s}</span>
          </li>
        ))}
      </ul>
    </Snip>
  );
}

function AlertSnippet() {
  const toasts = [
    ["New lead · Instagram", "Assigned to the counsellor"],
    ["Follow-up due", "Today, 10:00 AM"],
  ];
  return (
    <Snip className="flex flex-col justify-center gap-2">
      {toasts.map(([t, d]) => (
        <div key={t} className="flex items-start gap-2.5 rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-2">
          <BellRing className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent-2" />
          <div>
            <div className="text-[12.5px] font-medium text-text">{t}</div>
            <div className="text-[11.5px] text-subtle">{d}</div>
          </div>
        </div>
      ))}
    </Snip>
  );
}

function ReportSnippet() {
  const leads = [38, 52, 44, 66, 58, 74, 62];
  const booked = [14, 22, 18, 30, 26, 36, 30];
  return (
    <Snip>
      <div className="flex items-center justify-between text-[11px] text-subtle">
        <span>Weekly report · sample</span>
        <span className="flex items-center gap-3">
          <span className="flex items-center gap-1.5">
            <i className="h-2 w-2 rounded-sm bg-white/25" /> Leads
          </span>
          <span className="flex items-center gap-1.5">
            <i className="h-2 w-2 rounded-sm bg-accent" /> Booked
          </span>
        </span>
      </div>
      <div className="mt-3 flex h-[92px] items-end gap-2.5 md:h-[104px]">
        {leads.map((l, i) => (
          <div key={i} className="relative flex-1 rounded-t bg-white/[0.14]" style={{ height: `${l}%` }}>
            <div className="absolute inset-x-0 bottom-0 rounded-t bg-accent" style={{ height: `${(booked[i] / l) * 100}%` }} />
          </div>
        ))}
      </div>
      <div className="mt-1.5 flex justify-between text-[10.5px] text-subtle">
        {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
          <span key={i} className="flex-1 text-center">
            {d}
          </span>
        ))}
      </div>
    </Snip>
  );
}

const CARDS = [
  { title: "Lead Inbox", line: "Every channel, one place.", Icon: Inbox, span: "lg:col-span-7", Snippet: InboxSnippet },
  { title: "AI Follow-up", line: "Instant replies and timed follow-ups, around the clock.", Icon: Sparkles, span: "lg:col-span-5", Snippet: ChatSnippet },
  { title: "Booking & Reminders", line: "Slots booked in your calendar, reminders sent.", Icon: CalendarCheck, span: "lg:col-span-5", Snippet: BookingSnippet },
  { title: "CRM Sync", line: "Every lead logged in the CRM or sheet you own.", Icon: Database, span: "lg:col-span-7", Snippet: CrmSnippet },
  { title: "Team Alerts", line: "The right person knows the moment it matters.", Icon: BellRing, span: "lg:col-span-4", Snippet: AlertSnippet },
  { title: "Reports", line: "See what came in and what happened.", Icon: ChartColumn, span: "lg:col-span-8", Snippet: ReportSnippet },
] as const;

export default function Features() {
  return (
    <section id="features" className={BAND}>
      <div className={CONTAINER}>
        <SectionHeading eyebrow="What you get" title="Everything between enquiry and booked." />
        {/* phones: a swipe row (next card peeks) keeps the page short; md+: the bento grid */}
        <ul tabIndex={0} aria-label="Features" className="no-scrollbar -mx-6 mt-6 flex snap-x snap-mandatory scroll-px-6 gap-3 overflow-x-auto px-6 pb-1 md:mx-0 md:grid md:grid-cols-2 md:gap-4 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-12">
          {CARDS.map(({ title, line, Icon, span, Snippet }, i) => (
            <li key={title} className={cn("w-[82%] shrink-0 snap-start md:w-auto", span)}>
              <Reveal delay={(i % 3) * 0.06} className="flex h-full flex-col rounded-[14px] border border-border bg-surface/60 p-4 md:p-5">
                <div className="flex items-center gap-2.5">
                  <span className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 text-accent-2">
                    <Icon aria-hidden className="h-4 w-4" />
                  </span>
                  <h3 className="text-[16px] font-semibold text-text">{title}</h3>
                </div>
                <p className="mt-2 text-[14.5px] leading-[1.55] text-muted">{line}</p>
                <Snippet />
              </Reveal>
            </li>
          ))}
        </ul>
        <p className="label mt-3 text-[10px] text-subtle md:hidden">Swipe →</p>
      </div>
    </section>
  );
}
