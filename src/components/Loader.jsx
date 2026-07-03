// Indicador de carga reutilizable mientras se consume la API con Fetch.
export default function Loader({ label = "Cargando datos..." }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20 text-ink-muted">
      <div className="relative h-10 w-10">
        <div className="absolute inset-0 rounded-full border-2 border-graphite-border" />
        <div className="absolute inset-0 rounded-full border-2 border-t-copper border-r-transparent border-b-transparent border-l-transparent animate-spin" />
      </div>
      <p className="font-mono text-xs uppercase tracking-widest">{label}</p>
    </div>
  );
}
