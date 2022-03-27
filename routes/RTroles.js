//OBTENEMOS ROUTER Y METODOS DEL CONTROLADOR
const {Router} = require("express");
const {ObtenerRoles} = require("../controller/rolesCT.js");

//CREAMOS NUESTRO ENRUTADOR PARA EL CONTROLADOR
const router = Router();

//------ENRUTAMIENTO PARA EL MODELO DE ROLES-------
//1. VER TODOS LOS ROLES
router.get('/todosRoles', ObtenerRoles);

module.exports = router;