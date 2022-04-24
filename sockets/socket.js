
const { io } = require('../index')
const { validarConexion } = require('../controller/socketCT')

var cuenta=0;
io.on('connection', (socket) => {
    validarConexion(socket);

    
    socket.on('chat', (msg)=> {
        console.log(msg);
        socket.broadcast.emit('respuesta', msg)
    })
    socket.on('prueba', (msg)=> {
      cuenta ++;
      console.log(msg);
      io.sockets.emit('pruebaregreso', 'mensaje de respuesta'+cuenta);
      setTimeout(() => {
        socket.emit('pruebaregreso', 'mensaje de respuesta 2 '+cuenta);
      }, 3000);
    })
    socket.on('disconnect', () => {
      console.log('desconectado', socket.id)
    })
  });