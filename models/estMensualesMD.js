const db = require("../database/db.js");
const { DataTypes } = require("sequelize");

const mod_est_mensuales = db.define('Estadisticas_Mensuales', {
    idEM: {type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
    ventas_M: {type: DataTypes.BIGINT},
    categoria_max_M: {type: DataTypes.BIGINT}, 
    nombre_categoria_max_M: {type: DataTypes.STRING},
    categoria_busq_M: {type: DataTypes.BIGINT}, 
    nombre_categoria_busq_M: {type: DataTypes.STRING},
    depto_busq_M: {type: DataTypes.BIGINT}, 
    nombre_depto_busq_M: {type: DataTypes.STRING},
})

module.exports = mod_est_mensuales;