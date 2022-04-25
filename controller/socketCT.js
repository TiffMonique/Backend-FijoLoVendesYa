
const validarConexion = (socket) => {
    console.log("Usuario conectado: "+socket.id);
    if (!socket.handshake.session.ingresado) {
      socket.disconnect(true);
      console.log('desconectado, supuestamente');
    }
}


module.exports = {
    validarConexion
}