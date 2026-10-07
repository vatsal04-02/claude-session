"use client";

import { MotionConfig } from "motion/react";

/**
 * MotionConfig(reducedMotion="user") makes every motion component honour the OS setting.
 * Scrolling is the browser's own (no scroll-jacking): animations react to scroll, never control it.
 */
export default function Providers({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
