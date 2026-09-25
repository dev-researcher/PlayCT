/** Red de agua. Demanda estable: no hay una sola disposición. Prototipo de la línea B. */

export const MODULOS = [
  { id: "FUENTE", nombre: "Fuente" },
  { id: "BOMBA", nombre: "Bomba" },
  { id: "TANQUE", nombre: "Tanque" },
  { id: "VALVULA", nombre: "Válvula" },
  { id: "TUBERIA", nombre: "Tubería" },
  { id: "SENSOR", nombre: "Sensor" },
  { id: "ZONA", nombre: "Zona" },
];

export const RANURAS = 6;

export function simular(ranuras, valvulaAbierta, prediccion, supuestos) {
  const linea = ranuras.filter(Boolean);
  const iFuente = linea.indexOf("FUENTE");
  const iZona = linea.indexOf("ZONA");
  const fallo = (motivo, nivel) => ({
    nivel,
    zona: false,
    coincide: prediccion === nivel,
    exito: false,
    motivo,
  });
  if (iFuente < 0 || iZona < 0 || iFuente >= iZona) {
    return fallo("La zona no queda aguas abajo de la fuente.", "bajo");
  }
  const camino = linea.slice(iFuente, iZona + 1);
  const tiene = (id) => camino.includes(id);
  if (!tiene("BOMBA") || !tiene("TANQUE") || !tiene("TUBERIA") || !tiene("VALVULA")) {
    return fallo("En el tramo falta un módulo que el agua tiene que cruzar.", "bajo");
  }
  if (!valvulaAbierta) {
    return fallo("La válvula corta el paso. El tanque sube y la zona sigue seca.", "alto");
  }
  const nivel = "medio";
  const coincide = prediccion === nivel;
  if (!supuestos.length) {
    return {
      nivel,
      zona: true,
      coincide,
      exito: false,
      motivo: "La zona recibe agua, pero el modelo no declara qué está ignorando.",
    };
  }
  if (!coincide) {
    return {
      nivel,
      zona: true,
      coincide: false,
      exito: false,
      motivo: "La zona recibe agua y el nivel queda en medio. No coincide con la predicción.",
    };
  }
  return {
    nivel,
    zona: true,
    coincide: true,
    exito: true,
    motivo: "La zona recibe agua. El nivel queda en medio, como la predicción.",
  };
}
