import type { Metadata } from "next";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui";

export const metadata: Metadata = {
  title: "Page not found — FlowHQ",
};

export default function NotFound() {
  return (
    <main id="main" className="hero-atmos relative grid min-h-[100svh] place-items-center overflow-hidden px-5 text-center">
      <div aria-hidden className="grid-layer" style={{ "--grid-o": 0.6 } as React.CSSProperties} />
      <div className="relative">
        <a href="/" className="inline-flex min-h-11 items-center">
          <Logo />
        </a>
        <p className="label mt-10 text-accent">Error 404</p>
        <h1 className="display mt-4 text-[clamp(2.4rem,6vw,4rem)] text-text">Page not found.</h1>
        <p className="mx-auto mt-4 max-w-[34ch] text-[16px] leading-[1.7] text-muted">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <div className="mt-8">
          <Button href="/">Back to home</Button>
        </div>
      </div>
    </main>
  );
}
