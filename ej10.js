
// Ejercicio 10: Analizar y optimizar topología de red

const topologiaRed = {
  nodos: [
    { id: "A", tipo: "Router", ubicacion: "Planta 1" },
    { id: "B", tipo: "Switch", ubicacion: "Planta 1" },
    { id: "C", tipo: "Switch", ubicacion: "Planta 2" },
    { id: "D", tipo: "Switch", ubicacion: "Planta 3" },
    { id: "E", tipo: "Router", ubicacion: "Planta 3" }
  ],
  conexiones: [
    { origen: "A", destino: "B", ancho_banda: 1000 },
    { origen: "A", destino: "C", ancho_banda: 1000 },
    { origen: "B", destino: "C", ancho_banda: 100 },
    { origen: "B", destino: "D", ancho_banda: 100 },
    { origen: "C", destino: "D", ancho_banda: 100 },
    { origen: "C", destino: "E", ancho_banda: 1000 },
    { origen: "D", destino: "E", ancho_banda: 1000 }
  ]
};

const conexionesPorNodo = {};
topologiaRed.nodos.forEach(nodo => {
  conexionesPorNodo[nodo.id] = 0;
});

topologiaRed.conexiones.forEach(conexion => {
  conexionesPorNodo[conexion.origen]++;
  conexionesPorNodo[conexion.destino]++;
});

const nodosOrdenados = Object.entries(conexionesPorNodo)
  .sort((a, b) => b[1] - a[1]);

const sugerencias = [];
nodosOrdenados.forEach(([nodo, conexiones]) => {
  if (conexiones > 2) {
    sugerencias.push(
      `El nodo ${nodo} tiene ${conexiones} conexiones. ⚠️ Considera aumentar su ancho de banda o balancear carga.`
    );
  }
});

const ej10Content = document.getElementById("ej10-content");

const listaConexiones = document.createElement("ul");
for (let nodo in conexionesPorNodo) {
  const li = document.createElement("li");
  li.textContent = `Nodo ${nodo}: ${conexionesPorNodo[nodo]} conexiones`;
  listaConexiones.appendChild(li);
}
ej10Content.appendChild(listaConexiones);

const listaSugerencias = document.createElement("ul");
sugerencias.forEach(sug => {
  const li = document.createElement("li");
  li.textContent = sug;
  listaSugerencias.appendChild(li);
});
ej10Content.appendChild(listaSugerencias);

console.log("Conexiones por nodo:", conexionesPorNodo);
console.log("Nodos ordenados por número de conexiones:", nodosOrdenados);
console.log("Sugerencias de optimización:", sugerencias);

