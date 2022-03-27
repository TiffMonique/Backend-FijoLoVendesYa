const db = require('../database/db.js')
const Sequelize = require('sequelize')

const modeloRoles = db.define('Roles', {
    idRol: {type: Sequelize.INTEGER, primaryKey:true},
    nombre: Sequelize.STRING,
    permisos: Sequelize.STRING
})

module.exports = modeloRoles;