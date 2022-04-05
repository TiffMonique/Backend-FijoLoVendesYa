const {Router} = require("express");
const {auth} = require("../controller/sesiones.js")
const {subirFotos, elimiarFoto} = require("../controller/fotosCT.js")

const router=Router();

router.post('/subirFotos/:idVenta', auth, subirFotos);
router.delete('/borrarFoto/:nombreFoto', auth, elimiarFoto);

module.exports=router;