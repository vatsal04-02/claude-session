"use client";

import { MotionConfig, useReducedMotion } from "motion/react";
import { ReactLenis } from "lenis/react";
import { DemoProvider } from "@/lib/demo-context";

/**
 * - MotionConfig(reducedMotion="user") makes every motion component honour the OS setting.
 * - Lenis gives the page its smooth, inertial scroll (skipped entirely for reduced-motion users).
 */
export default function Providers({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();

  const tree = (
    <MotionConfig reducedMotion="user">
      <DemoProvider>{children}</DemoProvider>
    </MotionConfig>
  );

  if (reduce) return tree;

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.09,
        wheelMultiplier: 0.95,
        smoothWheel: true,
        anchors: true,
      }}
    >
      {tree}
    </ReactLenis>
  );
}
