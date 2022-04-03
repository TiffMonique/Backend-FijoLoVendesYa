const db = require('../database/db.js');
const Sequelize = require('sequelize');
const modeloUsuarios = require('./UsuariosMD.js');
const modeloCategorias = require('./CategoriasMD.js');
const modeloSuscripciones = db.define('Suscripciones', {
    idSuscripcion: {type: Sequelize.BIGINT, primaryKey:true, autoIncrement:true},
    idUsuario: {type: Sequelize.INTEGER, foreignKey:true},
    idCategoria: {type: Sequelize.STRING, foreignKey:true},
    fecha: {type:Sequelize.DATE}
})

modeloSuscripciones.belongsTo(modeloUsuarios, {foreignKey:'idUsuario'});
modeloUsuarios.hasMany(modeloSuscripciones, {foreignKey:'idUsuario'});

modeloSuscripciones.belongsTo(modeloCategorias, {foreignKey:'idCategoria'});
modeloCategorias.hasMany(modeloSuscripciones, {foreignKey:'idCategoria'});

module.exports = modeloSuscripciones;