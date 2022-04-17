//import { Express } from 'express';
const express = require("express");
const morgan = require("morgan");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const session_express = require("express-session");
var MySQLStore = require('express-mysql-session')(session_express);
var options = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'password',
  database: 'tienda'
};
var sessionStore = new MySQLStore(options);
const session = session_express({
  key: "cookiedesesion",
  secret: "secreto",
  resave: false,
  saveUninitialized: false,
  store:sessionStore,
  autoSave: true
});




const db = require("./database/db.js");
const cookieParser = require("cookie-parser");
var sharedsesssion = require('express-socket.io-session');
// para socket



//configuracion
// configurando el puerto
app.set("port", process.env.PORT || 4000);
var corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:3001"],
  credentials: true,
};

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Origin', "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,DELETE,UPDATE,OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
  );
  next();
});

//para el error corse en el navegador
app.use(cors(corsOptions));

// middlewares

// el login
app.use(session);
// para las cookies
app.use(cookieParser());
// hace log de cada petición
app.use(morgan("dev"));
// hace que express entienda JSON
app.use(express.json());
// Sirve para hacer que el body se reciba correctamente
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static("./public/"));

try {
  db.authenticate();
  console.log("Conexion a base de datos exitosa");
} catch (error) {
  console.log(`Error, conexion fallida: ${error}`);
}
//enrutadores
const CRT = require("./routes/RTCategorias.js");

//Rutas
app.use("/api/tienda", require("./routes/RTregistro.js"));
app.use("/api/tienda", require("./routes/RTautenticacion.js"));
app.use("/api/tienda", require("./routes/RTcrearVenta.js"));
app.use("/api/tienda", require("./routes/RTcalificaciones.js"));
app.use("/api/tienda", require("./routes/RTCategorias.js"));
app.use("/api/tienda", require("./routes/RTroles.js"));
app.use("/api/tienda", require("./routes/RTusuarios.js"));
app.use("/api/tienda", require("./routes/RTrestaurarpass.js"));
app.use("/api/tienda", require("./routes/RTdenuncias.js"));
app.use('/api/tienda', require('./routes/RTsuscripciones.js'));
app.use('/api/tienda', require('./routes/RTFotos.js'));
//app.use('/api/tienda', require('./routes/routesCategorias.js'));
//app.use('/api/tienda', require('./routes/routesUsuarios.js'));
// Estáticos
//no es necesario
app.use("/api/tienda", require("./routes/RTanuncios.js"));
// Iniciar servidor

const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "OPTIONS"],
    credentials: true
  }
});

io.use(sharedsesssion(session, {autoSave:true}));


var cuenta = 0;
io.on('connection', (socket) => {
  //console.log(socket.handshake.session);
  console.log("Usuario conectado: "+socket.id);
  /* if (!socket.handshake.session.ingresado) {
    socket.disconnect(true);
    console.log('desconectado');
  } */
  socket.on('chat', (msg)=> {
    //console.log(socket.handshake.session);

    io.emit('respuesta', msg)
  })
  socket.on('prueba', (msg)=> {
    cuenta ++;
    console.log(msg);
    socket.emit('pruebaregreso', 'mensaje de respuesta'+cuenta);
    setTimeout(() => {
      socket.emit('pruebaregreso', 'mensaje de respuesta 2 '+cuenta);
    }, 3000);
  })
  socket.on('disconnect', () => {
    console.log('desconectado', socket.id)
  })
});

server.listen(app.get("port"), () => {
  console.log(`server on port ${app.get("port")}`);
});
