const express = require('express'); // para el servidor web
const pool = require('../database/database'); // la conexión
const modeloUsuarios = require("../models/UsuariosMD.js");
const denunciaMD = require("../models/denunciaMD.js");
const router = express.Router(); // para las rutas


//metodo post para crear una denuncia
const crear_denuncia = async (req, res) => {
    const {motivo,contenido,denunciado} = req.body;
    const idUsuario = req.session.user;
   // const denunciado=pool.query("SELECT idUsuario FROM venta WHERE idVenta=?",[idVenta]);
    const denuncia = {
        idUsuario,
        motivo,
        contenido,
        denunciado:1,
        estado:false,
    };
    try {
        const respuesta = await denunciaMD.create(denuncia);
        res.json({
            message: "denuncia exitosa",
            denuncia: respuesta
        })
    }catch (error) {
        res.json({message: error.message})
    }
}



//para que el administrador vea las denuncias
const modeloDenuncias = require('../models/denunciaMD.js');

//OBTENER DENUNCIAS 
const obtenerDenuncias = async(req,res)=>{
    try {
        const denuncias = await modeloDenuncias.findAll({
            where:{
                estado:false,
            }
        })
        res.json(denuncias);
    } catch (error) {
        res.json({message: error.message});
    }
}



module.exports = {crear_denuncia,obtenerDenuncias};