# AGENTS.md

## Commands

- `npm run dev` — Vite dev server (port 5173)
- `npm run build` — production build
- `npm run lint` — ESLint (flat config, React hooks + React Refresh plugins)
- `npm run preview` — preview production build

**Missing**: `npm run server` is referenced in `src/services/api.js:2` and error messages (`src/pages/Home.jsx:137`) but has no script in `package.json`. JSON Server must be started manually: `npx json-server --watch db.json --port 3000`.

No test framework is configured. No test files exist.

## Architecture

Single-page React app (JSX, no TypeScript) with Vite 8 and React Router DOM v7. Academic project (AP3 Javascript Avanzado, UTP).

```
src/
  main.jsx          — entry, mounts <App>
  App.jsx           — layout wrapper: Navbar + Routes + Footer
  components/       — reusable UI (Navbar, Footer, ProductCard, Badge, Button, Loader, EmptyState, TraceDivider)
  pages/            — route views (Home, Nosotros, NotFound)
  services/         — HTTP layer: api.js (fetch wrapper), productos.service.js, contacto.service.js
  assets/           — logo.jsx (SVG component), images
```

**Backend**: JSON Server at `http://localhost:3000`. All API calls go through `apiFetch()` in `src/services/api.js`.

## Routes

`/`, `/productos`, `/ofertas`, `/contacto` all render `<Home />` — placeholder routes without dedicated pages. Only `/nosotros` and `*` (NotFound) have real distinct views.

## Conventions

- **Language**: All code comments, UI text, and service functions are in Spanish. Maintain this when adding code.
- **Module type**: ESM (`"type": "module"` in package.json). Use `import`/`export`, not `require`.
- **Component pattern**: Functional components with hooks. No Redux, no context providers — just `useState`/`useEffect` with local state.
- **API pattern**: Services in `src/services/` wrap `apiFetch()`. One file per resource (`productos.service.js`, `contacto.service.js`).
- **Styling**: Components use Tailwind-style utility classes throughout, but **Tailwind CSS is not installed** (`tailwindcss` is not in `package.json`, no `tailwind.config.js`). The app also defines custom design tokens as CSS variables in `src/index.css` (`--accent`, `--border`, etc.) and uses custom class names (`text-copper`, `text-mint`, `bg-graphite-surface`, `font-display`, `font-mono`, etc.) that require a Tailwind-like setup to resolve. **The app is effectively unstyled without installing Tailwind.**
- **CSS architecture**: Two CSS files coexist — `index.css` (CSS custom properties, dark mode via `prefers-color-scheme`) and `App.css` (legacy Vite template styles for `.counter`, `.hero`, `#center`, etc. — not used by current components).

## Gotchas

- **Styling is broken**: All components use Tailwind utility classes (`flex`, `grid`, `px-4`, `gap-5`, `sm:px-6`, etc.) and custom tokens (`text-copper`, `bg-graphite-surface`, `border-graphite-border`, etc.), but Tailwind is not installed. The app needs `npm install -D tailwindcss @tailwindcss/vite` and an `@import "tailwindcss"` directive to function correctly.
- `connector-frame` and `trace-divider` are CSS class names used in JSX (`Home.jsx`, `ProductCard.jsx`, `TraceDivider.jsx`) but have **no corresponding CSS rules** in either stylesheet.
- `db.json` is not present in the repo. It must be created before JSON Server can run. The app expects at least `productos` and `contactos` collections.
- The `Logo` component (`src/assets/logo.jsx`) uses `className="text-copper"` and `className="text-mint"` — custom design tokens, not standard Tailwind colors.
- Prices use Peruvian Soles (`S/`) format.
