const { app1 } = require("../config/firebase"); 

const getPagos = async (req, res) => {
  try {
    const db = app1.database(); 
    const snapshot = await db.ref("pagos").once("value");

    if (!snapshot.exists()) {
      return res.status(404).json({ message: "No hay pagos registrados" });
    }

    res.json(snapshot.val());
  } catch (error) {
    res.status(500).json({ message: "Error al obtener pagos", error: error.message });
  }
};

module.exports = { getPagos };

