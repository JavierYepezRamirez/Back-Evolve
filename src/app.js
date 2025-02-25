require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const clientesRoutes = require("./routes/clientesRoutes");
const pagosRoutes = require("./routes/pagosRoutes");

const app = express();
app.use(express.json());

const corsOptions = {
  origin: 'https://evolvepagos.netlify.app', // Permite solicitudes desde tu frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  credentials: true, // Permite enviar cookies si es necesario
};

app.use(cors(corsOptions));

app.use("/api/auth", authRoutes);
app.use("/api/clientes", clientesRoutes);
app.use("/api/pagos", pagosRoutes); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
