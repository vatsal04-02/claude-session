/**
 * Industry pages: only where the workflows genuinely differ. No invented clients or results.
 * Rendered by app/industries/[industry]/page.tsx.
 */
export type Industry = {
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  problems: { title: string; body: string }[];
  workflows: { title: string; flow: string[] }[];
  tools: string[];
  care: { title: string; body: string };
  faqs: [string, string][];
  services: string[];
  resources: string[];
};

export const INDUSTRIES: Industry[] = [
  {
    slug: "healthcare",
    name: "Clinics & healthcare",
    metaTitle: "Automation for Clinics & Healthcare Practices | Flow HQ",
    metaDescription:
      "Front-desk and admin automation for clinics: appointment requests, reminders, intake forms, follow-ups and records — designed around patient privacy.",
    h1: "Automation for clinics and healthcare practices",
    intro:
      "Clinic teams spend much of the day on the phone and on WhatsApp: confirming appointments, answering the same questions, chasing forms and reminding patients. We automate that administrative layer so your front desk has more time for the patients in front of them — without automating anything clinical.",
    problems: [
      { title: "The phone never stops", body: "Timings, fees, directions and doctor availability — answered one call at a time." },
      { title: "No-shows", body: "Appointments without confirmation or reminders leave gaps in the schedule." },
      { title: "Paper and repeated forms", body: "Patients fill in the same details on every visit, and staff retype them." },
      { title: "Follow-ups slip", body: "Review visits and test-result calls depend on someone remembering." },
    ],
    workflows: [
      { title: "Appointment requests", flow: ["Patient asks on WhatsApp or the website", "Available slots offered", "Booking confirmed in the calendar", "Reminder sent the day before"] },
      { title: "Digital intake", flow: ["Booking confirmed", "Intake form link sent", "Details saved to the patient record", "Front desk sees a complete file on arrival"] },
      { title: "Follow-up visits", flow: ["Doctor marks a review in 2 weeks", "Reminder scheduled automatically", "Patient picks a slot", "Missed follow-ups flagged to staff"] },
    ],
    tools: ["WhatsApp Business API", "Google Calendar / practice calendars", "Google Forms / Typeform", "Google Sheets", "Practice management software with an API", "n8n"],
    care: {
      title: "Admin only, privacy first",
      body: "We automate scheduling and communication, never diagnosis or medical advice. Systems collect only the data a task needs, keep it in accounts the clinic controls, and pass any clinical question to staff. We design with consent and India's Digital Personal Data Protection Act in mind; you remain responsible for your regulatory obligations.",
    },
    faqs: [
      ["Can AI answer patients' medical questions?", "No. We design the system to handle administrative questions only — timings, fees, bookings — and pass anything clinical to your staff."],
      ["Will it work with our practice software?", "If your software has an API or can export and import data, usually yes. Where it doesn't, we work alongside it with a calendar and a sheet. We check during the free audit."],
      ["Where is patient data stored?", "In accounts your clinic owns and controls. Only the minimum information needed for each task is passed between tools."],
    ],
    services: ["ai-receptionist", "whatsapp-automation", "business-process-automation"],
    resources: ["ai-receptionist-vs-receptionist", "ai-automation-for-small-businesses"],
  },
  {
    slug: "real-estate",
    name: "Real estate",
    metaTitle: "Real Estate Automation — Lead Follow-up & Site Visits | Flow HQ",
    metaDescription:
      "Automation for real estate teams: instant replies to property enquiries, lead qualification, site-visit scheduling, follow-ups and CRM updates.",
    h1: "Automation for real estate teams",
    intro:
      "Property enquiries arrive from portals, ads, WhatsApp and calls — often at night and on weekends, and often for the same few listings. The teams that reply first and follow up consistently get the site visits. We automate the reply, qualification, scheduling and follow-up, so your agents spend their time on serious buyers.",
    problems: [
      { title: "Enquiries from everywhere", body: "Portals, ads, WhatsApp and calls — with no single list of who asked about what." },
      { title: "Slow first replies", body: "A buyer who enquires at 9 PM has contacted three other agents by morning." },
      { title: "Unqualified leads", body: "Agents spend hours on enquiries with no budget, timeline or real intent." },
      { title: "Follow-ups stop early", body: "Buyers take weeks to decide; follow-up rarely lasts that long." },
    ],
    workflows: [
      { title: "Portal enquiry", flow: ["Enquiry arrives from a portal or ad form", "Instant WhatsApp reply with listing details", "Budget, location and timeline asked", "Qualified lead assigned to an agent"] },
      { title: "Site-visit scheduling", flow: ["Buyer asks to visit", "Available slots offered", "Visit confirmed with location pin", "Reminder before the visit and feedback after"] },
      { title: "Long follow-up", flow: ["Buyer not ready yet", "Relevant new listings shared over the following weeks", "Engagement tracked in the CRM", "Agent alerted when the buyer re-engages"] },
    ],
    tools: ["Property portal lead emails", "Meta / Google lead forms", "WhatsApp Business API", "HubSpot / Zoho / Google Sheets", "Google Calendar", "n8n"],
    care: {
      title: "Respectful, opted-in messaging",
      body: "Follow-ups go only to people who enquired or opted in, use approved WhatsApp templates, and stop when someone says they're not interested. Each agent sees the full history before they call.",
    },
    faqs: [
      ["Can it capture leads from property portals?", "Usually, yes — most portals send enquiries by email or offer an integration, which we can read and route automatically."],
      ["Will buyers know they're talking to a system?", "The first reply and scheduling are automated; conversations about price and negotiation go to your agents."],
      ["Can each agent get their own leads?", "Yes. Leads can be routed by project, location, budget or round-robin, with the context attached."],
    ],
    services: ["lead-automation", "crm-automation", "whatsapp-automation"],
    resources: ["automate-lead-follow-up", "how-crm-automation-works"],
  },
  {
    slug: "home-services",
    name: "Home services",
    metaTitle: "Automation for Home Service Businesses | Flow HQ",
    metaDescription:
      "Automation for home service businesses: missed-call text-back, quote requests, job scheduling, technician updates, invoices and review requests.",
    h1: "Automation for home service businesses",
    intro:
      "Plumbers, electricians, cleaners, pest control and repair teams are usually on a job when the next customer calls. Missed calls become missed work, and admin piles up for the evening. We automate the enquiry, quote, scheduling and payment steps so jobs keep coming in while your team is busy doing them.",
    problems: [
      { title: "Missed calls while on a job", body: "The phone rings during work, and the customer calls a competitor instead." },
      { title: "Quotes take too long", body: "Photos and details arrive on WhatsApp and wait until the evening to be priced." },
      { title: "Scheduling by phone", body: "Back-and-forth calls to agree a time, and reschedules that get lost." },
      { title: "Chasing payments and reviews", body: "Invoices go out late, reminders are awkward, and happy customers never leave a review." },
    ],
    workflows: [
      { title: "Missed-call text-back", flow: ["Call missed during a job", "WhatsApp sent within a minute", "Customer describes the problem and sends photos", "Job request logged for quoting"] },
      { title: "Job scheduling", flow: ["Quote accepted", "Customer picks an available slot", "Technician assigned and notified", "Customer gets an 'on the way' message"] },
      { title: "After the job", flow: ["Job marked complete", "Invoice and payment link sent", "Reminder if unpaid", "Review request once paid"] },
    ],
    tools: ["Phone systems (missed calls)", "WhatsApp Business API", "Google Calendar", "Job management apps with an API", "Razorpay / UPI payment links", "Google Sheets", "n8n"],
    care: {
      title: "Built for people on the move",
      body: "Technicians get updates on WhatsApp, not another app to learn. Owners get a daily summary of jobs, quotes and unpaid invoices.",
    },
    faqs: [
      ["Do my technicians need a new app?", "No. Updates and job details go to WhatsApp, which they already use."],
      ["Can customers pay online?", "Yes. Invoices can include a payment link, and the status updates automatically when they pay."],
      ["What about emergency calls?", "Urgent requests can be flagged and sent straight to the on-call person, rather than waiting in the queue."],
    ],
    services: ["lead-automation", "whatsapp-automation", "business-process-automation"],
    resources: ["automate-lead-follow-up", "what-business-processes-to-automate"],
  },
  {
    slug: "professional-services",
    name: "Professional services",
    metaTitle: "Automation for Professional Services Firms | Flow HQ",
    metaDescription:
      "Automation for professional firms: enquiry intake, client onboarding, document collection, approvals, time-sensitive reminders and reporting.",
    h1: "Automation for agencies, consultants and professional firms",
    intro:
      "Accountants, consultants, agencies and law firms sell expertise — but a large share of the week goes on intake, onboarding, chasing documents and status updates. We automate that operational work so your team spends more of its time on billable, high-value work.",
    problems: [
      { title: "Slow onboarding", body: "Proposals, engagement letters, forms and kick-off calls coordinated by email." },
      { title: "Chasing documents", body: "Clients forget to send what you need; someone chases them every week." },
      { title: "Status questions", body: "'Where are we with this?' answered by hand, over and over." },
      { title: "Deadlines in heads", body: "Filing dates, renewals and review points tracked in spreadsheets and memory." },
    ],
    workflows: [
      { title: "Client onboarding", flow: ["Proposal accepted", "Engagement letter and intake form sent", "Client folder and CRM record created", "Kick-off scheduled"] },
      { title: "Document collection", flow: ["Checklist sent to the client", "Uploads checked off automatically", "Polite reminders for missing items", "Team notified when the file is complete"] },
      { title: "Deadline reminders", flow: ["Deadlines stored per client", "Reminders to the client and the team", "Escalation if something is still pending", "Weekly overview for partners"] },
    ],
    tools: ["Google Workspace / Microsoft 365", "Google Drive / SharePoint / Dropbox", "E-signature tools", "HubSpot / Zoho / Pipedrive", "Accounting software with an API", "n8n"],
    care: {
      title: "Confidential by design",
      body: "Client files stay in your own storage. AI steps — such as summarising an email or classifying a document — receive only what the task needs, and anything requiring professional judgement goes to your team.",
    },
    faqs: [
      ["Can it read documents clients send us?", "Yes. AI can classify incoming documents and pull out key details, then file them in the right client folder for your team to review."],
      ["Will clients notice anything?", "They'll notice faster onboarding, clearer checklists and fewer chasing emails — sent from your own email or WhatsApp."],
      ["Does this replace our practice software?", "No. We connect to the tools you already use and automate the gaps between them."],
    ],
    services: ["ai-workflow-automation", "crm-automation", "ai-automation"],
    resources: ["business-process-automation-guide", "ai-automation-vs-workflow-automation"],
  },
];

export const getIndustry = (slug: string) => INDUSTRIES.find((i) => i.slug === slug);
