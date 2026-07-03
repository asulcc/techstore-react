function Button({
  children,
  variant = "primary",
  type = "button",
  onClick,
  className = "",
  disabled = false,
  ...rest
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-md px-5 py-2.5 text-sm font-semibold tracking-wide transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-copper text-graphite hover:bg-copper-light active:scale-[0.98] shadow-[0_0_0_1px_rgba(200,127,74,0.4)]",
    secondary:
      "bg-transparent text-mint border border-mint/50 hover:bg-mint/10 active:scale-[0.98]",
    ghost:
      "bg-transparent text-ink-muted hover:text-ink hover:bg-graphite-surface2",
    danger:
      "bg-signal text-ink hover:bg-signal-light active:scale-[0.98]",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
