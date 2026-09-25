# 9. Software

## Stack (desktop primero, casco después)

La conversación pide simular **sin casco** y luego el mismo estado en cualquier VR. La lógica de los materiales no depende de XR.

| Pieza | Elección |
| --- | --- |
| Lógica | C# en `unity/Assets/PlayCT/` (reutilizable). `InputAdapter` Desktop o XR |
| Prototipo diario | Mouse/teclado |
| Casco de laboratorio | Meta Quest 3, sesión estacionaria |
| Casco genérico | WebXR / OpenXR sobre el mismo `TaskOrchestrator` |
| Interacción VR | XR Interaction Toolkit en el build Unity |
| Locomotion | ninguna |
| Idioma de UI | español, `StringsEs` |
| Logs | JSONL local |

El RCT se corre en Quest 3. El desarrollo no espera el casco. El proyecto Unity 6 LTS ya está en `unity/` (escena `MesaPreparada`, XRI y OpenXR). Pasos de Play y de build: `unity/README.md`.

## Módulos

```
PlayCT/
  Core/           SessionManager, ProtocolController, ConditionRandomizer, ParticipantConfig
  Data/           EventLogger, PuzzleActionEvent, SessionExporter
  Interaction/    StationaryRig, SnapPlace, DiscreteRotate90
  Guide/          GuideMachine, GuidePhrasesEs
  Tasks/Hanoi/    HanoiState, HanoiPuzzle, HanoiDisk, HanoiPeg
  Tasks/Cubo/     (fase 2) CuboState, CuboMiniTarea
  Tasks/Gabinete/ GabinetePuzzle, PiezaForma
  Tasks/Correo/      (fase 1.5) RedCorreo
  Tasks/PatioCarga/  (línea B) PatioCargaState
  Tasks/Fabrica/     (línea B, no RCT)
  Tasks/RedAgua/     (línea B, no RCT)
  Assessment/        MetricsAggregator, IndiceEficiencia
  UI/                StringsEs
  Input/             DesktopInput, XrInput
```

Regla: **ningún puzzle abre un archivo**. Todos llaman `EventLogger.Emit(...)`.

## Orden de implementación (este repo ya arranca la fase 1)

1. **P0** — Core + EventLogger + Hanói + frases de guía + Gabinete mínimo + export CSV.
2. **P0.5** — ProtocolController (timeboxes) + ConditionRandomizer.
3. **P1** — El Correo + app/escritorio de far transfer (cuadernillo papel es válido en el piloto).
4. **P2** — Cubo de relaciones (mini-tareas, 90°).
5. **P3** — Replay, eye tracking, métricas de invariante.
6. **Línea B** — Patio de carga, Fábrica, Red de agua, paquetes de demo/aula. El participante del RCT no ve un menú de seis juegos.

No empezar por el cubo ni por los robots. El piloto científico se sostiene con Hanói vs Gabinete.

Paquete en `session.json`: `"package": "P1-transfer"`, `"condition": "hanoi|cubo|gabinete"`. El SessionManager no ofrece selector al participante.

## Convención de estados Hanói

Postes `O`, `A`, `D`. Listas de abajo hacia arriba, disco 1 = más pequeño.

`O:[3,2,1] A:[] D:[]` → inicio de 3 discos.  
Meta: `O:[] A:[] D:[3,2,1]`.

Un `place` es legal si el disco es el tope de origen y (destino vacío o tope destino > disco). Si no, `reject` y el disco vuelve; `valid: false`.

## Builds de laboratorio

Una escena `MesaPreparada` con el rig estacionario. El `SessionManager` no deja elegir condición al participante: lee un código de sesión que el experimentador teclea en un teclado de debug **antes** de poner el visor (o un archivo `session.json` en el dispositivo).
