# 6. Métricas y Índice de Eficiencia Estratégica

Los puzzles no escriben CSV. Emiten eventos. El `EventLogger` los guarda en JSONL. Las métricas se derivan después. Así se puede reconstruir la sesión y cambiar una fórmula sin volver a grabar.

## 6.1 Evento canónico

```json
{
  "timestamp": "2026-10-12T14:03:22.401-06:00",
  "sessionMs": 81203,
  "participantId": "P017",
  "condition": "hanoi",
  "taskId": "hanoi_p2",
  "trialId": 1,
  "actionType": "place",
  "objectId": "disco_3",
  "fromState": "O:[5,4,3,2] A:[1] D:[]",
  "toState": "O:[5,4,3] A:[1,2] D:[]",
  "valid": true,
  "hintLevel": 0,
  "elapsedTrialMs": 14022
}
```

`actionType` cerrado: `grab | place | rotate | reject | undo | hint | task_start | task_end`.

`condition`: `hanoi | cubo | gabinete`.

`participantId` es un código aleatorio. Nunca el nombre.

Hanói añade: `disco`, `posteOrigen`, `posteDestino`.  
Cubo añade: `cara`, `grados` (siempre 90 o −90), hash de 54 stickers.  
Gabinete añade: `pieza`, `hueco`, `rotacion`.  
Correo añade: `paquete`, `camino`, `carga`.

## 6.2 Métricas por material

### Hanói

| Métrica | Definición |
| --- | --- |
| `moves` | colocaciones válidas |
| `excess` | `(moves − óptimo) / óptimo`, recortado a [0, 1] |
| `invalidRate` | rechazos / (rechazos + válidas) |
| `revisitRate` | estados repetidos / estados únicos, recortado a [0, 1] |
| `backtrack` | acciones que vuelven al estado inmediatamente anterior |
| `planMs` | milisegundos hasta la primera `grab` del trial |
| `hints` | eventos `hint` de nivel ≥ 1 |
| `complete` | 1 si la torre quedó en Destino |

Óptimos: 3 discos = 7, 4 = 15, 5 = 31.

### Cubo

| Métrica | Definición |
| --- | --- |
| `rotations` | giros de 90° |
| `undoRate` | giros que invierten el inmediatamente anterior |
| `revisitRate` | hashes de cubo repetidos |
| `invariantKept` | 1 si la mini-tarea 2 no rompió la relación pedida |
| `predictMatch` | 1 si el estado post-giro coincide con la predicción marcada |
| `planMs` | hasta el primer giro de la mini-tarea |

No hay “óptimo mundial” del cubo resuelto: cada mini-tarea declara un óptimo local (p. ej. cruz en ≤ 8 giros). Si no se alcanza, `excess` se recorta a 1.

### Gabinete (control)

Mismas columnas de proceso: `moves`, `invalidRate`, `planMs`, `hints`, `complete`.  
`excess` usa el mínimo de colocaciones = número de piezas (cada una una vez).  
No se calcula `invariantKept` ni `predictMatch` (no aplican). El IEE del control sirve para H3 **dentro** de C y para describir proceso, no para afirmar que C entrenó CT.

### El Correo

Ver puntaje 0–12 en [05-INSTRUMENTOS.md](05-INSTRUMENTOS.md). Además: envíos inválidos, revisitas de configuración de paquetes, `planMs`.

## 6.3 Índice de Eficiencia Estratégica (IEE)

Se calcula **por presentación** y se promedia ponderado por duración en el bloque de 25 min. Rango [0, 1]. Más alto = más sistemático.

Componentes, todos en [0, 1]:

| Símbolo | Fórmula | Qué intenta captar |
| --- | --- | --- |
| Q | `1 − excess` | no inflar acciones |
| R | `1 − revisitRate` | no circular |
| V | `1 − invalidRate` | respetar el material |
| P | planificación | no actuar a ciegas |
| S | submetas | cerrar el trabajo de la presentación |

**Planificación P.** Una pausa de 2–10 s antes de la primera acción se considera planificación. Menos de 2 s = impulsivo. Más de 10 s no suma extra (puede ser distracción).

```
P = clamp( (planMs − 2000) / 8000 , 0, 1 )
```

**Submetas S.** Hanói: disco más grande en Destino = 1, si no 0, para esa presentación (es la meta estructural). Cubo: mini-tarea cumplida = 1. Gabinete: todas las piezas encajadas = 1. Si el tiempo se acaba, S = piezas/submetas logradas.

**Pesos preregistrados:**

```
IEE = 0.30 Q + 0.20 R + 0.20 V + 0.15 P + 0.15 S
```

El piloto puede ajustar pesos **dentro de ±0.05** y re-preregistrar. No se buscan pesos que maximicen H1 sobre el estudio principal (p-hacking).

H3 usa el IEE del bloque de entrenamiento (no el del Correo) como predictor de far transfer S1.

## 6.4 Eye tracking (fuera del camino crítico)

Si el Quest Pro / hardware equivalente está disponible en una submuestra:

- duración de fijación
- transiciones entre AOI (postes, cubo, tablero)
- mirada anticipatoria al destino **antes** de `grab`

Uso: distinguir planificación vs ensayo-error, **exploratorio**. No se afirma que la mirada sea pensamiento computacional. El estudio principal **no** depende de esto.

## 6.5 Export

Al cerrar sesión: `data/P017.jsonl` + `data/P017_summary.csv` (una fila: outcomes, IEE, covariables). El summary lo escribe el exporter, no el puzzle.
