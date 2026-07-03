import { useState } from "react";
import Button from "../components/Button";
import { enviarContacto } from "../services/contacto.service";

const estadoInicial = { nombre: "", email: "", asunto: "", mensaje: "" };

function Contacto() {
  const [form, setForm] = useState(estadoInicial);
  const [errores, setErrores] = useState({});
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [errorEnvio, setErrorEnvio] = useState(false);

  function manejarCambio(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function validar() {
    const nuevosErrores = {};
    if (!form.nombre.trim()) nuevosErrores.nombre = "Ingresa tu nombre.";
    if (!form.email.trim()) {
      nuevosErrores.email = "Ingresa tu correo.";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      nuevosErrores.email = "Correo inválido.";
    }
    if (!form.mensaje.trim() || form.mensaje.trim().length < 10) {
      nuevosErrores.mensaje = "Cuéntanos un poco más (mínimo 10 caracteres).";
    }
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  }

  async function manejarEnvio(e) {
    e.preventDefault();
    setEnviado(false);
    setErrorEnvio(false);
    if (!validar()) return;

    setEnviando(true);
    try {
      await enviarContacto({ ...form, fecha: new Date().toISOString() });
      setEnviado(true);
      setForm(estadoInicial);
    } catch {
      setErrorEnvio(true);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-14 sm:px-6">
      <span className="font-mono text-xs uppercase tracking-[0.2em] text-copper">Hablemos</span>
      <h1 className="mt-2 font-display text-3xl font-semibold text-ink">Contacto</h1>
      <p className="mt-2 text-ink-muted">Consultas de stock, garantías o soporte técnico. Respondemos dentro de 24 horas hábiles.</p>

      <form onSubmit={manejarEnvio} noValidate className="mt-8 space-y-5 rounded-lg border border-graphite-border bg-graphite-surface p-6">
        <div>
          <label htmlFor="nombre" className="block font-mono text-xs uppercase tracking-wide text-ink-muted">Nombre</label>
          <input id="nombre" name="nombre" value={form.nombre} onChange={manejarCambio} className="mt-1.5 w-full rounded-md border border-graphite-border bg-graphite px-4 py-2.5 text-sm text-ink focus:border-copper" placeholder="Tu nombre completo" />
          {errores.nombre && <p className="mt-1 text-xs text-signal-light">{errores.nombre}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block font-mono text-xs uppercase tracking-wide text-ink-muted">Correo</label>
          <input id="email" name="email" type="email" value={form.email} onChange={manejarCambio} className="mt-1.5 w-full rounded-md border border-graphite-border bg-graphite px-4 py-2.5 text-sm text-ink focus:border-copper" placeholder="tucorreo@ejemplo.com" />
          {errores.email && <p className="mt-1 text-xs text-signal-light">{errores.email}</p>}
        </div>

        <div>
          <label htmlFor="asunto" className="block font-mono text-xs uppercase tracking-wide text-ink-muted">Asunto (opcional)</label>
          <input id="asunto" name="asunto" value={form.asunto} onChange={manejarCambio} className="mt-1.5 w-full rounded-md border border-graphite-border bg-graphite px-4 py-2.5 text-sm text-ink focus:border-copper" placeholder="Sobre qué producto nos escribes" />
        </div>

        <div>
          <label htmlFor="mensaje" className="block font-mono text-xs uppercase tracking-wide text-ink-muted">Mensaje</label>
          <textarea id="mensaje" name="mensaje" rows={4} value={form.mensaje} onChange={manejarCambio} className="mt-1.5 w-full resize-none rounded-md border border-graphite-border bg-graphite px-4 py-2.5 text-sm text-ink focus:border-copper" placeholder="Cuéntanos en qué te ayudamos" />
          {errores.mensaje && <p className="mt-1 text-xs text-signal-light">{errores.mensaje}</p>}
        </div>

        <Button type="submit" variant="primary" disabled={enviando} className="w-full">
          {enviando ? "Enviando..." : "Enviar mensaje"}
        </Button>

        {enviado && <p className="text-center text-sm text-mint">Mensaje enviado. Te responderemos pronto.</p>}
        {errorEnvio && <p className="text-center text-sm text-signal-light">No se pudo enviar. Verifica que JSON Server esté activo.</p>}
      </form>
    </div>
  );
}

export default Contacto;
