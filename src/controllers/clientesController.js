const { app2 } = require("../config/firebase");

const getClientes = async (req, res) => {
  try {
    const db = app2.database();
    const snapshot = await db.ref("contactos_clientes/contactos_clientes").once("value");

    if (!snapshot.exists()) return res.status(404).json({ message: "No hay clientes registrados" });

    res.json(snapshot.val());
  } catch (error) {
    res.status(500).json({ message: "Error al obtener clientes", error: error.message });
  }
};

module.exports = { getClientes };

