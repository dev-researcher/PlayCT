# PlayCT — Laboratorio de materiales para pensamiento computacional

PlayCT es un ambiente preparado inmersivo para **estudiar la transferencia** de estrategias de pensamiento computacional (CT). No es un videojuego educativo. No enseña a resolver las Torres de Hanói ni un cubo de Rubik. Pregunta si las estrategias que emergen al trabajar con **materiales concretos en VR** siguen siendo útiles cuando cambian el problema y el medio.

El diseño pedagógico sigue principios Montessori aplicados a educación universitaria: control del error en el material, aislamiento de la dificultad, de lo concreto a lo abstracto, y una guía que pregunta en lugar de dar la solución.

**Institución:** Universidad Cenfotec, Costa Rica.  
**Idioma de la experiencia y de los instrumentos:** español.  
**Headset de laboratorio:** Meta Quest 3, sesión estacionaria.  
**Desarrollo diario:** abra el prototipo de mesa en el navegador (sin casco).

```bash
python3 -m http.server 8765
```

Luego abra [http://127.0.0.1:8765/web/](http://127.0.0.1:8765/web/). Mouse: tomar el disco de arriba y soltarlo en Origen, Apoyo o Destino. Si no corresponde, el disco vuelve.

Los otros materiales, en español y en el navegador, están en [web/juegos/](web/juegos/): Gabinete de formas, Cubo de relaciones, El Correo, Patio de carga, Fábrica en paralelo y Red de agua. Cubo, Correo, Patio, Fábrica y Red de agua llevan la marca de prototipo: el piloto de esta fase del repositorio es Hanói y Gabinete.

## Quest 3 (Unity 6)

El proyecto está en [`unity/`](unity/README.md). Editor **6000.3.24f1** con Android Build Support (SDK, NDK, OpenJDK). En Hub: Add project from disk → carpeta `unity/`. Abra `Assets/Scenes/MesaPreparada.unity` y pulse Play: Hanói con ratón, sin copiar `session.json` (`P000`). Un `session.json` en `Application.persistentDataPath` sigue teniendo prioridad.

Build (o **PlayCT → Configurar Quest 3** y File → Build Settings → Android):

```bash
Unity -batchmode -nographics -quit \
  -projectPath "$(pwd)/unity" \
  -buildTarget Android \
  -executeMethod PlayCT.EditorTools.QuestBuildSetup.BuildApk \
  -logFile unity/Logs/quest-build.log
adb install -r unity/Build/PlayCT.apk
adb shell am start -n com.cenfotec.playct/com.unity3d.player.UnityPlayerGameActivity
```

Detalle de sesión, logs y el rig estacionario: [`unity/README.md`](unity/README.md).

Hay **dos líneas**. El paper de transferencia (línea A) no usa los seis juegos ni deja elegir paquete. La plataforma (línea B) sí. Detalle: [docs/12-DOS-LINEAS.md](docs/12-DOS-LINEAS.md).

## Cómo leer este repositorio

| Documento | Qué resuelve |
| --- | --- |
| [docs/01-CONTRIBUCION.md](docs/01-CONTRIBUCION.md) | Pregunta científica, gap, lo que **no** se afirma |
| [docs/02-PROTOCOLO.md](docs/02-PROTOCOLO.md) | Diseño experimental, N, condiciones, análisis, confusor del tutor |
| [docs/03-AMBIENTE-PREPARADO.md](docs/03-AMBIENTE-PREPARADO.md) | Escena, estética, materiales, grupo control |
| [docs/04-GUIA.md](docs/04-GUIA.md) | Prompts en español, política de pistas, igualdad entre grupos |
| [docs/05-INSTRUMENTOS.md](docs/05-INSTRUMENTOS.md) | Baseline, near transfer, far transfer, Día 7 |
| [docs/06-METRICAS.md](docs/06-METRICAS.md) | Eventos, índices, fórmula preregistrada |
| [docs/07-ETICA.md](docs/07-ETICA.md) | Consentimiento, datos, cinetosis, laboratorio |
| [docs/08-PREREGISTRO.md](docs/08-PREREGISTRO.md) | Plantilla lista para OSF / AsPredicted |
| [docs/09-SOFTWARE.md](docs/09-SOFTWARE.md) | Arquitectura Unity y orden de implementación |
| [docs/10-VENUES.md](docs/10-VENUES.md) | Dónde publicar y qué ciclo **no** intentar |
| [docs/11-GUION-SESION.md](docs/11-GUION-SESION.md) | Lo que dice la persona experimentadora, minuto a minuto |
| [docs/12-DOS-LINEAS.md](docs/12-DOS-LINEAS.md) | RCT vs plataforma de 6 materiales: lo que no se mezcla |
| [docs/14-PARA-CONFERENCIA.md](docs/14-PARA-CONFERENCIA.md) | Confusor, control, far transfer, novedad vs iThinkSmart/Rubikon, checklist IEEE VR/CHI |

Proyecto Unity 6 (Quest 3, escena `MesaPreparada`): [`unity/README.md`](unity/README.md). Abra la carpeta `unity/` con Unity **6000.3.24f1**. No copie los scripts a otro proyecto.

## Decisión central

La guía es **constante**. El material **varía**.

Si hay transferencia, debe poder atribuirse a la estructura del material (Hanói, Cubo de relaciones, o Gabinete de formas), no a que un grupo recibió más instrucción verbal que otro.
