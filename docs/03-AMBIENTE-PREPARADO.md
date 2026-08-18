# 3. Ambiente preparado

Esto no es una casa de niños. Es un **taller universitario de materiales**: silencio, orden, objetos serios, una sola mesa. El participante no camina por un campus virtual. La dificultad espacial no forma parte de la medida.

## Principios (operativos, no decorativos)

| Principio | Cómo se ve en VR |
| --- | --- |
| Ambiente preparado | Una habitación, una mesa, un material a la vez. El resto está fuera de alcance. |
| Control del error | Lo imposible **no encaja**. No hay texto rojo “ERROR”. Un disco grande no se posa sobre uno pequeño; una forma no sienta en el hueco ajeno; una cara del cubo solo detiene en múltiplos de 90°. |
| Aislamiento de la dificultad | Hanói: 3, luego 4, luego 5 discos. Cubo: una mini-tarea a la vez. Control: 4, 6, 8 formas. |
| De lo concreto a lo abstracto | Primero las manos en el material; después El Correo (otro material); después papel/pantalla. |
| Libertad dentro de límites | Puede explorar, deshacer, repetir. No puede romper las reglas del material ni salir de la estación. |
| Guía, no profesora | Observa. Si interviene, pregunta. Nunca muestra la secuencia ganadora. |
| Dignidad adulta | Madera, lino, luz de ventana. Cero mascotas, partículas, puntajes, estrellas, voces infantiles. |

## Habitación

- Espacio de ~4 × 4 m virtual. El usuario está en el centro, a ~70 cm de una mesa de roble de 140 × 70 cm.
- Paredes: enlucido cálido, un ventanal con luz direccional estable (sin parpadeo, sin ciclo de día).
- Suelo: tablones. Sin tapetes de teletransporte.
- Audio: contacto madera-madera, muy bajo. Sin música.
- Paleta: roble, lino, tinta, arcilla, salvia. Nada de neón.
- Tipografía de etiquetas: humanista, caja baja, español. *Origen*, *Apoyo*, *Destino*. No *Source/Buffer/Target*.

Transiciones: fundido breve a lino (“Preparando el material…”) y aparece el siguiente trabajo en la **misma mesa**. Tres estaciones lógicas, un solo lugar físico:

1. **Trabajo** — material A, B o C.
2. **Otro problema** — El Correo.
3. **Cierre** — la mesa se vacía; se indica quitar el visor para el far transfer.

## Material A — Torres de Hanói

Mesa despejada. Tres postes cilíndricos de madera, 18 cm de alto, separados 28 cm.

| Poste | Etiqueta |
| --- | --- |
| Izquierda | Origen |
| Centro | Apoyo |
| Derecha | Destino |

Discos: 5 tamaños, madera mate, grosor 2.2 cm, diámetros 8–16 cm. El participante siempre ve solo los discos del nivel actual (aislamiento).

| Presentación | Discos | Óptimo (oculto) | Criterio para pasar |
| --- | --- | --- | --- |
| 1 | 3 | 7 | Torre completa en Destino, o 6 min |
| 2 | 4 | 15 | Torre completa, o 8 min |
| 3 | 5 | 31 | Torre completa, o resto del bloque |

Reglas del material (no del HUD):

- Solo se mueve el disco superior de un poste.
- Un disco no se posa sobre uno más pequeño: al soltar, **regresa** al poste de origen con el mismo sonido de madera. Eso es el control del error.
- El *snap* ocurre solo si la colocación es legal.

El óptimo no se muestra. No hay contador de movimientos a la vista del estudiante (sí en el log).

## Material B — Cubo de relaciones

No es un speedcube de competición. Es un cubo de 38 cm de arista, aspecto madera/tinta, caras con seis campos de color mate (no satinado plástico).

Interacción:

- Una mano estabiliza el cuerpo.
- La otra elige cara y hace un gesto de giro. La cara **siempre** termina en 90°.
- No hay giros libres ni 45° a medias.

Mini-tareas (una en la mesa a la vez; enunciado breve en una tarjeta de lino, español):

1. **Cruz clara** — formar una cruz en la cara superior sin pedir el cubo resuelto.
2. **Corregir una pieza** — una esquina o arista mal; el resto de una relación ya lograda debe **conservarse**.
3. **Elegir una secuencia** — tres tarjetas con tres secuencias cortas (p. ej. “derecha, arriba, derecha”); el participante ejecuta **una** y evalúa el estado.
4. **Qué permanece** — antes de un giro, señalar (con un marcador suave) qué piezas no deberían cambiar de relación.

Ninguna mini-tarea pide “resuelve el cubo”. Eso contaminaría con memoria de algoritmos.

## Material C — Gabinete de formas (control)

Este era el hueco más grave del research original. Aquí queda cerrado.

**Qué es:** un tablero de encaje universitario. Sólidos de madera (prisma, cilindro, cono truncado, cuña, bloque en L, hexágono, etc.) y huecos correspondientes. Algunas piezas **solo encajan tras un giro de 90°**, para igualar la demanda motora del cubo sin igualar la demanda algorítmica.

**Qué comparte con A y B:** agarre, traslado, *snap*, rechazo físico si no corresponde, 25 min, tres presentaciones (4, 6, 8 piezas), misma guía.

**Qué no tiene:**

- subproblema *n−1*
- invariante que haya que proteger mientras se altera otra parte
- secuencia cuya corrección se predice antes de ejecutar
- red de dependencias

**Control del error:** la pieza no sienta al ras en el hueco ajeno; vuelve a la mano o al reposo. Visualmente obvio, sin texto.

**Por qué es un control activo defendible:** misma VR, mismas manos, mismo tiempo, mismo habla de la guía, misma estética. Cambia la estructura computacional del material. Un revisor no puede decir “el control se aburrió en un mundo vacío”.

No usar la Torre Rosa con regla “solo apilar de mayor a menor con rechazo físico”: eso se parece demasiado a la restricción de Hanói. La seriación visoespacial del gabinete **no** impone un orden de movimientos legal.

## Near transfer — El Correo

Tras quitar el material de entrenamiento, en la **misma mesa** aparecen:

- cinco poblados (A–E) como tacos de madera con nombre
- caminos de lino entre algunos pares, cada uno con **capacidad física** (1, 2 o 3 huecos para paquetes)
- paquetes: cubos pequeños con prioridad (un punto, dos puntos)
- un camino cortado (cinta que no acepta paquetes)

Tarea: hacer llegar los paquetes a Destino respetando capacidad, orden de prioridad y caminos bloqueados, con el menor número de envíos inválidos.

No hay discos, postes, cubos de seis caras ni los colores del cubo. El control del error es otra vez físico: el paquete no entra en un camino lleno.

## Far transfer

Fuera del visor, en un escritorio real. Tipografía serif discreta, papel o pantalla clara, sin VR. Ver [05-INSTRUMENTOS.md](05-INSTRUMENTOS.md).

## Lo que nunca entra en escena

- Marcador, combo, estrellas, “¡bien hecho!”
- Avatar, NPC parlante, mascota
- Teletransporte, salto, menús flotantes de opciones múltiples durante el trabajo
- Inglés en la UI
- El número óptimo de movimientos
- La palabra “pensamiento computacional” **durante** el entrenamiento (sí puede aparecer en el consentimiento, a nivel general de “resolución de problemas”)
