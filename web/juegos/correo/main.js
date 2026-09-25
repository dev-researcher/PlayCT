import { POBLADOS, CAMINOS, crear, enviar, resuelto, TEXTO } from "./reglas.mjs";

const mesa = document.getElementById("mesa");
const coach = document.getElementById("coach");
let estado = crear();
let sel = [];
let texto = "Los tres paquetes están en A. Elija uno y un poblado unido por un camino.";
let modo = "";
let rebote = null;

document.getElementById("empezar").addEventListener("click", () => {
  document.getElementById("velo").hidden = true;
});

function pos(id) {
  return POBLADOS.find((p) => p.id === id);
}

function lineas() {
  const svg = [];
  const labels = [];
  for (const c of CAMINOS) {
    const A = pos(c.a);
    const B = pos(c.b);
    const mx = (A.x + B.x) / 2;
    const my = (A.y + B.y) / 2;
    const trazo = c.cortado ? "#a86b45" : "#8d6a43";
    const dash = c.cortado ? 'stroke-dasharray="7 6"' : "";
    const marca = c.cortado ? "cortado" : String(c.cap);
    svg.push(
      `<line x1="${A.x}" y1="${A.y}" x2="${B.x}" y2="${B.y}" stroke="${trazo}" stroke-width="2.2" ${dash}/>`
    );
    labels.push(`<span class="via-etiq${c.cortado ? " cortado" : ""}" style="left:${mx}%;top:${my}%">${marca}</span>`);
  }
  return { svg: svg.join(""), labels: labels.join("") };
}

function render() {
  coach.textContent = texto;
  coach.className = "coach" + (modo ? " " + modo : "");
  const vias = lineas();
  const pueblos = POBLADOS.map((p) => {
    const paquetes = estado.paquetes
      .filter((q) => q.en === p.id)
      .map((q) => {
        const puntos = "●".repeat(q.puntos);
        const alta = q.puntos > 1 ? " alta" : "";
        const on = sel.includes(q.id) ? " sel" : "";
        const shake = rebote === q.id ? " rebote" : "";
        return `<button type="button" class="paq${alta}${on}${shake}" data-paq="${q.id}">${q.id}<br>${puntos}</button>`;
      })
      .join("");
    return `<div class="poblado" style="left:${p.x}%;top:${p.y}%">
      <button type="button" data-pueblo="${p.id}"><strong>${p.nombre}</strong></button>
      <div class="paquetes">${paquetes}</div>
    </div>`;
  }).join("");
  const aviso = resuelto(estado) ? `<p class="listo">Los tres paquetes están en Destino.</p>` : "";
  mesa.innerHTML = `
    <div class="plano">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none">${vias.svg}</svg>
      ${vias.labels}
      ${pueblos}
      <button type="button" class="ghost" id="reiniciar" style="position:absolute;right:0.8rem;bottom:0.8rem">Dejarlo como al inicio</button>
      <div style="position:absolute;left:0.8rem;bottom:0.8rem;max-width:16rem">${aviso}</div>
    </div>`;
  mesa.querySelector("#reiniciar").addEventListener("click", () => {
    estado = crear();
    sel = [];
    rebote = null;
    texto = "Los paquetes volvieron a A.";
    modo = "";
    render();
  });
  for (const b of mesa.querySelectorAll("[data-paq]")) {
    b.addEventListener("click", (e) => {
      e.stopPropagation();
      const id = b.dataset.paq;
      const paq = estado.paquetes.find((p) => p.id === id);
      if (sel.includes(id)) sel = sel.filter((x) => x !== id);
      else {
        const otros = estado.paquetes.filter((p) => sel.includes(p.id));
        if (otros.some((p) => p.en !== paq.en)) sel = [id];
        else sel = sel.concat(id);
      }
      rebote = null;
      texto = sel.length ? "Ahora un poblado unido por un camino." : "Elija un paquete.";
      modo = "";
      render();
    });
  }
  for (const b of mesa.querySelectorAll("[data-pueblo]")) {
    b.addEventListener("click", () => {
      if (!sel.length) {
        texto = "Primero elija un paquete.";
        modo = "warn";
        render();
        return;
      }
      const r = enviar(estado, sel, b.dataset.pueblo);
      if (!r.ok) {
        rebote = sel[0];
        texto = TEXTO[r.motivo];
        modo = "warn";
        render();
        return;
      }
      estado = r.estado;
      sel = [];
      rebote = null;
      if (resuelto(estado)) {
        texto = "Los tres paquetes están en Destino.";
        modo = "ok";
      } else {
        texto = "El envío salió. Siga con los que aún no están en Destino.";
        modo = "";
      }
      render();
    });
  }
}

render();
