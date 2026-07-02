import { apiFetch } from "./api";

// Lógica de consumo del recurso "productos" en JSON Server.
// Separado de los componentes según lo exigido por el proyecto (carpeta Services).
export function getProductos() {
  return apiFetch("/productos");
}

export function getProductoPorId(id) {
  return apiFetch(`/productos/${id}`);
}

export function getProductosEnOferta() {
  return apiFetch("/productos?oferta=true");
}
