const db = require("../database/db.js");
const modeloAnuales = require("../models/estAnualesMD.js");

//OBTENER TODOS LOS REGISTROS - SOLO HAY UNO EN TOTALES
const mostrarAnuales = async(req, res)=>{
    try {
        const anuales = await modeloAnuales.findAll();
        res.json(anuales);
    } catch (error) {
        res.json({ message: error.message });
    }
}

module.exports = mostrarAnuales;