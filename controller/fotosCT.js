const ventasMD = require("../models/VentasMD.js");
const modeloFotosVentas = require("../models/fotosVentas");
const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const fs = require('fs');
const { Sequelize } = require("sequelize");
//Configuración multer
const storage = multer.diskStorage({
    destination: "./public/uploads/",
    filename: (req, file, cb) => {
      cb(null, uuidv4() + path.extname(file.originalname).toLocaleLowerCase());
    },
  });
  
const limits = {
    fileSize: 5000000,
};

const fileFilter = (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimetype = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));
    if (mimetype && extname) {
        return cb(null, true);
    }
    cb("Error: Archivo debe ser una imagen válida");
};

const upload = multer({
storage: storage,
limits: limits,
fileFilter: fileFilter,
}).array("foto", 10);

const subirFotos = async(req, res) => {
    await upload(req,res, async function (err) {
        if(req.files.length<1) {
            res.status(400).json({message: "Debe seleccionar fotos"});
        } else if (err instanceof multer.MulterError) {
            if (err.code === "LIMIT_UNEXPECTED_FILE") {
                res.status(400).json({message: "Debe elegir como máximo 10 imágenes", error: err.message})
            }
        } else if (err) {
            res.status(400).json({message: "Error no de multer", message: err.message})
        } else {
            try {
                const idVenta = req.params.idVenta;
                const idUsuario = req.session.user;
                console.log("idventa:", idVenta)
                const respuesta = await ventasMD.findAll({where: {idVenta: idVenta}});
                const suyo = (await ventasMD.findAll({where: {idVenta: idVenta, idUsuario:idUsuario}})).length>0;
                if (respuesta.length>0) {
                    if (suyo) {
                        var fotos = await modeloFotosVentas.findAll({
                            attributes: [[Sequelize.fn("COUNT", Sequelize.col("idVenta")), "cuenta"]],
                            where: {
                                idVenta: idVenta,
                            },
                        });
                        const indiceMayorBusqueda = await modeloFotosVentas.findAll({
                            attributes: [[Sequelize.fn("MAX", Sequelize.col("indice")), "indiceM"]],
                            where: {idVenta: idVenta,},
                        });
                        const indiceMayor = indiceMayorBusqueda[0].dataValues.indiceM;
                        if (fotos[0].dataValues.cuenta + req.files.length < 11) {
                            const fotos = req.files.map((foto, posicion) => {return { nombre: foto.filename, idVenta: respuesta[0].idVenta, indice: posicion + indiceMayor + 1}});
                            const fotosBD = await modeloFotosVentas.bulkCreate(fotos);
                            const fotosNombre = fotosBD.map((foto) => foto.nombre);
                            res.status(200).json({
                                message: "Fotos subidas correctamente",
                                fotos: fotosNombre
                            });
                        } else {
                            res.status(400).json({message: "No puede agregar más de 10 fotos por venta"});
                        }
                    }else {
                        res.status(401).json({message: "Usted no puede agregar fotos a esta venta"});
                    }
                } else {
                    res.status(400).json({message: "La venta no existe"});
                }
                
            } catch (error) {
                
                res.status(400).json({ message: error.message });
            }
        }
    })
}

const elimiarFoto = async (req, res) => {
    const nombreFoto = req.params.nombreFoto;
    const idUsuario = req.session.user;
    try {
        const fotos = await modeloFotosVentas.findAll({where: {nombre:nombreFoto}});
        if (fotos.length>0) {
            const idVenta = fotos[0].idVenta;
            const suyo = (await ventasMD.findAll({where: {idVenta: idVenta, idUsuario:idUsuario}})).length>0;
            if (suyo) {
                await modeloFotosVentas.destroy({where: { nombre: nombreFoto }});
                await fs.rm('./public/uploads/'+nombreFoto, () => {});
                res.status(200).json({message: "Foto borrada exitosamente"});
            }
        } else {
            res.status(404).json({message: "No se encuentra esa foto"})
        }
    }catch (err) {
        res.status(500).json({message: "No se pudo borrar la foto", error: err.message});
    }
}
module.exports = {subirFotos, elimiarFoto}