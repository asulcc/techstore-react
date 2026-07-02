// Configuración base del cliente HTTP con Fetch API.
// Toda la app apunta a JSON Server corriendo en local (npm run server).
export const API_URL = "http://localhost:3000";

// Envoltorio genérico sobre fetch: centraliza el manejo de errores
// para que los servicios de cada recurso queden más simples.
export async function apiFetch(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`Error ${response.status} al consultar ${path}`);
  }

  // Las respuestas 204 (sin contenido) no traen JSON que parsear.
  if (response.status === 204) return null;
  return response.json();
}
