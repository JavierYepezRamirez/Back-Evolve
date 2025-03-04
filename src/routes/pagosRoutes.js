const express = require("express");
const { getPagos, editarPago, eliminarPago } = require("../controllers/pagosController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/", authMiddleware, getPagos);
router.put("/:idPago", authMiddleware, editarPago);
router.delete("/:idPago", authMiddleware, eliminarPago);

module.exports = router;
