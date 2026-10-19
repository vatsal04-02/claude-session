"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/lib/site";
import { cn } from "@/lib/cn";
import Logo from "./Logo";
import { Button, EASE } from "./ui";
import { CONTAINER } from "@/lib/layout";

/** Sticky bar: backdrop blur + a hairline bottom border (56px on phones, 64px from md up).
    `base` = "" on the homepage (in-page anchors), "/" on other pages (links back to the homepage sections). */
export default function Navbar({ base = "" }: { base?: "" | "/" }) {
  const { scrollY } = useScroll();
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState("");
  const [showBar, setShowBar] = useState(false);

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

  // the phone CTA bar waits until the hero (which has its own CTA) has scrolled away
  useMotionValueEvent(scrollY, "change", (y) => setShowBar(y > 560));

  // close the phone menu with Escape
  useEffect(() => {
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [menu]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.08] bg-[rgba(17,11,8,0.78)] backdrop-blur-xl backdrop-saturate-150">
        <nav aria-label="Primary" className={cn(CONTAINER, "flex h-14 items-center justify-between md:h-16 lg:grid lg:grid-cols-[1fr_auto_1fr]")}>
          <a href={base ? "/" : "#top"} className="inline-flex min-h-11 items-center transition-[filter] duration-200 hover:brightness-110 lg:justify-self-start" onClick={() => setMenu(false)}>
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
                      "relative inline-flex h-10 items-center px-3.5 text-[14px] tracking-[0.005em] transition-colors duration-200 xl:px-4",
                      on ? "text-accent-2" : "text-[#B9B9C0] hover:text-text"
                    )}
                  >
                    {l.label}
                    {on && <span aria-hidden className="absolute inset-x-3.5 -bottom-[11px] h-px bg-accent xl:inset-x-4" />}
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
              className="grid h-11 w-11 place-items-center rounded-[10px] border border-white/10 text-text transition-colors hover:border-accent/50 hover:text-accent-2 lg:hidden"
            >
              {menu ? <X className="h-[18px] w-[18px]" /> : <Menu className="h-[18px] w-[18px]" />}
            </button>
          </div>
        </nav>

        {/* phones/tablets: a full-width panel straight under the bar */}
        <AnimatePresence>
          {menu && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2, ease: EASE }}
              className="absolute inset-x-0 top-full border-b border-white/[0.08] bg-[rgba(17,11,8,0.96)] backdrop-blur-xl lg:hidden"
            >
              <ul className={cn(CONTAINER, "py-2")}>
                {NAV_LINKS.map((l) => {
                  const on = active === l.href.slice(1);
                  return (
                    <li key={l.href}>
                      <a
                        href={`${base}${l.href}`}
                        aria-current={on ? "location" : undefined}
                        onClick={() => setMenu(false)}
                        className={cn(
                          "flex min-h-12 items-center justify-between rounded-[10px] px-3 text-[16px] font-medium transition-colors",
                          on ? "text-accent-2" : "text-text/90 hover:bg-white/[0.04] hover:text-text"
                        )}
                      >
                        {l.label}
                        {on && <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />}
                      </a>
                    </li>
                  );
                })}
                <li className="mt-1 border-t border-white/[0.08] py-3">
                  <Button href={`${base}#audit`} className="w-full" onClick={() => setMenu(false)}>
                    Get My Free Audit
                  </Button>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* sticky bottom CTA, phones only — appears once the hero is behind you */}
      <AnimatePresence>
        {showBar && (
          <motion.div
            initial={{ y: 64, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 64, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="fixed inset-x-0 bottom-0 z-40 border-t border-white/[0.08] bg-[rgba(17,11,8,0.9)] px-4 pb-[max(0.625rem,env(safe-area-inset-bottom))] pt-2.5 backdrop-blur-md md:hidden"
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
