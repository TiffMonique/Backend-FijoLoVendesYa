const express = require("express");
const { Router } = require("express");
const mostrarTotales = require("../controller/EstTotalesCT.js");
const mostrarSemanales = require("../controller/EstSemanalesCT.js");
const mostrarMensuales = require("../controller/EstMensualesCT.js");
const mostrarAnuales = require("../controller/EstAnualesCT.js");
const router = Router();

//MOSTRAR LAS ESTADISTICAS EN TOTAL
router.get("/estadisticasTotales", mostrarTotales);
//MOSTRAR LAS ESTADISTICAS POR SEMANA
router.get("/estadisticasSemanales", mostrarSemanales);
//MOSTRAR LAS ESTADITSITCAS POR MES
router.get("/estadisticasMensuales", mostrarMensuales);
//MOSTRAR LAS ESTADISTICAS POR AÑO
router.get("/estadisticasAnuales", mostrarAnuales);

module.exports = router;