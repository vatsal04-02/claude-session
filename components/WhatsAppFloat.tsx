"use client";

import { AnimatePresence, motion } from "motion/react";
import { WHATSAPP_URL } from "@/lib/whatsapp";
import { EASE } from "./ui";

/** Sticky WhatsApp button, bottom-right. Sits above the mobile CTA bar. */
export default function WhatsAppFloat() {
  return (
    <aside aria-label="WhatsApp chat">
    <AnimatePresence>
      {(
        <motion.a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with FlowHQ on WhatsApp"
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.9 }}
          transition={{ delay: 1.4, duration: 0.5, ease: EASE }}
          whileHover={{ y: -3 }}
          className="fixed bottom-[88px] right-4 z-[45] grid h-12 w-12 sm:h-14 sm:w-14 place-items-center rounded-full border border-border-bright bg-surface-2 text-accent shadow-[0_14px_34px_-10px_rgba(0,0,0,0.8)] transition-[border-color,box-shadow] duration-300 hover:border-accent hover:shadow-[0_14px_34px_-8px_rgba(234,106,47,0.45)] md:right-6 lg:bottom-6"
        >
          <svg viewBox="0 0 24 24" aria-hidden className="h-6 w-6" fill="currentColor">
            <path d="M12.04 2a9.9 9.9 0 0 0-8.43 15.1L2 22l5.06-1.6A9.9 9.9 0 1 0 12.04 2Zm0 18.1a8.2 8.2 0 0 1-4.2-1.15l-.3-.18-3 .95.98-2.93-.2-.31a8.2 8.2 0 1 1 6.72 3.62Zm4.5-6.1c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.56.12-.16.25-.64.8-.78.97-.14.16-.29.18-.54.06a6.7 6.7 0 0 1-1.97-1.22 7.4 7.4 0 0 1-1.36-1.7c-.14-.25-.02-.38.1-.5.11-.11.25-.29.37-.43.12-.15.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.41-.56-.42h-.47c-.16 0-.43.06-.65.31-.23.25-.86.84-.86 2.05 0 1.2.88 2.37 1 2.54.12.16 1.73 2.64 4.2 3.7.59.26 1.05.41 1.4.52.59.19 1.13.16 1.55.1.47-.07 1.46-.6 1.66-1.17.2-.57.2-1.07.14-1.17-.06-.1-.23-.16-.48-.29Z" />
          </svg>
        </motion.a>
      )}
    </AnimatePresence>
    </aside>
  );
}
