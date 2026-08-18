# 13. Seis materiales — especificación de plataforma

Estética: la misma mesa de roble. Un material a la vez. Español. Control del error en el objeto, no en un HUD. Sin locomoción. Nombres de taller, no de arcade.

El RCT (línea A) solo usa Hanói, Cubo, Gabinete, Correo. Esto documenta la línea B.

## 1. Hanói — ya especificado

[03-AMBIENTE-PREPARADO.md](03-AMBIENTE-PREPARADO.md). Grab → snap. 3 / 4 / 5 discos.

## 2. Cubo de relaciones — ya especificado

Giros de 90°. Mini-tareas. No el cubo completo.

## 3. El Correo — already near transfer

[05-INSTRUMENTOS.md](05-INSTRUMENTOS.md). Grafo A–E, capacidades físicas.

## 4. Patio de carga (Block Relocation)

Problema real de investigación de operaciones: *container / block relocation*. Poco conocido por estudiantes. Visual: cajas numeradas en 3–5 pilas. Orden de salida 1, 2, 3…

Regla del material: solo la caja de **arriba** de cada pila se puede tomar. Si no es la siguiente del pedido, hay que **reubicarla** en otra pila. Control del error: no se extrae una caja enterrada.

| Presentación | Pilas | Cajas |
| --- | --- | --- |
| 1 | 3 | 6 |
| 2 | 4 | 8 |
| 3 | 4–5 | 10–12 |

Métricas propias: `relocations`, `excessRelocations` (vs. cota o solver del layout), `futureBlockingErrors` (colocar una caja sobre otra de menor número que aún no ha salido).

Interacción idéntica a Hanói: grab, move, snap. Desktop: click-and-drop. VR: mando o ray.

**No usar como near transfer del grupo Hanói.** Ver [12-DOS-LINEAS.md](12-DOS-LINEAS.md).

## 5. Fábrica en paralelo (Swarm)

No se maneja el robot a mano. Se componen tarjetas de lino sobre la mesa:

`AVANZAR` `GIRAR` `TOMAR` `SOLTAR` `REPETIR n` `SI` `SI NO` `ESPERAR` `SEÑAL`

Luego **Ejecutar todos**. Tres robots corren a la vez. Recurso compartido (un cargador, una puerta): si dos llegan, el material no permite el doble uso (control del error físico: el hueco del cargador solo admite un robot).

Niveles: (1) un robot y descubrir `REPETIR`; (2) dos robots a la vez; (3) recurso compartido; (4) `ESPERAR` / `SEÑAL`; (5) pipeline.

Métricas: `loopUsage`, `instructionCompressionRatio` (acciones conceptuales / tarjetas usadas), `parallelUtilization`, `robotIdleTime`, `sequentialBiasMs` (tiempo hasta usar el segundo robot).

Esto es **programación explícita**. Guía: misma máquina de silencio, pero el material ahora *es* el lenguaje. No se usa en el RCT A.

## 6. Red de agua (HydroGrid)

Mesa con módulos: `FUENTE` `BOMBA` `TANQUE` `VALVULA` `TUBERIA` `SENSOR` `ZONA`. El participante arma un modelo, marca supuestos (qué ignora), predice un nivel, **Simular**, ve el desajuste, modifica.

Niveles: demanda estable; pico; falla de bomba; varios escenarios con el mismo modelo.

Métricas: `modulesCreated`, `modulesReused`, `relevantFeatureRatio`, `predictionError`, `simulationRuns`, `scenarioSuccessRate`.

No hay una sola solución correcta. Eso es deliberado: diseño de sistemas, no puzzle.

Identidad local opcional (misma lógica): agua, electricidad o transporte en Costa Rica. No cambia el experimento.

## Desktop → WebXR

```
Session → InputAdapter (Desktop | XR) → TaskOrchestrator → Material → EventLogger
```

Un `TaskId` por material. El orchestrator carga el paquete asignado. Métricas y JSONL no cambian con el input.

Botones de laboratorio (solo experimentador, no el participante del RCT):

- Escritorio
- Entrar a VR (WebXR)

## Afecto post-material (4 ítems, 1–7)

Ver [12-DOS-LINEAS.md](12-DOS-LINEAS.md). Se emite un evento `affect` con los cuatro enteros. No se muestra al participante un “puntaje de felicidad”.
