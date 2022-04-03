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
    const dias = 60;
    const fechaFin = fechaInicio + 86400000*dias;
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
        await anunciosMD.destroy({ where: {idAnncio : idAnuncio}})
        res.status(200).json({message: "Anuncio eliminado correctamente"})
    }catch(err) {
        res.status(400).json({message: err.message})
    }
}

const actualizarAnuncio = async(req, res) => {
    const idAnuncio = req.params.idAnuncio;
    const descripcion = req.body.descripcion;
    const anuncio = {
        descripcion:descripcion
    }
    try {
        await anunciosMD.update(anuncio, {where: { idAnncio: idAnuncio }});
        res.status(200).json({message: "Anuncio actualizado correctamente"});
    } catch (err) {
        res.status(400).json({message: err.message})
    }
}

const unAnuncio = async (req, res) => {
    const idAnuncio = req.params.idAnuncio;
    try{
        const anuncio = await anunciosMD.findAll({where: { idAnncio: idAnuncio }});
        if (anuncio.length>0) {
            res.status(200).json(anuncio[0]);
        } else {
            res.status(400).json({message: "No se encontró el anuncio"})
        }
        
    } catch (err) {
        res.status(400).json({message: err.message})
    }
}

const todosAnuncio = async (req, res) => {
    const idAnuncio = req.params.idAnuncio;
    try{
        const anuncios = await anunciosMD.findAll();
        if (anuncios.length>0) {
            res.status(200).json(anuncios);
        } else {
            res.status(400).json({message: "No se encontró ningún anuncio"})
        }
    } catch (err) {
        res.status(400).json({message: err.message})
    }
}

const anunciosVenta = async (req, res) => {
    const idVenta = req.params.idVenta;
    try{
        const anuncios = await anunciosMD.findAll({where: { idVenta: idVenta }});
        if (anuncios.length>0) {
            res.status(200).json(anuncios);
        } else {
            res.status(400).json({message: "No se encontró ningún anuncio"})
        }
    } catch (err) {
        res.status(400).json({message: err.message})
    }
}
module.exports = {
    crearAnuncio,
    eliminarAnuncio,
    actualizarAnuncio,
    unAnuncio,
    todosAnuncio,
    anunciosVenta
}