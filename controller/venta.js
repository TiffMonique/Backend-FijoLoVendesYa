const { Sequelize } = require("sequelize");
const pool = require("../database/database");
const ventasMD = require("../models/VentasMD.js");
const modeloCategorias = require("../models/CategoriasMD.js");
const modeloUsuarios = require("../models/UsuariosMD.js");
const modeloFotosVentas = require("../models/fotosVentas");
const multer = require("multer");
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { json } = require("body-parser");

//Configuración multer
const storage = multer.diskStorage({
  destination: './public/uploads/', 
  filename: (req, file, cb) => {
      cb(null, uuidv4() + path.extname(file.originalname).toLocaleLowerCase())
  },
})

const limits = {
  fileSize: 5000000
};

const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png|gif/;
  const mimetype = fileTypes.test(file.mimetype);
  const extname = fileTypes.test(path.extname(file.originalname));
  if (mimetype && extname) {
      return cb(null, true);
  }
  cb("Error: Archivo debe ser una imagen válida")
}

//instancia multer con su configuración
const upload = multer({
  storage: storage,
  limits: limits,
  fileFilter: fileFilter
});

const crearVenta =  async (req, res) => {
   await upload.array('foto', 10) (req, res, async function (err) {
    console.log(req.files);
    if (req.files.length > 0) {
      if (err instanceof multer.MulterError) {
        res.status(400).json("Error multer: " + err.message)
      } else if (err) {
          res.status(500).json("Error: " + err.message)
      } else if (req.files[0]){
          // Lo anterior de ventas sin foto
          const { estado, categoria, producto, cantidad, descripcion, precio } =
          req.body;
          console.log(estado);
          console.log(req.body);
          const idUsuario = req.session.user;
          let now = new Date();
          const fechaPublicacion = now.getTime();
          const venta = {
            estado,
            categoria,
            producto,
            cantidad,
            descripcion,
            precio,
            idUsuario,
            fechaPublicacion,
          };
          
          try {
            const respuesta = await ventasMD.create(venta);
            const fotos = req.files.map(foto => { return {nombre: foto.filename, idVenta: respuesta.idVenta} });
            console.log("req.files: "+req.files);
            console.log("Arreglo de fotos: "+fotos);
            await modeloFotosVentas.bulkCreate(fotos);
            res.status(200).json({
              message: "Venta Registrada exitosamente",
              venta: respuesta,
            });
          } catch (error) {
            res.status(400).json({ message: error.message });
          }
      } else {
          res.status(500).json({message:"No hay imagenes"})
      }
    } else {
      res.status(400).json({message: "No hay fotos"})
    }
      
  });
}
// Inserta una venta con todo y su detalle
// estado es bool, categoría es int, debe existir la categoría
/*const crearVenta = async (req, res) => {
  procesarImagenes();
  const { estado, categoria, producto, cantidad, descripcion, precio } =
    req.body;
  const idUsuario = req.session.user;
  let now = new Date();
  const fechaPublicacion = now.getTime();
  const venta = {
    estado,
    categoria,
    producto,
    cantidad,
    descripcion,
    precio,
    idUsuario,
    fechaPublicacion,
  };
  try {
    const respuesta = await ventasMD.create(venta);
    res.status(200).json({
      message: "Venta Registrada exitosamente",
      venta: respuesta,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};*/

//Elimina una venta solo si lo solicita el usuario que la creó
const eliminarVenta = async (req, res) => {
  const idVenta = req.params.idVenta;
  const idUsuario = req.session.user;
  try {
    const venta = await ventasMD.findAll({
      attributes: [[Sequelize.fn("COUNT", Sequelize.col("idVenta")), "cuenta"]],
      where: {
        idVenta: idVenta,
        idUsuario: idUsuario,
      },
    });
    console.log(venta);
    if (venta[0].dataValues.cuenta > 0) {
      await ventasMD.destroy({
        where: { idVenta: idVenta },
      });
      res.status(200).json({ message: "Vena eliminada exitosamente" });
    } else {
      res.status(401).json({ message: "No se pudo eliminar la venta" });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
  //valida si el usuario creó la venta
  /*var consulta = 'Select count(*) as cuenta from Venta where idUsuario = ? and idVenta = ?';
    await pool.query(consulta, [idUsuario, idVenta], (err, result) =>{
        if(err){
            res.status(500).send(err);
        }else{
            if(result[0].cuenta>0){
                consulta = 'CALL DelVenta_Detalle(?)'; //DelVenta_Detalle es un procedimiento almacenado
                pool.query(consulta, [idVenta], (err, result) =>{
                    if(err){
                        res.status(500).send(err);
                    }else{
                        console.log("Venta y detalle Eliminada");
                        res.status(200).json({
                            message: "Venta eliminada exitosamente",
                        })
                    }
                })
            } else {
                res.status(401).json({
                    message: "No puede elimiar esta venta"
                })
            }
        }
    })*/
};

//actualizar una venta
//no puede cambiar el idUsuario, idVena ni idDetalle, ni calificacion
const actualizarVenta = async (req, res) => {
  const { estado, categoria, producto, cantidad, descripcion, precio } =
    req.body;
  const Venta = { estado, categoria, producto, cantidad, descripcion, precio };
  const idVenta = req.params.idVenta;
  const idUsuario = req.session.user;
  console.log("idusuario: ", req.session);
  try {
    const ventaValidacion = await ventasMD.findAll({
      attributes: [[Sequelize.fn("COUNT", Sequelize.col("idVenta")), "cuenta"]],
      where: {
        idVenta: idVenta,
        idUsuario: idUsuario,
      },
    });
    if (ventaValidacion[0].dataValues.cuenta > 0) {
      await ventasMD.update(Venta, {
        where: { idVenta: idVenta },
      });
      res.status(200).json({ message: "Venta actualizada correctamente" });
    } else {
      res.status(401).json({ message: "No puede actualizar esta venta" });
    }
  } catch (error) {
    res.json({ message: error.message });
  }

  /*
    var consulta = 'Update Venta set estado = ? where idVenta = ?';
    await pool.query(consulta, [estado, idVenta], (err, result) =>{
        if(err){
            res.status(500).send(err);
        }else{
            consulta = 'Update DetalleVenta set ? where idVenta = ?';
            pool.query(consulta, [detalle, idVenta], (err, result) =>{
                if(err){
                    res.status(500).send(err);
                }else{
                    console.log("Actualización correcta");
                    res.status(200).json({
                        message: "Actualización realizada correctamente",
                    })
                }
            });
        }
    });*/
};

const listarVentas = async (req, res) => {
  var idUsuario;
  if (req.params.idUsuario) {
    idUsuario = req.params.idUsuario;
  } else {
    idUsuario = req.session.user;
  }
  try {
    const ventas = await ventasMD.findAll({
      include: [modeloUsuarios, modeloCategorias],
      where: {
        idUsuario: idUsuario,
      },
    });
    res.json(ventas);
  } catch (error) {
    res.json({ message: error.message });
  }
  /*const consulta = 'Select * from Venta inner join DetalleVenta on Venta.idVenta = DetalleVenta.idVenta where Venta.idUsuario = ?';
    console.log(req.body);
    await pool.query(consulta, [idUsuario], (err, result) =>{
        if(err){
            res.status(500).send(err);
        }else{
            res.status(200).json({
                message: `Lisa de Ventas del usuario`,
                Ventas: result
            })
        }
    })*/
};

const todasVentas = async (req, res) => {
  try {
    const sales = await ventasMD.findAll({
      include: [modeloUsuarios, modeloCategorias],
    });
    res.json(sales);
  } catch (error) {
    res.json({ message: error.message });
  }
};

const buscarVenta = async (req, res) => {
  const idVenta = req.params.idVenta;
  try {
    const venta = await ventasMD.findAll({
      where: { idVenta: idVenta },
    });
    res.json(venta[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};

const fotosVenta = async (req, res) => {
  const idVenta = req.params.idVenta;
  try {
    const fotos = await modeloFotosVentas.findAll({
      where: {idVenta:idVenta},
    });
    const nombres = fotos.map(foto => foto.nombre)
    res.status(200).json(nombres);
  } catch (err) {
    res.status(400).json(err.message);
  }
}

module.exports = {
  crearVenta,
  eliminarVenta,
  actualizarVenta,
  listarVentas,
  buscarVenta,
  todasVentas,
  fotosVenta,
};
