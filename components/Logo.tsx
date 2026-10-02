export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg width="22" height="22" viewBox="0 0 32 32" aria-hidden>
        <path d="M5 21c5 0 6-10 11-10s6 10 11 10" fill="none" stroke="#EA6A2D" strokeWidth="3" strokeLinecap="round" />
        <circle cx="5" cy="21" r="3" fill="#EA6A2D" />
        <circle cx="27" cy="21" r="3" fill="#F1EAE1" />
      </svg>
      <span className="text-[19px] font-bold leading-none tracking-[-0.03em] text-text">FlowHQ</span>
    </span>
  );
}
