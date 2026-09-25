# PlayCT en Unity 6 (Meta Quest 3)

El proyecto Unity está en esta carpeta. No hay que copiar `Assets/PlayCT/` a otro proyecto.

Editor: **6000.3.24f1** (`4e7b9b5b6244`).  
Escena: `Assets/Scenes/MesaPreparada.unity`.  
Identificador Android: `com.cenfotec.playct`.  
Pipeline: Built-in (materiales Standard de taller). OpenXR + XR Interaction Toolkit 3.6.1. Rig estacionario, sin locomoción.

## Abrir

1. Unity Hub → Installs → **Unity 6000.3.24f1** con el módulo **Android Build Support** (SDK, NDK y OpenJDK).
2. Add → Add project from disk → seleccione la carpeta `unity/` de este repositorio (no la raíz del repo).
3. La primera vez, el editor importa paquetes (XRI, OpenXR, Meta OpenXR, AR Foundation) y ejecuta `PlayCT/Configurar Quest 3`: IL2CPP, ARM64, min SDK 32, loader OpenXR en Android y features Meta Quest / Touch. Si el menú no llegó a correr, ábralo a mano: **PlayCT → Configurar Quest 3**.
4. Abra `Assets/Scenes/MesaPreparada.unity`.

## Play en el editor (sin casco)

Pulse **Play**. No hace falta copiar `session.json`.

- El inspector de `Sesion` arranca en participante `P000` y condición Hanói.
- Si existe `Application.persistentDataPath/session.json`, ese archivo pisa el inspector (`participantId` y `condition`: `hanoi`, `gabinete` o `cubo`). En el editor de Linux/macOS/Windows esa ruta es la carpeta persistente del player, no el repo.
- Ratón: clic en el disco de arriba, arrastre y suelte cerca de Origen, Apoyo o Destino. Un movimiento ilegal vuelve al poste.
- Para el gabinete, ponga la condición `gabinete` en `session.json` o en el inspector y pulse Play. La tecla **R** gira la pieza sujeta 90°. En el visor, el gatillo (activate) hace lo mismo.
- La cámara de escritorio queda en `(0, 1.58, 0)` mirando la mesa. En el visor, `InputAdapter` usa el rig y apaga ese ratón.

## Build Quest 3

En el editor, con el módulo Android instalado:

1. **PlayCT → Configurar Quest 3** (también corre al abrir el proyecto).
2. File → Build Settings → Android → Build. Salida recomendada: `unity/Build/PlayCT.apk`.
3. O desde una terminal, con el editor en el PATH:

```bash
Unity -batchmode -nographics -quit \
  -projectPath "$(pwd)/unity" \
  -buildTarget Android \
  -executeMethod PlayCT.EditorTools.QuestBuildSetup.BuildApk \
  -logFile unity/Logs/quest-build.log
```

`BuildApk` deja el APK en `unity/Build/PlayCT.apk` y termina el proceso con código 0 si el build salió bien.

Ajustes que quedan en el player: producto **PlayCT**, compañía Universidad Cenfotec, `com.cenfotec.playct`, IL2CPP, ARM64, min SDK y target SDK 32, Vulkan, color linear, stereo instancing, escena `MesaPreparada` en Build Settings. El loader OpenXR se asigna solo al grupo Android, para que Play en el editor siga en escritorio.

## Instalar en el Quest 3

El casco en modo desarrollador, cable o `adb` por red, y un solo dispositivo:

```bash
adb install -r unity/Build/PlayCT.apk
adb shell am start -n com.cenfotec.playct/com.unity3d.player.UnityPlayerGameActivity
```

Si esa actividad no existe en el build:

```bash
adb shell am start -n com.cenfotec.playct/com.unity3d.player.UnityPlayerActivity
```

Sesión opcional (el ejemplo del repo es P017 / hanoi). Lance la app una vez para que Android cree la carpeta, luego:

```bash
adb push unity/Assets/PlayCT/session.example.json \
  /sdcard/Android/data/com.cenfotec.playct/files/session.json
```

Sin ese archivo, la sesión del visor es `P000` / Hanói. Logs:

```bash
adb pull /sdcard/Android/data/com.cenfotec.playct/files/playct .
adb pull /sdcard/Android/data/com.cenfotec.playct/files/export .
```

El participante no elige condición. Quítese el visor solo cuando la tarjeta diga que puede hacerlo; ahí `SesionCierre` copia el JSONL a `export/`.

## Lo que este repositorio no hace solo

Poner el Quest en modo desarrollador, aceptar el depurador y completar el build de Android (SDK/NDK/OpenJDK) es manual. Este entorno de integración no desplegó el APK a un casco.
