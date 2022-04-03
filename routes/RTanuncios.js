const {Router} = require("express");
const {crearAnuncio, eliminarAnuncio, actualizarAnuncio, unAnuncio, todosAnuncio, anunciosVenta} = require("../controller/anunciosCT")

const router=Router();

router.post("/crearAnuncio", crearAnuncio);
router.delete("/eliminarAnuncio/:idAnuncio", eliminarAnuncio);
router.put("/actualizarAnuncio/:idAnuncio", actualizarAnuncio);
router.get("/unAnuncio/:idAnuncio", unAnuncio);
router.get("/todosAnuncio/", todosAnuncio);
router.get("/anunciosVenta/:idVenta", anunciosVenta);

module.exports = router;