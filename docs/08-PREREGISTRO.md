# 8. Preregistro (listo para copiar a OSF / AsPredicted)

Título: From Concrete to Abstract: Cross-Task Transfer of Computational Thinking Strategies from Montessori-Inspired Immersive Materials.

Autores: [completar]. Afiliación: Universidad Cenfotec, Costa Rica.

## Hipótesis

H1. Material CT (Hanói o Cubo) > control Gabinete en far transfer S1, con covariables PreCT, Espacial, Programación.

H2. Hanói y Cubo no se preregistran como distinto en el **total**; se preregistra que los **perfiles por ítem** diferirán: Hanói mejor relativo en S1-1 y S1-3 (orden, dependencias); Cubo mejor relativo en S1-5 y S1-6 (patrón, invariante). Contraste A vs B en el total es descriptivo.

H3. IEE de entrenamiento predice far transfer S1.

H4. El patrón de H1 se observa, atenuado, en S7.

## Variables

- Independiente: condición {hanoi, cubo, gabinete}, between-subjects.
- Dependiente primaria: FarTransfer_S1 (0–18).
- Dependientes secundarias: NearCorreo (0–12), IEE [0,1], FarTransfer_S7 (0–18).
- Covariables: PreCT (0–6), Espacial (0–8), Programación (0–3).

## Diseño

Aleatorización estratificada por Programación (0–1 vs 2–3). N objetivo 180 (60/celda). Criterio de exclusión: speedcube = 3. Idioma español. VR estacionaria.

Régimen de guía **idéntico** en las tres condiciones (docs/04-GUIA.md). El tratamiento es el material, no la instrucción.

## Análisis principal

OLS o ANCOVA: `FarTransfer_S1 ~ Condicion + PreCT + Espacial + Programacion`.

Contrastes: A–C, B–C, A–B. IC 95%, p, tamaño de efecto.

H3: añadir IEE. Exploratorio: IEE × Condición.

Múltiples ítems: modelo mixto con (1|participante) + (1|ítem), si el comité de análisis lo prefiere al OLS; **decisión en el piloto**, una sola, preregistrada para el principal.

## Tamaño muestral

f = 0.25, α = .05, power = .80 → ~158. Recolectar 180. Parada: al llegar a 180 completos en S1, o fecha límite [completar], lo que ocurra primero. No se hace p-hacking de “un participante más”.

## Qué se considerará apoyo

H1 apoyada si A–C o B–C es positivo en S1 en la dirección esperada, IC 95% que no incluye 0, con covariables. H2 apoyada si la interacción condición × familia de ítems (dependencias {S1-1,S1-3} vs patrones {S1-5,S1-6}) es significativa. H3: coeficiente de IEE > 0, IC que no incluye 0. H4: mismo signo que H1 en S7.

## Qué no se hará

- No cambiar el outcome primario a tiempo o a score de Hanói.
- No excluir outliers de far transfer post hoc salvo error de protocolo documentado.
- No mirar H1 en el piloto y detener el principal si “ya salió”.
- No afirmar que gaze es CT.

## Datos

JSONL por participante + summary CSV. Código, no nombre. Repo de software sin datos. Este preregistro se congela antes de la primera sesión del estudio **principal**.
