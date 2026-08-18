# Código Unity (fase 1)

Copiar `Assets/PlayCT/` a un proyecto **Unity 6 LTS**. Instalar **XR Interaction Toolkit**. Headset: Quest 3, rig estacionario (sin locomotion).

1. Crear escena `MesaPreparada`.
2. Añadir un objeto `Sesion` con `SessionManager`, `EventLogger`, `ProtocolController`, `GuideMachine`, `SessionExporter`.
3. Mesa de Hanói: 3 `HanoiPeg` (índices 0, 1, 2) + discos `HanoiDisk` + `HanoiPuzzle`.
4. Gabinete: `GabinetePuzzle` (se activa solo en condición control).
5. En el visor, **antes** de ponérselo al participante, copiar `session.example.json` a `persistentDataPath/session.json` con el código y la condición.

Las frases están en `Guide/GuidePhrasesEs.cs`. Las etiquetas, en `UI/StringsEs.cs`. Estética: [docs/03-AMBIENTE-PREPARADO.md](../../docs/03-AMBIENTE-PREPARADO.md).

El cubo y El Correo no están en esta fase a propósito.
