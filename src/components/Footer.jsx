import { Link } from "react-router-dom";
import Logo from "../assets/logo.jsx";

// Footer reutilizable, presente en todas las páginas vía App.jsx.
// Footer reutilizable, presente en todas las páginas vía App.jsx.
function Footer() {
  const anio = new Date().getFullYear();

  return (
    <footer className="border-t border-graphite-border bg-graphite-surface">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <Logo className="h-7 w-7" />
            <span className="font-display text-base font-semibold text-ink">
              Tech<span className="text-copper">Store</span>
            </span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-ink-muted">
            Componentes, periféricos y equipos de tecnología seleccionados
            para gamers, creadores y profesionales.
          </p>
        </div>

        <div>
          <h4 className="font-mono text-xs uppercase tracking-widest text-ink-faint">
            Navegación
          </h4>
          <ul className="mt-3 space-y-2 text-sm text-ink-muted">
            <li><Link to="/" className="hover:text-copper">Inicio</Link></li>
            <li><Link to="/productos" className="hover:text-copper">Productos</Link></li>
            <li><Link to="/ofertas" className="hover:text-copper">Ofertas</Link></li>
            <li><Link to="/nosotros" className="hover:text-copper">Nosotros</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-mono text-xs uppercase tracking-widest text-ink-faint">
            Contacto
          </h4>
          <ul className="mt-3 space-y-2 text-sm text-ink-muted">
            <li>ventas@techstore.pe</li>
            <li>+51 987 654 321</li>
            <li>Lima, Perú</li>
            <li><Link to="/contacto" className="hover:text-copper">Enviar mensaje →</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-graphite-border px-4 py-4 text-center font-mono text-[11px] text-ink-faint sm:px-6">
        © {anio} TechStore — Proyecto AP3 Javascript Avanzado · UTP
      </div>
    </footer>
  );
}

export default Footer;
