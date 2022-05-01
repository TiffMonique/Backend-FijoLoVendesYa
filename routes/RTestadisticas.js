const express = require("express");
const { Router } = require("express");
const { authAdmin } = require("../controller/sesiones.js");
const mostrarTotales = require("../controller/EstTotalesCT.js");
const mostrarSemanales = require("../controller/EstSemanalesCT.js");
const mostrarMensuales = require("../controller/EstMensualesCT.js");
const mostrarAnuales = require("../controller/EstAnualesCT.js");

const router = Router();

//MOSTRAR LAS ESTADISTICAS EN TOTAL
router.get("/estadisticasTotales", authAdmin, mostrarTotales);
//MOSTRAR LAS ESTADISTICAS POR SEMANA
router.get("/estadisticasSemanales", authAdmin, mostrarSemanales);
//MOSTRAR LAS ESTADITSITCAS POR MES
router.get("/estadisticasMensuales", authAdmin, mostrarMensuales);
//MOSTRAR LAS ESTADISTICAS POR AÑO
router.get("/estadisticasAnuales", authAdmin, mostrarAnuales);

module.exports = router;
