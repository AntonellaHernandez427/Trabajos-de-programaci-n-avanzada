
// Ejercicio 8: Filtrar y transformar alertas de seguridad

const dispositivosEj8 = [
  { id: 1, nombre: "PC-Desarrollo", ip: "192.168.1.5", tipo: "Estación de trabajo" },
  { id: 2, nombre: "PC-Marketing", ip: "192.168.1.7", tipo: "Estación de trabajo" },
  { id: 3, nombre: "Servidor-Web", ip: "192.168.1.10", tipo: "Servidor" },
  { id: 4, nombre: "Servidor-BD", ip: "192.168.1.11", tipo: "Servidor" }
];

const conexionesActivas = [
  { origen: "192.168.1.5", destino: "192.168.1.10", protocolo: "HTTP", bytes: 8500 },
  { origen: "192.168.1.7", destino: "192.168.1.11", protocolo: "MySQL", bytes: 12000 },
  { origen: "192.168.1.5", destino: "192.168.1.11", protocolo: "MySQL", bytes: 9200 }
];

const informeActividad = conexionesActivas.map(conexion => {
  const origenDispositivo = dispositivosEj8.find(d => d.ip === conexion.origen);
  const destinoDispositivo = dispositivosEj8.find(d => d.ip === conexion.destino);

  return {
    origen: origenDispositivo ? origenDispositivo.nombre : conexion.origen,
    destino: destinoDispositivo ? destinoDispositivo.nombre : conexion.destino,
    protocolo: conexion.protocolo,
    bytes: conexion.bytes
  };
});

const alertas = informeActividad.map(conexion => {
  let nivel = "bajo";
  if (conexion.bytes > 10000 || conexion.protocolo === "MySQL") {
    nivel = "alto";
  }
  return { ...conexion, nivel };
});

const alertasAltas = alertas
  .filter(alerta => alerta.nivel === "alto")
  .map(alerta =>
    ` Alerta ALTA: ${alerta.origen} → ${alerta.destino} | ${alerta.protocolo} (${alerta.bytes} bytes)`
  );

const ej8Content = document.getElementById("ej8-content");
alertasAltas.forEach(msg => {
  const li = document.createElement("li");
  li.textContent = msg;
  ej8Content.appendChild(li);
});

