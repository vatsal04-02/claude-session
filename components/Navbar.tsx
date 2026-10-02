"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/lib/site";
import { useDemo } from "@/lib/demo-context";
import { cn } from "@/lib/cn";
import Logo from "./Logo";
import { Button, EASE } from "./ui";

const SECTION_IDS = ["solutions", "projects", "how-it-works", "why"];

export default function Navbar() {
  const { open } = useDemo();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState<string>("");

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  // highlight the nav item for the section currently in view
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: EASE }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-300",
          scrolled || menu
            ? "border-border/80 bg-bg/80 backdrop-blur-xl"
            : "border-transparent bg-transparent"
        )}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex h-[68px] max-w-[1200px] items-center justify-between px-5 md:px-8"
        >
          <a href="#top" aria-label="FlowHQ home" onClick={() => setMenu(false)}>
            <Logo />
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((l) => {
              const on = active === l.href.slice(1);
              return (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className={cn(
                      "relative rounded-full px-4 py-2 text-[15px] transition-colors hover:text-text",
                      on ? "text-text" : "text-muted"
                    )}
                  >
                    {on && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-surface-2"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    {l.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <div className="hidden md:block">
              <Button onClick={open}>Book Free Demo</Button>
            </div>
            <button
              type="button"
              aria-label={menu ? "Close menu" : "Open menu"}
              aria-expanded={menu}
              onClick={() => setMenu((m) => !m)}
              className="grid h-10 w-10 place-items-center rounded-full border border-border bg-surface/70 text-text md:hidden"
            >
              {menu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {menu && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="overflow-hidden md:hidden"
            >
              <ul className="flex flex-col gap-1 px-5 pb-6 pt-2">
                {NAV_LINKS.map((l, i) => (
                  <motion.li
                    key={l.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i + 0.1, duration: 0.4, ease: EASE }}
                  >
                    <a
                      href={l.href}
                      onClick={() => setMenu(false)}
                      className="flex items-center justify-between rounded-xl px-3 py-3.5 text-lg text-text hover:bg-surface"
                    >
                      {l.label}
                      <span className="label text-subtle">0{i + 1}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <MobileCTA />
    </>
  );
}

/** Sticky bottom CTA for phones. */
function MobileCTA() {
  const { open, isOpen } = useDemo();
  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ delay: 1.2, duration: 0.5, ease: EASE }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-border/80 bg-bg/85 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl md:hidden"
        >
          <Button onClick={open} className="w-full">
            Book Free Demo
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
