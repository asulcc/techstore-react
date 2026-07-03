import { apiFetch } from "./api";

// Consumo del recurso "productos" en JSON Server.
export function getProductos() {
  return apiFetch("/productos");
}

export function getProductoPorId(id) {
  return apiFetch(`/productos/${id}`);
}

export function getProductosEnOferta() {
  return apiFetch("/productos?oferta=true");
}
