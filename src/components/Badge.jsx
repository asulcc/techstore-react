// Etiqueta reutilizable para categoría, stock y descuentos.

function Badge({ children, tone = "neutral", className = "" }) {
  const tones = {
    neutral: "bg-graphite-surface2 text-ink-muted border border-graphite-border",
    copper: "bg-copper/15 text-copper-light border border-copper/30",
    mint: "bg-mint/15 text-mint border border-mint/30",
    signal: "bg-signal/15 text-signal-light border border-signal/30",
  };
  return (
    <span
      className={`inline-flex items-center rounded px-2 py-0.5 text-[11px] font-mono uppercase tracking-wider ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

export default Badge;
