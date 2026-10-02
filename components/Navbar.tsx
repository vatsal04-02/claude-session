"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
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
  const [active, setActive] = useState("");

  // underline the nav item for the section currently in view
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    NAV_LINKS.forEach((l) => {
      const el = document.getElementById(l.href.slice(1));
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 8));

  return (
    <>
      <motion.header
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-300",
          scrolled || menu ? "border-border bg-[rgba(18,12,9,0.72)] backdrop-blur-md" : "border-border/0 bg-transparent"
        )}
      >
        <nav aria-label="Primary" className="mx-auto flex h-14 max-w-[1140px] items-center justify-between px-5 lg:grid lg:grid-cols-[1fr_auto_1fr] md:px-8">
          <a href="#top" aria-label="FlowHQ home" className="lg:justify-self-start" onClick={() => setMenu(false)}>
            <Logo />
          </a>

          <ul className="hidden items-center gap-7 lg:flex">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={cn(
                    "relative py-1 text-[14px] transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:bg-accent after:transition-transform after:duration-300 hover:text-text hover:after:scale-x-100",
                    active === l.href.slice(1) ? "text-text after:scale-x-100" : "text-muted after:scale-x-0"
                  )}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 lg:justify-self-end">
            <div className="hidden lg:block">
              <Button onClick={open}>
                Get My Free Demo
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
                  <a href={l.href} onClick={() => setMenu(false)} className="block py-3.5 text-xl font-semibold">
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
              Get My Free Demo
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
