const {Router} = require("express");
const {crearAnuncio, eliminarAnuncio} = require("../controller/anunciosCT")

const router=Router();

router.post("/crearAnuncio", crearAnuncio);
router.delete("/eliminarAnuncio/:idAnuncio", eliminarAnuncio);

module.exports = router;