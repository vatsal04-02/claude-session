"use client";

import { AnimatePresence, motion } from "motion/react";
import { MessageCircle } from "lucide-react";
import { WHATSAPP_MESSAGES, getWhatsAppUrl } from "@/lib/whatsapp";
import { EASE } from "./ui";

const FLOAT_URL = getWhatsAppUrl(WHATSAPP_MESSAGES.general);

/** Sticky WhatsApp button, bottom-right. Sits above the mobile CTA bar. */
export default function WhatsAppFloat() {
  return (
    <AnimatePresence>
      {(
        <motion.a
          href={FLOAT_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with FlowHQ on WhatsApp"
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.9 }}
          transition={{ delay: 1.4, duration: 0.5, ease: EASE }}
          whileHover={{ y: -3 }}
          className="fixed bottom-[88px] right-4 z-[45] grid h-14 w-14 place-items-center rounded-full border border-border-bright bg-surface-2 text-accent shadow-[0_14px_34px_-10px_rgba(0,0,0,0.8)] transition-[border-color,box-shadow] duration-300 hover:border-accent hover:shadow-[0_14px_34px_-8px_rgba(234,106,47,0.45)] md:right-6 lg:bottom-6"
        >
          <MessageCircle className="h-6 w-6" strokeWidth={1.9} />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
