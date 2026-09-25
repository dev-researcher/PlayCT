/** Cubo de relaciones: giros de 90° y mini-tarea «cruz clara». */

const DIRS = ["+x", "-x", "+y", "-y", "+z", "-z"];

export const COLOR = {
  U: "#f3efe4",
  D: "#b8895a",
  F: "#7d9a84",
  B: "#3d4c5c",
  R: "#c47a62",
  L: "#6a8494",
};

export const NOMBRE_COLOR = {
  U: "lino",
  D: "roble",
  F: "salvia",
  B: "tinta",
  R: "arcilla",
  L: "pizarra",
};

function cuboResuelto() {
  const cubies = [];
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      for (let z = -1; z <= 1; z++) {
        if (x === 0 && y === 0 && z === 0) continue;
        const colors = {};
        if (x === 1) colors["+x"] = "R";
        if (x === -1) colors["-x"] = "L";
        if (y === 1) colors["+y"] = "U";
        if (y === -1) colors["-y"] = "D";
        if (z === 1) colors["+z"] = "F";
        if (z === -1) colors["-z"] = "B";
        cubies.push({ x, y, z, colors });
      }
    }
  }
  return cubies;
}

export function clonar(cubies) {
  return cubies.map((c) => ({ x: c.x, y: c.y, z: c.z, colors: { ...c.colors } }));
}

function remap(colors, nuevoDesdeViejo) {
  const next = {};
  for (const dir of DIRS) {
    const viejo = nuevoDesdeViejo[dir] || dir;
    if (colors[viejo]) next[dir] = colors[viejo];
  }
  return next;
}

function girarCapa(cubies, filtro, pos, colores) {
  for (const c of cubies) {
    if (!filtro(c)) continue;
    const p = pos(c);
    c.x = p.x;
    c.y = p.y;
    c.z = p.z;
    c.colors = remap(c.colors, colores);
  }
}

/** Sentido horario mirando la cara desde fuera. Antihorario = tres horarios. */
export function mover(cubies, nombre) {
  const anti = nombre.endsWith("'");
  const cara = nombre[0];
  const veces = anti ? 3 : 1;
  for (let i = 0; i < veces; i++) aplicarHorario(cubies, cara);
  return cubies;
}

function aplicarHorario(cubies, cara) {
  if (cara === "U") {
    girarCapa(
      cubies,
      (c) => c.y === 1,
      (c) => ({ x: c.z, y: c.y, z: -c.x }),
      { "+x": "+z", "+z": "-x", "-x": "-z", "-z": "+x" }
    );
  } else if (cara === "D") {
    girarCapa(
      cubies,
      (c) => c.y === -1,
      (c) => ({ x: -c.z, y: c.y, z: c.x }),
      { "+x": "-z", "-z": "-x", "-x": "+z", "+z": "+x" }
    );
  } else if (cara === "F") {
    girarCapa(
      cubies,
      (c) => c.z === 1,
      (c) => ({ x: c.y, y: -c.x, z: c.z }),
      { "+x": "+y", "-y": "+x", "-x": "-y", "+y": "-x" }
    );
  } else if (cara === "B") {
    girarCapa(
      cubies,
      (c) => c.z === -1,
      (c) => ({ x: -c.y, y: c.x, z: c.z }),
      { "+y": "+x", "+x": "-y", "-y": "-x", "-x": "+y" }
    );
  } else if (cara === "R") {
    girarCapa(
      cubies,
      (c) => c.x === 1,
      (c) => ({ x: c.x, y: c.z, z: -c.y }),
      { "-z": "+y", "+y": "+z", "+z": "-y", "-y": "-z" }
    );
  } else if (cara === "L") {
    girarCapa(
      cubies,
      (c) => c.x === -1,
      (c) => ({ x: c.x, y: -c.z, z: c.y }),
      { "+z": "+y", "-y": "+z", "-z": "-y", "+y": "-z" }
    );
  } else {
    throw new Error("cara desconocida: " + cara);
  }
}

export function aplicar(cubies, movimientos) {
  for (const m of movimientos) mover(cubies, m);
  return cubies;
}

function buscar(cubies, x, y, z) {
  return cubies.find((c) => c.x === x && c.y === y && c.z === z);
}

/** Cara 3×3, fila 0 arriba en la vista de esa cara. */
export function grilla(cubies, cara) {
  const g = [];
  for (let row = 0; row < 3; row++) {
    const linea = [];
    for (let col = 0; col < 3; col++) {
      linea.push(sticker(cubies, cara, row, col));
    }
    g.push(linea);
  }
  return g;
}

function sticker(cubies, cara, row, col) {
  if (cara === "U") {
    const z = row - 1;
    const x = col - 1;
    return buscar(cubies, x, 1, z).colors["+y"];
  }
  if (cara === "F") {
    const y = 1 - row;
    const x = col - 1;
    return buscar(cubies, x, y, 1).colors["+z"];
  }
  if (cara === "R") {
    const y = 1 - row;
    const z = 1 - col;
    return buscar(cubies, 1, y, z).colors["+x"];
  }
  if (cara === "D") {
    const z = 1 - row;
    const x = col - 1;
    return buscar(cubies, x, -1, z).colors["-y"];
  }
  if (cara === "L") {
    const y = 1 - row;
    const z = col - 1;
    return buscar(cubies, -1, y, z).colors["-x"];
  }
  if (cara === "B") {
    const y = 1 - row;
    const x = 1 - col;
    return buscar(cubies, x, y, -1).colors["-z"];
  }
  throw new Error(cara);
}

/** Centro y cuatro aristas de la cara superior, mismo campo. Las esquinas no importan. */
export function cruzClara(cubies) {
  const u = grilla(cubies, "U");
  const centro = u[1][1];
  return [u[0][1], u[1][0], u[1][2], u[2][1]].every((c) => c === centro);
}

export function caraSuperiorResuelta(cubies) {
  const u = grilla(cubies, "U");
  return u.flat().every((c) => c === "U");
}

export function serial(cubies) {
  return cubies
    .map((c) => {
      const cols = DIRS.map((d) => c.colors[d] || ".").join("");
      return `${c.x}${c.y}${c.z}${cols}`;
    })
    .sort()
    .join("");
}

/**
 * Parte de un cubo donde la cruz ya existiría (F D F': aristas de lino,
 * una esquina distinta) y luego se deshace con F R.
 * Deshacer R' F' devuelve la cruz sin dejar la cara superior entera.
 */
export function estadoInicial() {
  return aplicar(cuboNuevo(), ["F", "D", "R"]);
}

export function cuboNuevo() {
  return cuboResuelto();
}

export const CARAS_MESA = [
  { id: "U", nombre: "Superior" },
  { id: "F", nombre: "Frontal" },
  { id: "R", nombre: "Derecha" },
];
