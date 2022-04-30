//IMPORTAMOS EL MODELO
const db = require("../database/db.js");
const modeloFavoritos = require("../models/FavoritosMD.js");

//------------METODOS PARA EL CRUD-----------
//1. OBTENER TODOS LOS FAVORITOS
const obtenerFavoritos = async (req, res) => {
  try {
    const favoritos = await modeloFavoritos.findAll();
    res.json(favoritos);
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
    const idVenta=req.params.body;
    const idUsuario = req.session.user;
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
