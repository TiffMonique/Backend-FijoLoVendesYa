const db = require("../database/db.js");
const Sequelize = require("sequelize");

const modeloCategorias = db.define("Categorias", {
  nombre: { type: Sequelize.STRING, primaryKey: true },
  descripcion: Sequelize.STRING,
  foto: Sequelize.STRING
});

module.exports = modeloCategorias;
