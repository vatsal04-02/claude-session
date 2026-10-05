/** Google Apps Script Web app that appends each free-audit request to the leads sheet. */
export const GOOGLE_SHEET_URL =
  "https://script.google.com/macros/s/AKfycbxXh891ABs0zi0SaKTQAq34Kxr-L_kSJbQwWs3b7pVupbg7uWNV5WFv5VxHqt-dFU3FLA/exec";

export const NAV_LINKS = [
  { label: "What We Build", href: "#systems" },
  { label: "How It Works", href: "#workflow" },
  { label: "Services", href: "#services" },
  { label: "What We Automate", href: "#automate" },
  { label: "Demo", href: "#try-it" },
  { label: "About", href: "#why" },
  { label: "FAQ", href: "#faq" },
] as const;

export const FOOTER_LINKS = [
  { label: "What We Build", href: "#systems" },
  { label: "How It Works", href: "#workflow" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#audit" },
] as const;
