import { PIEZAS, encaja, completo } from "./gabinete/reglas.mjs";
import { cruzClara, caraSuperiorResuelta, estadoInicial, cuboNuevo, aplicar, mover, clonar } from "./cubo/reglas.mjs";
import { crear as correo, enviar, resuelto as correoListo } from "./correo/reglas.mjs";
import { crear as patio, reubicar, sacar, resuelto as patioListo, tope } from "./patio/reglas.mjs";
import { crear as fabrica, ejecutar } from "./fabrica/reglas.mjs";
import { simular, RANURAS } from "./red-agua/reglas.mjs";

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

const g = PIEZAS.map((p) => ({ ...p, rot: 0, puesta: false }));
assert(!encaja(g[2], "cuna"), "cuña en 0 no entra");
g[2].rot = 1;
assert(encaja(g[2], "cuna"), "cuña en 1 entra");
assert(!encaja(g[2], "prisma"), "cuña no entra en el prisma");
assert(encaja(g[0], "cilindro"), "cilindro entra en cualquier giro");
g[0].rot = 3;
assert(encaja(g[0], "cilindro"), "cilindro sigue entrando");
assert(!encaja(g[1], "prisma"), "prisma vertical no entra");
g[1].rot = 1;
assert(encaja(g[1], "prisma"), "prisma girado entra");
assert(encaja(g[3], "hexagono"), "hexágono en 0 entra");
g[3].rot = 1;
assert(!encaja(g[3], "hexagono"), "hexágono a 90 no entra");
for (const p of g) {
  if (p.pasos >= 0) p.rot = p.pasos;
  p.puesta = true;
}
assert(completo(g), "gabinete completo");

const inicio = estadoInicial();
assert(!cruzClara(inicio), "la cruz no está al empezar");
const medio = clonar(inicio);
mover(medio, "R'");
assert(!cruzClara(medio), "con un solo giro la cruz sigue incompleta");
mover(medio, "F'");
assert(cruzClara(medio), "R' F' deja la cruz");
assert(!caraSuperiorResuelta(medio), "la cara superior no queda entera");
const ida = cuboNuevo();
aplicar(ida, ["U", "U", "U", "U"]);
assert(cruzClara(ida) && caraSuperiorResuelta(ida), "cuatro giros vuelven al cubo");

let c = correo();
let mal = enviar(c, ["P1", "P3"], "B");
assert(!mal.ok && mal.motivo === "comparten", "P1 y P3 no comparten envío");
mal = enviar(c, ["P1", "P2"], "C");
assert(!mal.ok && mal.motivo === "capacidad", "A–C solo admite un paquete");
assert(c.paquetes.every((p) => p.en === "A"), "un envío inválido no mueve");
mal = enviar(c, ["P1"], "D");
assert(!mal.ok, "desde A no hay camino directo a D");
const pasos = [
  ["P1", "C"],
  ["P1", "E"],
  ["P2", "B"],
  ["P2", "D"],
  ["P3", "C"],
  ["P3", "E"],
  ["P2", "E"],
];
for (const [id, dest] of pasos) {
  const r = enviar(c, [id], dest);
  assert(r.ok, "envío " + id + " → " + dest);
  c = r.estado;
}
assert(correoListo(c), "los tres paquetes llegan a E");
assert(c.envios === 7, "la referencia usa 7 envíos");

let p = patio();
assert(tope(p.pilas[0]) === 2, "el 1 está enterrado");
const enterrado = sacar(p, 0);
assert(!enterrado.ok, "no sale la caja de arriba si no es la siguiente");
let r = reubicar(p, 0, 1);
assert(r.ok, "reubica el 2");
p = r.estado;
r = sacar(p, 0);
assert(r.ok && r.estado.pedido[0] === 1, "sale el 1");
p = r.estado;
r = sacar(p, 1);
assert(r.ok && r.estado.pedido[1] === 2, "sale el 2");
p = r.estado;
r = sacar(p, 1);
assert(r.ok, "sale el 3");
p = r.estado;
r = sacar(p, 1);
assert(r.ok, "sale el 4");
p = r.estado;
assert(tope(p.pilas[2]) === 6, "el 5 sigue tapado");
r = reubicar(p, 2, 0);
assert(r.ok, "aparta el 6");
p = r.estado;
r = sacar(p, 2);
assert(r.ok, "sale el 5");
p = r.estado;
r = sacar(p, 0);
assert(r.ok && patioListo(r.estado), "sale el 6 y el pedido está completo");

const fab = ejecutar(
  [
    { op: "REPETIR", n: 4 },
    { op: "AVANZAR" },
    { op: "TOMAR" },
  ],
  fabrica()
);
assert(fab.ok, "repetir 4 avanzar y tomar");
assert(fab.frames.at(-1).x === 4 && fab.frames.at(-1).carga, "el robot llega con la pieza");
const aire = ejecutar([{ op: "TOMAR" }], fabrica());
assert(!aire.ok && aire.notas.includes("aire"), "tomar en el aire no agarra");
const corto = ejecutar(
  [
    { op: "AVANZAR" },
    { op: "TOMAR" },
  ],
  fabrica()
);
assert(!corto.ok, "un solo avance no alcanza la pieza");
const espera = ejecutar([{ op: "ESPERAR" }, { op: "AVANZAR" }], fabrica());
assert(espera.espera && !espera.ok, "esperar sin señal detiene");

const vacio = Array(RANURAS).fill(null);
assert(!simular(vacio, true, "medio", ["caudal"]).exito, "sin módulos no hay agua");
const cerrado = ["FUENTE", "BOMBA", "TUBERIA", "TANQUE", "VALVULA", "ZONA"];
const simCorta = simular(cerrado, false, "medio", ["caudal"]);
assert(!simCorta.exito && simCorta.nivel === "alto" && !simCorta.zona, "válvula cerrada llena el tanque");
const sinSup = simular(cerrado, true, "medio", []);
assert(!sinSup.exito && sinSup.zona, "falta declarar un supuesto");
const bien = simular(cerrado, true, "medio", ["perdidas"]);
assert(bien.exito && bien.coincide, "demanda estable con la predicción media");
const otro = ["FUENTE", "TUBERIA", "TANQUE", "BOMBA", "VALVULA", "ZONA"];
assert(simular(otro, true, "medio", ["demanda"]).exito, "otro orden también lleva agua");
const conSensor = ["FUENTE", "SENSOR", "BOMBA", "TUBERIA", "TANQUE", "VALVULA"];
assert(!simular(conSensor, true, "medio", ["caudal"]).exito, "sin zona no cierra");
const zonaAlFinal = ["FUENTE", "BOMBA", "TUBERIA", "TANQUE", "ZONA", "VALVULA"];
assert(!simular(zonaAlFinal, true, "medio", ["caudal"]).exito, "válvula después de la zona no cuenta en el tramo");

console.log("verificación ok");
