import * as THREE from "three";

const PEG_X = [-0.32, 0, 0.32];
const PEG_NAMES = ["Origen", "Apoyo", "Destino"];
const TABLE_Y = 0.74;
const DISK_H = 0.03;

const canvas = document.getElementById("scene");
const veil = document.getElementById("veil");
const topbar = document.getElementById("topbar");
const howto = document.getElementById("howto");
const coach = document.getElementById("coach");
const progress = document.getElementById("progress");
const pegLegend = document.getElementById("peg-legend");

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.2;
renderer.outputColorSpace = THREE.SRGBColorSpace;

const scene = new THREE.Scene();
scene.background = new THREE.Color("#e8eef3");
scene.fog = new THREE.Fog("#e8eef3", 7, 16);

const camera = new THREE.PerspectiveCamera(34, 1, 0.05, 40);
camera.position.set(0, 1.62, 1.42);
camera.lookAt(0, TABLE_Y + 0.06, 0);

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
const holdPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -TABLE_Y - 0.14);
const hit = new THREE.Vector3();

let disks = 3;
/** @type {number[][]} */
let pegs = [[], [], []];
/** @type {THREE.Mesh[]} */
let diskMeshes = [];
/** @type {THREE.Mesh[]} */
const pegMeshes = [];
let holding = null;
let hoverDisk = null;
let rejects = 0;
let coachMode = "hint";

function woodTexture(base, grain) {
  const c = document.createElement("canvas");
  c.width = 256;
  c.height = 256;
  const g = c.getContext("2d");
  g.fillStyle = base;
  g.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 36; i++) {
    g.strokeStyle = grain;
    g.globalAlpha = 0.08;
    g.beginPath();
    const x = Math.random() * 256;
    g.moveTo(x, 0);
    g.bezierCurveTo(x + 8, 80, x - 10, 160, x + 4, 256);
    g.lineWidth = 1 + Math.random() * 2;
    g.stroke();
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(2, 2);
  return t;
}

function labelTexture(text, emphasis) {
  const c = document.createElement("canvas");
  c.width = 512;
  c.height = 128;
  const g = c.getContext("2d");
  g.clearRect(0, 0, 512, 128);
  roundRect(g, 24, 24, 464, 80, 28);
  g.fillStyle = emphasis ? "#e7f6ee" : "#ffffff";
  g.fill();
  g.strokeStyle = emphasis ? "#8ec9a8" : "#d7e0ea";
  g.lineWidth = 4;
  g.stroke();
  g.fillStyle = emphasis ? "#2f7a58" : "#3a4a5a";
  g.font = "600 44px 'Source Sans 3', sans-serif";
  g.textAlign = "center";
  g.textBaseline = "middle";
  g.fillText(text, 256, 66);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function roundRect(g, x, y, w, h, r) {
  g.beginPath();
  g.moveTo(x + r, y);
  g.arcTo(x + w, y, x + w, y + h, r);
  g.arcTo(x + w, y + h, x, y + h, r);
  g.arcTo(x, y + h, x, y, r);
  g.arcTo(x, y, x + w, y, r);
  g.closePath();
}

function buildRoom() {
  const plaster = new THREE.MeshLambertMaterial({ color: "#f7f9fb" });
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10),
    new THREE.MeshLambertMaterial({ map: woodTexture("#ead9c0", "#c4a57a") })
  );
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  scene.add(floor);

  const back = new THREE.Mesh(new THREE.PlaneGeometry(10, 5), plaster);
  back.position.set(0, 2.4, -3.4);
  scene.add(back);

  const glass = new THREE.Mesh(
    new THREE.PlaneGeometry(2.4, 1.7),
    new THREE.MeshBasicMaterial({ color: "#f4f8fc" })
  );
  glass.position.set(-0.2, 2.05, -3.38);
  scene.add(glass);

  const sun = new THREE.DirectionalLight("#ffffff", 2.4);
  sun.position.set(-1.6, 4.2, 2.2);
  sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024);
  sun.shadow.camera.near = 0.5;
  sun.shadow.camera.far = 12;
  sun.shadow.camera.left = -3;
  sun.shadow.camera.right = 3;
  sun.shadow.camera.top = 3;
  sun.shadow.camera.bottom = -3;
  scene.add(sun);
  scene.add(new THREE.AmbientLight("#f3f6f8", 0.85));
  const fill = new THREE.DirectionalLight("#dce9f2", 0.55);
  fill.position.set(3, 2.4, 2);
  scene.add(fill);
}

function buildTable() {
  const oak = new THREE.MeshLambertMaterial({
    map: woodTexture("#e4c9a4", "#c9a678"),
  });
  const top = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.045, 0.78), oak);
  top.position.set(0, TABLE_Y, 0);
  top.castShadow = true;
  top.receiveShadow = true;
  scene.add(top);

  for (const x of [-0.62, 0.62]) {
    for (const z of [-0.28, 0.28]) {
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.026, 0.03, TABLE_Y, 12), oak);
      leg.position.set(x, TABLE_Y / 2, z);
      leg.castShadow = true;
      scene.add(leg);
    }
  }

  const linen = new THREE.Mesh(
    new THREE.BoxGeometry(1.28, 0.004, 0.48),
    new THREE.MeshLambertMaterial({ color: "#fbfcfd" })
  );
  linen.position.set(0, TABLE_Y + 0.024, 0);
  linen.receiveShadow = true;
  scene.add(linen);

  PEG_X.forEach((x, i) => {
    const peg = new THREE.Mesh(
      new THREE.CylinderGeometry(0.014, 0.016, 0.2, 20),
      new THREE.MeshLambertMaterial({ color: i === 2 ? "#4f9a78" : "#c4a07a" })
    );
    peg.position.set(x, TABLE_Y + 0.026 + 0.1, 0);
    peg.castShadow = true;
    peg.userData.kind = "peg";
    peg.userData.index = i;
    peg.userData.baseColor = i === 2 ? 0x4f9a78 : 0xc4a07a;
    scene.add(peg);
    pegMeshes.push(peg);

    const base = new THREE.Mesh(
      new THREE.CylinderGeometry(0.055, 0.06, 0.014, 24),
      new THREE.MeshLambertMaterial({ color: i === 2 ? "#6fb392" : "#d7b48c" })
    );
    base.position.set(x, TABLE_Y + 0.03, 0);
    base.userData.kind = "peg";
    base.userData.index = i;
    scene.add(base);

    const sprite = new THREE.Sprite(
      new THREE.SpriteMaterial({ map: labelTexture(PEG_NAMES[i], i === 2), transparent: true })
    );
    sprite.position.set(x, TABLE_Y + 0.02, 0.28);
    sprite.scale.set(0.3, 0.075, 1);
    scene.add(sprite);
  });
}

function diskRadius(size, count) {
  const t = (size - 1) / Math.max(count - 1, 1);
  return 0.048 + t * 0.046;
}

function clearDisks() {
  for (const m of diskMeshes) scene.remove(m);
  diskMeshes = [];
}

function startPresentation(n) {
  disks = n;
  pegs = [[], [], []];
  for (let d = n; d >= 1; d--) pegs[0].push(d);
  clearDisks();
  const palette = ["#f3d7a4", "#e8b56a", "#d9894c", "#c56b4a", "#9a4f3c"];
  for (let size = 1; size <= n; size++) {
    const mesh = new THREE.Mesh(
      new THREE.CylinderGeometry(diskRadius(size, n), diskRadius(size, n) + 0.003, DISK_H, 40),
      new THREE.MeshLambertMaterial({
        color: palette[size - 1],
        emissive: "#000000",
      })
    );
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.userData.kind = "disk";
    mesh.userData.size = size;
    scene.add(mesh);
    diskMeshes.push(mesh);
  }
  layoutDisks();
  rejects = 0;
  progress.textContent = `Paso ${n - 2} de 3 · ${n} discos`;
  setCoach("Arrastra el disco de arriba hacia Destino.", "hint");
}

function layoutDisks() {
  for (let p = 0; p < 3; p++) {
    pegs[p].forEach((size, i) => {
      if (holding && holding.size === size) return;
      const mesh = diskMeshes.find((m) => m.userData.size === size);
      mesh.position.set(PEG_X[p], TABLE_Y + 0.038 + DISK_H / 2 + i * DISK_H, 0);
      mesh.rotation.set(0, 0, 0);
    });
  }
}

function topOf(peg) {
  const stack = pegs[peg];
  return stack.length ? stack[stack.length - 1] : null;
}

function pegOf(size) {
  return pegs.findIndex((s) => s.includes(size));
}

function canMove(from, to) {
  if (from === to || from < 0 || to < 0) return false;
  const moving = topOf(from);
  if (moving == null) return false;
  const dest = topOf(to);
  return dest == null || dest > moving;
}

function tryMove(from, to) {
  if (!canMove(from, to)) return false;
  pegs[to].push(pegs[from].pop());
  return true;
}

function isSolved() {
  return pegs[2].length === disks && pegs[0].length === 0 && pegs[1].length === 0;
}

function nearestPeg(x) {
  let best = 0;
  let dist = Infinity;
  PEG_X.forEach((px, i) => {
    const d = Math.abs(x - px);
    if (d < dist) {
      dist = d;
      best = i;
    }
  });
  return dist < 0.17 ? best : -1;
}

function setCoach(text, mode) {
  coachMode = mode;
  coach.textContent = text;
  coach.classList.toggle("is-warn", mode === "warn");
  coach.classList.toggle("is-ok", mode === "ok");
}

function paintHover() {
  for (const mesh of diskMeshes) {
    const isTop = topOf(pegOf(mesh.userData.size)) === mesh.userData.size;
    const active = hoverDisk === mesh || (holding && holding.mesh === mesh);
    mesh.material.emissive.set(active ? "#3a2a10" : "#000000");
    mesh.material.emissiveIntensity = active ? 0.18 : 0;
    mesh.scale.setScalar(active ? 1.03 : 1);
    if (!holding) mesh.material.opacity = isTop ? 1 : 0.78;
    mesh.material.transparent = !holding && !isTop;
  }
}

function paintPegs() {
  for (const peg of pegMeshes) {
    const i = peg.userData.index;
    let color = peg.userData.baseColor;
    if (holding) {
      color = canMove(holding.from, i) ? 0x5fb48a : 0xd9b8a4;
    }
    peg.material.color.setHex(color);
  }
}

function setPointer(event) {
  const rect = canvas.getBoundingClientRect();
  pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
}

function pickTopDisk() {
  raycaster.setFromCamera(pointer, camera);
  const hits = raycaster.intersectObjects(diskMeshes, false);
  if (!hits.length) return null;
  const size = hits[0].object.userData.size;
  const from = pegOf(size);
  if (topOf(from) !== size) return null;
  return { size, from, mesh: hits[0].object };
}

function resize() {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight, false);
}

canvas.addEventListener("pointermove", (event) => {
  setPointer(event);
  if (holding) {
    raycaster.setFromCamera(pointer, camera);
    if (raycaster.ray.intersectPlane(holdPlane, hit)) {
      holding.mesh.position.set(
        hit.x,
        TABLE_Y + 0.16,
        THREE.MathUtils.clamp(hit.z, -0.1, 0.1)
      );
    }
    const to = nearestPeg(holding.mesh.position.x);
    if (to >= 0 && canMove(holding.from, to)) {
      setCoach(`Puedes soltarlo en ${PEG_NAMES[to]}.`, "hint");
    } else if (to >= 0) {
      setCoach("Ahí no cabe: es más grande que el de abajo.", "warn");
    } else {
      setCoach("Suéltalo sobre Origen, Apoyo o Destino.", "hint");
    }
    paintPegs();
    return;
  }
  const pick = pickTopDisk();
  hoverDisk = pick ? pick.mesh : null;
  canvas.style.cursor = pick ? "grab" : "default";
  paintHover();
});

canvas.addEventListener("pointerdown", (event) => {
  if (!veil.hidden) return;
  setPointer(event);
  const pick = pickTopDisk();
  if (!pick) {
    setCoach("Toma el disco de arriba. Los de abajo no se mueven.", "warn");
    return;
  }
  holding = pick;
  document.body.classList.add("holding");
  canvas.setPointerCapture(event.pointerId);
  setCoach("Ahora suéltalo en otro palo. Destino es el de la derecha.", "hint");
  paintHover();
  paintPegs();
});

canvas.addEventListener("pointerup", (event) => {
  if (!holding) return;
  canvas.releasePointerCapture(event.pointerId);
  document.body.classList.remove("holding");
  const to = nearestPeg(holding.mesh.position.x);
  const from = holding.from;
  const ok = to >= 0 && tryMove(from, to);
  if (!ok) {
    rejects += 1;
    setCoach(
      rejects >= 2
        ? "¿Qué disco tiene que quedar libre antes de mover el grande?"
        : "No encaja. Un disco grande no se pone sobre uno más pequeño.",
      "warn"
    );
  } else {
    rejects = 0;
    if (isSolved()) {
      setCoach(disks < 5 ? "Bien. Siguiente: un disco más." : "La torre quedó en Destino.", "ok");
      holding = null;
      layoutDisks();
      paintHover();
      paintPegs();
      setTimeout(() => {
        if (disks < 5) startPresentation(disks + 1);
      }, 900);
      return;
    }
    setCoach("Sigue. Toda la torre debe terminar en Destino.", "hint");
  }
  holding = null;
  layoutDisks();
  paintHover();
  paintPegs();
});

function loop() {
  renderer.render(scene, camera);
  requestAnimationFrame(loop);
}

buildRoom();
buildTable();
startPresentation(3);
paintHover();
paintPegs();
resize();
requestAnimationFrame(loop);
addEventListener("resize", resize);

document.getElementById("entrar").addEventListener("click", () => {
  veil.hidden = true;
  topbar.hidden = false;
  howto.hidden = false;
  coach.hidden = false;
  pegLegend.hidden = false;
});
