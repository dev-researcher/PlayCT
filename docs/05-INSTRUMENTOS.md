# 5. Instrumentos

Todos los ítems son **originales**. Siguen la lógica Bebras: problema corto, restricciones explícitas, respuesta justificable, casi nada de sintaxis de programación. No se reproducen ítems Bebras con copyright.

Idioma: español. El outcome primario **no** es un autoinforme de CT.

Puntaje por ítem de transferencia: **0–3**.

| Puntos | Criterio |
| --- | --- |
| 0 | En blanco, ilegible, o viola una restricción explícita |
| 1 | Cumple parte de las restricciones; la solución no es válida |
| 2 | Solución válida, pero no la óptima cuando se pide optimalidad, o justificación incompleta cuando se pide “qué permanece” |
| 3 | Válida y, si aplica, óptima / identificación correcta del error o de la invariante |

## 5.1 Ficha de experiencia (pre-VR)

| Campo | Codificación |
| --- | --- |
| Edad | años |
| Carrera y año | texto |
| Programación | 0 ninguno · 1 introductorio · 2 intermedio · 3 avanzado |
| Hanói | 0 nunca · 1 lo conozco · 2 lo he resuelto · 3 lo enseño |
| Cubo 3×3 | 0 nunca · 1 lo he girado · 2 lo resuelvo · 3 speedcube (**excluir si 3**) |
| VR previa | 0–3 |
| Colegio o universidad | colegio V año / universidad, año |
| Prueba de admisión este año | 0 no · 1 sí (no se pide la boleta) |
| Puntaje autodeclarado (opcional) | número o en blanco |
| Videojuegos (h/semana) | número |
| Otros puzzles | 0–3 |

## 5.2 Habilidad espacial

Ocho ítems de rotación mental (figuras 3D simples, 20 s cada uno). Puntaje 0–8 = covariable `Espacial`. No se usa una batería comercial larga: el baseline cabe en 10 min.

## 5.3 PreCT (desempeño)

Dos ítems de calentamiento, **distintos** de S1, dificultad baja. Suma 0–6 = `PreCT`. No son outcome.

### Calentamiento 1 — La fila del laboratorio

Hay que usar cuatro equipos, cada uno una vez: microscopio (M), impresora 3D (I), osciloscopio (O), soldador (S).

- El soldador va **antes** que el osciloscopio.
- La impresora **no** puede ir primero.
- El microscopio va **inmediatamente después** de la impresora.

¿Cuál es un orden válido? Si hay varios, dé uno.

**Soluciones válidas:** el bloque `I, M` no puede empezar en la posición 1. Queda en posiciones 2–3 o 3–4.

- Posiciones 2–3: `S, I, M, O` (S antes que O).
- Posiciones 3–4: `S, O, I, M` o `O` no puede ir antes de S si S está en 1 y O en 2… `S, O, I, M` cumple S antes que O. `O, S, I, M` viola S antes que O.

Válidas: `S, I, M, O` y `S, O, I, M`.

Puntaje 3 si el orden cumple las tres reglas; 1 si cumple dos; 0 si no.

### Calentamiento 2 — El letrero

Un letrero se arma con cuatro tarjetas: CASA, DE, LA, U. Solo una disposición es legal:

- DE va inmediatamente antes de LA.
- U no es la última.
- CASA no toca a U.

¿Cuál es el letrero?

El bloque `DE LA` ocupa dos sitios consecutivos. U no última. CASA no adyacente a U.

Única válida: **U DE LA CASA**. (`DE LA U CASA` hace que U toque CASA; cualquier otra o pone a U al final o rompe el bloque DE LA.)

Puntaje 3 si esa (o equivalente con las tres reglas); 0 si no.

---

## 5.4 Near transfer (VR) — El Correo

Tras el material de entrenamiento, misma mesa, 15 min.

**Red:** poblados A (origen), B, C, D, E (destino).

Caminos y capacidad (huecos físicos):

| Camino | Capacidad |
| --- | --- |
| A–B | 2 |
| A–C | 1 |
| B–D | 2 |
| C–D | 1 |
| C–E | 2 |
| D–E | 1 |
| B–C | bloqueado |

Paquetes (todos parten de A; deben terminar en E):

| Paquete | Prioridad | Nota |
| --- | --- | --- |
| P1 | alta (2 puntos) | no puede esperar en D |
| P2 | baja (1 punto) | — |
| P3 | baja | no puede compartir camino con P1 en el mismo envío |

Un **envío** mueve simultáneamente hasta *k* paquetes por un camino de capacidad *k*. P1 debe llegar a E **antes o en el mismo número de envíos** que cualquier paquete de baja prioridad.

**Solución de referencia (7 envíos, válida):**

1. A→C: P1
2. C→E: P1 — P1 en destino; no pasó por D
3. A→B: P2
4. B→D: P2
5. A→C: P3 — P1 ya no está en la red; no comparte envío
6. C→E: P3
7. D→E: P2

P2 llega después de P1. P3 nunca comparte envío con P1. P1 no espera en D.

**Puntaje near (0–12), secundario:**

- +3 si P1 llega a E y nunca espera en D
- +3 si los tres paquetes llegan
- +3 si P3 nunca comparte camino-envío con P1
- +3 si número de envíos ≤ 8 (eficiencia; el óptimo razonable es 6–7)

El logger registra cada envío, validez, y estados. El puntaje se puede calcular post-hoc.

---

## 5.5 Far transfer S1 (outcome primario, escritorio)

Seis ítems × 0–3 = **0–18**. Headset quitado. 15 min. Orden fijo. Sin VR, sin discos, sin cubo.

Cada ítem mapea un componente CT **para el análisis**, no para el enunciado (el enunciado no dice “esto es descomposición”).

### S1-1 Dependencias del almuerzo (descomposición / orden)

Un comedor prepara: arroz (A), frijoles (F), ensalada (E), casado (C), jugo (J).

- El casado necesita arroz y frijoles **ya listos**.
- El jugo puede hacerse en cualquier momento.
- La ensalada debe estar lista **antes** del casado.
- Arroz y frijoles no pueden empezar al mismo tiempo: solo hay un fogón; cada uno tarda 1 turno. Ensalada, jugo y “armar casado” tardan 1 turno y **no** usan fogón. El fogón hace una olla por turno.

¿Cuál es el **mínimo** de turnos para tener casado y jugo listos?

**Solución:** fogón: A y F en dos turnos (orden indiferente). Ensalada en paralelo en el turno 1 o 2. Jugo en paralelo cuando se quiera. Armar casado solo después de A, F y E → turno 3. Mínimo **3 turnos**.

| Puntos | |
| --- | --- |
| 3 | 3 turnos, con un orden coherente |
| 2 | 4 turnos, orden válido |
| 1 | orden válido de platos ignorando el fogón, o 5+ turnos |
| 0 | casado antes de A/F/E |

### S1-2 Mapa con ruido (abstracción)

Diagrama (se imprime): 12 nodos. Solo importan Casa (K), Puente (P), Mercado (M), Campus (U). El resto son cafés, paradas y un museo **sin efecto**. Aristas útiles: K–P, P–M, M–U, K–M (cerrada), P–U (cerrada). Hay 8 etiquetas decorativas.

Pregunta: ruta de K a U que no use aristas cerradas. ¿Cuántas aristas útiles mínimo?

**Solución:** K–P–M–U. Mínimo **3**. Quien intente K–M o P–U viola el cierre.

| Puntos | |
| --- | --- |
| 3 | K–P–M–U y “3” |
| 2 | la ruta correcta sin el número, o 3 con ruta equivalente escrita |
| 1 | llega a U usando un nodo de ruido pero sin aristas cerradas (ruta más larga) |
| 0 | usa calle cerrada o no llega |

### S1-3 Cooperativa de paquetes (algoritmo y restricciones)

Hay que llevar {α, β, γ} del depósito al barrio. La camioneta carga **como máximo 2** y puede volver vacía. Empieza en el depósito. Cada tramo (ida o vuelta) cuenta 1.

- α no comparte viaje con β.
- Cuando γ llega al barrio, α ya está ahí o llega en el mismo viaje.

¿Mínimo de viajes?

Óptimo: (1) α+γ al barrio, (2) camioneta vacía vuelve, (3) β al barrio. **3 viajes.**

| Puntos | |
| --- | --- |
| 3 | 3, plan que respeta las dos restricciones |
| 2 | 4–5, válido |
| 1 | válido en restricciones, 6+ o sin contar vueltas |
| 0 | α con β, o γ sola en barrio sin α |

### S1-4 El procedimiento (evaluación / depuración)

```
1  n ← longitud(lista)
2  i ← 0
3  mientras i < n
4      lista[i] ← lista[n - i]     ← línea candidata
5      i ← i + 1
6  devolver lista
```

Se afirma que **invierte** la lista. En `[a, b, c]` el resultado no es `[c, b, a]`.

Preguntas: (1) ¿Qué línea falla? (2) ¿Por qué? (3) Corrija **una** línea o agregue **una**.

**Diagnóstico:** `lista[n-i]` cuando i=0 accede a `lista[n]` (fuera de rango). Aunque se cambie a `n-1-i`, el bucle recorre **toda** la lista y vuelve a intercambiar, deshaciendo la inversión. Hace falta un índice `j` desde el final o recorrer solo hasta `n/2` e intercambiar.

Corrección aceptada (cualquiera):

- intercambiar `lista[i]` con `lista[n-1-i]` mientras `i < n/2`
- o construir una lista nueva de atrás hacia adelante

| Puntos | |
| --- | --- |
| 3 | identifica el doble problema (índice y doble intercambio) o da un parche correcto |
| 2 | corrige el índice pero no el doble paso, o al revés |
| 1 | “la línea 4 está mal” sin más |
| 0 | culpa a la línea 2 o 6 sin motivo |

### S1-5 Los sellos (patrones y generalización)

Secuencia de sellos (se imprime con figuras: círculo, cuadrado, círculo, cuadrado, círculo, ¿?).

Regla: alternan. El sexto es **cuadrado**.

Segunda pregunta: si cada sello ahora tiene un punto adentro, ¿cambia el séptimo de una serie de siete que empezó en círculo?

**Solución:** el punto es ruido. Séptimo = círculo (posiciones impares = círculo).

| Puntos | |
| --- | --- |
| 3 | sexto = cuadrado y séptimo = círculo, ignorando el punto |
| 2 | solo una de las dos |
| 1 | nombra “alternan” pero se equivoca al aplicar |
| 0 | inventa una regla sobre el punto |

### S1-6 La mesa (invariantes)

Cinco sillas en **fila** 1–2–3–4–5. Personas: Ana, Ben, Cata, Dino, Eva.

- Ana no queda junto a Dino.
- Cata en un extremo (silla 1 o 5).
- Ben queda inmediatamente a la izquierda de Eva (bloque BE).

Arreglo mostrado: `Cata, Ben, Eva, Ana, Dino`.

Ese arreglo rompe Ana–Dino (sillas 4–5). Cata en extremo y BE están bien.

Pregunta: ¿qué regla se rompe? Proponga un arreglo que cumpla las tres.

**Ejemplos legales:** `Cata, Ben, Eva, Dino, Ana` · `Dino, Ben, Eva, Ana, Cata`.

| Puntos | |
| --- | --- |
| 3 | nombra Ana–Dino y da un arreglo legal |
| 2 | una de las dos |
| 1 | dice “está mal” sin la regla |
| 0 | cambia BE o Cata sin necesidad |

---

## 5.6 Far transfer S7 (Día 7)

Misma estructura, **otras coberturas**. Isomorfos. Puntaje 0–18.

| Ítem S1 | Ítem S7 (misma mecánica) |
| --- | --- |
| S1-1 almuerzo / fogón | S7-1 laboratorio de foto: revelado, secado, montaje; una cubeta |
| S1-2 mapa ruido | S7-2 red de buses con paradas decorativas y dos tramos en reparación |
| S1-3 paquetes | S7-3 tres archivos a un servidor; canal de 2; A no con B; C no llega antes que A |
| S1-4 procedimiento | S7-4 pseudocódigo que “elimina duplicados” y falla al correr el índice |
| S1-5 sellos | S7-5 secuencia de teselas (triángulo/rombo) + un adorno irrelevante |
| S1-6 mesa | S7-6 cinco lockers en fila; mismas tres reglas con otros nombres |

Los enunciados S7 se redactan en el cuadernillo de retención; la clave de corrección es isomorfa a S1 (mismos puntajes).

No hay VR el Día 7. No hay re-entrenamiento. No hay feedback de respuestas.

## 5.7 Cuestionarios de cierre (no primarios)

- SSQ breve (náusea, orientación, oculomotor), 4 ítems.
- Carga (una escala 1–9 tipo Paas).
- Las 3 preguntas abiertas de [04-GUIA.md](04-GUIA.md).

Un autoinforme tipo CTS (computational thinking scale) **no** sustituye el far transfer. Si se aplica, es exploratorio y va al apéndice.

## 5.8 Afecto post-material (IMI breve, adultos)

Tras cada material, 1–7 (1 = nada cierto, 7 = muy cierto). No se habla de “niños” ni de “felicidad”. Media de los 4 ítems = `enjoyment`. Evento `affect`. Secundario.

1. Este trabajo me resultó interesante.
2. Disfruté hacer esta actividad.
3. Querría volver a trabajar con este material.
4. Me sentí capaz de terminar.

En el RCT: una vez tras A/B/C y una vez tras El Correo. En la línea B: tras cada módulo del paquete.
