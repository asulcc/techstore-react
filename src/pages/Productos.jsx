import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import Button from "../components/Button";
import { getProductos } from "../services/productos.service";

function Productos() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const busqueda = searchParams.get("q") || "";
  const categoriaActiva = searchParams.get("categoria") || "";

  useEffect(() => {
    let activo = true;
    setCargando(true);
    getProductos()
      .then((data) => {
        if (activo) {
          setProductos(data);
          setError(false);
        }
      })
      .catch(() => activo && setError(true))
      .finally(() => activo && setCargando(false));
    return () => { activo = false; };
  }, []);

  const categorias = useMemo(
    () => [...new Set(productos.map((p) => p.categoria))],
    [productos]
  );

  const productosFiltrados = useMemo(() => {
    return productos.filter((p) => {
      const coincideNombre = p.nombre.toLowerCase().includes(busqueda.toLowerCase());
      const coincideCategoria = categoriaActiva ? p.categoria === categoriaActiva : true;
      return coincideNombre && coincideCategoria;
    });
  }, [productos, busqueda, categoriaActiva]);

  function actualizarBusqueda(e) {
    const value = e.target.value;
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      value ? next.set("q", value) : next.delete("q");
      return next;
    });
  }

  function seleccionarCategoria(cat) {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      cat ? next.set("categoria", cat) : next.delete("categoria");
      return next;
    });
  }

  function limpiarFiltros() {
    setSearchParams({});
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <span className="font-mono text-xs uppercase tracking-[0.2em] text-copper">Catálogo completo</span>
      <h1 className="mt-2 font-display text-3xl font-semibold text-ink">Productos</h1>

      <div className="mt-6 flex flex-col gap-4 rounded-lg border border-graphite-border bg-graphite-surface p-4 sm:flex-row sm:items-center">
        <input type="text" value={busqueda} onChange={actualizarBusqueda} placeholder="Buscar por nombre..." className="w-full rounded-md border border-graphite-border bg-graphite px-4 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:border-copper sm:max-w-xs" />
        <div className="flex flex-wrap gap-2">
          <button onClick={() => seleccionarCategoria("")} className={`rounded-full border px-3 py-1.5 font-mono text-[11px] uppercase tracking-wide transition-colors ${categoriaActiva === "" ? "border-copper bg-copper/15 text-copper-light" : "border-graphite-border text-ink-muted hover:text-ink"}`}>
            Todas
          </button>
          {categorias.map((cat) => (
            <button key={cat} onClick={() => seleccionarCategoria(cat)} className={`rounded-full border px-3 py-1.5 font-mono text-[11px] uppercase tracking-wide transition-colors ${categoriaActiva === cat ? "border-copper bg-copper/15 text-copper-light" : "border-graphite-border text-ink-muted hover:text-ink"}`}>
              {cat}
            </button>
          ))}
        </div>
        {(busqueda || categoriaActiva) && (
          <Button variant="ghost" onClick={limpiarFiltros} className="sm:ml-auto">Limpiar filtros</Button>
        )}
      </div>

      <p className="mt-4 font-mono text-xs text-ink-faint">
        {!cargando && !error && `${productosFiltrados.length} producto(s) encontrado(s)`}
      </p>

      <div className="mt-6">
        {cargando && <Loader label="Consultando catálogo..." />}
        {!cargando && error && <EmptyState title="No se pudo conectar con el servidor" message="Verifica que JSON Server esté corriendo en http://localhost:3000 (npm run server)." />}
        {!cargando && !error && productosFiltrados.length === 0 && (
          <EmptyState title="No encontramos coincidencias" message="Prueba con otro término de búsqueda o quita el filtro de categoría." action={<Button variant="secondary" onClick={limpiarFiltros}>Quitar filtros</Button>} />
        )}
        {!cargando && !error && productosFiltrados.length > 0 && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {productosFiltrados.map((p) => <ProductCard key={p.id} producto={p} />)}
          </div>
        )}
      </div>
    </div>
  );
}

export default Productos;
