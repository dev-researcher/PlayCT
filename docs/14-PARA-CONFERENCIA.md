# 14. Qué hace falta para un paper de conferencia top

Este documento cierra los tres bloqueos del research original y lista lo que **aún no está** y un revisor de IEEE VR o CHI pedirá.

## 0. Qué no es este paper

No es “Hanói en VR enseña CT”. Eso ya está: iThinkSmart (Hanoi + River Crossing en IVR; C&E: XR / ETR&D; outcome = el mismo juego o percepción de CT). Tampoco es enseñar a armar el cubo: Rubikon (DIS 2025) ya tutoriza Rubik en AR y mide el cubo, no transferencia a otro medio.

La pregunta que sí es publicable:

> ¿Estrategias que emergen al manipular un material con restricciones, **sin** que la guía enseñe CT, se usan después en un problema que no se parece **y** fuera del visor?

Cadena que hay que mostrar, no solo afirmar:

**material embodied → cambio de proceso (IEE) → near transfer (El Correo) → far transfer escritorio → retención 7 días.**

---

## 1. Confusor del tutor — cerrado

**Problema.** Si A/B oyen “¿qué subproblema?” y C no, cualquier ganancia es instrucción verbal.

**Resolución (obligatoria en este paper).** Durante TRAIN las tres condiciones reciben **el mismo texto**. Ver [04-GUIA.md](04-GUIA.md). El material rechaza lo ilegal; no hay tutor de CT. Las preguntas de estrategia van al debrief **después** de S1.

Si el piloto muestra que sin ninguna pista nadie termina Hanói de 5 discos, se puede bajar a 4 discos. No se “arregla” metiendo hints de descomposición solo en A.

---

## 2. Grupo C — escena cerrada

No es “otra actividad espacial” vaga. Es el **Gabinete de formas** ([03-AMBIENTE-PREPARADO.md](03-AMBIENTE-PREPARADO.md)):

| Igual que A/B | Distinto (el tratamiento que C *no* tiene) |
| --- | --- |
| 25 min, misma mesa, sin caminar | No hay subproblema *n−1* |
| Grab + snap | No hay invariante que proteger |
| Algunas piezas piden giro 90° (iguala el cubo) | No hay secuencia cuya predicción se evalúa |
| Misma frase de rechazo | No hay red de dependencias |
| Tres presentaciones (4, 6, 8 piezas) | Encaje visoespacial, no planificación jerárquica |

No usar Torre Rosa con “solo apilar de mayor a menor”: eso copia la restricción de Hanói.

---

## 3. Far transfer — itemizado

No se copian ítems Bebras (copyright). Batería original S1, seis ítems × 0–3 = **0–18**, headset quitado. Clave y rúbrica: [05-INSTRUMENTOS.md](05-INSTRUMENTOS.md). Cuadernillo del participante **sin** soluciones: `docs/cuadernillos/S1-participante.md`.

| Ítem | Qué mide (análisis, no el enunciado) |
| --- | --- |
| S1-1 Almuerzo / fogón | Descomposición y orden |
| S1-2 Mapa con ruido | Abstracción |
| S1-3 Cooperativa | Algoritmo y restricciones |
| S1-4 Procedimiento | Evaluación / depuración |
| S1-5 Sellos | Patrones |
| S1-6 Mesa | Invariantes |

**H2 (perfiles, no un ganador):** Hanói debería ayudar más en S1-1 y S1-3; Cubo en S1-5 y S1-6. El total S1 es el primario (H1). Día 7: isomorfos S7.

Near transfer **no** es Patio de carga (se parece a Hanói). Es **El Correo**.

El repo público no debe mostrar `05-INSTRUMENTOS.md` hasta cerrar la recolección (poner el repo en privado o sacar la clave).

---

## 4. Dónde está la novedad (defendible)

| Ya existe | Qué aportamos nosotros |
| --- | --- |
| Hanói VR para “ver” recursión / CT (iThinkSmart) | No medimos el mismo puzzle como éxito |
| Bebras pasado a VR (ThinkLand, usabilidad) | El far transfer es **fuera** de VR |
| Rubikon enseña el cubo en AR | Mini-tareas de cubo como **entrenamiento**, outcome = otro problema + otro medio |
| Transfer IVR → versión física del *mismo* problema | Transfer a problema **distinto** y a **pantalla/papel** |
| Cuestionarios de CT | Desempeño + logs de proceso (IEE) |

Frase para abstract (no inflar):

> We test whether constraint-based embodied practice in stationary VR yields computational strategies that transfer to novel tasks after the headset is removed, relative to an active visuospatial VR control with identical guidance.

Aportes que un area chair puede tragar:

1. **Transferencia cruzada de tarea y de medio**, con control VR activo (no “vs nada”).
2. **Guía igualada** + control del error en el material (contribución de interacción, no solo educativa).
3. **IEE** (proceso) como predictor de far transfer (H3), no solo score del puzzle.
4. **Dos materiales CT**, perfiles distintos preregistrados, sin declarar un ganador.

Lo que **no** vender: seis juegos, Montessori como teoría nueva, “primera app de Hanói en VR”, Q1 Scopus como si fuera un cuartil de proceedings.

---

## 5. Lo que todavía falta (sin esto no es conferencia top)

### Ciencia

- [ ] Preregistro OSF/AsPredicted **antes** del N principal ([08-PREREGISTRO.md](08-PREREGISTRO.md)).
- [ ] Comité de ética Cenfotec + consentimientos.
- [ ] Piloto N≈20 por celda: dificultad de S1 (ni piso ni techo), cinetosis, tiempo real, recuento de hints.
- [ ] Dos evaluadores independientes de S1; kappa o ICC; discrepancias resueltas.
- [ ] Related work citado de verdad: iThinkSmart / Agbo et al.; VR Hanoi vs físico (ISEC); Bebras en VR (MTI 2025); Rubikon DIS 2025; literatura de *transfer* y *near/far* (Barnett & Ceci o equivalente); CT assessment vs autoinforme.
- [ ] No mezclar Fábrica / Red de agua / menú de paquetes en este experimento.

### Sistema (sin esto IEEE VR no entra)

- [ ] Build Quest 3, sesión estacionaria, logging JSONL real.
- [ ] Hanói 3–4–5 + Gabinete + El Correo + export.
- [ ] Cubo mini-tareas **si** se quiere H2; si el cubo no llega, el piloto se declara de **dos** celdas (Hanói vs Gabinete) y H2 queda para el paper 2.
- [ ] Video de 30–90 s de la interacción (requisito habitual de IEEE VR).

### Operación

- [ ] N=180 o, si no, **no** afirmar eficacia: workshop / system paper con N=60.
- [ ] Día 7 con contacto real (correo, cita).
- [ ] Calendario: IEEE VR 2027 ya pasó; objetivo **IEEE VR 2028 o CHI 2028**.

### Afirmaciones permitidas en revisión

- “Evidencia de transferencia cruzada de tarea en esta muestra.”
- “El proceso en VR predijo el far transfer.”
- No: “VR desarrolla pensamiento computacional.”
- No: “Hanói mide CT.”
- No: “gaze es CT.”

---

## 6. Orden de trabajo (único que sostiene el paper)

1. Ética + preregistro del piloto.  
2. Quest: Hanói + logger + Gabinete + Correo.  
3. Piloto 60. Ajustar S1 e IEE; re-preregistrar el principal.  
4. Cubo si hay tiempo; si no, dos celdas.  
5. N=180 + Día 7.  
6. Análisis preregistrado. Escritura. Submit.

El prototipo web en `web/` sirve para validar la mesa, **no** para el N del paper.
