function TraceDivider() {
  return (
    <div className="trace-divider" aria-hidden="true">
      <svg viewBox="0 0 1200 24" preserveAspectRatio="none" className="w-full h-6">
        <path
          d="M0 12 H480 L520 4 H680 L720 12 H1200"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="text-graphite-border"
        />
        <circle cx="520" cy="4" r="3" className="fill-copper" />
        <circle cx="720" cy="12" r="3" className="fill-mint" />
      </svg>
    </div>
  );
}

export default TraceDivider;
