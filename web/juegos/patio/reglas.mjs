/** Patio de carga. Solo el tope de cada pila se mueve. Presentación 1: 3 pilas, 6 cajas. */

export function crear() {
  return {
    pilas: [
      [1, 2],
      [4, 3],
      [5, 6],
    ],
    siguiente: 1,
    pedido: [],
    bloqueos: 0,
  };
}

export function clonar(estado) {
  return {
    pilas: estado.pilas.map((p) => p.slice()),
    siguiente: estado.siguiente,
    pedido: estado.pedido.slice(),
    bloqueos: estado.bloqueos,
  };
}

export function tope(pila) {
  return pila.length ? pila[pila.length - 1] : null;
}

export function reubicar(estado, desde, hacia) {
  if (desde === hacia) return { ok: false, estado, motivo: "misma" };
  if (desde < 0 || hacia < 0 || desde > 2 || hacia > 2) return { ok: false, estado, motivo: "pila" };
  const siguiente = clonar(estado);
  const origen = siguiente.pilas[desde];
  if (!origen.length) return { ok: false, estado, motivo: "vacia" };
  const caja = origen.pop();
  const destino = siguiente.pilas[hacia];
  if (destino.some((abajo) => abajo < caja && abajo >= siguiente.siguiente)) {
    siguiente.bloqueos += 1;
  }
  destino.push(caja);
  return { ok: true, estado: siguiente, motivo: "reubica" };
}

export function sacar(estado, desde) {
  if (desde < 0 || desde > 2) return { ok: false, estado, motivo: "pila" };
  const origen = estado.pilas[desde];
  if (!origen.length) return { ok: false, estado, motivo: "vacia" };
  if (tope(origen) !== estado.siguiente) return { ok: false, estado, motivo: "no-toca" };
  const siguiente = clonar(estado);
  const caja = siguiente.pilas[desde].pop();
  siguiente.pedido.push(caja);
  siguiente.siguiente += 1;
  return { ok: true, estado: siguiente, motivo: "sale" };
}

export function resuelto(estado) {
  return estado.pedido.length === 6 && estado.siguiente === 7;
}
