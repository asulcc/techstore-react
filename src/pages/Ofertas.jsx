import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import { getProductosEnOferta } from "../services/productos.service";

function Ofertas() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let activo = true;
    getProductosEnOferta()
      .then((data) => activo && setProductos(data))
      .catch(() => activo && setError(true))
      .finally(() => activo && setCargando(false));
    return () => { activo = false; };
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <span className="font-mono text-xs uppercase tracking-[0.2em] text-signal">Tiempo limitado</span>
      <h1 className="mt-2 font-display text-3xl font-semibold text-ink">Ofertas activas</h1>
      <p className="mt-2 max-w-lg text-ink-muted">Productos con descuento verificado directamente desde el catálogo.</p>

      <div className="mt-8">
        {cargando && <Loader label="Buscando ofertas..." />}
        {!cargando && error && <EmptyState title="No se pudo conectar con el servidor" message="Verifica que JSON Server esté corriendo en http://localhost:3000." />}
        {!cargando && !error && productos.length === 0 && <EmptyState title="No hay ofertas activas" message="Vuelve a revisar más tarde, actualizamos las promociones seguido." />}
        {!cargando && !error && productos.length > 0 && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {productos.map((p) => <ProductCard key={p.id} producto={p} />)}
          </div>
        )}
      </div>
    </div>
  );
}

export default Ofertas;
