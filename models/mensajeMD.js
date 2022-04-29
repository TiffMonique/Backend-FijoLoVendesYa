const db = require("../database/db.js");
const { DataTypes } = require("sequelize");
const modeloChat = require("./chatMD.js");
const modeloUsuarios = require("./UsuariosMD.js");
const mensajeMD = db.define("mensajes", {
  idMensaje: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  idUsuario: { type: DataTypes.INTEGER, foreignKey: true },
  idChat: { type: DataTypes.INTEGER, foreignKey: true },
  mensaje: { type: DataTypes.STRING },
  fecha: { type: DataTypes.DATE },
  tipo: { type: DataTypes.STRING }
});
mensajeMD.belongsTo(modeloUsuarios, {foreignKey:'idUsuario'});
modeloUsuarios.hasMany(mensajeMD, { foreignKey: "idUsuario" });
mensajeMD.belongsTo(modeloChat, {foreignKey:'idChat'});
modeloChat.hasMany(mensajeMD, { foreignKey: "idChat" });



module.exports = mensajeMD;