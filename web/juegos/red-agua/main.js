import { MODULOS, RANURAS, simular } from "./reglas.mjs";

const mesa = document.getElementById("mesa");
const coach = document.getElementById("coach");
let ranuras = Array(RANURAS).fill(null);
let sel = null;
let valvulaAbierta = false;
let prediccion = null;
let supuestos = new Set();
let texto = "Coloque los módulos en el tramo. El agua va de izquierda a derecha.";
let modo = "";
let resultado = null;

const SUPUESTOS = [
  ["perdidas", "Ignoro pérdidas en la tubería"],
  ["caudal", "El caudal de la bomba es constante"],
  ["demanda", "La demanda de la zona no cambia"],
];

document.getElementById("empezar").addEventListener("click", () => {
  document.getElementById("velo").hidden = true;
});

function nombre(id) {
  return MODULOS.find((m) => m.id === id)?.nombre || "";
}

function render() {
  coach.textContent = texto;
  coach.className = "coach" + (modo ? " " + modo : "");
  const usados = new Set(ranuras.filter(Boolean));
  const modulos = MODULOS.filter((m) => !usados.has(m.id))
    .map(
      (m) =>
        `<button type="button" class="modulo${sel === m.id ? " sel" : ""}" data-mod="${m.id}">${m.nombre}</button>`
    )
    .join("");
  const tramo = ranuras
    .map((id, i) => {
      const celda = `<button type="button" class="ranura${id ? " llena" : ""}" data-ranura="${i}">${id ? nombre(id) : ""}</button>`;
      const flecha = i < ranuras.length - 1 ? `<span class="flecha">→</span>` : "";
      return celda + flecha;
    })
    .join("");
  const sup = SUPUESTOS.map(
    ([id, label]) =>
      `<button type="button" class="supuesto${supuestos.has(id) ? " on" : ""}" data-sup="${id}">${label}</button>`
  ).join("");
  const niveles = ["bajo", "medio", "alto"]
    .map(
      (n) =>
        `<button type="button" class="nivel${prediccion === n ? " on" : ""}" data-nivel="${n}">${n}</button>`
    )
    .join("");
  const aviso = resultado?.exito ? `<p class="listo">${resultado.motivo}</p>` : "";
  const detalle = resultado && !resultado.exito ? `<p class="resultado">${resultado.motivo}</p>` : "";
  mesa.innerHTML = `
    <div>
      <p class="etiq">Módulos</p>
      <div class="modulos">${modulos}</div>
    </div>
    <div>
      <p class="etiq">Tramo</p>
      <div class="tramo">${tramo}</div>
    </div>
    <div>
      <p class="etiq">Supuestos</p>
      <div class="supuestos">${sup}</div>
      <p class="etiq" style="margin-top:0.7rem">Predicción del nivel</p>
      <div class="prediccion">${niveles}</div>
      <div class="controles" style="margin-top:0.7rem">
        <button type="button" class="ghost" id="valvula">${valvulaAbierta ? "La válvula está abierta" : "La válvula está cerrada"}</button>
        <button type="button" class="accion" id="simular">Simular</button>
        <button type="button" class="ghost" id="reiniciar">Dejarlo como al inicio</button>
      </div>
      ${detalle}
      ${aviso}
    </div>`;
  for (const b of mesa.querySelectorAll("[data-mod]")) {
    b.addEventListener("click", () => {
      sel = b.dataset.mod;
      texto = "Ahora una ranura vacía del tramo.";
      modo = "";
      resultado = null;
      render();
    });
  }
  for (const b of mesa.querySelectorAll("[data-ranura]")) {
    b.addEventListener("click", () => {
      const i = Number(b.dataset.ranura);
      resultado = null;
      if (ranuras[i]) {
        ranuras[i] = null;
        texto = "El módulo volvió a la mesa.";
        modo = "";
        render();
        return;
      }
      if (!sel) {
        texto = "Elija primero un módulo.";
        modo = "warn";
        render();
        return;
      }
      ranuras[i] = sel;
      sel = null;
      texto = "Quedó en el tramo. Puede simular cuando declare un supuesto y una predicción.";
      modo = "";
      render();
    });
  }
  for (const b of mesa.querySelectorAll("[data-sup]")) {
    b.addEventListener("click", () => {
      const id = b.dataset.sup;
      if (supuestos.has(id)) supuestos.delete(id);
      else supuestos.add(id);
      resultado = null;
      render();
    });
  }
  for (const b of mesa.querySelectorAll("[data-nivel]")) {
    b.addEventListener("click", () => {
      prediccion = b.dataset.nivel;
      resultado = null;
      texto = "Predicción: " + prediccion + ". Simule cuando el tramo esté armado.";
      modo = "";
      render();
    });
  }
  mesa.querySelector("#valvula").addEventListener("click", () => {
    valvulaAbierta = !valvulaAbierta;
    resultado = null;
    texto = valvulaAbierta ? "La válvula deja pasar." : "La válvula corta el paso.";
    modo = "";
    render();
  });
  mesa.querySelector("#simular").addEventListener("click", () => {
    if (!prediccion) {
      texto = "Falta la predicción del nivel.";
      modo = "warn";
      resultado = null;
      render();
      return;
    }
    resultado = simular(ranuras, valvulaAbierta, prediccion, [...supuestos]);
    texto = resultado.motivo;
    modo = resultado.exito ? "ok" : "warn";
    render();
  });
  mesa.querySelector("#reiniciar").addEventListener("click", () => {
    ranuras = Array(RANURAS).fill(null);
    sel = null;
    valvulaAbierta = false;
    prediccion = null;
    supuestos = new Set();
    resultado = null;
    texto = "La mesa quedó despejada.";
    modo = "";
    render();
  });
}

render();
