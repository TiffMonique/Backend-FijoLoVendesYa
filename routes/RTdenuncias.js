const {Router} = require("express");
const {authAdmin} = require("../controller/sesiones");

const {crear_denuncia,obtenerDenuncias} = require("../controller/denuncia")

const router=Router();

router.post('/creardenuncia',crear_denuncia);
router.get('/obtenerdenuncias',authAdmin,obtenerDenuncias);


module.exports=router;