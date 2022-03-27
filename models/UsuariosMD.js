const db = require('../database/db.js');
const Sequelize = require('sequelize');
const modeloRoles = require('./RolesMD.js');

const modeloUsuarios = db.define('Usuarios', {
    idUsuarios: {type: Sequelize.INTEGER, primaryKey:true},
    nombre: Sequelize.STRING,
    apellido: Sequelize.STRING,
    correo: Sequelize.STRING,
    telefono: Sequelize.STRING,
    pass: Sequelize.STRING,
    direccion: Sequelize.STRING,
    departamento: Sequelize.STRING,
    imagen: Sequelize.BOOLEAN,
    idRol: {type: Sequelize.INTEGER, foreignKey:true},
})

modeloUsuarios.belongsTo(modeloRoles, {foreignKey:'idRol'})
modeloRoles.hasMany(modeloUsuarios, {foreignKey:'idRol'})

module.exports = modeloUsuarios;