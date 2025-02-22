const express = require("express");
const { getPagos } = require("../controllers/pagosController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/", getPagos);

module.exports = router;