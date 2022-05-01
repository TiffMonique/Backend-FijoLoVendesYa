const db = require("../database/db.js");
const { DataTypes } = require("sequelize");

const mod_est_totales = db.define("Estadisticas_Totales", {
  idET: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  ventas_T: { type: DataTypes.BIGINT },
  categoria_max_T: { type: DataTypes.BIGINT },
  nombre_categoria_max_T: { type: DataTypes.STRING },
  categoria_busq_T: { type: DataTypes.BIGINT },
  nombre_categoria_busq_T: { type: DataTypes.STRING },
  depto_busq_T: { type: DataTypes.BIGINT },
  nombre_depto_busq_T: { type: DataTypes.STRING },
  createdAT: { type: DataTypes.DATE },
});

module.exports = mod_est_totales;
