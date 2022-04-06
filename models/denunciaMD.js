const db = require('../database/db.js');
const Sequelize = require('sequelize');
const { DataTypes } = require("sequelize");
const modeloUsuarios = require('./UsuariosMD.js');

const denunciaMD = db.define('Denuncias', {
    idDenuncia: {type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
    idUsuario: { type: DataTypes.INTEGER, foreignKey: true},
    motivo:{type: DataTypes.STRING},
    contenido: {type: DataTypes.STRING},
    denunciado: { type: DataTypes.INTEGER, foreignKey: true},
    estado:{ type:DataTypes.BOOLEAN},
})


denunciaMD.belongsTo(modeloUsuarios,{foreignKey:'idUsuario'})
modeloUsuarios.hasMany(denunciaMD,{foreignKey:'idUsuario'})

denunciaMD.belongsTo(modeloUsuarios,{foreignKey:'idUsuario'})
modeloUsuarios.hasMany(denunciaMD,{foreignKey:'denunciado'})

module.exports = denunciaMD;
