const { Sequelize } = require("sequelize");
const anunciosMD = require("../models/anunciosMD.js")
const ventasMD = require("../models/VentasMD.js");
const modeloUsuarios = require("../models/UsuariosMD.js");
const path = require('path');
const { date } = require("yup");

//crear anuncio
const crearAnuncio = async(req, res) => {
    const { idVenta, descripcion } = req.body;
    const now = new Date();
    const fechaInicio = now.getTime();
    const dias = 1;
    const fechaFin = fechaInicio + 864000*dias;
    console.log(fechaFin);
    const anuncio = {idVenta, descripcion, fechaInicio, fechaFin}
    try {
        const respuesta = await anunciosMD.create(anuncio);
        res.status(200).json({
        message: "Anuncio creado correctamente",
        venta: respuesta,
        });
    }catch(error) {
        res.status(400).json({ message: error.message });
    }
}

const eliminarAnuncio = async(req, res) => {
    const idAnuncio = req.params.idAnuncio;
    try {
        respuesta = await anunciosMD.destroy({ where: {idAnncio : idAnuncio}})
        res.status(200).json({message: "Anuncio eliminado correctamente"})
    }catch(err) {
        res.status(400).json({message: err.message})
    }
}

module.exports = {
    crearAnuncio,
    eliminarAnuncio
}