const {Sequelize} = require("sequelize");
const db = new Sequelize('tienda', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

module.exports = db;