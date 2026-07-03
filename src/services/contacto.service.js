import { apiFetch } from "./api";

// Lógica de envío del formulario de contacto hacia JSON Server (POST).
export function enviarContacto(datos) {
  return apiFetch("/contactos", {
    method: "POST",
    body: JSON.stringify(datos),
  });
}
