const db = require('../database/db.js');
const Sequelize = require('sequelize');

const modeloUsuarios = require('./UsuariosMD.js');
const ventasMD = require("./VentasMD");

const modeloFavoritos = db.define('Favoritos', {
    idLista: {type: Sequelize.BIGINT, primaryKey:true, autoIncrement:true},
    idUsuario: {type: Sequelize.INTEGER, foreignKey:true},
    idVenta: {type: Sequelize.STRING, foreignKey:true}
})

modeloFavoritos.belongsTo(modeloUsuarios, {foreignKey:'idUsuario'});
modeloUsuarios.hasMany(modeloFavoritos, {foreignKey:'idUsuario'});

modeloFavoritos.belongsTo(ventasMD, { foreignKey: "idVenta" });
ventasMD.hasMany(modeloFavoritos, { foreignKey: "idVenta" });

module.exports = modeloFavoritos;