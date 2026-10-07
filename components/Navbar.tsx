"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/lib/site";
import { cn } from "@/lib/cn";
import Logo from "./Logo";
import { Button, EASE, SPRING } from "./ui";

/** `base` = "" on the homepage (in-page anchors), "/" on other pages (links back to the homepage sections). */
export default function Navbar({ base = "" }: { base?: "" | "/" }) {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState("");

  // mark the nav item for the section currently in view
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

  // close the phone menu with Escape
  useEffect(() => {
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [menu]);

  const raised = scrolled || menu;

  return (
    <>
      {/* a floating glass bar: the page background stays visible all around it */}
      <motion.header
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 lg:pt-5"
      >
        <div
          className={cn(
            "nav-float pointer-events-auto relative mx-auto w-full max-w-[1180px] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
            raised && "lg:-translate-y-1.5"
          )}
          data-raised={raised}
        >
          {/* one frosted-glass layer: backdrop-filter blurs the page passing behind it; lighter at the top, denser once scrolled */}
          <span aria-hidden className="nav-glass" />
          <span aria-hidden className="nav-glow" />

          <nav
            aria-label="Primary"
            className={cn(
              "relative flex items-center justify-between pl-4 pr-2 transition-[height] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:pl-5 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:pl-6 lg:pr-3",
              raised ? "h-[58px] lg:h-[62px]" : "h-[60px] lg:h-[68px]"
            )}
          >
            <a
              href={base ? "/" : "#top"}
              className="inline-flex min-h-11 items-center transition-[filter,transform] duration-200 hover:scale-[1.02] hover:brightness-110 lg:justify-self-start"
              onClick={() => setMenu(false)}
            >
              <Logo />
            </a>

            <ul className="hidden items-center gap-1 lg:flex">
              {NAV_LINKS.map((l) => {
                const on = active === l.href.slice(1);
                return (
                  <li key={l.href}>
                    <a
                      href={`${base}${l.href}`}
                      aria-current={on ? "location" : undefined}
                      className={cn(
                        "relative inline-flex h-10 items-center px-3.5 text-[13.5px] tracking-[0.005em] transition-[color,transform,text-shadow] duration-200 ease-out hover:-translate-y-px xl:px-4",
                        on
                          ? "text-accent-2 [text-shadow:0_0_14px_rgba(234,106,47,0.35)]"
                          : "text-text/75 hover:text-text hover:[text-shadow:0_0_14px_rgba(234,106,47,0.22)]"
                      )}
                    >
                      {l.label}
                      {on && (
                        <motion.span
                          layoutId="nav-indicator"
                          transition={SPRING.ui}
                          className="absolute inset-x-3.5 bottom-1 h-[1.5px] rounded-full bg-accent shadow-[0_0_8px_rgba(234,106,47,0.7)] xl:inset-x-4"
                        />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-2 lg:justify-self-end">
              <div className="hidden lg:block">
                <Button href={`${base}#audit`}>Get My Free Audit</Button>
              </div>
              <button
                type="button"
                aria-label={menu ? "Close menu" : "Open menu"}
                aria-expanded={menu}
                aria-controls="mobile-menu"
                onClick={() => setMenu((m) => !m)}
                className="grid h-11 w-11 place-items-center rounded-[14px] border border-white/10 bg-white/[0.03] text-text transition-colors hover:border-accent/50 hover:text-accent-2 lg:hidden"
              >
                {menu ? <X className="h-[18px] w-[18px]" /> : <Menu className="h-[18px] w-[18px]" />}
              </button>
            </div>
          </nav>
        </div>

        {/* phones/tablets: a floating glass panel in the same language, just below the bar */}
        <AnimatePresence>
          {menu && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.985 }}
              transition={{ duration: 0.22, ease: EASE }}
              className="nav-float pointer-events-auto relative mx-auto mt-2 w-full max-w-[1180px] origin-top lg:hidden"
              data-raised="true"
            >
              <span aria-hidden className="nav-glass" />
              <ul className="relative p-2">
                {NAV_LINKS.map((l) => {
                  const on = active === l.href.slice(1);
                  return (
                    <li key={l.href}>
                      <a
                        href={`${base}${l.href}`}
                        aria-current={on ? "location" : undefined}
                        onClick={() => setMenu(false)}
                        className={cn(
                          "flex min-h-12 items-center justify-between rounded-[12px] px-4 text-[17px] font-medium transition-colors",
                          on ? "bg-accent/10 text-accent-2" : "text-text/90 hover:bg-white/[0.04] hover:text-text"
                        )}
                      >
                        {l.label}
                        {on && <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(234,106,47,0.8)]" />}
                      </a>
                    </li>
                  );
                })}
                <li className="mt-2 border-t border-white/[0.07] px-2 pb-2 pt-3">
                  <Button href={`${base}#audit`} className="w-full" onClick={() => setMenu(false)}>
                    Get My Free Audit
                  </Button>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* sticky bottom CTA, phones only */}
      <AnimatePresence>
        {(
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ delay: 1, duration: 0.5, ease: EASE }}
            className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-bg/90 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-md lg:hidden"
          >
            <Button href={`${base}#audit`} className="w-full">
              Get My Free Audit
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
