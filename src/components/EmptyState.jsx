// Estado vacío / error reutilizable para listas que consumen la API.
export default function EmptyState({
  title = "Sin resultados",
  message = "No se encontró información para mostrar.",
  action = null,
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
      <div className="h-12 w-12 rounded-lg border border-dashed border-graphite-border flex items-center justify-center text-ink-faint font-mono text-lg">
        ?
      </div>
      <h3 className="font-display text-lg text-ink">{title}</h3>
      <p className="max-w-sm text-sm text-ink-muted">{message}</p>
      {action}
    </div>
  );
}
