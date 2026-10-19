import { SHOW_CASES } from "./content";

/** Google Apps Script Web app that appends each free-audit request to the leads sheet. */
export const GOOGLE_SHEET_URL =
  "https://script.google.com/macros/s/AKfycbxXh891ABs0zi0SaKTQAq34Kxr-L_kSJbQwWs3b7pVupbg7uWNV5WFv5VxHqt-dFU3FLA/exec";

/** Header + footer anchors. "Work" only exists once there is real work to show (see lib/content.ts). */
export const NAV_LINKS: { label: string; href: string }[] = [
  { label: "How it works", href: "#try-it" },
  ...(SHOW_CASES ? [{ label: "Work", href: "#work" }] : []),
  { label: "Packages", href: "#packages" },
  { label: "FAQ", href: "#faq" },
];

/** Social profiles (footer links + Organization structured data `sameAs`) and the public contact email. */
export const INSTAGRAM_URL = "https://www.instagram.com/flowhq.in/";
export const YOUTUBE_URL = "https://www.youtube.com/@FlowHQ_in";
export const LINKEDIN_URL = "https://www.linkedin.com/company/flowhqin/";
export const CONTACT_EMAIL = "flowhqofficial@gmail.com";
