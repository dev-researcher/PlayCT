import { crear, reubicar, sacar, resuelto } from "./reglas.mjs";

const mesa = document.getElementById("mesa");
const coach = document.getElementById("coach");
let estado = crear();
let sel = null;
let texto = "La siguiente del pedido es la 1. Solo puede tomar la caja de arriba de cada pila.";
let modo = "";
let rebote = null;

document.getElementById("empezar").addEventListener("click", () => {
  document.getElementById("velo").hidden = true;
});

function render() {
  coach.textContent = texto;
  coach.className = "coach" + (modo ? " " + modo : "");
  const pilas = estado.pilas
    .map((pila, i) => {
      const cajas = pila
        .map((n, idx) => {
          const esTope = idx === pila.length - 1;
          const on = sel && sel.pila === i && sel.n === n ? " sel" : "";
          const shake = rebote === n ? " rebote" : "";
          return `<button type="button" class="caja${esTope ? " tope" : ""}${on}${shake}" data-pila="${i}" data-n="${n}" data-tope="${esTope ? "1" : "0"}">${n}</button>`;
        })
        .reverse()
        .join("");
      return `<div class="pila">
        ${cajas}
        <button type="button" class="base" data-destino="${i}">Pila ${i + 1}</button>
      </div>`;
    })
    .join("");
  const salidas = estado.pedido.map((n) => `<div class="caja">${n}</div>`).join("");
  const aviso = resuelto(estado) ? `<p class="listo">El pedido salió en orden.</p>` : "";
  mesa.innerHTML = `
    ${pilas}
    <div class="pedido">
      <p class="etiq">Pedido · siguiente ${estado.siguiente > 6 ? "—" : estado.siguiente}</p>
      <button type="button" class="base" id="pedido">Soltar aquí si es la siguiente</button>
      <div class="salida">${salidas}</div>
      ${aviso}
      <button type="button" class="ghost" id="reiniciar">Dejarlo como al inicio</button>
    </div>`;
  for (const b of mesa.querySelectorAll(".caja[data-n]")) {
    b.addEventListener("click", () => {
      const n = Number(b.dataset.n);
      const pila = Number(b.dataset.pila);
      if (b.dataset.tope !== "1") {
        rebote = n;
        sel = null;
        texto = "Esa caja está debajo. Solo sale la de arriba.";
        modo = "warn";
        render();
        return;
      }
      sel = { pila, n };
      rebote = null;
      texto =
        n === estado.siguiente
          ? "Es la siguiente. Puede soltarla en el pedido, o reubicarla."
          : "No es la siguiente. Reubíquela en otra pila.";
      modo = "";
      render();
    });
  }
  for (const b of mesa.querySelectorAll("[data-destino]")) {
    b.addEventListener("click", () => {
      if (!sel) {
        texto = "Primero tome la caja de arriba de una pila.";
        modo = "warn";
        render();
        return;
      }
      const r = reubicar(estado, sel.pila, Number(b.dataset.destino));
      if (!r.ok) {
        texto = "Ahí no cambia de pila.";
        modo = "warn";
        rebote = sel.n;
        render();
        return;
      }
      estado = r.estado;
      sel = null;
      texto = "Quedó en la otra pila. La siguiente del pedido sigue siendo la " + estado.siguiente + ".";
      modo = "";
      render();
    });
  }
  mesa.querySelector("#pedido").addEventListener("click", () => {
    if (!sel) {
      texto = "Tome primero la caja de arriba.";
      modo = "warn";
      render();
      return;
    }
    const r = sacar(estado, sel.pila);
    if (!r.ok) {
      rebote = sel.n;
      texto = "Esa no es la siguiente del pedido. Vuelve a su pila.";
      modo = "warn";
      render();
      return;
    }
    estado = r.estado;
    sel = null;
    rebote = null;
    if (resuelto(estado)) {
      texto = "El pedido salió en orden.";
      modo = "ok";
    } else {
      texto = "Salió. La siguiente es la " + estado.siguiente + ".";
      modo = "";
    }
    render();
  });
  mesa.querySelector("#reiniciar").addEventListener("click", () => {
    estado = crear();
    sel = null;
    rebote = null;
    texto = "Las pilas volvieron al inicio. La siguiente es la 1.";
    modo = "";
    render();
  });
}

render();
