/** Gabinete de formas. Presentación 1: cuatro sólidos. pasos < 0 acepta cualquier giro. */

export const PIEZAS = [
  { id: "cilindro", nombre: "Cilindro", pasos: -1 },
  { id: "prisma", nombre: "Prisma", pasos: 1 },
  { id: "cuna", nombre: "Cuña", pasos: 1 },
  { id: "hexagono", nombre: "Hexágono", pasos: 0 },
];

export function encaja(pieza, huecoId) {
  if (pieza.puesta) return false;
  if (pieza.id !== huecoId) return false;
  if (pieza.pasos < 0) return true;
  return pieza.rot % 4 === pieza.pasos;
}

export function completo(piezas) {
  return piezas.length > 0 && piezas.every((p) => p.puesta);
}
