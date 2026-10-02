export const NAV_LINKS = [
  { label: "Workflow", href: "#workflow" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Work", href: "#work" },
] as const;

export const FOOTER_LINKS = [
  { label: "Workflow", href: "#workflow" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#demo" },
] as const;

/**
 * Set NEXT_PUBLIC_WHATSAPP_NUMBER (digits only, with country code, e.g. 919876543210)
 * to turn the "WhatsApp Us" buttons into direct wa.me links.
 * When unset they open the demo form instead, so no button is ever dead.
 */
export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";

export const whatsappHref = WHATSAPP_NUMBER
  ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      "Hi FlowHQ, I'd like to talk about automating my business."
    )}`
  : null;

export const BUSINESS_TYPES = [
  "Clinic",
  "Physiotherapy",
  "Gym / Fitness",
  "Coaching institute",
  "Real estate",
  "Salon / Spa",
  "Interior / Professional services",
  "Other",
] as const;

export const AUTOMATION_OPTIONS = [
  "Lead management",
  "WhatsApp",
  "Appointments",
  "Follow-ups",
  "CRM",
  "Customer management",
  "Other",
] as const;
