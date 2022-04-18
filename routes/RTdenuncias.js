const {Router} = require("express");
const {authAdmin} = require("../controller/sesiones");

const {crear_denuncia,obtenerDenuncias,eliminarDenuncia} = require("../controller/denuncia")

const router=Router();

router.post('/creardenuncia',crear_denuncia);
router.get('/obtenerdenuncias',authAdmin,obtenerDenuncias);
router.delete('/eliminardenuncia/:idDenuncia',authAdmin,eliminarDenuncia);


module.exports=router;