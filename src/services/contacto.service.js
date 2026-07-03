import { apiFetch } from "./api";

// Envío del formulario de contacto hacia JSON Server (POST).
export function enviarContacto(datos) {
  return apiFetch("/contactos", {
    method: "POST",
    body: JSON.stringify(datos),
  });
}
