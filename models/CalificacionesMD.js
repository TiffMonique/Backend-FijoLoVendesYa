const db = require("../database/db.js");
const ventasMD = require("./VentasMD");
const usuariosMD = require("./UsuariosMD");
const { DataTypes } = require("sequelize");
const calificacionesMD = db.define("Calificaciones", {
  idCalificacion: { type: DataTypes.INTEGER, primaryKey: true },
  calificacion: { type: DataTypes.INTEGER },
  idVenta: { type: DataTypes.BIGINT, foreignKey: true },
  idUsuario: { type: DataTypes.INTEGER, foreignKey: true },
});

calificacionesMD.belongsTo(ventasMD, { foreignKey: "idVenta" });
ventasMD.hasMany(calificacionesMD, { foreignKey: "idVenta" });

usuariosMD.hasMany(calificacionesMD, { foreignKey: "idUsuario" });

module.exports = calificacionesMD;
