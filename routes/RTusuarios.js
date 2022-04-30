//IMPORTAMOS ROUTER Y METODOS DEL CONTROLADOR
const {Router} = require("express");
const {obtenerUsuarios, unUsuario, insertarUsuario, actualizarUsuario, eliminarUsuario} = require("../controller/usuariosCT.js")
const {auth} = require("../controller/sesiones");

//CREAMOS NUESTRO ROUTER PARA EL CONTROLADOR
const router = Router()

//------ENRUTAMIENTO PARA EL CONTROLADOR DE USUARIOS------
//1. MOSTRAR TODOS LOS USUARIOS
router.get('/todosUsuarios',auth, obtenerUsuarios);
//2. MOSTRAR UN USUARIOS A TRAVES DE SU ID
router.get('/unUsuario/:idUsuarios', unUsuario);
//3. INSERTAR UN USUARIO
router.post('/crearUsuario', insertarUsuario);
//4. MODIFICAR UN USUARIO
router.put('/editarUsuario/:idUsuarios', actualizarUsuario);
//5. ELIMINAR UN USUARIO
router.delete('/borrarUsuario/:idUsuarios', eliminarUsuario);

module.exports = router;