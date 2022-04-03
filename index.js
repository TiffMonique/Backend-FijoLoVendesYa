//import { Express } from 'express';
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const db = require("./database/db.js");
const cookieParser = require('cookie-parser');

//configuracion
// configurando el puerto
app.set('port', process.env.PORT || 4000);
var corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true };


app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    //res.header('Access-Control-Allow-Origin', "http://localhost:3000");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    next();
  });

//para el error corse en el navegador 
app.use(cors(corsOptions));

// middlewares

app.use(session({
    secret: 'secreto',
    resave: true,
    saveUninitialized: true
}));
app.use(cookieParser());
// hace log de cada petición
app.use(morgan('dev'));
// hace que express entienda JSON
app.use(express.json());
// Sirve para hacer que el body se reciba correctamente
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('./public/'));


try {
    db.authenticate()  
    console.log("Conexion a base de datos exitosa")
  } catch (error) {
      console.log(`Error, conexion fallida: ${error}`)
  }
//enrutadores
const CRT = require("./routes/RTCategorias.js"); 

//Rutas
app.use('/api/tienda', require('./routes/RTregistro.js'));
app.use('/api/tienda', require('./routes/RTautenticacion.js'));
app.use('/api/tienda', require('./routes/RTcrearVenta.js'));
app.use('/api/tienda', require('./routes/RTcalificaciones.js'));
app.use('/api/tienda', require('./routes/RTCategorias.js'));
app.use('/api/tienda', require('./routes/RTroles.js'));
app.use('/api/tienda', require('./routes/RTusuarios.js'));
app.use('/api/tienda', require('./routes/RTanuncios.js'));
//app.use('/api/tienda', require('./routes/routesCategorias.js'));
//app.use('/api/tienda', require('./routes/routesUsuarios.js'));
// Estáticos
//no es necesario

// Iniciar servidor
app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
})

