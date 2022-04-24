const { response } = require("express");
const db = require("../database/db.js");
const modeloChat = require("../models/chatMD.js");
const modeloUsuarios = require('../models/UsuariosMD')
const { Sequelize, Op } = require("sequelize");

const crearChat= async(req, res) => {
    const {idVendedor} = req.body;
    const idCliente = req.session.user;
    const chat = {idVendedor, idCliente};
    try {
        modeloChat.create(chat);
        res.status(200).json({message: "Chat Creado"})
    } catch(err) {
        res.status(400).json({message: "Error al crear el chat", error: err.message})
    }
    
}

const misChats= async(req, res) => {
    const idUsuario = req.session.user;
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
            vendedor= await modeloUsuarios.findOne({where:{idUsuarios:currentchat.idVendedor}});
            cliente= await modeloUsuarios.findOne({where:{idUsuarios:currentchat.idCliente}});
            const chat2 = {...currentchat, vendedor: vendedor.dataValues, cliente: cliente.dataValues}
            chatss.push(chat2);
        }
        res.status(200).json(chatss)
    } catch(err) {
        res.status(400).json({message: "Error:", error: err.message})
    }
    
}

module.exports={crearChat, misChats};