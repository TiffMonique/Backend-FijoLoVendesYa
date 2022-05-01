//IMPORTAMOS EL MODELO
const db = require("../database/db.js");
const { Sequelize} = require("sequelize");
const modeloFavoritos = require("../models/FavoritosMD.js");
const ventasMD = require("../models/VentasMD.js");
const modeloFotosVentas = require("../models/fotosVentas");
const calificacionesMD = require("../models/CalificacionesMD");

//------------METODOS PARA EL CRUD-----------
//1. OBTENER TODOS LOS FAVORITOS
const obtenerFavoritos = async (req, res) => {
  const idUsuario=req.session.user;
  try {
    const favoritos = await modeloFavoritos.findAll({
      include:[ventasMD],
      where:{idUsuario:idUsuario},
    });
    var favoritosfoto = [];
    // buscando la primera foto de cada favorito(venta)
    for (let index = 0; index < favoritos.length; index++) {
      const favorito = favoritos[index];
      const foto = await modeloFotosVentas.findOne({where: {idVenta:favorito.idVenta}, order: [['indice', 'ASC']]})
      const calificacionPromedio = await calificacionesMD.findOne({
        attributes: [[Sequelize.fn("AVG", Sequelize.col("calificacion")), "promedio"]],
        where: {idVenta:favorito.idVenta}
      })
      var favoritofoto;
      if(foto) {
        favoritofoto = {...favorito.Ventum.dataValues, foto: foto.dataValues.nombre, calificacion: calificacionPromedio.dataValues.promedio,idLista:favorito.idLista}
      } else {
        favoritofoto = {...favorito.Ventum.dataValues, calificacion: calificacionPromedio.dataValues.promedio,idLista:favorito.idLista}
      }
      favoritosfoto.push(favoritofoto);
    }
    res.json(favoritosfoto);
  } catch (error) {
    res.json({ message: error.message });
  }
};

//2. OBTENER UN FAVORITO
const unFavorito = async (req, res) => {
  try {
    const favorito = await modeloFavoritos.findAll({
      where: { idLista: req.params.idLista },
    });
    res.json(favorito[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};

//3. INSERTAR UN FAVORITO
const insertarFavorito= async (req, res) => {
    const idUsuario = req.session.user;
    console.log(idUsuario);
    const idVenta = req.params.idVenta;
    const favorito={idUsuario,idVenta};
    try {
      await modeloFavoritos.create(favorito);
      res.status(200).json({ message: "Favorito registrado" });
    } catch (error) {
      res.status(400).json({ message: "Ha ocurrido un error", error: error.message });
    }
};


//4. ELIMINAR UN FAVORITO
const eliminarFavorito = async (req, res) => {
  try {
    await modeloFavoritos.destroy({
      where: { idLista: req.params.idLista},
    });
    res.json({ message: "Favorito eliminado" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Ha ocurrido un error", error: error.message });
  }
};

module.exports = {
  obtenerFavoritos,
  unFavorito,
  insertarFavorito,
  eliminarFavorito,
};
