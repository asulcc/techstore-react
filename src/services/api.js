// Configuración base del cliente HTTP con Fetch API.
export const API_URL = "http://localhost:3000";

// Envoltorio sobre fetch: centraliza manejo de errores y respuestas 204.
export async function apiFetch(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`Error ${response.status} al consultar ${path}`);
  }

  if (response.status === 204) return null;
  return response.json();
}
