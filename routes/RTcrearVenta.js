const {Router} = require("express");
const {crearVenta, 
    eliminarVenta, 
    actualizarVenta, 
    listarVentas, 
    buscarVenta, 
    todasVentas, 
    fotosVenta, 
    unaFoto, 
    busqueda,
    ultimasVentas
} = require("../controller/venta");
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
router.get('/unaFoto/:idVenta/:indice', unaFoto);
//realiza la bisqueda de ventas con palabras clave, por categorías y por precio y departamento
//la peticion debe tener la forma http://localhost:4000/api/tienda/buscar?busqueda=palabras clave&categoria=nombrecategoria&departamento=departamento&precioMin=10&precioMax=100
//todos los parametros son opcionales
router.get('/buscar', busqueda);
<<<<<<< Updated upstream
router.get('/ultimasVentas', ultimasVentas);
=======

>>>>>>> Stashed changes
module.exports=router;