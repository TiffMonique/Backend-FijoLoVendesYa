const db = require("../database/db.js");
const modeloTotales = require("../models/estTotalesMD.js");

//OBTENER TODOS LOS REGISTROS - SOLO HAY UNO EN TOTALES
const mostrarTotales = async(req, res)=>{
    try {
        const totales = await modeloTotales.findAll();
        res.json(totales);
    } catch (error) {
        res.json({ message: error.message });
    }
}

module.exports = mostrarTotales;
