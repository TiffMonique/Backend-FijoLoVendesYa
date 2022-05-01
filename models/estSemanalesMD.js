const db = require("../database/db.js");
const { DataTypes } = require("sequelize");

const mod_est_semanales = db.define("Estadisticas_Semanales", {
  idES: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  ventas_S: { type: DataTypes.BIGINT },
  categoria_max_S: { type: DataTypes.BIGINT },
  nombre_categoria_max_S: { type: DataTypes.STRING },
  categoria_busq_S: { type: DataTypes.BIGINT },
  nombre_categoria_busq_S: { type: DataTypes.STRING },
  depto_busq_S: { type: DataTypes.BIGINT },
  nombre_depto_busq_S: { type: DataTypes.STRING },
  createdAT: { type: DataTypes.DATE },
});

module.exports = mod_est_semanales;
