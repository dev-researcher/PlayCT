import { COLOR, CARAS_MESA, mover, grilla, cruzClara, estadoInicial } from "./reglas.mjs";

const mesa = document.getElementById("mesa");
const coach = document.getElementById("coach");
let cubo = estadoInicial();
let texto = "La cruz todavía no está. Gire una cara un cuarto de vuelta.";
let modo = "";
let gestoCorto = false;

document.getElementById("empezar").addEventListener("click", () => {
  document.getElementById("velo").hidden = true;
});

function casillas(cara) {
  return grilla(cubo, cara)
    .flat()
    .map((c) => `<div class="casilla" style="background:${COLOR[c]}"></div>`)
    .join("");
}

function render() {
  const hecha = cruzClara(cubo);
  coach.textContent = texto;
  coach.className = "coach" + (modo ? " " + modo : "");
  const caras = CARAS_MESA.map((c) => {
    const grande = c.id === "U";
    return `<div class="cara">
      <div class="grilla ${grande ? "grande" : "chica"}${grande && gestoCorto ? " gesto-corto" : ""}" data-cara="${c.id}">${casillas(c.id)}</div>
      <p>${c.nombre}</p>
    </div>`;
  }).join("");
  const aviso = hecha ? `<p class="listo">La cruz clara está en la cara superior.</p>` : "";
  mesa.innerHTML = `
    <div style="display:grid;grid-template-columns:1fr 17rem;height:100%;align-items:center">
      <div class="caras">${caras}</div>
      <div class="giros">
        <button type="button" data-mov="U">Superior horario</button>
        <button type="button" data-mov="U'">Superior antihorario</button>
        <button type="button" data-mov="F">Frontal horario</button>
        <button type="button" data-mov="F'">Frontal antihorario</button>
        <button type="button" data-mov="R">Derecha horario</button>
        <button type="button" data-mov="R'">Derecha antihorario</button>
        <button type="button" class="ghost" id="reiniciar">Dejarlo como al inicio</button>
        ${aviso}
      </div>
    </div>`;
  for (const b of mesa.querySelectorAll("[data-mov]")) {
    b.addEventListener("click", () => {
      mover(cubo, b.dataset.mov);
      gestoCorto = false;
      if (cruzClara(cubo)) {
        texto = "La cruz clara está en la cara superior. Las esquinas pueden quedar distintas.";
        modo = "ok";
      } else {
        texto = "Ese cuarto de vuelta quedó. La cruz todavía no.";
        modo = "";
      }
      render();
    });
  }
  mesa.querySelector("#reiniciar").addEventListener("click", () => {
    cubo = estadoInicial();
    gestoCorto = false;
    texto = "El cubo volvió a la mini-tarea.";
    modo = "";
    render();
  });
  const superior = mesa.querySelector('[data-cara="U"]');
  let origen = null;
  superior.addEventListener("pointerdown", (e) => {
    origen = { x: e.clientX, y: e.clientY };
    superior.setPointerCapture(e.pointerId);
  });
  superior.addEventListener("pointerup", (e) => {
    if (!origen) return;
    const dx = e.clientX - origen.x;
    const dy = e.clientY - origen.y;
    origen = null;
    if (Math.hypot(dx, dy) < 36) {
      gestoCorto = true;
      texto = "Ese gesto no cierra en un cuarto de vuelta. La cara vuelve.";
      modo = "warn";
      render();
      return;
    }
    const horizontal = Math.abs(dx) >= Math.abs(dy);
    const mov = horizontal ? (dx > 0 ? "U" : "U'") : dy > 0 ? "F" : "F'";
    mover(cubo, mov);
    gestoCorto = false;
    texto = cruzClara(cubo)
      ? "La cruz clara está en la cara superior. Las esquinas pueden quedar distintas."
      : "Ese cuarto de vuelta quedó. La cruz todavía no.";
    modo = cruzClara(cubo) ? "ok" : "";
    render();
  });
}

render();
