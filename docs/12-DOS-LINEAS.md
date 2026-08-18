# 12. Dos líneas que no se mezclan en un solo paper

La conversación de research creció de 2 puzzles a **6 materiales**, más **paquetes a la carta** y **medidas de afecto**. Eso es una plataforma. El estudio de transferencia es otra cosa. Si se publican como un único experimento, un revisor de IEEE VR o CHI lo parte en dos frases: *demasiadas variables* y *el participante eligió el tratamiento*.

## Línea A — experimento TRANSFER-CT (este paper)

No cambia el núcleo ya preregistrable:

| Pieza | Decisión |
| --- | --- |
| Población | 18+. Universidad (Cenfotec) o **último año de colegio si ya tiene 18**. No niños. |
| Diseño | Between-subjects: Hanói / Cubo / Gabinete |
| Near transfer | **El Correo** (grafo). No el Patio de carga. |
| Far transfer | Cuadernillo S1/S7, escritorio |
| Paquetes | El experimentador asigna. El participante **no elige** juegos. |
| Afecto | Secundario, escala adulta (IMI breve), no “qué tan felices se sienten los niños” |
| Pruebas de admisión | Covariable / reclutamiento. No se copian ítems oficiales. |

Por qué el **Patio de carga no es near transfer de Hanói:** solo se mueve la caja de arriba de cada pila. Es el mismo esquema motor y la misma restricción de tope que Hanói, sin la regla de tamaño. Si el grupo Hanói rinde ahí, un revisor dirá “les diste el mismo puzzle con más postes”. El Correo no tiene pilas.

El Patio de carga **sí** sirve:

- como módulo de la plataforma (línea B);
- como near transfer **solo del grupo Cubo**, en un estudio 2, si se quiere un stacking-task para quien no entrenó stacking;
- nunca como evidencia de transferencia del grupo Hanói.

## Línea B — plataforma Laboratorio CT (paper de sistema / demo)

Seis materiales en la misma mesa, misma guía, mismo logger, **desktop primero y luego el mismo runtime en WebXR/casco**.

Eso cubre el mapa Brennan/Resnick + CSTA que el research señaló como hueco. Se envía a workshop, CHI Interactivity, IEEE VR demo, o un *system paper* **después** (o en paralelo, con N de usabilidad, no de eficacia CT).

| Material | Nombre en mesa | CT que añade | ¿Entra al RCT A? |
| --- | --- | --- | --- |
| Torres de Hanói | Hanói | Descomposición, algoritmo | Sí — entrenamiento A |
| Cubo de relaciones | Cubo | Patrones, invariantes | Sí — entrenamiento B |
| Gabinete de formas | Gabinete | Control visoespacial | Sí — control C |
| El Correo | El Correo | Restricciones, rutas | Sí — near transfer |
| Patio de carga | Patio de carga | Look-ahead, relocaciones, `futureBlockingErrors` | No en A (confunde con Hanói) |
| Fábrica en paralelo | Fábrica | Loops, paralelismo, WAIT/SIGNAL | No en A (es programación explícita) |
| Red de agua | Red de agua | Modelo, módulos, simulación | No en A (es diseño de sistemas) |

Fábrica y Red de agua **reabren el confusor de la guía** si se usan como entrenamiento del RCT: el participante construye `REPEAT` e `IF`. Eso ya es instrucción de CT. En la línea B está bien; en la A, no.

## Paquetes

Existen. Los arma quien conduce (docente o experimentador), no el estudiante “porque le gustó el cubo”.

Paquetes de **aula / demo** (línea B):

| Paquete | Materiales | Para qué |
| --- | --- | --- |
| `P1-transfer` | 1 entrenamiento + Correo + S1 | El RCT |
| `P2-apilar` | Hanói + Patio de carga | Demo; **no** se analiza como transferencia |
| `P3-automatizar` | Fábrica | Loops y paralelo |
| `P4-modelar` | Red de agua | Simulación |
| `P5-recorrido` | Los seis, 8–10 min cada uno | Feria, no ciencia de eficacia |

En el RCT solo existe `P1-transfer`, y la pieza de entrenamiento la sortea `ConditionRandomizer`.

## Mapa CT (cobertura de plataforma, no del paper A)

| Componente | Hanói | Cubo | Correo | Patio | Fábrica | Red de agua |
| --- | --- | --- | --- | --- | --- | --- |
| Descomposición | sí | sí | sí | sí | sí | sí |
| Patrones | sí | fuerte | sí | sí | loops | débil |
| Abstracción | sí | fuerte | sí | sí | sí | fuerte |
| Algoritmo | fuerte | fuerte | sí | sí | sí | débil |
| Planificación | fuerte | sí | fuerte | fuerte | sí | sí |
| Restricciones | sí | sí | fuerte | fuerte | sync | capacidad |
| Evaluación | sí | fuerte | sí | sí | debug | simulación |
| Optimización | sí | sí | fuerte | fuerte | idle | robustez |
| Loops / condicionales / variables | no | no | no | no | **sí** | parámetros |
| Paralelismo / sync | no | no | no | no | **sí** | débil |
| Modelado / módulos / simular | no | no | no | no | débil | **sí** |
| Formular el problema | no | no | no | no | no | **sí** (nivel 0: qué abstraer) |
| Datos (el estudiante analiza) | no | no | no | no | no | tabla de escenarios |

El paper A **no afirma** cobertura completa de CT. Afirma transferencia de estrategias desde un material concreto. El paper B puede afirmar cobertura de dimensiones si hay evidencia de uso, no de aprendizaje, hasta tener N.

## Desktop primero, casco después

El research pide verlo **sin casco** y luego el mismo estado en cualquier VR. Eso corrige el plan Unity-only:

1. Lógica de cada material en C# / TypeScript **sin XR**.
2. Adaptador `DesktopInput` (mouse/teclado).
3. Adaptador `XrInput` (ray, mando, manos).
4. WebXR para “cualquier casco”; Quest 3 sigue siendo el hardware de laboratorio para el RCT.

El RCT de Cenfotec se corre en Quest 3 para controlar FOV y cinetosis. El desarrollo diario es desktop.

## Población 18+ y pruebas de ingreso

Costa Rica: último año de colegio y pruebas psicométricas / de aptitud para universidad. PlayCT **no reproduce** esas pruebas (derechos de autor, contaminación).

Sí se hace:

- Inclusión: 18 años cumplidos. Colegio V año solo si 18+.
- Ficha: ¿hizo prueba de admisión este año? (sí/no), universidad o colegio, puntaje **opcional y autodeclarado** como covariable exploratoria.
- El far transfer S1 es el instrumento del estudio; su validez ecológica es “mismo tipo de población que entra a universidad”, no “predicimos la PAA”.

## Afecto (secundario, adultos)

Después de cada material, 4 ítems tipo IMI *interest/enjoyment*, 1–7, español adulto. Ejemplo:

1. Este trabajo me resultó interesante.
2. Disfruté hacer esta actividad.
3. Querría volver a trabajar con este material.
4. Me sentí capaz de terminar.

No se usa como outcome de CT. Sirve para (a) el system paper, (b) chequear que el control Gabinete no sea punitivo, (c) no afirmar que “les gustó = aprendieron”.

## Qué no se afirma aunque la plataforma tenga 6 juegos

- Que seis módulos demuestran pensamiento computacional completo.
- Que elegir el paquete favorito es un diseño experimental.
- Que el Patio de carga mide transferencia de Hanói.
- Que Swarm/HydroGrid son el mismo tratamiento que “el material enseña en silencio”.
- Que la muestra incluye niños.
