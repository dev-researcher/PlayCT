# 11. Guion de sesión

Texto que dice la persona experimentadora. Tono de taller, usted, español de Costa Rica. No improvisar teoría. Si el participante pregunta “¿esto es pensamiento computacional?”, responder: *Hoy le pido que trabaje con el material y luego con unos problemas. Al final le cuento el detalle.*

No se nombra la condición. No se compara con otros.

## Antes de que llegue

1. Quest 3 cargado, IPD medio, toallitas.
2. Archivo `session.json` con `participantId` y `condition` ya asignados (randomizador).
3. Cuadernillo S1 y ficha de experiencia en el escritorio, boca abajo.
4. Agua. Silla. Reloj. Código de participante en un post-it que **no** ve la cámara del visor.

## Min 0–5 — Acogida

> Buenos días. Gracias por venir. Esto dura más o menos hora y cuarto, y en una semana hay una parte corta sin visor. Puede parar cuando quiera, sin ningún efecto en cursos ni notas.
>
> Va a firmar un consentimiento. Los movimientos del visor se guardan con un código, no con su nombre.

Entregar consentimiento. Recoger firma. Entregar código (P017).

## Min 5–15 — Baseline

> Primero, en el escritorio: una ficha breve, unas figuras para rotar, y dos problemas cortos. No es un examen. Si no está seguro, escríbalo igual.

No ayudar a resolver. Si pregunta el significado de una palabra, sí se aclara el vocabulario, no la estrategia.

## Min 15–20 — Visor

Ayudar con el visor. Ajustar.

> En la mesa va a haber un material. Si algo no corresponde, no encaja y vuelve. No hay penalización. Yo no le voy a dictar el movimiento. Puede tomarse el tiempo.

Arranca el tutorial (una pieza del gabinete). Silencio. Al terminar:

> ¿Alguna náusea, dolor de cabeza, mareo?

Si sí y es más que leve: parar. Protocolo de ética.

## Min 20–45 — Material asignado

No hablar. Si llama: *El material le va a ir indicando. Yo estoy aquí.*

A los 25 min el sistema pasa solo. Si termina antes, permanece en la mesa hasta el timebox (puede repetir presentaciones; el logger marca `complete`).

## Min 45–60 — El Correo

Transición automática. Si pregunta “¿qué pasó con lo anterior?”:

> Ahora hay otro problema en la misma mesa. Las reglas están en las tarjetas de lino.

## Min 60–75 — Far transfer

Quitar visor. Luz de la sala. Agua.

> Estos problemas son de papel. No tienen que ver con la forma de la mesa. Quince minutos. Puede dejar uno en blanco y volver.

No decir que “miden si aprendió”.

## Min 75–83 — Cierre

SSQ, carga, tres preguntas abiertas. Agradecer.

> En siete días le escribimos para quince o veinte minutos, sin visor. Mientras tanto le pedimos que no busque soluciones de Torres de Hanói ni de cubo para “prepararse”: no hace falta.

Entregar comprobante de participación si aplica.

## Día 7

Sin visor. Cuadernillo S7. Mismas reglas de silencio. Al final, debrief escrito de una página: *El estudio compara cómo distintos materiales concretos se relacionan con problemas nuevos. Si quiere saber su condición, se la diremos cuando el estudio cierre.*

## Incidentes

| Qué | Qué hacer |
| --- | --- |
| Visor se sale | Pausar log (`session_pause`), ajustar, reanudar |
| Caída de una pieza virtual “rara” | No resetear el puzzle a mano; si el estado es ilegal, `session_flag` y continuar |
| Quiere ir al baño | Pausar. El timebox se congela. |
| Reconoce Hanói en voz alta | Anotar en bitácora. No confirmar ni desmentir. Seguir. |
| Pide la solución | *En este taller no se dicta el movimiento.* |
