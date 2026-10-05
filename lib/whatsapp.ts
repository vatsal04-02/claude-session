/** WhatsApp click-to-chat only: no API, bots or credentials. */
export const WHATSAPP_NUMBER = "919322146560"; // +91 93221 46560

export function getWhatsAppUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const WHATSAPP_MESSAGES = {
  general: "Hi FlowHQ, I want the free audit.",
  submitted: "Hi FlowHQ, I just requested the free audit on your website.",
} as const;

/** Props to spread on an <a>/Button so the chat opens in a new tab. */
export const waLink = (message: string) =>
  ({ href: getWhatsAppUrl(message), target: "_blank", rel: "noopener noreferrer" }) as const;
