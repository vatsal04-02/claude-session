/**
 * Resources: two topic clusters, each a pillar guide plus supporting articles.
 * Original, practical, no invented statistics, clients or prices. Example numbers are labelled as examples.
 * Rendered by app/resources/[slug]/page.tsx; listed on /resources/ and in the sitemap.
 */

export type Block = string | { list: string[] } | { steps: string[] } | { note: string };
export type Section = { h2: string; body: Block[] };

export type Cluster = { id: "bpa" | "ai"; name: string; pillar: string; blurb: string };

export type Resource = {
  slug: string;
  cluster: Cluster["id"];
  pillar?: true;
  title: string; // H1
  metaTitle: string;
  description: string;
  summary: string; // the short answer, shown first
  readMins: number;
  published: string; // ISO date
  updated: string;
  sections: Section[];
  services: string[]; // related service slugs
};

export const CLUSTERS: Cluster[] = [
  {
    id: "bpa",
    name: "Business process automation",
    pillar: "business-process-automation-guide",
    blurb: "What to automate, what it costs, how to measure it — and the mistakes to avoid.",
  },
  {
    id: "ai",
    name: "AI automation for small businesses",
    pillar: "ai-automation-for-small-businesses",
    blurb: "How AI automation actually works, and where it helps a small team most.",
  },
];

const D = "2026-10-07";

export const RESOURCES: Resource[] = [
  /* ---------------- cluster 1: business process automation ---------------- */
  {
    slug: "business-process-automation-guide",
    cluster: "bpa",
    pillar: true,
    title: "Business process automation: a practical guide for growing businesses",
    metaTitle: "Business Process Automation: A Practical Guide",
    description:
      "What business process automation is, which processes are worth automating, how a project runs, what drives the cost and how to measure the return — in plain language.",
    summary:
      "Business process automation means letting software do the repeatable steps of your work — capturing data, moving it between tools, sending messages, creating tasks — so people only handle the parts that need judgement. Start with processes that are frequent, rule-based and close to revenue.",
    readMins: 9,
    published: D,
    updated: D,
    services: ["business-process-automation", "ai-workflow-automation", "crm-automation"],
    sections: [
      {
        h2: "What business process automation actually is",
        body: [
          "A business process is any piece of work that happens the same way again and again: a new enquiry is answered, a customer is onboarded, an invoice is sent and chased, a weekly report is put together. Each one is a chain of small steps — and many of those steps are a person copying, checking, forwarding or reminding.",
          "Business process automation (BPA) replaces those mechanical steps with software. The trigger is an event — a form submitted, an email received, a payment confirmed — and the system carries out the steps that follow, in the tools your business already uses.",
          "Good automation doesn't remove people from the process. It removes the parts of the job people shouldn't have to do, so the decisions, conversations and craft get more of their time.",
        ],
      },
      {
        h2: "What automation can and can't do",
        body: [
          "Automation is excellent at work that is frequent, predictable and digital. It is poor at work that depends on judgement, relationships or information nobody has written down.",
          {
            list: [
              "Good fits: data entry between tools, confirmations and reminders, routing requests, creating tasks, generating documents from templates, scheduled reports, follow-up sequences.",
              "Good fits with AI: reading free-text messages, sorting them by intent, extracting details from documents, drafting replies for a person to approve.",
              "Poor fits: negotiations, complaints that need empathy, one-off decisions, anything where the rules change every time.",
            ],
          },
        ],
      },
      {
        h2: "Which processes to automate first",
        body: [
          "The best first candidate is usually the process that is repeated most often, follows clear rules and sits closest to revenue. For most service businesses that means one of these:",
          {
            list: [
              "Replying to and following up with new enquiries",
              "Onboarding a new customer (welcome, forms, first task)",
              "Invoicing and payment reminders",
              "Copying the same customer details into several tools",
              "The weekly or monthly report someone assembles by hand",
            ],
          },
          "A simple test: if you can write the steps down on one page, and they're the same nine times out of ten, it can probably be automated. Our guide to choosing processes goes deeper.",
        ],
      },
      {
        h2: "How an automation project runs",
        body: [
          {
            steps: [
              "Audit — list the processes, estimate the time each one takes, and note where things go wrong.",
              "Prioritise — rank by time saved and revenue at risk; pick one process to start.",
              "Map — write down the current steps, the tools involved and the exceptions.",
              "Build — connect the tools and automate the steps, with AI only where a rule isn't enough.",
              "Test with real examples — run past cases through the system before it goes live.",
              "Launch and monitor — log every run, alert a person on errors, and adjust in the first weeks.",
            ],
          },
          "Starting with one process keeps the risk small and shows quickly whether automation fits the way your team works.",
        ],
      },
      {
        h2: "What it costs — and how to judge the return",
        body: [
          "Cost depends on the number of tools involved, how messy the inputs are, whether AI steps are needed and how many exceptions the process has. Running costs are usually software subscriptions and, for AI steps, usage-based model costs.",
          "The return comes from hours your team gets back, mistakes avoided and revenue that no longer slips through — for example, leads that now get a reply. Our articles on automation cost and on calculating automation ROI walk through both with worked examples.",
        ],
      },
      {
        h2: "Build it so you own it",
        body: [
          "Whatever you automate, make sure the accounts, the workflows and the data belong to your business. Documented workflows on a platform you control mean you can change supplier, extend the system or bring it in-house later — without starting again.",
        ],
      },
    ],
  },
  {
    slug: "what-business-processes-to-automate",
    cluster: "bpa",
    title: "What business processes should you automate first?",
    metaTitle: "What Business Processes Should You Automate First?",
    description:
      "A simple scoring method to decide which processes to automate first, with common candidates for small and growing businesses and a few you should leave alone.",
    summary:
      "Automate first the processes that are frequent, rule-based, digital and close to revenue — like lead follow-up, onboarding and invoicing. Leave judgement-heavy and rarely repeated work for later, or for people.",
    readMins: 6,
    published: D,
    updated: D,
    services: ["business-process-automation", "lead-automation"],
    sections: [
      {
        h2: "Score each process on four questions",
        body: [
          "List the processes your team repeats, then score each one from 1 to 3 on four questions:",
          {
            list: [
              "Frequency — how often does it happen? (daily scores higher than monthly)",
              "Rules — are the steps the same almost every time?",
              "Digital — do the inputs already arrive in a tool (email, form, chat, sheet)?",
              "Impact — does delay or error cost money or customers?",
            ],
          },
          "Add the scores. Processes scoring 10–12 are strong first candidates; 7–9 are worth a look; below 7, leave them for now.",
        ],
      },
      {
        h2: "Common first candidates",
        body: [
          {
            list: [
              "Enquiry response and follow-up — high frequency, clear rules, directly tied to revenue.",
              "Customer onboarding — the same welcome, forms and first tasks for every new customer.",
              "Invoicing and payment reminders — predictable timing, easy to get wrong when busy.",
              "Data entry between tools — copying details from forms or email into a sheet or CRM.",
              "Recurring reports — numbers pulled from the same places every week.",
            ],
          },
        ],
      },
      {
        h2: "What to leave alone (for now)",
        body: [
          {
            list: [
              "Processes that happen a few times a year — the setup effort rarely pays back.",
              "Work where every case is different, such as custom proposals or complaints.",
              "Processes nobody can describe yet — fix the process before you automate it.",
            ],
          },
        ],
      },
      {
        h2: "A worked example",
        body: [
          "Take a hypothetical consultancy that receives around 30 enquiries a week. Replies take half a day on average, and there's no follow-up if a prospect goes quiet. Frequency 3, rules 3, digital 3 (enquiries arrive by form and email), impact 3 — a perfect 12. Monthly management reporting, by contrast, scores 1 for frequency and only 2 for impact. Enquiry handling goes first.",
          { note: "Example figures are illustrative, not from a real client." },
        ],
      },
    ],
  },
  {
    slug: "ai-automation-vs-workflow-automation",
    cluster: "bpa",
    title: "AI automation vs traditional workflow automation",
    metaTitle: "AI Automation vs Traditional Workflow Automation",
    description:
      "The difference between rule-based workflow automation and AI automation, where each one fits, and why most useful systems combine both.",
    summary:
      "Traditional workflow automation follows fixed rules and is fast, cheap and predictable. AI automation can read and interpret messy input like free-text messages and documents. Most practical systems use rules for the predictable steps and AI only where a rule can't decide.",
    readMins: 6,
    published: D,
    updated: D,
    services: ["ai-workflow-automation", "ai-automation"],
    sections: [
      {
        h2: "Traditional workflow automation: rules",
        body: [
          "A rule-based workflow says: when this happens, do that. When a form is submitted, add a row to the sheet and send a confirmation. When an invoice is 7 days overdue, send a reminder. These rules are deterministic — the same input always produces the same output — which makes them cheap to run and easy to trust.",
          "Their weakness is anything unstructured. A rule can check whether a field equals 'urgent'; it can't read a customer's email and work out that they're upset and need a call today.",
        ],
      },
      {
        h2: "AI automation: interpretation",
        body: [
          "AI steps use language models to do the parts that need reading or writing: classify an email, pull an amount and due date out of a PDF, summarise a long conversation, draft a reply. They handle variety well, but they are probabilistic — usually right, occasionally wrong — so they need limits and checks.",
        ],
      },
      {
        h2: "Side by side",
        body: [
          {
            list: [
              "Input: rules need structured data; AI can handle free text, documents and images.",
              "Predictability: rules are exact; AI needs guardrails and review for important decisions.",
              "Cost to run: rules are near-free per run; AI steps add a small usage cost.",
              "Best at: rules for moving data and timing; AI for understanding and drafting.",
            ],
          },
        ],
      },
      {
        h2: "Why the best systems combine both",
        body: [
          "A typical flow uses AI once, in the middle: an email arrives (trigger), AI classifies it and extracts the details (AI step), and rules do the rest — create the task, update the CRM, notify the owner. Using AI only where it adds something keeps the system accurate, affordable and easy to debug.",
        ],
      },
    ],
  },
  {
    slug: "business-automation-cost",
    cluster: "bpa",
    title: "How much does business automation cost?",
    metaTitle: "How Much Does Business Automation Cost?",
    description:
      "What drives the cost of building and running business automation — setup, software, AI usage and upkeep — and how to keep it proportional to the value.",
    summary:
      "The cost of business automation depends on how many tools are connected, how messy the inputs are, whether AI is involved and how many exceptions the process has. Expect a one-time build cost plus running costs for software and any AI usage — and judge it against the time and revenue it recovers.",
    readMins: 6,
    published: D,
    updated: D,
    services: ["business-process-automation", "ai-workflow-automation"],
    sections: [
      {
        h2: "The two kinds of cost",
        body: [
          {
            list: [
              "Build cost (one-time) — understanding the process, designing the workflow, connecting tools, testing and launch.",
              "Running cost (ongoing) — subscriptions for the automation platform and connected tools, AI model usage, messaging fees (for example WhatsApp conversation charges) and optional maintenance.",
            ],
          },
        ],
      },
      {
        h2: "What makes a project cost more",
        body: [
          {
            list: [
              "More tools to connect — every integration needs setup and testing.",
              "Tools without good APIs — workarounds take longer and need more care.",
              "Messy input — free text and documents usually need AI steps and more testing.",
              "Many exceptions — each 'except when…' is another branch to build and maintain.",
              "Compliance needs — handling personal or sensitive data carefully adds design work.",
            ],
          },
        ],
      },
      {
        h2: "How to keep cost proportional",
        body: [
          "Start with one high-value process rather than automating everything at once. Reuse the tools you already pay for. Use rules wherever they work, and AI only where it adds something. And ask for a fixed quote for a clearly defined scope, so the build cost is known before you commit.",
        ],
      },
      {
        h2: "Compare cost with value, not with zero",
        body: [
          "The right question isn't 'is it cheap?' but 'is it worth more than it costs?'. Estimate the hours saved and the revenue recovered, then compare. Our guide to calculating automation ROI shows the arithmetic step by step.",
          { note: "Flow HQ quotes a fixed price after a free audit, so you know the build cost before anything starts." },
        ],
      },
    ],
  },
  {
    slug: "automation-roi",
    cluster: "bpa",
    title: "How to calculate automation ROI",
    metaTitle: "How to Calculate Automation ROI (With a Worked Example)",
    description:
      "A simple, honest way to estimate the return on a business automation project: hours saved, errors avoided and revenue recovered — with a worked example.",
    summary:
      "Automation ROI = (value of time saved + value of errors avoided + revenue recovered − running costs) ÷ build cost. Use conservative estimates, measure the real numbers after launch, and compare.",
    readMins: 6,
    published: D,
    updated: D,
    services: ["business-process-automation", "lead-automation"],
    sections: [
      {
        h2: "The three sources of value",
        body: [
          {
            list: [
              "Time saved — hours per month × the cost of one hour of the people doing the work.",
              "Errors avoided — mistakes per month × the average cost of fixing one.",
              "Revenue recovered — opportunities that no longer slip through, such as leads that now get a timely reply.",
            ],
          },
        ],
      },
      {
        h2: "The formula",
        body: [
          "Monthly value = time saved + errors avoided + revenue recovered − monthly running costs.",
          "Payback period (months) = build cost ÷ monthly value.",
          "First-year ROI = (12 × monthly value − build cost) ÷ build cost.",
        ],
      },
      {
        h2: "A worked example",
        body: [
          "A hypothetical team spends 15 hours a week copying enquiry details into a CRM and sending follow-ups. That's about 65 hours a month. At ₹300 an hour of staff time, the time alone is worth about ₹19,500 a month.",
          "Suppose better follow-up also wins two extra customers a month worth ₹5,000 each — ₹10,000. Running costs are, say, ₹3,000 a month. Monthly value: ₹19,500 + ₹10,000 − ₹3,000 = ₹26,500.",
          "If the build cost were ₹1,00,000, payback would take just under four months.",
          { note: "All figures are examples for illustration. Use your own numbers — and be conservative." },
        ],
      },
      {
        h2: "Measure after launch",
        body: [
          "Estimates are a starting point. After launch, track the same numbers: hours spent on the process, reply times, follow-up rates and conversions. Real data tells you whether to expand the system or adjust it.",
        ],
      },
    ],
  },
  {
    slug: "automation-mistakes-small-businesses",
    cluster: "bpa",
    title: "Common automation mistakes small businesses make",
    metaTitle: "7 Business Automation Mistakes to Avoid",
    description:
      "The most common mistakes small businesses make with automation — from automating a broken process to building on accounts they don't own — and how to avoid them.",
    summary:
      "The biggest automation mistakes are automating a broken process, trying to automate everything at once, ignoring exceptions, failing silently, not owning the accounts, using AI where a rule would do, and never measuring the result.",
    readMins: 5,
    published: D,
    updated: D,
    services: ["business-process-automation", "ai-workflow-automation"],
    sections: [
      {
        h2: "1. Automating a broken process",
        body: ["Automation makes a process faster, not better. If the steps are unclear or wrong, write down and fix the process first — then automate it."],
      },
      {
        h2: "2. Trying to automate everything at once",
        body: ["Big-bang projects take longer, cost more and are harder to trust. Start with one process, prove it works, then extend."],
      },
      {
        h2: "3. Ignoring the exceptions",
        body: ["Most processes have a few 'except when…' cases. Decide up front which ones the system handles and which go to a person — otherwise the exceptions break the workflow."],
      },
      {
        h2: "4. Failing silently",
        body: ["Connected apps change, passwords expire, APIs go down. Every workflow should log its runs and alert a person when a step fails."],
      },
      {
        h2: "5. Not owning the accounts",
        body: ["If the automation lives in a supplier's account, you can't change it or leave without rebuilding. Keep the platform, the workflows and the data in accounts your business owns."],
      },
      {
        h2: "6. Using AI where a rule would do",
        body: ["AI is powerful but probabilistic and has a running cost. Use it for reading and writing; use simple rules for everything predictable."],
      },
      {
        h2: "7. Never measuring the result",
        body: ["Record the time a process takes before you automate it, then measure again afterwards. Without a baseline, you can't tell whether it worked — or what to automate next."],
      },
    ],
  },

  /* ---------------- cluster 2: AI automation for small businesses ---------------- */
  {
    slug: "ai-automation-for-small-businesses",
    cluster: "ai",
    pillar: true,
    title: "AI automation for small businesses: where it helps, and where it doesn't",
    metaTitle: "AI Automation for Small Businesses: A Practical Guide",
    description:
      "A practical guide to AI automation for small businesses: what AI is good at, the best first use cases, how to keep it accurate and safe, and how to get started.",
    summary:
      "For a small business, AI automation is most useful for reading and writing: answering common questions, sorting enquiries, pulling details out of documents and drafting follow-ups. It works best inside a workflow, grounded in your own information, with clear hand-offs to people.",
    readMins: 9,
    published: D,
    updated: D,
    services: ["ai-automation", "ai-receptionist", "lead-automation"],
    sections: [
      {
        h2: "What AI is genuinely good at",
        body: [
          "Modern language models are good at understanding and producing text. In a business, that translates into a handful of reliable jobs:",
          {
            list: [
              "Answering routine questions from your own information (prices, timings, policies)",
              "Reading an enquiry and working out what the customer wants and how urgent it is",
              "Extracting names, dates, amounts and items from emails, forms and PDFs",
              "Summarising long conversations or call notes",
              "Drafting replies and follow-ups for a person to approve or send",
            ],
          },
        ],
      },
      {
        h2: "What AI should not decide alone",
        body: [
          "AI is not accountable and can be confidently wrong. Keep a person in charge of anything involving money, complaints, legal or medical matters, or decisions you'd need to explain later. The system can still help — by summarising the situation and suggesting a next step.",
        ],
      },
      {
        h2: "The best first use cases",
        body: [
          {
            list: [
              "An AI receptionist on WhatsApp or your website for out-of-hours enquiries",
              "Lead qualification and routing, so hot enquiries reach a person first",
              "Document extraction — invoices, order forms, applications — straight into your sheet or CRM",
              "Drafted follow-ups that your team approves with one tap",
            ],
          },
          "Each of these is frequent, mostly text-based and easy to check — exactly where AI earns its keep.",
        ],
      },
      {
        h2: "Keeping AI accurate",
        body: [
          {
            list: [
              "Ground it in your information — give it the answers, don't let it guess.",
              "Limit what it can do — define what it handles alone and what it only suggests.",
              "Hand over cleanly — pass anything uncertain to a person, with context.",
              "Log everything — review real conversations and improve the answers.",
            ],
          },
        ],
      },
      {
        h2: "Privacy and data",
        body: [
          "Only send an AI model the information a task needs. Keep customer records in systems you control, and check how your AI provider handles data. In India, the Digital Personal Data Protection Act sets expectations around consent and purpose — design the system so personal data is collected for a clear reason and not kept longer than needed.",
        ],
      },
      {
        h2: "How to get started",
        body: [
          {
            steps: [
              "Pick one text-heavy, repetitive task (usually enquiries).",
              "Write down the questions and the right answers.",
              "Connect an AI step inside a workflow that also logs and hands over.",
              "Run it alongside your team for a few weeks and review the results.",
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "how-ai-automation-works",
    cluster: "ai",
    title: "How AI automation works (without the jargon)",
    metaTitle: "How AI Automation Works — Explained Simply",
    description:
      "A plain-language explanation of how AI automation works: triggers, AI steps, your own knowledge, actions and hand-offs — with an everyday example.",
    summary:
      "AI automation is a workflow with an AI step inside it. Something happens (a trigger), the AI reads or writes something using your own information, and the workflow takes action in your tools — handing over to a person when it should.",
    readMins: 5,
    published: D,
    updated: D,
    services: ["ai-automation", "ai-workflow-automation"],
    sections: [
      {
        h2: "The five parts",
        body: [
          {
            list: [
              "Trigger — the event that starts it: a message, an email, a form, a file.",
              "Context — the information the AI is allowed to use: your prices, policies, past answers, the customer's record.",
              "AI step — the model reads the input and produces something: a category, extracted details, a summary or a draft reply.",
              "Actions — normal workflow steps that use the result: update the CRM, send the reply, create a task.",
              "Hand-off — rules for when a person takes over, and a log of everything that happened.",
            ],
          },
        ],
      },
      {
        h2: "An everyday example",
        body: [
          "A customer emails: 'Hi, our order from last week still hasn't arrived — can you check? Order 4417.'",
          {
            steps: [
              "Trigger: the email arrives in the shared inbox.",
              "AI step: classified as 'delivery question', order number 4417 extracted, tone 'mildly frustrated'.",
              "Action: the order status is looked up in your system.",
              "Action: a reply with the tracking update is drafted and sent (or held for approval).",
              "Hand-off: if the order is more than a week late, the case is flagged to a person.",
            ],
          },
        ],
      },
      {
        h2: "Why 'grounding' matters",
        body: [
          "Left alone, a language model answers from general knowledge and can make things up. Grounding means giving it your own information for each task, and instructing it to say 'I don't know' rather than guess. That's the difference between a toy and a dependable business system.",
        ],
      },
    ],
  },
  {
    slug: "ai-receptionist-vs-receptionist",
    cluster: "ai",
    title: "AI receptionist vs traditional receptionist: what each does best",
    metaTitle: "AI Receptionist vs Human Receptionist: Compared",
    description:
      "An honest comparison of an AI receptionist and a human receptionist — availability, consistency, judgement and cost — and why most businesses use both.",
    summary:
      "An AI receptionist is best at instant, consistent answers to routine questions at any hour. A human receptionist is best at judgement, empathy and the unexpected. Most businesses get the best result by letting AI handle the first, routine conversation and passing the rest to people.",
    readMins: 5,
    published: D,
    updated: D,
    services: ["ai-receptionist", "whatsapp-automation"],
    sections: [
      {
        h2: "Where an AI receptionist is stronger",
        body: [
          {
            list: [
              "Available at night, on weekends and on holidays",
              "Answers several conversations at once, instantly",
              "Gives the same correct answer every time",
              "Records every detail in your CRM without retyping",
            ],
          },
        ],
      },
      {
        h2: "Where a person is stronger",
        body: [
          {
            list: [
              "Reading emotion and calming an unhappy customer",
              "Handling unusual requests and exceptions",
              "Building relationships with regular customers",
              "Making judgement calls about priority or policy",
            ],
          },
        ],
      },
      {
        h2: "Using both",
        body: [
          "The practical setup is a hand-off. The AI receptionist answers routine questions, collects details and books simple appointments; anything sensitive or unusual goes to your team with the conversation summarised. Your receptionist spends less time repeating opening hours and more time with the people in front of them.",
        ],
      },
      {
        h2: "Questions to ask before you start",
        body: [
          {
            list: [
              "Which questions make up most of your incoming messages?",
              "Which topics must always go to a person?",
              "Which channels do your customers use — WhatsApp, website chat, email?",
              "Who reviews the conversations in the first few weeks?",
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "how-crm-automation-works",
    cluster: "ai",
    title: "How CRM automation works",
    metaTitle: "How CRM Automation Works: Capture, Log, Update, Remind",
    description:
      "How CRM automation keeps customer records complete: automatic contact capture, activity logging, pipeline updates, tasks and reports — and how AI helps.",
    summary:
      "CRM automation keeps your customer records up to date without manual data entry. It captures contacts from every channel, logs conversations, moves deals when real events happen, creates follow-up tasks and reports on the pipeline.",
    readMins: 5,
    published: D,
    updated: D,
    services: ["crm-automation", "lead-automation"],
    sections: [
      {
        h2: "Why CRMs go out of date",
        body: [
          "A CRM depends on people typing things in. Busy people don't, so the CRM drifts away from reality — and once it's unreliable, nobody uses it. Automation fixes the cause: it updates the CRM from the places where work already happens.",
        ],
      },
      {
        h2: "The four automations that matter most",
        body: [
          {
            list: [
              "Capture — every form, chat, email and missed call creates or updates a contact, with duplicates merged.",
              "Log — messages and calls are attached to the right record, often with an AI summary.",
              "Move — deals change stage on real events: quote sent, payment received, contract signed.",
              "Remind — tasks and alerts when a deal goes quiet or a follow-up is due.",
            ],
          },
        ],
      },
      {
        h2: "Where AI helps",
        body: [
          "AI is useful for the unstructured parts: summarising a long WhatsApp thread into two lines, pulling requirements out of an enquiry, or suggesting the next step for a stalled deal. The CRM stays the source of truth; AI just fills it in better.",
        ],
      },
      {
        h2: "Do you need a big CRM?",
        body: [
          "Not necessarily. Many small businesses run perfectly well on a well-structured Google Sheet with automation around it. Move to a dedicated CRM when you need permissions, pipelines for several teams, or deeper reporting.",
        ],
      },
    ],
  },
  {
    slug: "automate-lead-follow-up",
    cluster: "ai",
    title: "How to automate lead follow-up without sounding like a robot",
    metaTitle: "How to Automate Lead Follow-Up Without Sounding Robotic",
    description:
      "A step-by-step approach to automating lead follow-up: instant first replies, sensible timing, messages that sound like you, and when to hand over to a person.",
    summary:
      "Reply to every lead within minutes, follow up a few times with spaced, useful messages, stop the moment they answer, and pass interested or unusual leads to a person. Write the messages in your own voice and keep the sequence short.",
    readMins: 6,
    published: D,
    updated: D,
    services: ["lead-automation", "whatsapp-automation", "crm-automation"],
    sections: [
      {
        h2: "1. Capture every lead in one place",
        body: ["Forms, WhatsApp, email, phone and ad lead forms should all feed one list — your CRM or a sheet. You can't follow up on a lead you can't see."],
      },
      {
        h2: "2. Send a useful first reply, fast",
        body: [
          "The first reply should arrive within minutes, on the channel the customer used, and move things forward: answer the question if you can, and ask for the one detail you need next.",
        ],
      },
      {
        h2: "3. Follow up a few times — then stop",
        body: [
          "A simple, respectful sequence works for most businesses:",
          {
            list: [
              "Day 0 — instant reply",
              "Day 2 — a short check-in with something useful (an answer, an example, a slot)",
              "Day 5 — a final, low-pressure message",
              "Then mark the lead 'not now' and stop",
            ],
          },
          "The sequence ends the moment the lead replies. Nobody should get a follow-up after they've already answered.",
        ],
      },
      {
        h2: "4. Write like a person",
        body: [
          "Use the words your team would use, refer to what the customer actually asked, and keep messages short. AI can personalise drafts from the enquiry, but the tone and the facts should come from you.",
        ],
      },
      {
        h2: "5. Know when to hand over",
        body: [
          "Ready-to-buy signals, large orders, complaints and unusual requests should reach a person straight away — with the conversation summarised so they don't start from scratch.",
        ],
      },
      {
        h2: "6. Respect the channel's rules",
        body: [
          "On WhatsApp, use the official Business API, message only people who contacted you or opted in, and use approved templates for messages outside an open conversation.",
        ],
      },
    ],
  },
];

export const getResource = (slug: string) => RESOURCES.find((r) => r.slug === slug);
export const clusterOf = (id: Cluster["id"]) => CLUSTERS.find((c) => c.id === id)!;
export const inCluster = (id: Cluster["id"]) => RESOURCES.filter((r) => r.cluster === id);
