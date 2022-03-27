const express = require('express'); // para el servidor web
const pool = require('../database/database'); // la conexión
const router = express.Router(); // para las rutas
const db = require('../database/database'); // no se está usando
const bcrypt = require('bcrypt'); // para encriptar
const saltRounds = 10; // el tamaño o dificultad del Salt de la encriptación


// para ver todos los usuarios con todos sus datos
// es inutil
router.get('/', async (req, res) => {
    pool.query('SELECT * FROM Usuarios', (err, usuarios) => {
        if (err) {
            res.json(err);
        };
        res.json(usuarios);
    })
})

//metodo post para crear un usuario
const crear = async (req, res) => {
    const { nombre, apellido, correo, telefono, pass, direccion } = req.body;
    console.log("nombre", nombre);
    // validando el correo no repita
    consulta = 'SELECT correo FROM Usuarios WHERE correo = ?'
    pool.query(consulta, [correo], (err, respuesta) => {
        if (err) {
            res.status(403).json(err);
        } else {
            // si no existe el correo
            if (respuesta.length == 0) {
                const nuevousuario = {
                    nombre: nombre,
                    apellido: apellido,
                    correo: correo,
                    telefono: telefono,
                    pass: pass,
                    direccion: direccion,
                    idrol: 1
                };

                // Encriptando contrasenia
                bcrypt.hash(nuevousuario.pass, saltRounds, (err, hash) => {

                    nuevousuario.pass = hash;
                    consulta = 'INSERT INTO Usuarios set ?';
                    pool.query(consulta, [nuevousuario], (err, respuesta) => {
                        if (err) {
                            console.error(err);
                            res.status(409).json(
                                {
                                    message: "no se pudo crear el usuario"
                                }
                            );
                        } else {
                            res.json({ message: "Registro exitoso" });
                        }
                    });
                });
            } else {
                //  res.send('<script>alert("EL usuario esta duplicado")</script>');
                res.status(500).json({
                    status: 'error',
                    message: "Correo actualmente en uso"
                });
            }
        }
    });
};

// Busca usuarios por medio de su id, no tiene uso practico aún
router.get('/buscar/:id', async (req, res) => {
    const id = req.params.id;
    consulta = 'SELECT * FROM usuarios where idUsuarios = ?';
    pool.query(consulta, [id], (err, usuario) => {
        if (err) {
            res.json(err);
        }
        if (usuario) {
            res.json(usuario);
        }
    })
})

module.exports = {crear};