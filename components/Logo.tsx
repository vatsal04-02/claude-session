export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg width="28" height="28" viewBox="0 0 32 32" aria-hidden>
        <defs>
          <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#5EE7F7" />
            <stop offset="1" stopColor="#6EA8FF" />
          </linearGradient>
        </defs>
        <rect width="32" height="32" rx="9" fill="#151C27" stroke="#293548" />
        <path d="M8 20c4 0 4-8 8-8s4 8 8 8" fill="none" stroke="url(#lg)" strokeWidth="2.4" strokeLinecap="round" />
        <circle cx="8" cy="20" r="2.4" fill="#5EE7F7" />
        <circle cx="24" cy="20" r="2.4" fill="#6EA8FF" />
      </svg>
      <span className="text-[15px] font-semibold tracking-[0.18em] text-text">FLOWHQ</span>
    </span>
  );
}
