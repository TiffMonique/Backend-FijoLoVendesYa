//IMPORTAMOS EL MODELO Y LA CONEXION A LA BASE DE DATOS
const db = require('../database/db.js');
const modeloUsuarios = require('../models/UsuariosMD.js');
const modeloRoles = require('../models/RolesMD.js');
const { Sequelize } = require("sequelize");

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
        res.json({message: error.message});
    }
}

//5. ELIMINAR UN USUARIO
const eliminarUsuario = async(req,res)=>{
    try {
        const usuario = await modeloUsuarios.findAll({
            where: {
                idUsuarios: req.params.idUsuarios
            }
        });
        console.log(usuario);
        if(usuario.length>0){
            await  modeloUsuarios.destroy({
                where:{idUsuarios: req.params.idUsuarios}
        });
        res.json({ message: "Eliminado exitosamente" });   
        }else{
            res.status(401).json({message: "Ya fue eliminado" });  
        }
    } catch (error) {
        res.json({message: error.message});
    }
}


module.exports = {obtenerUsuarios, unUsuario, insertarUsuario, actualizarUsuario, eliminarUsuario};