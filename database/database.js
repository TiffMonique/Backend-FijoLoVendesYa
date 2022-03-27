const mysql = require('mysql'); // para la conexion a la base de datos
const { promisify } = require('util'); //para poder usar promesas
const { database } = require('./keys'); // la configuración guardada

// Creando el objeto para la conexión
const pool = mysql.createPool(database);

// intentando la conexión
pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('La conexion con la base de datos fue cerrada');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('La base de datos tiene demasiadas conexiones');
        }
        if (err.code === 'ECONREFUSED') {
            console.error('La conexion fue rechazada');
        }
    }
    //aqí se establece la conexión real
    if (connection) connection.release();
    console.log('Base de datos conectada');
    return;
});

//promisify pool query
pool.query = promisify(pool.query);

module.exports = pool;