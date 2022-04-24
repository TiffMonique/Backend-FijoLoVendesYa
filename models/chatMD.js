const db = require("../database/db.js");
const { DataTypes } = require("sequelize");
const modeloUsuarios = require("./UsuariosMD.js");
const chatMD = db.define("chats", {
  idChat: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  idVendedor: { type: DataTypes.INTEGER, foreignKey: true },
  idCliente: { type: DataTypes.INTEGER, foreignKey: true },
});
chatMD.belongsTo(modeloUsuarios, {foreignKey:'idVendedor'});
modeloUsuarios.hasMany(chatMD, { foreignKey: "idVendedor" });
chatMD.belongsTo(modeloUsuarios, {foreignKey:'idCliente'});
modeloUsuarios.hasMany(chatMD, { foreignKey: "idCliente" });



module.exports = chatMD;
