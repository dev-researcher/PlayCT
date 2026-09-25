import { PIEZAS, encaja, completo } from "./reglas.mjs";

const mesa = document.getElementById("mesa");
const coach = document.getElementById("coach");
let piezas = PIEZAS.map((p) => ({ ...p, rot: 0, puesta: false, rebote: false }));
let sel = null;
let texto = "Tome una pieza y acérquela al hueco de la misma forma.";
let modo = "";

document.getElementById("empezar").addEventListener("click", () => {
  document.getElementById("velo").hidden = true;
});

function forma(id, rot, silueta) {
  return `<div class="forma-caja"><div class="forma ${id}${silueta ? " silueta" : ""}" style="transform:rotate(${rot * 90}deg)"></div></div>`;
}

function render() {
  coach.textContent = texto;
  coach.className = "coach" + (modo ? " " + modo : "");
  const huecos = piezas
    .map((p) => {
      if (p.puesta) {
        return `<div class="hueco lleno">${forma(p.id, p.pasos < 0 ? p.rot : p.pasos, false)}</div>`;
      }
      const giroHueco = p.pasos < 0 ? 0 : p.pasos;
      return `<button type="button" class="hueco" data-hueco="${p.id}">${forma(p.id, giroHueco, true)}</button>`;
    })
    .join("");
  const sueltas = piezas
    .filter((p) => !p.puesta)
    .map(
      (p) => `<button type="button" class="ficha${sel === p.id ? " sel" : ""}${p.rebote ? " rebote" : ""}" data-pieza="${p.id}">
        ${forma(p.id, p.rot, false)}
        <small>${p.nombre}</small>
      </button>`
    )
    .join("");
  const aviso = completo(piezas) ? `<p class="listo">Las cuatro formas están al ras.</p>` : "";
  mesa.innerHTML = `
    <div style="display:grid;grid-template-columns:16rem 1fr;height:100%">
      <div class="bandeja">
        <p class="etiq">Reposo</p>
        <div class="piezas">${sueltas}</div>
        <button type="button" class="accion" id="girar" ${sel ? "" : "disabled"}>Girar un cuarto</button>
        <button type="button" class="ghost" id="reiniciar">Dejarlo como al inicio</button>
        ${aviso}
      </div>
      <div class="tablero">
        <p class="etiq">Huecos</p>
        <div class="huecos">${huecos}</div>
      </div>
    </div>`;
  mesa.querySelector("#girar").addEventListener("click", () => {
    const p = piezas.find((x) => x.id === sel && !x.puesta);
    if (!p) return;
    p.rot = (p.rot + 1) % 4;
    p.rebote = false;
    texto = "Un cuarto de vuelta. Mire si ahora el perfil coincide con el hueco.";
    modo = "";
    render();
  });
  mesa.querySelector("#reiniciar").addEventListener("click", () => {
    piezas = PIEZAS.map((p) => ({ ...p, rot: 0, puesta: false, rebote: false }));
    sel = null;
    texto = "El material volvió al reposo.";
    modo = "";
    render();
  });
  for (const b of mesa.querySelectorAll("[data-pieza]")) {
    b.addEventListener("click", () => {
      sel = b.dataset.pieza;
      texto = "Ahora el hueco, o un giro de un cuarto si el perfil no coincide.";
      modo = "";
      render();
    });
  }
  for (const h of mesa.querySelectorAll("[data-hueco]")) {
    h.addEventListener("click", () => colocar(h.dataset.hueco));
  }
}

function colocar(huecoId) {
  const p = piezas.find((x) => x.id === sel);
  if (!p) {
    texto = "Primero tome una pieza del reposo.";
    modo = "warn";
    render();
    return;
  }
  if (!encaja(p, huecoId)) {
    p.rebote = true;
    texto = "No queda al ras. La pieza vuelve al reposo.";
    modo = "warn";
    render();
    return;
  }
  p.puesta = true;
  p.rebote = false;
  sel = null;
  if (completo(piezas)) {
    texto = "Las cuatro formas están al ras.";
    modo = "ok";
  } else {
    texto = "Esa entra. Siga con las que quedan en el reposo.";
    modo = "";
  }
  render();
}

render();
