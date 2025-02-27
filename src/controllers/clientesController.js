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

const agregarCliente = async (req, res) => {
  const nuevosDatos = req.body;

  if (!nuevosDatos || !nuevosDatos.nombre || !nuevosDatos.telefono) {
    return res.status(400).json({ message: "Los datos del cliente son requeridos" });
  }

  try {
    const db = app2.database();
    const clienteRef = db.ref("contactos_clientes/contactos_clientes");

    const snapshot = await clienteRef.once("value");
    let maxId = -1; 

    snapshot.forEach(cliente => {
      const clienteData = cliente.val();
      if (clienteData.id) {
        const currentId = parseInt(clienteData.id);
        if (currentId > maxId) {
          maxId = currentId;
        }
      }
    });


    const nuevoId = maxId + 1;
    nuevosDatos.id = nuevoId.toString(); 

    await clienteRef.child(nuevoId).set(nuevosDatos); 

    res.status(201).json({ message: "Cliente agregado correctamente", id: nuevoId });
  } catch (error) {
    res.status(500).json({ message: "Error al agregar cliente", error: error.message });
  }
};

const updateCliente = async (req, res) => {
  const { id } = req.params;
  const nuevosDatos = req.body;

  if (!id || !nuevosDatos) {
    return res.status(400).json({ message: "ID y datos del cliente son requeridos" });
  }

  try {
    const db = app2.database();
    const clienteRef = db.ref(`contactos_clientes/contactos_clientes/${id}`);

    const snapshot = await clienteRef.once("value");
    if (!snapshot.exists()) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }

    await clienteRef.update(nuevosDatos);

    res.json({ message: "Cliente actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar cliente", error: error.message });
  }
};


const deleteCliente = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "ID del cliente es requerido" });
  }

  try {
    const db = app2.database();
    const clienteRef = db.ref(`contactos_clientes/contactos_clientes/${id}`);

    const snapshot = await clienteRef.once("value");
    if (!snapshot.exists()) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }

    await clienteRef.remove();

    res.json({ message: "Cliente eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar cliente", error: error.message });
  }
};

module.exports = { getClientes, agregarCliente, updateCliente, deleteCliente };





