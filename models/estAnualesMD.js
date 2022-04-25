const db = require("../database/db.js");
const { DataTypes } = require("sequelize");

const mod_est_anuales = db.define('Estadisticas_Anuales', {
    idEA: {type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
    ventas_A: {type: DataTypes.BIGINT},
    categoria_max_A: {type: DataTypes.BIGINT}, 
    nombre_categoria_max_A: {type: DataTypes.STRING},
    categoria_busq_A: {type: DataTypes.BIGINT}, 
    nombre_categoria_busq_A: {type: DataTypes.STRING},
    depto_busq_A: {type: DataTypes.BIGINT}, 
    nombre_depto_busq_A: {type: DataTypes.STRING},
})

module.exports = mod_est_anuales;