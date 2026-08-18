# 2. Protocolo experimental

Estudio between-subjects, tres condiciones. Idioma: español. Una sesión de ~85 min y una sesión de retención a 7 días.

Población: **18 años cumplidos**. Universidad (Cenfotec u otras) o **último año de colegio si ya tiene 18** (tramo que también hace pruebas psicométricas / de aptitud de ingreso). No menores. Las pruebas oficiales de admisión **no se copian**; en la ficha se anota si las hicieron. Los seis materiales de la conversación posterior **no entran todos aquí**: este paper usa el paquete `P1-transfer` asignado por el experimentador. El participante no elige juegos. Ver [12-DOS-LINEAS.md](12-DOS-LINEAS.md).

## Preguntas de investigación

| ID | Pregunta |
| --- | --- |
| RQ1 | ¿El trabajo con materiales CT en VR mejora el desempeño en problemas nuevos que no se parecen al material? (far transfer) |
| RQ2 | ¿El tipo de material (Hanói vs Cubo de relaciones) cambia la magnitud o la naturaleza de esa transferencia? |
| RQ3 | ¿La eficiencia estratégica durante el trabajo con el material predice el far transfer? |
| RQ4 | ¿Parte de la ganancia se observa a los 7 días, con ítems isomorfos distintos? |

## Hipótesis (preregistradas)

**H1.** Los grupos de material CT (Hanói, Cubo) superan al control activo en el puntaje de far transfer, covariando PreCT, habilidad espacial y experiencia de programación.

**H2.** Hanói y Cubo producen **perfiles distintos**, no un ganador global. Hanói: descomposición, planificación jerárquica, transiciones de estado. Cubo: patrones, abstracción, invariantes, evaluación. **No se preregistra que uno sea mejor en el total.**

**H3.** El Índice de Eficiencia Estratégica (IEE) del entrenamiento predice el far transfer, incluso dentro de cada condición.

**H4.** La diferencia respecto al control permanece, atenuada, en el Día 7.

## Condiciones

Nadie trabaja los dos materiales CT. La asignación es aleatoria, estratificada por experiencia de programación (0–1 vs 2–3).

| Código | Material (25 min) | Qué induce | Qué no induce |
| --- | --- | --- | --- |
| A | Torres de Hanói | Subproblemas, planificación, restricciones de orden | Memoria de algoritmos de cubo |
| B | Cubo de relaciones (mini-tareas, giros 90°) | Patrones, invariantes, selección de secuencia | Recursión de *n−1* discos |
| C | Gabinete de formas (control activo) | Seriación visoespacial, encaje, rotación motora | Subproblemas jerárquicos, invariantes algorítmicos, secuencias con predicción de estado |

Las tres condiciones comparten:

- misma duración
- misma postura (sentado o de pie quieto, sin caminar)
- mismo tipo de agarre y colocación con *snap*
- mismo régimen de guía (frecuencia, tono, niveles; ver [04-GUIA.md](04-GUIA.md))
- mismo feedback de control del error (el material no acepta lo imposible; no hay cartel de ERROR)
- misma iluminación, mesa y habitación

La única diferencia intencional es **la estructura informativa del material**.

## Resolución del confusor “el tutor enseña CT”

El diseño original proponía un tutor que verbalizaba descomposición y evaluación solo en A y B. Eso habría hecho imposible saber si la transferencia viene del puzzle o de la instrucción.

**Decisión:** la guía es un factor **constante**.

- No se nombran componentes de CT en ningún grupo.
- No se dicta el movimiento correcto en ningún grupo.
- Las pistas siguen la misma máquina de estados (silencio → señalar el error del material → pregunta sobre el estado presente).
- El texto de la pregunta se rellena con objetos de **esa** mesa (“disco”, “forma”, “cara”), no con teoría.

Así, si A y B superan a C, la explicación más parsimoniosa es el material, no “les hablaron más de pensamiento computacional”.

Un diseño 2×2 (material × guía sí/no) queda como **estudio 2**, no como este. Este paper necesita potencia para tres grupos, no para seis celdas.

## Participantes

- Universidad Cenfotec, otras universidades en Costa Rica, o V año de colegio **con 18 cumplidos**.
- 18 años o más. Consentimiento informado. Menores de 18 no entran.
- Exclusión: speedcubing competitivo o resolver un 3×3 cronometrado de forma habitual. Se registra experiencia previa con Hanói.
- Criterio de cinetosis: SSQ post-tutorial; si el malestar impide continuar, se interrumpe y no se fuerza.

### Tamaño muestral

- Efecto medio *f* = 0.25, ANOVA de un factor, α = .05, potencia .80 → ~158.
- **Objetivo del estudio principal: N = 180 (60 por celda).**
- **Piloto obligatorio primero: N ≈ 60 (20 por celda).** El piloto estima σ, abandona, cinetosis y claridad de ítems. **No se usa el piloto para afirmar eficacia.** Si el piloto cambia ítems o la fórmula del IEE, el estudio principal preregistra la versión final.

## Procedimiento (sesión 1)

| Min | Bloque | Medio | Quién |
| --- | --- | --- | --- |
| 0–5 | Acogida, consentimiento, código de participante | Mesa | Experimentador |
| 5–15 | Baseline: 2 ítems CT de calentamiento (no outcome), 8 rotaciones mentales, ficha de experiencia | Escritorio | Participante |
| 15–20 | Tutorial VR: agarrar, soltar, *snap*, “el material a veces no acepta” | Quest 3 | Guía mínima |
| 20–45 | Material asignado (A, B o C) | Quest 3 (piloto de software: mismo runtime en escritorio) | Autónomo |
| 45–47 | IMI breve (4 ítems) del material | Mesa | Participante |
| 47–62 | Near transfer: El Correo (**no** Patio de carga) | Mismo medio | Autónomo |
| 62–64 | IMI breve del Correo | Mesa | Participante |
| 64–79 | Far transfer: 6 ítems (batería S1) | Escritorio, headset quitado | Autónomo |
| 79–87 | SSQ breve, carga Paas, debrief de estrategia (3 abiertas) | Escritorio | Participante |

Día 7 (20–30 min, sin VR): batería S7 isomorfa, distinta en cobertura narrativa. Sin re-entrenamiento.

## Outcomes

**Primario:** puntaje de far transfer S1 (0–18; seis ítems × 0–3). Ver [05-INSTRUMENTOS.md](05-INSTRUMENTOS.md).

**Secundarios:** near transfer (El Correo); IEE de entrenamiento; tiempo, latencia de planificación, acciones, backtracking; far transfer S7; IMI 4 ítems (afecto, no CT); textos de debrief (cualitativo complementario).

**No primario:** velocidad. Quien piensa bien y lento no se penaliza en el outcome principal.

## Análisis

Modelo principal (preregistrado):

```
FarTransfer_S1 ~ Condicion + PreCT + Espacial + Programacion
```

Contrastes planeados: A vs C, B vs C, A vs B.

Reportar: estimador, IC 95%, *p*, tamaño de efecto (η²p o *d* de contraste). No solo *p*.

Si se usan los 6 ítems como ensayos repetidos:

```
PuntajeItem ~ Condicion + Tiempo + Condicion:Tiempo
              + PreCT + Espacial + Programacion
              + (1 | Participante) + (1 | Item)
```

H3: `FarTransfer_S1 ~ IEE + Condicion + PreCT + ...` y, exploratorio, interacción IEE × Condición.

Missing data: análisis principal por intención de tratar en quienes completaron far transfer S1. El abandono en VR se reporta. No se imputa el outcome primario.

## Lo que el piloto puede cambiar (y entonces se re-preregistra)

- Redacción de ítems far transfer con piso/techo.
- Pesos del IEE (la estructura de componentes no).
- Número de presentaciones del material para llenar 25 min sin fatiga.
- Umbrales de la máquina de pistas (20 s de inactividad, etc.).

El piloto **no** puede cambiar la pregunta, las tres condiciones, el far transfer como primario, ni el régimen igual de guía.
