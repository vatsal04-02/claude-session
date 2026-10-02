export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg width="22" height="22" viewBox="0 0 32 32" aria-hidden>
        <path d="M5 21c5 0 6-10 11-10s6 10 11 10" fill="none" stroke="#E9682D" strokeWidth="3" strokeLinecap="round" />
        <circle cx="5" cy="21" r="3" fill="#E9682D" />
        <circle cx="27" cy="21" r="3" fill="#F3EDE4" />
      </svg>
      <span className="font-serif text-[24px] leading-none tracking-tight text-text">FlowHQ</span>
    </span>
  );
}
