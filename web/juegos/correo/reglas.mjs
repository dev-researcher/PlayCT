/** El Correo. Grafo A–E, capacidades y prioridades de docs/05-INSTRUMENTOS.md. */

export const POBLADOS = [
  { id: "A", nombre: "A · origen", x: 14, y: 28 },
  { id: "B", nombre: "B", x: 44, y: 18 },
  { id: "C", nombre: "C", x: 30, y: 74 },
  { id: "D", nombre: "D", x: 72, y: 26 },
  { id: "E", nombre: "E · destino", x: 84, y: 74 },
];

export const CAMINOS = [
  { a: "A", b: "B", cap: 2 },
  { a: "A", b: "C", cap: 1 },
  { a: "B", b: "D", cap: 2 },
  { a: "C", b: "D", cap: 1 },
  { a: "C", b: "E", cap: 2 },
  { a: "D", b: "E", cap: 1 },
  { a: "B", b: "C", cap: 0, cortado: true },
];

export function crear() {
  return {
    paquetes: [
      { id: "P1", en: "A", puntos: 2 },
      { id: "P2", en: "A", puntos: 1 },
      { id: "P3", en: "A", puntos: 1 },
    ],
    envios: 0,
  };
}

export function caminoEntre(a, b) {
  return (
    CAMINOS.find((c) => (c.a === a && c.b === b) || (c.a === b && c.b === a)) || null
  );
}

export function clonar(estado) {
  return {
    envios: estado.envios,
    paquetes: estado.paquetes.map((p) => ({ ...p })),
  };
}

/**
 * Mueve a la vez los paquetes `ids` que comparten poblado, por el camino directo.
 * No muta `estado` si el envío no entra.
 */
export function enviar(estado, ids, destino) {
  const siguiente = clonar(estado);
  const elegidos = siguiente.paquetes.filter((p) => ids.includes(p.id));
  if (!elegidos.length) return { ok: false, motivo: "vacio", estado };
  const origen = elegidos[0].en;
  if (elegidos.some((p) => p.en !== origen)) return { ok: false, motivo: "separados", estado };
  if (origen === destino) return { ok: false, motivo: "mismo", estado };
  const via = caminoEntre(origen, destino);
  if (!via) return { ok: false, motivo: "sin-camino", estado };
  if (via.cortado) return { ok: false, motivo: "cortado", estado };
  if (elegidos.length > via.cap) return { ok: false, motivo: "capacidad", estado };
  const tieneP1 = elegidos.some((p) => p.id === "P1");
  const tieneP3 = elegidos.some((p) => p.id === "P3");
  if (tieneP1 && tieneP3) return { ok: false, motivo: "comparten", estado };
  if (tieneP1 && destino === "D") return { ok: false, motivo: "espera-d", estado };
  const p1 = siguiente.paquetes.find((p) => p.id === "P1");
  const baja = elegidos.some((p) => p.puntos === 1);
  if (destino === "E" && baja && p1.en !== "E" && !tieneP1) {
    return { ok: false, motivo: "prioridad", estado };
  }
  for (const p of elegidos) p.en = destino;
  siguiente.envios += 1;
  return { ok: true, motivo: "entra", estado: siguiente };
}

export function resuelto(estado) {
  return estado.paquetes.every((p) => p.en === "E");
}

export const TEXTO = {
  vacio: "Elija un paquete.",
  separados: "Esos paquetes no están en el mismo poblado.",
  mismo: "Ya están ahí.",
  "sin-camino": "No hay camino directo. El paquete vuelve.",
  cortado: "Ese camino está cortado. El paquete no entra.",
  capacidad: "No caben tantos paquetes en ese camino.",
  comparten: "Esos dos no viajan en el mismo envío.",
  "espera-d": "Ese paquete no espera en D. Vuelve.",
  prioridad: "Un paquete de menos puntos no llega a Destino antes.",
  entra: "El envío salió.",
};
