/* The FlowHQ "F": a rounded stem with two bars, each ending in a ball, on an orange → peach gradient. */
export const MARK_VIEWBOX = "240 110 205 285";
export const MARK_GRADIENT = [
  ["0", "#DD4B21"],
  [".45", "#EE6B30"],
  ["1", "#FDAA64"],
] as const;

export default function LogoMark({
  className,
  gradientId = "flowhq-mark",
  draw = false,
}: {
  className?: string;
  gradientId?: string;
  /** add the classes the page-load intro animates (stroke draw + ball pop) */
  draw?: boolean;
}) {
  const fill = `url(#${gradientId})`;
  return (
    <svg viewBox={MARK_VIEWBOX} className={className} aria-hidden>
      <defs>
        <linearGradient id={gradientId} gradientUnits="userSpaceOnUse" x1="435" y1="115" x2="250" y2="390">
          {MARK_GRADIENT.map(([o, c]) => (
            <stop key={o} offset={o} stopColor={c} />
          ))}
        </linearGradient>
      </defs>
      <g fill="none" stroke={fill} strokeLinecap="round" className={draw ? "mark-strokes" : undefined}>
        <path d="M268 333V180a42 42 0 0 1 42-42h78" strokeWidth="42" pathLength={100} />
        <path d="M268 246h77" strokeWidth="40" pathLength={100} />
      </g>
      <g fill={fill} className={draw ? "mark-dots" : undefined}>
        <circle cx="419" cy="139" r="24" />
        <circle cx="382" cy="246" r="22.5" />
        <circle cx="267" cy="367" r="24" />
      </g>
    </svg>
  );
}
