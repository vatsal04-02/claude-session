/** WhatsApp click-to-chat only: no API, bots or credentials. Every WhatsApp link on the site is built from these two constants. */
export const WHATSAPP_NUMBER = "919322146560"; // TODO: owner's real number — currently a wrong number, replace before any public launch
export const WHATSAPP_PREFILL = "Hi FlowHQ, I want the free audit.";

/** https://wa.me/<number>?text=<prefill> */
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_PREFILL)}`;

/** Props to spread on an <a> so the chat opens in a new tab. */
export const WA_LINK = { href: WHATSAPP_URL, target: "_blank", rel: "noopener noreferrer" } as const;
