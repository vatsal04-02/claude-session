/**
 * Service pages — one search intent each. Plain language, no invented stats, clients or prices.
 * Rendered by app/[service]/page.tsx; listed in the sitemap, footer and hero.
 */
export type ServiceContent = {
  slug: string;
  nav: string; // short name for links
  topic: string; // the same name, as it reads mid-sentence
  metaTitle: string; // <title> (absolute)
  metaDescription: string;
  schema: { name: string; serviceType: string; description: string };
  eyebrow: string;
  h1: string;
  intro: string;
  signsTitle: string;
  signs: { title: string; body: string }[];
  buildsTitle: string;
  builds: { title: string; body: string }[];
  deepTitle: string;
  deep: string[]; // paragraphs
  deepPoints?: string[];
  faqs: [string, string][];
};

export const PROCESS = [
  { title: "Free audit", body: "You tell us what your team does by hand. We map where the hours and the missed money go — free, and you keep the findings." },
  { title: "Plan and fixed quote", body: "We design the system around how you already work and give you a fixed price before anything is built. No hourly billing." },
  { title: "Build and connect", body: "We build the automation, connect it to the tools you already use, and test it with real examples from your business." },
  { title: "Launch and tune", body: "We switch it on with your team, watch how it runs, and adjust it until it works the way your business actually works." },
];

export const SERVICES: ServiceContent[] = [
  {
    slug: "ai-automation",
    nav: "AI automation",
    topic: "AI automation",
    metaTitle: "AI Automation Agency & AI Automation Services | FlowHQ",
    metaDescription:
      "FlowHQ is an AI automation agency building AI agents that reply to customers, qualify leads and handle data entry — with your team in control. Free audit.",
    schema: {
      name: "AI automation services",
      serviceType: "AI automation",
      description: "Custom AI agents and AI-powered workflows for businesses: enquiry replies, lead qualification, data extraction and internal assistants.",
    },
    eyebrow: "AI automation agency",
    h1: "AI automation services that do real work for your business",
    intro:
      "FlowHQ is an AI automation agency. We build AI agents and AI-powered workflows that answer enquiries, sort leads, pull data out of messages and documents, and draft follow-ups — connected to the tools your team already uses, with a person in control wherever it matters.",
    signsTitle: "Signs AI automation would help",
    signs: [
      { title: "The same questions, all day", body: "Prices, timings, availability, directions. Your team answers them one by one, often hours later." },
      { title: "Leads arrive with no context", body: "Someone has to read every message to work out what the customer wants and how urgent it is." },
      { title: "Typing data from one place to another", body: "Details from forms, emails, PDFs or chats are copied into sheets and CRMs by hand." },
      { title: "Follow-ups depend on memory", body: "Good leads go cold because nobody had time to write the next message." },
    ],
    buildsTitle: "AI agents and systems we build",
    builds: [
      { title: "AI reply agents", body: "Answer common questions on WhatsApp or your website instantly, in your tone, using your own information — and hand over to a person when it needs one." },
      { title: "Lead qualification", body: "Every new enquiry is read, tagged by intent and urgency, summarised in one line, and routed to the right person." },
      { title: "Document and message extraction", body: "Pull names, numbers, dates and amounts out of forms, emails, invoices and PDFs straight into your sheet or CRM." },
      { title: "Drafted follow-ups", body: "AI writes the next message for each lead; your team approves it with one tap, or lets it send automatically for routine cases." },
      { title: "Internal assistants", body: "An assistant trained on your price lists, policies and process notes, so your staff get answers without hunting through files." },
      { title: "AI inside your workflows", body: "AI steps added to your existing automations — classify, summarise, translate or check — wherever a rule-based workflow isn't enough." },
    ],
    deepTitle: "Where AI helps — and where it shouldn't decide alone",
    deep: [
      "AI is very good at reading messy text, sorting it, and writing a sensible first draft. It is not good at being accountable. So we design every system with clear limits: what the AI can do on its own, what it only suggests, and what always goes to a person.",
      "Routine, low-risk work — answering opening hours, confirming a booking, logging a lead — can run automatically. Anything involving money, complaints or a judgement call is flagged for your team, with the context already summarised.",
    ],
    deepPoints: [
      "Answers come from your own information, not guesses",
      "Clear handover to a person, with the conversation attached",
      "Every AI action is logged so you can see what happened",
      "You own the accounts, prompts and data",
    ],
    faqs: [
      ["What does an AI automation agency actually do?", "We find the repetitive work in your business that AI can handle — replying, sorting, extracting, drafting — then build and connect a system that does it inside the tools you already use. You get a working system, not a report."],
      ["Will AI reply to my customers on its own?", "Only where you want it to. Most businesses let AI answer routine questions instantly and send anything unusual to a person. You decide the rules, and you can change them later."],
      ["Is my business data safe?", "We build on accounts you own, keep customer data on infrastructure you control, and only send to an AI model what a task needs. Nothing is locked inside our systems."],
      ["Do I need technical staff to run it?", "No. We set it up, connect it and train your team. Day to day, your staff just see faster replies, cleaner data and fewer things to remember."],
    ],
  },
  {
    slug: "workflow-automation",
    nav: "Workflow automation",
    topic: "workflow automation",
    metaTitle: "Workflow Automation Agency — n8n & AI Workflows | FlowHQ",
    metaDescription:
      "Workflow automation agency connecting your forms, WhatsApp, sheets, CRM and calendar with n8n and AI — so work moves on its own. Get a free automation audit.",
    schema: {
      name: "Workflow automation",
      serviceType: "Workflow automation",
      description: "Custom workflow automation with n8n and AI steps, connecting a business's forms, messaging, spreadsheets, CRM and calendar.",
    },
    eyebrow: "Workflow automation agency",
    h1: "Workflow automation that connects your tools and removes the manual steps",
    intro:
      "Most businesses already have the tools — a website form, WhatsApp, Google Sheets, a calendar, maybe a CRM. The problem is the people in between, copying and chasing. As a workflow automation agency, we connect those tools so the work moves by itself, with AI steps where a simple rule isn't enough.",
    signsTitle: "Signs your workflows need automating",
    signs: [
      { title: "Copy-paste between apps", body: "The same details are typed into a sheet, a CRM and a message, every single time." },
      { title: "Work waits for one person", body: "Things only move when someone remembers to check, forward or update them." },
      { title: "Nobody knows the status", body: "Where is this lead? Was that invoice sent? The answer lives in someone's head." },
      { title: "Tools that don't talk", body: "Your apps each do their job, but nothing connects them into one flow." },
    ],
    buildsTitle: "Workflows we build",
    builds: [
      { title: "Lead to customer", body: "Form or WhatsApp enquiry → saved to your sheet or CRM → instant reply → owner assigned → follow-ups until they answer." },
      { title: "Booking and reminders", body: "Booking made → confirmation sent → reminder before the visit → re-booking message if they don't show." },
      { title: "Invoices and payments", body: "Job done → invoice created → payment reminders on a schedule → status updated when it's paid." },
      { title: "Reports that build themselves", body: "Daily or weekly summaries of leads, bookings and pending work, sent to WhatsApp or email." },
      { title: "AI workflow automation", body: "AI steps inside a workflow: read an email and decide where it goes, summarise a call note, pull details out of a document." },
      { title: "Custom integrations", body: "Where two tools have no ready-made connection, we connect them through their APIs or webhooks." },
    ],
    deepTitle: "Why we build on n8n",
    deep: [
      "We build most workflows on n8n, an open-source workflow automation platform. It can run in the cloud or on a server you own, it handles complex logic and AI steps well, and you are not tied to a platform that charges more every time your business grows.",
      "If your business already relies on another automation tool, we look at what you have first. The goal is a system that is reliable and that you own — not a rebuild for its own sake.",
    ],
    deepPoints: [
      "Open-source, so the workflows can run on infrastructure you own",
      "Error alerts, so a failed step never fails silently",
      "Clear, documented workflows your team can understand",
      "AI steps only where they add something a rule can't",
    ],
    faqs: [
      ["What is n8n?", "n8n is an open-source workflow automation tool. It connects apps, moves data between them and can include AI steps. Because it can be self-hosted, your workflows and data can stay on infrastructure you control."],
      ["n8n or Zapier — which is better?", "Both connect apps. Zapier is simple and fully hosted. n8n is open-source, can be self-hosted and handles more complex logic and AI steps. We recommend what fits your volume, budget and need for control — often that's n8n."],
      ["What happens if a workflow breaks?", "We build in error alerts and logs, so if a connected app changes or a step fails, someone is told straight away instead of the problem going unnoticed."],
      ["Can you work with the tools we already use?", "Yes — that's the starting point. We connect your existing forms, WhatsApp, sheets, calendar and CRM rather than asking you to switch."],
    ],
  },
  {
    slug: "business-process-automation",
    nav: "Business process automation",
    topic: "business process automation",
    metaTitle: "Business Process Automation Services | FlowHQ",
    metaDescription:
      "Business process automation for leads, bookings, follow-ups, invoicing and reporting. FlowHQ finds your biggest time drains and automates them. Free audit.",
    schema: {
      name: "Business process automation",
      serviceType: "Business process automation",
      description: "Automation of everyday business processes — lead handling, bookings, follow-ups, invoicing, onboarding and reporting — for small and growing businesses.",
    },
    eyebrow: "Business automation agency",
    h1: "Business process automation for growing businesses",
    intro:
      "Every business runs on the same few processes: getting leads, booking them in, following up, getting paid and keeping customers coming back. When those run on memory and manual work, things slip. We're a business automation agency that finds where your hours and revenue are leaking — and automates those processes first.",
    signsTitle: "Where most businesses lose time",
    signs: [
      { title: "Leads going cold", body: "Enquiries wait hours for a reply, and follow-ups stop after the first try." },
      { title: "No-shows and empty slots", body: "Bookings aren't confirmed or reminded, and missed slots are never filled again." },
      { title: "Manual busywork", body: "Data entry, reports, reconciliations and status updates eat your team's day." },
      { title: "Silent past customers", body: "People who bought once never hear from you again — no review request, no reason to return." },
    ],
    buildsTitle: "Processes we automate",
    builds: [
      { title: "Lead handling", body: "Every enquiry captured from every channel, answered quickly, logged in one place and followed up automatically." },
      { title: "Bookings and reminders", body: "Confirmations, reminders and re-booking for no-shows, without anyone having to remember." },
      { title: "Invoicing and payment reminders", body: "Invoices sent on time and polite reminders until they're paid, with the status always up to date." },
      { title: "Customer onboarding", body: "Welcome messages, forms and next steps sent in the right order the moment someone signs up." },
      { title: "Reviews and repeat business", body: "Review requests after each job, and timely nudges that bring past customers back." },
      { title: "Reporting", body: "The numbers you check every week, collected and sent to you automatically." },
    ],
    deepTitle: "How we decide what to automate first",
    deep: [
      "Automating the wrong thing wastes money. So we start with a free audit: we look at where your team spends its hours and where customers fall through the cracks, then rank each process by how much time it costs and how much revenue it puts at risk.",
      "You get a short, plain list of what's worth automating — and what isn't. We then give a fixed quote for the first system, build it on accounts you own, and only move to the next process once the first one is working.",
    ],
    deepPoints: [
      "Start with the process that costs you most",
      "Fixed quote before we start",
      "You own the system, the data and the accounts",
      "One working system before the next one",
    ],
    faqs: [
      ["Which processes should we automate first?", "Usually the ones closest to revenue: replying to and following up with leads, and confirming bookings. The free audit shows which process costs your business the most."],
      ["How long does it take?", "Most systems go live within a few weeks. Your free audit includes a realistic timeline for your business."],
      ["How much does business process automation cost?", "Every business is different, so the free audit ends with a fixed quote for your setup. You approve the number before anything starts — no hourly billing."],
      ["Will my team need training?", "A short handover is enough. The systems work inside the tools your team already uses, so their day gets simpler, not more complicated."],
    ],
  },
  {
    slug: "whatsapp-automation",
    nav: "WhatsApp automation",
    topic: "WhatsApp automation",
    metaTitle: "WhatsApp Automation for Business (Official API) | FlowHQ",
    metaDescription:
      "WhatsApp automation for businesses on Meta's official WhatsApp Business API: instant replies, booking reminders, follow-ups and a shared team inbox. Free audit.",
    schema: {
      name: "WhatsApp automation",
      serviceType: "WhatsApp Business API automation",
      description: "WhatsApp automation on Meta's official WhatsApp Business API: instant replies, reminders, follow-ups, human handover and CRM logging.",
    },
    eyebrow: "WhatsApp automation",
    h1: "WhatsApp automation for businesses, on the official WhatsApp Business API",
    intro:
      "Your customers already message you on WhatsApp. We make sure every one of those messages gets a fast reply, a follow-up and a place in your records — using Meta's official WhatsApp Business API, with your team able to step into any conversation.",
    signsTitle: "Signs you've outgrown manual WhatsApp",
    signs: [
      { title: "Messages pile up", body: "Chats wait for hours — especially evenings and weekends — and some never get answered." },
      { title: "One phone, many people", body: "The business number lives on one phone, so only one person can reply." },
      { title: "Reminders sent by hand", body: "Someone types out confirmations and reminders one by one, when they remember." },
      { title: "Conversations get lost", body: "Nothing from the chat makes it into a sheet or CRM, so there's no history." },
    ],
    buildsTitle: "WhatsApp automations we build",
    builds: [
      { title: "Instant replies", body: "Common questions answered immediately, day or night, using your own information." },
      { title: "Booking confirmations and reminders", body: "Approved message templates for confirmations, reminders and re-booking, sent at the right time." },
      { title: "Follow-ups", body: "A polite nudge to anyone who went quiet, so interested customers don't slip away." },
      { title: "Shared team inbox", body: "Several people can work the same WhatsApp number, with each chat assigned to someone." },
      { title: "Human handover", body: "When a customer needs a person, the chat goes to your team with a one-line summary." },
      { title: "CRM and sheet logging", body: "Every new contact and conversation saved to your sheet or CRM automatically." },
    ],
    deepTitle: "Official API, opted-in customers, approved templates",
    deep: [
      "We build only on Meta's official WhatsApp Business API — no unofficial tools, browser bots or bulk senders. Business-initiated messages use templates that Meta reviews and approves, and they go only to customers who have opted in to hear from you.",
      "That keeps your number in good standing and your messages welcome. Replies inside an open conversation can be more flexible, and your team can always take over by hand.",
    ],
    deepPoints: [
      "Meta's official WhatsApp Business API only",
      "Messages only to customers who opted in",
      "Meta-approved templates for reminders and updates",
      "Your team can step into any conversation",
    ],
    faqs: [
      ["Is WhatsApp automation allowed?", "Yes, when it's built on the official WhatsApp Business API and follows Meta's rules: customers opt in, and business-initiated messages use approved templates. That's the only way we build it."],
      ["Do I need the WhatsApp Business API?", "For automation at any real volume, yes. The regular WhatsApp Business app is meant for manual use on a phone. We help you set up the API on an account you own."],
      ["Can my team still reply by hand?", "Yes. Automation handles the routine messages, and any conversation can be picked up by a person — often from a shared inbox several people can use."],
      ["Can I keep my existing business number?", "Often, yes. A number can usually be moved to the API, with a few conditions set by Meta. We check your situation during the free audit."],
    ],
  },
];

export const getService = (slug: string) => SERVICES.find((s) => s.slug === slug);
