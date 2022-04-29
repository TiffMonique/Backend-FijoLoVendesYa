const { Sequelize, Op } = require("sequelize");
const pool = require("../database/database");
const ventasMD = require("../models/VentasMD.js");
const modeloCategorias = require("../models/CategoriasMD.js");
const modeloUsuarios = require("../models/UsuariosMD.js");
const modeloFotosVentas = require("../models/fotosVentas");
const calificacionesMD = require("../models/CalificacionesMD");
const { subirVarias } = require('../multerfotos/multerfoto');
const { query } = require("express");

const crearVenta = async (req, res) => {
  subirVarias(req, res, true, 10, async (req, res) => {
    const { estado, categoria, producto, cantidad, descripcion, precio } = req.body;
    console.log(req.body);
    const idUsuario = req.session.user;
    let now = new Date();
    const fechaPublicacion = now.getTime();
    const venta = {...req.body, idUsuario, fechaPublicacion,};
    try {
      const respuesta = await ventasMD.create(venta);
      const fotos = req.files.map((foto, posicion) => {
        return { nombre: foto.filename, idVenta: respuesta.idVenta, indice: posicion};
      });
      //console.log("req.files: " + req.files);
      //console.log("Arreglo de fotos: " + fotos);
      await modeloFotosVentas.bulkCreate(fotos);
      res.status(200).json({
        message: "Venta Registrada exitosamente",
        venta: respuesta,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  })
};
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
  console.log(idVenta);
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
      await modeloFotosVentas.destroy({
        where: { idVenta: idVenta },
      });
      await ventasMD.destroy({
        where: { idVenta: idVenta },
      });
      res.status(200).json({ message: "Venta eliminada exitosamente" });
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
    var fotos = [];
    var ventasfoto = [];
    // buscando la primera foto de cada venta
    for (let index = 0; index < ventas.length; index++) {
      const venta = ventas[index];
      const foto = await modeloFotosVentas.findOne({where: {idVenta:venta.idVenta}, order: [['indice', 'ASC']]})
      var ventafoto;
      const calificacionPromedio = await calificacionesMD.findOne({
        attributes: [[Sequelize.fn("AVG", Sequelize.col("calificacion")), "promedio"]],
        where: {idVenta:venta.idVenta}
      })
      var ventafoto;
      if(foto) {
        ventafoto = {...venta.dataValues, foto: foto.dataValues.nombre, calificacion: calificacionPromedio.dataValues.promedio}
      } else {
        ventafoto = {...venta.dataValues, calificacion: calificacionPromedio.dataValues.promedio}
      }
      ventasfoto.push(ventafoto);
    }
    console.log("fotos despues de foreach" , fotos)
    res.json(ventasfoto);
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
    const ventas = await ventasMD.findAll({
      include: [modeloUsuarios, modeloCategorias],
    });var fotos = [];
    var ventasfoto = [];
    // buscando la primera foto de cada venta
    for (let index = 0; index < ventas.length; index++) {
      const venta = ventas[index];
      const foto = await modeloFotosVentas.findOne({where: {idVenta:venta.idVenta}, order: [['indice', 'ASC']]})
      const calificacionPromedio = await calificacionesMD.findOne({
        attributes: [[Sequelize.fn("AVG", Sequelize.col("calificacion")), "promedio"]],
        where: {idVenta:venta.idVenta}
      })
      var ventafoto;
      if(foto) {
        ventafoto = {...venta.dataValues, foto: foto.dataValues.nombre, calificacion: calificacionPromedio.dataValues.promedio}
      } else {
        ventafoto = {...venta.dataValues, calificacion: calificacionPromedio.dataValues.promedio}
      }
      ventasfoto.push(ventafoto);
    }
    console.log("fotos despues de foreach" , fotos)
    res.json(ventasfoto);
  } catch (error) {
    res.json({ message: error.message });
  }
};

const buscarVenta = async (req, res) => {
  const idVenta = req.params.idVenta;
  var idUsuario = "";
  if(req.session) {
    idUsuario = req.session.user;
  }
  console.log(idUsuario);
  try {
    const venta = await ventasMD.findOne({
      include: [modeloUsuarios],
      where: { idVenta: idVenta },
    });
    const fotos = await modeloFotosVentas.findAll({
      where: { idVenta: idVenta }, order: [['indice', 'ASC']]
    });
    var nombresfotos = []
    var calificacion = {};
    if (idUsuario) {
      calificacion = await calificacionesMD.findOne({
        where: {idUsuario, idVenta}
      });
    }
    var ventacalificacion = venta.dataValues;
    if(calificacion){
      ventacalificacion = {...ventacalificacion, calificacion: calificacion.calificacion}
    }
    if (fotos.length>0) {
      nombresfotos = fotos.map(foto => foto.nombre);
      res.json({...ventacalificacion, fotos: nombresfotos});
    }else {
      res.json(ventacalificacion);
    }
  } catch (error) {
    res.json({ message: error.message });
  }
}; 

const fotosVenta = async (req, res) => {
  const idVenta = req.params.idVenta;
  try {
    const fotos = await modeloFotosVentas.findAll({
      where: { idVenta: idVenta }, order: [['indice', 'ASC']]
    });
    res.status(200).json(fotos);
  } catch (err) {
    res.status(400).json(err.message);
  }
};

const unaFoto = async (req, res) => {
  const idVenta = req.params.idVenta;
  const indice = req.params.indice;
  try {
    const foto = await modeloFotosVentas.findOne({
      where: { idVenta: idVenta, indice:indice },
    });
    if (foto) {
      const nombrefoto = foto.nombre
      res.status(200).json(nombrefoto)
    }else {
      res.status(404).json({message: "No se encuentra esa foto"});
    }
  } catch (err) {
    res.status(400).json(err.message);
  }
};

const busqueda = (req, res) => {
  var consulta = "";
  var busquedaCase = "";
  var busquedaCondicion = "";
  var busquedaOrder = "";
  var categoriaQuery = "";
  var departamentoQuery = "";
  var precioQuery="";
  if (req.query.busqueda) {
    const separado = req.query.busqueda.split(' ').filter(Boolean);
    separado.forEach((palabra, indice) => {
      interno= indice==0 ?palabra:interno+'|'+palabra;
    });
    const expresion =  interno;
    busquedaCase = `
    ,(CASE WHEN producto like "%${req.query.busqueda}%" THEN 1 ELSE 0 END +
      CASE WHEN venta.descripcion like "%${req.query.busqueda}%" THEN 1 ELSE 0 END +
      CASE WHEN producto regexp "${expresion}" THEN 1 ELSE 0 END + 
      CASE WHEN venta.descripcion regexp "${expresion}" THEN 1 ELSE 0 END) as ordenar
    `;
    busquedaCondicion = `
      and (
        producto like "%${req.query.busqueda}%" or
        venta.descripcion like "%${req.query.busqueda}%" or
        producto regexp "${expresion}" or
        venta.descripcion regexp "${expresion}"
      )
    `;
    busquedaOrder=' ordenar desc';
  } 
  if (req.query.categoria) {
    categoriaQuery= ` and venta.categoria = '${req.query.categoria}'`;
  }
  if (req.query.departamento) {
    departamentoQuery= ` and usuarios.departamento = '${req.query.departamento}'`;
  }
  if (req.query.precioMin && req.query.precioMax) {
    precioQuery= ` and (venta.precio between ${req.query.precioMin} and ${req.query.precioMax})`;
  } else if(req.query.precioMin) {
    precioQuery= ` and (venta.precio > ${req.query.precioMin})`;
  } else if (req.query.precioMax){
    precioQuery= ` and (venta.precio < ${req.query.precioMax})`;
  }
  consulta = 'select * '+busquedaCase+' from usuarios, venta '+
  'where (usuarios.idusuarios = venta.idusuario)'+
  busquedaCondicion+
  categoriaQuery+
  departamentoQuery+
  precioQuery+
  ' order by'+((busquedaOrder)?busquedaOrder+",":"")+
  ' fechaPublicacion desc';
  try {
    pool.query(consulta)
    .then(async (ventas) => {
      var ventasfoto = [];
      if(ventas.length>0) {
        for (let index = 0; index < ventas.length; index++) {
          const venta = ventas[index];
          const foto = await modeloFotosVentas.findOne({where: {idVenta:venta.idVenta}, order: [['indice', 'ASC']]})
          const calificacionPromedio = await calificacionesMD.findOne({
            attributes: [[Sequelize.fn("AVG", Sequelize.col("calificacion")), "promedio"]],
            where: {idVenta:venta.idVenta}
          })
          var ventafoto;
          if(foto) {
            ventafoto = {...venta, foto: foto.dataValues.nombre, calificacion: calificacionPromedio.dataValues.promedio}
          } else {
            ventafoto = {...venta, calificacion: calificacionPromedio.dataValues.promedio}
          }
          ventasfoto.push(ventafoto);
        }
        res.status(200).json(ventasfoto);
      } else {
        res.status(400).json({message: "No se ha encontrado ninguna venta"})
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    })
  } catch (err) {
    res.status(500).json({message: "Eror inesperado", error: err.message})
  }
}

const busqueda2 = async (req, res) => {
  var ventas;
  if(req.query.busqueda) {
    const separado = req.query.busqueda.split(' ').filter(Boolean);
    separado.forEach((palabra, indice) => {
      interno= indice==0 ?palabra:interno+'|'+palabra;
    });
    const expresion =  interno;
    console.log(expresion);
    
    ventas = pool.query()
    ventas = await ventasMD.findAll({
      attributes: {include: [[Sequelize.literal(`
      CASE WHEN producto like "%${req.query.busqueda}%" THEN 1 ELSE 0 END +
      CASE WHEN descripcion like "%${req.query.busqueda}%" THEN 1 ELSE 0 END +
      CASE WHEN producto regexp "${expresion}" THEN 1 ELSE 0 END + 
      CASE WHEN descripcion regexp "%${expresion}%" THEN 1 ELSE 0 END` ), 'parecido']],},
      where: {
        [Op.or]: [
          {producto: {[Op.substring]: req.query.busqueda}},
          {producto: {[Op.or]: {[Op.regexp]: expresion}}},
          {descripcion: {[Op.or]: {[Op.regexp]: expresion}}},
          {descripcion: {[Op.substring]: req.query.busqueda}}
        ]
      }, order: [[Sequelize.literal('parecido'), 'DESC'],]
    })
  }
  var ventasfoto = [];
    // buscando la primera foto de cada venta
  if(ventas) {
    for (let index = 0; index < ventas.length; index++) {
      const venta = ventas[index];
      const foto = await modeloFotosVentas.findOne({where: {idVenta:venta.idVenta}, order: [['indice', 'ASC']]})
      const calificacionPromedio = await calificacionesMD.findOne({
        attributes: [[Sequelize.fn("AVG", Sequelize.col("calificacion")), "promedio"]],
        where: {idVenta:venta.idVenta}
      })
      var ventafoto;
      if(foto) {
        ventafoto = {...venta.dataValues, foto: foto.dataValues.nombre, calificacion: calificacionPromedio.dataValues.promedio}
      } else {
        ventafoto = {...venta.dataValues, calificacion: calificacionPromedio.dataValues.promedio}
      }
      ventasfoto.push(ventafoto);
    }
    res.status(200).json(ventasfoto);
  } else {
    res.status(400).json({message: "No se ha encontrado ninguna venta"})
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
  unaFoto,
  busqueda
};
