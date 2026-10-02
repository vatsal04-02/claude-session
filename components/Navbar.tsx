"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { NAV_LINKS } from "@/lib/site";
import { useDemo } from "@/lib/demo-context";
import { cn } from "@/lib/cn";
import Logo from "./Logo";
import { Button, EASE } from "./ui";

export default function Navbar() {
  const { open, isOpen } = useDemo();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 8));

  return (
    <>
      <motion.header
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-300",
          scrolled || menu ? "border-border bg-bg/85 backdrop-blur-md" : "border-border/0 bg-transparent"
        )}
      >
        <nav aria-label="Primary" className="mx-auto flex h-14 max-w-[1140px] items-center justify-between px-5 lg:grid lg:grid-cols-[1fr_auto_1fr] md:px-8">
          <a href="#top" aria-label="FlowHQ home" className="lg:justify-self-start" onClick={() => setMenu(false)}>
            <Logo />
          </a>

          <ul className="hidden items-center gap-7 lg:flex">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-[14px] text-muted transition-colors hover:text-text">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 lg:justify-self-end">
            <div className="hidden lg:block">
              <Button onClick={open} arrow={null}>
                Book a Free Demo
              </Button>
            </div>
            <button
              type="button"
              aria-label={menu ? "Close menu" : "Open menu"}
              aria-expanded={menu}
              onClick={() => setMenu((m) => !m)}
              className="grid h-9 w-9 place-items-center rounded-full border border-border text-text lg:hidden"
            >
              {menu ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {menu && (
            <motion.ul
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="overflow-hidden px-5 lg:hidden"
            >
              {NAV_LINKS.map((l) => (
                <li key={l.href} className="border-t border-border">
                  <a href={l.href} onClick={() => setMenu(false)} className="block py-3.5 font-serif text-2xl">
                    {l.label}
                  </a>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </motion.header>

      {/* sticky bottom CTA, phones only */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ delay: 1, duration: 0.5, ease: EASE }}
            className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-bg/90 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-md lg:hidden"
          >
            <Button onClick={open} className="w-full">
              Book a Free Demo
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
