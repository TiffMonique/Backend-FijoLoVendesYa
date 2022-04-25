const db = require("../database/db.js");
const modeloSemanales = require("../models/estSemanalesMD.js");

//OBTENER TODOS LOS REGISTROS
const mostrarSemanales = async(req, res)=>{
    try {
        const semanales = await modeloSemanales.findAll();
        res.json(semanales);
    } catch (error) {
        res.json({ message: error.message });
    }
}

module.exports = mostrarSemanales;