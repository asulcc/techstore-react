import { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../assets/logo.jsx";

const links = [
  { to: "/", label: "Inicio" },
  { to: "/nosotros", label: "Nosotros" },
  { to: "/productos", label: "Productos" },
  { to: "/ofertas", label: "Ofertas" },
  { to: "/contacto", label: "Contacto" },
];

function Navbar() {
  const [abierto, setAbierto] = useState(false);

  const linkClase = ({ isActive }) =>
    `font-mono text-xs uppercase tracking-wider transition-colors ${
      isActive ? "text-copper" : "text-ink-muted hover:text-ink"
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-graphite-border bg-graphite/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <NavLink to="/" className="flex items-center gap-2" onClick={() => setAbierto(false)}>
          <Logo className="h-8 w-8" />
          <span className="font-display text-lg font-semibold tracking-tight text-ink">
            Tech<span className="text-copper">Store</span>
          </span>
        </NavLink>

        <ul className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink to={link.to} className={linkClase} end={link.to === "/"}>
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <button
          type="button"
          aria-label="Abrir menú de navegación"
          aria-expanded={abierto}
          onClick={() => setAbierto((prev) => !prev)}
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 rounded border border-graphite-border md:hidden"
        >
          <span
            className={`h-[2px] w-5 bg-ink transition-transform ${
              abierto ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`h-[2px] w-5 bg-ink transition-opacity ${
              abierto ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`h-[2px] w-5 bg-ink transition-transform ${
              abierto ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {abierto && (
        <ul className="flex flex-col gap-1 border-t border-graphite-border bg-graphite px-4 py-3 md:hidden">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === "/"}
                onClick={() => setAbierto(false)}
                className={({ isActive }) =>
                  `block rounded px-3 py-2 font-mono text-xs uppercase tracking-wider ${
                    isActive
                      ? "bg-graphite-surface2 text-copper"
                      : "text-ink-muted hover:bg-graphite-surface2 hover:text-ink"
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}

export default Navbar;
