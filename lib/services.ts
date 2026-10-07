/**
 * Service pages — one search intent each (see SEO_LAUNCH_CHECKLIST.md for the keyword → page map).
 * Plain language, no invented stats, clients or prices. Rendered by app/[service]/page.tsx;
 * listed in the sitemap, footer and homepage.
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
  /** how the system works, step by step */
  how: { title: string; body: string }[];
  /** concrete example flows (no client names, no invented results) */
  examples: { title: string; flow: string[] }[];
  integrations: string[];
  whoFor: string[];
  faqs: [string, string][];
  related: string[]; // service slugs
  resources: string[]; // resource slugs
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
    metaTitle: "AI Automation Agency | Custom AI Automation Services | Flow HQ",
    metaDescription:
      "Flow HQ is an AI automation agency building custom AI agents and workflows that reply, sort, extract and follow up — connected to your tools, with your team in control.",
    schema: {
      name: "AI automation services",
      serviceType: "AI automation",
      description: "Custom AI agents and AI-powered workflows for businesses: enquiry replies, lead qualification, data extraction and internal assistants.",
    },
    eyebrow: "AI automation agency",
    h1: "AI automation services that do real work for your business",
    intro:
      "Flow HQ is an AI automation agency. We build AI agents and AI-powered workflows that answer enquiries, sort leads, pull data out of messages and documents, and draft follow-ups — connected to the tools your team already uses, with a person in control wherever it matters.",
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
    how: [
      { title: "Map the work", body: "We look at the messages, documents and decisions your team handles every day and pick the ones AI can take over safely." },
      { title: "Ground it in your information", body: "The AI works from your price lists, policies and past answers — not the open internet — so replies stay accurate." },
      { title: "Connect it to your tools", body: "Outputs land where your team already works: WhatsApp, email, your sheet or CRM." },
      { title: "Set the limits", body: "We define what the AI does alone, what it only suggests, and what always goes to a person, then log every action." },
    ],
    examples: [
      { title: "Enquiry triage", flow: ["Email or WhatsApp enquiry arrives", "AI reads it and tags intent and urgency", "One-line summary saved to the CRM", "Routed to the right person, with a drafted reply"] },
      { title: "Invoice extraction", flow: ["Supplier invoice arrives as a PDF", "AI pulls supplier, amount and due date", "Accounts sheet updated", "Payment reminder scheduled"] },
      { title: "Internal assistant", flow: ["Staff member asks a policy question", "Assistant answers from your own documents", "Links the source document", "Flags anything it isn't sure about"] },
    ],
    integrations: ["WhatsApp Business API", "Gmail / Outlook", "Google Sheets", "HubSpot, Zoho and other CRMs", "Website forms", "PDFs and documents", "OpenAI / Anthropic models", "n8n"],
    whoFor: ["Teams answering the same questions all day", "Businesses with lots of incoming messages or documents", "Owners who want AI without losing control of customer conversations"],
    faqs: [
      ["What does an AI automation agency actually do?", "We find the repetitive work in your business that AI can handle — replying, sorting, extracting, drafting — then build and connect a system that does it inside the tools you already use. You get a working system, not a report."],
      ["Will AI reply to my customers on its own?", "Only where you want it to. Most businesses let AI answer routine questions instantly and send anything unusual to a person. You decide the rules, and you can change them later."],
      ["Is my business data safe?", "We build on accounts you own, keep customer data on infrastructure you control, and only send to an AI model what a task needs. Nothing is locked inside our systems."],
      ["Do I need technical staff to run it?", "No. We set it up, connect it and train your team. Day to day, your staff just see faster replies, cleaner data and fewer things to remember."],
    ],
    related: ["ai-workflow-automation", "ai-receptionist", "business-process-automation"],
    resources: ["ai-automation-for-small-businesses", "how-ai-automation-works", "ai-automation-vs-workflow-automation"],
  },
  {
    slug: "ai-workflow-automation",
    nav: "AI workflow automation",
    topic: "AI workflow automation",
    metaTitle: "AI Workflow Automation Services (n8n + AI) | Flow HQ",
    metaDescription:
      "AI workflow automation that connects your forms, WhatsApp, email, sheets and CRM — with AI steps where rules aren't enough. Built on n8n, owned by you.",
    schema: {
      name: "AI workflow automation",
      serviceType: "Workflow automation",
      description:
        "Custom workflow automation with n8n and AI steps, connecting a business's forms, messaging, email, spreadsheets, CRM and calendar so work moves without manual hand-offs.",
    },
    eyebrow: "AI workflow automation",
    h1: "AI workflow automation that connects your tools and removes the manual steps",
    intro:
      "Most businesses already have the tools — a website form, WhatsApp, email, Google Sheets, a calendar, maybe a CRM. The problem is the people in between, copying and chasing. We connect those tools into workflows that move work along by themselves, and add AI steps wherever a simple rule can't make the decision.",
    signsTitle: "Signs your workflows need automating",
    signs: [
      { title: "Copy-paste between apps", body: "The same details are typed into a sheet, a CRM and a message, every single time." },
      { title: "Work waits for one person", body: "Things only move when someone remembers to check, forward or update them." },
      { title: "Nobody knows the status", body: "Where is this request? Was that invoice sent? The answer lives in someone's head." },
      { title: "Rules that keep breaking", body: "Simple automations fail on real-world messages that don't fit a fixed format." },
    ],
    buildsTitle: "Workflows we build",
    builds: [
      { title: "Request routing", body: "Incoming emails, forms and messages read by AI and sent to the right person or system, with a summary attached." },
      { title: "Data in, data synced", body: "A detail entered once — in a form, a sheet or the CRM — is updated everywhere else automatically." },
      { title: "Approvals", body: "Quotes, discounts or expenses routed for approval on WhatsApp or email, with the decision recorded." },
      { title: "Document handling", body: "AI pulls details out of PDFs, invoices and attachments and files them where they belong." },
      { title: "Scheduled reporting", body: "Daily or weekly summaries assembled from several tools and sent to the people who need them." },
      { title: "Custom integrations", body: "Where two tools have no ready-made connection, we connect them through their APIs or webhooks." },
    ],
    deepTitle: "Rules where rules work, AI where they don't",
    deep: [
      "Traditional workflow automation follows fixed rules: if this field says X, do Y. That is fast, cheap and predictable — and it breaks the moment a customer writes something unexpected. AI steps fill that gap: they read free text, classify it, extract details and draft responses.",
      "We build most workflows on n8n, an open-source automation platform that can run in the cloud or on a server you own. Rule-based steps do the predictable work; AI steps handle the messy parts; every run is logged, and failures alert a person instead of failing silently.",
    ],
    deepPoints: [
      "Open-source platform that can run on infrastructure you own",
      "AI steps only where a rule can't do the job",
      "Error alerts, so a failed step never fails silently",
      "Documented workflows your team can understand",
    ],
    how: [
      { title: "Map the hand-offs", body: "We trace one piece of work from start to finish and mark every place a person copies, checks or forwards something." },
      { title: "Design the workflow", body: "Each hand-off becomes a step: a trigger, a rule, an AI step or an approval." },
      { title: "Connect and test", body: "We connect your tools and run real examples from your business through it before anything goes live." },
      { title: "Monitor", body: "Every run is logged; errors alert a person; we tune the workflow in the first weeks." },
    ],
    examples: [
      { title: "Inbox to action", flow: ["Email arrives in a shared inbox", "AI classifies it: order, complaint, invoice or question", "Ticket or task created in the right tool", "Owner notified with a one-line summary"] },
      { title: "Quote approval", flow: ["Salesperson submits a quote form", "Discounts above a limit go to the owner on WhatsApp", "Approve or reject with one tap", "Customer receives the approved quote"] },
      { title: "Supplier delay", flow: ["Supplier emails about a late delivery", "AI finds the affected orders", "Customers informed automatically", "Operations sees an updated schedule"] },
    ],
    integrations: ["n8n", "Google Workspace", "Microsoft 365", "WhatsApp Business API", "Slack", "HubSpot / Zoho / Pipedrive", "Webhooks and REST APIs", "OpenAI / Anthropic models"],
    whoFor: ["Teams juggling five or more tools", "Operations with lots of hand-offs between people", "Businesses whose current automations keep breaking on real-world input"],
    faqs: [
      ["What is AI workflow automation?", "It's workflow automation — tools connected so work moves without manual hand-offs — with AI steps added where a decision needs reading or judgement, such as classifying an email or extracting details from a document."],
      ["What is n8n?", "n8n is an open-source workflow automation tool. It connects apps, moves data between them and can include AI steps. Because it can be self-hosted, your workflows and data can stay on infrastructure you control."],
      ["n8n or Zapier — which is better?", "Both connect apps. Zapier is simple and fully hosted. n8n is open-source, can be self-hosted and handles more complex logic and AI steps. We recommend what fits your volume, budget and need for control."],
      ["What happens if a workflow breaks?", "We build in error alerts and logs, so if a connected app changes or a step fails, someone is told straight away instead of the problem going unnoticed."],
    ],
    related: ["business-process-automation", "ai-automation", "crm-automation"],
    resources: ["ai-automation-vs-workflow-automation", "business-process-automation-guide", "automation-mistakes-small-businesses"],
  },
  {
    slug: "business-process-automation",
    nav: "Business process automation",
    topic: "business process automation",
    metaTitle: "Business Process Automation Services | Flow HQ",
    metaDescription:
      "Business process automation for onboarding, follow-ups, invoicing, data entry and reporting. Flow HQ finds your biggest time drains and automates them first.",
    schema: {
      name: "Business process automation",
      serviceType: "Business process automation",
      description: "Automation of everyday business processes — lead handling, onboarding, follow-ups, invoicing, data entry and reporting — for small and growing businesses.",
    },
    eyebrow: "Business automation agency",
    h1: "Business process automation for growing businesses",
    intro:
      "Every business runs on the same few processes: winning customers, onboarding them, delivering the work, getting paid and reporting on it. When those run on memory and manual work, things slip and your team spends its day on admin. We find where your hours and revenue are leaking — and automate those processes first.",
    signsTitle: "Where most businesses lose time",
    signs: [
      { title: "Leads going cold", body: "Enquiries wait hours for a reply, and follow-ups stop after the first try." },
      { title: "Tools that don't talk", body: "Customer details live in five places, and someone keeps them in sync by hand." },
      { title: "Manual busywork", body: "Data entry, reports, reconciliations and status updates eat your team's day." },
      { title: "Silent past customers", body: "People who bought once never hear from you again — no review request, no reason to return." },
    ],
    buildsTitle: "Processes we automate",
    builds: [
      { title: "Lead handling", body: "Every enquiry captured from every channel, answered quickly, logged in one place and followed up automatically." },
      { title: "Data entry and syncing", body: "Details captured once and copied into every tool that needs them — no retyping." },
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
    how: [
      { title: "Audit", body: "We list the processes your team repeats every week and measure the time and money each one costs." },
      { title: "Prioritise", body: "Each process is ranked by hours saved and revenue at risk, so the first build pays back fastest." },
      { title: "Design and build", body: "We map the process step by step, then automate it inside the tools you already use." },
      { title: "Hand over and improve", body: "Your team gets a short walkthrough; we monitor the first weeks and adjust." },
    ],
    examples: [
      { title: "New customer onboarding", flow: ["Customer signs up or pays", "Welcome message and forms sent", "Record created in your CRM", "Kick-off task assigned to your team"] },
      { title: "Getting paid", flow: ["Job marked complete", "Invoice generated and sent", "Polite reminders on a schedule", "Status updated when it's paid"] },
      { title: "Weekly reporting", flow: ["Data pulled from your sheet, CRM and accounts", "Summary built automatically", "Sent to WhatsApp or email every Monday"] },
    ],
    integrations: ["Google Workspace", "Microsoft 365", "Zoho / HubSpot", "Tally and accounting tools", "Razorpay and payment links", "WhatsApp Business API", "Calendars", "n8n"],
    whoFor: ["Growing teams where admin is eating into real work", "Owners who are the bottleneck for every update", "Businesses whose processes live in people's heads"],
    faqs: [
      ["Which processes should we automate first?", "Usually the ones that are frequent, rule-based and close to revenue — lead follow-up, onboarding, invoicing and data entry. The free audit shows which process costs your business the most."],
      ["How long does it take?", "Most systems go live within a few weeks. Your free audit includes a realistic timeline for your business."],
      ["How much does business process automation cost?", "Every business is different, so the free audit ends with a fixed quote for your setup. You approve the number before anything starts — no hourly billing."],
      ["Will my team need training?", "A short handover is enough. The systems work inside the tools your team already uses, so their day gets simpler, not more complicated."],
    ],
    related: ["ai-workflow-automation", "crm-automation", "ai-automation"],
    resources: ["business-process-automation-guide", "what-business-processes-to-automate", "automation-roi"],
  },
  {
    slug: "whatsapp-automation",
    nav: "WhatsApp automation",
    topic: "WhatsApp automation",
    metaTitle: "WhatsApp Automation for Business (Official API) | Flow HQ",
    metaDescription:
      "WhatsApp automation on Meta's official WhatsApp Business API: instant replies, reminders, follow-ups, a shared team inbox and automatic CRM logging.",
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
    how: [
      { title: "Set up the official API", body: "We connect your number to Meta's WhatsApp Business API on an account you own." },
      { title: "Approve your templates", body: "Confirmations, reminders and updates are written as templates and submitted to Meta for approval." },
      { title: "Automate replies and follow-ups", body: "Common questions are answered instantly; quiet conversations get a polite nudge." },
      { title: "Connect your team", body: "A shared inbox, human handover and automatic logging to your sheet or CRM." },
    ],
    examples: [
      { title: "After-hours enquiry", flow: ["Customer messages at 10 PM", "Instant answer from your own information", "Contact saved to the CRM", "Team picks it up in the morning with context"] },
      { title: "Order or appointment update", flow: ["Status changes in your system", "Approved template sent to the customer", "Reply routed to the right person"] },
      { title: "Re-engagement", flow: ["Customer opted in and went quiet", "Timed, relevant message sent", "Interested replies flagged for your team"] },
    ],
    integrations: ["WhatsApp Business API (Meta)", "Shared inbox tools", "Google Sheets", "CRMs", "Calendars", "Payment links", "n8n"],
    whoFor: ["Businesses whose customers prefer WhatsApp", "Teams sharing one business number", "Anyone sending reminders and updates by hand"],
    faqs: [
      ["Is WhatsApp automation allowed?", "Yes, when it's built on the official WhatsApp Business API and follows Meta's rules: customers opt in, and business-initiated messages use approved templates. That's the only way we build it."],
      ["Do I need the WhatsApp Business API?", "For automation at any real volume, yes. The regular WhatsApp Business app is meant for manual use on a phone. We help you set up the API on an account you own."],
      ["Can my team still reply by hand?", "Yes. Automation handles the routine messages, and any conversation can be picked up by a person — often from a shared inbox several people can use."],
      ["Can I keep my existing business number?", "Often, yes. A number can usually be moved to the API, with a few conditions set by Meta. We check your situation during the free audit."],
    ],
    related: ["ai-receptionist", "lead-automation", "crm-automation"],
    resources: ["automate-lead-follow-up", "ai-receptionist-vs-receptionist"],
  },
  {
    slug: "crm-automation",
    nav: "CRM automation",
    topic: "CRM automation",
    metaTitle: "CRM Automation Services — Keep Your CRM Up to Date | Flow HQ",
    metaDescription:
      "CRM automation that captures every contact, logs every conversation, moves deals forward and reminds your team — in HubSpot, Zoho, Pipedrive or a Google Sheet.",
    schema: {
      name: "CRM automation",
      serviceType: "CRM automation",
      description:
        "Automation that keeps a business's CRM complete and current: contact capture, activity logging, pipeline updates, task creation and reporting.",
    },
    eyebrow: "CRM automation",
    h1: "CRM automation that keeps your customer records complete — without anyone typing",
    intro:
      "A CRM is only useful if it's up to date, and keeping it up to date is exactly the job nobody has time for. We automate the capture, logging and follow-through, so every contact, conversation and next step lands in your CRM by itself — whether that's HubSpot, Zoho, Pipedrive or a well-organised Google Sheet.",
    signsTitle: "Signs your CRM needs automating",
    signs: [
      { title: "Half the contacts are missing", body: "Enquiries from WhatsApp, calls or email never make it into the CRM." },
      { title: "Stages are out of date", body: "The pipeline says 'new' for customers you closed weeks ago." },
      { title: "Notes live elsewhere", body: "The real history of a customer is in someone's chat or inbox, not the record." },
      { title: "Follow-ups are forgotten", body: "Nobody is reminded when a deal goes quiet, so it quietly dies." },
    ],
    buildsTitle: "CRM automations we build",
    builds: [
      { title: "Automatic contact capture", body: "Every form, WhatsApp chat, email and missed call creates or updates a contact — with duplicates merged." },
      { title: "Activity logging", body: "Messages, calls and emails attached to the right record automatically, with an AI summary on top." },
      { title: "Pipeline updates", body: "Deals move stage when something real happens: a quote is sent, a payment arrives, a form is signed." },
      { title: "Tasks and reminders", body: "Follow-up tasks created and assigned when a deal stalls, with a reminder before it goes cold." },
      { title: "Data clean-up", body: "Phone numbers formatted, missing fields filled from other sources, junk entries flagged." },
      { title: "Reports and dashboards", body: "Pipeline, response times and sources summarised and sent to you on a schedule." },
    ],
    deepTitle: "Your CRM should be a by-product of the work, not extra work",
    deep: [
      "Most CRM projects fail for one reason: they ask busy people to do data entry. We flip that. The system watches the places where work already happens — your inbox, WhatsApp, forms, calendar and invoices — and updates the CRM from there.",
      "If you don't have a CRM yet, we'll recommend the simplest one that fits, set it up on an account you own, and import what you already have. If you do, we work inside it rather than replacing it.",
    ],
    deepPoints: [
      "Works with HubSpot, Zoho, Pipedrive, Salesforce or a Google Sheet",
      "No double entry for your team",
      "Duplicates merged, data kept clean",
      "Your account, your data",
    ],
    how: [
      { title: "Audit your current records", body: "We check what's in the CRM today, what's missing, and where customer information actually lives." },
      { title: "Define the pipeline", body: "Clear stages and the real events that should move a deal from one to the next." },
      { title: "Connect the sources", body: "Forms, WhatsApp, email, calendar and payments feed the CRM automatically." },
      { title: "Automate the follow-through", body: "Tasks, reminders and reports are triggered by what happens in the CRM." },
    ],
    examples: [
      { title: "WhatsApp to CRM", flow: ["Customer messages on WhatsApp", "Contact created or matched", "Conversation summary logged", "Deal opened at the right stage"] },
      { title: "Stalled deal", flow: ["No reply for five days after a quote", "Follow-up task created for the owner", "Drafted message ready to send", "Deal flagged in the weekly report"] },
      { title: "Payment received", flow: ["Payment confirmed by your gateway", "Deal marked won", "Onboarding sequence started", "Invoice filed against the customer"] },
    ],
    integrations: ["HubSpot", "Zoho CRM", "Pipedrive", "Salesforce", "Google Sheets", "WhatsApp Business API", "Gmail / Outlook", "Razorpay / Stripe", "n8n"],
    whoFor: ["Sales teams whose CRM is always behind", "Businesses running customers out of spreadsheets", "Owners who can't see the pipeline without asking"],
    faqs: [
      ["Do I need to replace my CRM?", "No. We automate the CRM you already use. If you don't have one, we'll suggest the simplest option that fits — sometimes that's a well-structured Google Sheet."],
      ["Which CRMs do you work with?", "HubSpot, Zoho, Pipedrive and Salesforce are common, and most CRMs with an API can be connected. We confirm what's possible for your setup in the free audit."],
      ["What about the data we already have?", "We clean and import it: duplicates merged, numbers formatted, records linked. You keep everything."],
      ["Will my team still need to update the CRM?", "Much less. Routine updates happen automatically; your team adds the things only a person knows, like the outcome of a meeting."],
    ],
    related: ["lead-automation", "ai-workflow-automation", "whatsapp-automation"],
    resources: ["how-crm-automation-works", "automate-lead-follow-up", "what-business-processes-to-automate"],
  },
  {
    slug: "lead-automation",
    nav: "Lead automation",
    topic: "lead automation",
    metaTitle: "Lead Automation — Instant Replies & Automated Follow-up | Flow HQ",
    metaDescription:
      "Lead automation that captures every enquiry, replies in seconds, qualifies it with AI and follows up until the customer answers — across WhatsApp, forms and email.",
    schema: {
      name: "Lead automation",
      serviceType: "Lead management automation",
      description:
        "Automated lead capture, instant response, AI qualification, routing and multi-step follow-up for businesses that receive enquiries across several channels.",
    },
    eyebrow: "Lead automation",
    h1: "Lead automation: every enquiry answered, qualified and followed up",
    intro:
      "Leads don't usually go cold because the business wasn't good enough. They go cold because nobody replied fast enough, or nobody followed up a second time. We automate the first reply, the qualification, the hand-off to the right person and the follow-ups — so every enquiry gets a fair chance to become a customer.",
    signsTitle: "Signs you're losing leads",
    signs: [
      { title: "Replies take hours", body: "Enquiries that arrive after hours or on busy days wait until someone is free." },
      { title: "One follow-up, then nothing", body: "If a lead doesn't answer the first message, the conversation simply ends." },
      { title: "Leads scattered everywhere", body: "Forms, WhatsApp, calls and email — with no single list of who asked what." },
      { title: "Everyone gets the same treatment", body: "Hot, ready-to-buy leads wait in the same queue as casual questions." },
    ],
    buildsTitle: "Lead automations we build",
    builds: [
      { title: "Instant first response", body: "A helpful reply within seconds on the channel the customer used, using your own information." },
      { title: "AI qualification", body: "Each enquiry is read and tagged: what they want, budget or timing hints, and how urgent it is." },
      { title: "Routing", body: "Leads assigned to the right person by service, location or value — with the context attached." },
      { title: "Follow-up sequences", body: "A short series of polite, spaced follow-ups that stops the moment the customer replies." },
      { title: "Missed-call text-back", body: "A missed call triggers a WhatsApp or SMS so the conversation continues." },
      { title: "Lead reporting", body: "Where leads come from, how fast they're answered and what happens to them — weekly, automatically." },
    ],
    deepTitle: "Speed matters, but so does judgement",
    deep: [
      "A fast reply keeps a customer's attention; a relevant one earns their trust. So the first response comes from your own answers — prices, availability, next steps — and anything outside them is passed to a person with a summary, rather than guessed.",
      "Follow-ups are written to sound like your business, spaced out sensibly, and only sent on channels the customer has used or agreed to. The aim is a helpful nudge, not spam.",
    ],
    deepPoints: [
      "Replies from your own information",
      "Hot leads flagged for a person immediately",
      "Follow-ups stop the moment someone replies",
      "Every lead logged in one place",
    ],
    how: [
      { title: "Capture every channel", body: "Forms, WhatsApp, email, calls and ads all feed one lead list." },
      { title: "Respond and qualify", body: "An instant reply, then AI tags intent and urgency." },
      { title: "Route", body: "The right person gets the lead with a one-line summary." },
      { title: "Follow up until there's an answer", body: "A short, spaced sequence that ends when the customer replies or says no." },
    ],
    examples: [
      { title: "Website enquiry at night", flow: ["Form submitted at 11 PM", "Instant reply with the next step", "Lead tagged 'ready to buy'", "Owner sees it first thing with context"] },
      { title: "Quiet lead", flow: ["Quote sent, no reply", "Follow-up after 2 days", "Second follow-up after 5 days", "Marked 'not now' if still silent"] },
      { title: "Missed call", flow: ["Call missed during a meeting", "WhatsApp sent within a minute", "Customer replies with their question", "Lead logged and assigned"] },
    ],
    integrations: ["Website forms", "WhatsApp Business API", "Meta / Google lead forms", "Gmail / Outlook", "Phone systems (missed calls)", "HubSpot / Zoho / Google Sheets", "n8n"],
    whoFor: ["Businesses that rely on enquiries to win work", "Teams too busy to reply within minutes", "Anyone running ads without a follow-up system"],
    faqs: [
      ["How fast are leads answered?", "Usually within seconds, on the same channel the customer used. Anything the system can't answer is passed to a person straight away."],
      ["Won't automated follow-ups annoy people?", "Not when they're few, spaced out and relevant. Sequences stop the moment someone replies, and we write them to sound like your business."],
      ["Can it work with our ad leads?", "Yes. Leads from Meta and Google lead forms can be captured, answered and followed up the same way as any other enquiry."],
      ["Where do the leads end up?", "In one place you own — your CRM or a Google Sheet — with source, status and history for every lead."],
    ],
    related: ["crm-automation", "whatsapp-automation", "ai-receptionist"],
    resources: ["automate-lead-follow-up", "how-crm-automation-works", "ai-automation-for-small-businesses"],
  },
  {
    slug: "ai-receptionist",
    nav: "AI receptionist",
    topic: "AI receptionists",
    metaTitle: "AI Receptionist for Business — Answers Every Enquiry 24/7 | Flow HQ",
    metaDescription:
      "An AI receptionist that answers enquiries on WhatsApp and your website around the clock, captures details, books appointments and hands over to your team.",
    schema: {
      name: "AI receptionist",
      serviceType: "AI receptionist",
      description:
        "A custom AI receptionist for chat channels that answers common questions, captures enquiry details, books appointments and hands conversations to staff.",
    },
    eyebrow: "AI receptionist",
    h1: "An AI receptionist that answers every enquiry, day or night",
    intro:
      "Customers expect an answer when they ask, not when your front desk is free. An AI receptionist handles the first conversation on WhatsApp and your website: it answers common questions from your own information, takes down the details, books a time where it can, and passes anything else to your team — with the conversation already summarised.",
    signsTitle: "Signs you need an AI receptionist",
    signs: [
      { title: "Enquiries after hours", body: "Evenings and weekends bring messages that wait until the next working day." },
      { title: "The front desk is overloaded", body: "Your team answers the same five questions while customers in front of them wait." },
      { title: "Details get lost", body: "Names, numbers and requests are scribbled down or never recorded at all." },
      { title: "Booking takes several messages", body: "Finding a time that works means a long back-and-forth." },
    ],
    buildsTitle: "What your AI receptionist does",
    builds: [
      { title: "Answers common questions", body: "Prices, services, timings, location and policies — from information you approve." },
      { title: "Captures enquiry details", body: "Name, contact, what they need and when, saved straight to your CRM or sheet." },
      { title: "Books and reschedules", body: "Offers real available slots from your calendar and confirms the booking." },
      { title: "Hands over cleanly", body: "Passes the chat to a person when needed, with a summary so nobody asks twice." },
      { title: "Speaks your customers' language", body: "Can reply in English, Hindi and other languages your customers use." },
      { title: "Follows up", body: "Sends confirmations, reminders and a check-in if a conversation goes quiet." },
    ],
    deepTitle: "Helpful, honest, and clear about what it is",
    deep: [
      "A good AI receptionist doesn't pretend to be a person and doesn't make things up. It answers from the information you give it, says so when it doesn't know, and hands over to your team for anything sensitive — complaints, payments, medical or legal questions.",
      "We start with chat channels (WhatsApp and website), where an AI assistant is reliable today and easy to monitor. Every conversation is logged, and you can review and improve its answers at any time.",
    ],
    deepPoints: [
      "Answers only from information you approve",
      "Clear hand-off to a person, with context",
      "Every conversation logged for review",
      "Your team can take over any chat",
    ],
    how: [
      { title: "Collect your answers", body: "We gather the questions customers actually ask and the answers you want given." },
      { title: "Connect your channels and calendar", body: "WhatsApp, website chat and your booking calendar or CRM." },
      { title: "Set hand-over rules", body: "What it handles alone, and what always goes to a person." },
      { title: "Review and improve", body: "We read real conversations in the first weeks and refine the answers." },
    ],
    examples: [
      { title: "Weekend enquiry", flow: ["Customer asks about price and availability on Sunday", "Receptionist answers and offers slots", "Booking confirmed in the calendar", "Reminder sent the day before"] },
      { title: "Hand-over", flow: ["Customer raises a complaint", "Receptionist acknowledges and stops", "Chat assigned to the manager with a summary", "Manager replies in the same thread"] },
      { title: "Detail capture", flow: ["New customer asks for a quote", "Receptionist collects requirements", "Details saved to the CRM", "Quote task created for the team"] },
    ],
    integrations: ["WhatsApp Business API", "Website chat widget", "Google Calendar / Outlook", "Booking tools", "HubSpot / Zoho / Google Sheets", "n8n", "OpenAI / Anthropic models"],
    whoFor: ["Clinics, studios and service businesses with busy front desks", "Businesses getting enquiries outside working hours", "Teams that want faster replies without hiring for evenings"],
    faqs: [
      ["Will customers know they're talking to AI?", "They should, and we recommend saying so. Customers mostly care about getting a quick, correct answer — and knowing a person is available when they need one."],
      ["Can it answer phone calls?", "We focus on chat channels like WhatsApp and website chat, where AI is reliable and easy to review. Missed calls can trigger a WhatsApp message so the conversation continues in chat."],
      ["What if it doesn't know the answer?", "It says so and hands the conversation to your team, rather than guessing."],
      ["Does it replace our receptionist?", "It takes the repetitive first conversations off their plate, especially out of hours, so your team can focus on the customers in front of them."],
    ],
    related: ["whatsapp-automation", "lead-automation", "ai-automation"],
    resources: ["ai-receptionist-vs-receptionist", "how-ai-automation-works", "ai-automation-for-small-businesses"],
  },
];

export const getService = (slug: string) => SERVICES.find((s) => s.slug === slug);
