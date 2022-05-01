const modeloChat = require('../models/chatMD')
const modeloMensaje =  require('../models/mensajeMD')
const { Sequelize, Op, where } = require("sequelize");
const modeloUsuarios = require('../models/UsuariosMD')
const modeloVenta = require('../models/VentasMD')
const modeloFotoVenta = require('../models/fotosVentas');
const { io } = require('..');
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

const guardarMensaje = async (msg, socket, io) =>{
  try {
    var d = Date.now();
    var fecha = new Date(d);
    const idUsuario = socket.handshake.session.user;
    var mensaje = {}
    if (msg.tipo == "texto") {
      mensaje = {...msg, idUsuario, fecha};
      var chat =await modeloChat.findOne({where:{idChat:mensaje.idChat}})
      var chatupdate = chat.dataValues;
      chatupdate.sinleer = true;
      await modeloChat.update(chatupdate, {where:{idChat:chat.idChat}})
    } else if (msg.tipo == "venta") {
      const idVenta = msg.idVenta;
      const idContacto = msg.idContacto;
      if(idUsuario==idContacto) return false
      const contacto = await modeloUsuarios.findOne({
        where: {idUsuarios:idContacto}
      })
      const miusuario = await modeloUsuarios.findOne({
        where: {idUsuarios:idUsuario}
      })
      var chat = await modeloChat.findOne({
        where:{
          [Op.or]:[
              {idCliente:idUsuario, idVendedor: idContacto}, 
              {idVendedor:idUsuario, idCliente: idContacto}
          ]
        }
      })
      
      if (!chat) {
        chat = await modeloChat.create({
          idCliente: idUsuario,
          idVendedor: idContacto,
        })
        chat = chat.dataValues;
        socket.join(chat.idChat);
        const sockets = await io.fetchSockets();
        sockets.forEach(sockett => {
          if(sockett.handshake.session.user==idContacto) {
            sockett.join(chat.idChat);
          }
        });

        // estableciendo no leido
        chat.sinleer = true;
        await modeloChat.update(chat, {where:{idChat:chat.idChat}})

        const chatV = {...chat, nombreContacto: miusuario.nombre, apellidoContacto: miusuario.apellido}
        socket.to(chat.idChat).emit('nuevochat', chatV);
        const chatU = {...chat, nombreContacto: contacto.nombre, apellidoContacto: contacto.apellido}
        socket.emit('nuevochat', chatU);
      } else {
        // estableciendo no leido
        chat.sinleer = true;
        await modeloChat.update(chat, {where:{idChat:chat.idChat}})
      }
      const venta = await modeloVenta.findOne({
        where: {idVenta}
      })
      const foto = await modeloFotoVenta.findOne({
        where: {idVenta:idVenta}
      })
      var ventaJSON = '';
      if(venta) {
        ventaJSON = '{"idVenta":"'+idVenta+'", '+
                              '"foto":"'+foto.dataValues.nombre+'", '+
                              '"producto":"'+venta.dataValues.producto+'", '+
                              '"descripcion":"'+ await venta.dataValues.descripcion.substr(0,30)+'"}'
      }
      mensaje = {idUsuario, idChat:chat.idChat, mensaje: ventaJSON, fecha, tipo:"venta"};
    }
    const msgg = await modeloMensaje.create(mensaje);
    return msgg;
  } catch(err) {
    console.log("error:",err.message)
    return false;
  }
}

const confirmarLectura = async(idChat) => {
  try {
    const chat= await modeloChat.findOne({
      where: {idChat:idChat}
    })
    if(chat) {
      var chatupdate = chat.dataValues;
      chatupdate.sinleer = false;
      await modeloChat.update(chatupdate, {where: {idChat:idChat}})
    }
  }catch(err){
    console.log(err.message);
  }
}

module.exports = {
    validarConexion,
    misChats,
    guardarMensaje,
    confirmarLectura
}