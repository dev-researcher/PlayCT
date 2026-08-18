# 7. Ética y laboratorio

Estudio de educación / HCI con adultos. En Costa Rica no es investigación biomédica; no pasa por CONIS. Sí pasa por el **comité de ética institucional** de Cenfotec (o el equivalente que la universidad designe) **antes** del piloto.

## 7.1 Principios

- Participación voluntaria, 18+.
- Consentimiento informado por escrito, en español, antes de cualquier dato.
- Derecho a retirarse en cualquier momento; los datos hasta ese punto se borran si la persona lo pide.
- Ningún efecto sobre notas, matrícula ni relación con docentes.
- Sin engaño sobre riesgos. Sí se omite la hipótesis (“qué material transfiere más”) hasta el debrief escrito al final del Día 7.

## 7.2 Texto mínimo del consentimiento (para el comité)

Incluir, en lenguaje llano:

1. Qué se hace: una sesión de ~80 min con visor de realidad virtual y problemas de lápiz/pantalla; una sesión corta a los 7 días sin visor.
2. Riesgos: cansancio, mareo leve (cinetosis). Se puede parar en cuanto aparezca.
3. Beneficios: ninguno médico; contribución a investigación educativa.
4. Datos: código (P017), no el nombre, en los archivos de movimientos. La hoja de consentimiento (con nombre) se guarda **separada**.
5. Quién accede: el equipo de investigación Cenfotec. Sin venta de datos. Sin nubes públicas durante la sesión.
6. Contacto del investigador responsable y del comité.

El consentimiento **puede** decir “resolución de problemas en un ambiente virtual”. **No** debe explicar las tres condiciones ni enseñar Hanói.

## 7.3 Cinetosis y bienestar

- Tutorial de 5 min con una sola pieza. Si el SSQ breve post-tutorial supera el umbral de malestar que fije el piloto (recomendación inicial: cualquier náusea > 1 en escala 0–3), se ofrece parar.
- Sesión estacionaria: sin locomotion, sin giros de cámara artificiales.
- Silla estable, agua, pausa a demanda.
- La persona experimentadora permanece en la sala, no habla durante el trabajo salvo emergencia o petición.

## 7.4 Datos personales

| Pieza | Dónde | Identificador |
| --- | --- | --- |
| Consentimiento | Archivo físico/PDF cifrado | Nombre |
| Ficha de experiencia | `admin/` cifrado | Código |
| JSONL de VR | `data/` | Código |
| Cuadernillo far transfer | `data/` o papel escaneado | Código |
| Tabla código↔nombre | Un solo archivo offline, cifrado, no en el repo | — |

Retención: 5 años tras la publicación o según el comité. El repo Git **no** contiene datos de participantes.

Logs: no grabar voz ni cara por defecto. Si en un estudio 2 se graba replay, se pide consentimiento extra.

## 7.5 Laboratorio físico

- Meta Quest 3, correa cómoda, lentes de higiene (alcohol isopropílico entre sesiones).
- Área real 2 × 2 m despejada. El usuario no camina.
- Escritorio anexo para baseline, far transfer y Día 7.
- Una persona experimentadora por sesión (no grupos).
- Horario: máximo 4 sesiones/día para no degradar el protocolo.

## 7.6 Inclusión

- Texto en español claro; si hay estudiante de otra lengua, se evalúa caso a caso (el instrumento está validado en español).
- Si usa lentes, el Quest 3 permite gafas o IPD ajustable.
- Daltonismo: los materiales no dependen de un único canal de color (Hanói usa tamaño; el cubo usa color **y** posición; el gabinete usa forma). En el cubo, además de color, cada cara tiene una marca táctil/geométrica distinta (punto, raya, cruz, etc.) para no excluir.

## 7.7 Colegio V año y pruebas de ingreso

Quien está en último año de colegio puede participar **solo si ya tiene 18**. El consentimiento es el de adulto. No se recogen boletas oficiales de admisión. En la ficha: ¿hizo prueba de aptitud/psicométrica este año? (sí/no); puntaje autodeclarado opcional. PlayCT no es un simulacro de esas pruebas y no se usa para decidir ingreso a Cenfotec.

## 7.8 Registro

Antes del estudio principal: preregistro OSF o AsPredicted con [08-PREREGISTRO.md](08-PREREGISTRO.md). El piloto se declara como piloto en el mismo documento o en uno separado.
