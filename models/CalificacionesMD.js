const db = require("../database/db.js");
const { DataTypes } = require("sequelize");
const calificacionesMD = db.define('Calificaciones', {
    idCalificacion: { type: DataTypes.INTEGER, primaryKey: true},
    calificacion: { type: DataTypes.INTEGER},
    idVenta: { type:DataTypes.BIGINT, foreignKey: true}
})

module.exports= calificacionesMD;