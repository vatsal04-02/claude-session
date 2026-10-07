/** WhatsApp click-to-chat only: no API, bots or credentials. Every WhatsApp link on the site is built here. */

/** Site-wide number (floating bubble, audit form, footer) — Vatsal Tripathi. */
export const WHATSAPP_NUMBER = "919322146560";
export const WHATSAPP_PREFILL = "Hi FlowHQ, I want the free audit.";

/** Founders' direct lines, used by the "Chat with me directly" buttons. */
export const FOUNDER_NUMBERS = {
  prachi: "918527260023", // Prachi Pathak
  vatsal: WHATSAPP_NUMBER, // Vatsal Tripathi
} as const;
export const FOUNDER_PREFILL = "Hi, I saw your site — I want to talk about automating my business.";

/** https://wa.me/<number>?text=<prefill> */
export const waUrl = (number: string, text: string) => `https://wa.me/${number}?text=${encodeURIComponent(text)}`;

export const WHATSAPP_URL = waUrl(WHATSAPP_NUMBER, WHATSAPP_PREFILL);

/** Props to spread on an <a> so the chat opens in a new tab. */
export const WA_LINK = { href: WHATSAPP_URL, target: "_blank", rel: "noopener noreferrer" } as const;
