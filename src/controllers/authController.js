const { app2 } = require("../config/firebase");
const generateToken = require("../utils/generateToken");

const login = async (req, res) => {
  const { usuario, contrasena } = req.body;
  try {
    const db = app2.database();
    const empleadosRef = db.ref("empleados");
    const snapshot = await empleadosRef.once("value");
    const empleados = snapshot.val();
    
    const empleado = empleados.find(e => e && e.usuario === usuario && e.cotrasena === contrasena);
    if (!empleado) return res.status(401).json({ message: "Credenciales inválidas" });

    const token = generateToken(usuario);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error });
  }
};

module.exports = { login };