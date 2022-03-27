const Express = require("express");
const unacalificacion = require("../controller/calificacionesCT.js");
const router = Express.Router();
router.get("/buscaCalificacion/:idCalificacion", unacalificacion)

module.exports = router;