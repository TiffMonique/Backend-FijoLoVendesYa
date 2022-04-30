const {Router} = require("express");
const {obtenerFavoritos,unFavorito,insertarFavorito,eliminarFavorito,} = require("../controller/favoritos");
const {auth} = require("../controller/sesiones");

const router=Router();

router.get('/obtenerFavoritos',obtenerFavoritos);
router.get('/obtenerUnFavorito/:idLista',unFavorito);
router.post('/agregarFavorito', insertarFavorito);
router.delete('/eliminarFavorito/:idLista',eliminarFavorito);

module.exports=router;