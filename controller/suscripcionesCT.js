
const modeloSuscripciones = require("../models/suscripcionesMD.js")

const crearSuscripcion = async(req, res) => {
    const idCategoria = req.body.categoria;
    const idUsuario = req.session.user;
    const now = new Date();
    const fecha = now.getTime();
    const suscripcion = {
        idCategoria, idUsuario, fecha
    }
    try {
        const sus = await modeloSuscripciones.create(suscripcion);
        res.status(200).json(sus);
    } catch (err) {
        res.status(400).json(err)
    }
}

const eliminarSuscripcion = async(req, res) => {
    const idCategoria = req.params.idCategoria;
    console.log(req.body)
    const idUsuario = req.session.user;
    try {
        console.log('hola')
        await modeloSuscripciones.destroy({where: {idCategoria:idCategoria, idUsuario:idUsuario}});
        res.status(200).json({message: "Desuscrito"})
    }catch (err) {
        res.status(400).json(err.message);
    }
}

const misSuscripciones = async(req, res) => {
    const idUsuario = req.session.user;
    console.log('hola')
    try {
        const respuesta = await modeloSuscripciones.findAll({
            where: {
              idUsuario: idUsuario,
            },
          });
        console.log(respuesta)
        const suscripciones = respuesta.map(item => item.idCategoria)
        res.status(200).json(suscripciones);
    }catch (err) {
        res.status(400).json(err);
    }
}

module.exports = {crearSuscripcion, eliminarSuscripcion, misSuscripciones};