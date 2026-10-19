import { FileText, Mail, Phone } from "lucide-react";

/* Shared by the hero visual: the five channels and the sample events that cycle through them.
   Everything here is illustrative sample data — no real customers. */

export type Icon = (p: { className?: string }) => React.JSX.Element;

export const Whatsapp: Icon = ({ className }) => (
  <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
    <path d="M12.04 2a9.9 9.9 0 0 0-8.43 15.1L2 22l5.06-1.6A9.9 9.9 0 1 0 12.04 2Zm0 18.1a8.2 8.2 0 0 1-4.2-1.15l-.3-.18-3 .95.98-2.93-.2-.31a8.2 8.2 0 1 1 6.72 3.62Zm4.5-6.1c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.56.12-.16.25-.64.8-.78.97-.14.16-.29.18-.54.06a6.7 6.7 0 0 1-1.97-1.22 7.4 7.4 0 0 1-1.36-1.7c-.14-.25-.02-.38.1-.5.11-.11.25-.29.37-.43.12-.15.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.41-.56-.42h-.47c-.16 0-.43.06-.65.31-.23.25-.86.84-.86 2.05 0 1.2.88 2.37 1 2.54.12.16 1.73 2.64 4.2 3.7.59.26 1.05.41 1.4.52.59.19 1.13.16 1.55.1.47-.07 1.46-.6 1.66-1.17.2-.57.2-1.07.14-1.17-.06-.1-.23-.16-.48-.29Z" />
  </svg>
);
export const Instagram: Icon = ({ className }) => (
  <svg viewBox="0 0 24 24" aria-hidden className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.4" cy="6.6" r="0.7" fill="currentColor" stroke="none" />
  </svg>
);

export const CHANNELS = [
  { id: "form", label: "Web", name: "Web form", Icon: FileText },
  { id: "whatsapp", label: "WhatsApp", name: "WhatsApp", Icon: Whatsapp },
  { id: "instagram", label: "Instagram", name: "Instagram", Icon: Instagram },
  { id: "call", label: "Call", name: "Call", Icon: Phone },
  { id: "email", label: "Email", name: "Email", Icon: Mail },
] as const;
export type ChannelId = (typeof CHANNELS)[number]["id"];
export const chan = (id: ChannelId) => CHANNELS.find((c) => c.id === id)!;

export type Status = "New" | "Replied" | "Booked" | "Follow-up due";
export type LeadEvent = { id: number; time: string; channel: ChannelId; who: string; text: string; end: Status };

/** The cycle: each event "arrives", gets a reply, a booking, a CRM row and a team alert. `end` is where older rows rest. */
export const EVENTS: LeadEvent[] = [
  { id: 1, time: "10:42", channel: "form", who: "Riya S.", text: "Consultation request", end: "Booked" },
  { id: 2, time: "10:47", channel: "whatsapp", who: "Arjun M.", text: "“What are your timings?”", end: "Booked" },
  { id: 3, time: "11:05", channel: "instagram", who: "Neha K.", text: "“Is the weekend batch open?”", end: "Replied" },
  { id: 4, time: "11:12", channel: "call", who: "Imran A.", text: "Missed call · text-back sent", end: "Booked" },
  { id: 5, time: "11:20", channel: "email", who: "Pooja T.", text: "Quote request", end: "Follow-up due" },
  { id: 6, time: "11:31", channel: "whatsapp", who: "Karan V.", text: "“Can I reschedule?”", end: "Booked" },
  { id: 7, time: "11:44", channel: "form", who: "Sneha R.", text: "Enquiry about fees", end: "Replied" },
  { id: 8, time: "11:52", channel: "instagram", who: "Vikram P.", text: "“Do you have a slot today?”", end: "Booked" },
];

export const OUTPUTS = ["Instant reply sent", "Appointment booked", "CRM updated", "Team notified"] as const;
