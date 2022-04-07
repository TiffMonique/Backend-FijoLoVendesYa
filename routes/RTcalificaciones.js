const Express = require("express");
const unacalificacion = require("../controller/calificacionesCT.js");
const router = Express.Router();
router.get("/buscaCalificacion/:idCalificacion", unacalificacion)
//comentario
module.exports = router;