const inputsDefault = [
  { name: "Id", id: "id", type: "text" },
  { name: "Modelo", id: "modelo", type: "text" },
  { name: "Año de fabricación", id: "anoFab", type: "number", min: 1885 },
  { name: "Velocidad Máxima", id: "velMax", type: "number", min: 0 },
];

const inputsAir = [
  { name: "Altura Máxima", id: "altMax", type: "number", min: 0 },
  { name: "Autonomía", id: "autonomia", type: "number", min: 0 },
];

const inputsLand = [
  { name: "Cantidad Puertas", id: "cantPue", type: "number", min: -1 },
  { name: "Cantidad Ruedas", id: "cantRue", type: "number", min: 0 },
];
