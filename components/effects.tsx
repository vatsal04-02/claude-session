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
/* Hero object: "the flow engine"                                      */
/* Five channel blocks orbit an orange core; packets travel from each  */
/* block into the core. Drag to spin it (mouse). Decorative only.      */
/* ------------------------------------------------------------------ */

const INK = "#17120E";
const INK_2 = "#2E251E";
const INK_3 = "#46392F";
const PAPER = "#FBF8F3";
const PAPER_2 = "#E9E1D4";
const PAPER_3 = "#D6CABA";
const SIGNAL = "#FF5F15";
const SIGNAL_DEEP = "#D9470A";
const LINE = "rgba(23,18,14,0.28)";

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
      let spinning = true;
      let resumeAt = 0;

      const illo = new Zdog.Illustration({
        element: el,
        resize: true,
        dragRotate: finePointer() && !still,
        rotate: { x: -0.42, y: 0.6 },
        onResize(width: number, height: number) {
          this.zoom = Math.min(width, height) / 430;
        },
        onDragStart() {
          spinning = false;
        },
        onDragEnd() {
          resumeAt = performance.now() + 1800;
        },
      });

      // the core: two hemispheres give it a lit side and a shaded side
      const core = new Zdog.Anchor({ addTo: illo });
      new Zdog.Hemisphere({ addTo: core, diameter: 118, stroke: false, color: SIGNAL, backface: SIGNAL_DEEP });
      new Zdog.Hemisphere({ addTo: core, diameter: 118, stroke: false, color: SIGNAL_DEEP, backface: SIGNAL, rotate: { y: TAU / 2 } });
      // a ring around the core, like a planet's
      new Zdog.Ellipse({ addTo: core, diameter: 168, stroke: 5, color: INK, rotate: { x: TAU / 4 } });

      // orbit lines
      new Zdog.Ellipse({ addTo: illo, diameter: 330, stroke: 1.4, color: LINE, rotate: { x: TAU / 4 } });
      new Zdog.Ellipse({ addTo: illo, diameter: 250, stroke: 1.2, color: "rgba(255,95,21,0.55)", rotate: { x: TAU / 4 + 0.55, z: 0.3 } });

      // five channel blocks on the outer orbit, alternating ink and paper
      const R = 165;
      const blocks: InstanceType<typeof Zdog.Box>[] = [];
      const packets: { shape: InstanceType<typeof Zdog.Shape>; x: number; z: number; t: number }[] = [];
      for (let i = 0; i < 5; i++) {
        const a = (i / 5) * TAU;
        const x = Math.cos(a) * R;
        const z = Math.sin(a) * R;
        const dark = i % 2 === 0;
        const box = new Zdog.Box({
          addTo: illo,
          width: 40,
          height: 40,
          depth: 40,
          stroke: 6,
          translate: { x, z },
          rotate: { y: a, x: 0.2 * i },
          color: dark ? INK : PAPER,
          leftFace: dark ? INK_2 : PAPER_2,
          rightFace: dark ? INK_3 : PAPER_3,
          topFace: i === 1 ? SIGNAL : dark ? INK_2 : PAPER,
          bottomFace: dark ? INK_3 : PAPER_3,
          rearFace: dark ? INK_2 : PAPER_2,
        });
        blocks.push(box);
        // a packet travelling from this block to the core
        const shape = new Zdog.Shape({ addTo: illo, stroke: 11, color: i % 2 ? INK : SIGNAL, translate: { x, z } });
        packets.push({ shape, x, z, t: i / 5 });
      }

      // a few floating motes for depth
      [
        [-150, -120, 60, 7],
        [170, -90, -80, 5],
        [-60, 140, -120, 6],
        [110, 130, 120, 4],
      ].forEach(([x, y, z, s]) => new Zdog.Shape({ addTo: illo, stroke: s, color: INK, translate: { x, y, z } }));

      const startT = performance.now();
      const frame = (now: number) => {
        const t = (now - startT) / 1000;
        if (!spinning && resumeAt && now > resumeAt) spinning = true;
        if (spinning) illo.rotate.y += 0.0035;
        core.rotate.y = t * 0.6;
        illo.translate.y = Math.sin(t * 1.1) * 6;
        blocks.forEach((b, i) => {
          b.rotate.y += 0.006 + i * 0.001;
          b.translate.y = Math.sin(t * 1.4 + i) * 10;
        });
        packets.forEach((p) => {
          p.t = (p.t + 0.0045) % 1;
          const k = 1 - p.t;
          p.shape.translate.x = p.x * k;
          p.shape.translate.z = p.z * k;
          p.shape.translate.y = Math.sin(p.t * Math.PI) * -38;
          // hide inside the core
          p.shape.visible = p.t < 0.62;
        });
        illo.updateRenderGraph();
        if (alive && visible) raf = requestAnimationFrame(frame);
      };

      if (still) {
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
