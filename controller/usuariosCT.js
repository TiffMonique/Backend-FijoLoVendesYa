//IMPORTAMOS EL MODELO Y LA CONEXION A LA BASE DE DATOS
const db = require('../database/db.js');
const modeloUsuarios = require('../models/UsuariosMD.js');
const modeloRoles = require('../models/RolesMD.js');

//-----METODOS PARA EL CRUD-----
//1. MOSTRAR TODOS LOS USUARIOS
const obtenerUsuarios = async(req,res)=>{
    try {
        const ussers = await modeloUsuarios.findAll({
            include: modeloRoles
        })
        res.json(ussers)
    } catch (error) {
        res.json({message: error.message});
    }
}

//2. OBTENER UN USUARIO
const unUsuario = async(req,res)=>{
    try {
        const ussers = await modeloUsuarios.findAll({
            include:modeloRoles,
            where:{idUsuarios: req.params.idUsuarios}
        })
        res.json(ussers);
    } catch (error) {
        res.json({message: error.message});
    }
}

//3. INSERTAR UN USUARIO
const insertarUsuario = async(req,res)=>{
    try {
        await modeloUsuarios.create(req.body);
        res.json({"Message":"Usuario registrado correctamente"});
    } catch (error) {
        res.json({message: error.message});
    }
}

//4. ACTUALIZAR UN USUARIO
const actualizarUsuario = async(req,res)=>{
    try {
        modeloUsuarios.update(req.body, {
            where:{idUsuarios: req.params.idUsuarios}
        })
        res.json({"Message":"Usuario actualizado exitosamente"})
    } catch (error) {
        
    }
}

//5. ELIMINAR UN USUARIO
const eliminarUsuario = async(req,res)=>{
    try {
        await modeloUsuarios.destroy({
            where:{idUsuarios: req.params.idUsuarios}
        })
        res.json({"Message":"Usuario borrado exitosamente"})
    } catch (error) {
        res.json({"Message":"Usuario actualizado exitosamente"})
    }
}

module.exports = {obtenerUsuarios, unUsuario, insertarUsuario, actualizarUsuario, eliminarUsuario};