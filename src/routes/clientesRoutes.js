const express = require("express");
const { getClientes } = require("../controllers/clientesController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/", getClientes);

module.exports = router;