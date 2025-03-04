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

// Lógica para editar el pago
const editarPago = async (req, res) => {
  const { idPago } = req.params; // Obtener el ID del pago a actualizar
  const pagoActualizado = req.body; // Obtener los datos del pago desde el cuerpo de la solicitud

  try {
    const db = app1.database();
    const pagoRef = db.ref(`pagos/${idPago}`); // Referencia al pago específico

    const snapshot = await pagoRef.once("value");

    if (!snapshot.exists()) {
      return res.status(404).json({ message: "Pago no encontrado" });
    }

    // Actualizar el pago en la base de datos
    await pagoRef.update(pagoActualizado);

    res.json({ message: "Pago actualizado exitosamente", pago: pagoActualizado });
  } catch (error) {
    console.error("Error al actualizar el pago:", error);
    res.status(500).json({ message: "Error al actualizar el pago", error: error.message });
  }
};

// Lógica para eliminar un pago
const eliminarPago = async (req, res) => {
  try {
    const { idPago } = req.params; // ID único del pago a eliminar

    const db = app1.database();
    const pagoRef = db.ref(`pagos/${idPago}`); // Referencia al pago por su ID único

    const snapshot = await pagoRef.once("value");

    if (!snapshot.exists()) {
      return res.status(404).json({ message: "Pago no encontrado" });
    }

    // Eliminamos el pago
    await pagoRef.remove();

    res.status(200).json({ message: "Pago eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el pago", error: error.message });
  }
};

module.exports = { getPagos, editarPago, eliminarPago };


