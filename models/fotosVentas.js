const db = require('../database/db.js')
const Sequelize = require('sequelize')

const modeloFotosVentas = db.define('fotosVentas', {
    nombre: {type:Sequelize.STRING, primaryKey:true},
    idVenta: {type: Sequelize.BIGINT, foreignKey:true}
})

module.exports = modeloFotosVentas;