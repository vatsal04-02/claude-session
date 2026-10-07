"use client";

import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import { useEffect } from "react";
import { track } from "@/lib/analytics";

/** Page views (Vercel Web Analytics) + a few delegated events. One click listener and one observer — no per-element wiring. */
export default function Analytics() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest("a");
      if (!a) return;
      const href = a.getAttribute("href") ?? "";
      const label = (a.textContent ?? "").trim().slice(0, 40);
      if (href.endsWith("#audit")) track("cta_click", { label, page: location.pathname });
      else if (href.includes("wa.me/")) track("whatsapp_click", { page: location.pathname });
    };
    document.addEventListener("click", onClick, { capture: true });

    const seen = new Set<string>();
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((en) => {
          const id = (en.target as HTMLElement).id;
          if (!en.isIntersecting || seen.has(id)) return;
          seen.add(id);
          track(id === "audit" ? "audit_view" : "section_view", { section: id });
        }),
      { threshold: 0.4 }
    );
    ["pipeline", "workflow", "calculator", "try-it", "audit"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => {
      document.removeEventListener("click", onClick, { capture: true });
      io.disconnect();
    };
  }, []);

  return <VercelAnalytics />;
}
