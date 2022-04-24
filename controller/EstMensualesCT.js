const db = require("../database/db.js");
const modeloMensuales = require("../models/estMensualesMD.js");

//OBTENER TODOS LOS REGISTROS - SOLO HAY UNO EN TOTALES
const mostrarMensuales = async(req, res)=>{
    try {
        const mensuales = await modeloMensuales.findAll();
        res.json(mensuales);
    } catch (error) {
        res.json({ message: error.message });
    }
}

module.exports = mostrarMensuales;