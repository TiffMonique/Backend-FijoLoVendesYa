const Express = require("express");
const { unacalificacion, calificar }= require("../controller/calificacionesCT.js");
const { auth } = require('../controller/sesiones')
const router = Express.Router();
router.get("/buscaCalificacion/:idCalificacion", unacalificacion);
router.post("/calificar", auth, calificar);

module.exports = router;