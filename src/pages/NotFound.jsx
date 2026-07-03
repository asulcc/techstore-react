import { Link } from "react-router-dom";
import Button from "../components/Button";

function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 text-center sm:px-6">
      <span className="font-mono text-6xl font-semibold text-copper">404</span>
      <h1 className="mt-4 font-display text-2xl font-semibold text-ink">Esta ruta no está conectada</h1>
      <p className="mt-2 text-ink-muted">La página que buscas no existe o fue movida. Revisa la dirección o vuelve al catálogo.</p>
      <Link to="/" className="mt-6"><Button variant="primary">Volver al inicio</Button>      </Link>
    </div>
  );
}

export default NotFound;
