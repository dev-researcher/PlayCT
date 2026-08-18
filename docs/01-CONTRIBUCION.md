# 1. Contribución científica

## Título de trabajo

**Español:** De lo concreto a lo abstracto: ¿se transfieren las estrategias de pensamiento computacional desde materiales inmersivos tipo Montessori a problemas nuevos?

**Inglés (venue HCI/VR):** From Concrete to Abstract: Cross-Task Transfer of Computational Thinking Strategies from Montessori-Inspired Immersive Materials

**Inglés (venue IEEE VR, énfasis en interacción):** TRANSFER-CT: Embodied Puzzle Materials, Control of Error, and Cross-Medium Transfer of Computational Strategies

La palabra que hay que defender es **transferencia**, no “VR educa”.

La conversación posterior (Cargo Yard, Swarm Factory, HydroGrid, paquetes, afecto) **no entra en este paper**. Es la línea B de plataforma. Mezclar seis juegos a elección del participante destruye el RCT. Ver [12-DOS-LINEAS.md](12-DOS-LINEAS.md).

## Pregunta que el paper responde

> ¿Las estrategias computacionales que emergen al trabajar con un material concreto, con control del error y sin que la guía entregue la solución, siguen siendo útiles cuando cambian la representación del problema y el medio de interacción?

Eso une tres piezas que por separado ya existen, y juntas aún no:

1. Materiales de Hanói / Rubik para practicar CT.
2. VR inmersiva para problem solving.
3. La progresión Montessori **concreto → abstracto** como teoría de transferencia, no como estética infantil.

## Lo que ya no es novedad (no construir el paper sobre esto)

- Implementar Torres de Hanói en VR para enseñar recursión o CT. Ya hay aplicaciones y estudios.
- Un tutor que enseña a armar un Rubik (p. ej. Rubikon en AR). Ya mostró ganancia sobre tutoriales tradicionales **en la tarea del cubo**.
- Afirmar que “VR mejora el pensamiento computacional” porque el estudiante mejora **en el mismo puzzle que practicó**. Eso es dominio, no transferencia.

## Lo que sí es contribución

**Diferentes materiales inmersivos pueden inducir perfiles distintos de estrategia computacional, y esos perfiles pueden diferir en cómo se transfieren a problemas que no se parecen al entrenamiento y que ocurren fuera de VR.**

Aportes concretos, en este orden de importancia:

1. **Evidencia de transferencia cruzada de tarea y de medio** (VR → escritorio), no solo de maestría del puzzle.
2. **Control experimental defendible:** tres condiciones, between-subjects, control activo con el **mismo régimen de guía**.
3. **Proceso, no solo producto:** logs de acciones para un índice de eficiencia estratégica preregistrado, y su relación con el far transfer.
4. **Principio de diseño:** control del error en el material (Montessori) en lugar de un HUD de “ERROR” o un tutor que dicta el movimiento. Eso es argumentable en IEEE VR / CHI como contribución de interacción, no solo educativa.

## Afirmaciones permitidas y prohibidas

| Prohibido | Permitido |
| --- | --- |
| El Rubik desarrolla pensamiento computacional. | El desempeño y la evidencia conductual fueron consistentes con el uso de estrategias CT específicas. |
| Hanói mide pensamiento computacional. | El material de Hanói privilegió descomposición y planificación jerárquica en esta muestra. |
| VR mejora CT. | La intervención produjo evidencia de transferencia cruzada de tarea en la población evaluada. |
| La mirada (gaze) es CT. | El eye tracking, si existe, se usa de forma exploratoria para distinguir planificación de ensayo-error. |

## Marco (corto, para el related work)

- **Pensamiento computacional:** descomposición, abstracción, reconocimiento de patrones, diseño algorítmico, evaluación. No se enseña el vocabulario al participante durante el entrenamiento; se opera sobre el material.
- **Transferencia:** near (mismo medio, problema distinto) y far (otro medio, problema distinto). El outcome primario es far.
- **Montessori en educación superior:** no “casa de niños”. Ambiente preparado para adultos: materiales serios, libertad dentro de límites, control del error, aislamiento de la dificultad, guía que observa y pregunta.
- **Cognición embodied:** la hipótesis no es “la inmersión motiva”. Es que **la estructura física del material** (restricciones, invariantes, subproblemas) induce estrategias que luego pueden abstraerse.

## Resultado que haría al paper interesante aunque sea nulo

Un nulo bien medido también publica: si el entrenamiento mejora el puzzle y **no** el far transfer, eso documenta el límite que la literatura educativa VR suele ignorar. El diseño está hecho para poder afirmar eso con limpieza, no solo para “ganar”.
