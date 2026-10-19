import { isFilled, SHOW_PLACEHOLDERS } from "@/lib/content";
import { cn } from "@/lib/cn";

/** Renders a content value from lib/content.ts. Unfilled [BRACKETED] values get a dashed amber outline so
    they are obvious in dev and on previews (production never renders them — see lib/content.ts). */
export default function Slot({ value, className }: { value: string; className?: string }) {
  if (isFilled(value) || !SHOW_PLACEHOLDERS) return <span className={className}>{value}</span>;
  return (
    <span className={cn("rounded-[6px] border border-dashed border-warning/60 bg-warning/[0.06] px-1.5 text-warning", className)} data-placeholder>
      {value}
    </span>
  );
}
