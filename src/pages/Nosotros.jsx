import TraceDivider from "../components/TraceDivider";

const hitos = [
  { anio: "2021", texto: "Nace TechStore como tienda online de periféricos gamer." },
  { anio: "2023", texto: "Ampliamos catálogo a laptops, audio y mobiliario ergonómico." },
  { anio: "2026", texto: "Migramos el catálogo a una plataforma con React y datos en tiempo real." },
];

const valores = [
  { titulo: "Precios claros", texto: "Sin letra pequeña: el precio que ves en la tarjeta es el que pagas." },
  { titulo: "Stock real", texto: "El inventario que mostramos refleja la disponibilidad verificada." },
  { titulo: "Soporte cercano", texto: "Respondemos consultas técnicas antes y después de la compra." },
];

function Nosotros() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <span className="font-mono text-xs uppercase tracking-[0.2em] text-copper">Quiénes somos</span>
      <h1 className="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl">Tecnología elegida por quienes la usan a diario.</h1>
      <p className="mt-4 max-w-2xl text-ink-muted">TechStore es una tienda peruana de tecnología y periféricos. Este proyecto es la versión desarrollada para el curso de Javascript Avanzado, consumiendo un catálogo simulado con JSON Server y Fetch API.</p>

      <TraceDivider />

      <div className="grid gap-4 sm:grid-cols-3">
        {valores.map((v) => (
          <div key={v.titulo} className="connector-frame rounded-lg border border-graphite-border bg-graphite-surface p-5">
            <h3 className="font-display text-base font-semibold text-mint">{v.titulo}</h3>
            <p className="mt-2 text-sm text-ink-muted">{v.texto}</p>
          </div>
        ))}
      </div>

      <TraceDivider />

      <h2 className="font-display text-xl font-semibold text-ink">Línea de tiempo</h2>
      <ol className="mt-6 space-y-6 border-l border-graphite-border pl-6">
        {hitos.map((h) => (
          <li key={h.anio} className="relative">
            <span className="absolute -left-[31px] top-1 h-3 w-3 rounded-full border-2 border-copper bg-graphite" />
            <span className="font-mono text-xs text-copper">{h.anio}</span>
            <p className="mt-1 text-sm text-ink-muted">{h.texto}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default Nosotros;
