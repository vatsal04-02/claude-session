/** Google Apps Script Web app that appends each free-audit request to the leads sheet. */
export const GOOGLE_SHEET_URL =
  "https://script.google.com/macros/s/AKfycbxXh891ABs0zi0SaKTQAq34Kxr-L_kSJbQwWs3b7pVupbg7uWNV5WFv5VxHqt-dFU3FLA/exec";

export const NAV_LINKS = [
  { label: "What We Build", href: "#problems" },
  { label: "How It Works", href: "#workflow" },
  { label: "Try It", href: "#try-it" },
  { label: "FAQ", href: "#faq" },
] as const;

/** The founder section's code is kept; flip this on once a real name, photo and bio exist. */
export const SHOW_FOUNDER = false;
