var express = require('express');
var router = express.Router();
var connection = require('../database/database');
var nodemailer = require('nodemailer');
var bcrypt = require('bcrypt');
var randtoken = require('rand-token');
const saltRounds = 10; 

//Enviar correo 
function EviarEmail(email, token){
    var email = email;
    var token = token;
    var mail = nodemailer.createTransport({
        service: 'gmail',
    auth: {
            user: 'fijolovendesya@gmail.com',
            pass: 'fijoloVENDESYA10'
        }
    });
    
    var mailOptions = {
        from: 'Remitente',
        to: email,
        subject: 'Restablecimiento de contraseña',
        html: '<p> ENTRE AL SIGUIENTE <a href="http://localhost:3000/newPassword?token=' + token + '">LINK</a>PARA CAMBIAR SU CONTRASEÑA</p>'
    };
    mail.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(1)
        }else{
            console.log(0)
        }
    });
}

/* enviar enlace de restablecimiento de contraseña en el correo electrónico */
const restablecerpassemail = async (req, res,next) =>{
    var correo= req.body.correo;
    connection.query('SELECT * FROM Usuarios WHERE correo =?', [correo], (err, result) =>{
        if(err){
            res.status(500).send(err);
        }else{
            if (result.length> 0) {
                console.log(result);
                var token = randtoken.generate(20);
                var sent = EviarEmail(correo, token);
                bcrypt.hash(token, saltRounds, (err, hash) => {
                    if (sent != '0') {
                        var data = {
                        token: token
                        }
                        connection.query('UPDATE Usuarios SET ? WHERE correo ="' + correo + '"', data, function(err, result) {
                            if (err) throw err; 
                        })
                        res.json({
                            msg: "correo electrónico enviado"   
                        })
                    }else{
                        console.error(err);
                        res.status(400).json({
                        msg: "algo salio mal, intenta de nuevo"
                        })
                    } 
                });    
            }else{
                console.error(err);
                res.status(400).json({ 
                    msg: "El correo electrónico no está registrado con nosotros"
                })
            }    
        }  
    });
};


//actualizar contraseña en la base de datos 
const actualizarpass=async(req, res,next) =>{
    const {token, pass} = req.body;
    //revisar esto
    connection.query('SELECT * FROM Usuarios WHERE token =?', [token],(err, result)=> {
        if (err){
            res.status(500).json(err);
        }else{
            if (result.length > 0) {
                var saltRounds = 10;
                bcrypt.genSalt(saltRounds, function(err, salt) {
                    bcrypt.hash(pass, salt, function(err, hash) {
                        var data = {
                            pass: hash
                        }
                        connection.query('UPDATE Usuarios SET ? WHERE correo ="' + result[0].correo + '"', data, function(err, result) {
                            if (err){
                                res.status(500).json(err);
                            }
                        });
                    });
                });
                res.json({
                    status: 'exito',
                    msg: 'Su contraseña se ha actualizado correctamente'
                });
            }else{
                res.status(500).json({
                    status: 'falla',
                    msg: 'Inténtalo de nuevo'
                });
            }
        }
    });
};


module.exports = {restablecerpassemail,actualizarpass};