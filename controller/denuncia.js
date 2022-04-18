const express = require('express'); // para el servidor web
const pool = require('../database/database'); // la conexión
const denunciaMD = require("../models/denunciaMD.js");
const router = express.Router(); // para las rutas


//metodo post para crear una denuncia
const crear_denuncia = async (req, res) => {
    const {motivo,contenido,idVenta} = req.body;
    const idUsuario = req.session.user;
    console.log(req.body);
    const  denunciado= await pool.query('SELECT idUsuario FROM venta WHERE idVenta=?',[idVenta]);
    const denuncia = {
        idUsuario,
        motivo,
        contenido,
        denunciado: denunciado[0].idUsuario
    };
    console.log(denunciado);
    console.log(denuncia);
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
        const denuncias = await modeloDenuncias.findAll();
        res.json(denuncias);
    } catch (error) {
        res.json({message: error.message});
    }
}
  

//ELIMINAR UNA DENUNCIA
const eliminarDenuncia = async (req, res) => {
    try {
      await modeloDenuncias.destroy({
        where: { 
            idDenuncia: req.params.idDenuncia 
        }
      });
      res.json({ message: "Denuncia eliminada correctamente" });
    } catch (error) {
      res.status(400)
        .json({ message: "Ha ocurrido un error", error: error.message });
    }
};



module.exports = {crear_denuncia,obtenerDenuncias,eliminarDenuncia};