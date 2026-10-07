import LogoMark from "./LogoMark";

/** FlowHQ lockup: the gradient "F" mark + "LOW HQ" (cream / orange) in Poppins Bold, as in the brand logo. */
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-[3px] ${className}`}>
      <LogoMark className="h-[30px] w-auto" />
      {/* the "F" is the mark; a hidden F keeps the accessible name "FLOW HQ" */}
      <span className="font-logo text-[17px] font-bold leading-none tracking-[-0.01em]">
        <span className="sr-only">F</span>
        <span className="text-[#F8E9C9]">LOW</span> <span className="text-[#FF6510]">HQ</span>
      </span>
    </span>
  );
}
