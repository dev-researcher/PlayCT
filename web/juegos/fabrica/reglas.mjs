/** Fábrica en paralelo. Presentación 1: un robot y REPETIR. Prototipo de la línea B. */

export function crear() {
  return { x: 0, dir: 0, carga: false, piezaX: 4 };
}

export function clonar(e) {
  return { ...e };
}

const VECTORES = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];

function aplicar(estado, op) {
  const e = clonar(estado);
  if (op.op === "GIRAR") {
    e.dir = (e.dir + 1) % 4;
    return { estado: e, ok: true, nota: "gira" };
  }
  if (op.op === "AVANZAR") {
    const [dx, dy] = VECTORES[e.dir];
    const nx = e.x + dx;
    const ny = dy;
    if (ny !== 0 || nx < 0 || nx > 4) return { estado: e, ok: false, nota: "no-avanza" };
    e.x = nx;
    return { estado: e, ok: true, nota: "avanza" };
  }
  if (op.op === "TOMAR") {
    if (e.x === e.piezaX && !e.carga) {
      e.carga = true;
      return { estado: e, ok: true, nota: "toma" };
    }
    return { estado: e, ok: false, nota: "aire" };
  }
  if (op.op === "SOLTAR") {
    if (!e.carga) return { estado: e, ok: false, nota: "vacias" };
    e.carga = false;
    e.piezaX = e.x;
    return { estado: e, ok: true, nota: "suelta" };
  }
  if (op.op === "SENAL") return { estado: e, ok: true, nota: "senal" };
  if (op.op === "ESPERAR") return { estado: e, ok: false, nota: "espera" };
  return { estado: e, ok: false, nota: "otro" };
}

export function ejecutar(programa, nivel) {
  let e = clonar(nivel);
  const frames = [clonar(e)];
  const notas = [];
  let i = 0;
  while (i < programa.length) {
    const c = programa[i];
    if (c.op === "REPETIR") {
      const sig = programa[i + 1];
      if (!sig || sig.op === "REPETIR" || sig.op === "SI" || sig.op === "SINO") {
        return { ok: false, frames, notas, error: "REPETIR queda sin una instrucción detrás." };
      }
      if (![2, 3, 4].includes(c.n)) {
        return { ok: false, frames, notas, error: "REPETIR pide 2, 3 o 4." };
      }
      for (let k = 0; k < c.n; k++) {
        const r = aplicar(e, sig);
        e = r.estado;
        notas.push(r.nota);
        frames.push(clonar(e));
      }
      i += 2;
      continue;
    }
    if (c.op === "SI" || c.op === "SINO") {
      const sig = programa[i + 1];
      if (!sig || sig.op === "REPETIR" || sig.op === "SI" || sig.op === "SINO") {
        return { ok: false, frames, notas, error: "SI queda sin una instrucción detrás." };
      }
      const hayPieza = e.x === e.piezaX && !e.carga;
      const corre = c.op === "SI" ? hayPieza : !hayPieza;
      if (corre) {
        const r = aplicar(e, sig);
        e = r.estado;
        notas.push(r.nota);
        frames.push(clonar(e));
      } else {
        notas.push("no-se-cumple");
        frames.push(clonar(e));
      }
      i += 2;
      continue;
    }
    if (c.op === "ESPERAR") {
      const hay = programa.slice(i + 1).some((x) => x.op === "SENAL");
      notas.push("espera");
      frames.push(clonar(e));
      if (!hay) {
        return { ok: false, frames, notas, error: null, espera: true };
      }
      i += 1;
      continue;
    }
    const r = aplicar(e, c);
    e = r.estado;
    notas.push(r.nota);
    frames.push(clonar(e));
    i += 1;
  }
  return { ok: e.carga === true, frames, notas, error: null, espera: false };
}
