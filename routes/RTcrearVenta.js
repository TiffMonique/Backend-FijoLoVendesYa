const {Router} = require("express");
const {crearVenta, eliminarVenta, actualizarVenta, listarVentas, buscarVenta, todasVentas, fotosVenta} = require("../controller/venta");
const {auth} = require("../controller/sesiones");

const router=Router();

//crear venta, debe estar autenticado
router.post('/crearVenta', auth, crearVenta);
//elimina una venta por su id, debe estar autenticado
router.delete('/eliminarVenta/:idVenta', auth, eliminarVenta);
//actualiza una venta por su id, debe estar autenticado
router.put('/editarVenta/:idVenta', auth, actualizarVenta);
//Lista las ventas un usuario, no necesita autenticarse para usarlo
router.get('/listarVenta/:idUsuario', listarVentas);
//Lista las ventas del usuario autenticado
router.get('/listarVenta/', auth, listarVentas);
//devuelve una venta por su id, no necesita autenticacion
router.get('/buscarVenta/:idVenta', buscarVenta);
//lista todas las ventas de la base de datos, no necesita autenticación
router.get('/todasVenta/', todasVentas);
// recibir los nombres de las fotos de una venta
router.get('/fotosVenta/:idVenta', fotosVenta);
module.exports=router;