import { cn } from "@/lib/cn";

/* "Grow", drawn as a system would draw it: a seed, a stem, four branches, five leaves — geometric, orange on dark.
   Pure CSS (.grow-tree in globals.css): ~1.1s when `grown` turns on, an instant reset when it turns off, so a
   revisit replays it once. Each part waits for its own --d (delay); strokes draw via pathLength=1 dashes.
   With `still`, the finished tree simply shows (reduced motion). */

const BRANCHES = [
  { d: "M80 112 L58 96", at: 0.24, leaf: [58, 96, -144] },
  { d: "M80 100 L104 84", at: 0.32, leaf: [104, 84, -34] },
  { d: "M80 82 L62 68", at: 0.42, leaf: [62, 68, -142] },
  { d: "M80 70 L100 56", at: 0.5, leaf: [100, 56, -35] },
] as const;
const JOINTS = [112, 100, 82, 70];

const at = (d: number, t?: number) => ({ "--d": `${d}s`, ...(t ? { "--t": `${t}s` } : {}) }) as React.CSSProperties;

export default function GrowTree({ grown, still, className }: { grown: boolean; still?: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 160 150" className={cn("grow-tree", className)} data-on={still || grown} data-still={!!still} aria-hidden>
      <defs>
        <linearGradient id="grow-stroke" x1="80" y1="140" x2="80" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#DD4B21" />
          <stop offset="1" stopColor="#FDAA64" />
        </linearGradient>
        <radialGradient id="grow-glow" cx="80" cy="76" r="62" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="rgba(234,106,47,0.28)" />
          <stop offset="1" stopColor="rgba(234,106,47,0)" />
        </radialGradient>
      </defs>

      {/* canopy light: arrives last */}
      <circle className="gt-fade" cx="80" cy="76" r="62" fill="url(#grow-glow)" style={at(0.7)} />
      {/* ground */}
      <path className="gt-draw" pathLength={1} d="M50 136 H110" stroke="rgba(245,220,200,0.16)" strokeWidth="1.5" strokeLinecap="round" fill="none" style={at(0, 0.3)} />

      <g fill="none" stroke="url(#grow-stroke)" strokeWidth="2.4" strokeLinecap="round">
        {/* stem, then the branches as it passes them */}
        <path className="gt-draw" pathLength={1} d="M80 136 V50" style={at(0.08, 0.38)} />
        {BRANCHES.map((b) => (
          <path key={b.d} className="gt-draw" pathLength={1} d={b.d} style={at(b.at, 0.22)} />
        ))}
      </g>

      {/* joints on the stem, like nodes in a graph */}
      {JOINTS.map((y, i) => (
        <circle key={y} className="gt-pop" cx="80" cy={y} r="2.2" fill="#F2E9DF" style={at(0.18 + i * 0.07)} />
      ))}

      {/* leaves grow from their base, along the branch */}
      {BRANCHES.map(({ leaf: [x, y, a] }, i) => (
        <g key={`${x}-${y}`} transform={`translate(${x} ${y}) rotate(${a})`}>
          <path className="gt-pop gt-leaf" d="M0 0C4-5.2 10-5.2 15 0 10 5.2 4 5.2 0 0Z" fill="#EE6B30" style={at(0.44 + i * 0.08)} />
        </g>
      ))}
      {/* the bud on top */}
      <g transform="translate(80 50) rotate(-90)">
        <path className="gt-pop gt-leaf" d="M0 0C4.5-6 11.5-6 17 0 11.5 6 4.5 6 0 0Z" fill="#FDAA64" style={at(0.78)} />
      </g>

      {/* the seed it all started from */}
      <circle className="gt-pop" cx="80" cy="136" r="3.6" fill="#EA6A2F" style={at(0)} />
    </svg>
  );
}
