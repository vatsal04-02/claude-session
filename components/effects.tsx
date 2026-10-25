"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

/* Lightweight 3D layer (lightweight-3d-effects): vanilla-tilt for cards, Zdog for the hero object.
   Both libraries load lazily after hydration, only on devices that get the effect, so they never touch first paint.
   Reduced motion: no tilt, and the hero object renders once, still. */

const reducedMotion = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = () => matchMedia("(hover: hover) and (pointer: fine)").matches;

/** A card that tilts toward the cursor (mouse only). Children with `.tilt-pop` float above the surface. */
export function Tilt({
  children,
  className,
  max = 7,
  glare = true,
  ...rest
}: { max?: number; glare?: boolean } & React.HTMLAttributes<HTMLDivElement>) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion() || !finePointer()) return;
    let destroyed = false;
    let inst: { destroy: () => void } | undefined;
    import("vanilla-tilt").then(({ default: VanillaTilt }) => {
      if (destroyed) return;
      VanillaTilt.init(el, { max, speed: 600, perspective: 1100, scale: 1.015, glare, "max-glare": 0.14, "glare-prerender": false, gyroscope: false });
      inst = (el as HTMLDivElement & { vanillaTilt?: { destroy: () => void } }).vanillaTilt;
    });
    return () => {
      destroyed = true;
      inst?.destroy();
    };
  }, [max, glare]);
  return (
    <div ref={ref} className={cn("tilt", className)} {...rest}>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Hero object: what Flow HQ does, in one picture                      */
/* Your channels (WhatsApp, Instagram, call, email, web form) orbit as */
/* app tiles that always face the viewer; each one sends enquiries     */
/* into a 3D Flow HQ "F". Drag to turn it (mouse). Decorative only.    */
/* ------------------------------------------------------------------ */

const INK = "#17120E";
const PAPER = "#FBF8F3";
const PAPER_2 = "#E9E1D4";
const SIGNAL = "#FF5F15";
const LINE = "rgba(23,18,14,0.22)";
const WHITE = "#FFFFFF";
// the logo gradient, deep → light, spread over the mark's parts
const F_DEEP = "#DD4B21";
const F_MID = "#EE6B30";
const F_LIGHT = "#FDAA64";

type Z = typeof import("zdog");
type Anchor = InstanceType<Z["Anchor"]>;

/** The Flow HQ "F" (same geometry as LogoMark, centred and scaled): round tubes + three balls. */
function buildMark(Zdog: Z, addTo: Anchor) {
  const s = 0.7;
  const P = (x: number, y: number) => ({ x: (x - 342) * s, y: (y - 252) * s });
  const mark = new Zdog.Anchor({ addTo });
  new Zdog.Shape({
    addTo: mark,
    path: [P(268, 333), P(268, 180), { arc: [P(268, 138), P(310, 138)] }, P(388, 138)],
    closed: false,
    stroke: 42 * s,
    color: F_MID,
  });
  new Zdog.Shape({ addTo: mark, path: [P(268, 246), P(345, 246)], stroke: 40 * s, color: F_MID });
  new Zdog.Shape({ addTo: mark, translate: P(419, 139), stroke: 48 * s, color: F_LIGHT });
  new Zdog.Shape({ addTo: mark, translate: P(382, 246), stroke: 45 * s, color: F_MID });
  new Zdog.Shape({ addTo: mark, translate: P(267, 367), stroke: 48 * s, color: F_DEEP });
  return mark;
}

/** One channel tile: a rounded app icon with a simple white/ink glyph. Drawn in the tile's own (camera-facing) space. */
function buildTile(Zdog: Z, addTo: Anchor, kind: "whatsapp" | "instagram" | "call" | "email" | "form") {
  const g = new Zdog.Group({ addTo });
  const bg = { whatsapp: "#25D366", instagram: "#E1306C", call: INK, email: PAPER, form: PAPER_2 }[kind];
  new Zdog.RoundedRect({ addTo: g, width: 52, height: 52, cornerRadius: 14, stroke: 4, fill: true, color: bg });
  if (kind === "email" || kind === "form") new Zdog.RoundedRect({ addTo: g, width: 56, height: 56, cornerRadius: 16, stroke: 1.5, color: LINE });
  const z = { z: 2 };
  if (kind === "whatsapp") {
    new Zdog.Ellipse({ addTo: g, diameter: 27, stroke: 3.5, color: WHITE, translate: z });
    new Zdog.Shape({ addTo: g, path: [{ x: -10, y: 8 }, { x: -14, y: 15 }, { x: -5, y: 12 }], stroke: 3, fill: true, color: WHITE, translate: z });
    new Zdog.Shape({ addTo: g, path: [{ x: -4, y: -5 }, { bezier: [{ x: -5, y: 2 }, { x: 1, y: 6 }, { x: 6, y: 5 }] }], closed: false, stroke: 3.5, color: WHITE, translate: z });
  } else if (kind === "instagram") {
    new Zdog.RoundedRect({ addTo: g, width: 26, height: 26, cornerRadius: 8, stroke: 3.5, color: WHITE, translate: z });
    new Zdog.Ellipse({ addTo: g, diameter: 10, stroke: 3.5, color: WHITE, translate: z });
    new Zdog.Shape({ addTo: g, translate: { x: 7.5, y: -7.5, z: 2 }, stroke: 4, color: WHITE });
  } else if (kind === "call") {
    new Zdog.RoundedRect({ addTo: g, width: 18, height: 30, cornerRadius: 4, stroke: 3.5, color: WHITE, translate: z });
    new Zdog.Shape({ addTo: g, translate: { y: 10, z: 2 }, stroke: 3.5, color: SIGNAL });
  } else if (kind === "email") {
    new Zdog.Rect({ addTo: g, width: 30, height: 21, stroke: 3, color: INK, translate: z });
    new Zdog.Shape({ addTo: g, path: [{ x: -15, y: -10.5 }, { x: 0, y: 2 }, { x: 15, y: -10.5 }], closed: false, stroke: 3, color: SIGNAL, translate: z });
  } else {
    new Zdog.RoundedRect({ addTo: g, width: 32, height: 26, cornerRadius: 3, stroke: 3, color: INK, translate: z });
    new Zdog.Shape({ addTo: g, path: [{ x: -16, y: -6 }, { x: 16, y: -6 }], stroke: 2.5, color: INK, translate: z });
    new Zdog.Shape({ addTo: g, path: [{ x: -9, y: 1 }, { x: 9, y: 1 }], stroke: 3, color: SIGNAL, translate: z });
    new Zdog.Shape({ addTo: g, path: [{ x: -9, y: 7 }, { x: 3, y: 7 }], stroke: 3, color: SIGNAL, translate: z });
  }
  return g;
}

const CHANNELS = [
  { kind: "whatsapp", packet: "#25D366" },
  { kind: "instagram", packet: "#E1306C" },
  { kind: "call", packet: INK },
  { kind: "email", packet: SIGNAL },
  { kind: "form", packet: INK },
] as const;

export function HeroScene({ className }: { className?: string }) {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = canvas.current;
    if (!el) return;
    let raf = 0;
    let alive = true;
    let visible = true;
    const cleanups: (() => void)[] = [];

    import("zdog").then((Zdog) => {
      if (!alive) return;
      const TAU = Zdog.TAU;
      const still = reducedMotion();

      const illo = new Zdog.Illustration({
        element: el,
        resize: true,
        dragRotate: finePointer() && !still,
        rotate: { x: -0.32 },
        onResize(width: number, height: number) {
          this.zoom = Math.min(width, height) / 440;
        },
      });

      // orbit lines
      new Zdog.Ellipse({ addTo: illo, diameter: 340, stroke: 1.4, color: LINE, rotate: { x: TAU / 4 } });
      new Zdog.Ellipse({ addTo: illo, diameter: 250, stroke: 1.2, color: "rgba(255,95,21,0.5)", rotate: { x: TAU / 4 + 0.5, z: 0.25 } });

      // the core: the Flow HQ mark (kept facing the viewer, so it never reads mirrored) inside a ring that turns with the scene
      const core = new Zdog.Anchor({ addTo: illo });
      const markFaceY = new Zdog.Anchor({ addTo: core });
      const markFaceX = new Zdog.Anchor({ addTo: markFaceY });
      const mark = buildMark(Zdog, markFaceX);
      new Zdog.Ellipse({ addTo: core, diameter: 190, stroke: 4, color: INK, rotate: { x: TAU / 4 } });

      // channel tiles on the orbit; each sits in two counter-rotating anchors so it always faces the viewer
      const R = 170;
      const tiles = CHANNELS.map((c, i) => {
        const pos = new Zdog.Anchor({ addTo: illo });
        const faceY = new Zdog.Anchor({ addTo: pos });
        const faceX = new Zdog.Anchor({ addTo: faceY });
        buildTile(Zdog, faceX, c.kind);
        const packet = new Zdog.Shape({ addTo: illo, stroke: 10, color: c.packet });
        return { pos, faceY, faceX, packet, phase: (i / CHANNELS.length) * TAU, t: i / CHANNELS.length };
      });

      let orbit = 0;
      const place = (time: number) => {
        tiles.forEach((tile, i) => {
          const a = tile.phase + orbit;
          const x = Math.cos(a) * R;
          const z = Math.sin(a) * R;
          const y = Math.sin(time * 1.3 + i * 1.7) * 8;
          tile.pos.translate.set({ x, y, z });
          // undo the scene's rotation (inner X first, then Y) so the tile faces the camera
          tile.faceY.rotate.y = -illo.rotate.y;
          tile.faceX.rotate.x = -illo.rotate.x;
          // an enquiry travels from the tile into the mark, arcing up a little
          const k = 1 - tile.t;
          tile.packet.translate.set({ x: x * k, y: y * k - Math.sin(tile.t * Math.PI) * 34, z: z * k });
          tile.packet.visible = tile.t < 0.66;
        });
        markFaceY.rotate.y = -illo.rotate.y;
        markFaceX.rotate.x = -illo.rotate.x;
      };

      const startT = performance.now();
      const frame = (now: number) => {
        const time = (now - startT) / 1000;
        orbit += 0.0032;
        tiles.forEach((tile) => (tile.t = (tile.t + 0.005) % 1));
        // the mark sways so it reads as 3D but stays legible
        mark.rotate.y = Math.sin(time * 0.7) * 0.45;
        core.translate.y = Math.sin(time * 1.1) * 5;
        place(time);
        illo.updateRenderGraph();
        if (alive && visible) raf = requestAnimationFrame(frame);
      };

      if (still) {
        orbit = 0.35;
        mark.rotate.y = -0.35;
        place(0);
        illo.updateRenderGraph();
        const onResize = () => illo.updateRenderGraph();
        addEventListener("resize", onResize);
        cleanups.push(() => removeEventListener("resize", onResize));
        return;
      }

      // run only while on screen and the tab is visible
      const io = new IntersectionObserver(([e]) => {
        const was = visible;
        visible = e.isIntersecting && !document.hidden;
        if (visible && !was) raf = requestAnimationFrame(frame);
      });
      io.observe(el);
      const onVis = () => {
        const was = visible;
        visible = !document.hidden;
        if (visible && !was) raf = requestAnimationFrame(frame);
      };
      document.addEventListener("visibilitychange", onVis);
      cleanups.push(() => {
        io.disconnect();
        document.removeEventListener("visibilitychange", onVis);
      });
      raf = requestAnimationFrame(frame);
    });

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      cleanups.forEach((c) => c());
    };
  }, []);

  return <canvas ref={canvas} aria-hidden className={cn("block h-full w-full cursor-grab active:cursor-grabbing", className)} />;
}
