const db = require("../database/db.js");
const modeloUsuarios = require("./UsuariosMD.js");
const modeloCategorias = require("./CategoriasMD.js");
const { DataTypes } = require("sequelize");
const ventasMD = db.define('Venta', {
    idVenta: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
    idUsuario: { type: DataTypes.INTEGER, foreignKey: true},
    estado: { type:DataTypes.BOOLEAN},
    producto: { type: DataTypes.STRING},
    cantidad: { type: DataTypes.INTEGER},
    descripcion: { type:DataTypes.STRING},
    categoria: { type: DataTypes.STRING, foreignKey: true},
    precio: { type: DataTypes.FLOAT},
    fechaPublicacion: { type:DataTypes.DATE}
})

ventasMD.belongsTo(modeloUsuarios,{foreignKey:'idUsuario'})
modeloUsuarios.hasMany(ventasMD,{foreignKey:'idUsuario'})

ventasMD.belongsTo(modeloCategorias,{foreignKey:'categoria'})
modeloCategorias.hasMany(ventasMD,{foreignKey:'categoria'})


module.exports= ventasMD;