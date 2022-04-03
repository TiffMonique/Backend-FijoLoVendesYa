const db = require("../database/db.js");
const ventasMD = require("./VentasMD.js");
const { DataTypes } = require("sequelize");
const anunciosMD = db.define('Anuncios', {
    idAnncio: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
    idVenta: { type: DataTypes.INTEGER, foreignKey: true},
    fechaInicio: { type:DataTypes.DATE},
    fechaFin: { type:DataTypes.DATE},
    descripcion: { type:DataTypes.STRING}
})

anunciosMD.belongsTo(ventasMD,{foreignKey:'idVenta'})
ventasMD.hasMany(anunciosMD,{foreignKey:'idVenta'})

module.exports = anunciosMD;
