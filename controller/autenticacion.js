//Autenticación del login

const express = require("express");
const app = express();
const bcryptjs = require("bcryptjs");
const pool = require("../database/database");
const auth = require("./sesiones.js");

const logout = async (req, res) => {
  req.session.destroy();
  //req.session.save();
  res.status(200).json({ message: "Sesión cerrada" });
};

const login = async (req, res) => {
  const { correo, pass } = req.body;
  const valores = [correo, pass];
  console.log(req.body);
  await pool.query(
    "SELECT * FROM Usuarios inner join roles on Roles.idRol = Usuarios.idRol WHERE correo = ?",
    [correo],
    (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        if (result.length > 0) {
          var comparacion;
          if(pass) {
            comparacion = bcryptjs.compareSync(pass, result[0].pass);
          }
          if (comparacion) {
            req.session.ingresado = true;
            req.session.user = result[0].idUsuarios;
            var session = req.session;
            //ver si es admin
            req.session.admin = result[0].idRol == 1; // provisional, solo funciona si el rol admin es 2
            console.log(req.session);
            session.save();
            res.status(200).json({
              message: "Autenticado",
              admin: req.session.admin,
            });
          } else {
            res.status(400).json({
              message: "Usuario o contraseña incorrecta",
            });
          }
        } else {
          res.status(400).json({
            message: "Usuario o contraseña incorrecta",
          });
        }
      }
    }
  );
};

const sesion = async (req, res) => {
  console.log(req.session);
  res.json({logged:req.session.ingresado, admin:req.session.admin, idSesion:req.session.id});
};

module.exports = { login, logout, sesion };
