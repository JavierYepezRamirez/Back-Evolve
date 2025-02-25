const express = require("express");
const { getClientes, updateCliente, deleteCliente, agregarCliente } = require("../controllers/clientesController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, getClientes);
router.post("/", authMiddleware, agregarCliente);
router.put("/:id", authMiddleware, updateCliente); 
router.delete("/:id", authMiddleware, deleteCliente);

module.exports = router;
