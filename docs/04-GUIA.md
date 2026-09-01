# 4. La guía (versión conferencia)

Para IEEE VR / CHI el tratamiento tiene que ser **el material**, no el texto.

Las preguntas de nivel 2 y 3 del borrador anterior (“qué tiene que quedar libre”, “qué relación debe permanecer”) **enseñan estrategia**. Aunque no nombren CT, el grupo Hanói recibe scaffolding de descomposición y el control no. Un revisor lo vería. Por eso, **durante el entrenamiento las tres condiciones oyen exactamente el mismo texto**.

## Durante TRAIN (A, B y C — idéntico)

| Momento | Texto, palabra por palabra |
| --- | --- |
| Tutorial (5 min, una pieza del gabinete) | En esta mesa el material le avisa cuando algo no corresponde: no encaja y vuelve. No hay penalización. Puede tomarse el tiempo que necesite. Yo no le voy a dictar el movimiento. |
| Acción rechazada | El material no aceptó esa acción. Obsérvelo otra vez. |
| 20 s o 40 s sin acción | Puede tomarse el tiempo que necesite. El material sigue en la mesa. |
| Acción válida | *(silencio)* |

Nada más. Ni “subproblema”, ni “invariante”, ni “¿qué debe quedar libre?”.

`hintLevel` en el log: 0 silencio, 1 rechazo, 2 inactividad. La **cadena de caracteres** es la misma en A, B y C. Se reporta en el paper el recuento de hints por grupo (debe ser comparable; si C recibe menos hints porque el gabinete es más fácil, se covariará `nHints`).

## Lo que nunca ocurre en TRAIN

- Nombrar pensamiento computacional, algoritmo, recursión, descomposición.
- Dictar la jugada.
- Mostrar el óptimo o un contador de movimientos al participante.
- Preguntas distintas por condición.

## Dónde sí van las preguntas de estrategia

**Después** del far transfer S1, en el debrief (igual para todos):

1. ¿Cómo decidió qué hacer primero en la mesa?
2. ¿En algún momento deshizo algo a propósito? ¿Por qué?
3. ¿Algo de la mesa le sirvió en los problemas de papel?

Eso es evidencia cualitativa, no el tratamiento. Si se quiere un estudio 2 con tutor CT explícito, se cruza material × guía; no se mezcla aquí.

## Tutorial motor (equivalencia)

Los tres grupos aprenden agarre y *snap* con **la misma** pieza del gabinete, 5 minutos, **antes** de ver Hanói, Cubo o el gabinete completo. Así la diferencia A/B vs C no es “supieron usar el mando”.
