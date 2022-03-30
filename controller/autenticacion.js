//Autenticación del login

const express = require("express");
const app = express();
const bcryptjs = require('bcryptjs');
const pool = require("../database/database");
const auth = require("./sesiones.js");

const logout= async (req,res)=>{
    req.session.destroy();
    res.status(200).json({message: "Sesión cerrada"});
}

const login= async (req, res)=>{
    const {correo, pass} = req.body;
    const valores = [correo, pass]
    console.log(req.body);
    await pool.query("SELECT * FROM Usuarios inner join roles on Roles.idRol = Usuarios.idRol WHERE correo = ?", [correo], (err, result) =>{
        if(err){
            res.status(500).send(err);
        }else{
            if(result.length > 0){
                console.log(result)
                const comparacion = bcryptjs.compareSync(pass, result[0].pass);
                if(comparacion) {
                    req.session.ingresado = true;
                    req.session.user = result[0].idUsuarios;
                    //ver si es admin
                    req.session.admin = result[0].idRol == 2;// provisional, solo funciona si el rol admin es 2
                    console.log(req.session.cookie);
                    res.status(200).json({
                        admin: true,
                        message: "Autenticado"
                    });
                } else {
                    res.status(400).json({
                        message: "Usuario o contraseña incorrecta"
                    })
                }
            }else{
                res.status(400).json({
                    message: "Usuario o contraseña incorrecta"
                })
            }
        }
    })
}


const sesion =  async(req, res) => {
    console.log(req.session);
    res.json(req.session);
};

module.exports = {login, logout, sesion};
