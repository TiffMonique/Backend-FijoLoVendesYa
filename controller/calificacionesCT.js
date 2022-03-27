const calificacionesMD = require("../models/CalificacionesMD.js");

const unacalificacion = async (req, res) => {
    try {
        const calificacion = await calificacionesMD.findAll({
            where: {idCalificacion: req.params.idCalificacion}
        });
        res.json(calificacion[0]);
    } catch (error) {
        res.json({message: error.message})
    }
}

module.exports =  unacalificacion;