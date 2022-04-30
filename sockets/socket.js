
const { io } = require('../index')
const { validarConexion, misChats, guardarMensaje } = require('../controller/socketCT')

var cuenta=0;
io.on('connection', async(socket) => {
    validarConexion(socket);
    var chats = await misChats(socket);
    var rooms = chats.map((chat)=>chat.idChat);
    socket.join(rooms)
    socket.emit('mischats', chats);
    
    socket.on('chat', (msg)=> {
        console.log(msg);
        socket.broadcast.emit('respuesta', msg)
    })
    socket.on('mensaje', async (msg)=> {
      console.log(msg);
      var msgg = await guardarMensaje(msg, socket, io);
      if(msgg) {
        socket.to(msgg.idChat).emit("mensajenuevo", msgg);
        socket.emit("mensajenuevo", msgg);
      }
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