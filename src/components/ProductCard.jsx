import Badge from "./Badge";

function ProductCard({ producto }) {
  const {
    nombre,
    imagen,
    categoria,
    precio,
    stock,
    oferta,
    descuento,
    descripcion,
  } = producto;

  const precioFinal = oferta ? precio - (precio * descuento) / 100 : precio;

  return (
    <article className="connector-frame group flex h-full flex-col overflow-hidden rounded-lg border border-graphite-border bg-graphite-surface transition-colors hover:border-copper/40">
      <div className="relative aspect-[4/3] overflow-hidden bg-graphite-surface2">
        <img
          src={imagen}
          alt={nombre}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {oferta && (
          <Badge tone="signal" className="absolute right-2 top-2">
            -{descuento}%
          </Badge>
        )}
        <Badge tone="neutral" className="absolute left-2 top-2">
          {categoria}
        </Badge>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="font-display text-base font-semibold leading-snug text-ink">
          {nombre}
        </h3>
        <p className="line-clamp-2 text-sm text-ink-muted">{descripcion}</p>

        <div className="mt-auto flex items-end justify-between pt-3">
          <div className="flex flex-col">
            {oferta && (
              <span className="font-mono text-xs text-ink-faint line-through">
                S/ {precio.toFixed(2)}
              </span>
            )}
            <span className="font-mono text-lg font-semibold text-mint">
              S/ {precioFinal.toFixed(2)}
            </span>
          </div>

          <span
            className={`font-mono text-[11px] ${
              stock > 0 ? "text-ink-muted" : "text-signal-light"
            }`}
          >
            {stock > 0 ? `${stock} en stock` : "Agotado"}
          </span>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
