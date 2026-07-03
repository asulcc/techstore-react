import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import TraceDivider from "../components/TraceDivider";
import { getProductos } from "../services/productos.service";

const categorias = [
  { nombre: "Tecnología", ruta: "/productos?categoria=Tecnología" },
  { nombre: "Periféricos", ruta: "/productos?categoria=Periféricos" },
  { nombre: "Audio", ruta: "/productos?categoria=Audio" },
  { nombre: "Mobiliario", ruta: "/productos?categoria=Mobiliario" },
  { nombre: "Almacenamiento", ruta: "/productos?categoria=Almacenamiento" },
];

const ticker = [
  "ENVÍOS A TODO EL PERÚ",
  "GARANTÍA DE FÁBRICA",
  "SOPORTE TÉCNICO 24/7",
  "PAGOS SEGUROS",
  "STOCK VERIFICADO EN TIEMPO REAL",
];

function Home() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let activo = true;
    setCargando(true);
    getProductos()
      .then((data) => {
        if (activo) {
          setProductos(data.slice(0, 4));
          setError(false);
        }
      })
      .catch(() => activo && setError(true))
      .finally(() => activo && setCargando(false));
    return () => { activo = false; };
  }, []);

  return (
    <div>
      <section className="relative overflow-hidden border-b border-graphite-border bg-trace-grid bg-grid">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24">
          <div className="flex flex-col justify-center gap-5">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-copper">
              Catálogo verificado · JSON Server
            </span>
            <h1 className="font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
              Hardware pensado para tu próximo build.
            </h1>
            <p className="max-w-md text-ink-muted">
              Laptops, periféricos, audio y mobiliario gamer con precios
              claros y disponibilidad real. Sin relleno, solo las specs que importan.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link to="/productos"><Button variant="primary">Ver catálogo</Button></Link>
              <Link to="/ofertas"><Button variant="secondary">Ver ofertas</Button></Link>
            </div>
          </div>
          <div className="connector-frame relative flex items-center justify-center rounded-lg border border-graphite-border bg-graphite-surface/60 p-6">
            <img src="https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=700" alt="Estación de escritorio con periféricos gamer" className="h-full w-full rounded-md object-cover" />
          </div>
        </div>
        <div className="overflow-hidden border-t border-graphite-border bg-graphite-surface py-2">
          <div className="flex animate-[scroll_28s_linear_infinite] gap-10 whitespace-nowrap font-mono text-[11px] uppercase tracking-widest text-ink-faint">
            {[...ticker, ...ticker].map((item, i) => (
              <span key={i} className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-mint" /> {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h2 className="font-display text-2xl font-semibold text-ink">Explora por categoría</h2>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {categorias.map((cat) => (
            <Link key={cat.nombre} to={cat.ruta} className="connector-frame rounded-lg border border-graphite-border bg-graphite-surface px-4 py-5 text-center transition-colors hover:border-copper/40">
              <span className="font-mono text-xs uppercase tracking-wide text-ink-muted">{cat.nombre}</span>
            </Link>
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6"><TraceDivider /></div>

      <section className="mx-auto max-w-6xl px-4 py-6 pb-16 sm:px-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-display text-2xl font-semibold text-ink">Destacados</h2>
          <Link to="/productos" className="font-mono text-xs uppercase tracking-wide text-copper hover:underline">Ver todos →</Link>
        </div>
        {cargando && <Loader label="Cargando destacados..." />}
        {!cargando && error && <EmptyState title="No se pudo conectar con el servidor" message="Verifica que JSON Server esté corriendo en http://localhost:3000 (npm run server)." />}
        {!cargando && !error && productos.length === 0 && <EmptyState title="Sin productos" message="Aún no hay productos cargados en db.json." />}
        {!cargando && !error && productos.length > 0 && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {productos.map((p) => <ProductCard key={p.id} producto={p} />)}
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;
