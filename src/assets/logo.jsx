function Logo({ className = "h-8 w-8" }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
      <rect x="1" y="1" width="38" height="38" rx="8" stroke="currentColor" strokeWidth="2" className="text-copper" />
      <path d="M20 8v6M20 26v6M8 20h6M26 20h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-copper" />
      <circle cx="20" cy="20" r="7" stroke="currentColor" strokeWidth="2" className="text-mint" />
      <circle cx="20" cy="20" r="2" fill="currentColor" className="text-mint" />
    </svg>
  );
}

export default Logo;
