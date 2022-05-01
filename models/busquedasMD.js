const db = require("../database/db.js");
const { DataTypes } = require("sequelize");
const busquedasMD = db.define("busquedas", {
  idBusqueda: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement:true },
  categoria: { type: DataTypes.STRING },
  depto: { type: DataTypes.STRING },
});

module.exports = busquedasMD;