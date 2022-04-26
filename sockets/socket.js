
const { io } = require('../index')
const { validarConexion, misChats } = require('../controller/socketCT')

var cuenta=0;
io.on('connection', async(socket) => {
    //validarConexion(socket);
    var chats = await misChats(socket);
    var rooms = chats.map((chat)=>chat.idChat);
    socket.join(rooms)
    console.log("ROOMS : __________-------------_________"+rooms);
    socket.emit('mischats', chats);
    
    socket.on('chat', (msg)=> {
        console.log(msg);
        socket.broadcast.emit('respuesta', msg)
    })
    socket.on('mensaje', (msg)=> {
      console.log(msg);
      var msgg = {...msg, idUsuario:socket.handshake.session.user};
      socket.to(msg.idChat).emit("mensajenuevo", msgg);
      socket.emit("mensajenuevo", msgg);
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