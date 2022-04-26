const modeloChat = require('../models/chatMD')
const modeloMensaje =  require('../models/mensajeMD')
const { Sequelize, Op } = require("sequelize");
const modeloUsuarios = require('../models/UsuariosMD')
const validarConexion = (socket) => {
    console.log("Usuario conectado: "+socket.id);
    if (!socket.handshake.session.ingresado) {
      socket.disconnect(true);
      console.log('desconectado, supuestamente');
    }
}

const misChats = async(socket) => {
  if (socket.handshake.session.ingresado) {
    const idUsuario = socket.handshake.session.user;
    try {
        var chats= await modeloChat.findAll({
            where:{
                [Op.or]:[
                    {idCliente:idUsuario}, 
                    {idVendedor:idUsuario}
                ]
            }
        });
        var chatss = [];
        for (let index = 0; index < chats.length; index++) {
            const currentchat=chats[index].dataValues;
            var contacto = {};
            if (currentchat.idVendedor == idUsuario) {
              contacto= await modeloUsuarios.findOne({where:{idUsuarios:currentchat.idCliente}});
            } else if(currentchat.idCliente == idUsuario) {
              contacto= await modeloUsuarios.findOne({where:{idUsuarios:currentchat.idVendedor}});
            }
            const mensajes = await modeloMensaje.findAll({where:{idChat:currentchat.idChat}});
            const chat2 = {
              ...currentchat, 
              nombreContacto: contacto.dataValues.nombre, 
              apellidoContacto: contacto.dataValues.apellido,
              mensajes
            }
            chatss.push(chat2);
        }
        return chatss
    } catch(err) {
      console.log(err);
        return err;
    }
  }
}

module.exports = {
    validarConexion,
    misChats
}