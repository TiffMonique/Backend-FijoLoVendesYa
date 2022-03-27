//IMPORTAMOS EL MODELO Y LA CONEXION CON SEQUELIZE
const db = require('../database/db.js')
const modeloRoles = require('../models/RolesMD.js')

//-------METODOS PARA EL CRUD DE ROLES--------
//1. OBTENER TODOS LOS ROLES
const ObtenerRoles = async(req,res)=>{
    try {
        const rols = await modeloRoles.findAll();
        res.json(rols);
    } catch (error) {
        res.json({message: error.message});
    }
}

module.exports = {ObtenerRoles};