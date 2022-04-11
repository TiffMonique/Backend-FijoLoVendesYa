const {Router} = require("express");
const {crearSuscripcion, eliminarSuscripcion, misSuscripciones} = require("../controller/suscripcionesCT");
const {auth} = require("../controller/sesiones");

const router=Router();

router.post('/suscribirse', crearSuscripcion);
router.delete('/desuscribirse/:idCategoria', eliminarSuscripcion);
router.get('/missuscripciones', misSuscripciones);
module.exports=router;