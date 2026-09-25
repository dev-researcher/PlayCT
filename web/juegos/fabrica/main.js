import { crear, ejecutar } from "./reglas.mjs";

const mesa = document.getElementById("mesa");
const coach = document.getElementById("coach");
const TARJETAS = [
  ["AVANZAR", "Avanzar"],
  ["GIRAR", "Girar"],
  ["TOMAR", "Tomar"],
  ["SOLTAR", "Soltar"],
  ["SI", "Si"],
  ["SINO", "Si no"],
  ["ESPERAR", "Esperar"],
  ["SENAL", "Señal"],
];

let nivel = crear();
let vista = crear();
let programa = [];
let texto = "La pieza está al fondo del pasillo. Componga las tarjetas y ejecute.";
let modo = "";
let eligiendoN = false;
let corriendo = false;

document.getElementById("empezar").addEventListener("click", () => {
  document.getElementById("velo").hidden = true;
});

function etiqueta(op) {
  if (op.op === "REPETIR") return `Repetir ${op.n}`;
  const t = TARJETAS.find((x) => x[0] === op.op);
  return t ? t[1] : op.op;
}

function render() {
  coach.textContent = texto;
  coach.className = "coach" + (modo ? " " + modo : "");
  const celdas = [];
  for (let i = 0; i < 5; i++) {
    const robot = vista.x === i;
    const pieza = vista.piezaX === i && !vista.carga;
    const rumbo = ["90", "180", "270", "0"][vista.dir];
    celdas.push(`<div class="celda">
      ${robot ? `<div class="robot" style="transform:rotate(${rumbo}deg)"></div>` : ""}
      ${robot && vista.carga ? `<span class="carga-marca"></span>` : ""}
      ${pieza ? `<div class="pieza-fab"></div>` : ""}
    </div>`);
  }
  const prog = programa
    .map(
      (op, i) =>
        `<button type="button" class="prog" data-quitar="${i}">${etiqueta(op)}</button>`
    )
    .join("");
  const tarjetas = TARJETAS.map(
    ([op, nombre]) => `<button type="button" class="tarjeta" data-op="${op}">${nombre}</button>`
  ).join("");
  const nidos = eligiendoN
    ? `<div class="nidos">${[2, 3, 4].map((n) => `<button type="button" class="tarjeta" data-n="${n}">${n}</button>`).join("")}</div>`
    : "";
  const aviso = vista.carga ? `<p class="listo">El robot tomó la pieza.</p>` : "";
  mesa.innerHTML = `
    <div class="via">${celdas.join("")}</div>
    <div>
      <p class="etiq">Programa</p>
      <div class="programa">${prog || "<span>Vacío</span>"}</div>
    </div>
    <div>
      <p class="etiq">Tarjetas</p>
      <div class="tarjetas">
        ${tarjetas}
        <button type="button" class="tarjeta" id="repetir">Repetir</button>
        ${nidos}
        <button type="button" class="accion" id="ejecutar">Ejecutar todos</button>
        <button type="button" class="ghost" id="vaciar">Vaciar</button>
      </div>
      ${aviso}
    </div>`;
  if (corriendo) return;
  for (const b of mesa.querySelectorAll("[data-op]")) {
    b.addEventListener("click", () => {
      programa.push({ op: b.dataset.op });
      eligiendoN = false;
      texto = "Tarjeta en el programa. Puede ejecutar o seguir componiendo.";
      modo = "";
      render();
    });
  }
  mesa.querySelector("#repetir").addEventListener("click", () => {
    eligiendoN = true;
    texto = "¿Cuántas veces? 2, 3 o 4. Luego la tarjeta que se repite.";
    modo = "";
    render();
  });
  for (const b of mesa.querySelectorAll("[data-n]")) {
    b.addEventListener("click", () => {
      programa.push({ op: "REPETIR", n: Number(b.dataset.n) });
      eligiendoN = false;
      texto = "Ahora la instrucción que se repite: va justo detrás.";
      modo = "";
      render();
    });
  }
  for (const b of mesa.querySelectorAll("[data-quitar]")) {
    b.addEventListener("click", () => {
      programa.splice(Number(b.dataset.quitar), 1);
      render();
    });
  }
  mesa.querySelector("#vaciar").addEventListener("click", () => {
    programa = [];
    nivel = crear();
    vista = crear();
    eligiendoN = false;
    texto = "El programa quedó vacío. El robot volvió al inicio del pasillo.";
    modo = "";
    render();
  });
  mesa.querySelector("#ejecutar").addEventListener("click", () => {
    const resultado = ejecutar(programa, nivel);
    if (resultado.error) {
      texto = resultado.error;
      modo = "warn";
      render();
      return;
    }
    correr(resultado);
  });
}

function correr(resultado) {
  corriendo = true;
  let i = 0;
  const tick = () => {
    vista = resultado.frames[i];
    const nota = resultado.notas[i - 1];
    if (nota === "aire") {
      texto = "La mano cierra en el aire. Ahí no hay pieza.";
      modo = "warn";
    } else if (nota === "no-avanza") {
      texto = "En esa dirección no hay pasillo. El robot no avanza.";
      modo = "warn";
    } else if (resultado.espera && i === resultado.frames.length - 1) {
      texto = "Espera una señal que no llega. El resto no corre.";
      modo = "warn";
    } else if (resultado.ok && i === resultado.frames.length - 1) {
      texto = "El robot tomó la pieza.";
      modo = "ok";
      nivel = { ...vista };
    } else {
      texto = "Ejecutando…";
      modo = "";
    }
    const ultimo = i === resultado.frames.length - 1;
    render();
    if (!ultimo) {
      i += 1;
      setTimeout(tick, 420);
    } else {
      corriendo = false;
      if (!resultado.ok) nivel = crear();
      render();
    }
  };
  tick();
}

render();
